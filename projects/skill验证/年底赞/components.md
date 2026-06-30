# Digital Nomad Work Infrastructure — Components Library

> 29个组件按功能大类聚合，每个大类包含：变体汇总表 → 组件DOM+CSS → 状态定义 → Do/Don't → 关键细节。
> 颜色全部引用 `tokens.md` 中的 token 变量，保持与 tokens.md 联动。

---

## 组件总览（按大类）

| 大类 | 组件数 | 包含组件 |
|------|--------|----------|
| 1. Containers | 2 | PageShell, CoverLayout |
| 2. Typography | 2 | TitleBlock, BodyText |
| 3. Labels & Tags | 3 | PillTag, PageHeader, DecorCircle |
| 4. Cards | 5 | DataCard, GridCard, ColumnCard, ImageStripCard, PointCard |
| 5. Lists & Boxes | 3 | StepList, InfoBox, HighlightItem |
| 6. Flow & Architecture | 3 | FlowDiagram, TriangleHierarchy, TreeArchitecture |
| 7. Charts & Data Viz | 6 | PyramidStack, BarChart, GanttChart, DataTable, QuarterBar, RadialDataDisplay |
| 8. Decorative | 3 | OrbGradient, CornerGradient, CircleCollage |
| 9. Device & Image | 1 | DeviceMockup |

---

# 1. CONTAINERS / 容器层

> 页面最外层结构，承载主题、边距、安全区域。

## 变体汇总

| 组件 | 变体 | 触发条件 |
|------|------|----------|
| PageShell | `theme-light` | 白底页面（P03-P05, P09, P11-P12） |
| PageShell | `theme-dark` | 深黑底页面（P01, P06-P08, P10） |
| PageShell | `theme-cream` | 米色底页面（仅P02） |
| CoverLayout | 无变体 | 仅P01使用 |

---

### 1.1 PageShell

**用途**：每页最外层容器，承载主题声明、页面边距、安全区域。

**出现页面**：全部29页（两套PPT）

#### DOM Structure

```html
<section class="slide" data-theme="light">
  <!-- 页面内容 -->
</section>
```

#### CSS Specification

```css
.slide {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding: var(--page-padding-y) var(--page-padding-x);
  display: flex;
  flex-direction: column;
}

.slide[data-theme="light"] {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.slide[data-theme="dark"] {
  background: var(--bg-primary-dark);
  color: var(--text-primary-dark);
}

.slide[data-theme="cream"] {
  background: var(--bg-secondary);
  color: var(--text-primary);
}
```

#### States

| State | 说明 |
|-------|------|
| Default | 标准主题状态 |

#### Do / Don't

- **Do**：每页独立 `<section>`，不可嵌套
- **Do**：`overflow: hidden` 防止出血元素产生滚动条
- **Don't**：一页内混用多种主题

#### Critical Details
- 三种主题通过 `data-theme` 属性切换，非 class
- 所有子组件通过 CSS 变量继承主题色
- 画布比例 16:9，推荐实现宽度 1920px

---

### 1.2 CoverLayout

**用途**：封面特殊布局——球体背景 + 衬线标题 + 轨道线 + 角标。

**出现页面**：P01（仅封面）

#### DOM Structure

```html
<section class="slide" data-theme="dark">
  <div class="decor-circle" style="top:60px; right:80px;"></div>
  <div class="orb"></div>
  <div class="orbit orbit-1"></div>
  <div class="orbit orbit-2"></div>
  <div class="orbit orbit-3"></div>
  
  <div class="cover-top-label">Digital Nomad Deck</div>
  
  <div class="cover-main">
    <h1 class="cover-title">Digital Nomad<br>Work Infrastructure</h1>
    <p class="cover-subtitle">A connected ecosystem...</p>
  </div>
  
  <div class="cover-bottom-right">
    <svg class="icon-earth" width="20" height="20"><!-- 地球线框图标 --></svg>
    <span>Productivity Systems for Remote Teams</span>
  </div>
</section>
```

#### CSS Specification

```css
.cover-page {
  background: var(--bg-primary-dark);
  color: var(--text-primary-dark);
  justify-content: space-between;
}

.cover-top-label {
  font-family: var(--font-serif);
  font-size: var(--text-caption);
  opacity: 0.8;
  position: relative;
  z-index: 2;
}

.cover-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.cover-title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  line-height: 1.08;
  font-weight: var(--font-regular);
  max-width: 700px;
}

.cover-subtitle {
  font-size: var(--text-body);
  opacity: 0.7;
  max-width: 500px;
  margin-top: var(--space-8);
  line-height: 1.6;
}

.cover-bottom-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 13px;
  opacity: 0.7;
  position: relative;
  z-index: 2;
}

.orb {
  position: absolute;
  width: 55vw;
  height: 55vw;
  max-width: 700px;
  max-height: 700px;
  border-radius: var(--radius-full);
  background: var(--gradient-orb);
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.orbit {
  position: absolute;
  border: 0.5px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-full);
  z-index: 0;
}

.orbit-1 { width: 70vw; height: 35vw; right: -5%; top: 30%; transform: rotate(-15deg); }
.orbit-2 { width: 60vw; height: 30vw; right: 0%; top: 45%; transform: rotate(10deg); }
.orbit-3 { width: 50vw; height: 25vw; right: 5%; top: 55%; transform: rotate(-5deg); }
```

