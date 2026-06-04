---
name: viz-diagram-design
description: 创建技术/产品图表 — 架构图、流程图、时序图、状态机、ER 模型、时间线、泳道图、象限图、树形图、维恩图、金字塔等，输出为含内联 SVG 的独立 HTML 文件。
license: MIT
metadata:
  version: "2.1"
---

# Diagram Design

Create visual diagrams as self-contained HTML files with inline SVG and CSS, following an opinionated editorial design system.

Fourteen diagram types. One shared design system, complexity budget, and taste gate. Type-specific conventions live in `references/` and are loaded only when you pick a type.

---

## 0. First-time setup — style guide gate

**Before generating your first diagram in a new project, verify the style guide has been customized.**

Open [`references/style-guide.md`](references/style-guide.md) and check the default tokens. If they're still the shipped defaults (paper `#faf7f2`, ink `#1c1917`, accent `#b5523a` rust), **pause and ask the user**:

> *"This is your first diagram in this project. The style guide is still at the default (neutral stone + rust). Do you want to customize it to match your brand first? Options: (a) run onboarding — I'll pull colors and fonts from your website, (b) paste your tokens manually, (c) proceed with the default for now."*

Then branch:
- **(a)** → follow [`references/onboarding.md`](references/onboarding.md) to fetch the site, extract palette + fonts, propose a diff, and write `style-guide.md`.
- **(b)** → accept the user's tokens and write them into `style-guide.md` under a new "Custom tokens" section.
- **(c)** → proceed; optionally remind the user they can run onboarding later.

**Once the style guide has been customized** (or the user explicitly opted for default), skip this gate on subsequent runs. A simple way to detect customization: if the `accent` value in `style-guide.md` differs from `#b5523a`, assume custom.

Don't silently ship default-skinned diagrams into a branded project — that's the failure mode this gate exists to prevent.

---

## Phase 0: Intent & Spec (MANDATORY — before rendering)

**Before writing any SVG, produce a planning block as an HTML comment.** This is not optional — it locks intent, type decision, and spatial budget before any element is drawn.

```html
<!-- PHASE 0: INTENT & SPEC
Intent: <1-sentence: what question does this diagram answer?>
Type: <diagram type>
  Why this type: <1 sentence>
  Why not alternatives: <1 sentence>
Content distillation: <from input → N nodes, M relationships>
  Over budget? <yes → split to Diagram A + B | no>
Focal elements: <1-2 max, name them>
Layout budget:
  Canvas: W×H, padding: 40
  Nodes: <list with x,y,w,h>
  Max Y: <value>, viewBox H: <value + 80>
  Spacing check: min gap ≥ 20px ✓/✗
-->
```

**Why this matters:** Without Phase 0, diagrams are drawn "as you think" — nodes collide, accents scatter, budgets blow. With Phase 0, the plan is locked first and the SVG fills in the plan. This is the single biggest quality lever.

**If the decision is "don't draw"** (content is a list or table), skip SVG entirely and tell the user what format would work better. See §1.1 Type Decision Gate below.

---

## 1. Philosophy

**The highest-quality move is usually deletion.**

From `.impeccable.md`: *"Confident restraint. Earn every element. One color accent, two families, a small spacing vocabulary. If removing it wouldn't hurt the page, remove it."*

Applied to diagrams:
- Every node represents a distinct idea. Two nodes that always travel together are one node.
- Every connection carries information. If the relationship is obvious from layout, remove the line.
- Accent is **editorial, not a flag.** 1–2 focal nodes per diagram. Using it on 5 nodes erases the signal.
- The diagram isn't done when everything is added. It's done when nothing can be removed.

**Target density: 4/10.** Enough to be technically complete. Not so dense it needs a guide. Above 9 nodes, it's probably two diagrams.

---

### 1.1 Type Decision Gate

**Before picking a diagram type, classify the content first.**

| Content shape | Decision | Diagram type |
|---|---|---|
| Pure list of items | **Don't draw** → use bullets or table | — |
| Simple before/after | **Don't draw** → use table | — |
| One-shape "diagram" | **Don't draw** → write the sentence | — |
| Components + connections | Draw | **Architecture** |
| Decision logic with branches | Draw | **Flowchart** |
| Time-ordered messages between actors | Draw | **Sequence** |
| States + transitions + guards | Draw | **State machine** |
| Entities + fields + relationships | Draw | **ER / data model** |
| Events positioned in time | Draw | **Timeline** |
| Cross-functional process with handoffs | Draw | **Swimlane** |
| Two-axis positioning / prioritization | Draw | **Quadrant** |
| Hierarchy through containment / scope | Draw | **Nested** |
| Parent → children relationships | Draw | **Tree** |
| Human/agent/team ownership, reporting, routing, escalation | Draw | **Org chart** |
| Stacked abstraction levels | Draw | **Layer stack** |
| Overlap between sets | Draw | **Venn** |
| Ranked hierarchy or conversion drop-off | Draw | **Pyramid / funnel** |

