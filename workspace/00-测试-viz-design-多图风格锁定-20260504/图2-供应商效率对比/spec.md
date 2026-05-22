# Compiled SPEC — 图2：毛毛虫人均产出领先，翰锐产能垫底

> 渲染契约。渲染技能（viz-echarts）按此执行。

---

## Page: 毛毛虫人均产出领先，翰锐产能垫底

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道哪家供应商效率最高

**【想传达什么】**
- 核心信息：毛毛虫 500 人团队跑出最高人均产出 52 万，规模不等于效率

**【结论】**
- 读者应得出的判断：中等规模供应商效率最优，大规模不必然高效

**【思路】**
- 视觉叙事路径：标题结论 → 横向排序阶梯 → 基准穿越 → 规模色暗示

### 视觉编码

- **X 轴编码**: 人均产出（万）
- **Y 轴编码**: 供应商名称（分类）
- **颜色编码**: 条形颜色深浅编码团队规模（深=大，浅=小）
- **大小编码**: 条形长度 = 人均产出

### 数据组织

- **字段清单**: 供应商, 人均产出, 团队规模
- **排序规则**: 按人均产出降序
- **聚合规则**: 无

### 标注策略

- **高亮点**（≤10%）：Top 1 毛毛虫、Bottom 1 翰锐
- **标注内容**：标注"人均产出最高"和"产能垫底"
- **基准线/参考线**：行业平均 36 万

### 布局

- **画布**: 700 × 450
- **配色**: color-themes #05 经济学人红

## 渲染契约 JSON（v2 ggplot2 分层）

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["供应商", "人均产出", "团队规模"],
    "rows": [
      { "供应商": "毛毛虫", "人均产出": 52, "团队规模": 500 },
      { "供应商": "毅航", "人均产出": 45, "团队规模": 800 },
      { "供应商": "伽玛", "人均产出": 38, "团队规模": 350 },
      { "供应商": "赛维斯", "人均产出": 30, "团队规模": 200 },
      { "供应商": "岐力", "人均产出": 28, "团队规模": 180 },
      { "供应商": "翰锐", "人均产出": 25, "团队规模": 150 }
    ]
  },
  "mapping": {
    "x": "人均产出",
    "y": "供应商",
    "fill": "团队规模",
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_bar",
      "aes": { "x": "人均产出", "y": "供应商", "fill": "团队规模" },
      "params": { "position": "stack", "width": 0.6 },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_vline",
      "aes": { "xintercept": 36 },
      "params": { "color": "#969696", "size": 1, "linetype": "dashed" },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 52, "y": "毛毛虫", "label": "人均产出最高" },
      "params": { "color": "#8B1A1A", "fontSize": 11 },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 25, "y": "翰锐", "label": "产能垫底" },
      "params": { "color": "#969696", "fontSize": 10 },
      "readerWeight": "light"
    }
  ],
  "scales": [
    { "aesthetic": "x", "type": "linear", "name": "人均产出（万元）", "min": 0, "max": 60 },
    { "aesthetic": "fill", "type": "manual", "values": ["#E09090", "#D07070", "#C05858", "#B84848", "#A03030", "#8B1A1A"] }
  ],
  "coord": { "type": "cartesian", "flip": true },
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": "#f3f4f6", "minor": false },
    "fontFamily": "system-ui, Helvetica Neue, Arial",
    "titleSize": 16,
    "axisLabelSize": 11,
    "canvas": { "width": 700, "height": 450 }
  },
  "title": "毛毛虫人均产出领先，翰锐产能垫底",
  "subtitle": "2026年Q4 | 人均产出 vs 团队规模 | 行业基准 36 万"
}
```
