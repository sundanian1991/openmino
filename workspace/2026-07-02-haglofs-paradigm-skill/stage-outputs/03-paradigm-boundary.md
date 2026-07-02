# Haglöfs 范式边界

> 横向对比 H 系列 11 个案例（3 核心样本 H061/H062/R3-数据中心 + 8 横向样本 H042/H044/H047/H050/H029/H032/H065/H066），区分**范式红线（不可动）**与**弹性区（可调）**，给出可操作的判断流程。
>
> 生产日期：2026-07-02 · 阶段 3 · 范式边界文档 · 源文件只读未改

---

## 判断基线

**`token-root.css`（`templates/base/token-root.css`）是唯一真源。** 它定义了 15 亮色 + 5 深色覆写的色值、4 字体配方（Playfair Display / Doto / Inter / JetBrains Mono）、9 级字号 clamp、12 级 8px 基准间距梯队、≤8px radius 硬规则、克制 motion、3 档阴影。

**样本中的漂移一律视为遗产/降级，不纳入范式：**

| 漂移类型 | 真源（token-root） | 漂移样本 | 判定 |
|---------|-------------------|---------|------|
| 主绿 色值 | `--color-forest #4A6741`（L29） | H062 `#3D5A35`；H042/H044/H050/H066 `--olive:#4A5D3A`；H029/H032 `--primary-olive:#4A5D3A` | 遗产。`#4A5D3A` 是早期 olive，已废止；真源是 `#4A6741` forest |
| 暗灰 色值 | `--color-charcoal #2D2A26` / `--color-black #1A1816`（L25-26） | H042/H044/H050/H066 `--pk:#2C2C2C`；H029/H032 `--primary-darkgray:#2C2C2C` | 降级。`#2C2C2C` 偏冷，真源是暖灰 `#2D2A26`/`#1A1816` |
| 页面底色 | `--color-offwhite #F5F3EF`（温润米白，L21） | H042/H044/H050/H066 `--bg:#FAFAF8`；H029/H032 `--bg:#FAFAF8` | 降级。`#FAFAF8` 偏冷，真源是 `#F5F3EF`（有人味） |
| 标题字体 | `--font-display: 'Playfair Display'`（L109） | R3/H042/H044/H050/H066 用 `Georgia`；H029/H032 用 `Georgia`；H047/H065 用系统 sans-serif | 遗产。Georgia 是系统兜底，正式施工必须用 Playfair |
| 数据字体 | `--font-data: 'JetBrains Mono'`（L112） | H047/H065 用 `'SF Mono','Consolas'` | 降级。JetBrains Mono 是真源 |
| 变量命名 | 真源意图别名 `--bg-page/--border-rest/--text-primary` 等（L77-102） | H061 `--space-*`/`--brand-*`；H062 `--s-*`/`--accent-*`；R3/H066 `--pk/--olive/--s20` | 三套并存，真源是 token-root 的意图别名层 |

**一句话原则**：凡是「真源有定义、样本用了别的值/名」的差异，都不构成范式变化——那是样本的工程质量债，新施工一律回真源。

---

## A. 范式红线（不可动）

> 以下每条均有 **≥3 个案例印证**（含核心样本与横向样本）。动了就不是 Haglöfs 范式。

