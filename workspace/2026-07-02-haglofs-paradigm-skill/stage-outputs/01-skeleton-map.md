# 骨架测绘 · Haglöfs 范式核心样本

> 本文档对 3 个 Haglöfs 品牌范式核心样本进行精确到行号的骨架测绘，供后续阶段构建可复用技能时快速定位。
>
> - **H061** — Statement Hero · 4 字体配方（Playfair / Inter / JetBrains Mono / Doto）· 851 行
> - **H062** — v2 Statement Hero · Sidebar + 100vh Hero + Color Bar · 577 行
> - **R3** — Pulse Hero · 深色底 + 数据叙事 · 673 行

---

## 样本1：H061（4 维度剖析）

### 维度1 — HTML 结构树

`<body>`（L542）下顶层结构为 **9 个 `<section>` + 1 个 `<footer>`**，均为同级平铺，无嵌套语义容器。每个 section 内部统一使用 `.container`（L57）做宽度约束。

| 顺序 | 元素 | class | 行号范围 | 语义角色 |
|------|------|-------|----------|----------|
| 1 | `<section>` | `.hero-split` | L545–562 | Statement Hero（左文右暗色块） |
| 2 | `<section>` | `.section .tension-section` | L565–597 | 核心张力对（绿色底） |
| 3 | `<section>` | `.section .color-section` | L600–673 | 色彩系统（3 组色卡） |
| 4 | `<section>` | `.section .typo-section` | L676–701 | 字体配方 |
| 5 | `<section>` | `.section .symbol-section` | L704–737 | Symbol 演化（Before→After） |
| 6 | `<section>` | `.section .numerals-section` | L740–787 | 品牌数字（8 格网格） |
| 7 | `<section>` | `.section .principles-section` | L790–822 | 设计原则（5 卡片） |
| 8 | `<section>` | `.section .wordmark-section` | L825–840 | Wordmark 锁定组合 |
| 9 | `<footer>` | `.footer-section` | L843–848 | 页脚 |

**结构特征**：纯线性叙事，无 `<header>`/`<nav>`/`<aside>`/`<main>` 包裹。Hero 是唯一不带 `.section` 类的 section（用 `.hero-split` 独立控制），其余 7 个 content section 共享 `.section`（L56，padding=var(--space-4xl) × container-padding）。每个 section 内部结构高度统一：`.container > [.section-label] + [h2/intro] + [.section-divider] + [grid]`。

**section 嵌套关系**：无嵌套——全部 `<section>` 均为 `<body>` 直接子元素。唯一内部嵌套是 `.container > .section-label + .tension-intro + .section-divider + .tension-grid > .tension-item`（3 层）。

---

### 维度2 — CSS 分层

CSS 全部内联在 `<style>`（L9–540），无外部样式表。

| 层 | 行号范围 | 特征 |
|------|----------|------|
| **Reset + :root 变量定义层** | L10–48 | `:root{}` 定义全部 17 个 color tokens + 4 个 font-family + 9 个 space scale + 4 个 radius + 2 个 container。**变量被全局大量引用**。 |
| **:root 变量引用层 — base** | L49–66 | `body`（L50–52 引用 --bg/--text-primary/--font-body）、`.section`（L56 引用 --space-4xl/--container-padding）、`.container`（L57 引用 --container-max）、`.section-label`（L58–66 引用 --font-data/--text-secondary/--space-lg） |
| **:root 变量引用层 — HERO** | L67–160 | `.hero-split`(L74)`.hero-left`(L80)`.hero-tag`(L84–93)`.hero-title`(L103–109)`.hero-desc`(L113–119)`.hero-ghost`(L121–133)`.hero-right`(L134–160)——几乎每行都引用 var(--*) |
| **:root 变量引用层 — TENSION** | L161–209 | `.tension-section`(L162)`.tension-intro`(L164–173)`.tension-item`(L179–208)——引用 brand-primary/brand-secondary/brand-quaternary |
| **:root 变量引用层 — COLOR** | L210–264 | `.color-section`(L211)`.swatch-*`(L220–264) |
| **:root 变量引用层 — TYPO** | L265–307 | `.typo-section`(L266)`.typo-*`(L267–307) |
| **:root 变量引用层 — SYMBOL** | L308–378 | `.symbol-section`(L309–314)`.symbol-*`(L316–378) |
| **:root 变量引用层 — NUMERALS** | L379–414 | `.numerals-section`(L380)`.numeral-*`(L381–414) |
| **:root 变量引用层 — PRINCIPLES** | L415–454 | `.principles-section`(L416)`.principle-*`(L417–454) |
| **:root 变量引用层 — WORDMARK** | L455–480 | `.wordmark-section`(L455)`.wordmark-*`(L456–480) |
| **组件局部样式层 — FOOTER** | L481–508 | `.footer-section`(L482–487)`.footer-content`(L488–493)`.footer-brand`(L494–500)`.footer-credit`(L501–508)——scoped 到 footer |
| **一次性装饰样式** | L509–516 | `.section-divider`（40px 短线，全站复用但本体是纯装饰） |
| **RESPONSIVE** | L517–539 | 两个断点 @media：1119px（L518）/767px（L530） |

