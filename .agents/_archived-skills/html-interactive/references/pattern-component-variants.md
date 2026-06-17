# pattern-component-variants — 组件的不同状态/尺寸/变体

> 适用于：组件库文档、UI Kit 展示、按钮/卡片/表单变体、状态矩阵。
> 核心理念：网格排列的组件矩阵让设计者和开发者一眼看到全貌，状态切换即时预览。

---

## 页面结构

```
<header>                组件名称 + 描述
<section.controls>      状态/尺寸/变体切换按钮
<section.matrix>        组件卡片网格（按维度排列）
<section.props>         属性表格（可选）
<footer>               使用说明
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${组件名} 变体</title>
  <style>
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="comp-header">
    <h1>${组件名}</h1>
    <p class="comp-desc">${一句话描述}</p>
  </header>

  <section class="controls-bar">
    <div class="control-group">
      <span class="control-label">状态</span>
      <div class="pill-group" data-dimension="state">
        <button class="pill active" data-value="default">默认</button>
        <button class="pill" data-value="hover">悬停</button>
        <button class="pill" data-value="disabled">禁用</button>
        <button class="pill" data-value="loading">加载中</button>
      </div>
    </div>
    <div class="control-group">
      <span class="control-label">尺寸</span>
      <div class="pill-group" data-dimension="size">
        <button class="pill active" data-value="sm">S</button>
        <button class="pill" data-value="md">M</button>
        <button class="pill" data-value="lg">L</button>
      </div>
    </div>
  </section>

  <section class="variant-matrix">
    <div class="matrix-row">
      <span class="row-label">${变体类别}</span>
      <div class="matrix-cells">
        <div class="variant-card" data-state="default" data-size="md">
          <div class="variant-preview">
            <!-- 实际组件渲染 -->
          </div>
          <span class="variant-label">${变体名}</span>
        </div>
        <!-- 更多变体卡片 -->
      </div>
    </div>
  </section>

  <footer class="comp-footer">
    <p>使用方法：${说明}</p>
  </footer>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 控制栏 */
.controls-bar {
  display: flex; gap: 24px; flex-wrap: wrap;
  padding: 16px 0;
  border-bottom: 1px solid var(--g200);
  margin-bottom: 2em;
}
.control-group { display: flex; align-items: center; gap: 8px; }
.control-label {
  font-size: 0.8em; font-weight: 600;
  color: var(--g500); min-width: 40px;
}
.pill-group {
  display: flex; gap: 4px;
  background: var(--g100); border-radius: 8px; padding: 3px;
}
.pill {
  padding: 5px 14px; border: none; border-radius: 6px;
  background: transparent; cursor: pointer;
  font-size: 0.8em; font-weight: 500; color: var(--g500);
  transition: all 0.15s ease;
}
.pill.active {
  background: white; color: var(--g700);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.pill:hover:not(.active) { color: var(--g700); }

/* 变体矩阵 */
.variant-matrix { display: flex; flex-direction: column; gap: 24px; }
.matrix-row { display: flex; gap: 16px; align-items: flex-start; }
.row-label {
  font-size: 0.8em; font-weight: 600; color: var(--g500);
  min-width: 80px; padding-top: 12px; flex-shrink: 0;
}
.matrix-cells { display: flex; gap: 12px; flex-wrap: wrap; flex: 1; }
.variant-card {
  display: flex; flex-direction: column;
  align-items: center; gap: 8px;
  padding: 20px 24px;
  border: 1px solid var(--g200); border-radius: 10px;
  background: white; min-width: 140px;
  transition: border-color 0.15s ease;
}
.variant-card:hover { border-color: var(--clay); }
.variant-card.hidden { opacity: 0.2; pointer-events: none; }
.variant-label {
  font-size: 0.7em; color: var(--g500); font-family: var(--mono);
}
```

---

## JS 交互

```js
// Pill 切换：过滤显示匹配的变体卡片
document.querySelectorAll('.pill-group').forEach(group => {
  const dimension = group.dataset.dimension;
  group.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const value = pill.dataset.value;
      document.querySelectorAll('.variant-card').forEach(card => {
        if (card.dataset[dimension] === value || value === 'all') {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
```

---

## 设计约束

1. **每个变体必须实际渲染** — 不用截图占位，用真实 HTML/CSS
2. **矩阵维度 <= 3** — 状态/尺寸/变体三维度已足够，更多就折叠
3. **卡片最小宽度 140px** — 保证组件预览不被挤压
4. **切换即时响应** — pill 点击后立刻过滤，无延迟
5. **hidden 卡片不占交互** — opacity 降低 + pointer-events: none

---

## 反模式

- 不用图片代替组件渲染 — 截图无法反映真实样式
- 不堆砌所有维度组合 — 超过 20 张卡片时分页或折叠
- 不省略状态维度 — 禁用/hover/focus 是组件文档必备
- 不用 JS 框架渲染 — 纯 vanilla 切换 class 即可
