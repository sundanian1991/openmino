/**
 * 批量智能采集管线 —— 基于本地 embedding 的语义聚类
 *
 * 流程：
 * 1. 对所有未嵌入的资产卡生成 embedding（本地模型，无需 LLM）
 * 2. K-means 聚类发现自然主题分组
 * 3. 每个聚类创建一个主题，用代表卡片的标签命名
 * 4. 自动分配 topic_id
 *
 * 效果：1000 篇文章的聚类 + 主题生成只需本地计算，无需 LLM 调用。
 * 深度内容提取仍由 pipeline.ts 的 LLM 管线完成。
 */

import { embedBatch, isEmbedderAvailable, EMBEDDING_DIM } from "../embedder";
import { kMeans, optimalK, topRepresentatives } from "../embedder/cluster";
import {
  listAssets,
  getAsset,
  createTopic,
  assignTopic,
  setSetting,
  getSetting,
} from "../db/queries";
import { getDb } from "../db";

// ===================== 类型 =====================

export interface BatchProgress {
  phase: "embedding" | "clustering" | "assigning";
  done: number;
  total: number;
  message: string;
}

export interface BatchResult {
  ok: boolean;
  embedded: number; // 新生成的 embedding 数
  skipped: number; // 已有 embedding 的资产数
  clusters: number; // 发现的聚类数
  topicsCreated: number; // 自动创建的主题数
  assigned: number; // 被分配主题的资产数
  errors: string[];
  error?: string;
}

// ===================== Embedding 读写 =====================

/**
 * 保存 embedding 到 DB
 */
function saveEmbedding(assetId: number, vector: number[]): void {
  getDb()
    .prepare(
      `INSERT INTO asset_embeddings (asset_id, embedding) VALUES (?, ?)
       ON CONFLICT(asset_id) DO UPDATE SET embedding = excluded.embedding, created_at = datetime('now')`
    )
    .run(assetId, JSON.stringify(vector));
}

/**
 * 加载所有 embedding（返回 { assetId, embedding } 列表）
 */
function loadAllEmbeddings(): {
  assetId: number;
  embedding: number[];
  title: string;
  insight: string | null;
  tags: string[] | null;
}[] {
  const rows = getDb()
    .prepare(
      `SELECT e.asset_id, e.embedding, a.title, a.insight, a.tags
       FROM asset_embeddings e
       JOIN assets a ON a.id = e.asset_id`
    )
    .all() as { asset_id: number; embedding: string; title: string; insight: string | null; tags: string | null }[];

  return rows.map((r) => ({
    assetId: r.asset_id,
    embedding: JSON.parse(r.embedding) as number[],
    title: r.title,
    insight: r.insight,
    tags: r.tags ? (JSON.parse(r.tags) as string[]) : null,
  }));
}

// ===================== 主入口 =====================

/**
 * 批量智能采集：embedding → 聚类 → 主题生成
 *
 * @param onProgress 进度回调
 */
