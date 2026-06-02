# Nian Design Tokens

> 精确值体系。所有组件、模板引用 token 名，不直接写色值。
>
> **品牌氛围：** Scandinavian workshop。自然光穿过窗户，工具整齐摆在木桌上。精确、温暖、不赶时间。`#FAFAF8` 不是无菌白——是原胚亚麻色。
>
> 品牌 DNA 完整描述见 `brand-dna.md`（技能根目录）。

---

## 1. TYPOGRAPHY

### Font Stack

| Role | Font | Source | Fallback |
|------|------|--------|----------|
| Display (Primary) | Georgia | System font | 'Times New Roman', serif |
| Display (Dot-matrix) | Doto | Google Fonts | 'JetBrains Mono', monospace |
| Body | Inter | Google Fonts | -apple-system, sans-serif |
| Data | JetBrains Mono | Google Fonts | 'Courier New', monospace |

**Google Fonts loading:**
```html
<link href="https://fonts.googleapis.com/css2?family=Doto:wght@400;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

Georgia is a system font — no loading required.

**Doto usage:** Doto is a variable dot-matrix font — each character is a grid of physical dots. Use it for:
- Hero moments (`--display-2xl` / `--display-xl`) where dot-matrix texture is desired
- Decorative numbers and single-character displays
- NOT for body text, labels, or long strings

Georgia remains the primary display font for formal/brand contexts. Doto is the industrial/technical alternative. Choose based on context:

**Why these fonts:** Georgia is a system font with centuries of heritage — no loading cost, immediate rendering. Its serif warmth balances Inter's industrial neutrality, creating the brand's core tension (Nature vs Tech). JetBrains Mono provides technical precision for data without competing with content. Three fonts, three roles, no overlap.

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

- **Display (Georgia):** `--display-*` only. Weight 700. Brand statements, hero names, section titles.
- **Body (Inter):** `--heading-*` through `--body-sm`. Weight 400 default, 500-600 for headings.
- **Data (JetBrains Mono):** `--label` and data values. Weight 500. Technical specs, status labels.
- **ALL CAPS labels** must use JetBrains Mono with 0.06em letter-spacing.
- Never use Georgia for body text. Never use Inter for hero display. Never use Mono for paragraphs.

---

## 2. COLOR SYSTEM

### Brand Palette

| Token | Hex | RGB | HSL | Role |
|-------|-----|-----|-----|------|
| `--brand-olive` | `#4A5D3A` | 74,93,58 | 94°,23%,30% | Outdoor DNA, product primary |
| `--brand-earth` | `#8B7355` | 139,115,85 | 33°,24%,44% | Material warmth, natural texture |

> `--primary-darkgray`（#2C2C2C）已废弃。与 `--text-display` 同色值，统一使用 `--text-display`。

### Accent Palette (functional signals)

| Token | Hex | RGB | HSL | Role |
|-------|-----|-----|-----|------|
| `--accent-yellow` | `#FFD100` | 255,209,0 | 49°,100%,50% | CTA, safety identification |
| `--accent-orange` | `#E55B2B` | 229,91,43 | 16°,79%,53% | Visual focus, highlights |

### Scene Palette (atmosphere)

| Token | Hex | RGB | HSL | Role |
|-------|-----|-----|-----|------|
| `--scene-glacier` | `#2A4A5A` | 42,74,90 | 200°,36%,26% | Winter/alpine mood |
| `--scene-rock` | `#808080` | 128,128,128 | 0°,0%,50% | Neutral transitions |

### Status Colors

| Token | Hex | Role |
|-------|-----|------|
| `--success` | `#2E7D32` | Available, in stock, confirmed |
| `--warning` | `#F9A825` | Low stock, limited, caution |
| `--error` | `#C62828` | Out of stock, error, unavailable |

### Color Ratio

| Group | Colors | Share | Purpose |
|-------|--------|:-----:|---------|
| Brand primary | text-display + olive + earth | 80% | Brand identity |
| Accent | yellow + orange | 5-10% | Functional signals only |
| Scene | glacier + rock | 10-15% | Atmosphere, transitions |

### Surface & Text Tokens (light mode only)

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#FAFAF8` | Page background — warm off-white |
| `--surface` | `#FFFFFF` | Card/component background |
| `--surface-raised` | `#F5F5F0` | Elevated surface, hover states |
| `--border` | `#E5E5E0` | Default borders |
| `--border-visible` | `#C0C0B8` | Emphasized borders |
| `--text-display` | `#2C2C2C` | Hero text, brand statements |
| `--text-primary` | `#1A1A1A` | Body text, primary content |
| `--text-secondary` | `#6B6B6B` | Labels, captions, metadata |
| `--text-disabled` | `#A0A0A0` | Disabled, timestamps, hints |

**No dark mode.** Fixed light palette. Scene variation via color emphasis rotation, not surface inversion.

**Color usage guardrails:**
- **场景色三选一**: olive(常规户外/正面) / earth(工艺/材质/历史) / glacier(技术/冬季/高海拔)。同页面只用一个场景色
- **accent-orange 仅用于功能信号**: 数据下跌、需关注状态、警告。—— 不做标题装饰、不做分割线、不做按钮背景
- **accent-yellow 稀有使用**: 一年用不了几次的级别。只用于关键标记、限量标识
- **颜色应用在值上**: 在数字/状态文本上着色，不在标签行或背景上着色
- **数据颜色顺序**: opacity区分 → earth-tone梯度 → 最后accent色。永远不跳过前两步

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
| **Level 1** | `--surface-raised` background, `1px solid --border` | Hover states, active elements, elevated cards |
| **Level 2** | `--surface` background, `1px solid --border-visible` | Modals, dropdowns, focused panels |
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