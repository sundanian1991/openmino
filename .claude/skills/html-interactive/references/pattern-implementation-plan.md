# pattern-implementation-plan — 项目规划/里程碑

> 适用于：项目排期、里程碑规划、依赖关系展示、风险矩阵。
> 核心理念：甘特图时间线展示进度，依赖连线说明关联，风险表量化不确定性。

---

## 页面结构

```
<header>                    项目名 + 时间范围
<section.timeline>          甘特图时间线
<section.dep-graph>         依赖关系图
<section.risk-matrix>       风险表
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${项目名} 规划</title>
  <style>
    :root { /* 暖色系统 */ }
  </style>
</head>
<body>
  <header class="plan-header">
    <h1>${项目名}</h1>
    <p class="plan-range">${开始日期} — ${结束日期}</p>
  </header>

  <section class="timeline-section">
    <h2>里程碑</h2>
    <div class="gantt" id="gantt">
      <div class="gantt-header" id="gantt-header">
        <!-- JS 生成时间刻度 -->
      </div>
      <div class="gantt-body" id="gantt-body">
        <!-- JS 生成任务条 -->
      </div>
    </div>
  </section>

  <section class="dep-section">
    <h2>依赖关系</h2>
    <div class="dep-list">
      <div class="dep-item">
        <span class="dep-from">${任务A}</span>
        <span class="dep-arrow">&rarr;</span>
        <span class="dep-to">${任务B}</span>
        <span class="dep-type">${类型：强依赖/弱依赖}</span>
      </div>
    </div>
  </section>

  <section class="risk-section">
    <h2>风险矩阵</h2>
    <table class="risk-table">
      <thead>
        <tr>
          <th>风险</th>
          <th>概率</th>
          <th>影响</th>
          <th>等级</th>
          <th>缓解措施</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${风险描述}</td>
          <td><span class="risk-badge low">低</span></td>
          <td><span class="risk-badge high">高</span></td>
          <td><span class="risk-level mid">中</span></td>
          <td>${措施}</td>
        </tr>
      </tbody>
    </table>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 甘特图 */
.gantt {
  border: 1px solid var(--g200); border-radius: 10px;
  overflow-x: auto; max-width: 960px;
}
.gantt-header {
  display: grid; border-bottom: 2px solid var(--g200);
  background: var(--g100);
}
.gantt-header span {
  padding: 8px 4px; text-align: center;
  font-size: 0.7em; color: var(--g500);
  font-family: var(--mono);
}
.gantt-body { position: relative; }
.gantt-row {
  display: grid; align-items: center;
  border-bottom: 1px solid var(--g200);
  min-height: 36px;
}
.gantt-bar {
  height: 20px; border-radius: 4px;
  background: var(--clay); position: relative;
  transition: opacity 0.2s;
}
.gantt-bar.done { background: var(--olive); }
.gantt-bar.active {
  background: var(--clay);
  box-shadow: 0 0 0 2px var(--oat);
}
.gantt-bar-label {
  position: absolute; left: 6px; top: 50%;
  transform: translateY(-50%);
  font-size: 0.65em; color: white; font-weight: 600;
  white-space: nowrap;
}

/* 依赖列表 */
.dep-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 0; border-bottom: 1px solid var(--g200);
  font-size: 0.9em;
}
.dep-arrow { color: var(--clay); font-weight: 700; }
.dep-type {
  font-size: 0.75em; padding: 2px 8px;
  border-radius: 4px; background: var(--g100);
  color: var(--g500);
}

/* 风险表 */
.risk-table {
  width: 100%; border-collapse: collapse; font-size: 0.9em;
}
.risk-table th {
  padding: 10px 12px; text-align: left;
  background: var(--g100); font-weight: 600;
  border-bottom: 2px solid var(--g200);
}
.risk-table td {
  padding: 10px 12px; border-bottom: 1px solid var(--g200);
}
.risk-badge {
  padding: 2px 10px; border-radius: 4px;
  font-size: 0.8em; font-weight: 600;
}
.risk-badge.low { background: var(--olive); color: white; }
.risk-badge.mid { background: var(--oat); color: var(--g700); }
.risk-badge.high { background: var(--clay); color: white; }
.risk-level {
  padding: 2px 10px; border-radius: 4px;
  font-size: 0.8em; font-weight: 700;
}
.risk-level.low { background: #e8f5e9; color: #2e7d32; }
.risk-level.mid { background: #fff3e0; color: #e65100; }
.risk-level.high { background: #fce4ec; color: #c62828; }
```

---

## JS 交互

```js
const milestones = [
  { name: '需求分析', start: 0, span: 2, status: 'done' },
  { name: '开发', start: 2, span: 4, status: 'active' },
  { name: '测试', start: 5, span: 2, status: '' },
  { name: '上线', start: 7, span: 1, status: '' },
];
const totalWeeks = 8;

// 渲染甘特图头部
const header = document.getElementById('gantt-header');
header.style.gridTemplateColumns = `repeat(${totalWeeks}, 1fr)`;
for (let i = 0; i < totalWeeks; i++) {
  const s = document.createElement('span');
  s.textContent = `W${i + 1}`;
  header.appendChild(s);
}

// 渲染任务条
const body = document.getElementById('gantt-body');
milestones.forEach(m => {
  const row = document.createElement('div');
  row.className = 'gantt-row';
  row.style.gridTemplateColumns = `repeat(${totalWeeks}, 1fr)`;
  const bar = document.createElement('div');
  bar.className = `gantt-bar ${m.status}`;
  bar.style.gridColumn = `${m.start + 1} / span ${m.span}`;
  bar.innerHTML = `<span class="gantt-bar-label">${m.name}</span>`;
  row.appendChild(bar);
  body.appendChild(row);
});
```

---

## 设计约束

1. **里程碑 <= 12 个** — 超过拆阶段，每阶段独立时间线
2. **时间粒度统一** — 全部用周或全部用月，不混用
3. **风险 <= 8 条** — 高频风险才上表
4. **甘特图支持横向滚动** — 时间跨度长时不挤压
5. **版心 <= 960px** — 规划页面信息密度高，控制宽度

---

## 反模式

- 不用复杂 SVG 画甘特 — CSS grid + div 足够
- 不省略依赖关系 — 依赖是规划的核心信息
- 不把风险写成长文 — 表格化，概率/影响/等级一目了然
- 不用纯文字描述时间线 — 可视化甘特条效率更高
