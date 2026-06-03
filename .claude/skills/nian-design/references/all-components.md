# Haglofs 品牌设计系统 - 组件规范大全

> 82 个组件条目，7 个分类（A-G），每个组件包含编号、Hallmark 映射、含义、HTML、CSS。
> Hallmark 入选 29 个 + 排除 13 个 + Hallmark 基础/通用 5 个 + 原有实现基础组件 35 个。

---

## 分类总览

| 编号 | 名称 | 组件数 | 说明 |
|------|------|:------:|------|
| A | Hero | 9 | 品牌宣言/全屏影像/引言/插画/装饰背景/点阵字形 |
| B | Section | 7 | 标题/编号/悬挂/锚定/装饰编号/渐变分隔 |
| C | Feature | 24 | Bento网格/规格表/步骤/产品卡/选项卡/折叠/对比/流程/注释/详情面板 |
| D | CTA & Proof | 19 | 按钮/链接/引言/Logo墙/统计条/标签/进度条/仪表/迷你图/数据聚焦 |
| E | Footer | 7 | 品牌签名/版权/致谢/宣言/代码块/输入/开关 |
| F | Navigation | 7 | 导航栏/浮动/报头/终端 |
| G | Brand System | 9 | 色板/字体/标志/数字/张力网格/色板卡/原则对比/规则对比 |

---

## A类 · Hero（9个）

---

### A1 · Marquee（H1 - 入选）

> 变体旋钮：display:xxl/xl · alignment:left/center · rule:none/above/below · surface:dark/light

**含义**：品牌宣言 Hero，大字号宣言文字居中或左对齐。用途：活动首发、品牌宣言、大促开屏。

**HTML**:

```html
<section class="hero-marquee">
  <div class="hero-marquee__inner">
    <span class="hero-marquee__label">EST. 1914 / STOCKHOLM</span>
    <h1 class="hero-marquee__statement">Crafted for the Wild</h1>
    <p class="hero-marquee__sub">111 年瑞典户外基因，为真正的荒野而造。</p>
  </div>
</section>
```

**CSS**:

```css
.hero-marquee {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: var(--space-4xl) var(--container-padding);
}
.hero-marquee__inner {
  max-width: var(--container-max);
  text-align: center;
}
.hero-marquee__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
  display: block;
}
.hero-marquee__statement {
  font-family: Georgia, serif;
  font-size: var(--display-2xl);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1.0;
  letter-spacing: -0.03em;
  margin: 0 0 var(--space-lg) 0;
}
.hero-marquee__sub {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-lg);
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 520px;
  margin: 0 auto;
}
```

**实现映射**：components.md #20 DECORATIVE NUMBER HEADER（变体）+ #2 Brand Statement Card。

---

### A2 · Split Diptych（H2 - 入选）

> 变体旋钮：ratio:7/5 - 6/6 - 5/7 · right:photo/proof/pull-quote · divider:hairline/space/rule

**含义**：产品+风景对屏布局。左边产品细节，右边北欧山地摄影。品牌系统核心展示形式。

**HTML**:

```html
<section class="diptych">
  <div class="diptych__left">
    <span class="diptych__label">FW25 COLLECTION</span>
    <h2 class="diptych__title">L.I.M Comp</h2>
    <p class="diptych__desc">Gore-Tex Pro 80D 壳层冲锋衣。28,000mm 防水等级，485g 极致轻量。</p>
    <div class="diptych__specs">
      <div class="spec-row">
        <span class="sl">WEIGHT</span><span class="sv">485g</span>
      </div>
      <div class="spec-row">
        <span class="sl">WATERPROOF</span><span class="sv">28,000mm</span>
      </div>
      <div class="spec-row">
        <span class="sl">MATERIAL</span><span class="sv">Gore-Tex Pro 80D</span>
      </div>
    </div>
  </div>
  <div class="diptych__right">
    <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop" alt="Nordic mountain landscape" class="diptych__img">
  </div>
</section>
```

**CSS**:

```css
.diptych {
  display: grid;
  grid-template-columns: 7fr 5fr;
  min-height: 600px;
  background: var(--bg);
}
.diptych__left {
  padding: var(--space-4xl) var(--space-2xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--border);
}
.diptych__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}
.diptych__title {
  font-family: Georgia, serif;
  font-size: var(--display-lg);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1.15;
  margin: 0 0 var(--space-md) 0;
}
.diptych__desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--body);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-xl) 0;
}
.diptych__specs {
  display: flex;
  flex-direction: column;
}
.diptych__right {
  overflow: hidden;
}
.diptych__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**实现映射**：components.md #9 SCENE OVERLAY（核心）+ #3 SPEC TABLE（左侧面板）。

---

### A3 · Quote Led（H3 - 入选）

> 变体旋钮：weight:italic/roman · attribution:under/margin/right · length:short/long

**含义**：创始人引言页。以大段引言为主视觉，配合出处标注。适合品牌宣言页。

**HTML**:

```html
<section class="hero-quote">
  <div class="hero-quote__inner">
    <span class="hero-quote__mark">&ldquo;</span>
    <blockquote class="hero-quote__text">
      Nature does not hurry, yet everything is accomplished. We build gear the same way.
    </blockquote>
    <cite class="hero-quote__cite">
      <span class="hero-quote__author">ALFRED HAGLOFS</span>
      <span class="hero-quote__year">FOUNDER, 1914</span>
    </cite>
  </div>
</section>
```

**CSS**:

```css
.hero-quote {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: var(--space-4xl) var(--container-padding);
}
.hero-quote__inner {
  max-width: 720px;
  text-align: center;
  position: relative;
}
.hero-quote__mark {
  font-family: Georgia, serif;
  font-size: 120px;
  color: var(--text-display);
  opacity: 0.06;
  line-height: 0.6;
  display: block;
  margin-bottom: var(--space-lg);
  user-select: none;
}
.hero-quote__text {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 400;
  font-style: italic;
  color: var(--text-display);
  line-height: 1.4;
  margin: 0;
  padding: 0;
  border: none;
}
.hero-quote__cite {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: var(--space-xl);
  font-style: normal;
}
.hero-quote__author {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.hero-quote__year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--text-disabled);
}
```

**实现映射**：components.md #40 BLOCKQUOTE/PULL-QUOTE（放大为 Hero 级别）。

---

### A4 · ~~Stat Led~~（H4 - 排除）

> 变体旋钮：number:display/inline · unit:below/right · context:below/side

**含义**：以大数据指标为视觉焦点的 Hero。户外品牌不靠数字叙事，因此排除。

**HTML**:

```html
<section class="hero-stat">
  <div class="hero-stat__inner">
    <span class="hero-stat__label">ACTIVE SUPPLIERS</span>
    <div class="hero-stat__number">24</div>
    <div class="hero-stat__context">覆盖 6 条产线，横跨 3 大洲</div>
  </div>
</section>
```

**CSS**:

```css
.hero-stat {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-alt);
  padding: var(--space-4xl) var(--container-padding);
}
.hero-stat__inner {
  text-align: center;
}
.hero-stat__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  display: block;
  margin-bottom: var(--space-md);
}
.hero-stat__number {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--display-2xl);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1;
}
.hero-stat__context {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-lg);
  color: var(--text-secondary);
  margin-top: var(--space-lg);
}
```

---

### A5 · ~~Letter~~（H5 - 排除）

> 变体旋钮：font:serif/mono · width:40ch/56ch/72ch · signature:yes/no

**含义**：以信件格式呈现的品牌通讯。太文学化，不适合 Haglofs 户外品牌系统。

**HTML**:

```html
<section class="hero-letter">
  <div class="hero-letter__paper">
    <div class="hero-letter__date">May 2026</div>
    <div class="hero-letter__greeting">Dear Explorer,</div>
    <p class="hero-letter__body">
      This season, we return to the mountains that shaped us. The L.I.M collection represents
      our relentless pursuit of lightweight durability — gear that disappears in your pack
      but performs when the weather turns.
    </p>
    <div class="hero-letter__sign">
      <span class="hero-letter__name">The Haglofs Team</span>
      <span class="hero-letter__from">Stockholm, Sweden</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.hero-letter {
  display: flex;
  justify-content: center;
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.hero-letter__paper {
  max-width: 560px;
  font-family: Georgia, serif;
  font-size: var(--body-lg);
  color: var(--text-primary);
  line-height: 1.7;
}
.hero-letter__date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--text-disabled);
  margin-bottom: var(--space-xl);
}
.hero-letter__greeting {
  font-size: var(--body-lg);
  font-weight: 500;
  margin-bottom: var(--space-md);
}
.hero-letter__body { margin: 0 0 var(--space-xl) 0; }
.hero-letter__sign {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hero-letter__name { font-weight: 600; }
.hero-letter__from {
  font-size: var(--body-sm);
  color: var(--text-secondary);
}
```

---

### A6 · Photographic（H6 - 入选）

> 变体旋钮：area:full-bleed/16/7/4/3/1:1 · caption:lower-left/upper-right/margin

**含义**：季节系列首图。全屏瑞典自然风光，文字叠加在影像之上。品牌系统最高优先级组件之一。

**HTML**:

```html
<section class="hero-photo">
  <img class="hero-photo__img" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop" alt="Swedish wilderness landscape">
  <div class="hero-photo__overlay"></div>
  <div class="hero-photo__content">
    <span class="hero-photo__tag">FW25 COLLECTION</span>
    <h1 class="hero-photo__title">Built for the Nordic Winter</h1>
    <p class="hero-photo__sub">在零下 30 度的斯堪的纳维亚半岛，每一克重量都关乎生死。</p>
  </div>
  <div class="hero-photo__caption">
    <span class="hero-photo__credit">Photo: Abisko National Park, Sweden</span>
  </div>
</section>
```

**CSS**:

```css
.hero-photo {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}
.hero-photo__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.hero-photo__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(45, 42, 38, 0.1) 0%,
    rgba(45, 42, 38, 0.5) 100%
  );
}
.hero-photo__content {
  position: relative;
  z-index: 1;
  padding: var(--space-4xl) var(--container-padding);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100vh;
  max-width: var(--container-max);
  margin: 0 auto;
}
.hero-photo__tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: var(--space-md);
}
.hero-photo__title {
  font-family: Georgia, serif;
  font-size: var(--display-xl);
  font-weight: 700;
  color: #fff;
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 var(--space-md) 0;
  max-width: 600px;
}
.hero-photo__sub {
  font-family: 'Inter', sans-serif;
  font-size: var(--body);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  max-width: 480px;
  margin: 0;
}
.hero-photo__caption {
  position: absolute;
  bottom: var(--space-lg);
  right: var(--space-lg);
  z-index: 1;
}
.hero-photo__credit {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
}
```

**实现映射**：components.md #9 SCENE OVERLAY（Hero 级别全屏变体）。

---

### A7 · Custom Illustration（H9 - 入选）

> 变体旋钮：build:CSS-art/SVG · animation:none/loop · scale:small/dominant

**含义**：品牌标志 SVG、户外符号（山峰/指南针/等高线）。点阵字形渲染，技术感与手工感并存。

**HTML**:

```html
<section class="hero-illustration">
  <div class="hero-illustration__inner">
    <div class="hero-illustration__glyph" data-char="H">
      <!-- Dot-matrix H: 5x7 grid -->
      <div class="cell on"></div><div class="cell on"></div><div class="cell on"></div><div class="cell on"></div><div class="cell on"></div>
      <div class="cell on"></div><div class="cell off"></div><div class="cell off"></div><div class="cell off"></div><div class="cell on"></div>
      <div class="cell on"></div><div class="cell on"></div><div class="cell on"></div><div class="cell off"></div><div class="cell on"></div>
      <div class="cell on"></div><div class="cell on"></div><div class="cell on"></div><div class="cell on"></div><div class="cell on"></div>
      <div class="cell on"></div><div class="cell on"></div><div class="cell on"></div><div class="cell off"></div><div class="cell on"></div>
      <div class="cell on"></div><div class="cell off"></div><div class="cell off"></div><div class="cell off"></div><div class="cell on"></div>
      <div class="cell on"></div><div class="cell on"></div><div class="cell on"></div><div class="cell on"></div><div class="cell on"></div>
    </div>
    <div class="hero-illustration__label">HAGLOFS DOT-MATRIX</div>
    <p class="hero-illustration__desc">每个字符由物理点阵构成。技术精度与手工温度的交汇。</p>
  </div>
</section>
```

**CSS**:

```css
.hero-illustration {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: var(--space-4xl) var(--container-padding);
}
.hero-illustration__inner {
  text-align: center;
}
.hero-illustration__glyph {
  display: grid;
  grid-template-columns: repeat(5, 16px);
  grid-template-rows: repeat(7, 16px);
  gap: 5px;
  margin: 0 auto var(--space-xl);
}
.hero-illustration__glyph .cell {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
.hero-illustration__glyph .cell.on { background: var(--text-display); }
.hero-illustration__glyph .cell.off { background: transparent; }
.hero-illustration__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
}
.hero-illustration__desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-sm);
  color: var(--text-disabled);
  max-width: 400px;
  margin: 0 auto;
}
```

**实现映射**：components.md #31 DOT-MATRIX GLYPH + #6 DOT-MATRIX LOGO。

---

### A8 · Decorative Background Number（实现 #30 · 基础组件）

**含义**：纯装饰背景数字/文字。120px+ Georgia/JetBrains Mono，5-6% 透明度，绝对定位，部分溢出屏幕。增加深度但不承载内容。

**HTML**:

```html
<span class="deco-bg">01</span>
```

**CSS**:

```css
.deco-bg {
  position: absolute;
  top: -20px; right: -10px;
  font-family: Georgia, serif;
  font-size: 120px;
  font-weight: 700;
  color: var(--text-display);
  opacity: 0.05;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
```

**约束**：每个主要区块最多一个。可以是数字（01, 02）、品牌首字母（H）或关键词（NATURE）。不可与前景内容竞争。

---

### A9 · Dot-Matrix Glyph（实现 #31 · 基础组件）

**含义**：前景点阵字符渲染。CSS grid 5x7 字符阵列，4px 圆角单元 3px 间距。区别于装饰背景数字——这是 Hero 元素，不是水印。

**HTML**:

```html
<div class="dm-glyph" data-char="H">
  <!-- JS-generated: 5×7 grid of .cell.on/.cell.off -->
</div>
```

**CSS**:

```css
.dm-glyph {
  display: grid;
  grid-template-columns: repeat(5, var(--dm-dot, 6px));
  grid-template-rows: repeat(7, var(--dm-dot, 6px));
  gap: var(--dm-gap, 3px);
}
.dm-glyph .cell {
  width: var(--dm-dot, 6px);
  height: var(--dm-dot, 6px);
  border-radius: 50%;
}
.dm-glyph .cell.on { background: var(--text-display); }
.dm-glyph .cell.off { background: transparent; }
```

**尺寸变体**：`--dm-dot: 4px`（内联）/ `6px`（标准）/ `10px`（Hero）/ `16px`（展示）。

**点状态指示器变体**：一行填充圆点用于内联评分显示（5 点 = 5/5）。比分段块条更细粒度。

```html
<span class="dot-rating">
  <span class="dr-dot on"></span><span class="dr-dot on"></span>
  <span class="dr-dot on"></span><span class="dr-dot on"></span>
  <span class="dr-dot"></span>
</span>
```

```css
.dot-rating { display: inline-flex; gap: 3px; }
.dr-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--border); }
.dr-dot.on { background: var(--text-display); }
```

---

## B类 · Section（7个）

---

### B1 · Left-margin Numbered（S1 - 入选）

> 变体旋钮：label:01/02/03 · width:narrow/medium

**含义**：设计原则编号。左侧大号装饰数字 + 右侧标题/正文。Haglofs 核心章节标题形式。

**HTML**:

```html
<section class="section-numbered">
  <div class="section-numbered__inner">
    <span class="section-numbered__num">01</span>
    <span class="section-numbered__label sl">DESIGN PRINCIPLE</span>
    <h2 class="section-numbered__title">Honest Craft</h2>
    <p class="section-numbered__desc">每一个缝线、每一个拉链都有存在的理由。我们不装饰，我们解决问题。</p>
  </div>
