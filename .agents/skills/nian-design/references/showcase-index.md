# Showcase 索引 — 场景 → 骨架映射

> 查表用。找到场景，拿到骨架和组件，去做。
> 完整骨架代码见 `references/layouts.md`（S01-S21），每个 section 写 `data-layout="Sxx"`。

---

## 速查表：我要做什么 → 去哪里找

| 你要做这个 | 场景 | 深度 | 推荐骨架 | 参照案例 |
|-----------|------|:----:|---------|---------|
| 行业研究/竞品对比 | 感知 | L3 | S03→S06→S07→S15→S18→S21 | R2-方案选型评估 |
| 数据看板/全景分析 | 感知 | L4 | S03→S05→S06→S07→S18→S21 | R7-Bloomberg终端 |
| 方案选型/立项 | 决策 | L3 | S01→S05→S09→S07→S18→S21 | R2-方案选型评估 |
| SOP/操作手册 | 计划 | L4 | S01→S10→S11→S15→S18→S21 | R5-供应商准入SOP-标杆 |
| PRD/技术方案 | 计划 | L3 | S01→S10→S09→S18→S21 | R5-金条赛马规则 |
| 周报/进度汇报 | 执行 | L3 | S03→S05→S10→S07→S18→S21 | R4-风险预警-标杆 |
| 会议纪要 | 执行 | L2 | S01→S10→S15→S21 | R4-会议纪要 |
| 复盘报告 | 沉淀 | L3 | S01→S09→S11→S15→S18→S21 | R5-复盘报告 |
| 品牌展示页 | 对外 | L4 | S01→S04→S11→S15→S18→S21 | R3-品牌展示 |
| 销售提案/Deck | 对外 | L3 | S01→S05→S09→S11→S18→S21 | R3-IKEA民主设计 |

---

## 骨架速查（按场景）

| 场景 | 开屏 | 数据段 | 结构段 | 图文段 | 金句/转场 | 收尾 |
|------|------|--------|--------|--------|----------|------|
| 感知层 | S03 Hero 数据 | S05 指标卡 / S06 排名 | S10 流程 | S11 图文 / S07 表格 | S15 金句 | S18 结论 → S21 页脚 |
| 决策层 | S01 封面 / S04 分割 | S05 指标卡 / S06 排名 | S09 对照 / S10 流程 | S07 表格 | S15 金句 | S18 结论 → S21 页脚 |
| 计划层 | S01 封面 | — | S10 流程 / S20 闭环 | S11 图文 | S15 金句 | S18 结论 → S21 页脚 |
| 执行层 | S03 Hero 数据 | S05 指标卡 | S10 流程 | S07 表格 | S15 金句 | S18 结论 → S21 页脚 |
| 沉淀层 | S01 封面 / S04 分割 | — | S09 对照 / S17 系统图 | S11 图文 | S15 金句 | S18 结论 → S21 页脚 |
| 对外层 | S01 封面 / S04 分割 | S05 指标卡 | S09 对照 | S11 图文 / S12 网格 | S15 金句 | S18 结论 → S21 页脚 |

---

## 按场景展开

### 感知层 — 数据报告 / 行业全景

> 外面发生了什么？全景到聚焦。
> 气质优先级：Forest → Slate → Moss

| 深度 | 布局节奏 | 推荐组件 |
|:----:|---------|---------|
| L2 | Hero 宣言 → 要点 → 来源 | hero-statement, callout, source-row |
| L3 | Hero 宣言 → 指标 → 对比 → 趋势 → 洞察 | hero-statement, stat-block, comparison, sparkline, callout |
| L4 | Hero 脉冲 → 全景 → 对比 → 叙事 → 结论 | hero-pulse, data-matrix, comparison, bento-grid, dark-quote |

模板：`templates/perception.html`

---

### 决策层 — 方案选型 / 预算申请

> 要不要做？怎么做？选哪个？
> 气质优先级：Forest → Forest+Slate → Slate

| 深度 | 布局节奏 | 推荐组件 |
|:----:|---------|---------|
| L2 | Hero 宣言 → 对比 → 推荐 | hero-statement, callout/comparison, dark-quote |
| L3 | Hero 宣言 → 评分 → 对比 → 成本 → 风险 → 推荐 | hero-numeral, numeral-grid, rank-row__bar, seg-bar, callout, dark-quote |
| L4 | Hero 脉冲 → 评分 → 对比 → 交叉 → 场景 → 推荐 | hero-pulse, dashboard-grid, comparison, scatter plot, stacked-bar, dark-quote |

模板：`templates/decision.html`

---

### 计划层 — SOP / 流程文档

> 具体怎么做？步骤是什么？
> 气质优先级：Steel → Slate → Forest

