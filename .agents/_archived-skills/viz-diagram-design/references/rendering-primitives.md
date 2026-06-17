# Rendering Primitives

Universal SVG building blocks for diagram-design. Read when rendering any SVG element.

These are **paste-ready patterns**. Copy the exact structure; swap token values from `style-guide.md`.

---

## Background

```svg
<defs>
  <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
    <circle cx="1" cy="1" r="0.9" fill="rgba(11,13,11,0.10)"/>
  </pattern>
</defs>
<rect width="100%" height="100%" fill="#f5f4ed"/>
<rect width="100%" height="100%" fill="url(#dots)" opacity="0.6"/>
```

---

## Arrow Markers

Define all three in `<defs>`, always. Draw arrows before boxes so z-order puts lines behind nodes.

```svg
<marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
  <polygon points="0 0, 8 3, 0 6" fill="#52534e"/>
</marker>
<marker id="arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
  <polygon points="0 0, 8 3, 0 6" fill="#f7591f"/>
</marker>
<marker id="arrow-link" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
  <polygon points="0 0, 8 3, 0 6" fill="#1a70c7"/>
</marker>
```

| Arrow | Stroke | When |
|---|---|---|
| Default | muted `#52534e` | Internal, generic |
| Accent | coral `#f7591f` | Primary / highlighted / headline |
| Link-blue | `#1a70c7` | HTTP/API calls, external systems |
| Dashed | `stroke-dasharray="5,4"` + any color | Optional, passive, return, async |

---

## Node Box — Full Pattern

```svg
<!-- 1. Opaque paper mask — prevents arrows bleeding through transparent fills -->
<rect x="X" y="Y" width="W" height="H" rx="6" fill="#f5f4ed"/>
<!-- 2. Styled box -->
<rect x="X" y="Y" width="W" height="H" rx="6" fill="FILL" stroke="STROKE" stroke-width="1"/>
<!-- 3. Rectangular type tag (rx=2, NOT a pill) -->
<rect x="X+8" y="Y+6" width="28" height="12" rx="2" fill="transparent" stroke="STROKE@0.40" stroke-width="0.8"/>
<text x="X+22" y="Y+15" fill="STROKE@0.8" font-size="8" font-family="'Geist Mono', monospace"
      text-anchor="middle" letter-spacing="0.08em">API</text>
<!-- 4. Node name (Geist sans — human-readable) -->
<text x="CX" y="CY+2" fill="#0b0d0b" font-size="12" font-weight="600"
      font-family="'Geist', sans-serif" text-anchor="middle">Node Name</text>
<!-- 5. Technical sublabel (Geist Mono) -->
<text x="CX" y="CY+18" fill="#52534e" font-size="9"
      font-family="'Geist Mono', monospace" text-anchor="middle">tech:port</text>
```

Node type fills/strokes — look up in `style-guide.md` under "Node type → treatment":

| Type | Fill | Stroke |
|---|---|---|
| **Focal** (1–2 max) | `accent-tint` | `accent` |
| **Backend / API / Step** | white | `ink` |
| **Store / State** | `ink @ 0.05` | `muted` |
| **External / Cloud** | `ink @ 0.03` | `ink @ 0.30` |
| **Input / User** | `muted @ 0.10` | `soft` |
| **Optional / Async** | `ink @ 0.02` | `ink @ 0.20` dashed `4,3` |
| **Security / Boundary** | `accent @ 0.05` | `accent @ 0.50` dashed `4,4` |

---

## Arrow Labels — Always Mask

Every arrow label needs an opaque rect behind it. Without one, text bleeds through the line.

```svg
<rect x="MID_X-18" y="ARROW_Y-12" width="36" height="12" rx="2" fill="#f5f4ed"/>
<text x="MID_X" y="ARROW_Y-3" fill="#65655c" font-size="8"
      font-family="'Geist Mono', monospace" text-anchor="middle" letter-spacing="0.06em">WRITE</text>
```

Rules:
- ≤14 characters, all-caps
- Centered on segment midpoint
- 8–10px above line
- Never `writing-mode` vertical
- Label rect fill must be `#f5f4ed` (paper color) — opaque, not transparent

---

## Legend — Horizontal Strip at Bottom

**Never put the legend inside the diagram area.** Place as a horizontal strip after all nodes, with a hairline separator:

```svg
<line x1="30" y1="LEGEND_Y-8" x2="VIEWBOX_W-30" y2="LEGEND_Y-8"
      stroke="rgba(11,13,11,0.10)" stroke-width="0.8"/>
<text x="30" y="LEGEND_Y+8" fill="#52534e" font-size="8" font-family="'Geist Mono', monospace"
      letter-spacing="0.14em">LEGEND</text>
<!-- Items — horizontal row, ~160px apart -->
```

Expand SVG `viewBox` height by ~60px to accommodate.

---

## Editorial Callouts

Optional. See [primitive-annotation.md](primitive-annotation.md) for full spec.

Summary: `Instrument Serif` italic, 14px, muted color. Placed outside the main diagram area. 1–2 max per diagram.

---

## Hand-drawn Variant

Optional. See [primitive-sketchy.md](primitive-sketchy.md) for SVG turbulence filter.

---

## Anti-patterns (rendering-level)

| Anti-pattern | Why it fails |
|---|---|
| Arrow labels with no masking rect | Bleeds through the line |
| Vertical `writing-mode` text on arrows | Unreadable |
| Shadow on any element | Shadows are out. Borders are in. |
| `rounded-2xl` on boxes | Max radius 6–10px or none |
| Boxes drawn before arrows | Z-order wrong — lines appear on top of nodes |
| Emoji in diagrams (📁, └──, ✅) | AI slop pattern |
| Non-standard colors not in style-guide | Breaks design system consistency |
| Font sizes not divisible by 4 | Breaks 4px grid |