</section>
```

**CSS**:

```css
.section-numbered {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.section-numbered__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  position: relative;
  padding-left: 120px;
}
.section-numbered__num {
  position: absolute;
  left: 0;
  top: -16px;
  font-family: Georgia, serif;
  font-size: 96px;
  font-weight: 700;
  color: var(--text-display);
  opacity: 0.06;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.section-numbered__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  display: block;
  margin-bottom: var(--space-sm);
}
.section-numbered__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1.2;
  margin: 0 0 var(--space-md) 0;
}
.section-numbered__desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--body);
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 560px;
  margin: 0;
}
```

**实现映射**：components.md #20 DECORATIVE NUMBER HEADER。

---

### B2 · Hanging（S2 - 入选）

> 变体旋钮：padding:large/medium · alignment:left/center

**含义**：章节过渡。quiet energy，留白呼吸感。没有装饰，纯文字的安静章节分隔。

**HTML**:

```html
<section class="section-hanging">
  <div class="section-hanging__inner">
    <span class="section-hanging__label sl">COLLECTION</span>
    <h2 class="section-hanging__title">Insulation Layer</h2>
  </div>
</section>
```

**CSS**:

```css
.section-hanging {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.section-hanging__inner {
  max-width: var(--container-max);
  margin: 0 auto;
}
.section-hanging__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-disabled);
  display: block;
  margin-bottom: var(--space-sm);
}
.section-hanging__title {
  font-family: Georgia, serif;
  font-size: var(--display-lg);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1.15;
  margin: 0;
}
```

**实现映射**：无直接对应，基于 S2 Hallmark 描述新建。

---

### B3 · ~~Sticky~~（S3 - 排除）

> 变体旋钮：position:left/right · offset:80/120 · alignment:top/center

**含义**：粘性定位的章节标题，滚动时固定在视口一侧。Haglofs 不需要粘性效果。

**HTML**:

```html
<section class="section-sticky">
  <div class="section-sticky__rail">
    <span class="section-sticky__num">02</span>
    <h2 class="section-sticky__title">Technology</h2>
  </div>
  <div class="section-sticky__content">
    <p>Content scrolls while the title stays fixed on the left.</p>
  </div>
</section>
```

**CSS**:

```css
.section-sticky {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--space-2xl);
  padding: var(--space-4xl) var(--container-padding);
}
.section-sticky__rail {
  position: sticky;
  top: 80px;
  align-self: start;
}
.section-sticky__num {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  letter-spacing: 0.1em;
  color: var(--text-disabled);
  display: block;
  margin-bottom: var(--space-sm);
}
.section-sticky__title {
  font-family: Georgia, serif;
  font-size: var(--heading-lg);
  font-weight: 700;
  color: var(--text-display);
  margin: 0;
}
```

---

### B4 · ~~Inline~~（S4 - 排除）

> 变体旋钮：weight:bold/medium · size:body-lg/body · color:display/primary

**含义**：嵌入段落中的章节标题，与正文同行。太隐晦，不适合品牌系统。

**HTML**:

```html
<p class="section-inline">
  <strong class="section-inline__mark">Materials.</strong>
  Gore-Tex Pro shell with DWR finish. Breathable, waterproof, and built to endure.
</p>
```

**CSS**:

```css
.section-inline {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-lg);
  color: var(--text-primary);
  line-height: 1.6;
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--border);
}
.section-inline__mark {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
}
```

---

### B5 · Bottom-anchored（S5 - 入选）

> 变体旋钮：label:end-of-N/section-name

**含义**：反转层级。产品描述后跟底部标签，如 "END OF SHELL COLLECTION"。优雅的章节收尾。

**HTML**:

```html
<section class="section-bottom">
  <div class="section-bottom__content">
    <h2 class="section-bottom__title">Shell Collection</h2>
    <p class="section-bottom__desc">从轻量竞速到极地探险，Shell 系列覆盖所有户外场景。</p>
  </div>
  <div class="section-bottom__anchor">
    <span class="section-bottom__line"></span>
    <span class="section-bottom__label">END OF SHELL COLLECTION</span>
  </div>
</section>
```

**CSS**:

```css
.section-bottom {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.section-bottom__content {
  max-width: var(--container-max);
  margin: 0 auto var(--space-4xl);
}
.section-bottom__title {
  font-family: Georgia, serif;
  font-size: var(--display-lg);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1.15;
  margin: 0 0 var(--space-md) 0;
}
.section-bottom__desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--body);
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 560px;
  margin: 0;
}
.section-bottom__anchor {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.section-bottom__line {
  flex: 1;
  height: 1px;
  background: var(--border);
}
.section-bottom__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-disabled);
  white-space: nowrap;
}
```

**实现映射**：components.md #19 SEAM DIVIDER（变体，带文字标签）。

---

### B6 · Decorative Number Header（实现 #20 · 基础组件）

**含义**：超大半透明 Georgia 数字 + 前景章节标题。大气层次——数字不承载信息，只有视觉重量。区别于 B1（左对齐编号），这里是大数字在右上角。

**HTML**:

```html
<div class="deco-header">
  <span class="deco-header__num">01</span>
  <span class="deco-header__label sl">MATERIAL</span>
  <h2 class="deco-header__title" data-edit>Gore-Tex Pro Shell</h2>
</div>
```

**CSS**:

```css
.deco-header {
  position: relative;
  padding: 32px 24px 24px;
  overflow: hidden;
}
.deco-header__num {
  position: absolute;
  top: -24px;
  right: -12px;
  font-family: Georgia, serif;
  font-size: 120px;
  font-weight: 700;
  color: var(--text-display);
  opacity: 0.05;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.deco-header__label { display: block; margin-bottom: 4px; }
.deco-header__title {
  font-family: Georgia, serif;
  font-size: var(--heading-lg);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1.3;
}
```

**Hero 变体**：`.deco-header__num` 设为 160px，0.08 透明度。每页最多一个。

---

### B7 · Seam Divider（实现 #19 · 基础组件）

**含义**：渐变淡入淡出分隔线。1px 水平线配渐变遮罩——透明 → 边框色 → 透明。替代生硬边框的柔和视觉分隔。

**HTML**:

```html
<div class="seam-divider"></div>
```

**CSS**:

```css
.seam-divider {
  height: 1px;
  background: var(--border-strong);
  mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
}
```

---

## C类 · Feature（24个）

---

### C1 · Bento Grid（F1 - 入选）

> 变体旋钮：tiles:4/6/7/9 · spans:regular/irregular/mosaic · border:hairline/accent/none

**含义**：产品线展示。Shell / Insulation / Base Layer / Accessories 混排，不规则网格。

**HTML**:

```html
<section class="bento">
  <div class="bento__grid">
    <div class="bento__tile bento__tile--large">
      <div class="bento__tile-body">
        <span class="sl">SHELL</span>
        <h3 class="bento__tile-title">L.I.M Comp</h3>
        <span class="bento__tile-meta">485g / Gore-Tex Pro</span>
      </div>
    </div>
    <div class="bento__tile">
      <div class="bento__tile-body">
        <span class="sl">INSULATION</span>
        <h3 class="bento__tile-title">Frost Jacket</h3>
        <span class="bento__tile-meta">380g / PrimaLoft</span>
      </div>
    </div>
    <div class="bento__tile">
      <div class="bento__tile-body">
        <span class="sl">BASE LAYER</span>
        <h3 class="bento__tile-title">Merino Grid</h3>
        <span class="bento__tile-meta">180g / Merino Wool</span>
      </div>
    </div>
    <div class="bento__tile bento__tile--wide">
      <div class="bento__tile-body">
        <span class="sl">ACCESSORIES</span>
        <h3 class="bento__tile-title">Hats, Gloves & Packs</h3>
        <span class="bento__tile-meta">Complete the system</span>
      </div>
    </div>
  </div>
</section>
```

**CSS**:

```css
.bento {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.bento__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: var(--space-md);
}
.bento__tile {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.bento__tile--large {
  grid-column: span 2;
  grid-row: span 2;
}
.bento__tile--wide {
  grid-column: span 2;
}
.bento__tile-body {
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  flex: 1;
  justify-content: flex-end;
}
.bento__tile-title {
  font-family: Georgia, serif;
  font-size: var(--heading-lg);
  font-weight: 700;
  color: var(--text-display);
  margin: 0;
}
.bento__tile-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--text-disabled);
}
```

**实现映射**：components.md #12 THREE-COLUMN GRID（扩展为 Bento 变体）。

---

### C2 · Sticky-scroll Stack（F2 - 入选）

> 变体旋钮：pinned:left/right · right:photo/spec/diagram · steps:3/4/5

**含义**：产品详情页。左侧面料/功能描述固定，右侧多层穿搭图滚动。技术感与叙事感并重。

**HTML**:

```html
<section class="sticky-stack">
  <div class="sticky-stack__pinned">
    <span class="sl">TECHNOLOGY</span>
    <h2 class="sticky-stack__title">Gore-Tex Pro Shell</h2>
    <p class="sticky-stack__desc">3 层结构，28,000mm 防水等级。每平方英寸承载 90 亿个微孔。</p>
    <div class="sticky-stack__specs">
      <div class="spec-row">
        <span class="sl">SHELL</span><span class="sv">80D Nylon</span>
      </div>
      <div class="spec-row">
        <span class="sl">MEMBRANE</span><span class="sv">ePTFE</span>
      </div>
      <div class="spec-row">
        <span class="sl">BACKER</span><span class="sv">Micro Grid</span>
      </div>
    </div>
  </div>
  <div class="sticky-stack__scroll">
    <div class="sticky-stack__step">
      <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=400&fit=crop" alt="Layer 1" class="sticky-stack__img">
      <span class="sticky-stack__step-label">LAYER 1: SHELL</span>
    </div>
    <div class="sticky-stack__step">
      <img src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&h=400&fit=crop" alt="Layer 2" class="sticky-stack__img">
      <span class="sticky-stack__step-label">LAYER 2: INSULATION</span>
    </div>
    <div class="sticky-stack__step">
      <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop" alt="Layer 3" class="sticky-stack__img">
      <span class="sticky-stack__step-label">LAYER 3: BASE</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.sticky-stack {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  padding: var(--space-4xl) var(--container-padding);
  max-width: var(--container-max);
  margin: 0 auto;
}
.sticky-stack__pinned {
  position: sticky;
  top: 80px;
  align-self: start;
}
.sticky-stack__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 var(--space-md) 0;
}
.sticky-stack__desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--body);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-xl) 0;
}
.sticky-stack__specs { display: flex; flex-direction: column; }
.sticky-stack__scroll {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xl);
}
.sticky-stack__step { position: relative; }
.sticky-stack__img {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
}
.sticky-stack__step-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-disabled);
  display: block;
  margin-top: var(--space-sm);
}
```

**实现映射**：components.md #9 SCENE OVERLAY（右侧视觉）+ #3 SPEC TABLE（左侧规格）。

---

### C3 · Tabular Spec Sheet（F3 - 入选）

> 变体旋钮：columns:2/3/4 · rule:every-row/groups/headers · nums:tabular/proportional

**含义**：技术参数表。防水等级、透气率、重量、面料成分。Haglofs 最重要的功能组件。

**HTML**:

```html
<section class="spec-sheet">
  <div class="spec-sheet__header">
    <span class="sl">TECHNICAL SPECIFICATIONS</span>
    <h3 class="spec-sheet__title">L.I.M Comp</h3>
  </div>
  <div class="spec-sheet__grid">
    <div class="spec-sheet__group">
      <span class="spec-sheet__group-label">MATERIAL</span>
      <div class="spec-row">
        <span class="sl">SHELL</span><span class="sv">Gore-Tex Pro 80D</span>
      </div>
      <div class="spec-row">
        <span class="sl">LINING</span><span class="sv">Micro Grid Backer</span>
      </div>
      <div class="spec-row">
        <span class="sl">DWR</span><span class="sv">PFC-free</span>
      </div>
    </div>
    <div class="spec-sheet__group">
      <span class="spec-sheet__group-label">PERFORMANCE</span>
      <div class="spec-row">
        <span class="sl">WATERPROOF</span><span class="sv">28,000mm</span>
      </div>
      <div class="spec-row">
        <span class="sl">BREATHABILITY</span><span class="sv">25,000g/m2/24h</span>
      </div>
      <div class="spec-row">
        <span class="sl">WEIGHT</span><span class="sv">485g (L)</span>
      </div>
    </div>
  </div>