**关键发现**：H061 的 CSS 高度 token 化——**几乎找不到硬编码颜色值**（除 swatch 展示用的内联 `style="background:#xxx"` 在 HTML 层 L609–668），所有结构色/文字色/间距均走 `var(--*)`。变量引用密度极高，`:root` 定义（L11–48）→ 各 section 引用形成清晰的「设计令牌 → 组件」单层映射。

---

### 维度3 — Hero 变体识别（Statement Hero）

**变体类型**：Statement Hero — 左右分栏（`.hero-split` grid 1.5fr/1fr，L69–70）

| 决策项 | 值 | 行号 |
|--------|-----|------|
| 标题字体 | `var(--font-display)` = Playfair Display | L103 |
| 标题字号 | `clamp(64px, 8.6vw, 120px)` | L104 |
| 标题字重 | 400（light regular），`<strong>` 用 600（L111） | L105/L111 |
| 标题 line-height | 1.0 | L106 |
| 标题字间距 | -.025em | L108 |
| 背景处理 | 左栏 var(--bg)（L74），右栏 var(--text-primary) 深色块（L135） | L74/L135 |
| **装饰元素①：年份水印** | `.hero-ghost` "1914" — absolute 定位在左栏右下角，clamp(80px,12vw,200px) Playfair 300，opacity 0.15 | L121–133（CSS）/ L551（HTML） |
| **装饰元素②：深色块巨字水印** | `.hero-right .ghost-text` "1914" — absolute 居中，clamp(120px,18vw,320px) Playfair 700，opacity 0.08 | L142–152（CSS）/ L554（HTML） |
| **装饰元素③：十字准星 symbol** | 80×80 SVG，圆+十字线+中心实心点，stroke-width 1.5，color var(--bg) opacity 0.6 | L153–160（CSS）/ L555–560（HTML） |
| **装饰元素④：hero-tag 前缀线** | `.hero-tag::before` 24×1px 品牌色横线 | L95–101 |
| Hero 整体高度 | `min-height:100vh`（L71） | L71 |

**Statement Hero 核心手法**：标题只放品牌名 "Haglöfs" 单词（L548），靠超大字号 + 深色右栏的视觉重量制造「声明感」。装饰元素密度集中在右栏（巨字水印 + 准星 symbol 叠加），左栏仅一条 ghost 年份做角落点缀。

---

### 维度4 — Section 组织模式

**信息密度梯度**（从疏到密）：

```
Hero(极疏，单词+一句描述) 
  → Tension(疏，4 对概念) 
  → Color(密，3组×4-5色=13色卡) 
  → Typo(疏，3 字体样本) 
  → Symbol(中，before/after对比) 
  → Numerals(密，8格数字网格) 
  → Principles(中，5卡片) 
  → Wordmark(极疏，锁定组合居中) 
  → Footer(极疏)
```

整体节奏：**疏-疏-密-疏-中-密-中-疏-疏**——两端疏、中段密集（Color/Numerals 是信息峰值），形成「呼吸式」叙事。

**留白节奏**：
- section 间距统一用 `var(--space-4xl)` = 96px（L56 `.section` 的 padding），**纯 token 化，无硬编码 px**。
- 容器宽度：`var(--container-max)` = 1120px（L46/L57）。
- 容器内边距：`var(--container-padding)` = 32px（L47），移动端降为 16px（L538）。
- 元素间间距全部走 `--space-lg`(24px) / `--space-xl`(32px) / `--space-2xl`(48px) / `--space-3xl`(64px)。

**section 统计**：
- section 总数：**8 个 content section + 1 footer = 9 块**（不含 Hero 则 8+1）
- 平均行数/section：**~37 行/section**（HTML body 部分 L545–848 = 303 行，÷ 9 ≈ 34；含 Hero 计算偏高）
- 最大 section：Color（L600–673，73 行）；最小 section：Wordmark（L825–840，15 行）

---

## 样本2：H062（4 维度剖析）

### 维度1 — HTML 结构树

`<body>`（L188）下顶层结构为 **1 个 `<div class="sidebar">` + 1 个 `<div class="main">` 包裹 8 个 section + 1 footer**。引入了 sidebar 导航和 main 容器包裹——比 H061 多了一层结构。

