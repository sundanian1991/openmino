# Diagram Design — 技术图表设计系统

> Sources: mino, 2026-04-28
> Raw: ../../raw/skills/diagram-design-SKILL.md; ../../raw/skills/diagram-design-README.md; ../../raw/skills/diagram-design-style-guide.md; ../../raw/skills/diagram-design-onboarding.md; ../../raw/skills/diagram-design-type-architecture.md; ../../raw/skills/diagram-design-type-flowchart.md; ../../raw/skills/diagram-design-type-sequence.md; ../../raw/skills/diagram-design-type-state.md; ../../raw/skills/diagram-design-type-er.md; ../../raw/skills/diagram-design-type-timeline.md; ../../raw/skills/diagram-design-type-swimlane.md; ../../raw/skills/diagram-design-type-quadrant.md; ../../raw/skills/diagram-design-type-nested.md; ../../raw/skills/diagram-design-type-tree.md; ../../raw/skills/diagram-design-type-layers.md; ../../raw/skills/diagram-design-type-venn.md; ../../raw/skills/diagram-design-type-pyramid.md; ../../raw/skills/diagram-design-primitive-annotation.md; ../../raw/skills/diagram-design-primitive-sketchy.md; ../../raw/skills/diagram-design-brand-skilljar.md

## 概述

Diagram Design 是一个完整的编辑级技术图表设计系统，由 Cathryn Lavery 创建。支持 13 种图表类型，输出自包含的 HTML 文件（内联 SVG + CSS，无 JS 依赖）。核心理念是"最高质量的操作通常是删除"——每个节点都代表一个独特的想法，强调色仅用于 1-2 个焦点元素，目标密度 4/10。内置品牌自适应能力，可在 60 秒内从用户网站提取配色和字体。

## 设计哲学

**最高质量的操作是删除**。每一条来自 impeccable 的核心原则被应用到图表设计中：

- 每个节点代表一个独特想法。两个总是一起出现的节点应该合并为一个
- 每条连接都携带信息。如果关系从布局中显而易见，删除连线
- 强调色是编辑性的，不是信号旗。每个图表 1-2 个焦点节点，用在 5 个节点上等于擦除了信号
- 图表不是在所有东西都加完时完成的，而是在没有什么可以删除时完成的

**目标密度：4/10**。足够的技术完整性，但不密到需要指南。超过 9 个节点时，应该拆分为两个图表。

**使用判断**：仅在读者从视觉中学到的比从段落、表格或项目符号列表中更多时使用。如果 3 列表格能传达相同信息，选表格。

## 13 种图表类型

| 类型 | 适用场景 | 复杂度上限 |
|------|----------|------------|
| **Architecture** | 组件 + 系统连接 | 9 节点 / 12 连线 |
| **Flowchart** | 带分支的决策逻辑 | 9 节点 / 12 转换 |
| **Sequence** | 时间排序的消息交互 | 5 条生命线 |
| **State machine** | 状态 + 转换 + 守卫条件 | 9 状态 / 12 转换 |
| **ER / data model** | 实体 + 字段 + 关系 | 8 实体 |
| **Timeline** | 按时间定位的事件 | 9 事件 |
| **Swimlane** | 跨职能流程与交接 | 5 泳道 |
| **Quadrant** | 双轴定位/优先级 | 12 项目 |
| **Nested** | 通过包含关系表达层级 | 6 层嵌套 |
| **Tree** | 父 → 子关系 | 4 层深度 |
| **Layer stack** | 堆叠的抽象层次 | 6 层 |
| **Venn** | 集合重叠 | 3 圆 |
| **Pyramid / funnel** | 排名层次或转换漏斗 | 6 层 |

类型选择规则：如果结合两种类型，选择主轴——不混合语法。如果超出复杂度预算，拆分为概览 + 详情。

## 设计系统

### 语义角色

所有颜色、排版和令牌通过语义角色管理（而非硬编码色值），确保可换肤：

| 角色 | 用途 |
|------|------|
| `paper`, `paper-2` | 页面背景和容器背景 |
| `ink` | 主要文本/描边 |
| `muted`, `soft` | 次要文本、默认箭头、子标签 |
| `rule`, `rule-solid` | 发丝级边框 |
| `accent`, `accent-tint` | 每图 1-2 个焦点元素 |
| `link` | HTTP/API 调用、外部箭头 |

### 节点类型处理

| 节点类型 | 填充 | 描边 |
|----------|------|------|
| **Focal**（最多 1-2 个） | accent-tint | accent |
| **Backend / API / Step** | white | ink |
| **Store / State** | ink @ 0.05 | muted |
| **External / Cloud** | ink @ 0.03 | ink @ 0.30 |
| **Input / User** | muted @ 0.10 | soft |
| **Optional / Async** | ink @ 0.02 | ink @ 0.20 虚线 4,3 |
| **Security / Boundary** | accent @ 0.05 | accent @ 0.50 虚线 4,4 |

### 排版

三字体家族，各司其职：

- **Instrument Serif**（1.75rem, 400）— 仅用于页面标题 H1，斜体用于编辑旁注
- **Geist sans**（12px, 600）— 节点名称（人类可读标签）
- **Geist Mono**（9px）— 技术子标签（端口、URL、字段类型）；7-8px 用于眉标/标签；8px 用于箭头标签

**核心原则**：Mono 仅用于技术内容。名称用 Geist sans。永远不用 JetBrains Mono 作为通用的"开发者"字体。

## 4px 网格系统

**所有值——字号、padding、节点尺寸、间距、x/y 坐标——必须是 4 的倍数。** 不可协商。

