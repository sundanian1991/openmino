# Nian Design System — 统一组件库

> 来源：Nothing Design（26 组件族）+ nian-design 独特组件 + mino-design 关键组件，现已扩展至 32 族
> 输出：`nian-components.md`（本文件）+ `nian-components.html`（单文件预览）
> 质量基线：H001-品牌展示-statement.html
> 标注规则：`[N]`=Nothing 原始 26 族 · `[nian]`=nian 独特（含 27-32 扩展） · `[mino]`=mino 关键 · `[变种 X/Y]`=同族变种关系

---

## 1. 设计原则

- 单文件可运行：每个组件示例独立复制可用
- 无外部依赖：字体使用系统栈 + Google Fonts
- 视觉无阴影：分层靠背景色阶和边框对比
- 响应式断点：1024px / 768px
- 无障碍：支持 `prefers-reduced-motion`

---

## 2. 组件清单（按 HTML Section 顺序）

### 2.1 Section 01 · Foundation（基础 10 个）
| 组件 | 标注 | 来源/变种关系 |
|------|------|--------------|
| Card | [N] | Nothing 原始 |
| Button | [N] | Nothing 原始 |
| Input | [N] | Nothing 原始 |
| Data Row | [N] | Nothing 原始 |
| Table | [N] | Nothing 原始 |
| Tag | [N] | Nothing 原始 |
| Segmented Control | [N] | Nothing 原始 |
| Period Nav | [N] | Nothing 原始 |
| Toggle | [N] | Nothing 原始 |
| Segmented Progress | [N] | Nothing 原始 |

### 2.2 Section 02 · Dark Full-Bleed（深色整块 4 个）
| 组件 | 标注 | 来源/变种关系 |
|------|------|--------------|
| Tension Grid | [nian] | nian 独特，Nothing 无等价 |
| Flow Pipeline | [N] | Nothing 原始，深色变体 |
| Do / Don't | [N] | Nothing 原始，深色变体 |
| Asymmetric Comparison Table | [N] | Nothing 原始，深色变体 |

> **决策记录**：深色组件不再塞进白底 `component-cell`。Tension Grid 本来就是深色整块叙事，H001 的做法是独立深色 Section 整块铺。Flow/Do/Don't/Asymmetric 也提供深色变体 `--dark` modifier。

### 2.3 Section 03 · Interaction（交互 6 个）
| 组件 | 标注 | 来源/变种关系 |
|------|------|--------------|
| Tab Panel | [N] | Nothing 原始 |
| Accordion | [N] | Nothing 原始 |
| Detail Panel | [N] | Nothing 原始 |
| Checklist | [N] | Nothing 原始 |
| Flip Card | [N] | Nothing 原始（仅 Light Mode） |
| Dropdown | [N] | Nothing 原始 |
| Bottom Sheet | [N] | Nothing 原始 |
| Stacked Image Cards | [N] | Nothing 原始 |

### 2.4 Section 04 · States & Widgets（状态 4 个 + 仪表盘 2 个 + Toast）
| 组件 | 标注 | 来源/变种关系 |
|------|------|--------------|
| Error State | [N] | Nothing 原始 |
| Empty State | [N] | Nothing 原始 |
| Loading State | [N] | Nothing 原始（segmented bar 动画） |
| Disabled State | [N] | Nothing 原始 |
| Widget Card (Light/Dark) | [N] | Nothing 原始 |
| Toast (Inline + Floating) | [N] | Nothing 原始 |

### 2.5 Section 05 · Content（mino 关键 8 类）
| 组件 | 标注 | 来源/变种关系 |
|------|------|--------------|
| Quote Minimal | [mino] | mino 1E-A |
| Quote Editorial | [mino] | mino 1E-B |
| Quote Highlight | [mino] | mino 1E-D |
| Quote Terminal | [mino] | mino 1E-E |
| Code Panel (macOS / Clean) | [mino] | mino 5A/5D；与 Nothing 无直接等价，独立保留 |
| Chat Bubbles | [mino] | mino 7；Nothing 无等价 |
| Filter Bar | [mino] | mino 16；与 N07 Tag 边界：Tag=单选标识，Filter=多选交互 |
| Horizontal Scroll Cards | [mino] | mino 26；Nothing 无等价 |
| Calendar Grid | [mino] | mino 19；Nothing 无等价 |
| Carousel | [mino] | mino 29；与 Nothing 无直接等价 |

