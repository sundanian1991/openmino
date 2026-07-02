# Haglöfs 范式品牌页技能 · 实施计划

> **执行说明**：本计划是"设计案例内化 + 技能封装"任务，非传统代码工程。
> "测试"的等价物 = 产出物自检；"提交" = 阶段产出归档到 workspace。
> 步骤用 `- [ ]` 跟踪。涉及子代理派发的步骤，prompt 模板已内嵌（自包含）。

**Goal**：把 22 个 Haglöfs 范式品牌案例吃透，封装成可交付技能 `~/.agents/skills/haglofs-paradigm/`

**Architecture**：5 阶段内化法——骨架测绘（主代理串行）→ 规则提取（5 子代理并行）→ 对比校准（主代理串行）→ 资产固化（主代理+1子代理）→ 迁移验证（主代理）

**资产根目录**：`/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/nian-design/references/showcase-archive/`
**产出目录**：`~/.agents/skills/haglofs-paradigm/`
**过程归档**：`workspace/2026-07-02-haglofs-paradigm-skill/`

---

## 文件结构（最终交付）

```
~/.agents/skills/haglofs-paradigm/
├── SKILL.md                        # 入口（阶段4产出）
├── references/
│   ├── rules/
│   │   ├── rules-color.md          # 阶段2-A
│   │   ├── rules-hero.md           # 阶段2-B
│   │   ├── rules-components.md     # 阶段2-C
│   │   ├── rules-typography.md     # 阶段2-D
│   │   └── rules-narrative.md      # 阶段2-E
│   ├── master-templates/
│   │   ├── hero-statement.html     # 阶段4
│   │   ├── hero-split.html         # 阶段4
│   │   └── hero-pulse.html         # 阶段4
│   ├── skeleton-map.md             # 阶段1
│   └── paradigm-boundary.md        # 阶段3
└── checklists/
    └── craft-checklist.md          # 阶段4
```

过程产物（进 git）：
```
workspace/2026-07-02-haglofs-paradigm-skill/
├── spec-design.md                  # 已存在
├── plan.md                         # 本文件
├── stage-outputs/                  # 各阶段产出副本（便于 git 跟踪）
│   ├── 01-skeleton-map.md
│   ├── 02-rules-color.md
│   ├── 02-rules-hero.md
│   ├── 02-rules-components.md
│   ├── 02-rules-typography.md
│   ├── 02-rules-narrative.md
│   ├── 03-paradigm-boundary.md
│   ├── 04-skill-staging.md
│   └── 05-validation-report.md
└── 对话总结-2026-07-02.md
```

---

## 阶段 1｜骨架测绘（主代理串行深读）

### Task 1.1：深读 H061（Haglöfs 早期 · statement Hero · 851 行）

**Files:**
- Read: `.agents/skills/nian-design/references/showcase-archive/H/H061-品牌系统-Haglofs早期-statement.html`
- Create: `workspace/2026-07-02-haglofs-paradigm-skill/stage-outputs/01-skeleton-map.md`（初始化）

- [ ] **Step 1：通读 H061 全文**，识别 4 个维度：
  - HTML 结构树：`<body>` 下顶层 `<section>` / `<header>` / `<footer>` 的语义层级和组织顺序
  - CSS 分层：哪些样式引用 `:root` 变量（`var(--color-*)`）、哪些是组件局部样式、哪些是一次性装饰
  - Hero 变体：属于哪种（statement）、关键决策（标题字号/字体/水印/点阵等装饰元素）
  - Section 组织：信息密度梯度（从 Hero 到 Footer 的密度变化）、留白节奏