| 顺序 | 元素 | class | 行号范围 | 语义角色 |
|------|------|-------|----------|----------|
| 0 | `<div>` | `.sidebar` | L191–203 | 固定左侧导航（vertical-rl 文字） |
| — | `<div>` | `.main` | L206–567 | 内容容器（margin-left:64px） |
| 1 | `<section>` | `.hero` | L209–232 | 100vh Statement Hero（单栏） |
| — | `<div>` | `.divider` | L234 | 分隔线（独立元素） |
| 2 | `<section>` | `.section #principles` | L237–274 | 设计原则（横向滚动卡片） |
| — | `<div>` | `.divider` | L276 | |
| 3 | `<section>` | `.section #color` | L279–328 | 色彩系统（Color Bar 条形） |
| — | `<div>` | `.divider` | L330 | |
| 4 | `<section>` | `.section #type` | L333–366 | 字体样本墙（Type Wall） |
| — | `<div>` | `.divider` | L368 | |
| 5 | `<section>` | `.section #components` | L371–436 | 组件目录（Accordion 折叠） |
| — | `<div>` | `.divider` | L438 | |
| 6 | `<section>` | `.section #tension` | L441–473 | 核心张力（Tension Strip） |
| — | `<div>` | `.divider` | L475 | |
| 7 | `<section>` | `.section #spacing` | L478–515 | 间距即关系（视觉演示） |
| — | `<div>` | `.divider` | L517 | |
| 8 | `<section>` | `.section #rules` | L520–557 | 使用守则（Do/Don't 双栏） |
| — | `<div>` | `.divider` | L559 | |
| 9 | `<footer>` | `.footer-section` | L562–565 | 页脚（左右分栏） |

**结构特征**：v2 引入了 **Sidebar 固定导航**（L191–203，7 个锚点链接用 `writing-mode:vertical-rl` 竖排）和 **`.main` 内容容器**（L206，`margin-left:64px`）。section 之间用独立的 `.divider` 元素（L60，1px 线）物理分隔，而非 H061 的 section 自带背景色切换。底部含 `<script>`（L569–574）实现 accordion 交互——是 3 样本中唯一带 JS 的。

---

### 维度2 — CSS 分层

| 层 | 行号范围 | 特征 |
|------|----------|------|
| **:root 变量定义层** | L9–26 | 14 个 color（命名前缀变化：--accent-* 而非 --brand-*）+ 空间用 `--s-*` 前缀（非 --space-*）+ 多了 `--s-5xl:128px` |
| **base** | L27–29 | reset + html/body，body 引用 --bg/--text-primary |
| **组件局部样式层 — SIDEBAR** | L31–36 | `.sidebar`(L32)`.sidebar-brand`(L33)`.sidebar a`(L34–35)`.sidebar-line`(L36)——scoped，大量硬编码 rgba() 而非 var |
| **组件局部样式层 — MAIN** | L38–39 | `.main{margin-left:64px}` 仅 1 行 |
| **组件局部样式层 — HERO** | L41–50 | `.hero`(L42)`.hero-letter`(L43)`.hero h1`(L44)`.hero p`(L45)`.hero-meta`(L46–49)`.hero-line`(L50) |
| **组件局部样式层 — SECTION** | L52–60 | `.section`(L53)`.section-header`(L54)`.section-tag`(L55–56)`.section-h2`(L57–58)`.section-desc`(L59)`.divider`(L60) |
| **组件局部样式层 — PRINCIPLES** | L62–69 | `.principles`(L63，横向 scroll-snap)`.principles-card`(L64)`.principles-num`(L65) |
| **组件局部样式层 — COLOR BAR** | L71–79 | `.color-bars`/`.color-bar-group`/`.color-bar`/`.color-bar-seg`——条形色卡新组件 |
| **组件局部样式层 — TYPE WALL** | L81–86 | `.type-wall`/`.type-wall-item`/`.type-wall-label`/`.type-wall-sample` |
| **组件局部样式层 — ACCORDION** | L88–97 | `.accordion`/`.accordion-item`/`.accordion-trigger`/`.accordion-panel` + JS 交互态 |
| **组件局部样式层 — SPACING DEMO** | L99–106 | `.spacing-demo`/`.spacing-block`/`.spacing-block-visual` |
| **组件局部样式层 — RULE-SPLIT** | L108–127 | `.rule-split`/`.rule-col`/`.rule-col-header`/`.rule-item`/`.rule-dot`——Do/Don't 组件 |
| **组件局部样式层 — TENSION STRIP** | L129–136 | `.tension-strip`/`.tension-pole`/`.tension-vs` |
| **组件局部样式层 — FOOTER** | L138–143 | `.footer-section`/`.footer__left`/`.footer__right` |
| **ANIMATIONS** | L145–153 | `@keyframes fadeIn`(L146)`@keyframes slideIn`(L147) + fade-in/delay 工具类 |
| **SCRIM** | L155–157 | `.scrim`/`.scrim-content`——层级遮罩（但 HTML 未使用） |
| **RESPONSIVE** | L159–185 | 两个断点：1024px（L160）/768px（L170） |

**关键发现**：H062 的变量引用不如 H061 彻底——sidebar/footer 大量使用**硬编码 `rgba(255,255,255,0.x)`**（L32–36/L139–143）而非定义 white 透明度 token。这是 v2 的「快速原型」特征。空间变量改用 `--s-*` 前缀且范围扩展到 `--s-5xl:128px`。

---

### 维度3 — Hero 变体识别（Statement Hero v2）

**变体类型**：Statement Hero v2 — **单栏全宽**（无左右分栏），100vh

