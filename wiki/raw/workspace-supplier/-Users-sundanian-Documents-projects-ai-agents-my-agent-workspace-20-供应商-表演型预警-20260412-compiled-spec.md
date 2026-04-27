# Compiled Spec

## Page: 带节奏识别
- Page scene thesis: 一条调查走廊，五个证据依次亮起，最终给出行动框架
- Signature composition: 左侧时间线 + 五个信号证据沿垂直线排列，每个内部布局不同
- Signature composition source id: Custom — 时间线+证据卡片组合，Fincher 调查感
- Why this cannot collapse into a default grid: 时间线强制了顺序和层级关系，每个信号权重不同
- One big idea: 从模糊不安到清晰证据链
- Heavy interaction: 信号卡片 hover 时引用框左边框从暗金变红
- Heavy interaction source id: Custom
- Showy reveals: 标题 scale-in，时间线逐点亮起
- Showy reveal source id(s): Custom
- Restraint notes: 不做渐变、不做玻璃、不做圆角、不做 emoji、不做多余动画
- Typography source id(s): 自定义 — 标题粗黑/正文细体/引用等宽感
- Atmosphere/background source id(s): grain texture + deep dark

## Entrance Map
- Scene 1 (Hero): scale-in + fade-from-black
- Scene 2 (Signal 1-2): slide-down along timeline
- Scene 3 (Signal 3-4): clip-wipe-left
- Scene 4 (Signal 5): fade-from-black + scale-emphasis
- Scene 5 (Contrast): curtain-reveal (从中间向两侧)
- Scene 6 (REACT): staggered left-to-right

## External Library Decision

### Q1: What is the core motion experience of this page?
- Scroll-driven narrative reveal with IntersectionObserver

### Q2: Can the native library entries do it?
- Yes, native CSS animations + IntersectionObserver JS

### Q3: If an external library is used, why this one and how will it be re-directed through the chosen film language?
- N/A — no external library needed

### Decision
- External libraries: none, native effects only

## Shared System
- Navigation: none — right side fixed progress dots (5 dots)
- Footer: minimal — source attribution
- Spacing rhythm: 120px between major sections, 80px between signals
- Typography system:
  - Display: 'Noto Serif SC', serif — 48px+ 标题
  - Body: 'Noto Sans SC', sans-serif — 16px 正文
  - Mono: 'Source Code Pro', monospace — 引用/话术
- Utility primitives: CSS custom properties
- Repeated motifs allowed only after page compositions are locked: 信号编号圆形徽章
- Uniqueness check against previous demos: N/A — first output

## Phase 3 Quality Check
- [x] Every section has complete layout CSS
- [x] Every section has complete entrance behavior
- [x] Every section has complete interaction behavior or intentional none
- [x] JS-required effects include complete JS (IntersectionObserver for scroll reveals)
- [x] Entrance variety rules pass (5 different entrance types)
- [x] fadeUp appears at most 2 times on the page
- [x] External Library Decision block is complete
- [x] Library source ids are present for all major visual moves

## Derived Global Tokens
```css
:root {
  --bg: #0d0d0d;
  --bg-elevated: #1a1a1a;
  --bg-card: #141414;
  --text: #e8e4dd;
  --text-muted: #6b6560;
  --text-sub: #a09a94;
  --accent: #d4382c;
  --accent-soft: #c8a96e;
  --line: #2a2825;
  --line-hover: #d4382c;
  --radius: 0;
  --transition: 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  --max-width: 900px;
}
```
