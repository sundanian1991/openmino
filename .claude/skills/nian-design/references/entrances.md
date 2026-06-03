# Entrances & Transitions — nian-safe 入场效果

> 从 cinematic-ui 筛选的 nian-safe 入场/过渡效果，遵循 nian P0 红线（无 blur/shadow/gradient/emoji）。只用 transform + opacity + clip-path。约 15 种。

---

## Entrances（入场）

### #2 Fade from Black（黑色淡入）
```css
opacity: 0;
transition: opacity 2s ease;
&.visible { opacity: 1; }
```
适合 nian — 章节开场、哲学/慢节奏段落。纯 opacity，最安全。

### #3 Dolly-In（推进）
```css
transform: scale(0.85) translateZ(-50px);
opacity: 0;
transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
&.visible { transform: scale(1) translateZ(0); opacity: 1; }
```
适合 nian — Hero 区域、产品揭示。scale + translateZ。

### #4 Crane Down（摇臂下降）
```css
transform: translateY(-100vh);
transition: transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
&.visible { transform: translateY(0); }
```
适合 nian — 页头、建立镜头。纯 translateY。

### #5 Whip Pan（横扫入场）
```css
transform: translateX(-120%);
transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
&.visible { transform: translateX(0); }
```
适合 nian — 行动段落、CTA 横幅。纯 translateX。

### #7 Split Diopter Open（分屏展开）
```css
.left { clip-path: inset(0 50% 0 0); }
.right { clip-path: inset(0 0 0 50%); }
&.visible .left, &.visible .right {
  clip-path: inset(0);
  transition: clip-path 1.2s ease;
}
```
适合 nian — 对比区域、双栏揭示。纯 clip-path。

### #8 Tilt Up Reveal（仰拍揭示）
```css
transform: perspective(800px) rotateX(5deg) translateY(60px);
opacity: 0;
transition: all 1.4s ease;
&.visible { transform: perspective(800px) rotateX(0) translateY(0); opacity: 1; }
```
适合 nian — 功能列表、滚动内容。rotateX + translateY + opacity。

### #10 Curtain Wipe（幕帘擦拭）
```css
clip-path: inset(0 100% 0 0);
transition: clip-path 1s ease-in-out;
&.visible { clip-path: inset(0 0% 0 0); }
```
适合 nian — 新章节、叙事过渡。纯 clip-path。

### #12 Steadicam Float-In（稳定器浮入）
```css
transform: translateZ(-100px) translateY(30px);
opacity: 0;
transition: all 2s cubic-bezier(0.25, 0.1, 0.25, 1);
&.visible { transform: translateZ(0) translateY(0); opacity: 1; }
```
适合 nian — 长篇内容、沉浸区域。translateZ + translateY + opacity。

### #14 Worm's Eye Rise（仰视升起）
```css
transform: translateY(80px) perspective(600px) rotateX(-10deg);
opacity: 0;
transition: all 1.2s ease-out;
&.visible { transform: translateY(0) perspective(600px) rotateX(0); opacity: 1; }
```
适合 nian — 证言区域、权威段落。translateY + rotateX + opacity。

### #18 Snap Zoom In（快推缩放）
```css
transform: scale(0.1);
opacity: 0;
transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
&.visible { transform: scale(1); opacity: 1; }
```
适合 nian — 惊喜元素、弹出层。纯 scale + opacity。

---

## Staggered（交错入场）

### #20 Jump Cut Stagger（跳切交错）
```css
.child {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}
.child:nth-child(1) { transition-delay: 0s; }
.child:nth-child(2) { transition-delay: 0.05s; }
.child:nth-child(3) { transition-delay: 0.1s; }
&.visible .child { opacity: 1; transform: translateY(0); }
```
适合 nian — 卡片网格、列表项、交错画廊。nth-child delay + 纯 opacity/translateY。

### #22 Clock Wipe（时钟擦拭）
```css
clip-path: polygon(50% 50%, 50% 0%, 50% 0%);
transition: clip-path 1.5s ease-in-out;
&.visible { clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%); }
```
适合 nian — 时间线段落、进度指示。纯 clip-path polygon。

### #1 Iris-In（虹膜展开）
```css
clip-path: circle(0% at 50% 50%);
transition: clip-path 1.5s ease-out;
&.visible { clip-path: circle(75% at 50% 50%); }
```
适合 nian — 开场 Hero、戏剧性揭示。纯 clip-path circle。

### #15 Dutch Angle Snap（荷兰角回正）
```css
transform: rotate(-8deg) scale(0.9);
opacity: 0;
transition: all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
&.visible { transform: rotate(0) scale(1); opacity: 1; }
```
适合 nian — 破局段落、前卫内容。rotate + scale + opacity。

---

## Transitions（过渡）

### #19 Match Cut Dissolve（匹配切割溶解）
```css
.section-a {
  transition: opacity 0.8s, transform 0.8s;
}
.section-a.exiting { opacity: 0; transform: scale(0.95); }
.section-b {
  opacity: 0;
  transform: scale(1.05);
  transition: all 0.8s 0.4s;
}
.section-b.entering { opacity: 1; transform: scale(1); }
```
适合 nian — 主题相关内容之间的过渡。scale + opacity。

### #27 Wipe Diagonal（对角擦拭）
```css
clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
transition: clip-path 1s ease;
&.visible { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
```
适合 nian — 章节过渡、冒险/行动叙事。纯 clip-path。

### #23 Morph Cut — Scale Only（变形切割 — 仅缩放部分）
```css
.morph-from {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}
.morph-from.morphing {
  border-radius: 50%;
  transform: scale(0.5);
}
.morph-to {
  border-radius: 50%;
  transform: scale(0.5);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
}
.morph-to.morphed {
  border-radius: 0;
  transform: scale(1);
}
```
适合 nian — 个人资料到详情的过渡、卡片展开。scale + border-radius。

---

## 使用建议

- **每页入场效果不超过 2-3 种**，否则沦为游乐场
- **交错入场 (#20)** 是最通用的，可用于几乎所有列表/卡片场景
- **clip-path 类 (#7, #10, #27)** 视觉冲击强，留给关键转折点
- **纯 opacity (#2)** 最安全，适合需要快速加载的段落
- 所有效果均基于 `transform` + `opacity` + `clip-path`，GPU 加速，不影响布局性能
