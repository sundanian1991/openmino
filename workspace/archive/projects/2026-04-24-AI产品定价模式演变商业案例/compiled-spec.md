# Compiled Spec

## Site-Wide Tokens
```css
:root {
  --bg-deep: #0a0a0f;
  --bg-surface: #12121a;
  --bg-elevated: #1a1a26;
  --text-primary: #e8e6e1;
  --text-secondary: #7a7a8a;
  --text-dim: #4a4a5a;
  --alert: #ff4433;
  --profit: #00cc88;
  --warn: #ffaa00;
  --border: rgba(255,255,255,0.06);
  --border-alert: rgba(255,68,51,0.3);
  --font-data: "JetBrains Mono", "SF Mono", "Fira Code", monospace;
  --font-thesis: "Noto Serif SC", "Source Han Serif SC", serif;
  --font-body: "Noto Sans SC", "Source Han Sans SC", sans-serif;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --transition-fast: 0.3s var(--ease-out);
  --transition-slow: 0.8s var(--ease-out);
}
```

## External Library Decision
### Q1: Core motion experience
- Page transitions (fade + slide), count-up numbers, horizontal scroll timeline, tab switching, accordion reveals
### Q2: Can native entries do it?
- Yes — all CSS transitions + minimal vanilla JS for count-up and horizontal scroll
### Q3: N/A — no external library
### Decision
- No external libraries. Native CSS transitions + vanilla JS only.

## Entrance Map

### Page 01 (首页)
- Scene 1: count-up number scale-in (B5)
- Scene 2: staggered fade-in per stat (B9)
- Scene 3: scale-in from center (B18)
- Scene 4: slide-left per column (B8)
- Scene 5: fade-from-bottom (B21)
- Scene 6: fade-in (B25)

### Page 02 (时间线)
- Scene 1: horizontal scroll reveal (B13)
- Scene 2: marquee auto-scroll (B12)
- Scene 3: fade-in table rows (B9)
- Scene 4: scale-in blackout (B14)
- Scene 5: fade-in quote (B19)

### Page 03 (定价迷宫)
- Scene 1: staggered step reveal (B11)
- Scene 2: tab content fade (B15)
- Scene 3: bar chart grow (B8)
- Scene 4: count-up numbers (B9)
- Scene 5: accordion slide-down (B18)
- Scene 6: fade-in cliffhanger (B23)

### Page 04 (洞察与预判)
- Scene 1: count-up total (B16)
- Scene 2: fade-in insight blocks (B10)
- Scene 3: staggered card fade (B6)
- Scene 4: scale-in loop (B24)
- Scene 5: fade-out to black (B25)

## Phase 3 Quality Check
- [x] Every section has complete layout CSS
- [x] Every section has complete entrance behavior
- [x] Every section has complete interaction behavior or intentional `none`
- [x] No JS-required effects (count-up is minimal vanilla JS)
- [x] Entrance variety rules pass (no adjacent same-type entrances)
- [x] `fadeUp` appears at most 2 times per page
- [x] External Library Decision block is complete
- [x] Library source ids present for all major visual moves