</section>
```

**CSS**:

```css
.spec-sheet {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.spec-sheet__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.spec-sheet__title {
  font-family: Georgia, serif;
  font-size: var(--heading-lg);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 0 0;
}
.spec-sheet__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
}
.spec-sheet__group {
  display: flex;
  flex-direction: column;
}
.spec-sheet__group-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-disabled);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--space-xs);
}
```

**实现映射**：components.md #3 SPEC TABLE（扩展为分组规格表）。

---

### C4 · Step Sequence（F4 - 入选）

> 变体旋钮：numbering:I/II/III/01/02/03/1.0/2.0/3.0 · layout:vertical/horizontal/diagonal

**含义**：品牌原则序列。Honest Craft -> Earned Simplicity -> Nature's Contrast。流程/步骤展示。

**HTML**:

```html
<section class="step-seq">
  <div class="step-seq__header">
    <span class="sl">PROCESS</span>
    <h2 class="step-seq__title">Supplier Lifecycle</h2>
  </div>
  <div class="flow-pipeline">
    <div class="flow-stage flow-stage--done">
      <span class="flow-label sl">STAGE ONE</span>
      <span class="flow-value">准入审核</span>
    </div>
    <span class="flow-arrow">&rsaquo;</span>
    <div class="flow-stage flow-stage--active">
      <span class="flow-label sl">STAGE TWO</span>
      <span class="flow-value">分工协作</span>
    </div>
    <span class="flow-arrow">&rsaquo;</span>
    <div class="flow-stage">
      <span class="flow-label sl">STAGE THREE</span>
      <span class="flow-value">运营管理</span>
    </div>
    <span class="flow-arrow">&rsaquo;</span>
    <div class="flow-stage">
      <span class="flow-label sl">STAGE FOUR</span>
      <span class="flow-value">绩效评估</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.step-seq {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.step-seq__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.step-seq__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 0 0;
}
.flow-pipeline {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0;
  padding: var(--space-md) 0;
}
.flow-stage {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
}
.flow-value {
  font-family: Georgia, serif;
  font-size: var(--body);
  color: var(--text-secondary);
}
.flow-stage--active .flow-value {
  color: var(--text-display);
  font-weight: 600;
}
.flow-stage--done .flow-value {
  color: var(--success);
}
.flow-arrow {
  font-size: 18px;
  color: var(--text-disabled);
  padding: 0 var(--space-xs);
  line-height: 1;
}
```

**实现映射**：components.md #22 FLOW PIPELINE + #35 TIMELINE/ERA CONNECTOR。

---

### C5 · Annotated Screenshot（F5 - 入选）

> 变体旋钮：callouts:pins/labels/arrows · frame:device/plain/floating

**含义**：产品细节标注。拉链、缝线、面料层的指针说明。

**HTML**:

```html
<section class="annotated">
  <div class="annotated__header">
    <span class="sl">DETAIL VIEW</span>
    <h2 class="annotated__title">Construction Details</h2>
  </div>
  <div class="annotated__frame">
    <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop" alt="Jacket detail" class="annotated__img">
    <div class="annotated__pin" style="top:25%;left:30%;">
      <span class="annotated__pin-dot"></span>
      <span class="annotated__pin-label">YKK AquaGuard Zipper</span>
    </div>
    <div class="annotated__pin" style="top:50%;left:65%;">
      <span class="annotated__pin-dot"></span>
      <span class="annotated__pin-label">Seam-sealed 3-layer construction</span>
    </div>
    <div class="annotated__pin" style="top:70%;left:40%;">
      <span class="annotated__pin-dot"></span>
      <span class="annotated__pin-label">Articulated hood with wired brim</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.annotated {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.annotated__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.annotated__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 0 0;
}
.annotated__frame {
  max-width: var(--container-max);
  margin: 0 auto;
  position: relative;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.annotated__img {
  width: 100%;
  display: block;
}
.annotated__pin {
  position: absolute;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
.annotated__pin-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand-primary);
  border: 2px solid var(--surface);
  flex-shrink: 0;
}
.annotated__pin-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 4px 8px;
  white-space: nowrap;
}
```

**实现映射**：components.md #27 DETAIL PANEL（变体，行内标注模式）。

---

### C6 · ~~Product Card Grid~~（F6 - 排除）

> 变体旋钮：layout:grid/list · columns:2/3/4 · card:image-top/left/none

**含义**：产品卡片网格。电商页用，品牌系统页不用。

**HTML**:

```html
<section class="product-grid">
  <div class="product-grid__items">
    <div class="product-card">
      <div class="product-card__image">
        <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop" alt="L.I.M Comp">
      </div>
      <div class="product-card__body">
        <span class="product-name">L.I.M Comp</span>
        <span class="tag">Shell Jacket</span>
        <div class="product-card__specs">
          <span class="sl">Weight</span><span class="sv">485g</span>
          <span class="sl">Waterproof</span><span class="sv">28,000mm</span>
        </div>
      </div>
    </div>
    <div class="product-card">
      <div class="product-card__image">
        <img src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=400&h=300&fit=crop" alt="Frost Jacket">
      </div>
      <div class="product-card__body">
        <span class="product-name">Frost Jacket</span>
        <span class="tag">Insulation</span>
        <div class="product-card__specs">
          <span class="sl">Weight</span><span class="sv">380g</span>
          <span class="sl">Fill</span><span class="sv">PrimaLoft</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS**:

```css
.product-grid {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.product-grid__items {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}
.product-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.product-card__image {
  aspect-ratio: 4/3;
  background: var(--surface-alt);
  overflow: hidden;
}
.product-card__image img { width: 100%; height: 100%; object-fit: cover; }
.product-card__body {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.product-name {
  font-family: Georgia, serif;
  font-size: var(--heading-lg);
  font-weight: 700;
  color: var(--text-display);
}
.product-card__specs {
  display: flex;
  gap: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border);
}
```

**实现映射**：components.md #1 PRODUCT CARD + #14 APPLICATION CARD。

---

### C7 · Three-Column Grid（#12 基础布局）

**含义**：非对称三列布局。3:2:1 重量分配，用于产品对比或特性展示。基础布局组件。

**HTML**:

```html
<section class="three-col-section">
  <div class="three-col">
    <div class="three-col__primary">
      <span class="sl">PRIMARY</span>
      <h3 class="three-col__title">Shell Layer</h3>
      <p class="three-col__desc">Gore-Tex Pro 80D，28,000mm 防水。全天候防护的核心层。</p>
    </div>
    <div class="three-col__secondary">
      <span class="sl">SECONDARY</span>
      <h3 class="three-col__title">Insulation</h3>
      <p class="three-col__desc">PrimaLoft Gold，380g 轻量保暖。</p>
    </div>
    <div class="three-col__tertiary">
      <span class="sl">DETAIL</span>
      <h3 class="three-col__title">180g</h3>
    </div>
  </div>
</section>
```

**CSS**:

```css
.three-col-section {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.three-col {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 2fr 1fr;
  gap: var(--space-md);
}
.three-col__primary,
.three-col__secondary,
.three-col__tertiary {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}
.three-col__title {
  font-family: Georgia, serif;
  font-size: var(--heading-lg);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0;
}
.three-col__desc {
  font-size: var(--body-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}
```

**约束**：重量分配必须不均匀（3:2:1 或类似）。对称列 = 视觉扁平。

**实现映射**：components.md #12 THREE-COLUMN GRID。

---

### C8 · Tab Panel（#24 基础交互）

**含义**：内容切换面板。多维度产品数据、季节系列切换。基础交互组件。

**HTML**:

```html
<div class="tab-panel">
  <div class="tab-bar">
    <button class="tab-item active">OVERVIEW</button>
    <button class="tab-item">SPECS</button>
    <button class="tab-item">SUSTAINABILITY</button>
  </div>
  <div class="tab-content">
    <p class="tab-content__text">L.I.M Comp 是 Haglofs 最轻量的防水冲锋衣。Gore-Tex Pro 80D 壳层搭配 PFC-free DWR 处理，在极端天气中提供可靠防护。</p>
  </div>
</div>
```

**CSS**:

```css
.tab-panel {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.tab-bar {
  display: flex;
  border-bottom: 1px solid var(--border-strong);
}
.tab-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  padding: var(--space-md) var(--space-lg);
  border: none;
  background: transparent;
  color: var(--text-disabled);
  cursor: pointer;
  position: relative;
  transition: color 150ms ease-out;
}
.tab-item:hover { color: var(--text-secondary); }
.tab-item.active { color: var(--text-display); }
.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--text-display);
}
.tab-content {
  padding: var(--space-lg);
}
.tab-content__text {
  font-size: var(--body);
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
}
```

**实现映射**：components.md #24 TAB PANEL。

---

### C9 · Accordion（#25 基础交互）

**含义**：折叠面板。产品详情、材料规格、FAQ。基础交互组件。

**HTML**:

```html
<div class="accordion">
  <div class="accordion-item open">
    <button class="accordion-toggle">
      <span class="accordion-label">MATERIAL COMPOSITION</span>
      <span class="accordion-icon">&minus;</span>
    </button>
    <div class="accordion-body">
      <p>Shell: 100% Nylon (Gore-Tex Pro 80D). Lining: 100% Polyester (Micro Grid Backer). DWR: PFC-free C0 finish.</p>
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-toggle">
      <span class="accordion-label">SIZING &amp; FIT</span>
      <span class="accordion-icon">+</span>
    </button>
    <div class="accordion-body" style="display:none;">
      <p>Regular fit. Articulated sleeves for freedom of movement. Adjustable hem and hood.</p>
    </div>
  </div>
</div>
```

**CSS**:

```css
.accordion {
  border-top: 1px solid var(--border-strong);
}
.accordion-item {
  border-bottom: 1px solid var(--border-strong);
}
.accordion-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) 0;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}
.accordion-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--text-primary);
}
.accordion-icon {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  color: var(--text-disabled);
  min-width: 20px;
  text-align: right;
}
.accordion-item.open .accordion-icon { color: var(--text-display); }
.accordion-body {
  padding: 0 0 var(--space-lg) 0;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}
```

**实现映射**：components.md #25 ACCORDION。

---

### C10 · Checklist（#26 基础交互）

**含义**：交互式清单。合规检查、打包清单、产品特性列表。基础交互组件。

**HTML**:

```html
<div class="checklist">
  <div class="checklist-item">
    <span class="check-box checked"></span>
    <span class="check-label">Gore-Tex Pro certified</span>
    <span class="check-status">OK</span>
  </div>
  <div class="checklist-item">
    <span class="check-box checked"></span>
    <span class="check-label">PFC-free DWR treatment</span>
    <span class="check-status">OK</span>
  </div>
  <div class="checklist-item">
    <span class="check-box"></span>
    <span class="check-label">bluesign approved fabric</span>
    <span class="check-status pending">PENDING</span>
  </div>
  <div class="checklist-item">
    <span class="check-box"></span>
    <span class="check-label">Fair Trade Certified sewn</span>
    <span class="check-status pending">PENDING</span>
  </div>
</div>
```

**CSS**:

```css
.checklist {
  display: flex;
  flex-direction: column;
}
.checklist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--border);
}
.checklist-item:last-child { border-bottom: none; }
.check-box {
  width: 16px;
  height: 16px;
  border: 1px solid var(--border-strong);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-box.checked {
  background: var(--brand-primary);
  border-color: var(--brand-primary);
}
.check-box.checked::after {
  content: '';
  width: 6px;
  height: 2px;
  background: #fff;
  margin-top: -1px;
}
.check-label {
  flex: 1;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.4;
}
.check-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--text-disabled);
}
.check-status.pending { color: var(--warning); }
```

**实现映射**：components.md #26 CHECKLIST。

---

### C11 · Product Card（实现 #1 · 基础组件）

**含义**：独立产品展示卡。图片区 + 产品名 + 分类标签 + 规格摘要。和 C6 Product Card Grid 是网格 vs 单卡的区别。

**HTML**:

```html
<div class="product-card">
  <div class="product-card__image">
    <img src="..." alt="...">
  </div>
  <div class="product-card__body">
    <span class="product-name" data-edit>L.I.M Comp</span>
    <span class="tag" data-edit>Shell Jacket</span>
    <div class="product-card__specs">
      <span class="sl">Weight</span><span class="sv" data-edit>485g</span>
      <span class="sl">Waterproof</span><span class="sv" data-edit>28,000mm</span>
    </div>
  </div>
</div>
```

**CSS**:

```css
.product-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.product-card__image {
  aspect-ratio: 4/3;
  background: var(--surface-alt);
  overflow: hidden;
}
.product-card__image img { width: 100%; height: 100%; object-fit: cover; }
.product-card__body { padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs); }
.product-name {
  font-family: Georgia, serif;
  font-size: var(--heading-lg);
  font-weight: 700;
  color: var(--text-display);
}
.product-card__specs {
  display: flex;
  gap: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border);
}
```

**约束**：无阴影。仅边框分隔。图片不可有圆角（只有卡片有）。

---

### C12 · Brand Statement Card（实现 #2 · 基础组件）

**含义**：全宽品牌宣言卡。居中排版，标签 + 大号宣言文字 + 副标题。和 E6 Statement Footer 是 Footer vs 卡片的区别。

**HTML**:

```html
<div class="brand-card">
  <div class="brand-card__label">Brand Statement</div>
  <div class="brand-stmt" data-edit>Engineered for Nature</div>
  <div class="brand-card__sub" data-edit>与自然共生，而非征服</div>
</div>
```

**CSS**:

```css
.brand-card {
  padding: var(--space-3xl) var(--space-md);
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
}
.brand-card__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
}
.brand-stmt {
  font-family: Georgia, serif;
  font-size: var(--display-lg);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1.15;
  margin-bottom: var(--space-sm);
}
.brand-card__sub {
  font-size: var(--body-lg);
  color: var(--text-secondary);
  font-style: italic;
}
```

---

### C13 · State Patterns（实现 #13 · 基础组件）

**含义**：加载/空/错误/成功四种状态模式。无骨架屏、无 Toast 弹窗、无悲伤脸插画。

| State | Indicator | Color |
|-------|-----------|-------|
| Loading | `[LOADING...]` text or dot-matrix spinner | `var(--text-disabled)` |
| Empty | Single line: `No products found.` | `var(--text-secondary)` |
| Error | Inline: `[Error: message]` | `var(--error)` |
| Success | Inline: `[已保存]` | `var(--success)` |

---

### C14 · Application Card（实现 #14 · 基础组件）

**含义**：应用场景展示卡。图标 + 名称 + 描述。用于品牌应用场景（包装、印刷、零售等）。

**HTML**:

```html
<div class="app-card">
  <div class="app-card__icon"><!-- SVG --></div>
  <div class="app-card__name">包装</div>
  <div class="app-card__desc" data-edit>模块化可回收包装。镂空品牌符号作为视觉识别。</div>
</div>
```

**CSS**:

```css
.app-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-lg);
  text-align: center;
}
.app-card__icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.app-card__name {
  font-weight: 600;
  font-size: var(--body);
  margin-bottom: var(--space-xs);
}
.app-card__desc {
  font-size: var(--body-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}
```

---

### C15 · Flow Pipeline（实现 #22 · 基础组件）

**含义**：横向流程线。线性过程/管道显示。阶段间用细箭头连接。和 C4 Step Sequence 是横向 vs 纵向的区别。

**HTML**:

```html
<div class="flow-pipeline">
  <div class="flow-stage flow-stage--done">
    <span class="flow-label sl">STAGE ONE</span>
    <span class="flow-value" data-edit>准入</span>
  </div>
  <span class="flow-arrow">›</span>
  <div class="flow-stage flow-stage--active">
    <span class="flow-label sl">STAGE TWO</span>
    <span class="flow-value" data-edit>分工</span>
  </div>
  <span class="flow-arrow">›</span>
  <div class="flow-stage">
    <span class="flow-label sl">STAGE THREE</span>
    <span class="flow-value" data-edit>运营</span>
  </div>
  <span class="flow-arrow">›</span>
  <div class="flow-stage">
    <span class="flow-label sl">STAGE FOUR</span>
    <span class="flow-value" data-edit>清退</span>
  </div>
</div>
```

