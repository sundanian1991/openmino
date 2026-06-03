# 配方手册 — Recipe Book

> 配方定节奏和结构特征族（骨架），组件自由选择（血肉）。
> 节奏相邻不同族 = 硬约束。具体用哪个组件 = 根据内容决定。
> 参照案例用于"看长什么样"，不是"照抄"。

---

## 如何使用

1. 根据内容结构选配方 → 拿到节奏模式和结构特征族
2. 读 1 个参照案例（前 200 行）→ 理解视觉节奏和底色交替模式。参照案例统一在 `references/showcase/` 下。
3. 查 `components.md` / `components-ext.md` → 取组件 CSS 代码
4. 按节奏表组织页面，**每个组件根据当前内容重新设计**，不从模板抄 HTML
5. 模板文件在 `templates/` 下，只取 CSS 变量体系和间距语义，不复制布局

---

## 命名规范

参照案例文件统一格式：`R{配方号}-{场景描述}.html`

| 标准名 | 文件名 | 配方 |
|--------|--------|------|
| R1-经济学深度系统 | economist-deep-system.html | R1 |
| R1-交互组件深潜 | nian-ia-deep-dive.html | R1 |
| R1-阅读笔记模板 | reading-note-template.html | R1 |
| R1-编辑红条设计 | economist-red-bar.html | R1 |
| R1-AI技巧长文 | ai-12-tips-v4.html | R1 |
| R1-Hero形态标杆 | 组件品质标杆.html | R1 |
| R2-品牌数据分析 | haglofs-brand-analytics.html | R2 |
| R2-岐力绩效报告 | 岐力职场-绩效报告.html | R2 |
| R2-金融图表 | ft-pink-charts.html | R2 |
| R2-数据形式集 | dataviz-deep-part1.html | R2 |
| R2-供应商方法论 | 供应商分量策略与方法论.html | R2 |
| R2-岐力绩效诊断 | 岐力职场-绩效诊断.html | R2 |
| R2-岐力业务数据 | 岐力职场-数据.html | R2 |
| R2-定价演变叙事 | ai-pricing-evolution.html | R2 |
| R2-CSS纯图表 | data-report.html | R2 |
| R3-IKEA民主设计 | ikea-democratic-design.html | R3 |
| R3-品牌模板 | scenario-brand.html | R3 |
| R3-Haglöfs品牌系统 | hagloefs-brand-system.html | R3 |
| R3-Absolut传承 | absolut-heritage.html | R3 |
| R3-Volvo传承 | volvo-heritage.html | R3 |
| R3-北欧模板 | nordic-template.html | R3 |
| R3-SDL设计原则 | sdl-design-principles.html | R3 |
| R3-Ericsson基础设施 | ericsson-infra.html | R3 |
| R3-Haglöfs展馆叙事 | haglofs-heritage-gallery.html | R3 |
| R3-JLindeberg运动 | j-lindeberg-performance.html | R3 |
| R3-现代美术馆 | moderna-museet.html | R3 |
| R3-Haglöfs组件库 | haglofs-component-showcase.html | R3 |
| R3-品牌色板展示 | brand-showcase.html | R3 |
| R3-Haglöfs品牌V2 | hagloefs-brand-system-v2.html | R3 |
| R3-Mino设计系统 | mino-design-system-showcase.html | R3 |
| R4-工作汇报模板 | work-report.html | R4 |
| R4-数据汇报模板 | scenario-data-v3.html | R4 |
| R4-麦肯锡咨询 | mckinsey-consulting.html | R4 |
| R4-达成率报告 | 主贷大额拉新-3月达成率-redesign.html | R4 |
| R4-电销异常分析 | 电销异常IP登录分析.html | R4 |
| R4-风险预警标杆 | R4-风险预警-标杆.html | R4 |
| R4-项目里程碑标杆 | R4-项目里程碑-标杆.html | R4 |
| R5-文章模板 | scenario-article.html | R5 |
| R5-F1遥测数据 | f1-telemetry.html | R5 |
| R5-供应商准入SOP标杆 | R5-供应商准入SOP-标杆.html | R5 |
| R5-供应商清退SOP标杆 | R5-供应商清退SOP-标杆.html | R5 |
| R5-投诉处理SOP标杆 | R5-投诉处理SOP-标杆.html | R5 |
| R5-结算异常处理SOP标杆 | R5-结算异常处理SOP-标杆.html | R5 |
| R6-深度阅读模板 | scenario-reading-deep.html | R6 |
| R6-知识管理模板 | knowledge-management.html | R6 |
| R6-编辑设计标杆 | economist-red-bar.html | R6 |
| R6-供应商最佳实践库标杆 | R6-供应商最佳实践库-标杆.html | R6 |
| R7-品牌阅读分析 | scenario-brand-read-analyze.html | R7 |
| R7-NYT数据叙事 | nyt-data-narrative.html | R7 |
| R7-Spotify年度总结 | spotify-wrapped.html | R7 |
| R7-数据叙事手册 | 数据讲故事视觉设计实战手册.html | R7 |
| R7-数据叙事模板 | template-02-数据叙事.html | R7 |

