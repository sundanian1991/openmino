# spec.md — 全球手机品牌出货量

## 可视化目的

让读者一眼看出2024年全球手机品牌出货量排名格局，同时注意到两个关键变化：苹果首超三星，华为暴增35%。

## 想传达什么

全球智能手机市场格局正在重塑——苹果登顶，华为回归。

## 结论

苹果以232百万台（20.1%）首次超过三星（223百万台，19.4%），华为出货量同比暴增35%至68百万台，重新进入头部阵营。

## 思路

选用横向柱状图：12个品牌类目，从上到下按出货量递减排列。苹果和华用橙色高亮，其余灰阶呈现。关键增幅用内联标签标注。

## 视觉执行

**模式选择**：模式13 — 柱状图（分类对比）
**渲染目标**：viz-echarts
**图表类型**：bar_chart（横向）

**标题**：苹果首超三星登顶全球手机出货量第一
**副标题**：2024年全球智能手机品牌出货量 · 单位：百万台

**视觉编码**：
- 长度编码出货量
- 颜色编码关注度（橙色=高亮，灰色=背景）
- Y轴为品牌名称，从上到下递减

**数据组织**：
- 字段：品牌、出货量(百万台)、市场份额
- 排序：出货量降序
- 过滤：保留TOP 10 + "其他"

**标注策略**：
- 高亮：苹果（#1地位）、华为（+35%暴增）
- 标注：华为柱内"+35%"、Nothing旁"+80%*"
- 脚注：*Nothing基数极小（10百万台），增幅参考意义有限

**布局**：
- 画布：800 x 550px
- 横向条形图，左侧品牌标签，右侧数值
- 图例：仅标注高亮含义

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "苹果首超三星登顶全球手机出货量第一",
  "subtitle": "2024年全球智能手机品牌出货量 · 单位：百万台",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["brand", "shipment_m", "market_share"],
    "series": [
      {
        "name": "出货量（百万台）",
        "values": [232, 223, 170, 122, 115, 98, 68, 55, 42, 35, 453],
        "labels": ["苹果", "三星", "小米", "OPPO", "vivo", "传音", "华为", "荣耀", "摩托罗拉", "Realme", "其他"],
        "highlight": true
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"series": "出货量", "index": 0, "color": "#E8875F", "reason": "#1 苹果登顶"},
      {"series": "出货量", "index": 6, "color": "#E8875F", "reason": "华为+35%暴增回归"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.18
  },
  "annotations": [
    {"text": "+35% 暴增", "target": "华为", "position": "right"},
    {"text": "首超三星", "target": "苹果", "position": "right"},
    {"text": "*基数极小", "target": "Nothing", "position": "right", "fontSize": 10}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {"top": 20, "right": 40, "bottom": 20, "left": 80}
  }
}
```
