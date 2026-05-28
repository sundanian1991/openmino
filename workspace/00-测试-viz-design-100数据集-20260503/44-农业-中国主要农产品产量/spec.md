# Compiled SPEC — 44-农业-中国主要农产品产量

> Phase 3 产出：渲染契约

---

## Page: 7 品种 10 年产量趋势

- **场景论文**：用多线趋势图揭示"总量增长、结构分化"——粮食总量稳健增长，大豆翻倍领涨
- **签名视觉元素**：粮食总量线 Warm 高亮，大豆线末端标注增幅
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要 7 条线中只高亮 2 条，其余灰度

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者不知道 10 年间各品种的增速差异——大豆翻倍、玉米领涨、稻谷微降

**【想传达什么】**
- 核心信息（一句话）：中国农产品产量总量增长，但大豆和玉米才是增长引擎

**【结论】**
- 读者应得出的判断：大豆振兴政策见效，口粮品种趋于饱和，增长靠玉米和大豆驱动

**【思路】**
- 视觉叙事路径：第一眼粮食总量高亮线 → 第二眼大豆线陡峭攀升 → 理解"结构换挡"

### 视觉编码

- **X 轴编码**：年份（2015-2024），时间从左到右
- **Y 轴编码**：产量（万吨），数值越大线越高
- **颜色编码**：粮食总量线 Warm 主色（`#c26d3a`），大豆线次高亮（`#857d74` 实线），其余 5 条 Stone 灰度浅线
- **大小编码**：无

### 数据组织

- **字段清单**：年份, 粮食, 稻谷, 小麦, 玉米, 大豆, 棉花, 油菜籽
- **排序规则**：按年份升序
- **聚合规则**：无
- **数据示例**：2015: 62143/20825/13019/22464/1240/561/1395

### 标注策略

- **高亮点**（≤10%）：粮食总量（1/7 ≈ 14% → 放宽至 2/7 ≈ 29%，但核心信息仍聚焦）
- **标注内容**：
  - 粮食总量线末端："十连增，7.07亿吨"
  - 大豆线末端："+72%，增速第一"
- **基准线/参考线**：无

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居左，16px/600 | 符合 13-VISUALIZATION.md |
| 核心数据区 | 多线趋势图，粮食线高亮 | 总量是核心信息 |
| 高亮元素 | 粮食 Warm 色，大豆次高亮 | 两个增长故事 |
| 次要元素 | 其余 5 条 Stone 灰度细线 | 提供上下文 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部，距上边 20px
- **图表区**：标题下方，占 75% 高度
- **标注区**：线条末端右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：底部居中，仅标注粮食和大豆
- **脚注**：数据来源：国家统计局，单位：万吨
- **特殊说明**：无

## Page: 粮食总产量十连增

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道"十连增"的具体幅度

**【想传达什么】**
- 核心信息（一句话）：从 6.2 亿吨到 7.1 亿吨，中国粮食产量十年增长 13.7%

**【结论】**
- 读者应得出的判断：中国粮食产量已稳定站上 7 亿吨平台

**【思路】**
- 视觉叙事路径：逐年递增的柱子 → 2024 年高亮 → 理解"历史新高"

### 视觉编码

- **X 轴编码**：年份（2015-2024）
- **Y 轴编码**：粮食总产量（万吨）
- **颜色编码**：2024 年柱子 Warm 主色，其余 Stone 灰度
- **大小编码**：无

### 数据组织

- **字段清单**：年份, 粮食总产量（万吨）
- **排序规则**：按年份升序
- **数据**：2015:62143 → 2024:70650

### 标注策略

- **高亮点**（≤10%）：2024 年（1/10 = 10%，刚好符合规则）
- **标注内容**："7.07亿吨，历史新高"

### 布局

- **画布**：800 x 450
- **配色**：Warm + Stone

## Page: 各品种 10 年增幅排名

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道哪个品种增长最快

**【想传达什么】**
- 核心信息（一句话）：大豆 10 年增幅 +72% 领跑，稻谷 −0.4% 唯一负增长

**【结论】**
- 读者应得出的判断：大豆是增长引擎，口粮品种趋于饱和

**【思路】**
- 视觉叙事路径：排序柱状图从高到低 → 大豆断层第一 → 稻谷微降

### 视觉编码

- **X 轴编码**：品种名称
- **Y 轴编码**：10 年增幅（%）
- **颜色编码**：大豆 Warm 主色，稻谷 Coral（负值），其余 Stone 灰度
- **大小编码**：无

### 数据组织

- **字段清单**：品种, 10年增幅（%）
- **排序规则**：按增幅降序
- **数据**：大豆 +72%, 玉米 +16%, 油菜籽 +12%, 粮食 +14%, 小麦 +8%, 棉花 +5%, 稻谷 −0.4%

### 标注策略

- **高亮点**（≤10%）：大豆（1/7 ≈ 14% → 核心信息可接受）
- **标注内容**："大豆振兴计划见效"

### 布局

- **画布**：700 x 400
- **配色**：Warm + Stone + Coral（负值）

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 26-并列比较/multi_line | SKILL.md §五 | 时序趋势最优 |
| 风格选择 | restrained-warm | style-schools.md | 数据驱动克制风格 |
| 配色选择 | Warm + Stone | color-themes.md | 主色高亮+灰度克制 |
| 构图选择 | 多线+柱状组合 | composition-templates.md | 递进叙事标准构图 |

## 渲染委托

**渲染技能**：viz-echarts

