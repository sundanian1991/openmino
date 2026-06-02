# Tension Grid

Display binary oppositions — the core dualisms that define a brand or concept.

**Use when:** The brief is a brand design system, philosophy piece, or conceptual framework that needs to show opposing forces in balance.

**Don't confuse with:** Bento Grid (F1) — that's for feature tiles, not conceptual oppositions.

---

## Shape

```
┌─────────────────────────────────────────────────┐
│  ┌────────────────────┬────────────────────┐    │
│  │ 01                 │ 02                 │    │
│  │ Heritage ── Future │ Organic ── Engine. │    │
│  │ Description text.  │ Description text.  │    │
│  ├────────────────────┼────────────────────┤    │
│  │ 03                 │ 04                 │    │
│  │ Nature ── Tech     │ Fixed ── Fluid     │    │
│  │ Description text.  │ Description text.  │    │
│  └────────────────────┴────────────────────┘    │
└─────────────────────────────────────────────────┘
```

## DOM

```html
<div class="tension-grid">
  <div class="tension-item">
    <div class="tension-item__number">01</div>
    <div class="tension-item__pair">
      <span class="tension-item__side">Heritage</span>
      <span class="tension-item__vs"></span>
      <span class="tension-item__side">Future</span>
    </div>
    <p class="tension-item__desc">Description text.</p>
  </div>
  <!-- more items -->
</div>
```

## CSS

```css
.tension-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.tension-item {
  padding: 60px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
}

.tension-item__number {
  font-size: 11px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 24px;
}

.tension-item__pair {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.tension-item__side {
  font-size: 32px;
  font-weight: 300;
  letter-spacing: -0.5px;
}

.tension-item__vs {
  width: 32px;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.tension-item__desc {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  max-width: 360px;
}
```

## Variation Knobs

| Knob | Values |
|------|--------|
| **Layout** | 2×2 grid · Single column · Horizontal strip |
| **Divider** | Hairline · Dots · Arrow · None |
| **Number** | Show · Hide |
