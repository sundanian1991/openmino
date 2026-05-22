#!/usr/bin/env python3
"""Minimal SVG renderer that respects input coordinates exactly."""

import json
import html
import sys
from pathlib import Path

COLORS = {
    "bg": "#FCFBF7",
    "grid": "#E8E1D7",
    "ink": "#2D2926",
    "muted": "#7A6F66",
    "sand_fill": "#FFF0CF",
    "mint_fill": "#DFF7E8",
    "sky_fill": "#DCEBFF",
    "coral_fill": "#FFE0D7",
    "amber_fill": "#FFE8B5",
    "flow_sky": "#2F7CF6",
    "flow_mint": "#24B36B",
    "flow_coral": "#F36B3C",
    "flow_amber": "#D79210",
    "flow_sand": "#8B7355",
}

TONE_MAP = {
    "sky": ("sky_fill", "flow_sky"),
    "mint": ("mint_fill", "flow_mint"),
    "coral": ("coral_fill", "flow_coral"),
    "amber": ("amber_fill", "flow_amber"),
    "sand": ("sand_fill", "flow_sand"),
    "graphite": ("mint_fill", "ink"),
}

def get_tone_colors(tone):
    """Return (fill_color, stroke_color) for a given tone."""
    fill_key, stroke_key = TONE_MAP.get(tone, ("sky_fill", "flow_sky"))
    return COLORS[fill_key], COLORS[stroke_key]

def esc(s):
    """Escape for XML text content."""
    return html.escape(s, quote=True)

