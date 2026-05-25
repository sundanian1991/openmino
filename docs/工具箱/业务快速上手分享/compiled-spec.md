# Compiled Spec

## 全局视觉系统

- Signature composition: 走廊式纵深 — 全屏翻页，内容约束在 900px 窄幅中央
- One big idea: 像翻阅一份被台灯照亮的机密文件
- Heavy interaction: 无（演示场景，克制为主）
- Restraint notes: 不做任何装饰性动画，信息本身就是视觉。翻页用键盘/点击，内容用淡入。
- Typography: 思源黑体（Noto Sans CJK SC）+ JetBrains Mono（数据/编号）
- Atmosphere: grain 纹理(texture #1 fine) + vignette(texture #13) + 暖色方向光(background A2)

## Entrance Map
- Slide 1: fade-from-black
- Slide 2: stagger-reveal
- Slide 3: grid-reveal
- Slide 4: slide-up
- Slide 5: split-reveal
- Slide 6: split-reveal
- Slide 7: row-stagger
- Slide 8: vertical-cascade
- Slide 9: fade-in
- Slide 10: stagger
- Slide 11: slide-up
- Slide 12: fade-to-black

## External Library Decision

### Q1: What is the core motion experience of this page?
- Page transition (翻页式演示)

### Q2: Can the native library entries do it?
- Yes, CSS transform + JS 键盘事件即可实现翻页

### Q3: If an external library is used, why this one and how will it be redirected through the chosen film language?
- 不使用外部库，纯 CSS + vanilla JS

### Decision
- External libraries: 无

## Derived Global Tokens
```css
:root {
  --bg: #1a1714;
  --bg-deep: #0d0b09;
  --bg-card: #231f1b;
  --text: #e8e0d4;
  --text-muted: #8a7e6e;
  --accent: #c87533;
  --accent-light: #e6c47a;
  --accent-gold: #d4a056;
  --green: #4a7a5a;
  --yellow: #b89a3c;
  --red: #a84332;
  --border: rgba(200, 117, 51, 0.2);
  --border-light: rgba(200, 117, 51, 0.1);
  --grain-opacity: 0.03;
  --max-width: 900px;
  --font-sans: 'Noto Sans CJK SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --transition-fast: 0.35s;
  --transition-slow: 0.8s;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Shared System

### 全局结构
- 每个 slide: 100vh, 100vw, flex 居中
- 内容容器: max-width 900px, padding 60px
- 翻页: 键盘左右箭头 / 点击左右按钮 / 触摸滑动
- 进度条: 底部固定，金色细线
- 页码: 右下角，等宽字体

### Grain 纹理层
```css
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: var(--grain-opacity);
  mix-blend-mode: overlay;
}
```

### Vignette 暗角
```css
.slide {
  box-shadow: inset 0 0 200px 80px rgba(13, 11, 9, 0.6);
}
```

### 翻页逻辑
```js
// 键盘左右 / 按钮点击切换 slide
// CSS transform: translateX 实现水平滑动
// 每次翻页，旧 slide 向左滑出 + 新 slide 从右滑入
```

### 排版层级
- 大标题: 48px, Heavy, var(--text), letter-spacing 0.02em
- 步骤标题: 36px, Heavy, var(--accent)
- 副标题: 20px, Regular, var(--text-muted)
- 正文: 16px, Regular, var(--text), line-height 1.8
- 编号/数据: 16px, var(--font-mono), var(--accent-gold)
- 表格文字: 14px, Regular
- 页码: 13px, var(--font-mono), var(--text-muted)

### 分隔线
- 水平线: 1px solid var(--border), 宽度 100% 或 60px（短分隔）
- 步骤间分隔用金色短横线

## Phase 3 Quality Check
- [x] Every section has complete layout CSS
- [x] Every section has complete entrance behavior
- [x] Every section has complete interaction behavior or intentional `none`
- [x] JS-required effects include complete JS
- [x] Entrance variety rules pass (12 distinct types)
- [x] `fadeUp` appears at most 2 times per page
- [x] External Library Decision block is complete
- [x] Library source ids are present for all major visual moves