**Always load the relevant `references/type-*.md` before drawing** — it contains layout conventions, anti-patterns, and example files for that type.

**Never force a diagram shape onto non-diagram content.** If the content is fundamentally a list, a table, or a single sentence — say so and don't draw.

---

## 2. When to Use

Use for any of the 13 diagram types (§1.1) when a reader will learn more from a visual than from prose, a table, or a bulleted list.

Before drawing, ask: *Would the reader learn more from this than from a well-written paragraph?* If no, don't draw.

---

## 3. Universal Anti-patterns

These mark "AI slop" diagrams of any type:

| Anti-pattern | Why it fails |
|---|---|
| Dark mode + cyan/purple glow | Looks "technical" without design decisions |
| JetBrains Mono as blanket "dev" font | Mono is for *technical* content — ports, commands, URLs. Names go in Geist sans. |
| Identical boxes for every node | Erases hierarchy |
| Legend floating inside the diagram area | Collides with nodes |
| Arrow labels with no masking rect | Bleeds through the line |
| Vertical `writing-mode` text on arrows | Unreadable |
| 3 equal-width summary cards as default | Generic grid — vary widths |
| Shadow on any element | Shadows are out. Borders are in. |
| `rounded-2xl` on boxes | Max radius 6–10px or none |
| Accent on every "important" node | Accent is 1–2 editorial accents, not a signaling system |
| Emoji in diagrams (📁, └──, ✅) | AI slop pattern — never |
| Non-standard colors not in style-guide | Breaks design system consistency |

Type-specific anti-patterns live in each `references/type-*.md`.

---

## 4. Design System

**The design system is skinnable.** All colors, typography, and tokens live in a single source of truth — [`references/style-guide.md`](references/style-guide.md). This file describes semantic roles (`paper`, `ink`, `muted`, `accent`, `link`, …).

> When specs below or in type references mention "ink", "accent", "muted", etc., look up the current hex value in `style-guide.md`.

### Semantic roles (at a glance)

| Role | Purpose |
|---|---|
| `paper`, `paper-2` | Page bg and container bg |
| `ink` | Primary text / stroke |
| `muted`, `soft` | Secondary text, default arrows, sublabels |
| `rule`, `rule-solid` | Hairline borders |
| `accent`, `accent-tint` | 1–2 focal elements per diagram |
| `link` | HTTP/API calls, external arrows |

**Focal rule:** `accent` goes on 1–2 elements max. Everything else is `ink` / `muted` / `soft`. If you're tempted to accent 4 things, you haven't decided what's focal yet.

### Typography (summary — full spec in style-guide.md)

- **Title** — Instrument Serif, 1.75rem, 400 — H1 only
- **Node name** — Geist (sans), 12px, 600 — human-readable labels
- **Sublabel** — Geist Mono, 9px — ports, URLs, field types
- **Eyebrow / tag** — Geist Mono, 7–8px, uppercase, tracked — type tags, axis labels
- **Arrow label** — Geist Mono, 8px — annotation on arrows
- **Editorial aside** — Instrument Serif *italic*, 14px — callouts only

**Mono is for technical content.** Names are Geist sans. Page title is Instrument Serif. Italic Instrument Serif is reserved for annotation callouts. Never JetBrains Mono as a blanket "dev" font.

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 5. SVG Primitives

**All SVG rendering patterns live in [`references/rendering-primitives.md`](references/rendering-primitives.md).** This includes: background pattern, arrow markers, node box templates, arrow label masking, legend placement, and editorial callouts.

Read that file when you are about to write SVG elements. Do not invent your own SVG patterns — copy from the reference.

**Key rules (summary):**
- Arrows drawn before boxes (z-order: lines behind nodes)
- Every arrow label has an opaque `fill="#f5f4ed"` rect behind it
- Legend is a horizontal bottom strip, never floating inside the diagram area
- All colors from `style-guide.md` tokens only

---

