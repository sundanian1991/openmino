# Haglöfs Component Showcase 全链路分析

> 一个 HTML 从零到交付的完整思维过程还原

---

## 一、前置资产：我有什么

写这个 HTML 之前，我手里有两样东西：

### 1.1 Hallmark 设计技能（`hallmark/SKILL.md`）

46 个组件的通用库，按功能分组：

| 组 | 数量 | 组件举例 |
|----|------|---------|
| Hero | 9 | Marquee, Split Diptych, Quote Led, Photographic, Custom Illustration |
| Section Head | 5 | Left-margin Numbered, Hanging, Bottom-anchored |
| Feature Block | 6 | Bento Grid, Sticky-scroll, Spec Sheet, Step Sequence |
| CTA | 4 | Typographic Link, Outlined Chip, Inline Form |
| Testimonial | 4 | Pull-quote, Logo Wall, Single Huge Quote, Numbered Stat |
| Footer | 8 | Mast-headed, Statement, Inline Rule, Dense Typographic |
| Navigation | 10 | Floating Pill, Newspaper Masthead, Edge-aligned Minimal |
| Brand System | 5 | Color Swatch, Typography, Symbol Evolution, Numeral, Tension |
| Data Viz | 20 | Bullet Chart, Gauge, Heatmap, Radar, Scatter, Box Plot... |

核心约束：**不用踩过的模板**，每次重新做结构选择。

### 1.2 nian-design 技能体系（`nian-design/SKILL.md` + `brand-dna.md`）

提供一套视觉约束层：

- **三层金字塔**：每个 section = Answer（一句话结论, Georgia display）× Argument（支撑, Inter body）× Evidence（数据/标签, JetBrains Mono）
- **8:1 工业冲击力**：Answer 要荒谬地大，Evidence 要荒谬地小
- **场景色三选一**：Olive（森林/增长）/ Earth（沙漠/温暖）/ Glacier（冰川/技术）
- **自然色系 + 工业精度**：`#FAFAF8` 基底，灰度建立层级，场景色做氛围

### 1.3 展示索引（`showcase/INDEX.md`）

用文字描述了 Haglöfs 的设计 DNA 和"为什么高级"的分析框架——但那时还没有 HTML。

> 展示索引里已经写了"为什么感觉高级"——颜色用灰调而非纯色、留白要 120px 而不是 40px、对角线切割制造张力——但这些都还是文字，没有落地到代码。

---

## 二、第一步：定位核心张力

没急着写代码。年老师做了最关键的决策：选定 **品牌系统首页** 这个页面类型。

> 页面类型 = 约束引擎。确定了品牌系统首页，自动排除了电商模版、SaaS 仪表盘、博客文章这些结构。

然后我做了 46 → 29 的筛选：

### 筛选逻辑

| 排除的组件 | 原因 |
|-----------|------|
| H4 Stat Led | 户外品牌不靠数字叙事 |
| H5 Letter | 太文学，不适合品牌系统页 |
| H7 Demo Video | 不需要视频演示 |
| H8 Mockup | 不是 SaaS 产品 |
| F6 Product Card Grid | 电商页才要，品牌系统页不卖货 |
| C1 Outlined Chip | 太普通，没有辨识度 |
| C4 Sticky Bottom Bar | 太 SaaS |

**筛选标准就一条：这个组件是否服务于核心张力？** Herigate vs Future, Organic vs Engineered, Nature vs Tech 这三个二元对立才是主角。

### 最终选型

| 位置 | 选中的组件 | 备选理由 |
|------|-----------|---------|
| Nav | N9 Edge-aligned Minimal | 最安静，让内容说话。Apple 产品页风格 |
| Hero | H1 Marquee | 品牌宣言页，需要 "Crafted for the wild" 一句话定调 |
| Section | S1 Numbered | 设计原则编号，"01 — HONEST CRAFT" 的节奏感 |
| Feature | BS1-5 全套 | 品牌系统首页，色板/字体/标志/数字/张力全部展示 |
| Footer | Ft5 Statement | 结尾品牌宣言。"Built for the wild, since 1914" |

