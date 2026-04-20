# Design System: Minimalist Infographic

## 1. Visual Theme & Atmosphere

Minimalist Infographic is a literary journal illustration reimagined as digital information design — warm, unhurried, and quietly authoritative. The entire system is built on a parchment-toned canvas (`#faf9f7`) that deliberately evokes the feeling of high-quality paper rather than a screen. Where most digital infographics lean into cold blues, gradients, or tech-forward aesthetics, this design radiates warmth through an exclusively warm-toned neutral palette — every gray carries a yellow-brown undertone, every border is cream-tinted, and the only chromatic accent is a burnt terracotta (`#c98a6a`).

The signature move is the serif/sans split: Georgia serif for all headline content (giving every title the gravitas of a book heading), paired with system-ui sans-serif for body and UI text (quiet efficiency). This is the same typographic strategy that makes Claude's design feel like a literary salon rather than a product page — serif for authority, sans for utility.

What makes this system truly distinctive is its restraint. Shadows are entirely absent. Gradients are forbidden (except when "gradient is data" — a dark-to-light bar representing clarity decay). Borders are whisper-thin (`1px solid #d4d1c7`). Cards are barely distinguishable from the background (`#f5f4f1` on `#faf9f7` — a difference of barely perceptible warmth). The visual hierarchy comes from container sizing, not color. Information density is high (body text at 10-10.5px) but never crowded, because the spacing system (6-8px card gaps, 10-12px container padding) creates breathing room at every level.

The container system is the most distinctive structural feature. Large containers (`rx=12, stroke=#1a1a1a, 1.5px`) define conceptual boundaries — everything inside one container is "one idea." Cards (`rx=8, stroke=#d4d1c7, 1px`) are atomic information units. Dashed containers mean "optional" or "discarded." Container size differences communicate information volume — a large container next to a small one means "full set" vs "what remains after filtering." Containers aren't decoration; they're the visual syntax.

**Key Characteristics:**
- Warm parchment canvas (`#faf9f7`) evoking premium paper, not screens
- Georgia serif for all headlines, system-ui sans-serif for body text — the literary split
- Terracotta brand accent (`#c98a6a`) — the only chromatic color, used for lines and ticks
- Exclusively warm-toned neutrals — every gray has a yellow-brown undertone
- Zero shadows, zero gradients (except "gradient as data"), zero decorative elements
- Container-as-semantics: rx=12 containers for concept boundaries, rx=8 cards for atomic units
- Whisper-thin borders: 1px `#d4d1c7` for cards, 1.5px `#1a1a1a` for containers
- High information density (10px body) with generous micro-spacing (6-8px gaps)
- Line-as-relationship: solid arrows for flow, dashed for optional, thick strokes for status

## 2. Color Palette & Roles

### Canvas & Surfaces
- **Parchment** (`#faf9f7`): The primary SVG canvas — a warm cream with a barely perceptible yellow-green tint that feels like aged paper. This is the emotional foundation of the entire design, replacing the sterile white (`#ffffff`) that dominates digital infographics.
- **Warm Card** (`#f5f4f1`): The standard card fill — a warm gray-mica barely distinguishable from Parchment but creating the gentlest possible layering. This is NOT white. The warmth difference between `#faf9f7` and `#f5f4f1` is the primary elevation cue.
- **Dashed Area** (`#faf9f7` fill + `#e8e4dc` stroke): The "free space" or "discarded" area — same fill as canvas but with dashed warm borders, creating a sense of optionality or absence.

### Text & Content
- **Near Black** (`#1a1a1a`): Primary text color — not pure black but a warm, almost charcoal dark that's gentler on the eyes. Used for headlines, card content, and any text that needs to command attention.
- **Warm Gray** (`#6b6b6b`): Secondary text for subtitles, captions, footnotes, and de-emphasized metadata. A distinctly warm medium gray, never a cool blue-gray.
- **Muted Gray** (`#8a8580`): Tertiary text for the smallest labels, axis tick labels, and the most de-emphasized content.
- **Light Gray** (`#999999`): Quaternary text for "free space" labels, placeholder indicators, and ghost text.

### Borders & Divisions
- **Container Stroke** (`#1a1a1a`): The authoritative border — 1.5px width for concept boundaries. This is the strongest structural line in the system.
- **Card Stroke** (`#d4d1c7`): The whisper border — 1px width, warm gray-mica, creating the gentlest possible containment. Cards should feel outlined by breath, not drawn by pen.
- **Dashed Stroke** (`#e8e4dc`): The optional border — used for "free," "discarded," or "not yet filled" areas. A warm cream tone that barely registers against the canvas.

### Brand & Accent
- **Terracotta** (`#c98a6a`): The sole chromatic accent — a warm, earthy burnt orange-brown used for connection lines, axis ticks, annotation marks, and any moment where the eye needs to be guided. Deliberately un-tech, deliberately warm.