#### Do / Don't

- **Do**：球体偏右下（`right: 5%`），不居中
- **Do**：标题偏左上，与球体形成对角线平衡
- **Do**：3条轨道线有不同旋转角度（-15deg, 10deg, -5deg）
- **Don't**：封面不可使用无衬线字体（唯一例外）
- **Don't**：轨道线不可过粗（最大0.5px）

#### Critical Details
- 球体z-index:1，文字z-index:2，轨道线z-index:0
- 地球图标为20px线框SVG，白色
- 球体直径约占画面55%
- 整份PPT仅此一处使用衬线字体和渐变

---

# 2. TYPOGRAPHY / 排版层

> 文字内容的标准化呈现。

## 变体汇总

| 组件 | 变体 | 差异点 |
|------|------|--------|
| TitleBlock | `stacked` | 标题与描述上下堆叠（默认） |
| TitleBlock | `inline` | 标题与描述左右并排 |
| BodyText | `light` | 颜色 `#4A4A4A`（Light主题） |
| BodyText | `dark` | 颜色 `rgba(255,255,255,0.6)`（Dark主题） |

---

### 2.1 TitleBlock

**用途**：页面标题区标准组合——大标题 + 描述段落。

**出现页面**：P02-P12（两套PPT的标题页）

#### DOM Structure（stacked 变体）

```html
<div class="title-block title-block-stacked">
  <h1 class="text-h1">Flexible Work Needs<br>More Than Freedom</h1>
  <p class="text-body max-w-md">Digital nomads rely on fast, reliable tools...</p>
</div>
```

#### DOM Structure（inline 变体）

```html
<div class="title-block title-block-inline">
  <h1 class="text-h1 max-w-lg">Create a remote work system linking people, tools, and tasks</h1>
  <p class="text-body max-w-md">A connected workflow ensures...</p>
</div>
```

#### CSS Specification

```css
.title-block { margin-bottom: var(--space-12); }

.title-block-stacked {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.title-block-inline {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-10);
}

.title-block-inline h1 { flex: 1; }
.title-block-inline p { flex: 1; max-width: 480px; }
```

#### Do / Don't

- **Do**：标题最多3行，每行不超过6个单词
- **Do**：描述段落最大宽度 `480px`
- **Don't**：标题使用全大写（Sentence case 即可）
- **Don't**：inline 变体中标题和描述宽度不可超过 50% 各半

#### Critical Details
- 标题区底部与呼吸留白区之间无额外间距（由 ZoneSystem 统一控制）
- 长标题按语义换行（在介词/连词前），非按字符数强制换行

---

### 2.2 BodyText

**用途**：正文段落，14px标准正文。

**出现页面**：P02-P12

#### DOM Structure

```html
<p class="text-body max-w-md">正文内容...</p>
```

#### CSS Specification

```css
.text-body {
  font-size: var(--text-body);
  line-height: 1.6;
  font-weight: var(--font-regular);
  max-width: 480px;
}

[data-theme="light"] .text-body,
[data-theme="cream"] .text-body {
  color: var(--text-secondary);
}

[data-theme="dark"] .text-body {
  color: var(--text-secondary-dark);
}
```

#### Do / Don't

- **Do**：所有正文段落必须有 `max-width: 480px`
- **Do**：多段落之间间距 `24px`
- **Don't**：Dark 主题正文不可使用纯白（必须用 `rgba(255,255,255,0.6)`）

---

# 3. LABELS & TAGS / 标签层

> 小型信息标记和装饰元素。

## 变体汇总

| 组件 | 变体 | 背景 | 文字色 | 圆角 |
|------|------|------|--------|------|
| PillTag | `light` | `#E8E4DC` | `#666666` | 9999px |
| PillTag | `dark` | `#333333` | `rgba(255,255,255,0.6)` | 9999px |
| PageHeader | `light` | 透明 | `#1A1A1A` | — |
| PageHeader | `dark` | 透明 | `#FFFFFF` | — |
| DecorCircle | 无 | 双色渐变 | — | 50% |

---

### 3.1 PillTag

**用途**：胶囊形标签，标记数据类别或甘特图阶段。

**出现页面**：P02, P09

#### DOM Structure

```html
<span class="pill-tag pill-tag-light">Impact</span>
```

#### CSS Specification

```css
.pill-tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-caption);
  font-weight: var(--font-regular);
  line-height: 1.4;
}

.pill-tag-light {
  background: var(--silver);
  color: var(--mid-gray);
}

.pill-tag-dark {
  background: var(--charcoal);
  color: rgba(255,255,255,0.6);
}
```