## 6. Layout & Spacing

### 4px grid

**All values — font sizes, padding, node dimensions, gaps, x/y coords — divisible by 4.** Non-negotiable.

| Category | Allowed values |
|---|---|
| Font sizes | 8, 12, 16, 20, 24, 28, 32, 40 |
| Node width / height | 80, 96, 112, 120, 128, 140, 144, 160, 180, 200, 240, 320 |
| x / y coordinates | multiples of 4 |
| Gap between nodes | 20, 24, 32, 40, 48 |
| Padding inside boxes | 8, 12, 16 |
| Border radius | 4, 6, 8 |

Exempt: stroke widths (0.8, 1, 1.2), opacity values, and the 22×22 dot-pattern.

Quick check: if a coordinate ends in 1, 2, 3, 5, 6, 7, 9 — fix it.

### Complexity budget (per diagram)

| Limit | Rule |
|---|---|
| Max nodes | 9 |
| Max arrows / transitions | 12 |
| Max accent elements | 2 |
| Max lifelines (sequence) | 5 |
| Max lanes (swimlane) | 5 |
| Max items (quadrant) | 12 |
| Max entities (ER) | 8 |
| Max nesting levels (nested) | 6 |
| Max tree depth | 4 |
| Max org chart depth | 4 |
| Max org chart nodes | 12 |
| Max layers (layer stack) | 6 |
| Max circles (venn) | 3 |
| Max layers (pyramid) | 6 |
| Max annotation callouts | 2 |

If you exceed, split into two diagrams (overview + detail).

### Spatial Budget Gate (pre-calculation)

**Before rendering any element, produce a spatial budget table.** This catches the overlap/collision bug that appears at the complexity limit.

**Step 1 — Canvas declaration:**

```
Diagram area: W × H, padding: 40 (all sides)
Available interior: (W-80) × (H-80) = X × Y
```

**Step 2 — Element budget:**

List every element with its bounding box. All coords and sizes divisible by 4.

```
Element       | x   | y   | w   | h   | notes
─────────────────────────────────────────────
Header        | 40  | 40  | 1120| 80  | eyebrow + h1
Node: Gateway | 80  | 160 | 160 | 80  | backend
Node: Auth    | 320 | 160 | 140 | 80  | backend
Node: DB      | 560 | 160 | 120 | 80  | store
Node: Cache   | 80  | 320 | 140 | 80  | store
Node: Queue   | 320 | 320 | 160 | 80  | backend
Arrows (5)    | —   | —   | —   | —   | drawn before boxes
Legend strip  | 40  | 440 | 1120| 60  | bottom strip
─────────────────────────────────────────────
Total height used: 40+80+80+80+60 = 420 + padding(40×2) = 500 ≤ 500 ✅
```

**Step 3 — Proximity matrix (minimum spacing ≥ 20px):**

For each node, find the nearest neighbor and verify the gap.

```
Node          | Nearest neighbor | Horizontal gap | Vertical gap | Min
────────────────────────────────────────────────────────────────────
Gateway       | Auth             | 80             | —            | 80
Auth          | DB               | 100            | —            | 100
Gateway       | Cache            | —              | 80           | 80
Cache         | Queue            | 100            | —            | 100
Auth          | Queue            | —              | 80           | 80
────────────────────────────────────────────────────────────────────
Minimum spacing: 80px ≥ 20px ✓
```

**Step 4 — Collision check:**

- [ ] No two node rectangles overlap (both x-intervals and y-intervals checked)
- [ ] Every text label fits inside its container width
- [ ] No arrow passes through a non-target node
- [ ] Legend strip is below all nodes with ≥ 20px gap
- [ ] viewBox height covers all elements + 40px safety margin

**Fail condition:** If any spacing < 20px or any collision detected → reduce node count, increase canvas size, or split into two diagrams. Do not render until the budget passes.

> This is not optional. Even experienced AI models introduce 10–50 px errors when mapping elements to pixel positions. The budget catches them before they ship.

### Page layout

1. **Header** — eyebrow (Geist Mono), title (Instrument Serif), optional subtitle (Geist muted).
2. **Diagram container** — `#efeee5` bg, 1px `rgba(11,13,11,0.12)` border, 8px radius, `overflow-x: auto`.
3. **Summary cards** — 2–3 col grid with *varied* widths (e.g., `1.1fr 1fr 0.9fr`).
4. **Footer** — colophon in Geist Mono, muted, hairline top border.

---

## 7. Summary Card Pattern

