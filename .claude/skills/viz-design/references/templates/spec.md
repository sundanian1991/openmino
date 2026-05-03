# Compiled SPEC — 可视化编译规格

> 渲染契约。渲染技能（viz-echarts/viz-svg-flow/viz-chart）按此执行。
> 每项标注 source id，出图后逐项验收。

---

## Page: [图名]

- **场景论文**：从 storyboard 继承
- **签名视觉元素**：从 storyboard 继承
- **签名视觉元素 source id**：DNA 案例 ID 或 Custom
- **为什么不能简化为默认模板**：

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：

**【想传达什么】**
- 核心信息（一句话）：

**【结论】**
- 读者应得出的判断：

**【思路】**
- 视觉叙事路径：第一眼 → 第二眼 → 最终理解

### 视觉编码

- **X 轴编码**：
- **Y 轴编码**：
- **颜色编码**：什么维度用什么色，为什么
- **大小编码**：什么维度用大小/形状
- **无坐标轴时**：说明视觉元素如何编码信息

### 数据组织

- **字段清单**：
- **排序规则**：
- **聚合规则**：
- **数据示例**（2-3 行）：

### 标注策略

- **高亮点**（≤10%）：
- **标注内容**（写原因+幅度，不写数字）：
- **基准线/参考线**：

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | | |
| 核心数据区 | | |
| 高亮元素 | | |
| 次要元素 | | |

### 布局

- **画布**：宽 × 高
- **标题区**：位置 + 字号（遵循 13-VISUALIZATION.md）
- **图表区**：位置 + 占比
- **标注区**：位置 + 规则
- **留白**：四周 ≥20px
- **配色**：主题编号 + 名称（引用 color-themes.md）

### 图例与辅助

- **图例**：需要/不需要，位置，内容
- **脚注**：数据来源、样本量
- **特殊说明**：

## Source ID 清单

> 每个视觉决策必须有出处。

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | | SKILL.md §五 | |
| 风格选择 | | style-schools.md | |
| 配色选择 | | color-themes.md | |
| 构图选择 | | composition-templates.md | |
| 字体选择 | | typography-moods.md | |
| DNA 参考 | | chart-dna-db.md | |

## 渲染委托

> 根据模式选择渲染技能，附上委托指令模板。

**渲染技能**：viz-echarts / viz-svg-flow / viz-chart

```
委托指令：
"用 [渲染技能] 渲染以下 SPEC：
- 模式：[编号-名称]
- 标题：[结论性标题]
- 数据字段：[清单]
- 高亮：[标注策略]
- 标注：[具体标注内容]
- 画布：[尺寸]
请遵循 13-VISUALIZATION.md 配色规范。"
```

## 渲染契约 JSON（机器可读）

> **强制字段**。每张图必须在 spec.md 末尾附带此 JSON 块。
> 下游渲染技能（viz-echarts / viz-svg-flow）直接消费此 JSON，不再从自然语言中翻译。
> 多图场景下，所有图共享同一个 `globalStyle` 对象。
> **viz-design 绝不自己写渲染代码，必须通过渲染契约 JSON 委托。**
> 
> **版本策略**：v2（ggplot2 分层）为首选格式。v1 格式仍兼容（渲染管线自动转 v2）。

### v2 格式（ggplot2 分层，首选）

> 7 层独立声明，渲染端零猜测。每种图表 = 数据 + 映射 + 几何图层 + 标度 + 分面 + 坐标系 + 主题的组合。

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
    "fill": null,
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_bar",
      "aes": { "y": "GDP_万亿" },
      "params": { "color": "#6b7280", "position": "dodge" }
    },
    {
      "geom": "geom_line",
      "aes": { "y": "增速__pct" },
      "params": { "color": "#c26d3a", "size": 2, "smooth": false }
    },
    {
      "geom": "geom_label",
      "aes": { "x": "2021", "y": 114.9, "label": "新高" },
      "params": { "color": "#c26d3a", "fontSize": 11 }
    }
  ],
  "scales": [
    { "aesthetic": "y", "type": "linear", "name": "GDP（万亿人民币）" },
    { "aesthetic": "y", "type": "linear", "name": "增速（%）", "secondary": true },
    { "aesthetic": "color", "type": "manual", "values": ["#6b7280", "#c26d3a"] }
  ],
  "coord": { "type": "cartesian", "flip": false },
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

### v2 字段说明

#### layers（几何图层）

| geom | 描述 | ECharts 映射 |
|------|------|-------------|
| `geom_bar` | 柱状/条形图 | `type: "bar"` |
| `geom_point` | 散点 | `type: "scatter"` |
| `geom_line` | 折线（不平滑） | `type: "line", smooth: false` |
| `geom_smooth` | 平滑曲线 | `type: "line", smooth: true` |
| `geom_area` | 面积图 | `type: "line", areaStyle: {...}` |
| `geom_label` | 标注文本 | `scatter + label` 或 `markPoint` |
| `geom_hline` | 水平参考线 | `markLine` (yAxis) |
| `geom_vline` | 垂直参考线 | `markLine` (xAxis) |
| `geom_rect` | 高亮区域 | `markArea` |

常见 params：`position` ("dodge"/"stack"/"identity")、`color`、`size`、`smooth`、`width`。

#### scales（标度）

| scale type | 说明 | ECharts 映射 |
|------------|------|-------------|
| `linear` | 线性刻度 | `type: "value"` |
| `log` | 对数刻度 | `type: "value", logBase: 10` |
| `manual` | 手动指定色值 | `itemStyle.color` |

`secondary: true` 时映射到 `yAxis[1]`，天然支持双轴。

#### coord（坐标系）