**CSS**:

```css
.flow-pipeline { display: flex; align-items: center; gap: 0; padding: 16px 0; }
.flow-stage { display: flex; flex-direction: column; gap: 4px; padding: 8px 16px; }
.flow-value {
  font-family: Georgia, serif;
  font-size: var(--body);
  color: var(--text-secondary);
}
.flow-stage--active .flow-value { color: var(--text-display); font-weight: 600; }
.flow-stage--active .flow-label { color: var(--text-secondary); }
.flow-stage--done .flow-value { color: var(--success); }
.flow-arrow {
  font-size: 18px;
  color: var(--text-disabled);
  padding: 0 4px;
  line-height: 1;
}
```

---

### C16 · Dot Pattern（实现 #7 · 基础组件）

**含义**：装饰性点阵背景图案。使用点阵单元的装饰背景。最大 40% 透明度。

**HTML**:

```html
<div class="dot-pattern">
  <!-- Grid of dots with varying opacity -->
</div>
```

**CSS**:

```css
.dot-pattern {
  display: grid;
  grid-template-columns: repeat(auto-fill, 8px);
  grid-auto-rows: 8px;
  gap: 4px;
  opacity: 0.4;
}
```

**规则**：最大 40% 透明度作为背景。强调色圆点仅用于功能指示器。

---

### C17 · Detail Panel（实现 #27 · 基础组件）

**含义**：全屏详情面板。固定定位的长内容详情视图。供应商档案、产品详情、完整规格表。

**HTML**:

```html
<div class="detail-overlay" id="detail-panel">
  <button class="detail-close">&times;</button>
  <div class="detail-panel">
    <div class="detail-header">
      <span class="detail-label">DETAIL VIEW</span>
      <h2 class="detail-title" data-edit>Product Name</h2>
    </div>
    <div class="detail-body"><p data-edit>Full content here.</p></div>
  </div>
</div>
```

**CSS**:

```css
.detail-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(245,243,239,0.92);
  display: none; overflow-y: auto; padding: 5vh 2rem;
}
.detail-overlay.active { display: block; }
.detail-close {
  position: fixed; top: 16px; right: 16px;
  width: 44px; height: 44px;
  border: 1px solid var(--border-strong); border-radius: 0;
  background: var(--surface); color: var(--text-primary);
  font-size: 20px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; z-index: 101;
}
.detail-panel {
  max-width: 640px; margin: 0 auto;
  border: 1px solid var(--border-strong); background: var(--surface);
}
.detail-header { padding: 32px 32px 24px; border-bottom: 1px solid var(--border); }
.detail-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: 0.1em; color: var(--text-disabled);
}
.detail-title {
  font-family: Georgia, serif;
  font-size: var(--heading-lg); font-weight: 700;
  color: var(--text-display); margin-top: 8px;
}
.detail-body { padding: 24px 32px 32px; font-size: 14px; color: var(--text-secondary); line-height: 1.7; }
```

---

### C18 · Asymmetric Comparison Table（实现 #28 · 基础组件）

**含义**：非对称对比表。双主体对比，非对称网格。左侧粘性上下文标签，右侧配对数据行。

**HTML**:

```html
<div class="compare-table">
  <div class="compare-side">
    <span class="compare-big-label">VS</span>
    <span class="compare-section-num">01</span>
    <h2 class="compare-section-title" data-edit>Shell Comparison</h2>
    <p class="compare-subtitle" data-edit>Context description</p>
  </div>
  <div class="compare-rows">
    <div class="compare-row-item">
      <span class="compare-row-num">01</span>
      <div class="compare-cell">
        <span class="compare-cell-label">L.I.M COMP</span>
        <span class="compare-cell-value" data-edit>485g</span>
      </div>
      <div class="compare-cell">
        <span class="compare-cell-label">L.I.M ULTIMATE</span>
        <span class="compare-cell-value" data-edit>310g</span>
      </div>
    </div>
  </div>
</div>
```

**CSS**:

```css
.compare-table { display: grid; grid-template-columns: 0.35fr 1fr; gap: 48px; align-items: start; }
.compare-side { position: sticky; top: 80px; }
.compare-big-label {
  font-family: Georgia, serif;
  font-size: 64px; font-weight: 700;
  color: var(--text-display); opacity: 0.06; line-height: 0.85; display: block;
}
.compare-section-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.1em; color: var(--text-disabled); display: block; margin-bottom: 4px;
}
.compare-section-title {
  font-family: Georgia, serif;
  font-size: var(--heading-lg); font-weight: 700; color: var(--text-display);
}
.compare-subtitle { font-size: 14px; color: var(--text-secondary); margin-top: 8px; line-height: 1.5; }
.compare-row-item {
  display: grid; grid-template-columns: 48px 1fr 1fr; gap: 16px;
  padding: 24px 0; border-bottom: 1px solid var(--border);
}
.compare-row-item:last-child { border-bottom: none; }
.compare-row-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 24px; color: var(--text-disabled); line-height: 1;
}
.compare-cell { display: flex; flex-direction: column; gap: 4px; }
.compare-cell-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: 0.1em; color: var(--text-disabled); text-transform: uppercase;
}
.compare-cell-value {
  font-family: 'Inter', sans-serif;
  font-size: 15px; color: var(--text-primary); line-height: 1.4;
}
```

---

### C19 · Segmented Control（实现 #29 · 基础组件）

**含义**：分段选择器。互斥选项选择器。场景色板选择、产品筛选。

**HTML**:

```html
<div class="seg-control">
  <button class="seg-item active" data-edit>Forest</button>
  <button class="seg-item" data-edit>Alpine</button>
  <button class="seg-item" data-edit>Desert</button>
  <button class="seg-item" data-edit>Urban</button>
</div>
```

**CSS**:

```css
.seg-control {
  display: inline-flex;
  border: 1px solid var(--border-strong);
  border-radius: 4px;
  overflow: hidden;
}
.seg-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.06em;
  padding: 10px 20px; border: none; background: transparent;
  color: var(--text-secondary); cursor: pointer;
  transition: all 150ms ease-out;
}
.seg-item:hover { background: var(--surface-alt); }
.seg-item.active {
  background: var(--brand-primary); color: #fff;
}
```

---

### C20 · Callout/Annotation（实现 #34 · 基础组件）

**含义**：边注/注释块。轻量边注用于规则、方法论解释或上下文备注。左边框 2px 强调色 + 等宽大写标题 + 正文。

**HTML**:

```html
<div class="callout">
  <div class="callout__title">METHODOLOGY</div>
  <div class="callout__body" data-edit>Scores are weighted by volume across all active product lines.</div>
</div>
```

**CSS**:

```css
.callout {
  border-left: 2px solid var(--brand-primary);
  background: var(--surface-alt);
  padding: 16px 20px;
}
.callout__title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brand-primary);
  margin-bottom: 6px;
}
.callout__body {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}
```

**Warning 变体**：`border-left-color: var(--signal-warning)`，标题用 signal-warning。

---

### C21 · Timeline/Era Connector（实现 #35 · 基础组件）

**含义**：时间线连接器。按时间排列的节点布局配连接线。品牌历史、产品演进、项目里程碑。

**HTML**:

```html
<div class="timeline">
  <div class="timeline-node">
    <span class="timeline-year">1914</span>
    <span class="timeline-label" data-edit>Founded</span>
  </div>
  <div class="timeline-connector"></div>
  <div class="timeline-node">
    <span class="timeline-year">1970s</span>
    <span class="timeline-label" data-edit>Technical Innovation</span>
  </div>
  <div class="timeline-connector"></div>
  <div class="timeline-node timeline-node--active">
    <span class="timeline-year">2025</span>
    <span class="timeline-label" data-edit>111 Years</span>
  </div>
</div>
```

**CSS**:

```css
.timeline { display: flex; align-items: center; gap: 0; }
.timeline-node {
  display: flex; flex-direction: column; gap: 4px;
  padding: 8px 16px;
}
.timeline-year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.08em; color: var(--text-disabled);
}
.timeline-label {
  font-family: Georgia, serif;
  font-size: 14px; color: var(--text-secondary);
}
.timeline-node--active .timeline-label { color: var(--text-display); font-weight: 600; }
.timeline-node--active .timeline-year { color: var(--text-secondary); }
.timeline-connector {
  flex: 1; height: 1px; background: var(--border);
  position: relative;
}
.timeline-connector::after {
  content: ''; position: absolute;
  right: -4px; top: -3px;
  width: 0; height: 0;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-left: 5px solid var(--border);
}
```

---

### C22 · Alert/Inline Status（实现 #42 · 基础组件）

**含义**：状态提示。括号前缀文本提示。无图标，无插画。

**HTML**:

```html
<div class="alert alert--success">[SAVED] Changes applied.</div>
<div class="alert alert--warning">[WARNING] Stock low.</div>
<div class="alert alert--error">[ERROR] Connection failed.</div>
```

**CSS**:

```css
.alert {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.04em;
  padding: 10px 16px; border: 1px solid var(--border); background: var(--surface);
}
.alert--success { color: var(--success); border-color: var(--success); }
.alert--warning { color: var(--warning); border-color: var(--warning); }
.alert--error { color: var(--error); border-color: var(--error); }
```

---

### C23 · Inputs（实现 #38 · 基础组件）

**含义**：输入框。下划线优先。标签在上（JetBrains Mono 全大写），输入框在下。

**HTML**:

```html
<div class="input-group">
  <label class="input-label">PRODUCT NAME</label>
  <input class="input" type="text" placeholder="L.I.M Comp">
  <span class="input-error">Required field</span>
</div>
```

**CSS**:

```css
.input-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-secondary);
  display: block; margin-bottom: 8px;
}
.input {
  width: 100%; font-family: 'Inter', sans-serif;
  font-size: 14px; color: var(--text-primary);
  background: transparent; border: none;
  border-bottom: 1px solid var(--border-strong);
  padding: 8px 0; outline: none;
  transition: border-color 150ms ease-out;
}
.input:focus { border-color: var(--text-primary); }
.input::placeholder { color: var(--text-disabled); }
.input-error {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: 0.06em;
  color: var(--error); display: block; margin-top: 6px;
}
.input--error { border-color: var(--error); }
```

**全边框变体**：`.input--border` 添加 `border: 1px solid var(--border-strong); border-radius: 4px; padding: 10px 12px;`

**Textarea**：`.textarea` 继承 `.input` 样式，添加 `resize: vertical; min-height: 80px; line-height: 1.6;`

---

### C24 · Toggle/Switch（实现 #39 · 基础组件）

**含义**：开关。药丸轨道 + 圆形滑块。机械感弹扣。

**HTML**:

```html
<label class="toggle">
  <input type="checkbox" class="toggle__input">
  <span class="toggle__track"><span class="toggle__thumb"></span></span>
  <span class="toggle__label">OFF-ROAD MODE</span>
</label>
```

**CSS**:

```css
.toggle { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.toggle__input { display: none; }
.toggle__track {
  width: 44px; height: 24px;
  background: var(--border); border-radius: 12px;
  position: relative; transition: background 150ms ease-out;
}
.toggle__thumb {
  width: 18px; height: 18px;
  background: var(--text-disabled); border-radius: 50%;
  position: absolute; top: 3px; left: 3px;
  transition: all 150ms ease-out;
}
.toggle__input:checked ~ .toggle__track { background: var(--brand-primary); }
.toggle__input:checked ~ .toggle__track .toggle__thumb { background: #fff; left: 23px; }
.toggle__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.06em; color: var(--text-secondary);
}
```

---

## D类 · CTA & Proof（19个）

---

### D1 · Typographic Link（C3 - 入选）

> 变体旋钮：underline:solid/dashed/double/none · hover:thicken/slide/color · arrow:-> / -> / none

**含义**：安静的行动召唤。"Explore the collection ->"。排印驱动的链接，无按钮形态。

**HTML**:

```html
<section class="cta-link">
  <div class="cta-link__inner">
    <a href="#" class="typo-link">Explore the L.I.M Collection <span class="typo-link__arrow">&rarr;</span></a>
    <a href="#" class="typo-link">View Sustainability Report <span class="typo-link__arrow">&rarr;</span></a>
  </div>
</section>
```

**CSS**:

```css
.cta-link {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.cta-link__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}
.typo-link {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  border-bottom: 2px solid var(--text-display);
  padding-bottom: var(--space-xs);
  transition: opacity 150ms ease-out;
}
.typo-link:hover { opacity: 0.6; }
.typo-link__arrow {
  font-size: var(--body);
  transition: transform 150ms ease-out;
}
.typo-link:hover .typo-link__arrow { transform: translateX(4px); }
```

**实现映射**：components.md #37 BUTTONS（变体，排印风格）。

---

### D2 · ~~Outlined Chip~~（C1 - 排除）

> 变体旋钮：size:sm/md · color:default/olive/orange · icon:none/leading

**含义**：轮廓标签芯片。太普通，Haglofs 已有 Nameplate 和 Tag 组件替代。

**HTML**:

```html
<div class="chip-group">
  <span class="chip">Shell</span>
  <span class="chip chip--olive">Gore-Tex</span>
  <span class="chip chip--orange">Limited</span>
</div>
```

**CSS**:

```css
.chip-group {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}
.chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  padding: 6px 14px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  background: transparent;
}
.chip--olive {
  border-color: var(--brand-primary);
  color: var(--brand-primary);
}
.chip--orange {
  border-color: var(--signal-warning);
  color: var(--signal-warning);
}
```

---

### D3 · ~~Inline Form~~（C2 - 排除）

> 变体旋钮：layout:inline/stacked · submit:button/arrow/enter · label:above/placeholder

**含义**：行内表单。不需要表单的户外品牌系统。

**HTML**:

```html
<div class="inline-form">
  <label class="input-label">EMAIL</label>
  <div class="inline-form__row">
    <input class="input" type="email" placeholder="your@email.com">
    <button class="btn btn--primary btn--sm">SUBSCRIBE</button>
  </div>
</div>
```

**CSS**:

```css
.inline-form {
  max-width: 400px;
}
.inline-form__row {
  display: flex;
  gap: var(--space-sm);
}
.inline-form__row .input { flex: 1; }
```

**实现映射**：components.md #38 INPUTS + #37 BUTTONS。

---

### D4 · Pull-quote（T1 - 入选）

> 变体旋钮：treatment:italic/roman/large · attribution:signed/stamped/timestamped

**含义**：户外达人推荐。边注放人名/角色/装备。社交媒体/评测风格的证明。

