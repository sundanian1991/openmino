/**
 * PDF → 图片渲染器 —— 把 PDF 页面渲染为 PNG 图像 buffer，供 OCR 消费。
 *
 * 基于 pdfjs-dist（通过 pdf-parse 的传递依赖）+ @napi-rs/canvas。
 * 用动态 require 避免 ESM/worker 复杂度和 TS 类型解析问题。
 */

/** 将 PDF buffer 渲染为 PNG 图片数组（每页一张） */
export async function pdfToImages(pdfBuffer: Buffer): Promise<Buffer[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjs = await lazyPdfJs() as any;
  const { Canvas } = await lazyCanvas();

  const loadingTask = pdfjs.getDocument({
    data: pdfBuffer.buffer as ArrayBuffer,
    useSystemFonts: true,
  });
  const doc = await loadingTask.promise;
  const images: Buffer[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 2 }); // 2x 提升 OCR 精度

    const canvas = new Canvas(viewport.width, viewport.height);
    const ctx = canvas.getContext("2d");

    await page.render({ canvasContext: ctx, viewport }).promise;
    images.push(canvas.toBuffer("image/png"));
  }

  return images;
}

/** 懒加载 pdfjs-dist（legacy build，Node.js 环境） */
async function lazyPdfJs(): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("pdfjs-dist/legacy/build/pdf");
  if (mod.GlobalWorkerOptions) {
    (mod.GlobalWorkerOptions as any).workerSrc = "";
  }
  return mod;
}

/** 懒加载 @napi-rs/canvas（Node.js Canvas API） */
async function lazyCanvas(): Promise<{ Canvas: new (w: number, h: number) => { getContext(ctx: string): unknown; toBuffer(fmt: string): Buffer } }> {
  const canvas = await import("@napi-rs/canvas");
  return { Canvas: canvas.Canvas };
}