| 决策项 | 值 | 行号 |
|--------|-----|------|
| 标题字体 | Playfair Display | L44 |
| 标题字号 | `clamp(42px, 6vw, 80px)` | L44 |
| 标题字重 | 300（比 H061 的 400 更轻） | L44 |
| 标题 line-height | 1.02 | L44 |
| 标题字间距 | -2px（绝对值，非 em） | L44 |
| 背景处理 | 纯 var(--bg) 单色，无深色块 | L42 |
| **装饰元素①：巨型字母 H** | `.hero-letter` — absolute 右侧居中，clamp(200px,25vw,400px) Playfair 300，color rgba(227,223,216,0.5) | L43（CSS）/ L210（HTML） |
| **装饰元素②：底部细线** | `.hero-line` — absolute 底部 1px border 色 | L50（CSS）/ L231（HTML） |
| **装饰元素③：hero-meta 数据条** | 4 项 meta（Section/Tokens/Fonts/Weight），JetBrains Mono 标签 + Playfair 数值 | L46–49（CSS）/ L213–230（HTML） |
| **装饰元素④：fade-in 动画** | h1/p/meta 分别 delay 0/0.15s/0.3s | L148–151 / L211–213 |
| Hero 整体高度 | `min-height:100vh`（L42） | L42 |

**v2 Statement Hero 核心变化**：去掉深色右栏，改为单栏 + 右侧巨型透明字母「H」做背景装饰（替代 H061 的深色块+准星）。标题从单词「Haglöfs」变为两行「Haglöfs / Design Language」。新增 hero-meta 数据条（Section/Tokens/Fonts/Weight）——将页面自身的元信息作为 Hero 内容，是 v2 的「自指」手法。标题字重从 400 降到 300，更轻、更「editorial」。

---

### 维度4 — Section 组织模式

**信息密度梯度**：

```
Hero(疏，标题+meta)
  → Principles(中，4横滚卡片)
  → Color(密，3组色条)
  → Type(中，6字体样本)
  → Components(密，8折叠项)
  → Tension(中，2组对立)
  → Spacing(中，4视觉块)
  → Rules(密，Do/Don't各6条)
  → Footer(疏)
```

整体节奏比 H061 更**均匀**——密度波动小，没有 H061 那种「两端极疏中段极密」的对比。每个 section 都有完整的 `.section-header`（tag+h2+desc）三件套，信息颗粒度更一致。

**留白节奏**：
- section padding 用 `var(--s-5xl)` = 128px（L53，**比 H061 的 96px 更大**）。
- section 间距靠独立 `.divider`（L60，1px 线）分隔，**不是靠背景色切换**。
- 容器宽度：无统一 max-width，靠 `.section` 的左右 padding 控制（移动端降到 --s-lg/--s-xl）。
- 命名用 `--s-*` 前缀（H061 用 `--space-*`）。

**section 统计**：
- section 总数：**7 个 content section + 1 hero + 1 footer = 9 块**（与 H061 数量一致）
- 平均行数/section：**~42 行/section**（含 divider 和 header 比 H061 更重）
- 最大 section：Components（L371–436，65 行，accordion）；最小：Tension 单组（L441–473，32 行）

---

## 样本3：R3-数据分析中心（4 维度剖析）

### 维度1 — HTML 结构树

`<body>`（L306）下顶层结构为 **9 个 `<section>` + 1 个 `<div class="ptrl">`（进度条）+ 1 个 `<footer>`**，平铺无包裹容器。顶部含 `@showcase` 注释元数据（L1–5）声明骨架组合。

| 顺序 | 元素 | class | 行号范围 | 语义角色 |
|------|------|-------|----------|----------|
| — | `<!-- @showcase -->` | 元数据注释 | L1–5 | skeleton/quality/combination 声明 |
| 1 | `<div>` + `<section>` | `.hero` | L309–337 | Pulse Hero（深色底+脉冲线+数据条） |
| 2 | `<section>` | `.sec .compass` | L340–392 | 罗盘趋势（方向指标卡） |
| 3 | `<section>` | `.sec .elevation` | L395–436 | 地形剖面（SVG 趋势曲线） |
| 4 | `<section>` | `.sec .seam` | L439–489 | 线迹基线（目标对比进度条） |
| 5 | `<section>` | `.sec .layer` | L492–543 | 数据分层（地质层结构） |
| 6 | `<section>` | `.sec .swatch` | L546–592 | 材质卡片（品牌指标） |
| 7 | `<section>` | `.sec .matrix` | L595–615 | 格点矩阵（频度分布） |
| 8 | `<section>` | `.sec .insight` | L618–650 | 发现与行动（Callout+Action） |
| — | `<div>` | `.ptrl` | L653–662 | 进度指示器（独立于 section） |
| 9 | `<footer>` | `.ftr` | L665–670 | 页脚 |

