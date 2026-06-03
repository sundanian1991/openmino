# Nian Design Tokens

> 精确值体系。所有组件、模板引用 token 名，不直接写色值。
>
> `#FAFAF8` 不是无菌白——是原胚亚麻色。
>
> 品牌 DNA 完整描述见 `brand-dna.md`（技能根目录）。

---

## 1. TYPOGRAPHY

Three typefaces — Display (Playfair Display) + Body (Inter) + Data (JetBrains Mono).

| Role | Font | Source | Fallback |
|------|------|--------|----------|
| Display | Playfair Display | Google Fonts | Georgia, 'Times New Roman', serif |
| Body | Inter | Google Fonts | -apple-system, 'Helvetica Neue', Arial, sans-serif |
| Data | JetBrains Mono | Google Fonts | 'Courier New', monospace |

Optional: Doto (Google Fonts) for dot-matrix Hero decoration.

**Google Fonts loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Doto:wght@400;700&display=swap" rel="stylesheet">
```

Playfair Display falls back to Georgia (system font, no loading cost).

**Doto usage:** Variable dot-matrix font. Hero moments and decorative numbers only. Not for body text, labels, or long strings.

**Why these fonts:** Playfair Display brings editorial warmth and heritage — the serif anchor for brand statements. Its dramatic weight contrast (300→700) balances Inter's industrial neutrality, creating the brand's core tension (Nature vs Tech). JetBrains Mono provides technical precision for data without competing with content. Three fonts, three roles, no overlap.

### Type Scale

| Token | Size | Line Height | Letter Spacing | Use |
|-------|:----:|:-----------:|:--------------:|-----|
| `--display-2xl` | 120px | 1.0 | -0.03em | Hero moments, cinematic statements — one per page |
| `--display-xl` | 96px | 1.05 | -0.025em | Full-viewport statements, key metrics |
| `--display-lg` | 48px | 1.15 | -0.01em | Section titles, product heroes |
| `--display-md` | 36px | 1.2 | 0 | Category titles |
| `--heading-lg` | 24px | 1.3 | 0 | Sub-sections |
| `--heading-md` | 20px | 1.4 | 0 | Feature titles |
| `--body-lg` | 18px | 1.6 | 0 | Lead paragraphs |
| `--body` | 16px | 1.6 | 0 | Body text |
| `--body-sm` | 14px | 1.5 | 0.01em | Captions, secondary text |
| `--label` | 12px | 1.4 | 0.06em | ALL CAPS labels, tags |

**Extreme size contrast is mandatory.** The ratio between hero (96-120px) and body (14-16px) must exceed 8:1.

### Typographic Rules

- **Display (Playfair Display):** `--display-*` only. Weight 300 for hero, 600-700 for emphasis. Brand statements, hero names, section titles.
- **Body (Inter):** `--heading-*` through `--body-sm`. Weight 400 default, 500-600 for headings.
- **Data (JetBrains Mono):** `--label` and data values. Weight 500. Technical specs, status labels.
- **ALL CAPS labels** must use JetBrains Mono with 0.06em letter-spacing.
- Never use Georgia for body text. Never use Inter for hero display. Never use Mono for paragraphs.

---

## 2. COLOR SYSTEM

### Brand Palette

| Token | Hex | Role |
|-------|-----|------|
| `--brand-primary` | `#4A6741` | Forest — brand anchor |
| `--brand-secondary` | `#7A9B6D` | Moss — brand auxiliary |
| `--brand-tertiary` | `#5B6B7A` | Slate — tech/industrial |
| `--brand-quaternary` | `#7A8B9B` | Steel — light technical |

### Signal Palette (functional interrupts)

| Token | Hex | Role |
|-------|-----|------|
| `--signal-error` | `#E8453C` | Error, decline, critical |
| `--signal-warning` | `#E87A3C` | Warning, attention needed |
| `--signal-caution` | `#E8B83C` | Caution, low priority highlight |
| `--signal-info` | `#3C7AE8` | Information, links, neutral signal |

