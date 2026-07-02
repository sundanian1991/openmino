# 色彩规则卡

> **品牌**：Haglöfs（北欧户外·哑光大地色）
> **真源**：`token-root.css`（色值 + 语义注释，权威）
> **样本**：H061 / H062 / R3-品牌展示 / R3-品牌数据分析中心（4 份 .html，观测用法）
> **用途**：作为可调用规则，约束新产出的 Haglöfs 风格页面的配色决策。
> **覆盖**：token-root 全部 20 处 `--color-*` 声明（15 亮色 + 5 深色覆写）✅ ｜ 4/4 样本 ✅

---

## 1. Token 体系（20 色分类表）

### 1.1 亮色真源 · 15 色（`token-root.css :root`，行 18–38）

| # | 变量名 | 色值 | 类别 | 用途（语义） |
|---|--------|------|------|--------------|
| 1 | `--color-white` | `#FFFFFF` | Surface | 卡片底 / 浮起的面 · 最高频承载面 |
| 2 | `--color-offwhite` | `#F5F3EF` | Surface | ★ 页面主底色 · 温润米白（非冷白，有人味） |
| 3 | `--color-cream` | `#E8E4DD` | Surface | 次级面 · 分隔区块底 / hover 目标 |
| 4 | `--color-sand` | `#C4B8A8` | Surface | 边框 / 深 hover 目标 / 装饰点阵 |
| 5 | `--color-stone` | `#8A7D6E` | Surface | 次要文字 / disabled / 分隔线 |
| 6 | `--color-charcoal` | `#2D2A26` | Surface | ★ 正文 / icon / 日常深色块（泥土感暖灰） |
| 7 | `--color-black` | `#1A1816` | Surface | ★ 终极深色块 / Hero 深底 / 收束页（footer） |
| 8 | `--color-forest` | `#4A6741` | Brand | ★ 主强调色 · 森林绿（替代旧 olive） |
| 9 | `--color-moss` | `#7A9B6D` | Brand | ★ 辅强调 / 成功态 · 苔藓绿 |
| 10 | `--color-slate` | `#5B6B7A` | Brand | 冷调辅色 · 石板蓝（数据/信息） |
| 11 | `--color-steel` | `#7A8B9B` | Brand | 更浅冷辅 · 钢灰蓝（深底次要文字） |
| 12 | `--color-signal-red` | `#E8453C` | Signal | 错误 / 断崖 / 负值（跌） |
| 13 | `--color-signal-orange` | `#E87A3C` | Signal | 警告 / component-id / 一处打破 |
| 14 | `--color-signal-yellow` | `#E8B83C` | Signal | 金句高亮 / 极少用 |
| 15 | `--color-signal-blue` | `#3C7AE8` | Signal | 仅链接 |

**面积配额（来自 token-root:7–9 的注释定调）**：Surface 7 色 = 80% 画面骨架 ｜ Brand 4 色 = 克制使用的气质担当 ｜ Signal 4 色 = 稀缺资源，**页面 ≤ 2 处**。

### 1.2 深色模式覆写 · 5 色（`token-root.css .dark`，行 224–228）

> 同名变量在 `.dark` / `[data-mode="dark"]` 作用域内重新赋值，不新增色，只为深底提亮保对比度。

| # | 变量名 | 亮色值 → 深色值 | 覆写理由 |
|---|--------|----------------|----------|
| 16 | `--color-forest` | `#4A6741` → `#6B8B5E` | 深底提亮，保 ≥4.5:1 |
| 17 | `--color-moss` | `#7A9B6D` → `#8FAB7F` | 更亮，做深底成功态 |
| 18 | `--color-slate` | `#5B6B7A` → `#7A8B9B` | 深底冷辅提亮 |
| 19 | `--color-sand` | `#C4B8A8` → `#4D4640` | 反相：浅色边框→深色边框 |
| 20 | `--color-stone` | `#8A7D6E` → `#6B635A` | 反相：次要文字降明度 |

---

## 2. 配色决策

> 格式：**决策点** → 规则 → 示例出处（文件:行号）→ 反例/禁忌

### D1 · 页面主底色用什么？
- **规则**：亮色页一律用 `--color-offwhite #F5F3EF`（温润米白，**禁止冷白 #FFF 做页面底**）。`#FFF` 只做"浮起的卡片面"。
- **出处**：`token-root.css:21,78`（`--bg-page = offwhite`）；`R3-品牌展示.html:37`（`body{background:var(--color-offwhite)}`）；`H061:12,50`（`--bg:#F5F3EF`）。
- **反例/禁忌**：不要用纯白/冷灰做整页底——会失去"人味/哑光感"。`white` 仅用于卡片 (`--bg-card`)。

