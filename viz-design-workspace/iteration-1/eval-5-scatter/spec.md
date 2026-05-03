# Compiled SPEC — 供应商效率 vs 成本散点图

> 渲染契约。渲染技能（viz-echarts/viz-svg-flow/viz-chart）按此执行。
> 每项标注 source id，出图后逐项验收。

---

## Page: 供应商效率-成本散点矩阵

- **场景论文**：散点洞察（Opening Archetype #09）
- **签名视觉元素**：四象限分区 + 标杆点 Warm 高亮 + 象限标签
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要四象限参考线 + 双系列颜色编码 + 标杆标注

### 叙事意图

**【可视化目的】**
- 认知缺口：12 家供应商中谁高效低成本（标杆）、谁低效高成本（需整改）

**【想传达什么】**
- 核心信息：D、L 是高效低成本标杆，E、C 是低效高成本需整改对象

**【结论】**
- 读者应得出的判断：供应商可按效率-成本分为四象限，标杆可复制，整改有目标

**【思路】**
- 视觉叙事路径：第一眼（Warm 色标杆 D、L）→ 第二眼（四象限分布全貌）→ 最终理解（石色点群中 C、E 位置最差）

### 视觉编码

- **X 轴编码**：效率（efficiency），范围 65-100
- **Y 轴编码**：成本（cost），范围 65-100，越高=成本越高
- **颜色编码**：标杆供应商（D、L）用 Warm #c26d3a，其余用 Stone #857d74
- **大小编码**：标杆点 symbolSize 16，常规点 8

### 数据组织

- **字段清单**：supplier（类别）, efficiency（数值）, cost（数值）, series（类别：标杆/常规）
- **排序规则**：无（散点无排序）
- **聚合规则**：无
- **数据示例**：D(95,80,标杆), A(92,85,常规), L(94,68,标杆)

### 标注策略

- **高亮点**（≤10%）：D、L 两点（2/12，标杆识别场景可接受）
- **标注内容**：D 标注"D标杆：效率最高95"，L 标注"L标杆：成本最低68"
- **基准线/参考线**：x=85 垂直线，y=80 水平线，划分四象限

### 视觉权重（读者视角）

- **主角元素**（hero）：D、L 散点 → symbolSize:16 / color:#c26d3a / 有 label
- **上下文元素**（medium）：四象限参考线 → 虚线灰色 / 象限标签文字
- **背景元素**（light）：其余 10 个散点 → color:#857d74 / symbolSize:8 / 无标注

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 结论性，Warm 色 | 一眼传达核心判断 |
| 标杆散点 | Warm #c26d3a, symbolSize 16, 有 label | 最先吸引注意力 |
| 四象限线 | 灰色虚线 | 建立坐标系分区 |
| 常规散点 | Stone #857d74, symbolSize 8 | 背景参照，不抢戏 |
| 象限标签 | 小字号灰色 | 辅助理解分区含义 |

### 布局

- **画布**：900 × 550
- **标题区**：顶部，字号 16
- **图表区**：居中，left:80, right:40, top:80, bottom:60
- **标注区**：标杆点右上方 label
- **留白**：四周 ≥20px
- **配色**：restrained-warm（Warm + Stone 双色）

### 图例与辅助

- **图例**：需要，右上角，显示"标杆供应商"和"常规供应商"
- **脚注**：12 家供应商 · 效率与成本评分（0-100）
- **特殊说明**：X 轴向右效率递增，Y 轴向上成本递增（低成本更佳）

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | #09 散点洞察 | opening-archetypes.md | 两变量关系 + 异常值识别 |
| 配色选择 | restrained-warm | 13-VISUALIZATION.md | Warm 高亮 + Stone 背景 |
| 高亮比例 | maxHighlightRatio: 0.1 | spec-template.md | 标杆 2 点 |

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["supplier", "efficiency", "cost", "series"],
    "rows": [
      { "supplier": "A", "efficiency": 92, "cost": 85, "series": "常规" },
      { "supplier": "B", "efficiency": 88, "cost": 72, "series": "常规" },
      { "supplier": "C", "efficiency": 78, "cost": 90, "series": "常规" },
      { "supplier": "D", "efficiency": 95, "cost": 80, "series": "标杆" },
      { "supplier": "E", "efficiency": 70, "cost": 95, "series": "常规" },
      { "supplier": "F", "efficiency": 85, "cost": 78, "series": "常规" },
      { "supplier": "G", "efficiency": 82, "cost": 88, "series": "常规" },
      { "supplier": "H", "efficiency": 91, "cost": 75, "series": "常规" },
      { "supplier": "I", "efficiency": 73, "cost": 82, "series": "常规" },
      { "supplier": "J", "efficiency": 89, "cost": 70, "series": "常规" },
      { "supplier": "K", "efficiency": 76, "cost": 92, "series": "常规" },
      { "supplier": "L", "efficiency": 94, "cost": 68, "series": "标杆" }
    ]
  },
  "mapping": {
    "x": "efficiency",
    "y": "cost",
    "fill": "series",
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_point",
      "aes": { "y": "cost" },
      "params": { "size": 8 },
      "readerWeight": "light"
    },
    {
      "geom": "geom_vline",
      "aes": { "xValue": 85, "label": "效率线" },
      "params": { "color": "#ada599", "dash": true }
    },
    {
      "geom": "geom_hline",
      "aes": { "yValue": 80, "label": "成本线" },
      "params": { "color": "#ada599", "dash": true }
    },
    {
      "geom": "geom_label",
      "aes": { "x": 95, "y": 84, "label": "D: 效率最高95" },
      "params": { "color": "#c26d3a", "fontSize": 11, "fontWeight": 600 },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 94, "y": 64, "label": "L: 成本最低68" },
      "params": { "color": "#c26d3a", "fontSize": 11, "fontWeight": 600 },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 70, "y": 99, "label": "E 低效高成本" },
      "params": { "color": "#857d74", "fontSize": 10, "fontWeight": 400 },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 78, "y": 94, "label": "C 低效高成本" },
      "params": { "color": "#857d74", "fontSize": 10, "fontWeight": 400 },
      "readerWeight": "medium"
    }
  ],
  "scales": [
    { "aesthetic": "x", "type": "linear", "name": "效率", "min": 65, "max": 100 },
    { "aesthetic": "y", "type": "linear", "name": "成本", "min": 65, "max": 100 },
    { "aesthetic": "fill", "type": "manual", "values": ["#c26d3a", "#857d74"] }
  ],
  "coord": { "type": "cartesian", "flip": false },
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": "#f3f4f6", "minor": false },
    "fontFamily": "system-ui",
    "titleSize": 16,
    "axisLabelSize": 11,
    "canvas": { "width": 900, "height": 550 }
  },
  "title": "D、L 高效低成本是标杆，E、C 低效高成本需整改",
  "subtitle": "12 家供应商 · 效率 vs 成本评分（0-100）· 四象限分析"
}
```
