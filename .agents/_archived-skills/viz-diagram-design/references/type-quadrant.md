# Quadrant

**Best for:** prioritization (Impact × Effort), positioning (Reach × Frequency), portfolio maps, 2×2 decision frames.

## Sub-variants

### 2×2 Classic (default)
- 4 quadrants, thin axis cross, labeled dots. See main conventions below.

### 3×3 Nine-box (九宫格)
- **Layout:** 3×3 grid of rectangles (not 4 quadrants). Outer frame 1px ink; inner dividers 1px `rgba(ink,0.20)`.
- **Cell size:** uniform or graduated. For supplier grading, uniform cells (equal width/height). For graduated (e.g., risk matrix), cells expand where density is higher.
- **Axis labels:** at ends of outer frame (same as 2×2). Horizontal axis at bottom, vertical at left.
- **Cell content:** name label (Geist 14px 600) + strategy sublabel (Geist Mono 10px muted). No type-tag pills inside cells — too heavy for 3×3.
- **Focal:** ONE cell gets accent border + subtle tint fill. Typically top-right (star). If top-right is not the focal, explain why in a callout.
- **Supplier names:** small dots (`r=4`) or short labels inside cells. If >5 names per cell, use a numbered indicator ("5 家") instead of listing.
- **Key difference from 2×2:** more cells = smaller labels. Don't try to fit 2×2 density into 3×3. Keep each cell to name + 1 sublabel max.

### Bubble Distribution
- **Layout:** same 2×2 or 3×3 grid as above, but items are sized circles instead of dots.
- **Circle radius proportional to a third dimension** (e.g., revenue, headcount, risk score). Radius = `sqrt(value) / scale_factor`, clamped to 12–40px range.
- **Labels:** placed outside the bubble (not inside) when radius < 24px. Inside when radius ≥ 28px.
- **Anti-pattern:** equal-size bubbles when values differ 5× or more (dishonest).

## 2×2 Layout conventions
- 2×2 grid. Axis lines: 1px ink cross through the center.
- Axis labels at the *ends* of each axis (e.g., `HIGH IMPACT →` on the right, `LOW IMPACT ←` on the left — Geist Mono eyebrow). Never label at the midpoint.
- Items: small labeled dots (`r=4`) positioned in the quadrants. Labels 8–10px away; don't let labels cross axis lines.
- Coral on the "do first" item (typically top-right).
- Limit to ~12 items; cluster or split beyond that.

## Anti-patterns
- Four filled quadrants in different colors — position + label does the work; color noise weakens it.
- Items placed on axis lines (ambiguous quadrant).
- Missing axis names.

## Examples
- `assets/example-quadrant.html` — minimal light
- `assets/example-quadrant-dark.html` — minimal dark
- `assets/example-quadrant-full.html` — full editorial
