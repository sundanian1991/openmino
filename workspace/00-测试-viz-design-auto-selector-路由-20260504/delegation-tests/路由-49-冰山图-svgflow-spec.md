# Delegation Routing Test — 模式 49 冰山图 → viz-svg-flow

> 测试：31-48（结构关系）/ 49-72（状态叙事）范围 → 应委托给 viz-svg-flow

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | 49 |
| 模式范围 | 49-72（状态叙事） |
| 预期 renderTarget | viz-svg-flow |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-svg-flow",
  "chartType": "iceberg",
  "title": "客户满意度问题冰山：表面 12% 可量化，88% 隐藏根因",
  "subtitle": "2026 Q1 · 客户投诉数据分析",
  "canvas": {"width": 600, "height": 500},
  "data": {
    "fields": ["层级", "占比_pct", "说明"],
    "rows": [
      {"层级": "水面以上", "占比_pct": 12, "说明": "响应慢、态度差"},
      {"层级": "水面以下-浅层", "占比_pct": 38, "说明": "流程繁琐、信息不对称"},
      {"层级": "水面以下-深层", "占比_pct": 50, "说明": "考核机制偏差、激励不足"}
    ]
  },
  "visualEncoding": {
    "highlight": [{"series": "水面以下-深层", "color": "#c26d3a"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "50% 根因隐藏在考核机制中", "target": "水面以下-深层"}
  ],
  "theme": "default",
  "layout": {
    "titlePosition": "top",
    "chartArea": "center",
    "padding": {"top": 20, "right": 20, "bottom": 20, "left": 20}
  }
}
```

## 路由验证

- **模式号 → renderTarget 映射**：49 属于 49-72 范围 → viz-svg-flow（SKILL.md §四）
  - 注：题目中写 "35-冰山图"，但根据 pattern-index.md，35=楼梯，49=冰山。冰山图的模式号是 49，属于 49-72（状态叙事）范围
- **renderTarget 字段**：显式声明 "viz-svg-flow"（正确）
- **JSON 格式合法性**：v1 格式，所有必填字段齐全（正确）
- **判定**：PASS（模式号以实际 pattern-index 为准，49 冰山图 → viz-svg-flow）
