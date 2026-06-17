# Nian Design System — Components

> 26 个组件族，亮色+深色双模式。对标 Nothing Design 品质标准。
> 字体：Playfair Display（Display）/ Inter（Body）/ JetBrains Mono（Data）

---

## 色彩系统

> 亮色值对应 `tokens/colors.css` 中的标准变量。
> 深色模式值（加 -d 后缀）为 nian 扩展，当前 token 文件中未定义。

### Light Mode（对应 tokens/colors.css）
```
--bg:             #FAFAF8    主背景
--surface:        #FFFFFF    卡片/组件背景
--surface-raised: #F5F5F0    次级背景/交替
--border:         #E5E5E0    默认边框
--border-strongtrong:  #C0C0B8    高可见边框
--text-display:   #2C2C2C    Hero 标题
--text-primary:   #1A1A1A    正文
--text-secondary: #6B6B6B    说明文字
--text-disabled:  #A0A0A0    禁用态
--olive:          #4A5D3A    Brand 主色
--orange:         #E55B2B    强调色
--earth:          #8B7355    辅助色
--glacier:        #2A4A5A    冷调色
--error:          #C62828    错误状态
--success:        #2E7D32    成功状态
--warning:        #F9A825    警告状态
```

### Dark Mode（nian 扩展，加 -d 后缀）
```
--bg-d:             #1A1A1A
--surface-d:        #2C2C2C
--surface-raised-d: #333333
--border-d:         #3A3A3A
--border-strongtrong-d:  #4A4A4A
--text-display-d:   #FFFFFF
--text-primary-d:   #E0E0E0
--text-secondary-d: #999999
--text-disabled-d:  #666666
--olive-d:          #6A9A5A
--orange-d:         #E55B2B
--earth-d:          #A08060
--glacier-d:        #4A7A9A
--error-d:          #FF5252
--success-d:        #4CAF50
--warning-d:        #FFB300
```

---

## 基础约定

所有组件遵守以下基线：
- 圆角: cards 6px, buttons 4px, pills 999px, technical 4px
- 无阴影。层级通过背景色阶和边框对比实现。
- 过渡动画: 150ms ease-out。无 spring/bounce。
- Touch target: min 44px。

---

## 01. CARDS / SURFACES（卡片）

**HTML:**
```html
<div class="card">
  <div class="card__tag">LABEL</div>
  <div class="card__num">36.4</div>
  <div class="card__lbl">Throughput · GB/s</div>
  <div class="card__desc">Peak transfer rate at edge node.</div>
</div>
```

**CSS:**
```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 20px;
  transition: border-color 150ms ease-out;
}
.card:hover { border-color: var(--border-strong); }
.card__tag {
  font-family: var(--font-data);
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-disabled);
  margin-bottom: 4px;
}
.card__num {
  font-family: var(--font-data);
  font-size: 32px;
  font-weight: 500;
  color: var(--text-display);
  line-height: 1;
  letter-spacing: -0.02em;
}
.card__lbl {
  font-family: var(--font-data);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-top: 4px;
}
.card__desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-top: 8px;
}
/* Dark mode */
.dark .card {
  background: var(--surface-d);
  border-color: var(--border-d);
}
.dark .card:hover { border-color: var(--border-strong-d); }
.dark .card__tag { color: var(--text-disabled-d); }
.dark .card__num { color: var(--text-display-d); }
.dark .card__lbl { color: var(--text-secondary-d); }
.dark .card__desc { color: var(--text-secondary-d); }
```

**变体:**
- Standard: border 1px, radius 6px
- Compact: padding 12px, radius 4px
- Raised: background var(--surface-raised), border none

**用途:** 数据展示、内容卡片、仪表盘。卡片是最基础的容器，不要叠加使用。

---

## 02. BUTTONS（按钮）

**HTML:**
```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--accent">Accent</button>
<button class="btn btn--primary btn--sm">Small</button>
<button class="btn btn--primary btn--lg">Large</button>
```

**CSS:**
```css
.btn {
  font-family: var(--font-data);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 150ms ease-out;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
}
.btn:hover { opacity: 0.85; }
.btn:active { transform: translateY(1px); }
.btn--primary { background: var(--text-display); color: var(--bg); }
.btn--secondary { background: transparent; border: 1px solid var(--border); color: var(--text-primary); }
.btn--ghost { background: transparent; border: none; color: var(--text-secondary); }
.btn--accent { background: var(--orange); color: #fff; }
.btn--sm { padding: 6px 14px; font-size: 10px; min-height: 32px; }
.btn--lg { padding: 14px 28px; font-size: 13px; min-height: 52px; }
/* Dark mode */
.dark .btn--primary { background: var(--text-display-d); color: var(--bg-d); }
.dark .btn--secondary { border-color: var(--border-d); color: var(--text-primary-d); }
.dark .btn--ghost { color: var(--text-secondary-d); }
```

**变体:** primary / secondary / ghost / accent × sm / default / lg
**用途:** CTA、操作入口。按钮不是 decoration，每个按钮必须有明确的 action。

---

## 03. INPUTS（输入框）

**HTML:**
```html
<div class="field">
  <label class="field__lbl">Label</label>
  <input class="field__inp" placeholder="输入..." value="默认值">
</div>
<div class="field">
  <label class="field__lbl" style="color:var(--error)">Error</label>
  <input class="field__inp field__inp--e" value="错误输入">
  <span class="field__msg">[ERROR] 请输入有效值</span>
</div>
```

**CSS:**
```css
.field { display: flex; flex-direction: column; gap: 4px; }
.field__lbl {
  font-family: var(--font-data);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.field__inp {
  font-family: var(--font-body);
  font-size: 14px;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid var(--border);
  background: transparent;
  color: var(--text-primary);
  outline: none;
  width: 240px;
  transition: border-color 150ms ease-out;
}
.field__inp:focus { border-color: var(--text-display); }
.field__inp--e { border-color: var(--error); color: var(--error); }
.field__msg {
  font-family: var(--font-data);
  font-size: 9px;
  letter-spacing: 0.04em;
  color: var(--error);
}
/* Box variant */
.field__inp--box { border: 1px solid var(--border); padding: 8px 12px; border-radius: 4px; }
/* Dark mode */
.dark .field__lbl { color: var(--text-secondary-d); }
.dark .field__inp { border-color: var(--border-d); color: var(--text-primary-d); }
.dark .field__inp:focus { border-color: var(--text-display-d); }
.dark .field__inp--box { border-color: var(--border-d); }
```

**变体:** Underline（默认）/ Box（替代）/ Error（红色边框+消息）
**用途:** 表单输入、搜索、数据编辑。优先用 underline，box 用于搜索栏。

---

## 04. LISTS / DATA ROWS（数据行）

**HTML:**
```html
<div class="list">
  <div class="list-row">
    <span class="list-row__lbl">Revenue</span>
    <span class="list-row__val">3,239</span>
    <span class="list-row__unit">万</span>
  </div>
  <div class="list-row">
    <span class="list-row__lbl">Active Users</span>
    <span class="list-row__val">1,847</span>
    <span class="list-row__unit">人</span>
  </div>
  <div class="list-row list-row--hl">
    <span class="list-row__lbl">Avg Session</span>
    <span class="list-row__val">24.6</span>
    <span class="list-row__unit">min</span>
  </div>
</div>
```