export async function batchProcess(
  onProgress?: (p: BatchProgress) => void
): Promise<BatchResult> {
  const errors: string[] = [];

  // 检查 embedder 可用性
  if (!isEmbedderAvailable()) {
    return {
      ok: false,
      embedded: 0,
      skipped: 0,
      clusters: 0,
      topicsCreated: 0,
      assigned: 0,
      errors: ["Embedding 模型依赖未安装（@huggingface/transformers）"],
      error: "Embedding 不可用",
    };
  }

  const allAssets = listAssets();
  if (allAssets.length === 0) {
    return {
      ok: false,
      embedded: 0,
      skipped: 0,
      clusters: 0,
      topicsCreated: 0,
      assigned: 0,
      errors: ["资产库为空，请先采集内容"],
      error: "无资产",
    };
  }

  // ===== Phase 1: Embedding =====
  onProgress?.({ phase: "embedding", done: 0, total: allAssets.length, message: "准备 embedding 模型…" });

  // 找出没有 embedding 的资产
  const existing = new Set(
    (getDb()
      .prepare("SELECT asset_id FROM asset_embeddings")
      .all() as { asset_id: number }[])
      .map((r) => r.asset_id)
  );

  const needEmbedding = allAssets.filter((a) => !existing.has(a.id));
  const skipped = allAssets.length - needEmbedding.length;

  if (needEmbedding.length > 0) {
    // 构建待嵌入的文本：title + insight + summary + 前 500 字原文
    const texts = needEmbedding.map((a) => {
      const parts = [a.title, a.insight ?? "", a.summary ?? ""];
      if (a.raw_content) parts.push(a.raw_content.slice(0, 500));
      return parts.filter(Boolean).join("\n");
    });

    onProgress?.({ phase: "embedding", done: 0, total: texts.length, message: `生成 embedding (0/${texts.length})…` });

    try {
      const vectors = await embedBatch(texts, undefined, (done, total) => {
        onProgress?.({ phase: "embedding", done, total, message: `生成 embedding (${done}/${total})…` });
      });

      // 保存 embedding
      for (let i = 0; i < needEmbedding.length; i++) {
        saveEmbedding(needEmbedding[i].id, vectors[i]);
      }
    } catch (e) {
      errors.push(`Embedding 失败: ${e instanceof Error ? e.message : String(e)}`);
      return {
        ok: false,
        embedded: 0,
        skipped,
        clusters: 0,
        topicsCreated: 0,
        assigned: 0,
        errors,
        error: "Embedding 生成失败",
      };
    }
  }

  // ===== Phase 2: Clustering =====
  onProgress?.({ phase: "clustering", done: 0, total: 1, message: "聚类分析中…" });

  const allEmbeddings = loadAllEmbeddings();
  if (allEmbeddings.length < 3) {
    // 太少，不够聚类
    return {
      ok: true,
      embedded: needEmbedding.length,
      skipped,
      clusters: 0,
      topicsCreated: 0,
      assigned: 0,
      errors: allEmbeddings.length < 3 ? [] : [],
    };
  }

  const vectors = allEmbeddings.map((e) => e.embedding);
  const k = optimalK(vectors, 3, Math.min(15, Math.floor(vectors.length / 3)));

  if (k < 2) {
    return {
      ok: true,
      embedded: needEmbedding.length,
      skipped,
      clusters: 0,
      topicsCreated: 0,
      assigned: 0,
      errors: [],
    };
  }

  const clusters = kMeans(vectors, k, 25);

  // ===== Phase 3: 主题生成与分配 =====
  onProgress?.({ phase: "assigning", done: 0, total: clusters.length, message: "创建主题…" });

  let topicsCreated = 0;
  let assigned = 0;

  for (let ci = 0; ci < clusters.length; ci++) {
    const cluster = clusters[ci];
    if (cluster.members.length < 2) continue;

    onProgress?.({ phase: "assigning", done: ci + 1, total: clusters.length, message: `创建主题 (${ci + 1}/${clusters.length})…` });

    // 用代表卡片的标签生成主题名
    const reps = topRepresentatives(cluster, vectors, 3);
    const repAssets = reps.map((idx) => allEmbeddings[idx]).filter(Boolean);

    // 收集标签，取最常见的 2 个作为主题名候选
    const tagCounts = new Map<string, number>();
    for (const a of repAssets) {
      for (const t of a.tags ?? []) {
        tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
      }
    }
    const topTags = [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    const topicName = topTags.length > 0
      ? topTags.map(([t]) => t).join("·")
      : `${repAssets[0]?.title.slice(0, 8) ?? "未命名"}类`;

    // 避免重复创建同名主题
    const existingTopics = (getDb()
      .prepare("SELECT id FROM topics WHERE name = ?")
      .get(topicName) as { id: number } | undefined);

    let topicId: number;
    if (existingTopics) {
      topicId = existingTopics.id;
    } else {
      topicId = createTopic(topicName);
      topicsCreated++;
    }

    // 分配 topic_id 给所有聚类成员
    for (const idx of cluster.members) {
      const assetId = allEmbeddings[idx].assetId;
      const asset = getAsset(assetId);
      if (asset && !asset.topic_id) {
        assignTopic(assetId, topicId);
        assigned++;
      }
    }
  }

  return {
    ok: true,
    embedded: needEmbedding.length,
    skipped,
    clusters: clusters.length,
    topicsCreated,
    assigned,
    errors,
  };
}
