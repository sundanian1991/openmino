# 渲染契约 — v2 格式

> 从 intent / storyboard / checklist / data 四份设计材料推导。

---

## 叙事意图（从 intent 继承）

**Big Idea**：发病数与死亡数的错位 — 发病最多的不致命，致命的不多发。
- 认知缺口：公众认为"发病最多的病最危险"，实际上致死率最高的病发病量极低
- 核心信息：艾滋病发病数仅排第 10，但死亡数最高，致死率 32%
- 标题：艾滋病发病仅排第 10，死亡数却占近半

## 视觉编码（从 storyboard 继承）

| 维度 | 编码 | 理由 |
|------|------|------|
| X 轴 | 发病数，对数刻度 | 3 个数量级跨度（327~118万） |
| Y 轴 | 死亡数，线性刻度 | 最大值 2415，线性即可 |
| 颜色 | Stone 灰化 vs Coral 高亮 | 仅艾滋病 1/15 = 6.7% 高亮 |
| 大小 | 高亮点更大（16 vs 8） | 第一眼注意力 |
| 标注 | 仅艾滋病 | 写原因+幅度，不写纯数字 |

## 阅读路径

第一眼：左上角离群点（低发病+高死亡）→ 第二眼：右下角密集灰点群（高发病+低死亡）→ 理解：发病≠致命

---

## 渲染契约 JSON v2

```json
{
  "version": "viz-design-spec-v2",
  "title": "艾滋病发病仅排第 10，死亡数却占近半",
  "subtitle": "2023 年全年 · 中国甲乙类法定传染病",
  "data": {
    "type": "rows",
    "fields": ["疾病名称", "发病数", "死亡数"],
    "rows": [
      { "疾病名称": "病毒性肝炎", "发病数": 1185648, "死亡数": 468 },
      { "疾病名称": "肺结核", "发病数": 614164, "死亡数": 2415 },
      { "疾病名称": "梅毒", "发病数": 579443, "死亡数": 44 },
      { "疾病名称": "淋病", "发病数": 105673, "死亡数": 0 },
      { "疾病名称": "百日咳", "发病数": 38395, "死亡数": 2 },
      { "疾病名称": "猩红热", "发病数": 34217, "死亡数": 0 },
      { "疾病名称": "布鲁氏菌病", "发病数": 29054, "死亡数": 1 },
      { "疾病名称": "新型冠状病毒感染", "发病数": 23087, "死亡数": 12 },
      { "疾病名称": "伤寒和副伤寒", "发病数": 8427, "死亡数": 1 },
      { "疾病名称": "流行性感冒", "发病数": 6414, "死亡数": 3 },
      { "疾病名称": "麻疹", "发病数": 598, "死亡数": 0 },
      { "疾病名称": "流行性出血热", "发病数": 546, "死亡数": 3 },
      { "疾病名称": "流行性乙型脑炎", "发病数": 389, "死亡数": 29 },
      { "疾病名称": "疟疾", "发病数": 327, "死亡数": 3 }
    ]
  },
  "mapping": {
    "x": "发病数",
    "y": "死亡数",
    "fill": null,
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_point",
      "aes": { "x": "发病数", "y": "死亡数" },
      "params": { "color": "#ada599", "size": 8 },
      "comment": "14 种普通疾病点，Stone 300 灰化 — storyboard 克制声明"
    },
    {
      "geom": "geom_point",
      "aes": { "x": "发病数", "y": "死亡数" },
      "params": { "color": "#D85A30", "size": 16 },
      "data": {
        "rows": [
          { "疾病名称": "艾滋病", "发病数": 6895, "死亡数": 2201 }
        ]
      },
      "comment": "唯一高亮点 Coral 500 — checklist ≤10% 约束"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 6895, "y": 2201, "label": "发病仅排第10，致死率32%" },
      "params": { "color": "#D85A30", "fontSize": 11 },
      "comment": "标注写原因+幅度 — spec.md 标注策略"
    }
  ],
  "scales": [
    {
      "aesthetic": "x",
      "type": "log",
      "name": "发病数（例，对数刻度）",
      "comment": "处理 3 个数量级 — checklist"
    },
    {
      "aesthetic": "y",
      "type": "linear",
      "name": "死亡数（例）"
    }
  ],
  "coord": {
    "type": "cartesian",
    "flip": false,
    "comment": "直角坐标，不翻转"
  },
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": "#f3f4f6", "minor": false },
    "fontFamily": "system-ui, -apple-system, sans-serif",
    "titleSize": 16,
    "axisLabelSize": 10,
    "canvas": { "width": 800, "height": 550 },
    "comment": "storyboard Phase 0 全局风格锁定"
  }
}
```

## 推导溯源

| v2 层 | 推导来源 |
|-------|---------|
| data.rows | data.md 原始数据 |
| mapping.x/y | intent.md "X=发病数 Y=死亡数" |
| geom_point(灰) | storyboard 克制声明"不标注每个点" |
| geom_point(彩) | storyboard "艾滋病 Coral 500 高亮" |
| geom_label | spec.md 标注策略"写原因+幅度" |
| scales.x= log | spec.md "3 个数量级跨度" + checklist |
| coord | 标准散点，默认 |
| theme | storyboard Phase 0 restrained-warm |
