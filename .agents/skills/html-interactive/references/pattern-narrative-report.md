# pattern-narrative-report — 数据解读/市场报告

> 适用于：业绩分析、市场报告、数据解读、调研结论等"文字叙事 + 数据穿插"内容。
> 核心理念：数据不是孤立展示，而是嵌入叙事流，让读者"顺着故事理解数据"。

---

## 页面结构

```
<header>           标题 + 摘要 + 核心结论指标（2-3 个大数字）
<section.narrative> 叙事主体 — 段落 + 内联迷你图 + 趋势标签
<section.data>     数据支撑 — 图表 + 表格（折叠）
<footer>           方法论说明 + 数据来源
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
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="report-header">
    <h1>${标题}</h1>
    <p class="report-summary">${2-3 句摘要，clay 左标记条}</p>
    <div class="hero-metrics">
      <div class="hero-metric">
        <span class="hero-value" data-entity="value" data-origin="${原始值}">${显示值}</span>
        <span class="hero-delta" data-assessment="${positive|negative}">${变化}</span>
        <span class="hero-label">${指标名}</span>
      </div>
      <!-- 2-3 个核心指标 -->
    </div>
  </header>

  <article class="narrative">
    <section class="narrative-block">
      <h2>${章节标题}</h2>
      <p>...文本段落，关键数据用语义标注包裹...</p>
      <!-- 内联迷你图 -->
      <p>...继续叙事...</p>
    </section>
    <!-- 更多章节 -->
  </article>

  <section class="data-section">
    <details>
      <summary>完整数据</summary>
      <!-- 图表 + 表格 -->
    </details>
  </section>

  <footer class="report-footer">
    <p class="data-source">数据来源：${来源}</p>
    <p class="methodology">统计口径：${说明}</p>
  </footer>
</body>
</html>
```

---

## 语义标注系统

> 与 SKILL.md "数据报告语义标注" 章节对应，在 HTML 中用 `data-entity` 属性标注。

### 标注类型

| 类型 | 属性 | 示例 |
|------|------|------|
| 指标名 | `data-entity="metric"` | 营收、市场份额 |
| 数值 | `data-entity="value" data-origin="1500000"` | ¥1.5M |
| 变化 | `data-entity="delta" data-assessment="positive"` | +15% |
| 趋势 | `data-entity="trend" data-assessment="negative"` | 持续下滑 |
| 时间 | `data-entity="time"` | Q3 2024 |
| 维度 | `data-entity="dimension"` | 北美市场 |
| 异常 | `data-entity="anomaly"` | 意外暴跌 |

### HTML 用法

```html
<p>
  <span data-entity="time">2024年Q3</span>，
  <span data-entity="metric">营收</span>
  达到
  <span data-entity="value" data-origin="1500000">¥1.5M</span>，
  <span data-entity="delta" data-assessment="positive">同比增长 15%</span>，
  呈现
  <span data-entity="trend" data-assessment="positive">稳中有升</span>态势。
</p>
```

### CSS 样式

```css
[data-entity="metric"] { font-weight: 600; }
[data-entity="value"] {
  color: var(--clay); font-family: var(--mono);
  font-weight: 600;
}
[data-entity="delta"] { font-weight: 600; }
[data-assessment="positive"] { color: var(--olive); }
[data-assessment="negative"] { color: #D94848; }
[data-entity="time"] {
  font-family: var(--mono); font-size: 0.9em;
  color: var(--g700);
}
[data-entity="dimension"] {
  background: var(--g100); padding: 1px 6px;
  border-radius: 3px; font-size: 0.9em;
}
[data-entity="anomaly"] {
  background: rgba(226, 75, 74, 0.08); border-left: 3px solid #D94848;
  padding: 1px 6px; border-radius: 0 3px 3px 0;
}
```

---

## 内联迷你图

叙事段落中嵌入小型趋势图，紧跟在相关数据后面。

```html
<span class="inline-spark">
  <svg width="70" height="22" viewBox="0 0 70 22">
    <polyline points="${计算点}" fill="none"
      stroke="var(--olive)" stroke-width="1.5"/>
    <!-- 趋势点 -->
    <circle cx="${最后一个x}" cy="${最后一个y}" r="2.5"
      fill="var(--olive)"/>
  </svg>
  <span class="spark-label">${趋势值}</span>
</span>
```

```css
.inline-spark {
  display: inline-flex; align-items: center; gap: 4px;
  vertical-align: middle; margin: 0 2px;
}
.spark-label {
  font-family: var(--mono); font-size: 0.75em;
  color: var(--g500);
}
```

