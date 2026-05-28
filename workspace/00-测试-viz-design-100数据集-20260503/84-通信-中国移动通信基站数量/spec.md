# spec.md — 中国移动通信基站数量

## 可视化目的

展示中国移动通信基站十年增长轨迹，重点突出5G从无到有的代际切换速度。

## 想传达什么

5G用5年时间从零增长到425万个基站、10亿用户，是中国通信史上最快的代际切换。

## 结论

2019年5G商用元年仅13万个基站，到2024年5G基站达425万个（占比33.6%），5G用户突破10.1亿户（渗透率56.4%）。

## 思路

选用双轴图：左轴为堆叠面积展示4G+5G基站构成，右轴折线叠加5G用户增长曲线。5G用橙色高亮，4G用冷灰蓝，5G用户用橙色折线。

## 视觉执行

**模式选择**：模式07 — 折线图/双轴图（趋势变化）
**渲染目标**：viz-echarts
**图表类型**：dual_axis

**标题**：5年从零到10亿用户——中国5G速度史上最快
**副标题**：2015-2024年中国移动通信基站数量与5G用户增长

**视觉编码**：
- 堆叠面积：4G基站（底层，冷灰蓝）+ 5G基站（上层，橙色）
- 折线（右轴）：5G用户数（橙色虚线）
- X轴：年份 2015-2024

**数据组织**：
- 字段：年份、4G基站(万)、5G基站(万)、5G用户(亿)
- 2015-2018年5G数据为null/0

**标注策略**：
- 高亮：5G基站面积 + 5G用户折线
- 标注3处：2019年"5G商用元年"、2021年"用户破3.6亿"、2024年"用户破10亿"

**布局**：
- 画布：800 x 550px
- 双Y轴，左轴基站数(万)，右轴用户数(亿)
- 图例：4G基站、5G基站、5G用户

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "dual_axis",
  "title": "5年从零到10亿用户——中国5G速度史上最快",
  "subtitle": "2015-2024年中国移动通信基站数量与5G用户增长",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["year", "stations_4g_wan", "stations_5g_wan", "users_5g_yi"],
    "series": [
      {
        "name": "4G基站（万个）",
        "type": "bar_stack",
        "values": [177, 263, 328, 463, 544, 575, 590, 603, 629, 711],
        "highlight": false
      },
      {
        "name": "5G基站（万个）",
        "type": "bar_stack",
        "values": [0, 0, 0, 0, 13, 72, 143, 231, 338, 425],
        "highlight": true
      },
      {
        "name": "5G用户（亿户）",
        "type": "line",
        "yAxisIndex": 1,
        "values": [null, null, null, null, 0.3, 1.6, 3.6, 5.6, 8.1, 10.1],
        "highlight": true
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"series": "5G基站（万个）", "color": "#E8875F", "reason": "5G爆发式增长"},
      {"series": "5G用户（亿户）", "color": "#E8875F", "reason": "5G用户破10亿"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.3
  },
  "annotations": [
    {"text": "5G商用元年", "target": "2019", "position": "top"},
    {"text": "用户破10亿", "target": "2024", "position": "top"}
  ],
  "referenceLines": [
    {"axis": "y1", "value": 1265, "label": "基站总数1265万", "style": "dashed"}
  ],
  "theme": "default",
  "layout": {
    "padding": {"top": 20, "right": 50, "bottom": 20, "left": 50}
  }
}
```
