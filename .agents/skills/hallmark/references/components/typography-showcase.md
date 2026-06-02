# Typography Showcase

Display a typeface family with hierarchy — anchor element on the left, font specimens on the right.

**Use when:** The brief is a brand design system, typography specimen, or type-focused identity that needs to show font weights and roles.

**Don't confuse with:** Split Diptych (H2) — that's for headline + image, not headline + type specimens.

---

## Shape

```
┌─────────────────────────────────────────────────┐
│                          │                       │
│       H                  │  Haglöfs Headline     │
│                          │  Outdoor performance  │
│                          │  since 1914.          │
│                          │                       │
│       (200px)            │  Haglöfs Text         │
│                          │  Crafted for the      │
│                          │  elements that test   │
│                          │  you most.            │
│                          │                       │
└─────────────────────────────────────────────────┘
```

## DOM

```html
<div class="typography-showcase">
  <div class="typography-showcase__anchor">
    <div class="typography-showcase__letter">H</div>
    <p class="typography-showcase__desc">Description text.</p>
  </div>
  <div class="typography-showcase__specimens">
    <div class="type-font-item">
      <div class="type-font-item__name">Haglöfs Headline</div>
      <div class="type-font-item__sample serif">Sample text here.</div>
      <div class="type-font-item__desc">Display weight. Hero moments.</div>
    </div>
    <!-- more specimens -->
  </div>
</div>
```

## CSS

```css
.typography-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
}

.typography-showcase__anchor {
  position: sticky;
  top: 80px;
  align-self: start;
}

.typography-showcase__letter {
  font-size: 200px;
  font-weight: 200;
  line-height: 0.85;
  font-family: var(--font-display);
}

.typography-showcase__specimens {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.type-font-item {
  border-top: 1px solid var(--color-cream);
  padding-top: 24px;
}

.type-font-item__name {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-stone);
  margin-bottom: 8px;
}

.type-font-item__sample {
  font-size: 28px;
  font-weight: 300;
  line-height: 1.4;
}

.type-font-item__desc {
  font-size: 13px;
  color: var(--color-stone);
  margin-top: 8px;
  line-height: 1.6;
}
```

## Variation Knobs

| Knob | Values |
|------|--------|
| **Anchor** | Single letter · Word · Specimen word |
| **Sticky** | Sticky anchor · Static anchor |
| **Border** | Hairline top · None |