> showcase 文件已于 2026-06-04 统一重命名（去日期/编号前缀，加配方号前缀）。上表文件名 = 磁盘实际文件名。

---

## 组件互换规则

**核心原则**：配方给的是"结构特征族"（8 族），不是具体组件。同族组件可互换。

| 结构特征族 | 同族组件（可互换） | 适合内容 |
|-----------|------------------|---------|
| **双栏对照** | comparison / tension-grid / pipeline-VS | 对比、新旧、好坏 |
| **方阵排列** | numeral-grid / card-triad / card-quad / kpi-grid | 同质数据目录 |
| **不等分网格** | bento-grid / layer-stack | 有优先级差异的内容 |
| **锚点+列表** | typo-showcase / step-sequence / callout / action-list | 深度阅读、步骤流程 |
| **链式节点** | timeline-track / level-track / flow-pipeline | 流程、阶段、经过 |
| **段状条** | seg-bar / rank-bar / weight-bar / stacked-bar | 权重、比例、配额、排名 |
| **大数字+小标签** | stat-block / metric-card / kpi-card | 关键指标 |
| **紧凑数据行** | inline-data-row / sparkline / data-table / spec-table | 信息密度高的行内数据 |

**举例**：配方说"能力指标用大数字+小标签族"→ 你选 stat-block，但年老师更喜欢赛马方块 → 换成段状条族的 seg-bar。节奏不变，组件变了。

---

## R1 · 深度文章 / 技术阅读笔记

> 长文内容可视化：文章、读书笔记、方法论整理

**节奏模式**：

```
Hero (宣言) → 能力指标 → Group × N (深色分隔 + 内容网格) → 对比 (可选) → 流程管道 → 收尾引文
```

**节奏骨架**：

| 位置 | 结构特征族（必选） | 推荐组件（可替换） |
|------|-------------------|-------------------|
| Hero | 宣言 | hero-statement（全屏 + ghost 装饰大字） |
| 能力指标 | 大数字+小标签 **或** 段状条 | stat-row × 4；或 seg-bar 方块格 |
| Group 分隔 | 宣言 | dark-statement（深色全宽 + 超大序号） |
| Tip 内容 | 不等分网格 | 2fr 1fr / 1fr 2fr 交替；底色 白/深/olive 轮换 |
| 对比区 | 双栏对照 | comparison（左 bad 右 good） |
| 矩阵区 | 紧凑数据行 | matrix-table（条件→动作） |
| 流程 | 链式节点 | flow-pipeline（4 步横向） |
| 收尾 | 宣言 | dark-quote（深色背景引文） |

**参照案例**：R1-经济学深度系统（深浅交替节奏）、R1-交互组件深潜（交互组件）、R1-阅读笔记模板、R1-编辑红条设计（红条视觉标识）、R1-AI技巧长文（点阵 Hero + 赛马方块 + 不等比网格）、R1-Hero形态标杆（6 种切割变体）

**三色卡片规则**：白底（默认）: 深色底（宣言级 Tip）: olive 底（行动指令）≈ 6:2:1

---

## R2 · 数据分析报告

> 指标展示 + 排名 + 趋势 + 洞察

**节奏模式**：

```
Hero (宣言或数据矩阵) → 核心指标 → 排名 → 趋势 → 洞察 → 行动建议
```

**节奏骨架**：

