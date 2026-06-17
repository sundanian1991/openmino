# Intake · 数据分支（viz-data-storytelling + viz-design）

> 如何把数据叙事大纲 + 图表产物翻译成决策卡字段。

---

## 上游产物

数据分支跑两段：

**第一段：viz-data-storytelling** → 产出叙事大纲（Markdown）
- `Big Idea` — 一句话洞察+推理+建议，带置信度
- `受众` — 决策者/信任度/载体
- `数据推理` — 趋势/量级/排名/后果，每条带置信度
- `图表清单` — 每张图：名称/叙事功能/图表类型/视觉策略/数据源
- `叙事结构` — 三幕：铺垫/冲突/决议，每幕对应图编号
- `反对证据与局限性`
- `底部总结` — 起点/终点/拐点/建议行动

**第二段：viz-design** → 4阶段产出（intent/storyboard/spec/render）
- `storyboard.视觉重量` — 每张图分级 hero/medium/light（哪张当页面Hero）
- `spec.视觉编码` — X/Y/颜色/大小各编码什么维度
- `spec.布局` — 画布尺寸+版式编号
- `render` — 实际图表产物（ECharts HTML / SVG，可嵌入）

---

## 字段映射

### 从三幕叙事 + 视觉重量 → 气质（决策A）

数据分支的气质由"数据形态"决定：

| 叙事/数据特征 | visualStream | 依据 |
|---|---|---|
| 单一震撼指标开头（Big Idea 是一个核心数） | `Numeral` | 3-5个KPI开屏 |
| 数据密集（图表清单≥3张 + 多指标） | `Dashboard` | ≥3视觉形态 |
| 对比叙事（A vs B / 新旧 / 排名变化） | `Split` | 对分屏 |
| 时间/趋势叙事（推移/周期） | `Pulse` | 时间线 |
| 决策建议开头（Big Idea 是判断+建议） | `Statement` | 宣言对齐 |

判断优先级：先看图表清单的视觉重量——有 `hero` 级图 → 倾向 `Numeral`/`Dashboard`；无 hero 级、纯文字判断 → `Statement`。

### 从三幕叙事 → 骨架（决策B）

三幕直接映射骨架序列：

```
叙事结构          →  layout      →  role
─────────────────────────────────────
第一幕 铺垫（图1-2）→  S03/S04     →  hero/statement   开场给结论
第二幕 冲突（图3-5）→  S11/S14     →  evidence          证据展开，嵌图
第三幕 决议（图6-7）→  S21/S27     →  closure           收束+行动建议
```

数据分支常用骨架：S03（Hero Numeral 开场）、S14（格子卡放多图）、S11（展开证据）、S21（收束行动）。

### 从图表清单 + viz-design产物 → 数据图位置（dataCharts）

这是数据分支独有的字段。每张图填一项：

```yaml
dataCharts:
  - chartId: <图表清单里的名称>
    embedSection: <layoutSequence 里对应的 section 名>
    size: full | half | third      # viz-design spec.布局 的画布尺寸映射
    source: <viz-design render 产物路径>
```

视觉重量映射 size：
- `hero` → `full`（整宽，独占一屏）
- `medium` → `half`（半宽）
- `light` → `third`（三分之一，或并入格子卡）

**关键**：embedSection 必须与 layoutSequence 中的 section 名一致——这是 nian-design 知道"图嵌哪"的唯一线索。

### 组件（决策C）

数据分支的组件由数据形态驱动：

| 数据形态 | 组件 |
|---|---|
| 排名/对比 | 05 Tables / 20 对比表 |
| 多指标KPI | 13 Widgets / 23 数字标题 |
| 流程/路径 | 16 Flow Pipeline |
| 状态/进度 | 11 Progress / 10 Toggles |
| 图表容器 | 12 Mini Charts（12a-12d） |
| 结论+证据 | 17 Do-Don't |

**注意**：viz-design 已渲染的图表是"素材"，决策卡不在 components 里重复选图表组件——图表走 dataCharts 字段。components 只选"承载图表的容器组件"（如 13 Widgets 当图表卡片框）。

### Hero + 打破

- **Hero**：由气质决定（Numeral→V6-Numeral，Dashboard→Numeral缩到60vh，Statement→V4-Statement）
- **打破**：数据分支首选 `超大数字`（Big Idea 的核心数值，超大 Playfair）或 `accent色`（关键拐点用 --yellow 高亮）

---

## 数据分支决策卡模板

```yaml
branch: data
visualStream: Numeral                # 或 Dashboard / Split / Pulse / Statement
structuralStream: null               # 数据分支通常不用结构型
layoutSequence:
  - { section: 开场结论, layout: S03, role: hero }       # 第一幕
  - { section: <证据1>, layout: S11, role: evidence }    # 第二幕
  - { section: <证据2>, layout: S14, role: evidence }
  - { section: 行动建议, layout: S21, role: closure }    # 第三幕
heroType: V6-Numeral                 # 由 visualStream 决定
components:
  - { id: "05 TABLES", purpose: 排名对比 }
  - { id: "13 WIDGETS", purpose: 图表卡片容器 }
breakPoint:
  section: 开场结论
  method: 超大数字
  spec: { value: <Big Idea核心数值>, font: Playfair, color: --darkgray }
palette:
  primary: darkgray                  # 数据报告偏权威深色 / 或 olive
  accent: yellow                     # 高亮关键拐点
  baseMode: light                    # 数据图禁深色背景（见 [[feedback_chart_light_theme]]）
dataCharts:
  - { chartId: <图1名>, embedSection: 开场结论, size: full, source: <viz-design产物> }
  - { chartId: <图2名>, embedSection: <证据1>, size: half, source: <viz-design产物> }
source:
  narrative: <viz-data-storytelling 叙事大纲路径>
  audience: <大纲里的受众>
```

---

## 边界提醒

- viz 家族**独立完成图表渲染**（viz-data-storytelling→viz-design），决策卡不介入图表制作，只决定"图嵌页面哪里、多大"
- 决策卡不修改图表内容、不改配色——那是 viz-design 的 Warm/Stone/Teal 色系
- 数据图**只用浅色背景**，与 nian-design 的 baseMode:light 一致（见记忆 feedback_chart_light_theme）

---

*最后更新：2026-06-13 — 数据分支 intake v1*
