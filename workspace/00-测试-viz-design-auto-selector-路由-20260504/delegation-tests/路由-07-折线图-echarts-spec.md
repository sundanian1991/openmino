# Delegation Routing Test — 模式 07 折线图 → viz-echarts

> 测试：01-30（数据图表）范围 → 应委托给 viz-echarts

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | 07 |
| 模式范围 | 01-30（数据图表） |
| 预期 renderTarget | viz-echarts |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["日期", "价格_USD"],
    "rows": [
      {"日期": "2024-01", "价格_USD": 42000},
      {"日期": "2024-06", "价格_USD": 67000},
      {"日期": "2024-12", "价格_USD": 96000},
      {"日期": "2025-06", "价格_USD": 110000},
      {"日期": "2025-12", "价格_USD": 98000}
    ]
  },
  "mapping": {
    "x": "日期",
    "y": "价格_USD",
    "fill": null,
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_line",
      "aes": {"y": "价格_USD"},
      "params": {"color": "#C13531", "size": 2, "smooth": false},
      "readerWeight": "hero"
    },
    {
      "geom": "geom_area",
      "aes": {"y": "价格_USD"},
      "params": {"color": "#C13531", "size": 0},
      "readerWeight": "light"
    },
    {
      "geom": "geom_label",
      "aes": {"x": "2025-06", "y": 110000, "label": "历史新高"},
      "params": {"color": "#C13531", "fontSize": 11},
      "readerWeight": "hero"
    }
  ],
  "scales": [
    {"aesthetic": "y", "type": "linear", "name": "价格（USD）"}
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
  "title": "比特币从 4.2 万涨至 11 万后回落",
  "subtitle": "2024-2025 | BTC/USD 历史价格"
}
```

## 路由验证

- **renderTarget 字段**：JSON 顶层无 renderTarget 字段（v2 格式不强制要求，由模式号决定）
- **模式号 → renderTarget 映射**：07 属于 01-30 范围 → viz-echarts（根据 SKILL.md §四 委托渲染路由）
- **JSON 格式合法性**：
  - version = "viz-design-spec-v2"（正确）
  - data 有 rows 字段（正确）
  - mapping 有 x 映射（正确）
  - layers 非空数组，每个含 geom + aes + params（正确）
  - scales 每个有 aesthetic + type（正确）
  - coord/facet/theme 均存在（正确）
- **判定**：PASS