**HTML**:

```html
<section class="pull-quote-section">
  <div class="pull-quote">
    <div class="pull-quote__body">
      <p class="pull-quote__text">In 15 years of alpine guiding, the L.I.M Comp is the only shell I trust when the weather turns. It disappears in the pack and performs when it matters.</p>
    </div>
    <div class="pull-quote__margin">
      <span class="pull-quote__name">ERIK LINDQVIST</span>
      <span class="pull-quote__role">Mountain Guide, Abisko</span>
      <span class="pull-quote__gear">Gear: L.I.M Comp / Rabbi Pants</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.pull-quote-section {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.pull-quote {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-2xl);
  border-top: 1px solid var(--border);
  padding-top: var(--space-xl);
}
.pull-quote__text {
  font-family: Georgia, serif;
  font-size: var(--body-lg);
  font-style: italic;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
}
.pull-quote__margin {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  align-self: start;
  padding-top: var(--space-sm);
}
.pull-quote__name {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-display);
}
.pull-quote__role {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-sm);
  color: var(--text-secondary);
}
.pull-quote__gear {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--text-disabled);
}
```

**实现映射**：components.md #40 BLOCKQUOTE/PULL-QUOTE（变体，带边注）。

---

### D5 · Logo Wall（T2 - 入选）

> 变体旋钮：layout:row/2-row/3xN · treatment:mono/brand/ghosted · divider:hairline/none

**含义**：合作伙伴/赛事赞助/媒体露出。hairline 风格 Logo 墙。

**HTML**:

```html
<section class="logo-wall">
  <div class="logo-wall__header">
    <span class="sl">PARTNERS</span>
  </div>
  <div class="logo-wall__grid">
    <div class="logo-wall__item">
      <span class="logo-wall__wordmark">Swedish Olympic Committee</span>
    </div>
    <div class="logo-wall__item">
      <span class="logo-wall__wordmark">Stockholm Outdoor Club</span>
    </div>
    <div class="logo-wall__item">
      <span class="logo-wall__wordmark">Nordic Naturism Federation</span>
    </div>
    <div class="logo-wall__item">
      <span class="logo-wall__wordmark">Abisko Research Station</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.logo-wall {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.logo-wall__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.logo-wall__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}
.logo-wall__item {
  background: var(--surface);
  padding: var(--space-xl) var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-wall__wordmark {
  font-family: Georgia, serif;
  font-size: var(--body-sm);
  font-weight: 500;
  color: var(--text-disabled);
  text-align: center;
  opacity: 0.6;
}
```

**实现映射**：components.md 无直接对应，基于 T2 Hallmark 描述新建。

---

### D6 · Single Huge Quote（T3 - 入选）

> 变体旋钮：face:serif-italic/roman/mono · width:full/60ch/40ch · attribution:same-line/separate

**含义**：品牌宣言或创始人引言独占一整屏。Haglofs 最有冲击力的证明组件。

**HTML**:

```html
<section class="huge-quote">
  <div class="huge-quote__inner">
    <blockquote class="huge-quote__text">
      We believe in moving with nature, not against it. Every product we make is a promise to the wild.
    </blockquote>
    <cite class="huge-quote__cite">
      <span class="huge-quote__author">HAGLOFS MANIFESTO</span>
      <span class="huge-quote__year">SINCE 1914</span>
    </cite>
  </div>
</section>
```

**CSS**:

```css
.huge-quote {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: var(--space-4xl) var(--container-padding);
}
.huge-quote__inner {
  max-width: 720px;
  text-align: center;
}
.huge-quote__text {
  font-family: Georgia, serif;
  font-size: var(--display-lg);
  font-style: italic;
  font-weight: 400;
  color: var(--text-display);
  line-height: 1.3;
  margin: 0;
  padding: 0;
  border: none;
}
.huge-quote__cite {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: var(--space-2xl);
  font-style: normal;
}
.huge-quote__author {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.huge-quote__year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--text-disabled);
}
```

**实现映射**：components.md #40 BLOCKQUOTE/PULL-QUOTE（Hero 级别放大）+ #2 BRAND STATEMENT CARD。

---

### D7 · ~~Numbered Stat Strip~~（T4 - 排除）

> 变体旋钮：columns:3/4/5 · treatment:mono/serif · divider:hairline/dot/rule

**含义**：数据指标横条。户外品牌不靠数据条叙事。

**HTML**:

```html
<section class="stat-strip">
  <div class="stat-strip__grid">
    <div class="stat-strip__item">
      <span class="stat-strip__num">111</span>
      <span class="stat-strip__label">YEARS</span>
    </div>
    <div class="stat-strip__item">
      <span class="stat-strip__num">28K</span>
      <span class="stat-strip__label">MM WATERPROOF</span>
    </div>
    <div class="stat-strip__item">
      <span class="stat-strip__num">485g</span>
      <span class="stat-strip__label">SHELL WEIGHT</span>
    </div>
    <div class="stat-strip__item">
      <span class="stat-strip__num">100%</span>
      <span class="stat-strip__label">PFC-FREE</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.stat-strip {
  padding: var(--space-2xl) var(--container-padding);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.stat-strip__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  text-align: center;
}
.stat-strip__num {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--display-md);
  font-weight: 600;
  color: var(--text-display);
  display: block;
}
.stat-strip__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-disabled);
  display: block;
  margin-top: var(--space-xs);
}
```

**实现映射**：components.md #36 DATA SPOTLIGHT（多列变体）。

---

### D8 · Tag（实现 #5 · 基础组件）

**含义**：内联标签组件。分类、材料或特性标签。

**HTML**:

```html
<span class="tag" data-edit>Gore-Tex Pro</span>
```

**CSS**:

```css
.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  display: inline-block;
}
```

**变体**：
- `.tag--accent` → `border-color: var(--signal-warning)`, `color: var(--signal-warning)`（用于精选/限量项）
- `.tag--scene` → `border-color: var(--brand-tertiary)`, `color: var(--brand-tertiary)`（用于季节标签）

---

### D9 · Progress Bar（实现 #10 · 基础组件）

**含义**：分段进度条。品牌变体，用于产品评分、可持续性评分等。

**HTML**:

```html
<div class="progress-bar">
  <div class="progress-bar__segment" style="width: 85%; background: var(--brand-primary);"></div>
  <div class="progress-bar__segment" style="width: 10%; background: var(--brand-secondary);"></div>
  <div class="progress-bar__segment" style="width: 5%; background: var(--signal-caution);"></div>
</div>
```

**CSS**:

```css
.progress-bar {
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}
```

**规则**：使用品牌色做分段，不用状态色（除非显示实际状态）。不用渐变填充。

---

### D10 · Inline Bar（实现 #11 · 基础组件）

**含义**：行内进度条。紧凑内联条，用于产品对比中的辅助指标。

**HTML**:

```html
<div class="inline-bar">
  <span class="inline-bar__label sl">Waterproof</span>
  <div class="inline-bar__track">
    <div class="inline-bar__fill" style="width: 93%;"></div>
  </div>
  <span class="inline-bar__value sv">28,000mm</span>
</div>
```

**CSS**:

```css
.inline-bar { display: flex; align-items: center; gap: var(--space-sm); }
.inline-bar__track {
  flex: 1;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.inline-bar__fill {
  height: 100%;
  background: var(--brand-primary);
  border-radius: 2px;
}
```

---

### D11 · Segmented Block Bar（实现 #16 · 基础组件）

**含义**：分段块条。签名工业组件。离散方块端头配 2px 间距——机械感、仪器感。用于供应商评分、可持续性指标、绩效评级。

**HTML**:

```html
<div class="block-bar">
  <div class="block-bar__header">
    <span class="block-bar__label sl">SUSTAINABILITY</span>
    <span class="block-bar__value sv" data-edit>87/100</span>
  </div>
  <div class="block-bar__track" data-total="20" data-filled="17">
    <!-- JS-generated: 20 blocks, 17 filled -->
  </div>
</div>
```

**CSS**:

```css
.block-bar__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.block-bar__track {
  display: flex;
  gap: 2px;
}
.block-bar__block {
  flex: 1;
  min-width: 6px;
  height: 12px;
  border-radius: 0;
}
.block-bar__block--filled { background: var(--brand-primary); }
.block-bar__block--empty { background: var(--border); }
.block-bar__block--accent { background: var(--signal-warning); }
.block-bar__block--good { background: var(--success); }
.block-bar__block--warn { background: var(--warning); }
```

**尺寸**：Hero 20px 高度，Standard 12px，Compact 6px。始终搭配数字读数。

**JS 生成**:
```js
const track = el.querySelector('.block-bar__track');
const total = +track.dataset.total;
const filled = +track.dataset.filled;
track.innerHTML = Array.from({length: total}, (_, i) =>
  `<div class="block-bar__block ${i < filled ? 'block-bar__block--filled' : 'block-bar__block--empty'}"></div>`
).join('');
```

---

### D12 · Metric Card LED-Style（实现 #17 · 基础组件）

**含义**：仪表盘大数字卡。超大 JetBrains Mono 数字（48-96px）+ Inter 正文上下文 + 左上角标签。`--surface-alt` 背景提升层次。

**HTML**:

```html
<div class="metric-card">
  <span class="metric-card__label sl">ACTIVE SUPPLIERS</span>
  <div class="metric-card__hero" data-edit>24</div>
  <div class="metric-card__sub" data-edit>覆盖 6 条产线</div>
</div>
```

**CSS**:

```css
.metric-card {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  padding: var(--space-lg) var(--space-xl);
  position: relative;
}
.metric-card__label {
  position: absolute;
  top: 16px;
  left: 24px;
}
.metric-card__hero {
  font-family: 'JetBrains Mono', monospace;
  font-size: 64px;
  font-weight: 600;
  color: var(--text-display);
  line-height: 1;
  margin-top: 32px;
}
.metric-card__sub {
  font-size: var(--body-sm);
  color: var(--text-secondary);
  margin-top: 8px;
}
```

**Accent hero 变体**：`.metric-card__hero` 颜色设为 `var(--brand-primary)` 或 `var(--signal-warning)` 以强调。

---

### D13 · Nameplate Label（实现 #18 · 基础组件）

**含义**：工业标签。点前缀 + 等宽文字的技术标签。用于分类的工业标签。

**HTML**:

```html
<span class="nameplate">
  <span class="nameplate__dot"></span>
  <span class="nameplate__text" data-edit>GORE-TEX PRO</span>
</span>
```

**CSS**:

```css
.nameplate {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--border-strong);
  border-radius: 2px;
}
.nameplate__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-secondary);
}
.nameplate__text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
```

**Accent dot 变体**：`.nameplate__dot` 背景设为 `var(--signal-warning)` 用于高亮项。

---

### D14 · Gauge Arc（实现 #21 · 基础组件）

**含义**：SVG 弧形仪表。带刻度线和指针的 SVG 弧形仪表。用于单一指标显示（可持续性评分、绩效评级）。

**HTML**:

```html
<div class="gauge-arc">
  <svg viewBox="0 0 200 120" width="200" height="120">
    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border)" stroke-width="8" stroke-linecap="round"/>
    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--brand-primary)" stroke-width="8" stroke-linecap="round" stroke-dasharray="251" stroke-dashoffset="33" id="gauge-fill"/>
    <!-- Tick marks generated by JS -->
  </svg>
  <div class="gauge-arc__value" data-edit>87</div>
  <div class="gauge-arc__label sl">SCORE</div>
</div>
```

**CSS**:

```css
.gauge-arc { text-align: center; }
.gauge-arc__value {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--display-md);
  font-weight: 600;
  color: var(--text-display);
  margin-top: -16px;
}
.gauge-arc__label { margin-top: 4px; }
```

**SVG 数学**：弧形路径 `M 20 100 A 80 80 0 0 1 180 100`。总弧长约 251。`stroke-dashoffset` = 251 * (1 - percentage)。

---

### D15 · SVG Sparkline（实现 #32 · 基础组件）

**含义**：内联趋势线。紧凑数据可视化的迷你趋势线。无坐标轴、无标签、无网格线。

**HTML**:

```html
<div class="sparkline">
  <svg viewBox="0 0 160 32" width="160" height="32">
    <polyline points="0,24 20,20 40,22 60,16 80,18 100,12 120,14 140,8 160,6"
      fill="none" stroke="var(--text-display)" stroke-width="1.5"
      stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="160" cy="6" r="2.5" fill="var(--brand-primary)"/>
  </svg>
</div>
```

**两种模式**：
- **独立卡片**：迷你图在上，趋势文字在下（如 "+12% vs 上月"）
- **表格嵌入**：在数据行单元格内，用视觉趋势替代数值

---

### D16 · Reference Line Overlay（实现 #33 · 基础组件）

**含义**：参考线叠加层。阈值指示器叠加在分段块条上。以垂直标记显示目标/基准。

**HTML**:

```html
<div class="block-bar-ref" style="position:relative;">
  <div class="block-bar__track"><!-- Segmented blocks --></div>
  <div class="ref-line" style="left:75%;">
    <span class="ref-label">TARGET</span>
  </div>
</div>
```

**CSS**:

```css
.ref-line {
  position: absolute;
  top: -20px; bottom: 0;
  width: 1px;
  background: var(--signal-warning);
  opacity: 0.5;
}
.ref-label {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--signal-warning);
  white-space: nowrap;
}
```

**刻度尺变体**：百分比标签的 flex 行（0% 25% 50% 75% 100%）配微小刻度线，放在分段条下方用于校准。

```html
<div class="scale-rule">
  <span class="scale-tick">0%</span>
  <span class="scale-tick">25%</span>
  <span class="scale-tick">50%</span>
  <span class="scale-tick">75%</span>
  <span class="scale-tick">100%</span>
</div>
```

```css
.scale-rule { display: flex; justify-content: space-between; padding: 4px 0 0; }
.scale-tick {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; color: var(--text-disabled);
  position: relative;
}
.scale-tick::before {
  content: ''; position: absolute;
  top: -4px; left: 50%; width: 1px; height: 4px;
  background: var(--border);
}
```

---

### D17 · Data Spotlight（实现 #36 · 基础组件）

**含义**：内联数据聚焦。比 LED 仪表卡更简单——设计用于在流文本中嵌入关键数字。Inline-flex 配对大号 mono 数字与小号单位标签。

**HTML**:

```html
<div class="spotlight">
  <span class="spotlight__value" data-edit>94</span>
  <span class="spotlight__unit">%</span>
</div>
```

**CSS**:

```css
.spotlight {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
}
.spotlight__value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 48px;
  font-weight: 600;
  color: var(--text-display);
  line-height: 1;
}
.spotlight__unit {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
}
```

---

### D18 · Buttons（实现 #37 · 基础组件）

**含义**：按钮组件。所有按钮：JetBrains Mono，13px，全大写，letter-spacing 0.06em，最小高度 44px。primary/secondary/ghost/destructive 四种变体。

