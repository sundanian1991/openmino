# pattern-animation-sandbox — 动画/过渡效果的参数调优

> 适用于：CSS 动画参数调试、过渡效果对比、easing 函数可视化、动效参数导出。
> 核心理念：滑块实时控制参数，预览区即时反馈，调好后一键复制 CSS 输出。

---

## 页面结构

```
<header>              动画名称 + 描述
<section.sandbox>     左侧参数面板 + 右侧预览区
<section.css-output>  CSS 输出（可复制）
<footer>              预设动画列表
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${动画名称} 调优</title>
  <style>
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="sandbox-header">
    <h1>${动画名称}</h1>
    <p class="sandbox-desc">${一句话描述}</p>
  </header>

  <section class="sandbox-layout">
    <div class="param-panel">
      <h3>参数</h3>
      <div class="param-group">
        <label class="param-label">
          <span>duration</span>
          <span class="param-value" id="val-duration">300ms</span>
        </label>
        <input type="range" class="param-slider" id="duration"
          min="50" max="2000" value="300" step="50">
      </div>

      <div class="param-group">
        <label class="param-label">
          <span>easing</span>
          <span class="param-value" id="val-easing">ease</span>
        </label>
        <div class="easing-presets">
          <button class="easing-btn active" data-easing="ease">ease</button>
          <button class="easing-btn" data-easing="ease-in">ease-in</button>
          <button class="easing-btn" data-easing="ease-out">ease-out</button>
          <button class="easing-btn" data-easing="ease-in-out">ease-in-out</button>
          <button class="easing-btn" data-easing="linear">linear</button>
          <button class="easing-btn" data-easing="cubic-bezier(0.34,1.56,0.64,1)">弹性</button>
        </div>
      </div>

      <div class="param-group">
        <label class="param-label">
          <span>delay</span>
          <span class="param-value" id="val-delay">0ms</span>
        </label>
        <input type="range" class="param-slider" id="delay"
          min="0" max="1000" value="0" step="50">
      </div>

      <button class="replay-btn" id="replay">重播</button>
    </div>

    <div class="preview-area">
      <div class="preview-track">
        <div class="preview-element" id="animated-el"></div>
      </div>
      <div class="easing-curve">
        <canvas id="curve-canvas" width="200" height="200"></canvas>
      </div>
    </div>
  </section>

  <section class="css-output">
    <h3>CSS 输出</h3>
    <div class="output-block">
      <code id="css-code"></code>
      <button class="copy-btn" id="copy-css">复制</button>
    </div>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 沙盒布局 */
.sandbox-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px; max-width: 960px; margin: 0 auto;
}

/* 参数面板 */
.param-panel {
  padding: 20px;
  border: 1px solid var(--g200); border-radius: 10px;
  background: var(--paper);
}
.param-group { margin-bottom: 20px; }
.param-label {
  display: flex; justify-content: space-between;
  font-size: 0.8em; font-weight: 600;
  color: var(--g700); margin-bottom: 8px;
}
.param-value { font-family: var(--mono); color: var(--clay); }

/* 滑块 */
.param-slider {
  width: 100%; appearance: none;
  height: 4px; border-radius: 2px;
  background: var(--g200); outline: none;
}
.param-slider::-webkit-slider-thumb {
  appearance: none; width: 16px; height: 16px;
  border-radius: 50%; background: var(--clay);
  cursor: pointer; border: 2px solid white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

/* Easing 预设按钮 */
.easing-presets { display: flex; flex-wrap: wrap; gap: 4px; }
.easing-btn {
  padding: 4px 10px; border: 1px solid var(--g200);
  border-radius: 6px; background: white;
  font-size: 0.75em; font-family: var(--mono);
  cursor: pointer; color: var(--g500);
}
.easing-btn.active {
  background: var(--clay); color: white; border-color: var(--clay);
}

/* 预览区 */
.preview-area {
  border: 1px solid var(--g200); border-radius: 10px;
  padding: 40px; min-height: 300px;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  background: white;
}
.preview-track { width: 100%; position: relative; }
.preview-element {
  width: 60px; height: 60px; border-radius: 10px;
  background: var(--clay);
}

/* CSS 输出 */
.output-block {
  position: relative; background: var(--g100);
  border-radius: 8px; padding: 16px;
  font-family: var(--mono); font-size: 0.85em;
}
.copy-btn {
  position: absolute; top: 8px; right: 8px;
  padding: 4px 12px; border: 1px solid var(--g200);
  border-radius: 4px; background: white;
  font-size: 0.75em; cursor: pointer;
}

/* 重播按钮 */
.replay-btn {
  width: 100%; padding: 10px;
  border: 1px solid var(--clay); border-radius: 8px;
  background: transparent; color: var(--clay);
  font-weight: 600; cursor: pointer; margin-top: 16px;
}
.replay-btn:hover { background: var(--clay); color: white; }
```

---

## JS 交互

```js
const el = document.getElementById('animated-el');
const durationSlider = document.getElementById('duration');
const delaySlider = document.getElementById('delay');
let currentEasing = 'ease';

function updateOutput() {
  const dur = durationSlider.value;
  const del = delaySlider.value;
  const css = `transition: all ${dur}ms ${currentEasing} ${del}ms;`;
  document.getElementById('css-code').textContent = css;
  document.getElementById('val-duration').textContent = dur + 'ms';
  document.getElementById('val-delay').textContent = del + 'ms';
}

[durationSlider, delaySlider].forEach(s => {
  s.addEventListener('input', updateOutput);
});

document.querySelectorAll('.easing-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.easing-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentEasing = btn.dataset.easing;
    document.getElementById('val-easing').textContent = currentEasing;
    updateOutput();
  });
});

document.getElementById('replay').addEventListener('click', () => {
  el.style.transition = 'none';
  el.style.transform = 'translateX(0)';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const dur = durationSlider.value;
      const del = delaySlider.value;
      el.style.transition = `all ${dur}ms ${currentEasing} ${del}ms`;
      el.style.transform = 'translateX(300px)';
    });
  });
});

document.getElementById('copy-css').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('css-code').textContent);
});

updateOutput();
```

---

## 设计约束

1. **参数面板固定宽度 280px** — 不挤压预览区
2. **预览区最小高度 300px** — 留足动画展示空间
3. **滑块 range 限制合理区间** — duration 50-2000ms，不做无意义的 0-9999
4. **CSS 输出实时更新** — 参数变化立即反映到代码
5. **重播按钮必须可用** — 动画只播一次，用户需手动重播

---

## 反模式

- 不引入 GSAP/anime.js — 纯 CSS transition/animation + JS 控制
- 不自动循环播放 — 手动重播，不干扰参数调节
- 不省略 easing 曲线图 — 可视化让调参更直观
- 不用 requestAnimationFrame 做复杂计算 — 简单参数直接映射到 CSS
