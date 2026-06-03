# Haglöfs Components

> Component specs with HTML/CSS code. All tokens reference `references/tokens.md`.

---

## 1. PRODUCT CARD

Product display card with image area, name, and spec summary.

**Anatomy:** Image area → Product name → Category tag → Price

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

**Constraints:** No shadows. Border separation only. Image must not have rounded corners (only the card does).

---

## 2. BRAND STATEMENT CARD

Full-width card for brand statements, mission text, or campaign headlines.

```html
<div class="brand-card">
  <div class="brand-card__label">Brand Statement</div>
  <div class="brand-stmt" data-edit>Engineered for Nature</div>
  <div class="brand-card__sub" data-edit>与自然共生，而非征服</div>
</div>
```

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

## 3. SPEC TABLE

Technical specifications display with label-value pairs.

```html
<div class="spec-table">
  <div class="spec-row">
    <span class="sl" data-edit>Shell</span>
    <span class="sv" data-edit>Gore-Tex Pro 80D</span>
  </div>
  <div class="spec-row">
    <span class="sl" data-edit>Waterproof</span>
    <span class="sv" data-edit>28,000mm</span>
  </div>
  <div class="spec-row">
    <span class="sl" data-edit>Weight</span>
    <span class="sv" data-edit>485g (L)</span>
  </div>
</div>
```

```css
.spec-table { display: flex; flex-direction: column; }
.spec-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border);
}
.spec-row:last-child { border-bottom: none; }
.sl {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.sv {
  font-family: 'Inter', sans-serif;
  font-size: var(--body);
  font-weight: 500;
  color: var(--text-primary);
}
```

**No zebra striping.** Alternate rows via spacing, not background.

---

## 4. COLOR SWATCH

Token display card for design system pages.

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
      <span>74,93,58</span>
    </div>
  </div>
</div>
```

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

## 5. TAG

Category, material, or feature label.

```html
<span class="tag" data-edit>Gore-Tex Pro</span>
```

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

**Variants:**
- `.tag--accent` → border-color: `var(--signal-warning)`, color: `var(--signal-warning)` (for featured/limited items)
- `.tag--scene` → border-color: `var(--brand-tertiary)`, color: `var(--brand-tertiary)` (for seasonal tags)

---

## 6. DOT-MATRIX LOGO

Brand logo rendered as CSS grid.

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

**Minimum size:** sm = 4px dots (digital only). lg = 12px (print minimum).

---

## 7. DOT PATTERN

Decorative background pattern using dot-matrix units.

```html
<div class="dot-pattern">
  <!-- Grid of dots with varying opacity -->
</div>
```

```css
.dot-pattern {
  display: grid;
  grid-template-columns: repeat(auto-fill, 8px);
  grid-auto-rows: 8px;
  gap: 4px;
  opacity: 0.4;
}
```

**Rules:** Max 40% opacity as background. Accent color dots only for functional indicators.

---

## 8. NAVIGATION BAR

Top navigation with brand logo and section links.

```html
<nav class="nav">
  <div class="nav__inner">
    <div class="nav__brand">
      <!-- Dot Matrix H or Classic H -->
      <span class="nav__wordmark">Haglöfs</span>
    </div>
    <div class="nav__links">
      <a href="#products">Products</a>
      <a href="#technology">Technology</a>
      <a href="#sustainability">Sustainability</a>
      <a href="#about">About</a>
    </div>
  </div>
</nav>
```

```css
.nav {
  position: sticky;
  top: 0;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  z-index: 100;
  padding: 0 var(--space-md);
}
.nav__inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}
.nav__wordmark {
  font-family: Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--text-display);
}
.nav__links { display: flex; gap: var(--space-lg); }
.nav__links a {
  font-size: var(--body-sm);
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 150ms ease-out;
}
.nav__links a:hover { color: var(--text-primary); }
```

---

## 9. SCENE OVERLAY

Photographic scene with text overlay for campaign/landing pages.

```html
<div class="scene-overlay">
  <img class="scene-overlay__img" src="..." alt="...">
  <div class="scene-overlay__content">
    <span class="sl" data-edit>FW25 Collection</span>
    <div class="brand-stmt" data-edit>Built for the Nordic Winter</div>
  </div>
