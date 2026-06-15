# Phase 3 - Spec

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "中国产量占全球53%，印度逆势增长",
  "subtitle": "2024年全球粗钢产量TOP15国家（百万吨）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["国家", "产量(百万吨)", "全球占比", "同比变化"],
    "series": [
      {"name": "中国", "value": 1005, "share": "53.0%", "yoy": "-1.0%", "highlight": true},
      {"name": "印度", "value": 149, "share": "7.8%", "yoy": "+4.5%", "highlight": true},
      {"name": "日本", "value": 84, "share": "4.4%", "yoy": "-3.0%", "highlight": false},
      {"name": "美国", "value": 80, "share": "4.2%", "yoy": "-2.5%", "highlight": false},
      {"name": "俄罗斯", "value": 72, "share": "3.8%", "yoy": "-5.0%", "highlight": false},
      {"name": "韩国", "value": 66, "share": "3.5%", "yoy": "-2.0%", "highlight": false},
      {"name": "德国", "value": 37, "share": "1.9%", "yoy": "-4.0%", "highlight": false},
      {"name": "土耳其", "value": 36, "share": "1.9%", "yoy": "+3.0%", "highlight": false},
      {"name": "巴西", "value": 34, "share": "1.8%", "yoy": "+1.5%", "highlight": false},
      {"name": "伊朗", "value": 31, "share": "1.6%", "yoy": "+2.0%", "highlight": false},
      {"name": "意大利", "value": 22, "share": "1.2%", "yoy": "-3.5%", "highlight": false},
      {"name": "墨西哥", "value": 19, "share": "1.0%", "yoy": "+1.0%", "highlight": false},
      {"name": "印度尼西亚", "value": 17, "share": "0.9%", "yoy": "+6.0%", "highlight": false},
      {"name": "加拿大", "value": 14, "share": "0.7%", "yoy": "-1.0%", "highlight": false},
      {"name": "越南", "value": 14, "share": "0.7%", "yoy": "+5.0%", "highlight": false}
    ]
  },
  "visualEncoding": {
    "highlight": ["中国", "印度"],
    "highlightColor": "#E74C3C",
    "secondaryHighlightColor": "#2ECC71",
    "defaultColor": "#95A5A6",
    "grayscale": false,
    "maxHighlightRatio": 0.15,
    "orientation": "horizontal"
  },
  "annotations": [
    {"type": "label", "target": "中国", "text": "1,005 占53%", "position": "right"},
    {"type": "label", "target": "印度", "text": "149 ↑4.5%", "position": "right"}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {"top": 60, "right": 20, "bottom": 70, "left": 80}
  },
  "footer": {
    "left": "全球合计约1,900百万吨，同比下降0.9%",
    "right": "数据来源：世界钢铁协会"
  }
}
```