**HTML**:

```html
<button class="btn btn--primary">ADD TO CART</button>
<button class="btn btn--secondary">COMPARE</button>
<button class="btn btn--ghost">VIEW ALL</button>
<button class="btn btn--destructive">REMOVE</button>
```

**CSS**:

```css
.btn {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 12px 24px; min-height: 44px;
  cursor: pointer; border: none;
  transition: all 150ms ease-out;
}
.btn--primary { background: var(--brand-primary); color: #fff; border-radius: 4px; }
.btn--primary:hover { background: #3d4d2e; }
.btn--secondary { background: transparent; border: 1px solid var(--border-strong); color: var(--text-primary); border-radius: 4px; }
.btn--secondary:hover { border-color: var(--text-primary); }
.btn--ghost { background: transparent; color: var(--text-secondary); border-radius: 0; }
.btn--ghost:hover { color: var(--text-primary); }
.btn--destructive { background: transparent; border: 1px solid var(--error); color: var(--error); border-radius: 4px; }
```

**尺寸变体**：`.btn--sm` → padding 8px 16px, min-height 36px。`.btn--lg` → padding 16px 32px, min-height 52px。

---

### D19 · Blockquote/Pull-Quote（实现 #40 · 基础组件）

**含义**：内联引言。带上下边框的引言组件。和 D4/D6 的 Hero 级引言不同，这是内联级别的引言。

**HTML**:

```html
<blockquote class="blockquote">
  <p class="blockquote__text">We believe in moving with nature.</p>
  <cite class="blockquote__cite">HAGLOFS MANIFESTO, 1914</cite>
</blockquote>
```

**CSS**:

```css
blockquote.blockquote {
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  padding: 24px 0; margin: 0; position: relative;
}
blockquote.blockquote::before {
  content: '\201C'; font-family: Georgia, serif;
  font-size: 48px; color: var(--text-disabled);
  position: absolute; top: 8px; left: -8px; line-height: 1;
}
.blockquote__text {
  font-family: Georgia, serif; font-size: var(--body-lg);
  font-style: italic; color: var(--text-primary);
  line-height: 1.6; padding-left: 16px;
}
.blockquote__cite {
  display: block; margin-top: 12px; padding-left: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-disabled);
  font-style: normal;
}
```

---

## E类 · Footer（7个）

---

### E1 · Mast-headed（Ft1 - 入选）

> 变体旋钮：wordmark:3xl/2xl/xl · tagline:italic/roman/none · links:inline/2-line

**含义**：品牌标识 + 口号 + 少量链接。最稳的 Footer 选择。

**HTML**:

```html
<footer class="footer-mast">
  <div class="footer-mast__inner">
    <div class="footer-mast__brand">
      <span class="footer-mast__wordmark">Haglofs</span>
      <span class="footer-mast__tagline">Built for the wild, since 1914.</span>
    </div>
    <div class="footer-mast__links">
      <a href="#" class="footer-mast__link">Products</a>
      <a href="#" class="footer-mast__link">Technology</a>
      <a href="#" class="footer-mast__link">Sustainability</a>
      <a href="#" class="footer-mast__link">About</a>
    </div>
  </div>
  <div class="footer-mast__rule"></div>
  <div class="footer-mast__bottom">
    <span class="footer-mast__copy">&copy; 2026 Haglofs AB. Stockholm, Sweden.</span>
  </div>
</footer>
```

**CSS**:

```css
.footer-mast {
  padding: var(--space-4xl) var(--container-padding) var(--space-2xl);
  background: var(--bg);
  border-top: 1px solid var(--border);
}
.footer-mast__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.footer-mast__brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.footer-mast__wordmark {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
}
.footer-mast__tagline {
  font-family: Georgia, serif;
  font-size: var(--body-sm);
  font-style: italic;
  color: var(--text-secondary);
}
.footer-mast__links {
  display: flex;
  gap: var(--space-lg);
}
.footer-mast__link {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-sm);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 150ms ease-out;
}
.footer-mast__link:hover { color: var(--text-primary); }
.footer-mast__rule {
  max-width: var(--container-max);
  margin: var(--space-xl) auto;
  height: 1px;
  background: var(--border);
}
.footer-mast__bottom {
  max-width: var(--container-max);
  margin: 0 auto;
}
.footer-mast__copy {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--text-disabled);
}
```

**实现映射**：components.md #8 NAVIGATION BAR（Footer 变体）。

---

### E2 · Inline Rule Single Line（Ft2 - 入选）

> 变体旋钮：order:wm/links/credit · separator:middot/pipe/em-dash · density:dense/spaced

**含义**：极简版权行。"2026 Haglofs / Stockholm"。一行式 Footer。

**HTML**:

```html
<footer class="footer-inline">
  <div class="footer-inline__inner">
    <span class="footer-inline__wm">Haglofs</span>
    <span class="footer-inline__sep">&middot;</span>
    <a href="#" class="footer-inline__link">Products</a>
    <a href="#" class="footer-inline__link">About</a>
    <a href="#" class="footer-inline__link">Sustainability</a>
    <span class="footer-inline__sep">&middot;</span>
    <span class="footer-inline__credit">&copy; 2026 Haglofs AB</span>
  </div>
</footer>
```

**CSS**:

```css
.footer-inline {
  padding: var(--space-xl) var(--container-padding);
  border-top: 1px solid var(--border);
  background: var(--bg);
}
.footer-inline__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  flex-wrap: wrap;
}
.footer-inline__wm {
  font-family: Georgia, serif;
  font-size: var(--body);
  font-weight: 700;
  color: var(--text-display);
}
.footer-inline__sep {
  color: var(--text-disabled);
  font-size: var(--body-sm);
}
.footer-inline__link {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-sm);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 150ms ease-out;
}
.footer-inline__link:hover { color: var(--text-primary); }
.footer-inline__credit {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--text-disabled);
}
```

**实现映射**：components.md #8 NAVIGATION BAR（极简单行变体）。

---

### E3 · ~~Index~~（Ft3 - 排除）

> 变体旋钮：columns:2/3/4 · heading:mono/serif · divider:hairline/none

**含义**：多列索引式 Footer。太模板化，不适合 Haglofs。

**HTML**:

```html
<footer class="footer-index">
  <div class="footer-index__grid">
    <div class="footer-index__col">
      <h4 class="footer-index__heading">PRODUCTS</h4>
      <a href="#">Shell Jackets</a>
      <a href="#">Insulation</a>
      <a href="#">Base Layers</a>
    </div>
    <div class="footer-index__col">
      <h4 class="footer-index__heading">ABOUT</h4>
      <a href="#">Our Story</a>
      <a href="#">Sustainability</a>
      <a href="#">Careers</a>
    </div>
    <div class="footer-index__col">
      <h4 class="footer-index__heading">SUPPORT</h4>
      <a href="#">Size Guide</a>
      <a href="#">Warranty</a>
      <a href="#">Contact</a>
    </div>
  </div>
</footer>
```

**CSS**:

```css
.footer-index {
  padding: var(--space-4xl) var(--container-padding);
  border-top: 1px solid var(--border);
  background: var(--bg);
}
.footer-index__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2xl);
}
.footer-index__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.footer-index__heading {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-disabled);
  margin: 0 0 var(--space-sm) 0;
}
.footer-index__col a {
  font-size: var(--body-sm);
  color: var(--text-secondary);
  text-decoration: none;
}
.footer-index__col a:hover { color: var(--text-primary); }
```

---

### E4 · Dense Typographic（Ft4 - 入选）

> 变体旋钮：family:mono/serif/sans · layout:block/paragraphs/log

**含义**：版权致谢 + 字体致谢 + 地址。编辑感的密集排印 Footer。

**HTML**:

```html
<footer class="footer-dense">
  <div class="footer-dense__inner">
    <pre class="footer-dense__block">HAGLOFS AB
Fjallgatan 12
SE-115 56 Stockholm, Sweden

Fonts: Georgia (system), Inter, JetBrains Mono
Colors: Olive #4A6741, Dark Gray #2D2A26, Earth #7A9B6D

&copy; 2026 Haglofs AB. All rights reserved.
Design system v1.0 — Built with restraint.</pre>
  </div>
</footer>
```

**CSS**:

```css
.footer-dense {
  padding: var(--space-4xl) var(--container-padding);
  border-top: 2px solid var(--text-display);
  background: var(--bg);
}
.footer-dense__inner {
  max-width: var(--container-max);
  margin: 0 auto;
}
.footer-dense__block {
  background: var(--surface-alt);
  border-left: 2px solid var(--brand-primary);
  padding: var(--space-lg) var(--space-xl);
  margin: 0;
  overflow-x: auto;
}
.footer-dense__block code,
.footer-dense__block {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-primary);
}
```

**实现映射**：components.md #41 CODE BLOCK（Footer 密集排印变体）。

---

### E5 · ~~Letter Close~~（Ft6 - 排除）

> 变体旋钮：sign-off:regards/warmly/none · stamp:logo/date/none · width:40ch/56ch

**含义**：信件式结尾。太文学化，Haglofs 不走这条路。

**HTML**:

```html
<footer class="footer-letter">
  <div class="footer-letter__inner">
    <p class="footer-letter__closing">With respect for the mountains,</p>
    <div class="footer-letter__sign">
      <span class="footer-letter__name">The Haglofs Team</span>
      <span class="footer-letter__location">Stockholm, May 2026</span>
    </div>
  </div>
</footer>
```

**CSS**:

```css
.footer-letter {
  padding: var(--space-4xl) var(--container-padding);
  border-top: 1px solid var(--border);
  text-align: center;
}
.footer-letter__inner {
  max-width: 400px;
  margin: 0 auto;
}
.footer-letter__closing {
  font-family: Georgia, serif;
  font-size: var(--body-lg);
  font-style: italic;
  color: var(--text-primary);
  margin: 0 0 var(--space-lg) 0;
}
.footer-letter__sign {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.footer-letter__name {
  font-family: Georgia, serif;
  font-weight: 600;
  color: var(--text-display);
}
.footer-letter__location {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--text-disabled);
}
```

---

### E6 · Statement（Ft5 - 入选）

> 变体旋钮：width:28ch/38ch/50ch · wordmark:under/top-right/none · rule:hairline/double/none

**含义**：结尾品牌宣言。"Built for the wild, since 1914." 独占一屏的收尾。

**HTML**:

```html
<footer class="footer-statement">
  <div class="footer-statement__inner">
    <span class="footer-statement__rule"></span>
    <div class="footer-statement__content">
      <span class="footer-statement__brand">BRAND STATEMENT</span>
      <p class="footer-statement__text">Engineered for Nature. Since 1914.</p>
      <span class="footer-statement__wm">Haglofs</span>
    </div>
  </div>
</footer>
```

**CSS**:

```css
.footer-statement {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.footer-statement__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  text-align: center;
}
.footer-statement__rule {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-display);
  margin-bottom: var(--space-3xl);
}
.footer-statement__content {
  max-width: 38ch;
  margin: 0 auto;
}
.footer-statement__brand {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  display: block;
  margin-bottom: var(--space-md);
}
.footer-statement__text {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  font-style: italic;
  color: var(--text-display);
  line-height: 1.2;
  margin: 0 0 var(--space-xl) 0;
}
.footer-statement__wm {
  font-family: Georgia, serif;
  font-size: var(--body);
  font-weight: 700;
  color: var(--text-disabled);
  letter-spacing: 0.02em;
}
```

**实现映射**：components.md #2 BRAND STATEMENT CARD（Footer 级别变体）。

---

### E7 · Code Block（实现 #41 · 基础组件）

**含义**：代码块。用于技术规格展示或 Footer 密集排印。

**HTML**:

```html
<pre class="code-block"><code>SHELL: Gore-Tex Pro 80D
WATERPROOF: 28,000mm
WEIGHT: 485g (L)</code></pre>
```

**CSS**:

```css
.code-block {
  background: var(--surface-alt);
  border-left: 2px solid var(--brand-primary);
  padding: 16px 20px; margin: 0; overflow-x: auto;
}
.code-block code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; line-height: 1.7; color: var(--text-primary);
}
```

**内联代码**：文本中的 `code` → `background: var(--surface-alt); padding: 2px 6px; border-radius: 2px;`

---

## F类 · Navigation（7个）

---

### F1 · ~~Wordmark+2 links~~（N1 - 排除）

> 变体旋钮：align:left/center · links:2/3 · cta:none/outlined

**含义**：最简导航。品牌名 + 两个链接。AI 指纹太重。

**HTML**:

```html
<nav class="nav-minimal">
  <span class="nav-minimal__wm">Haglofs</span>
  <div class="nav-minimal__links">
    <a href="#">Products</a>
    <a href="#">About</a>
  </div>
</nav>
```

**CSS**:

```css
.nav-minimal {
  padding: var(--space-md) var(--container-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
}
.nav-minimal__wm {
  font-family: Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-display);
}
.nav-minimal__links {
  display: flex;
  gap: var(--space-lg);
}
.nav-minimal__links a {
  font-size: var(--body-sm);
  color: var(--text-secondary);
  text-decoration: none;
}
.nav-minimal__links a:hover { color: var(--text-primary); }
```

---

### F2 · Floating Pill（N5 - 入选）

> 变体旋钮：width:content/720px/560px · backdrop:blur/solid/gradient · anchor:top-center/right/left

**含义**：现代户外感。浮动药丸导航，适合带摄影 Hero 的页面。

**HTML**:

```html
<nav class="nav-pill">
  <div class="nav-pill__inner">
    <span class="nav-pill__wm">Haglofs</span>
    <div class="nav-pill__links">
      <a href="#">Shell</a>
      <a href="#">Insulation</a>
      <a href="#">Base Layer</a>
    </div>
    <span class="nav-pill__cta">Shop FW25</span>
  </div>
</nav>
```

**CSS**:

```css
.nav-pill {
  position: fixed;
  top: var(--space-lg);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
.nav-pill__inner {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-sm) var(--space-lg);
  background: rgba(245, 243, 239, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
}
.nav-pill__wm {
  font-family: Georgia, serif;
  font-size: var(--body);
  font-weight: 700;
  color: var(--text-display);
  white-space: nowrap;
}
.nav-pill__links {
  display: flex;
  gap: var(--space-md);
}
.nav-pill__links a {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 150ms ease-out;
}
.nav-pill__links a:hover { color: var(--text-display); }
.nav-pill__cta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  padding: var(--space-xs) var(--space-md);
  background: var(--brand-primary);
  color: #fff;
  border-radius: var(--radius-full);
  white-space: nowrap;
}
```

**实现映射**：无直接对应，基于 N5 Hallmark 描述新建。

---

### F3 · ~~Side Rail~~（N8 - 排除）

> 变体旋钮：position:left/right · width:48/64/80 · items:icons/text/both

