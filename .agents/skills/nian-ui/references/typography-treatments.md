# Typography Treatments — nian-safe 文字处理技法

> 从 cinematic-ui 筛选的 nian-safe 文字技法，遵循 nian P0 红线（无 blur/shadow/gradient/emoji）。按 4 个分类组织，约 25 种。

---

## Category 1: 文字即建筑（Text as Architecture）

> 只用 font-size / font-weight / line-height / letter-spacing / text-align，纯排版力。

### 1.1 Full-Width Display（满版大字）
```css
.type-fullwidth {
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.04em;
  width: 100%;
}
```
适合 nian — Hero 段落、大胆品牌声明

### 1.3 Stacked Letters（堆叠字）
```css
.type-stacked {
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.75;
  letter-spacing: -0.06em;
  font-weight: 900;
}
```
适合 nian — 2-4 行标题，形成文字墙

### 1.4 Monumental（纪念碑式）
```css
.type-monument {
  font-size: clamp(5rem, 18vw, 15rem);
  font-weight: 100;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}
```
适合 nian — 奢侈感、空间感、留白即信息

### 1.5 Split Headline（断行标题）
```css
.type-split-headline {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.0;
}
.type-split-headline .line-accent {
  font-style: italic;
  font-weight: 300;
  display: block;
}
```
适合 nian — 标题中一行粗一行细形成对比

### 1.6 Oversized Single Word（巨型单字）
```css
.type-giant-word {
  font-size: clamp(6rem, 25vw, 20rem);
  font-weight: 900;
  line-height: 0.75;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}
```
适合 nian — 单字冲击、品牌名、章节标记

### 1.7 Justified Block（齐行文字块）
```css
.type-justified-block {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  text-align: justify;
  text-justify: inter-word;
  max-width: 900px;
  line-height: 1.1;
  hyphens: auto;
}
```
适合 nian — 多行标题需要排版块的感觉

### 1.8 Stepped Text（阶梯排列）
```css
.type-stepped {
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 800;
  line-height: 1.0;
}
.type-stepped .line:nth-child(1) { padding-left: 0; }
.type-stepped .line:nth-child(2) { padding-left: 8vw; }
.type-stepped .line:nth-child(3) { padding-left: 16vw; }
```
适合 nian — 三行标题需要斜向动势

### 1.10 Compressed Ultra-Wide（压缩超宽）
```css
.type-compressed {
  font-size: clamp(4rem, 14vw, 11rem);
  font-weight: 900;
  font-stretch: ultra-condensed;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 0.85;
}
```
适合 nian — 长单词需要大字但空间有限

### 1.11 Mixed Weight Headline（混合字重）
```css
.type-mixed-weight {
  font-size: clamp(3rem, 9vw, 7rem);
  line-height: 0.95;
}
.type-mixed-weight .thin { font-weight: 100; }
.type-mixed-weight .bold { font-weight: 900; }
```
适合 nian — 短语中通过字重对比突出一个词

### 1.12 Indented Quote Block（缩排引言）
```css
.type-indent-quote {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.3;
  margin-left: 15vw;
  max-width: 60vw;
  border-left: 3px solid currentColor;
  padding-left: 2rem;
}
```
适合 nian — 证言、拉引、题词

### 1.13 Flush-Right Headline（右齐标题）
```css
.type-flush-right {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  text-align: right;
  line-height: 0.9;
  padding-right: 5vw;
}
```
适合 nian — 次 Hero 文本、结尾段落、右对齐布局

### 1.15 Alternating Size Lines（交替大小行）
```css
.type-alt-size { line-height: 1.0; }
.type-alt-size .large {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  display: block;
}
.type-alt-size .small {
  font-size: clamp(0.8rem, 1.5vw, 1.2rem);
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  display: block;
}
```
适合 nian — Hero 段落：标题+副标题+描述堆叠

---

## Category 2: 文字特效（Text Effects）

> 只用 transform / opacity / clip-path / text-stroke / SVG path / scaleX / letter-spacing。

### 3.2 Text Reveal on Scroll（滚动揭示文字）
```css
.type-reveal {
  font-size: 6vw;
  font-weight: 700;
  overflow: hidden;
}
.type-reveal span {
  display: inline-block;
  transform: translateY(100%);
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-reveal.visible span { transform: translateY(0); }
.type-reveal span:nth-child(2) { transition-delay: 0.1s; }
.type-reveal span:nth-child(3) { transition-delay: 0.2s; }
```
适合 nian — 滚动触发的标题、段落揭示。纯 translateY。

### 3.6 Outline Text（描边空心字）
```css
.type-outline {
  font-size: 12vw;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 2px currentColor;
}
.type-outline:hover {
  color: currentColor;
  -webkit-text-stroke: 0;
  transition: all 0.5s ease;
}
```
适合 nian — hover 状态、次级标题、幽灵文字。text-stroke。

### 3.16 Hand-Drawn Underline（手绘底线动画）
```css
.type-hand-underline { position: relative; display: inline; }
.type-hand-underline::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 100%; height: 8px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 8'%3E%3Cpath d='M0,5 Q40,0 80,5 T160,5 T200,5' stroke='%23ff6b35' stroke-width='3' fill='none'/%3E%3C/svg%3E") repeat-x;
  background-size: 200px 8px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-hand-underline.visible::after { transform: scaleX(1); }
```
适合 nian — 强调、编辑亮点、温暖/人性化品牌。SVG path + scaleX。

