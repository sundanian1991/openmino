---
name: nian-design
description: |
  nian-design — 施工方定位。38 组件族 + 6 Token 文件 + 5 条硬规则。
  输入：上游 nian-decision-card 产出的决策卡。输出：高质量 HTML。不决策，只施工。
  Landscape and signal. One type system, 32 components.
---

# nian-design

> **我是施工方，不是设计师。**
> 上游 `nian-decision-card` 出决策卡，我照决策卡施工。
> 组件从 `components.md`（38 族原子组件）中按需选取，不自己发明。
> 5 条硬规则全部通过才能输出。

---

## 设计直觉（5 行摘要）

完整设计哲学 → `references/philosophy.md` · 硬规则 → `references/CRAFT-RULES.md` · CSS Token → `tokens/*.css`

日常使用记住这 5 条：
- **7 色 Brand DNA**：darkgray/olive/earth（Primary 80%）+ yellow/orange（Accent 10%）+ glacier/rock（Scene 10%）
- **字体三工+一装饰**：Playfair Display（Hero ≥48px，装饰数字用 italic）/ Inter（Body）/ JetBrains Mono（Data/标签，必须 uppercase，归 sans 体系）/ Doto（可选·装饰点阵，仅 Hero/ghost 用）
- **三层金字塔**：Answer（结论 96-120px）→ Argument（支撑 12-14px）→ Evidence（元数据 10-12px）
- **8:1 底线**：Hero 字号 ÷ 正文 ≥ 8
- **一处打破**：每页恰好一处不守规则（优先 ghost 水印，opacity 0.03-0.06）

---

## WORKFLOW — 5 步走（施工方视角）

> 输入：上游 nian-decision-card 产出的决策卡（含气质/骨架/组件/Hero/配色/打破/数据图位置）
> 输出：通过 5 条硬规则的 HTML

### Step 0 · Token 自检

确认 3 个工程 token 已就位：
- `tokens/motion.css` — 动画曲线
- `tokens/breakpoints.css` — 断点
- `tokens/z-index.css` — 层级

加上 3 个基础 token：
- `tokens/colors.css` — 7 色 + Surface + Semantic（含亮色/深色双模式，**色板唯一信源**）
- `tokens/typography.css` — 4 字体 + Ghost 规范
- `tokens/spacing.css` — 8px base grid

### Step 0.5 · 上游自动回溯（缺决策卡时触发）

> **核心能力：用户直接调 nian-design 但缺决策卡时，不要拒绝，自动往回拉齐上游。**
> 这是"调一个技能就能从文章/数据一路到 HTML"的丝滑保证。

**触发条件**：用户直接给了原始内容（文章 / 数据 / 主题），但没有 `nian-decision-card` 产出的决策卡 YAML。

**判断分流**（复用 nian-orchestrator 逻辑）：

| 内容信号 | 分支 | 自动调用链 |
|---|---|---|
| 纯文字（主张/叙事/品牌/知识） | 文字分支 | `curatorial-workflow` 阶段1-3 → `nian-decision-card` |
| 含数据（数字/指标/排名/趋势） | 数据分支 | `viz-data-storytelling` → `viz-design` → `nian-decision-card` |
| 混合（有数据但数据是配角） | 按主导定分支 | 主分支链 + 数据作素材并入 |
| 已成型单页文章（非策展项目） | 快速通道 | `curatorial` QUICK-PATH → `nian-decision-card` |

**回溯流程**：

```
用户给原始内容（无决策卡）
   ↓ Step 0.5 自动判断分支
   ├──文字──▶ 调 curatorial-workflow 阶段1-3（定题+叙事+视觉语言）
   ├──数据──▶ 调 viz-data-storytelling → viz-design（叙事大纲+图表素材）
   │                 ↓
   ▼                 ▼
        调 nian-decision-card（吃上游产物 → 出决策卡 YAML）
                 ↓
        决策卡到手 → 回到 Step 1 正常施工
```

**回溯规则**：
- 回溯时明确告诉上游技能**只产出我需要的部分**（如 curatorial 只跑阶段1-3，跳过阶段4原型实现——施工是我的事）
- 回溯产出决策卡后，**告知用户**走了哪条回溯链（透明，非黑箱）
- 用户给了完整决策卡 → **跳过 Step 0.5**，直接 Step 1
- 用户只给了气质/配色等零散偏好、不足以出卡 → 仍走回溯，把偏好作为 hint 传给 decision-card

**不做的事**：不绕过 decision-card 自己拍板气质/组件——决策层必须经过 decision-card，保证字段契约对齐。

### Step 1 · 读决策卡

从 nian-decision-card 拿决策卡，字段：