def main():
    spec_path = Path(sys.argv[1])
    out_path = Path(sys.argv[2])

    with open(spec_path) as f:
        spec = json.load(f)

    width = spec.get("width", 1150)
    height = spec.get("height", 420)
    title = spec.get("title", "")
    subtitle = spec.get("subtitle", "")
    nodes = {n["id"]: n for n in spec["nodes"]}
    edges = spec.get("edges", [])
    groups = spec.get("groups", [])

    s = []
    s.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="{esc(title)}">')
    s.append(f'  <title>{esc(title)}</title>')
    s.append(f'  <desc>{esc(subtitle)}</desc>')

    # Defs: pattern + markers
    s.append('  <defs>')
    s.append('    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">')
    s.append(f'      <circle cx="2" cy="2" r="0.8" fill="{COLORS["grid"]}" opacity="0.4"/>')
    s.append('    </pattern>')
    used_tones = set(e.get("tone", "sky") for e in edges)
    for tone in used_tones:
        _, stroke_color = get_tone_colors(tone)
        s.append(f'    <marker id="arrow-{tone}" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">')
        s.append(f'      <path d="M 2 2 L 10 6 L 2 10" fill="none" stroke="{stroke_color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>')
        s.append('    </marker>')
    s.append('  </defs>')

    # Background
    s.append(f'  <rect width="{width}" height="{height}" fill="{COLORS["bg"]}"/>')
    s.append(f'  <rect width="{width}" height="{height}" fill="url(#dots)"/>')

    # Title area
    s.append(f'  <text x="40" y="46" font-family="Georgia, serif" font-size="24" fill="{COLORS["ink"]}" font-weight="bold">{esc(title)}</text>')
    s.append(f'  <text x="40" y="68" font-family="Georgia, serif" font-size="13" fill="{COLORS["muted"]}">{esc(subtitle)}</text>')

    # Groups
    for g in groups:
        gx, gy, gw, gh = g["x"], g["y"], g["w"], g["h"]
        s.append(f'  <rect x="{gx}" y="{gy}" width="{gw}" height="{gh}" rx="12" ry="12" fill="none" stroke="{COLORS["ink"]}" stroke-width="1" stroke-dasharray="6,4" opacity="0.2"/>')
        if "label" in g:
            s.append(f'  <text x="{gx + 14}" y="{gy - 8}" font-family="Georgia, serif" font-size="11" fill="{COLORS["muted"]}" font-style="italic">{esc(g["label"])}</text>')

    # Edges (before nodes so they render behind)
    for e in edges:
        fn = nodes[e["from"]]
        tn = nodes[e["to"]]
        tone = e.get("tone", "sky")
        _, flow_color = get_tone_colors(tone)

        fx, fy, fw, fh = fn["x"], fn["y"], fn["w"], fn["h"]
        tx, ty, tw, th = tn["x"], tn["y"], tn["w"], tn["h"]
        fcx, fcy = fx + fw / 2, fy + fh / 2
        tcx, tcy = tx + tw / 2, ty + th / 2

        # Determine connection sides
        if tcx > fcx + 20:
            from_side, to_side = "right", "left"
        elif tcx < fcx - 20:
            from_side, to_side = "left", "right"
        elif tcy > fcy:
            from_side, to_side = "bottom", "top"
        else:
            from_side, to_side = "top", "bottom"

        # Exact edge points on rectangle boundaries
        if from_side == "right": x1, y1 = fx + fw, fy + fh / 2
        elif from_side == "left": x1, y1 = fx, fy + fh / 2
        elif from_side == "bottom": x1, y1 = fx + fw / 2, fy + fh
        else: x1, y1 = fx + fw / 2, fy

        if to_side == "left": x2, y2 = tx, ty + th / 2
        elif to_side == "right": x2, y2 = tx + tw, ty + th / 2
        elif to_side == "top": x2, y2 = tx + tw / 2, ty
        else: x2, y2 = tx + tw / 2, ty + th

        dx = abs(x2 - x1)
        dy = abs(y2 - y1)

        if dx > dy:
            cp = min(dx * 0.4, 60)
            path = f"M {x1} {y1} C {x1 + cp} {y1}, {x2 - cp} {y2}, {x2} {y2}"
        else:
            cpy = min(dy * 0.4, 50)
            ydir = 1 if y2 > y1 else -1
            path = f"M {x1} {y1} C {x1} {y1 + cpy * ydir}, {x2} {y2 - cpy * ydir}, {x2} {y2}"

        s.append(f'  <path d="{path}" fill="none" stroke="{flow_color}" stroke-width="2.2" stroke-dasharray="7,5" marker-end="url(#arrow-{tone})"/>')

    # Nodes
    for n in spec["nodes"]:
        nx, ny, nw, nh = n["x"], n["y"], n["w"], n["h"]
        tone = n.get("tone", "sky")
        shape = n.get("shape", "rect")
        fill, _ = get_tone_colors(tone)
        rx = 16 if shape == "pill" else 8

        # Outer rect
        s.append(f'  <rect x="{nx}" y="{ny}" width="{nw}" height="{nh}" rx="{rx}" ry="{rx}" fill="{fill}" stroke="{COLORS["ink"]}" stroke-width="1.8"/>')
        # Inner subtle stroke (Excalidraw double-line)
        s.append(f'  <rect x="{nx + 2}" y="{ny + 2}" width="{nw - 4}" height="{nh - 4}" rx="{max(rx - 2, 1)}" ry="{max(rx - 2, 1)}" fill="none" stroke="{COLORS["ink"]}" stroke-width="0.6" opacity="0.25"/>')

        # Label
        label = n.get("label", "")
        caption = n.get("caption", "")
        cx = nx + nw / 2
        if caption:
            cy_label = ny + nh / 2 - 5
            cy_caption = ny + nh / 2 + 13
        else:
            cy_label = ny + nh / 2 + 1
            cy_caption = None

        s.append(f'  <text x="{cx}" y="{cy_label}" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, serif" font-size="13.5" fill="{COLORS["ink"]}" font-weight="500">{esc(label)}</text>')
        if caption:
            s.append(f'  <text x="{cx}" y="{cy_caption}" text-anchor="middle" font-family="Georgia, serif" font-size="10.5" fill="{COLORS["muted"]}">{esc(caption)}</text>')

    s.append('</svg>')

    content = "\n".join(s)
    out_path.write_text(content, encoding="utf-8")
    print(f"Wrote {out_path}")

if __name__ == "__main__":
    main()
