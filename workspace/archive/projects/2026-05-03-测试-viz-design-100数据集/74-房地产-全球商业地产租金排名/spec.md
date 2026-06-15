# spec.md — Phase 3

## 数据集
74-房地产-全球商业地产租金排名

## Big Idea
中环一平方英尺，抵柏林四平方英尺：全球商办租金权力地图

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "中环一平方英尺，抵柏林四平方英尺：全球商办租金权力地图",
  "subtitle": "2024年全球主要城市甲级写字楼租金排名，租金取区间中值（美元/平方英尺）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["城市", "租金中值(美元/平方英尺)", "空置率(%)"],
    "series": [
      {
        "name": "租金中值(美元/平方英尺)",
        "values": [225, 200, 175, 140, 120, 115, 105, 95, 85, 75, 72, 67, 62, 55, 52],
        "highlight": true
      },
      {
        "name": "空置率(%)",
        "values": [11, 7, 13.5, 4.5, 22.5, 6, 7, 16.5, 20, 13.5, 9, 11, 22.5, 20, 6],
        "highlight": false
      }
    ]
  },
  "visualEncoding": {
    "highlight": ["香港（中环）", "伦敦（西伦敦）", "纽约（中城曼哈顿）", "旧金山（金融区）"],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"point": "香港（中环）", "label": "断层领先 225美元", "position": "right"},
    {"point": "旧金山（金融区）", "label": "空置率22.5% 远程办公冲击", "position": "right"},
    {"point": "东京（丸之内）", "label": "空置率4.5% 最紧俏", "position": "right"}
  ],
  "referenceLines": [],
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
