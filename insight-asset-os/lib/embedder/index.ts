/**
 * 本地 Embedding 引擎 —— 基于 transformers.js
 *
 * 使用 Xenova/bge-small-zh-v1.5 模型（中文优化，~100MB，512 维）
 * 首次加载自动下载模型文件到本地缓存。
 *
 * 设计取舍：transfomers.js 纯 WASM 运行，无需原生编译（node-llama-cpp 需要），
 * 虽然比 GGUF 慢，但零安装门槛，适合 Next.js 项目。
 */

import { pipeline, env, type FeatureExtractionPipeline } from "@huggingface/transformers";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// 禁止下载时弹出进度条（服务端无 TTY）
env.allowLocalModels = false;
// 缓存目录（默认在 node_modules/.cache）
env.cacheDir = "./data/.transformers-cache";

/** embedding 维度（bge-small-zh-v1.5 = 512） */
export const EMBEDDING_DIM = 512;

/** 默认中文 embedding 模型 */
const DEFAULT_MODEL = "Xenova/bge-small-zh-v1.5";

let extractor: FeatureExtractionPipeline | null = null;
let currentModel = DEFAULT_MODEL;

/**
 * 确保模型已加载。幂等——已加载则直接返回。
 * @param model 可选模型名，默认 Xenova/bge-small-zh-v1.5
 */
export async function ensureModel(
  model: string = DEFAULT_MODEL
): Promise<FeatureExtractionPipeline> {
  if (extractor && currentModel === model) return extractor;

  // 释放旧模型
  if (extractor) {
    await (extractor as any).dispose?.();
    extractor = null;
  }

  extractor = await pipeline("feature-extraction", model, {
    device: "cpu",
  }) as FeatureExtractionPipeline;
  currentModel = model;
  return extractor;
}

/**
 * 将单段文本转换为 embedding 向量（number[]）
 */
export async function embed(text: string, model?: string): Promise<number[]> {
  const pipe = await ensureModel(model);
  // pipeline 返回的是 Tensor，取 [0] 是 token-level embeddings，
  // 需要对所有 token 取 mean pooling 得到 sentence embedding
  const result = await pipe(text, {
    pooling: "mean",
    normalize: true,
  });

  // result 是 Tensor，转为普通数组
  return Array.from(result.data as Float32Array);
}

/**
 * 将多段文本批量转换为 embedding 向量
 */
export async function embedBatch(
  texts: string[],
  model?: string,
  onProgress?: (done: number, total: number) => void
): Promise<number[][]> {
  const pipe = await ensureModel(model);
  const results: number[][] = [];

  for (let i = 0; i < texts.length; i++) {
    const vec = await embed(texts[i]);
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
 * 检查嵌入引擎是否可用（不实际加载模型，仅检查依赖）
 *
 * 不能用裸 `require.resolve`——原生 ESM（Next.js 运行时）下 require 不存在，
 * 会抛 ReferenceError 被 catch 吞掉导致恒返回 false，使「智能聚类」永远提前退出。
 * 上方已用 createRequire(import.meta.url) 构造兼容 require，这里直接用它。
 */
export function isEmbedderAvailable(): boolean {
  try {
    require.resolve("@huggingface/transformers");
    return true;
  } catch {
    return false;
  }
}