### Semantic Colors (optional, max 2 per image)
- **Sage Green** (`#8f9b7f`): Success, completion, positive progress. Used for progress bars, "correct" method indicators. A muted, earthy green — never neon.
- **Steel Blue** (`#6a8fb5`): User input, information, cool contrast. Used for user message cards, alternative method indicators.
- **Burnt Orange** (`#d4845a`): Warning, attention, important highlight. Used for alert blocks, critical notes. Warmer and more saturated than Terracotta.
- **Dusty Rose** (`#a3867a`): Secondary emphasis, gray contrast. Used for secondary highlights.

### Gradient System
- This system is **gradient-free** by default. The single exception is "gradient as data" — a horizontal bar transitioning from `#1a1a1a` through progressively lighter warm grays to `#e8e4dc`, representing clarity decay (sharp → rotting → gone). Build with 5+ adjacent `<rect>` elements of progressively lighter fills.

## 3. Typography Rules

### Font Family
- **Headline**: `Georgia`, with fallback: `"Times New Roman", serif`
- **Body / UI**: `system-ui`, with fallback: `-apple-system, "Segoe UI", sans-serif`

*Note: System fonts requiring no external loading. Georgia provides the serif "book heading" presence; system-ui provides clean, platform-native body text.*

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| H1 Title | Georgia | 18px | 700 | 1.20 | normal | Image title, maximum authority |
| H2 Card Title | system-ui | 11-12px | 500 | 1.30 | normal | Card/section headings |
| Body Standard | system-ui | 10-10.5px | 400 | 1.30-1.40 | normal | Card content, explanations |
| Caption | system-ui | 8.5-9.5px | 400 | 1.30 | normal | Tick labels, annotations |
| Note (italic) | Georgia | 9.5-10px | 400 italic | 1.40 | normal | Bottom footnotes, asides |
| Label Tiny | system-ui | 8px | 400 | 1.25 | normal | Smallest metadata |

### Principles
- **Serif for authority, sans for utility**: Georgia carries all headline content with bold weight (700), giving every heading the gravitas of a published title. System-ui handles all functional UI text — card content, labels, annotations — with quiet efficiency.
- **Small but legible body**: Body text at 10-10.5px is smaller than typical web standards (14-16px) but remains legible because of the warm color palette (`#1a1a1a` on `#f5f4f1` provides excellent contrast) and generous line-height (1.30-1.40). This enables high information density without feeling crowded.
- **Georgia italic for footnotes**: The italic serif at the bottom of each image creates a "footnote" cadence, distinguishing supplementary commentary from the main content.
- **No letter-spacing adjustments**: Neither font requires letter-spacing modifications. Georgia's natural proportions and system-ui's optical sizing work without manual tuning.
- **Three-tier weight system**: 700 (announce), 500 (emphasize), 400 (read). No other weights are used.

## 4. Component Stylings

### Containers

**Concept Container (Large)**
- Background: none (transparent)
- Border: `1.5px solid #1a1a1a`
- Radius: `rx=10-12`
- Use: Defines a conceptual boundary — everything inside is "one idea." The strongest structural element.
- Padding: 10-12px internal margin

**Card Container (Standard)**
- Background: `#f5f4f1` (Warm Card)
- Border: `1px solid #d4d1c7`
- Radius: `rx=8`
- Height: 28-40px for inline labels, 80-100px for content cards
- Use: Atomic information unit — one fact, one label, one concept.

**Card Container (Content-Rich)**
- Background: `#f5f4f1`
- Border: `1px solid #d4d1c7`
- Radius: `rx=8`
- Height: 80-180px
- Internal padding: 12-16px
- Use: Multi-line cards containing title + description + mini-visuals.

**Dashed Container (Optional/Discarded)**
- Background: `#faf9f7` (same as canvas)
- Border: `1px dashed #e8e4dc`, `stroke-dasharray="4 3"`
- Radius: `rx=8`
- Use: "Free space," "discarded content," "not yet filled." Visually present but semantically absent.

**Label / Tag**
- Background: `#f5f4f1` or inherit from parent
- Border: `0.5px solid #d4d1c7`
- Radius: `rx=5-6`
- Use: Metadata, status markers, inline labels.

### Lines & Arrows

**Connection Arrow (Solid)**
- Stroke: `#c98a6a` (Terracotta), `stroke-width="1"`
- Marker: `marker-end="url(#arrowhead)"`
- Use: Definite flow, transmission direction.

**Dashed Arrow**
- Stroke: `#c98a6a`, `stroke-width="1"`, `stroke-dasharray="4 3"`
- Use: Indirect relationship, optional transmission.

