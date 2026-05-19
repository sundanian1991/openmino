# pattern-status-report — 周报/工程状态报告

> 适用于：周报、项目状态汇报、Sprint 总结、运营日报等"数字 + 事件 + 进度"混合内容。

---

## 页面结构

```
<header>          标题 + 日期范围 + 状态灯（绿/黄/红）
<section.metrics> 度量卡片网格（2-4 列）
<section.charts>  内联 SVG 小图表（趋势线 + 环形图 + 条形图）
<section.events>  事件时间线（本周大事）
<section.details> 可折叠详情区
<footer>          下一周期计划
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${标题}</title>
  <style>
    /* 设计系统变量 — 见 SKILL.md */
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="report-header">
    <div class="status-indicator">
      <span class="status-dot"></span>
      <span class="status-label">${状态}</span>
    </div>
    <h1>${标题}</h1>
    <p class="date-range">${起始日期} — ${结束日期}</p>
  </header>

  <section class="metrics-grid">
    <!-- 度量卡片 ×N -->
  </section>

  <section class="charts-row">
    <!-- SVG 图表 ×2-3 -->
  </section>

  <section class="events-timeline">
    <!-- 事件列表 -->
  </section>

  <details class="detail-section">
    <summary>详细数据</summary>
    <!-- 表格/列表 -->
  </details>

  <footer class="next-period">
    <h3>下一周期计划</h3>
    <ul><!-- --></ul>
  </footer>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 状态灯 */
.status-indicator {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 20px;
  background: var(--g100); font-size: 0.75em; font-weight: 600;
}
.status-dot {
  width: 8px; height: 8px; border-radius: 50%;
}
.status-dot.green  { background: var(--olive); }
.status-dot.yellow { background: #E5A84B; }
.status-dot.red    { background: #D94848; }

/* 度量卡片网格 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* 图表行 */
.charts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

/* 事件条目 */
.event-item {
  display: flex; gap: 12px; padding: 10px 0;
  border-bottom: 1px solid var(--g200);
}
.event-date {
  font-family: var(--mono); font-size: 0.8em; color: var(--g500);
  min-width: 80px;
}
.event-tag {
  font-size: 0.65em; font-weight: 700; padding: 2px 8px;
  border-radius: 4px; text-transform: uppercase;
}
.event-tag.feature { background: rgba(120, 140, 93, 0.15); color: var(--olive); }
.event-tag.fix     { background: rgba(217, 119, 87, 0.12); color: var(--clay); }
.event-tag.alert   { background: rgba(226, 75, 74, 0.12); color: #D94848; }

/* 详情折叠 */
.detail-section {
  border: 1px solid var(--g200); border-radius: 10px;
  padding: 16px; margin-top: 2em;
}
.detail-section summary {
  cursor: pointer; font-weight: 600; color: var(--clay);
}
```

---

## 组件配方

### Dashboard Metric Cards

带图标标签 + 大数字 + 趋势指示的度量卡片。顶部渐变细线。

```css
.metric-card {
  background: var(--paper);
  border: 1px solid var(--g300);
  border-radius: 10px;
  padding: 18px;
  position: relative;
  overflow: hidden;
}
.metric-card::before {
  content: ''; position: absolute; top: 0; left: 0;
  width: 100%; height: 2px;
  background: linear-gradient(90deg, var(--clay), transparent);
}
.metric-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.7em; font-weight: 600; color: var(--g500);
  letter-spacing: 0.1em; text-transform: uppercase;
}
.metric-value {
  font-size: 2em; font-weight: 800; color: var(--slate); line-height: 1;
}
.metric-trend { font-size: 0.65em; margin-top: 6px; }
.metric-trend.positive { color: var(--olive); }
.metric-trend.negative { color: #D94848; }
```

SVG 图标用 Lucide 风格：`stroke-width="1.5"`, `stroke-linecap="round"`, `fill="none"`。

### Funnel Visualization

垂直漏斗：每行图标 + 数值 + 标签 + 转化率，短竖线连接相邻行。

```css
.funnel-step {
  display: flex; align-items: center; gap: 12px; margin-bottom: 28px;
}
.funnel-value { font-size: 1.6em; font-weight: 800; line-height: 1; }
.funnel-label { font-size: 0.6em; color: var(--g500); letter-spacing: 0.1em; }
.funnel-rate { font-size: 0.6em; color: var(--g500); margin-left: auto; }
.funnel-connector {
  width: 40px; border-left: 1px solid var(--g200); height: 12px; margin-left: 10px;
}
```

### Progress Bars

水平进度条，label + 百分比。

```css
.progress-bar {
  background: var(--g100); border-radius: 8px; height: 14px;
  border: 1px solid var(--g200); overflow: hidden;
}
.progress-fill {
  background: linear-gradient(90deg, var(--clay), var(--clay-d));
  height: 100%; border-radius: 8px;
}
```

### Stacked Bar Segments

水平堆叠色条，用于预算分配/占比展示。

```html
<div style="display: flex; height: 20px; border-radius: 6px; overflow: hidden;">
  <div style="background: var(--clay); width: 26%;"></div>
  <div style="background: var(--clay-d); width: 20%;"></div>
  <div style="background: var(--g300); width: 15%;"></div>
  <div style="background: var(--olive); width: 13%;"></div>
</div>
```

配合图例使用：
```html
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
  <div style="display: flex; align-items: center; gap: 4px;">
    <div style="width: 8px; height: 8px; border-radius: 2px; background: var(--clay);"></div>
    <span style="font-size: 0.58em; color: var(--g500);">类别 A ¥2.9K</span>
  </div>
</div>
```

图表组件（趋势线、环形图、条形图、迷你图）见 `pattern-svg-charts.md`。

---

## 设计约束

1. **度量卡片 ≤ 6 个** — 太多则失去焦点，分组或折叠
2. **每张图表最多 2-3 种颜色** — 从 9 色 ramps 中选，不混用
3. **事件 ≤ 10 条** — 超出则折叠到 `<details>`
4. **首屏必须是度量卡片** — 数字先行，事件和详情后跟
5. **状态灯颜色与实际状态匹配** — 不能全绿掩盖问题
6. **图表标题用结论式** — 不说"趋势"，说"增长 15%"
7. **版心 ≤ 960px** — 不铺满屏幕
8. **自包含** — 无外部依赖，纯 vanilla

---

## JS 交互

```js
// 折叠区动画
document.querySelectorAll('details').forEach(el => {
  el.addEventListener('toggle', () => {
    // 可选：展开时 smooth scroll 到视口
  });
});

// 度量卡片 hover 效果由 CSS :hover 处理
// 图表 hover tooltip 由 SVG <title> 或 JS overlay 实现
```

---

## 反模式

- 不用仪表盘框架（Grafana/Metabase 嵌入）
- 不引入 Chart.js — 用内联 SVG
- 不编造数据 — 所有数字必须有来源
- 不用表格铺满整个页面 — 数据多了就折叠
