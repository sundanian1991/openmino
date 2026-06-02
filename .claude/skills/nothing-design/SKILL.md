---
name: nothing-design
description: "Nothing 风格 UI/UX 设计系统，受瑞士排版和工业设计启发，强调单色、字体驱动和信息密度。仅在用户明确提到'Nothing style'或'/nothing-design'时触发，不自动响应通用设计任务。"
version: 3.0.0
allowed-tools: [Read, Write, Edit, Glob, Grep]
---
# Nothing-Inspired UI/UX Design System
A senior product designer's toolkit trained in Swiss typography, industrial design (Braun, Teenage Engineering), and modern interface craft. Monochromatic, typographically driven, information-dense without clutter. Dark and light mode with equal rigor.

**Before starting any design work, declare which Google Fonts are required and how to load them** (see `references/tokens.md` Section 1). Never assume fonts are already available.

---
## 1. DESIGN PHILOSOPHY
- **Subtract, don't add.** Every element must earn its pixel. Default to removal.
- **Structure is ornament.** Expose the grid, the data, the hierarchy itself.
- **Monochrome is the canvas.** Color is an event, not a default — except when encoding data status (see Section 3).
- **Type does the heavy lifting.** Scale, weight, and spacing create hierarchy — not color, not icons, not borders.
- **Both modes are first-class.** Dark mode: OLED black. Light mode: warm off-white. Neither is "derived" — both get full design attention. Ask the user which mode to start with.
- **Industrial warmth.** Technical and precise, but never cold. A human hand should be felt.

---
## 2. CRAFT RULES — HOW TO COMPOSE

### 2.1 Visual Hierarchy: The Three-Layer Rule
Every screen has exactly **three layers of importance.** Not two, not five. Three.

| Layer | What | How |
|-------|------|-----|
| **Primary** | The ONE thing the user sees first. A number, a headline, a state. | Doto or Space Grotesk at display size. `--text-display`. 48–96px breathing room. |
| **Secondary** | Supporting context. Labels, descriptions, related data. | Space Grotesk at body/subheading. `--text-primary`. Grouped tight (8–16px) to the primary. |
| **Tertiary** | Metadata, navigation, system info. Visible but never competing. | Space Mono at caption/label. `--text-secondary` or `--text-disabled`. ALL CAPS. Pushed to edges or bottom. |

**The test:** Squint at the screen. Can you still tell what's most important? If two things compete, one needs to shrink, fade, or move.

**Common mistake:** Making everything "secondary." Evenly-sized elements with even spacing = visual flatness. Be brave — make the primary absurdly large and the tertiary absurdly small. The contrast IS the hierarchy.

### 2.2 Font Discipline
Per screen, use maximum:
- **2 font families** (Space Grotesk + Space Mono. Doto only for hero moments.)
- **3 font sizes** (one large, one medium, one small)
- **2 font weights** (Regular + one other — usually Light or Medium, rarely Bold)

Think of it as a budget. Every additional size/weight costs visual coherence. Before adding a new size, ask: can I create this distinction with spacing or color instead?

| Decision | Size | Weight | Color |
|----------|:---:|:---:|:---:|
| Heading vs. body | Yes | No | No |
| Label vs. value | No | No | Yes |
| Active vs. inactive nav | No | No | Yes |
| Hero number vs. unit | Yes | No | No |
| Section title vs. content | Yes | Optional | No |

**Rule of thumb:** If reaching for a new font-size, it's probably a spacing problem. Add distance instead.

### 2.3 Spacing as Meaning
Spacing is the primary tool for communicating relationships.
```
Tight (4–8px) = "These belong together" (icon + label, number + unit)
Medium (16px) = "Same group, different items" (list items, form fields)
Wide (32–48px) = "New group starts here" (section breaks)
Vast (64–96px) = "This is a new context" (hero to content, major divisions)
```
**If a divider line is needed, the spacing is probably wrong.** Dividers are a symptom of insufficient spacing contrast. Use them only in data-dense lists where items are structurally identical.

### 2.4 Container Strategy (prefer top)
1. **Spacing alone** (proximity groups items)
2. A single divider line
3. A subtle border outline
4. A surface card with background change

Each step down adds visual weight. Use the lightest tool that works. Never box the most important element — let it float on the background.

