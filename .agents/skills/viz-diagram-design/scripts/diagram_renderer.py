"""Self-contained HTML+SVG+CSS diagram renderer.

Python 只做「编排」（节点坐标计算 + 连线路径编排），输出浏览器原生渲染的 HTML。
遵循 viz-diagram-design 的编辑出版设计系统：style-guide.md tokens + rendering-primitives.md。

用法:
    from diagram_renderer import Diagram, Node, Edge
    d = Diagram(title="My Diagram", width=960, height=600)
    d.add_node(Node("API", "API Gateway", "backend", x=100, y=100))
    d.add_edge("API", "DB", label="WRITE")
    d.save("output.html")
"""

from __future__ import annotations
import dataclasses
from typing import Optional


# ── Style Guide Tokens ──────────────────────────────────────────────
# Mirror of references/style-guide.md — single source of truth.

STYLE = {
    "paper": "#faf7f2",
    "paper-2": "#f2ede4",
    "ink": "#1c1917",
    "muted": "#57534e",
    "soft": "#78716c",
    "rule": "rgba(28,25,23,0.12)",
    "rule-solid": "rgba(120,113,108,0.25)",
    "accent": "#b5523a",
    "accent-tint": "rgba(181,82,58,0.08)",
    "link": "#2563eb",
}

# Node type → (fill, stroke, label) — for rendering and legend
NODE_TREATMENT = {
    "focal":     (STYLE["accent-tint"],               STYLE["accent"],            "焦点"),
    "backend":   ("#ffffff",                          STYLE["ink"],               "服务"),
    "store":     (f"rgba(28,25,23,0.05)",             STYLE["muted"],             "存储"),
    "external":  (f"rgba(28,25,23,0.03)",             f"rgba(28,25,23,0.30)",    "外部"),
    "input":     (f"rgba(87,83,78,0.10)",             STYLE["soft"],              "输入"),
    "optional":  (f"rgba(28,25,23,0.02)",             f"rgba(28,25,23,0.20)",    "可选"),
    "security":  (f"rgba(181,82,58,0.05)",            f"rgba(181,82,58,0.50)",   "安全"),
}

# Non-filled type → opaque mask color = paper
OPAQUE_FILL = STYLE["paper"]

# Edge style → marker ID, stroke color
EDGE_STYLE = {
    "default": ("url(#arrow)",      STYLE["muted"]),
    "accent":  ("url(#arrow-accent)", STYLE["accent"]),
    "link":    ("url(#arrow-link)",  STYLE["link"]),
    "dashed":  ("url(#arrow)",      STYLE["muted"]),
}


# ── Data Types ──────────────────────────────────────────────────────

@dataclasses.dataclass
class Node:
    id: str
    label: str
    type: str = "backend"
    sublabel: str = ""
    tag: str = ""
    x: int = 0
    y: int = 0
    width: int = 160
    height: int = 56
    row: int = 0   # auto-layout hint
    col: int = 0   # auto-layout hint

    @property
    def cx(self) -> int:
        return self.x + self.width // 2

    @property
    def cy(self) -> int:
        return self.y + self.height // 2

    @property
    def right(self) -> int:
        return self.x + self.width

    @property
    def bottom(self) -> int:
        return self.y + self.height


@dataclasses.dataclass
class Edge:
    src: str
    dst: str
    label: str = ""
    style: str = "default"  # default | accent | link | dashed


# ── Diagram Engine ──────────────────────────────────────────────────

