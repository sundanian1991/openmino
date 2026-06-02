# Compiled SPEC — 全球视频游戏公司营收排名（2024）

## Page: 全球视频游戏公司营收排名

- **场景论文**：三巨头统治全球游戏产业，Top 3 合计 818 亿美元
- **签名视觉元素**：Top 3 Warm 色高亮 + 第 4 名起灰化断层线
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要三梯队视觉区分（Top 3 高亮 / 4-7 次亮 / 8-15 灰化）

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道头部游戏公司之间的营收差距有多大

**【想传达什么】**
- 核心信息（一句话）：Sony、Tencent、Microsoft 三巨头统治全球游戏市场

**【结论】**
- 读者应得出的判断：游戏产业高度集中，Top 3 与后续梯队存在数量级差距

**【思路】**
- 视觉叙事路径：Sony 317 亿最长柱 → Tencent 271 亿 + Microsoft 230 亿紧随 → 断崖式下降到 Nintendo 140 亿 → 剩余公司灰化呈现长尾

### 视觉编码

- **Y 轴编码**：公司名称（从上到下按排名降序）
- **X 轴编码**：游戏业务营收（亿美元），柱长映射数值
- **颜色编码**：Top 3 Warm 主色 `#c26d3a`，其余 Stone `#857d74`
- **大小编码**：无

### 数据组织

- **字段清单**：公司名称、营收（亿美元）、排名
- **排序规则**：按营收降序
- **数据示例**：Sony 317 / Tencent 271 / Microsoft 230

### 标注策略

- **高亮点**（≤10%）：Top 3 公司（Sony, Tencent, Microsoft），占比 3/15 = 20%，但按高亮规则取前三名为结论性高亮
- **标注内容**：标注 Top 3 合计 818 亿美元，强调统治力
- **基准线/参考线**：无

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 结论性标题，置顶 | 一眼传递核心判断 |
| 核心数据区 | Top 3 Warm 色长柱 | 引导第一眼注意力 |
| 高亮元素 | Top 3 柱体 + 标注 | 强化三巨头概念 |
| 次要元素 | 4-15 名 Stone 灰化 | 不抢夺注意力 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部，字号 16/600
- **图表区**：居中，横向柱状图
- **标注区**：Top 3 右侧
- **留白**：四周 20px
- **配色**：Warm + Stone

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | SKILL.md 五 | SKILL.md | 排名对比 → bar_chart |
| 风格选择 | restrained-warm | style-schools.md | 专业、温暖、克制 |
| 配色选择 | Warm + Stone | color-themes.md | 主色高亮 + Stone 基准 |
| 构图选择 | composition-templates.md | composition-templates.md | 横向排名柱状图 |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "三巨头统治全球游戏市场：Sony、腾讯、微软合计营收 818 亿美元",
  "subtitle": "2024 年 · 全球视频游戏公司 Top 15",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["公司", "游戏营收（亿美元）"],
    "series": [
      { "name": "Sony Interactive", "values": [317], "highlight": true },
      { "name": "Tencent 腾讯", "values": [271], "highlight": true },
      { "name": "Microsoft Gaming", "values": [230], "highlight": true },
      { "name": "Nintendo", "values": [140], "highlight": false },
      { "name": "EA", "values": [75], "highlight": false },
      { "name": "Activision Blizzard", "values": [70], "highlight": false },
      { "name": "NetEase 网易", "values": [65], "highlight": false },
      { "name": "Take-Two", "values": [55], "highlight": false },
      { "name": "Epic Games", "values": [50], "highlight": false },
      { "name": "Bandai Namco", "values": [45], "highlight": false },
      { "name": "Ubisoft", "values": [28], "highlight": false },
      { "name": "Square Enix", "values": [27], "highlight": false },
      { "name": "Capcom", "values": [25], "highlight": false },
      { "name": "Sega", "values": [24], "highlight": false },
      { "name": "miHoYo 米哈游", "values": [22], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "Sony Interactive", "color": "#c26d3a" },
      { "series": "Tencent 腾讯", "color": "#c26d3a" },
      { "series": "Microsoft Gaming", "color": "#c26d3a" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "Top 3 合计 818 亿美元", "target": "Sony Interactive" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