**结构特征**：无 sidebar、无 main 包裹——与 H061 同为线性平铺。但引入了 **`.cmp`（component label）组件标签**系统：每个 section 顶部都有一个 `.cmp` 标注（如「S2 · Compass Trend」），用 `<em>` 高亮英文名——这是数据报告范式的「组件自标注」手法。section 命名用 **S/M/T/D + 编号** 前缀（S=Scene, M=Module, T=Table, D=Display）。`.sec` 替代了 H061 的 `.section`，`.sec--w`/`--n`/`--m` 提供三档宽度。

---

### 维度2 — CSS 分层

| 层 | 行号范围 | 特征 |
|------|----------|------|
| **:root 变量定义层** | L14–23 | 极压缩命名：--pk/--olive/--earth/--org/--glacier（色）+ --tp/--ts/--tda（文字）+ --fd/--fb/--fm（字体）+ --s1~--s24（间距）+ --eo/--df/--dn/--ds（缓动）。**变量名极短，牺牲可读性换密度**。 |
| **base** | L24–28 | reset + body（引用 --fb/--bg/--tp）+ ::selection + .fd/.fm 工具类 |
| **组件局部样式层 — CMP LABEL** | L30–34 | `.cmp`（L30–33）`.cmp em`（L34）——全站复用的组件标签 |
| **组件局部样式层 — SEC 容器** | L36–39 | `.sec`(L36，padding --s20/--s8) `.sec--w/--n/--m`(L37–39，三档 max-width) |
| **组件局部样式层 — HERO** | L41–81 | `.hero`(L42–45)`.hero::before`(L46–50 巨字水印)`.hero__pulse`(L51–56)`.hero__inner`(L57)`.hero__tag`(L58–62)`.hero__h`(L63–68)`.hero__strip`(L69–72)`.hm__num/lbl/ctx`(L73–81) |
| **组件局部样式层 — COMPASS** | L83–116 | `.compass`/`.cmp-card`/`.cmp-card__trail`（柱状微图表） |
| **组件局部样式层 — ELEVATION** | L118–140 | `.elevation`/`.elev`/`.elev__line`（SVG 路径） |
| **组件局部样式层 — SEAM** | L142–178 | `.seam`/`.divider-row`/`.divider-row__track`/`__fill`/`__mark`（进度条+目标线） |
| **组件局部样式层 — LAYER** | L180–205 | `.layer`/`.lyr`（hover 变深色反转） |
| **组件局部样式层 — SWATCH** | L207–232 | `.swatch`/`.sw`/`.sw__face`/`.sw__dotline`（点阵进度） |
| **组件局部样式层 — MATRIX** | L234–251 | `.matrix`/`.mx`（6列网格） |
| **组件局部样式层 — INSIGHT** | L253–269 | `.insight`/`.callout`/`.action`/`.act-item` |
| **组件局部样式层 — PROGRESS** | L271–279 | `.ptrl`/`.ptrl__d`（圆点进度） |
| **组件局部样式层 — FOOTER** | L281–285 | `.ftr`/`.ftr__in`/`.ftr__b`/`.ftr__m` |
| **RESPONSIVE** | L287–303 | 两断点：1024px（L288）/768px（L295） |

**关键发现**：R3 的 :root 变量名**极致压缩**（--pk/--tp/--fd/--s8），与 H061/H062 的语义命名（--text-primary/--font-display/--space-md）截然不同。这是「组件密度标杆」的代价——在 673 行内塞 8 个数据组件，变量名必须短。间距 token 用 `--s数字` 体系（--s1=4px 到 --s24=96px），与 H062 的 --s-2xs/--s-xl 体系不同。引入了 **缓动 token**（--eo/--df/--dn/--ds），这是数据报告的微交互需求。

---

### 维度3 — Hero 变体识别（Pulse Hero）

**变体类型**：Pulse Hero — 深色底 + 脉动线 + 数据仪表条

| 决策项 | 值 | 行号 |
|--------|-----|------|
| 标题字体 | `var(--fd)` = Georgia | L63 |
| 标题字号 | `clamp(3rem, 6vw, 5rem)` = clamp(48px,6vw,80px) | L64 |
| 标题字重 | 400，`<strong>` 用 700（L68） | L65/L68 |
| 标题 line-height | 1.05 | L65 |
| 标题字间距 | -.03em | L65 |
| 标题 max-width | 700px（L66） | L66 |
| 背景处理 | var(--pk) #2C2C2C 深灰（L43），white text | L43 |
| **装饰元素①：巨字水印** | `.hero::before` content:'ANALYTICS' — absolute 左上角溢出，clamp(8rem,20vw,22rem) Georgia 700，color rgba(255,255,255,0.02) 极低透明度 | L46–50 |
| **装饰元素②：脉冲线** | `.hero__pulse` — absolute top 1px 横线，rgba(74,93,58,0.4) 橄榄色，`@keyframes pulse` 3s 呼吸（opacity 0.3↔1） | L51–56（CSS）/ L314（HTML） |
| **装饰元素③：tag 前缀线** | `.hero__tag::before` 32×1px 线 | L62 |
| **装饰元素④：数据仪表条** | `.hero__strip` — 3 列 grid，每列 hm__lbl + hm__num（clamp 2-3.5rem Mono 600）+ hm__ctx | L69–81（CSS）/ L318–334（HTML） |
| Hero 整体高度 | `min-height:100vh`（L43） | L43 |

