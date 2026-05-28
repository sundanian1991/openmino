# spec.md — 中国入境旅游人数

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "area_chart",
  "title": "疫情断崖下跌81%，免签驱动恢复至疫前九成",
  "subtitle": "2015-2024年中国入境旅游人数（万人次）| 来源: 国家统计局、文旅部",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["年份", "入境人数(万人次)", "同比变化(%)"],
    "series": [
      {
        "name": "入境旅游人数",
        "values": [13382, 13844, 13948, 14120, 14531, 2720, 3198, 4400, 8200, 13000],
        "highlight": true
      }
    ],
    "categories": ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
  },
  "visualEncoding": {
    "highlight": ["2019", "2020", "2024"],
    "grayscale": false,
    "maxHighlightRatio": 0.1,
    "areaStyle": {
      "color": {
        "type": "linear",
        "x": 0, "y": 0, "x2": 0, "y2": 1,
        "colorStops": [
          {"offset": 0, "color": "rgba(59,130,246,0.8)"},
          {"offset": 1, "color": "rgba(59,130,246,0.1)"}
        ]
      }
    },
    "lineStyle": {
      "color": "#3B82F6",
      "width": 3
    }
  },
  "annotations": [
    {
      "type": "event_marker",
      "position": "2020",
      "text": "疫情爆发\n-81.3%",
      "style": {
        "color": "#EF4444",
        "lineStyle": "dashed"
      }
    },
    {
      "type": "event_marker",
      "position": "2023",
      "text": "免签政策扩大\n快速恢复",
      "style": {
        "color": "#10B981"
      }
    }
  ],
  "referenceLines": [
    {
      "value": 14531,
      "label": "2019峰值",
      "lineStyle": {
        "type": "dotted",
        "color": "#9CA3AF"
      }
    }
  ],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 60,
      "right": 40,
      "bottom": 50,
      "left": 60
    }
  }
}
```