- [ ] **Step 2：把剖析写入 `01-skeleton-map.md`**，格式：
  ```markdown
  # 骨架测绘 · Haglöfs 范式核心样本

  ## 样本 1：H061-品牌系统-Haglofs早期-statement（851 行）

  ### HTML 结构树
  [section 层级树，带行号范围]

  ### CSS 分层
  | 层 | 行号范围 | 特征 |
  |---|---|---|
  | :root 引用层 | xxx-xxx | 使用 var(--color-*) 的样式 |
  | 组件局部层 | xxx-xxx | 组件 scoped 样式 |
  | 一次性装饰 | xxx-xxx | 不复用的装饰样式 |

  ### Hero 变体：Statement
  [关键决策清单]

  ### Section 组织
  [密度梯度 + 留白节奏描述]
  ```

### Task 1.2：深读 H062（Haglöfs 早期 v2 · 577 行）

**Files:**
- Read: `.../H/H062-品牌系统-Haglofs早期v2-statement.html`
- Modify: `.../stage-outputs/01-skeleton-map.md`（追加样本 2）

- [ ] **Step 1：通读 H062**，同样 4 维度剖析。重点关注与 H061 的**差异**（v2 改了什么：SCENE-INDEX 提到 v2 用 Sidebar + 100vh Hero + Color Bar + Principles + Type Scale）

- [ ] **Step 2：追加到 `01-skeleton-map.md`**，并加一节「H061 vs H062 对比」

### Task 1.3：深读 R3-数据分析中心（673 行）

**Files:**
- Read: `.../R/R3-品牌数据分析中心.html`
- Modify: `.../stage-outputs/01-skeleton-map.md`（追加样本 3 + 共性提取）

- [ ] **Step 1：通读 R3**，4 维度剖析。这是 Pulse Hero + 数据叙事标杆，重点看组件密度如何不显拥挤

- [ ] **Step 2：追加样本 3 + 提炼「Haglöfs 范式标配结构」**
  - 3 个样本共有的结构元素（所有 Haglöfs 范式页都必须有的）
  - 变化元素（不同场景下调整的）
  - 写入 `01-skeleton-map.md` 的「共性提取」节

- [ ] **Step 3：阶段 1 自检**
  - [ ] 3 个样本是否都有完整 4 维度剖析？
  - [ ] 共性提取是否区分了"标配"和"可变"？
  - [ ] 每个 section 是否标注了行号范围（供阶段 2 子代理快速定位）？

---

## 阶段 2｜规则提取（5 个子代理并行）

**派发原则**：5 个子代理在**同一条消息里**一次性派出（异步并行）。每个子代理只读、产出一张规则卡到 workspace，返回摘要。

### Task 2.0：派发 5 个子代理（同一消息，5 个 Agent tool call）

每个子代理的 prompt 模板见下。**派出后等待全部返回，不轮询**。

#### 子代理 A · 色彩体系

- [ ] **派发子代理 A**，prompt 如下：

```
你是设计系统分析师。任务：从 Haglöfs 品牌案例库提取「色彩使用规则」，产出一张可调用的规则卡。

【只读，不要修改任何文件。】

【输入文件】
1. token 真源：/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/nian-design/references/templates/base/token-root.css（281 行，20 个 --color-* 变量）
2. 配色使用样本（读这些看色彩怎么用）：
   - .../showcase-archive/H/H061-品牌系统-Haglofs早期-statement.html
   - .../showcase-archive/H/H062-品牌系统-Haglofs早期v2-statement.html
   - .../showcase-archive/R/R3-品牌展示.html
   - .../showcase-archive/R/R3-品牌数据分析中心.html
（showcase-archive 根目录：/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/nian-design/references/showcase-archive/）

【要提取的规则】
1. 20 个 --color-* 变量的语义分类（Surface 中性阶梯 / Brand 品牌色 / Signal 信号色）和各自用途
2. 配色决策规则：
   - 页面主底色用什么？什么时候换深色底？
   - 主强调色（forest）用在哪类元素？用多少？（比例感）
   - 辅强调色（moss）用在哪？
   - 深色块面（charcoal/black）的使用时机和面积比例
   - 文字色 vs 背景色的搭配规则（对比度）
3. 禁忌：哪些配色组合不能出现（如：禁止两个品牌色大面积相邻？禁止硬编码色值？）

【产出】
写入：/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-02-haglofs-paradigm-skill/stage-outputs/02-rules-color.md

格式：
# 色彩规则卡
## 1. Token 体系（20 色分类表）
## 2. 配色决策（每条：决策点 → 规则 → 示例出处文件:行号 → 反例/禁忌）
## 3. 红线（不可违反的配色约束）

【返回摘要】文件路径 + 规则条数 + 是否覆盖了 token-root + 4 个样本。
```

