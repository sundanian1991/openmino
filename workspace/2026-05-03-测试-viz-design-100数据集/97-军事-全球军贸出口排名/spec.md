# spec.md — 全球军贸出口排名

## 可视化目的

**为什么要做**：让读者在 3 秒内理解全球军贸市场的权力格局 — 不是多极竞争，而是美国单极主导。

**想传达什么**：美国 43% 的份额不是"领先一点"，而是碾压式的。

**结论**：全球军贸市场是美国一家独大的格局，但韩国、土耳其等新锐正在挑战旧秩序。

**思路**：水平条形图是最直接的排名对比方式。降序排列 + 美国高亮 + 新锐标注 = 三层格局一目了然。

## 视觉执行

### 模式选择

- **模式**：13 — 柱状图（水平条形图）
- **理由**：15 个分类的量级对比，水平条形标签可读性最佳

### 标题

- **主标题**：美国主导全球军贸市场，出口份额超第 2-6 名总和
- **副标题**：2020-2024 年 · 15 个主要武器出口国

### 视觉编码

- **Y 轴**：国家名称（15 个）
- **X 轴**：全球军贸出口份额（%）
- **颜色**：美国 = Warm 500（#c26d3a），韩国/土耳其 = Warm 300（#d4a574），其余 = Stone 400（#857d74）
- **柱顶**：显示百分比数值

### 数据组织

- **字段**：国家（category）、份额（value, %）、标签（label）
- **排序**：按份额降序
- **聚合**：无，使用原始数据

### 标注策略

- **高亮**：美国（核心）+ 韩国/土耳其（新锐标注）
- **标注内容**：美国柱旁写 "43%，超第2-6名总和"；韩国写 "新锐↑"；土耳其写 "新锐↑"

### 图例/辅助

- **脚注**：数据来源：SIPRI 2024 年国际军备转让趋势报告
- **参考线**：10% 和 5% 处各一条 Stone 200 虚线

### 布局

- **画布**：800 x 550
- **标题位置**：顶部居中
- **Padding**：top 50, right 30, bottom 30, left 100（左侧留宽给国家标签）

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "美国主导全球军贸市场，出口份额超第2-6名总和",
  "subtitle": "2020-2024年 · 15个主要武器出口国 · SIPRI数据",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["country", "share_pct"],
    "series": [
      {
        "name": "出口份额(%)",
        "values": [43.0, 10.5, 8.0, 5.5, 4.5, 3.5, 3.2, 2.8, 2.0, 2.0, 1.8, 1.5, 1.2, 1.0, 0.8],
        "categories": ["美国", "法国", "俄罗斯", "中国", "德国", "意大利", "英国", "韩国", "西班牙", "以色列", "土耳其", "瑞典", "荷兰", "瑞士", "挪威"]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"index": 0, "color": "#c26d3a", "label": "43% = #2~#6总和"},
      {"index": 7, "color": "#d4a574", "label": "新锐↑"},
      {"index": 10, "color": "#d4a574", "label": "新锐↑"}
    ],
    "grayscale": true,
    "defaultColor": "#857d74",
    "maxHighlightRatio": 0.2,
    "orientation": "horizontal",
    "valueLabel": true
  },
  "annotations": [
    {"text": "43% = 第2~6名总和", "target": "美国", "style": "right"},
    {"text": "新锐↑", "target": "韩国", "style": "right"},
    {"text": "新锐↑", "target": "土耳其", "style": "right"}
  ],
  "referenceLines": [
    {"value": 10, "label": "强国线", "color": "#d6d2c9", "dash": [4, 3]},
    {"value": 5, "label": "门槛线", "color": "#d6d2c9", "dash": [4, 3]}
  ],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 50,
      "right": 60,
      "bottom": 30,
      "left": 90
    }
  },
  "source": {
    "dataSource": "SIPRI 2024年国际军备转让趋势报告",
    "pattern": "模式13-柱状图",
    "styleSchool": "McKinsey Exhibit"
  }
}
```
