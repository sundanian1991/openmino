# Compiled SPEC -- 毅航全年达成率趋势

> 渲染契约。渲染技能 viz-echarts 按此执行。

---

## Page: 毅航年度达成率趋势

- **场景论文**：单图快速路径，趋势类时序数据
- **签名视觉元素**：平滑曲线 + 11月峰值标注 + 均值参考线
- **签名视觉元素 source id**：Custom

### 叙事意图

**【可视化目的】**
- 认知缺口：毅航全年达成率的走势和波动规律

**【想传达什么】**
- 毅航全年稳步上行，11月创年度新高 96.1%

**【结论】**
- 读者应得出：毅航达成率整体呈上升趋势，从1月88.1%持续攀升至11月96.1%，12月略有回落但仍处高位

**【思路】**
- 第一眼看趋势方向（上行） -> 第二眼看峰值标注（11月96.1%） -> 最终理解均值参考线（整体水位约92.6%）

### 视觉编码

- **X 轴编码**：月份（时序）
- **Y 轴编码**：达成率（百分比）
- **颜色编码**：单色 Warm #c26d3a 表示达成率曲线
- **大小编码**：无

### 数据组织

- **字段清单**：月份, 达成率
- **排序规则**：按月自然顺序
- **聚合规则**：无

### 标注策略

- **高亮点**：11月峰值（96.1%）
- **标注内容**：markPoint 标注年度最高点
- **基准线/参考线**：markLine 均值线（average）

### 布局

- **画布**：800 x 550
- **配色**：restrained-warm

---

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["月份", "达成率"],
    "rows": [
      { "月份": "1月", "达成率": 88.1 },
      { "月份": "2月", "达成率": 89.3 },
      { "月份": "3月", "达成率": 91.2 },
      { "月份": "4月", "达成率": 90.5 },
      { "月份": "5月", "达成率": 92.8 },
      { "月份": "6月", "达成率": 93.1 },
      { "月份": "7月", "达成率": 91.7 },
      { "月份": "8月", "达成率": 94.2 },
      { "月份": "9月", "达成率": 95.2 },
      { "月份": "10月", "达成率": 93.8 },
      { "月份": "11月", "达成率": 96.1 },
      { "月份": "12月", "达成率": 95.7 }
    ]
  },
  "mapping": {
    "x": "月份",
    "y": "达成率",
    "fill": null,
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_smooth",
      "aes": { "y": "达成率" },
      "params": { "color": "#c26d3a", "size": 2.5, "smooth": true },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": { "x": "11月", "y": 96.1, "label": "年度最高 96.1%" },
      "params": { "color": "#c26d3a", "fontSize": 12, "fontWeight": 700 },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_hline",
      "aes": { "yValue": 92.6, "label": "均值 92.6%" },
      "params": { "color": "#ada599", "dash": [6, 4] },
      "readerWeight": "light"
    }
  ],
  "scales": [
    { "aesthetic": "y", "type": "linear", "name": "达成率（%）" }
  ],
  "coord": { "type": "cartesian", "flip": false },
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": "#f2f0eb", "minor": false },
    "fontFamily": "system-ui, sans-serif",
    "titleSize": 16,
    "axisLabelSize": 11,
    "canvas": { "width": 800, "height": 550 }
  },
  "title": "毅航全年稳步上行，11月创年度新高 96.1%",
  "subtitle": "2026年1-12月 · 月度达成率（%）"
}
```