#### Do / Don't

- **Do**：圆角必须为 `9999px`（完全pill）
- **Do**：内边距 `4px 12px`
- **Don't**：不可换行，单行显示

---

### 3.2 PageHeader

**用途**：页眉系统，品牌名+页码+年份。

**出现页面**：品牌战略PPT全部页面

#### DOM Structure

```html
<div class="page-header">
  <span class="ph-brand">LEADER LEGACY</span>
  <span class="ph-divider"></span>
  <span class="ph-number">01</span>
  <span class="ph-year">2026</span>
</div>
```

#### CSS Specification

```css
.page-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-divider);
}

.ph-brand {
  font-size: 11px;
  font-weight: var(--font-bold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ph-divider {
  width: 1px;
  height: 12px;
  background: rgba(0,0,0,0.2);
}

.ph-number, .ph-year {
  font-size: 11px;
  font-weight: var(--font-regular);
  color: var(--mid-gray);
}

.ph-year { margin-left: auto; }

[data-theme="dark"] .page-header {
  border-bottom-color: var(--border-divider-dark);
}

[data-theme="dark"] .ph-divider {
  background: rgba(255,255,255,0.2);
}

[data-theme="dark"] .ph-number,
[data-theme="dark"] .ph-year {
  color: rgba(255,255,255,0.4);
}
```

#### Do / Don't

- **Do**：品牌名全大写，字间距 `0.08em`
- **Do**：年份右对齐
- **Don't**：页眉高度不可超过页面高度的 5%

---

### 3.3 DecorCircle

**用途**：双色装饰圆，签名式视觉锚点。

**出现页面**：P01, P02

#### DOM Structure

```html
<div class="decor-circle" style="top:60px; right:80px;"></div>
```

#### CSS Specification

```css
.decor-circle {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  background: conic-gradient(var(--black) 0deg 180deg, var(--orange) 180deg 360deg);
  position: absolute;
}
```

#### Do / Don't

- **Do**：固定尺寸 24×24px
- **Do**：置于对角线位置（P01右上、P02左下）
- **Don't**：不可放大或改变比例

---

# 4. CARDS / 卡片层

> 信息以卡片为载体，支持多种底色变体。

## 变体汇总

| 组件 | 变体 | 背景 | 边框 | 文字色 | 特殊 |
|------|------|------|------|--------|------|
| DataCard | 无 | `rgba(255,255,255,0.6)` | `1px rgba(0,0,0,0.08)` | `#1A1A1A` | 半透明 |
| GridCard | `white` | `#FFFFFF` | `1px #E8E8E8` | `#1A1A1A` | 默认 |
| GridCard | `warm` | `#F5F0E8` | 无 | `#1A1A1A` | 暖米底 |
| GridCard | `dark-brown` | `#3A3228` | 无 | `#FFFFFF` | 深棕底，白字 |
| ColumnCard | `image` | `#FFFFFF` | `1px #E8E8E8` | `#1A1A1A` | 顶部有图 |
| ColumnCard | `number` | `#FFFFFF` | `1px #E8E8E8` | `#1A1A1A` | 顶部水印编号 |
| ImageStripCard | 无 | `#FFFFFF` | `1px #E8E8E8` | `#1A1A1A` | 底部8px橙条 |
| PointCard | 无 | `#FFFFFF` | `1px #E8E8E8` | `#1A1A1A` | "Point - 01."编号 |

---

### 4.1 DataCard

**用途**：数据展示卡片——标题 + 大号数值 + PillTag。

**出现页面**：P02

#### DOM Structure

```html
<div class="data-card">
  <div class="text-caption">Faster async updates</div>
  <div class="data-value">+40%</div>
  <span class="pill-tag">Impact</span>
</div>
```

#### CSS Specification

```css
.data-card {
  background: rgba(255,255,255,0.6);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 160px;
}

.data-card .text-caption {
  font-size: var(--text-caption);
  color: var(--mid-gray);
}

.data-card .data-value {
  font-size: var(--text-number-lg);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  line-height: 1;
}
```

#### Do / Don't

- **Do**：两张并排，间距 `16px`
- **Do**：半透明底在米色/奶油色背景上呈现层次
- **Don't**：数值不可小于 36px

---

### 4.2 GridCard

**用途**：2×2四宫格卡片——编号 + 图标 + 标题 + 描述。

**出现页面**：P04

#### DOM Structure

```html
<div class="grid-card grid-card-white">
  <div class="gc-header">
    <svg class="gc-icon" viewBox="0 0 24 24"><!-- 图标 --></svg>
    <span class="gc-number">(01)</span>
  </div>
  <div class="gc-title">Communication Tools</div>
  <div class="gc-desc">Slack, Zoom, and Teams for real-time...</div>
</div>
```

#### CSS Specification