**含义**：侧边导航栏。不需要。

**HTML**:

```html
<nav class="nav-rail">
  <span class="nav-rail__icon">H</span>
  <a href="#" class="nav-rail__item active">
    <span class="nav-rail__dot"></span>
  </a>
  <a href="#" class="nav-rail__item">
    <span class="nav-rail__dot"></span>
  </a>
  <a href="#" class="nav-rail__item">
    <span class="nav-rail__dot"></span>
  </a>
</nav>
```

**CSS**:

```css
.nav-rail {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-lg) 0;
  border-right: 1px solid var(--border);
  background: var(--bg);
  z-index: 100;
}
.nav-rail__icon {
  font-family: Georgia, serif;
  font-weight: 700;
  font-size: var(--body);
  color: var(--text-display);
  margin-bottom: var(--space-lg);
}
.nav-rail__item {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-rail__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-disabled);
}
.nav-rail__item.active .nav-rail__dot {
  background: var(--text-display);
}
```

---

### F4 · ~~Cmd+K~~（N4 - 排除）

> 变体旋钮：style:modal/dropdown · results:list/cards · width:560/720

**含义**：命令面板搜索。不需要。

**HTML**:

```html
<div class="cmdk-overlay">
  <div class="cmdk">
    <input class="cmdk__input" placeholder="Search products, materials...">
    <div class="cmdk__results">
      <div class="cmdk__item">L.I.M Comp — Shell Jacket</div>
      <div class="cmdk__item">Frost Jacket — Insulation</div>
    </div>
  </div>
</div>
```

**CSS**:

```css
.cmdk-overlay {
  position: fixed;
  inset: 0;
  background: rgba(245, 243, 239, 0.92);
  display: flex;
  justify-content: center;
  padding-top: 20vh;
  z-index: 200;
}
.cmdk {
  width: 560px;
  background: var(--surface);
  border: 1px solid var(--border-strong);
}
.cmdk__input {
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: var(--body);
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-bottom: 1px solid var(--border);
  outline: none;
  background: transparent;
}
.cmdk__item {
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--body-sm);
  color: var(--text-primary);
  cursor: pointer;
}
.cmdk__item:hover { background: var(--surface-alt); }
```

---

### F5 · ~~Floating Chip~~（N2 - 排除）

> 变体旋钮：position:top-left/top-right · items:2/3 · style:pill/chip

**含义**：浮动芯片导航。太 SaaS。

**HTML**:

```html
<nav class="nav-chip">
  <a href="#" class="nav-chip__item active">All</a>
  <a href="#" class="nav-chip__item">Shell</a>
  <a href="#" class="nav-chip__item">Insulation</a>
</nav>
```

**CSS**:

```css
.nav-chip {
  position: absolute;
  top: var(--space-lg);
  left: var(--space-lg);
  display: flex;
  gap: var(--space-xs);
  z-index: 10;
}
.nav-chip__item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  padding: var(--space-xs) var(--space-md);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  text-decoration: none;
}
.nav-chip__item.active {
  background: var(--text-display);
  color: #fff;
  border-color: var(--text-display);
}
```

---

### F6 · Newspaper Masthead（N6 - 入选）

> 变体旋钮：issue-line:above/below/none · wordmark:3xl/2xl/xl · rule:double/single/none

**含义**：品牌系统页。Broadsheet 编辑感。适合设计原则页、品牌规范页。

**HTML**:

```html
<nav class="nav-mast">
  <div class="nav-mast__issue">
    <span class="nav-mast__issue-text">VOL. 1 / ISSUE 01 / MAY 2026</span>
  </div>
  <div class="nav-mast__rule nav-mast__rule--double"></div>
  <div class="nav-mast__main">
    <span class="nav-mast__wm">Haglofs</span>
    <span class="nav-mast__sub">BRAND DESIGN SYSTEM</span>
  </div>
  <div class="nav-mast__rule nav-mast__rule--single"></div>
  <div class="nav-mast__links">
    <a href="#">Components</a>
    <a href="#">Tokens</a>
    <a href="#">Guidelines</a>
    <a href="#">Examples</a>
  </div>
</nav>
```

**CSS**:

```css
.nav-mast {
  padding: var(--space-lg) var(--container-padding);
  text-align: center;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.nav-mast__issue-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  color: var(--text-disabled);
}
.nav-mast__rule {
  max-width: var(--container-max);
  margin: var(--space-sm) auto;
  height: 0;
  border-top: 1px solid var(--border);
}
.nav-mast__rule--double {
  border-bottom: 1px solid var(--border);
  height: 3px;
}
.nav-mast__main {
  padding: var(--space-md) 0;
}
.nav-mast__wm {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  display: block;
}
.nav-mast__sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--text-disabled);
}
.nav-mast__links {
  display: flex;
  justify-content: center;
  gap: var(--space-xl);
  padding-top: var(--space-sm);
}
.nav-mast__links a {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--text-secondary);
  text-decoration: none;
}
.nav-mast__links a:hover { color: var(--text-display); }
```

**实现映射**：无直接对应，基于 N6 Hallmark 描述新建。

---

### F7 · Edge-aligned Minimal（N9 - 入选）

> 变体旋钮：CTA:outlined/pill/text+arrow · wordmark:serif/sans/mono · padding:tight/default/spacious

**含义**：最极简。Apple 产品页风格。边对齐，无居中，安静。

**HTML**:

```html
<nav class="nav-edge">
  <div class="nav-edge__inner">
    <span class="nav-edge__wm">Haglofs</span>
    <div class="nav-edge__right">
      <a href="#" class="nav-edge__link">Products</a>
      <a href="#" class="nav-edge__link">Technology</a>
      <a href="#" class="nav-edge__link">Sustainability</a>
      <a href="#" class="nav-edge__cta">Shop &rarr;</a>
    </div>
  </div>
</nav>
```

**CSS**:

```css
.nav-edge {
  position: sticky;
  top: 0;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  z-index: 100;
  padding: 0 var(--container-padding);
}
.nav-edge__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}
.nav-edge__wm {
  font-family: Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--text-display);
}
.nav-edge__right {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}
.nav-edge__link {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-sm);
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 150ms ease-out;
}
.nav-edge__link:hover { color: var(--text-primary); }
.nav-edge__cta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  text-decoration: none;
  padding: var(--space-xs) var(--space-md);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  transition: border-color 150ms ease-out;
}
.nav-edge__cta:hover { border-color: var(--text-primary); }
```

**实现映射**：components.md #8 NAVIGATION BAR（原版实现）。

---

## G类 · Brand System（9个）

---

### G1 · Color Swatch Grid（BS1 - 入选）

> 变体旋钮：layout:row/grid/stacked · hover:scale/border/shadow/none · labels:name+hex/name/hex/none

**含义**：品牌色板展示。Core -> Landscape -> Signal 三级分层。

**HTML**:

```html
<section class="swatch-grid">
  <div class="swatch-grid__header">
    <span class="sl">COLOR SYSTEM</span>
    <h2 class="swatch-grid__title">Brand Palette</h2>
  </div>
  <div class="swatch-grid__grid">
    <div class="swatch-card">
      <div class="swatch-card__color" style="background: var(--text-display);">
        <span class="swatch-card__token">darkgray</span>
      </div>
      <div class="swatch-card__info">
        <div class="swatch-card__name">Dark Gray</div>
        <div class="swatch-card__desc">Brand foundation, text, logos</div>
        <div class="swatch-card__values">
          <span>#2D2A26</span>
          <span>45,42,38</span>
        </div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-card__color" style="background: var(--brand-primary);">
        <span class="swatch-card__token">olive</span>
      </div>
      <div class="swatch-card__info">
        <div class="swatch-card__name">Olive</div>
        <div class="swatch-card__desc">Outdoor DNA, product primary</div>
        <div class="swatch-card__values">
          <span>#4A6741</span>
          <span>74,103,65</span>
        </div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-card__color" style="background: var(--brand-secondary);">
        <span class="swatch-card__token">earth</span>
      </div>
      <div class="swatch-card__info">
        <div class="swatch-card__name">Earth</div>
        <div class="swatch-card__desc">Material warmth, natural texture</div>
        <div class="swatch-card__values">
          <span>#7A9B6D</span>
          <span>122,155,109</span>
        </div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-card__color" style="background: var(--signal-caution);">
        <span class="swatch-card__token">yellow</span>
      </div>
      <div class="swatch-card__info">
        <div class="swatch-card__name">Yellow</div>
        <div class="swatch-card__desc">CTA, safety identification</div>
        <div class="swatch-card__values">
          <span>#E8B83C</span>
          <span>232,184,60</span>
        </div>
      </div>
    </div>
    <div class="swatch-card">
      <div class="swatch-card__color" style="background: var(--signal-warning);">
        <span class="swatch-card__token">orange</span>
      </div>
      <div class="swatch-card__info">
        <div class="swatch-card__name">Orange</div>
        <div class="swatch-card__desc">Visual focus, highlights</div>
        <div class="swatch-card__values">
          <span>#E87A3C</span>
          <span>232,122,60</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS**:

```css
.swatch-grid {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.swatch-grid__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.swatch-grid__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 0 0;
}
.swatch-grid__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-md);
}
.swatch-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.swatch-card__color {
  height: 100px;
  display: flex;
  align-items: flex-end;
  padding: var(--space-sm);
}
.swatch-card__token {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
.swatch-card__info {
  padding: var(--space-sm) var(--space-md);
}
.swatch-card__name {
  font-weight: 600;
  font-size: var(--body-sm);
  margin-bottom: 2px;
}
.swatch-card__desc {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}
.swatch-card__values {
  display: flex;
  gap: var(--space-sm);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-disabled);
}
```

**实现映射**：components.md #4 COLOR SWATCH（网格扩展）。

---

### G2 · Typography Showcase（BS2 - 入选）

> 变体旋钮：anchor:letter/word/specimen · sticky:yes/no · border:hairline/none

**含义**：字体家族展示。Headline -> Text -> Italic -> Mono -> Numeral。

**HTML**:

```html
<section class="type-showcase">
  <div class="type-showcase__header">
    <span class="sl">TYPOGRAPHY</span>
    <h2 class="type-showcase__title">Type System</h2>
  </div>
  <div class="type-showcase__grid">
    <div class="type-showcase__specimen">
      <span class="type-showcase__role">DISPLAY / HEADLINE</span>
      <div class="type-showcase__sample type-showcase__sample--georgia">Haglofs</div>
      <span class="type-showcase__font">Georgia / System Serif</span>
    </div>
    <div class="type-showcase__specimen">
      <span class="type-showcase__role">BODY</span>
      <div class="type-showcase__sample type-showcase__sample--inter">Engineered for Nature</div>
      <span class="type-showcase__font">Inter / Google Fonts</span>
    </div>
    <div class="type-showcase__specimen">
      <span class="type-showcase__role">DATA / LABELS</span>
      <div class="type-showcase__sample type-showcase__sample--mono">GORE-TEX PRO 80D</div>
      <span class="type-showcase__font">JetBrains Mono / Google Fonts</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.type-showcase {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.type-showcase__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.type-showcase__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 0 0;
}
.type-showcase__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.type-showcase__specimen {
  padding: var(--space-xl) 0;
  border-bottom: 1px solid var(--border);
}
.type-showcase__specimen:last-child { border-bottom: none; }
.type-showcase__role {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-disabled);
  display: block;
  margin-bottom: var(--space-md);
}
.type-showcase__sample--georgia {
  font-family: Georgia, serif;
  font-size: var(--display-xl);
  font-weight: 700;
  color: var(--text-display);
  line-height: 1.05;
}
.type-showcase__sample--inter {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-lg);
  color: var(--text-primary);
  line-height: 1.6;
}
.type-showcase__sample--mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  letter-spacing: 0.06em;
  color: var(--text-secondary);
}
.type-showcase__font {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--text-disabled);
  display: block;
  margin-top: var(--space-md);
}
```

**实现映射**：components.md 无直接对应，基于 BS2 Hallmark 描述新建。

---

### G3 · Symbol Evolution（BS3 - 入选）

> 变体旋钮：layout:horizontal/vertical · arrow:line/dots/chevron · caption:below/inside/none

**含义**：品牌标志演进。Before -> After 对比。Dot-matrix H + Classic H 双形态展示。

**HTML**:

```html
<section class="symbol-evo">
  <div class="symbol-evo__header">
    <span class="sl">SYMBOL EVOLUTION</span>
    <h2 class="symbol-evo__title">Brand Mark</h2>
  </div>
  <div class="symbol-evo__grid">
    <div class="symbol-evo__item">
      <span class="symbol-evo__label">BEFORE</span>
      <div class="dm-logo" data-size="lg">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot empty"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot empty"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
      </div>
      <span class="symbol-evo__desc">Classic serif H</span>
    </div>
    <div class="symbol-evo__arrow">
      <span class="symbol-evo__arrow-line"></span>
      <span class="symbol-evo__arrow-dot"></span>
    </div>
    <div class="symbol-evo__item">
      <span class="symbol-evo__label">AFTER</span>
      <div class="dm-logo" data-size="lg">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot empty"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot empty"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot"></div>
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
      </div>
      <span class="symbol-evo__desc">Dot-matrix H</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.symbol-evo {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.symbol-evo__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.symbol-evo__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 0 0;
}
.symbol-evo__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2xl);
}
.symbol-evo__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}
.symbol-evo__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-disabled);
}
.symbol-evo__desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-sm);
  color: var(--text-secondary);
}
.symbol-evo__arrow {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}
.symbol-evo__arrow-line {
  width: 48px;
  height: 1px;
  background: var(--border-strong);
}
.symbol-evo__arrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--signal-warning);
}
.dm-logo {
  display: grid;
  grid-template-columns: repeat(5, 12px);
  grid-template-rows: repeat(7, 12px);
  gap: 4px;
}
.dm-logo .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--text-display);
}
.dm-logo .dot.empty { background: transparent; }
```

**实现映射**：components.md #6 DOT-MATRIX LOGO（Before/After 对比变体）。

---

### G4 · Numeral Grid（BS4 - 入选）

> 变体旋钮：columns:2/3/4 · size:square/wide/tall · hover:background/scale/none

**含义**：技术数字网格。Mark / Season / Layer / Range / Founded。

**HTML**:

```html
<section class="numeral-grid">
  <div class="numeral-grid__header">
    <span class="sl">NUMERALS</span>
    <h2 class="numeral-grid__title">By the Numbers</h2>
  </div>
  <div class="numeral-grid__grid">
    <div class="numeral-grid__item">
      <span class="numeral-grid__value">111</span>
      <span class="numeral-grid__label">YEARS</span>
      <span class="numeral-grid__sub">Founded 1914</span>
    </div>
    <div class="numeral-grid__item">
      <span class="numeral-grid__value">FW25</span>
      <span class="numeral-grid__label">SEASON</span>
      <span class="numeral-grid__sub">Current collection</span>
    </div>
    <div class="numeral-grid__item">
      <span class="numeral-grid__value">3</span>
      <span class="numeral-grid__label">LAYERS</span>
      <span class="numeral-grid__sub">Shell / Insulation / Base</span>
    </div>
    <div class="numeral-grid__item">
      <span class="numeral-grid__value">28K</span>
      <span class="numeral-grid__label">MM</span>
      <span class="numeral-grid__sub">Waterproof rating</span>
    </div>
  </div>
