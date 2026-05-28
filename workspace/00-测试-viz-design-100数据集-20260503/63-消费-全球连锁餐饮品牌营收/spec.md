# SPEC — 全球连锁餐饮品牌营收排名（2024）

## 可视化目的
让读者一眼感知全球连锁餐饮品牌营收的量级差距和集中格局。

## 想传达什么
麦当劳484亿美元一骑绝尘，美国品牌主导全球餐饮。

## 结论
全球连锁餐饮营收高度集中，Top 3 占15品牌总营收的59%。

## 思路
用水平条形图按营收降序排列，高亮 McDonald's 形成视觉锚点，其余灰化，让差距自己说话。

---

## 渲染规格

### 模式选择
- **模式**：13-柱状图 → viz-echarts `bar_chart`
- **匹配理由**：15个品牌的一维数值对比，水平条形图最适合品类较多的排名展示

### 标题
- **主标题**：麦当劳484亿美元领跑，美国品牌垄断全球餐饮前十
- **副标题**：2024年全球连锁餐饮品牌营收排名 Top 15

### 视觉编码
- **Y轴**：品牌名称（按营收降序）
- **X轴**：营收（亿美元），从0开始
- **颜色**：McDonald's 用 Warm 500（#c26d3a），其余 Stone 300（#ada599）
- **长度**：编码营收数值

### 数据组织

**字段**：品牌名、营收（亿美元）、高亮标记

**排序**：营收降序

**数据（15条）**：

| 品牌 | 营收(亿美元) | 高亮 |
|------|-------------|------|
| McDonald's | 484 | true |
| Starbucks | 363 | false |
| KFC | 345 | false |
| Subway | 178 | false |
| Taco Bell | 150 | false |
| Burger King | 120 | false |
| Chick-fil-A | 110 | false |
| Domino's Pizza | 95 | false |
| Wendy's | 72 | false |
| Pizza Hut | 68 | false |
| Tim Hortons | 55 | false |
| Dunkin' | 50 | false |
| Panera Bread | 45 | false |
| Chipotle | 42 | false |
| Nando's | 35 | false |

### 标注策略
- **高亮**：仅 McDonald's（1/15 = 6.7%，符合 ≤10%）
- **关键标注**："是第2名星巴克的1.3倍"标注在 McDonald's 条形末端
- **参考线**：无

### 图例/辅助
- **脚注**：数据来源：Technomic Top 500（2024）、Brandirectory 2024、各公司年报
- **特殊说明**：麦当劳系统全口径营收（含加盟店）约1300亿美元，本表为公司口径

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
  "chartType": "bar_chart",
  "title": "麦当劳484亿美元领跑，美国品牌垄断全球餐饮前十",
  "subtitle": "2024年全球连锁餐饮品牌营收排名 Top 15",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["brand", "revenue", "highlight"],
    "series": [
      {
        "name": "McDonald's",
        "values": [484],
        "highlight": true
      },
      {
        "name": "Starbucks",
        "values": [363],
        "highlight": false
      },
      {
        "name": "KFC",
        "values": [345],
        "highlight": false
      },
      {
        "name": "Subway",
        "values": [178],
        "highlight": false
      },
      {
        "name": "Taco Bell",
        "values": [150],
        "highlight": false
      },
      {
        "name": "Burger King",
        "values": [120],
        "highlight": false
      },
      {
        "name": "Chick-fil-A",
        "values": [110],
        "highlight": false
      },
      {
        "name": "Domino's Pizza",
        "values": [95],
        "highlight": false
      },
      {
        "name": "Wendy's",
        "values": [72],
        "highlight": false
      },
      {
        "name": "Pizza Hut",
        "values": [68],
        "highlight": false
      },
      {
        "name": "Tim Hortons",
        "values": [55],
        "highlight": false
      },
      {
        "name": "Dunkin'",
        "values": [50],
        "highlight": false
      },
      {
        "name": "Panera Bread",
        "values": [45],
        "highlight": false
      },
      {
        "name": "Chipotle",
        "values": [42],
        "highlight": false
      },
      {
        "name": "Nando's",
        "values": [35],
        "highlight": false
      }
    ]
  },
  "visualEncoding": {
    "highlight": ["McDonald's"],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {
      "text": "是第2名的1.3倍",
      "target": "McDonald's"
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