### Color Ratio

| Group | Colors | Share | Purpose |
|-------|--------|:-----:|---------|
| Neutral | Off-White → Black | 75-80% | Hierarchy, structure |
| Brand | Forest + Moss + Slate + Steel | 15-20% | Brand identity |
| Signal | Red + Orange + Yellow + Blue | <5% | Functional interrupts |

### Surface & Text Tokens

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#F5F3EF` | Page background — warm off-white |
| `--surface` | `#FFFFFF` | Card/component background |
| `--surface-alt` | `#E8E4DD` | Alternating surface (Cream) |
| `--border` | `#C4B8A8` | Default borders (Sand) |
| `--border-strong` | `#8A7D6E` | Emphasized borders (Stone) |
| `--text-display` | `#2D2A26` | Hero text, brand statements |
| `--text-primary` | `#1A1816` | Body text, primary content |
| `--text-secondary` | `#8A7D6E` | Labels, captions, metadata |
| `--text-disabled` | `#C4B8A8` | Disabled, timestamps, hints |

**No dark mode.** Fixed light palette.

**Color usage guardrails:**
- **灰度先于颜色**: 4 级灰度建立层级，颜色只标记需注意的信息
- **颜色应用在值上**: 在数字/状态文本上着色，不在标签行或背景上着色
- **同页不超过 5 种色**: 不含中性灰阶
- **深色底配浅色字**: Forest/Slate 做全底时，文字用 Off-White 或 White
- **数据颜色顺序**: opacity区分 → Nature色梯度(Forest→Moss→Slate→Steel) → 最后信号色。永远不跳过前两步
- **信号色合计 < 2%**: 仅中断时出现，不做装饰

---

## 3. SPACING

8px base grid. Named tokens for semantic use.

| Token | Value | Use |
|-------|:-----:|-----|
| `--space-2xs` | 2px | Micro-adjustments |
| `--space-xs` | 4px | Icon gaps, inline padding |
| `--space-sm` | 8px | Tight grouping, label+value |
| `--space-md` | 16px | List items, form fields |
| `--space-lg` | 24px | Section internal padding |
| `--space-xl` | 32px | Section breaks |
| `--space-2xl` | 48px | Major section divisions |
| `--space-3xl` | 64px | Hero to content |
| `--space-4xl` | 96px | Horizon gaps, cinematic moments |

---

## 4. BORDER-RADIUS

| Token | Value | Use |
|-------|:-----:|-----|
| `--radius-none` | 0 | Ghost buttons, decorative headers, seam dividers |
| `--radius-xs` | 2px | Nameplate labels, dot-matrix cells, micro badges |
| `--radius-sm` | 4px | Buttons (primary/secondary/destructive), inputs, tags, alerts |
| `--radius-md` | 8px | Cards, product cards, swatch cards, modals |
| `--radius-lg` | 12px | Hero cards, metric cards (when emphasis needed) |
| `--radius-full` | 999px | Toggle tracks, pill buttons, circular avatars |

**Rule:** Cards max 8px. Buttons 4px (technical) or 0 (ghost). No radius > 12px on anything. Round elements (avatars, toggles) use `--radius-full`.

---

## 5. DEPTH SYSTEM (No Shadows)

Nian uses **border + surface color + opacity** instead of box-shadow. Four depth levels:

| Level | How | When |
|-------|-----|------|
| **Level 0** | `--surface` background, no border | Default cards, content areas |
| **Level 1** | `--surface-alt` background, `1px solid --border` | Hover states, active elements, elevated cards |
| **Level 2** | `--surface` background, `1px solid --border-strong` | Modals, dropdowns, focused panels |
| **Level 3** | Full overlay `rgba(250,250,248,0.92)` backdrop + `--surface` panel | Detail panels, scrollable modals |