**CSS:**
```css
.list { display: flex; flex-direction: column; }
.list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}
.list-row:last-child { border-bottom: none; }
.list-row--hl { background: var(--surface-raised); margin: 0 -8px; padding: 12px 8px; border-radius: 4px; }
.list-row__lbl {
  font-family: var(--font-data);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  min-width: 100px;
}
.list-row__val {
  font-family: var(--font-data);
  font-size: 16px;
  font-weight: 500;
  color: var(--text-display);
  margin-left: auto;
}
.list-row__unit {
  font-family: var(--font-data);
  font-size: 10px;
  color: var(--text-disabled);
}
/* Dark mode */
.dark .list-row { border-color: var(--border-d); }
.dark .list-row--hl { background: var(--surface-raised-d); }
.dark .list-row__lbl { color: var(--text-secondary-d); }
.dark .list-row__val { color: var(--text-display-d); }
.dark .list-row__unit { color: var(--text-disabled-d); }
```

**变体:** Standard（分隔线）/ Highlight（高亮行）
**用途:** 指标列表、属性展示。优先用间距分组，不额外加背景色。

---

## 05. TABLES / DATA GRIDS（数据表格）

**HTML:**
```html
<table class="tbl">
  <tr><th>Supplier</th><th>Revenue</th><th>Growth</th><th>Status</th></tr>
  <tr><td>毅航</td><td class="tbl__num">1,240 万</td><td class="tbl__num" style="color:var(--olive)">+18.3%</td><td><span class="tag tag--olive">Active</span></td></tr>
  <tr><td>毛毛虫</td><td class="tbl__num">980 万</td><td class="tbl__num" style="color:var(--olive)">+6.7%</td><td><span class="tag tag--olive">Active</span></td></tr>
  <tr class="tbl__row--a"><td>翰锐</td><td class="tbl__num">520 万</td><td class="tbl__num" style="color:var(--orange)">-2.1%</td><td><span class="tag tag--orange">Watch</span></td></tr>
</table>
```

**CSS:**
```css
.tbl { width: 100%; border-collapse: collapse; font-size: 13px; }
.tbl th {
  font-family: var(--font-data);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  padding: 8px 12px;
  text-align: left;
  font-weight: 400;
  border-bottom: 1px solid var(--border);
}
.tbl td { padding: 8px 12px; border-bottom: 1px solid var(--border); color: var(--text-primary); }
.tbl__num { font-family: var(--font-data); text-align: right; }
.tbl__row--a { background: var(--surface-raised); }
.tbl__row--a td:first-child { border-left: 2px solid var(--olive); }
.tbl tr:hover td { background: var(--surface-raised); }
/* Dark mode */
.dark .tbl th { color: var(--text-secondary-d); border-color: var(--border-d); }
.dark .tbl td { color: var(--text-primary-d); border-color: var(--border-d); }
.dark .tbl__row--a { background: var(--surface-raised-d); }
.dark .tbl tr:hover td { background: var(--surface-raised-d); }
```

**变体:** Standard / Active row（左绿线指示器）
**用途:** 结构化数据展示。无斑马纹、无单元格背景色。数字右对齐，文字左对齐。

---

## 06. NAVIGATION（导航）

**HTML:**
```html
<nav class="nav-bar">
  <span class="nav-bar__brand">Nian</span>
  <div class="nav-bar__links">
    <a class="nav-lnk nav-lnk--a">Home</a>
    <a class="nav-lnk">About</a>
    <a class="nav-lnk">Work</a>
    <a class="nav-lnk">Contact</a>
  </div>
</nav>
```

**CSS:**
```css
.nav-bar {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
}
.nav-bar__brand { font-family: var(--font-display); font-size: 18px; color: var(--text-display); }
.nav-bar__links { display: flex; gap: 20px; }
.nav-lnk {
  font-family: var(--font-data);
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-disabled);
  cursor: pointer;
  transition: color 150ms ease-out;
  text-decoration: none;
}
.nav-lnk:hover { color: var(--text-secondary); }
.nav-lnk--a { color: var(--text-primary); }
.nav-lnk--a::after { content: ''; display: block; height: 2px; background: var(--text-display); margin-top: 2px; }
/* Dark mode */
.dark .nav-bar { border-color: var(--border-d); }
.dark .nav-bar__brand { color: var(--text-display-d); }
.dark .nav-lnk { color: var(--text-disabled-d); }
.dark .nav-lnk:hover { color: var(--text-secondary-d); }
.dark .nav-lnk--a { color: var(--text-primary-d); }
.dark .nav-lnk--a::after { background: var(--text-display-d); }
```

**变体:** Horizontal bar（默认）/ Bottom bar（移动端 flex column）/ Bracket style `[HOME]`
**用途:** 页面导航、分类切换。最多 5 个链接。

---

## 07. TAGS / CHIPS（标签）

**HTML:**
```html
<span class="tag">Default</span>
<span class="tag tag--a">Active</span>
<span class="tag tag--olive">Olive</span>
<span class="tag tag--orange">Orange</span>
```

**CSS:**
```css
.tag {
  font-family: var(--font-data);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px 12px;
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}
.tag--a { border-color: var(--text-display); color: var(--text-primary); background: var(--text-display); color: var(--bg); }
.tag--olive { border-color: var(--olive); color: var(--olive); }
.tag--orange { border-color: var(--orange); color: var(--orange); }
.tag--s { font-size: 9px; padding: 2px 8px; }
/* Dark mode */
.dark .tag { border-color: var(--border-d); color: var(--text-secondary-d); }
.dark .tag--a { border-color: var(--text-display-d); color: var(--bg-d); background: var(--text-display-d); }
.dark .tag--olive { border-color: var(--olive-d); color: var(--olive-d); }
.dark .tag--orange { border-color: var(--orange-d); color: var(--orange-d); }
```

**变体:** Default / Active / Brand色 × 标准/小号
**用途:** 分类标记、状态指示。pill 形状（999px）。无填充背景（active 除外）。

---

## 08. SEGMENTED CONTROL（分段选择器）

**HTML:**
```html
<div class="seg">
  <span class="seg__item seg__item--a">Day</span>
  <span class="seg__item">Week</span>
  <span class="seg__item">Month</span>
  <span class="seg__item">Year</span>
</div>
```

**CSS:**
```css
.seg {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
}
.seg__item {
  padding: 8px 16px;
  font-family: var(--font-data);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  cursor: pointer;
  border-right: 1px solid var(--border);
  transition: all 150ms ease-out;
  min-height: 36px;
  display: flex;
  align-items: center;
}
.seg__item:last-child { border-right: none; }
.seg__item:hover { color: var(--text-primary); }
.seg__item--a { background: var(--text-display); color: var(--bg); }
/* Dark mode */
.dark .seg { border-color: var(--border-d); }
.dark .seg__item { color: var(--text-secondary-d); border-color: var(--border-d); }
.dark .seg__item:hover { color: var(--text-primary-d); }
.dark .seg__item--a { background: var(--text-display-d); color: var(--bg-d); }
```

**变体:** Standard / Pill（border-radius 999px）
**用途:** 时间周期切换、视图切换。2-4 段，不超过 5 段。

---

## 09. DATE / PERIOD NAVIGATION（日期导航）

**HTML:**
```html
<div class="date-nav">
  <span class="date-nav__arr">←</span>
  <span class="date-nav__lbl">June 2026</span>
  <span class="date-nav__arr">→</span>
</div>
```

**CSS:**
```css
.date-nav {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
}
.date-nav__arr {
  font-family: var(--font-data);
  font-size: 14px;
  color: var(--text-disabled);
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 4px;
  transition: border-color 150ms ease-out;
}
.date-nav__arr:hover { border-color: var(--border-strong); }
.date-nav__lbl {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  min-width: 120px;
  text-align: center;
}
/* Dark mode */
.dark .date-nav__arr { color: var(--text-disabled-d); border-color: var(--border-d); }
.dark .date-nav__arr:hover { border-color: var(--border-strong-d); }
.dark .date-nav__lbl { color: var(--text-primary-d); }
```