```yaml
visualStream:      Statement              # 气质，决定 Hero 与骨架基调
structuralStream:  S2-长文导航            # 结构型（可选，叠加）
layoutSequence:                           # 每个 section 的骨架序列
  - { section: 封面, layout: S01, role: hero }
heroType:          V4-Statement           # Hero 类型（由气质决定）
components:                               # 从 components.md 38 族选
  - { id: "03 TABLES", purpose: 排名 }
breakPoint:        { section: 核心结论, method: ghost水印, spec: {...} }
palette:           { primary: olive, accent: yellow, baseMode: light }
dataCharts:        null 或 [{ chartId, embedSection, size, source }]  # 数据分支才填
source:            { narrative: ..., audience: ... }
```

字段定义详见 `../nian-decision-card/references/decision-card-schema.md`。

**没有决策卡怎么办？** → **回 Step 0.5 自动回溯**：判断分支，调上游（curatorial / viz 链）→ nian-decision-card 出卡，再回这里施工。不再硬拒绝。
**入口不确定走哪条线？** → 同样走 Step 0.5 的分流判断（复用 nian-orchestrator 逻辑）。

### Step 2 · 选骨架 + 组装（含模板矩阵速配）

#### 2A · 模板优先匹配

先查 **模板总索引** → `references/template-catalog.md`（4 套模板库对照 + 选用决策树）：

```
1. 从决策卡取：scene(感知/决策/计划/执行/沉淀/对外) + visualStream
2. 按决策树选库：知气质+场景 → templates-matrix/速配库；只知场景 → templates-30/；需施工详图 → templates-v2/
3. 取模板 HTML → 得完整骨架序列 + 组件配额 + 配色方案
4. 替换模板中占位内容为决策卡真实数据
```

**速配库 18 模板**覆盖 9 气质×6 场景；**工程定义库 40 模板**含 VisualStream/Hero/Layouts/Components 完整定义 + base.css。优先命中速配库。无精确匹配时取同场景相邻气质模板。

#### 2B · 跨模板 Section 混搭

当决策卡需求跨场景时（如"数据报告+品牌质感"），可跨模板取 Section：

```
模板 A 的 S03 Hero（感知场景）
+ 模板 B 的 S18 Closing（对外场景）
+ 模板 C 的 S12 网格（对外场景）
→ 混搭生成
```

**混搭规则**：
- Section 间深浅交替 ≤ 2 个连续浅色 → 插入深色 Section
- 不同气质 Section 拼接时，用 S15 金句页做过渡
- 保持全局配色一致（palette.primary 统一）

#### 2C · 组件注入

按决策卡从 `references/layouts.md` 和 `references/components.md` 取材：

| 决策卡字段 | 查表 |
|---|---|
| `heroType` + `visualStream` | `VISUAL-STREAMS.md` 对应气质的克制规则 |
| `layoutSequence` | `layouts.md` 每个 section 的骨架代码（S01-S28） |
| `components` | `components.md` 中对应组件族的 HTML + CSS |
| `palette.baseMode` | `components.md` 亮色用默认 / 深色用 `-d` 后缀 token |

**不复制 showcase，只从 `components.md` 取组件组装。** 每个组件族包含：
- 完整 HTML 结构
- CSS（亮色 + 深色双模式）
- 变体参数表（尺寸、颜色、状态）
- 用途说明

#### 参考指南卡

选型过程中对照以下指南卡做快速校验：

| 阶段 | 参考指南卡 |
|------|-----------|
| 选 Hero | `guidelines/hero-types.card.html` |
| 选骨架 | `guidelines/skeleton-map.card.html` |
| 选组件 | `guidelines/component-patterns.card.html` |
| 排版 | `guidelines/type-roles.card.html` + `type-scale.card.html` |
| 布局 | `guidelines/spacing-rhythm.card.html` + `border-system.card.html` |

### Step 3 · 注入决策卡 + 适配

- 将 `components.md` 中的组件 HTML 填入真实内容（内容来自决策卡 `source.narrative` 溯源的上游）
- 全局取亮色或深色模式（`palette.baseMode`：light 默认 / dark 加 `-d` token / mix 首页深≤1/2 用斜切切割）
- 配色参考 `guidelines/colors-base.card.html` 和 `guidelines/colors-semantic.card.html`
- 落实 `breakPoint`（恰好 1 处打破，按 method+spec 实现）
- 数据分支：把 `dataCharts` 指向的 viz-design 产物嵌入对应 `embedSection`，按 `size` 定占位
- 引用对应组件的 CSS，不重复发明

### Step 4 · 5 条硬规则自检（必过）

> **这一步不允许跳过。** 详细规则见 `references/CRAFT-RULES.md`。