#### 子代理 B · Hero 变体

- [ ] **派发子代理 B**，prompt 如下：

```
你是前端架构分析师。任务：提取 Haglöfs 范式的「Hero 变体规则」，产出规则卡。

【只读，不要修改任何文件。】

【背景】Haglöfs 范式有 6 种 Hero 变体（名称来自全景表）：
V1 Reveal / V2 Grille Grid / V3 Split / V4 Statement / V5 Pulse / V6 Slide
这些是页面的第一屏，决定品牌页的第一印象。

【输入文件】
1. 6 种变体的最佳样本：.../showcase-archive/H/H042-品牌传承-volvo-statement.html（316 行，一个文件里展示了多种 Hero 变体）
2. 核心样本：
   - .../H/H061-品牌系统-Haglofs早期-statement.html（Statement Hero）
   - .../H/H062-品牌系统-Haglofs早期v2-statement.html（Statement Hero v2）
   - .../R/R3-品牌展示.html（V6 Split Hero）
   - .../R/R3-品牌数据分析中心.html（Pulse Hero）
3. 补充样本（看 Hero 怎么变化）：
   - .../H/H029-品牌系统-视觉标识-diagonal.html
   - .../H/H044-设计案例-SDL-split.html（Split）
   - .../H/H047-设计案例-Nordic-statement.html（Statement）
（showcase-archive 根目录：/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/nian-design/references/showcase-archive/）

【要提取的规则】
对每种 Hero 变体（6 种），提取：
1. 视觉特征：标题字号/字体、装饰元素（斜切块/点阵/水印/脉动线/年份）、背景处理
2. 适用场景：什么品牌调性、什么内容类型适合用这种 Hero
3. 代码骨架：HTML 结构 + 关键 CSS（精简到可复制的骨架，不要整个文件）
4. 禁忌：这种 Hero 不能怎么用

【产出】
写入：/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-02-haglofs-paradigm-skill/stage-outputs/02-rules-hero.md

格式：
# Hero 变体规则卡
## V1 Reveal Hero（特征 / 场景 / 骨架 / 禁忌）
## V2 Grille Grid Hero
## V3 Split Hero
## V4 Statement Hero
## V5 Pulse Hero
## V6 Slide Hero
## 选型决策树（什么场景选哪种 Hero）

【返回摘要】文件路径 + 6 种变体是否全覆盖 + 每种是否有代码骨架。
```

#### 子代理 C · 组件库 API

- [ ] **派发子代理 C**，prompt 如下：

