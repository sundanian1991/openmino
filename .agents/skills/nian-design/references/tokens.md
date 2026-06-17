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
| Display Light | Georgia | System font | 'Times New Roman', serif |
| Body | Inter | Google Fonts | -apple-system, 'Helvetica Neue', Arial, sans-serif |
| Data | JetBrains Mono | Google Fonts | 'Courier New', monospace |
| Decorative | Doto | Google Fonts | Georgia, serif |

**Display vs Display Light:**
- **Playfair Display** — 主 Display 字体，用于 Hero 标题、品牌宣言、戏剧性时刻
- **Georgia** — 轻量 Display，用于小字号标题（< 36px）、副标题、quote。系统字体，零加载成本，x-height 更高，小字号更清晰

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

7 色体系。自然低饱和主色传递户外属性，高饱和亮色强化功能性识别。详见 brand-dna.md。

### Surface（表面色）

| Token | Hex | Role |
|-------|:---:|------|
| `--bg` | `#FAFAF8` | 页面主背景 |
| `--surface` | `#FFFFFF` | 卡片/组件背景 |
| `--surface-raised` | `#F5F5F0` | 次级背景 |
| `--border` | `#E5E5E0` | 默认边框 |
| `--border-strong` | `#C0C0B8` | 高可见边框、聚焦态 |

### Semantic — 语义状态色

| Token | Hex | Role |
|-------|:---:|------|
| `--success` | `#2E7D32` | 成功状态、正向指标 |
| `--warning` | `#F9A825` | 警告状态、需关注 |
| `--error` | `#C62828` | 错误状态、负向指标 |

### Primary — 自然色系（80%）

| Token | Hex | 占比 | Role |
|-------|:---:|:----:|------|
| `--darkgray` | `#2C2C2C` | 45% | 品牌底色 · 正文 · 标识 |
| `--olive` | `#4A5D3A` | 20% | 产品主色 · 户外属性 |
| `--earth` | `#8B7355` | 15% | 产品主色 · 自然质感 |

### Accent — 功能性警示色（10%）

| Token | Hex | 占比 | Role |
|-------|:---:|:----:|------|
| `--yellow` | `#FFD100` | 5% | 安全警示 · CTA |
| `--orange` | `#E55B2B` | 5% | 视觉焦点 · 高亮 |

### Scene — 场景化色彩（10%）

| Token | Hex | 占比 | Role |
|-------|:---:|:----:|------|
| `--glacier` | `#2A4A5A` | 5% | 冬季场景 · 冷调 |
| `--rock` | `#808080` | 5% | 中性过渡 |

### Text（文字色）

| Token | Hex | 对比度 | Role |
|-------|:---:|:-----:|------|
| `--text-display` | `#2C2C2C` | 90% | Hero 标题 · 品牌宣言 |
| `--text-primary` | `#1A1A1A` | 100% | 正文 · 主要内容 |
| `--text-secondary` | `#6B6B6B` | 60% | 标签 · 说明 · 元信息 |
| `--text-disabled` | `#A0A0A0` | 40% | 禁用态 · 时间戳 |

### Color Ratio

| 层级 | 占比 | 包含 |
|------|:----:|------|
| Primary | 80% | darkgray + olive + earth |
| Accent | 10% | yellow + orange |
| Scene | 10% | glacier + rock |

---

## 3. SPACING

8px base grid. Named tokens for semantic use.

| Token | Value | Use |
|-------|:-----:|-----|
| `--space-3xs` | 1px | Hairline borders, seam dividers |
| `--space-2xs` | 2px | Dot-matrix gaps, micro badges |
| `--space-xs` | 4px | Icon gaps, inline padding |
| `--space-sm` | 8px | Tight grouping, label+value |
| `--space-md` | 16px | List items, form fields |
| `--space-lg` | 24px | Section internal padding |
| `--space-xl` | 32px | Section breaks |
| `--space-2xl` | 48px | Major section divisions |
| `--space-3xl` | 64px | Hero to content |
| `--space-4xl` | 96px | Horizon gaps, cinematic moments |
| `--space-5xl` | 120px | Hero edge padding, full-bleed sections |

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

---

## 10. GHOST WATERMARK

Ghost watermark is Nian's signature spatial element — creating depth and brand memory through oversized, near-invisible typography.

