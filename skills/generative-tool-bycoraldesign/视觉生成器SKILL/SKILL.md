---
name: generative-tool
description: Build single-file HTML generative art tools (pattern generators, dot matrix, arc patterns, orb rings, particle systems) with a consistent instrument-panel UI. Use this skill whenever the user asks to create a "生成器" / generator / visual tool / creative coding tool, wants to convert a reference image into a parameterized generator, or asks to add features (audio reactivity, motion, export) to an existing generator built in this style. Also trigger when the user mentions 点阵/弧形/圆环/粒子 generators or references previous generator files like dot-matrix-generator.html.
---

# Generative Tool Builder

Build single-file HTML creative tools with a shared "instrument panel" design language: left canvas preview, right parameter panel, monospace typography, warm neutral UI that never competes with the artwork.

The user (a designer) has an established series of these tools — FIELD (contour terrain), AURA (diffusion gradients), SLICE (image shredder), dot matrix, arc circle, orb rings. New tools must feel like siblings of these.

## Hard rules

1. **Single file.** All CSS + JS inline in one `.html`. No build step, no external deps except Google Fonts (IBM Plex Mono) and, only when needed, gif.js from cdnjs.
2. **UI is neutral, artwork is loud.** UI uses only the warm-gray token palette below. Never use accent colors in the UI — all color lives on the canvas.
3. **Seeded random, never Math.random() for layout.** Layout must be reproducible via a seed. `Math.random()` is allowed only for transient per-frame effects (e.g. audio jitter).
4. **Chinese labels for parameters, English for section headers.** Section labels like `Rings`, `Motion`, `Colors` stay English uppercase; slider labels are Simplified Chinese (弧层数, 切割角度, 暈染大小).
5. **Export via data URI + visible fallback link.** `link.click()` is blocked in some sandboxes — always show an `#elink` anchor ("右键另存为") after export attempts.
6. **Deliver to `/mnt/user-data/outputs/` and present with present_files.**

## UI skeleton

Every tool has exactly four zones:

```
┌─────────────────────────────────────┬──────────┐
│ TOPBAR: brand · divider · live meta │          │
├─────────────────────────────────────┤  SIDE    │
│                                     │  PANEL   │
│   CANVAS AREA (bg2, crosshair       │  (scroll │
│   corners, 4 corner labels)         │  + fixed │
│                                     │  footer) │
├─────────────────────────────────────┤          │
│ STATUSBAR: SEED · COLORS · MOTION   │          │
└─────────────────────────────────────┴──────────┘
```

- **Topbar** (36–38px): brand name uppercase letterspaced, 1px divider, live metadata (`MODE`, `SIZE`, `DOTS`), right side holds mode tabs and audio controls.
- **Canvas area**: `--bg2` background; four crosshair corner marks (16px L-shapes via ::before/::after on container + inner); four tiny corner labels (9px mono) showing seed / count / motion state / dimensions. Canvas itself gets `box-shadow: 0 2px 24px rgba(0,0,0,.12)`.
- **Side panel** (260–320px): scrollable sections separated by 1px borders, each with a 9px uppercase section label. Footer pinned at bottom with Randomize + primary Export buttons.
- **Statusbar** (22–24px): 9px mono key–value pairs, right edge stops at panel.

## Design tokens

```css
:root {
  --bg:#f0eeeb; --bg2:#e8e5e0; --bg3:#dedad4;
  --border:#c8c3bc; --border2:#b0aaa2;
  --text:#1a1816; --text2:#6b6560; --text3:#9b9590;
  --mono:'IBM Plex Mono',monospace;
}
```

Fonts: IBM Plex Mono 300/400/500 for everything. Sliders: 2px track (`--border`), 9–10px round thumb (`--text`). Active segment buttons: `background:var(--text); color:var(--bg)` (invert, no color). Primary button: same inversion.

## Code architecture

State lives in one object `S`; audio params (if any) in `AP`. Standard skeleton:

```js
let baseSeed = 42, animSpeed = 0, animFrame = null, lastTime = null, time = 0;
const speedVals = [0, 0.3, 0.8, 1.8];        // Stop/Slow/Mid/Fast

let rng = baseSeed;
function srand(s){ rng = s; }
function rand(){ rng = (rng*16807) % 2147483647; return (rng-1)/2147483646; }

function drawFrame(t){
  srand(baseSeed);                            // reset seed every frame
  canvas.width = S.cw; canvas.height = S.ch;  // also clears
  /* bg → background layers → tracks → main elements */
  updateLabels();
}
function animate(ts){
  if(lastTime===null) lastTime=ts;
  const dt=(ts-lastTime)/1000; lastTime=ts;
  time += dt * speedVals[animSpeed];
  drawFrame(time);
  animFrame = requestAnimationFrame(animate);
}
```

Key patterns (full copy-paste blocks in `references/code-patterns.md` — read it before writing code):

- `sl(id, key, suffix, parse)` — generic slider binder; keeps `S`, the value readout, and redraw in sync. Structural params (counts, gaps) invalidate a `cached` layout; style params just redraw.
- `bindHex(inputId, swatchId, key)` — hex text input + swatch, regex-validated `#RRGGBB`, revert on blur if invalid.
- Weighted color list: rows of `swatch + hex input + weight number + live %`, delete button when >1 entries. Optional per-entry 单色/渐变 toggle revealing a second hex.
- Mode tabs / motion segments: `.mseg` groups, `data-*` attributes, single delegated click handler.
- Layout caching: build positions once into `cachedX`, null it when structural params change; per-frame motion applies rotation/phase on top of cached base positions.

## Motion system

Four-level segment: Stop / Slow / Mid / Fast (慢/中/快 acceptable). Optional: direction toggle (顺时针/逆时针), 层速差 (per-layer speed multiplier `1 + i*speedDiff`), 呼吸 breathing scale `1 + amp*sin(t*k + phase)`. Motion never re-randomizes layout — it only advances phase/rotation over the cached layout.

## Audio reactivity (when requested)

Web Audio + AnalyserNode, three-band FFT mapping. Standard mapping (keep it — user relies on it):

| Band | Range | Drives |
|---|---|---|
| Bass | 20–200 Hz | element size, wave amplitude |
| Mid | 200–2500 Hz | rotation/flow speed |
| Hi | 2500–8000 Hz | position jitter |

Plus 灵敏度 (sensitivity multiplier) and 平滑度 (EMA smoothing) sliders. UI: mic button + green live dot in topbar, three 3px VU bars (blue/green/tan), band percentages in statusbar. Auto-start animation when mic connects. Full implementation in `references/code-patterns.md`.

## Export

- **PNG**: `canvas.toDataURL('image/png')` → set on `#elink`, `link.click()`, keep link visible.
- **SVG** (vector tools): serialize geometry to an SVG string, `data:image/svg+xml;charset=utf-8,` + `encodeURIComponent`.
- **GIF** (animated tools): gif.js from cdnjs, offscreen canvas at reduced size, capture N frames over one full loop, progress overlay on canvas area, fall back to PNG with an alert if the lib fails to load.
- Pause animation during capture, resume after.

## Workflow when given a reference image

1. **Analyze the structure out loud first**: is it a grid, concentric rings, flow streams, orbital rings? What are the light/shadow layers? What repeats, what's random?
2. Derive parameters from that analysis — every visual property the user might tweak becomes a slider (counts, spacing, jitter, size + size-random, alpha + alpha-random, colors + weights).
3. Default values must reproduce the reference image closely.
4. Iterate on the user's corrections — they often refine the layout logic ("轨迹是同心圆不是贝塞尔") after seeing v1; expect to rewrite layout functions while preserving everything else.