```css
.grid-card {
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  position: relative;
  overflow: hidden;
}

.grid-card-white {
  background: var(--bg-card);
  border: 1px solid var(--silver);
  color: var(--text-primary);
}

.grid-card-warm {
  background: var(--bg-card-warm);
  border: none;
  color: var(--text-primary);
}

.grid-card-dark {
  background: var(--dark-gray);
  border: none;
  color: var(--white);
}

.grid-card-dark .gc-desc { color: rgba(255,255,255,0.6); }
.grid-card-dark .gc-number { color: rgba(255,255,255,0.5); }

.gc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gc-icon {
  width: 28px;
  height: 28px;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
}

.gc-number {
  font-size: 13px;
  font-weight: var(--font-regular);
  color: var(--mid-gray);
}

.gc-title {
  font-size: 18px;
  font-weight: var(--font-bold);
  line-height: 1.3;
}

.gc-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mid-gray);
}
```

#### Do / Don't

- **Do**：2×2网格，间距 `16px`
- **Do**：至少使用两种不同底色打破单调
- **Don't**：编号格式不是"01"水印，而是"**(01)**"小字在标题右侧
- **Don't**：深棕卡片中描述不可使用纯白（用 `rgba(255,255,255,0.6)`）

---

### 4.3 ColumnCard

**用途**：三列等宽卡片，支持"图片列"和"编号列"两种变体。

**出现页面**：P11

#### DOM Structure（image 变体）

```html
<div class="col-card">
  <div class="cc-top cc-top-image">
    <img src="architecture.jpg" alt="">
  </div>
  <div class="cc-body">
    <div class="cc-icon-wrap">
      <svg class="cc-icon"><!-- 图标 --></svg>
    </div>
    <div class="cc-title">Better Workflow Clarity</div>
    <div class="cc-desc">Clear tool assignments reduce confusion...</div>
  </div>
</div>
```

#### DOM Structure（number 变体）

```html
<div class="col-card">
  <div class="cc-top cc-top-number">
    <span class="cc-number">02.</span>
  </div>
  <div class="cc-body">
    <div class="cc-icon-wrap">
      <svg class="cc-icon"><!-- 图标 --></svg>
    </div>
    <div class="cc-title">Better Coordination</div>
    <div class="cc-desc">Integrated communication tools...</div>
  </div>
</div>
```

#### CSS Specification

```css
.col-card {
  border: 1px solid var(--silver);
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cc-top {
  height: 160px;
  position: relative;
  overflow: hidden;
}

.cc-top-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(60%) contrast(1.1);
}

.cc-top-number {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.cc-number {
  font-size: var(--text-number-xl);
  font-weight: var(--font-light);
  color: var(--text-watermark);
  line-height: 1;
}

.cc-body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cc-icon-wrap {
  width: 36px;
  height: 36px;
  border: 1px solid var(--silver);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cc-icon {
  width: 18px;
  height: 18px;
  stroke: var(--text-primary);
  stroke-width: 1.5;
  fill: none;
}

.cc-title {
  font-size: 18px;
  font-weight: var(--font-bold);
  line-height: 1.3;
}

.cc-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mid-gray);
}
```

#### Do / Don't

- **Do**：三列等宽，间距 `24px`，顶部对齐
- **Do**：左列使用真实建筑摄影图（灰度60%）
- **Do**：中右列使用超大水印编号"02.""03."（56px，`#E0E0E0`）
- **Don't**：图标不可裸露，必须置于36×36px细边框方形容器内
- **Don't**：三列不要求等高

---

### 4.4 ImageStripCard

**用途**：人物图 + 底部色条卡片。

**出现页面**：N5

#### DOM Structure

```html
<div class="image-strip-card">
  <div class="isc-image">
    <img src="person.jpg" alt="">
    <div class="isc-strip"></div>
  </div>
  <div class="isc-body">
    <div class="isc-number">01</div>
    <div class="isc-title">Jane Cooper</div>
    <div class="isc-role">CEO</div>
  </div>
</div>
```

#### CSS Specification

```css
.image-strip-card {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--silver);
}

.isc-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.isc-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.isc-strip {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--orange);
}

.isc-body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.isc-number {
  font-size: 11px;
  font-weight: var(--font-bold);
  color: var(--orange);
}

.isc-title {
  font-size: 16px;
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.isc-role {
  font-size: 13px;
  color: var(--mid-gray);
}
```

---

### 4.5 PointCard

**用途**：要点卡片——"Point - 01."编号 + 标题 + 描述 + 底图。

**出现页面**：N10

#### DOM Structure

```html
<div class="point-card">
  <div class="pc-header">
    <span class="pc-number">Point - 01.</span>
    <h3 class="pc-title">Market Research</h3>
    <p class="pc-desc">Comprehensive analysis of current market trends...</p>
  </div>
  <div class="pc-image">
    <img src="market.jpg" alt="">
  </div>
</div>
```

#### CSS Specification

