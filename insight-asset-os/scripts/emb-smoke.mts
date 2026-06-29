// 一次性烟雾测试：验证 node-llama-cpp + Qwen3 GGUF 能跑通 embed → 语义相似度
// 手跑：npm run test:integration
//
// 断言：
//   1. 同义句余弦相似度 > 无关句（核心正确性）
//   2. 同义句相似度 ≥ 0.15（模型不是完全随机）
//   3. 无关句相似度 ≤ 0.3（模型有区分力）
//   4. 首次 embed 加载时间 ≤ 30s（模型加载正常）
//   5. 后续 embed 单条 ≤ 5s（推理正常）

import { embed, isEmbedderAvailable, cosineSimilarity, EMBEDDING_DIM } from "../lib/embedder/index.ts";

let passed = 0;
let failed = 0;

const check = (label: string, cond: boolean, detail = "") => {
  if (cond) {
    console.log(`  ✓ ${label}${detail ? ` → ${detail}` : ""}`);
    passed++;
  } else {
    console.log(`  ✗ ${label}${detail ? ` → ${detail}` : ""}`);
    failed++;
  }
};

// [1/5] embedder 可用性
console.log("[1/5] embedder 可用性...");
check("GGUF 模型文件存在", isEmbedderAvailable());
if (!isEmbedderAvailable()) {
  console.log("✗ 模型文件不存在，跳过测试");
  process.exit(1);
}

// [2/5] 首次 embed + 维度检查
console.log("[2/5] 首次 embed（加载 ~610MB GGUF）...");
const t0 = Date.now();
const v1 = await embed("供应商管理不是压价，是找能一起扛风险的伙伴");
const firstLoadMs = Date.now() - t0;
check("返回向量维度 = EMBEDDING_DIM", v1.length === EMBEDDING_DIM, `${v1.length}`);
check("首次 embed 加载时间 ≤ 30s", firstLoadMs <= 30_000, `${(firstLoadMs / 1000).toFixed(1)}s`);

// [3/5] 后续 embed + 推理性能
console.log("[3/5] 后续 embed（模型已缓存）...");
const t1 = Date.now();
const v2 = await embed("找供应商要看的是抗风险能力，不是报价最低");
const v3 = await embed("今天天气不错适合出门");
const batchMs = Date.now() - t1;
check("后续 2 条 embed 总耗时 ≤ 10s", batchMs <= 10_000, `${(batchMs / 1000).toFixed(1)}s`);

// [4/5] 语义正确性：同义句相似度 > 无关句
console.log("[4/5] 语义相似度验证...");
const simSame = cosineSimilarity(v1, v2);
const simDiff = cosineSimilarity(v1, v3);
const delta = simSame - simDiff;
check("同义句相似度 > 无关句", simSame > simDiff, `${simSame.toFixed(4)} vs ${simDiff.toFixed(4)}`);
check("差值 ≥ 0.1（模型有区分力）", delta >= 0.1, `${delta.toFixed(4)}`);

// [5/5] 边界合理性
console.log("[5/5] 边界合理性...");
check("同义句相似度 ≥ 0.15", simSame >= 0.15, `${simSame.toFixed(4)}`);
check("无关句相似度 ≤ 0.3", simDiff <= 0.3, `${simDiff.toFixed(4)}`);

// 总结
console.log("\n========================================");
if (failed === 0) {
  console.log(`  ✓ 全部通过：${passed}/${passed + failed}`);
} else {
  console.log(`  ✗ ${failed} 项失败，${passed} 项通过`);
}
console.log("========================================\n");

process.exit(failed > 0 ? 1 : 0);
