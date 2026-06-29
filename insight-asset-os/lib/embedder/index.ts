/**
 * 本地 Embedding 引擎 —— 基于 node-llama-cpp + Qwen3-Embedding-0.6B GGUF
 *
 * 优先使用 linkly-ai 已下载的模型（~610MB，1024 维，中文原生优化）。
 * 模型路径可通过环境变量 QWEN3_EMBEDDING_PATH 覆盖。
 *
 * 设计取舍：node-llama-cpp 使用预编译的 llama.cpp 二进制（Metal/CPU），
 * 比 transformers.js WASM 更快，且无需联网下载模型。
 */

import fs from "fs";
import { getLlama, type Llama, type LlamaModel, type LlamaEmbeddingContext } from "node-llama-cpp";

/** embedding 维度（Qwen3-Embedding-0.6B = 1024） */
export const EMBEDDING_DIM = 1024;

/** 默认模型路径：linkly-ai 安装目录 */
const DEFAULT_MODEL_PATH =
  "/Users/sundanian/Library/Application Support/ai.linkly.desktop/data/models/Qwen3-Embedding-0.6B-Q8_0.gguf";

/** 获取模型路径（环境变量优先） */
function getModelPath(): string {
  return process.env.QWEN3_EMBEDDING_PATH || DEFAULT_MODEL_PATH;
}

// ===================== 单例缓存 =====================

let llama: Llama | null = null;
let model: LlamaModel | null = null;
let embeddingCtx: LlamaEmbeddingContext | null = null;
let currentModelPath = "";

/**
 * 确保 embedding 上下文已加载。幂等——已加载则直接返回。
 * @param modelPath 可选模型路径，默认使用 linkly-ai 的 Qwen3
 */
async function ensureContext(
  modelPath: string = getModelPath()
): Promise<LlamaEmbeddingContext> {
  if (embeddingCtx && currentModelPath === modelPath) return embeddingCtx;

  // 释放旧资源
  if (embeddingCtx) {
    await (embeddingCtx as any).dispose?.();
    embeddingCtx = null;
  }
  if (model) {
    await (model as any).dispose?.();
    model = null;
  }

  if (!llama) {
    llama = await getLlama();
  }

  model = await llama.loadModel({
    modelPath,
    // CPU 推理即可，embedding 模型不大；gpuLayers=0 禁用 GPU
    gpuLayers: 0,
  });

  embeddingCtx = await model.createEmbeddingContext();
  currentModelPath = modelPath;
  return embeddingCtx;
}

/**
 * 将单段文本转换为 embedding 向量（number[]）
 */
export async function embed(text: string, modelPath?: string): Promise<number[]> {
  const ctx = await ensureContext(modelPath);
  const result = await ctx.getEmbeddingFor(text);
  return Array.from(result.vector);
}

/**
 * 将多段文本批量转换为 embedding 向量
 */
export async function embedBatch(
  texts: string[],
  modelPath?: string,
  onProgress?: (done: number, total: number) => void
): Promise<number[][]> {
  // node-llama-cpp 没有原生 batch embed，逐条调用即可
  // embedding 模型很快（单条 <50ms），1000 条约 1 分钟
  const results: number[][] = [];
  for (let i = 0; i < texts.length; i++) {
    const vec = await embed(texts[i], modelPath);
    results.push(vec);
    onProgress?.(i + 1, texts.length);
  }
  return results;
}

/**
 * 余弦相似度（两个向量均为归一化时即为点积）
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`向量维度不一致: ${a.length} vs ${b.length}`);
  }
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dot / denominator;
}

/**
 * 检查嵌入引擎是否可用（检查 GGUF 模型文件是否存在）
 */
export function isEmbedderAvailable(): boolean {
  try {
    return fs.existsSync(getModelPath());
  } catch {
    return false;
  }
}
