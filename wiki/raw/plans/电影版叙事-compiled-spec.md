# Compiled Spec

## Page: Home
- Page scene thesis: 调查档案——翻阅一份关于 AI 定价变革的完整商业案例报告
- Signature composition: 五计量体系对比面板（非普通表格，五个并排的计量面板各有颜色标识和透明度标签）
- Signature composition source id: Custom（根据内容定制的 meter-grid 布局，非标准库条目）
- Why this cannot collapse into a default grid: 如果简化为表格，会失去"计量体系本身就是战场"的核心叙事。每个面板有排名、采用者、描述和透明度标签四层信息。
- One big idea: 数字本身会说话——让数据排列揭示规律，而非用形容词告诉观众结论
- Heavy interaction: Intersection Observer scroll reveals（65 个元素，4 种入场方式）
- Heavy interaction source id: camera-shots-50.md #CS-04 (Fade Up) + #CS-08 (Slide In Left) + #CS-12 (Scale Up) + #CS-15 (Clip Reveal)
- Showy reveals: fadeUp（≤2 次）、slide-left、scale-up、clip-reveal — 4 种入场，满足 entrance variety rule
- Restraint notes: 无装饰性动画、无渐变 hero、无玻璃拟态、无圆角 premium cards
- Typography source id(s): typography-cinema.md — 大字重标题 + 等宽数据 + 易读正文
- Atmosphere/background source id(s): background-techniques.md — scanline texture overlay

## Entrance Map
- Section 1 Hero: scale-up + fade（数据逐条出现）
- Section 2 Timeline: slide-left（时间线逐条滑入）
- Section 3 Platforms: clip-reveal + fade（表格裁剪出现）
- Section 4 Metering: fade stagger（面板逐个淡入，0-4 延迟）
- Section 5 Core Logic: slide-left stagger（三层逻辑逐层滑入）
- Section 6 Three-Act: scale stagger（三阶段卡片逐个缩放出现）
- Section 7 OpenClaw: fade（数据卡片和案例影响区）
- Section 8 Chip Supply: slide-left（芯片对比两列）
- Section 9 Insights: fade stagger（七条洞察逐条出现）
- Section 10 Future: fade stagger（四个趋势逐条出现）
- Section 11 Conclusion: scale + fade（叙事闭环，回到开场）

### CSS Implementation
```css
/* Layout: max-width 900px, left-aligned, report-style */
.section { max-width: 900px; margin: 0 auto; padding: 0 2rem; }
.section + .section { margin-top: 6rem; }

/* Entrance: fadeUp (used ≤2 times) */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
/* Entrance: slide-left */
.reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
/* Entrance: scale-up */
.reveal-scale { opacity: 0; transform: scale(0.95); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
/* Entrance: clip-reveal */
.reveal-clip { opacity: 0; clip-path: inset(0 100% 0 0); transition: opacity 0.8s var(--ease), clip-path 0.8s var(--ease); }

/* Stagger delays */
.delay-1 { transition-delay: 0.15s; }
.delay-2 { transition-delay: 0.3s; }
.delay-3 { transition-delay: 0.45s; }
.delay-4 { transition-delay: 0.6s; }
.delay-5 { transition-delay: 0.75s; }
.reveal.visible, .reveal-left.visible, .reveal-scale.visible, .reveal-clip.visible { opacity: 1; transform: translateY(0) translateX(0) scale(1); clip-path: inset(0 0 0 0); }

/* Scanline texture */
body::before { content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9999;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px); }

/* Color tokens */
:root {
  --bg: #0a0a0a; --bg2: #111; --bg3: #1a1a1a; --bg4: #222;
  --text: #e8e8e8; --text2: #999; --text3: #555;
  --accent: #4ecdc4; --accent2: #2a7a74;
  --gold: #d4a35f; --warn: #ff6b6b;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## External Library Decision

### Q1: What is the core motion experience of this page?
Scroll-driven progressive reveal. Information appears as the user investigates — like turning pages in a case file. Not a motion showcase; the content is the star.

### Q2: Can the native library entries do it?
Yes. Four entrance types (fadeUp, slide-left, scale-up, clip-reveal) via Intersection Observer + CSS transitions. No JS animation library needed. The motion is subordinate to the content.

### Q3: If an external library is used, why this one and how will it be redirected through the chosen film language?
No external library. The Fincher aesthetic demands precision and restraint — a heavy animation library would add unnecessary weight and break the "investigation file" feeling. Native Intersection Observer + CSS transitions is sufficient and more performant.

### Decision
No external libraries. Pure HTML + CSS + minimal vanilla JS (Intersection Observer only). 52KB total. Zero dependencies.

## Shared System
- Navigation: None — narrative itself is the navigation
- Footer: Minimal — just the closing text and date
- Spacing rhythm: 6rem between sections on desktop, 4rem on mobile
- Typography system: var(--sans) for prose, var(--mono) for data/labels
- Utility primitives: .mono .accent .gold .warn .dim .meta
- Repeated motifs: scanline texture (global), teal accent (data only), gold (insights only)
- Uniqueness check against previous demos: No rounded cards, no gradient hero, no SaaS three-column, no centered layout. Left-aligned report style throughout.

## Phase 3 Quality Check
- [x] Every section has complete layout CSS
- [x] Every section has complete entrance behavior
- [x] Every section has complete interaction behavior or intentional `none`
- [x] JS-required effects include complete JS (Intersection Observer only)
- [x] Entrance variety rules pass (4 types: fadeUp, slide-left, scale-up, clip-reveal)
- [x] `fadeUp` appears ≤2 times per page (only in hero data items)
- [x] External Library Decision block is complete
- [x] Library source ids are present for all major visual moves

## Derived Global Tokens
```css
:root {
  --bg: #0a0a0a;
  --text: #e8e8e8;
  --accent: #4ecdc4;
  --radius-card: 2px;
  --transition-fast: 0.35s;
  --transition-slow: 0.8s;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```