| 位置 | 结构特征族 | 推荐组件 |
|------|-----------|---------|
| Hero | 宣言 **或** 方阵排列 | hero-split 或 hero-numeral |
| 核心指标 | 方阵排列 | data-matrix 或 numeral-grid |
| 排名 | 段状条 | rank-bar（水平条形）；或 seg-bar（方块格） |
| 趋势 | 紧凑数据行 | sparkline（内联 SVG） |
| 洞察 | 不等分网格 | insight-cards（3 列） |
| 行动 | 锚点+列表 | action-list |

**参照案例**：R2-品牌数据分析、R2-岐力绩效报告、R2-金融图表、R2-数据形式集、R2-供应商方法论、R2-岐力绩效诊断（5 章节+暗色 section）、R2-岐力业务数据（浅色主题标杆）、R2-定价演变叙事（倒叙叙事 + Ghost 大字）、R2-CSS纯图表

**数据颜色顺序**：opacity 区分 → Nature 色梯度 → 最后 signal-warning。

---

## R3 · 品牌 / 设计系统展示

> 品牌故事、设计语言介绍、组件库展示

**节奏模式**：

```
Hero (深色声明) → 品牌色板 → 字体展示 → 组件样例 → 原则对比 → 签名元素
```

**节奏骨架**：

| 位置 | 结构特征族 | 推荐组件 |
|------|-----------|---------|
| Hero | 宣言 | hero-split（左文字右深色面板） |
| 色板 | 方阵排列 | swatch-grid |
| 字体 | 双栏对照 | typo-showcase |
| 组件样例 | 不等分网格 | bento-grid |
| 原则 | 双栏对照 | comparison（Do / Don't） |
| 签名 | 装饰级 | dot-matrix 或 brand-statement |

**参照案例**：R3-IKEA民主设计、R3-品牌模板、R3-Haglöfs品牌系统、R3-Absolut传承、R3-Volvo传承、R3-北欧模板、R3-SDL设计原则、R3-Ericsson基础设施（网络节点装饰）、R3-Haglöfs展馆叙事（展馆叙事结构）、R3-JLindeberg运动（分屏 + silhouette）、R3-现代美术馆（画框卡片+年份水印）、R3-Haglöfs组件库（最全 66KB）、R3-品牌色板展示（色板标杆）、R3-Haglöfs品牌V2（sidebar + 手风琴）、R3-Mino设计系统（旋转轨道 + 翻转卡片）

**扩展组件参考**（不作为独立参照，但含独特组件）：

- `haglofs-production-grade.html`：分段块条变体集（waffle/vert/donut）、SVG 仪表盘变体集、点阵矩阵交互变体
- `sas-scandinavian.html`：departure-board（实时状态数据表）、heritage-strip（水平时间轴）
- `wastberg-lighting.html`：光束 Hero、渐变段状条、技术参数行

---

## R4 · 工作汇报 / 状态同步

> 向上级汇报进度、达成率、风险、下一步

**节奏模式**：

```
Hero (核心结论) → 当月指标 → 进度追踪 → 时间线 → 风险 → 下一步
```

**节奏骨架**：

| 位置 | 结构特征族 | 推荐组件 |
|------|-----------|---------|
| Hero | 宣言 | hero-statement |
| 指标 | 大数字+小标签 | metric-card × 4 |
| 进度 | 段状条 | seg-bar + progress-trail |
| 时间线 | 链式节点 | timeline-track |
| 风险 | 锚点+列表 | callout（org 左线） |
| 下一步 | 锚点+列表 | action-list |

**参照案例**：R4-工作汇报模板、R4-数据汇报模板、R4-麦肯锡咨询、R4-达成率报告、R4-电销异常分析（5 维度+引导语）、**R4-风险预警标杆**（斜切 Hero + seg-bar 三色灰度 + 双栏 compare + 深色宣言 + 时间线 + 决策请求）、**R4-项目里程碑标杆**（Bento Grid 仪表盘 + phase-track + 交付物网格 + 深色卡片）

---

## R5 · SOP / 操作手册

> 步骤化流程文档、培训材料

**节奏模式**：

```
Hero (目标声明) → 前置条件 → 步骤序列 → 注意事项 → 常见问题 → 验收标准
```

**节奏骨架**：

| 位置 | 结构特征族 | 推荐组件 |
|------|-----------|---------|
| Hero | 宣言 | hero-clip（clip-path 切割） |
| 前置条件 | 紧凑数据行 | spec-table |
| 步骤 | 链式节点 | step-sequence |
| 注意 | 锚点+列表 | callout（Moss 左线） |
| FAQ | 不等分网格 | accordion 或 term-grid |
| 验收 | 锚点+列表 | checklist |

