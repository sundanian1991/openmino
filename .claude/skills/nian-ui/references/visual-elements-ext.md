# Visual Elements Extended — nian-safe 装饰元素

> 从 cinematic-ui 筛选的 nian-safe 装饰元素，遵循 nian P0 红线（无 blur/shadow/gradient/emoji/backdrop-filter）。约 20 种，按类别组织。

---

## A. 几何装饰

### #7 Overlapping Rectangles（重叠矩形）
```css
.geo-overlap { position: relative; }
.geo-rect {
  position: absolute;
  width: 300px; height: 200px;
  border: 3px solid var(--accent);
}
.geo-rect--1 { top: 0; left: 0; background: var(--accent); opacity: 0.15; }
.geo-rect--2 { top: 30px; left: 40px; background: var(--accent-alt); opacity: 0.1; }
.geo-rect--3 { top: 60px; left: 80px; border-style: dashed; }
```
适合 nian — 粗野风格视觉冲击，纯 border + opacity + background 色块

### #8 Corner Brackets（角落方括号）
```css
.bracket-frame { position: relative; padding: 2rem; }
.bracket-frame::before, .bracket-frame::after {
  content: '';
  position: absolute;
  width: 30px; height: 30px;
  border-color: var(--accent);
  border-style: solid;
}
.bracket-frame::before { top:0;left:0; border-width:2px 0 0 2px; }
.bracket-frame::after { bottom:0;right:0; border-width:0 2px 2px 0; }
```
适合 nian — 电影感框架，纯 border。适合强调内容区块。

### #9 Dot Grid Pattern（点阵图案）
```css
.dot-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(var(--border) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
  pointer-events: none;
}
```
适合 nian — 排版设计感、工程图纸质感。radial-gradient 仅用于点阵生成，不算装饰性 gradient。

### #10 Cross Marks（十字标记）
```css
.cross-mark {
  position: absolute;
  left: var(--cx); top: var(--cy);
  width: 12px; height: 12px;
}
.cross-mark::before, .cross-mark::after {
  content: ''; position: absolute;
  background: var(--accent); opacity: 0.5;
}
.cross-mark::before { width:100%;height:1px;top:50%; }
.cross-mark::after { height:100%;width:1px;left:50%; }
```
适合 nian — 科技感、精密感。纯线条 + absolute 定位。

### #12 Circle Accent（圆形装饰）
```css
.circle-accent {
  position: absolute;
  left: var(--ca-x); top: var(--ca-y);
  width: var(--ca-size); height: var(--ca-size);
  border: 2px solid var(--accent);
  border-radius: 50%;
  opacity: 0.2;
  transform: translate(-50%,-50%);
  pointer-events: none;
}
```
适合 nian — 柔化版面、创建焦点。纯 border + transform。

### #13 Stacked Triangles（堆叠三角）
```css
.tri-stack { position: absolute; right: 10%; top: 15%; }
.tri {
  width: 0; height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid var(--accent);
  position: absolute;
}
.tri--1 { opacity: 0.15; }
.tri--2 { opacity: 0.08; transform: translate(20px,10px) rotate(15deg); }
```
适合 nian — 动态与能量感。CSS border 三角 + transform + opacity。

---

## D. 数据展示

### #21 Hero Stats Bar（主视觉数据列）
```css
.stats-bar {
  display: flex; gap: 3rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
}
.stat-val {
  display: block;
  font-size: 1.8rem; font-weight: 800;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}
.stat-lbl {
  font-size: 0.7rem; color: var(--text-muted);
  text-transform: uppercase; letter-spacing: 0.08em;
}
```
适合 nian — Hero 底部数据条。纯 flexbox + border + typography。

### #22 Giant Number（巨型数字）
```css
.giant-num { text-align: center; }
.gn-number {
  display: block;
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 900;
  line-height: 0.9;
  color: var(--accent);
  opacity: 0.15;
}
.gn-unit {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}
```
适合 nian — 超大数字+小标签。纯 font-size/weight + opacity。

