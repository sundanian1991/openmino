import { describe, it, expect } from "vitest";
import {
  kMeans,
  topRepresentatives,
  optimalK,
  type ClusterResult,
} from "./cluster";
import { cosineSimilarity } from "./index";

// ===================== 测试用向量（3 维，方便人工验证）=====================

// 两组明显分离的向量：A 簇（x 轴方向）与 B 簇（y 轴方向）
const vecA1 = [1, 0, 0];
const vecA2 = [0.99, 0.01, 0];
const vecA3 = [0.95, 0.05, 0];
const vecB1 = [0, 1, 0];
const vecB2 = [0.01, 0.99, 0];
const vecB3 = [0.05, 0.95, 0];

// 已归一化向量子集（用于多组测试）
const twoClusters = [vecA1, vecA2, vecA3, vecB1, vecB2, vecB3];

// ===================== kMeans =====================

describe("kMeans", () => {
  it("空数组返回空", () => {
    expect(kMeans([], 3)).toEqual([]);
  });

  it("k<=0 退化为 1 簇", () => {
    const result = kMeans([vecA1, vecA2], 0);
    expect(result).toHaveLength(1);
    expect(result[0].members).toHaveLength(2);
  });

  it("k 超过样本数时收紧到样本数", () => {
    const result = kMeans([vecA1, vecB1], 5);
    expect(result.length).toBeLessThanOrEqual(2);
  });

  it("能分离两组明显不同的向量", () => {
    // 跑多次排除随机初始化的偶发失败
    let lastResult: ClusterResult[] = [];
    let success = false;
    for (let attempt = 0; attempt < 10; attempt++) {
      lastResult = kMeans(twoClusters, 2, 25);
      // 期望：两个簇，各 3 个成员
      const sizes = lastResult.map((c) => c.members.length).sort((a, b) => a - b);
      if (sizes[0] === 3 && sizes[1] === 3) {
        success = true;
        break;
      }
    }
    expect(success).toBe(true);
    // 按成员数降序排列
    expect(lastResult[0].members.length).toBeGreaterThanOrEqual(
      lastResult[1].members.length
    );
  });

  it("同簇成员互相靠近（不出现跨组混分）", () => {
    const result = kMeans(twoClusters, 2, 25);
    expect(result).toHaveLength(2);
    // 任取一簇：组内最小相似度应高于跨组最大相似度
    const c0 = result[0].members.map((i) => twoClusters[i]);
    const c1 = result[1].members.map((i) => twoClusters[i]);
    const intraC0 = cosineSimilarity(c0[0], c0[1]);
    const inter = cosineSimilarity(c0[0], c1[0]);
    expect(intraC0).toBeGreaterThan(inter);
  });

  it("标签形如 cluster-N", () => {
    const result = kMeans([vecA1, vecB1], 2);
    for (const c of result) {
      expect(c.label).toMatch(/^cluster-\d+$/);
    }
  });

  it("结果含 centroid 字段且维度正确", () => {
    const result = kMeans([vecA1, vecA2, vecA3], 1);
    expect(result[0].centroid).toHaveLength(3);
  });
});

// ===================== topRepresentatives =====================

describe("topRepresentatives", () => {
  it("返回离中心最近的 topN 个索引", () => {
    const vectors = [
      [1, 0, 0], // idx 0
      [0.9, 0.1, 0], // idx 1（最靠近中心）
      [0.5, 0.5, 0], // idx 2（较远）
      [0.1, 0.9, 0], // idx 3
    ];
    const cluster: ClusterResult = {
      centroid: [0.95, 0.05, 0],
      members: [0, 1, 2, 3],
      label: "cluster-0",
    };
    const reps = topRepresentatives(cluster, vectors, 2);
    expect(reps).toHaveLength(2);
    // idx 0 ([1,0,0]) 与 idx 1 ([0.9,0.1,0]) 都靠近中心 [0.95,0.05,0]，
    // 两者极接近（cos≈0.9986 vs 0.9983），构成 top-2；其余被排除
    expect(reps).toContain(0);
    expect(reps).toContain(1);
    expect(reps).not.toContain(2);
    expect(reps).not.toContain(3);
  });

  it("topN 超过成员数时返回全部", () => {
    const vectors = [[1, 0, 0], [0, 1, 0]];
    const cluster: ClusterResult = {
      centroid: [1, 0, 0],
      members: [0, 1],
      label: "cluster-0",
    };
    expect(topRepresentatives(cluster, vectors, 10)).toHaveLength(2);
  });

  it("单成员簇返回该成员", () => {
    const vectors = [[1, 0, 0]];
    const cluster: ClusterResult = {
      centroid: [1, 0, 0],
      members: [0],
      label: "cluster-0",
    };
    expect(topRepresentatives(cluster, vectors, 3)).toEqual([0]);
  });
});

// ===================== optimalK =====================

describe("optimalK", () => {
  it("样本少于 minK 时返回 1", () => {
    expect(optimalK([vecA1], 2, 15)).toBe(1);
    expect(optimalK([vecA1, vecB1], 3, 15)).toBe(1);
  });

  it("样本足够分簇时返回 >=2", () => {
    // 6 个向量明显可分 2 组
    const k = optimalK(twoClusters, 2, 4);
    expect(k).toBeGreaterThanOrEqual(2);
  });

  it("返回值在 [minK, effectiveMax] 区间内", () => {
    const k = optimalK(twoClusters, 2, 15);
    // effectiveMax = min(15, floor(6/3)) = 2
    expect(k).toBeGreaterThanOrEqual(2);
    expect(k).toBeLessThanOrEqual(2);
  });
});