```css
.point-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--silver);
}

.pc-header {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.pc-number {
  font-size: 12px;
  font-weight: var(--font-bold);
  color: var(--orange);
  letter-spacing: 0.02em;
}

.pc-title {
  font-size: 18px;
  font-weight: var(--font-bold);
  color: var(--text-primary);
  line-height: 1.3;
}

.pc-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mid-gray);
}

.pc-image {
  height: 160px;
  overflow: hidden;
}

.pc-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

# 5. LISTS & BOXES / 列表与信息框

> 信息以列表或框体形式组织。

## 变体汇总

| 组件 | 变体 | 特点 |
|------|------|------|
| StepList | 无 | 编号在右，左侧垂直分割线 |
| InfoBox | 无 | 浅灰底圆角矩形 |
| HighlightItem | `compact` | 仅标题（P07） |
| HighlightItem | `full` | 标题+描述（P12） |

---

### 5.1 StepList

**用途**：阶梯式列表，4个条目，编号在右侧，左侧有垂直分割线。

**出现页面**：P02

#### DOM Structure

```html
<div class="step-list">
  <div class="step-row">
    <div class="step-content">
      <div class="step-title">Tool selection matters</div>
      <div class="step-desc">Choose tools that support async work</div>
    </div>
    <div class="step-number">01</div>
  </div>
  <!-- 02, 03, 04 -->
</div>
```

#### CSS Specification

```css
.step-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: var(--space-16);
}

.step-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--border-divider);
  position: relative;
}

.step-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--border-divider);
}

.step-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-left: var(--space-6);
}

.step-title {
  font-size: 16px;
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.step-desc {
  font-size: 13px;
  color: var(--mid-gray);
}

.step-number {
  font-size: var(--text-number-md);
  font-weight: var(--font-light);
  color: var(--text-primary);
  line-height: 1;
  flex-shrink: 0;
  margin-left: var(--space-6);
}
```

#### Do / Don't

- **Do**：编号在**右侧**
- **Do**：每行左侧有垂直分割线（1px，`rgba(0,0,0,0.1)`）
- **Don't**：编号不在左侧，也没有递进缩进

#### Critical Details
- 这是我第一次复刻时最大的错误之一：编号位置和阶梯缩进完全搞反了

---

### 5.2 InfoBox

**用途**：浅灰底圆角矩形说明框。

**出现页面**：P03

#### CSS Specification

```css
.info-box {
  background: var(--pale-gray);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  margin-top: var(--space-8);
}

.info-box p {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0;
}
```

---

### 5.3 HighlightItem

**用途**：要点高亮项，橙色箭头 + 标题 + 描述。

**出现页面**：P07, P12, N8, N10

#### DOM Structure（compact 变体）

```html
<div class="highlight-item highlight-item-compact">
  <span class="hl-arrow">&#8594;</span>
  <span class="hl-title">Planning</span>
</div>
```

#### DOM Structure（full 变体）

```html
<div class="highlight-item highlight-item-full">
  <span class="hl-arrow">&#8600;</span>
  <span class="hl-title">Core Tool Selection</span>
  <span class="hl-desc">Choose tools that match your workflow needs.</span>
</div>
```

#### CSS Specification

```css
.highlight-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.hl-arrow {
  color: var(--orange);
  font-size: 14px;
  line-height: 1;
}

.hl-title {
  font-size: 16px;
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

[data-theme="dark"] .hl-title {
  color: var(--text-primary-dark);
}

.hl-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mid-gray);
}

.highlight-item-compact { gap: var(--space-1); }
.highlight-item-compact .hl-title { font-size: 14px; }

.highlight-item-full { gap: var(--space-2); }
```

#### Do / Don't

- **Do**：箭头是唯一使用橙色的图标
- **Do**：P07 使用右箭头（→），P12 使用右下箭头（↘）
- **Don't**：compact 变体不可有描述文字

---

# 6. FLOW & ARCHITECTURE / 流程与架构

> 信息流动和层级架构的可视化。

## 变体汇总

| 组件 | 变体 | 特点 |
|------|------|------|
| FlowDiagram | `linear` | P05：左→中→右，L形连线 |
| FlowDiagram | `tree` | P07：树状分支，圆形起点 |
| TriangleHierarchy | 无 | 仅描边无填充，左侧描述 |
| TreeArchitecture | 无 | 三层：3卡→pill条→5卡 |

---

### 6.1 FlowDiagram

**用途**：流程图，支持线性展开和树状分支两种布局。

**出现页面**：P05 (linear), P07 (tree)

#### DOM Structure（linear 变体 — P05）

```html
<div class="flow-diagram flow-diagram-linear">
  <div class="flow-start-node">Worker/Team</div>
  <div class="flow-connector-h"></div>
  <div class="flow-grid">
    <div class="flow-node">Chat</div>
    <div class="flow-node">Docs</div>
    <div class="flow-node">Tasks</div>
    <div class="flow-node">Meetings</div>
  </div>
  <div class="flow-connector-h"></div>
  <div class="flow-orange-circle">
    <svg><!-- 文件夹图标 --></svg>
    <span>File<br>Storage</span>
  </div>
  <div class="flow-orange-circle">
    <svg><!-- 用户图标 --></svg>
    <span>Clients</span>
  </div>