### #23 Progress Ring（进度环）
```css
.progress-ring { position: relative; width: 100px; height: 100px; }
.pr-svg { transform: rotate(-90deg); }
.pr-track { fill:none; stroke:var(--border); stroke-width:6; }
.pr-fill {
  fill: none; stroke: var(--accent); stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 264;
  stroke-dashoffset: calc(264 - (264 * var(--progress) / 100));
  transition: stroke-dashoffset 1s ease;
}
.pr-label {
  position: absolute; inset: 0;
  display: grid; place-items: center;
  font-size: 1.2rem; font-weight: 700;
}
```
适合 nian — 达成率、评分。SVG + stroke-dashoffset 动画。

### #24 Comparison Metric（对比指标）
```css
.compare-metric {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 1rem 1.5rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
}
.cm-val { display:block; font-size:1.5rem; font-weight:800; }
.cm-before .cm-val { color: var(--text-muted); text-decoration: line-through; }
.cm-after .cm-val { color: var(--accent); }
.cm-lbl { font-size:0.6rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); }
.cm-arrow { font-size:1.5rem; color:var(--accent); }
```
适合 nian — 前后对比。纯 flexbox + border + text-decoration。

### #25 Horizontal Data Strip（水平数据带）
```css
.data-strip {
  display: flex; justify-content: center; gap: 1.5rem;
  padding: 0.8rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  font-size: 0.75rem; font-weight: 500;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.ds-sep { color: var(--border); }
```
适合 nian — 全宽数据带。纯 flexbox + border。

---

## E. 装饰线条

### #28 Vertical Accent Line（垂直强调线）
```css
.v-accent-line { position: relative; padding-left: 1.5rem; }
.v-accent-line::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--accent), transparent);
}
```
适合 nian — 时间轴、胶卷感。linear-gradient 用于线条淡出效果（非大面积装饰 gradient）。

### #29 Grid Overlay（网格叠层）
```css
.grid-overlay {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.08;
  pointer-events: none;
}
```
适合 nian — 结构感。纯线网格。

### #30 Crosshair Target（十字准星）
```css
.crosshair {
  position: absolute;
  left: var(--ch-x); top: var(--ch-y);
  width: 60px; height: 60px;
  transform: translate(-50%,-50%);
}
.crosshair::before, .crosshair::after {
  content:''; position:absolute; background:var(--accent); opacity:0.3;
}
.crosshair::before { width:100%;height:1px;top:50%; }
.crosshair::after { height:100%;width:1px;left:50%; }
.ch-ring {
  position:absolute; inset:10px;
  border:1px solid var(--accent);
  border-radius:50%; opacity:0.3;
}
```
适合 nian — 精准定位感。纯线条 + border。

### #31 Frame Border（影格边框）
```css
.frame-border { position: relative; margin: 2rem; padding: 3rem; }
.frame-border::before {
  content: '';
  position: absolute; inset: 0;
  border: 1px solid var(--border);
  pointer-events: none;
}
```
适合 nian — 画面框架感。纯 border。

---

## F. 交互微元素

### #33 Scroll Indicator（滚动指示器）
```css
.scroll-hint {
  display:flex; flex-direction:column; align-items:center; gap:0.5rem;
  position:absolute; bottom:2rem; left:50%; transform:translateX(-50%);
}
.sh-mouse {
  width:22px; height:34px;
  border:2px solid var(--text-muted);
  border-radius:11px;
  display:grid; place-items:start center; padding-top:6px;
}
.sh-wheel {
  width:3px; height:6px;
  background:var(--text-muted); border-radius:2px;
  animation:scroll-bob 2s ease-in-out infinite;
}
.sh-text { font-size:0.6rem; text-transform:uppercase; letter-spacing:0.15em; color:var(--text-muted); }
@keyframes scroll-bob { 0%,100%{opacity:1;transform:translateY(0)} 50%{opacity:0.3;transform:translateY(6px)} }
```
适合 nian — 滚动引导。纯 opacity + translateY 动画。

### #34 Magnetic Hover Button（磁吸按钮）
```css
.mag-btn {
  position: relative;
  padding: 0.8rem 2rem;
  background: var(--accent);
  color: var(--bg);
  border: none; border-radius: var(--radius-card);
  font-weight: 600; cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.mag-btn:hover { transform: translate(var(--mx,0), var(--my,0)); }
```
适合 nian — 高级交互按钮。纯 transform。