### 2.6 Section 06 · Visualization & Layout（变种标注）
| 组件 | 标注 | 变种关系 |
|------|------|---------|
| Block Bar | [nian][变种 1/2] | vs N11 Segmented Progress — 实现方式不同：Block Bar 单条带标题描述，Seg Bar 多条带通用 label |
| Gauge Arc | [nian][变种 1/1] | vs N12 Gauges — 无差别，nian 实现质量更高 |
| Sparkline | [nian][变种 1/1] | vs N12 Charts — 无差别，nian 实现质量更高 |
| Cluster Grid | [nian] | nian 独特，Nothing 无等价 |
| Radial Pulse | [nian] | nian 独特，Nothing 无等价 |
| Timeline Track | [nian] | nian 独特，Nothing 无等价 |
| Bento Grid | [nian] | nian 独特，Nothing 无等价 |
| Article List | [nian] | nian 独特（hover translateX + badge 联动），与 N04 Data Row 不同 |
| Prose | [nian] | nian 独特（衬线+无衬线+等宽三体混排），Nothing 无完整排版规范 |
| Decorative Number Header | [N] | Nothing N23 |
| Three-Column Grid | [N] | Nothing N24 |

> **变种决策**：同族多个变种只保留质量最高的 1-2 个。Block Bar 保留（实现差异），Gauge/Sparkline 与 Nothing 等价但 nian 实现质量更高所以保留 nian 版本；Nothing 的 Charts 类作为参考保留在 Markdown 描述。

---

## 3. 组件规范

### 3.1 [N01] Card

**用途**：容器、卡片、面板、widget 基础。

**HTML:**
```html
<div class="card">
  <div class="card__tag">PERFORMANCE</div>
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
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  transition: border-color 150ms ease-out;
}
.card:hover { border-color: var(--border-visible); }
```

**变体**：`.card--compact`（padding 12px，radius 4px）、`.card--raised`（bg var(--surface-raised)）、`.card--dark`（bg var(--text-display)，color #fff）

---

### 3.2 [N02] Button

**HTML:**
```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--ghost">Ghost</button>
<button class="btn btn--accent">Accent</button>
<button class="btn btn--danger">Danger</button>
<button class="btn btn--primary btn--pill">Pill</button>
<button class="btn btn--primary btn--sm">Small</button>
```

**变体**：`primary / secondary / ghost / accent / danger` × `sm / default / lg` × `square / pill`

---

### 3.3 [N03] Input

```html
<div class="field">
  <label class="field__lbl">Label</label>
  <input class="field__inp" value="默认值">
</div>
<div class="field">
  <label class="field__lbl" style="color:var(--accent)">Error</label>
  <input class="field__inp field__inp--e" value="错误">
  <span class="field__msg">[ERROR] 错误消息</span>
</div>
```

---

### 3.4 [N04] Data Row

**变体**：Standard（分隔线）、Highlight（高亮背景）

---

### 3.5 [N05] Table

**特性**：行 hover、Space Mono 表头、cell padding 14/18px

---

### 3.6 [N07] Tag / Chip

**变种规则**：
- [N07] Tag = 单选标识（HTML/PDF/HTML）
- [mino] Filter Bar = 多选交互（分类1/分类2/分类3）
- 两者不冲突，分类不同

---

### 3.7 [N08] Segmented Control

**用途**：维度切换（Day/Week/Month）、视图切换

---

### 3.8 [N09] Period Nav

**用途**：时间周期步进

---

### 3.9 [N10] Toggle / Switch

**变体**：开关 + disabled

---

### 3.10 [N11] Segmented Progress Bar

