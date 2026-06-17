# pattern-svg-art — SVG 插画/轮廓线/装饰图形

> 适用于：装饰性 SVG 图案、轮廓线插画、水印/纹理背景、几何图案叠加。
> 核心理念：多层 SVG 叠加，控制面板调节层显隐和透明度，纯 CSS/SVG 实现。

---

## 页面结构

```
<header>                  图案名称 + 描述
<section.canvas-area>     SVG 展示区（多层叠加）
<section.layer-controls>  层控制面板
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${图案名}</title>
  <style>
    :root { /* 暖色系统 */ }
  </style>
</head>
<body>
  <header class="art-header">
    <h1>${图案名}</h1>
    <p class="art-desc">${一句话描述}</p>
  </header>

  <section class="canvas-area" id="canvas">
    <svg class="art-svg" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg">
      <!-- 层 1：背景纹理 -->
      <g class="art-layer" data-layer="bg">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none"
              stroke="var(--g200)" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
      </g>

      <!-- 层 2：几何线条 -->
      <g class="art-layer" data-layer="lines">
        <line x1="100" y1="270" x2="860" y2="270"
          stroke="var(--clay)" stroke-width="1" opacity="0.3"/>
        <circle cx="480" cy="270" r="180"
          fill="none" stroke="var(--olive)" stroke-width="0.8" opacity="0.4"/>
      </g>

      <!-- 层 3：主体轮廓 -->
      <g class="art-layer" data-layer="main">
        <path d="${SVG 路径}"
          fill="none" stroke="var(--clay)" stroke-width="2"/>
      </g>

      <!-- 层 4：水印 -->
      <g class="art-layer" data-layer="watermark" opacity="0.06">
        <text x="480" y="290" text-anchor="middle"
          font-family="var(--serif)" font-size="72"
          fill="var(--g500)">${水印文字}</text>
      </g>
    </svg>
  </section>

  <section class="controls">
    <div class="layer-controls" id="layer-controls">
      <!-- JS 动态生成 -->
    </div>
    <div class="export-actions">
      <button class="export-btn" id="export-svg">导出 SVG</button>
    </div>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
/* SVG 展示区 */
.canvas-area {
  max-width: 960px; margin: 0 auto 2em;
  border: 1px solid var(--g200); border-radius: 10px;
  overflow: hidden; background: white;
}
.art-svg {
  display: block; width: 100%; height: auto;
}
.art-layer {
  transition: opacity 0.3s ease;
}

/* 层控制面板 */
.controls {
  max-width: 960px; margin: 0 auto;
}
.layer-controls {
  display: flex; flex-direction: column; gap: 8px;
}
.layer-ctrl {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 16px;
  border: 1px solid var(--g200); border-radius: 8px;
  background: var(--paper);
}
.layer-ctrl label {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.85em; font-weight: 600;
  color: var(--g700); cursor: pointer; flex: 1;
}
.layer-ctrl input[type="checkbox"] {
  accent-color: var(--clay);
  width: 16px; height: 16px;
}
.opacity-slider {
  width: 100px; appearance: none;
  height: 3px; border-radius: 2px;
  background: var(--g200); outline: none;
}
.opacity-slider::-webkit-slider-thumb {
  appearance: none; width: 12px; height: 12px;
  border-radius: 50%; background: var(--clay);
  cursor: pointer;
}
.opacity-val {
  font-family: var(--mono); font-size: 0.75em;
  color: var(--g500); min-width: 36px;
}

/* 导出按钮 */
.export-actions {
  margin-top: 16px; display: flex; gap: 8px;
}
.export-btn {
  padding: 8px 20px; border: 1px solid var(--clay);
  border-radius: 8px; background: transparent;
  color: var(--clay); font-weight: 600;
  cursor: pointer; font-size: 0.85em;
}
.export-btn:hover { background: var(--clay); color: white; }
```

---

## JS 交互

```js
const layers = document.querySelectorAll('.art-layer');
const container = document.getElementById('layer-controls');

layers.forEach(layer => {
  const name = layer.dataset.layer;
  const ctrl = document.createElement('div');
  ctrl.className = 'layer-ctrl';
  ctrl.innerHTML = `
    <label>
      <input type="checkbox" data-layer="${name}" checked>
      ${name}
    </label>
    <input type="range" class="opacity-slider" data-layer="${name}"
      min="0" max="100" value="${(layer.getAttribute('opacity') || 1) * 100}">
    <span class="opacity-val">${Math.round((layer.getAttribute('opacity') || 1) * 100)}%</span>`;
  container.appendChild(ctrl);
});

container.addEventListener('change', (e) => {
  const layerName = e.target.dataset.layer;
  const layer = document.querySelector(`[data-layer="${layerName}"]`);
  if (!layer) return;
  if (e.target.type === 'checkbox') {
    layer.style.display = e.target.checked ? '' : 'none';
  }
  if (e.target.classList.contains('opacity-slider')) {
    const val = e.target.value;
    layer.setAttribute('opacity', val / 100);
    e.target.nextElementSibling.textContent = val + '%';
  }
});

document.getElementById('export-svg').addEventListener('click', () => {
  const svg = document.querySelector('.art-svg').outerHTML;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'art.svg'; a.click();
});
```

---

## 设计约束

1. **SVG viewBox 固定 960x540** — 16:9 比例，版心一致
2. **层数 <= 6 层** — 太多控制面板冗长
3. **线条用 --clay/--olive 系** — 暖色系统，不引入冷色
4. **水印层默认低透明度** — 0.04-0.08，不干扰主体
5. **导出只输出 SVG** — 不做 PNG/JPG 转换

---

## 反模式

- 不用 canvas 替代 SVG — SVG 天然支持分层和 DOM 操作
- 不引入 D3/Snap.svg — 原生 SVG + JS 足够
- 不在 SVG 内嵌位图 — 纯矢量，保持可缩放
- 不省略层控制 — 可叠加/可隐藏是核心交互
