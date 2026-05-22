# Delegation Routing Test — 模式 C03 2x2 矩阵 → viz-echarts（数据特征）

> 测试：C01-C16（逻辑图表）按数据特征分流 → 数据型 → viz-echarts

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | C03 |
| 模式范围 | C01-C16（逻辑图表） |
| 数据特征 | 数据型（瀑布图/矩阵图有明确数值） |
| 预期 renderTarget | viz-echarts |

> 注：题目写 "C03-瀑布图(数据)"，但 C03 实际是 2x2 矩阵，C02 是瀑布分析。
> 这里测试 C03 2x2 矩阵（有数据）→ viz-echarts 的路由。

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["供应商", "投入度", "产出质量"],
    "rows": [
      {"供应商": "毅航", "投入度": 90, "产出质量": 88},
      {"供应商": "毛毛虫", "投入度": 85, "产出质量": 82},
      {"供应商": "伽玛", "投入度": 40, "产出质量": 70},
      {"供应商": "赛维斯", "投入度": 60, "产出质量": 45}
    ]
  },
  "mapping": {
    "x": "投入度",
    "y": "产出质量",
    "fill": null,
    "color": "供应商",
    "size": null
  },
  "layers": [
    {
      "geom": "geom_point",
      "aes": {"x": "投入度", "y": "产出质量", "color": "供应商"},
      "params": {"size": 8},
      "readerWeight": "hero"
    },
    {
      "geom": "geom_hline",
      "aes": {},
      "params": {"y": 77, "color": "#ada599", "dash": [6, 4]},
      "readerWeight": "light"
    },
    {
      "geom": "geom_vline",
      "aes": {},
      "params": {"x": 65, "color": "#ada599", "dash": [6, 4]},
      "readerWeight": "light"
    },
    {
      "geom": "geom_label",
      "aes": {"label": "高投入+高质量"},
      "params": {"color": "#c26d3a", "fontSize": 11},
      "readerWeight": "hero"
    }
  ],
  "scales": [
    {"aesthetic": "x", "type": "linear", "name": "投入度评分"},
    {"aesthetic": "y", "type": "linear", "name": "产出质量评分"},
    {"aesthetic": "color", "type": "manual", "values": ["#c26d3a", "#6b7280", "#857d74", "#ada599"]}
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
  "title": "投入度与产出质量正相关，赛维斯双低需关注",
  "subtitle": "2026 Q1 · 金条产线供应商四象限分析"
}
```

## 路由验证

- **模式号 → renderTarget 映射**：C03 属于 C01-C16 范围 → 数据特征（有明确数值）→ viz-echarts
- **renderTarget 字段**：JSON 顶层无 renderTarget 字段（v2 格式不强制要求）
- **JSON 格式合法性**：v2 格式，所有必填字段齐全，layers 含 geom_hline/geom_vline（正确，2x2 矩阵需要参考线）
- **判定**：PASS