**变体:** Arrows + Label（默认）
**用途:** 时间区间切换。无日历弹窗——线性步进即是交互。

---

## 10. TOGGLES / SWITCHES（开关）

**HTML:**
```html
<div class="tgl">
  <div class="tgl__track"><div class="tgl__thumb"></div></div>
  <span class="tgl__lbl">Off</span>
</div>
<div class="tgl tgl--on">
  <div class="tgl__track"><div class="tgl__thumb"></div></div>
  <span class="tgl__lbl">On</span>
</div>
```

**CSS:**
```css
.tgl {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.tgl__track {
  width: 36px;
  height: 20px;
  background: var(--border);
  border-radius: 999px;
  position: relative;
  transition: background 150ms ease-out;
}
.tgl__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: transform 150ms ease-out;
}
.tgl--on .tgl__track { background: var(--text-display); }
.tgl--on .tgl__thumb { transform: translateX(16px); }
.tgl__lbl { font-family: var(--font-data); font-size: 10px; letter-spacing: 0.04em; color: var(--text-secondary); }
/* Dark mode */
.dark .tgl__track { background: var(--border-d); }
.dark .tgl--on .tgl__track { background: var(--text-display-d); }
.dark .tgl__lbl { color: var(--text-secondary-d); }
```

**变体:** Off / On
**用途:** 二元开关设置。触控目标 min 44px。

---

## 11. SEGMENTED PROGRESS BARS（分段进度条）

Signature 数据可视化组件。离散方块——机械感、仪器感。

**HTML:**
```html
<div class="sbar">
  <div class="sbar__h">
    <span class="sbar__lbl">Progress</span>
    <span class="sbar__val">78%</span>
  </div>
  <div class="sbar__track">
    <div class="sbar__s sbar__s--f"></div>
    <div class="sbar__s sbar__s--f"></div>
    <div class="sbar__s sbar__s--f"></div>
    <div class="sbar__s sbar__s--f"></div>
    <div class="sbar__s sbar__s--h"></div>
    <div class="sbar__s sbar__s--h"></div>
    <div class="sbar__s"></div>
    <div class="sbar__s"></div>
    <div class="sbar__s"></div>
    <div class="sbar__s"></div>
  </div>
</div>
```

**CSS:**
```css
.sbar { max-width: 400px; }
.sbar__h { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.sbar__lbl {
  font-family: var(--font-data);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
}
.sbar__val {
  font-family: var(--font-data);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-display);
}
.sbar__track {
  display: flex;
  gap: 3px;
  height: 10px;
}
.sbar__s {
  flex: 1;
  background: var(--border);
  border-radius: 1px;
  transition: background 150ms ease-out;
}
.sbar__s--f { background: var(--text-display); }
.sbar__s--h { background: var(--olive); }
.sbar__s--o { background: var(--orange); }
.sbar__s--e { background: var(--error); }
/* Sizes */
.sbar--hero .sbar__track { height: 16px; gap: 4px; }
.sbar--hero .sbar__lbl { font-size: 11px; }
.sbar--hero .sbar__val { font-size: 18px; }
.sbar--cmp .sbar__track { height: 6px; gap: 2px; }
/* Dark mode */
.dark .sbar__lbl { color: var(--text-secondary-d); }
.dark .sbar__val { color: var(--text-display-d); }
.dark .sbar__s { background: var(--border-d); }
.dark .sbar__s--f { background: var(--text-display-d); }
.dark .sbar__s--h { background: var(--olive-d); }
.dark .sbar__s--o { background: var(--orange-d); }
.dark .sbar__s--e { background: var(--error-d); }
```

**变体:** Hero（16px 高）/ Standard（10px 高）/ Compact（6px 高）
**填色状态:** Neutral（--text-display）/ Good（--olive）/ Moderate（--orange）/ Over limit（--error）
**用途:** 进度展示、达标率、填充率。配数字读数使用。方块 = 比例，数字 = 精度。

---

## 12. MINI CHARTS（微图表）

### 12a. Bar Chart（条形图）
```html
<div class="minibar">
  <div class="minibar__col" style="height:60%"><span class="minibar__lbl">月</span></div>
  <div class="minibar__col" style="height:40%"></div>
  <div class="minibar__col" style="height:80%"></div>
  <div class="minibar__col minibar__col--f" style="height:90%"></div>
  <div class="minibar__col" style="height:55%"></div>
  <div class="minibar__col" style="height:70%"></div>
  <div class="minibar__col" style="height:45%"></div>
</div>
```
```css
.minibar { display: flex; gap: 3px; align-items: flex-end; height: 80px; }
.minibar__col {
  flex: 1;
  background: var(--border);
  border-radius: 1px;
  position: relative;
  transition: background 150ms;
}
.minibar__col--f { background: var(--text-display); }
.minibar__col--h { background: var(--olive); }
.minibar__lbl {
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-data);
  font-size: 8px;
  color: var(--text-disabled);
}
.dark .minibar__col { background: var(--border-d); }
.dark .minibar__col--f { background: var(--text-display-d); }
.dark .minibar__col--h { background: var(--olive-d); }
.dark .minibar__lbl { color: var(--text-disabled-d); }
```

### 12b. Sparkline（迷你折线）
```html
<svg class="spark" width="160" height="32" viewBox="0 0 160 32">
  <polyline fill="none" stroke="var(--text-display)" stroke-width="1.5" points="0,20 20,24 40,12 60,8 80,4 100,10 120,6 140,14 160,2"/>
  <polyline fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="3 3" points="0,16 160,16"/>
</svg>
```
```css
.spark { display: block; }
.dark .spark polyline:first-child { stroke: var(--text-display-d); }
.dark .spark polyline:last-child { stroke: var(--border-d); }
```

### 12c. Gauge（仪表盘）
```html
<svg width="80" height="50" viewBox="0 0 80 50">
  <path d="M5 45 A35 35 0 0 1 75 45" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
  <path d="M5 45 A35 35 0 0 1 60 8" fill="none" stroke="var(--text-display)" stroke-width="4" stroke-linecap="round" stroke-dasharray="88 110"/>
  <text x="40" y="40" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" fill="var(--text-display)" font-weight="500">78%</text>
</svg>
```

### 12d. Dot Grid（点阵网格）
```html
<div class="dotg">
  <span class="dotg__d dotg__d--f"></span><span class="dotg__d dotg__d--f"></span><span class="dotg__d dotg__d--f"></span><span class="dotg__d dotg__d--h"></span><span class="dotg__d"></span><span class="dotg__d"></span>
</div>
```
```css
.dotg { display: flex; gap: 4px; flex-wrap: wrap; width: 120px; }
.dotg__d { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
.dotg__d--f { background: var(--text-display); }
.dotg__d--h { background: var(--olive); }
.dotg__d--l { background: var(--text-disabled); }
.dark .dotg__d { background: var(--border-d); }
.dark .dotg__d--f { background: var(--text-display-d); }
.dark .dotg__d--h { background: var(--olive-d); }
```

**用途:** 微图表嵌入在卡片或数据行中。永远附带数值读数。

---

## 13. WIDGETS / DASHBOARD CARDS（仪表盘卡片）

```html
<div class="widget">
  <span class="widget__cat">NETWORK</span>
  <span class="widget__hero">36.4</span>
  <span class="widget__unit">GB/s</span>
  <span class="widget__ctx">Peak throughput at edge node</span>
</div>
```

