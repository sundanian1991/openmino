# 视觉形式库

> 按视觉形式组织，不按功能类型。选组件时想"它长什么样"，不想"它是什么功能"。

---

## 结构特征（8 类上层抽象）

选组件前先判断结构特征，再选具体组件。同一结构特征下的组件互为变体，节奏规划时视为"同族"——相邻区块不得使用同族组件。

| 结构特征 | 视觉特征 | 适合内容 | 同族组件 | CSS 类 |
|----------|---------|---------|---------|--------|
| **双栏对照** | 左右并排，各占一半 | 对比关系（禁止vs推荐、旧vs新、两股力量） | Tension Grid, Pipeline/VS, Comparison Block | `.tension-grid`, `.flow-pipeline`, `.comparison` |
| **方阵排列** | 等分网格，每格同质 | 大量同质数据的目录展示 | Numeral Grid, Card Triad/Quad, KPI Grid | `.hero-numeral`, `.card-triad`, `.card-quad`, `.kpi-grid` |
| **不等分网格** | 大小格子混排 | 内容有优先级差异 | Bento Grid, Layer Stack | `.bento-grid`, `.layer-stack` |
| **锚点+列表** | 左固定+右延伸 | 深度阅读、步骤流程 | Typography Showcase, Step Sequence | `.typo-showcase`, `.step-sequence` |
| **链式节点** | 横向/纵向连接节点 | 流程、经过、阶段 | Timeline Track, Level Track | `.timeline-track`, `.level-track` |
| **段状条** | 分段的水平条 | 权重、比例、配额 | Segmented Bar, Weight Bar, Stacked Bar, Rank Bar | `.seg-bar`, `.weight-row`, `.stacked-bar`, `.rank-bar` |
| **大数字+小标签** | hero 数字+上下文 | 一两个关键指标 | Metric Card, Stat Block, KPI Card | `.metric-card`, `.stat-block`, `.kpi-card` |
| **紧凑数据行** | 标签+值+迷你条 | 信息密度高的行内数据 | Inline Data Row, Sparkline, Data Table | `.inline-data-row`, `.sparkline`, `.data-table` |

**节奏规则**：不连续两个 section 用同一种结构特征。

---

## 分级逻辑

| 级别 | 权重 | 使用频率 | 选择依据 |
|------|------|---------|---------|
| **Hero 级** | 最重 | 整页 1 处 | 决定视觉基调，与锚点类型绑定 |
| **Section 级** | 中等 | 每区 1 处 | 承载区块核心信息，形式需与锚点匹配 |
| **Detail 级** | 轻量 | 每区可多处 | 数据细节，形式随内容自然选择 |
| **Decorative 级** | 可选 | 点缀 | 不承载信息，仅增加视觉密度 |

---

## Hero 级（整页仅一处）

### HF-01 · Full-width Statement

全幅文字声明。Georgia 超大字（96–120px），浅色背景，数据推到下方或边缘。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 宣言 |
| 布局配合 | light |
| 信息密度 | 低（一句话为主） |
| 视觉冲击 | 高（字号即冲击力） |
| 变体 | 居中 / 左对齐 / 右对齐 |
| CSS 类 | `.hero-statement`, `.hero-statement-text` |

> 当核心信息是一个理念、立场、判断时选用。不是所有内容都需要数据撑场。

### HF-02 · Split View

左右分区。一侧文字叙事，另一侧视觉元素（大数字/图像/对比块）。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 数据矩阵、对比/张力、图像 |
| 布局配合 | split |
| 信息密度 | 中 |
| 视觉冲击 | 中高（双区平衡） |
| 变体 | 左文右数据 / 左数据右文 / 左深右浅 |
| CSS 类 | `.hero-split`, `.hero-split-text`, `.hero-split-visual` |

> 当 Hero 区需要同时呈现叙事和量化证据时选用。右侧的大数字或对比块就是视觉锚点。

### HF-03 · Numeral Grid / LED Card

