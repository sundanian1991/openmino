# spec.md — 全球最受欢迎旅游目的地

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "法国以9000万国际游客领跑全球，欧洲占据Top 15半壁江山",
  "subtitle": "2023-2024年国际游客到访数TOP15（万人次）| 来源: UNWTO",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["国家", "游客到访数(万人次)"],
    "series": [
      {
        "name": "游客到访数",
        "values": [9000, 8500, 8000, 6500, 6500, 5500, 5000, 4000, 4000, 3900, 3500, 3200, 3000, 2700, 2400],
        "highlight": true
      }
    ],
    "categories": ["法国", "西班牙", "美国", "意大利", "中国", "土耳其", "墨西哥", "泰国", "德国", "英国", "日本", "奥地利", "希腊", "葡萄牙", "荷兰"]
  },
  "visualEncoding": {
    "highlight": ["法国", "西班牙", "美国"],
    "grayscale": false,
    "maxHighlightRatio": 0.1,
    "colorMapping": {
      "欧洲": "#3B82F6",
      "美洲": "#F97316",
      "亚洲": "#10B981"
    }
  },
  "annotations": [
    {
      "type": "value_label",
      "position": ["法国", "西班牙", "美国"],
      "text": ["9000万", "8500万", "8000万"]
    }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 60,
      "right": 40,
      "bottom": 40,
      "left": 80
    },
    "orientation": "horizontal"
  }
}
```