```css
.widget {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.widget__cat {
  font-family: var(--font-data);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-disabled);
  margin-bottom: 8px;
}
.widget__hero {
  font-family: var(--font-data);
  font-size: 40px;
  font-weight: 500;
  color: var(--text-display);
  line-height: 1;
  letter-spacing: -0.03em;
}
.widget__unit {
  font-family: var(--font-data);
  font-size: 11px;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
}
.widget__ctx {
  font-size: 12px;
  color: var(--text-disabled);
  line-height: 1.5;
  margin-top: 8px;
}
/* Dark mode */
.dark .widget { background: var(--surface-d); border-color: var(--border-d); }
.dark .widget__cat { color: var(--text-disabled-d); }
.dark .widget__hero { color: var(--text-display-d); }
.dark .widget__unit { color: var(--text-secondary-d); }
.dark .widget__ctx { color: var(--text-disabled-d); }
```

**用途:** 仪表盘中的核心指标卡片。Hero 指标用超大字体。

---

## 14. OVERLAYS & LAYERING（覆盖层）

无阴影。通过背景对比和边框实现层级。

### Modal（模态框）
```html
<div class="overlay" id="modal">
  <div class="overlay__back"></div>
  <div class="modal">
    <button class="modal__close">×</button>
    <div class="modal__h">Title</div>
    <div class="modal__b">Content here.</div>
  </div>
</div>
```
```css
.overlay { position: fixed; inset: 0; z-index: 100; display: none; }
.overlay.active { display: flex; align-items: center; justify-content: center; }
.overlay__back { position: absolute; inset: 0; background: rgba(44,44,44,0.85); }
.modal {
  position: relative; z-index: 2;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 6px; max-width: 480px; width: 90%; padding: 32px;
}
.modal__close {
  position: absolute; top: 12px; right: 12px;
  width: 44px; height: 44px; border: 1px solid var(--border);
  background: transparent; color: var(--text-secondary);
  font-size: 18px; cursor: pointer; display: flex;
  align-items: center; justify-content: center;
}
.modal__h { font-family: var(--font-body); font-size: 18px; font-weight: 500; color: var(--text-display); margin-bottom: 12px; }
.modal__b { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
/* Dark mode */
.dark .modal { background: var(--surface-d); border-color: var(--border-d); }
.dark .modal__close { border-color: var(--border-d); color: var(--text-secondary-d); }
.dark .modal__h { color: var(--text-display-d); }
.dark .modal__b { color: var(--text-secondary-d); }
```

### Bottom Sheet（底部面板）
```css
.sheet {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
  background: var(--surface); border-top: 1px solid var(--border);
  border-radius: 6px 6px 0 0; padding: 24px; max-height: 70vh;
}
.sheet__handle { width: 32px; height: 3px; background: var(--border); border-radius: 2px; margin: 0 auto 16px; }
```
**用途:** 模态用于确认/表单。Bottom sheet 用于操作菜单/详情。

---

## 15. STATE PATTERNS（状态模式）

### Error（错误）
```html
<div class="state-err">[ERROR] 连接失败，请重试</div>
<input class="field__inp field__inp--e" value="错误值">
<span class="field__msg">[ERROR] 请输入有效值</span>
```
```css
.state-err {
  font-family: var(--font-data);
  font-size: 10px; letter-spacing: 0.04em;
  color: var(--error);
  border: 1px solid rgba(215,25,33,0.2);
  padding: 10px 14px; border-radius: 4px;
  background: rgba(215,25,33,0.04);
}
```

### Empty（空态）
```html
<div class="state-empty">
  <div class="state-empty__h">No data</div>
  <div class="state-empty__p">No records match your filter.</div>
</div>
```
```css
.state-empty { text-align: center; padding: 64px 24px; }
.state-empty__h { font-family: var(--font-body); font-size: 18px; color: var(--text-secondary); margin-bottom: 8px; }
.state-empty__p { font-size: 13px; color: var(--text-disabled); }
```

### Loading（加载）
```html
<div class="state-load">
  <span class="state-load__s"></span><span class="state-load__s"></span><span class="state-load__s"></span>
  <span class="state-load__t">[LOADING]</span>
</div>
```
```css
.state-load { display: flex; align-items: center; gap: 6px; padding: 24px; }
.state-load__s { width: 6px; height: 6px; border-radius: 50%; background: var(--border); animation: pulse 1s infinite; }
.state-load__s:nth-child(2) { animation-delay: 0.2s; }
.state-load__s:nth-child(3) { animation-delay: 0.4s; }
.state-load__t {
  font-family: var(--font-data);
  font-size: 10px; letter-spacing: 0.04em;
  color: var(--text-disabled); margin-left: 8px;
}
@keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
```

**用途:** 每个状态必须明确设计。无骨架屏、无 toast 弹窗。

---

## 16. FLOW PIPELINE（流程管道）

```html
<div class="pipe">
  <div class="pipe__s pipe__s--d">
    <span class="pipe__l">Stage 01</span>
    <span class="pipe__v">准入</span>
  </div>
  <span class="pipe__a">›</span>
  <div class="pipe__s pipe__s--a">
    <span class="pipe__l">Stage 02</span>
    <span class="pipe__v">分配</span>
  </div>
  <span class="pipe__a">›</span>
  <div class="pipe__s">
    <span class="pipe__l">Stage 03</span>
    <span class="pipe__v">运营</span>
  </div>
</div>
```

```css
.pipe { display: flex; align-items: center; gap: 0; padding: 8px 0; }
.pipe__s {
  display: flex; flex-direction: column; gap: 2px;
  padding: 8px 16px; align-items: center;
}
.pipe__l {
  font-family: var(--font-data);
  font-size: 9px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-disabled);
}
.pipe__v { font-family: var(--font-body); font-size: 14px; color: var(--text-secondary); }
.pipe__s--a .pipe__v { color: var(--text-primary); font-weight: 500; }
.pipe__s--d .pipe__v { color: var(--olive); }
.pipe__a { font-size: 18px; color: var(--text-disabled); line-height: 1; padding: 0 4px; }
/* Dark mode */
.dark .pipe__l { color: var(--text-disabled-d); }
.dark .pipe__v { color: var(--text-secondary-d); }
.dark .pipe__s--a .pipe__v { color: var(--text-primary-d); }
.dark .pipe__s--d .pipe__v { color: var(--olive-d); }
.dark .pipe__a { color: var(--text-disabled-d); }
```

**变体:** Default / Done（绿色）/ Blocked（红色）/ Vertical（纵向）
**用途:** 流程展示、生命周期、阶段导航。

---

## 17. DO / DON'T COMPARISON（对比展示）

```html
<div class="cmpare">
  <div class="cmpare__col cmpare__col--x">
    <div class="cmpare__h"><span class="cmpare__m">×</span><span class="cmpare__t">AVOID</span></div>
    <div class="cmpare__r"><span class="cmpare__m">×</span><span>不要这么做</span></div>
    <div class="cmpare__r"><span class="cmpare__m">×</span><span>另一个反例</span></div>
  </div>
  <div class="cmpare__col cmpare__col--v">
    <div class="cmpare__h"><span class="cmpare__m">·</span><span class="cmpare__t">PREFER</span></div>
    <div class="cmpare__r"><span class="cmpare__m">·</span><span>正确的做法</span></div>
    <div class="cmpare__r"><span class="cmpare__m">·</span><span>另一个正例</span></div>
  </div>
</div>
```

