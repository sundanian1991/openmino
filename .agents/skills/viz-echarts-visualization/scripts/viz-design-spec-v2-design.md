# viz-design-spec-v2 — ggplot2 分层渲染契约

> 当前版本：v1 是声明式（chartType 隐式决定一切）
> v2 是组合式（7 层独立，每层可独立替换，渲染端零猜测）

---

## v1 vs v2 对比

| 维度 | v1（当前） | v2（ggplot2 分层） |
|------|-----------|-------------------|
| **抽象层级** | "画一张柱状图" | "用这些数据 → 映射 X/Y → 画 bar → 加坐标 → 加主题" |
| **渲染猜测** | 需要根据 chartType 猜 geom/coord/scale | 每层明确，零猜测 |
| **扩展性** | 新增图表类型 = 新增 if 分支 | 新增 = 新 geom 组合，不改核心逻辑 |
| **dual_axis** | v1 需要独立分支处理 | 两个 geom + 两个 scale_y，天然支持 |
| **散点高亮** | v1 用 highlight 字段 | 两个 geom_point（灰+彩）叠加，自然分离 |
| **stack** | v1 靠 chartType 隐含 | position="stack" 显式声明 |

---

## JSON 规格

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["年份", "GDP_万亿", "增速__pct"],
    "rows": [
      { "年份": "2020", "GDP_万亿": 101.4, "增速__pct": 2.3 },
      { "年份": "2021", "GDP_万亿": 114.9, "增速__pct": 8.6 }
    ]
  },
  "mapping": {
    "x": "年份",
    "y": "GDP_万亿",
    "fill": "series_name",
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_bar",
      "aes": { "y": "GDP_万亿" },
      "params": { "position": "dodge", "width": 0.8 }
    },
    {
      "geom": "geom_line",
      "aes": { "y": "增速__pct" },
      "params": { "color": "#c26d3a", "size": 2, "smooth": false }
    },
    {
      "geom": "geom_label",
      "aes": { "x": "2021", "y": 114.9, "label": "历史新高" },
      "params": { "color": "#c26d3a", "fontSize": 11 }
    }
  ],
  "scales": [
    { "aesthetic": "y", "type": "linear", "name": "GDP（万亿人民币）" },
    { "aesthetic": "y", "type": "linear", "name": "增速（%）", "secondary": true },
    { "aesthetic": "fill", "type": "manual", "values": ["#c26d3a", "#6b7280", "#8b95a5"] }
  ],
  "coord": {
    "type": "cartesian",
    "flip": false,
    "xlim": null,
    "ylim": null
  },
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": "#f3f4f6", "minor": false },
    "fontFamily": "system-ui",
    "titleSize": 16,
    "axisLabelSize": 10,
    "canvas": { "width": 800, "height": 550 }
  },
  "title": "增长引擎切换：服务业占比突破56%",
  "subtitle": "2015-2024 | GDP从70.3万亿增至134.9万亿人民币"
}
```

---

## 各层定义

### ① data

```json
"data": {
  "type": "rows",
  "fields": ["列名1", "列名2", ...],
  "rows": [{ "列名1": 值, "列名2": 值 }, ...]
}
```

或用 series 格式（兼容 v1）：

```json
"data": {
  "type": "series",
  "fields": ["X轴", "数值"],
  "series": [{ "name": "系列A", "values": [1,2,3] }]
}
```

### ② mapping（aes）

| 字段 | 含义 | ECharts 映射 |
|------|------|-------------|
| x | X 轴映射的列名 | xAxis.data |
| y | Y 轴主映射 | yAxis + series[].data |
| fill | 填充色分组 | series 分组 + itemStyle.color |
| color | 边框色/线条色 | lineStyle.color |
| size | 大小映射 | symbolSize / bar width |

**null 表示不映射**。不映射的维度不参与渲染。

### ③ layers（geom 叠加）

| geom | 描述 | ECharts type |
|------|------|-------------|
| geom_bar | 柱状图 | bar |
| geom_point | 散点 | scatter |
| geom_line | 折线 | line (smooth=false) |
| geom_smooth | 平滑线 | line (smooth=true) |
| geom_area | 面积图 | line + areaStyle |
| geom_label | 标注文本 | markPoint / scatter + label |
| geom_hline | 水平参考线 | markLine (yAxis) |
| geom_vline | 垂直参考线 | markLine (xAxis) |
| geom_rect | 高亮区域 | markArea |
| geom_ribbon | 置信区间 | line + areaStyle（低透明度） |

每层可带 params 覆盖默认行为：

```json
{ "geom": "geom_bar", "aes": { "y": "GDP" }, "params": { "position": "stack" } }
```

常见 params：

| 参数 | 可选值 | 说明 |
|------|--------|------|
| position | "dodge" / "stack" / "identity" | 柱子排列方式 |
| color | "#hex" | 颜色覆盖 |
| size | number | 线条粗细/点大小 |
| smooth | boolean | 是否平滑 |
| width | number | 柱子宽度比例 |

### ④ scales

```json
"scales": [
  { "aesthetic": "y", "type": "linear", "name": "值" },
  { "aesthetic": "y", "type": "log", "base": 10, "name": "值(对数)" },
  { "aesthetic": "y", "type": "linear", "name": "次要轴", "secondary": true },
  { "aesthetic": "fill", "type": "manual", "values": ["#c26d3a", "#6b7280"] }
]
```

| scale type | 说明 | ECharts 映射 |
|------------|------|-------------|
| linear | 线性刻度 | type: "value" |
| log | 对数刻度 | type: "value", logBase |
| manual | 手动指定色值 | itemStyle.color |

`secondary: true` 时映射到 yAxis[1]，天然支持双轴。

### ⑤ facet

```json
"facet": {
  "type": "wrap",
  "by": "category_column",
  "ncol": 2,
  "scales": "fixed"
}
```

| 字段 | 含义 |
|------|------|
| type | "wrap"（包裹排列）/ "grid"（行列网格） |
| by | 分面列名 |
| ncol / nrow | 列数/行数 |
| scales | "fixed"（统一刻度）/ "free"（独立刻度） |

ECharts 映射：多 grid 布局 + dataset filter。

### ⑥ coord

```json
"coord": { "type": "cartesian", "flip": true }
```

| type | 说明 | ECharts 映射 |
|------|------|-------------|
| cartesian | 直角坐标 | 默认 |
| polar | 极坐标 | polar + radar |
| flip | 翻转XY（水平条形） | xAxis.type="value" + yAxis.type="category" |

### ⑦ theme

```json
"theme": {
  "palette": "restrained-warm",
  "background": "#ffffff",
  "grid": { "major": "#f3f4f6", "minor": false },
  "fontFamily": "system-ui",
  "titleSize": 16,
  "axisLabelSize": 10,
  "canvas": { "width": 800, "height": 550 }
}
```

---

## v1 → v2 转换规则（自动）

渲染管线应同时支持 v1 和 v2。v1 输入时自动转 v2：

| v1 字段 | → v2 层 |
|---------|---------|
| chartType: "bar_chart" | layers: [{geom: "geom_bar"}] + coord: {flip: true} |
| chartType: "line_chart" | layers: [{geom: "geom_smooth"}] |
| chartType: "scatter_chart" | layers: [{geom: "geom_point"}] |
| chartType: "dual_axis" | layers: [{geom: "geom_bar"}, {geom: "geom_line"}] + scales: [..., {secondary: true}] |
| chartType: "area_chart" | layers: [{geom: "geom_area"}] |
| chartType: "stacked_bar" | layers: [{geom: "geom_bar", params: {position: "stack"}}] |
| visualEncoding.highlight | scales: [{aesthetic: "color", type: "manual"}] |
| visualEncoding.xAxisLog | scales: [{aesthetic: "x", type: "log"}] |
| annotations | layers: [{geom: "geom_label"}, ...] |
| canvas | theme.canvas |

---

## 为什么用 ggplot2 分层

1. **零猜测**：渲染端不需要猜 "chartType=stacked_bar 意味着什么"，geom+position 已经说清楚了
2. **组合而非枚举**：新增图表类型 = 新 geom 组合，不需要改渲染管线的 if/else 链
3. **标注原生**：geom_label/geom_hline 是图层的一部分，不是 annotations 外挂
4. **双轴天然**：两个 scale_y + secondary: true，不需要独立 dual_axis 分支
5. **可扩展**：未来加 facet_wrap（多子图）只需要 facet 层，不破坏现有渲染逻辑
