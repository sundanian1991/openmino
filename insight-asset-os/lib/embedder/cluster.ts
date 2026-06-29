/**
 * 基于余弦距离的 K-means 聚类
 *
 * 用于：采集后根据 embedding 自动发现主题分组。
 * 无需 LLM，纯本地计算，速度快。
 */

import { cosineSimilarity } from "./index";

export interface ClusterResult {
  /** 聚类中心向量 */
  centroid: number[];
  /** 属于该聚类的原始数据索引列表 */
  members: number[];
  /** 聚类标签（如 "cluster-0"） */
  label: string;
}

/**
 * K-means 聚类
 *
 * @param vectors 待聚类的向量列表（每个都是归一化的 embedding）
 * @param k 目标聚类数
 * @param maxIter 最大迭代次数（默认 20）
 * @returns 聚类结果列表
 */
export function kMeans(
  vectors: number[][],
  k: number,
  maxIter: number = 20
): ClusterResult[] {
  if (vectors.length === 0) return [];
  if (k <= 0) k = 1;
  if (k > vectors.length) k = vectors.length;

  const dim = vectors[0].length;
  const n = vectors.length;

  // 初始化：随机选 k 个点作为初始中心
  const centroids: number[][] = [];
  const used = new Set<number>();
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * n);
    if (!used.has(idx)) {
      used.add(idx);
      centroids.push([...vectors[idx]]);
    }
  }

  let assignments: number[] = new Array(n).fill(0);

  for (let iter = 0; iter < maxIter; iter++) {
    // 分配：每个点到最近的中心
    let changed = false;
    for (let i = 0; i < n; i++) {
      let bestCluster = 0;
      let bestSim = -1;
      for (let c = 0; c < k; c++) {
        const sim = cosineSimilarity(vectors[i], centroids[c]);
        if (sim > bestSim) {
          bestSim = sim;
          bestCluster = c;
        }
      }
      if (assignments[i] !== bestCluster) {
        changed = true;
        assignments[i] = bestCluster;
      }
    }

    if (!changed) break; // 收敛

    // 更新：重新计算每个聚类中心（均值+归一化）
    for (let c = 0; c < k; c++) {
      const newCentroid = new Array(dim).fill(0);
      let count = 0;
      for (let i = 0; i < n; i++) {
        if (assignments[i] === c) {
          for (let d = 0; d < dim; d++) {
            newCentroid[d] += vectors[i][d];
          }
          count++;
        }
      }
      if (count > 0) {
        // 均值 + 归一化
        let norm = 0;
        for (let d = 0; d < dim; d++) {
          newCentroid[d] /= count;
          norm += newCentroid[d] * newCentroid[d];
        }
        norm = Math.sqrt(norm);
        if (norm > 0) {
          for (let d = 0; d < dim; d++) {
            newCentroid[d] /= norm;
          }
        }
        centroids[c] = newCentroid;
      }
    }
  }

  // 构建结果
  const clusters: ClusterResult[] = [];
  for (let c = 0; c < k; c++) {
    const members: number[] = [];
    for (let i = 0; i < n; i++) {
      if (assignments[i] === c) members.push(i);
    }
    clusters.push({
      centroid: centroids[c],
      members,
      label: `cluster-${c}`,
    });
  }

  // 按成员数量降序排列
  clusters.sort((a, b) => b.members.length - a.members.length);

  return clusters;
}

/**
 * 给聚类找出最具代表性的成员（离中心最近的 topN 个索引）
 */
export function topRepresentatives(
  cluster: ClusterResult,
  vectors: number[][],
  topN: number = 3
): number[] {
  const scored = cluster.members
    .map((idx) => ({
      idx,
      sim: cosineSimilarity(vectors[idx], cluster.centroid),
    }))
    .sort((a, b) => b.sim - a.sim);

  return scored.slice(0, topN).map((s) => s.idx);
}

/**
 * 基于轮廓系数（silhouette score）选择最优 k 值
 * 简单实现：遍历 k 从 2 到 maxK，取轮廓系数最大的 k
 *
 * @returns 最优 k 值
 */
export function optimalK(
  vectors: number[][],
  minK: number = 2,
  maxK: number = 15
): number {
  if (vectors.length < minK) return 1;
  const effectiveMax = Math.min(maxK, Math.floor(vectors.length / 3));
  if (effectiveMax < minK) return minK;

  let bestK = minK;
  let bestScore = -1;

  for (let k = minK; k <= effectiveMax; k++) {
    const clusters = kMeans(vectors, k, 15);
    if (clusters.length < 2) continue;

    // 简化轮廓系数：簇内平均相似度 - 最近簇平均相似度
    let totalScore = 0;
    for (const cluster of clusters) {
      if (cluster.members.length === 0) continue;
      for (const idx of cluster.members) {
        // 簇内紧密度
        let intraSim = 0;
        for (const j of cluster.members) {
          if (j !== idx) intraSim += cosineSimilarity(vectors[idx], vectors[j]);
        }
        intraSim /= Math.max(1, cluster.members.length - 1);

        // 最近其他簇的距离
        let bestInterSim = -1;
        for (const other of clusters) {
          if (other === cluster) continue;
          let interSim = 0;
          for (const j of other.members) {
            interSim += cosineSimilarity(vectors[idx], vectors[j]);
          }
          interSim /= Math.max(1, other.members.length);
          if (interSim > bestInterSim) bestInterSim = interSim;
        }

        if (bestInterSim === -1) bestInterSim = 0;
        const silhouette = intraSim - bestInterSim;
        totalScore += silhouette;
      }
    }
    const avgScore = totalScore / vectors.length;
    if (avgScore > bestScore) {
      bestScore = avgScore;
      bestK = k;
    }
  }

  return bestK;
}