**Pulse Hero 核心手法**：与 Statement Hero 的最大差异——**Hero 底部直接嵌数据仪表条**（3 个 KPI），不等用户滚动就给出信息密度。脉冲线（脉动动画）是 Pulse 命名来源，象征「活的数据」。巨字水印用极低透明度（0.02）而非 H061 的 0.08-0.15，更隐晦。标题含 `<strong>` 双色处理（白色 + 橄榄色），是数据报告的「高亮关键词」手法。

---

### 维度4 — Section 组织模式

**信息密度梯度**：

```
Hero(密，标题+3KPI)
  → Compass(密，2卡+柱状微图)
  → Elevation(密，3SVG曲线)
  → Seam(密，4进度条+目标线)
  → Layer(密，5层+hover反转)
  → Swatch(密，4卡+点阵)
  → Matrix(密，12格)
  → Insight(中，callout+action)
  → Footer(疏)
```

**整体极高密度**——除 Footer 外几乎每个 section 都填满数据可视化组件。这是「组件密度标杆」的本质：**8 个 section 中 7 个是密/极高密**，无明显疏密对比，靠 `.cmp` 标签和 `.sec` padding 做节奏。与 H061/H062 的「呼吸式」叙事相反，R3 是「持续高压」的数据轰炸。

**留白节奏**：
- section padding 用 `var(--s20)` = 80px（L36，**比 H061 的 96px 和 H062 的 128px 都小**）——密度更高靠压缩间距。
- 三档容器宽度：`.sec--w`(1120px) / `.sec--m`(960px) / `.sec--n`(720px)，按内容密度选档。
- 组件内间距全部走 `--s4`(16px) ~ `--s8`(32px)。
- 无独立 divider 元素，靠 section 背景色交替（深色 hero/elevation/matrix vs 浅色 compass/seam/layer/swatch/insight）做分隔。

**section 统计**：
- section 总数：**8 个 content section + 1 footer = 9 块**（+ 1 个独立 ptrl 进度条）
- 平均行数/section：**~40 行/section**（HTML body L309–670 = 361 行 ÷ 9 ≈ 40）
- 最大 section：Compass（L340–392，52 行）；最小：Matrix（L595–615，20 行，但 12 格密度极高）

---

## H061 vs H062 对比（v2 改了什么）

### 结构层面

| 维度 | H061（v1） | H062（v2） | 变化性质 |
|------|-----------|-----------|----------|
| 顶层包裹 | 无，body 直接平铺 section | sidebar + .main 包裹 | **新增** sidebar 导航系统 |
| section 分隔 | 靠背景色切换（绿/奶/深循环） | 靠独立 `.divider` 1px 线 | **改变** 分隔策略 |
| section 数量 | 8+1 footer | 7+1 hero+1 footer | 基本一致 |
| JS 交互 | 无 | accordion toggle（L569–574） | **新增** 交互层 |
| 锚点导航 | 无 | sidebar 7 锚点 | **新增** |

### Hero 层面

| 维度 | H061 | H062 | 变化 |
|------|------|------|------|
| 布局 | 左右分栏（1.5fr/1fr grid） | 单栏全宽 | **重构**：去深色右栏 |
| 标题内容 | "Haglöfs" 单词 | "Haglöfs / Design Language" 两行 | 扩展 |
| 标题字号 | clamp(64px,8.6vw,120px) | clamp(42px,6vw,80px) | **缩小** ~40% |
| 标题字重 | 400 | 300 | 更轻 |
| 主装饰 | 深色块+巨字水印+准星symbol | 右侧巨型透明字母「H」 | **替换** |
| 数据元素 | 无 | hero-meta 4 项（Section/Tokens/Fonts/Weight） | **新增** 自指元信息 |
| 动画 | 无 | fade-in + delay 阶梯 | **新增** |

### CSS / Token 层面

| 维度 | H061 | H062 | 变化 |
|------|------|------|------|
| 色变量前缀 | `--brand-*` / `--text-*` / `--signal-*` | `--accent-*` / `--text-*` | 前缀统一化 |
| 空间前缀 | `--space-*` | `--s-*` | 缩短 |
| 空间范围 | --space-2xs(2px) ~ --space-4xl(96px) | --s-2xs(2px) ~ --s-5xl(128px) | **扩展** 上限 |
| 字体配方 | 4 字体（Playfair/Inter/JetBrains Mono/Doto） | 3 字体（Playfair/Inter/JetBrains Mono） | **减少**：去掉 Doto |
| radius token | --radius-sm/md/lg/full | 无 radius token | **移除**（用硬编码 4px） |
| 变量引用彻底性 | 极高（几乎无硬编码色） | 中等（sidebar/footer 大量 rgba 硬编码） | **下降** |
| 动画 token | 无 | 无（但有 fade-in 工具类） | — |

### Section 内容层面

