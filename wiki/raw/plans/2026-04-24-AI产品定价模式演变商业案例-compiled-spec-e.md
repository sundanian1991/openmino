# Compiled Spec

## Site-Wide CSS Tokens
```css
:root {
  --bg: #f5f4f0;
  --bg-surface: #f8f7f4;
  --bg-inset: #efece6;
  --text: #2a2a2a;
  --text-secondary: #6b6b6b;
  --text-ghost: rgba(42, 42, 42, 0.08);
  --accent: #c9a84c;
  --accent-light: rgba(201, 168, 76, 0.15);
  --accent-dark: #b8962e;
  --deep: #1a2744;
  --border: #d4d0c8;
  --border-light: rgba(212, 208, 200, 0.5);
  --font-display: 'Noto Serif SC', serif;
  --font-body: 'Noto Sans SC', sans-serif;
  --section-gap: 120px;
  --max-width: 1200px;
  --max-width-narrow: 680px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-fast: 0.35s var(--ease-out);
  --transition-medium: 0.7s var(--ease-out);
  --blur-amount: 20px;
  --blur-duration: 1s;
}
```

## External Library Decision
- No external libraries. Native CSS transitions + IntersectionObserver + vanilla JS only.
- Page transitions: CSS clip-path flip effect
- Blur reveals: CSS filter blur transition
- Scroll triggers: IntersectionObserver

## Entrance Map

### Page 01 (终态)
- Scene 1: blur-reveal (blur 20px → 0, opacity 0.3 → 1)
- Scene 2: curtain-wipe (clip-path inset from right to left)
- Scene 3: slow fade-in (2s)
- Scene 4: rack-focus (blur to sharp text)

### Page 02 (催化剂)
- Scene 1: radial-burst (center number scale + lines draw in)
- Scene 2: stagger slide-left (cards slide in one by one)
- Scene 3: whip-pan entrance (fast slide from right)
- Scene 4: fade-in text

### Page 03 (争夺战)
- Scene 1: stagger column reveal (5 columns appear one by one)
- Scene 2: marquee auto-scroll (CSS animation)
- Scene 3: slow zoom (text scales from 0.9 to 1)
- Scene 4: fade-in text

### Page 04 (起点)
- Scene 1: blur-reveal (title from blur to sharp)
- Scene 2: grow-from-bottom (timeline items grow upward)
- Scene 3: slide-left per card
- Scene 4: slow fade-in footer

## Phase 3 Quality Check
- [x] Every section has complete layout CSS
- [x] Every section has complete entrance behavior
- [x] Every section has interaction behavior or intentional none
- [x] No JS-required effects (all CSS + minimal vanilla JS)
- [x] Entrance variety rules pass (no adjacent same-type entrances)
- [x] fadeUp appears at most 2 times per page
- [x] External Library Decision block is complete
- [x] Uses blur-reveal instead of count-up for hero numbers
- [x] Top progress bar + right anchor dots navigation
- [x] "为什么？" driven page navigation instead of prev/next buttons
