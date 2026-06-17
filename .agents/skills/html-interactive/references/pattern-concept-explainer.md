# pattern-concept-explainer — 概念/算法教学

> 适用于：算法可视化、概念讲解、术语教学、原理对比。
> 核心理念：动画演示区展示核心过程，术语 tooltip 即时解释，对比表总结差异。

---

## 页面结构

```
<header>                概念标题 + 一句话定义
<section.demo>          动画演示区（可重播/步进）
<section.comparison>    对比表格
<section.glossary>      术语表（tooltip 交互）
<footer>                延伸阅读
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${概念名}</title>
  <style>
    :root { /* 暖色系统 */ }
  </style>
</head>
<body>
  <header class="concept-header">
    <h1>${概念名}</h1>
    <p class="concept-def">${一句话定义}</p>
    <div class="demo-controls">
      <button class="ctrl-btn" id="play-btn">播放</button>
      <button class="ctrl-btn" id="step-btn">单步</button>
      <button class="ctrl-btn" id="reset-btn">重置</button>
      <label class="speed-label">
        速度 <input type="range" id="speed" min="1" max="5" value="3">
      </label>
    </div>
  </header>

  <section class="demo-area">
    <div class="stage" id="stage">
      <!-- 动画元素由 JS 动态生成 -->
    </div>
    <div class="step-desc" id="step-desc">
      <span class="step-num">步骤 0/0</span>
      <p>${当前步骤说明}</p>
    </div>
  </section>

  <section class="comparison-section">
    <h2>对比</h2>
    <table class="compare-table">
      <thead>
        <tr>
          <th>维度</th>
          <th>${方案A}</th>
          <th>${方案B}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${维度名}</td>
          <td>${值}</td>
          <td>${值}</td>
        </tr>
      </tbody>
    </table>
  </section>

  <section class="glossary-section">
    <h2>术语表</h2>
    <div class="glossary-list">
      <span class="term" data-tip="${解释}">${术语}</span>
      <!-- 更多术语 -->
    </div>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 演示区 */
.demo-area {
  max-width: 960px; margin: 0 auto 2em;
  border: 1px solid var(--g200); border-radius: 10px;
  overflow: hidden;
}
.stage {
  min-height: 280px; padding: 24px;
  background: white; position: relative;
  display: flex; align-items: center; justify-content: center;
}
.step-desc {
  padding: 12px 20px; border-top: 1px solid var(--g200);
  background: var(--g100); font-size: 0.9em;
}
.step-num {
  font-family: var(--mono); font-size: 0.75em;
  color: var(--g500); margin-right: 8px;
}

/* 控制条 */
.demo-controls {
  display: flex; gap: 8px; align-items: center;
  margin-top: 12px;
}
.ctrl-btn {
  padding: 6px 16px; border: 1px solid var(--g200);
  border-radius: 6px; background: white;
  font-size: 0.85em; cursor: pointer; color: var(--g700);
}
.ctrl-btn:hover { border-color: var(--clay); color: var(--clay); }
.speed-label {
  font-size: 0.8em; color: var(--g500); margin-left: auto;
}

/* 对比表 */
.compare-table {
  width: 100%; border-collapse: collapse;
  font-size: 0.9em;
}
.compare-table th {
  padding: 10px 16px; text-align: left;
  background: var(--g100); font-weight: 600;
  border-bottom: 2px solid var(--g200);
}
.compare-table td {
  padding: 10px 16px; border-bottom: 1px solid var(--g200);
}

/* 术语 tooltip */
.term {
  display: inline-block; padding: 4px 12px;
  border-bottom: 2px dotted var(--clay);
  cursor: help; position: relative;
  font-weight: 500; color: var(--clay);
  margin: 4px;
}
.term::after {
  content: attr(data-tip);
  position: absolute; bottom: 100%; left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px; border-radius: 6px;
  background: var(--g700); color: white;
  font-size: 0.8em; font-weight: 400;
  white-space: nowrap; max-width: 240px;
  white-space: normal; opacity: 0;
  pointer-events: none; transition: opacity 0.15s;
  z-index: 10;
}
.term:hover::after { opacity: 1; }
```

---

## JS 交互

```js
let step = 0, playing = false, timer = null;
const stages = []; // 用户填充步骤数据

function renderStep(i) {
  // 根据 stages[i] 渲染 stage 内容
  document.getElementById('step-desc').querySelector('.step-num').textContent =
    `步骤 ${i + 1}/${stages.length}`;
  document.getElementById('step-desc').querySelector('p').textContent =
    stages[i].desc;
}

document.getElementById('play-btn').addEventListener('click', () => {
  if (playing) { clearInterval(timer); playing = false; return; }
  playing = true;
  timer = setInterval(() => {
    if (step < stages.length - 1) { step++; renderStep(step); }
    else { clearInterval(timer); playing = false; }
  }, 1200 / document.getElementById('speed').value);
});

document.getElementById('step-btn').addEventListener('click', () => {
  if (step < stages.length - 1) { step++; renderStep(step); }
});
document.getElementById('reset-btn').addEventListener('click', () => {
  step = 0; renderStep(0);
});
renderStep(0);
```

---

## 设计约束

1. **演示区最小高度 280px** — 留足动画展示空间
2. **对比表 <= 5 行** — 太多用折叠或分页
3. **术语 tooltip 最大宽度 240px** — 不遮挡页面
4. **动画支持播放/单步/重置三种模式** — 适配不同学习节奏
5. **版心 <= 960px** — 阅读舒适度优先

---

## 反模式

- 不用 canvas 做简单动画 — CSS transition/JS DOM 操作足够
- 不把术语解释写成段落 — tooltip 交互更高效
- 不省略步骤说明 — 每一步都要有文字描述
- 不自动播放 — 默认暂停，用户主动触发