| H061 section | H062 对应 | 变化 |
|-------------|-----------|------|
| Tension（张力对） | Tension Strip（保留但改为 Pole A vs Pole B 结构） | 简化为 2 极 |
| Color（色卡） | Color Bar（条形替代方块卡） | **换组件** |
| Typo（字体列表） | Type Wall（样本墙，含 italic 变体） | 扩展样本数 |
| Symbol（准星演化） | **删除** | — |
| Numerals（数字网格） | **删除**（数字移入 Hero meta） | 合并 |
| Principles（原则卡） | Principles（改为横向 scroll-snap 卡片） | 交互升级 |
| Wordmark（锁定组合） | **删除** | — |
| — | Components（**新增** accordion 组件目录） | 新增 |
| — | Spacing（**新增** 间距视觉演示） | 新增 |
| — | Rules（**新增** Do/Don't 双栏） | 新增 |

**v2 总结**：从「品牌展示页」（symbol/numerals/wordmark 品牌资产展示）转向「设计系统文档页」（components/spacing/rules 规范文档）。Hero 从视觉声明转向信息声明（含 meta 数据）。去掉了品牌资产展示类 section，增加了规范类 section。整体更「文档化」、更「功能化」，牺牲了 v1 的视觉张力。

---

## Haglöfs 范式标配（共性提取 A/B/C）

### A. 范式标配结构（3 个样本都有）

以下元素在 **H061 + H062 + R3 全部出现**，是 Haglöfs 范式的必备骨架：

| 标配项 | H061 | H062 | R3 | 说明 |
|--------|------|------|-----|------|
| **:root 设计令牌层** | ✅ L11–48 | ✅ L9–26 | ✅ L14–23 | 全部在 `<style>` 顶部定义 color+font+space+radius token，body 引用 |
| **100vh Hero** | ✅ min-height:100vh (L71) | ✅ min-height:100vh (L42) | ✅ min-height:100vh (L43) | Hero 必须占满首屏 |
| **Hero 巨字水印装饰** | ✅ ghost-text 1914 (L142) | ✅ hero-letter H (L43) | ✅ hero::before ANALYTICS (L46) | 超大字号+极低透明度的背景文字 |
| **Hero tag 前缀线** | ✅ hero-tag::before 24px线 (L95) | ✅ section-tag::before 24px线 (L56) | ✅ hero__tag::before 32px线 (L62) | 标签前一条短横线 |
| **Mono 字体做标签** | ✅ JetBrains Mono (L59) | ✅ JetBrains Mono (L48/55) | ✅ var(--fm) (L31) | 全部用等宽字体做 section label / tag，大写+letter-spacing |
| **衬线字体做标题** | ✅ Playfair Display (L103) | ✅ Playfair Display (L44/57) | ✅ Georgia var(--fd) (L63) | 标题/hero 必须衬线（Playfair 或 Georgia） |
| **clamp() 响应式字号** | ✅ 全站 (L104等) | ✅ 全站 (L43/44/57等) | ✅ 全站 (L48/64/74等) | 标题/大数字一律 clamp(min,vw,max) |
| **section 统一 padding token** | ✅ --space-4xl=96px (L56) | ✅ --s-5xl=128px (L53) | ✅ --s20=80px (L36) | section 内边距用空间 token，非硬编码 |
| **Footer 深色底** | ✅ --text-primary 底 (L482) | ✅ --text-primary 底 (L139) | ✅ --pk 底 (L282) | Footer 统一深色背景收尾 |
| **响应式双断点** | ✅ 1119px+767px | ✅ 1024px+768px | ✅ 1024px+768px | 两个 @media 断点 |
| **色彩三组角色** | ✅ Neutral+Nature+Signal | ✅ Neutral+Nature+Signal | ✅ (olive/earth/glacier/org 四色系) | 中性+自然+信号 三层色彩体系 |
| **无外部 CSS/JS 框架** | ✅ 纯手写 | ✅ 纯手写(+5行JS) | ✅ 纯手写 | 零依赖，单文件自包含 |

### B. 变化元素（不同样本有不同处理）

| 变化项 | H061 | H062 | R3 | 说明 |
|--------|------|------|-----|------|
| **Hero 类型** | Statement Hero（分栏） | Statement Hero v2（单栏） | Pulse Hero（深色+脉冲） | Hero 是最大变量 |
| **字体组合** | 4 字体（+Doto） | 3 字体 | 2 字体（Inter+Georgia，Mono 共用） | 字体数量递减 |
| **衬线字体选型** | Playfair Display | Playfair Display | Georgia | R3 用系统衬线 |
| **Sidebar 导航** | 无 | 有（vertical-rl） | 无 | 仅 H062 |
| **section 数量** | 8+1 | 7+1+1hero | 8+1 | 7-8 个 content section |
| **间距 token 前缀** | --space-* | --s-* | --s数字 | 三种命名 |
| **间距最大值** | 96px (--space-4xl) | 128px (--s-5xl) | 96px (--s24) | H062 最大 |
| **section 分隔方式** | 背景色切换 | .divider 线 | 背景色切换 | 两种策略 |
| **JS 交互** | 无 | accordion | 无 | 仅 H062 |
| **数据可视化组件** | 无（静态展示） | 无（文档展示） | 有（SVG曲线/进度条/柱状图/矩阵） | 仅 R3 |
| **动画** | 无 | fade-in 阶梯 | pulse 脉动 | H062/R3 各有 |
| **背景色策略** | 奶色为主+绿/深色穿插 | 纯奶色单一 | 深/浅交替（数据报告） | 三种基调 |
| **容器宽度** | 单一 1120px | 无统一（padding 控制） | 三档 1120/960/720px | R3 最灵活 |
| **变量命名风格** | 语义长名 (--text-primary) | 语义中名 (--accent-forest) | 极压缩 (--pk/--tp) | 三种风格 |