| type | 说明 | ECharts 映射 |
|------|------|-------------|
| `cartesian` | 直角坐标 | 默认 |
| `polar` | 极坐标 | `polar` + `radar` |
| `flip` | 翻转XY（水平条形） | `xAxis.type="value"` + `yAxis.type="category"` |

#### facet（分面，可选）

```json
"facet": { "type": "wrap", "by": "category_column", "ncol": 2, "scales": "fixed" }
```

`null` 表示不分面。

### v1 格式（兼容，自动转 v2）

> 新图优先用 v2。v1 格式仍可接受，渲染管线自动转换。

### 单图场景（v1）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "radar_chart",
  "title": "结论性标题（不是描述）",
  "subtitle": "时间范围 + 对象",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["维度1", "维度2", "维度3", "维度4", "维度5"],
    "series": [
      { "name": "毅航", "values": [92, 88, 75, 90, 82], "highlight": true },
      { "name": "基准", "values": [77, 77, 77, 77, 77], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "毅航", "color": "#c26d3a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "综合得分 92，超基准 15 分", "target": "毅航-维度1" }
  ],
  "referenceLines": [
    { "type": "circle", "label": "行业基准线", "style": { "color": "#ada599", "dash": [6, 4] } }
  ],
  "theme": "default",
  "layout": {
    "titlePosition": "top",
    "chartArea": "center",
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```

### 多图场景（全局风格锁定 + 多图数组）

> **Phase 0 先锁定 globalStyle**，后续每张图从全局继承，不再各自 hash。

```json
{
  "version": "viz-design-spec-v1",
  "globalStyle": {
    "colorRamps": ["Warm", "Stone"],
    "palette": {
      "primary": "#c26d3a",
      "secondary": "#857d74",
      "accent": "#2e8b6e",
      "title": "#6b3410",
      "subtitle": "#857d74",
      "axis": "#ada599",
      "grid": "#f2f0eb",
      "bg": "#faf9f7"
    },
    "typography": {
      "title": { "size": 16, "weight": 600 },
      "subtitle": { "size": 11, "weight": 400 },
      "axisLabel": { "size": 11, "weight": 400 },
      "annotation": { "size": 11, "weight": 600 },
      "footnote": { "size": 10, "weight": 400 }
    },
    "spacing": {
      "cardPadding": 16,
      "titleToContent": 12,
      "cardGap": 12
    },
    "cornerRadius": 10,
    "styleSchool": "restrained-warm"
  },
  "charts": [
    {
      "chartId": "chart-1",
      "renderTarget": "viz-echarts",
      "chartType": "radar_chart",
      "title": "毅航健康度全面领先",
      "subtitle": "2026年Q1 · 金条头部供应商",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["达成率", "峰值比", "效率", "FCI", "流失率"],
        "series": [
          { "name": "毅航", "values": [92, 88, 75, 90, 82], "highlight": true }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "毅航", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 } }
    },
    {
      "chartId": "chart-2",
      "renderTarget": "viz-echarts",
      "chartType": "bar_chart",
      "title": "3 家供应商低于基准线",
      "subtitle": "2026年Q1 · 综合评分",
      "canvas": { "width": 700, "height": 400 },
      "data": {
        "fields": ["供应商", "综合评分"],
        "series": [
          { "name": "毅航", "values": [92], "highlight": true },
          { "name": "伽玛", "values": [65], "highlight": false },
          { "name": "赛维斯", "values": [58], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "毅航", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "低于清退阈值", "target": "赛维斯" }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 } }
    }
  ]
}
```

### JSON 字段说明

| 层级 | 字段 | 必填 | 说明 |
|------|------|------|------|
| `globalStyle` | 全局风格 | **多图必填** | 多图共享，单图可选填 |
| `globalStyle.colorRamps` | 色阶列表 | **是** | ≤2，如 `["Warm", "Stone"]` |
| `globalStyle.palette` | 色值映射 | **是** | 每个角色对应一个 hex |
| `globalStyle.typography` | 字号字重 | **是** | 遵循 13-VISUALIZATION.md |
| `renderTarget` | 渲染技能 | **单图必填** | `viz-echarts` / `viz-svg-flow` / `viz-chart` |
| `chartType` | 图表类型 | **是** | 对应渲染技能的 tool 名 |
| `charts[]` | 图表数组 | **多图必填** | 单图用 renderTarget 顶层，多图用 charts 数组 |
| `charts[].chartId` | 图 ID | **是** | `chart-1`, `chart-2`… |
| `charts[].data.series` | 数据系列 | **是** | 每个系列含 name/values/highlight |
| `charts[].visualEncoding.highlight` | 高亮规则 | **是** | 明确哪条数据高亮，用什么色 |
| `charts[].visualEncoding.grayscale` | 灰化标记 | **是** | true = 非高亮元素用 Stone 300 |
| `charts[].annotations` | 标注列表 | 否 | 无标注时写空数组 `[]` |
| `charts[].referenceLines` | 参考线 | 否 | 基准线/阈值线 |

### JSON Schema 硬约束（Phase 3 自检必过）

> **以下规则必须 100% 通过，不通过 = 重写 JSON，不得输出。**

| 规则 | 正确写法 | 错误写法 |
|------|----------|----------|
| series 数据值 | `"values": [1, 2, 3]` 数组 | `"value": 1` 单值 |
| 灰度标记 | `"grayscale": true` | `"grayscale": false` |
| 高亮比例 | `"maxHighlightRatio": 0.1`（≤0.1） | `0.15`, `0.3` 等超标值 |
| highlight 格式 | `[{ "series": "A", "color": "#c26d3a" }]` | `["A", "B"]` 字符串数组 |
| 禁止字段 | 仅保留 schema 定义的字段 | 混入 `lineColor`/`yAxis`/`xAxis`/`footer`/`showArea`/`showPoints`/`share`/`yoy`/`note` |