```css
.cmpare { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.cmpare__col { border: 1px solid var(--border); padding: 20px; }
.cmpare__h { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
.cmpare__m { font-size: 16px; }
.cmpare__col--x .cmpare__m { color: var(--error); }
.cmpare__col--v .cmpare__m { color: var(--olive); }
.cmpare__t { font-family: var(--font-data); font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-secondary); }
.cmpare__r { display: flex; align-items: flex-start; gap: 8px; padding: 8px 0; font-size: 13px; color: var(--text-primary); line-height: 1.5; }
/* Dark mode */
.dark .cmpare__col { border-color: var(--border-d); }
.dark .cmpare__h { border-color: var(--border-d); }
.dark .cmpare__t { color: var(--text-secondary-d); }
.dark .cmpare__r { color: var(--text-primary-d); }
```

**用途:** 规则展示、最佳实践对比。两栏=避免 vs 推荐。

---

## 18. TAB PANEL（标签面板）

```html
<div class="tabp">
  <div class="tabp__bar">
    <button class="tabp__item tabp__item--a">Overview</button>
    <button class="tabp__item">Performance</button>
    <button class="tabp__item">Compliance</button>
  </div>
  <div class="tabp__b">
    <p>Overview content here.</p>
  </div>
</div>
```

```css
.tabp { border: 1px solid var(--border); border-radius: 4px; overflow: hidden; }
.tabp__bar {
  display: flex; gap: 0;
  border-bottom: 1px solid var(--border);
  background: var(--surface-raised);
}
.tabp__item {
  font-family: var(--font-data);
  font-size: 10px; letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 10px 20px; border: none;
  background: transparent; color: var(--text-disabled);
  cursor: pointer; position: relative;
  transition: color 150ms ease-out;
}
.tabp__item:hover { color: var(--text-secondary); }
.tabp__item--a { color: var(--text-primary); }
.tabp__item--a::after {
  content: ''; position: absolute; bottom: -1px;
  left: 0; right: 0; height: 2px;
  background: var(--text-display);
}
.tabp__b { padding: 20px; font-size: 14px; color: var(--text-secondary); line-height: 1.6; }
/* Dark mode */
.dark .tabp { border-color: var(--border-d); }
.dark .tabp__bar { border-color: var(--border-d); background: var(--surface-raised-d); }
.dark .tabp__item { color: var(--text-disabled-d); }
.dark .tabp__item:hover { color: var(--text-secondary-d); }
.dark .tabp__item--a { color: var(--text-primary-d); }
.dark .tabp__item--a::after { background: var(--text-display-d); }
.dark .tabp__b { color: var(--text-secondary-d); }
```

**变体:** Standard / Pill（标签用 tag 样式）
**用途:** 内容切换、多维度数据。2-4 个 tab。

---

## 19. ACCORDION（折叠面板）

```html
<div class="acc">
  <div class="acc__item">
    <button class="acc__tog">
      <span class="acc__lbl">Section Title</span>
      <span class="acc__ico">+</span>
    </button>
    <div class="acc__b">Expanded content here.</div>
  </div>
  <div class="acc__item acc__item--o">
    <button class="acc__tog">
      <span class="acc__lbl">Another Section</span>
      <span class="acc__ico">−</span>
    </button>
    <div class="acc__b">Expanded content.</div>
  </div>
</div>
```

```css
.acc { border-top: 1px solid var(--border); }
.acc__item { border-bottom: 1px solid var(--border); }
.acc__tog {
  width: 100%; display: flex; justify-content: space-between;
  align-items: center; padding: 16px 0;
  background: transparent; border: none; cursor: pointer;
  text-align: left;
}
.acc__lbl { font-family: var(--font-body); font-size: 14px; font-weight: 500; color: var(--text-primary); }
.acc__ico { font-family: var(--font-data); font-size: 16px; color: var(--text-disabled); min-width: 20px; text-align: right; }
.acc__item--o .acc__ico { color: var(--text-display); }
.acc__b { padding: 0 0 20px; font-size: 13px; color: var(--text-secondary); line-height: 1.6; }
.acc__item:not(.acc__item--o) .acc__b { display: none; }
/* Dark mode */
.dark .acc { border-color: var(--border-d); }
.dark .acc__item { border-color: var(--border-d); }
.dark .acc__lbl { color: var(--text-primary-d); }
.dark .acc__ico { color: var(--text-disabled-d); }
.dark .acc__item--o .acc__ico { color: var(--text-display-d); }
.dark .acc__b { color: var(--text-secondary-d); }
```

**用途:** 政策文档、规则集合、FAQ。无动画——即时展开/折叠（机械感）。

---

## 20. ASYMMETRIC COMPARISON TABLE（非对称对比表）

```html
<div class="asym">
  <div class="asym__s">
    <span class="asym__bg">VS</span>
    <span class="asym__n">01</span>
    <div class="asym__t">Comparison Title</div>
  </div>
  <div class="asym__r">
    <div class="asym__row">
      <span class="asym__rn">01</span>
      <div class="asym__c"><span class="asym__cl">Subject A</span><span class="asym__cv">Value A</span></div>
      <div class="asym__c"><span class="asym__cl">Subject B</span><span class="asym__cv">Value B</span></div>
    </div>
  </div>
</div>
```

```css
.asym { display: grid; grid-template-columns: 0.35fr 1fr; gap: 48px; align-items: start; }
.asym__s { position: sticky; top: 80px; }
.asym__bg { font-family: var(--font-data); font-size: 64px; font-weight: 700; color: var(--text-display); opacity: 0.06; line-height: 0.85; display: block; }
.asym__n { font-family: var(--font-data); font-size: 10px; letter-spacing: 0.08em; color: var(--text-disabled); display: block; margin-bottom: 4px; }
.asym__t { font-family: var(--font-body); font-size: 20px; font-weight: 500; color: var(--text-display); }
.asym__row { display: grid; grid-template-columns: 32px 1fr 1fr; gap: 12px; padding: 20px 0; border-bottom: 1px solid var(--border); }
.asym__row:last-child { border-bottom: none; }
.asym__rn { font-family: var(--font-data); font-size: 20px; color: var(--text-disabled); line-height: 1; }
.asym__c { display: flex; flex-direction: column; gap: 2px; }
.asym__cl { font-family: var(--font-data); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-disabled); }
.asym__cv { font-size: 14px; color: var(--text-primary); line-height: 1.4; }
/* Dark mode */
.dark .asym__bg { color: var(--text-display-d); }
.dark .asym__n { color: var(--text-disabled-d); }
.dark .asym__t { color: var(--text-display-d); }
.dark .asym__row { border-color: var(--border-d); }
.dark .asym__rn { color: var(--text-disabled-d); }
.dark .asym__cl { color: var(--text-disabled-d); }
.dark .asym__cv { color: var(--text-primary-d); }
```

**用途:** 双主体对比。左栏 sticky 标注，右栏数据行。

---

## 21. DETAIL PANEL（详情面板）

```html
<div class="dpanel" id="panel">
  <button class="dpanel__x">×</button>
  <div class="dpanel__in">
    <div class="dpanel__h">
      <span class="dpanel__l">Detail</span>
      <div class="dpanel__t">Item Title</div>
    </div>
    <div class="dpanel__b">Full content here.</div>
  </div>
</div>
```

