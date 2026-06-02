# Compiled SPEC — 全球云计算市场份额

## Page: 全球云计算市场份额柱状图

- **场景论文**：用柱状高度差揭示云计算市场的三巨头垄断格局
- **签名视觉元素**：AWS Warm 主色高亮 + 右侧标注，其余灰化
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要三巨头与长尾厂商的视觉分层

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道全球云计算市场高度集中，前三大厂商占 67%

**【想传达什么】**
- 核心信息：AWS、Azure、Google Cloud 三家主导全球云计算基础设施市场

**【结论】**
- 读者应得出的判断：云计算市场呈三足鼎立格局，新进入者面临高壁垒

**【思路】**
- 视觉叙事路径：第一眼 AWS 高亮柱体 → 第二眼前三家与后方的断层 → 最终理解市场集中度

### 视觉编码

- **X 轴编码**：云服务商名称（按份额降序排列）
- **Y 轴编码**：市场份额百分比（0%-35%）
- **颜色编码**：AWS 用 Warm 主色 `#c26d3a` 高亮，Azure/Google 用 Stone 深色 `#857d74`，其余用 Stone 浅色 `#ada599`
- **大小编码**：柱体宽度一致，高度映射份额

### 数据组织

- **字段清单**：云服务商名称、2024年市场份额(%)
- **排序规则**：按市场份额降序（"其他"放最后）
- **聚合规则**：无需聚合，使用原始数据

### 标注策略

- **高亮点**（≤10%）：仅 AWS（1/10 = 10%）
- **标注内容**：AWS 柱体右侧标注"市场第一，份额超三成"
- **基准线/参考线**：在 33% 处加虚线参考线，标注"三巨头合计占 67%"

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，16px/600，Warm800 | 结论性标题先入为主 |
| 核心数据区 | AWS 主色，其余 Stone 灰阶 | 一个核心洞察 |
| 高亮元素 | AWS 柱体 + 右侧标注 | 市场领导者 |
| 次要元素 | 其余柱体 Stone 浅色 | 不抢注意力 |

### 布局

- **画布**：800 × 550
- **标题区**：顶部居中，16px/600
- **图表区**：居中，占比 70%
- **标注区**：右侧，11px/600
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要
- **脚注**：数据来源：2024 年 Q3 全球云计算基础设施市场，总规模约 840 亿美元/季度
- **特殊说明**："其他"类别包含剩余长尾厂商

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 分类对比，10 项排名 |
| 风格选择 | restrained-warm | style-schools.md | 专业、克制 |
| 配色选择 | Warm + Stone | color-themes.md | 主色高亮 + 灰阶基准 |
| 构图选择 | 标准柱状降序 | composition-templates.md | 从左到右降序 |
| 字体选择 | system-ui | typography-moods.md | 专业冷静 |

## 渲染委托

**渲染技能**：viz-echarts

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "AWS 独占三成份额，三巨头垄断全球云计算市场",
  "subtitle": "2024 年全球云计算基础设施市场份额",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["云服务商", "市场份额(%)"],
    "series": [
      { "name": "AWS", "values": [31], "highlight": true },
      { "name": "Microsoft Azure", "values": [25], "highlight": false },
      { "name": "Google Cloud", "values": [11], "highlight": false },
      { "name": "阿里云", "values": [4], "highlight": false },
      { "name": "IBM Cloud", "values": [3], "highlight": false },
      { "name": "Salesforce", "values": [3], "highlight": false },
      { "name": "Oracle Cloud", "values": [2], "highlight": false },
      { "name": "腾讯云", "values": [2], "highlight": false },
      { "name": "华为云", "values": [2], "highlight": false },
      { "name": "其他", "values": [17], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "AWS", "color": "#c26d3a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "市场第一，份额超三成", "target": "AWS" }
  ],
  "referenceLines": [
    { "type": "horizontal", "value": 33.3, "label": "三巨头合计 67%", "style": { "color": "#ada599", "dash": [6, 4] } }
  ],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