**变种关系**：
- [N11] Seg Bar = 通用进度条（多条并列，单 label 单 value）
- [nian] Block Bar = 描述性进度条（单条带 title + desc）
- 两个都保留，因实现场景不同

---

### 3.11 [I04] Tension Grid （nian 独特）

**用途**：2×2 张力对叙事，深色整块。

**HTML:**
```html
<div class="tension-grid">
  <div class="tension-item">
    <div class="tension-item__number">01</div>
    <div class="tension-item__side">Brand <strong>vs</strong> Function</div>
    <div class="tension-item__side-en">Nature vs Technology</div>
    <p class="tension-item__desc">...</p>
  </div>
  <!-- 2-4 items -->
</div>
```

**关键**：必须用深色 section，不能塞白底 cell。

---

### 3.12 [N14] Overlay & Layering

**包含**：Modal、Bottom Sheet、Dropdown、Toast、Detail Panel

**Toast 两类**：
- Floating toast（右下角，2.5s 自动消失）
- Inline toast（行内 `[SAVED]` `[ERROR]` 提示）

---

### 3.13 [N15] State Patterns

**包含**：Error、Empty、Loading（segmented bar 动画）、Disabled（opacity 0.4）

---

### 3.14 [N16] Flow Pipeline

**变体**：Light + Dark，深色变体提供 `--dark` modifier

**决策**：深色场景在 HTML 中通过 `.flow-pipeline--dark` 切换，不再依赖外层 section 背景。

---

### 3.15 [N17] Do / Don't

**变体**：Light + Dark，深色变体提供 `--dark` modifier

---

### 3.16 [N18] Tab Panel

**JS**：data-tab + active class 切换

---

### 3.17 [N19] Accordion

**JS**：open class + display toggle

---

### 3.18 [N20] Asymmetric Comparison Table

**变体**：Light + Dark，sticky side column

---

### 3.19 [N21] Detail Panel

**JS**：active class + Escape 关闭

---

### 3.20 [N22] Checklist

**变体**：Standard、Interactive（点击 toggle）

---

### 3.21 [N23] Decorative Number Header

**特征**：大数字装饰 6% opacity，绝对定位

---

### 3.22 [N24] Three-Column Numbered Grid

**变体**：3 列 × 1-3 个 card

---

### 3.23 [N25] Flip Card

**约束**：仅 Light Mode。Dark Mode 退化为单面卡。

---

### 3.24 [N26] Stacked Image Cards

**JS**：点击顶部卡片轮换到堆底

---

### 3.25 [mino] Quote 4 变体

| 变体 | 用途 |
|------|------|
| `quote-minimal` | 极简竖线，正文内嵌 |
| `quote-editorial` | 杂志大引号，长引用 |
| `quote-highlight` | 荧光笔底色，金句 |
| `quote-terminal` | 暗色终端，技术语境 |

---

### 3.26 [mino] Code Panel 2 变体

| 变体 | 用途 |
|------|------|
| `code-macos` | 真实代码展示（macOS 窗口 chrome） |
| `code-clean` | 极简白底，嵌入正文 |

> 弃用：code-notebook（手写体）、code-typewriter（光标闪烁）— 与 nian 调性不符

---

### 3.27 [mino] Content 工具

- `chat-container` + `chat-bubble` — 用户/AI 对话
- `filter-bar` + `filter-tag` — 多选过滤（与 N07 Tag 区分）
- `hscroll-track` + `hscroll-card` — 横向滑动卡片
- `cal-grid` + `cal-cell` — 日历/追踪网格
- `carousel-container` + `carousel-slide` — 箭头轮播

---

### 3.28 [nian] 独特可视化

| 组件 | 变种关系 |
|------|---------|
| Block Bar | vs N11 Seg Bar（场景不同） |
| Gauge Arc | vs N12 Gauges（保留 nian 高质量版本） |
| Sparkline | vs N12 Charts（保留 nian 高质量版本） |
| Cluster Grid | Nothing 无等价 |
| Radial Pulse | Nothing 无等价 |
| Timeline Track | Nothing 无等价 |
| Bento Grid | Nothing 无等价 |
| Article List | vs N04 Data Row（hover + badge） |
| Prose | Nothing 无完整排版规范 |