方阵排列的大数字卡片。JetBrains Mono 48–120px，每个数字上方小标签，下方上下文行。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 数据矩阵 |
| 布局配合 | light |
| 信息密度 | 高（多指标同时展示） |
| 视觉冲击 | 高（数字网格本身就是视觉） |
| 变体 | 2 列 / 3 列 / 4 列 |
| CSS 类 | `.hero-numeral`, `.metric-card` |

> 当内容有 2–4 个硬数据需要同时亮相时选用。单宽网格本身就是设计——不需要额外装饰。

### HF-04 · Dark Statement

深色背景全幅声明。场景色（glacier/olive）做底，白色文字，仪式感强。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 宣言、对比/张力 |
| 布局配合 | dark |
| 信息密度 | 低（一句话为主） |
| 视觉冲击 | 最高（暗色+大字=仪式感） |
| 变体 | 场景色底 / 纯深灰底 / 底部加分隔条 |
| CSS 类 | `.hero-dark`, `.hero-dark--glacier/--olive/--gray` |

> 品牌宣言墙、关键原理声明、对比结论。慎用——暗色 Hero 用多则廉价。

---

## Section 级（每区一处）

### SF-01 · Tension Grid

2×2 网格，深浅双色块承载对立力量。中间可插跨列行标注核心矛盾。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 对比/张力 |
| 信息密度 | 中 |
| 典型场景 | 权力 vs 责任、旧 vs 新、可控 vs 不可控 |
| 实现要点 | 深色块用品牌色，浅色块用 `--surface`，中间行用 `--surface-alt` |

> 两股对立力量需要同屏展示时，这是最克制也最有力的形式。

### SF-02 · Pipeline / VS

左右双列 + 中间分隔线（VS 或竖线）。一侧一个阵营，项目对列。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 对比/张力 |
| 信息密度 | 中高（两侧各有列表） |
| 典型场景 | 架构对决、方案对比、赛道分组 |
| 实现要点 | 左侧用 accent 色标记，右侧用 brand 色。中间分隔是视觉焦点 |

> 比文字列表更有对抗感，比 Tension Grid 更适合项目化内容（每侧多条）。

### SF-03 · Timeline Track

垂直/水平时间轴 + 节点。每个节点含阶段标签、标题、描述、度量值。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 时间线 |
| 信息密度 | 中 |
| 典型场景 | 版本迭代、优化过程、实施计划、能力演进 |
| 实现要点 | 垂直用左竖线 + 圆点；水平用上横线 + 节点。最后一节点用 brand 色 |

> 有先后顺序的内容首选。不要用卡片列表替代——时间线本身就是叙事。

### SF-04 · Bento Grid

不等等分网格。部分单元格跨列或跨行，信息密度和视觉节奏同时最大化。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 结构/体系 |
| 信息密度 | 高（每格一个概念） |
| 典型场景 | 方法论分块、能力矩阵、工作流步骤 |
| 实现要点 | 用 `gap: 2px` + 背景色做分隔线，格子内靠间距分层 |

> 信息块多且需要同时展示时首选。每格结构统一，跨列打破常规。

### SF-05 · Layer Stack

纵向分层卡片。每层一个颜色标记（olive/glacier/earth/orange），展示层级关系。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 结构/体系 |
| 信息密度 | 中 |
| 典型场景 | 工作流分层、架构分层、决策层级 |
| 实现要点 | 每层颜色标记用 `--layer-card-num` 类，左侧标签 + 右侧描述 |

> 有明确上下层级关系时选用。比 Bento 更强调"从底到顶"的顺序。

### SF-06 · Comparison Block

旧/新、前/后对比。左色块（earth/old）+ 右色块（olive/new），中间分隔线。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 对比/张力 |
| 信息密度 | 中 |
| 典型场景 | 规则变更、方案调整、版本对比 |
| 实现要点 | 旧侧用 `--surface-alt` + moss 左边框，新侧用 forest 背景 + 左边框 |

> 有明确 before/after 结构时选用。比 Tension Grid 更适合规则对比。

### SF-07 · Card Triad / Quad

