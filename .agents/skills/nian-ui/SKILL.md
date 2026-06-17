---
name: nian-ui
description: |
  nian-ui — 导演级叙事骨架 + nian 视觉皮肤。
  继承 cinematic-ui 的 4-phase 工作流（决策→故事板→编译规范→构建），但所有视觉输出强制使用 nian token 体系。
  场景色取代导演调色板。叙事结构保留。品牌一致性优先。
---

# nian-ui

> 导演级的叙事结构。注册过的视觉语言。
> Cinematic structure. Nian color. One voice.

---

## 核心原则

**年 UI = cinematic-ui 的叙事骨架 + nian-design 的视觉皮肤。**

继承关系：

| 来源 | 继承内容 | 替换内容 |
|------|---------|---------|
| cinematic-ui | 4-phase 工作流、叙事节拍、构图族、入场效果、导演参考 | 调色板 → nian scene color、字体 → nian 三工、滤镜 → nian 无阴影系统 |
| nian-design | brand-dna、token 体系、craft rules（三层金字塔/8:1/无阴影/无渐变） | — |

**不可违反的铁律：**

1. 所有输出页的色彩体系必须使用 nian token（scene color + 表面层 + 文字层 + 功能色）
2. 导演/电影仅供**叙事结构和情感基调**参考，不影响颜色
3. 颜色替换逻辑：情绪基调 → 场景色选择（olive/earth/glacier），不是色值的一一对应
4. 其他维度（构图、入场、动效、节拍）保持 cinematic-ui 的丰富度

---

## 用户决策协议

所有需要用户决策的暂停点必须使用 `AskUserQuestion` 工具。调用规则：

- **选项硬编码**：不在 prompt 中让模型自由生成，在工具调用中写死每个选项的 label/description
- **单次单问**：一次 `AskUserQuestion` 只问一个问题，不混多个决策
- **默认推荐**：第一个选项为推荐项，标注 `(Recommended)`
- **确认即推进**：用户选择后继续流程，不反复确认

每个暂停点在流程中以 `⏸` 标注。以下为最低暂停点列表——执行者可酌情增加，不可跳过。

---

## Start Questionnaire

每次调用必须先完成以下问卷，再进入 Phase 1：

1. **如何开始？** ⏸ `AskUserQuestion` — 三选一，选项硬编码
   - `Screenshot`: 从截图或 URL 反推视觉参考
   - `Step-by-step`: 选择类型、导演、电影
   - `Surprise me`: 自动组合

2. **是否包含图片占位？** ⏸ `AskUserQuestion` — Y/N 二选一

3. **站点定位和页面列表？** ⏸ `AskUserQuestion` — 自由输入，要求年老师提供站点描述和所需页面列表

4. **场景色选择（三选一）—— 这是年 UI 的颜色决策步骤：** ⏸ `AskUserQuestion` — 三选一，label：Olive / Earth / Glacier，附带情绪基调描述

   | 色 | 色值 | 情绪基调 | 适合叙事风格 |
   |----|------|---------|-------------|
   | Olive | `#4A5D3A` | 增长、权威、生命力 | 成长叙事、革新故事、活力品牌 |
   | Earth | `#8B7355` | 温暖、怀旧、质感 | 爱情片、工艺叙事、人文历史 |
   | Glacier | `#2A4A5A` | 冷峻、精确、距离感 | 科幻、悬疑、技术叙事、哲学沉思 |

   **选色标准**：问"这个故事的核心情绪是什么？"而不是"导演用了什么颜色"。
   王家卫的怀念温暖 → Earth。周星驰的底层活力 → Olive。诺兰的精密时空 → Glacier。

5. **导演/电影选择（仅供结构参考，不影响颜色）：** ⏸ `AskUserQuestion` — 根据 Q1 的选择：Screenshot 模式展示推断结果确认，Step-by-step 模式展示导演列表手选
   选择导演和电影，提取其叙事结构、构图偏好、节奏特征。
   导演的调色板被忽略。所有颜色来自上一步的场景色。

---

## Operating Model

四阶段严格顺序执行。每个阶段的输出保留在独立的 Markdown 文件中。

1. Phase 1: decisions.md
2. Phase 2: storyboard.md
3. Phase 3: compiled-spec.md
4. Phase 4: build + verify

---

## Phase 1: Decisions

