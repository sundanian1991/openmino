# Design Philosophy

> Sources: Mino (AI agent), 2026-03 ~ 2026-04, synthesized from visualization projects and feedback records
> Raw: [core-memory/MEMORY.md](../../raw/core-memory/MEMORY.md); [core-memory/insights.md](../../raw/core-memory/insights.md); [persona/偏好习惯.md](../../raw/persona/偏好习惯.md); [feedback/agent-reach-search.md](../../raw/feedback/agent-reach-search.md)

## Overview

年老师's visual design preferences converge on a single principle: clarity through restraint. The aesthetic is warm academic — off-white backgrounds, warm-brown emphasis, minimal color usage, hand-drawn organic curves. Quality is measured by whether the core message lands in 3 seconds, not by visual complexity. This philosophy was crystallized through the delivery of 30 supplier-management visualization units in April 2026.

## Style Identity: Warm Academic

The established design system (infographic-svg) defines a recognizable style:

| Token | Value | Rationale |
|-------|-------|-----------|
| Background | `#faf9f7` (warm off-white) | Paper-like, not clinical white |
| Primary text | `#1a1a1a` (near-black) | Readable, not harsh `#000` |
| Emphasis color | `#c98a6a` (warm brown) | The *only* color — everything else is grayscale |
| Semantic colors | ≤ 2 (olive green / burnt orange) | Reserved for meaning (good/bad/warning) |
| Canvas width | 680px fixed | Consistent embed width |
| Title font | Georgia, 18px bold | Academic serif |
| Body font | system-ui, 10.5px | Clean sans-serif for readability |
| Numeric font | monospace, 600 weight | Numbers must align and stand out |

The style preference order is: **Clean > Minimalist > Modern**, with Shadcn UI as the reference point.

## Core Principles

### No Emoji, Ever

Zero tolerance. Emoji are "太丑了" — they destroy the hand-crafted quality of visualizations. SVG icons replace all emoji use, and those SVGs must use Q Bézier curves for organic, hand-drawn feel. Geometric straight lines are forbidden in icon work.

### Hand-Drawn Organic Aesthetic

> "SVG 必须有手工感（Q 贝塞尔曲线），禁几何直线"

This is not about technical precision — it is about warmth and personality. The style emerged from studying specific reference pieces (the "李诞虾" icon) but the goal was never replication:

> "年老师要的不是'复制李诞虾'，而是'DNA+哲学能指导画任何东西'"

The technical parameters (colors, strokes, curves) are the skeleton. Design philosophy (perspective choice, structure decomposition, color allocation) is the flesh. Both are needed for stable output.

### Color Through Restraint

The emphasis system is deliberately minimal:
- One color (`#c98a6a`) carries all visual weight
- Semantic colors (good/bad) are the only exceptions, capped at 2
- Contrast comes from size, weight, and positioning — not from adding more colors

> "88分和89分没有区别" — the same logic applies to design: if everything is colored, nothing is colored.

### Data Mode vs Brand Mode

When presenting data, the palette shifts to black/white/gray base with terracotta (`#E2725B`) accents. Pure terracotta monochrome is "too flat" — accent colors must create visual hierarchy and guide the eye.

## Quality Standards: The Pyramid Verification Method

Every visualization passes through three verification layers:

### Layer 1: 3-Second Rule

The core message must be understood within 3 seconds:
- Title is the conclusion (e.g., "FCI速记卡" not "FCI相关卡片")
- Focal element is center-positioned in warm-brown emphasis
- Secondary information recedes (captions at 9px italic, `#6b6b6b`)

### Layer 2: 3-Step Decision Chain

Each visual answers three progressive questions:
1. What is this? (title + core visual, ~1 second)
2. What does it tell me? (logic chain, ~2 seconds)
3. What should I do? (action hint, ~3 seconds)

### Layer 3: 14-Point Quality Checklist

Covers font, container, color, layout, and logic dimensions. Key items:
- Container radii: outer box rx=10 (stroke 1.5px), cards rx=8 (stroke 1px)
- Left margin: 40px fixed
- Baseline grid: 4pt
- Information flow follows natural reading direction
- No cross-contamination between hierarchy levels

> "教科书级清晰度 = 3秒抓重点 × 3步逻辑链 × 14点质量清单 × 主题化视觉表达"

## Output Conventions

| Rule | Detail |
|------|--------|
| Markdown content | Use blockquotes (`>`), never code blocks for prose |
| Flows/relationships/comparisons | Use generative-ui-widget; no `→↓│` text-symbol simulation |
| Intercept rules > descriptive rules | Rules must block ("禁止", "零容忍", "必须"), not suggest |
| Visualization explanation text | Place *after* the widget, never before (prevents rendering truncation) |

## Frontend Notification Pattern (mino-frontend)

A validated pattern for business notifications, motivational posters, and policy announcements:

- Fixed-width centered: `min(820px, 100% - 2rem)`
- Long-page scrolling (not 100vh pagination)
- No shadows, no gradients, no emoji
- Uniform 2px border radius
- 3px top decorative line
- Bottom info bar
- Responsive card grid

Verified in production: `4月金条激励竞赛-v3.html`, `4月Q2变化通报_管理层版-v3.html`.

## Design System Philosophy

The underlying belief driving all visual work:

> "技术是骨架，设计哲学是血肉。只有骨架没有血肉，输出不稳定。"

Technical parameters are easy to codify. Design decisions — perspective, structure, color allocation — require philosophy. The goal is a reproducible "年老师 style" that can generate any subject matter, not a library of specific finished pieces.

This applies beyond SVG: PPTX and HTML quality differences trace back to "design system execution degree," not style differences. Unified Design Tokens + shared grid system + consistent visual anchors produce stable output across any medium.