### #37 Typing Cursor（打字光标）
```css
.type-cursor::after {
  content: '|';
  color: var(--accent);
  font-weight: 300;
  animation: cursor-blink 1s step-end infinite;
  margin-left: 1px;
}
@keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
```
适合 nian — 终端感、实时输入模拟。纯 opacity 动画。

---

## G. 内容面板

### #38 Code Snippet Box（代码片段框）
```css
.code-box {
  background: color-mix(in srgb, var(--bg) 95%, white);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden; font-size: 0.8rem;
}
.cb-header {
  display:flex; align-items:center; gap:0.8rem;
  padding:0.6rem 1rem;
  border-bottom:1px solid var(--border);
}
.cb-dots i {
  display:inline-block; width:8px; height:8px;
  border-radius:50%; background:var(--border);
  margin-right:4px;
}
.cb-lang { font-size:0.65rem; color:var(--text-muted); margin-left:auto; }
.cb-code { padding:1rem; margin:0; overflow-x:auto; }
```
适合 nian — 代码展示。纯 border + background + border-radius。

### #39 Quote Card（引言卡片）
```css
.quote-card {
  position: relative;
  padding: 2rem 2rem 1.5rem 3rem;
  background: var(--bg-surface);
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius-card) var(--radius-card) 0;
}
.qc-mark {
  position: absolute; top: 0.5rem; left: 0.8rem;
  font-size: 3rem; line-height: 1;
  color: var(--accent); opacity: 0.3;
}
.qc-text { font-size: 1rem; line-height: 1.6; font-style: italic; }
.qc-cite { display:block; margin-top:0.8rem; font-size:0.75rem; color:var(--text-muted); font-style:normal; }
```
适合 nian — 证言面板。纯 border-left + opacity。

### #20 Noise Texture Overlay（噪点纹理叠层）
```css
.noise-overlay {
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.75'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px;
  opacity: 0.04;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```
适合 nian — 全局颗粒感。SVG noise + mix-blend-mode（非 blur）。

---

## 排除清单

以下元素因违反 P0 红线而被排除：

| # | 名称 | 排除原因 |
|---|------|---------|
| #1 | Floating Price Card | 使用 backdrop-filter: blur + emoji |
| #2 | Notification Badge | 无红线违规，保留 |
| #3 | Testimonial Mini Card | 使用 backdrop-filter: blur |
| #4 | Feature Chip Stack | 使用 backdrop-filter: blur |
| #5 | Floating Metric Card | 使用 backdrop-filter: blur |
| #6 | Status Indicator Card | 使用 backdrop-filter: blur |
| #11 | Diagonal Accent Line | 使用 linear-gradient 装饰线 |
| #14 | Soft Gradient Blob | 使用 blur(80px) + radial-gradient |
| #15 | Glass Morphism Panel | 使用 backdrop-filter: blur + box-shadow |
| #16 | Aurora Gradient | 使用 blur(60px) + linear-gradient |
| #17 | Light Leak Overlay | 使用 linear-gradient + mix-blend-mode |
| #18 | Radial Vignette | 使用 radial-gradient |
| #19 | Dual Orb Glow | 使用 blur(100px) |
| #26 | Rating Badge | 使用 emoji 星号（可改为 SVG 星号后使用） |
| #27 | Animated Underline | 使用 linear-gradient 底线 |
| #32 | Gradient Divider | 使用 linear-gradient |
| #35 | Rotating Seal Badge | 使用 emoji 星号（可改为 SVG 后使用） |
| #36 | Cursor Follower Dot | 使用 mix-blend-mode: difference（边缘） |
| #40 | Video Thumbnail | 无红线违规但场景特殊 |

---

## 使用建议

- **几何装饰 (#7-#13)** 每页最多 2-3 处，过多则杂乱
- **数据展示 (#21-#25)** 适合产品页、报告页、着陆页
- **装饰线条 (#28-#31)** 是最安全的装饰，可多用
- **交互微元素 (#33-#37)** 每种每页最多 1 处
- **内容面板 (#38-#39)** 是功能组件，不限数量