**前置条件：** Start Questionnaire 已全部完成。

1. 如果从截图/URL 开始，先检查参考，推断合适的类型、导演和电影 ⏸ `AskUserQuestion` — 展示推断结果，确认/修正后再继续

2. **导演研究（获取结构灵感，不获取颜色）：**
   - 读 `references/data/directors-200.md`
   - 提取导演的 signature techniques、composition preferences、narrative patterns
   - **忽略**"Web Translation"列中的颜色暗示和 CSS filter 描述
   - 如果有网页访问，搜索该导演的代表作，获取构图/运动/节奏参考
   - 记录研究来源和简短的翻译笔记

3. **Uniqueness Audit**
   - 如果 workspace 中有该用户先前的输出，检查并记录哪些会重复
   - 写入 `decisions.md` 的 `Previous-work audit`

4. **Shell-ban list** ⏸ `AskUserQuestion` — 展示 Shell-ban list，年老师确认后再写入 `decisions.md`
   - 记录本次项目禁止使用的布局和框架

5. **Primary composition family** ⏸ `AskUserQuestion` — 展示可选构图族（排除最近一次已用的），确认选择
   - 确定页面主要的构图家族（full-bleed stage / corridor / vertical tower / archive wall / panoramic slab / cutaway monolith）
   - 必须与用户最近一次输出不同

6. **场景色正当性声明**
   - 一句话说明：为什么选这个场景色、它如何支持故事的情感基调
   - 写入 `decisions.md`

7. 写 `decisions.md`

⏸ **Phase 1 → Phase 2 门控**：用 `AskUserQuestion` 呈现 decisions.md 摘要（导演/场景色/构图族/Shell-ban），确认是否进入故事板阶段。选项：`继续 (Recommended)` / `调整 decisions.md` / `重选场景色`

---

## Phase 2: Storyboard

读以下文件（逐一读取，不同时加载）：

- `references/data/hero-archetypes.md`
- `references/data/narrative-beats.md`
- `references/data/section-functions.md`
- `references/data/section-archetypes.md`
- `references/anti-convergence.md`
- `references/data/dna-index.tsv`（仅作为结构参考，忽略颜色列）
- `references/data/design-db.txt`（仅当需要深入了解时）

### 2a. 站点级电影语法

在进入任何页面设计前定义：

- 页面壳逻辑（page-shell logic）
- 导航姿态（navigation posture）
- 构图原则（framing rules）
- 密度节奏（density cadence）
- 循环材质或大气层
- 适合所选场景色的构图家族
- Shell-ban list 检查

### 2b. 导演简报（年 UI 修订版）

构建导演简报，包含：

- **一句话视觉主题**（排除颜色描述，聚焦结构和情绪）
- **3 个 signature 技法及其 web 翻译**（如：王家卫的手持亲密感 → 慢缓入场、窗口构图）
- **颜色令牌**（使用 nian token 体系，不是导演颜色）：
  ```
  --scene: var(--scene-olive)/--scene-earth)/--scene-glacier)  /* 根据选择 */
  --scene-bg: rgba(... , 0.06)
  --scene-border: rgba(... , 0.2)
  --text-display: #2C2C2C
  --text-primary: #1A1A1A
  --text-secondary: #6B6B6B
  --text-disabled: #A0A0A0
  --bg: #FAFAF8
  --surface: #FFFFFF
  --surface-raised: #F5F5F0
  --border: #E5E5E0
  --border-visible: #C0C0B8
  ```
- **字体方向**（固定，无需决策）：
  - Display: Playfair Display 300 (96-120px)
  - H1-H3: Playfair Display / Inter
  - Body: Inter 400 (16px)
  - Data: JetBrains Mono 500 (14px)
  - Label: JetBrains Mono 500 (11px, ALL CAPS, 0.06em)
- **动效规则**（从 cinematic-ui 筛选 nian-safe 效果）：
  - 使用 `transform + opacity + clip-path` 实现入场
  - 禁止 blur/shadow/gradient/bounce/parallax
  - 缓动使用 `cubic-bezier(0.25, 0.1, 0.25, 1)`

### 2c. 三层金字塔叠加

每个 section 必须满足：

