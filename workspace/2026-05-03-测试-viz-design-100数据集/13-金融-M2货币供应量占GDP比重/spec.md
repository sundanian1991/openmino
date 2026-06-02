# Compiled SPEC — M2货币供应量占GDP比重

> 渲染契约。委托 viz-echarts 执行。

---

## Page: M2深化加速 vs M1活性骤降

- **场景论文**：用双轴趋势图揭示"总量扩张与活性萎缩并存"的矛盾格局
- **签名视觉元素**：M1-M2 增速剪刀差 gap 标注
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要双轴（比重 vs 增速）+ 面积+折线混合，标准折线图无法同时表达累积量和增速

### 叙事意图（从 intent 继承）

**【可视化目的】**
- 认知缺口：读者不知道 M2/GDP 持续走高的同时 M1 增速断崖下行意味着什么

**【想传达什么】**
- 核心信息（一句话）：M2/GDP 比重十年攀升 30 个百分点，但 M1 增速从 15.2% 降至 1.1%，流动性陷阱信号明确

**【结论】**
- 读者应得出的判断：货币政策传导效率显著下降，货币总量扩张未能激活实体经济流动性

**【思路】**
- 视觉叙事路径：第一眼看到 M2/GDP 面积持续扩张 → 第二眼对比 M1 增速断崖下行 → 最终理解剪刀差扩大的结构性含义

### 视觉编码

- **X 轴编码**：年份（2015-2024）
- **Y 轴（左）编码**：M2/GDP 比重（%），面积图呈现
- **Y 轴（右）编码**：增速（%），折线呈现
- **颜色编码**：
  - M2/GDP 面积：Teal `#2e8b6e`（语义：正面/总量）
  - M2 增速折线：Stone `#857d74`（中性）
  - M1 增速折线：Warm `#c26d3a`（高亮/警示）
- **大小编码**：无

### 数据组织

- **字段清单**：year, broad_money_pct_gdp, m2_growth_pct, m1_growth_pct
- **排序规则**：按 year 升序
- **聚合规则**：无聚合，使用原始年度数据
- **数据示例**：
  - 2015: 198.2%, 13.3%, 15.2%
  - 2020: 207.5%, 10.1%, 8.6%
  - 2024: 227.5%, 7.3%, 1.1%

### 标注策略

- **高亮点**（≤10%）：2024 年 M1 增速 1.1% 终端点（Warm 色高亮）
- **标注内容**：M1 增速从 15.2% 骤降至 1.1%，降幅 93%（写原因：企业活期存款意愿锐减）
- **基准线/参考线**：无

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部左对齐，16px/600/Warm800 | 结论性，引导读者预期 |
| M2/GDP 面积 | 左轴，Teal 半透明面积 | 总量感，一眼感知扩张幅度 |
| M1 增速折线 | 右轴，Warm 色粗线 | 核心叙事线索，高亮下行 |
| M2 增速折线 | 右轴，Stone 色细线 | 对比参照，非核心 |

### 布局

- **画布**：900 × 550
- **标题区**：顶部，左对齐
- **图表区**：居中，占比 85%
- **标注区**：2024 年右端，标注框
- **留白**：四周 ≥20px
- **配色**：Warm + Stone + Teal 语义色

### 图例与辅助

- **图例**：需要，底部居中，3 项（M2/GDP 比重、M2 增速、M1 增速）
- **脚注**：数据来源 World Bank，2015-2024
- **特殊说明**：GDP 增速指标因信息密度考虑未纳入主图

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
  "title": "M2持续深化，M1活性骤降：流动性陷阱信号明确",
  "subtitle": "中国 M2/GDP 比重及货币增速 · 2015-2024",
  "canvas": { "width": 900, "height": 550 },
  "data": {
    "fields": ["year", "broad_money_pct_gdp", "m2_growth_pct", "m1_growth_pct"],
    "rows": [
      { "year": 2015, "broad_money_pct_gdp": 198.2, "m2_growth_pct": 13.3, "m1_growth_pct": 15.2 },
      { "year": 2016, "broad_money_pct_gdp": 203.6, "m2_growth_pct": 11.3, "m1_growth_pct": 21.4 },
      { "year": 2017, "broad_money_pct_gdp": 197.8, "m2_growth_pct": 8.2, "m1_growth_pct": 11.8 },
      { "year": 2018, "broad_money_pct_gdp": 191.6, "m2_growth_pct": 8.1, "m1_growth_pct": 1.5 },
      { "year": 2019, "broad_money_pct_gdp": 194.1, "m2_growth_pct": 8.7, "m1_growth_pct": 4.4 },
      { "year": 2020, "broad_money_pct_gdp": 207.5, "m2_growth_pct": 10.1, "m1_growth_pct": 8.6 },
      { "year": 2021, "broad_money_pct_gdp": 199.6, "m2_growth_pct": 9.0, "m1_growth_pct": 3.5 },
      { "year": 2022, "broad_money_pct_gdp": 212.0, "m2_growth_pct": 11.8, "m1_growth_pct": 3.7 },
      { "year": 2023, "broad_money_pct_gdp": 222.0, "m2_growth_pct": 9.7, "m1_growth_pct": 1.3 },
      { "year": 2024, "broad_money_pct_gdp": 227.5, "m2_growth_pct": 7.3, "m1_growth_pct": 1.1 }
    ]
  },
  "visualEncoding": {
    "leftAxis": {
      "field": "broad_money_pct_gdp",
      "type": "area",
      "color": "#2e8b6e",
      "opacity": 0.25
    },
    "rightAxis": [
      { "field": "m2_growth_pct", "type": "line", "color": "#857d74", "width": 2, "highlight": false },
      { "field": "m1_growth_pct", "type": "line", "color": "#c26d3a", "width": 3, "highlight": true }
    ],
    "grayscale": false,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "M1增速骤降93%：企业活期存款意愿锐减", "target": "m1_growth_pct-2024", "position": "left" }
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