</div>
```

```css
.scene-overlay {
  position: relative;
  min-height: 480px;
  overflow: hidden;
  border-radius: 8px;
}
.scene-overlay__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.scene-overlay__content {
  position: relative;
  z-index: 1;
  padding: var(--space-3xl) var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
```

---

## 10. PROGRESS BAR (BRAND VARIANT)

Segmented bar for product ratings, sustainability scores, etc.

```html
<div class="progress-bar">
  <div class="progress-bar__segment" style="width: 85%; background: var(--brand-primary);"></div>
  <div class="progress-bar__segment" style="width: 10%; background: var(--brand-secondary);"></div>
  <div class="progress-bar__segment" style="width: 5%; background: var(--signal-caution);"></div>
</div>
```

```css
.progress-bar {
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}
```

**Rules:** Use brand colors for segments, not status colors (unless showing actual status). No gradient fills.

---

## 11. DATA VIZ — INLINE BAR

Compact inline bar for secondary metrics in product comparisons.

```html
<div class="inline-bar">
  <span class="inline-bar__label sl">Waterproof</span>
  <div class="inline-bar__track">
    <div class="inline-bar__fill" style="width: 93%;"></div>
  </div>
  <span class="inline-bar__value sv">28,000mm</span>
</div>
```

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

## 12. THREE-COLUMN GRID

Asymmetric three-column layout for product comparison or feature showcase.

```html
<div class="three-col">
  <div class="three-col__primary"><!-- Heavy --></div>
  <div class="three-col__secondary"><!-- Medium --></div>
  <div class="three-col__tertiary"><!-- Light --></div>
</div>
```

```css
.three-col {
  display: grid;
  grid-template-columns: 3fr 2fr 1fr;
  gap: var(--space-md);
}
```

**Constraint:** The weight distribution MUST be uneven (3:2:1 or similar). Symmetrical columns = visual flatness.

---

## 13. STATE PATTERNS

| State | Indicator | Color |
|-------|-----------|-------|
| Loading | `[LOADING...]` text or dot-matrix spinner | `var(--text-disabled)` |
| Empty | Single line: `No products found.` | `var(--text-secondary)` |
| Error | Inline: `[Error: message]` | `var(--error)` |
| Success | Inline: `[已保存]` | `var(--success)` |

**No skeleton screens. No toast popups. No sad-face illustrations.**

---

## 14. APPLICATION CARD

Display card for brand application scenarios (packaging, print, retail, etc.).

```html
<div class="app-card">
  <div class="app-card__icon"><!-- SVG --></div>
  <div class="app-card__name">包装</div>
  <div class="app-card__desc" data-edit>模块化可回收包装。镂空品牌符号作为视觉识别。</div>
</div>
```

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

## 15. PRINCIPLE CARD

Design principle display with comparison layout.

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

## 16. SEGMENTED BLOCK BAR

**Signature industrial component.** Discrete square-ended blocks with 2px gaps — mechanical, instrument-like. For supplier scores, sustainability metrics, performance ratings.

**Anatomy:** Label + value above, full-width bar of discrete rectangular segments below.

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

**Sizes:** Hero 20px height, Standard 12px, Compact 6px. Always pair with numeric readout.

**JS generation:**
```js
const track = el.querySelector('.block-bar__track');
const total = +track.dataset.total;
const filled = +track.dataset.filled;
track.innerHTML = Array.from({length: total}, (_, i) =>
  `<div class="block-bar__block ${i < filled ? 'block-bar__block--filled' : 'block-bar__block--empty'}"></div>`
).join('');
```

---

## 17. METRIC CARD (LED-STYLE)

Dashboard metric card with oversized number. Industrial instrument feel.

**Anatomy:** JetBrains Mono hero number (48-96px) + Inter body context + label in top-left. `--surface-alt` background for elevation.

```html
<div class="metric-card">
  <span class="metric-card__label sl">ACTIVE SUPPLIERS</span>
  <div class="metric-card__hero" data-edit>24</div>
  <div class="metric-card__sub" data-edit>覆盖 6 条产线</div>
</div>
```

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

**Variant — Accent hero:** `.metric-card__hero` color set to `var(--brand-primary)` or `var(--signal-warning)` for emphasis.

---

## 18. NAMEPLATE LABEL

Technical label with dot prefix and thin border. Industrial tag for categorization.

**Anatomy:** 4px dot prefix + JetBrains Mono ALL CAPS text + 1px border + 2px border-radius.

```html
<span class="nameplate">
  <span class="nameplate__dot"></span>
  <span class="nameplate__text" data-edit>GORE-TEX PRO</span>
</span>
```

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

**Variant — Accent dot:** `.nameplate__dot` background set to `var(--signal-warning)` for highlighted items.

---

## 19. SEAM DIVIDER

Gradient fade-in-out divider line. Replaces harsh borders with subtle visual separation.

**Anatomy:** 1px horizontal line with gradient mask — transparent → border color → transparent.

```html
<div class="seam-divider"></div>
```

```css
.seam-divider {
  height: 1px;
  background: var(--border-strong);
  mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%);
}
```

---

## 20. DECORATIVE NUMBER HEADER

Oversized semi-transparent Georgia number + foreground section title. Atmospheric layer — the number carries no data, only visual weight.

**Anatomy:** Background Georgia number at 5-6% opacity, absolute positioned. Foreground: JetBrains Mono ALL CAPS label + Georgia section title.

```html
<div class="deco-header">
  <span class="deco-header__num">01</span>
  <span class="deco-header__label sl">MATERIAL</span>
  <h2 class="deco-header__title" data-edit>Gore-Tex Pro Shell</h2>