| 层级 | 内容 | 做法 |
|------|------|------|
| **Answer** | 唯一结论。品牌宣言、核心指标。 | Playfair Display，96-120px。眯眼看应主导全屏。 |
| **Argument** | 支撑上下文。功能、规格、描述。 | Inter body，`--text-primary`。 |
| **Evidence** | 元数据、技术参数、来源。 | JetBrains Mono，`--text-secondary` 以下，ALL CAPS。 |

### 2d. 页面级场景

对每个主要页面角色：
- 写一句场景主题
- 确定不可替代的签名构图
- Hero dominance statement（为什么 Hero 感觉有冲击力——不使用渐变和阴影）
- Restraint statement（你故意不做的事）
- 材料主题（表面如何触感）
- 字体主题

### 2e. 反趋同检查

应用 `references/anti-convergence.md` 的检查。

### 2f. 写故事板

⏸ `AskUserQuestion` — 展示拟采用的 section 原型列表、签名构图和叙事节拍安排，确认后再写故事板。

写 `storyboard.md`。

---

## Phase 3: Compiled Spec

### 3a. 先读

- `references/implementation-guardrails.md`
- `references/anti-garbage.md`

### 3b. 按需读取（仅读当前场景需要的内容）

- `references/data/camera-shots-50.md`
- `references/data/interaction-effects-50.md`
- `references/data/compositions.md`
- `references/data/visual-elements.md`
- `references/data/background-techniques.md`
- `references/data/typography-cinema.md`
- `references/data/font-moods.md`
- `references/data/textures.md`
- `references/data/visual-styles.md`

### 3c. 扩展库读取（nian-design 继承的 nian-safe 库）

- `references/extended-layouts.md`
- `references/entrances.md`
- `references/typography-treatments.md`
- `references/textures.md`
- `references/visual-elements-ext.md`

### 3d. 颜色来源

**重要：不使用 `color-grades.md`。** 所有颜色从 nian token 获取：

```css
:root {
  --scene: var(--scene-olive);      /* 或 --scene-earth / --scene-glacier */
  --scene-bg: rgba(74, 93, 58, 0.06);  /* 根据场景色调整 */
  --scene-border: rgba(74, 93, 58, 0.2); /* 根据场景色调整 */
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-visible: #C0C0B8;
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;
}
```

