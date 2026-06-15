# Compiled SPEC — 47-农业-全球耕地面积排名

> 渲染契约。渲染技能（viz-echarts/viz-svg-flow/viz-chart）按此执行。

---

## Page: 全球耕地面积 TOP20

- **场景论文**：用横向条形图揭示全球耕地版图——印度第一，TOP3 断层领先
- **签名视觉元素**：TOP3 Warm 高亮 + 其余 Stone 灰化 + 人均标注
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要 TOP3 高亮 + 关键国家人均耕地标注，超出默认模板

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者只知道"哪个国家耕地多"，不知道"耕地多 ≠ 粮食安全"

**【想传达什么】**
- 核心信息（一句话）：印度和美国占据全球耕地前二，但人均维度暴露粮食安全的双重真相

**【结论】**
- 读者应得出的判断：总量排名掩盖了人均脆弱性——印度人均耕地仅为哈萨克斯坦的 1/14

**【思路】**
- 视觉叙事路径：第一眼看到 TOP3 条形长度（总量差距）→ 第二眼看到第 4 名开始断崖（集中度）→ 最终理解人均数据揭示的另一面

### 视觉编码

- **X 轴编码**：耕地面积（万公顷），长度编码数量
- **Y 轴编码**：国家名称（按耕地面积降序排列）
- **颜色编码**：TOP3 用 Warm 500 (#c26d3a) 高亮，其余 Stone 300 (#ada599) 灰化
- **大小编码**：条形宽度一致，不编码额外维度

### 数据组织

- **字段清单**：国家名、耕地面积（万公顷）
- **排序规则**：按耕地面积降序
- **数据示例**：印度 15650、美国 15220、中国 13500

### 标注策略

- **高亮点**（≤10%）：TOP3（3/20 = 15%，取 TOP2 即 10%）
- **标注内容**：印度条形右侧标注"人均仅 0.11 公顷"，美国条形右侧标注"人均 0.46，印度的 4 倍"
- **基准线/参考线**：无

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，Warm 800，16px/600 | 结论先行 |
| 核心数据区 | 横向条形，TOP2 高亮，其余灰化 | 突出核心对比 |
| 高亮元素 | Warm 500 填充 | 视觉第一落点 |
| 次要元素 | Stone 300 填充 | 背景参照，不抢视线 |

### 布局

- **画布**：800 × 650
- **标题区**：顶部居中，距上 20px
- **图表区**：标题下方，占画布 70%
- **标注区**：条形右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone 双 ramp

### 图例与辅助

- **图例**：不需要（高亮/灰化是自解释的）
- **脚注**：数据来源：2023 年全球耕地面积统计，单位：万公顷
- **特殊说明**：无

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 排名类数据最优解 |
| 风格选择 | restrained-warm | style-schools.md | 数据分析型场景 |
| 配色选择 | Warm + Stone | color-themes.md | 默认双 ramp |
| 构图选择 | 水平条形图 | composition-templates.md | 20 项纵向排列 |
| 字体选择 | system-ui | typography-moods.md | 理性中性 |

## 渲染契约（机器可读 JSON）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "印度和美国垄断全球前二耕地，TOP3 断层领先",
  "subtitle": "2023年 · 全球耕地面积 TOP20 国家",
  "canvas": { "width": 800, "height": 650 },
  "data": {
    "fields": ["国家", "耕地面积（万公顷）"],
    "series": [
      { "name": "印度", "values": [15650], "highlight": true },
      { "name": "美国", "values": [15220], "highlight": true },
      { "name": "中国", "values": [13500], "highlight": false },
      { "name": "俄罗斯", "values": [12130], "highlight": false },
      { "name": "巴西", "values": [8700], "highlight": false },
      { "name": "加拿大", "values": [4600], "highlight": false },
      { "name": "澳大利亚", "values": [3800], "highlight": false },
      { "name": "阿根廷", "values": [3500], "highlight": false },
      { "name": "尼日利亚", "values": [3400], "highlight": false },
      { "name": "乌克兰", "values": [3300], "highlight": false },
      { "name": "哈萨克斯坦", "values": [2900], "highlight": false },
      { "name": "土耳其", "values": [2500], "highlight": false },
      { "name": "巴基斯坦", "values": [2400], "highlight": false },
      { "name": "印度尼西亚", "values": [2350], "highlight": false },
      { "name": "墨西哥", "values": [2200], "highlight": false },
      { "name": "法国", "values": [1830], "highlight": false },
      { "name": "孟加拉国", "values": [1800], "highlight": false },
      { "name": "德国", "values": [1180], "highlight": false },
      { "name": "西班牙", "values": [1150], "highlight": false },
      { "name": "泰国", "values": [1100], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "印度", "color": "#c26d3a" },
      { "series": "美国", "color": "#c26d3a" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "人均仅 0.11 公顷", "target": "印度" },
    { "text": "人均 0.46，印度的 4 倍", "target": "美国" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 40, "left": 20 }
  }
}
```
