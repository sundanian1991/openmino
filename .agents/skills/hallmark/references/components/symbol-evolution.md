# Symbol Evolution

Show the refinement of a brand mark — Before and After states connected by an arrow.

**Use when:** The brief is a brand redesign, logo evolution, or identity refresh that needs to show transformation.

**Don't confuse with:** Step Sequence (F4) — that's for multi-step processes, not binary before/after.

---

## Shape

```
┌─────────────────────────────────────────────────┐
│                                                  │
│     ┌──────────┐         ┌──────────┐           │
│     │          │  ───→   │          │           │
│     │  BEFORE  │         │  AFTER   │           │
│     └──────────┘         └──────────┘           │
│                                                  │
│  "Refined, not replaced. The symbol carries      │
│   the legacy."                                   │
└─────────────────────────────────────────────────┘
```

## DOM

```html
<div class="symbol-evolution">
  <div class="symbol-evolution__container">
    <div class="symbol-evolution__block">
      <svg><!-- symbol --></svg>
      <div class="symbol-evolution__caption">BEFORE</div>
    </div>
    <div class="symbol-evolution__arrow"></div>
    <div class="symbol-evolution__block">
      <svg><!-- symbol --></svg>
      <div class="symbol-evolution__caption">AFTER</div>
    </div>
  </div>
  <p class="symbol-evolution__note">Caption text.</p>
</div>
```

## CSS

```css
.symbol-evolution {
  text-align: center;
}

.symbol-evolution__container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  margin: 80px 0;
}

.symbol-evolution__block {
  width: 180px;
  height: 180px;
  border: 2px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0.6;
}

.symbol-evolution__block:last-child {
  opacity: 1;
  border-width: 2px;
}

.symbol-evolution__arrow {
  width: 80px;
  height: 1px;
  background: currentColor;
  opacity: 0.3;
  position: relative;
}

.symbol-evolution__arrow::after {
  content: '';
  position: absolute;
  right: 0;
  top: -4px;
  width: 8px;
  height: 8px;
  border-right: 1px solid currentColor;
  border-top: 1px solid currentColor;
  transform: rotate(45deg);
}

.symbol-evolution__caption {
  position: absolute;
  bottom: -24px;
  font-size: 11px;
  letter-spacing: 2px;
  opacity: 0.3;
}

.symbol-evolution__note {
  font-size: 13px;
  opacity: 0.4;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.7;
}
```

## Variation Knobs

| Knob | Values |
|------|--------|
| **Layout** | Horizontal · Vertical |
| **Arrow** | Line with arrowhead · Dots · Chevron |
| **Caption** | Below blocks · Inside blocks · None |