3 或 4 张等宽卡片，每张卡片顶部彩色边框（3px 场景色），内部层级分明。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 数据矩阵、结构/体系 |
| 信息密度 | 中高 |
| 典型场景 | 三种场景、四个步骤、多维度评估 |
| 实现要点 | 顶部 3px 场景色边框做视觉锚定。内部大数字→标题→描述→分割线→详情 |

> 平行概念需要并列展示时首选。每张卡片内部按金字塔分层。

### SF-08 · Level Track

水平进度轨道。圆形节点 + 连线 + 标签，展示阶段/能力/成熟度。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 时间线、结构/体系 |
| 信息密度 | 中 |
| 典型场景 | 能力成熟度、AI 嵌入阶段、实施路线 |
| 实现要点 | 已完成用实心 brand 色，进行中用场景色，探索中用空心边框。水平连线 |

> 有明确阶段递进关系时选用。比 Timeline 更强调"当前位置"。

### SF-09 · Typography Showcase

左固定锚点 + 右延伸内容。左侧字体/风格标签，右侧实际排版效果。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 结构/体系 |
| 信息密度 | 中低（强调阅读体验） |
| 典型场景 | 字体系统展示、风格指南、品牌规范 |
| 实现要点 | 左列 10rem 固定，JetBrains Mono ALL CAPS 标签。右列放实际排版效果 |

> 品牌规范页、字体展示页首选。左标签右内容，让阅读自然从锚点滑向内容。

### SF-10 · Step Sequence

左固定步骤号 + 右延伸步骤内容。垂直连线串联各步骤。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 时间线、结构/体系 |
| 信息密度 | 中 |
| 典型场景 | 操作流程、实施步骤、onboarding |
| 实现要点 | 圆形步骤号 + 垂直连线。`--done` 实心橄榄绿，`--active` 空心+品牌色，默认空心灰色 |

> 有明确步骤顺序但不需要时间轴的精确时间点时选用。比 Timeline 更轻，适合"按此顺序做"而非"何时发生"。

---

## Detail 级（每区可多处）

### DF-01 · Stat Block

JetBrains Mono 大数字（32–48px）+ 小标签。最轻的数据展示。

| 属性 | 值 |
|------|---|
| 适用 | 单一关键指标 |
| 变体 | 横排（stat-row）/ 纵排（stat-block） |

### DF-02 · Segmented Bar

色块拼条。每段不同颜色代表不同类别，整体宽度 = 100%。

| 属性 | 值 |
|------|---|
| 适用 | 比例分布、份额构成 |
| 变体 | 单行 / 多行对比 |

### DF-03 · Weight / Rank Bar

标签 + 水平填充条 + 百分比。灰度序列优先，accent 仅标记需关注的项。

| 属性 | 值 |
|------|---|
| 适用 | 权重分配、排名对比 |
| 变体 | 单列 / 多列并排 |

### DF-04 · Bullet Chart

实际值条 + 目标线 + 背景范围带。单指标对标。

| 属性 | 值 |
|------|---|
| 适用 | 达成率、对标进度 |
| 变体 | 单行 / 多行 |

### DF-05 · Gauge Arc

SVG 弧形仪表 + 百分比 + 状态标签（HEALTHY/WARNING/CRITICAL）。

| 属性 | 值 |
|------|---|
| 适用 | 完成率、健康度、达标率 |
| 变体 | 单个 / 网格排列 |

### DF-06 · Sparkline

嵌入文本流的极简趋势线。无轴无标签。

| 属性 | 值 |
|------|---|
| 适用 | 文中趋势暗示 |
| 变体 | 上升/下降/平稳 |

### DF-07 · Small Multiples

同一模板重复 N 次，每个子图标题+趋势线+变化值。

| 属性 | 值 |
|------|---|
| 适用 | 子集趋势对比 |
| 变体 | 2 列 / 3 列 / 4 列 |

### DF-08 · Progress Bar

标签 + 水平轨道 + 填充 + 数值。

| 属性 | 值 |
|------|---|
| 适用 | 目标进度、阶段完成率 |
| 变体 | 单行 / 分段进度 |

### DF-09 · Stacked Bar

多段堆叠水平条，灰度序列编码组成。

