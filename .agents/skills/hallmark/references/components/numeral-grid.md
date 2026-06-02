# Numeral Grid

Display numbers as graphic elements — technical expression without the brand mark.

**Use when:** The brief needs to show technical specs, measurements, or numerical data as visual elements.

**Don't confuse with:** Numbered Stat Strip (T4) — that's for marketing stats, not technical numerals.

---

## Shape

```
┌─────────────────────────────────────────────────┐
│                                                  │
│  ┌──────────┬──────────┬──────────┬──────────┐  │
│  │   01     │   02     │   03     │   04     │  │
│  │  Mark    │  Season  │  Layer   │  Range   │  │
│  ├──────────┼──────────┼──────────┼──────────┤  │
│  │   14     │   24     │   72     │   100    │  │
│  │ Founded  │  Temp.   │  Weight  │  Proof   │  │
│  └──────────┴──────────┴──────────┴──────────┘  │
│                                                  │
└─────────────────────────────────────────────────┘
```

## DOM

```html
<div class="numeral-grid">
  <div class="numeral-cell">
    <div class="numeral-cell__digit">01</div>
    <div class="numeral-cell__label">Mark</div>
  </div>
  <!-- more cells -->
</div>
```

## CSS

```css
.numeral-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.numeral-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: background 0.2s;
}

.numeral-cell:hover {
  background: var(--color-cream);
}

.numeral-cell__digit {
  font-size: 64px;
  font-weight: 300;
  line-height: 1;
  font-family: var(--font-display);
}

.numeral-cell__label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-stone);
  margin-top: 12px;
}
```

## Variation Knobs

| Knob | Values |
|------|--------|
| **Columns** | 2 · 3 · 4 |
| **Size** | Square · Wide · Tall |
| **Hover** | Background · Scale · None |
