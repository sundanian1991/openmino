# Phase 3: SPEC — 数据集18 中国各省份GDP排名2023

## 叙事意图

**可视化目的**：打破"GDP大省增速也快"的直觉假设，揭示规模与增速的错位关系。

**想传达什么**：经济大省增速温和（4-6%），小省份反而跑出高增速（7-9%+）。

**结论**：中国各省呈现"大而稳、小而快"的增长格局，西藏海南等小省份增速领跑。

**思路**：散点图+象限划分是揭示两变量关系的最自然方式，象限赋予每个点位置含义。

---

## 视觉执行

### 模式选择

- **模式**：C10-散点+象限洞察
- **ECharts chartType**：scatter_chart
- **理由**：GDP vs 增速的二维分布，象限赋予分区含义

### 标题

- **主标题**：经济大省"跑马拉松"，小省份"百米冲刺"——31省GDP规模与增速错位
- **副标题**：2023年各省份GDP及增速 | 单位：亿元人民币、%

### 视觉编码

| 编码 | 映射 |
|------|------|
| X轴 | GDP（亿元人民币） |
| Y轴 | GDP增速（%） |
| 颜色 | 象限着色（4区4色，低饱和） |
| 大小 | 固定 |

### 数据组织

31个省份全量数据，按GDP降序排列。X轴=GDP，Y轴=增速。

象限划分标准：
- X轴中线：GDP中位数（约30000亿元）
- Y轴中线：增速中位数（约5.3%）

### 标注策略

- 高亮3个异常点：广东（最大GDP）、西藏（最高增速）、黑龙江（最低增速）
- 标注内容：省份名+关键数值
- 高亮比例：3/31 = 9.7%，接近10%阈值但合规

### 图例/辅助

- 象限标签直接写在图内四角
- 图例：仅说明颜色=象限归属

### 布局

- 画布：800 x 550
- 配色：Warm 色系，象限用4种低饱和暖色区分
- 31省默认灰调，标注省份用强调色

---

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "scatter_chart",
  "title": "经济大省跑马拉松，小省份百米冲刺——31省GDP规模与增速错位",
  "subtitle": "2023年各省份GDP及增速 | 单位：亿元人民币、%",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["province", "gdp_cny_billion", "growth_pct"],
    "series": [
      {
        "name": "各省GDP与增速",
        "values": [
          {"province": "广东", "gdp": 135673.16, "growth": 4.8},
          {"province": "江苏", "gdp": 128192.20, "growth": 5.8},
          {"province": "山东", "gdp": 92292.40, "growth": 6.0},
          {"province": "浙江", "gdp": 82553.00, "growth": 6.0},
          {"province": "河南", "gdp": 59132.39, "growth": 4.1},
          {"province": "四川", "gdp": 60132.90, "growth": 6.0},
          {"province": "湖北", "gdp": 55803.63, "growth": 6.0},
          {"province": "福建", "gdp": 54355.10, "growth": 4.5},
          {"province": "湖南", "gdp": 50012.85, "growth": 4.6},
          {"province": "安徽", "gdp": 47050.60, "growth": 5.8},
          {"province": "上海", "gdp": 47218.66, "growth": 5.0},
          {"province": "河北", "gdp": 43944.10, "growth": 5.5},
          {"province": "北京", "gdp": 43760.70, "growth": 5.2},
          {"province": "陕西", "gdp": 33786.07, "growth": 4.3},
          {"province": "江西", "gdp": 32200.10, "growth": 4.1},
          {"province": "重庆", "gdp": 30145.79, "growth": 6.1},
          {"province": "辽宁", "gdp": 30209.40, "growth": 5.3},
          {"province": "云南", "gdp": 30021.00, "growth": 4.4},
          {"province": "广西", "gdp": 27201.80, "growth": 4.1},
          {"province": "山西", "gdp": 22307.40, "growth": 5.0},
          {"province": "内蒙古", "gdp": 24627.00, "growth": 7.3},
          {"province": "贵州", "gdp": 20913.25, "growth": 4.9},
          {"province": "新疆", "gdp": 19125.91, "growth": 6.8},
          {"province": "天津", "gdp": 16737.30, "growth": 4.3},
          {"province": "黑龙江", "gdp": 15883.90, "growth": 2.6},
          {"province": "吉林", "gdp": 13531.19, "growth": 6.3},
          {"province": "甘肃", "gdp": 11863.80, "growth": 6.4},
          {"province": "海南", "gdp": 7551.18, "growth": 9.2},
          {"province": "宁夏", "gdp": 5315.00, "growth": 6.6},
          {"province": "青海", "gdp": 3799.10, "growth": 5.3},
          {"province": "西藏", "gdp": 2392.96, "growth": 9.5}
        ]
      }
    ]
  },
  "xAxis": {
    "type": "value",
    "name": "GDP（亿元人民币）",
    "nameLocation": "center",
    "nameGap": 30
  },
  "yAxis": {
    "type": "value",
    "name": "增速（%）",
    "min": 2,
    "max": 10
  },
  "visualEncoding": {
    "highlight": [
      {"series": "各省GDP与增速", "point": "西藏", "color": "#E8875F", "label": "西藏 9.5%"},
      {"series": "各省GDP与增速", "point": "广东", "color": "#E8875F", "label": "广东 13.6万亿"},
      {"series": "各省GDP与增速", "point": "黑龙江", "color": "#E8875F", "label": "黑龙江 2.6%"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1,
    "quadrants": [
      {"label": "追赶区", "position": "topLeft", "description": "低规模高增速"},
      {"label": "理想区", "position": "topRight", "description": "高规模高增速"},
      {"label": "挑战区", "position": "bottomLeft", "description": "低规模低增速"},
      {"label": "成熟区", "position": "bottomRight", "description": "高规模低增速"}
    ]
  },
  "annotations": [
    {"text": "西藏：增速9.5%，全国最快", "target": "西藏"},
    {"text": "广东：GDP 13.6万亿，全国最大", "target": "广东"},
    {"text": "黑龙江：增速2.6%，全国最低", "target": "黑龙江"}
  ],
  "referenceLines": [
    {"axis": "x", "value": 30000, "label": "GDP中位数", "dashed": true},
    {"axis": "y", "value": 5.3, "label": "增速中位数", "dashed": true}
  ],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 20,
      "right": 20,
      "bottom": 20,
      "left": 20
    },
    "legend": {
      "show": false
    }
  }
}
```
