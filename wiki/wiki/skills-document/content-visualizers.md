# Content Visualizers — 信息图与编辑卡片生成器

> Sources: mino, 2026-04-28
> Raw:../../raw/skills/editorial-card-generator-SKILL.md; ../../raw/skills/infographic-creator-SKILL.md

## 概述

文本内容转视觉格式有两个主力技能，技术路径和输出风格截然不同：**editorial-card-generator** 输出社交媒体风格的 HTML5 信息图卡片（600x800px，支持 PNG 导出），适合微信/小红书等社交平台传播；**infographic-creator** 输出 AntV Infographic 结构化信息图（支持 SVG 导出），适合 PPT 演示、内部汇报、知识图谱展示。选型标准是"传播场景"而非"内容类型"——需要社交传播选 editorial-card，需要结构化呈现选 infographic。

## Editorial Card Generator — 编辑风格信息海报

### 设计风格

采用 **Modern Editorial + Swiss Style（瑞士国际主义）** 风格：秩序、高对比度、大字号排版、印刷媒体纹理。卡片尺寸严格锁定为 600x800px（3:4 比例）。

**配色方案**：
- 背景（Paper）：#f2efe9（偏白/暖灰）
- 文字（Ink）：#1a1a1a（深灰）
- 强调色（Accent）：#d95e00（爱马仕橙）——允许基于内容主题微调
- 视觉节奏：卡片应有"浅-浅-深-浅"或"浅-深-浅"的节奏变化

**字体栈**（通过 Google Fonts CDN）：Noto Serif SC（700/900）、Noto Sans SC（400/500/700）、Oswald（500/700）。

**纹理要求**：全局 SVG feTurbulence 噪声叠加，透明度 0.05~0.08，混合模式 multiply。卡片统一深色阴影（0 25px 80px rgba(0,0,0,0.4)），创造悬浮效果。

### 分页逻辑

自动分析字数和逻辑结构，确定 3-6 张卡片：

**Card 1 — 封面**：提取主标题 + 极短副标题/标语。超大字号，极简，视觉冲击力优先。突出超大数字/百分比、简短有力的标题。

**Card 2 ~ N-1 — 内容**：拆分原则是不拥挤！一个核心观点/一章 = 一张卡片。列表内容使用"列表布局"（01/02/03），深度分析使用"图文混排布局"（左文右装饰，或上文下总结）。必须包含一张**暗色模式卡片**来展示核心数据、引用或最重要的概念。

**Card N — 结尾**：结论性陈述、CTA（行动号召）或简单收尾。更多留白，平稳收尾。

### 技术实现

输出单个 HTML 文件，包含所有 CSS/JS。使用 Tailwind CSS + FontAwesome（CDN）。布局使用 flex-wrap 水平排列所有卡片，CSS 必须添加 `flex-shrink: 0` 防止卡片压缩变形。

集成 html2canvas 库实现"导出所有卡片"按钮：固定定位右上角、橙色按钮带下载图标、点击导出每张卡片为高清 PNG（2x 分辨率）、显示导出进度指示器、文件命名格式 `{topic}-card-{number}.png`。

### 实施步骤

1. **分析内容**：提取关键信息、数据点、核心论点
2. **确定卡片数**：基于内容长度和结构决定 3-6 张
3. **设计每张卡片**：封面突出最震撼的数字/标题，内容扩展至少一张暗色数据卡，总结或提问结尾
4. **编写 HTML**：导入字体、Tailwind、FontAwesome、html2canvas，编写完整 CSS（含 SVG 噪声、卡片样式、导出按钮），实现所有卡片 HTML 结构，添加导出 JS 代码
5. **输出文件**：保存为 index.html 或指定路径

## Infographic Creator — AntV 信息图

### 核心概念

`信息图 = 信息结构 + 视觉表达`。使用 AntV Infographic 将数据、信息和知识转化为可感知的视觉语言，结合视觉设计与数据可视化，用直观的符号压缩复杂信息。

### AntV Infographic DSL

使用自定义语法 DSL 描述信息图渲染配置，通过缩进描述信息：

```plain
infographic <template-name>
data
  title 标题
  desc 描述
  lists
    - label 标签
      value 12.5
      desc 说明
      icon document text
theme
  palette #3b82f6 #8b5cf6 #f97316
```

关键语法规则：
- 第一行必须是 `infographic <template-name>`
- 使用 `data` / `theme` 块，块内两空格缩进
- 键值对使用"键 空格 值"，数组使用 `-` 作为条目前
- icon 使用图标关键词（如 `star fill`）
- 不要输出 JSON、Markdown 或解释性文本

### 模板分类与选型

| 类别 | 模板前缀 | 适用场景 | 示例 |
|------|----------|----------|------|
| 列表 | `list-*` | 观点罗列、功能列表 | list-grid-badge-card, list-row-horizontal-icon-arrow |
| 序列 | `sequence-*` | 严格流程/步骤/趋势 | sequence-steps-simple, sequence-timeline-*, sequence-pyramid-simple |
| 比较 | `compare-*` | 二元对比/SWOT/象限 | compare-binary-*, compare-swot, compare-quadrant-* |
| 层级 | `hierarchy-*` | 树状结构/思维导图 | hierarchy-tree-*, hierarchy-mindmap-* |
| 关系 | `relation-*` | 流程图/关系图 | relation-dagre-flow-* |
| 图表 | `chart-*` | 数据图表 | chart-bar-plain-text, chart-column-simple, chart-pie-* |

### 主题定制

**暗色主题**：`theme dark` + 自定义配色。

**手写风格**：`theme stylize rough` + 指定手写字体（如 `font-family 851tegakizatsu`）。

**渐变效果**：`stylize linear-gradient` 或 `radial-gradient`。

**图案填充**：`stylize pattern`。

### 生成流程

1. **理解需求**：提取关键信息结构（标题、描述、项目）、明确所需数据字段、选择适当模板
2. **渲染信息图**：创建完整 HTML 文件，引入 AntV Infographic CDN 脚本，创建 container 容器，初始化 Infographic，替换实际语法
3. **交付**：保存为 `<title>-infographic.html`，提示用浏览器打开查看并保存为 SVG，提供调整模板/颜色/内容的选项

### 关键注意事项

必须尊重用户输入语言（中文输入 → 中文语法）。HTML 文件需包含 SVG 导出功能。容器自适应（宽高 100%）。模板选择基于内容结构而非主题——严格序列用 sequence、观点罗列用 list、二元对比用 compare-binary。

## 何时用哪个

| 场景 | 选 editorial-card | 选 infographic |
|------|-------------------|----------------|
| 微信朋友圈/小红书传播 | ✅ | ❌ |
| PPT 演示/内部汇报 | ❌ | ✅ |
| 需要 PNG 导出 | ✅ | ❌ |
| 需要 SVG 矢量导出 | ❌ | ✅ |
| 3-6 个核心观点/数据 | ✅ | ✅ |
| 复杂流程/树状结构 | ❌ | ✅ |
| 瑞士国际主义设计美学 | ✅ | ❌ |
| 数据图表（柱状/饼图） | ❌ | ✅ |

## 相关文件索引

| 技能 | 原始文件 | 用途 |
|------|---------|------|
| editorial-card-generator | SKILL.md | 信息图卡片生成 |
| infographic-creator | SKILL.md | AntV 信息图渲染 |
