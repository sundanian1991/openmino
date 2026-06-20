# DESIGN SYSTEM MAP — 5 层架构入口

> nian-design 的完整使用地图。**5 层从下到上**，下层是上层的基础。
> 施工方只动 Layer 1-3。决策由上游技能做。

---

## 5 层总览

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 5 · Visual Streams (气质)                            │
│  9 种：Statement / Diagonal / Split / Numeral /            │
│        Entrance / Pulse / Dashboard + 黑条书签 / 长文导航   │
│  → references/VISUAL-STREAMS.md                             │
├─────────────────────────────────────────────────────────────┤
│  Layer 4 · Templates (端到端模板)                            │
│  20 个完整 HTML 模板（Coral / Grove / Mat / Vellum ...）    │
│  → references/templates/                                    │
├─────────────────────────────────────────────────────────────┤
│  Layer 3 · Layouts (页面骨架)                                │
│  S01-S28（28 种骨架）                                        │
│  → references/layouts.md                                    │
├─────────────────────────────────────────────────────────────┤
│  Layer 2 · Components (组件)                                 │
│  32 组件族（单文件，含亮/暗双模式色板）                       │
│  → references/components.md                                 │
├─────────────────────────────────────────────────────────────┤
│  Layer 1 · Tokens (CSS 变量)                                 │
│  7 个文件：colors / typography / spacing                     │
│  + motion / breakpoints / z-index                           │
│  → tokens/*.css                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 各层职责

### Layer 1 · Tokens

**是什么**：CSS 自定义属性，最底层的"原子"
**包含**：
- `colors.css` — 7 色 + Surface + Semantic + Text + 别名
- `typography.css` — 4 字体 + 12 字号 + 5 行高 + 5 字距 + Ghost 规范
- `spacing.css` — 8px base grid + Container + Radius
- `motion.css` — 5 时长 + 4 缓动 + 复合 transition
- `breakpoints.css` — 5 断点 + 5 容器宽 + 5 padding
- `z-index.css` — 8 层级

**谁能用**：所有层都依赖。决策卡不指定 token，但用 token 是默认。

### Layer 2 · Components

**是什么**：可独立复用的视觉单元，共 32 组件族
**包含**（见 `components.md` 单文件，含亮/暗双模式色板）：
- 01-03 基础：Cards / Buttons / Inputs
- 04-05 数据行：Lists / Tables
- 06-11 交互：Navigation / Tags / Segmented / Date / Toggles / Progress
- 12 微图表：Bar / Sparkline / Gauge / Dot Grid
- 13-14 容器：Widgets / Overlays
- 15-17 结构：State / Flow Pipeline / Do-Don't
- 18-26 布局型：Tab / Accordion / 对比表 / Detail / Checklist / 数字标题 / 三列网格 / Flip / 堆叠图卡
- 27-32 扩展：Gantt / Pyramid Stack / Radial Data / Quarter Bar / Flow Diagram Tree / Tree Architecture

**施工方职责**：按决策卡的 `components` 字段调组件，**不发明新组件**。

### Layer 3 · Layouts

**是什么**：完整的 `<section>` 骨架代码
**包含**：S01-S28
- Hero 类：S01-S04
- 总览类：S05、S06、S14、S22
- 展开类：S07、S09、S11、S19
- 转场类：S03、S13、S15
- 流程类：S08、S10、S20、S24
- 收束类：S18、S21、S27
- 长文档类：S29（刚加）

**施工方职责**：复制整个 `<section>`，改文案。

### Layer 4 · Templates

**是什么**：端到端完整 HTML 成品
**包含**：20 个 nian 体系模板（Coral / Grove / Mat / Vellum / Studio / Signal 等）
**用途**：找最接近的去改。**不是施工的必需品**，是"参考"。

**不复制整个 Template** — 复制 Template 里的某个 section（那其实回到了 Layer 3）。

### Layer 5 · Visual Streams

**是什么**：9 种视觉气质的定义
**包含**：
- 7 视觉型（页面内表达方式）
- 2 结构型（整页编排方式）

**重要**：Visual Stream **不是 Layout**，是更高一层的"气质分类"。

**决策权**：上游技能（设计决策）选，nian-design 不选。

---

## 施工方只动 3 层

```
决策卡输入
   ↓
Layer 3 选骨架（按 data-layout）
   ↓
Layer 2 调组件（按 component ID）
   ↓
Layer 1 用 token（自动）
   ↓
Step 4 · 5 条硬规则自检（CRAFT-RULES.md）
   ↓
HTML 输出
```

**Layer 4 和 Layer 5 不直接动** —— 它们是上游决策的产物，施工方只看决策卡。

---

## 与外部的接口

### 接收（上游）

```
[内容策展技能] → Markdown 施工图
        ↓
[设计决策技能] → 决策卡（气质/骨架/组件/配色）
        ↓
nian-design（施工）
```

nian-design **不接收**：
- 原始数据（由内容策展技能拆解）
- 风格选择（由设计决策技能定）
- 用户偏好（SKILL.md 不收用户反馈）

### 输出（下游）

```
nian-design（施工）
        ↓
[QA 校验技能] → 5 条硬规则扫描
        ↓
[最终输出]
```

nian-design **不输出**：
- 风格评审（由 QA 技能做）
- 内容校对（由内容策展技能负责）
- 交互逻辑（nian-design 是静态 HTML）

---

## 文件结构

```
nian-design/
├── SKILL.md                         # 入口：施工方定位 + 5 步走工作流
├── brand-dna.md                     # 品牌 DNA 简表
├── references/
│   ├── philosophy.md                # 设计哲学全文
│   ├── CRAFT-RULES.md               # 5 条硬规则（Step 4 必读）
│   ├── VISUAL-STREAMS.md            # 9 种气质（Step 2 选气质）
│   ├── components.md                # 32 组件族（Step 3 选组件，单文件含双模式色板）
│   ├── layouts.md                   # S01-S28 骨架（Step 2 选骨架）
│   ├── checklist.md                 # 详细自检清单 P0-P4（CRAFT-RULES 的细化补充）
│   ├── tokens.md                    # token 设计意图（字体/色板选择理由）
│   ├── templates/                   # 端到端参考模板
│   ├── showcase-archive/            # R 39 + H 67 历史 showcase
│   └── showcase-index.md            # showcase 索引
├── tokens/
│   ├── colors.css                   # 7 色体系精确值
│   ├── typography.css               # 4 字体 + Ghost 规范
│   ├── spacing.css                  # 8px base grid
│   ├── motion.css                   # 5 时长 + 4 缓动
│   ├── breakpoints.css              # 5 断点
│   └── z-index.css                  # 8 层级
├── assets/
│   └── template.html                # 种子模板
├── scripts/
│   └── validate-nian-deck.mjs       # 校验脚本
├── evals/                           # 评估集
└── output/                          # 产出归档
```

---

*最后更新：2026-06-19 — 对齐 components.md 32 族 / layouts.md S01-S28，修正元数据漂移*
