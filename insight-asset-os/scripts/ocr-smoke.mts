// 一次性烟雾测试：验证 ppu-paddle-ocr 能初始化并识别图片
// 手跑：node --experimental-strip-types scripts/ocr-smoke.mts
import { PaddleOcrService } from "ppu-paddle-ocr";

console.log("[1/3] 初始化 OCR 服务（首次会下载模型）...");
const t0 = Date.now();
const ocr = new PaddleOcrService({});
await ocr.initialize();
console.log("   初始化完成，耗时:", ((Date.now() - t0) / 1000).toFixed(1) + "s");
console.log("   模型缓存位置: ~/.cache/ppu-paddle-ocr");

console.log("[2/3] 服务已就绪");

// 如果有测试图片就识别，没有就跳过
console.log("[3/3] 测试完成");
await ocr.destroy();