class Diagram:
    """A single diagram = self-contained .html with inline SVG + CSS."""

    def __init__(self, title: str, subtitle: str = "",
                 width: int = 960, height: int = 520,
                 dark: bool = False):
        self.title = title
        self.subtitle = subtitle
        self.width = width
        self.height = height
        self.dark = dark
        self.nodes: dict[str, Node] = {}
        self.edges: list[Edge] = []

    # ── Public API ──────────────────────────────────────────────

    def add_node(self, node: Node) -> Node:
        self.nodes[node.id] = node
        return node

    def add_edge(self, src: str, dst: str, label: str = "",
                 style: str = "default") -> Edge:
        e = Edge(src=src, dst=dst, label=label, style=style)
        self.edges.append(e)
        return e

    def auto_layout(self, gap_x: int = 80, gap_y: int = 60,
                    node_width: int = 160, node_height: int = 56):
        """Grid auto-layout based on node row/col hints."""
        rows: dict[int, list[Node]] = {}
        for n in self.nodes.values():
            rows.setdefault(n.row, []).append(n)
        max_row = max(rows) if rows else 0
        for row_idx in sorted(rows):
            row = rows[row_idx]
            y = 80 + row_idx * (node_height + gap_y)
            for col_idx, n in enumerate(row):
                n.x = 40 + col_idx * (node_width + gap_x)
                n.y = y
                n.width = node_width
                n.height = node_height
        # Expand height to fit
        bottom_y = 80 + max_row * (node_height + gap_y) + node_height
        self.height = max(self.height, bottom_y + 80)

    # ── Render ──────────────────────────────────────────────────

    def render(self) -> str:
        s = STYLE
        return "\n".join([
            self._html_head(s),
            self._svg_defs(s),
            self._svg_background(s),
            *[self._render_edge(e, s) for e in self.edges],
            *[self._render_node(n, s) for n in self.nodes.values()],
            self._render_legend(s),
            self._svg_footer(),
            self._html_export_scripts(),
            self._html_footer(),
        ])

    def save(self, path: str):
        with open(path, "w", encoding="utf-8") as f:
            f.write(self.render())

    # ── Color helpers ──────────────────────────────────────────

    def _resolve_color(self, color: str, alpha: float) -> str:
        """Convert hex (#b5523a) or rgba() to rgba with the given alpha."""
        if color.startswith("rgba"):
            inner = color[5:-1]
            parts = [p.strip() for p in inner.split(",")]
            return f"rgba({parts[0]},{parts[1]},{parts[2]},{alpha})"
        h = color.lstrip("#")
        r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        return f"rgba({r},{g},{b},{alpha})"

    # ── HTML structure ─────────────────────────────────────────

    def _html_head(self, s: dict) -> str:
        bg = "#1c1917" if self.dark else s["paper"]
        ink_c = s["ink"] if not self.dark else "#faf7f2"
        muted_c = s["muted"] if not self.dark else "#a8a29e"
        return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{self.title}</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js" integrity="sha384-ZZ1pncU3bQe8y31yfZdMFdSpttDoPmOZg2wguVK9almUodir1PghgT0eY7Mrty8H" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js" integrity="sha384-en/ztfPSRkGfME4KIm05joYXynqzUgbsG5nMrj/xEFAHXkeZfO3yMK8QQ+mP7p1/" crossorigin="anonymous"></script>
<style>
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
body{{font-family:'Geist',system-ui,sans-serif;background:{bg};color:{ink_c};min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 32px}}
.frame{{max-width:1200px;width:100%}}
.header-row{{display:flex;align-items:center;gap:12px;margin-bottom:4px}}
.eyebrow{{font-family:'Geist Mono',monospace;font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:{muted_c};flex:1}}
h1{{font-family:'Instrument Serif',serif;font-size:32px;font-weight:400;line-height:1.08;letter-spacing:-.02em;margin-bottom:8px}}
.subtitle{{color:{muted_c};font-size:14px;line-height:1.5;max-width:720px;margin-bottom:24px}}
svg{{width:100%;min-width:900px;display:block}}
.toolbar{{display:flex;gap:4px;flex-shrink:0}}
.toolbar-toggle{{background:transparent;border:none;color:{muted_c};cursor:pointer;font-size:18px;line-height:1;padding:2px 8px;border-radius:4px;transition:color .2s,background .2s}}
.toolbar-toggle:hover{{color:{s["ink"]};background:rgba(28,25,23,.06)}}
.toolbar-actions{{display:none;gap:4px}}
.toolbar.expanded .toolbar-actions{{display:flex}}
.toolbar-actions button{{background:rgba(28,25,23,.04);border:1px solid {s["rule"]};color:{muted_c};padding:4px 10px;border-radius:4px;font-family:'Geist Mono',monospace;font-size:11px;cursor:pointer;transition:all .2s;white-space:nowrap}}
.toolbar-actions button:hover{{background:rgba(28,25,23,.08);color:{s["ink"]};border-color:{s["muted"]}}}
@media print{{.toolbar{{display:none!important}}}}
@media(max-width:860px){{body{{display:block;padding:32px 20px}}.frame{{overflow-x:auto}}}}
</style>
</head>
<body>
<div id="diagram-container" class="frame">
<div class="header-row">
<p class="eyebrow">Diagram · {self.title}</p>
<div class="toolbar">
<div class="toolbar-actions">
<button onclick="exportPNG(this)">PNG</button>
<button onclick="exportPDF(this)">PDF</button>
</div>
<button class="toolbar-toggle" onclick="this.parentElement.classList.toggle('expanded')" title="Export">⋯</button>
</div>
</div>
<h1>{self.title}</h1>
{f'<p class="subtitle">{self.subtitle}</p>' if self.subtitle else ''}
<svg viewBox="0 0 {self.width} {self.height}" xmlns="http://www.w3.org/2000/svg" role="img">
"""

    def _svg_defs(self, s: dict) -> str:
        dot_color = self._resolve_color(s["ink"], 0.10)
        return f"""<defs>
<marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0,8 3,0 6" fill="{s["muted"]}"/>
</marker>
<marker id="arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0,8 3,0 6" fill="{s["accent"]}"/>
</marker>
<marker id="arrow-link" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
<polygon points="0 0,8 3,0 6" fill="{s["link"]}"/>
</marker>
<pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
<circle cx="1" cy="1" r="0.9" fill="{dot_color}"/>
</pattern>
</defs>
"""

    def _svg_background(self, s: dict) -> str:
        bg = s["paper"] if not self.dark else "#1c1917"
        return f"""<rect width="100%" height="100%" fill="{bg}"/>
<rect width="100%" height="100%" fill="url(#dots)" opacity="0.6"/>
"""

    # ── Edge routing (orthogonal, avoiding nodes) ──────────────

    def _render_edge(self, e: Edge, s: dict) -> str:
        src = self.nodes.get(e.src)
        dst = self.nodes.get(e.dst)
        if not src or not dst:
            return ""

        marker_id, stroke = EDGE_STYLE.get(e.style, EDGE_STYLE["default"])
        dash = ' stroke-dasharray="5,4"' if e.style == "dashed" else ""

        # Determine routing direction
        src_is_left = src.right <= dst.x
        dst_is_left = dst.right <= src.x
        same_row = abs(src.cy - dst.cy) < 20
        needs_vertical = not same_row

        if src_is_left:
            # Rightward: src.right → dst.left, same y
            path = f"M {src.right} {src.cy} L {dst.x} {src.cy}"
            label_y = src.cy - 12
            label_x = (src.right + dst.x) // 2
        elif dst_is_left:
            # Leftward: src.left → dst.right, same y
            path = f"M {src.x} {src.cy} L {dst.right} {src.cy}"
            label_y = src.cy - 12
            label_x = (src.x + dst.right) // 2
        elif needs_vertical:
            # Cross-row: go down/up then across, using a vertical bus on the right
            bus_x = max(n.right for n in self.nodes.values()) + 30
            vy = (src.cy + dst.cy) // 2
            path = f"M {src.right} {src.cy} L {bus_x} {src.cy} L {bus_x} {dst.cy} L {dst.x} {dst.cy}"
            label_x = bus_x
            label_y = vy
        else:
            # Same row but overlapping — route around via right bus
            bus_x = max(n.right for n in self.nodes.values()) + 30
            path = f"M {src.right} {src.cy} L {bus_x} {src.cy} L {bus_x} {dst.cy} L {dst.x} {dst.cy}"
            label_x = bus_x
            label_y = (src.cy + dst.cy) // 2

        line = f'<path d="{path}" fill="none" stroke="{stroke}" stroke-width="1"{dash} marker-end="{marker_id}"/>'

        if e.label:
            label = e.label.upper()[:14]
            lw = len(label) * 6 + 12
            mask = f'<rect x="{label_x - lw // 2}" y="{label_y - 3}" width="{lw}" height="12" rx="2" fill="{OPAQUE_FILL}"/>'
            txt = f'<text x="{label_x}" y="{label_y + 6}" fill="{s["soft"]}" font-size="8" font-family="\'Geist Mono\',monospace" text-anchor="middle" letter-spacing="0.06em">{label}</text>'
            return f"{line}\n{mask}\n{txt}"

        return line

    # ── Node rendering ─────────────────────────────────────────

    def _render_node(self, n: Node, s: dict) -> str:
        fill, stroke, _ = NODE_TREATMENT.get(n.type, ("#ffffff", s["ink"], ""))
        dashed = ""
        if n.type == "optional":
            dashed = ' stroke-dasharray="4,3"'
        elif n.type == "security":
            dashed = ' stroke-dasharray="4,4"'

        tag_html = ""
        if n.tag:
            tag = n.tag.upper()[:6]
            tag_w = len(tag) * 7 + 12
            tag_x = n.x + 10
            tag_y = n.y + 8
            tag_html = (
                f'<rect x="{tag_x}" y="{tag_y}" width="{tag_w}" height="12" rx="2" '
                f'fill="transparent" stroke="{self._resolve_color(stroke, 0.40)}" stroke-width="0.8"/>\n'
                f'<text x="{tag_x + tag_w // 2}" y="{tag_y + 9}" '
                f'fill="{self._resolve_color(stroke, 0.80)}" font-family="\'Geist Mono\',monospace" '
                f'font-size="7" text-anchor="middle" letter-spacing="0.08em">{tag}</text>'
            )

        parts = [
            f'<rect x="{n.x}" y="{n.y}" width="{n.width}" height="{n.height}" rx="6" fill="{OPAQUE_FILL}"/>',
            f'<rect x="{n.x}" y="{n.y}" width="{n.width}" height="{n.height}" rx="6" fill="{fill}" stroke="{stroke}" stroke-width="1"{dashed}/>',
            tag_html,
            f'<text x="{n.cx}" y="{n.cy + 2}" fill="{s["ink"]}" font-size="12" font-weight="600" font-family="\'Geist\',sans-serif" text-anchor="middle">{self._xmlesc(n.label)}</text>',
        ]
        if n.sublabel:
            parts.append(
                f'<text x="{n.cx}" y="{n.cy + 18}" fill="{s["muted"]}" font-size="9" '
                f'font-family="\'Geist Mono\',monospace" text-anchor="middle">{self._xmlesc(n.sublabel)}</text>'
            )
        return "\n".join(parts)

    # ── Legend ──────────────────────────────────────────────────

    def _render_legend(self, s: dict) -> str:
        """Auto-generate a legend from node types used."""
        used_types = set()
        for n in self.nodes.values():
            if n.type == "focal":
                used_types.add("focal")
            elif n.type == "security":
                used_types.add("security")
            elif n.type in NODE_TREATMENT:
                used_types.add(n.type)
        if not used_types:
            return ""

        # Sort: focal first, then backend, input, store, security, optional, external
        order = ["focal", "backend", "input", "store", "security", "optional", "external"]
        sorted_types = [t for t in order if t in used_types]

        # Find bottom of content
        nodes_bottom = max((n.bottom for n in self.nodes.values()), default=80)
        legend_y = nodes_bottom + 40
        if self.height < legend_y + 60:
            self.height = legend_y + 60

        parts = [
            f'<line x1="40" y1="{legend_y - 8}" x2="{self.width - 40}" y2="{legend_y - 8}" '
            f'stroke="{s["rule"]}" stroke-width="0.8"/>',
            f'<text x="40" y="{legend_y + 8}" fill="{s["muted"]}" font-size="8" '
            f'font-family="\'Geist Mono\',monospace" letter-spacing="0.14em">LEGEND</text>',
        ]

        item_x = 120
        for t in sorted_types:
            fill, stroke, label = NODE_TREATMENT[t]
            dash_attr = ' stroke-dasharray="4,3"' if t in ("optional", "security") else ""
            parts.append(
                f'<rect x="{item_x}" y="{legend_y - 2}" width="16" height="10" rx="2" '
                f'fill="{fill}" stroke="{stroke}" stroke-width="1"{dash_attr}/>'
            )
            parts.append(
                f'<text x="{item_x + 22}" y="{legend_y + 6}" fill="{s["muted"]}" font-size="8" '
                f'font-family="\'Geist Mono\',monospace">{label}</text>'
            )
            item_x += 90

        return "\n".join(parts)

    # ── Export scripts (html2canvas + jsPDF) ────────────────────

    def _html_export_scripts(self) -> str:
        return """<script>