| 属性 | 值 |
|------|---|
| 适用 | 组成比例对比 |
| 变体 | 单行 / 多行对比 |

### DF-10 · Dot Grid / Heatmap

方阵 + 透明度编码值大小。

| 属性 | 值 |
|------|---|
| 适用 | 分布密度、活跃度矩阵 |
| 变体 | 纯灰度 / 单色+opacity |

### DF-11 · KPI Card

大数字 + 标签 + delta 变化量（上升/下降/持平）。

| 属性 | 值 |
|------|---|
| 适用 | 关键指标仪表盘 |
| 变体 | 单行横排 / 网格 |

### DF-12 · Data Table

JetBrains Mono 表头 + Inter 数据行。最克制的表格。

| 属性 | 值 |
|------|---|
| 适用 | 结构化数据罗列 |
| 变体 | 紧凑 / 带状态色 |

### DF-13 · Callout

左侧彩色边框（3px）+ 浅色背景 + 加粗关键词。

| 属性 | 值 |
|------|---|
| 适用 | 核心结论、注意事项、关键变更 |
| 变体 | brand 色 / accent 色 |

### DF-17 · Speed Line

速度线数据编码。stroke-dasharray 密度映射值大小。密度越高 = 值越大。

| 属性 | 值 |
|------|---|
| 适用 | 速度/强度/密度的视觉编码 |
| 变体 | 线性密度 / 分类密度 |
| 来源 | Red Bull Racing 赛车遥测 |
| CSS 类 | `.speed-line`, `.speed-line-stroke` |

### DF-18 · Spec Numeral

身份数字。font-weight:200 超细大数字作为视觉主体。数字本身就是品牌。

| 属性 | 值 |
|------|---|
| 适用 | 关键规格数字、品牌锚点 |
| 变体 | glacier / olive / default |
| 来源 | Polestar spec-as-identity |
| CSS 类 | `.spec-numeral`, `.spec-numeral--glacier/--olive` |

### DF-19 · Brutalist Chart

剥皮图表。去所有装饰，纯黑描边白底。信息密度最大化。

| 属性 | 值 |
|------|---|
| 适用 | 工程级数据展示、无需情感包装的场景 |
| 变体 | 柱状 / 折线 / 散点 |
| 来源 | Nobel Prize 极简 + Ericsson 工程精度 |
| CSS 类 | `.brutalist-chart` |

### DF-20 · Curve Personality

曲线人格。round linejoin = 信任感，miter = 精确感。同一数据，不同品牌信号。

| 属性 | 值 |
|------|---|
| 适用 | 品牌调性选择、图表人格化 |
| 变体 | trusted (round) / precise (miter) |
| 来源 | Ericsson EDS chart curve personality |
| CSS 类 | `.curve-personality` |

---

## Section 级 — 数据即身份

### SF-17 · Kinetic Layers

动能分层。层叠透明度创造深度，前景全不透明，后景渐隐。

| 属性 | 值 |
|------|---|
| 适用 | 层级关系展示、渐进披露 |
| 变体 | 3 层 / 4 层 |
| 来源 | Sana Labs 渐变原生 + SDL Sigma 包装 |
| CSS 类 | `.kinetic-layers` |

---

## Decorative 级（P3，可选）

### DC-01 · Ghost Text

超大（240–360px）低透明度（3–5%）文字做背景。Georgia 或 Doto 字体。

| 属性 | 值 |
|------|---|
| 适用 | Hero 区/Section 区背景纹理 |
| 选用时机 | 品牌关键词、章节编号、英文关键词 |

### DC-02 · Dot Pattern

CSS 点阵网格。部分点 opacity 高，部分低，形成视觉节奏。

| 属性 | 值 |
|------|---|
| 适用 | 页面纹理、数据密度暗示 |
| 选用时机 | 需要视觉密度但不承载具体信息时 |

### DC-03 · Decorative Number

超大透明 Georgia 数字（64–120px, opacity 12%）+ 前景章节标题。

| 属性 | 值 |
|------|---|
| 适用 | Section 区章节编号 |
| 选用时机 | 替代 JetBrains Mono 小标签，做视觉重量 |