**No shadows. No blur. No drop-shadow.** Elevation = border contrast + background shift. The hierarchy is visible through edge definition, not shadow casting.

---

## 6. GRID & CONTAINER

| Property | Value | Use |
|----------|:-----:|-----|
| `--container-max` | 1120px | Maximum content width |
| `--container-padding` | 32px (2rem) | Horizontal padding on body |
| `--grid-gap` | 24px | Default column gap |
| `--grid-gap-lg` | 48px | Section-level gaps |

**Column modes:**
- Single column: `max-width: 640px; margin: 0 auto` (text-heavy content)
- 2-column asymmetric: `grid-template-columns: 2fr 1fr` (data + context)
- 3-column: `grid-template-columns: repeat(3, 1fr)` (card grids)
- 4-column: `grid-template-columns: repeat(4, 1fr)` (metric cards, small items)

**Responsive breakpoints:**
- Desktop: ≥1120px (full layout)
- Tablet: 768–1119px (2-col → stacked, nav collapses)
- Mobile: <768px (single column, hidden nav links)

**Section rhythm:** Each `<section>` gets `--space-4xl` (96px) top/bottom padding. Sections separated by `1px solid --border` or seam divider.

---

## 7. MOTION & INTERACTION

Nian motion is **organic, not mechanical.** Transitions should feel like natural movement — gentle, predictable, never jarring.

| Context | Duration | Easing | Timing Function |
|---------|:--------:|--------|:---------------:|
| Micro (hover, focus, border) | 150ms | ease-out | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| Standard (expand, reveal, toggle) | 250ms | ease-out | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| Emphasis (page transition, modal) | 400ms | ease-out | `cubic-bezier(0.25, 0.1, 0.25, 1)` |

**Rules:**
- **No spring/bounce easing.** Never use `cubic-bezier` overshoot curves. The brand is grounded, not playful.
- **Prefer opacity over position.** Elements fade in/out rather than slide. Position changes imply physical movement, which Nian doesn't need.
- **Hover states:** border/text brightens by one token level. No scale, no shadow, no background shift.
- **No parallax, no scroll-jacking, no gratuitous animation.** If an animation doesn't communicate function, remove it.
- **Loading:** Use `[LOADING...]` inline text or seam divider pulse. No spinners, no skeleton screens.

---

## 8. ICONOGRAPHY

- **Style:** Single-line stroke, 1.5px weight
- **Size:** 24×24px viewBox
- **Color:** Inherit from parent (`currentColor`)
- **No filled icons. No multi-color icons. No emoji as icons.**
- Round caps and joins for organic feel (matching brand warmth)

---

## 9. DOT-MATRIX MOTIF

The dot-matrix motif is Nian's signature decorative element — modular, technical, adaptable.

**CSS implementation:**
```css
.dotmatrix-h {
  display: grid;
  grid-template-columns: repeat(5, var(--dot-size));
  grid-template-rows: repeat(7, var(--dot-size));
  gap: var(--dot-gap);
}
.dotmatrix-h .dot {
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background: var(--text-display);
}
.dotmatrix-h .dot.empty { background: transparent; }
```

**Size scale:**

| Context | `--dot-size` | `--dot-gap` |
|---------|:-----------:|:-----------:|
| Small (inline) | 4px | 2px |
| Medium (card) | 8px | 3px |
| Large (hero) | 12px | 4px |
| XL (display) | 16px | 5px |

**H letter pattern (5×7 grid, row-major):**
```
1 1 1 1 1
1 0 0 0 1
1 1 1 0 1
1 1 1 1 1
1 1 1 0 1
1 0 0 0 1
1 1 1 1 1
```
(1 = dot, 0 = empty)

**Usage rules:**
- Dot Matrix H can replace Classic H in any context where adaptability is needed
- Dot units can combine into numbers, patterns, decorative elements
- Accent colors allowed for dots only in functional contexts (product codes, status)
- Classic H for formal/traditional contexts. Dot Matrix for digital/modern contexts.