**Return Curve**
- Path: `d="M x1 y1 Q cx cy x2 y2"` (Q Bézier)
- Stroke: `#c98a6a`, `stroke-width="1"`
- Use: Return flow, feedback loop.

**Status Line (Thick)**
- Stroke: `stroke-width="3"`, `stroke-linecap="round"`
- Color: Sage Green `#8f9b7f` for good, Terracotta `#c98a6a` for warning
- Use: Progress marker, state indicator.

**Tick Mark**
- Line: 6px height, `stroke-width="1"`, `stroke=#c98a6a`
- Use: Axis measurement points.

### Text Blocks

**Title Block**
- Font: Georgia 18px bold `#1a1a1a`
- Position: x=40, y=28-30
- Use: Image title, always top-left.

**Subtitle Block**
- Font: system-ui 11px `#6b6b6b`
- Position: x=40, y=46-48 (18px below title)
- Use: One-line explanation of what the image shows.

**Card Text (Centered)**
- Font: system-ui 10-10.5px `#1a1a1a`
- Position: center of card, text-anchor="middle"
- Multi-line: y positions 13-14px apart
- Use: Card content, always centered horizontally.

**Footnote (Italic)**
- Font: Georgia 9.5-10px italic `#6b6b6b`
- Position: bottom center, text-anchor="middle"
- Use: Supplementary commentary, methodological notes.

### Visual Elements

**Gradient Bar (Data)**
- Construction: 5+ adjacent `<rect>` elements, progressively lighter fills
- Color range: `#1a1a1a` → `#4d4c48` → `#87867f` → `#b0aea5` → `#d4d1c7` → `#e8e4dc`
- Dimensions: height=24px, width=600px, `rx=6`
- Use: Clarity decay visualization, sharp-to-rotting spectrum.

**Mini Progress Bar**
- Unfilled: `#d4d1c7`, Filled: `#8f9b7f`
- Dimensions: height=8-10px, `rx=4`
- Use: Quantity visualization within cards.

**Placeholder Bar**
- Fill: `#d4d4d4`, height=10-14px, `rx=2`
- Use: Abstract content representation (tool calls, file reads).

## 5. Layout Principles

### Spacing System
- Base unit: 4px
- Scale: 4, 6, 8, 10, 12, 16, 20, 24, 30
- Card gap: 6-8px (within groups, must be uniform)
- Container padding: 10-12px
- Group gap: 20-30px (between conceptual groups)
- Line height: 13-14px (for multi-line text)

### Grid & Container
- Canvas width: 680px (fixed viewBox)
- Canvas height: adaptive (no wasted whitespace)
- Horizontal margin: 40px
- Container width: 600px (full) or 280px (side-by-side)
- Top padding: 25-30px
- Bottom padding: 15-20px

### Whitespace Philosophy
- **Compact but breathing**: Card gaps of 6-8px are tight enough to show grouping but generous enough to prevent粘连. The warmth of the palette makes tight spacing feel intentional.
- **Container as breathing room**: Each concept container creates its own micro-environment. Content inside shares air; content between containers is separated by the boundary itself.
- **High density, low noise**: Body text at 10px means more information per pixel, but warm palette + consistent spacing + container hierarchy prevent noise.

### Border Radius Scale
- Micro (5-6px): Labels, tags, inline metadata
- Standard (8px): All cards
- Comfortable (10-12px): Concept containers, large panels

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | `#faf9f7` canvas fill | Page background, inline text |
| Contained (Level 1) | `1px solid #d4d1c7` + `#f5f4f1` fill | Standard cards, atomic units |
| Bounded (Level 2) | `1.5px solid #1a1a1a` | Concept containers, group boundaries |
| Optional (Level 1b) | `1px dashed #e8e4dc` + `#faf9f7` fill | "Free," "discarded," "optional" areas |
| Semantic (Level 1c) | Solid fill with semantic color | Highlighted cards, CTA elements |

**Shadow Philosophy**: Shadows are entirely absent. Depth is communicated through three mechanisms: (1) the barely-perceptible fill difference between canvas and card — a warmth shift of just a few percent, (2) container strokes that create conceptual boundaries without visual weight, and (3) the container nesting hierarchy — a card inside a container is "contained," a card outside is "free."

## 7. Do's and Don'ts

### Do
- Use Parchment (`#faf9f7`) as the canvas — never pure white (`#ffffff`)
- Use Warm Card (`#f5f4f1`) for card fills — the warmth difference from Parchment is essential
- Use Georgia serif for all titles and footnotes — the serif/sans split is the typographic identity
- Use Terracotta (`#c98a6a`) for all connection lines, ticks, and annotation marks
- Use `#d4d1c7` for card strokes — a warm gray-mica, never a cool `#cccccc`
- Use `#1a1a1a` for primary text — a warm charcoal, never pure `#000000`
- Use `#6b6b6b` for secondary text — a warm medium gray
- Keep card gaps at 6-8px and consistent within each group
- Use container rx=10-12, card rx=8, label rx=5-6
- Use dashed borders for "optional" or "discarded" areas
- Ensure card text is vertically centered (calculate y coordinates precisely)
- Limit semantic colors to maximum 2 per image