| 类别 | 允许值 |
|------|--------|
| 字号 | 8, 12, 16, 20, 24, 28, 32, 40 |
| 节点宽度/高度 | 80, 96, 112, 120, 128, 140, 144, 160, 180, 200, 240, 320 |
| x/y 坐标 | 4 的倍数 |
| 节点间距 | 20, 24, 32, 40, 48 |
| box 内 padding | 8, 12, 16 |
| 圆角 | 4, 6, 8 |

豁免项：线条粗细（0.8, 1, 1.2）、不透明度值、22x22 点阵图案。快速检查：如果坐标以 1、2、3、5、6、7、9 结尾——修正它。

## 通用反模式

以下标记为"AI 劣质"图表的特征：

| 反模式 | 原因 |
|--------|------|
| 暗色模式 + 青色/紫色发光 | 看起来"技术"但没有任何设计决策 |
| JetBrains Mono 作为通用"开发者"字体 | Mono 用于技术内容——端口、命令、URL |
| 每个节点相同的盒子 | 擦除了层次结构 |
| 图例浮动在图表区域内 | 与节点冲突 |
| 箭头标签没有遮罩矩形 | 穿透线条 |
| 箭头上垂直 `writing-mode` 文字 | 不可读 |
| 3 个等宽摘要卡片作为默认 | 通用网格——应该变化宽度 |
| 任何元素上的阴影 | 阴影已淘汰。边框才是主流 |
| 盒子上 `rounded-2xl` | 最大圆角 6-10px 或无 |
| 每个"重要"节点都用强调色 | 强调色是 1-2 个编辑焦点，不是信号系统 |

## 品牌自适应（Onboarding）

技能的核心差异化能力：60 秒内从用户网站提取品牌。

**工作流程**：用户指定网站 → 抓取首页 → 提取主导色 + 字体栈 → 映射到语义角色（paper, ink, muted, accent, link）→ 显示建议的差异 → 写入 style-guide.md。

自动提取对应关系：
- `<body>` 背景色 → paper 令牌
- 主要文本颜色 → ink 令牌
- 次要/标题文字 → muted 令牌
- 卡片/容器 → paper-2 令牌
- 最常用的品牌色（CTA、链接、标题）→ accent 令牌
- `<h1>` 字体族 → title 字体
- `<body>` 字体族 → node-name 字体
- `<code>/<pre>` 字体 → sublabel 字体

提取前自动验证 WCAG AA 对比度。如果网站颜色在图表尺寸（9-12px）下不达标，会建议调整值并说明原因。

**首次运行门控**：技能不会在品牌项目中静默使用默认皮肤输出图表。首次使用时检查 style-guide.md 是否已自定义。如果没有，暂停并询问用户：是运行 onboarding、手动粘贴令牌，还是继续使用默认。

## SVG 核心构件

### 箭头标记

定义三种箭头标记，始终包含：

| 箭头 | 颜色 | 用途 |
|------|------|------|
| Default | muted（#52534e） | 内部、通用 |
| Accent | coral（#f7591f） | 主要/高亮/标题 |
| Link-blue | #1a70c7 | HTTP/API 调用、外部系统 |

虚线箭头使用 `stroke-dasharray="5,4"` 加任意颜色，表示可选、被动、返回、异步。

### 绘制顺序

**箭头先于盒子绘制**，以确保 z-order 将线条放在节点后面。

### 箭头标签

每个箭头标签需要一个不透明的矩形遮罩。规则：≤14 字符、全大写、居中对齐段中点、线上方 8-10px。禁止垂直 `writing-mode` 文字。

### 图例

**永远不要将图例放在图表区域内。** 放置在底部水平条带中，用发丝分隔线隔离。SVG viewBox 高度需扩展约 60px。

### 编辑旁注（Annotation Callout）

斜体 Instrument Serif + 虚线贝塞尔引导线，用于坐在边距中的编辑旁注。

### Sketchy 变体（可选）

SVG 湍流 + 位移映射滤镜，为手绘感觉。适合文章，不适合技术文档。

## 页面布局

1. **Header** — 眉标（Geist Mono）、标题（Instrument Serif）、可选副标题（Geist muted）
2. **Diagram container** — 背景色、1px 边框、8px 圆角、overflow-x: auto
3. **Summary cards** — 2-3 列网格，使用变化的宽度（如 1.1fr 1fr 0.9fr）
4. **Footer** — 印刷术信息，Geist Mono，muted，顶部发丝分隔线

摘要卡片规则：背景用 #ffffff（不是 paper），1px 边框，6px 圆角，无 box-shadow。卡片圆点 7px，50% 圆角。

## 预输出检查清单（Taste Gate）

**类型匹配**：选对了类型吗？表格/段落能做同样的事吗？加载了对应的 type-*.md 参考文件吗？

**删除测试**：能删除任何节点吗？能合并任何两个节点吗？能删除任何箭头吗？能删除任何标签吗？

**信号**：强调色用在 ≤2 个元素上吗？图例覆盖了所有使用的类型且没有多余？在类型的复杂度预算内？

**技术**：箭头先于盒子绘制？每个箭头标签有不透明矩形遮罩？图例是底部水平条带？没有垂直 writing-mode 文字？viewBox 为图例扩展了？所有字号、坐标、宽度、高度、间距都是 4 的倍数？

**排版**：人类可读名称用 Geist sans 而非 Mono？技术子标签用 Mono？页面标题用 Instrument Serif？编辑旁注用斜体 Instrument Serif？没有任何地方用了 JetBrains Mono？
