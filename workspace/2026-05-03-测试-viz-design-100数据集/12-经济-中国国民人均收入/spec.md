# Phase 3 — SPEC + 渲染契约

## SPEC（12 项）

| # | 项目 | 值 |
|---|------|-----|
| 1 | 图表类型 | 多折线图（multi_line） |
| 2 | 标题 | 倍数在缩小，鸿沟在扩大：中国城乡收入十年 |
| 3 | 副标题 | 2015-2024，城镇/农村人均可支配收入（元） |
| 4 | 数据源 | 国家统计局，2015-2024；GNI 来源 World Bank |
| 5 | X 轴 | 年份（2015-2024），连续时间轴 |
| 6 | Y 轴 | 人民币（元），范围 10000-60000 |
| 7 | 系列 | 城镇可支配收入（折线，#3B82F6）、农村可支配收入（折线，#F59E0B）、人均消费（折线，#D1D5DB） |
| 8 | 标注 | 2020 消费停滞"疫情冲击"；2015 城乡比 2.7x；2024 城乡比 2.4x + 绝对差距 31269 |
| 9 | 参考线 | 无数值参考线（收入无天然阈值） |
| 10 | GNI 处理 | 不纳入主图，在副标题区域文字提及"GNI 人均 $13,660（2024）" |
| 11 | 主题 | default |
| 12 | 画布 | 800 × 550，padding top:20 right:20 bottom:30 left:60 |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "multi_line",
  "title": "倍数在缩小，鸿沟在扩大：中国城乡收入十年",
  "subtitle": "2015-2024，城镇/农村人均可支配收入（元） | GNI 人均 $13,660（2024）",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["year", "urban_disposable_cny", "rural_disposable_cny", "consumption_per_capita_cny"],
    "series": [
      {
        "name": "城镇人均可支配收入",
        "type": "line",
        "values": [31195, 33616, 36396, 39251, 42359, 43834, 47412, 49283, 51821, 54388],
        "color": "#3B82F6",
        "highlight": true
      },
      {
        "name": "农村人均可支配收入",
        "type": "line",
        "values": [11422, 12363, 13432, 14617, 16021, 17131, 18931, 20133, 21691, 23119],
        "color": "#F59E0B",
        "highlight": true
      },
      {
        "name": "人均消费支出",
        "type": "line",
        "values": [15712, 17111, 18322, 19853, 21559, 21210, 24100, 24538, 26796, 28227],
        "color": "#D1D5DB",
        "highlight": false
      }
    ]
  },
  "visualEncoding": {
    "highlight": ["2015", "2020", "2024"],
    "grayscale": false,
    "maxHighlightRatio": 0.3
  },
  "annotations": [
    { "year": 2020, "series": "人均消费支出", "value": 21210, "label": "疫情冲击，消费停滞", "position": "bottom" },
    { "year": 2015, "series": "城镇/农村比", "value": 31195, "label": "2.7x", "position": "right" },
    { "year": 2024, "series": "城镇/农村比", "value": 54388, "label": "2.4x | 差距 31,269 元", "position": "right" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": { "padding": { "top": 20, "right": 20, "bottom": 30, "left": 60 } }
}
```
