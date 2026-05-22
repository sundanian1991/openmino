# Compiled SPEC — 图4：3 家供应商低于健康阈值

> 渲染契约。渲染技能（viz-svg-flow）按此执行。
> 模式 38 属于 31-48（结构关系），渲染走 viz-svg-flow。

---

## Page: 3 家供应商低于健康阈值

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道哪些供应商有风险，风险等级如何

**【想传达什么】**
- 核心信息：岐力和翰锐低于 60 分健康阈值，需要立即干预

**【结论】**
- 读者应得出的判断：2 家高危供应商需要优先处理

**【思路】**
- 视觉叙事路径：标题问题声明 → 红绿灯分区 → 排名阶梯 → 风险标注

### 视觉编码

- **X 轴编码**: 综合健康度评分（0-100）
- **Y 轴编码**: 供应商名称（分类）
- **颜色编码**: 背景区分为绿（≥80）/黄（60-79）/红（<60）三色
- **大小编码**: 进度条长度 = 评分

### 数据组织

- **字段清单**: 供应商, 综合健康度
- **排序规则**: 按综合健康度降序
- **聚合规则**: 综合健康度 = (达成率*0.3 + 人均产出标准化*0.25 + 满意度*0.25 + FCI*0.2)

### 数据计算

综合健康度计算（0-100 归一化）：
- 毅航: (97*0.3 + 45/52*100*0.25 + 92*0.25 + 92*0.2) = 29.1 + 21.6 + 23.0 + 18.4 = **92.1**
- 毛毛虫: (90*0.3 + 52/52*100*0.25 + 88*0.25 + 85*0.2) = 27.0 + 25.0 + 22.0 + 17.0 = **91.0**
- 伽玛: (70*0.3 + 38/52*100*0.25 + 75*0.25 + 68*0.2) = 21.0 + 18.3 + 18.75 + 13.6 = **71.7**
- 赛维斯: (65*0.3 + 30/52*100*0.25 + 68*0.25 + 55*0.2) = 19.5 + 14.4 + 17.0 + 11.0 = **61.9**
- 岐力: (58*0.3 + 28/52*100*0.25 + 62*0.25 + 48*0.2) = 17.4 + 13.5 + 15.5 + 9.6 = **56.0**
- 翰锐: (45*0.3 + 25/52*100*0.25 + 62*0.25 + 42*0.2) = 13.5 + 12.0 + 15.5 + 8.4 = **49.4**

### 标注策略

- **高亮点**（≤10%）：岐力、翰锐（红色区域）
- **标注内容**：标注"需立即干预"和"持续低于阈值"
- **基准线/参考线**：60 分（红黄分界）、80 分（黄绿分界）

### 布局

- **画布**: 700 × 450
- **配色**: color-themes #05 经济学人红

## 渲染契约 JSON（v2 ggplot2 分层）

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["供应商", "健康度"],
    "rows": [
      { "供应商": "毅航", "健康度": 92 },
      { "供应商": "毛毛虫", "健康度": 91 },
      { "供应商": "伽玛", "健康度": 72 },
      { "供应商": "赛维斯", "健康度": 62 },
      { "供应商": "岐力", "健康度": 56 },
      { "供应商": "翰锐", "健康度": 49 }
    ]
  },
  "mapping": {
    "x": "健康度",
    "y": "供应商",
    "fill": null,
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_rect",
      "aes": { "xmin": 80, "ymin": -1, "xmax": 100, "ymax": 7 },
      "params": { "fill": "#E8F5E9", "alpha": 0.3 },
      "readerWeight": "light"
    },
    {
      "geom": "geom_rect",
      "aes": { "xmin": 60, "ymin": -1, "xmax": 80, "ymax": 7 },
      "params": { "fill": "#FFF8E1", "alpha": 0.3 },
      "readerWeight": "light"
    },
    {
      "geom": "geom_rect",
      "aes": { "xmin": 0, "ymin": -1, "xmax": 60, "ymax": 7 },
      "params": { "fill": "#FFEBEE", "alpha": 0.3 },
      "readerWeight": "light"
    },
    {
      "geom": "geom_bar",
      "aes": { "x": "健康度", "y": "供应商" },
      "params": { "position": "stack", "width": 0.5 },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_vline",
      "aes": { "xintercept": 60 },
      "params": { "color": "#8B1A1A", "size": 1.5, "linetype": "solid" },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_vline",
      "aes": { "xintercept": 80 },
      "params": { "color": "#969696", "size": 1, "linetype": "dashed" },
      "readerWeight": "light"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 56, "y": "岐力", "label": "需立即干预" },
      "params": { "color": "#8B1A1A", "fontSize": 11 },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 49, "y": "翰锐", "label": "持续低于阈值" },
      "params": { "color": "#8B1A1A", "fontSize": 11 },
      "readerWeight": "hero"
    }
  ],
  "scales": [
    { "aesthetic": "x", "type": "linear", "name": "综合健康度", "min": 0, "max": 100 },
    { "aesthetic": "fill", "type": "manual", "values": ["#E09090", "#D07070", "#C05858", "#6B8E6B", "#6B8E6B", "#8B1A1A"] }
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
  "title": "3 家供应商低于健康阈值",
  "subtitle": "2026年Q4 | 综合健康度评分 | 红线 = 60 分健康阈值"
}
```
