// 一次性烟雾测试：验证 node-llama-cpp + Qwen3 GGUF 能跑通 embed → 语义相似度
// 不进 vitest（依赖大模型加载，不适合 CI）。手跑：node --experimental-strip-types scripts/emb-smoke.mts
import { embed, isEmbedderAvailable, cosineSimilarity } from "../lib/embedder/index.ts";

console.log("[1/4] embedder 可用性:", isEmbedderAvailable());
if (!isEmbedderAvailable()) {
  console.log("✗ GGUF 模型文件不存在，跳过测试");
  process.exit(1);
}

console.log("[2/4] 首次 embed（加载 ~610MB GGUF，可能需数秒）...");
const t0 = Date.now();
const v1 = await embed("供应商管理不是压价，是找能一起扛风险的伙伴");
console.log("   维度:", v1.length, "耗时:", ((Date.now() - t0) / 1000).toFixed(1) + "s");

console.log("[3/4] 后续 embed（模型已缓存）...");
const t1 = Date.now();
const v2 = await embed("找供应商要看的是抗风险能力，不是报价最低");
const v3 = await embed("今天天气不错适合出门");
console.log("   耗时:", ((Date.now() - t1) / 1000).toFixed(2) + "s");

const simSame = cosineSimilarity(v1, v2);
const simDiff = cosineSimilarity(v1, v3);
console.log("[4/4] 语义相似度:");
console.log("   同义句:", simSame.toFixed(4), "(期望较高)");
console.log("   无关句:", simDiff.toFixed(4), "(期望较低)");
console.log("   差值  :", (simSame - simDiff).toFixed(4), simSame > simDiff ? "✓ 通过" : "✗ 失败");