### D2 · 什么时候换深色底？
- **规则**：三类场景切换深色底，用作**节奏断点**而非默认：
  1. **Hero 可以是深底**（数据/仪表盘类页面尤其适用）—— `R3-品牌数据分析中心.html:43`（`.hero{background:var(--pk)}`，深 Hero）。
  2. **概念/张力/数据密集区段**用深底制造戏剧感—— `R3-品牌展示.html:221`（`.tension-bg{background:var(--color-charcoal)}`）；`R3-品牌数据分析中心.html:119,235`（`.elevation`/`.matrix` 深底）。
  3. **收束页 / footer 永远深底**—— `R3-品牌展示.html:556`（`.footer{background:var(--color-black)}`）；`H061:482`。
- **节奏**：亮段与深段**交替**形成呼吸；不可整页连续深。
- **反例**：不要把"普通内容段"无理由刷成深底——深底是稀缺的强调手段。

### D3 · 深色底用 charcoal 还是 black？
- **规则**：**charcoal 是"工作中的深色"，black 是"终局/最沉的深色"**，按角色选用，不可互换：
  - **charcoal `#2D2A26`** → 页内深色内容区段（张力网格、代码块、数据剖面）、侧栏。出处：`R3-品牌展示.html:221,386`；`H062.html:32`（sidebar）。
  - **black `#1A1816`** → 终极收束元素（footer、Hero 深面板）。出处：`R3-品牌展示.html:556`（footer=black）；`H061:135,310,482`（hero-right/symbol/footer=black）。
  - 数据页的 `--pk:#2C2C2C`（`R3-品牌数据分析中心.html:15`）是 charcoal 的等价代用（同一泥土暖灰区间）。
- **反例**：不要用 black 做常规内容段底（过沉、缺暖意）；不要用 charcoal 做 footer（收束力不足）。

### D4 · 主强调色 forest `#4A6741` 用在哪？面积多少？
- **规则**：forest 是**克制使用的主强调色**，单页总面积 **≤ ~15%**，落在"小面积高识别"元素上：
  - **装饰线 / 分割短线**（`H061:513` section-divider 40×1px；`H061:100` hero-tag 前置线）。
  - **eyebrow / 编号小标签**（`H061:439` principle-num；`H061:89` hero-tag 文字）。
  - **品牌符号 / wordmark**（`H061:463` wordmark-symbol）。
  - **Do 列强调边框/标记**（`H062:113,116`）。
  - **Hero 几何块**（可大，但须是斜切/部分块，不是满铺平涂）—— `R3-品牌展示.html:105-114`（clip-path 40% 斜切块）。
  - **数据正向语义**（涨、达成、callout 左条、hover tint）—— `R3-品牌数据分析中心.html:96,258,244`。
- **满铺整段做底**：仅早期/heritage 场景允许**至多 1 段**（`H061:162` tension-section 全段 forest 底）。成熟规则下应避免，改用斜切块或 accent。
- **反例/禁忌**：禁止 forest 满铺 2 段以上；禁止 forest 同时做底又做前景文字（自对比）；禁止把 forest 当"中性色"大面积铺。

### D5 · 辅强调色 moss `#7A9B6D` 用在哪？
- **规则**：moss 是 forest 的**从属/提亮伴随色**，面积比 forest 更小，用于：
  - **forest 深底上的次要文字 / 分隔线 / 箭头**（`H061:163,180,198` tension 区段）。
  - **成功态 / 正向标记圆点**（`H062:125` do 列圆点；`token-root:61` `--success=moss`）。
- **反例**：moss 不可单独作为主强调出现；不可与 forest 大面积平铺相邻（会糊成一片绿）。

### D6 · 深色块面（charcoal/black）的使用时机与面积
- **规则**：深色块 = 节奏断点，面积视页面类型而定：
  - **亮色品牌页**（H061 / R3-品牌展示）：深块 ≈ **20–30%**（1–2 个内容段 + footer + 可能的 hero 深面板）。
  - **数据/仪表盘页**（R3-数据分析中心）：深块可达 **~50%**（hero + elevation + matrix + footer 连续深，是数据叙事的合法语汇）。
- **出处**：见 D2、D3 引用。
- **反例**：亮色页里深块超过 ~35% 即破坏"温润米白"主调；数据页里深块之间必须夹亮段（compass/seam/swatch/insight 为亮），不可全黑到底。

### D7 · 文字色 vs 背景色搭配规则
- **规则**：严格按底色反相取文字色，**对比度门槛 primary ≥4.5:1、secondary ≥3:1（≥14px）**（`token-root:74`）：
  - **亮底**（offwhite/cream/white）→ 标题用 `--color-black`（`--text-display`），正文/icon 用 `--color-charcoal`（`--text-primary`，AA 12.88:1），次要文字用 `--color-stone`（`--text-secondary`）。出处：`token-root:49,50,96`；`R3-品牌展示.html:38`（body 文字=charcoal）。
  - **深底**（charcoal/black/forest）→ 主文字用 `--color-offwhite`（`--text-inverse`），次要文字用 `rgba(255,255,255,.5)`（`--text-inverse-2`），装饰用 `.3`。出处：`token-root:100-102`；`H061:169`（offwhite 文字 on forest）；`R3-品牌展示.html:222`（offwhite on charcoal）。
  - **forest 底特例**：主文字 offwhite，次要文字/线用 moss。出处：`H061:163,169,180`。