</div>
```

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

**Variant — Hero scale:** `.deco-header__num` at 160px, 0.08 opacity. One per page max.

---

## 21. GAUGE ARC

SVG arc gauge with tick marks and needle. For single-metric display (sustainability score, performance rating).

**Anatomy:** 180° SVG arc + tick marks + needle indicator + JetBrains Mono value centered below.

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

**SVG math:** Arc path `M 20 100 A 80 80 0 0 1 180 100`. Total arc length ≈ 251. `stroke-dashoffset` = 251 × (1 - percentage).

---

## 22. FLOW PIPELINE

Linear process/pipeline display. For supplier lifecycle, workflow stages, product development steps.

**Anatomy:** Horizontal chain of stages connected by thin chevron arrows. No backgrounds. No containers.

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

## 23. DO / DON'T COMPARISON

Binary rule comparison. For policy display, brand guidelines, compliance rules.

**Anatomy:** Two-column grid. Left = AVOID (× marker, `--signal-warning`). Right = PREFER (· marker, `--text-display`).

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

## 24. TAB PANEL

Content switching panel. For multi-dimensional product data, seasonal collections.

**Anatomy:** Tab bar (JetBrains Mono ALL CAPS labels, `--border` bottom) + content panel. Active tab: `--text-display` text + 2px bottom line. Inactive: `--text-disabled`.

```html
<div class="tab-panel">
  <div class="tab-bar">
    <button class="tab-item active" data-tab="overview">OVERVIEW</button>
    <button class="tab-item" data-tab="specs">SPECS</button>
    <button class="tab-item" data-tab="sustainability">SUSTAINABILITY</button>
  </div>
  <div class="tab-content" id="tab-overview"><!-- Content --></div>
  <div class="tab-content" id="tab-specs" style="display:none"><!-- Content --></div>
  <div class="tab-content" id="tab-sustainability" style="display:none"><!-- Content --></div>
</div>
```

```css
.tab-panel { border: 1px solid var(--border-strong); }
.tab-bar { display: flex; border-bottom: 1px solid var(--border-strong); }
.tab-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: 0.08em;
  padding: 12px 20px; border: none; background: transparent;
  color: var(--text-disabled); cursor: pointer;
  position: relative; transition: color 150ms ease-out;
}
.tab-item:hover { color: var(--text-secondary); }
.tab-item.active { color: var(--text-display); }
.tab-item.active::after {
  content: ''; position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 2px; background: var(--text-display);
}
.tab-content { padding: 24px; }
```

---

## 25. ACCORDION

Collapsible sections. For product details, material specs, FAQ.

**Anatomy:** Stack of rows. Toggle bar = JetBrains Mono ALL CAPS label + `+`/`−` indicator.

```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-toggle">
      <span class="accordion-label">MATERIAL COMPOSITION</span>
      <span class="accordion-icon">+</span>
    </button>
    <div class="accordion-body"><p data-edit>Content here.</p></div>
  </div>