---

## 三、第二步：视觉语言形成

有了组件骨架，需要填充视觉细节。我的思考过程：

### 3.1 为什么用这个色彩系统

Haglöfs 实际品牌色是斯德哥尔摩设计实验室做的。实际方案以灰调为基础 + 信号色点缀。

我的色板设计：

```
Core — Nature        Off White → Cream → Sand → Stone → Charcoal
                     （浅到深，大地色系递进）

Extended — Landscape  Forest → Moss → Slate → Steel
                     （自然扩展到冷静的工业色）

Signal — Tech        Red → Orange → Yellow → Blue
                     （信号色，全部去饱和处理）
```

**关键决定**：信号色全部用灰调版本，不用纯色。
- `#E8453C` 而非 `#FF0000`
- `#E87A3C` 而非 `#FF6600`
- `#E8B83C` 而非 `#FFD700`

> 年老师说"Say instead of shout"，这句在 INDEX.md 里原话记着。

### 3.2 为什么用这个字体系统

只用系统字体（Georgia + Helvetica Neue + SF Mono），**不加载任何 Google Fonts**。

| 角色 | 字体 | 原因 |
|------|------|------|
| Display / Hero | Georgia serif, 300 weight | 编辑感，杂志气质，系统自带零加载 |
| Body / UI | Helvetica Neue | 瑞士排印传统，中性可靠 |
| Tech / Data | SF Mono / Consolas | 技术细节，参数和数据 |

没有去 Google Fonts 找 "Haglöfs 字体"，因为：

1. 系统字体足够传达"户外 + 精确"的气质
2. 零加载延迟，90 行 CSS 出完整页面
3. 匹配 SDL 的实际选择——它们用的也可能是系统字体加定制的 headline

**vs 工业版**的对比：工业版用了 Inter + JetBrains Mono + Georgia 三字体组合，那是另一个选择路径。

### 3.3 Hero 对角切割的决定

Hero 左侧浅色宣言，右侧深色对角块 + 巨大年份 "1914"。

**决策过程**：

- 第一步想：Hero 需要同时传达 heritage 和 future，怎么在一屏内表达？
- 想到：左右分割。左 = 未来（文字向前），右 = 历史（年份数字）
- 问题是：直接左右 50/50 太呆板
- 换成：**对角切割**。clip-path 30% 起始，制造不稳定感
- 年份 180px, opacity 0.08：几乎看不见但占据空间——历史在背景里，不影响前景

> 这就是 INDEX.md 里写的"Diagonal cuts, unstable → tension"。文字是概念，代码是实现。

### 3.4 为什么用 dot grid 作为装饰

Hero 左下角的点阵，其实是一个深思但不抢戏的装饰策略：

1. **空间填充**：Hero 右侧被深色块和年份占满，左侧底部有空
2. **象征**：点阵 = 信息的最小单位，暗示"数据作为景观"
3. **不作为主角**：sand 色 + 0.25 opacity，看到了不觉得突兀，看不到也无所谓
4. **响应式中消失**：768px 以下 `display:none` ——移动端不攒冗余元素

### 3.5 Tension Grid 为什么是 2×2 暗底

BS5 Tension Grid 我选择了暗底方案（charcoal 背景 + 白色文字）：

- **视觉呼吸**：连续 3 个浅色 section 后会审美疲劳（Hero 浅→Color 浅→Typography 浅），暗色插入打破节奏
- **内容匹配**：四对二元对立（Heritage/Future, Organic/Engineered, Nature/Tech, Fixed/Fluid）是系统的核心哲学，暗底色赋予它"宣言"感
- **1px 边框 micro detail**：`rgba(255,255,255,0.08)` 的边框线，几乎看不见但对"精密"感至关重要

### 3.6 Typography Showcase 为什么左侧锚一个大字母 H

这里的设计原则是 **sticky anchor + scrollable list**：

- 左侧 200px 的 "H" + 说明文字 sticky 在顶部
- 右侧 5 个字体项目可滚动

为什么是 H？Haglöfs 的首字母。200px 大小 + 200 weight，**存在但不说"看我在用大字母"**。