### DC-14 · Tabular Rhythm

等宽数字节奏。font-variant-numeric: tabular-nums 构成视觉节奏，数字列即设计。

| 属性 | 值 |
|------|---|
| 适用 | 数字密集的仪表盘背景、数据密度暗示 |
| 选用时机 | 需要数字阵列作为视觉纹理时 |
| CSS 类 | `.tabular-rhythm` |

### DC-15 · Diagonal Data Flow

对角数据流。数据沿对角线排列而非水平，配合旋转背景创造运动感。

| 属性 | 值 |
|------|---|
| 适用 | 运动品牌、赛车、动态感数据展示 |
| 选用时机 | 需要打破水平节奏时 |
| CSS 类 | `.diagonal-data` |

---

## 选择指引

### 按锚点类型选 Hero 级

| 锚点类型 | 推荐 Hero 级形式 | 备选 |
|----------|-----------------|------|
| 宣言 | HF-01 Full-width Statement | HF-04 Dark Statement |
| 数据矩阵 | HF-03 Numeral Grid | HF-02 Split View（数据侧） |
| 对比/张力 | HF-02 Split View | HF-04 Dark Statement |
| 时间线 | HF-02 Split View（时间线侧） | HF-01（标题+下方时间线） |
| 结构/体系 | HF-02 Split View（结构侧） | HF-01（标题+下方网格） |
| 进度/仪表 | HF-03 Numeral Grid（进度数字） | HF-02 Split View |
| 图像 | HF-02 Split View（图像侧） | — |

### 按信息类型选 Section 级

| 信息类型 | 推荐 Section 级形式 | 备选 |
|----------|-------------------|------|
| 对立/矛盾 | SF-01 Tension Grid | SF-02 Pipeline / SF-06 Comparison |
| 阶段/演进 | SF-03 Timeline | SF-08 Level Track / SF-10 Step Sequence |
| 并行概念 | SF-07 Card Triad/Quad | SF-04 Bento Grid |
| 层级结构 | SF-05 Layer Stack | SF-04 Bento Grid |
| 规则变更 | SF-06 Comparison Block | SF-02 Pipeline |
| 多维评估 | SF-04 Bento Grid | SF-07 Card Triad/Quad |
| 品牌规范/风格指南 | SF-09 Typography Showcase | SF-10 Step Sequence |
| 操作步骤/流程 | SF-10 Step Sequence | SF-03 Timeline |

### Detail 级选择顺序

1. 先用最轻的形式（Stat Block、Callout）
2. 需要展示比例时升级（Segmented Bar、Weight Bar）
3. 需要展示趋势时升级（Sparkline、Small Multiples）
4. 需要展示对标时升级（Bullet Chart、Gauge Arc）
5. 需要展示结构时升级（Data Table、Stacked Bar）

### HF-05 · Scale Jump

尺度跳跃。同一视口 8px→200px，无过渡。font-weight:200 超细大数字。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 宣言、数据矩阵 |
| 布局配合 | light |
| 信息密度 | 极低（一个数字+一句注释） |
| 视觉冲击 | 最高（尺度对比即冲击） |
| 变体 | mono 数字 / display 数字 |
| CSS 类 | `.scale-jump`, `.scale-jump__macro--mono` |

> Polestar spec-as-identity。一个数字撑满视口，旁边的注释小到几乎看不见。极端克制 = 极端记忆点。

---

## Section 级 — 数据即地形

### SF-18 · Fjord Silhouette Profile

峡湾天际线轮廓。数据曲线=山脊线，下方填充=地形。站在峡湾底部仰望数据山脉。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 时间线、趋势 |
| 信息密度 | 中（曲线+峰值标注+底部统计） |
| 典型场景 | 收入趋势、增长轨迹、KPI 演变 |
| 实现要点 | SVG 双层地形（back layer 橄榄绿半透明 + front layer 深色），sky 渐变背景，峰值用圆点+标签 |
| CSS 类 | `.fjord-profile`, `.fjord-profile__terrain`, `.fjord-profile__stats` |

> 数据不是平的线图，是地形。你站在峡湾底部，数据山脉从两侧升起。视觉记忆点远超折线图。