</div>
```

```css
.accordion { border-top: 1px solid var(--border-strong); }
.accordion-item { border-bottom: 1px solid var(--border-strong); }
.accordion-toggle {
  width: 100%; display: flex; justify-content: space-between;
  align-items: center; padding: 16px 0;
  background: transparent; border: none; cursor: pointer; text-align: left;
}
.accordion-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px; letter-spacing: 0.06em; color: var(--text-primary);
}
.accordion-icon {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px; color: var(--text-disabled); min-width: 20px; text-align: right;
}
.accordion-item.open .accordion-icon { color: var(--text-display); }
.accordion-body { padding: 0 0 20px 0; font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
```

---

## 26. CHECKLIST

Interactive task/rule checklist. For compliance checks, packing lists, product features.

**Anatomy:** Stack of rows. Checked: square filled `--brand-primary`. Unchecked: 1px `--border-strong` outline.

```html
<div class="checklist">
  <div class="checklist-item">
    <span class="check-box checked"></span>
    <span class="check-label" data-edit>Completed requirement</span>
    <span class="check-status">OK</span>
  </div>
  <div class="checklist-item">
    <span class="check-box"></span>
    <span class="check-label" data-edit>Pending item</span>
    <span class="check-status pending">PENDING</span>
  </div>
</div>
```

```css
.checklist { display: flex; flex-direction: column; }
.checklist-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.checklist-item:last-child { border-bottom: none; }
.check-box {
  width: 16px; height: 16px; border: 1px solid var(--border-strong);
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.check-box.checked { background: var(--brand-primary); border-color: var(--brand-primary); }
.check-box.checked::after { content: ''; width: 6px; height: 2px; background: #fff; margin-top: -1px; }
.check-label { flex: 1; font-size: 14px; color: var(--text-primary); line-height: 1.4; }
.check-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: 0.08em; color: var(--text-disabled);
}
.check-status.pending { color: var(--warning); }
```

---

## 27. DETAIL PANEL (SCROLLABLE MODAL)

Fixed-position detail view for long-form content. Supplier profiles, product details, full spec sheets.

**Anatomy:** Full-screen overlay (`--bg` at 0.92 opacity). Panel: `--surface` bg, `1px --border-strong`, centered max-width 640px. Close: `×` top-right.

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

## 28. ASYMMETRIC COMPARISON TABLE

Two-subject comparison with asymmetric grid. Left = sticky context label, right = paired data rows.

**Anatomy:** Grid (0.35fr context + 1fr data). Context side: large faded Georgia number + title. Data side: numbered rows with paired values.

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

## 29. SEGMENTED CONTROL

Mutually exclusive option selector. For scene palette selection, product filtering.

**Anatomy:** Container `1px --border-strong`, 4px radius. Active: `--brand-primary` bg, white text. Inactive: transparent, `--text-secondary`.

```html
<div class="seg-control">
  <button class="seg-item active" data-edit>Forest</button>
  <button class="seg-item" data-edit>Alpine</button>
  <button class="seg-item" data-edit>Desert</button>
  <button class="seg-item" data-edit>Urban</button>
</div>
```

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

## 30. DECORATIVE BACKGROUND NUMBER

Purely decorative oversized number or text. Absolute positioned, very low opacity. Adds depth without content.

**Anatomy:** 120px+ Georgia or JetBrains Mono text at 5-6% opacity, absolute positioned, partially off-screen.

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

**Usage:** One per major section. Can be a number (01, 02), a brand initial (H), or a keyword (NATURE). Never competes with foreground content.

---

## 31. DOT-MATRIX GLYPH

Foreground display element rendering characters as physical dot arrays. Distinct from Decorative Background Number — this is a hero element, not a watermark.

**Anatomy:** CSS grid 5×7 per character, 4px rounded cells at 3px gap. Each cell is `.on` (filled) or `.off` (transparent).

```html
<div class="dm-glyph" data-char="H">
  <!-- JS-generated: 5×7 grid of .cell.on/.cell.off -->
</div>
```

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

**Sizes:** `--dm-dot: 4px` (inline) / `6px` (standard) / `10px` (hero) / `16px` (display).

**Dot status indicator variant:** A row of filled circles for inline rating display (5 dots = 5/5). More granular than segmented blocks for small-scale ratings.

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

## 32. SVG SPARKLINE

Inline trend line for compact data visualization. No axes, no labels, no gridlines.

**Anatomy:** SVG `<polyline>` at 160×32px, `stroke-width: 1.5`, `stroke-linecap: round`. Endpoint circle (`r=2.5`) uses status color. Line stays `--text-display`.

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

**Two modes:**
- **Standalone card:** Sparkline above, trend text below (e.g., "+12% vs last month")
- **Table-embedded:** Inside a data row cell, replaces numeric value with visual trend

---

## 33. REFERENCE LINE OVERLAY

Threshold indicator overlaid on segmented block bars. Shows target/benchmark as a vertical marker.

**Anatomy:** Absolutely-positioned vertical line inside the bar wrapper, with floating label above.

```html
<div class="block-bar-ref" style="position:relative;">
  <div class="block-bar__track"><!-- Segmented blocks --></div>
  <div class="ref-line" style="left:75%;">
    <span class="ref-label">TARGET</span>
  </div>
</div>
```

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

**Scale rule variant:** A flex row of percentage labels (0% 25% 50% 75% 100%) with tiny tick marks, placed below segmented bars for calibration.

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

## 34. CALLOUT / ANNOTATION BLOCK

Lightweight marginal annotation for rules, methodology explanations, or contextual notes.

**Anatomy:** `border-left: 2px` accent + monospace uppercase title + body text.

```html
<div class="callout">
  <div class="callout__title">METHODOLOGY</div>
  <div class="callout__body" data-edit>Scores are weighted by volume across all active product lines.</div>
</div>
```

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

**Variant — Warning callout:** `border-left-color: var(--signal-warning)`, title in signal-warning.

---

## 35. TIMELINE / ERA CONNECTOR

Chronological node layout with connecting lines. For brand history, product evolution, project milestones.

**Anatomy:** Horizontal flex with nodes connected by 1px lines and arrow pseudo-elements.

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

## 36. DATA SPOTLIGHT

Inline narrative data emphasis. Simpler than LED metric cards — designed for embedding a key number within flowing text.

**Anatomy:** Inline-flex pairing large mono number with small unit label.

```html
<div class="spotlight">
  <span class="spotlight__value" data-edit>94</span>
  <span class="spotlight__unit">%</span>
</div>
```

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

---

## 37. BUTTONS

All buttons: JetBrains Mono, 13px, ALL CAPS, letter-spacing 0.06em, min height 44px.

```html
<button class="btn btn--primary">ADD TO CART</button>
<button class="btn btn--secondary">COMPARE</button>
<button class="btn btn--ghost">VIEW ALL</button>
<button class="btn btn--destructive">REMOVE</button>
```

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

**Size variants:** `.btn--sm` → padding 8px 16px, min-height 36px. `.btn--lg` → padding 16px 32px, min-height 52px.

---

## 38. INPUTS

Underline preferred. Label above (JetBrains Mono ALL CAPS), input below.

```html
<div class="input-group">
  <label class="input-label">PRODUCT NAME</label>
  <input class="input" type="text" placeholder="L.I.M Comp">
  <span class="input-error">Required field</span>
</div>
```

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

**Full-border variant:** `.input--border` adds `border: 1px solid var(--border-strong); border-radius: 4px; padding: 10px 12px;`

**Textarea:** `.textarea` inherits `.input` styles, adds `resize: vertical; min-height: 80px; line-height: 1.6;`

---

## 39. TOGGLE / SWITCH

Pill track + circle thumb. Mechanical snap.

```html
<label class="toggle">
  <input type="checkbox" class="toggle__input">
  <span class="toggle__track"><span class="toggle__thumb"></span></span>
  <span class="toggle__label">OFF-ROAD MODE</span>
</label>
```

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

## 40. BLOCKQUOTE / PULL-QUOTE

```html
<blockquote class="blockquote">
  <p class="blockquote__text">We believe in moving with nature.</p>
  <cite class="blockquote__cite">HAGLÖFS MANIFESTO, 1914</cite>
</blockquote>
```

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

## 41. CODE BLOCK

```html
<pre class="code-block"><code>SHELL: Gore-Tex Pro 80D
WATERPROOF: 28,000mm
WEIGHT: 485g (L)</code></pre>
```

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

**Inline code:** `code` inside text → `background: var(--surface-alt); padding: 2px 6px; border-radius: 2px;`

---

## 42. ALERT / INLINE STATUS

Bracket-prefix text alerts. No icons, no illustrations.

```html
<div class="alert alert--success">[SAVED] Changes applied.</div>
<div class="alert alert--warning">[WARNING] Stock low.</div>
<div class="alert alert--error">[ERROR] Connection failed.</div>
```

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

## 43. BULLET BAR WITH TARGET ⭐ 高优先级

Baseline + target reference line. For achievement rates, KPI benchmarking.

**Anatomy:** Label + value header → track background → fill bar (brand-primary) → vertical target line (signal-warning) with floating label above.

```html
<div class="bullet-bar">
  <div class="bullet-bar__header">
    <span class="bullet-bar__label">ACHIEVEMENT</span>
    <span class="bullet-bar__value">82 / 100</span>
  </div>
  <div class="bullet-bar__track">
    <div class="bullet-bar__fill" style="width: 82%;"></div>
    <div class="bullet-bar__target" style="left: 100%;">
      <span class="bullet-bar__target-label">GOAL</span>
    </div>
  </div>
</div>
```

```css
.bullet-bar__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-sm);
}
.bullet-bar__label {
  font-family: var(--fm);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.bullet-bar__value {
  font-family: var(--fb);
  font-size: var(--body-sm);
  font-weight: 500;
  color: var(--text-primary);
}
.bullet-bar__track {
  position: relative;
  height: 24px;
  background: var(--border);
  margin: 16px 0;
}
.bullet-bar__fill {
  height: 100%;
  background: var(--brand-primary);
  transition: width 250ms var(--ease-out);
}
.bullet-bar__target {
  position: absolute;
  top: -12px;
  width: 2px;
  height: calc(100% + 24px);
  background: var(--signal-warning);
  z-index: 1;
}
.bullet-bar__target-label {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--fm);
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--signal-warning);
  white-space: nowrap;
}
```

**Sizes:** Standard 24px track height. Compact 16px (reduce to `--space-sm` margins). The target label disappears on compact variant.

---

## 44. ZERO-CENTERED BAR ⭐ 高优先级

Symmetric bar with zero center point, positive/negative values on each side. For deltas, variance, change analysis.

**Anatomy:** Header → track with center zero line + left negative fill (signal-warning) + right positive fill (brand-primary) → label row showing values.

```html
<div class="zero-bar" style="--pos: 55; --neg: 25;">
  <div class="zero-bar__header">
    <span class="zero-bar__label">VARIANCE</span>
  </div>
  <div class="zero-bar__track">
    <div class="zero-bar__zero"></div>
    <div class="zero-bar__fill zero-bar__fill--pos" style="width: calc(var(--pos) * 0.5%);"></div>
    <div class="zero-bar__fill zero-bar__fill--neg" style="width: calc(var(--neg) * 0.5%);"></div>
  </div>
  <div class="zero-bar__labels">
    <span class="zero-bar__label-value zero-bar__label-value--neg">-25%</span>
    <span class="zero-bar__label-value zero-bar__label-value--zero">0</span>
    <span class="zero-bar__label-value zero-bar__label-value--pos">+55%</span>
  </div>