```css
.dpanel {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(44,44,44,0.88);
  display: none; overflow-y: auto; padding: 5vh 2rem;
}
.dpanel.active { display: block; }
.dpanel__x {
  position: fixed; top: 16px; right: 16px;
  width: 44px; height: 44px; z-index: 101;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--text-primary); font-size: 20px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.dpanel__in { max-width: 640px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); }
.dpanel__h { padding: 24px; border-bottom: 1px solid var(--border); }
.dpanel__l { font-family: var(--font-data); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-disabled); }
.dpanel__t { font-family: var(--font-body); font-size: 20px; font-weight: 500; color: var(--text-display); margin-top: 4px; }
.dpanel__b { padding: 24px; font-size: 14px; color: var(--text-secondary); line-height: 1.7; }
/* Dark mode */
.dark .dpanel__x { border-color: var(--border-d); background: var(--surface-d); color: var(--text-primary-d); }
.dark .dpanel__in { background: var(--surface-d); border-color: var(--border-d); }
.dark .dpanel__h { border-color: var(--border-d); }
.dark .dpanel__l { color: var(--text-disabled-d); }
.dark .dpanel__t { color: var(--text-display-d); }
.dark .dpanel__b { color: var(--text-secondary-d); }
```

**用途:** 供应商详情、完整政策文本、审计详情。按 Escape 关闭。

---

## 22. CHECKLIST（检查清单）

```html
<div class="chk">
  <div class="chk__i">
    <span class="chk__b chk__b--c"></span>
    <span class="chk__l">Completed requirement</span>
    <span class="chk__s">OK</span>
  </div>
  <div class="chk__i">
    <span class="chk__b"></span>
    <span class="chk__l">Pending requirement</span>
    <span class="chk__s chk__s--p">Pending</span>
  </div>
  <div class="chk__i">
    <span class="chk__b"></span>
    <span class="chk__l">Not started</span>
  </div>
</div>
```

```css
.chk { display: flex; flex-direction: column; }
.chk__i {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 0; border-bottom: 1px solid var(--border);
}
.chk__i:last-child { border-bottom: none; }
.chk__b {
  width: 16px; height: 16px;
  border: 1px solid var(--border); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: background 150ms ease-out;
}
.chk__b--c { background: var(--text-display); border-color: var(--text-display); }
.chk__b--c::after { content: ''; width: 6px; height: 2px; background: var(--bg); margin-top: -1px; }
.chk__l { flex: 1; font-size: 14px; color: var(--text-primary); line-height: 1.4; }
.chk__s { font-family: var(--font-data); font-size: 9px; letter-spacing: 0.06em; color: var(--text-disabled); }
.chk__s--p { color: var(--warning); }
/* Dark mode */
.dark .chk__i { border-color: var(--border-d); }
.dark .chk__b { border-color: var(--border-d); }
.dark .chk__b--c { background: var(--text-display-d); border-color: var(--text-display-d); }
.dark .chk__b--c::after { background: var(--bg-d); }
.dark .chk__l { color: var(--text-primary-d); }
.dark .chk__s { color: var(--text-disabled-d); }
```

**用途:** 合规检查、Onboarding 步骤、审计项。无动画，即时切换。

---

## 23. DECORATIVE NUMBER HEADER（装饰数字标题）

```html
<div class="deco">
  <span class="deco__n">01</span>
  <span class="deco__l">Section</span>
  <div class="deco__t">Section Title</div>
</div>
```

```css
.deco { position: relative; padding: 24px 20px 20px; overflow: hidden; }
.deco__n {
  position: absolute; top: -20px; right: -10px;
  font-family: var(--font-display);
  font-size: 96px; font-weight: 700;
  color: var(--text-display); opacity: 0.05;
  line-height: 1; pointer-events: none; user-select: none;
}
.deco__l {
  font-family: var(--font-data);
  font-size: 9px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-disabled);
  display: block; margin-bottom: 4px; position: relative;
}
.deco__t {
  font-family: var(--font-body);
  font-size: 18px; font-weight: 500;
  color: var(--text-display); line-height: 1.2;
}
/* Accent variant */
.deco--a .deco__n { color: var(--orange); opacity: 0.08; }
/* Dark mode */
.dark .deco__n { color: var(--text-display-d); }
.dark .deco__l { color: var(--text-disabled-d); }
.dark .deco__t { color: var(--text-display-d); }
```

**变体:** Standard（深色透明数字）/ Accent（橙色透明数字）
**用途:** 章节标题装饰。数字不携带数据，只制造氛围。每页最多用一次。

---

## 24. THREE-COLUMN NUMBERED GRID（三列编号网格）

```html
<div class="tri">
  <div class="tri__c">
    <span class="tri__n">01</span>
    <div class="tri__t">First Item</div>
    <div class="tri__d">Description of the first item.</div>
  </div>
  <div class="tri__c">
    <span class="tri__n">02</span>
    <div class="tri__t">Second Item</div>
    <div class="tri__d">Description of the second item.</div>
  </div>
  <div class="tri__c">
    <span class="tri__n">03</span>
    <div class="tri__t">Third Item</div>
    <div class="tri__d">Description of the third item.</div>
  </div>
</div>
```

```css
.tri { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.tri__c {
  position: relative; border: 1px solid var(--border);
  padding: 28px 20px 20px; overflow: hidden;
  transition: border-color 150ms ease-out;
}
.tri__c:hover { border-color: var(--border-strong); }
.tri__n {
  position: absolute; top: -10px; right: -5px;
  font-family: var(--font-display);
  font-size: 64px; font-weight: 700;
  color: var(--text-display); opacity: 0.04;
  line-height: 1; pointer-events: none;
}
.tri__t { font-family: var(--font-body); font-size: 15px; font-weight: 500; color: var(--text-display); margin-bottom: 6px; position: relative; }
.tri__d { font-size: 13px; color: var(--text-secondary); line-height: 1.6; position: relative; }
/* No border variant */
.tri--nb .tri__c { border: none; padding: 20px 0; }
/* Dark mode */
.dark .tri__c { border-color: var(--border-d); }
.dark .tri__c:hover { border-color: var(--border-strong-d); }
.dark .tri__n { color: var(--text-display-d); }
.dark .tri__t { color: var(--text-display-d); }
.dark .tri__d { color: var(--text-secondary-d); }
```

**变体:** Bordered（默认）/ No-border（轻量）
**用途:** 步骤展示、特性列表、平行概念。三列固定。

---

## 25. FLIP CARD（翻转卡片）

亮色模式专用。暗色模式渲染为单面卡片。

```html
<div class="flip">
  <div class="flip__in">
    <div class="flip__f">
      <span class="flip__l">Cover</span>
      <span class="flip__h">36.4</span>
      <span class="flip__u">GB/s</span>
    </div>
    <div class="flip__b">
      <span class="flip__l">Detail</span>
      <p class="flip__d">Detail content supporting the hero metric.</p>
    </div>
  </div>
</div>
```

```css
.flip { perspective: 800px; cursor: pointer; }
.flip__in {
  position: relative; width: 100%; min-height: 200px;
  transition: transform 0.3s step-end;
  transform-style: preserve-3d;
}
.flip.flipped .flip__in { transform: rotateY(180deg); }
.flip__f, .flip__b {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border: 1px solid var(--border);
  padding: 24px; display: flex;
  flex-direction: column; justify-content: center;
}
.flip__f { background: var(--surface); }
.flip__b { background: var(--surface-raised); transform: rotateY(180deg); }
.flip__l { font-family: var(--font-data); font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-disabled); margin-bottom: 12px; }
.flip__h { font-family: var(--font-data); font-size: 36px; font-weight: 500; color: var(--text-display); line-height: 1; }
.flip__u { font-family: var(--font-data); font-size: 11px; color: var(--text-secondary); letter-spacing: 0.04em; margin-top: 4px; }
.flip__d { font-size: 13px; color: var(--text-primary); line-height: 1.6; }
```