</div>
```

#### CSS Specification（通用节点）

```css
.flow-node {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  background: var(--pale-gray);
  font-size: 13px;
  font-weight: var(--font-semibold);
  white-space: nowrap;
  color: var(--text-primary);
}

.flow-node.circle {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  padding: 0;
  background: transparent;
  border: 1px solid var(--light-gray);
}

.flow-start-node {
  padding: 14px 24px;
  border-radius: var(--radius-md);
  background: var(--orange);
  color: var(--white);
  font-size: 13px;
  font-weight: var(--font-semibold);
}

.flow-orange-circle {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  background: var(--orange);
  color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 11px;
  text-align: center;
}

.flow-connector-h {
  width: 40px;
  height: 1px;
  background: var(--light-gray);
  position: relative;
}

.flow-connector-h::after {
  content: '';
  position: absolute;
  right: 0;
  top: -3px;
  width: 0;
  height: 0;
  border-left: 6px solid var(--light-gray);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}
```

#### Do / Don't

- **Do**：P05 左侧起点为橙色矩形，右侧为橙色实心圆
- **Do**：P07 起点为空心圆形（与矩形形成形状对比）
- **Do**：所有连线为 1px 灰色，带箭头
- **Don't**：P07 不可简单水平排列，必须用树状分支+L形折线

#### Critical Details
- P07 树状流程图是我第一次复刻时完全错误的部分，需要特别注意分支连线的走向

---

### 6.2 TriangleHierarchy

**用途**：三角形层级图，仅描边无填充。

**出现页面**：P06

#### CSS Specification

```css
.triangle-wrap {
  position: relative;
  width: 400px;
  height: 350px;
  margin-left: auto;
}

.triangle-svg {
  width: 100%;
  height: 100%;
}

.triangle-label {
  position: absolute;
  right: 5%;
  font-size: 14px;
  color: var(--text-primary-dark);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.tl-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--white);
}

.triangle-desc {
  position: absolute;
  left: 5%;
  max-width: 160px;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(255,255,255,0.5);
}
```

#### Do / Don't

- **Do**：三角形仅描边，无填充
- **Do**：左侧有描述段落（12px半透明白）
- **Don't**：整页不使用任何橙色（视觉休止符）

---

### 6.3 TreeArchitecture

**用途**：三层树状架构——顶层3卡 + 中层pill条 + 底层5卡 + 树状连线。

**出现页面**：P08

#### CSS Specification

```css
.tree-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin-top: var(--space-12);
}

.tree-row {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
}

.tree-card-top {
  background: var(--pale-gray);
  color: var(--text-primary);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-md);
  text-align: center;
  min-width: 140px;
}

.tree-card-top .tc-title {
  font-size: 13px;
  font-weight: var(--font-semibold);
  line-height: 1.3;
}

.tree-card-top .tc-subtitle {
  font-size: 11px;
  color: var(--mid-gray);
  margin-top: var(--space-1);
  line-height: 1.3;
}

.tree-mid {
  padding: var(--space-3) var(--space-12);
  border-radius: var(--radius-full);
  background: var(--orange);
  color: var(--white);
  font-size: 14px;
  font-weight: var(--font-semibold);
  text-align: center;
  margin: var(--space-4) 0;
}

.tree-card-bottom {
  background: var(--bg-card-dark);
  color: var(--text-primary-dark);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: var(--font-semibold);
  text-align: center;
  min-width: 100px;
}

.tc-line {
  width: 1px;
  height: var(--space-6);
  background: var(--warm-gray);
}
```

#### Do / Don't

- **Do**：顶层卡片有副标题（11px灰色）
- **Do**：中层为pill形状（`border-radius: 9999px`）
- **Do**：连接线从顶层汇聚到中层，再分散到底层
- **Don't**：中层不可使用矩形（必须是pill）

---

# 7. CHARTS & DATA VIZ / 图表与数据

> 数据的可视化呈现。

## 变体汇总

| 组件 | 类型 | 特点 |
|------|------|------|
| PyramidStack | 层级图 | 5层等比缩窄，顶层橙色 |
| BarChart | 柱状图 | 4柱灰→橙，Y轴虚线 |
| GanttChart | 甘特图 | 4阶段，橙/灰条，真实描述文字 |
| DataTable | 表格 | 橙色表头，白底数据行 |
| QuarterBar | 季度条 | Q1-Q4，高亮橙色+增高 |
| RadialDataDisplay | 径向数据 | 中心大圆+周围文字块 |

---

### 7.1 PyramidStack

**用途**：5层金字塔层叠图，顶层橙色强调。

**出现页面**：P03

#### CSS Specification

```css
.pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  width: 320px;
}

