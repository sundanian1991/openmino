# Delegation Routing Test — 模式 13 柱状图 → viz-echarts

> 测试：01-30（数据图表）范围 → 应委托给 viz-echarts

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | 13 |
| 模式范围 | 01-30（数据图表） |
| 预期 renderTarget | viz-echarts |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["国家", "碳排放_亿吨"],
    "rows": [
      {"国家": "中国", "碳排放_亿吨": 114},
      {"国家": "美国", "碳排放_亿吨": 50},
      {"国家": "印度", "碳排放_亿吨": 28},
      {"国家": "俄罗斯", "碳排放_亿吨": 17},
      {"国家": "日本", "碳排放_亿吨": 11}
    ]
  },
  "mapping": {
    "x": "国家",
    "y": "碳排放_亿吨",
    "fill": null,
    "color": "国家",
    "size": null
  },
  "layers": [
    {
      "geom": "geom_bar",
      "aes": {"y": "碳排放_亿吨", "color": "国家"},
      "params": {"position": "dodge"},
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": {"x": "中国", "y": 114, "label": "全球第一"},
      "params": {"color": "#c26d3a", "fontSize": 11},
      "readerWeight": "hero"
    }
  ],
  "scales": [
    {"aesthetic": "y", "type": "linear", "name": "碳排放量（亿吨 CO2）"},
    {"aesthetic": "color", "type": "manual", "values": ["#c26d3a", "#6b7280", "#857d74", "#ada599", "#d4d0c8"]}
  ],
  "coord": {"type": "cartesian", "flip": false},
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": {"major": "#f3f4f6", "minor": false},
    "fontFamily": "system-ui",
    "titleSize": 16,
    "axisLabelSize": 10,
    "canvas": {"width": 800, "height": 550}
  },
  "title": "中国碳排放占全球近三成",
  "subtitle": "2025 | 全球 Top 5 碳排放国"
}
```

## 路由验证

- **模式号 → renderTarget 映射**：13 属于 01-30 范围 → viz-echarts
- **JSON 格式合法性**：所有必填字段齐全，格式合法
- **判定**：PASS
