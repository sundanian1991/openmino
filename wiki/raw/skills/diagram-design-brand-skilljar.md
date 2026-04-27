# Skilljar Brand Tokens

**Source:** https://anthropic.skilljar.com  
**Extracted:** 2026-04-20  
**Status:** archived — not active (default skin is warm stone + rust)

---

## Quick Apply

To switch diagram-design to Skilljar branding, copy the tables below into:

1. `references/style-guide.md` — replace the token tables
2. `assets/template.html` — replace `:root` CSS variables
3. `assets/template-dark.html` — replace `:root` CSS variables
4. `assets/template-full.html` — replace `:root` CSS variables

---

## Color Tokens (Light Mode)

| Role | Value | Source |
|------|-------|--------|
| `paper` | `#FAF9F5` | Body background |
| `ink` | `#222222` | Primary body text |
| `muted` | `#5A697C` | Secondary text (blue-grey, 16 occurrences) |
| `accent` | `#0164CC` | Primary CTA button blue |
| `paper-2` | `#F0EEE6` | Card/container background |
| `rule` | `rgba(34,34,34,0.12)` | Border color (derived from ink @ 12%) |
| `rule-solid` | `rgba(90,105,124,0.25)` | Stronger borders (from muted) |
| `accent-tint` | `rgba(1,100,204,0.08)` | Accent fill (8% opacity) |
| `soft` | `#78716C` | Keep default (no direct match on site) |
| `link` | `#2563eb` | Keep default (external link blue) |

**Alternate accent considered:** Link color `#1694D1` appears 30+ times but is secondary; CTA blue `#0164CC` is primary brand accent.

---

## Color Tokens (Dark Mode — derived)

| Role | Value | Derivation |
|------|-------|------------|
| `paper` (dark) | `#1C1A16` | Warm deep charcoal (inverted from light paper) |
| `ink` (dark) | `#EAE8E4` | Warm off-white (inverted from light ink) |
| `muted` (dark) | `#9CA6B8` | Desaturated light blue-grey |
| `accent` (dark) | `#4DA3FF` | Brightened blue for dark mode contrast |
| `accent-tint` (dark) | `rgba(77,163,255,0.10)` | 10% opacity variant |

---

## Typography

| Role | Font Family | Fallback Chain |
|------|-------------|----------------|
| `title` | Copernicus | `'Copernicus', 'Playfair Display', 'Times New Roman', serif` |
| `node-name` | Open Sans | `'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif` |
| `sublabel` | SF Mono | `'SF Mono', 'Monaco', 'Menlo', 'JetBrains Mono', ui-monospace, monospace` |
| `eyebrow` | Geist Mono | Keep default (not present on Skilljar) |
| `arrow-label` | Geist Mono | Keep default |
| `callout` | Copernicus italic | `'Copernicus', 'Playfair Display', serif` (italic) |

**Google Fonts equivalent for HTML diagrams:**

```html
<!-- Minimal / Dark templates -->
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- Mapping: -->
<!-- Open Sans → node-name -->
<!-- Playfair Display → title / callout (serif fallback for Copernicus) -->
<!-- JetBrains Mono → sublabel (mono fallback for SF Mono) -->
```

**Note:** Skilljar self-hosts Copernicus/Open Sans/SF Mono. For standalone HTML diagrams that need to render in any browser, use Google Fonts equivalents (Open Sans / Playfair Display / JetBrains Mono).

---

## Switching Instructions

1. **Stop** — current skill uses default warm stone + rust skin
2. **Backup** — commit current state if not already
3. **Apply** — replace tokens in the 4 files listed above
4. **Verify** — open `assets/index.html` and confirm palette feels coherent across all 13 diagram types
5. **Tune** — if `muted` reads too dark/light against new `paper`, adjust by ±5-10%

**Rollback:** Restore from git or this archived file.

---

## Notes

- **Contrast check:** `#222222` on `#FAF9F5` = 15.4:1 (WCAG AAA passed)
- **Accent choice:** CTA blue `#0164CC` chosen over link blue `#1694D1` (higher frequency but lower visual weight)
- **Paper philosophy:** Skilljar uses warm off-white (not pure `#FFFFFF`), consistent with diagram-design's warm-neutral ethos
- **No CSS custom properties** on Skilljar — tokens extracted from computed styles

---

*Extracted via agent-browser navigation of anthropic.skilljar.com on 2026-04-20.*