---

### 3.29 [nian] Article List + Prose

**Article List**：左侧标题+元数据，右侧 badge，hover translateX 8px

**Prose**：衬线 Display + 无衬线 Body + 等宽 Mono 三体混排，blockquote 用 orange 左边线

---

## 4. 响应式与无障碍

```css
@media (max-width: 1024px) {
  .tension-grid { grid-template-columns: 1fr; }
  .compare-grid, .trio-grid { grid-template-columns: 1fr; }
  .bento-grid { grid-template-columns: repeat(2, 1fr); }
  .compare-table { grid-template-columns: 1fr; }
  .hero h1 { font-size: 48px; }
}
@media (max-width: 768px) {
  .hero h1 { font-size: 36px; }
  .hero::before { display: none; }
  .component-grid { grid-template-columns: 1fr; }
  .bento-card--wide, .bento-card--tall { grid-column: auto; grid-row: auto; }
  .flow-pipeline { flex-direction: column; align-items: flex-start; }
  .nav__links { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 5. 使用约定

1. **每个 HTML 文件只引用一个场景**，不要堆砌。
2. **组件优先从本 Markdown 复制**，不做二次发明。
3. **Hero / Content / Footer 结构完整**。
4. **数据用真实业务值**，禁用 `Math.random()`。
5. **深色组件用独立 Section 整块铺**，不塞白底 cell。
6. **变种组件标注清楚关系**，避免同族多个并存造成选型混乱。

---

## 6. 后续调用流程

```
调用 nian 组件库：
  1. 读 nian-components.md 查规范
  2. 复制对应组件的 HTML + CSS
  3. 按使用约定 #1-#6 执行
  4. 不需要再读 archive/ 下的旧 showcase 文件
```

---

## 7. 变更记录

| 日期 | 内容 |
|------|------|
| 2026-06-13 v1 | 整合 Nothing 26 + nian 20 + mino 8 = 54 个组件 |
| 2026-06-13 v1.1 | 深色组件拆为独立 Section 整块铺，补 Overlay/State/Widget 套件 |
| 2026-06-13 v1.2 | 标注变种关系（Block Bar/Seg Bar、Gauge/Sparkline） |

---

# Section 07 · SABC 数据叙事专项

> 来源：参考 SABC 标准化深度诊断原型（Nothing Design 风格）
> 5 个 SABC 专项组件，全部基于 Section 01-06 的基础组件扩展
> 色板：S 级 `#E8734A` / A 级 `#5A6878` / B 级 `#8B99A8` / C 级 `#B8C4D0`
> 风险色：危急 `#D71921` / 警告 `#D4A843` / 成功 `#4A9E5C`

---

## 7.1 KPI 指标卡（KPI Card）

**用途**：4 张一组的关键指标 + 红黄绿状态点 + 大字号数值 + 备注。

**HTML:**
```html
<div class="kpi-grid">
  <div class="kpi-card">
    <div class="kpi-label"><span class="status-dot red"></span>参评率</div>
    <div class="kpi-value">43.4<span class="kpi-unit">%</span></div>
    <div class="kpi-note">149 / 343 人达标<br>低于 60% 门槛</div>
  </div>
  <div class="kpi-card">
    <div class="kpi-label"><span class="status-dot yellow"></span>C 级率</div>
    <div class="kpi-value">39<span class="kpi-unit">%</span></div>
    <div class="kpi-note">参评 56 人中 22 人 C 级<br>高于 25% 警戒线</div>
  </div>
</div>
```

