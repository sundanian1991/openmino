# Nian UI Design Tokens

> 精确值体系。所有组件、模板引用 token 名，不直接写色值。

---

## 1. COLOR SYSTEM

### Scene Palette（三选一，同页一个）

| Token | Hex | RGB | HSL | Mood |
|-------|-----|-----|-----|------|
| `--brand-olive` | `#4A5D3A` | 74,93,58 | 94°,23%,30% | Growth, vitality, authority |
| `--brand-earth` | `#8B7355` | 139,115,85 | 33°,24%,44% | Warmth, craft, nostalgia |
| `--brand-glacier` | `#2A4A5A` | 42,74,90 | 200°,36%,26% | Precision, distance, cold |

**注入方式：**
```css
:root {
  --scene: var(--brand-olive);
  --scene-bg: rgba(74, 93, 58, 0.06);
  --scene-border: rgba(74, 93, 58, 0.2);
}
```

### Accent Palette（功能信号，稀有使用）

| Token | Hex | RGB | HSL | Role |
|-------|-----|-----|-----|------|
| `--accent-yellow` | `#FFD100` | 255,209,0 | 49°,100%,50% | CTA, safety identification |
| `--accent-orange` | `#E55B2B` | 229,91,43 | 16°,79%,53% | Visual focus, highlights |

### Surface Palette

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#FAFAF8` | Page background — warm off-white |
| `--surface` | `#FFFFFF` | Card/component background |
| `--surface-raised` | `#F5F5F0` | Elevated surface, hover states |
| `--border` | `#E5E5E0` | Default borders |
| `--border-visible` | `#C0C0B8` | Emphasized borders |

### Text Palette（4 级灰度 = 4 级层级）

| Token | Hex | Contrast | Role |
|-------|-----|:--------:|------|
| `--text-display` | `#2C2C2C` | 100% | Hero text, brand statements |
| `--text-primary` | `#1A1A1A` | 90% | Body text, primary content |
| `--text-secondary` | `#6B6B6B` | 60% | Labels, captions, metadata |
| `--text-disabled` | `#A0A0A0` | 40% | Disabled, timestamps, hints |

### Status Colors

| Token | Hex | Role |
|-------|-----|------|
| `--success` | `#2E7D32` | Growth, available |
| `--warning` | `#F9A825` | Caution, limited |
| `--error` | `#C62828` | Risk, error, unavailable |

### Color Usage Guardrails

- 场景色三选一，同页面只用一个
- accent-orange 仅用于功能信号——不做标题装饰、不做分割线、不做按钮背景
- accent-yellow 稀有使用——一年用不了几次
- 颜色应用在值上，不在标签行或背景上着色
- 数据颜色顺序：opacity区分 → earth-tone梯度 → 最后accent色

---

## 2. TYPOGRAPHY

| Role | Font | Source | Fallback |
|------|------|--------|----------|
| Display | Playfair Display | Google Fonts | Georgia, 'Times New Roman', serif |
| Body | Inter | Google Fonts | -apple-system, 'Helvetica Neue', Arial, sans-serif |
| Data | JetBrains Mono | Google Fonts | 'Courier New', monospace |
| Decoration | Doto | Google Fonts | monospace（仅点阵装饰） |

### Type Scale

| Token | Size | Line Height | Letter Spacing | Use |
|-------|:----:|:-----------:|:--------------:|-----|
| `--display-2xl` | 120px | 1.0 | -0.03em | Hero moments — one per page |
| `--display-xl` | 96px | 1.05 | -0.025em | Key metrics |
| `--display-lg` | 48px | 1.15 | -0.01em | Section titles |
| `--display-md` | 36px | 1.2 | 0 | Category titles |
| `--heading-lg` | 24px | 1.3 | 0 | Sub-sections |
| `--heading-md` | 20px | 1.4 | 0 | Feature titles |
| `--body-lg` | 18px | 1.6 | 0 | Lead paragraphs |
| `--body` | 16px | 1.6 | 0 | Body text |
| `--body-sm` | 14px | 1.5 | 0.01em | Captions |
| `--label` | 12px | 1.4 | 0.06em | ALL CAPS labels |

Hero (96-120px) ÷ Body (14-16px) ≥ 8:1。

---

## 3. SPACING

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
| `--space-4xl` | 96px | Cinematic moments |

---

## 4. BORDER-RADIUS

| Token | Value | Use |
|-------|:-----:|-----|
| `--radius-none` | 0 | Ghost buttons, seam dividers |
| `--radius-xs` | 2px | Micro badges |
| `--radius-sm` | 4px | Buttons, inputs, tags |
| `--radius-md` | 8px | Cards, modals |
| `--radius-lg` | 12px | Hero cards (emphasis) |
| `--radius-full` | 999px | Pill buttons, avatars |

---

## 5. DEPTH SYSTEM（No Shadows）

| Level | How | When |
|-------|-----|------|
| **L0** | `--surface` bg, no border | Default cards |
| **L1** | `--surface-raised` bg, `1px solid --border` | Hover states |
| **L2** | `--surface` bg, `1px solid --border-visible` | Modals, focused panels |
| **L3** | `rgba(250,250,248,0.92)` + `--surface` panel | Detail panels |

**No shadows. No blur. No drop-shadow.**

---

## 6. GRID & CONTAINER

| Token | Value |
|-------|:-----:|
| `--container-max` | 1120px |
| `--container-padding` | 32px |
| `--grid-gap` | 24px |
| `--grid-gap-lg` | 48px |