```
你是组件库分析师。任务：提取 Haglöfs 范式核心组件的「使用 API 和禁忌」，产出规则卡。

【只读，不要修改任何文件。】

【输入文件】
1. 全组件展示样本：.../showcase-archive/R/R3-品牌展示.html（887 行，展示 Tension Grid/List/Prose/Table/Callout/Checklist 等全部组件）
2. 组件库总览：.../showcase-archive/H/H031-品牌系统-组件库-diagonal.html（1196 行，最全组件库）
3. 数据组件样本：.../showcase-archive/R/R3-品牌数据分析中心.html（数据类组件实战）
4. 补充：.../showcase-archive/H/H063-品牌系统-分析模板-statement.html（Card/Callout/Toggle/Accordion/Pipeline）
（showcase-archive 根目录：/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/nian-design/references/showcase-archive/）

【要提取的组件】（至少覆盖这 10 个）
Tension Grid / Tension List / Tension Prose / Data Table / Callout / Checklist / Ring（环形指标）/ Pipeline（流程）/ Layer（分层）/ Swatch（色板卡）

对每个组件提取：
1. 用途：解决什么信息呈现问题
2. 使用场景：什么内容适合用、什么不适合
3. 关键代码模式：HTML 结构骨架 + 必须的 CSS class/var()
4. 禁忌：不能怎么用（如：Tension Grid 不能超过几列？Callout 不能用在什么位置？）

【产出】
写入：/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-02-haglofs-paradigm-skill/stage-outputs/02-rules-components.md

格式：
# 组件库规则卡
## [组件名]
- 用途：
- 场景：
- 骨架：[HTML + 关键 CSS]
- 禁忌：
（每个组件一节）

【返回摘要】文件路径 + 覆盖的组件数（目标≥10）+ 每个是否有骨架和禁忌。
```

#### 子代理 D · 排版与字体

- [ ] **派发子代理 D**，prompt 如下：

```
你是排版分析师。任务：提取 Haglöfs 范式的「字体配方和排版规则」，产出规则卡。

【只读，不要修改任何文件。】

【背景】H061/H062 使用 4 字体配方：Playfair（衬线大标题）/ Inter（无衬线正文）/ JetBrains Mono（等宽数据）/ Doto（等宽装饰）

【输入文件】
1. 4 字体配方源头：.../showcase-archive/H/H061-品牌系统-Haglofs早期-statement.html
2. v2 版排版：.../showcase-archive/H/H062-品牌系统-Haglofs早期v2-statement.html（注意 Type Scale 节）
3. token-root.css 的字体/排版变量：.../templates/base/token-root.css（找 --font-* / --type-* / line-height 相关）
4. 排版变化样本：
   - .../showcase-archive/R/R3-品牌展示.html
   - .../showcase-archive/H/H042-品牌传承-volvo-statement.html
（showcase-archive 根目录：/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/nian-design/references/showcase-archive/）

【要提取的规则】
1. 4 字体各自的用途和字号范围
2. 字号阶梯（Type Scale）：从 Hero 标题到正文的完整阶梯（px 值 + 用途）
3. 行高和字距规则：标题 vs 正文 vs 数据的不同处理
4. 混搭规则：什么时候用 Playfair、什么时候全 Inter、数据页怎么混 Mono
5. 禁忌：不能怎么用（如：正文不能用 Playfair？标题不能小于多少？）

【产出】
写入：/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-02-haglofs-paradigm-skill/stage-outputs/02-rules-typography.md

格式：
# 排版规则卡
## 1. 字体配方（4 字体用途表）
## 2. 字号阶梯（Type Scale 表）
## 3. 行高/字距规则
## 4. 混搭决策（每条：场景 → 配方 → 示例出处）
## 5. 禁忌

【返回摘要】文件路径 + 规则条数 + 是否覆盖 4 字体 + 是否有完整 Type Scale。
```

#### 子代理 E · 叙事节奏

- [ ] **派发子代理 E**，prompt 如下：