### 3.18 Strikethrough Reveal（删除线揭示）
```css
.type-strike-reveal { position: relative; display: inline-block; }
.type-strike-reveal::after {
  content: '';
  position: absolute;
  top: 50%; left: -2%;
  width: 104%; height: 3px;
  background: currentColor;
  transform: scaleX(1);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-strike-reveal.revealed::after {
  transform: scaleX(0);
  transform-origin: right;
}
```
适合 nian — 定价（旧价划掉）、前后对比。纯 scaleX。

### 3.19 Letter Spacing Expansion（字距扩张动画）
```css
.type-spacing-expand {
  font-size: clamp(1rem, 3vw, 2rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  transition: letter-spacing 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-spacing-expand.visible { letter-spacing: 0.5em; }
```
适合 nian — 戏剧性揭示、奢侈品牌、空间主题。纯 letter-spacing。

### 3.21 Text Clip Path Reveal（文字裁切揭示）
```css
.type-clip-reveal {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-clip-reveal.visible { clip-path: inset(0 0% 0 0); }
```
适合 nian — 方向性揭示、段落引言。纯 clip-path。

### 3.23 Text Rotation Entrance（文字旋转进场）
```css
.type-rotate-in {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  opacity: 0;
  transform: rotateX(90deg);
  transform-origin: bottom center;
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.type-rotate-in.visible { opacity: 1; transform: rotateX(0deg); }
```
适合 nian — 单行标题、戏剧性段落过渡。rotateX + opacity。

### 3.25 CSS Counter Animation（CSS 计数器动画）
```css
.type-counter {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}
```
```js
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```
适合 nian — 数据展示、仪表盘 Hero、成就数字

### 3.8 Split Color Text（分裂色彩）
```css
.type-split {
  font-size: 10vw;
  font-weight: 900;
  position: relative;
  color: var(--accent);
}
.type-split::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  color: var(--accent-alt);
  clip-path: inset(0 50% 0 0);
}
```
适合 nian — 艺术指导、创意作品集。clip-path + 双色。

---

## Category 3: 文字作为装饰（Text as Decoration）

> 筛掉了 blur/shadow/gradient 的装饰用法，保留纯排版装饰。

### 4.1 Watermark Text（浮水印大字）
```css
.type-watermark {
  font-size: 25vw;
  font-weight: 900;
  opacity: 0.03;
  position: absolute;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}
```
适合 nian — 背景氛围、段落编号、品牌强化

### 4.3 Vertical Text（直排文字）
```css
.type-vertical {
  writing-mode: vertical-rl;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0.3;
}
```
适合 nian — 侧标签、装饰边框、段落指示

### 4.4 Rotated Label（旋转标签）
```css
.type-rotated {
  transform: rotate(-90deg);
  transform-origin: left center;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  position: absolute;
  left: 20px;
}
```
适合 nian — 段落标签、侧栏注释、元数据

### 4.5 Repeating Background Text（重复背景文字）
```css
.type-repeat-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}
.type-repeat-bg span {
  display: block;
  font-size: 5vw;
  font-weight: 900;
  opacity: 0.02;
  white-space: nowrap;
  line-height: 1.1;
}
.type-repeat-bg span:nth-child(even) {
  transform: translateX(-20%);
}
```
适合 nian — 背景纹理、品牌饱和、编辑段落

### 4.7 Outlined Background Numbers（描边背景数字）
```css
.type-bg-number {
  font-size: 30vw;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.05);
  position: absolute;
  right: -5vw;
  top: -5vw;
  pointer-events: none;
  user-select: none;
  line-height: 0.8;
}
```
适合 nian — 段落编号、功能网格、步骤指示

### 4.10 Bracket-Framed Text（括号框架文字）
```css
.type-bracketed {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.4;
}
.type-bracketed::before { content: '['; font-size: 1.2em; }
.type-bracketed::after { content: ']'; font-size: 1.2em; }
```
适合 nian — 标签、元数据、装饰性类别标签

---

## Category 4: 功能性排版（Functional Typography）

> 安静但精确的排版，覆盖页面 60% 的文字需求。

### 6.2 Small Caps Labels（小型大写标签）
```css
.type-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.45;
  font-variant: small-caps;
}
```
适合 nian — 表单标签、段首眉标、元数据、类别标签

### 6.8 Balanced Subheading（平衡副标题）
```css
.type-subhead {
  font-size: clamp(1.1rem, 1.5vw, 1.35rem);
  font-weight: 500;
  line-height: 1.5;
  opacity: 0.6;
  max-width: 55ch;
  text-wrap: balance;
}
```
适合 nian — Hero 标题下方、段落引言、功能描述

### 6.11 Muted Overline（淡化眉标）
```css
.type-overline {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.3;
  margin-bottom: 0.75rem;
}
```
适合 nian — 标题上方添加类别/上下文

### 6.14 Tag / Chip Text（标签文字）
```css
.type-tag {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.5;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 100px;
  padding: 0.3em 0.8em;
  display: inline-block;
}
```
适合 nian — 博客标签、功能徽章、筛选芯片

---

## 使用规则

1. **每个 Hero 段落**至少使用 Category 1 中的一种技法
2. **Category 2 的特效**每页最多 2-3 处
3. **Category 3 的装饰**可重复使用作为氛围元素
4. **Category 4** 是骨架，应覆盖任何页面 60% 的文字
5. **相邻段落**不应使用相同的文字技法
6. 判断标准：「这段文字是被读的还是被看的？」读 = Category 4，看 = Category 1-3
