# Compiled SPEC — 中国外汇储备

> 渲染契约。委托 viz-echarts 执行。

---

## Page: 外储V型修复与黄金加速增持

- **场景论文**：用双轴趋势图揭示外汇储备从汇改冲击到修复再到多元化转型的三阶段叙事
- **签名视觉元素**：2022-2024 黄金增持加速段的斜率标注
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要双轴（金额 vs 吨 vs 汇率）+ 面积+折线混合 + 拐点叙事标注

### 叙事意图（从 intent 继承）

**【可视化目的】**
- 认知缺口：读者不知道外储已完全修复且结构正在转型——黄金加速增持、去美元化

**【想传达什么】**
- 核心信息（一句话）：外汇储备从 2016 低点修复至历史新高，但真正重要的是黄金三年增持 329 吨的加速信号

**【结论】**
- 读者应得出的判断：中国储备战略已从被动防守转向主动多元化，黄金增持+人民币贬值是结构转型而非短期波动

**【思路】**
- 视觉叙事路径：第一眼看到外储 V 型修复 → 第二眼对比黄金增持加速 → 最终理解储备多元化战略

### 视觉编码

- **X 轴编码**：年份（2015-2024）
- **Y 轴（左）编码**：外汇储备总额（十亿美元），折线+面积
- **Y 轴（右）编码**：黄金储备（吨）+ 汇率
- **颜色编码**：
  - 外储总额面积：Teal `#2e8b6e`（语义：正面/修复）
  - 黄金储备折线：Warm `#c26d3a`（高亮/战略亮点）
  - 汇率折线：Stone `#857d74`（中性/背景）
- **大小编码**：无

### 数据组织

- **字段清单**：year, total_reserves_usd_billion, gold_reserves_tonnes, usd_cny_avg
- **排序规则**：按 year 升序
- **聚合规则**：无聚合，使用原始年度数据
- **数据示例**：
  - 2015: 3405 十亿美元, 1762 吨, 6.23
  - 2016: 3098 十亿美元, 1843 吨, 6.64（外储低点）
  - 2024: 3456 十亿美元, 2264 吨, 7.20（外储新高+黄金加速）

### 标注策略

- **高亮点**（≤10%）：2016 年外储低点（3098）、2024 年黄金 2264 吨
- **标注内容**：
  - 2016 低点："汇改冲击后外储缩水 9%"
  - 2022-2024 黄金："3年增持329吨，加速多元化"
- **基准线/参考线**：无

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部左对齐，16px/600/Warm800 | 结论性，引导读者 |
| 外储面积 | 左轴，Teal 半透明面积 | V型修复的视觉主体 |
| 黄金折线 | 右轴，Warm 色粗线 | 核心叙事线索：加速增持 |
| 汇率折线 | 右轴，Stone 色虚线 | 背景参照 |

### 布局

- **画布**：900 × 550
- **标题区**：顶部，左对齐
- **图表区**：居中，占比 85%
- **标注区**：2016 低点 + 2024 右端
- **留白**：四周 ≥20px
- **配色**：Warm + Stone + Teal 语义色

### 图例与辅助

- **图例**：需要，底部居中，3 项（外汇储备、黄金储备、人民币汇率）
- **脚注**：数据来源 World Bank，2015-2024
- **特殊说明**：贸易顺差指标因信息密度考虑未纳入主图

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | C07 | SKILL.md | 趋势+拐点叙事 |
| 风格选择 | restrained-warm | style-schools.md | 分析场景 |
| 配色选择 | Warm+Stone+Teal | color-themes.md | 语义色编码 |
| 字体选择 | objective-analytical | typography-moods.md | 数据分析调性 |

## 渲染委托

**渲染技能**：viz-echarts

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "dual_axis",
  "title": "外储修复至历史新高，黄金加速增持透露多元化信号",
  "subtitle": "中国外汇储备、黄金储备及人民币汇率 · 2015-2024",
  "canvas": { "width": 900, "height": 550 },
  "data": {
    "fields": ["year", "total_reserves_usd_billion", "gold_reserves_tonnes", "usd_cny_avg"],
    "rows": [
      { "year": 2015, "total_reserves_usd_billion": 3405.25, "gold_reserves_tonnes": 1762, "usd_cny_avg": 6.23 },
      { "year": 2016, "total_reserves_usd_billion": 3097.66, "gold_reserves_tonnes": 1843, "usd_cny_avg": 6.64 },
      { "year": 2017, "total_reserves_usd_billion": 3235.68, "gold_reserves_tonnes": 1842, "usd_cny_avg": 6.76 },
      { "year": 2018, "total_reserves_usd_billion": 3168.22, "gold_reserves_tonnes": 1852, "usd_cny_avg": 6.62 },
      { "year": 2019, "total_reserves_usd_billion": 3222.89, "gold_reserves_tonnes": 1948, "usd_cny_avg": 6.91 },
      { "year": 2020, "total_reserves_usd_billion": 3357.24, "gold_reserves_tonnes": 1948, "usd_cny_avg": 6.90 },
      { "year": 2021, "total_reserves_usd_billion": 3427.93, "gold_reserves_tonnes": 1948, "usd_cny_avg": 6.45 },
      { "year": 2022, "total_reserves_usd_billion": 3306.84, "gold_reserves_tonnes": 2010, "usd_cny_avg": 6.74 },
      { "year": 2023, "total_reserves_usd_billion": 3449.54, "gold_reserves_tonnes": 2235, "usd_cny_avg": 7.08 },
      { "year": 2024, "total_reserves_usd_billion": 3456.02, "gold_reserves_tonnes": 2264, "usd_cny_avg": 7.20 }
    ]
  },
  "visualEncoding": {
    "leftAxis": {
      "field": "total_reserves_usd_billion",
      "type": "area",
      "color": "#2e8b6e",
      "opacity": 0.25
    },
    "rightAxis": [
      { "field": "gold_reserves_tonnes", "type": "line", "color": "#c26d3a", "width": 3, "highlight": true },
      { "field": "usd_cny_avg", "type": "line", "color": "#857d74", "width": 2, "style": "dashed", "highlight": false }
    ],
    "grayscale": false,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "汇改冲击后外储缩水9%", "target": "total_reserves_usd_billion-2016", "position": "bottom" },
    { "text": "3年增持329吨，加速多元化", "target": "gold_reserves_tonnes-2024", "position": "left" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "titlePosition": "top-left",
    "chartArea": "center",
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
