# Phase 3 — SPEC（规格说明 + 渲染契约）

## 图1：全球移民数量TOP15

### 可视化目的
呈现全球移民绝对数量的排名格局 — 美国以5140万遥遥领先。

### 想传达什么
全球移民分布极端不均，美国一国承载约1/5的国际移民。

### 结论
美国移民数量是第2名德国的3.3倍，TOP5国家合计占全球移民的约35%。

### 思路
水平条形图让国家标签完整可读，从长到短的排列自然呈现排名，美国用强调色跳出。

### 视觉执行
- **模式**：bar_chart（水平柱状图）
- **标题**：美国承载全球1/5移民，TOP5合计超1亿
- **副标题**：2024年全球国际移民数量TOP15国家（百万人）
- **Y轴**：国家名称（15个）
- **X轴**：移民人口（百万）
- **颜色**：美国=#E8875F，其余=#B0B0B0
- **标注**：美国5140万 — 标注"全球约2.84亿移民中占18%"
- **画布**：800x550

---

## 图2：移民占总人口比例TOP10

### 可视化目的
转换视角 — 从绝对数量转向社会渗透率，揭示海湾国家才是真正的"移民社会"。

### 想传达什么
阿联酋、卡塔尔、科威特的移民占比超过70%，社会结构由移民主导。

### 结论
绝对数量最多的国家（美国15.3%）在渗透率上远低于海湾国家，移民议题需要区分"量"与"比"。

### 思路
同类型的水平条形图保持视觉一致性，颜色编码海湾国家与非海湾国家的对比。

### 视觉执行
- **模式**：bar_chart（水平柱状图）
- **标题**：海湾三国才是真正的移民社会
- **副标题**：2024年各国移民占总人口比例TOP10
- **Y轴**：国家名称（10个）
- **X轴**：占比（%）
- **颜色**：海湾三国（阿联酋/卡塔尔/科威特）=#D4A574，其余=#B0B0B0
- **标注**：阿联酋88.1% — 标注"全国近9成人口为外国出生"
- **画布**：800x550

---

## 图3：主要移民来源国分布

### 可视化目的
从"谁接收"转向"谁输出" — 展示全球移民走廊的格局。

### 想传达什么
印度是全球最大移民输出国，出现在TOP5目的地中4个国家的最大来源国列表。

### 结论
全球移民流动高度集中在少数走廊 — 墨西哥→美国是全球最大单一移民走廊（约1100万）。

### 思路
矩形树图以目的地国家为父节点，来源国为子节点，面积对应移民规模，印度作为最大输出国跨多个目的国。

### 视觉执行
- **模式**：treemap（矩形树图）
- **标题**：印度是全球最大移民输出国
- **副标题**：2024年TOP5目的国主要来源国分布
- **层级**：目的国→来源国
- **颜色**：按目的国分组着色
- **标注**：墨西哥→美国走廊1100万；印度为多目的地最大来源国
- **画布**：800x550

---

## 渲染契约（机器可读）

### 图1契约

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "美国承载全球1/5移民，TOP5合计超1亿",
  "subtitle": "2024年全球国际移民数量TOP15国家（百万人）",
  "canvas": {"width": 800, "height": 550},
  "data": {
    "fields": ["country", "immigrants_millions"],
    "series": [
      {"name": "移民数量", "values": [51.4, 15.8, 13.8, 12.4, 9.7, 8.7, 8.5, 8.3, 7.7, 7.2, 6.4, 6.1, 4.9, 3.3, 2.8], "highlight": true}
    ]
  },
  "visualEncoding": {
    "xAxis": {"name": "移民人口（百万）"},
    "yAxis": {"name": "国家", "data": ["美国","德国","沙特阿拉伯","俄罗斯","英国","阿联酋","法国","加拿大","澳大利亚","西班牙","意大利","土耳其","印度","科威特","卡塔尔"]},
    "highlight": [{"seriesIndex": 0, "dataIndex": 0, "color": "#E8875F", "label": "美国5140万"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "全球约2.84亿移民中占18%", "target": {"category": "美国"}}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {"padding": {"top": 20, "right": 20, "bottom": 20, "left": 90}}
}
```

### 图2契约

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "海湾三国才是真正的移民社会",
  "subtitle": "2024年各国移民占总人口比例TOP10",
  "canvas": {"width": 800, "height": 550},
  "data": {
    "fields": ["country", "ratio_pct"],
    "series": [
      {"name": "移民占比", "values": [88.1, 77.8, 72.8, 38.6, 29.7, 21.3, 18.8, 15.3, 15.1, 12.7], "highlight": true}
    ]
  },
  "visualEncoding": {
    "xAxis": {"name": "占总人口比例（%）"},
    "yAxis": {"name": "国家", "data": ["阿联酋","卡塔尔","科威特","沙特阿拉伯","澳大利亚","加拿大","德国","美国","西班牙","意大利"]},
    "highlight": [{"seriesIndex": 0, "dataIndex": 0, "color": "#D4A574", "label": "阿联酋88.1%"}, {"seriesIndex": 0, "dataIndex": 1, "color": "#D4A574"}, {"seriesIndex": 0, "dataIndex": 2, "color": "#D4A574"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "全国近9成人口为外国出生", "target": {"category": "阿联酋"}}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {"padding": {"top": 20, "right": 20, "bottom": 20, "left": 90}}
}
```

### 图3契约

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "treemap",
  "title": "印度是全球最大移民输出国",
  "subtitle": "2024年TOP5目的国主要来源国分布",
  "canvas": {"width": 800, "height": 550},
  "data": {
    "fields": ["destination", "source", "immigrants_millions"],
    "series": [
      {"name": "移民来源", "values": [], "highlight": true}
    ],
    "treeData": [
      {"name": "美国", "children": [
        {"name": "墨西哥", "value": 11.0},
        {"name": "印度", "value": 3.2},
        {"name": "中国", "value": 2.4}
      ]},
      {"name": "德国", "children": [
        {"name": "土耳其", "value": 2.8},
        {"name": "波兰", "value": 1.2},
        {"name": "叙利亚", "value": 0.9}
      ]},
      {"name": "沙特阿拉伯", "children": [
        {"name": "印度", "value": 3.5},
        {"name": "巴基斯坦", "value": 2.0},
        {"name": "孟加拉", "value": 1.5}
      ]},
      {"name": "俄罗斯", "children": [
        {"name": "乌克兰", "value": 2.5},
        {"name": "哈萨克斯坦", "value": 1.8},
        {"name": "乌兹别克", "value": 1.5}
      ]},
      {"name": "英国", "children": [
        {"name": "印度", "value": 1.6},
        {"name": "波兰", "value": 0.8},
        {"name": "巴基斯坦", "value": 0.6}
      ]}
    ]
  },
  "visualEncoding": {
    "highlight": [{"name": "印度", "color": "#E8875F", "label": "印度为4国最大来源国"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "墨西哥→美国：全球最大移民走廊1100万", "target": {"name": "墨西哥"}},
    {"text": "印度为4国最大来源国", "target": {"name": "印度"}}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {"padding": {"top": 20, "right": 20, "bottom": 20, "left": 20}}
}
```