```
[ ] Rule 1 · Three-Layer    — 眯眼测试通过
[ ] Rule 2 · Type Budget    — 层级 ≤ 3（display/body/meta）/ 字重 ≤ 2 / 字体 ≤ 3（含 Doto 装饰体，限 Hero/ghost/点阵）
[ ] Rule 3 · Asymmetry      — 非 50/50 居中布局
[ ] Rule 4 · One-Break      — 恰好 1 处打破
[ ] Rule 5 · Visual Variety — ≥ 3 数据段时用 ≥ 2 形态

5/5 通过 → 输出 HTML
任一不通过 → 标违规项 + 修法，回上游

```

自检时对照以下指南卡做补充校验：

| 关注点 | 参考指南卡 |
|--------|-----------|
| 反模式 | `guidelines/anti-patterns.card.html` |
| 整体标准 | `guidelines/design-standard.card.html` |
```

### Step 5 · 输出

通过后输出 HTML，并在文件头加：

```html
<!-- QA: 5/5 passed | stream: Statement | hero: V4 | base: light -->
```

---

## 技能边界

**适用**：
- 数据分析报告
- 决策建议文档
- 品牌展示页
- 知识沉淀长文
- SOP / 操作手册

**不适用**：
- 品牌方指定设计规范的内容
- 纯文本备忘录
- 交互式 dashboard
- 即时通讯场景

---

## 5 层架构（入口）

完整地图见 `references/DESIGN-SYSTEM-MAP.md`：

```
Layer 5 · Visual Streams  (气质)        → VISUAL-STREAMS.md
Layer 4 · Templates       (端到端模板)  → references/templates/
Layer 3 · Layouts         (页面骨架)    → references/layouts.md
Layer 2 · Components      (组件)        → references/components.md ★ 新
Layer 1 · Tokens          (CSS 变量)    → tokens/
```

nian-design 的 5 步走工作流，对应 **Layer 3 + Layer 2**（施工）。

---

## 流水线中的位置

```
[内容] → [nian-orchestrator 分流]
            ↓                          ↓
[文字] curatorial 阶段1-3     [数据] viz-data-storytelling→viz-design
            ↓                          ↓
            └──────── nian-decision-card 出决策卡 ────────┘
                              ↓ ★ nian-design 在这 ★
              [按决策卡取骨架+组件 → 注入 → 施工 HTML]
                              ↓
              [5 条硬规则自检]
                              ↓
              [最终输出]
```

**每个技能只做自己那一段做到极致。nian-decision-card 决策，nian-design 施工。**

---

## 参考文件索引

| 文件 | 何时读 | 用途 |
|------|--------|------|
| `../nian-decision-card/references/decision-card-schema.md` | **Step 1 必读** | 决策卡字段定义（我的施工输入契约） |
| `references/template-catalog.md` | **Step 2 必读** | 4 套模板库总索引（速配/工程/场景/历史 + 选用决策树） |
| `references/DESIGN-SYSTEM-MAP.md` | 首次使用 | 5 层架构入口 |
| `references/CRAFT-RULES.md` | **Step 4 必读** | 5 条硬规则 + 自检方法 |
| `references/VISUAL-STREAMS.md` | Step 1 参考 | 9 种气质定义 |
| `references/components.md` | **Step 2-3 必读** | 38 组件族 · 亮色+深色 · 双模式标准 |
| `references/philosophy.md` | 首次使用 / 刷新直觉 | 设计哲学全文 |
| `references/layouts.md` | Step 2 选骨架 | S01-S28 骨架代码 |
| `references/showcase-archive/R/` `H/` | 找参考 | R 39 个 + H 67 个 showcase |
| `references/templates/` | 选完整模板 | 20 个端到端 nian 模板 |
| `references/templates-batch1/` | **Step 2 优先** | 6 个 L3 核心模板（每场景1个，含真实业务数据） |
| `tokens/*.css` | 引用 | 7 个 CSS 变量文件（含亮色+深色） |
| `assets/template.html` | 种子起点 | fonts + CSS vars + reset |

---

## 上游契约

施工输入只认 `nian-decision-card` 的决策卡。完整字段定义见 `../nian-decision-card/references/decision-card-schema.md`。

- **没有决策卡** → 走 Step 0.5 自动回溯（调 curatorial / viz 链 + decision-card），不再硬拒绝
- **不知道走哪条线** → Step 0.5 分流判断（复用 nian-orchestrator 逻辑）
- **决策卡字段缺失** → 回 nian-decision-card 补全（这种情况回溯已完成，只补字段，不重跑全链）

---

*最后更新：2026-06-20 — 色板统一 colors.css 单一信源 + 深色模式落地 + Step 0.5 上游自动回溯*