```
你是信息架构分析师。任务：提取 Haglöfs 范式的「叙事节奏和 Section 组织规则」，产出规则卡。

【只读，不要修改任何文件。】

【输入文件】
1. 多段叙事标杆：.../showcase-archive/H/H042-品牌传承-volvo-statement.html（品牌传承 6 段叙事）
2. 数据叙事标杆：.../showcase-archive/R/R3-品牌数据分析中心.html（数据中心的滚动叙事）
3. 品牌展示叙事：.../showcase-archive/R/R3-品牌展示.html
4. 品牌声明叙事：.../showcase-archive/R/R3-品牌声明.html
5. 案例研究叙事：.../showcase-archive/H/H065-品牌系统-案例研究-statement.html
6. 传承展馆叙事：.../showcase-archive/H/H066-品牌系统-传承展馆-entrance.html
（showcase-archive 根目录：/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/nian-design/references/showcase-archive/）

【要提取的规则】
1. Section 组织模式：典型品牌页的 Section 顺序（如：Hero → 背景 → 数据 → 案例 → CTA → Footer）
2. 信息密度梯度：一个页面里密度的起伏曲线（哪里疏、哪里密、为什么）
3. 留白节奏：section 间距、内边距的规律（用 var(--space-*) 还是硬编码？比例感）
4. 滚动叙事手法：如何用滚动制造层次（sticky / 视差 / 渐显）
5. 品牌叙事 vs 数据叙事的节奏差异（品牌页节奏和数据分析页节奏有什么不同）
6. 禁忌：不能怎么组织（如：不能连续 3 个高密度 section？Hero 后不能直接放表格？）

【产出】
写入：/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/2026-07-02-haglofs-paradigm-skill/stage-outputs/02-rules-narrative.md

格式：
# 叙事节奏规则卡
## 1. Section 组织模式（典型顺序图）
## 2. 信息密度梯度
## 3. 留白节奏（量化规则）
## 4. 滚动叙事手法
## 5. 品牌叙事 vs 数据叙事对比表
## 6. 禁忌

【返回摘要】文件路径 + 规则条数 + 是否覆盖品牌+数据两类叙事。
```

### Task 2.1：收合并整合

- [ ] **Step 1：等待 5 个子代理全部返回**（不轮询）

- [ ] **Step 2：检查 5 张规则卡是否齐全**
  - `stage-outputs/02-rules-color.md`
  - `stage-outputs/02-rules-hero.md`
  - `stage-outputs/02-rules-components.md`
  - `stage-outputs/02-rules-typography.md`
  - `stage-outputs/02-rules-narrative.md`

- [ ] **Step 3：阶段 2 自检**
  - [ ] 每张卡是否有「禁忌/红线」节？（这是技能可用性的关键）
  - [ ] 规则是否都标注了示例出处（文件:行号）？
  - [ ] 有没有 5 张卡之间相互矛盾的规则？（如色彩说"深色块占 30%"，叙事说"避免大深色块"——需调和）

---

## 阶段 3｜对比与校准（主代理串行）

### Task 3.1：横向对比 H 系列案例

**Files:**
- Read（抽样对比，不需全读）:
  - `.../H/H042-品牌传承-volvo-statement.html`（品牌传承）
  - `.../H/H044-设计案例-SDL-split.html` 到 `.../H/H051-设计案例-Economist红条-split.html`（设计案例，抽 3-4 个）
  - `.../H/H029-品牌系统-视觉标识-diagonal.html` 到 `.../H/H037`（品牌系统，抽 2-3 个）

- [ ] **Step 1：抽样读取对比文件**，重点看它们与核心样本（H061/H062/R3）的差异点——
  - 哪些结构/配色/排版决策是**所有案例共有的**（= 范式红线）
  - 哪些是**个别案例特有的**（= 弹性区，可调）

- [ ] **Step 2：产出 `03-paradigm-boundary.md`**
  ```markdown
  # Haglöfs 范式边界

  ## 红线（不可动 — 所有案例共有，动了就不是这个范式）
  | # | 红线 | 依据（哪些案例都有） | 违反后果 |
  |---|---|---|---|

  ## 弹性区（可调 — 不同案例有不同处理的）
  | # | 维度 | 范围 | 判断依据 |
  |---|---|---|---|

  ## 判断流程（拿到一个新品牌，怎么决定哪些调哪些不调）
  ```

- [ ] **Step 3：阶段 3 自检**
  - [ ] 红线是否有依据（至少 3 个案例印证）？
  - [ ] 弹性区是否给了判断依据（不是"看感觉"）？
  - [ ] 判断流程是否可操作？

---

## 阶段 4｜资产固化（主代理 + 1 子代理整理）