**CSS implementation:**
```css
.ghost {
  position: absolute;
  font-family: var(--font-display);
  font-size: clamp(80px, 15vw, 280px);
  font-weight: 300;
  line-height: 1;
  color: var(--text-display);
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
}

.ghost--deco {
  font-family: var(--font-deco);
}

.ghost--right {
  right: var(--space-4xl);
  bottom: var(--space-4xl);
}

.ghost--center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

**Size scale:**

| Context | Font Size | Opacity | Position |
|---------|:---------:|:-------:|----------|
| Hero background | `clamp(120px, 18vw, 320px)` | 0.03-0.04 | absolute, right/bottom |
| Section accent | `clamp(80px, 12vw, 200px)` | 0.04-0.06 | absolute, left/bottom |
| Inline decoration | `clamp(48px, 8vw, 120px)` | 0.06-0.08 | relative, inline |

**Usage rules:**
- One ghost per section maximum — more than one creates noise
- Ghost opacity must be < 0.08 — if visible at arm's length, it's too opaque
- Ghost content: year numbers (1914), brand initials (H), or single words
- Ghost font: Playfair Display for serif warmth, Doto for dot-matrix texture
- Ghost is always absolute positioned, never affects layout flow
- Ghost color inherits from `--text-display` or `--text-primary`, never accent colors

**Why ghost works:** Creates spatial depth without shadows. The eye registers "something there" without reading it, establishing a sense of scale and craftsmanship. It's the design equivalent of a whisper — present but not demanding attention.
---

## 11. TOKEN MIGRATION — 旧 14 色 → 新 7 色映射

> showcase/R/ 和 showcase/H/ 的历史案例使用旧 14 色 token 系统（2026-06-08 之前）。
> 读取旧 showcase 时，用此表做 token 翻译。产出时始终用新 7 色 Brand DNA token。

### Surface 映射

| 旧 Token | 色值 | → | 新 Token | 说明 |
|----------|------|---|----------|------|
| `--bg` | `#F2F0EC` | → | `--bg` | 色值微调（原暖灰→现亚麻），语义不变 |
| `--sf` | `#FFFFFF` | → | `--surface` | 纯白表面 |
| `--sf-alt` | `#E3DFD8` | → | `--surface-raised` | 次级表面 |
| `--bd` | `#C4B8A8` | → | `--border` | 边框 |
| `--bd-s` | `#8A7D6E` | → | `--text-secondary` | 强调边框→次级文字 |

### Text 映射

| 旧 Token | 色值 | → | 新 Token | 说明 |
|----------|------|---|----------|------|
| `--td` | `#2D2A26` | → | `--text-display` | 展示文字（Hero 数字/品牌宣言） |
| `--tp` | `#1A1816` | → | `--text-primary` | 正文/标题 |
| `--ts` | `#8A7D6E` | → | `--text-secondary` | 次要文字/标签 |
| `--tda` | `#C4B8A8` | → | `--text-disabled` | 禁用态/时间戳/提示 |

### Scene/Action 颜色映射

| 旧 Token | 色值 | → | 新 Token | 说明 |
|----------|------|---|----------|------|
| `--olive` | `#4A5D3A` | → | `--olive` | 不变，保留 |
| `--moss` | `#6B8B5E` | → | `--olive` | 合并（moss 是 olive 的浅变体，用 olive 替代，需要时 opacity 微调） |
| `--glacier` | `#2A4A5A` | → | `--glacier` | 不变，保留 |
| `--rock` | `#808080` | → | `--rock` | 不变，保留 |
| `--yellow` | `#FFD100` | → | `--yellow` | 不变，保留 |
| `--clay` | `#C66B4B` | → | `--orange` | 暖色强调→统一为 orange |
| `--gold` | `#BF9B5A` | → | `--earth` | 金属暖色→earth（自然质感） |
| `--sky` | `#4A80C0` | → | `--glacier` | 蓝色→glacier |
| `--red` | `#D9433A` | → | `--orange` | 暖色警示→orange（统一为双色 accent 体系） |

### 字体 Token 映射

| 旧 Token | → | 新用法 | 说明 |
|----------|---|--------|------|
| `--font-d` | → | `'Playfair Display', Georgia, serif` | Display 字体（旧 token 含完整 font-family） |
| `--font-b` | → | `'Inter', -apple-system, sans-serif` | Body 字体 |
| `--font-m` | → | `'JetBrains Mono', monospace` | Data/Mono 字体 |
| `--font-o` | → | `'Doto', monospace` | 装饰/Doto 字体 |

### 间距/布局 Token 映射

旧 showcase 使用 `--s-*` 和 `--c-*` 变量做间距和容器。新系统不设全局间距变量，改为 inline `padding`/`gap`/`margin`。

| 旧 Token | 典型值 | → | 新用法 |
|----------|--------|---|--------|
| `--c-max` | `1120px` | → | `max-width:1120px`（inline） |
| `--pad` | `32px` | → | `padding:32px`（inline，按骨架调整） |
| `--s-4xl` | `96px` | → | `padding:96px 120px`（骨架固定值） |
| `--s-3xl` | `64px` | → | `margin-bottom:64px` 或 `gap:64px` |
| `--s-2xl` | `48px` | → | 按语义使用 gap/padding |
| `--s-xl` | `32px` | → | 同上 |
| `--s-lg` | `24px` | → | 同上 |
| `--s-md` | `16px` | → | 同上 |

### 使用方式

读 showcase 时，看到旧 token 就按上表映射到新 token。产出时只用新 7 色 Brand DNA：

```
--darkgray / --olive / --earth / --yellow / --orange / --glacier / --rock
--bg / --surface / --surface-raised / --border
--text-display / --text-primary / --text-secondary / --text-disabled
```

