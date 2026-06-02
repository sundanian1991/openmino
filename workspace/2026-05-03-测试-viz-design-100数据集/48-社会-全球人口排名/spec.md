# Compiled SPEC — 48-社会-全球人口排名

> 渲染契约。渲染技能（viz-echarts/viz-svg-flow/viz-chart）按此执行。

---

## Page: 全球人口 TOP20

- **场景论文**：用横向条形图+增长率色彩信号揭示——印度登顶，但未来在非洲
- **签名视觉元素**：印度/中国 Warm 高亮 + 增长率 Teal/Coral 圆点信号
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要增长率语义色信号（正/负）+ 关键国家标注

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者知道排名，但看不到增长率的"未来信号"

**【想传达什么】**
- 核心信息（一句话）：印度超越中国登顶，但真正的变革在非洲——三国年增 2.4%+

**【结论】**
- 读者应得出的判断：今天的人口排名不代表明天的格局，非洲是未来三十年的人口增长引擎

**【思路】**
- 视觉叙事路径：第一眼印度和中国条形几乎等长（超越在毫厘）→ 第二眼 TOP7 后陡峭落差（两超多强）→ 最终理解增长率信号揭示的版图重绘

### 视觉编码

- **X 轴编码**：人口（亿），长度编码数量
- **Y 轴编码**：国家名称（按人口降序排列）
- **颜色编码**：印度/中国用 Warm 500 (#c26d3a) 高亮，其余 Stone 300；增长率用 Teal（正增长）和 Coral（负增长）圆点标注
- **大小编码**：条形宽度一致

### 数据组织

- **字段清单**：国家名、人口（亿）、年增长率（%）
- **排序规则**：按人口降序
- **数据示例**：印度 14.42、中国 14.08、美国 3.40

### 标注策略

- **高亮点**（≤10%）：TOP2（2/20 = 10%）
- **标注内容**：印度标注"正式超越中国，全球第一"，刚果金标注"增长最快 3.1%"，中国标注"-0.1% 进入负增长"
- **基准线/参考线**：无

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，Warm 800，16px/600 | 结论先行 |
| 核心数据区 | 横向条形，TOP2 高亮，其余灰化 | 突出印度超越 |
| 高亮元素 | Warm 500 填充 | 视觉第一落点 |
| 次要元素 | Stone 300 填充 + 增长率圆点 | 背景参照 + 未来信号 |

### 布局

- **画布**：800 × 650
- **标题区**：顶部居中，距上 20px
- **图表区**：标题下方，占画布 70%
- **标注区**：条形右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone + Teal/Coral 语义色

### 图例与辅助

- **图例**：需要 — 增长率圆点图例（Teal = 正增长，Coral = 负增长），右上角
- **脚注**：数据来源：2024 年全球人口估计，单位：亿人
- **特殊说明**：无

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 排名类数据最优解 |
| 风格选择 | restrained-warm | style-schools.md | 数据分析型场景 |
| 配色选择 | Warm + Stone + Teal/Coral | color-themes.md | 默认 + 语义色 |
| 构图选择 | 水平条形图 | composition-templates.md | 20 项纵向排列 |
| 字体选择 | system-ui | typography-moods.md | 理性中性 |

## 渲染契约（机器可读 JSON）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "印度超越中国登顶全球第一人口大国，增长引擎转向非洲",
  "subtitle": "2024年估计 · 全球人口 TOP20 国家",
  "canvas": { "width": 800, "height": 650 },
  "data": {
    "fields": ["国家", "人口（亿）"],
    "series": [
      { "name": "印度", "values": [14.42], "highlight": true },
      { "name": "中国", "values": [14.08], "highlight": true },
      { "name": "美国", "values": [3.40], "highlight": false },
      { "name": "印度尼西亚", "values": [2.80], "highlight": false },
      { "name": "巴基斯坦", "values": [2.40], "highlight": false },
      { "name": "尼日利亚", "values": [2.30], "highlight": false },
      { "name": "巴西", "values": [2.16], "highlight": false },
      { "name": "孟加拉国", "values": [1.74], "highlight": false },
      { "name": "俄罗斯", "values": [1.44], "highlight": false },
      { "name": "墨西哥", "values": [1.30], "highlight": false },
      { "name": "埃塞俄比亚", "values": [1.29], "highlight": false },
      { "name": "日本", "values": [1.23], "highlight": false },
      { "name": "菲律宾", "values": [1.18], "highlight": false },
      { "name": "埃及", "values": [1.13], "highlight": false },
      { "name": "刚果（金）", "values": [1.05], "highlight": false },
      { "name": "越南", "values": [0.99], "highlight": false },
      { "name": "伊朗", "values": [0.90], "highlight": false },
      { "name": "土耳其", "values": [0.86], "highlight": false },
      { "name": "德国", "values": [0.84], "highlight": false },
      { "name": "泰国", "values": [0.72], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "印度", "color": "#c26d3a" },
      { "series": "中国", "color": "#c26d3a" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "正式超越中国，全球第一", "target": "印度" },
    { "text": "-0.1% 进入负增长", "target": "中国" },
    { "text": "增长最快 3.1%", "target": "刚果（金）" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 40, "left": 20 }
  }
}
```