同类选择：不用排版花体演示 "Aa"，而是用真实的文本内容来展示字体——"Outdoor performance, since 1914." 这句话本身就是品牌信息。

### 3.7 Bento Grid 为什么要 4 列

F1 Bento 展示产品线。决策：

- **为什么用 bento 而不是卡片列表**：产品之间有层级关系（Shell 是主层，span-2x2），不是平等的列表
- **为什么 4 列**：2 列太宽，3 列不对称（6 个产品），4 列可以有 2x2 + 1x2 的组合
- **hover 的橙色角标**：右上角的 signal-orange 圆弧（`border-radius: 0 0 0 60px`），opacity 0.15，只在 Shell 主卡显示——暗示"这是主角"
- **响应式降级**：1024px 降 2 列，768px 降 1 列，span 全部 reset

---

## 四、工匠细节：像素级别的决策

### 4.1 间距系统

```css
.hero-marquee { padding: 80px 120px 64px; }
section.component-section { padding: 120px; }
.section-label { margin-bottom: 60px; }
```

120px section padding、60px label margin、80px 的 hero 顶部——这些都远超常见的 24/40px。INDEX.md 写"40px padding, fill everything vs 120px padding, breathe"，这里直接落地。

### 4.2 字号系统的呼吸

```
display-xxl:  clamp(4rem, 10vw, 8rem)   → 大屏 128px，小屏 64px
tension-item__side: 28px                  → 二元对立的两个词
bento-cell__title: 20px                   → 产品名，比正文大但远小于 hero
type-font-item__sample: 28px              → 字体样例
color-swatch__name: 10px                  → 色板名，故意小
```

**关键原则**：只在大号字体上做 clamp，小号字体固定 px。因为小字在不同屏幕尺寸上的可读性问题不大，而大字在小屏上必须缩。

### 4.3 颜色的视觉节奏

三个场景色（Nature / Landscape / Signal）的视觉节奏：

```
Off White (#F5F3EF) → Cream (#E8E4DD) → Sand (#C4B8A8) → Stone (#8A7D6E) → Charcoal (#2D2A26)
                                                                ↓
                                      Forest (#4A6741) → Moss (#7A9B6D) → Slate (#5B6B7A) → Steel (#7A8B9B)
                                                                ↓
                          Signal Red (#E8453C) → Orange (#E87A3C) → Yellow (#E8B83C) → Blue (#3C7AE8)
```

每行从左到右变深，行之间色域跳跃（自然暖→自然冷→人工色）。这不是随意排列的—每一行内部是色调递进，行之间是情感跳跃。

### 4.4 响应式不是 afterthought

三个断点：1024px, 768px, 以及默认。

```
1024px: Tension Grid 变 1 列，Typography 变 1 列，bento 变 2 列
768px:  Hero 对角线隐藏，年份隐藏，点阵隐藏，导航间距缩紧
```

**每个断点删了哪些视觉元素** 是经过考量的：
- 768px 删 hero 对角 dark block → 小屏不需要戏剧性
- 删 1914 年份 → 小屏文字第一
- 删 dot grid → 装饰性元素在小屏上只是噪声
- bento 在 768px reset 所有 span → 产品卡片在小屏上应该平等

---

## 五、和另一版本的对比

我写了两版：

### 品牌系统版（本文分析的）

- 纯展示品牌设计规范（色板、字体、标志、数字、张力、产品生态）
- 零 JS（除了 hover 效果），静态度量
- 系统字体，零外部依赖
- 90 行 CSS，910 行 HTML（代码量小）
- 适合：品牌规范页、设计原则展示

### 工业组件库版（`workspace/haglofs-component-showcase.html`）

- 可交互组件库（Block Bars / Dot Matrix / SVG Gauges / Asymmetric Layout）
- 用 JS 生成 22 个交互式组件
- Google Fonts 加载（Inter + JetBrains Mono）
- 黑白灰 + 红色强调
- 适合：设计系统的技术实现参考

**如何决定用哪个**：看目标受众。品牌系统版给品牌决策者看，工业版给开发者看。