---

## 趋势指标标签

段落结尾或侧边放置趋势指标卡片。

```html
<div class="trend-badge" data-assessment="positive">
  <span class="trend-arrow">▲</span>
  <span class="trend-value">+15%</span>
  <span class="trend-desc">同比增长</span>
</div>
```

```css
.trend-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 6px;
  font-size: 0.8em; font-weight: 600;
}
.trend-badge[data-assessment="positive"] {
  background: rgba(120, 140, 93, 0.1); color: var(--olive);
}
.trend-badge[data-assessment="negative"] {
  background: rgba(226, 75, 74, 0.08); color: #D94848;
}
.trend-badge[data-assessment="neutral"] {
  background: var(--g100); color: var(--g500);
}
```

---

## 叙事布局

```css
.narrative {
  max-width: 960px; margin: 0 auto;
  padding: 0 48px;
}
.narrative-block {
  margin-bottom: 3em;
}
.narrative-block h2 {
  font-size: 1.3em; color: var(--slate);
  margin-bottom: 0.8em;
  padding-bottom: 0.4em;
  border-bottom: 1px solid var(--g200);
}
.narrative-block p {
  font-size: 1em; line-height: 1.8;
  color: var(--g700); margin-bottom: 1.5em;
}

/* 摘要区 */
.report-summary {
  border-left: 3px solid var(--clay);
  padding-left: 16px; margin: 1.5em 0;
  font-size: 1.05em; line-height: 1.7;
  color: var(--g700);
}

/* Hero 指标 */
.hero-metrics {
  display: flex; gap: 24px;
  margin: 2em 0; flex-wrap: wrap;
}
.hero-metric {
  display: flex; flex-direction: column;
  padding: 16px 24px;
  background: var(--g100); border-radius: 10px;
  min-width: 160px;
}
.hero-value {
  font-size: 2em; font-weight: 800;
  font-family: var(--mono); color: var(--slate);
}
.hero-delta { font-size: 0.8em; font-weight: 600; }
.hero-label { font-size: 0.75em; color: var(--g500); margin-top: 4px; }
```

---

## 完整数据区

叙事中的图表和详细数据放在 `<details>` 折叠区：

```html
<details class="data-details">
  <summary>查看完整数据与图表</summary>
  <div class="data-grid">
    <!-- 图表：复用 pattern-svg-charts.md 模板 -->
    <figure class="chart"><!-- SVG 图表 --></figure>
    <!-- 表格 -->
    <table class="data-table"><!-- 数据 --></table>
  </div>
</details>
```

```css
.data-details {
  border: 1px solid var(--g200); border-radius: 10px;
  padding: 16px; margin: 2em 0;
}
.data-details summary {
  cursor: pointer; font-weight: 600;
  color: var(--clay); font-size: 0.9em;
}
.data-grid {
  margin-top: 1em;
  display: grid; gap: 2em;
}
.data-table {
  width: 100%; border-collapse: collapse;
  font-size: 0.85em;
}
.data-table th {
  text-align: left; padding: 8px 12px;
  border-bottom: 2px solid var(--g200);
  font-weight: 600; color: var(--g700);
}
.data-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--g100);
}
```

---

## 设计约束

1. **叙事优先，数据支撑** — 段落是主体，图表和迷你图是辅助，不是反过来
2. **每个数据点必须有语义标注** — `data-entity` 属性全覆盖
3. **迷你图 ≤ 3 个/段落** — 不让图表淹没文字
4. **结论式标题** — "营收增长 15%"而非"营收分析"
5. **摘要 ≤ 3 句** — 第一屏就要让读者知道核心结论
6. **数据来源必须标注** — footer 中注明出处和口径
7. **版心 ≤ 960px** — 阅读舒适度优先
8. **自包含** — 无外部依赖，纯 vanilla

---

## 与委派技能的关系

当报告需要更复杂的可视化时：
- **多维交叉分析表** → 委派 `viz-antv-s2-expert`
- **T8 语法数据叙事** → 委派 `viz-narrative-text`

本模式负责简单的内联 SVG 迷你图和语义标注，复杂场景走委派链。

---

## 反模式

- 不把报告做成仪表盘 — 这是叙事，不是看板
- 不堆砌图表 — 每个图表必须服务于叙事论点
- 不省略数据来源 — "内部数据"不是来源
- 不编造数据 — 所有数值必须来自用户提供的材料
- 不用饼图超过 3 片 — 改用条形图
