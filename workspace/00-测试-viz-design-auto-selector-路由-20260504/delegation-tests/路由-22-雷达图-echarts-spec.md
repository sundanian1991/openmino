# Delegation Routing Test — 模式 22 雷达图 → viz-echarts

> 测试：01-30（数据图表）范围 → 应委托给 viz-echarts

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | 22 |
| 模式范围 | 01-30（数据图表） |
| 预期 renderTarget | viz-echarts |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "radar_chart",
  "title": "毅航综合得分 92，全面领先其他供应商",
  "subtitle": "2026 年 Q1 · 金条产线 6 家头部供应商",
  "canvas": {"width": 800, "height": 550},
  "data": {
    "fields": ["达成率", "峰值比", "效率", "FCI", "流失率"],
    "series": [
      {"name": "毅航", "values": [92, 88, 75, 90, 82], "highlight": true},
      {"name": "毛毛虫", "values": [85, 80, 82, 78, 75], "highlight": false},
      {"name": "伽玛", "values": [65, 70, 60, 68, 72], "highlight": false},
      {"name": "基准", "values": [77, 77, 77, 77, 77], "highlight": false}
    ]
  },
  "visualEncoding": {
    "highlight": [{"series": "毅航", "color": "#c26d3a"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "综合得分超基准 15 分", "target": "毅航-达成率"}
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

- **模式号 → renderTarget 映射**：22 属于 01-30 范围 → viz-echarts
- **renderTarget 字段**：显式声明 "viz-echarts"（正确）
- **JSON 格式合法性**：v1 格式，所有必填字段齐全（正确）
- **判定**：PASS