</div>
```

```css
.zero-bar__header {
  margin-bottom: var(--space-sm);
}
.zero-bar__label {
  font-family: var(--fm);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.zero-bar__track {
  position: relative;
  height: 12px;
  background: var(--border);
  overflow: hidden;
}
.zero-bar__zero {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--text-display);
  z-index: 1;
}
.zero-bar__fill {
  position: absolute;
  top: 0;
  height: 100%;
  transition: width 250ms var(--ease-out);
}
.zero-bar__fill--pos {
  left: 50%;
  background: var(--brand-primary);
}
.zero-bar__fill--neg {
  right: 50%;
  background: var(--signal-warning);
}
.zero-bar__labels {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-xs);
}
.zero-bar__label-value {
  font-family: var(--fm);
  font-size: 10px;
  font-weight: 500;
  color: var(--text-disabled);
}
.zero-bar__label-value--pos { color: var(--brand-primary); }
.zero-bar__label-value--neg { color: var(--signal-warning); }
.zero-bar__label-value--zero { color: var(--text-secondary); }
```

**Usage:** `--pos` and `--neg` CSS custom properties control the fill widths. `--pos` = percentage of right half filled, `--neg` = percentage of left half filled.

---

## 45. WAFFLE GRID ⭐ 高优先级

10x10 grid for percentage display, density visualization. One cell = one unit.

**Anatomy:** 10x10 CSS grid of square cells → filled (brand-primary) + empty (border) → percentage value below.

```html
<div class="waffle-grid">
  <div class="waffle-grid__grid" id="waffle-demo"></div>
  <span class="waffle-grid__value">74%</span>
