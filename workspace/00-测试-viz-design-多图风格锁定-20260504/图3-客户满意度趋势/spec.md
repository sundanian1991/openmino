# Compiled SPEC — 图3：客户满意度与 FCI 正相关

> 渲染契约。渲染技能（viz-echarts）按此执行。

---

## Page: 客户满意度与 FCI 正相关

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道 FCI 和满意度的关系

**【想传达什么】**
- 核心信息：FCI 越高满意度越高，毅航双高领跑，翰锐双低掉队

**【结论】**
- 读者应得出的判断：提升 FCI 是改善满意度的有效杠杆

**【思路】**
- 视觉叙事路径：标题结论 → 趋势线 → 象限感知 → 异常标注

### 视觉编码

- **X 轴编码**: FCI 综合指数
- **Y 轴编码**: 客户满意度
- **颜色编码**: 按供应商着色，Warm ramp
- **大小编码**: 气泡大小 = 团队规模

### 数据组织

- **字段清单**: 供应商, FCI, 客户满意度, 团队规模
- **排序规则**: 无（散点图按数据位置）
- **聚合规则**: 无

### 标注策略

- **高亮点**（≤10%）：趋势线上最远偏离点（伽玛，满意度 75 vs 预期 70）
- **标注内容**：标注"超预期"
- **基准线/参考线**：X=72 中位 FCI 线 + Y=75 中位满意度线

### 布局

- **画布**: 600 × 500
- **配色**: color-themes #05 经济学人红

## 渲染契约 JSON（v2 ggplot2 分层）

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["供应商", "FCI", "客户满意度", "团队规模"],
    "rows": [
      { "供应商": "毅航", "FCI": 92, "客户满意度": 92, "团队规模": 800 },
      { "供应商": "毛毛虫", "FCI": 85, "客户满意度": 88, "团队规模": 500 },
      { "供应商": "伽玛", "FCI": 68, "客户满意度": 75, "团队规模": 350 },
      { "供应商": "赛维斯", "FCI": 55, "客户满意度": 68, "团队规模": 200 },
      { "供应商": "岐力", "FCI": 48, "客户满意度": 62, "团队规模": 180 },
      { "供应商": "翰锐", "FCI": 42, "客户满意度": 62, "团队规模": 150 }
    ]
  },
  "mapping": {
    "x": "FCI",
    "y": "客户满意度",
    "fill": null,
    "color": "供应商",
    "size": "团队规模"
  },
  "layers": [
    {
      "geom": "geom_rect",
      "aes": { "xmin": 72, "ymin": 75, "xmax": 100, "ymax": 100 },
      "params": { "fill": "#FFF0F0", "alpha": 0.3 },
      "readerWeight": "light"
    },
    {
      "geom": "geom_rect",
      "aes": { "xmin": 0, "ymin": 0, "xmax": 72, "ymax": 75 },
      "params": { "fill": "#f5f5f5", "alpha": 0.3 },
      "readerWeight": "light"
    },
    {
      "geom": "geom_smooth",
      "aes": { "x": "FCI", "y": "客户满意度" },
      "params": { "color": "#8B1A1A", "size": 2, "smooth": true, "method": "lm" },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_point",
      "aes": { "x": "FCI", "y": "客户满意度", "color": "供应商", "size": "团队规模" },
      "params": { "alpha": 0.8 },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 68, "y": 75, "label": "伽玛-超预期" },
      "params": { "color": "#6B8E6B", "fontSize": 10 },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_vline",
      "aes": { "xintercept": 72 },
      "params": { "color": "#969696", "size": 0.5, "linetype": "dashed" },
      "readerWeight": "light"
    },
    {
      "geom": "geom_hline",
      "aes": { "yintercept": 75 },
      "params": { "color": "#969696", "size": 0.5, "linetype": "dashed" },
      "readerWeight": "light"
    }
  ],
  "scales": [
    { "aesthetic": "x", "type": "linear", "name": "FCI 综合指数", "min": 0, "max": 100 },
    { "aesthetic": "y", "type": "linear", "name": "客户满意度", "min": 0, "max": 100 },
    { "aesthetic": "size", "type": "linear", "name": "团队规模", "min": 100, "max": 900 },
    { "aesthetic": "color", "type": "manual", "values": ["#8B1A1A", "#A03030", "#B84848", "#C05858", "#D07070", "#E09090"] }
  ],
  "coord": { "type": "cartesian", "flip": false },
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": "#f3f4f6", "minor": false },
    "fontFamily": "system-ui, Helvetica Neue, Arial",
    "titleSize": 16,
    "axisLabelSize": 11,
    "canvas": { "width": 600, "height": 500 }
  },
  "title": "客户满意度与 FCI 正相关",
  "subtitle": "2026年Q4 | 6 家供应商 | 虚线 = 中位值"
}
```