| 深度 | 布局节奏 | 推荐组件 |
|:----:|---------|---------|
| L2 | Hero 宣言 → 步骤 → 验收 | hero-statement, step-sequence, checklist |
| L3 | Hero 宣言 → 前置 → 步骤 → 异常 → 验收 | hero-statement, callout, flow-pipeline, callout, checklist |
| L4 | Hero 分屏 → 概览 → 步骤 → 异常 → 验收 → FAQ | hero-split, timeline-track, flow-pipeline, callout, checklist, accordion |

模板：`templates/plan.html`

---

### 执行层 — 周报 / 进度 / 会议纪要

> 做完了吗？接下来做什么？
> 气质优先级：Forest+Gold → Slate+Clay → Steel+Red

| 深度 | 布局节奏 | 推荐组件 |
|:----:|---------|---------|
| L2 | Hero 宣言 → 指标 → 下一步 | hero-statement, stat-row, action-list |
| L3 | Hero 宣言 → 指标 → 进度 → 风险 → 计划 | hero-statement, stat-row, progress-trail, callout, action-list |
| L4 | Hero 脉冲 → 指标 → 趋势 → 风险 → 资源 → 行动 | hero-pulse, dashboard-grid, line chart, heatmap, stacked-bar, action-list |

模板：`templates/execution.html`

---

### 沉淀层 — 笔记 / 复盘 / 知识管理

> 学到了什么？什么值得记住？
> 气质优先级：Moss → Off-white

| 深度 | 布局节奏 | 推荐组件 |
|:----:|---------|---------|
| L2 | Hero 宣言 → 要点 → 来源 | hero-statement, callout, source-row |
| L3 | Hero 宣言 → 分类 → 对比 → 思考 → 行动 | hero-statement, callout/bento-grid, comparison, marginalia, action-list |
| L4 | Hero 分屏 → 全景 → 详解 → 论证 → 重构 → 指南 | hero-split, bento-grid, callout, comparison, principle-card, action-list |

模板：`templates/precipitate.html`

---

### 对外层 — 品牌展示 / 提案 / 白皮书

> 我们是谁？我们做什么？我们为什么不同？
> 气质优先级：Forest+Gold → Moss+Clay

| 深度 | 布局节奏 | 推荐组件 |
|:----:|---------|---------|
| L2 | Hero 宣言 → 要素 → 信任 | hero-statement, icon-card/product-card, logo-wall/single-huge-quote |
| L3 | Hero 分屏 → 品牌 → 原则 → 展示 → 信任 | hero-split, swatch-grid, comparison, bento-grid, quote-array |
| L4 | Hero 分屏 → 色板 → 字体 → 组件 → 原则 → 故事 → 签名 | hero-split, swatch-grid, typo-showcase, bento-grid, comparison, timeline-track, dot-matrix |

模板：`templates/external.html`

---

## 幻灯片模板

19 个模板在 `references/templates/`，已吸收 nian 色板。选模板 → `{Name}-nian.html` → 替换内容 → 完成。

| 名称 | 密度 | 幻灯片数 | 最佳场景 |
|------|:----:|:--------:|---------|
| Grove | 中 | 12 | 对外层 |
| Monochrome | 中低 | 18 | 感知层 |
| Cartesian | 中 | 8 | 决策层 |
| BlueProfessional | 中 | 12 | 决策层 |
| LongTable | 高 | 14 | 感知层 |
| Signal | 中 | 18 | 计划层 |
| RetroZine | 中 | 12 | 沉淀层 |
| RawGrid | 高 | 12 | 执行层 |
| BoldPoster | 中 | 10 | 对外层 |
| CobaltGrid | 中 | 10 | 感知层 |

---

## Hero 选型

核心 6 种代码从 `references/showcase/H/H061-组件展示-Hero品质标杆-hero.html` 取。

| 类型 | 核心/备用 | 触发条件 |
|:----:|:---------:|---------|
| V1 Diagonal | 核心 | — |
| V2 Split | 核心 | — |
| V3 Horizontal | 核心 | — |
| V4 Quadrant | 核心 | — |
| V5 Bevel | 核心 | — |
| V6 Watermark | 核心 | — |
| Before/After | 备用 | 内容含「改造前/后」对比 |
| Numeral | 备用 | D>=4 且核心指标 <=3 个 |
| Dashboard | 备用 | D=5 且多指标监控 |
| Pulse | 备用 | 品牌重大发布 |
| Entrance | 备用 | 深度阅读/品牌叙事开场 |

选型：先检查备用条件是否触发。未触发 → 从核心 6 种按场景默认选。备用触发 → 先用备用，不匹配回退核心。

---

*合并自 scene-*.md / recipe-book.md / SCENARIO-MAPPING.md，去重后保留映射关系。最后更新：2026-06-08*