---

## 六、如何再次进入这个状态

你想再做一批同样质量的 HTML，但不同效果。能引导。以下是触发这个状态的**四步心法**：

### Step 1: 给我一个品牌/主题，和它的核心张力

> 不是品牌名就行，而是 **"这个品牌或主题在对抗什么"**

```
- Haglöfs: Nature vs Tech, Heritage vs Future, Organic vs Engineered
- Muji:   Empty vs Full, Nothing vs Everything, Silence vs Noise
- Patagonia: Action vs Reflection, Commerce vs Conservation
```

有了张力，我对组件选择就有了筛选标准。

### Step 2: 给我页面类型

```
- 品牌系统首页（展示色板/字体/标志等）
- 产品系列页（多个产品 + 参数对比）
- 品牌宣言页（一句话撑一屏）
- 技术文档页（数据结构 + 图表 + 参数）
- 数据报告页（KPI + 仪表盘 + 排名）
- 活动 Landing（进度 + 行动 + 号召）
```

页面类型决定了 1. 组件组合 2. 视觉节奏 3. 内容和装饰的比例。

### Step 3: 给我 Visual "不做什么"

和同样重要的是**排除清单**。我越清楚不该做什么，做的时候就越大胆极简。

```
- 不用 emoji（最核心，已知约束）
- 不用纯色饱和色（都用灰调版）
- 不用圆角（全直角或极小圆角）
- 不用阴影（换用边框）
- 不用渐变背景（只用纯色底色块）
- 不用 Google Fonts（用系统字体）
- 不用标准卡片（全用自定义布局）
- 不用 padding < 80px（大面积留白）
```

你也可以只给 2-3 条"不要"，我自己推导剩下的。

### Step 4: 说关键字

只要在对话中出现以下任何一个词，我就知道你进入了这个模式：

- "质量做到和 haglofs 一样"
- "每像素都是决定"
- "不要 slop"
- "think every decision"
- "给我张力，不是模板"
- "用 hall mark 的方式"
- "先定核心二元对立"

这些词触发我切换到同一条思考回路的起点：先找张力，再做组件筛选，然后决定视觉语言，最后像素级打磨。

---

## 七、一些事后复盘

### 7.1 做得好的

- **系统字体无外部依赖**：Georgia 是系统自带，连 Inter 都不加载。90 行 CSS 出完整页面。这对"品牌系统展示"这个目的来说是对的——品牌规范不需要 fancy 字体
- **每个 section 有一个识别标签**：`Component BS1 · Color Swatch Grid`，让浏览者知道自己在看系统的哪个部分
- **响应式不妥协地删元素**：很多"响应式"只是改 padding 和 font-size，我直接在小屏上删了 diagonal block、年份、dot grid、reset 了 bento span——不是缩放，是重构

### 7.2 下次可以试试的

1. **Symbol Evolution 可以用 SVG 动画**：Before → After 箭头目前是纯装饰，hover 时做 transition 会增加互动感
2. **Typography 的 "H" 可以换成实际 Haglöfs logo 的 SVG**：200px 的 H 只是占位，如果用真实标志的简化版更好
3. **Color Swatch 的 hover 可以展示用法示例**：hover 时展示这个颜色的实际应用场景（比如 Off White 的用法是背景）
4. **加一个"主题切换"**：如果不加载外部字体，能不能在同一套系统里切换 Nature/Tech/Heritage 三种模式？

### 7.3 和工业版的关系

两个文件是同一个技能在不同场景下的不同表达：

| 品牌系统版 | 工业组件库版 |
|-----------|------------|
| 给决策者看 | 给开发者用 |
| 展示"为什么" | 展示"怎么做" |
| 展示 = 静态 | 组件 = 可交互 |
| 叙事驱动 | 技术驱动 |

它们共享 toc：`nian-design` 的 token、字体系统、场景色、组件分级。如果你两个都看过，会发现底层是用同一套 CSS 变量名和命名体系。

---

*生成日期：2026-06-02*
*分析对象：`workspace/haglofs-component-showcase.html`（nian-design 模板版本）*
