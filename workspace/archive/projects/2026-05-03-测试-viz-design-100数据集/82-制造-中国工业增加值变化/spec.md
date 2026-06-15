# Phase 3 - Spec

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "line_chart",
  "title": "从疫情谷底到5.8%新平衡，十年工业增速的V型故事",
  "subtitle": "中国规模以上工业增加值同比增长率 2015-2024",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["年份", "同比增长率(%)"],
    "series": [
      {"name": "2015", "value": 6.1, "highlight": false},
      {"name": "2016", "value": 6.0, "highlight": false},
      {"name": "2017", "value": 6.6, "highlight": false},
      {"name": "2018", "value": 6.2, "highlight": false},
      {"name": "2019", "value": 5.7, "highlight": false},
      {"name": "2020", "value": 2.8, "highlight": true, "note": "疫情谷底"},
      {"name": "2021", "value": 9.6, "highlight": true, "note": "低基数反弹"},
      {"name": "2022", "value": 3.6, "highlight": false},
      {"name": "2023", "value": 4.6, "highlight": false},
      {"name": "2024", "value": 5.8, "highlight": true, "note": "疫后企稳"}
    ]
  },
  "visualEncoding": {
    "highlight": ["2020", "2021", "2024"],
    "lineColor": "#2C3E50",
    "lineWidth": 3,
    "highlightColor": "#E74C3C",
    "secondaryHighlightColor": "#27AE60",
    "defaultColor": "#95A5A6",
    "grayscale": false,
    "maxHighlightRatio": 0.3,
    "showArea": false,
    "showPoints": true
  },
  "annotations": [
    {"type": "label", "target": "2020", "text": "2.8% 疫情谷底", "position": "below"},
    {"type": "label", "target": "2021", "text": "9.6% 低基数反弹", "position": "above"},
    {"type": "label", "target": "2024", "text": "5.8% 企稳", "position": "above"}
  ],
  "referenceLines": [
    {"value": 6.0, "label": "6% 新常态", "color": "#E0E0E0", "style": "dashed"},
    {"value": 5.0, "label": "5% 新平台", "color": "#E0E0E0", "style": "dashed"}
  ],
  "theme": "default",
  "layout": {
    "padding": {"top": 60, "right": 20, "bottom": 70, "left": 50}
  },
  "yAxis": {
    "min": 0,
    "max": 10,
    "interval": 2,
    "unit": "%"
  },
  "xAxis": {
    "type": "category",
    "data": ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
  },
  "footer": {
    "left": "注：2024年制造业同比增长6.1%",
    "right": "数据来源：国家统计局"
  }
}
```