---

## Detail 级 — 数据即地形

### DF-21 · Bathymetric Depth Bands

水深渐变带。区域填充而非线条，深度越深色越浓。四个渐变带编码连续区间。

| 属性 | 值 |
|------|---|
| 适用 | 有序区间编码、分层数据范围、渐进披露 |
| 变体 | 4 带 / 6 带 / 自定义区间 |
| 来源 | 航海图水深分层 + Nordic 航海传统 |
| CSS 类 | `.bathymetric`, `.bathymetric__bands` |

> 不是画线分区，是填充渐变。每条边界是水层分界线，透明度=深度。比段状条更有空间感。

### DF-22 · Tree-Ring Accretion

树轮同心圆。每环=一个时间周期，环宽=值大小。年轮学 dendrochronology 视觉语言。

| 属性 | 值 |
|------|---|
| 适用 | 时间累积数据、成长轨迹、周期叠加 |
| 变体 | 5 环 / 8 环 / 配合右侧图例 |
| 来源 | 年轮学 + Nordic 森林遗产 |
| CSS 类 | `.tree-ring`, `.tree-ring__chart`, `.tree-ring__legend` |

> 环宽即数据。粗年轮=丰年，细年轮=歉年。时间不是线，是同心圆。

### DF-23 · Stratum Cross-Section

地质剖面层。不规则曲线分隔的水平地层带。每层颜色+透明度编码比例。

| 属性 | 值 |
|------|---|
| 适用 | 组成比例、层级结构、堆叠面积变体 |
| 变体 | 4 层 / 6 层 / 配合右侧标签 |
| 来源 | 地质剖面图 + Nordic 地质传统 |
| CSS 类 | `.stratum-section`, `.stratum-section__chart`, `.stratum-section__legend` |

> 不是规则的水平带，是不规则曲线分隔的地层。边界即变化。地质学家的眼睛比饼图快。

### DF-24 · Ice Fracture Tessellation

冰裂镶嵌。Voronoi 不规则多边形，每格填充编码值。

| 属性 | 值 |
|------|---|
| 适用 | 投资组合地图、区域分类、不规则分区 |
| 变体 | 稀疏 / 密集 / 配合值标签 |
| 来源 | 冰湖裂纹 + Nordic 冬季景观 |
| CSS 类 | `.ice-fracture`, `.ice-fracture__chart` |

> 规则网格暗示秩序，冰裂暗示自然。当数据分区本身不规则时，这是唯一诚实的形式。

### DF-25 · Compass-Rose Radial

罗盘径向图。极坐标系统，角度=维度，距离=值。语义化方位轴（N=耐久, E=重量…）。

| 属性 | 值 |
|------|---|
| 适用 | 多维能力评估、品牌属性定位、雷达图升级 |
| 变体 | 4 轴 / 6 轴 / 8 轴 |
| 来源 | 航海罗盘 + Nordic 航海传统 |
| CSS 类 | `.compass-radial`, `.compass-radial__chart`, `.compass-radial__axes` |

> 比雷达图多了"方位感"。北=核心价值，南=基础能力。读图时你在大地上定位，不在坐标系里读数。

### DF-26 · Crystal Lattice Dot Matrix

晶格点阵。规则网格圆点，半径/颜色编码值，缺失=不可见。

| 属性 | 值 |
|------|---|
| 适用 | 存在/缺失矩阵、密度编码、分布热力图 |
| 变体 | 稀疏 / 密集 / 单色+opacity |
| 来源 | SDL Viedoc DNA/遗传密码视觉 + Nordic 晶体结构 |
| CSS 类 | `.crystal-lattice`, `.crystal-lattice__chart` |

> 热力图的克制版。没有颜色渐变，只有存在与缺失、大与小。DNA 序列视觉。

---

## Decorative 级 — 数据即地形

### DC-16 · Aurora Curtain

极光幕帘。垂直半透明色带+正弦波边缘，暗底+screen 混合模式。站在北极圈仰望数据极光。