.pyramid-layer {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.pyramid-layer:nth-child(1) { width: 40%; background: var(--orange); color: var(--white); }
.pyramid-layer:nth-child(2) { width: 55%; background: var(--pale-gray); }
.pyramid-layer:nth-child(3) { width: 70%; background: var(--pale-gray); }
.pyramid-layer:nth-child(4) { width: 85%; background: var(--pale-gray); }
.pyramid-layer:nth-child(5) { width: 100%; background: var(--pale-gray); }

.layer-icon {
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
}
```

---

### 7.2 BarChart

**用途**：4根垂直柱状图，灰→橙渐变。

**出现页面**：P10

#### CSS Specification

```css
.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: var(--space-8);
  height: 300px;
  position: relative;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  width: 60px;
  z-index: 2;
}

.bar-value {
  font-size: 18px;
  font-weight: var(--font-bold);
  color: var(--text-primary-dark);
}

.bar-col {
  width: 56px;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
}

.bar-col.b1 { height: 140px; background: var(--bar-gray-1); }
.bar-col.b2 { height: 165px; background: var(--bar-gray-2); }
.bar-col.b3 { height: 200px; background: var(--bar-gray-3); }
.bar-col.b4 { height: 260px; background: var(--orange); }

.bar-label {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  text-align: center;
  line-height: 1.3;
  max-width: 80px;
}

.bar-y-axis {
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 40px;
  pointer-events: none;
  z-index: 1;
}

.y-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  border-top: 1px dashed rgba(255,255,255,0.15);
}
```

#### Do / Don't

- **Do**：灰色柱子明度递减（`#777777` → `#666666` → `#555555`）
- **Do**：最后一根柱子橙色 `#E85D2B`
- **Do**：Y轴有虚线刻度参考线（`border-top: 1px dashed`）
- **Don't**：Y轴不可有刻度数字

---

### 7.3 GanttChart

**用途**：甘特图，左侧行头 + 四阶段表头 + 横向时间条。

**出现页面**：P09

#### CSS Specification

```css
.gantt-wrap {
  margin-top: var(--space-16);
  width: 100%;
}

.gantt-header,
.gantt-row {
  display: grid;
  grid-template-columns: 200px repeat(4, 1fr);
  gap: var(--space-2);
  align-items: center;
}

.gantt-header {
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--silver);
}

.gh-label {
  font-size: var(--text-micro);
  color: var(--mid-gray);
  text-align: center;
  letter-spacing: 0.02em;
}

.gantt-row { margin-bottom: var(--space-2); }

.gr-label {
  font-size: 14px;
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.gantt-bar {
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  padding: 0 var(--space-3);
  font-size: 11px;
  font-weight: var(--font-semibold);
  white-space: nowrap;
  overflow: hidden;
}

.gantt-bar.gray { background: var(--pale-gray); color: var(--text-primary); }
.gantt-bar.orange { background: var(--orange); color: var(--white); }
```

#### Do / Don't

- **Do**：条内是真实描述文字（如"Start with communication tools..."）
- **Do**：橙色条标记Phase 2和3（当前重点）
- **Don't**：不可使用简单标签代替描述文字

---

### 7.4 DataTable

**用途**：数据表格，带橙色表头。

**出现页面**：N2