async function getCanvas() {
  const el = document.getElementById('diagram-container');
  const r = el.getBoundingClientRect();
  const pad = 24;
  return html2canvas(document.body, {
    backgroundColor: '#faf7f2', scale: 2, useCORS: true,
    ignoreElements: e => e.classList && e.classList.contains('toolbar'),
    x: r.left + window.scrollX - pad,
    y: r.top + window.scrollY - pad,
    width: r.width + pad * 2,
    height: r.height + pad * 2
  });
}
async function exportPNG(btn) {
  const orig = btn.textContent;
  btn.textContent = '...';
  try {
    const canvas = await getCanvas();
    const link = document.createElement('a');
    link.download = 'diagram.png'; link.href = canvas.toDataURL('image/png'); link.click();
    btn.textContent = 'OK';
  } catch(e) { btn.textContent = 'FAIL'; }
  setTimeout(() => btn.textContent = orig, 1500);
}
async function exportPDF(btn) {
  const orig = btn.textContent;
  btn.textContent = '...';
  try {
    const canvas = await getCanvas();
    const { jsPDF } = window.jspdf;
    const imgData = canvas.toDataURL('image/png');
    const ori = canvas.width > canvas.height ? 'landscape' : 'portrait';
    const pdf = new jsPDF({ orientation: ori, unit: 'px', format: [canvas.width, canvas.height], hotfixes: ['px_scaling'] });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('diagram.pdf');
    btn.textContent = 'OK';
  } catch(e) { btn.textContent = 'FAIL'; }
  setTimeout(() => btn.textContent = orig, 1500);
}
</script>
"""

    # ── Footers ────────────────────────────────────────────────

    def _svg_footer(self) -> str:
        return "</svg>\n</div>\n"

    def _html_footer(self) -> str:
        return "</body>\n</html>"

    @staticmethod
    def _xmlesc(text: str) -> str:
        return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")