</section>
```

**CSS**:

```css
.numeral-grid {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.numeral-grid__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.numeral-grid__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 0 0;
}
.numeral-grid__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
}
.numeral-grid__item {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.numeral-grid__value {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--display-lg);
  font-weight: 600;
  color: var(--text-display);
  line-height: 1;
}
.numeral-grid__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.numeral-grid__sub {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: var(--text-disabled);
  margin-top: var(--space-xs);
}
```

**实现映射**：components.md #17 METRIC CARD（多列网格变体）。

---

### G5 · Tension Grid（BS5 - 入选）

> 变体旋钮：layout:2x2/1-col/strip · divider:hairline/dots/arrow/none · number:show/hide

**含义**：核心张力网格。Heritage vs Future / Nature vs Tech / Fixed vs Fluid。品牌设计系统的灵魂组件。

**HTML**:

```html
<section class="tension-grid">
  <div class="tension-grid__header">
    <span class="sl">CORE TENSIONS</span>
    <h2 class="tension-grid__title">Design Philosophy</h2>
  </div>
  <div class="tension-grid__grid">
    <div class="tension-grid__item">
      <span class="tension-grid__num">01</span>
      <div class="tension-grid__pair">
        <span class="tension-grid__side">Heritage</span>
        <span class="tension-grid__vs">vs</span>
        <span class="tension-grid__side">Future</span>
      </div>
      <p class="tension-grid__desc">111 年品牌积淀与现代几何图形的交汇。经典 H 标志 + 点阵变体。</p>
    </div>
    <div class="tension-grid__item">
      <span class="tension-grid__num">02</span>
      <div class="tension-grid__pair">
        <span class="tension-grid__side">Nature</span>
        <span class="tension-grid__vs">vs</span>
        <span class="tension-grid__side">Tech</span>
      </div>
      <p class="tension-grid__desc">有机材质与工程精度并存。Gore-Tex 的科技内核，手工缝制的温度。</p>
    </div>
    <div class="tension-grid__item">
      <span class="tension-grid__num">03</span>
      <div class="tension-grid__pair">
        <span class="tension-grid__side">Organic</span>
        <span class="tension-grid__vs">vs</span>
        <span class="tension-grid__side">Engineered</span>
      </div>
      <p class="tension-grid__desc">大地色系的自然感 + 无阴影的工程美学。border 替代 shadow。</p>
    </div>
    <div class="tension-grid__item">
      <span class="tension-grid__num">04</span>
      <div class="tension-grid__pair">
        <span class="tension-grid__side">Fixed</span>
        <span class="tension-grid__vs">vs</span>
        <span class="tension-grid__side">Fluid</span>
      </div>
      <p class="tension-grid__desc">8px 网格的刚性结构 + Bento 混排的有机流动。</p>
    </div>
  </div>
</section>
```

**CSS**:

```css
.tension-grid {
  padding: var(--space-4xl) var(--container-padding);
  background: var(--bg);
}
.tension-grid__header {
  max-width: var(--container-max);
  margin: 0 auto var(--space-xl);
}
.tension-grid__title {
  font-family: Georgia, serif;
  font-size: var(--display-md);
  font-weight: 700;
  color: var(--text-display);
  margin: var(--space-sm) 0 0 0;
}
.tension-grid__grid {
  max-width: var(--container-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
}
.tension-grid__item {
  background: var(--surface);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
.tension-grid__num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--text-disabled);
}
.tension-grid__pair {
  display: flex;
  align-items: baseline;
  gap: var(--space-md);
}
.tension-grid__side {
  font-family: Georgia, serif;
  font-size: var(--heading-lg);
  font-weight: 700;
  color: var(--text-display);
}
.tension-grid__vs {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--signal-warning);
  font-weight: 600;
}
.tension-grid__desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--body-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}
```

**实现映射**：components.md #15 PRINCIPLE CARD + #23 DO/DON'T COMPARISON（融合为张力对比网格）。

---

### G6 · Color Swatch（实现 #4 · 基础组件）

**含义**：单个色板卡。设计系统页面的 Token 展示卡。和 G1 Color Swatch Grid 是单个卡 vs 网格的区别。

**HTML**:

```html
<div class="swatch-card">
  <div class="swatch-card__color" style="background: var(--brand-primary);">
    <span class="swatch-card__token">olive</span>
  </div>
  <div class="swatch-card__info">
    <div class="swatch-card__name">军绿</div>
    <div class="swatch-card__desc">产品主色、户外属性传递</div>
    <div class="swatch-card__values">
      <span>#4A6741</span>
      <span>74,103,65</span>
    </div>
  </div>
</div>
```

**CSS**:

```css
.swatch-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.swatch-card__color {
  height: 100px;
  display: flex;
  align-items: flex-end;
  padding: var(--space-sm);
}
.swatch-card__token {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 6px;
  border-radius: 2px;
  background: rgba(255,255,255,0.15);
  color: #fff;
}
.swatch-card__info { padding: var(--space-sm) var(--space-md); }
.swatch-card__name {
  font-weight: 600;
  font-size: var(--body-sm);
  margin-bottom: 2px;
}
.swatch-card__desc {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: var(--space-xs);
}
.swatch-card__values {
  display: flex;
  gap: var(--space-sm);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--text-disabled);
}
```

---

### G7 · Dot-Matrix Logo（实现 #6 · 基础组件）

**含义**：静态点阵 H logo。CSS grid 渲染的品牌 Logo。和 G3 Symbol Evolution 是静态 logo vs 演进对比的区别。

**HTML**:

```html
<div class="dm-logo" data-size="md">
  <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
  <div class="dot"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot"></div>
  <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot empty"></div><div class="dot"></div>
  <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
  <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot empty"></div><div class="dot"></div>
  <div class="dot"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot empty"></div><div class="dot"></div>
  <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
</div>
```

**CSS**:

```css
.dm-logo {
  display: grid;
  grid-template-columns: repeat(5, var(--dot-size, 8px));
  grid-template-rows: repeat(7, var(--dot-size, 8px));
  gap: var(--dot-gap, 3px);
}
.dm-logo[data-size="sm"] { --dot-size: 4px; --dot-gap: 2px; }
.dm-logo[data-size="md"] { --dot-size: 8px; --dot-gap: 3px; }
.dm-logo[data-size="lg"] { --dot-size: 12px; --dot-gap: 4px; }
.dm-logo[data-size="xl"] { --dot-size: 16px; --dot-gap: 5px; }
.dm-logo .dot {
  width: var(--dot-size, 8px);
  height: var(--dot-size, 8px);
  border-radius: 50%;
  background: var(--text-display);
}
.dm-logo .dot.empty { background: transparent; }
```

**最小尺寸**：sm = 4px 点（仅数字端）。lg = 12px（印刷最小值）。

---

### G8 · Principle Card（实现 #15 · 基础组件）

**含义**：设计原则对比卡。标题 + 对比行布局。和 G5 Tension Grid 结构不同——这是单卡内的行对比，不是网格。

**HTML**:

```html
<div class="principle-card">
  <div class="principle-card__title">历史与未来</div>
  <div class="principle-card__row">
    <span class="principle-card__side">111 年品牌积淀</span>
    <span class="principle-card__vs">vs</span>
    <span class="principle-card__side">现代几何图形</span>
  </div>
  <div class="principle-card__row">
    <span class="principle-card__side" style="color:var(--text-primary);font-weight:500;">体现</span>
    <span class="principle-card__vs"></span>
    <span class="principle-card__side" style="color:var(--text-primary);font-weight:500;">经典 H + 点阵变体</span>
  </div>
</div>
```

**CSS**:

```css
.principle-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: var(--space-lg);
}
.principle-card__title {
  font-family: Georgia, serif;
  font-size: var(--heading-md);
  font-weight: 700;
  margin-bottom: var(--space-md);
}
.principle-card__row {
  display: flex;
  justify-content: space-between;
  font-size: var(--body-sm);
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--border);
}
.principle-card__row:last-child { border-bottom: none; }
.principle-card__side { color: var(--text-secondary); max-width: 40%; }
.principle-card__vs {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--signal-warning);
  font-weight: 600;
}
```

---

### G9 · Do/Don't Comparison（实现 #23 · 基础组件）

**含义**：二元规则对比。用于政策展示、品牌指南、合规规则。和 G5 Tension Grid 结构不同——这是双列 AVOID/PREFER 对比。

**HTML**:

```html
<div class="compare-grid">
  <div class="compare-col compare-col--avoid">
    <div class="compare-header">
      <span class="compare-marker">&times;</span>
      <span class="compare-title">AVOID</span>
    </div>
    <div class="compare-row">
      <span class="compare-icon">&times;</span>
      <span data-edit>Rule to avoid</span>
    </div>
  </div>
  <div class="compare-col compare-col--prefer">
    <div class="compare-header">
      <span class="compare-marker">&middot;</span>
      <span class="compare-title">PREFER</span>
    </div>
    <div class="compare-row">
      <span class="compare-icon">&middot;</span>
      <span data-edit>Preferred approach</span>
    </div>
  </div>
</div>
```

**CSS**:

```css
.compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.compare-col { border: 1px solid var(--border-strong); padding: 20px; }
.compare-header {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 16px; padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.compare-col--avoid .compare-marker { color: var(--signal-warning); }
.compare-col--prefer .compare-marker { color: var(--text-display); }
.compare-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}
.compare-row { display: flex; align-items: flex-start; gap: 8px; padding: 8px 0; }
.compare-col--avoid .compare-icon { color: var(--signal-warning); }
.compare-col--prefer .compare-icon { color: var(--text-display); }
.compare-row span:last-child { font-size: 14px; color: var(--text-primary); line-height: 1.5; }
```

---

## 附录：组件与实现映射表

| 实现组件 | 编号 | Hallmark 映射 | 基础组件映射 | 复用方式 |
|---------|------|---------|---------|---------|
| #1 PRODUCT CARD | — | C6 | C11 | 产品卡片网格 / 单卡 |
| #2 BRAND STATEMENT CARD | — | E6 / A3 | C12 | 品牌宣言卡 / Footer宣言 |
| #3 SPEC TABLE | — | C3 / A2 | — | 规格表 / 对屏侧面板 |
| #4 COLOR SWATCH | — | G1 | G6 | 色板网格 / 单色板卡 |
| #5 TAG | — | F5 | D8 | 浮动标签 / 内联标签 |
| #6 DOT-MATRIX LOGO | — | G3 | G7 | 标志演进 / 静态logo |
| #7 DOT PATTERN | — | B类 | C16 | 装饰背景 |
| #8 NAVIGATION BAR | — | F7 / E1 / E2 | — | 导航 / Footer |
| #9 SCENE OVERLAY | — | A6 / C2 | — | 全屏影像 / 滚动栈 |
| #10 PROGRESS BAR | — | D类 | D9 | 分段进度条 |
| #11 INLINE BAR | — | D类 | D10 | 行内进度条 |
| #12 THREE-COLUMN GRID | — | C7 / C1 | — | 三列布局 / Bento |
| #13 STATE PATTERNS | — | 通用 | C13 | 状态模式 |
| #14 APPLICATION CARD | — | C6 | C14 | 产品卡片变体 / 应用场景卡 |
| #15 PRINCIPLE CARD | — | G5 | G8 | 张力网格 / 原则对比卡 |
| #16 SEGMENTED BLOCK BAR | — | D类 | D11 | 分段块条 |
| #17 METRIC CARD | — | G4 | D12 | 数字网格 / LED仪表卡 |
| #18 NAMEPLATE LABEL | — | G类 | D13 | 标签辅助 / 工业标签 |
| #19 SEAM DIVIDER | — | B5 | B7 | 底部锚定 / 渐变分隔线 |
| #20 DECORATIVE NUMBER HEADER | — | B1 | B6 | 左侧编号 / 右上角大数字 |
| #21 GAUGE ARC | — | D类 | D14 | 弧形仪表 |
| #22 FLOW PIPELINE | — | C4 | C15 | 步骤序列 / 横向流程线 |
| #23 DO/DON'T COMPARISON | — | G5 | G9 | 张力网格 / 二元规则对比 |
| #24 TAB PANEL | — | C8 | — | 标签面板 |
| #25 ACCORDION | — | C9 | — | 折叠面板 |
| #26 CHECKLIST | — | C10 | — | 清单 |
| #27 DETAIL PANEL | — | C5 | C17 | 标注截图 / 全屏详情面板 |
| #28 ASYMMETRIC COMPARISON | — | C类 | C18 | 非对称对比表 |
| #29 SEGMENTED CONTROL | — | C类 | C19 | 分段选择器 |
| #30 DECORATIVE BACKGROUND | — | B类 | A8 | 装饰背景数字 |
| #31 DOT-MATRIX GLYPH | — | A7 | A9 | 自定义插画 / 前景点阵字符 |
| #32 SVG SPARKLINE | — | D类 | D15 | 迷你趋势图 |
| #33 REFERENCE LINE OVERLAY | — | D类 | D16 | 参考线叠加 |
| #34 CALLOUT/ANNOTATION | — | D类 | C20 | 注释块 |
| #35 TIMELINE/ERA CONNECTOR | — | C4 | C21 | 步骤序列变体 / 时间线 |
| #36 DATA SPOTLIGHT | — | D7 | D17 | 数字聚焦 / 内联数据聚焦 |
| #37 BUTTONS | — | D1 | D18 | 排印链接 / 按钮组件 |
| #38 INPUTS | — | D3 | C23 | 行内表单 / 输入框 |
| #39 TOGGLE/SWITCH | — | 通用 | C24 | 开关交互 |
| #40 BLOCKQUOTE/PULL-QUOTE | — | D6 / D4 / A3 | D19 | 大引言 / 拉引言 / 内联引言 |
| #41 CODE BLOCK | — | E4 | E7 | 密集排印 Footer / 代码块 |
| #42 ALERT/INLINE STATUS | — | 通用 | C22 | 行内状态 / 状态提示 |

---

*共 82 个组件条目。Hallmark 入选 29 个（实线），Hallmark 排除 13 个（删除线），Hallmark 基础/通用 5 个（C7-C10 + 通用状态），原有实现基础组件 35 个（A8-A9 / B6-B7 / C11-C24 / D8-D19 / E7 / G6-G9）。*