</div>
```

```css
.waffle-grid {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}
.waffle-grid__grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
  width: 160px;
}
.waffle-grid__cell {
  aspect-ratio: 1;
  transition: background 150ms var(--ease-out);
}
.waffle-grid__cell--filled { background: var(--brand-primary); }
.waffle-grid__cell--empty { background: var(--border); }
.waffle-grid__value {
  font-family: var(--fm);
  font-size: var(--heading-md);
  font-weight: 600;
  color: var(--text-display);
}
```

**JS generation:**
```js
const el = document.getElementById('waffle-demo');
const val = 74; // percentage
for (let i = 0; i < 100; i++) {
  const c = document.createElement('div');
  c.className = 'waffle-grid__cell ' + (i < val ? 'waffle-grid__cell--filled' : 'waffle-grid__cell--empty');
  el.appendChild(c);
}
```

**Sizes:** Standard 160px grid width (each cell ~14px). Compact 100px (10px gap 1px). The grid width controls the cell size via `grid-template-columns: repeat(10, 1fr)`.

---

## 46. COMPARISON PAIR ⭐ 高优先级

Two-value side-by-side comparison bars. For A/B comparison, before/after, competitor benchmarks.

**Anatomy:** Two stacked rows → mono label → filled track → numeric value. Row A: brand-primary fill. Row B: signal-warning fill.

```html
<div class="comp-pair">
  <div class="comp-pair__row">
    <span class="comp-pair__label">A</span>
    <div class="comp-pair__track">
      <div class="comp-pair__fill comp-pair__fill--a" style="width: 78%;"></div>
    </div>
    <span class="comp-pair__value">78%</span>
  </div>
  <div class="comp-pair__row">
    <span class="comp-pair__label">B</span>
    <div class="comp-pair__track">
      <div class="comp-pair__fill comp-pair__fill--b" style="width: 92%;"></div>
    </div>
    <span class="comp-pair__value">92%</span>
  </div>
