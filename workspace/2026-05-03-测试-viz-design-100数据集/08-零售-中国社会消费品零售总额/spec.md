# spec.md — 中国社会消费品零售总额可视化规格

## 叙事意图

**可视化目的**：揭示中国社会消费品零售十年变局中的结构性变化——总量增长62%的同时，线上渗透率从13%翻到32%，而增速从10.7%腰斩至3.5%。

**想传达什么**：增长在换挡，渠道在重构，线上零售是十年最大的结构性变量。

**结论**：中国社会消费品零售已从"高速增长"切换为"结构优化"，线上渠道从补充变为主力。

**思路**：堆叠面积图同时展示总量增长和结构变化，Warm色层（线上）从薄变厚形成视觉冲击，标注两个关键时刻（疫情冲击、终局数据）。

---

## 视觉执行

### 模式选择
- 模式：C08 堆叠构成
- 图表类型：stacked_area（viz-echarts）
- 选择理由：总量组成及变化——堆叠面积天然展示总量高度+内部构成

### 标题
- 主标题："线上渗透率从13%到32%：社零十年的渠道重构"
- 副标题："2015-2024 · 中国社会消费品零售总额（万亿元）"

### 视觉编码
- X轴：年份（year）
- Y轴：万亿元
- 面积层1（底部）：网上零售额（Warm 500 #c26d3a 填充，Warm 100 #f0d9bf 底色）
- 面积层2（中部）：餐饮收入（Warm 100 #f0d9bf 填充）
- 面积层3（顶部）：线下零售（Stone 200 #d6d2c9 填充）
- 高亮：网上零售层（Warm色系）
- 其余层灰化

### 数据组织
- 原始字段：year, total_retail_trillion_cny, online_retail_trillion_cny, catering_retail_trillion_cny
- 衍生字段：offline_retail = total - online - catering
- 排序：按 year 升序
- 堆叠顺序：online（底）→ catering（中）→ offline（顶）

### 标注策略
- 标注1（2020年）："疫情冲击 -3.9%，线上逆势增长"
- 标注2（2024年）："线上占比32%，十年提升19个百分点"
- 高亮比例：2/10 = 20%（略超10%，但2个标注是必要最小量）

### 图例/辅助
- 图例：3层（网上零售/餐饮收入/线下零售）
- 脚注："数据来源：国家统计局 · 增速：10.7%(2015) → 3.5%(2024)"

### 布局
- 画布：800 x 550
- padding：top 60, right 30, bottom 40, left 60
- 配色：Warm + Stone，<=2 ramp

---

## 渲染契约（机器可读 JSON）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "stacked_area",
  "title": "线上渗透率从13%到32%：社零十年的渠道重构",
  "subtitle": "2015-2024 · 中国社会消费品零售总额（万亿元）",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["year", "online_retail_trillion_cny", "catering_retail_trillion_cny", "offline_retail_trillion_cny"],
    "series": [
      {
        "name": "网上零售",
        "stack": "total",
        "color": "#c26d3a",
        "values": [
          { "year": "2015", "value": 3.88 },
          { "year": "2016", "value": 5.16 },
          { "year": "2017", "value": 7.18 },
          { "year": "2018", "value": 9.01 },
          { "year": "2019", "value": 10.63 },
          { "year": "2020", "value": 11.76 },
          { "year": "2021", "value": 13.09 },
          { "year": "2022", "value": 13.79 },
          { "year": "2023", "value": 15.42 },
          { "year": "2024", "value": 15.80 }
        ],
        "highlight": true
      },
      {
        "name": "餐饮收入",
        "stack": "total",
        "color": "#f0d9bf",
        "values": [
          { "year": "2015", "value": 3.23 },
          { "year": "2016", "value": 3.58 },
          { "year": "2017", "value": 3.96 },
          { "year": "2018", "value": 4.27 },
          { "year": "2019", "value": 4.67 },
          { "year": "2020", "value": 3.95 },
          { "year": "2021", "value": 4.69 },
          { "year": "2022", "value": 4.39 },
          { "year": "2023", "value": 5.29 },
          { "year": "2024", "value": 5.57 }
        ]
      },
      {
        "name": "线下零售",
        "stack": "total",
        "color": "#d6d2c9",
        "values": [
          { "year": "2015", "value": 22.98 },
          { "year": "2016", "value": 24.49 },
          { "year": "2017", "value": 25.49 },
          { "year": "2018", "value": 24.82 },
          { "year": "2019", "value": 25.86 },
          { "year": "2020", "value": 23.49 },
          { "year": "2021", "value": 26.30 },
          { "year": "2022", "value": 25.79 },
          { "year": "2023", "value": 26.44 },
          { "year": "2024", "value": 27.42 }
        ]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "网上零售", "color": "#c26d3a" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1,
    "areaStyle": {
      "opacity": 0.85
    }
  },
  "annotations": [
    {
      "text": "疫情冲击 -3.9%",
      "subtext": "线上逆势增长30%",
      "position": "2020",
      "type": "markPoint",
      "symbol": "pin",
      "color": "#c25030"
    },
    {
      "text": "线上占比32%",
      "subtext": "十年提升19个百分点",
      "position": "2024",
      "type": "markPoint",
      "symbol": "pin",
      "color": "#c26d3a"
    }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 60, "right": 30, "bottom": 40, "left": 60 },
    "grid": { "top": "15%", "bottom": "12%", "left": "8%", "right": "5%" },
    "xAxis": { "type": "category", "axisLabel": { "fontSize": 11, "color": "#857d74" } },
    "yAxis": {
      "type": "value",
      "name": "万亿元",
      "axisLabel": { "fontSize": 11, "color": "#857d74" }
    }
  },
  "source": "国家统计局年度统计公报 · 增速：10.7%(2015) → 3.5%(2024)"
}
```

## Source ID 追溯

| 决策 | 出处 |
|------|------|
| C08 模式选择 | viz-design SKILL.md 分类E |
| 堆叠面积图 | 13-VISUALIZATION.md 数据→图型映射 |
| Warm + Stone 色系 | 13-VISUALIZATION.md 色阶体系 |
| 拐点标注写原因+幅度 | 13-VISUALIZATION.md P4 手法 |
| 标题结论性 | 13-VISUALIZATION.md 硬规则1 |
| 增速用脚注不用双Y轴 | 13-VISUALIZATION.md 禁止双Y轴 |