| # | 红线 | 依据（哪些案例都有） | 违反后果 |
|---|------|---------------------|---------|
| **A1** | **页面主底色是温润米白系（offwhite #F5F3EF 族），不是纯白/冷灰** | H061(`--bg:#F5F3EF`)、H042(`--bg:#FAFAF8`)、H044(`--bg:#FAFAF8`)、H050(`--bg`)、H029(`--bg:#FAFAF8`)、H066(`--bg`)——11 案例无一用纯 `#FFFFFF` 做页面底；`#FFF` 只做"浮起的卡片面"。token-root L21/L78 注释明令禁止冷白做页面底 | 丧失"人味/哑光感"，退化为通用 SaaS 白底页，品牌温度归零 |
| **A2** | **Hero 必须 100vh、必须有 ≥1 个装饰性深度层** | H061(min-height:100vh+巨字水印 L71/L142)、H062(100vh+字母H水印 L42/L43)、R3(100vh+ANALYTICS水印 L43/L46)、H042(100vh+横线疏密条 L16/L17)、H044(100vh+点阵+引文 L50/L52)、H050(100vh+RED水印+柱状装饰 L19/L27)、H029(100vh+斜切深块+1914水印 L72/L80)、H065(100vh+斜切块+年份水印 L73/L626)、H066(100vh+圆形印章 L41/L68)——全部 11 案例无例外 | Hero 退化为"标题+段落"的普通段落，失去"品牌第一印象的仪式空间"；裸标题 Hero 直接出范式 |
| **A3** | **标题字必须收紧负字距（-0.02em ~ -3px），line-height ≤ 1.05** | H061(-.025em/1.0 L106/108)、H062(-2px/1.02 L44)、R3(-.03em/1.05 L65)、H042(-3px/0.93 L20)、H044(-.03em/1.02 L67)、H050(-3px/1 L22)、H029(-2px/1.05 L106/107)、H065(-3px/0.95 L116/117)、H066(-.03em/1.02 L56)——无一例大标题用正字距或松行高 | 标题松散失神，丧失 editorial 威严；裸大写/松标题 = 错误 |
| **A4** | **全大写标签/eyebrow 必须用等宽字体 + 加宽字距（≥0.06em）** | H061(JetBrains Mono 0.06em L59/62)、H062(Mono 3px L55)、R3(Mono 4px L190)、H042(Mono 4px L12)、H044(Mono .08em L61)、H050(Mono 4px L12)、H029(Mono 4px L136)、H066(Mono .08em L50)——11 案例全部 `.section-label/.cmp/.tag` 遵守 | 标签变"普通小字"，丧失测绘基准线的秩序感；裸大写 = 错误 |
| **A5** | **标签前缀线（24–40px 短横线，1px 高）是 tag 的签名入口** | H061(hero-tag::before 24px L95)、H062(section-tag::before 24px L56)、R3(hero__tag::before 32px L62)、H042(hero-reveal__tag 带z-index层级 L19)、H044(hero__tag::before 32px L64)、H066(entrance__tag::before 40px L53)、H065(hero-tag 结构 L98)——核心样本与多数横向样本都有；H029/H032 用 section-label 简化版，但 cmp 编号前缀(cid)是变体表达 | 丧失"测绘基准线"的视觉隐喻，标签入口失去秩序锚点 |
| **A6** | **正文绝不用衬线字体；衬线仅限标题/数字/装饰** | H061(正文 Inter L113)、H062(正文 Inter L45/59)、R3(正文 sans)、H042(正文 Inter L11)、H044(正文 var(--fb)=Inter L33)、H050(正文 var(--fb) L10)、H029(正文 Helvetica L32)、H032(正文 Helvetica L31)——11 案例正文一律 sans-serif | 衬线正文可读性差且破坏"功能 vs 声明"的字体角色分工；token-root L111 body=Inter |
| **A7** | **字号一律 clamp(min,vw,max) 响应式；大数字/装饰字可用 clamp 到 200-400px** | H061(clamp(64px,8.6vw,120px) L104)、H062(clamp(42px,6vw,80px) L44)、R3(clamp(3rem,6vw,5rem) L64)、H042(clamp(3rem,7vw,6rem) L20)、H050(clamp(3rem,6vw,5.5rem) L22)、H066(clamp(3rem,7vw,5.5rem) L55)、H029(180px 年份 L123)——标题/大数字无硬编码 px | 固定 px 字号在移动端崩坏或桌面端过小，丧失流式缩放 |
| **A8** | **section 垂直 padding ≥ 80px，走 8px 基准梯队（80/96/120）** | H061(96px --space-4xl L56)、H062(128px --s-5xl L53)、R3(80px --s20 L36)、H042(120px L27等)、H044(96px --s24 L43)、H050(80px --s20 L15)、H066(80px --s20 L34)、H029/H032(120px L131/L48)——全部 ≥80px，无低于 80px 的 section | section 间无呼吸，内容糊成一片；80px 是数据页压缩极限 |
| **A9** | **footer 永远深色背景收尾** | H061(--text-primary底 L482)、H062(--text-primary底 L139)、R3(--pk底 L282)、H042(--td底 L94)、H044(--pk底 L241)、H050(深色 ar 段→fn)、H029(--primary-darkgray底 L107)、H032(--primary-darkgray底 L107)、H066(--pk底 L241)——11 案例无一浅色 footer | 浅色 footer 打破"深色收尾"的闭合感，页面失去仪式性收束 |
| **A10** | **深色 section 不连续出现（最多 1 个深段，前后必有浅色隔开）** | R3(深-浅-深-浅-浅-浅-深-浅)、H042(深Hero→浅Grille→浅Safety→...→深Perf→浅→深Sustain)、H065(浅Hero→浅Quote→深Tension→浅Identity→...→深Stats→浅)、H044(深Dualism→浅Fields→浅Pillars→深Fifth→浅Type→浅Apps→深Summary)——所有多 section 案例的深段都是孤立的"视觉重音" | 连续深色 = 无节奏的视觉疲劳，深色失去强调功能 |
| **A11** | **零外部 CSS/JS 框架，单文件自包含（纯手写 CSS）** | H061(纯手写)、H062(纯手写+5行JS)、R3(纯手写)、H042/H044/H050/H029/H032/H066(全部内联 `<style>`，仅引入 Google Fonts)、H047/H065(无框架，系统字体)——11 案例无一引入 Tailwind/Bootstrap/组件库 | 引入框架 = 不可控的设计债，破坏范式一致性 |
| **A12** | **响应式双断点（平板 ~768-1024px / 手机 ~768px 以下）** | H061(1119+767)、H062(1024+768)、R3(1024+768)、H042(1024+768)、H044(1024+900+768)、H050(1024+768)、H029(1024+768)、H066(1024+768)——11 案例均有 2 个 @media 断点 | 单断点或无响应式 = 移动端崩坏 |
| **A13** | **:root 设计令牌层必须存在（色+字+间距三类 token），body 引用 token 而非裸值** | H061(:root L11-48 全 token 化)、H062(:root L9-26)、R3(:root L14-23)、H042(:root L10)、H044(:root L9-29)、H050(:root L9)、H029(:root L9-29)、H032(:root L9-28)、H066(:root L9-18)、H047(:root L17-76)、H065(:root L13-25)——11 案例全部有 :root 定义层 | 无 token 层 = 不可维护的硬编码，范式无法移植复用 |
| **A14** | **关键词强调统一用 `<strong>` 加重字重（600-700），可染品牌色——不用斜体下划线/色块高亮做标题强调** | H061(strong 600 L111)、H062(strong)、R3(strong 700 染olive L68)、H042(strong 700 L21)、H044(.hl 染olive L69)、H050(strong 700 L17)、H029(.section-title strong 600 L150)、H065(h1 strong 600 L120/122)、H066(strong 700 L59)——标题内强调 100% 用 strong | 强调手法不统一 = 排版语言混乱，破坏"克制的强调"哲学 |
| **A15** | **哑光克制：层次靠色调+边框，shadow 仅做真正浮起；禁止渐变/模糊/装饰阴影做视觉主体** | H061(无渐变)、H062(无渐变，H062 L548 守则明列"渐变·阴影·模糊"Don't)、R3(脉冲线是低透明度呼吸非渐变)、H044(点阵非渐变)、H050(柱状用实色 fill)、H066(1px 线分隔)——11 案例无一处用渐变/模糊做主视觉（H029 hero::before 用了 linear-gradient 切色块是已知遗产瑕疵，新施工应改 clip-path 实色块） | 渐变/模糊 = 丧失哑光克制感，退化为 Material/Airbnb 风格 |

**红线统计**：15 条，每条 ≥3 案例（实际多数 ≥8 案例）印证。其中 A1-A9 与 token-root 直接对应，A10-A15 是跨样本结构性铁律。

---

## B. 弹性区（可调）

> 以下每个维度，不同案例有不同合理处理。**可调，但每条给出判断依据**——即"什么场景下选哪个值"。

| # | 维度 | 可调范围 | 判断依据 | 案例 |
|---|------|---------|---------|------|
| **B1** | **Hero 变体类型** | V1 Reveal(深底)/V2 Grille(浅底格栅)/V3 Split(左文右深块)/V4 Statement(浅底单字母)/V5 Pulse(深底KPI)/V6 Slide(深浅可切ghost) 共 6 类 | 看内容主轴：有数据→Pulse；有宣言→Statement；有矩阵陈列→Grille；有张力→Split；有仪式感→Reveal；要连续翻页→Slide。深底=V1/V5，浅底=V2/V4，分屏=V3 | H042(Reveal+Grille母本)、H061/H062(Statement)、R3数据中心(Pulse)、H044/H050(Split)、H029(diagonal=Split变体)、H047(Slide)、H066(Gallery Entrance) |
| **B2** | **衬线字体落地方式** | 真源 Playfair Display（正式）；系统兜底 Georgia（降级预览）；极少数连续翻页教学用系统 sans | 正式交付/品牌仪式页→必须 Playfair（按 token-root L109）；快速原型/降级预览→可用 Georgia（R3/H042/H044/H050/H066 的做法，但需知这是债）；教学连续翻页→可用 sans（H047 V6 是唯一例外） | H061/H062(Playfair)、R3/H042/H044/H050/H066(Georgia降级)、H047(系统sans=V6特例) |
| **B3** | **变量命名风格** | 三套并存：①token-root 意图别名(`--bg-page/--border-rest`)最规范 ②语义中名(`--accent-forest`)③极压缩(`--pk/--s20`) | 默认用①意图别名（可读性最好，是 token-root 真源）；极高密度数据页（单文件塞 8+ 数据组件）可用③压缩换取行数；过渡期兼容②。新页面禁止再造第四套 | H061(语义长名)、H062(语义中名)、R3/H066(极压缩)、token-root(意图别名=真源) |
| **B4** | **section padding 值** | 数据页 80px(`--s20`)；品牌展示页 96-120px；最大 128px(`--s-5xl`/`--sp-16`) | 按页面类型：数据/仪表盘→80px（高密度）；品牌叙事/设计系统→96-120px（大呼吸）；知识模板连续翻页→可用 128px。**底线 80px 不可破**（A8 红线） | R3/H066(80px)、H061/H044(96px)、H042/H050/H029/H032(120px)、H047(128px sp-16) |
| **B5** | **section 分隔策略** | ①背景色切换（深浅交替）②独立 .divider 1px 线③发丝线网格 gap:1px | 品牌叙事/呼吸式页→背景色切换（制造戏剧节奏）；设计系统文档页→.divider 线（理性分隔）；数据密集页→发丝线 gap:1px（压缩留白提密度）。**单页内不混用两种** | H061(背景色切换)、H062(.divider线)、R3(背景色+发丝线)、H044(背景色切换)、H050(背景色) |
| **B6** | **容器宽度策略** | ①单一宽度(1120-1200px)②三档(--w 1120/--m 960/--n 720)③无统一max-width靠padding | 品牌展示页→单一宽度（内容以卡片网格为主，不需窄档）；数据/仪表盘页→三档（矩阵用宽档，卡片用中档，金句长文用窄档）；简单叙事→靠padding | H061(单一1120)、R3/H044/H066(三档)、H029(单一1200)、H047(1200 max) |
| **B7** | **JS 交互有无** | ①纯静态无JS②轻JS(accordion/sticky)③数据可视化需SVG+hover | 品牌展示/声明页→纯静态（H061/H029/H032）；设计系统文档→可加 accordion（H062 L569）；数据页→SVG曲线+hover反转（R3）。**JS 仅做交互态，不做入场动画依赖**（渐显仅限Hero，见 B8） | H061(无JS)、H062(accordion JS)、R3(无JS纯CSS)、H029/H032(sticky nav)、H042(无JS) |
| **B8** | **动画类型** | ①无动画②fade-in 入场(仅Hero)③pulse 脉冲呼吸(仅数据Hero)④hover反转(数据页全程) | 默认克制无动画（H061/H029/H032）；需仪式感→Hero fade-in 阶梯延迟（H062 L146）；数据活体感→Hero pulse 线（R3）；数据探索感→hover 反转（R3 lyr / H042 grille-item）。**渐显不超出 Hero 区，滚动途中靠背景色+padding 制造节奏** | H061(无)、H062(fade-in)、R3(pulse+hover)、H042(hover)、H047(无)、H065(无) |
| **B9** | **网格分隔语言** | ①大间距留白(40-80px gap)②发丝线分隔(gap:1px+背景色) | 品牌页→大间距空气感（H042 material-row gap:60px）；数据页→发丝线压缩（R3 matrix gap:1px）。**一页内不混用** | H042/H029(大间距)、R3/H044(发丝线) |
| **B10** | **sidebar/nav 有无** | ①无导航，body直接平铺②sticky/fixed顶部nav③固定左侧sidebar(vertical-rl竖排) | 简单叙事/单页声明→无nav（H061/R3/H042）；多section系统文档→顶部sticky nav（H029/H032/H065）；深度文档/设计系统→左侧sidebar锚点（H062）。**nav 不是范式必需，但有多section时建议有** | H061/R3/H042(无nav)、H029/H032/H065(顶部nav)、H062(左侧sidebar) |
| **B11** | **section 自标注系统(.cmp)有无** | ①无组件标签②有 .cmp 组件自标注(`S2 · *Compass* — 中文说明`) | 数据/分析/组件库页→建议有 .cmp（R3/H044/H066 的自文档化手法，读者快速识别组件类型）；纯品牌叙事→可省（H061/H065/H042）。**数据页强烈推荐，品牌页可选** | R3/H044/H066(有.cmp)、H061/H065/H042/H029(无) |
| **B12** | **横向滚动有无** | ①纯纵向②横向时间轴轨道(frieze) | 传承/历史叙事页→横向滚动时间线（H066 frieze__track，"时间流动"语义）；其他场景→纯纵向。**横向滚动仅限时间线/时间轴，卡片网格禁用** | H066(横向frieze)、其余全部(纵向) |

**弹性区统计**：12 条，每条均给出"什么场景选什么值"的判断依据。

---

## C. 判断流程（拿到新品牌怎么决定调什么）

### Step 0 · 锁定真源
开工前先确认：所有色值、字体、间距、radius 一律从 `token-root.css` 取值（意图别名层 `--bg-page/--border-rest/--text-primary` 优先）。**禁止从任何 .html 样本里复制裸值**——样本的 `#4A5D3A olive`、`#2C2C2C pk`、`Georgia`、`#FAFAF8` 全部是债。

### Step 1 · 先逐条过 A 表（红线，不可碰）
拿着 15 条红线，对照你的设计稿/代码逐条核验。任何一条违反 = 出范式，必须回退：

- 底色是米白不是纯白？（A1）
- Hero 100vh + 有装饰深度层？（A2）
- 大标题负字距 + 紧行高？（A3）
- 全大写标签等宽+加字距？（A4）
- … 逐条过到 A15。

**红线零容忍。** 这 15 条是"动了就不是 Haglöfs"的底线。

### Step 2 · 定 Hero 变体（B1）
问自己：这个页面内容主轴是什么？
- 数据/指标/仪表板 → **V5 Pulse**（深底+脉冲线+3KPI）
- 品牌宣言/设计系统文档 → **V4 Statement**（浅底+单字母水印+weight300细衬线+4格meta）
- 多项并列陈列 → **V2 Grille**（浅底+4列竖线格栅）
- 主张+引文/符号，有张力 → **V3 Split**（左文右深块，1.5fr:1fr）
- 仪式感传承开篇 → **V1 Reveal**（深底全幅+疏密横线）
- 连续翻页教学/知识模板 → **V6 Slide**（深浅可切+ghost大字，唯一可用sans标题）

> 口诀：有数据→Pulse；有宣言→Statement；有矩阵→Grille；有张力→Split；有仪式→Reveal；要翻页→Slide。

### Step 3 · 按品牌调性查 B 表（弹性区，按场景调）
确认是品牌页还是数据页，这决定 B4(padding)/B5(分隔)/B6(宽度)/B8(动画)/B9(网格)/B11(组件标签) 一整组联动选择：

| 场景类型 | padding | 分隔 | 宽度 | 动画 | 网格 | .cmp |
|---------|---------|------|------|------|------|------|
| **品牌叙事/展示页** | 96-120px | 背景色切换 | 单一 | 无或Hero fade-in | 大间距留白 | 可省 |
| **数据/仪表盘页** | 80px | 发丝线 | 三档 | pulse+hover反转 | 发丝线1px | 强烈推荐 |
| **设计系统文档页** | 96-128px | .divider线 | 单一或三档 | 可加accordion | 大间距 | 可选 |
| **知识模板/连续翻页** | 128px | 深浅切换slide | 1200max | 无 | 卡片网格 | 可省 |

### Step 4 · 决定字体落地（B2）
- 正式交付 → Playfair Display（按真源加载 Google Fonts link）
- 快速降级预览 → Georgia（知其是债，上线前换回）
- V6 Slide 特例 → 可用系统 sans（仅此一种 Hero 允许非衬线标题）

### Step 5 · 决定 token 命名（B3）
- 默认：token-root 意图别名（`--bg-page`/`--border-rest`/`--text-primary`）
- 极高密度数据页可选：压缩命名（`--pk`/`--s20`），但需在文件头注释说明映射回真源

### Step 6 · 逐条核验"遗产清零"
最后过一遍，确保没有从样本里带过来的债：
- [ ] 没有 `#4A5D3A`/`#2C2C2C`/`#FAFAF8` 等样本裸值，全部换 token-root 真源
- [ ] 没有 Georgia/SF Mono 落地（除非明确是降级预览并有 TODO 标注）
- [ ] 没有渐变/模糊做主视觉（A15）
- [ ] section 数 ≤ 8 个 content section（超出拆页）
- [ ] 深色 section 不连续（A10）
- [ ] footer 深色（A9）

### 判断流程速查图

```
新品牌页面需求
     │
     ▼
[Step 0] 全部从 token-root.css 取值 ──── 禁止复制样本裸值
     │
     ▼
[Step 1] 逐条过 A 表 15 条红线 ──────── 零容忍，违反即出范式
     │  (底色米白/Hero100vh+装饰层/负字距/等宽大写标签/...)
     │
     ▼
[Step 2] 选 Hero 变体（B1 决策树）────── 数据→Pulse 宣言→Statement 张力→Split...
     │
     ▼
[Step 3] 定页面类型 → 查 B 表联动组 ──── 品牌/数据/文档/模板 四套预设
     │  (padding+分隔+宽度+动画+网格+.cmp 一组选)
     │
     ▼
[Step 4] 字体落地（B2）───────────────── Playfair正式 / Georgia降级 / sans仅V6
     │
     ▼
[Step 5] token 命名（B3）─────────────── 意图别名默认 / 压缩仅高密度
     │
     ▼
[Step 6] 遗产清零核验 ────────────────── 无裸值/无Georgia落地/无渐变/深段不连续
     │
     ▼
  ✅ 范式内交付
```

---

## 附录：11 案例横向对比速查

| 案例 | Hero类型 | 标题字体(落地) | 底色 | padding | 分隔 | 宽度 | .cmp | nav | 深色段策略 |
|------|---------|---------------|------|---------|------|------|------|-----|-----------|
| **H061**(核心) | Statement分栏 | Playfair | #F5F3EF | 96px | 背景色 | 单一1120 | 无 | 无 | hero深右栏+绿段 |
| **H062**(核心) | Statement v2单栏 | Playfair | offwhite | 128px | .divider线 | padding控 | 无 | 左sidebar | 无连续深 |
| **R3数据中心**(核心) | Pulse深底 | Georgia(降级) | #2C2C2C深 | 80px | 背景色+发丝线 | 三档 | 有.cmp | 无 | 深Hero+深Elev+深Matrix(均隔开) |
| H042 | Reveal深底+Grille | Georgia(降级) | #FAFAF8 | 120px | 背景色 | 单一 | 无 | 无 | 深Hero+深Perf+深Sustain(均隔开) |
| H044 | Split左文右深块 | Georgia(降级) | #FAFAF8 | 96px | 背景色 | 三档 | 有cmp-lbl | 无 | 深Dualism+深Fifth+深Summary(均隔开) |
| H047 | Slide深浅可切 | 系统sans(V6) | #FAF9F6 | 128px | slide深浅切 | 1200max | 无 | 无 | 交替dark/light |
| H050 | Split/Economist | Georgia(降级) | #FAFAF8 | 80px | 背景色 | 三档 | 有sl标签 | 无 | 深Area段隔开 |
| H029 | diagonal斜切 | Georgia(降级) | #FAFAF8 | 120px | 背景色 | 单一1200 | 无 | 顶部nav | hero斜切深块 |
| H032 | diagonal斜切 | Georgia(降级) | #FAFAF8 | 120px | 背景色 | 单一1200 | 无 | 顶部nav | hero斜切深块 |
| H065 | Statement斜切 | 系统sans(降级) | #FAFAF8 | 120px | 背景色 | 单一 | 无 | fixed nav | 深Tension+深Stats(隔开) |
| H066 | Gallery Entrance | Georgia(降级) | #FAFAF8 | 80px | 背景色 | 三档 | 有cmp | 无 | hero浅+spotlight深 |

---

*阶段 3 · 范式边界文档 · 11 案例横向对比 · 源文件只读未改 · 2026-07-02*