Don't use 3 identical generic cards. Vary the treatment:

```html
<div class="card">
  <p class="eyebrow">SECTION LABEL</p>
  <div class="card-header">
    <span class="card-dot coral"></span>
    <h3>Card Title</h3>
  </div>
  <ul><li>Item</li></ul>
</div>
```

Rules:
- `background: #ffffff` (not paper — slight lift without shadow)
- `border: 1px solid rgba(11,13,11,0.12)`
- `border-radius: 6px`, `padding: 1.25rem`
- **No `box-shadow`**
- Card dots: 7px, `border-radius: 50%` — ink / muted / coral / link / soft variants

---

## 8. Pre-Output Checklist (Taste Gate)

**Full checklist lives in [`references/taste-gate.md`](references/taste-gate.md).** Run it before outputting any diagram.

**Quick check (top 5 — if any fail, stop and fix):**
- [ ] Accent used on ≤2 elements?
- [ ] Every arrow label has opaque mask rect?
- [ ] No node rectangle overlaps another?
- [ ] Every coord/size divisible by 4?
- [ ] All colors from style-guide.md tokens?

If any of these fail → do not output. Fix, then re-run.

---

## 9. Templates & Variants

Every diagram ships in three variants (see `assets/`):

| Variant | File pattern | When to use |
|---|---|---|
| **Minimal light** (default) | `template.html`, `example-<type>.html` | Screenshot-ready. Diagram + title. Warm paper. |
| **Minimal dark** | `template-dark.html`, `example-<type>-dark.html` | Dark mode sites, slides, high-contrast posts. |
| **Full editorial** | `template-full.html`, `example-<type>-full.html` | Long-form posts where the diagram is the hero. |

**Sketchy variant** (optional, applied to any of the above) — see [primitive-sketchy.md](references/primitive-sketchy.md). SVG turbulence filter wobbles strokes for a hand-drawn feel. Good for essays, not for technical docs.

### To create a new diagram

1. **Phase 0** (§0): write the intent & spec comment block
2. **Type decision** (§1.1): classify content, pick type or don't draw
3. Copy the variant closest to what you want (`template.html` for minimal, `template-full.html` for cards)
4. Load the matching `references/type-<name>.md` for layout conventions
5. Replace the eyebrow, h1, and SVG body
6. Run the taste gate (§8 / `references/taste-gate.md`)

---

## 10. Output

Always produce a single self-contained `.html` file:
- Embedded CSS (no external except Google Fonts)
- Inline SVG (no external images)
- No JavaScript required (export toolbar uses opt-in CDN scripts)

Renders correctly in any modern browser.

---

## 11. Python Renderer (Programmatic Generation)

For data-heavy or repeatable diagrams, use `scripts/diagram_renderer.py` — a Python module that generates self-contained HTML files following the same design system.

### When to use the renderer

| Scenario | Hand-write SVG | Use renderer |
|---|---|---|
| One-off editorial diagram | ✅ Best | — |
| Dashboard with dynamic data | — | ✅ Best |
| Monthly recurring report | — | ✅ Best |
| 10+ nodes with complex routing | — | ✅ Best |
| Quick sketch / exploration | ✅ Best | — |

### Quick start

```python
from diagram_renderer import Diagram, Node

d = Diagram(title="My Diagram")
d.add_node(Node("api", "API Gateway", "backend", tag="GW", row=0, col=0))
d.add_node(Node("db",  "Database",    "store",   tag="DB", row=0, col=1))
d.add_edge("api", "db", "WRITE")
d.auto_layout()
d.save("output.html")
```

### Renderer capabilities

| Feature | Status |
|---|---|
| Grid auto-layout (row/col) | ✅ |
| Orthogonal edge routing (no node crossing) | ✅ |
| Google Fonts CDN (Instrument Serif + Geist + Geist Mono) | ✅ |
| 7 node types (focal/backend/store/external/input/optional/security) | ✅ |
| Type tag badges | ✅ |
| Auto legend from used node types | ✅ |
| PNG/PDF export (html2canvas + jsPDF) | ✅ |
| Dark mode | ✅ |
| SVG markers (default/accent/link arrows) | ✅ |
| Color from style-guide.md tokens | ✅ |

### Extending the renderer

Add new node types by extending `NODE_TREATMENT` in `diagram_renderer.py`. Add new layout modes by extending the `auto_layout()` method. The renderer always outputs against the design system — style-guide.md is the single source of truth.