### Task 4.1：创建技能目录结构

- [ ] **Step 1：创建目录**
  ```bash
  mkdir -p ~/.agents/skills/haglofs-paradigm/{references/{rules,master-templates},checklists}
  ```

### Task 4.2：复制规则卡和阶段产出

- [ ] **Step 1：把阶段 1-3 产出复制到技能目录**
  - `stage-outputs/01-skeleton-map.md` → `~/.agents/skills/haglofs-paradigm/references/skeleton-map.md`
  - `stage-outputs/02-rules-*.md`（5 张）→ `~/.agents/skills/haglofs-paradigm/references/rules/`
  - `stage-outputs/03-paradigm-boundary.md` → `~/.agents/skills/haglofs-paradigm/references/paradigm-boundary.md`

### Task 4.3：提炼 3 个 Hero 母版（主代理）

**Files:**
- Create: `~/.agents/skills/haglofs-paradigm/references/master-templates/hero-statement.html`
- Create: `~/.agents/skills/haglofs-paradigm/references/master-templates/hero-split.html`
- Create: `~/.agents/skills/haglofs-paradigm/references/master-templates/hero-pulse.html`

- [ ] **Step 1：从核心样本提炼 3 个母版**——
  从 H061（statement）、R3-品牌展示（split）、R3-数据分析中心（pulse）中，提取 Hero 区域的 HTML+CSS，**泛化成可复用模板**：
  - 保留结构骨架和 Haglöfs 范式决策（var(--color-*) 引用、字体配方、装饰元素）
  - 把品牌专属内容替换成占位符（`{{BRAND_NAME}}`、`{{HEADLINE}}`、`{{YEAR}}`）
  - 每个母版顶部注释：适用场景 + 来源样本

### Task 4.4：写 craft-checklist（施工检查清单）

**Files:**
- Create: `~/.agents/skills/haglofs-paradigm/checklists/craft-checklist.md`

- [ ] **Step 1：从 5 张规则卡 + paradigm-boundary 提炼 yes/no 检查项**（目标 20-30 条），分类：
  ```markdown
  # 施工检查清单
  ## 色彩（5-6 条）
  - [ ] 所有色值都通过 var(--color-*) 引用，无硬编码？
  - [ ] 页面主底色是 offwhite（或深色页用 charcoal）？
  - [ ] ...
  ## 排版（4-5 条）
  ## Hero（3-4 条）
  ## 组件（4-5 条）
  ## 叙事节奏（3-4 条）
  ## 红线（paradigm-boundary 的红线逐条转成检查项）
  ```

### Task 4.5：写 SKILL.md（技能入口）

**Files:**
- Create: `~/.agents/skills/haglofs-paradigm/SKILL.md`

- [ ] **Step 1：写 SKILL.md**，参考 nian-brand 的结构风格，内容：
  ```markdown
  ---
  name: haglofs-paradigm
  description: [触发场景描述]
  ---
  # Haglöfs 范式品牌页施工

  ## 3 秒判断
  [什么时候用这个技能 vs nian-brand vs nian-design]

  ## 我做什么
  把品牌内容组装成 H061 同级质感的完整品牌页。以 Haglöfs 体系为唯一范式。

  ## 工作流
  1. 选 Hero（查 rules-hero.md 的选型决策树）
  2. 取品牌 DNA（从 nian-brand 的决策卡输入）
  3. 叙事施工（用 master-templates + rules-components 组装）
  4. 红线自检（跑 checklists/craft-checklist.md）
  5. 输出

  ## 何时不用我
  - 纯数据看板 → nian-design
  - 品牌文案/调性决策 → nian-brand
  - 非 Haglöfs 质感的设计 → 不适用

  ## 产出文件索引
  [列出 references/ 和 checklists/ 的文件和用途]
  ```

### Task 4.6：阶段 4 自检

