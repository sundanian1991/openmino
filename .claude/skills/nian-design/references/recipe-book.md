# 配方手册 — Recipe Book

> 配方定节奏和结构特征族（骨架），组件自由选择（血肉）。
> 节奏相邻不同族 = 硬约束。具体用哪个组件 = 根据内容决定。
> 参照案例用于"看长什么样"，不是"照抄"。

---

## 如何使用

1. 根据内容结构选配方 → 拿到节奏模式和结构特征族
2. 读 1 个参照案例（前 200 行）→ 理解视觉节奏和底色交替模式
3. 查 `components.md` / `components-ext.md` → 取组件 CSS 代码
4. 按节奏表组织页面，**每个组件根据当前内容重新设计**，不从模板抄 HTML
5. 模板文件在 `templates/` 下，只取 CSS 变量体系和间距语义，不复制布局

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

**参照案例**：`economist-deep-system.html`（深浅交替节奏）、`nian-ia-deep-dive.html`（交互组件）

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

**参照案例**：`haglofs-brand-analytics.html`、`岐力职场-绩效报告.html`

**数据颜色顺序**：opacity 区分 → earth-tone 梯度 → 最后 accent-orange。

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

**参照案例**：`ikea-democratic-design.html`、`scenario-brand.html`

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

**参照案例**：`work-report.html`、`scenario-data-v3.html`

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
| 注意 | 锚点+列表 | callout（olive 左线） |
| FAQ | 不等分网格 | accordion 或 term-grid |
| 验收 | 锚点+列表 | checklist |

**参照案例**：`scenario-article.html`

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

**参照案例**：`scenario-reading-deep.html`、`knowledge-management.html`

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

**参照案例**：`scenario-brand-read-analyze.html`、`nyt-data-narrative.html`

---

## 速查表

| 你要做的 | 配方 | 核心参照案例 |
|---------|------|------------|
| 深度文章/技术笔记 | R1 | economist-deep-system |
| 数据分析报告 | R2 | haglofs-brand-analytics |
| 品牌/设计展示 | R3 | ikea-democratic-design |
| 工作汇报 | R4 | work-report |
| SOP/操作手册 | R5 | scenario-article |
| 知识管理/读书笔记 | R6 | scenario-reading-deep |
| 数据+叙事混合 | R7 | scenario-brand-read-analyze |

**没找到匹配的？** 按内容锚点选最接近的配方，然后微调节奏和组件。结构特征族不变，组件自由选择。

**模板文件**：`templates/` 目录下保留对应文件，只用作 CSS 变量体系和间距语义参考，不得复制 HTML 结构。

---

*最后更新：2026-06-03 — 去掉模板硬引用，场景色改按情绪基调选择，组件强调重新设计*