**CSS:**
```css
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.kpi-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}
.kpi-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 12px;
}
.kpi-value {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  color: var(--text-display);
  margin-bottom: 4px;
}
.kpi-unit {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-secondary);
  margin-left: 2px;
  font-weight: 400;
}
.kpi-note { font-size: 12px; color: var(--text-secondary); margin-top: 8px; line-height: 1.4; }

.status-dot {
  width: 8px; height: 8px; border-radius: 50%;
  display: inline-block; margin-right: 6px;
  vertical-align: middle;
}
.status-dot.red { background: var(--accent); }
.status-dot.yellow { background: var(--warning); }
.status-dot.green { background: var(--success); }
```

**特点**：用 `.` 这种小圆点（status-dot）代替 emoji 图标，三色对应三类风险。

---

## 7.2 状态点 Status Dot

**用途**：表格中的置信度标记（高/中/低），替代传统图章/emoji。

**HTML:**
```html
<span class="status-dot red"></span>高
<span class="status-dot yellow"></span>中
<span class="status-dot green"></span>低
```

**变体**：`.red` / `.yellow` / `.green` — 对应 `accent` / `warning` / `success` token。

---

## 7.3 数值色阶背景（Heatmap Cell）

**用途**：表格中数值列的强度色阶（如 S/C 倍差 >3× 暗红，1.5-3× 黄，<1.5× 绿）。

**HTML:**
```html
<td class="heat-cell heat-3x">3.4×</td>
<td class="heat-cell heat-2x">1.5×</td>
<td class="heat-cell heat-1x">1.2×</td>
```

**CSS:**
```css
.heat-cell {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  text-align: right;
  padding: 10px 12px;
}
.heat-3x { background: rgba(215, 25, 33, 0.18); color: #D71921; }
.heat-2x { background: rgba(212, 168, 67, 0.18); color: #B58F2A; }
.heat-1x { background: rgba(74, 158, 92, 0.12); color: #4A9E5C; }
```

**特点**：背景色阶而非文字色 — 色盲友好。原型的关键洞见。

---

## 7.4 断崖标注（Cliff Callout）

**用途**：折线图/柱状图拐点处，用阴影区+大字号倍数（`2.5×` `6.1×`）+ 虚线连接。

**HTML（用于 SVG 折线图内）:**
```html
<!-- 阴影区 -->
<rect x="378" y="40" width="24" height="220"
      fill="rgba(215,25,33,0.04)" rx="2"/>
<!-- 虚线分隔 -->
<line x1="390" y1="40" x2="390" y2="260"
      stroke="#D71921" stroke-width="0.5"
      stroke-dasharray="4 3" opacity="0.5"/>
<!-- 拐点 callout box -->
<rect x="100" y="320" width="520" height="32" rx="6"
      fill="var(--surface-raised)" stroke="var(--border)"/>
<text x="116" y="340" font-size="11" font-weight="700" fill="#D71921">拐点</text>
<text x="370" y="340" font-size="16" font-weight="700" fill="#D71921">2.5×</text>
```

**要点**：
- 阴影区宽度 ≈ 单个数据柱的 1.5 倍
- 倍数用 Doto/Space Mono 大字号（16-20px），与正文（10-11px）形成层级
- 红色虚线连接数据点与 callout box

---

## 7.5 SABC 四色等级编码

**用途**：四个等级四个固定色，专用于 SABC 评级场景。

```css
:root {
  --sabc-s: #E8734A;  /* S 级暖橙 */
  --sabc-a: #5A6878;  /* A 级灰蓝 */
  --sabc-b: #8B99A8;  /* B 级浅灰蓝 */
  --sabc-c: #B8C4D0;  /* C 级冷灰 */
}
.sabc-s { color: var(--sabc-s); }
.sabc-a { color: var(--sabc-a); }
.sabc-b { color: var(--sabc-b); }
.sabc-c { color: var(--sabc-c); }
.sabc-bar-s { background: var(--sabc-s); }
.sabc-bar-a { background: var(--sabc-a); }
.sabc-bar-b { background: var(--sabc-b); }
.sabc-bar-c { background: var(--sabc-c); }
```

**使用场景**：
- 堆叠柱状图（SABC 人数分布）
- 转化率对比条形图
- 等级徽章
- 进度条分段

---