**用途:** 数据卡片正反面。正面 Hero 指标，反面详情。点击翻转，无动画（step-end = 机械感）。

---

## 26. STACKED IMAGE CARDS（堆叠图片卡）

```html
<div class="stack">
  <div class="stack__c" style="z-index:4;transform:translateY(0)">
    <div class="stack__p" style="background:var(--surface-raised);height:160px"></div>
  </div>
  <div class="stack__c" style="z-index:3;transform:translateY(8px)">
    <div class="stack__p" style="background:var(--border);height:160px"></div>
  </div>
  <div class="stack__c" style="z-index:2;transform:translateY(16px)">
    <div class="stack__p" style="background:var(--surface-raised);height:160px"></div>
  </div>
</div>
```

```css
.stack { position: relative; width: 100%; max-width: 300px; aspect-ratio: 3/4; cursor: pointer; }
.stack__c {
  position: absolute; inset: 0;
  border: 1px solid var(--border); overflow: hidden;
  transition: transform 0.2s ease-out;
}
.stack__p { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--text-disabled); }
/* Dark mode */
.dark .stack__c { border-color: var(--border-d); }
.dark .stack__p { color: var(--text-disabled-d); }
```

**变体:** 3-4 张堆叠。点击顶层→移到底部。
**用途:** 作品集、现场照片、供应商场地展示。

---

---

## 27. GANTT CHART（甘特图）

**HTML:**
```html
<div class="gantt">
  <div class="gantt__header">
    <div class="gantt__header-label"></div>
    <div class="gantt__header-label">Q1</div>
    <div class="gantt__header-label">Q2</div>
    <div class="gantt__header-label">Q3</div>
    <div class="gantt__header-label">Q4</div>
  </div>
  <div class="gantt__row">
    <div class="gantt__label">数据平台</div>
    <div class="gantt__bar gantt__bar--olive">上线</div>
    <div class="gantt__bar gantt__bar--neutral">优化</div>
    <div class="gantt__bar gantt__bar--neutral">优化</div>
    <div class="gantt__bar gantt__bar--neutral">优化</div>
  </div>
  <div class="gantt__row">
    <div class="gantt__label">自动化</div>
    <div class="gantt__bar gantt__bar--neutral">调研</div>
    <div class="gantt__bar gantt__bar--orange">投产</div>
    <div class="gantt__bar gantt__bar--neutral">扩展</div>
    <div class="gantt__bar gantt__bar--neutral">扩展</div>
  </div>
</div>
```

**CSS:**
```css
.gantt { width: 100%; }
.gantt__header, .gantt__row {
  display: grid;
  grid-template-columns: 160px repeat(4, 1fr);
  gap: 8px; align-items: center;
}
.gantt__header {
  margin-bottom: 12px; padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.gantt__header-label {
  font-family: var(--font-data); font-size: 10px;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text-disabled); text-align: center;
}
.gantt__row { margin-bottom: 8px; }
.gantt__label { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.gantt__bar {
  height: 36px; border-radius: 4px;
  display: flex; align-items: center; padding: 0 12px;
  font-family: var(--font-data); font-size: 10px; font-weight: 500;
  letter-spacing: 0.02em; white-space: nowrap; overflow: hidden;
}
.gantt__bar--neutral { background: var(--surface-raised); color: var(--text-secondary); }
.gantt__bar--olive { background: var(--olive); color: #FFFFFF; }
.gantt__bar--orange { background: var(--orange); color: #FFFFFF; }
/* Dark mode */
.dark .gantt__header { border-bottom-color: var(--border-d); }
.dark .gantt__header-label { color: var(--text-secondary-d); }
.dark .gantt__label { color: var(--text-primary-d); }
.dark .gantt__bar--neutral { background: var(--surface-raised-d); color: var(--text-secondary-d); }
```

**变体:** 列数可调整（repeat(N, 1fr)），bar 颜色可选 neutral/olive/orange。
**用途:** 项目时间线、阶段规划、资源分配。

---

## 28. PYRAMID STACK（金字塔层叠）

**HTML:**
```html
<div class="pyramid">
  <div class="pyramid__layer pyramid__layer--1">
    <svg class="pyramid__icon" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
    自主运营
  </div>
  <div class="pyramid__layer pyramid__layer--2">智能决策</div>
  <div class="pyramid__layer pyramid__layer--3">流程自动化</div>
  <div class="pyramid__layer pyramid__layer--4">数据基础</div>
  <div class="pyramid__layer pyramid__layer--5">基础设施</div>
</div>
```

**CSS:**
```css
.pyramid { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.pyramid__layer {
  height: 40px; display: flex; align-items: center; justify-content: center;
  gap: 8px; border-radius: 4px;
  font-family: var(--font-data); font-size: 12px; font-weight: 500;
  letter-spacing: 0.02em; transition: all 150ms ease-out;
}
.pyramid__layer--1 { width: 35%; background: var(--olive); color: #FFFFFF; }
.pyramid__layer--2 { width: 50%; background: var(--surface-raised); color: var(--text-primary); }
.pyramid__layer--3 { width: 65%; background: var(--surface-raised); color: var(--text-primary); }
.pyramid__layer--4 { width: 80%; background: var(--surface-raised); color: var(--text-primary); }
.pyramid__layer--5 { width: 100%; background: var(--surface-raised); color: var(--text-primary); }
.pyramid__icon { width: 14px; height: 14px; stroke: currentColor; stroke-width: 1.5; fill: none; }
/* Dark mode */
.dark .pyramid__layer--2, .dark .pyramid__layer--3,
.dark .pyramid__layer--4, .dark .pyramid__layer--5 {
  background: var(--surface-raised-d); color: var(--text-primary-d);
}
```

**变体:** 层数可调整（增减 pyramid__layer），顶层颜色可换 orange。
**用途:** 层级关系、优先级展示、能力模型、Maslow 需求层次。

---

## 29. RADIAL DATA DISPLAY（径向数据展示）

**HTML:**
```html
<div class="radial">
  <div class="radial__circle">
    <span class="radial__value">89%</span>
  </div>
  <div class="radial__orbit">
    <div class="radial__item radial__item--top">
      <span class="radial__dot"></span><span>效率 +47%</span>
    </div>
    <div class="radial__item radial__item--right">
      <span class="radial__dot"></span><span>成本 -32%</span>
    </div>
    <div class="radial__item radial__item--bottom">
      <span class="radial__dot"></span><span>自动化 68%</span>
    </div>
    <div class="radial__item radial__item--left">
      <span class="radial__dot"></span><span>满意度 89%</span>
    </div>
  </div>
</div>
```

**CSS:**
```css
.radial {
  position: relative; width: 320px; height: 320px;
  display: flex; align-items: center; justify-content: center;
}
.radial__circle {
  width: 120px; height: 120px; border-radius: 50%;
  background: var(--olive); display: flex; align-items: center;
  justify-content: center; position: relative; z-index: 2;
}
.radial__value {
  font-family: var(--font-data); font-size: 32px; font-weight: 500;
  color: #FFFFFF; line-height: 1;
}
.radial__orbit { position: absolute; width: 100%; height: 100%; }
.radial__item {
  position: absolute; display: flex; align-items: center; gap: 8px;
  font-family: var(--font-data); font-size: 11px; font-weight: 500;
  color: var(--text-primary);
}
.radial__dot { width: 8px; height: 8px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }
.radial__item--top { top: 0; left: 50%; transform: translateX(-50%); }
.radial__item--right { top: 50%; right: 0; transform: translateY(-50%); }
.radial__item--bottom { bottom: 0; left: 50%; transform: translateX(-50%); }
.radial__item--left { top: 50%; left: 0; transform: translateY(-50%); }
/* Dark mode */
.dark .radial__circle { background: var(--glacier); }
.dark .radial__item { color: var(--text-primary-d); }
```