- **反例/禁忌**：禁止 charcoal 文字落在 charcoal/black 底；禁止 stone 文字做正文（仅 meta/caption，且 ≥14px）；深底次要文字禁止低于 50% 白透明度承载真实信息（用 `.3` 仅限纯装饰）。

### D8 · 中性阶梯（cream / sand / stone）的层次用法
- **规则**：中性阶梯是**层次工具**，按"离主底 offwhite 的距离"逐级下沉，角色固定不混用：
  - **cream `#E8E4DD`（-1 级·次级面）** → 分隔区块底 / hover 目标 / 内联代码底 / checklist 底。出处：`H061:211,380,455`（color/numerals/wordmark 三段用 cream 交替节奏）；`R3-品牌展示.html:379,497`（code/checklist）。语义别名 `--bg-subtle` / `--bg-hover`（`token-root:80,81`）。
  - **sand `#C4B8A8`（-2 级·线）** → 默认边框 / 装饰点阵 / 步骤大数字（纯装饰）。出处：`R3-品牌展示.html:176`（dot-pattern）、`:537`（step-num 装饰）；`H061:16`（border）。语义别名 `--border-rest`（`token-root:86`）。
  - **stone `#8A7D6E`（-3 级·弱文字）** → 次要文字 / disabled / 分隔线 / 中性 badge。出处：`H061:19`（text-secondary）；`R3-品牌展示.html:326`（badge--pdf）。语义别名 `--text-secondary` / `--border-hover`（`token-root:87,97`）。
- **阶梯顺序（明→暗）**：`white → offwhite → cream → sand → stone → charcoal → black`，**只走相邻级**做状态过渡（如 hover 边框 sand→stone，`token-root:87`）。
- **反例/禁忌**：禁止 sand 做大面积底色（它太重，只做线/点）；禁止 stone 做正文（对比度仅 Large 级）；禁止跳级过渡（offwhite 直接跳 stone）。

---

## 3. 红线（不可违反的配色约束）

1. **禁止硬编码色值**：除 `:root` / `.dark` 声明外，业务样式必须走语义别名（`--bg-*`/`--text-*`/`--border-*`/`--primary`），不得出现裸 `#hex`。`token-root:176` 明确"禁止硬编码 box-shadow"；别名体系（`token-root:66-107`）即此规则的执行出口。
   - *样本中的违规（早期遗产，勿复制）*：`R3-品牌展示.html:112`（`#2D4229`）、`:477-485`（`#FDF2F2`/`#991B1B`/`#F0FDF4`/`#166534`）；`R3-品牌数据分析中心.html:15`（裸 `#2C2C2C` 等）。

2. **Signal 色页面 ≤ 2 处，且各守语义**：`signal-red`=错误/负值，`signal-orange`=警告/component-id，`signal-yellow`=金句（极少），`signal-blue`=**仅链接**。不得把 Signal 色当装饰或品牌强调（`token-root:9,34-38`）。`signal-blue` 禁止用于非链接元素。

3. **forest 不可做主导底色**：单页 forest 满铺/大平涂 ≤ 1 段，且优先用斜切块（clip-path）替代。forest 是"克制使用的气质担当"（`token-root:8`），不是中性铺底色。大面积 forest 会压垮米白主调并丧失哑光克制感。

4. **禁止两个品牌色大面积相邻平铺**：forest 与 moss 不得作为相邻的大色块并置（会糊成单一绿、丢失层次）。moss 只能作为 forest 底上的**小面积**次要文字/线/点，或独立做成功态标记（`H062:125`）。

5. **禁止渐变 / 装饰阴影 / 模糊做视觉主体**：哑光克制语境下，层次靠"色调 + 边框"（`--bg-subtle`/`--border-rest`），shadow 仅做真正浮起（`token-root:170-176`）。`H062.html:548` 守则 Don't 列明确"渐变·阴影·模糊效果"。
   - *样本中的违规（早期遗产）*：`R3-品牌展示.html:112`（hero 渐变）。

6. **对比度门槛不可破**：正文/标题/数据 ≥ 4.5:1（AA）；meta/caption/secondary ≥ 3:1 且 ≥14px（AA Large）。深底须用 dark 覆写的提亮色值（`token-root:211,224-228`），不得直接把亮色 forest 贴到 black 底上（对比不足）。

7. **文字色与背景色不可同源落底**：禁止 charcoal 字落 charcoal/black 底；禁止 offwhite 字落 cream/sand 底。深底一律走 `--text-inverse*` 三档，亮底走 `--text-primary/secondary/display`（`token-root:96-102`）。

8. **中性阶梯过渡只走相邻级**：状态变化（rest→hover→active）只许相邻一级（如 border `sand→stone`，bg `white/cream→cream→sand`）。禁止跨级跳变，以免破坏"哑光微妙层次"（`token-root:81-87`）。

---

*生成于 2026-07-02 · 阶段 2 · 色彩规则提取 · 源文件只读未改*