</div>
```

```css
.comp-pair {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
.comp-pair__row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
.comp-pair__label {
  font-family: var(--fm);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  min-width: 20px;
}
.comp-pair__track {
  flex: 1;
  height: 12px;
  background: var(--border);
  overflow: hidden;
}
.comp-pair__fill {
  height: 100%;
  transition: width 250ms var(--ease-out);
}
.comp-pair__fill--a { background: var(--brand-primary); }
.comp-pair__fill--b { background: var(--signal-warning); }
.comp-pair__value {
  font-family: var(--fb);
  font-size: var(--body-sm);
  font-weight: 500;
  color: var(--text-primary);
  min-width: 40px;
  text-align: right;
}
```

**Variant — Header row:** Add a header above the pair with `.comp-pair__header` class for labeled comparison categories.

---

## 47. DONUT BLOCKS ⭐ 高优先级

24-segment ring chart. Full segments = filled, empty segments = border. For circular percentage display.

**Anatomy:** SVG ring of 24 circle-segments → filled (brand-primary) / empty (border) → percentage value centered below.

```html
<div class="donut-blocks">
  <svg class="donut-blocks__svg" viewBox="0 0 120 120" width="120" height="120">
    <!-- JS-generated: 24 circle segments -->
  </svg>
  <span class="donut-blocks__value">85%</span>
</div>
```

```css
.donut-blocks {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}
.donut-blocks__svg { display: block; }
.donut-blocks__value {
  font-family: var(--fm);
  font-size: var(--heading-md);
  font-weight: 600;
  color: var(--text-display);
}
```

**JS generation:**
```js
const svg = document.querySelector('.donut-blocks__svg');
const val = 85; // percentage
const cx = 60, cy = 60, r = 40;
const circ = 2 * Math.PI * r;
const segs = 24;
const segLen = circ / segs - 1;
for (let i = 0; i < segs; i++) {
  const seg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  seg.setAttribute('cx', cx);
  seg.setAttribute('cy', cy);
  seg.setAttribute('r', r - 2);
  seg.setAttribute('fill', 'none');
  seg.setAttribute('stroke', (i / segs * 100 < val) ? 'var(--brand-primary)' : 'var(--border)');
  seg.setAttribute('stroke-width', '8');
  seg.setAttribute('stroke-dasharray', segLen + ',' + circ / segs);
  seg.setAttribute('stroke-dashoffset', -(circ * i / segs));
  svg.appendChild(seg);
}
```

**Sizes:** Standard 120px. Compact 80px (reduce stroke-width to 5, radius to 28). Ensure viewBox scales correctly.

---

## 48. THERMOMETER GAUGE

Vertical thermometer gauge. For single-metric vertical display, temperature, progress.

**Anatomy:** SVG → rounded rect track (border stroke) → colored fill (signal-warning) → circular bulb at bottom → value below.

```html
<div class="thermo-gauge">
  <svg class="thermo-gauge__svg" viewBox="0 0 80 160" width="80" height="160">
    <rect class="thermo-gauge__track" x="32" y="20" width="16" height="110" rx="8" fill="none" stroke="var(--border)" stroke-width="4"/>
    <rect class="thermo-gauge__fill" x="34" y="20" width="12" height="0" rx="6" fill="var(--signal-warning)" id="thermo-fill"/>
    <circle class="thermo-gauge__bulb" cx="40" cy="136" r="10" fill="var(--signal-warning)"/>
  </svg>
  <span class="thermo-gauge__value">72%</span>
  <span class="thermo-gauge__label">SCORE</span>
</div>
```

```css
.thermo-gauge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}
.thermo-gauge__svg { display: block; }
.thermo-gauge__value {
  font-family: var(--fm);
  font-size: var(--heading-lg);
  font-weight: 600;
  color: var(--text-display);
  margin-top: var(--space-xs);
}
.thermo-gauge__label {
  font-family: var(--fm);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
```

**JS positioning:**
```js
const fill = document.getElementById('thermo-fill');
const val = 72; // percentage
const maxH = 110;
fill.setAttribute('height', val / 100 * maxH);
fill.setAttribute('y', 20 + maxH - val / 100 * maxH);
```

**Sizes:** Standard 160px height. Compact 100px (adjust viewBox and maxH accordingly). Use `--signal-warning` as default fill; can be overridden to `--brand-primary` for positive metrics.

---

## 49. BULLSEYE GAUGE ⭐ 高优先级

Concentric target gauge. For precision, targeting, alignment metrics.

**Anatomy:** SVG → 4 concentric circles (3 thin border + 1 thick signal-warning inner) → offset hit dot → value below.

```html
<div class="bullseye-gauge">
  <svg class="bullseye-gauge__svg" viewBox="0 0 160 160" width="160" height="160">
    <!-- Outer rings -->
    <circle cx="80" cy="80" r="60" fill="none" stroke="var(--border)" stroke-width="1.5"/>
    <circle cx="80" cy="80" r="45" fill="none" stroke="var(--border)" stroke-width="1.5"/>
    <circle cx="80" cy="80" r="30" fill="none" stroke="var(--border)" stroke-width="1.5"/>
    <!-- Inner ring -->
    <circle cx="80" cy="80" r="15" fill="none" stroke="var(--signal-warning)" stroke-width="4"/>
    <!-- Hit dot -->
    <circle class="bullseye-gauge__dot" cx="95" cy="70" r="5" fill="var(--signal-warning)"/>
  </svg>
  <span class="bullseye-gauge__value">88%</span>
  <span class="bullseye-gauge__label">ACCURACY</span>
</div>
```

```css
.bullseye-gauge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
}
.bullseye-gauge__svg { display: block; }
.bullseye-gauge__dot {
  transition: cx 400ms var(--ease-out), cy 400ms var(--ease-out);
}
.bullseye-gauge__value {
  font-family: var(--fm);
  font-size: var(--heading-lg);
  font-weight: 600;
  color: var(--text-display);
  margin-top: var(--space-xs);
}
.bullseye-gauge__label {
  font-family: var(--fm);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
```

**Variant — Hit position as data:** The offset dot position (`cx`/`cy`) can be programmatically set to represent precision error. Inner ring represents maximum acceptable tolerance. Dots landing outside the inner ring indicate failure state (use `--signal-error` instead of `--signal-warning`).