### C. 每个 section 的行号范围汇总表

供阶段 2 子代理快速定位：

| 样本 | section 名 | 行号范围 | CSS 行号范围 |
|------|-----------|----------|-------------|
| **H061** | Hero (Statement, 分栏) | L545–562 | L67–160 |
| H061 | Tension (核心张力) | L565–597 | L161–209 |
| H061 | Color (色彩系统) | L600–673 | L210–264 |
| H061 | Typography (字体) | L676–701 | L265–307 |
| H061 | Symbol (准星演化) | L704–737 | L308–378 |
| H061 | Numerals (品牌数字) | L740–787 | L379–414 |
| H061 | Principles (设计原则) | L790–822 | L415–454 |
| H061 | Wordmark (锁定组合) | L825–840 | L455–480 |
| H061 | Footer | L843–848 | L481–508 |
| **H062** | Sidebar (导航) | L191–203 | L31–36 |
| H062 | Hero (Statement v2, 单栏) | L209–232 | L41–50 |
| H062 | Principles (原则, 横滚) | L237–274 | L62–69 |
| H062 | Color (色彩, Color Bar) | L279–328 | L71–79 |
| H062 | Type (字体墙) | L333–366 | L81–86 |
| H062 | Components (组件 Accordion) | L371–436 | L88–97 |
| H062 | Tension (张力 Strip) | L441–473 | L129–136 |
| H062 | Spacing (间距演示) | L478–515 | L99–106 |
| H062 | Rules (Do/Don't) | L520–557 | L108–127 |
| H062 | Footer | L562–565 | L138–143 |
| **R3** | Hero (Pulse, 深色) | L309–337 | L41–81 |
| R3 | Compass Trend (罗盘趋势) | L340–392 | L83–116 |
| R3 | Elevation Profile (地形剖面) | L395–436 | L118–140 |
| R3 | Seam Benchmark (线迹基线) | L439–489 | L142–178 |
| R3 | Layer Stack (数据分层) | L492–543 | L180–205 |
| R3 | Swatch Cards (材质卡片) | L546–592 | L207–232 |
| R3 | Grid Matrix (格点矩阵) | L595–615 | L234–251 |
| R3 | Insight (Callout+Action) | L618–650 | L253–269 |
| R3 | Progress (进度条) | L653–662 | L271–279 |
| R3 | Footer | L665–670 | L281–285 |

---

## 关键发现（供后续阶段关注）

1. **Hero 是最大变量，但有不变量**：3 个 Hero 类型完全不同（分栏 Statement / 单栏 Statement / Pulse 深色），但**全部 100vh + 巨字水印 + tag 前缀线 + 衬线标题**是铁律。后续构建技能时，Hero 变体应该作为「可切换模块」，而这 4 个不变量是 Hero 的 base mixin。

2. **token 命名三套体系并存**：H061(--space-*/--brand-*) / H062(--s-*/--accent-*) / R3(--s数字/--pk)——同一范式下 3 种命名。后续技能应**统一为一套**（建议 H061 的语义长名，可读性最好），但需记录 R3 的压缩风格作为「高密度场景」可选模式。

3. **间距 token 的数值梯队是共享骨架**：尽管前缀不同，三者的间距梯队惊人一致——2/4/8/16/24/32/48/64/96(px)，R3 额外有 80px。这套 9-10 级梯队是 Haglöfs 范式的空间 DNA，后续技能应固化。

4. **section 数量稳定在 7-8 个**：3 个样本的 content section 数量高度一致（H061=8, H062=7, R3=8）。这不是巧合——7-8 个 section 是 Haglöfs 品牌页的「叙事容量」。后续技能的 section 组合应以此为基准，超出则需要拆页。

5. **R3 的 `.cmp` 组件自标注系统值得独立提取**：R3 每个 section 顶部都有 `.cmp` 标签（如「S2 · *Compass Trend* — 罗盘趋势」），用 `<em>` 高亮组件英文名——这是一种「组件自我文档化」的手法，H061/H062 都没有。对于数据报告类页面，这个模式可以作为可选增强。同时 R3 的 `@showcase` 注释元数据（L1–5）声明了 skeleton/quality/combination，是「页面配方声明」的雏形，后续技能可借鉴这种「自描述头注释」。
