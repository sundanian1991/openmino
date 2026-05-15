# pattern-triage-board — 任务排序/优先级

> 适用于：任务优先级排序、看板管理、需求池分类、工作量评估。
> 核心理念：多列看板拖拽排序，优先级标签色阶区分，列间拖拽反映状态流转。

---

## 页面结构

```
<header>                  看板标题 + 统计摘要
<section.board>           多列看板（TODO / DOING / DONE）
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${看板名}</title>
  <style>
    :root { /* 暖色系统 */ }
  </style>
</head>
<body>
  <header class="board-header">
    <h1>${看板名}</h1>
    <div class="board-stats" id="stats">
      <span class="stat" data-col="todo">TODO: <b>0</b></span>
      <span class="stat" data-col="doing">DOING: <b>0</b></span>
      <span class="stat" data-col="done">DONE: <b>0</b></span>
    </div>
  </header>

  <section class="board" id="board">
    <div class="column" data-col="todo">
      <div class="col-header">
        <h2>TODO</h2>
        <span class="col-count">0</span>
      </div>
      <div class="col-body" data-col="todo">
        <div class="card" draggable="true" data-priority="high"
          data-id="task-1">
          <div class="card-priority high">P0</div>
          <div class="card-title">${任务名}</div>
          <div class="card-meta">${标签/工时}</div>
        </div>
        <div class="card" draggable="true" data-priority="mid" data-id="task-2">
          <div class="card-priority mid">P1</div>
          <div class="card-title">${任务名}</div>
          <div class="card-meta">${标签/工时}</div>
        </div>
      </div>
    </div>

    <div class="column" data-col="doing">
      <div class="col-header">
        <h2>DOING</h2>
        <span class="col-count">0</span>
      </div>
      <div class="col-body" data-col="doing"></div>
    </div>

    <div class="column" data-col="done">
      <div class="col-header">
        <h2>DONE</h2>
        <span class="col-count">0</span>
      </div>
      <div class="col-body" data-col="done"></div>
    </div>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 看板布局 */
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; max-width: 960px; margin: 0 auto;
}

/* 列 */
.column {
  border: 1px solid var(--g200); border-radius: 10px;
  background: var(--g100); display: flex;
  flex-direction: column; min-height: 400px;
}
.col-header {
  display: flex; justify-content: space-between;
  align-items: center;
  padding: 12px 16px; border-bottom: 1px solid var(--g200);
}
.col-header h2 {
  font-size: 0.85em; font-weight: 700;
  color: var(--g500); margin: 0;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.col-count {
  font-family: var(--mono); font-size: 0.75em;
  background: var(--g200); padding: 2px 8px;
  border-radius: 10px; color: var(--g500);
}
.col-body {
  flex: 1; padding: 12px;
  display: flex; flex-direction: column; gap: 8px;
  min-height: 200px;
  transition: background 0.15s;
}
.col-body.drag-over {
  background: var(--oat);
}

/* 卡片 */
.card {
  padding: 12px; background: white;
  border: 1px solid var(--g200); border-radius: 8px;
  cursor: grab; transition: box-shadow 0.15s, transform 0.15s;
}
.card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.card.dragging {
  opacity: 0.4; transform: rotate(2deg);
}
.card-title {
  font-weight: 600; font-size: 0.9em;
  color: var(--g700); margin-bottom: 4px;
}
.card-meta {
  font-size: 0.75em; color: var(--g500);
}
.card-priority {
  display: inline-block; padding: 2px 8px;
  border-radius: 4px; font-size: 0.7em;
  font-weight: 700; margin-bottom: 6px;
  font-family: var(--mono);
}
.card-priority.high { background: var(--clay); color: white; }
.card-priority.mid { background: var(--oat); color: var(--g700); }
.card-priority.low { background: var(--g200); color: var(--g500); }

/* 统计栏 */
.board-stats {
  display: flex; gap: 16px; margin-top: 8px;
}
.stat {
  font-size: 0.8em; color: var(--g500);
}
.stat b { color: var(--g700); }
```

---

## JS 交互

```js
let draggedCard = null;

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('dragstart', (e) => {
    draggedCard = card;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    document.querySelectorAll('.col-body').forEach(c => c.classList.remove('drag-over'));
    draggedCard = null;
    updateStats();
  });
});

document.querySelectorAll('.col-body').forEach(col => {
  col.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    col.classList.add('drag-over');
  });
  col.addEventListener('dragleave', () => {
    col.classList.remove('drag-over');
  });
  col.addEventListener('drop', (e) => {
    e.preventDefault();
    col.classList.remove('drag-over');
    if (draggedCard) col.appendChild(draggedCard);
  });
});

function updateStats() {
  document.querySelectorAll('.col-body').forEach(col => {
    const count = col.querySelectorAll('.card').length;
    const colName = col.dataset.col;
    const header = col.previousElementSibling.querySelector('.col-count');
    if (header) header.textContent = count;
    const statEl = document.querySelector(`.stat[data-col="${colName}"] b`);
    if (statEl) statEl.textContent = count;
  });
}
updateStats();
```

---

## 设计约束

1. **列数 <= 5 列** — 超过 5 列横向空间不足
2. **卡片 <= 30 张** — 太多性能下降，分页或过滤
3. **优先级标签固定 3 级** — P0/P1/P2，不搞 5 级
4. **拖拽有视觉反馈** — dragging 半透明 + 目标列变色
5. **统计实时更新** — 拖拽后立即重算各列计数

---

## 反模式

- 不引入外部拖拽库 — HTML5 Drag API 原生够用
- 不用 checkbox 代替拖拽 — 看板核心是空间位置语义
- 不省略列计数 — 计数是看板的基本信息
- 不做跨看板拖拽 — 单看板内操作，复杂度可控