### 2.5 Color as Hierarchy
In a monochrome system, the gray scale IS the hierarchy. Max 4 levels per screen:
```
--text-display (100%) → Hero numbers. One per screen.
--text-primary (90%) → Body text, primary content.
--text-secondary (60%) → Labels, captions, metadata.
--text-disabled (40%) → Disabled, timestamps, hints.
```
**Red (#D71921) is not part of the hierarchy.** It's an interrupt — "look HERE, NOW." If nothing is urgent, no red on the screen.

**Data status colors** (success green, warning amber, accent red) are exempt from the "one accent" rule when encoding data values. Apply color to the **value itself**, not labels or row backgrounds. See `references/tokens.md` for the full color system.

### 2.6 Consistency vs. Variance
**Be consistent in:** Font families, label treatment (always Space Mono ALL CAPS), spacing rhythm, color roles, component shapes, alignment.

**Break the pattern in exactly ONE place per screen:** An oversized number, a circular widget among rectangles, a red accent among grays, a Doto headline, a vast gap where everything else is tight.

This single break IS the design. Without it: sterile grid. With more than one: visual chaos.

### 2.7 Compositional Balance
**Asymmetry > symmetry.** Centered layouts feel generic. Favor deliberately unbalanced composition:
- **Large left, small right:** Hero metric + metadata stack.
- **Top-heavy:** Big headline near top, sparse content below.
- **Edge-anchored:** Important elements pinned to screen edges, negative space in center.

Balance heavy elements with more empty space, not with more heavy elements.

### 2.8 The Nothing Vibe
1. **Confidence through emptiness.** Large uninterrupted background areas. Resist filling space.
2. **Precision in the small things.** Letter-spacing, exact gray values, 4px gaps. Micro-decisions compound into craft.
3. **Data as beauty.** `36GB/s` in Space Mono at 48px IS the visual. No illustrations needed.
4. **Mechanical honesty.** Controls look like controls. A toggle = physical switch. A gauge = instrument.
5. **One moment of surprise.** A dot-matrix headline. A circular widget. A red dot. Restraint makes the one expressive moment powerful.
6. **Percussive, not fluid.** Imagine UI sounds: click not swoosh, tick not chime. Design transitions that feel mechanical and precise.

### 2.9 Visual Variety in Data-Dense Screens
When 3+ data sections appear on one screen, vary the visual form:

| Form | Best for | Weight |
|------|----------|--------|
| Hero number (large Doto/Space Mono) | Single key metric | Heavy — use once |
| Segmented progress bar | Progress toward goal | Medium |
| Concentric rings / arcs | Multiple related percentages | Medium |
| Inline compact bar | Secondary metrics in rows | Light |
| Number-only with status color | Values without proportion | Lightest |
| Sparkline | Trends over time | Medium |
| Stat row (label + value) | Simple data points | Light |

Lead section → heaviest treatment. Secondary → different form. Tertiary → lightest. The FORM varies, the VOICE stays the same.

---
## 3. ANTI-PATTERNS — WHAT TO NEVER DO
- No gradients in UI chrome
- No shadows. No blur. Flat surfaces, border separation.
- No skeleton loading screens. Use `[LOADING...]` text or segmented spinner.
- No toast popups. Use inline status text: `[已保存]`, `[错误：...]`
- No sad-face illustrations, cute mascots, or multi-paragraph empty states
- No zebra striping in tables
- No filled icons, multi-color icons, or emoji as UI
- No parallax, scroll-jacking, or gratuitous animation
- No spring/bounce easing. Use subtle ease-out only.
- No border-radius > 16px on cards. Buttons are pill (999px) or technical (4–8px).
- Data visualization: differentiate with **opacity** (100%/60%/30%) or **pattern** (solid/striped/dotted) before introducing color.

---
## 4. WORKFLOW
1. **Declare fonts** — tell the user which Google Fonts to load (see `references/tokens.md`)
2. **Ask mode** — dark or light? Neither is default.
3. **Sketch hierarchy** — identify the 3 layers before writing any code
4. **Compose** — apply craft rules (Sections 2.1–2.9)
5. **Check tokens** — consult `references/tokens.md` for exact values
6. **Build components** — consult `references/components.md` for patterns
7. **Adapt to platform** — consult `references/platform-mapping.md` for output conventions
8. **Inject editor** — if output is HTML, inject inline editor (see Section 6)

---
## 5. REFERENCE FILES
For detailed token values, component specs, and platform-specific guidance:
- **`references/tokens.md`** — Fonts, type scale, color system (dark + light), spacing scale, grid, motion, iconography, dot-matrix motif
- **`references/components.md`** — Cards, buttons, inputs, lists, tables, nav, tags, segmented controls, progress bars, charts, widgets, overlays, state patterns
- **`references/platform-mapping.md`** — HTML/CSS, SwiftUI, React/Tailwind, Paper output conventions

---
## 6. INLINE EDITOR — BROWSER-EDITABLE HTML

> When the output platform is HTML, inject an inline editor so the user can edit directly in the browser. No round-trip back to AI.

### 6.1 Editor Capabilities

| Level | Feature | Behavior |
|-------|---------|----------|
| **P0** | Edit mode toggle | Top-right button: `编辑` / `编辑中` with red highlight |
| **P0** | Full text editing | All `[data-edit]` elements become `contenteditable` in edit mode |
| **P0** | Edit state indicator | Three-layer feedback: button turns red + page `inset` red border + bottom `编辑模式` label |
| **P0** | Export clean HTML | Strip editor code + `data-edit` + `contenteditable`, download as `.html` |
| **P1** | Undo / Redo | MutationObserver snapshots (500ms debounce, max 50). `撤销` / `重做` buttons in toolbar |
| **P1** | Inline toast feedback | `[已保存]` `[已撤销]` `[已重做]` `[已导出]` — short-lived, no popup |

### 6.2 Editable Elements

**Marking convention**: Add `data-edit` attribute to all user-facing text elements. In edit mode, these become `contenteditable="true"`.

| Element | Selector | Example |
|---------|----------|---------|
| Hero numbers | `.hero-num` | `<span class="hero-num" data-edit>36.4</span>` |
| Hero units | `.hero-unit` (inside `.hero-num`) | `<span class="hero-unit">GB/s</span>` — inherits edit from parent |
| Labels | `.lab` | `<div class="lab" data-edit>Throughput</div>` |
| Row labels | `.rl` | `<span class="rl" data-edit>Uptime</span>` |
| Row values | `.rv` | `<span class="rv" data-edit>99.97%</span>` |
| Tags | `.tag` | `<span class="tag" data-edit>Production</span>` |

**Not editable**: `<svg>` children, `<style>`, `<script>`, progress bar segments (width controlled via attribute panel, not text).

### 6.3 Editor Injection

Inject before `</body>` with comment markers for clean export:

```html
<!-- Nothing Editor 注入开始 -->
<style id="ne-styles">/* Editor CSS */</style>
<div id="ne-toolbar">
  <button id="ne-toggle">编辑</button>
  <span class="ne-sep"></span>
  <button id="ne-undo" disabled>撤销</button>
  <button id="ne-redo" disabled>重做</button>
  <span class="ne-sep"></span>
  <button id="ne-export">导出</button>
</div>
<div class="ne-mode-label" id="ne-mode">浏览</div>
<div class="ne-toast" id="ne-toast"></div>
<script>/* Editor JS */</script>
<!-- Nothing Editor 注入结束 -->
```

**Injection condition**:

| Condition | Action |
|-----------|--------|
| Default (HTML output) | Inject editor |
| User says "演示用" / "最终版" / "直接发" / "不要编辑器" | Skip injection |

### 6.4 Editor Visual Design

The editor follows Nothing design principles — monochrome, mechanical, precise:

- **Toolbar**: Fixed top-right, pill buttons, `--surface` background, `--border` outlines
- **Edit mode**: Page gets `inset` 2px red `#D71921` border (not a separate frame — the page IS the frame)
- **Editable elements**: Dashed outline `transparent` → hover `rgba(255,255,255,.1)` → focus `#D71921`
- **Toast**: White pill on dark, black pill on light. 1.2s fade, no animation
- **Mode label**: `Space Mono` 9px, letter-spacing 3px, `--text3` color（中文内容不做 ALL CAPS 转换）

### 6.5 Editor JS Logic (Summary)

```
1. Toggle: click 编辑 → body.editing → [data-edit].contentEditable = true → start MutationObserver
2. Snapshot: MutationObserver (500ms debounce) → push to undoStack, clear redoStack, max 50
3. Undo: swap current innerHTML ↔ undoStack.pop(), push to redoStack
4. Redo: swap current innerHTML ↔ redoStack.pop(), push to undoStack
5. Export: clone document → strip editor markers/data-edit/contenteditable → Blob download
6. Keyboard: Enter = save + blur, Escape = blur (no save)
7. Toast: show for 1.2s on undo/redo/export
```

### 6.6 Anti-Patterns for Editor

- No rich text toolbar (bold/italic/underline) — Nothing text doesn't need inline formatting changes
- No drag-and-drop section reorder — layout is deliberate, not rearrangeable
- No image upload/replace
- No localStorage persistence — each open is fresh state
- No property panel for CSS tweaks — if layout needs changing, redesign in AI
- No toast popups for saves — inline text `[已保存]` only (per Section 3 anti-patterns)

### 6.7 Edit vs. Create Boundary

| Task | Do in | Why |
|------|-------|-----|
| Change a number or label | Browser editor | Content tweak, no design decision |
| Add/remove a data row | Browser editor | Structural but local |
| Change color or layout | AI conversation | Design system constraint, needs validation |
| Add a new section | AI conversation | Affects three-layer hierarchy |
| Switch dark/light mode | AI conversation | Full palette swap, not a text edit |

---
## 7. SHOWCASE & EVOLUTION

### 7.1 自动存档规则

每次产出最终 HTML 后，复制一份到 `references/showcase/`，命名格式 `YYYY-MM-DD-主题简述.html`。

**筛选标准**：只存最终版，不存中间迭代（v1/v2 除非设计有本质变化）。同一主题多次产出只保留最新。

### 7.2 Showcase 目录

`references/showcase/` — 按日期+主题命名的设计作品集。

启动时可回看近 3 份产出，校准设计水准。

### 7.3 Evolution Log

记录每次回溯评审发现的调整，不修改核心设计原则。

> **格式**：`| 日期 | 发现 | 调整 |`
>
> 核心原则（Section 1-2）是价值观，不是参数。Evolution Log 只记录 tokens/components 层面的微调，以及"常见错误"的补充。

| 日期 | 发现 | 调整 |
|------|------|------|
| 2026-05-26 | 初始化 showcase，收录 12 份历史产出 | 建档 |
| 2026-05-27 | 补充 7 份 review 目录产出至 showcase（共 21 份） | 同步 |
| 2026-05-30 | 32份评审发现：字号纪律（多尺寸混用）是系统性扣分点；4种形态（单卡/排名条/策展/规则矩阵）占比过高属惯性非偏好 | 新增6种形态示范（区位矩阵/关联矩阵/分面条形/工业组件/图案分化/因果瀑布），均27+分 |
| 2026-05-30 | 形态选型洞察：地图→区位矩阵、节点连线→关联矩阵、雷达图→分面条形——同数据关系换视觉形态可大幅提升清晰度 | 将"选对形态比画对图表重要"纳入 Section 2.9 视觉多样化指引 |
| 2026-05-30 | 图案分化能力：CSS gradient + SVG pattern 可实现6种可区分填充（实心/水平线/点阵/斜线/交叉线/棋盘），彻底解决7色供应商编码违反单色约束的问题 | 补充至 Section 2.5 作为 data status colors 的单色替代方案 |
| 2026-05-30 | 图案分化被否决：6种纹理填充视觉上比6色更吵，违反 Subtract 原则。正确方案是——单色系统中供应商身份靠位置+标签区分，颜色只编码状态（达标/预警/警告） | 从 showcase 移除图案分化 demo |
| 2026-05-30 | 暗色模式示范：OLED #000000 基底，色板完整反转（--tx1:#FFF, --card:#111, --border:#222），LED卡片从黑底绿字变为深灰底绿字，视觉锚点不变 | 首个暗色 demo 入 showcase |
| 2026-05-30 | 点阵标题：CSS grid 5×7 点阵渲染字形，4px dot + 3px gap + border-radius:50%，点状状态指示器（5点=满状态）替代进度条 | 适用于 hero moment 和机械感 accent |
| 2026-05-30 | 趋势线：SVG polyline 160×32px，无轴线/无刻度/无标签，末端 r2.5 圆点用状态色，线体保持 #1A1A1A | 新增视觉模式 Sparkline |
| 2026-05-30 | 非对称构图：三个手法（大小悬殊 >8:1、权重不均 2/3+1/3、留白偏置）替代对称网格，对比示范证明"每个框一样重要=没有东西重要" | 补充 Section 2.7 构图手法的视觉证据 |

### 7.4 回溯评审触发

- 年老师主动要求时
- 累计新增 5 份产出后自动提醒
- 评审内容：对照 Section 2 规则检查近期产出的一致性和质量