## 7.6 优先级标签（Priority Tag）

**用途**：行动卡片的 P0/P1/P2 标签。

**HTML:**
```html
<span class="priority-tag p0">P0</span>
<span class="priority-tag p1">P1</span>
<span class="priority-tag p2">P2</span>
```

**CSS:**
```css
.priority-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: 2px;
}
.priority-tag.p0 { background: #D71921; color: #fff; }
.priority-tag.p1 { background: #D4A843; color: #fff; }
.priority-tag.p2 { background: #8B99A8; color: #fff; }
```

---

## 7.7 编辑工具条（Edit Toolbar）

**用途**：报告页面右上角的固定编辑/撤销/重做/导出 4 按钮胶囊。

**HTML:**
```html
<div class="ne-toolbar">
  <button id="ne-toggle">编辑</button>
  <span class="ne-sep"></span>
  <button id="ne-undo" disabled>撤销</button>
  <button id="ne-redo" disabled>重做</button>
  <span class="ne-sep"></span>
  <button id="ne-export">导出</button>
</div>
```

**CSS:**
```css
.ne-toolbar {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--surface);
  border: 1px solid var(--border-visible);
  border-radius: 999px;
  padding: 4px 8px;
  z-index: 100;
}
.ne-toolbar button {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: transparent;
  border: none;
  color: var(--text-primary);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 999px;
}
.ne-toolbar button:hover { background: var(--surface-raised); }
.ne-toolbar button:disabled { color: var(--text-disabled); cursor: not-allowed; }
.ne-sep { width: 1px; height: 16px; background: var(--border); }
```

---

## 7.8 数据叙事字体策略（SABC 报告专用）

```css
:root {
  --font-display: "Doto", "Space Mono", monospace;   /* KPI 大数字、倍数 */
  --font-body: "Space Grotesk", "DM Sans", system-ui, sans-serif;  /* 正文 */
  --font-mono: "Space Mono", "JetBrains Mono", monospace;  /* 数据、标签、表格 */
}
```

**字体分工**：
- `font-display` (Doto): KPI value、倍数（2.5×）、关键拐点
- `font-body` (Space Grotesk): 标题、描述段落、卡片文案
- `font-mono` (Space Mono): 表格数值、标签、状态点、轴标签

---

# 7.9 跟 Nothing Design 的对应关系

| SABC 原型 | nian 组件库 | 状态 |
|----------|------------|------|
| KPI 4 卡红绿灯 | 7.1 KPI Card + 7.2 Status Dot | 新增 |
| SABC 等级编码 | 7.5 SABC 四色 | 新增（独立组件） |
| 表格 S/C 倍差色阶 | 7.3 Heatmap Cell | 新增 |
| 折线图断崖标注 | 7.4 Cliff Callout | 新增（SVG 注释规范） |
| P0/P1/P2 行动卡 | 7.6 Priority Tag | 新增 |
| 右上角编辑工具条 | 7.7 Edit Toolbar | 新增（交互） |
| Doto/Space Grotesk/Space Mono 三体混排 | 7.8 字体策略 | 沉淀到 token |

---

# 7.10 通用使用约定（基于原型观察）

1. **表格数字用 Space Mono 加粗**，正文用 Space Grotesk — 数据感来自字体分工
2. **置信度用 status-dot 三色圆点**，永远不直接用 emoji 或大图标
3. **关键数字（倍数、增长）用 Doto 加粗到 16-20px**，与正文 10-11px 形成强烈层级
4. **断崖用阴影区+红色虚线+callout box** 三件套，缺一不可
5. **SABC 四色只在等级场景使用**，不要挪作他用
6. **背景色阶比文字色更友好**（色盲考虑）— 倍差用 heat-cell 背景，不用红字
7. **章节标题用 Chapter 范式**：chapter-label (Space Mono uppercase) + chapter-title (24-28px medium) + chapter-subtitle (灰色 14px)

---

*补充自 SABC 标准化深度诊断原型（2026-05 版），用于支撑数据叙事型报告的视觉一致性*