### 3e. 字体加载（固定）

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Doto:wght@400;700&display=swap" rel="stylesheet">
```

### 3f. 入口映射

每个页面前写入口映射。`fadeUp` 每页最多出现 2 次，至少 4 种不同入口。

### 3g. 硬约束检查

Phase 3 输出完成后，检查以下约束（来自 nian + cinematic 融合）：

| # | 规则 | 来源 |
|---|------|------|
| 1 | 3 字体不混角色 | nian |
| 2 | Hero ≥ 96px，与 body 比值 ≥ 8:1 | nian |
| 3 | 无渐变/阴影/模糊/毛玻璃 | nian |
| 4 | 场景色三选一，同页只用一个 | nian |
| 5 | Hero 底色为 `--bg` 或 `--surface`（非深色全背景）| nian |
| 6 | accent-orange 仅功能信号 | nian |
| 7 | 相邻 section 不同结构特征 | nian |
| 8 | 有装饰元素（ghost 字/装饰线/浮动标签/点阵 选 2-3 处）| nian |
| 9 | 每页至少 4 种不同入口 | cinematic |
| 10 | 至少 4 个不同 narrative beats | cinematic |
| 11 | 每页一个不可替代的签名构图 | cinematic |
| 12 | 没有重复的相邻入口/动效 | cinematic |
| 13 | 互动预算：每页最多 1 个重互动，2 个注意吸引式揭示 | cinematic |
| 14 | 每页恰好一处"打破" | nian |
| 15 | 无 bounce/spring/视差/滚动劫持 | nian |

### 3h. 写 compiled-spec.md

写 `compiled-spec.md` 作为实现的唯一真实来源。

---

## Phase 4: Build & Verify

### 4a. 构建

- 仅读取 `compiled-spec.md` 构建
- 所有 CSS 使用 nian token 变量
- 所有 HTML 遵循 nian 容器策略（间距优先、细边框次之）
- 添加 reduced-motion 处理和响应式

### 4b. 验证

对照以下清单验证：

1. **nian checklist**（从 `references/checklist.md`）：P0 红线全过
2. **Screening Room**：眯眼验证 Answer 层是否主导
3. **Design Rules**（从 `references/design-rules.md`）：字体纪律/容器策略/打破规则
4. **Post-Screening Adjustments**：如果输出不符合导演的结构期望，返回 Phase 3 调整

### 4c. 输出

输出一个完整的 HTML 文件。内联所有 CSS。除非互动需要，否则不引用外部 JS。

---

## Reference Files

| 文件 | 来源 | 用途 | 何时读 |
|------|------|------|--------|
| `brand-dna.md` | nian | 品牌基因、气质、Craft Rules | Phase 1 必读 |
| `references/tokens.md` | nian | token 精确值（色/字/间距/圆角/深度） | Phase 1 必读 |
| `references/checklist.md` | nian | P0-P3 质量检查 | Phase 4 |
| `references/design-rules.md` | nian | 详细设计规则 | Phase 3/4 |
| `references/anti-convergence.md` | cinematic | 英雄/叙事/section 反趋同 | Phase 2 |
| `references/library-index.md` | — | 引用索引 | 每次调用 |
| `references/premium-calibration.md` | cinematic (adapted) | 高端校准（nian-safe） | Phase 3 |
| `references/anti-garbage.md` | cinematic | 质量过滤器 | Phase 3/4 |
| `references/reference-protocol.md` | cinematic | 用户参考处理协议 | 用户提供参考时 |
| `references/output-templates.md` | cinematic | 输出模板 | 各阶段输出 |
| `references/implementation-guardrails.md` | cinematic (adapted) | 实施护栏 | Phase 3 |
| `references/data/directors-200.md` | cinematic | 导演风格库 | Phase 1 |
| `references/data/narrative-beats.md` | cinematic | 叙事节拍 | Phase 2 |
| `references/data/section-functions.md` | cinematic | Section 功能 | Phase 2 |
| `references/data/section-archetypes.md` | cinematic | Section 结构原型 | Phase 2 |
| `references/data/hero-archetypes.md` | cinematic | 英雄原型 | Phase 2 |
| `references/data/compositions.md` | cinematic | 80 种布局构图 | Phase 3 |
| `references/data/camera-shots-50.md` | cinematic | 50 种镜头揭示 | Phase 3 |
| `references/data/interaction-effects-50.md` | cinematic | 50 种互动效果 | Phase 3 |
| `references/data/visual-elements.md` | cinematic | 视觉元素库 | Phase 3 |
| `references/data/background-techniques.md` | cinematic | 背景技术 | Phase 3 |
| `references/data/typography-cinema.md` | cinematic | 电影级字体效果 | Phase 3 |
| `references/data/font-moods.md` | cinematic | 字体情绪配对 | Phase 3 |
| `references/data/textures.md` | cinematic | 纹理/材质 | Phase 3 |
| `references/data/visual-styles.md` | cinematic | 视觉风格交叉检查 | Phase 3 |
| `references/data/image-direction.md` | cinematic | 图片指导 | Phase 3 |
| `references/data/dna-index.tsv` | cinematic | 结构 DNA 参考（忽略颜色列） | Phase 2 |
| `references/data/design-dna-db.txt` | cinematic | 结构 DNA 详细 | Phase 2 按需 |
| `references/extended-layouts.md` | nian | 30 种扩展布局（nian-safe） | Phase 3 |
| `references/entrances.md` | nian | 15 种入场效果（nian-safe） | Phase 3 |
| `references/typography-treatments.md` | nian | 25 种文字处理（nian-safe） | Phase 3 |
| `references/textures.md` | nian | 15 种 CSS 材质（nian-safe） | Phase 3 |
| `references/visual-elements-ext.md` | nian | 20 种装饰元素（nian-safe） | Phase 3 |

---

## Anti-Patterns（P0 红线）

- 渐变、阴影、模糊、毛玻璃
- 颜色不经过场景色选择直接写得
- 使用 `color-grades.md` 或电影调色板
- 深色模式、深浅切换
- 视差、滚动劫持、弹跳缓动
- 斑马纹、填充图标、emoji 做 UI
- accent-orange 做装饰（仅功能信号）
- 跳过 opacity/梯度直接用 accent 区分数据
- 导演/电影名称、workflow 术语暴露在用户界面
- 多个场景色同页混用

---

*nian-ui — 2026-06-03 创建。cinematic-ui 的叙事骨架 + nian-design 的视觉皮肤。*
