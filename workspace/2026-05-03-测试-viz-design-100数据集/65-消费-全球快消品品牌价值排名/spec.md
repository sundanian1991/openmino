# Compiled SPEC — 可视化编译规格

> 数据集 65：全球快消品品牌价值排名
> 渲染契约

---

## Page: 品牌价值排名

- **场景论文**：用横向柱状图揭示品牌价值的断崖式差距
- **签名视觉元素**：可口可乐 Warm 色高亮柱 + 右侧标注"品牌价值超第 2 名 4 倍"
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要突出可口可乐的极端值，其余品牌 Stone 灰化

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者以为快消品牌价值差距不大，实际存在断崖式领先

**【想传达什么】**
- 核心信息（一句话）：可口可乐以 1,064 亿美元品牌价值一骑绝尘，是第 2 名百事的 4.3 倍

**【结论】**
- 读者应得出的判断：全球快消品牌呈"一超多弱"的寡头格局，可口可乐具有不可替代的品牌资产壁垒

**【思路】**
- 视觉叙事路径：第一眼看到 Warm 色高亮的可口可乐 → 第二眼发现其他品牌紧凑排列 → 最终理解寡头格局

### 视觉编码

- **X 轴编码**：品牌价值（亿美元），从 0 到 1,100，线性刻度
- **Y 轴编码**：品牌名称，按排名从上到下排列
- **颜色编码**：可口可乐 = Warm 主色 `#c26d3a`；其余 14 个品牌 = Stone 300 `#ada599`
- **大小编码**：柱子高度一致，宽度等比于价值

### 数据组织

- **字段清单**：品牌名称、品牌价值（亿美元）、品牌类别、所属公司
- **排序规则**：按品牌价值降序排列（排名 1→15）
- **聚合规则**：无聚合，使用原始数据
- **数据示例**：Coca-Cola 1,064 / Pepsi 248 / Nestle 204

### 标注策略

- **高亮点**（≤10%）：仅 Coca-Cola（1/15 = 6.7%）
- **标注内容**："品牌价值超第 2 名 4 倍"（右侧标注，写原因+幅度）
- **基准线/参考线**：在百事价值 248 处添加虚线参考线，标记"#2 品牌"

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部左侧，16px/600/Warm800 | 结论先行 |
| 核心数据区 | 横向柱状图，可口可乐 Warm 色 | 第一眼捕获 |
| 高亮元素 | Coca-Cola 柱 Warm 色，右侧标注 | 引导关注 |
| 次要元素 | 其余 14 柱 Stone 300 灰色 | 不抢注意力 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部，距上 20px，左对齐
- **图表区**：标题下方，占画布 75%
- **标注区**：右侧，与 Coca-Cola 柱对齐
- **留白**：四周 ≥20px
- **配色**：Warm 主题 + Stone 辅助

### 图例与辅助

- **图例**：不需要
- **脚注**：数据来源：2024-2025 全球快消品品牌价值评估
- **特殊说明**：品牌价值以亿美元计

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 排名对比场景 |
| 风格选择 | restrained-warm | style-schools.md | 商业分析场景 |
| 配色选择 | Warm | color-themes.md | 主 ramp |
| 构图选择 | left-aligned-bar | composition-templates.md | 横向柱状图 |
| 字体选择 | neutral-professional | typography-moods.md | 商业场景 |
| DNA 参考 | Custom | - | McKinsey 风格排名对比 |

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
      "chartType": "bar_chart",
      "title": "可口可乐品牌价值超第 2 名 4 倍，一超格局明显",
      "subtitle": "2024-2025 · 全球快消品 TOP 15 品牌",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["品牌", "品牌价值（亿美元）", "类别", "公司"],
        "series": [
          { "name": "Coca-Cola（可口可乐）", "values": [1064], "highlight": true },
          { "name": "Pepsi（百事）", "values": [248], "highlight": false },
          { "name": "Nestle（雀巢）", "values": [204], "highlight": false },
          { "name": "Red Bull（红牛）", "values": [186], "highlight": false },
          { "name": "L'Oreal（欧莱雅）", "values": [145], "highlight": false },
          { "name": "Gillette（吉列）", "values": [82], "highlight": false },
          { "name": "Colgate（高露洁）", "values": [78], "highlight": false },
          { "name": "Pampers（帮宝适）", "values": [75], "highlight": false },
          { "name": "Nivea（妮维雅）", "values": [72], "highlight": false },
          { "name": "Dove（多芬）", "values": [68], "highlight": false },
          { "name": "Pantene（潘婷）", "values": [60], "highlight": false },
          { "name": "Head & Shoulders（海飞丝）", "values": [55], "highlight": false },
          { "name": "Heinz（亨氏）", "values": [52], "highlight": false },
          { "name": "Knorr（家乐）", "values": [48], "highlight": false },
          { "name": "Kellogg's（家乐氏）", "values": [45], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "Coca-Cola（可口可乐）", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "超第 2 名 4 倍", "target": "Coca-Cola（可口可乐）" }
      ],
      "referenceLines": [
        { "type": "vertical", "value": 248, "label": "#2 Pepsi", "style": { "color": "#ada599", "dash": [6, 4] } }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 } }
    }
  ]
}
```
