import { describe, it, expect } from "vitest";
import { cosineSimilarity, isEmbedderAvailable, EMBEDDING_DIM } from "./index";
import { semanticSearch, type SearchResult } from "./search";

// ===================== isEmbedderAvailable（运行时探测）=====================

describe("isEmbedderAvailable", () => {
  // 回归测试：原生 ESM 下 require 不存在，旧实现会恒返回 false
  // 使「智能聚类」(batch API) 永远提前退出。
  it("依赖已安装时返回 true（ESM/CJS 均应通过）", () => {
    expect(isEmbedderAvailable()).toBe(true);
  });

  it("EMBEDDING_DIM 与模型预期一致（bge-small-zh = 512）", () => {
    expect(EMBEDDING_DIM).toBe(512);
  });
});

// ===================== cosineSimilarity（边界）=====================

describe("cosineSimilarity", () => {
  it("相同向量相似度为 1", () => {
    expect(cosineSimilarity([1, 0, 0], [1, 0, 0])).toBeCloseTo(1, 5);
  });

  it("正交向量相似度为 0", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0, 5);
  });

  it("反向向量相似度为 -1", () => {
    expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1, 5);
  });

  it("零向量返回 0（避免除零）", () => {
    expect(cosineSimilarity([0, 0, 0], [1, 1, 1])).toBe(0);
    expect(cosineSimilarity([0, 0], [0, 0])).toBe(0);
  });

  it("维度不一致抛错", () => {
    expect(() => cosineSimilarity([1, 2], [1, 2, 3])).toThrow(/维度不一致/);
  });

  it("相似度对称", () => {
    const a = [0.3, 0.4, 0.5];
    const b = [0.1, 0.2, 0.9];
    expect(cosineSimilarity(a, b)).toBeCloseTo(cosineSimilarity(b, a), 6);
  });
});

// ===================== semanticSearch =====================

describe("semanticSearch", () => {
  // 构造候选集：query 靠近第一条，远离其余
  const query = [1, 0, 0];
  const candidates = [
    { assetId: 1, embedding: [0.99, 0.01, 0], title: "管理放大器", insight: "ins1" },
    { assetId: 2, embedding: [0, 1, 0], title: "供应商响应", insight: "ins2" },
    { assetId: 3, embedding: [0, 0, 1], title: "数据分析", insight: "ins3" },
  ];

  it("按相似度降序返回，最相关的排第一", () => {
    const results = semanticSearch(query, candidates, 3, 0);
    expect(results[0].assetId).toBe(1);
    expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
  });

  it("默认 topK=10、minScore=0.3 时过滤低分项", () => {
    // 候选集只有 3 条，topK=10 不裁剪；但正交向量相似度~0 < 0.3 会被过滤
    const results = semanticSearch(query, candidates);
    // 只有第 1 条与 query 相似度 > 0.3
    expect(results.every((r) => r.score >= 0.3)).toBe(true);
    expect(results.some((r) => r.assetId === 1)).toBe(true);
  });

  it("minScore 高于所有相似度时返回空数组", () => {
    // 候选最高分 ≈ 0.9999（余弦上界 1），用 2 必然全过滤
    const results = semanticSearch(query, candidates, 10, 2);
    expect(results).toEqual([]);
  });

  it("topK 限制返回数量", () => {
    const results = semanticSearch(query, candidates, 1, 0);
    expect(results).toHaveLength(1);
  });

  it("空候选集返回空数组", () => {
    expect(semanticSearch(query, [], 10, 0)).toEqual([]);
  });

  it("结果含 assetId/score/title/insight 字段", () => {
    const results = semanticSearch(query, candidates, 1, 0);
    const r: SearchResult = results[0];
    expect(r).toHaveProperty("assetId");
    expect(r).toHaveProperty("score");
    expect(r).toHaveProperty("title");
    expect(r).toHaveProperty("insight");
    expect(typeof r.score).toBe("number");
  });

  it("保留 title/insight 原值（不篡改）", () => {
    const results = semanticSearch(query, candidates, 3, 0);
    const byId = new Map(results.map((r) => [r.assetId, r]));
    expect(byId.get(2)?.title).toBe("供应商响应");
    expect(byId.get(3)?.insight).toBe("ins3");
  });
});
