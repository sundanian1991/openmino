/**
 * 本地 OCR 引擎 —— 基于 ppu-paddle-ocr + ONNX Runtime
 *
 * 使用 PP-OCRv6 small 模型（自动下载到 ~/.cache/ppu-paddle-ocr），
 * 原生支持中文（字典含 15565 个中文字符）+ 英文 + 拉丁文。
 *
 * 设计取舍：ppu-paddle-ocr 基于 onnxruntime-node 原生绑定，
 * 比 tesseract.js 精度更高、速度更快，且与 PaddleOCR 生态对齐。
 */

import fs from "fs";
import { createRequire } from "module";
import { PaddleOcrService } from "ppu-paddle-ocr";

const require = createRequire(import.meta.url);

let ocrService: PaddleOcrService | null = null;
let initializing: Promise<PaddleOcrService> | null = null;

/**
 * 获取 OCR 服务单例（幂等）。首次调用会触发模型加载/下载。
 * 并发安全：多个调用共享同一个初始化 Promise。
 */
export async function getOcrService(): Promise<PaddleOcrService> {
  if (ocrService) return ocrService;

  // 防止并发初始化
  if (initializing) return initializing;

  initializing = (async () => {
    const service = new PaddleOcrService({});
    await service.initialize();
    ocrService = service;
    initializing = null;
    return service;
  })();

  return initializing;
}

/**
 * 对单张图片做 OCR，返回识别出的纯文本。
 * @param imageData 图片文件路径（string）或二进制数据（ArrayBuffer/Buffer）
 */
export async function ocrImage(imageData: string | ArrayBuffer | Buffer): Promise<string> {
  const service = await getOcrService();
  // recognize() 接受 ArrayBuffer | Canvas；文件路径需要先读取为 buffer
  let input: ArrayBuffer;
  if (typeof imageData === "string") {
    const buf = fs.readFileSync(imageData);
    input = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
  } else if (Buffer.isBuffer(imageData)) {
    input = imageData.buffer.slice(imageData.byteOffset, imageData.byteOffset + imageData.byteLength) as ArrayBuffer;
  } else {
    input = imageData;
  }
  const result = await service.recognize(input);
  return result.text;
}

/**
 * 检查 OCR 引擎是否可用（检查 onnxruntime-node 依赖）
 */
export function isOcrAvailable(): boolean {
  try {
    require.resolve("onnxruntime-node");
    require.resolve("ppu-paddle-ocr");
    return true;
  } catch {
    return false;
  }
}