**变体:** 中心圆颜色可换（olive/glacier/orange），卫星点数量可调（3-6个）。
**用途:** 中心化数据展示、单一核心指标+关联指标、仪表盘。

---

## 30. QUARTER BAR（季度对比条）

**HTML:**
```html
<div class="quarters">
  <div class="quarters__item quarters__item--active">
    <div class="quarters__bar"></div>
    <div class="quarters__label">Q1</div>
  </div>
  <div class="quarters__item">
    <div class="quarters__bar"></div>
    <div class="quarters__label">Q2</div>
  </div>
  <div class="quarters__item">
    <div class="quarters__bar"></div>
    <div class="quarters__label">Q3</div>
  </div>
  <div class="quarters__item">
    <div class="quarters__bar"></div>
    <div class="quarters__label">Q4</div>
  </div>
</div>
```

**CSS:**
```css
.quarters { display: flex; gap: 4px; align-items: flex-end; height: 120px; }
.quarters__item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.quarters__label {
  font-family: var(--font-data); font-size: 11px; font-weight: 500;
  letter-spacing: 0.04em; color: var(--text-disabled);
}
.quarters__bar {
  width: 100%; height: 60px; background: var(--surface-raised);
  border-radius: 4px 4px 0 0; transition: all 150ms ease-out;
}
.quarters__item--active .quarters__bar { background: var(--olive); height: 80px; }
.quarters__item--active .quarters__label { color: var(--olive); }
/* Dark mode */
.dark .quarters__label { color: var(--text-secondary-d); }
.dark .quarters__bar { background: var(--surface-raised-d); }
.dark .quarters__item--active .quarters__bar { background: var(--glacier); }
.dark .quarters__item--active .quarters__label { color: var(--glacier); }
```

**变体:** 高亮项可切换（quarters__item--active），可扩展为月度（12格）。
**用途:** 年度计划、季度回顾、周期性数据对比。

---

## 31. FLOW DIAGRAM TREE（树状流程图）

**HTML:**
```html
<div class="flow-tree">
  <div class="flow-tree__row">
    <div class="flow-tree__node flow-tree__node--start">需求输入</div>
  </div>
  <div class="flow-tree__connector"></div>
  <div class="flow-tree__row">
    <div class="flow-tree__node">评估</div>
  </div>
  <div class="flow-tree__connector"></div>
  <div class="flow-tree__branch">
    <div class="flow-tree__branch-item">
      <div class="flow-tree__connector"></div>
      <div class="flow-tree__node">方案A</div>
    </div>
    <div class="flow-tree__branch-item">
      <div class="flow-tree__connector"></div>
      <div class="flow-tree__node flow-tree__node--accent">方案B</div>
    </div>
  </div>
</div>
```

**CSS:**
```css
.flow-tree { display: flex; flex-direction: column; align-items: center; gap: 0; }
.flow-tree__row { display: flex; gap: 16px; align-items: flex-start; }
.flow-tree__node {
  padding: 12px 20px; border-radius: 4px; background: var(--surface-raised);
  font-family: var(--font-data); font-size: 12px; font-weight: 500;
  color: var(--text-primary); text-align: center; min-width: 100px;
  transition: border-color 150ms ease-out;
}
.flow-tree__node:hover { border-color: var(--border-strong); }
.flow-tree__node--start { background: var(--olive); color: #FFFFFF; }
.flow-tree__node--accent { background: var(--orange); color: #FFFFFF; }
.flow-tree__connector { width: 1px; height: 24px; background: var(--border); margin: 0 auto; }
.flow-tree__branch { display: flex; gap: 32px; position: relative; }
.flow-tree__branch::before {
  content: ''; position: absolute; top: 0; left: 50px; right: 50px;
  height: 1px; background: var(--border);
}
.flow-tree__branch-item { display: flex; flex-direction: column; align-items: center; }
/* Dark mode */
.dark .flow-tree__node { background: var(--surface-raised-d); color: var(--text-primary-d); }
.dark .flow-tree__node--start { background: var(--glacier); }
.dark .flow-tree__node--accent { background: var(--orange); }
.dark .flow-tree__connector { background: var(--border-d); }
.dark .flow-tree__branch::before { background: var(--border-d); }
```

**变体:** 分支数量可调（2-5个），节点颜色可选 neutral/start/accent。
**用途:** 决策树、分支流程、多路径展示、审批流程。

---

## 32. TREE ARCHITECTURE（树状架构）

**HTML:**
```html
<div class="tree-arch">
  <div class="tree-arch__row">
    <div class="tree-arch__card-top">
      <div class="tree-arch__card-top-title">数据平台</div>
      <div class="tree-arch__card-top-sub">基础设施</div>
    </div>
    <div class="tree-arch__card-top">
      <div class="tree-arch__card-top-title">AI引擎</div>
      <div class="tree-arch__card-top-sub">能力底座</div>
    </div>
    <div class="tree-arch__card-top">
      <div class="tree-arch__card-top-title">安全合规</div>
      <div class="tree-arch__card-top-sub">保障体系</div>
    </div>
  </div>
  <div class="tree-arch__line"></div>
  <div class="tree-arch__mid">智能中台</div>
  <div class="tree-arch__line"></div>
  <div class="tree-arch__row">
    <div class="tree-arch__card-bottom">客服</div>
    <div class="tree-arch__card-bottom">风控</div>
    <div class="tree-arch__card-bottom">运营</div>
    <div class="tree-arch__card-bottom">营销</div>
    <div class="tree-arch__card-bottom">研发</div>
  </div>
</div>
```

**CSS:**
```css
.tree-arch { display: flex; flex-direction: column; align-items: center; gap: 0; }
.tree-arch__row { display: flex; gap: 12px; align-items: flex-start; }
.tree-arch__card-top {
  background: var(--surface-raised); padding: 12px 16px;
  border-radius: 4px; text-align: center; min-width: 120px;
}
.tree-arch__card-top-title { font-size: 12px; font-weight: 600; color: var(--text-primary); line-height: 1.3; }
.tree-arch__card-top-sub { font-size: 10px; color: var(--text-disabled); margin-top: 4px; }
.tree-arch__mid {
  padding: 8px 32px; border-radius: 999px; background: var(--olive);
  color: #FFFFFF; font-family: var(--font-data); font-size: 12px;
  font-weight: 500; text-align: center; margin: 12px 0;
}
.tree-arch__card-bottom {
  background: var(--darkgray); padding: 8px 12px; border-radius: 4px;
  font-size: 11px; font-weight: 600; color: #FFFFFF; text-align: center;
  min-width: 80px;
}
.tree-arch__line { width: 1px; height: 16px; background: var(--border); }
/* Dark mode */
.dark .tree-arch__card-top { background: var(--surface-raised-d); }
.dark .tree-arch__card-top-title { color: var(--text-primary-d); }
.dark .tree-arch__card-top-sub { color: var(--text-secondary-d); }
.dark .tree-arch__mid { background: var(--glacier); }
.dark .tree-arch__card-bottom { background: var(--surface-d); }
.dark .tree-arch__line { background: var(--border-d); }
```

**变体:** 顶层/底层卡片数量可调，中层文字可替换。
**用途:** 组织架构、系统架构、三层体系展示。

---

*32 个组件族 · 亮色+深色双模式 · Nian Design System · 对齐 Nothing Design 品质标准*
*最后更新：2026-06-14*
