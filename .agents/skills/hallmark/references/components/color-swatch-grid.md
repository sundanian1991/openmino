# Color Swatch Grid

A visual display of a brand's color system — organized by hierarchy, role, or contrast.

**Use when:** The brief is a brand design system, visual identity, or style guide that needs to showcase a color palette.

**Don't confuse with:** Product card grid (F6) — that's for sellable items, not abstract swatches.

---

## Shape

```
┌─────────────────────────────────────────────────┐
│ [Label: "Core — Nature"]                         │
├──────────┬──────────┬──────────┬──────────┬──────┤
│          │          │          │          │      │
│ Off White│  Cream   │   Sand   │  Stone   │Charc.│
│ #F5F3EF  │ #E8E4DD  │ #C4B8A8  │ #8A7D6E  │#2D2A │
│          │          │          │          │      │
└──────────┴──────────┴──────────┴──────────┴──────┘
```

## DOM

```html
<div class="color-swatch-grid">
  <div class="color-swatch-grid__label">Core — Nature</div>
  <div class="color-swatch-grid__row">
    <div class="color-swatch" style="background: var(--swatch-1);">
      <span class="color-swatch__name">Off White</span>
      <span class="color-swatch__hex">#F5F3EF</span>
    </div>
    <!-- more swatches -->
  </div>
</div>
```

## CSS

```css
.color-swatch-grid__label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-stone);
  margin-bottom: 8px;
}

.color-swatch-grid__row {
  display: flex;
  gap: 2px;
  margin-bottom: 2px;
}

.color-swatch {
  flex: 1;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  transition: transform 0.2s ease;
}

.color-swatch:hover {
  transform: scale(1.02);
  z-index: 1;
}

.color-swatch__name {
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.7;
}

.color-swatch__hex {
  font-size: 11px;
  font-family: var(--font-mono);
  opacity: 0.5;
  margin-top: 2px;
}
```

## Variation Knobs

| Knob | Values |
|------|--------|
| **Layout** | Row (horizontal) · Grid (2D) · Stacked (vertical) |
| **Hover** | Scale · Border · Shadow · None |
| **Labels** | Name + Hex · Name only · Hex only · None |
