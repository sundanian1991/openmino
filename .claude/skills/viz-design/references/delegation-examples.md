# 委托渲染示例

> viz-design 委托渲染技能时的标准 JSON 格式和交接方式。

---

## 委托 viz-echarts

```json
{
  "renderTarget": "viz-echarts",
  "chartType": "radar",
  "title": "毅航健康度全面领先，3 家低于基准线",
  "subtitle": "2026 年 Q1 · 金条产线 6 家头部供应商",
  "canvas": {"width": 800, "height": 550},
  "data": {"fields": ["supplier_name", "achievement_rate"], "rows": [...]},
  "visualEncoding": {
    "highlight": [{"series": "毅航", "color": "#E8875F"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "theme": "default"
}
```

## 委托 viz-svg-flow

```json
{
  "renderTarget": "viz-svg-flow",
  "chartType": "iceberg",
  "title": "客诉问题冰山：表面 12% 可量化，88% 需深挖",
  "canvas": {"width": 600, "height": 500},
  "data": {"fields": ["visible_pct", "hidden_pct"], "rows": [{"visible_pct": 12, "hidden_pct": 88}]},
  "visualEncoding": {
    "highlight": [{"series": "隐藏根因", "color": "#E8875F"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "theme": "default"
}
```

## 与 viz-data-story 的配合

viz-data-story 产出大纲后，viz-design 将"需要一张 XX 类型的图"翻译为具体模式：

```
viz-data-story 大纲说："需要一张图展示供应商分层"
  ↓ viz-design 翻译：
  - 概念 = 分层/层级
  - 模式选择 = 31-金字塔（首选）或 03-同心图（备选）
  - 理由 = 金字塔天然表达自下而上的层级关系
  - SPEC = 完整编写
  ↓ 委托 viz-echarts 或 viz-svg-flow 执行
```
