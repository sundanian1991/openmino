# Phase 3 — SPEC + 渲染契约

## SPEC（12 项）

| # | 项目 | 值 |
|---|------|-----|
| 1 | 图表类型 | 双轴组合图（左轴折线 + 右轴柱状） |
| 2 | 标题 | 中国出口引擎的质变：从贸易平衡到持续高顺差 |
| 3 | 副标题 | 2015-2024，进出口总额与贸易差额（十亿美元） |
| 4 | 数据源 | World Bank，2015-2024 |
| 5 | X 轴 | 年份（2015-2024），连续时间轴 |
| 6 | 左 Y 轴 | 出口/进口总额（十亿美元），范围 1800-4000 |
| 7 | 右 Y 轴 | 贸易差额（十亿美元），范围 0-650 |
| 8 | 系列 | 出口（折线，主色 #3B82F6）、进口（折线，灰 #9CA3AF）、差额（柱状，主色浅变 #93C5FD） |
| 9 | 标注 | 2021 差额 460.8 "首次突破 400"；2022 差额 577.9 "十年峰值"；2023 出口回落箭头 |
| 10 | 参考线 | 差额 = 300（"高顺差阈值"），虚线，右轴 |
| 11 | 主题 | default（浅色背景，克制） |
| 12 | 画布 | 800 × 550，padding top:20 right:60 bottom:30 left:60 |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "dual_axis",
  "title": "中国出口引擎的质变：从贸易平衡到持续高顺差",
  "subtitle": "2015-2024，进出口总额与贸易差额（十亿美元）",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["year", "exports_usd_billion", "imports_usd_billion", "trade_balance_usd_billion"],
    "series": [
      {
        "name": "出口总额",
        "type": "line",
        "axis": "left",
        "values": [2362.1, 2199.97, 2424.22, 2655.61, 2628.94, 2729.88, 3554.11, 3717.89, 3490.09, 3753.06],
        "color": "#3B82F6",
        "highlight": true
      },
      {
        "name": "进口总额",
        "type": "line",
        "axis": "left",
        "values": [2003.26, 1944.49, 2208.52, 2564.12, 2496.15, 2374.74, 3093.28, 3140.04, 3106.46, 3219.34],
        "color": "#9CA3AF",
        "highlight": false
      },
      {
        "name": "贸易差额",
        "type": "bar",
        "axis": "right",
        "values": [358.84, 255.48, 215.7, 91.49, 132.79, 355.15, 460.83, 577.85, 383.63, 533.71],
        "color": "#93C5FD",
        "highlight": false
      }
    ]
  },
  "visualEncoding": {
    "highlight": ["2021", "2022"],
    "grayscale": false,
    "maxHighlightRatio": 0.2
  },
  "annotations": [
    { "year": 2021, "series": "贸易差额", "value": 460.83, "label": "首次突破 400", "position": "top" },
    { "year": 2022, "series": "贸易差额", "value": 577.85, "label": "十年峰值", "position": "top" },
    { "year": 2023, "series": "出口总额", "value": 3490.09, "label": "全球需求收缩", "position": "bottom" }
  ],
  "referenceLines": [
    { "axis": "right", "value": 300, "label": "高顺差阈值", "lineStyle": "dashed" }
  ],
  "theme": "default",
  "layout": { "padding": { "top": 20, "right": 60, "bottom": 30, "left": 60 } }
}
```
