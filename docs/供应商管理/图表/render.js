#!/usr/bin/env node
/**
 * Excalidraw 本地渲染器 - 单个文件
 * 用法: node render.js <excalidraw文件路径> [输出PNG路径]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 动态导入 Excalidraw（需配合 node-canvas 的全局设置）
async function renderExcalidraw(excalidrawPath, outputPath) {
  // 读取 JSON
  const data = JSON.parse(fs.readFileSync(excalidrawPath, 'utf-8'));

  // 动态导入 @excalidraw/excalidraw
  const { renderToCanvas } = await import('@excalidraw/excalidraw');

  // 计算画布大小
  const elements = data.elements || [];
  const appState = data.appState || {};
  const files = data.files || {};

  // 获取边界
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  for (const el of elements) {
    const x = el.x || 0;
    const y = el.y || 0;
    const w = el.width || 0;
    const h = el.height || 0;

    // 文本估算宽度
    let actualW = w;
    if (el.type === 'text') {
      const text = el.text || '';
      const fontSize = el.fontSize || 14;
      actualW = text.length * fontSize * 0.6;
      h = fontSize * 1.4;
    }

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + actualW);
    maxY = Math.max(maxY, y + h);
  }

  const padding = 60;
  const width = Math.max(1, Math.ceil(maxX - minX + padding * 2));
  const height = Math.max(1, Math.ceil(maxY - minY + padding * 2));

  // 创建画布
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 填充背景
  const bgColor = appState.viewBackgroundColor || '#ffffff';
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // 平移所有元素到居中位置
  const offsetX = padding - minX;
  const offsetY = padding - minY;

  // 构造用于渲染的 appState 副本
  const renderAppState = {
    ...appState,
    offsetX: (appState.offsetX || 0) + offsetX,
    offsetY: (appState.offsetY || 0) + offsetY,
  };

  // 使用 Excalidraw 渲染
  try {
    await renderToCanvas(
      canvas,
      elements,
      renderAppState,
      files,
      {
        preserveAspectRatio: true,
        viewBackgroundColor: bgColor,
      }
    );
  } catch (err) {
    console.error(`渲染失败: ${err.message}`);
    // 降级：基础绘制
    fallbackRender(ctx, elements, offsetX, offsetY);
  }

  // 保存 PNG
  const out = fs.createWriteStream(outputPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);

  out.on('finish', () => {
    console.log(`✓ ${path.basename(excalidrawPath)} → ${path.basename(outputPath)}`);
  });
}

// 降级渲染（简单绘制，确保至少能出图）
function fallbackRender(ctx, elements, offsetX, offsetY) {
  ctx.strokeStyle = '#1e40af';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#1e40af';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (const el of elements) {
    const x = (el.x || 0) + offsetX;
    const y = (el.y || 0) + offsetY;

    if (el.type === 'rectangle') {
      const w = el.width || 0;
      const h = el.height || 0;
      if (el.fill && el.fill !== 'transparent') {
        ctx.fillStyle = el.fill;
        ctx.fillRect(x, y, w, h);
      }
      ctx.strokeStyle = el.stroke || '#000';
      ctx.strokeRect(x, y, w, h);
    }
    else if (el.type === 'ellipse') {
      const w = el.width || 0;
      const h = el.height || 0;
      if (el.fill && el.fill !== 'transparent') {
        ctx.fillStyle = el.fill;
        ctx.beginPath();
        ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.strokeStyle = el.stroke || '#000';
      ctx.beginPath();
      ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, 2 * Math.PI);
      ctx.stroke();
    }
    else if (el.type === 'text') {
      const text = el.text || '';
      ctx.fillStyle = el.fill || '#000';
      ctx.font = `${el.fontSize || 14}px ${el.fontFamily === 1 ? 'serif' : 'sans-serif'}`;
      ctx.textAlign = el.textAlign || 'center';
      ctx.textBaseline = el.verticalAlign === 'middle' ? 'middle' : 'top';
      ctx.fillText(text, x, y);
    }
    else if (el.type === 'line') {
      const points = el.points || [];
      if (points.length >= 2) {
        ctx.strokeStyle = el.stroke || '#000';
        ctx.lineWidth = el.strokeWidth || 1;
        ctx.beginPath();
        ctx.moveTo(points[0][0] + offsetX, points[0][1] + offsetY);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0] + offsetX, points[i][1] + offsetY);
        }
        ctx.stroke();
      }
    }
  }
}

// 主程序
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('用法: node render.js <excalidraw文件> [输出PNG路径]');
  process.exit(1);
}

const inputPath = args[0];
const outputPath = args[1] || inputPath.replace(/\.excalidraw$/, '.png');

// 确保输出目录存在
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

await renderExcalidraw(inputPath, outputPath);