- [ ] **Step 1：验证技能目录完整性**
  ```bash
  find ~/.agents/skills/haglofs-paradigm -type f | sort
  ```
  预期：SKILL.md + 5 规则卡 + 3 母版 + skeleton-map + paradigm-boundary + craft-checklist = 12 个文件

- [ ] **Step 2：内容自检**
  - [ ] SKILL.md 的 3 秒判断是否清晰区分了 nian-brand/nian-design？
  - [ ] 工作流是否可操作（每步指向具体文件）？
  - [ ] craft-checklist 是否覆盖了 5 个功能层 + 红线？
  - [ ] 母版是否真的可复用（占位符清楚、无品牌专属硬编码）？

---

## 阶段 5｜迁移验证（主代理）

### Task 5.1：选验证品牌

- [ ] **Step 1：选定一个非 Haglöfs 的真实品牌**做验证。候选：Patagonia（户外同赛道，调性近）/ Arc'teryx（户外高端）/ 北面（户外大众）。选一个有明确品牌调性、内容素材可公开获取的。

### Task 5.2：跑完整工作流

**Files:**
- Create: `workspace/2026-07-02-haglofs-paradigm-skill/validation-page.html`
- Create: `workspace/2026-07-02-haglofs-paradigm-skill/stage-outputs/05-validation-report.md`

- [ ] **Step 1：走 SKILL.md 工作流**，用选定品牌产出一个完整品牌页
  - 严格按工作流 5 步执行，记录每步的卡壳点

- [ ] **Step 2：跑 craft-checklist 自检**验证页，记录通过/未通过项

- [ ] **Step 3：对照 H061 水准主观评估**，记录质感差距

- [ ] **Step 4：写 `05-validation-report.md`**
  ```markdown
  # 迁移验证报告
  ## 验证品牌：[品牌名]
  ## 工作流执行记录（每步卡壳点）
  ## craft-checklist 结果（通过 X/Y 条，未通过项）
  ## 质感评估（vs H061，差距在哪）
  ## v1.1 迭代清单（规则缺失 / 母版缺陷 / 检查清单漏洞）
  ```

### Task 5.3：收尾

- [ ] **Step 1：根据验证报告修补技能**（如果有规则缺失，补到对应规则卡；母版缺陷，修母版）

- [ ] **Step 2：写对话摘要**到 `workspace/2026-07-02-haglofs-paradigm-skill/对话总结-2026-07-02.md`

- [ ] **Step 3：git 提交 workspace 产物**（注意：技能本体在 ~/.agents 不进 git，但 workspace 过程产物进 git）
  ```bash
  git add workspace/2026-07-02-haglofs-paradigm-skill/
  git commit -m "feat: haglofs-paradigm 技能内化全过程产物"
  ```

---

## Self-Review

**1. Spec coverage:**
- 阶段1（骨架测绘）→ Task 1.1-1.3 ✓
- 阶段2（5 子代理规则提取）→ Task 2.0-2.1 ✓
- 阶段3（对比校准）→ Task 3.1 ✓
- 阶段4（资产固化）→ Task 4.1-4.6 ✓
- 阶段5（迁移验证）→ Task 5.1-5.3 ✓
- 技能定位/边界 → SKILL.md 3秒判断 ✓
- YAGNI（不重新扫描220归档、不另建配色体系）→ 计划未包含这些 ✓

**2. Placeholder scan:**
- 子代理 prompt 全部自包含，含确切文件路径 ✓
- 产出格式都有模板 ✓
- 无 "TBD/TODO/稍后补充" ✓
- 阶段5验证品牌"待选定"——这是有意推迟到执行时的决策（候选已列出），非占位符 ✓

**3. Type consistency:**
- 文件路径全程一致（showcase-archive 根目录缩写 `.../` 在子代理 prompt 里有完整展开说明）✓
- 产出文件名前后一致（02-rules-color.md 等）✓
- 技能目录结构（阶段4 Task 4.1 创建 vs 文件结构表）一致 ✓
