# SPEC — 中国快递业务量变化（2015-2025）

## 可视化目的
让读者直观感受中国快递业务量十年近10倍的爆炸式增长，以及2022年拐点后的V型反弹韧性。

## 想传达什么
十年增长近10倍，2022年骤降后迅速反弹。

## 结论
中国快递业务量从206.7亿件飙升至1989.5亿件，占全球约67%，2025年人均年使用120件。

## 思路
用折线图展示2015-2025年快递业务量趋势，高亮2022年拐点，用文字标注关键增速，一条线讲好"增长-断崖-反弹"的故事。

---

## 渲染规格

### 模式选择
- **模式**：07-折线图 → viz-echarts `line_chart`
- **匹配理由**：11年连续时间序列，折线图是趋势表达的标准选择，2022年拐点天然形成叙事焦点

### 标题
- **主标题**：十年增长近10倍，中国快递业务量突破2000亿件
- **副标题**：2015-2025年中国快递业务量变化

### 视觉编码
- **X轴**：年份（2015-2025）
- **Y轴**：快递业务量（亿件），从0开始
- **颜色**：2022年拐点及之后用 Warm 500（#c26d3a），之前用 Stone 300（#ada599）
- **线宽**：高亮段 3px，非高亮段 1.5px

### 数据组织

**字段**：年份、业务量（亿件）、高亮标记

**排序**：时间升序

**数据（11条）**：

| 年份 | 业务量(亿件) | 高亮 |
|------|-------------|------|
| 2015 | 206.7 | false |
| 2016 | 312.8 | false |
| 2017 | 400.6 | false |
| 2018 | 507.1 | false |
| 2019 | 635.2 | false |
| 2020 | 833.6 | false |
| 2021 | 1083.0 | false |
| 2022 | 1105.8 | true |
| 2023 | 1320.7 | false |
| 2024 | 1750.8 | false |
| 2025 | 1989.5 | false |

### 标注策略
- **高亮**：2022年拐点节点（1/11 = 9%，符合 ≤10%）
- **关键标注1**："增速骤降至2.1%"标注在2022年拐点处
- **关键标注2**："V型反弹→32.6%"标注在2024年数据点旁
- **关键标注3**："十年×9.6倍"标注在图表右上角

### 图例/辅助
- **脚注**：数据来源：国家邮政局。中国快递业务量占全球约67%。
- **特殊说明**：无

### 布局
- **画布**：800 x 550
- **Padding**：top 20, right 20, bottom 20, left 20
- **主题**：default（Warm + Stone）

---

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "line_chart",
  "title": "十年增长近10倍，中国快递业务量突破2000亿件",
  "subtitle": "2015-2025年中国快递业务量变化",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["year", "volume", "highlight"],
    "series": [
      {
        "name": "2015",
        "values": [206.7],
        "highlight": false
      },
      {
        "name": "2016",
        "values": [312.8],
        "highlight": false
      },
      {
        "name": "2017",
        "values": [400.6],
        "highlight": false
      },
      {
        "name": "2018",
        "values": [507.1],
        "highlight": false
      },
      {
        "name": "2019",
        "values": [635.2],
        "highlight": false
      },
      {
        "name": "2020",
        "values": [833.6],
        "highlight": false
      },
      {
        "name": "2021",
        "values": [1083.0],
        "highlight": false
      },
      {
        "name": "2022",
        "values": [1105.8],
        "highlight": true
      },
      {
        "name": "2023",
        "values": [1320.7],
        "highlight": false
      },
      {
        "name": "2024",
        "values": [1750.8],
        "highlight": false
      },
      {
        "name": "2025",
        "values": [1989.5],
        "highlight": false
      }
    ]
  },
  "visualEncoding": {
    "highlight": ["2022"],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {
      "text": "增速骤降至2.1%",
      "target": "2022"
    },
    {
      "text": "V型反弹至32.6%",
      "target": "2024"
    },
    {
      "text": "十年×9.6倍",
      "target": "chart-top-right"
    }
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
