# Compiled SPEC — 全球酒店集团排名

> 模式B：AI推荐 | Phase 3 | 渲染契约

---

## Page: 全球酒店集团客房数排名

- **场景论文**：用横向柱状图揭示全球酒店集团格局——万豪单王领先，但中国三强合计已超越
- **签名视觉元素**：万豪 + 中国三强 Warm 高亮，其余 Stone 灰化
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要双级高亮（万豪单独高亮 + 中国三强分组高亮），默认模板只有单一高亮

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者只看排名以为万豪遥遥领先，忽略中国三大集团合计体量已超万豪

**【想传达什么】**
- 核心信息（一句话）：中国三大酒店集团合计客房数已超过全球第一的万豪

**【结论】**
- 读者应得出的判断：中国酒店集团已具备全球竞争力，不可忽视

**【思路】**
- 视觉叙事路径：第一眼万豪最高（感知"全球第一"）→ 第二眼中国三强集中高亮（感知"集群力量"）→ 最终理解中国集团合计超越万豪

### 视觉编码

- **X 轴编码**：客房数（万间），数值大小决定柱条长度
- **Y 轴编码**：酒店集团名称，按客房数降序排列
- **颜色编码**：万豪用 Warm 主色 `#c26d3a`（全球第一信号），中国三强用 Warm 浅色 `#e8a87c`（集群信号），其余 Stone `#ada599`（背景）
- **大小编码**：柱条高度统一，长度映射客房数

### 数据组织

- **字段清单**：酒店集团名称、客房数（万间）
- **排序规则**：按客房数降序
- **聚合规则**：无
- **数据示例**：万豪 160+、希尔顿 120+、锦江 120+

### 标注策略

- **高亮点**（≤10%）：4/15 = 27%，超标。调整为仅万豪高亮（1/15 = 6.7%），中国三强用 Stone 400 区分于其余 Stone 300
- **标注内容**：万豪旁标注"全球客房数第一"；底部脚注注明中国三强合计客房数
- **基准线/参考线**：无

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，Warm800 标题色 | 结论先行 |
| 核心数据区 | 横向柱状，万豪橙色高亮最长 | 第一眼焦点 |
| 高亮元素 | 万豪 #c26d3a | 全球第一信号 |
| 次要元素 | 其余 Stone 灰化 | 减少干扰 |

### 布局

- **画布**：800 × 550
- **标题区**：顶部居中，16px/600
- **图表区**：占画布 70%，左对齐
- **标注区**：右侧标注万豪，底部脚注
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要（颜色含义由标注说明）
- **脚注**：数据来源：Hotels Magazine Top 300（2024）
- **特殊说明**：锦江、华住、首旅如家客房数含并购（卢浮集团等）

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 分类对比，"谁多谁少" |
| 风格选择 | restrained-warm | style-schools.md | 冷静专业 |
| 配色选择 | Warm + Stone | color-themes.md | 主色+辅助 |
| 构图选择 | 横向柱状 | composition-templates.md | 长标签友好 |
| 字体选择 | system-ui | typography-moods.md | 中性专业 |
| DNA 参考 | Custom | - | 排名对比 |

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "万豪客房数全球第一，中国三强合计已超万豪",
  "subtitle": "2024年 · 全球15家主要酒店集团",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["酒店集团", "客房数(万间)"],
    "series": [
      { "name": "万豪国际", "values": [160], "highlight": true },
      { "name": "希尔顿", "values": [120], "highlight": false },
      { "name": "洲际酒店集团", "values": [94], "highlight": false },
      { "name": "温德姆", "values": [84], "highlight": false },
      { "name": "雅高", "values": [82], "highlight": false },
      { "name": "Choice Hotels", "values": [62], "highlight": false },
      { "name": "首旅如家", "values": [50], "highlight": false },
      { "name": "美高梅", "values": [5], "highlight": false },
      { "name": "四季", "values": [4], "highlight": false },
      { "name": "香格里拉", "values": [4], "highlight": false },
      { "name": "最佳西方", "values": [31], "highlight": false },
      { "name": "凯悦", "values": [30], "highlight": false },
      { "name": "锦江国际", "values": [120], "highlight": false },
      { "name": "华住集团", "values": [100], "highlight": false },
      { "name": "文华东方", "values": [1.5], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "万豪国际", "color": "#c26d3a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "全球客房数第一", "target": "万豪国际" },
    { "text": "中国三强合计: 锦江120+华住100+首旅50≈270万间", "target": "footnote" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