| 属性 | 值 |
|------|---|
| 适用 | 品牌氛围页、数据叙事的戏剧性收束 |
| 变体 | 3 幕 / 5 幕 / 7 幕 |
| 来源 | 北极光 Aurora Borealis + Nordic 夜空 |
| CSS 类 | `.aurora-curtain`, `.aurora-curtain__curtains` |

> 色带交叠处产生第三色——这是 screen 混合模式的魔法。数据在极光中流动，不是在表格中躺着。

---

## 结构特征补充

| 结构特征 | 新增同族组件 | 备注 |
|----------|------------|------|
| **面积填充** | Bathymetric, Fjord Silhouette, Stratum Cross-Section | 新结构特征：区域填充而非线条 |
| **径向/极坐标** | Compass-Rose Radial | 新结构特征：方位感编码 |
| **不规则多边形** | Ice Fracture Tessellation | 新结构特征：自然分区 |
| **点阵编码** | Crystal Lattice Dot Matrix | 方阵排列族的新变体 |

---

## 节奏规划规则

1. 相邻区块不得使用同一种视觉形式
2. Hero 级形式整页仅一处
3. Section 级形式不得连续出现相同类型（如两个 Tension Grid 相邻）
4. 数据密集页（3+ 数据区块）必须变化 Detail 级形式
5. 每页恰好一处"打破"——一个异形元素出现在规则布局中
6. 地形组件不得连续出现（Fjord 后不得紧跟 Bathymetric，必须用非地形组件隔开）

---


## Hero 级 — 工业精确 + 有机数学

### HF-06 · Seismic Wave

连续振动波 Hero。OLED 暗底（#0a0e1a）+ 多层正弦波叠加，波形即品牌。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 宣言、数据矩阵 |
| 布局配合 | dark |
| 信息密度 | 低（一句话 + LED 矩阵） |
| 视觉冲击 | 最高（波形+暗色=信号感） |
| 变体 | 8 波层 / 12 波层 / 自定义谐波 |
| CSS 类 | `.hero-seismic`, `.hero-seismic__waves`, `.hero-seismic__leds` |

> 波形不是装饰，是数据。8 层正弦波叠加，每层不同振幅/频率/相位，合成信号场。暗底上的波形 = 地震仪上的品牌宣言。

---

## Section 级 — 工业精确 + 有机数学

### SF-19 · Isometric 2.5D Grid

等距 2.5D 菱形分层。三层可见面（顶/左/右），不同透明度编码层级深度。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 结构/体系 |
| 信息密度 | 中（4-6 层架构） |
| 典型场景 | 系统架构、技术栈分层、组织层级 |
| 实现要点 | SVG 菱形 polygon，顶面最深，右面最浅。层间留间距 |

> 不是平面图，是建筑剖面。每层一个菱形，从上到下 = 从体验到基础设施。

### SF-20 · Fold/Hinge

折叠铰链。两侧面板 + 中间铰链线。clip-path 创造透视折叠感。

| 属性 | 值 |
|------|---|
| 匹配锚点 | 对比/张力 |
| 信息密度 | 中 |
| 典型场景 | 设计理念对比、范式转换、前后对比 |
| 实现要点 | 左侧 clip-path 右下内缩，右侧左上内缩。中间橙色 3px 铰链线 |

> 比 Tension Grid 更有物理感——不是两个平面对抗，是一张纸的折叠。铰链线就是折叠轴。

---

## Detail 级 — 工业精确 + 有机数学

### DF-27 · Polar Rose / Wind Rose

极坐标风玫瑰。8 花瓣径向图，花瓣长度 = 频率，填充 = 类别。

| 属性 | 值 |
|------|---|
| 适用 | 方向频率分布、多维独立评估 |
| 变体 | 8 方位 / 16 方位 |
| 来源 | 气象风玫瑰图 + 航海罗盘 |
| CSS 类 | `.d-polarrose`, `.d-polarrose__chart` |

> 与雷达图的关键区别：每个方向独立，不暗示轴间连续性。花瓣长度 = 频率，填充色 = 类别。

### DF-28 · Phyllotaxis Spiral

