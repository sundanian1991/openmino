# Extended Layouts — nian-safe 布局库

> 从 cinematic-ui 筛选的 nian-safe 布局，遵循 nian P0 红线（无 blur/shadow/gradient/emoji）。约 30 种布局按 8 族归类。每种保留名称、CSS 代码、适用场景。

---

## 1. 双栏对照

### #2 Bilateral Mirror（对称双栏）
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 4rem;
align-items: center;
```
适合 nian 的双栏对照族 — 对比、前后、versus

### #33 Clean 50/50（干净五五分）
```css
display: grid;
grid-template-columns: 1fr 1fr;
min-height: 80vh;
> * { display: grid; place-items: center; padding: 3rem; }
```
适合 nian 的双栏对照族 — Hero 分屏、产品+描述

### #34 60/40 Editorial（六四编辑式）
```css
display: grid;
grid-template-columns: 3fr 2fr;
gap: 3rem;
align-items: start;
```
适合 nian 的双栏对照族 — 博客+侧栏、新闻+关联

### #36 Diagonal Split（对角分割）
```css
display: grid;
grid-template-columns: 1fr 1fr;
> :first-child { clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); }
> :last-child { clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%); margin-left: -8%; }
```
适合 nian 的双栏对照族 — 对比场景、双主题

### #39 Z-Split Alternating（之字交替）
```css
display: grid;
gap: 4rem;
> .row { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
> .row:nth-child(even) > :first-child { order: 2; }
```
适合 nian 的双栏对照族 — 功能列表、流程步骤

### #77 Shot/Reverse-Shot（交替视角）
```css
display: flex;
flex-direction: column;
gap: 0;
> .shot { display: grid; grid-template-columns: 1fr 1fr; min-height: 50vh; align-items: center; }
> .shot:nth-child(odd) > :first-child { order: 0; }
> .shot:nth-child(even) > :first-child { order: 2; }
```
适合 nian 的双栏对照族 — 对话式对比、功能展示

---

## 2. 方阵排列

### #5 Triptych（三联画）
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 2px;
```
适合 nian 的方阵排列族 — 照片画廊、服务层级、三联证言

### #4 Radial Burst（放射状）
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);
gap: 1.5rem;
> :nth-child(1) { grid-area: 2/2; }
> :nth-child(2) { grid-area: 1/2; }
> :nth-child(3) { grid-area: 2/3; }
> :nth-child(4) { grid-area: 3/2; }
> :nth-child(5) { grid-area: 2/1; }
```
适合 nian 的方阵排列族 — 围绕中心元素的功能展示

### #6 Pyramid Hierarchy（金字塔层级）
```css
display: grid;
gap: 2rem;
> :nth-child(1) { text-align: center; }
> :nth-child(2) { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
> :nth-child(3) { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
```
适合 nian 的方阵排列族 — 组织层级、功能分级

### #40 Corner Split（四象限）
```css
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
gap: 2px;
min-height: 100vh;
> * { display: grid; place-items: center; padding: 2rem; }
```
适合 nian 的方阵排列族 — 仪表盘、四象限价值主张

---

## 3. 不等分网格

### #9 Rule of Thirds — Content Left（左侧三分法）
```css
display: grid;
grid-template-columns: 2fr 1fr;
gap: 4rem;
align-items: center;
```
适合 nian 的不等分网格族 — Hero+侧图、关于页面

### #10 Rule of Thirds — Content Right（右侧三分法）
```css
display: grid;
grid-template-columns: 1fr 2fr;
gap: 4rem;
align-items: center;
```
适合 nian 的不等分网格族 — 功能+插图、叙事段落

### #11 Golden Ratio Split（黄金比例）
```css
display: grid;
grid-template-columns: 1.618fr 1fr;
gap: 3rem;
align-items: start;
```
适合 nian 的不等分网格族 — 博客+侧栏、产品+规格

### #15 Weighted Left Anchor（左重锚定）
```css
display: grid;
grid-template-columns: 55% 1fr;
gap: 2rem;
> :first-child { aspect-ratio: 4/3; }
> :last-child { padding: 2rem 0; }
```
适合 nian 的不等分网格族 — 产品展示、作品详情

### #17 L-Shape Composition（L 型布局）
```css
display: grid;
grid-template-columns: 1fr 2fr;
grid-template-rows: auto auto;
gap: 2rem;
> :first-child { grid-column: 1/-1; }
> :nth-child(2) { grid-column: 2; }
```
适合 nian 的不等分网格族 — 全宽 Hero 后接缩进正文

### #18 T-Shape Composition（T 型布局）
```css
display: grid;
grid-template-columns: 1fr minmax(auto, 640px) 1fr;
> :first-child { grid-column: 1/-1; margin-bottom: 3rem; }
> :nth-child(n+2) { grid-column: 2; }
```
适合 nian 的不等分网格族 — 博客文章、文档布局

### #38 Uneven Triple Split（不等三栏）
```css
display: grid;
grid-template-columns: 1fr 2fr 1fr;
gap: 1.5rem;
align-items: start;
```
适合 nian 的不等分网格族 — 双侧栏文章、居中聚焦

---

## 4. 锚点+列表

### #27 Narrow Column — Reading Width（窄栏阅读宽度）
```css
max-width: 65ch;
margin: 0 auto;
padding: 0 1.5rem;
```
适合 nian 的锚点+列表族 — 长文、文档、博客

### #31 Inset Margin Columns（嵌入宽边栏）
```css
display: grid;
grid-template-columns: 2fr 5fr 2fr;
gap: 2rem;
> :only-child { grid-column: 2; }
```
适合 nian 的锚点+列表族 — 引言、突出段落、旁注

### #32 Progressive Narrowing（渐进收窄）
```css
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;
> :nth-child(1) { width: 100%; }
> :nth-child(2) { width: 85%; }
> :nth-child(3) { width: 70%; }
> :nth-child(4) { width: 55%; }
```
适合 nian 的锚点+列表族 — 漏斗、步骤流程、汇聚叙事

---

## 5. 链式节点

### #59 Horizontal Timeline（水平时间线）
```css
display: flex;
align-items: center;
gap: 0;
overflow-x: auto;
padding: 4rem 2rem;
> * { flex: 0 0 250px; text-align: center; position: relative; padding: 2rem 1rem; }
> *::after { content: ''; position: absolute; top: 50%; left: 100%; width: 100%; height: 2px; background: var(--border); }
```
适合 nian 的链式节点族 — 公司历史、项目时间线、流程

### #13 Dynamic Diagonal — TL to BR（对角渐进）
```css
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 2rem;
> :nth-child(1) { grid-column: 1/7; }
> :nth-child(2) { grid-column: 4/10; margin-top: 2rem; }
> :nth-child(3) { grid-column: 7/13; margin-top: 4rem; }
```
适合 nian 的链式节点族 — 时间线、渐进揭示、步骤流

### #14 Dynamic Diagonal — BL to TR（上升对角）
```css
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 2rem;
> :nth-child(1) { grid-column: 1/7; margin-top: 4rem; }
> :nth-child(2) { grid-column: 4/10; margin-top: 2rem; }
> :nth-child(3) { grid-column: 7/13; }
```
适合 nian 的链式节点族 — 增长叙事、上升动势

---

## 7. 大数字+小标签

### #30 Boxed Island（孤岛容器）
```css
min-height: 60vh;
display: grid;
place-items: center;
> .island { max-width: 400px; padding: 2.5rem; text-align: center; }
```
适合 nian 的大数字+小标签族 — 404 页面、确认屏幕、极简 CTA

### #67 Giant Letter Background（巨型字母背景）
```css
position: relative;
min-height: 60vh;
display: grid;
place-items: center;
> .letter { font-size: clamp(20rem, 40vw, 50rem); position: absolute; opacity: 0.04; font-weight: 900; line-height: 1; pointer-events: none; }
> .content { position: relative; z-index: 1; max-width: 600px; }
```
适合 nian 的大数字+小标签族 — 章节开头、类别标题

---

## 8. 紧凑数据行

### #29 Sidebar + Main Constrained（侧栏+主内容）
```css
display: grid;
grid-template-columns: 240px minmax(0, 65ch);
gap: 3rem;
margin: 0 auto;
max-width: 1000px;
```
适合 nian 的紧凑数据行族 — 文档、设置页、导航仪表盘

### #70 Mixed-Weight Text Composition（混合字重文本）
```css
> p { font-size: clamp(1.5rem, 3vw, 2.5rem); line-height: 1.4; }
> p strong { font-weight: 900; font-size: 1.3em; }
> p em { font-weight: 200; opacity: 0.7; }
```
适合 nian 的紧凑数据行族 — 标语、价值主张、品牌声明

### #72 Quote-Pull Composition（引言拉取布局）
```css
display: grid;
grid-template-columns: 1fr 2fr 1fr;
gap: 2rem;
> .quote { grid-column: 2; font-size: clamp(1.8rem, 3.5vw, 3rem); line-height: 1.3; font-style: italic; text-align: center; padding: 2rem 0; border-top: 2px solid; border-bottom: 2px solid; }
> .before { grid-column: 1/-1; }
> .after { grid-column: 1/-1; }
```
适合 nian 的紧凑数据行族 — 编辑特写、采访亮点

---

## 附加：全出血与粘性布局

### #21 Edge-to-Edge Immersion（全宽沉浸）
```css
width: 100vw;
margin-left: calc(-50vw + 50%);
padding: 0;
overflow: hidden;
```
适合 nian — 全宽图片、地图

### #23 Viewport Fill（视口填充）
```css
width: 100vw;
height: 100vh;
margin-left: calc(-50vw + 50%);
display: grid;
place-items: center;
overflow: hidden;
```
适合 nian — 落地页 Hero、全屏声明

### #42 Background Text with Foreground Content（背景大字+前景内容）
```css
position: relative;
> .bg-text { font-size: clamp(6rem, 15vw, 20rem); opacity: 0.05; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none; }
> .content { position: relative; z-index: 1; }
```
适合 nian — 段落标题、品牌声明

### #43 Sticky Image with Scrolling Text（粘性图+滚动文）
```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 3rem;
> .media { position: sticky; top: 2rem; height: fit-content; }
> .text-scroll { display: flex; flex-direction: column; gap: 4rem; }
```
适合 nian — 产品导览、故事叙述、功能深潜

### #54 Exploded Grid（炸裂网格）
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 3rem;
padding: 2rem;
> :nth-child(1) { transform: translate(-10%, -10%); }
> :nth-child(2) { transform: translateY(-5%); }
> :nth-child(3) { transform: translate(10%, -10%); }
> :nth-child(4) { transform: translate(-10%, 10%); }
> :nth-child(5) { transform: translateY(5%); }
> :nth-child(6) { transform: translate(10%, 10%); }
```
适合 nian — 功能说明、产品生态

### #75 Viewport-Filling Ken Burns（Ken Burns 缓慢缩放）
```css
width: 100vw;
height: 100vh;
margin-left: calc(-50vw + 50%);
overflow: hidden;
> img { width: 100%; height: 100%; object-fit: cover; animation: kenBurns 20s ease-in-out infinite alternate; }
@keyframes kenBurns {
  from { transform: scale(1) translate(0, 0); }
  to { transform: scale(1.1) translate(-2%, -1%); }
}
```
适合 nian — 照片叙事、纪录片风格（纯 transform 动画，GPU 加速）

### #78 Opening Crawl（开场滚动）
```css
perspective: 300px;
overflow: hidden;
height: 80vh;
> .crawl { animation: crawl 60s linear forwards; transform-origin: 50% 100%; text-align: center; max-width: 600px; margin: 0 auto; }
@keyframes crawl {
  from { transform: rotateX(20deg) translateY(100%); }
  to { transform: rotateX(20deg) translateY(-200%); }
}
```
适合 nian — 时间线、故事引言（纯 transform + perspective）
