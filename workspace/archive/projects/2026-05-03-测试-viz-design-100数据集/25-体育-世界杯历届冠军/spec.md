# Phase 3: spec.md — 编译规格

## 数据集
25-体育-世界杯历届冠军

---

## 第一部分：叙事意图

### 【可视化目的】
回答"谁是世界杯历史最强国家队"这个认知缺口。

### 【想传达什么】
巴西 5 冠独占榜首，德意各 4 冠紧追，三国合计占 68% 的冠军。

### 【结论】
世界杯 92 年历史（1930-2022），冠军集中在 3 支传统强队。

### 【思路】
水平条形图按冠军次数降序排列，"谁最多"一目了然。高亮巴西强调独一档地位。

---

## 第二部分：视觉执行

### 【模式选择】
- 模式 13 — 柱状图（水平条形图）
- 理由：8 个国家 × 冠军次数，天然分类对比

### 【标题】
- 主标题：巴西 5 冠领跑世界杯，德意各 4 冠紧随其后
- 副标题：1930-2022 年 · 22 届世界杯 · 8 个冠军国家

### 【视觉编码】
- X 轴：冠军次数（数值）
- Y 轴：国家名称（类别，按次数降序）
- 颜色：巴西 = Warm 500（#c26d3a），其余 = Stone 300（#ada599）
- 高亮比例：1/8 国家 = 12.5%

### 【数据组织】
- 字段：国家、冠军次数
- 排序：按冠军次数降序
- 数据：巴西 5、德国 4、意大利 4、阿根廷 3、法国 2、乌拉圭 2、英格兰 1、西班牙 1

### 【标注策略】
- 高亮：仅巴西
- 标注：巴西条形旁标注 "1958-2002"

### 【图例/辅助】
- 脚注：数据来源 FIFA 官方记录

### 【布局】
- 画布：800 × 550
- 标题位置：顶部居中
- 配色：Warm + Stone，≤2 ramp
- 柱形圆角：顶部 6px
- Y 轴标签：国家名直接标注，不另设图例

---

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "巴西 5 冠领跑世界杯，德意各 4 冠紧随其后",
  "subtitle": "1930-2022 年 · 22 届世界杯 · 8 个冠军国家",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["country", "titles"],
    "series": [
      {
        "name": "冠军次数",
        "values": [
          {"country": "巴西", "titles": 5, "highlight": true},
          {"country": "德国", "titles": 4},
          {"country": "意大利", "titles": 4},
          {"country": "阿根廷", "titles": 3},
          {"country": "法国", "titles": 2},
          {"country": "乌拉圭", "titles": 2},
          {"country": "英格兰", "titles": 1},
          {"country": "西班牙", "titles": 1}
        ]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"series": "冠军次数", "value": "巴西", "color": "#c26d3a"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.125
  },
  "annotations": [
    {"text": "1958-2002", "target": "巴西"}
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
