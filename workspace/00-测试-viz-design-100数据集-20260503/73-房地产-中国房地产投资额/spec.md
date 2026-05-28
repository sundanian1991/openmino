# spec.md — Phase 3

## 数据集
73-房地产-中国房地产投资额

## Big Idea
三年蒸发4.7万亿：中国房地产投资从狂飙到深蹲

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "area_chart",
  "title": "三年蒸发4.7万亿：中国房地产投资从狂飙到深蹲",
  "subtitle": "2015-2024年中国房地产开发投资额变化，2021年触顶后连续三年下滑",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["年份", "投资额(万亿元)", "同比增速(%)"],
    "series": [
      {
        "name": "投资额(万亿元)",
        "values": [9.60, 10.26, 10.98, 12.03, 13.22, 14.14, 14.76, 13.29, 11.09, 10.0],
        "highlight": true
      },
      {
        "name": "同比增速(%)",
        "values": [1.0, 6.9, 7.0, 9.5, 9.9, 7.0, 4.4, -10.0, -9.6, -10.0],
        "highlight": false
      }
    ]
  },
  "visualEncoding": {
    "highlight": ["2021"],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"point": "2021", "label": "历史峰值 14.76万亿", "position": "above"},
    {"range": ["2022", "2024"], "label": "三年累计-32%", "position": "right"}
  ],
  "referenceLines": [
    {"value": 9.60, "label": "2015起点", "axis": "y"}
  ],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 20,
      "right": 20,
      "bottom": 20,
      "left": 20
    }
  }
}
```