**参照案例**：R5-供应商准入SOP标杆（flow-pipeline + spec-grid + step-sequence + compare + callout + FAQ + checklist）、R5-供应商清退SOP标杆（rank-bar 梯度 + matrix 决策矩阵 + timeline-h 横向时间轴 + data-row 数据行 + dark-statement 深色红线）、R5-投诉处理SOP标杆（numeral-grid 四级分级 + level-track 层级追踪 + data-table 处罚表 + kpi-grid 指标卡 + term-grid 术语）、R5-结算异常处理SOP标杆（layer-stack 三源叠加 + recon-table 比对表 + tension-grid 对照 + progress-trail 进度条 + spec-table 邮件模板）、R5-文章模板、R5-F1遥测数据

---

## R6 · 知识管理 / 读书笔记

> 结构化知识整理、分类归档

**节奏模式**：

```
Hero (主题声明) → 分类导航 → 内容卡片 → 关键引用 → 标签系统
```

**节奏骨架**：

| 位置 | 结构特征族 | 推荐组件 |
|------|-----------|---------|
| Hero | 宣言 | hero-statement |
| 分类 | — | tab-panel |
| 内容 | 方阵排列 | card-quad 或 card-triad |
| 引用 | 方阵排列 | quote-array |
| 标签 | 紧凑数据行 | tag-cloud |

**参照案例**：R6-供应商最佳实践库标杆（cat-nav 分类导航 + practices 多列卡片网格 + quote-array 引用阵列 + tag-cloud 标签云，7 分类 18 条实践）、R6-深度阅读模板、R6-知识管理模板、R6-编辑设计标杆（6 段完整叙事，深浅交替完美）

---

## R7 · 数据 + 叙事混合

> 数据分析 + 品牌洞察，报告型内容

**节奏模式**：

```
Hero (深色+数据矩阵) → 关键发现 → 数据展示 (交替节奏) → 洞察总结 → 行动建议
```

**节奏骨架**：

| 位置 | 结构特征族 | 推荐组件 |
|------|-----------|---------|
| Hero | 方阵排列 | hero-pulse（深色+指标条） |
| 发现 | 锚点+列表 | callout × 3 |
| 数据 | 方阵/段状/紧凑 交替 | data-matrix → rank-bar → sparkline |
| 洞察 | 不等分网格 | insight-cards |
| 行动 | 锚点+列表 | action-list |

**参照案例**：R7-品牌阅读分析、R7-NYT数据叙事、R7-Spotify年度总结、R7-数据叙事手册、R7-数据叙事模板（Timeline 箭头连线 + Pull Quote + 深浅交替）

---

## 速查表

| 你要做的 | 配方 | 核心参照案例 |
|---------|------|------------|
| 深度文章/技术笔记 | R1 | R1-经济学深度系统 / R1-AI技巧长文 / R1-Hero形态标杆 |
| 数据分析报告 | R2 | R2-品牌数据分析 / R2-岐力绩效诊断 / R2-定价演变叙事 |
| 品牌/设计展示 | R3 | R3-IKEA民主设计 / R3-Haglöfs品牌系统 / R3-Haglöfs组件库 / R3-Mino设计系统 |
| 工作汇报 | R4 | R4-风险预警标杆 / R4-项目里程碑标杆 / R4-麦肯锡咨询 / R4-电销异常分析 |
| SOP/操作手册 | R5 | R5-供应商准入SOP标杆 / R5-供应商清退SOP标杆 / R5-投诉处理SOP标杆 / R5-结算异常处理SOP标杆 |
| 知识管理/读书笔记 | R6 | R6-供应商最佳实践库标杆 / R6-深度阅读模板 / R6-编辑设计标杆 |
| 数据+叙事混合 | R7 | R7-品牌阅读分析 / R7-数据叙事模板 / R7-Spotify年度总结 |

**没找到匹配的？** 按内容锚点选最接近的配方，然后微调节奏和组件。结构特征族不变，组件自由选择。

**模板文件**：`templates/` 目录下保留对应文件，只用作 CSS 变量体系和间距语义参考，不得复制 HTML 结构。

---

*最后更新：2026-06-04 — R5 新增 4 个 SOP 标杆 + R6 新增最佳实践库标杆*
