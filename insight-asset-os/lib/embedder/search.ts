/**
 * 语义搜索 —— 基于 embedding 的余弦相似度检索
 *
 * 替代当前的 SQLite LIKE 搜索，按语义含义而非关键词匹配。
 */

import { cosineSimilarity } from "./index";

export interface SearchResult {
  /** 资产卡 ID */
  assetId: number;
  /** 相似度分数（0-1，越高越相关） */
  score: number;
  /** 资产卡标题 */
  title: string;
  /** 资产卡洞察 */
  insight: string | null;
}

/**
 * 语义搜索：在 embedding 向量库中找到与查询最相似的 topK 条记录
 *
 * @param queryEmbedding 查询文本的 embedding 向量
 * @param candidates 候选集（{ assetId, embedding, title, insight }）—— 通常是从 DB 加载的全部资产
 * @param topK 返回条数
 * @param minScore 最低相似度阈值（0-1），低于此值的被过滤
 */
export function semanticSearch(
  queryEmbedding: number[],
  candidates: {
    assetId: number;
    embedding: number[];
    title: string;
    insight: string | null;
  }[],
  topK: number = 10,
  minScore: number = 0.3
): SearchResult[] {
  const scored = candidates
    .map((c) => ({
      assetId: c.assetId,
      score: cosineSimilarity(queryEmbedding, c.embedding),
      title: c.title,
      insight: c.insight,
    }))
    .filter((r) => r.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored;
}