#### CSS Specification

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.dt-header {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  background: var(--orange);
  color: var(--white);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.dt-header .dt-cell {
  padding: var(--space-3) var(--space-4);
  font-size: 13px;
  font-weight: var(--font-semibold);
}

.dt-row {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  border-bottom: 1px solid var(--silver);
}

.dt-row:last-child {
  border-bottom: none;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.dt-row .dt-cell {
  padding: var(--space-3) var(--space-4);
  font-size: 13px;
  color: var(--text-secondary);
}

.dt-row .dt-value {
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}
```

---

### 7.5 QuarterBar

**用途**：季度展示条，Q1-Q4横向排列。

**出现页面**：N3

#### CSS Specification

```css
.quarter-bar {
  display: flex;
  gap: var(--space-1);
  align-items: flex-end;
  height: 120px;
}

.qb-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.qb-label {
  font-size: 12px;
  font-weight: var(--font-semibold);
  color: var(--mid-gray);
}

.qb-bar {
  width: 100%;
  height: 80px;
  background: var(--pale-gray);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
}

.qb-active .qb-bar {
  background: var(--orange);
  height: 100px;
}

.qb-active .qb-label {
  color: var(--orange);
}
```

---

### 7.6 RadialDataDisplay

**用途**：中心大圆数据展示。

**出现页面**：N1

#### CSS Specification

```css
.radial-data-wrap {
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rdd-circle {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-full);
  background: var(--orange);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.rdd-value {
  font-size: 48px;
  font-weight: var(--font-bold);
  color: var(--white);
  line-height: 1;
}

.rdd-orbit-item {
  position: absolute;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.rdd-dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--orange);
  flex-shrink: 0;
}
```

---

# 8. DECORATIVE / 装饰层

> 纯装饰元素，不承载信息。

## 变体汇总

| 组件 | 变体 | 特点 |
|------|------|------|
| OrbGradient | 无 | 径向渐变球体，仅P01 |
| CornerGradient | `top-right` | 右上角光晕 |
| CornerGradient | `bottom-left` | 左下角光晕 |
| CircleCollage | 无 | 圆形拼贴图排列 |

---

### 8.1 OrbGradient

**用途**：封面巨型渐变球体。

**出现页面**：P01

#### CSS Specification

```css
.orb {
  position: absolute;
  width: 55vw;
  height: 55vw;
  max-width: 700px;
  max-height: 700px;
  border-radius: var(--radius-full);
  background: var(--gradient-orb);
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
```

---

### 8.2 CornerGradient

**用途**：角落渐变光晕装饰。

**出现页面**：N1, N3, N5, N8

#### CSS Specification

```css
.corner-gradient {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: var(--radius-full);
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
}

.cg-top-right {
  top: -100px;
  right: -100px;
  background: radial-gradient(circle, #FF6B4A 0%, transparent 70%);
}

.cg-bottom-left {
  bottom: -100px;
  left: -100px;
  background: radial-gradient(circle, #FF6B4A 0%, transparent 70%);
}
```

---

### 8.3 CircleCollage

**用途**：圆形拼贴图。

**出现页面**：N8

#### CSS Specification

```css
.circle-collage {
  position: relative;
  width: 300px;
  height: 300px;
}

.cc-collage-piece {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 3px solid var(--white);
  top: 50%;
  left: 50%;
}

.cc-collage-piece img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

# 9. DEVICE & IMAGE / 设备与图片

> 设备展示和图片处理。

### 9.1 DeviceMockup

**用途**：设备展示框（笔记本/平板）。

**出现页面**：N6

#### CSS Specification

```css
.device-mockup {
  width: 400px;
  position: relative;
}

.dm-screen {
  width: 100%;
  aspect-ratio: 16 / 10;
  background: var(--off-black);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
  padding: var(--space-4);
}

.dm-screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.dm-base {
  width: 100%;
  height: 20px;
  background: var(--charcoal);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}
```

---

# 附录：组件→页面映射矩阵（Digital Nomad 12页）

| 组件 | P01 | P02 | P03 | P04 | P05 | P06 | P07 | P08 | P09 | P10 | P11 | P12 |
|------|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| PageShell | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CoverLayout | ✅ | | | | | | | | | | | |
| TitleBlock | | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| BodyText | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| DataCard | | ✅ | | | | | | | | | | |
| PillTag | | ✅ | | | | | | | ✅ | | | |
| StepList | | ✅ | | | | | | | | | | |
| InfoBox | | | ✅ | | | | | | | | | |
| PyramidStack | | | ✅ | | | | | | | | | |
| GridCard | | | | ✅ | | | | | | | | |
| FlowDiagram | | | | | ✅ | | ✅ | | | | | |
| TriangleHierarchy | | | | | | ✅ | | | | | | |
| TreeArchitecture | | | | | | | | ✅ | | | | |
| GanttChart | | | | | | | | | ✅ | | | |
| BarChart | | | | | | | | | | ✅ | | |
| ColumnCard | | | | | | | | | | | ✅ | |
| HighlightItem | | | | | | | ✅ | | | | | ✅ |
| DecorCircle | ✅ | ✅ | | | | | | | | | | |
| OrbGradient | ✅ | | | | | | | | | | | |

# 附录：组件→页面映射矩阵（品牌战略 12页）

| 组件 | N1 | N2 | N3 | N4 | N5 | N6 | N7 | N8 | N9 | N10 | N11 | N12 |
|------|----|----|----|----|----|----|----|----|----|-----|-----|-----|
| PageShell | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| PageHeader | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CornerGradient | ✅ | | ✅ | | ✅ | | | ✅ | | | | |
| RadialDataDisplay | ✅ | | | | | | | | | | | |
| DataTable | | ✅ | | | | | | | | | | |
| QuarterBar | | | ✅ | | | | | | | | | |
| ImageStripCard | | | | | ✅ | | | | | | | |
| DeviceMockup | | | | | | ✅ | | | | | | |
| CircleCollage | | | | | | | | ✅ | | | | |
| TocGrid | | | | | | | | | ✅ | | | |
| PointCard | | | | | | | | | | ✅ | | |
| HighlightItem | | | | | | | | ✅ | | | | |
| GridCard | | | | | | | | | | | | |
| TitleBlock | | ✅ | | ✅ | | | ✅ | ✅ | ✅ | ✅ | | |
| BodyText | | ✅ | | ✅ | | | ✅ | ✅ | ✅ | ✅ | | |