叶序螺旋。黄金角 137.508° 逐点放置，向日葵/Fibonacci 分布模式。

| 属性 | 值 |
|------|---|
| 适用 | 有机分布、聚类可视化、自然编码 |
| 变体 | 200 点 / 500 点 / 自定义密度 |
| 来源 | 向日葵叶序 + Fibonacci 序列 |
| CSS 类 | `.d-phyllotaxis`, `.d-phyllotaxis__chart` |

> 黄金角确保没有任何两点对齐——最大化填充效率。半径编码值，颜色编码类别。不是网格，是自然。

### DF-29 · Hex Grid

六角格栅。六边形铺排，每格填充色/透明度编码数据值。

| 属性 | 值 |
|------|---|
| 适用 | 空间密度编码、区域分类、蜂窝数据 |
| 变体 | pointy-top / flat-top / 稀疏/密集 |
| CSS 类 | `.d-hexgrid`, `.d-hexgrid__chart` |

> 比方阵网格更自然的空间铺排。六边形 = 最高效的平面铺排。值高 = 橄榄绿，值低 = 大地色。

### DF-30 · Weave/Lattice

数据编织。水平（glacier/olive）与垂直（earth/dark）交织，交叉点标记橙色。

| 属性 | 值 |
|------|---|
| 适用 | 二维关联矩阵、交叉影响、经纬数据 |
| 变体 | 稀疏 / 密集 / 自定义色系 |
| CSS 类 | `.d-weave`, `.d-weave__chart` |

> 经纬编织。水平 = 一个维度，垂直 = 另一个维度。交叉点 = 交互效应。比热力图更有触感。

### DF-31 · Vortex/Spiral

涡旋螺旋。阿基米德螺线路径 + 数据点。距中心 = 时间，半径 = 量级。

| 属性 | 值 |
|------|---|
| 适用 | 时间序列螺旋化、周期数据、涡旋编码 |
| 变体 | 4 圈 / 6 圈 / 自定义圈数 |
| CSS 类 | `.d-vortex`, `.d-vortex__chart` |

> 与树轮（同心圆）的关键区别：螺旋有方向。你可以从内向外读——时间方向明确。

---

## Decorative 级 — 工业精确 + 有机数学

### DC-17 · Moiré Interference

叠纹/莫尔干涉。两组微偏移同心圆，交叠处产生第三种图案。

| 属性 | 值 |
|------|---|
| 适用 | 品牌氛围页、结构差异的可视化签名 |
| 变体 | 双源 / 三源 / 自定义偏移 |
| 来源 | 光学莫尔效应 + 结构干涉 |
| CSS 类 | `.dc-moire`, `.dc-moire__pattern` |

> 莫尔不是装饰——它是结构差异的可视化签名。两组规则图案微偏移，第三种图案从中涌现。

---

## 结构特征补充（v5）

| 结构特征 | 新增同族组件 | 备注 |
|----------|------------|------|
| **等距投影** | Isometric 2.5D Grid | 新结构特征：2.5D 透视编码 |
| **折叠结构** | Fold/Hinge | 新结构特征：物理折叠感 |
| **极坐标花瓣** | Polar Rose, Vortex/Spiral | 径向族的新变体：独立花瓣 vs 连续螺旋 |
| **有机铺排** | Phyllotaxis Spiral, Hex Grid | 新结构特征：自然数学铺排 |
| **经纬交织** | Weave/Lattice | 新结构特征：二维交叉编码 |
| **干涉图案** | Moiré Interference | 新结构特征：规则偏移产生涌现图案 |

---

## 节奏规划规则（v5 更新）

7. 等距投影和折叠结构不得连续出现（Isometric 后不得紧跟 Fold，必须用非投影组件隔开）
8. 极坐标组件不得连续出现（Polar Rose 后不得紧跟 Vortex，必须用非径向组件隔开）
9. 有机铺排组件可作为方阵排列族的替代，但不得连续使用（Phyllotaxis 后不得紧跟 Hex Grid）

---

*视觉形式库 v5 — 工业精确+有机数学组件（HF-06, SF-19~20, DF-27~31, DC-17），2026-06-01*
