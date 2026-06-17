# Nothing Design System -- Components

## 1. CARDS / SURFACES
- Background: `--surface` or `--surface-raised`
- Border: `1px solid --border`, or none. Radius: 12-16px cards, 8px compact, 4px technical
- Padding: 16-24px. No shadows. Flat surfaces, border separation.

---

## 2. BUTTONS
| Variant | Background | Border | Text | Radius |
|---------|-----------|--------|------|--------|
| Primary | `--text-display` (#FFF) | none | `--black` | 999px (pill) |
| Secondary | transparent | `1px solid --border-visible` | `--text-primary` | 999px |
| Ghost | transparent | none | `--text-secondary` | 0 |
| Destructive | transparent | `1px solid --accent` | `--accent` | 999px |

All buttons: `Space Mono`, 13px, ALL CAPS, letter-spacing 0.06em, padding 12px 24px. Min height 44px.

---

## 3. INPUTS
- Underline preferred (`1px solid --border-visible` bottom) or full border 8px radius
- Label above: `--label` style (Space Mono, ALL CAPS, `--text-secondary`)
- Focus: border -> `--text-primary`. Error: border -> `--accent`, message below in `--accent`
- Data-entry fields: `Space Mono` for input text

---

## 4. LISTS / DATA ROWS
- Dividers: `1px solid --border`, full-width. Row padding: 12-16px vertical
- Left: label (Space Mono caps, `--text-secondary`). Right: value (`--text-primary`)
- Never alternating row backgrounds. Use dividers.

**Stat rows:** Label left (Space Mono, ALL CAPS, `--text-secondary`), value right (color = status color), unit adjacent in `--label` size. Trend arrow same color as value.

**Hierarchical rows:** Sub-items indented 16-24px, same divider treatment. No tree lines or expand/collapse -- indentation IS the hierarchy.

---

## 5. TABLES / DATA GRIDS
- Header: `--label` style, bottom border `--border-visible`
- Cell text: `Space Mono` numeric, `Space Grotesk` text. Cell padding: 12px 16px
- Numbers right, text left. No zebra striping, no cell backgrounds.
- Active row: `--surface-raised` background, left `2px solid --accent` indicator

---

## 6. NAVIGATION
- Bottom bar mobile, horizontal text bar desktop
- Labels: Space Mono, ALL CAPS. Active: `--text-display` + dot/underline. Inactive: `--text-disabled`
- Bracket `[ HOME ] GALLERY INFO` or pipe `HOME | GALLERY | INFO`
- **Back button:** Circular 40-44px, `--surface` bg, thin chevron `<`, top-left 16px from edges

---

## 7. TAGS / CHIPS
- Border: `1px solid --border-visible`, no fill. Text: Space Mono, `--caption`, ALL CAPS
- Radius: 999px (pill) or 4px (technical). Padding: 4px 12px. Active: `--text-display` border+text

---

## 8. SEGMENTED CONTROL
- Container: `1px solid --border-visible`, pill or 8px rounded
- Active: `--text-display` bg, `--black` text (inverted). Inactive: transparent, `--text-secondary`
- Text: Space Mono, ALL CAPS, `--label` size. Height: 36-44px. Transition: 200ms ease-out
- Max 2-4 segments

---

## 9. DATE / PERIOD NAVIGATION
- Layout: `< LABEL >` -- back arrow, label, forward arrow
- Label: Space Mono/Grotesk, ALL CAPS. Arrows: thin chevrons, `--text-secondary`, 44px touch
- No calendar popovers -- linear stepping IS the interaction

---

## 10. TOGGLES / SWITCHES
- Pill track, circle thumb. Off: `--border-visible` track, `--text-disabled` thumb
- On: `--text-display` track, `--black` thumb. Min touch target: 44px

---

## 11. SEGMENTED PROGRESS BARS
The signature data visualization. Discrete blocks -- mechanical, instrument-like.

**Anatomy:** Label + value above, full-width bar of discrete rectangular segments with 2px gaps below.

**Segments:** Square-ended blocks, no border-radius. Filled = solid status color. Empty = `--border` (dark) / `#E0E0E0` (light).

| State | Fill | When |
|-------|------|------|
| Neutral | `--text-display` | Within normal range |
| Over limit | `--accent` | Exceeds target |
| Good | `--success` | Healthy range |
| Moderate | `--warning` | Caution zone |

**Overflow:** Filled segments continue past "full" mark in status color (typically red).

**Sizes:** Hero 16-20px, Standard 8-12px, Compact 4-6px height.
Always pair with numeric readout. Bar = proportion, number = precision.

---

## 12. OTHER DATA VISUALIZATION
- **Bar charts:** Vertical, white fill, `--border` remainder. Square ends.
- **Gauges:** Thin stroke circles + tick marks, numeric readout centered/adjacent.
- **Dot grids:** Vary opacity/size for heat maps. Uniform spacing.
- **Category differentiation:** Opacity -> pattern -> line style -> color (last resort).
- Always show numeric value alongside any visual.

**Charts:** Line 1.5-2px `--text-display`, average dashed 1px `--text-secondary`. Axis labels: Space Mono, `--caption`. Grid: `--border`, horizontal only. No area fill, no legend boxes -- label lines directly.

---

## 13. WIDGETS (DASHBOARD CARDS)
- `--surface` bg, 16px radius. Hero metric: large Doto/Space Mono, left-aligned
- Unit: `--label` size, adjacent. Category: ALL CAPS Space Mono top-left
- Instrument gauges: compass, thermometer, dial motifs

---

## 14. OVERLAYS & LAYERING
No shadows. Layering through background contrast and borders.

- **Modals:** Backdrop `rgba(0,0,0,0.8)`, dialog `--surface` + `1px solid --border-visible` + 16px radius, centered max 480px. Close: `[ X ]` top-right ghost button.
- **Bottom sheets:** `--surface`, 2px handle bar centered, 16px top radius, drag-to-dismiss. Full-page sheets: title centered + dismiss button right, sections with `--text-secondary` headings.
- **Dropdowns:** `--surface-raised`, `1px solid --border-visible` 8px radius, 44px items. Selected: left 2px accent bar. No shadow.
- **Toasts:** None. Use inline status text: `[SAVED]`, `[ERROR: ...]`. Space Mono, `--caption`, near trigger.

---

## 15. STATE PATTERNS
- **Error:** Input border -> `--accent` + message below. Form-level: summary box `1px solid --accent`. Inline: `[ERROR]` prefix. Never red backgrounds or alert banners.
- **Empty:** Centered, 96px+ padding. Headline `--text-secondary`, 1 sentence description `--text-disabled`. Optional dot-matrix illustration. No mascots.
- **Loading:** Segmented spinner (hardware-style), or segmented bar + percentage. No skeletons -- use `[LOADING]` bracket text.
- **Disabled:** Opacity 0.4 or `--text-disabled`. Borders fade to `--border`.

---

## 16. FLOW PIPELINE

Linear process/pipeline display. For supplier lifecycle, workflow stages, pipeline steps.

**Anatomy:** Horizontal chain of stages connected by thin chevron arrows. No backgrounds on stages. No containers.

```html
<div class="flow-pipeline">
  <div class="flow-stage">
    <span class="flow-label">STAGE ONE</span>
    <span class="flow-value">准入</span>
  </div>
  <span class="flow-arrow">›</span>
  <div class="flow-stage">
    <span class="flow-label">STAGE TWO</span>
    <span class="flow-value">分工</span>
  </div>
  <span class="flow-arrow">›</span>
  <div class="flow-stage flow-stage--active">
    <span class="flow-label">STAGE THREE</span>
    <span class="flow-value">运营</span>
  </div>
  <span class="flow-arrow">›</span>
  <div class="flow-stage">
    <span class="flow-label">STAGE FOUR</span>
    <span class="flow-value">清退</span>
  </div>
</div>
```

```css
.flow-pipeline {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 16px 0;
}
.flow-stage {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 16px;
}
.flow-label {
  font-family: "Space Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--text-disabled);
  text-transform: uppercase;
}
.flow-value {
  font-family: "Space Grotesk", sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
}
.flow-stage--active .flow-value {
  color: var(--text-display);
}
.flow-stage--active .flow-label {
  color: var(--text-secondary);
}
.flow-arrow {
  font-size: 18px;
  color: var(--text-disabled);
  padding: 0 4px;
  line-height: 1;
}
```

**Variants:**
- Completed stage: add class `flow-stage--done`, `.flow-value` gets `--success` color
- Failed/blocked stage: add class `flow-stage--blocked`, `.flow-value` gets `--accent` color
- Vertical layout: change `flex-direction: column` on `.flow-pipeline`, rotate `.flow-arrow` 90deg

---

## 17. DO / DON'T COMPARISON

Binary rule comparison. For policy display, compliance rules, best practices.

**Anatomy:** Two-column grid. Left = AVOID (× marker). Right = PREFER (· marker). No background colors. Border separation only.

```html
<div class="compare-grid">
  <div class="compare-col compare-col--avoid">
    <div class="compare-header">
      <span class="compare-marker">&times;</span>
      <span class="compare-title">AVOID</span>
    </div>
    <div class="compare-row">
      <span class="compare-icon">&times;</span>
      <span>Rule to avoid</span>
    </div>
    <div class="compare-row">
      <span class="compare-icon">&times;</span>
      <span>Another rule</span>
    </div>
  </div>
  <div class="compare-col compare-col--prefer">
    <div class="compare-header">
      <span class="compare-marker">&middot;</span>
      <span class="compare-title">PREFER</span>
    </div>
    <div class="compare-row">
      <span class="compare-icon">&middot;</span>
      <span>Preferred approach</span>
    </div>
    <div class="compare-row">
      <span class="compare-icon">&middot;</span>
      <span>Another approach</span>
    </div>
  </div>
</div>
```

```css
.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.compare-col {
  border: 1px solid var(--border-visible);
  padding: 20px;
}
.compare-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.compare-marker {
  font-size: 16px;
}
.compare-col--avoid .compare-marker { color: var(--accent); }
.compare-col--prefer .compare-marker { color: var(--text-display); }
.compare-title {
  font-family: "Space Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}
.compare-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 0;
}
.compare-row .compare-icon {
  font-size: 10px;
  flex-shrink: 0;
  padding-top: 2px;
}
.compare-col--avoid .compare-icon { color: var(--accent); }
.compare-col--prefer .compare-icon { color: var(--text-display); }
.compare-row span:last-child {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
}
```

**Compact variant:** Single list with inline markers. Use `[×]` for avoid, `[·]` for prefer. Space Mono, `--caption` size.

---

## 18. TAB PANEL

Content switching panel. For multi-dimensional data, segmented views.

**Anatomy:** Tab bar (Space Mono ALL CAPS labels, `--border` bottom) + content panel. Active tab: `--text-display` text + 2px bottom line. Inactive: `--text-disabled`.

```html
<div class="tab-panel">
  <div class="tab-bar">
    <button class="tab-item active" data-tab="overview">OVERVIEW</button>
    <button class="tab-item" data-tab="performance">PERFORMANCE</button>
    <button class="tab-item" data-tab="compliance">COMPLIANCE</button>
  </div>
  <div class="tab-content" id="tab-overview">
    <!-- Overview content -->
  </div>
  <div class="tab-content" id="tab-performance" style="display:none">
    <!-- Performance content -->
  </div>
  <div class="tab-content" id="tab-compliance" style="display:none">
    <!-- Compliance content -->
  </div>
</div>
```

```css
.tab-panel {
  border: 1px solid var(--border-visible);
}
.tab-bar {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-visible);
}
.tab-item {
  font-family: "Space Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: var(--text-disabled);
  cursor: pointer;
  position: relative;
  transition: color 150ms ease-out;
}
.tab-item:hover {
  color: var(--text-secondary);
}
.tab-item.active {
  color: var(--text-display);
}
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
  padding: 24px;
}
```

**Behavior:** JS toggles `.active` class and `display:none` on content panels. Max 2-4 tabs. Tab labels ALL CAPS Space Mono.

---

## 19. ACCORDION

Collapsible sections. For policy documents, rule sets, FAQ.

**Anatomy:** Stack of rows. Each row = toggle bar + expandable content. Toggle bar has label + `+`/`−` indicator. Content area: no background, no extra border.

```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-toggle">
      <span class="accordion-label">SECTION TITLE</span>
      <span class="accordion-icon">+</span>
    </button>
    <div class="accordion-body">
      <p>Expanded content goes here.</p>
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-toggle">
      <span class="accordion-label">ANOTHER SECTION</span>
      <span class="accordion-icon">+</span>
    </button>
    <div class="accordion-body" style="display:none">
      <p>More content.</p>
    </div>
  </div>
</div>
```

```css
.accordion {
  border-top: 1px solid var(--border-visible);
}
.accordion-item {
  border-bottom: 1px solid var(--border-visible);
}
.accordion-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}
.accordion-label {
  font-family: "Space Mono", monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--text-primary);
}
.accordion-icon {
  font-family: "Space Mono", monospace;
  font-size: 16px;
  color: var(--text-disabled);
  min-width: 20px;
  text-align: right;
}
.accordion-item.open .accordion-icon {
  color: var(--text-display);
}
.accordion-body {
  padding: 0 0 20px 0;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}
```

**Behavior:** JS toggles `.open` class on `.accordion-item`, toggles body `display`. Icon switches `+` ↔ `−`. No animation — instant expand/collapse (mechanical, not fluid).

---

## 20. ASYMMETRIC COMPARISON TABLE

Two-subject comparison with asymmetric grid. Left column = sticky context label, right = paired data rows.

**Anatomy:** Grid layout (0.35fr context + 1fr data). Context side: large faded number + title (sticky on desktop). Data side: numbered rows, each row has two values side by side.

```html
<div class="compare-table">
  <div class="compare-side">
    <span class="compare-big-label">VS</span>
    <span class="compare-section-num">01</span>
    <h2 class="compare-section-title">Comparison Title</h2>
    <p class="compare-subtitle">Context description</p>
  </div>
  <div class="compare-rows">
    <div class="compare-row-item">
      <span class="compare-row-num">01</span>
      <div class="compare-cell">
        <span class="compare-cell-label">SUBJECT A</span>
        <span class="compare-cell-value">Value A</span>
      </div>
      <div class="compare-cell">
        <span class="compare-cell-label">SUBJECT B</span>
        <span class="compare-cell-value">Value B</span>
      </div>
    </div>
    <div class="compare-row-item">
      <span class="compare-row-num">02</span>
      <div class="compare-cell">
        <span class="compare-cell-label">SUBJECT A</span>
        <span class="compare-cell-value">Value A2</span>
      </div>
      <div class="compare-cell">
        <span class="compare-cell-label">SUBJECT B</span>
        <span class="compare-cell-value">Value B2</span>
      </div>
    </div>
  </div>
</div>
```

```css
.compare-table {
  display: grid;
  grid-template-columns: 0.35fr 1fr;
  gap: 48px;
  align-items: start;
}
.compare-side {
  position: sticky;
  top: 80px;
}
.compare-big-label {
  font-family: "Space Mono", monospace;
  font-size: 64px;
  font-weight: 700;
  color: var(--text-display);
  opacity: 0.06;
  line-height: 0.85;
  display: block;
}
.compare-section-num {
  font-family: "Space Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--text-disabled);
  display: block;
  margin-bottom: 4px;
}
.compare-section-title {
  font-family: "Space Grotesk", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: var(--text-display);
}
.compare-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 8px;
  line-height: 1.5;
}
.compare-row-item {
  display: grid;
  grid-template-columns: 48px 1fr 1fr;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
}
.compare-row-item:last-child { border-bottom: none; }
.compare-row-num {
  font-family: "Space Mono", monospace;
  font-size: 24px;
  color: var(--text-disabled);
  line-height: 1;
}
.compare-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.compare-cell-label {
  font-family: "Space Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--text-disabled);
  text-transform: uppercase;
}
.compare-cell-value {
  font-family: "Space Grotesk", sans-serif;
  font-size: 15px;
  color: var(--text-primary);
  line-height: 1.4;
}
```

---

## 21. DETAIL PANEL (SCROLLABLE MODAL)

Fixed-position detail view for long-form content. Supplier profiles, full policy text, audit details.

**Anatomy:** Full-screen overlay (`--black` at 0.85 opacity). Panel: `--surface` bg, `1px --border-visible`, centered max-width 640px. Close: `×` ghost button top-right. Content scrolls within panel.

```html
<div class="detail-overlay" id="detail-panel">
  <button class="detail-close">&times;</button>
  <div class="detail-panel">
    <div class="detail-header">
      <span class="detail-label">DETAIL VIEW</span>
      <h2 class="detail-title">Item Title</h2>
    </div>
    <div class="detail-body">
      <p>Full content here. Scrolls independently.</p>
    </div>
  </div>
</div>
```

```css
.detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,0.85);
  display: none;
  overflow-y: auto;
  padding: 5vh 2rem;
}
.detail-overlay.active { display: block; }
.detail-close {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: 1px solid var(--border-visible);
  border-radius: 0;
  background: var(--surface);
  color: var(--text-primary);
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
}
.detail-panel {
  max-width: 640px;
  margin: 0 auto;
  border: 1px solid var(--border-visible);
  background: var(--surface);
}
.detail-header {
  padding: 32px 32px 24px;
  border-bottom: 1px solid var(--border);
}
.detail-label {
  font-family: "Space Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--text-disabled);
  text-transform: uppercase;
}
.detail-title {
  font-family: "Space Grotesk", sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: var(--text-display);
  margin-top: 8px;
}
.detail-body {
  padding: 24px 32px 32px;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}
```

**Behavior:** JS toggles `.active` class. Close on `×` click or `Escape` key. No backdrop blur. No animation.

---

## 22. CHECKLIST

Interactive task/rule checklist. For compliance checks, onboarding steps, audit items.

**Anatomy:** Stack of rows. Each row = checkbox square + label text + optional status. Checked: square filled `--text-display`. Unchecked: `1px --border-visible` outline.

```html
<div class="checklist">
  <div class="checklist-item">
    <span class="check-box checked"></span>
    <span class="check-label">Completed requirement</span>
    <span class="check-status">OK</span>
  </div>
  <div class="checklist-item">
    <span class="check-box"></span>
    <span class="check-label">Pending requirement</span>
    <span class="check-status pending">PENDING</span>
  </div>
  <div class="checklist-item">
    <span class="check-box"></span>
    <span class="check-label">Not started</span>
  </div>
</div>
```

```css
.checklist {
  display: flex;
  flex-direction: column;
}
.checklist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.checklist-item:last-child { border-bottom: none; }
.check-box {
  width: 16px;
  height: 16px;
  border: 1px solid var(--border-visible);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-box.checked {
  background: var(--text-display);
  border-color: var(--text-display);
}
.check-box.checked::after {
  content: '';
  width: 6px;
  height: 2px;
  background: var(--black);
  margin-top: -1px;
}
.check-label {
  flex: 1;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.4;
}
.check-status {
  font-family: "Space Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--text-disabled);
}
.check-status.pending {
  color: var(--warning);
}
```

**Interactive variant:** Click `.check-box` to toggle `.checked` class via JS. No animation — instant toggle (mechanical switch feel).

---

## 23. DECORATIVE NUMBER HEADER

Oversized semi-transparent background number + foreground title. Purely decorative layer — the number carries no data, only atmosphere.

**Anatomy:** Background number at 5-8% opacity, absolute positioned, overflowing card. Foreground: Space Mono ALL CAPS label + Space Grotesk title stacked tight.

```html
<div class="deco-header">
  <span class="deco-num">01</span>
  <span class="deco-label">SECTION</span>
  <h2 class="deco-title">Section Title</h2>
</div>
```

```css
.deco-header {
  position: relative;
  padding: 32px 24px 24px;
  overflow: hidden;
}
.deco-num {
  position: absolute;
  top: -20px;
  right: -10px;
  font-family: "Space Mono", monospace;
  font-size: 120px;
  font-weight: 700;
  color: var(--text-display);
  opacity: 0.06;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.deco-label {
  font-family: "Space Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--text-disabled);
  text-transform: uppercase;
  display: block;
  margin-bottom: 4px;
}
.deco-title {
  font-family: "Space Grotesk", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: var(--text-display);
  line-height: 1.3;
}
```

**Variant — Doto hero:** Replace `.deco-num` font with `"Doto"`, size 160px, for hero moments. One per page max.

**Variant — Color accent:** `.deco-num` color set to `--accent` at 0.08 opacity for single urgent section.

---

## 24. THREE-COLUMN NUMBERED GRID

Three-column layout with decorative background numbers per card. For steps, features, parallel concepts.

**Anatomy:** 3-column grid. Each card: decorative number (absolute, low opacity) + Space Grotesk title + description. No shadows. Border separation only.

```html
<div class="trio-grid">
  <div class="trio-card">
    <span class="trio-num">01</span>
    <h3 class="trio-title">First Item</h3>
    <p class="trio-desc">Description text for the first item.</p>
  </div>
  <div class="trio-card">
    <span class="trio-num">02</span>
    <h3 class="trio-title">Second Item</h3>
    <p class="trio-desc">Description text for the second item.</p>
  </div>
  <div class="trio-card">
    <span class="trio-num">03</span>
    <h3 class="trio-title">Third Item</h3>
    <p class="trio-desc">Description text for the third item.</p>
  </div>
</div>
```

```css
.trio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.trio-card {
  position: relative;
  border: 1px solid var(--border-visible);
  padding: 32px 24px 24px;
  overflow: hidden;
}
.trio-num {
  position: absolute;
  top: -15px;
  right: -5px;
  font-family: "Space Mono", monospace;
  font-size: 80px;
  font-weight: 700;
  color: var(--text-display);
  opacity: 0.05;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.trio-title {
  font-family: "Space Grotesk", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-display);
  margin-bottom: 8px;
  position: relative;
}
.trio-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  position: relative;
}
```

**Variant — No border:** Remove `.trio-card` border for lighter feel. Spacing alone separates cards.

---

## 25. FLIP CARD (LIGHT MODE ONLY)

Two-sided card. Front = cover (hero title/number). Back = detail content. Click to flip. **Light mode only** — dark mode flat by design.

**Anatomy:** CSS 3D transform card. Front: `--surface` (#FFFFFF in light), 1px border, Doto/Space Mono hero. Back: `--surface-raised` (#F0F0F0 in light), detail text. 180deg Y-axis rotation on click. No easing curve — instant snap (mechanical).

```html
<div class="flip-card">
  <div class="flip-inner">
    <div class="flip-front">
      <span class="flip-label">COVER</span>
      <span class="flip-hero">36.4</span>
      <span class="flip-unit">GB/S</span>
    </div>
    <div class="flip-back">
      <span class="flip-label">DETAIL</span>
      <p class="flip-text">Detail content goes here. Any text or data that supports the front hero metric.</p>
    </div>
  </div>
</div>
```

```css
.flip-card {
  perspective: 800px;
  cursor: pointer;
}
.flip-inner {
  position: relative;
  width: 100%;
  min-height: 200px;
  transition: transform 0.3s step-end;
  transform-style: preserve-3d;
}
.flip-card.flipped .flip-inner {
  transform: rotateY(180deg);
}
.flip-front, .flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border: 1px solid var(--border-visible);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flip-front {
  background: var(--surface);
}
.flip-back {
  background: var(--surface-raised);
  transform: rotateY(180deg);
}
.flip-label {
  font-family: "Space Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--text-disabled);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.flip-hero {
  font-family: "Doto", "Space Mono", monospace;
  font-size: 48px;
  font-weight: 700;
  color: var(--text-display);
  line-height: 1;
}
.flip-unit {
  font-family: "Space Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  margin-top: 4px;
}
.flip-text {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
}
```

**Behavior:** JS toggles `.flipped` class on click. `step-end` easing = mechanical snap, no fluid animation.

**Constraint:** Only use in light mode. In dark mode, render as a single flat card with front content only.

---

## 26. STACKED IMAGE CARDS

Z-axis offset card stack for image display. The cards ARE the images. For portfolios, supplier sites, visual proof.

**Anatomy:** 3-4 cards stacked with incremental `translateZ` and `translateY` offset. Each card = image filling the card area. Top card interactive (click to cycle stack order). No shadows — border separation only.

```html
<div class="stack">
  <div class="stack-card" style="z-index:4;">
    <img src="image1.jpg" alt="">
  </div>
  <div class="stack-card" style="z-index:3;">
    <img src="image2.jpg" alt="">
  </div>
  <div class="stack-card" style="z-index:2;">
    <img src="image3.jpg" alt="">
  </div>
</div>
```

```css
.stack {
  position: relative;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 3 / 4;
  cursor: pointer;
}
.stack-card {
  position: absolute;
  inset: 0;
  border: 1px solid var(--border-visible);
  overflow: hidden;
  transition: transform 0.2s ease-out;
}
.stack-card:nth-child(1) { transform: translateY(0) translateZ(0); }
.stack-card:nth-child(2) { transform: translateY(8px) translateZ(-1px); }
.stack-card:nth-child(3) { transform: translateY(16px) translateZ(-2px); }
.stack-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

**Behavior:** Click top card → it moves to bottom of stack (lowest z-index + max translateY offset). Next card becomes top. Mechanical reorder, no spring physics.

**Variant — With label:** Add `<span class="stack-label">` inside `.stack-card`, positioned bottom-left. Space Mono, 9px, ALL CAPS, `--text-display` on semi-transparent bar.