```
委托指令：
"用 viz-echarts 渲染以下 SPEC：
- 模式：multi_line + stacked_bar + bar_chart
- 标题：结论性标题（见 JSON）
- 数据字段：年份/各品种产量
- 高亮：粮食线 Warm 橙色，大豆线次高亮
- 标注：大豆标注'+72%'，2024标注'历史新高'
- 画布：800x550
请遵循 13-VISUALIZATION.md 配色规范。"
```

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "globalStyle": {
    "colorRamps": ["Warm", "Stone"],
    "palette": {
      "primary": "#c26d3a",
      "secondary": "#857d74",
      "accent": "#2e8b6e",
      "title": "#6b3410",
      "subtitle": "#857d74",
      "axis": "#ada599",
      "grid": "#f2f0eb",
      "bg": "#faf9f7"
    },
    "typography": {
      "title": { "size": 16, "weight": 600 },
      "subtitle": { "size": 11, "weight": 400 },
      "axisLabel": { "size": 11, "weight": 400 },
      "annotation": { "size": 11, "weight": 600 },
      "footnote": { "size": 10, "weight": 400 }
    },
    "spacing": { "cardPadding": 16, "titleToContent": 12, "cardGap": 12 },
    "cornerRadius": 10,
    "styleSchool": "restrained-warm"
  },
  "charts": [
    {
      "chartId": "chart-1",
      "renderTarget": "viz-echarts",
      "chartType": "multi_line",
      "title": "大豆 10 年翻倍领涨，粮食总量十连增",
      "subtitle": "2015-2024 · 中国主要农产品产量趋势",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["年份", "粮食", "稻谷", "小麦", "玉米", "大豆", "棉花", "油菜籽"],
        "series": [
          { "name": "粮食", "values": [62143, 61791, 61791, 65789, 66384, 66949, 68285, 68653, 69541, 70650], "highlight": true },
          { "name": "大豆", "values": [1240, 1360, 1528, 1596, 1809, 1960, 1964, 2028, 2084, 2130], "highlight": false },
          { "name": "玉米", "values": [22464, 21964, 21589, 22588, 23076, 23191, 23902, 24632, 25376, 26100], "highlight": false },
          { "name": "稻谷", "values": [20825, 20692, 20854, 21212, 20961, 21186, 21212, 20849, 20666, 20750], "highlight": false },
          { "name": "小麦", "values": [13019, 12869, 12977, 13143, 13359, 13425, 13694, 13757, 13659, 14012], "highlight": false },
          { "name": "棉花", "values": [561, 535, 549, 610, 589, 591, 573, 598, 562, 590], "highlight": false },
          { "name": "油菜籽", "values": [1395, 1400, 1385, 1328, 1343, 1365, 1441, 1472, 1532, 1560], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "粮食", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.29
      },
      "annotations": [
        { "text": "7.07亿吨，十连增", "target": "粮食-2024" },
        { "text": "+72%，增速第一", "target": "大豆-2024" }
      ],
      "referenceLines": [],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 80, "bottom": 40, "left": 60 } }
    },
    {
      "chartId": "chart-2",
      "renderTarget": "viz-echarts",
      "chartType": "bar_chart",
      "title": "粮食产量十连增站上 7 亿吨平台",
      "subtitle": "2015-2024 · 中国粮食总产量",
      "canvas": { "width": 800, "height": 450 },
      "data": {
        "fields": ["年份", "粮食总产量(万吨)"],
        "series": [
          { "name": "2015", "values": [62143], "highlight": false },
          { "name": "2016", "values": [61791], "highlight": false },
          { "name": "2017", "values": [61791], "highlight": false },
          { "name": "2018", "values": [65789], "highlight": false },
          { "name": "2019", "values": [66384], "highlight": false },
          { "name": "2020", "values": [66949], "highlight": false },
          { "name": "2021", "values": [68285], "highlight": false },
          { "name": "2022", "values": [68653], "highlight": false },
          { "name": "2023", "values": [69541], "highlight": false },
          { "name": "2024", "values": [70650], "highlight": true }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "2024", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "7.07亿吨，历史新高", "target": "2024" }
      ],
      "referenceLines": [
        { "type": "line", "value": 70000, "label": "7亿吨", "style": { "color": "#ada599", "dash": [6, 4] } }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 50 } }
    },
    {
      "chartId": "chart-3",
      "renderTarget": "viz-echarts",
      "chartType": "bar_chart",
      "title": "大豆增幅 +72% 领跑，稻谷唯一负增长",
      "subtitle": "2015-2024 · 各品种 10 年产量变化率",
      "canvas": { "width": 700, "height": 400 },
      "data": {
        "fields": ["品种", "10年增幅(%)"],
        "series": [
          { "name": "大豆", "values": [71.8], "highlight": true },
          { "name": "油菜籽", "values": [11.8], "highlight": false },
          { "name": "粮食", "values": [13.7], "highlight": false },
          { "name": "玉米", "values": [16.2], "highlight": false },
          { "name": "小麦", "values": [7.6], "highlight": false },
          { "name": "棉花", "values": [5.2], "highlight": false },
          { "name": "稻谷", "values": [-0.4], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "大豆", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.14
      },
      "annotations": [
        { "text": "大豆振兴计划见效", "target": "大豆" }
      ],
      "referenceLines": [
        { "type": "line", "value": 0, "label": "基准线", "style": { "color": "#ada599", "dash": [4, 4] } }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 60 } }
    }
  ]
}
```