### Don't
- Don't use pure white (`#ffffff`) as card background — `#f5f4f1` carries warmth
- Don't use pure black (`#000000`) as text — `#1a1a1a` is softer
- Don't use cool grays (`#cccccc`, `#888888`) anywhere — all grays must have warm undertones
- Don't use shadows or box-shadows — depth comes from fill differences and container strokes
- Don't use gradients (except "gradient as data" — the clarity decay bar)
- Don't use emoji as icons — this system has no iconography
- Don't use more than 2 semantic colors per image
- Don't use sans-serif for titles — the Georgia serif is non-negotiable
- Don't use serif for body text — system-ui sans is the body standard
- Don't mix container widths within a comparison pair — both must be equal (280px)
- Don't let text overflow card boundaries — calculate y coordinates for vertical centering
- Don't add decorative elements — every shape must carry information

## 8. Responsive Behavior

### Canvas Scaling
- viewBox width: 680px (fixed)
- viewBox height: adaptive to content
- Display width: 100% (scales to parent container)
- Minimum readable width: 340px (0.5x scale — below this, 10px body text becomes illegible)

### Collapsing Strategy
- Single-column layout only — no multi-column within the SVG
- For side-by-side comparisons, the two containers (280px each) are the maximum horizontal split
- No mobile-specific variant — the SVG scales proportionally

## 9. Agent Prompt Guide

### Quick Color Reference
- Canvas: Parchment (`#faf9f7`)
- Card fill: Warm Card (`#f5f4f1`)
- Card stroke: Warm Gray (`#d4d1c7`)
- Container stroke: Near Black (`#1a1a1a`)
- Title text: Near Black (`#1a1a1a`)
- Subtitle text: Warm Gray (`#6b6b6b`)
- Accent: Terracotta (`#c98a6a`)
- Dashed stroke: Warm Cream (`#e8e4dc`)
- Success: Sage Green (`#8f9b7f`)
- Info: Steel Blue (`#6a8fb5`)
- Warning: Burnt Orange (`#d4845a`)

### Example Component Prompts
- "Create a timeline card row: on `#faf9f7` canvas, a concept container at x=40, y=62, width=600, height=48, rx=12, no fill, stroke `#1a1a1a` 1.5px. Inside, place 5 cards starting at x=48, each with height=36, rx=8, fill `#f5f4f1`, stroke `#d4d1c7` 1px, gaps of 8px. Center text in each card, system-ui 10px `#1a1a1a`, text-anchor=middle."
- "Design a side-by-side comparison: on `#faf9f7` canvas, two containers at x=40 and x=360, each width=280, height=200, rx=12, no fill, stroke `#1a1a1a` 1.5px. Left container gets dense placeholder bars (height=10-14, fill `#d4d4d4`). Right container gets 3-5 content cards. Connection arrow between them at y=center, stroke `#c98a6a`."
- "Build a gradient decay bar: at x=40, y=52, width=600, height=24, rx=6. Construct from 6 adjacent `<rect>` elements (each width=100): fills from `#1a1a1a` → `#4d4c48` → `#87867f` → `#b0aea5` → `#d4d1c7` → `#e8e4dc`. Place labels above each segment in system-ui 10px, white text on dark segments, dark text on light segments."
- "Create a content-rich card: x=40, y=62, width=280, height=160, rx=10, fill `#f5f4f1`, stroke `#d4d1c7`. Inside, a title bar at y=72, width=264, height=24, rx=8, fill `#8f9b7f`, centered text "Correcting", system-ui 11px bold white. Below, mini progress bars at y=105, followed by description text in system-ui 10px `#6b6b6b`."

### Iteration Guide
1. Always start with canvas `#faf9f7` — this sets the warm tone for everything else
2. Build containers before cards — the conceptual boundary defines what goes inside
3. Calculate card text y-coordinates precisely: for a card at y=Y with height=H, single-line text at Y + H/2 + 4px
4. Card gaps must be uniform within each group — measure, don't estimate
5. Terracotta (`#c98a6a`) is the ONLY color for lines and ticks — never substitute blue, red, or green
6. Georgia for titles and footnotes only — never for body text inside cards
7. When in doubt about a color: use the warm gray scale (`#1a1a1a` → `#6b6b6b` → `#8a8580` → `#999`) instead of introducing a new chromatic color
8. Verify: step back and check if the image looks like a book illustration or a web dashboard. If it looks like a dashboard, the warmth is insufficient
