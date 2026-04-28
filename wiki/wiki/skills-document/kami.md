# Kami 文档排版技能

> Sources: Kami, 10+ files, 2026-04-28
> Created: 2026-04-27
> Raw: [SKILL](../../raw/skills/kami-SKILL.md); [README](../../raw/skills/kami-README.md); [CHEATSHEET](../../raw/skills/kami-CHEATSHEET.md); [CLAUDE](../../raw/skills/kami-CLAUDE.md); [design](../../raw/skills/kami-design.md); [diagrams](../../raw/skills/kami-diagrams.md); [production](../../raw/skills/kami-production.md); [writing](../../raw/skills/kami-writing.md)

## 概述

Kami 是专业文档排版技能，支持简历、一页纸、白皮书、股权报告、信件、长文档、作品集、幻灯片等多种文档类型的精美排版。包含完整的模板系统、图表组件、字体资源和构建工具。

## 核心文件

### SKILL.md

```
---
name: kami
description: 'Typeset professional documents: resumes, one-pagers, white papers, letters, portfolios, slide decks. Warm parchment, ink-blue accent, serif-led hierarchy. CN uses TsangerJinKai02, EN uses Charter, JA uses YuMincho (best-effort). Triggers on "做 PDF / 排版 / 一页纸 / 白皮书 / 作品集 / 简历 / PPT / slides", or "build me a resume / make a one-pager / design a slide deck / turn this into a PDF / make this presentable".'
---

# kami · 紙

**紙 · かみ** - the paper your deliverables land on.

Good content deserves good paper. One design language across eight document types: warm parchment canvas, ink-blue accent, serif-led hierarchy, tight editorial rhythm.

Part of `Kaku · Waza · Kami` - Kaku writes code, Waza drills habits, **Kami delivers documents**.

## Step 1 · Decide the language

**Match the user's language.** Chinese -> `*.html` / `slides.py`. English -> `*-en.html` / `slides-en.py`. Japanese -> CJK path (`.html` / `slides.py`) as best-effort, JP Mincho first, visual QA before shipping. Reference docs are shared English specs.

When ambiguous (e.g. a one-word command like "resume"), ask a one-liner rather than guess.

| User language | HTML templates | Slides template |
|---|---|---|
| Chinese (primary) | `*.html` | `slides.py` |
| English | `*-en.html` | `slides-en.py` |
| Japanese (best-effort) | `*.html` | `slides.py` |
| Other languages (best-effort) | choose CJK or EN path by script coverage, then verify manually | choose `slides.py` or `slides-en.py`, then verify manually |

Always use `CHEATSHEET.md` and `references/*.md` for design, writing, production, and diagram guidance.

## Step 2 · Pick the document type

| User says | Document | CN template | EN template |
|---|---|---|---|
| "one-pager / 方案 / 执行摘要 / exec summary" | One-Pager | `one-pager.html` | `one-pager-en.html` |
| "white paper / 白皮书 / 长文 / 年度总结 / technical report" | Long Doc | `long-doc.html` | `long-doc-en.html` |
| "formal letter / 信件 / 辞职信 / 推荐信 / memo" | Letter | `letter.html` | `letter-en.html` |
| "portfolio / 作品集 / case studies" | Portfolio | `portfolio.html` | `portfolio-en.html` |
| "resume / resume / CV / 简历" | Resume | `resume.html` | `resume-en.html` |
| "slides / PPT / deck / 演示" | Slides | `slides.py` | `slides-en.py` |
| "个股研报 / equity report / 估值分析 / investment memo / 股票分析" | Equity Report | `equity-report.html` | `equity-report-en.html` |
| "更新日志 / changelog / release notes / 版本记录" | Changelog | `changelog.html` | `changelog-en.html` |

> Long deck (>20 slides): also read Deck Recipe (design.md section 8).

If unsure, ask a one-liner about the scenario rather than guess.

### Diagrams (primitives, not a 7th doc type)

When the user asks for **a diagram inside** a long-doc / portfolio / slide (not a standalone document), route to `assets/diagrams/` rather than a template:

| User says | Diagram | Template |
|---|---|---|
| "架构图 / architecture / 系统图 / components diagram" | Architecture | `assets/diagrams/architecture.html` |
| "流程图 / flowchart / 决策流 / branching logic" | Flowchart | `assets/diagrams/flowchart.html` |
| "象限图 / quadrant / 优先级矩阵 / 2×2 matrix" | Quadrant | `assets/diagrams/quadrant.html` |
| "柱状图 / bar chart / 分类对比 / grouped bars" | Bar Chart | `assets/diagrams/bar-chart.html` |
| "折线图 / line chart / 趋势 / 股价 / time series" | Line Chart | `assets/diagrams/line-chart.html` |
| "环形图 / donut / pie / 占比 / 分布结构" | Donut Chart | `assets/diagrams/donut-chart.html` |
| "状态机 / state machine / 状态图 / lifecycle" | State Machine | `assets/diagrams/state-machine.html` |
| "时间线 / timeline / 里程碑 / milestones / roadmap" | Timeline | `assets/diagrams/timeline.html` |
| "泳道图 / swimlane / 跨角色流程 / cross-team flow" | Swimlane | `assets/diagrams/swimlane.html` |
| "树状图 / tree / hierarchy / 层级 / 组织架构" | Tree | `assets/diagrams/tree.html` |
| "分层图 / layer stack / 分层架构 / OSI / stack" | Layer Stack | `assets/diagrams/layer-stack.html` |
| "维恩图 / venn / 交集 / overlap / 集合关系" | Venn | `assets/diagrams/venn.html` |
| "K 线 / candlestick / OHLC / 股价走势 / price history" | Candlestick | `assets/diagrams/candlestick.html` |
| "瀑布图 / waterfall / 收入桥 / revenue bridge / decomposition" | Waterfall | `assets/diagrams/waterfall.html` |

Read `references/diagrams.md` before drawing - it has the selection guide, kami token map, and the AI-slop anti-pattern table. Extract the `<svg>` block from the template and drop it into a `<figure>` inside long-doc / portfolio.

Before drawing, always ask: **would a well-written paragraph teach the reader less than this diagram?** If no, don't draw.

**Auto-select charts from data.** When the content contains numerical data (revenue splits, trends over time, category comparisons), choose the appropriate chart type and embed it. Do not wait for the user to request a specific chart. Selection guide: proportional breakdown -> donut, time series -> line, category comparison -> bar, price history -> candlestick, value decomposition -> waterfall.

## Step 2.1 · Source and material pass

Run this before distilling or filling content when the document depends on facts or materials outside the user's draft. Skip it only for personal drafts where the user already supplied everything needed.

### Source check

Trigger when the document mentions a specific company, product, person, release date, version, funding round, metric, market fact, technical spec, or any current fact likely to change.

- Use primary sources before writing: user-provided material, official site, docs, filings, press release, app store page, or repo release
- Keep a short note of source names and dates for facts that drive the document
- If sources conflict or a fact cannot be checked quickly, ask the user instead of choosing silently
- Avoid current-sounding claims such as "latest", "recent", "new", version numbers, launch dates, or financial figures unless they are checked

### Material check

Trigger when the document is about a company, product, project, venue, or personal brand.

Confirm the materials that make the subject recognizable before layout:

| Need | Required when | Accept |
|---|---|---|
| Logo | Any branded document | User file or official SVG/PNG |
| Product image | Physical product / venue / object | Official image, user image, or marked gap |
| UI screenshot | App / SaaS / website / tool | Current screenshot, official product image, or user capture |
| Brand colors | Branded one-pager / portfolio / deck | Official value, extracted asset value, or keep kami ink-blue |
| Fonts | Only if brand typography matters | Official font, close system fallback, or kami default |

If a required item is missing, use a compact gap table and ask once. Do not replace missing material with generic imagery, approximate logo drawings, or invented values.

## Step 2.5 · Distill raw content (if applicable)

Skip this step if the user already provides structured content (clear sections, bullet points, metrics in place).

When the user hands over **raw material** (meeting notes, brain dump, existing doc in different format, chat transcript, scattered points):

1. **Extract**: pull out every factual claim, number, date, name, source, material reference, and action item
2. **Classify**: map each extract to the target template's sections (see `references/writing.md` for section structure per doc type)
3. **Gap-check**: list what the template needs but the raw content doesn't have - include missing facts, missing proof, and missing materials
4. **Ask once**: share the gap table with the user. Do not guess to fill gaps.

Example gap-check:

| Template needs | Found | Missing |
|---|---|---|
| 4 metric cards | "8 years", "50-person team" | 2 more quantifiable results |
| 3-5 core projects | 2 mentioned | at least 1 more with outcome |
| Materials | logo file provided | product screenshot source |

Then proceed to Step 3 with structured, distilled content.

---

## Step 3 · Load the right amount of spec

Pick the tier that matches the task. Default to the lowest tier that covers the work.

| Tier | When | Read |
|---|---|---|
| **Content-only** | Updating text, swapping bullets, translating an existing doc. CSS stays untouched. | `CHEATSHEET.md` only |
| **Layout tweak** | Adjusting spacing, moving sections, changing font size within spec. CSS touched. | `CHEATSHEET.md` + template (tokens already inline) |
| **New document** | Building from scratch or from raw content. | Full design spec + writing spec + template |
| **Sources / materials** | Company, product, market, launch, funding, specs, or branded subject. | `writing.md` source rules + user/source material |
| **Deck (>20 slides)** | Long presentation needing Part Divider, Code Cards, section headers. | Full design spec + Deck Recipe (design.md section 8) |
| **Troubleshoot** | Rendering bug, font issue, page overflow. | `production.md` (+ design spec if CSS is the cause) |
| **Diagram** | Embedding SVG in a doc. | `diagrams.md` only (has its own token map) |

You can always escalate mid-task if the work turns out to need more than the initial tier.

The full spec files for reference:
- Design: `references/design.md`
- Writing: `references/writing.md`
- Production: `references/production.md`
- Diagrams: `references/diagrams.md`

## Step 4 · Fill content into the template

- Copy the template into your working directory; don't write HTML from scratch
- **CSS stays untouched**, only edit the body
- Content follows `writing.md`: data over adjectives, distinctive phrasing over industry clichés
- **Before filling, read the quality bar for your document type** in `writing.md` section "Quality bars by document type". Structure is necessary but not sufficient: a resume bullet needs Action + Scope + Result + Business Outcome; an equity report needs variant perception + quantified catalysts; slides need assertion-evidence titles. Meeting the quality bar is as important as filling every placeholder.

### Fill PDF metadata (WeasyPrint reads these into the PDF)

Every template has meta placeholders in `<head>`. Fill all four before building:

| Placeholder (CN) | Placeholder (EN) | Rule |
|---|---|---|
| `{{作者}}` | `{{AUTHOR}}` | Resume/letter/portfolio: use the person's name from the doc. All others: leave as-is (build script infers from git config or env) |
| `{{摘要}}` | `{{DESCRIPTION}}` | Extract one sentence (≤150 chars) from the first 2 paragraphs |
| `{{关键词}}` | `{{KEYWORDS}}` | 3-5 keywords from the title + section headings, comma-separated |
| `{{文档标题}}` / `{{信件主题}}` etc. | `{{DOC_TITLE}}` / `{{LETTER_SUBJECT}}` etc. | Infer from the H1 or `.header .title` text |

`<meta name="generator" content="Kami">` is already fixed in the template; do not change it.

**Author inference**: `build.py` automatically sets PDF `/Author` metadata from:
1. `git config user.name` (primary)
2. `KAMI_AUTHOR` environment variable (fallback)
3. `"Kami"` (final fallback)

For personal documents (resume/letter/portfolio), the HTML `<meta name="author">` should match the person's name in the content. For non-personal documents (one-pager/long-doc), leave the placeholder as-is and let the build script infer it.

## Step 4.5 · Auto-select output format

Do not ask the user which format to export. Decide from context:

| Signal | Output | Why |
|---|---|---|
| Any document request | HTML + PDF | PDF is the default deliverable, HTML is the source |
| Slides / PPT / deck | HTML + PDF + PPTX | Presentations need a projectable format |
| "分享" / "发朋友圈" / "share" / "post" / "preview" | + PNG | Social platforms and messaging need images |
| "嵌入" / "插图" / "embed in another doc" | PNG only | Used as material inside other documents |
| User explicitly says a format | Follow the user | Explicit request overrides auto-selection |

PDF always ships. PPTX follows slides. PNG follows sharing context. The user should never need to think about formats.

## Step 5 · Build & verify

```bash
python3 scripts/build.py --verify           # build all templates + page count + font check + slides
python3 scripts/build.py --verify resume-en # single target full verification
python3 scripts/build.py --verify slides    # single slide deck verification
python3 scripts/build.py --check-placeholders path/to/filled.html
python3 scripts/build.py --check            # CSS rule violations only (fast, no build)
```

Source templates intentionally keep `{{...}}` fields. Run placeholder checks on completed documents, not on the template library.

Visual anomalies (tag double rectangle, font fallback, page break issues) -> `production.md` Part 4.

## Fonts

**Chinese**
- Main serif: TsangerJinKai02-W04.ttf (400 weight) + TsangerJinKai02-W05.ttf (500 weight, real bold)
- Templates use dual @font-face declarations: W04 for body text, W05 for headings
- Both files are commercial fonts. Keep them available in the repository for local preview and CDN fallback, but do not bundle them inside Claude Desktop skill ZIPs
- Fallback chain baked into templates: Source Han Serif SC -> Noto Serif CJK SC -> Songti SC -> STSong -> Georgia

**Japanese (best-effort)**
- Uses CJK template path, no dedicated `-ja` templates yet
- JP Mincho-first stack: YuMincho -> Hiragino Mincho ProN -> Noto Serif CJK JP -> Source Han Serif JP -> TsangerJinKai02 -> serif
- Visually verify line breaks, punctuation rhythm, and emphasis weight before shipping

**English**
- Single serif: Charter (system-bundled, macOS/iOS), used for both headlines and body
- No separate sans: `--sans: var(--serif)`, one font per page
- Fallback: Georgia (cross-platform) / Palatino / Times New Roman

Font files next to HTML with relative `@font-face` paths is the most stable setup. `scripts/package-skill.sh` excludes TsangerJinKai TTFs from the Claude Desktop ZIP.

**Font auto-recovery (Claude Desktop)**

Before building Chinese documents, check font files. If missing, download into `assets/fonts/`:

```bash
# Check
test -f assets/fonts/TsangerJinKai02-W04.ttf || {
  curl -fsSL "https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W04.ttf" \
    -o assets/fonts/TsangerJinKai02-W04.ttf
  curl -fsSL "https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W05.ttf" \
    -o assets/fonts/TsangerJinKai02-W05.ttf
}
```

Run once before building. If network is unavailable, WeasyPrint falls back to Source Han Serif SC.

## Feedback protocol

When the user gives **vague visual feedback** ("looks off", "太挤了", "not elegant"), do not guess. Ask back with current values:

| User says | Ask about |
|---|---|
| "太挤了" / "too cramped" | Which element? Line-height (current: X)? Padding (current: Y)? Page margin? |
| "太松了" / "too loose" | Same direction, reversed |
| "颜色不对" / "color feels wrong" | Which element? Brand blue overused? A gray reading too cool? |
| "不够好看" / "not polished" | Font rendering? Alignment? Whitespace distribution? Hierarchy unclear? |
| "看着不专业" / "unprofessional" | Content wording? Or layout (alignment, consistency)? |

Template response: "X is currently set to Y. Would you like (a) [specific alternative within spec] or (b) [another option]?"

Never say "I'll adjust the spacing" without naming the exact property and its new value.

---

## When not to use this skill

- User explicitly wants Material / Fluent / Tailwind default - different design language
- Need dark / cyberpunk / futurist aesthetic (this is deliberately anti-future)
- Need saturated multi-color (this has one accent)
- Need cartoon / animation / illustration style (this is editorial)
- Web dynamic app UI (this is for print / static documents)

---

Next: **apply Step 3's tier table to decide what to read**, then copy the matching template and start filling.
```

### README.md

```
<div align="center">
  <img src="https://gw.alipayobjects.com/zos/k/vl/logo.svg" width="120" />
  <h1>Kami</h1>
  <p><b>Good content deserves good paper.</b></p>
  <a href="https://github.com/tw93/kami/stargazers"><img src="https://img.shields.io/github/stars/tw93/kami?style=flat-square" alt="Stars"></a>
  <a href="https://github.com/tw93/kami/releases"><img src="https://img.shields.io/github/v/tag/tw93/kami?label=version&style=flat-square" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
  <a href="https://twitter.com/HiTw93"><img src="https://img.shields.io/badge/follow-Tw93-red?style=flat-square&logo=Twitter" alt="Twitter"></a>
</div>

## Why

Kami (紙, かみ) means paper in Japanese: the surface where a finished idea lands. AI-generated documents keep drifting into generic gray, inconsistent styling, and layouts that change every session.

Kami is a document design system for the AI era: one constraint language, six formats, simple enough for agents to run reliably, strict enough to keep every output coherent and ready to ship. English and Chinese are first-class; Japanese works via a best-effort CJK path with visual QA before delivery.

Part of a trilogy: [Kaku](https://github.com/tw93/Kaku) (書く) writes code, [Waza](https://github.com/tw93/Waza) (技) drills habits, [Kami](https://github.com/tw93/Kami) (紙) delivers documents.

## See it

<table>
<tr>
  <td align="center" width="25%">
    <a href="assets/demos/demo-tesla.pdf"><img src="assets/demos/demo-tesla.png" alt="Tesla company one-pager"></a>
    <br><b>One-Pager</b> · 中文
    <br><sub>Tesla 公司介绍 · 单页</sub>
  </td>
  <td align="center" width="25%">
    <a href="assets/demos/demo-agent-slides.pdf"><img src="assets/demos/demo-agent-slides.png" alt="Agent keynote slides" /></a>
    <br><b>Slides</b> · English
    <br><sub>Agent keynote, 6 slides</sub>
  </td>
  <td align="center" width="25%">
    <a href="assets/demos/demo-musk-resume.pdf"><img src="assets/demos/demo-musk-resume.png" alt="Elon Musk resume"></a>
    <br><b>Resume</b> · English
    <br><sub>Founder CV, 2 pages</sub>
  </td>
  <td align="center" width="25%">
    <a href="assets/demos/demo-kaku.pdf"><img src="assets/demos/demo-kaku.png" alt="Kaku portfolio"></a>
    <br><b>Portfolio</b> · 日本語
    <br><sub>Kaku ターミナル作品集 · 7 ページ</sub>
  </td>
</tr>
</table>

## Usage

**Claude Code**

```bash
npx skills add tw93/kami -a claude-code -g -y
```

**Codex**

```bash
npx skills add tw93/kami -a codex -g -y
```

**Generic agents** (opencode, pi, and other tools that read from `~/.agents/`; `codex` is included, but use `-a codex` if you only target Codex)

```bash
npx skills add tw93/kami -a '*' -g -y
```

**Claude Desktop**

Download [kami.zip](https://cdn.jsdelivr.net/gh/tw93/kami@main/dist/kami.zip), open Customize > Skills > "+" > Create skill, and upload the ZIP directly (no need to unzip).

The ZIP is lightweight: Chinese fonts load from local checkout first, then jsDelivr CDN. If rendering is off, Claude downloads them on the next run. To update: download the same URL, click "..." on the skill card, choose Replace, upload.

The skill auto-triggers from natural requests, no slash command needed. Optimized for English and Chinese; Japanese supported via a best-effort CJK path with visual QA before delivery.

Example prompts by language:

- English: `make a one-pager for my startup` / `turn this research into a long doc` / `write a formal letter` / `make a portfolio of my projects` / `build me a resume` / `design a slide deck for my talk`
- 中文: `帮我做一份一页纸` / `帮我排版一份长文档` / `帮我写一封正式信件` / `帮我做一份作品集` / `帮我做一份简历` / `帮我做一套演讲幻灯片`
- 日本語: `スタートアップ向けの一枚資料を作って` / `この調査を長文レポートに整えて` / `正式な依頼文を作って` / `プロジェクト作品集を作って` / `履歴書を作って` / `登壇用スライドを作って`

## Design

Warm parchment canvas, ink blue as the sole accent, serif carries hierarchy, no hard shadows or flashy palettes. Not a UI framework; a constraint system for printed matter. Documents should read as composed pages, not dashboards.

Six document types (One-Pager, Long Doc, Letter, Portfolio, Resume, Slides) with dedicated EN/CN templates and a best-effort Japanese path. Twelve inline SVG diagram types included. Kami picks the right variant based on the language you write in.

| Element | Rule |
|---|---|
| Canvas | `#f5f4ed` parchment, never pure white |
| Accent | Ink blue `#1B365D` only, no second chromatic hue |
| Neutrals | All warm-toned (yellow-brown undertone), no cool blue-grays |
| Serif | Body 400, headings 500. Avoid synthetic bold |
| Line-height | Tight titles 1.1-1.3, dense body 1.4-1.45, reading body 1.5-1.55 |
| Shadows | Ring or whisper only, no hard drop shadows |
| Tags | Solid hex backgrounds only. `rgba()` triggers a WeasyPrint double-rectangle bug |

**Fonts**: Each language uses a single serif font for the entire page. Chinese: TsangerJinKai02. Japanese: YuMincho. English: Charter. TsangerJinKai is free for personal use, commercial use requires a license from [tsanger.cn](https://tsanger.cn). All other fonts are system-bundled.

Full spec: design.md. Cheatsheet: CHEATSHEET.md.

## Background

I like investing in US equities and ask Claude to write research reports all the time. Every output landed in the same default-doc look: gray, flat, a different layout each session. The structure was hard to scan, the formatting felt dated, and nothing about the page made me want to keep reading. So I started fixing the typography, the palette, the spacing, one rule at a time, until the report became a page I actually enjoyed.

Later I needed to present "The Agent You Don't Know: Principles, Architecture and Engineering Practice." I already had the document and didn't want to build slides from scratch, so I used Claude Design to lay it out in my own style, tweaked it round after round, and eventually got it to a place I was happy with. That process added inline SVG charts, a unified warm palette, and a tighter editorial rhythm. It kept growing until it covered every document I regularly ship, so I kept abstracting the process, and it became kami: one quiet design system I can hand to any agent and trust the output.

## Support

- If kami helped you, [share it](https://twitter.com/intent/tweet?url=https://github.com/tw93/kami&text=Kami%20-%20A%20quiet%20design%20system%20for%20professional%20documents.) with friends or give it a star.
- Got ideas or bugs? Open an issue or PR.
- I have two cats, TangYuan and Coke. If you think kami delights your life, you can feed them <a href="https://miaoyan.app/cats.html?name=Kami" target="_blank">canned food</a>.

## License

MIT License. Feel free to use kami and contribute.
```

### CLAUDE.md

```
# Kami

Kami is one project in the Kaku (write code), Waza (practice craft), and Kami (ship documents) trilogy.
Warm parchment canvas, ink-blue accent, serif-led hierarchy, and editorial whitespace across eight document templates and fourteen diagram types.

## Structure

| Path | Purpose | Change frequency |
|---|---|---|
| `SKILL.md` | Claude routing and operating rules | Low |
| `CHEATSHEET.md` | Quick design reference, English-only source | Low |
| `references/design.md` | Design system spec, English-only source | Low |
| `references/writing.md` | Content strategy + quality bars per document type, English-only source | Low |
| `references/production.md` | WeasyPrint build and troubleshooting runbook, English-only source | Medium |
| `assets/templates/` | 8 document templates in 2 base language families, plus Japanese best-effort mapping | Medium |
| `assets/demos/` | README showcase demos, regenerate after visual changes | Medium |
| `scripts/build.py` | PDF / PNG / PPTX build and verification script | Low |
| `scripts/package-skill.sh` | Claude Desktop ZIP packager, excluding large fonts | Low |
| `dist/kami.zip` | Claude Desktop ZIP artifact, updated from main | Medium |

Reference docs are English-only. Do not recreate `*.en.md` duplicates. Chinese / English output differences belong in the templates. Japanese currently uses a best-effort CJK mapping with JP Mincho-first font stacks, no dedicated `-ja` templates yet, and requires visual QA before shipping.
Do not use graphic emoticons in docs, template comments, or script output. Use `OK:` / `ERROR:` for status and `Use` / `Avoid` for comparisons.

## Verification

```bash
python3 scripts/build.py          # build all outputs
python3 scripts/build.py --check  # scan CSS invariants and token drift
python3 scripts/build.py --verify # verify templates, page counts, fonts, and slides
python3 scripts/build.py --check-placeholders path/to/filled.html
python3 scripts/build.py --check-orphans [path/to/doc.pdf]  # scan for orphan text (last line <= 2 words)
```

Expected page counts: one-pager 1 / letter 1 / resume 2 strict / long-doc 7 +/- 2 / portfolio 6 +/- 2 / slides 7 +/- 3 / equity-report 2-3 / changelog 1-2

**PDF metadata**: `build.py` automatically sets `/Author` from `git config user.name` (or `KAMI_AUTHOR` env var) when the HTML template contains a placeholder like `{{作者}}` or `{{AUTHOR}}`. `/Producer` and `/Creator` are always set to `"Kami"`.

## Demo Screenshots

Current demos in `assets/demos/`:

| Demo | Source | Type |
|---|---|---|
| `demo-tesla.*` | Tesla Q1 2026 equity report (CN) | equity-report |
| `demo-kaku.*` | Kaku portfolio (JP) | portfolio |
| `demo-musk-resume.*` | Elon Musk resume (EN) | resume |
| `demo-agent-slides.*` | Agent development slides (EN) | slides |

All demo PNG files use **1241x1754px** (first A4 portrait page at 150dpi).

For one-page and multi-page documents (one-pager / letter / resume / portfolio / long-doc / equity-report), capture page 1:
```bash
pdftoppm -r 150 -f 1 -l 1 -png <pdf> /tmp/p && cp /tmp/p-1.png <target>.png
```

For landscape slides, capture the first 2 pages, resize each to 867px high, add a 20px gap, then extend to 1241px wide:
```bash
pdftoppm -r 150 -f 1 -l 2 -png <pdf> /tmp/sl
magick /tmp/sl-1.png -resize x867 /tmp/sl1.png
magick /tmp/sl-2.png -resize x867 /tmp/sl2.png
magick -size $(identify -format '%w' /tmp/sl1.png)x20 xc:'#f5f4ed' /tmp/gap.png
magick /tmp/sl1.png /tmp/gap.png /tmp/sl2.png -append /tmp/stacked.png
magick /tmp/stacked.png -gravity Center -background '#f5f4ed' -extent 1241x1754 <target>.png
```

## Change Rules

- Style changes: update `references/design.md` and the matching template `<style>` tokens, then run `build.py` and confirm page counts stay stable.
- Content changes: keep CSS unchanged, edit only the body, then run `build.py`.
- New templates: copy the nearest existing template, keep it aligned with `design.md`, add routing to `SKILL.md`, and add demos.

## High-Risk Pitfalls

See `references/production.md` Part 4.

1. Tag rgba double rectangle: use solid hex backgrounds.
2. Thin border plus border radius double ring: border < 1pt with border-radius can trigger it.
3. Resume 2-page overflow: tiny font, fallback, line-height, or margin changes can break it.
4. `break-inside` fails inside flex: wrap content in a block wrapper.
5. `height: 100vh` is unreliable under `@page`: use explicit mm values.
6. SVG marker `orient="auto"` does not rotate in WeasyPrint: draw arrowheads manually.
7. Section body text should not use `max-width`: `.manifesto`, `.section-lede`, and similar text should fill the `.page` container. Exceptions: `.type-sample` and `.footer .colophon`.
8. Diagram template changes must sync to index showcase SVGs: any visual fix to `assets/diagrams/*.html` must also be applied to the matching mini SVG in `index.html`, `index-zh.html`, `index-ja.html`.

## Release Flow

Run this before publishing or refreshing the latest release:

```bash
bash scripts/package-skill.sh        # writes dist/kami.zip (<5MB, excludes TsangerJinKai TTF)
python3 scripts/build.py --verify
git push origin main
LATEST_TAG="$(gh release list -R tw93/kami --limit 1 --json tagName -q '.[0].tagName')"
gh release upload "$LATEST_TAG" dist/kami.zip --clobber -R tw93/kami
```

`dist/kami.zip` is a tracked artifact and should be committed with the release changes. README and website download links use `https://cdn.jsdelivr.net/gh/tw93/kami@main/dist/kami.zip`, so users can update from the current `main` branch. For small packaging or documentation fixes, refresh the latest release asset with `--clobber` instead of creating a new version tag. Create a new tag only when the user explicitly wants a versioned release.

Release notes must follow the tw93/Mole format:

1. Centered logo, release title, and one-line tagline.
2. `### Changelog` with an English numbered list.
3. `### 更新日志` with the matching Chinese numbered list.
4. Optional special-thanks paragraph when contributors need credit.
5. Final blockquote with one concise project description sentence and the repository URL.

Do not mix English and Chinese inside the same numbered item. Keep both lists aligned by number, use 5-8 items, and write one concise sentence per item. Do not use graphic emoticons in the release title or body unless the user explicitly asks for them.

## Fonts

`TsangerJinKai02-W04.ttf` is a commercial font. Commercial use requires a license from tsanger.cn.
Fallback without TsangerJinKai: Source Han Serif SC -> Noto Serif CJK SC -> Songti SC -> STSong -> Georgia.
English templates use Charter serif.
Japanese output uses YuMincho as primary with fallback chain: YuMincho -> Hiragino Mincho ProN -> Noto Serif CJK JP -> Source Han Serif JP -> TsangerJinKai02 -> serif. Treat it as best-effort and verify rendering before delivery.

The Claude Desktop ZIP does not bundle TsangerJinKai TTF files. They are about 19MB each and can make upload or execution time out. Before building Chinese documents, the skill checks for missing fonts and downloads them from jsDelivr into `assets/fonts/`. WeasyPrint then uses the existing relative `@font-face` paths without changing HTML.
```

### CHEATSHEET.md

```
# kami · Cheatsheet

One-page quick reference. Scan before filling a template or tweaking a detail. Full spec in `references/design.md`.

## Ten invariants

1. Page background `#f5f4ed` (parchment), never pure white
2. Single accent: ink-blue `#1B365D`
3. All grays **warm-toned** (yellow-brown undertone), no cool blue-gray
4. English: serif for headlines and body. Chinese: serif headlines, sans body. Sans for UI only
5. Serif weight locked at 500, no bold
6. Line-height: headlines 1.1-1.3 / dense 1.4-1.45 / reading 1.5-1.55
7. Letter-spacing: Chinese body 0.3pt; English body 0; tracking for short labels only
8. Tag backgrounds solid hex, no rgba (WeasyPrint double-rectangle bug)
9. Depth via ring / whisper shadow, no hard drop shadows
10. No italic in templates or demos

## Sources and Materials

| Trigger | Do first |
|---|---|
| Latest product / version / launch / funding / market data | Check reliable sources first |
| Company / product / project branded doc | Confirm logo, product image, or UI screenshot |
| Key number or result | Record the source; if unverifiable, write magnitude or mark missing |
| Missing material | Mark the gap or ask the user; do not use unrelated imagery |

## Color

| Role | Hex | Use |
|---|---|---|
| Parchment | `#f5f4ed` | Page background |
| Ivory | `#faf9f5` | Card / lifted container |
| Warm Sand | `#e8e6dc` | Button / interactive surface |
| Dark Surface | `#30302e` | Dark container |
| Deep Dark | `#141413` | Dark page background |
| **Brand** | **`#1B365D`** | **Accent · CTA · title left bar (≤ 5% of surface)** |
| Ink Light | `#2D5A8A` | Links on dark surfaces |
| Near Black | `#141413` | Primary text |
| Dark Warm | `#3d3d3a` | Secondary text · table headers · links |
| Olive | `#504e49` | Subtext · descriptions |
| Stone | `#6b6a64` | Tertiary · metadata |
| Border | `#e8e6dc` | Primary border · section divider |
| Border Soft | `#e5e3d8` | Secondary border · row separator |

**rgba -> solid** (parchment base + ink-blue):

| Alpha | Solid |
|---|---|
| 0.08 | `#EEF2F7` |
| 0.14 | `#E4ECF5` |
| **0.18** | **`#E4ECF5`** ← default tag |
| 0.22 | `#D0DCE9` |
| 0.30 | `#D6E1EE` |

## Type (print pt)

| Role | Size | Weight | Line-height |
|---|---|---|---|
| Display | 36 | 500 | 1.10 |
| H1 | 22 | 500 | 1.20 |
| H2 | 16 | 500 | 1.25 |
| H3 | 13 | 500 | 1.30 |
| Body Lead | 11 | 400 | 1.55 |
| Body | 10 | 400 | 1.55 |
| Body Dense | 9.2 | 400 | 1.42 |
| Caption | 9 | 400 | 1.45 |
| Label | 9 | 600 | 1.35 |
| Tiny | 9 | 400 | 1.40 |

Screen (px) ≈ pt × 1.33.
Minimum floor: web text >= 12px, PDF text >= 9pt.

## Font stacks

Each language uses a single serif for the entire page. `--sans` always equals `var(--serif)`.

English:

```css
--serif: Charter, Georgia, Palatino,
         "Times New Roman", serif;
--sans:  var(--serif);
--mono:  "JetBrains Mono", "SF Mono", "Fira Code",
         Consolas, Monaco, monospace;
```

Chinese:

```css
--serif: "TsangerJinKai02", "Source Han Serif SC",
         "Noto Serif CJK SC", "Songti SC", "STSong",
         Georgia, serif;
--sans:  var(--serif);
--mono:  "JetBrains Mono", "SF Mono", Consolas,
         "TsangerJinKai02", "Source Han Serif SC",
         monospace;
```

Japanese:

```css
--serif: "YuMincho", "Yu Mincho", "Hiragino Mincho ProN",
         "Noto Serif CJK JP", "Source Han Serif JP",
         "TsangerJinKai02", Georgia, serif;
--sans:  var(--serif);
```

Any font-family that may render Chinese or Japanese must include a CJK fallback, including `@page` footer text, `pre`, `code`, and SVG labels. A pure mono stack can render missing glyph boxes in WeasyPrint.

## Spacing (4pt base)

| Tier | Value | Use |
|---|---|---|
| xs | 2-3pt | Inline |
| sm | 4-5pt | Tag padding |
| md | 8-10pt | Component interior |
| lg | 16-20pt | Between components |
| xl | 24-32pt | Section-title margin |
| 2xl | 40-60pt | Between major sections |
| 3xl | 80-120pt | Between chapters |

**Page margins (A4)**

| Document | T · R · B · L |
|---|---|
| Resume | 11 · 13 · 11 · 13 mm |
| One-Pager | 15 · 18 · 15 · 18 mm |
| Long Doc | 20 · 22 · 22 · 22 mm |
| Letter | 25 mm all sides |
| Portfolio | 12 · 15 · 12 · 15 mm |

## Radius scale

`4pt -> 6pt -> 8pt (default) -> 12pt -> 16pt -> 24pt -> 32pt (hero)`

## Common CSS snippets

### Card

```css
.card {
  background: var(--ivory);
  border: 0.5pt solid var(--border-cream);
  border-radius: 8pt;
  padding: 16pt 20pt;
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow: 0 4pt 24pt rgba(0, 0, 0, 0.05);  /* whisper shadow */
}
```

### Tag (default lightest solid)

```css
.tag {
  background: #EEF2F7;            /* 0.08 equivalent */
  color: var(--brand);
  font-size: 9pt; font-weight: 600;
  padding: 1pt 5pt;
  border-radius: 2pt;
  letter-spacing: 0.4pt;
  text-transform: uppercase;
}
```

### Section title (brand left bar is the signature move)

```css
.section-title {
  font-family: var(--serif);
  font-size: 14pt; font-weight: 500;
  color: var(--near-black);
  margin: 24pt 0 10pt 0;
  border-left: 2.5pt solid var(--brand);
  border-radius: 1.5pt;
  padding-left: 8pt;
}
```

### Table (kami-table)

Base class works on bare `<table>` or `.kami-table`. Add variant classes for density/alignment:

```css
/* Base */
table, .kami-table {
  width: 100%; border-collapse: collapse;
  font-size: 9.5pt; margin: 12pt 0; break-inside: avoid;
}
table th { text-align: left; font-weight: 500; color: var(--dark-warm);
  padding: 6pt 8pt; border-bottom: 1pt solid var(--border); }
table td { padding: 5pt 8pt; border-bottom: 0.3pt solid var(--border-soft);
  vertical-align: top; }
```

| Variant | Class | Effect |
|---|---|---|
| Compact | `.compact` | 8pt font, tight padding (data-dense tables) |
| Financial | `.financial` | Right-align all columns except first, `tabular-nums` |
| Striped | `.striped` | Alternating `var(--ivory)` row background |
| Total row | `.total` on `<tr>` | Bold, brand top border, no bottom border |

Combine freely: `<table class="kami-table financial striped">`.

### Metric (data card)

```css
.metric { display: flex; align-items: baseline; gap: 6pt; }
.metric-value {
  font-family: var(--serif); font-size: 16pt; font-weight: 500;
  color: var(--brand);
  font-variant-numeric: tabular-nums;
}
.metric-label { font-size: 9pt; color: var(--olive); }
```

### Quote

```css
.quote {
  border-left: 2pt solid var(--brand);
  padding: 4pt 0 4pt 14pt;
  color: var(--olive);
  line-height: 1.55;
}
```

## Diagram components

Twelve built-in diagram types. Extract the `<svg>` block and embed in a `<figure>` in long-doc / portfolio:

| Type | File | Use |
|---|---|---|
| Architecture | `assets/diagrams/architecture.html` | System components and connections |
| Flowchart | `assets/diagrams/flowchart.html` | Decision branches and flows |
| Quadrant | `assets/diagrams/quadrant.html` | 2×2 positioning |
| Bar Chart | `assets/diagrams/bar-chart.html` | Category comparison (up to 8 groups × 3 series) |
| Line Chart | `assets/diagrams/line-chart.html` | Trends over time (up to 12 points × 3 lines) |
| Donut Chart | `assets/diagrams/donut-chart.html` | Proportional breakdown (up to 6 segments) |
| State Machine | `assets/diagrams/state-machine.html` | Finite states + directed transitions |
| Timeline | `assets/diagrams/timeline.html` | Time axis + milestone events |
| Swimlane | `assets/diagrams/swimlane.html` | Cross-responsibility process flow |
| Tree | `assets/diagrams/tree.html` | Hierarchical relationships |
| Layer Stack | `assets/diagrams/layer-stack.html` | Vertically stacked system layers |
| Venn | `assets/diagrams/venn.html` | Set intersections and overlaps |
| Candlestick | `assets/diagrams/candlestick.html` | OHLC price history (up to 30 days) |
| Waterfall | `assets/diagrams/waterfall.html` | Revenue bridge / decomposition |

Usage: extract the `<svg>` block from the HTML file and paste into the template's `<figure>` container.

**Data chart colors**: primary series `#1B365D` · secondary `#504e49` → `#6b6a64` → `#b8b7b0` → `#d4d3cd` → `#EEF2F7`.

**Editing data**: only modify elements between `<!-- DATA START -->` / `<!-- DATA END -->`, leave CSS untouched. All coordinates must be divisible by 4.

## Dark section

Alternate light/dark rhythm: add `.sd-alt` to any section container.

- Background switches to `--deep-dark` (`#141413`)
- Body text switches to `--warm-silver` (`#b0aea5`)
- Headings switch to `--ivory`
- Appropriate for: section-level light/dark alternation in long-doc / portfolio
- Restriction: showcase pages only, never in print templates

## Verification checks

`python3 scripts/build.py --verify [target]` checks source templates and slides in sequence:

1. Source file exists
2. WeasyPrint render to PDF for HTML / diagram targets
3. Page count check for strict targets
4. Font embedding check
5. PPTX generation for `slides` / `slides-en`

Source templates intentionally keep `{{...}}` fields. Run `python3 scripts/build.py --check-placeholders path/to/filled.html` on completed documents.

## Content quality (one rule per type)

Full quality bars in `references/writing.md`. The single most important rule for each document type:

| Document | Core quality rule |
|---|---|
| Resume | Every bullet: Action + Scope + Measurable Result + Business Outcome |
| Portfolio | Open with the problem and stakes, not the project name |
| Slides | Slide titles are full sentences (assertions), not topic labels |
| Equity Report | Lead with variant perception: what you see that the market doesn't |
| Long Document | Each chapter claim paragraph must survive the "so what?" test |
| One-Pager | Metrics are the headline; if the 4 cards don't tell the story, the metrics are wrong |
| Letter | First paragraph states purpose in one sentence |
| Changelog | One sentence per change, verb-led, user-facing language |

## Quick decisions

| Need | Use |
|---|---|
| Headline | serif 500, line-height 1.10-1.30 |
| Reading body (EN) | serif 400, 9.5-10pt, 1.55 |
| Reading body (CN) | sans 400, 9.5-10pt, 1.55 |
| Emphasize a number | `color: var(--brand)`, no bold |
| Divide two sections | 2.5pt brand left bar, or 0.5pt warm dotted |
| Quote | 2pt brand left border + olive color |
| Code | ivory bg + 0.5pt border + 6pt radius + mono |
| Primary button | brand fill + ivory text |
| Secondary button | warm-sand + dark-warm |
| Chapter start | serif heading + 2.5pt brand left bar |
| Cover | Display heading + right-aligned author/date + heavy whitespace |

Not on the table -> first principles: **serif carries authority, sans carries utility, warm gray carries rhythm, ink-blue carries focus**.
```

### LICENSE

```
MIT License

Copyright (c) 2026 Tw93

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### styles.css

```css
  /* Palatino is a system font, no @font-face needed */
  @font-face {
    font-family: "JetBrains Mono";
    src: url("assets/fonts/JetBrainsMono.woff2") format("woff2");
    font-weight: 400 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("assets/fonts/TsangerJinKai02-W04.ttf") format("truetype");
    font-weight: 400 500;
    font-style: normal;
    font-display: swap;
  }
  

  :root {
    --parchment:    #f5f4ed;
    --ivory:        #faf9f5;
    --warm-sand:    #e8e6dc;
    --dark-surface: #30302e;
    --deep-dark:    #141413;

    --brand:        #1B365D;
    --brand-light:  #2D5A8A;

    --near-black:   #141413;
    --dark-warm:    #3d3d3a;
    --olive:        #504e49;
    --stone:        #6b6a64;

    --border:       #e8e6dc;
    --border-soft:  #e5e3d8;

    /* Slide-scale spacing */
    --slide-pad:    80px;

    --serif: Charter, Georgia, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", Palatino, serif;
    --sans: var(--serif);
    --mono: "JetBrains Mono", "Fira Code", "SF Mono", Consolas, Monaco, monospace;
  }

  html[lang="zh-CN"] {
    --serif: "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", Georgia, serif;
    --sans: var(--serif);
  }

  html[lang="ja"] {
    --serif: "YuMincho", "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif CJK JP", "Source Han Serif JP", "TsangerJinKai02", Georgia, serif;
    --sans: var(--serif);
    --olive: #4d4c48;  /* YuMincho strokes are thinner; darken olive text to compensate */
  }

  /* Language switcher */
  .lang-switch {
    position: fixed;
    top: 24px;
    right: 32px;
    transition: opacity 0.3s, transform 0.3s;
    display: flex;
    gap: 0;
    z-index: 100;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
  }
  .lang-switch a {
    display: block;
    padding: 5px 10px;
    text-decoration: none;
    color: var(--olive);
    border: 1px solid var(--border-soft);
    cursor: pointer;
    background: var(--ivory);
    transition: background 0.15s, color 0.15s;
  }
  .lang-switch a:first-child { border-radius: 4px 0 0 4px; }
  .lang-switch a:last-child { border-radius: 0 4px 4px 0; border-left: none; }
  .lang-switch a.active {
    background: var(--brand);
    color: var(--ivory);
    border-color: var(--brand);
  }
  .lang-switch a:hover:not(.active) {
    background: var(--warm-sand);
    color: var(--near-black);
  }
  .lang-switch.hidden {
    opacity: 0;
    transform: translateY(-12px);
    pointer-events: none;
  }

  /* Page transition */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }

  /* Print rules: keep warm background, avoid harsh page breaks */
  @page { size: A4; margin: 14mm 16mm; background: #f5f4ed; }
  @media print {
    body { background: #f5f4ed; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { padding: 0 !important; max-width: 100% !important; }
    section { page-break-inside: auto; margin-bottom: 36px; }
    .hero, .section-head, .family, .comp, .shadow-demo, .tint, .swatch, .radius, blockquote, pre, tr, .anti > div { break-inside: avoid; page-break-inside: avoid; }
    .hero h1 { font-size: 76px; }
    h2.section-title { font-size: 26px; }
    .comp-grid, .swatches, .tint-strip, .family-grid, .shadow-row, .anti { break-inside: auto; }
  }
  body {
    background: var(--parchment);
    color: var(--near-black);
    font-family: var(--sans);
    font-size: 14px;
    line-height: 1.55;
    letter-spacing: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html[lang="zh-CN"] body { letter-spacing: 0.35px; }
  html[lang="en"] body { letter-spacing: 0; }
  html[lang="ja"] body { letter-spacing: 0.02em; }
  html[lang="en"] .section-title { letter-spacing: -0.3px; }
  html[lang="en"] .manifesto,
  html[lang="ja"] .manifesto { letter-spacing: 0; }
  html[lang="zh-CN"] .section-title,
  html[lang="ja"] .section-title {
    letter-spacing: 0;
  }

  .page {
    max-width: 1120px;
    margin: 0 auto;
    padding: 88px 64px 120px;
    animation: fadeIn 0.4s ease-out;
  }

  /* ---------- Hero ---------- */
  .hero {
    padding-bottom: 40px;
    border-bottom: 1px solid var(--border-soft);
    margin-bottom: 48px;
  }
  .hero-tokens {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 18px;
  }
  .hero-tokens span {
    display: flex;
    gap: 6px;
    font-size: 13px;
    color: var(--stone);
    font-variant-numeric: tabular-nums;
  }
  .hero-tokens b {
    color: var(--dark-warm);
    font-weight: 500;
  }
  .eyebrow {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--stone);
    margin: 0 0 18px;
  }
  .hero-links {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .hero-links a {
    color: var(--stone);
    display: flex;
    align-items: center;
    transition: color 0.15s;
  }
  .hero-links a:hover {
    color: var(--dark-warm);
  }
  .hero h1 {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 106px;
    line-height: 1.05;
    letter-spacing: -1.2px;
    margin: 0 0 14px;
    color: var(--near-black);
  }
  .hero h1 .cn {
    display: inline-block;
    margin-left: 16px;
    letter-spacing: 0;
    color: var(--brand);
  }
  .hero .tagline {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 21px;
    line-height: 1.35;
    color: var(--olive);
    margin: 0;
  }

  /* ---------- Section ---------- */
  section { margin-bottom: 72px; }
  .section-head { margin-bottom: 24px; }
  .section-num {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 14px;
    color: var(--brand);
    letter-spacing: 0.4px;
    margin: 0 0 6px;
  }
  .section-title {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 32px;
    line-height: 1.2;
    color: var(--near-black);
    margin: 0;
    display: block;
    letter-spacing: 0.4px;
  }
  .section-lede {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 16px;
    line-height: 1.55;
    color: var(--olive);
    margin: 14px 0 0;
  }

  /* ---------- Manifesto ---------- */
  .manifesto {
    font-family: var(--serif);
    font-size: 20px;
    line-height: 1.65;
    letter-spacing: 0.05em;
    color: var(--near-black);
    margin: 0 0 28px;
    font-weight: 400;
  }
  .manifesto em {
    color: var(--brand);
    font-style: normal;
  }

  .rules {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    border-top: 1px solid var(--border-soft);
  }
  .rules li {
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 4px;
    padding: 18px 24px 18px 0;
    border-bottom: 1px solid var(--border-soft);
    align-items: start;
  }
  .rules li:nth-child(odd) { padding-right: 32px; border-right: 1px solid var(--border-soft); padding-left: 0; }
  .rules li:nth-child(even) { padding-left: 32px; }
  .rules .n {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 20px;
    color: var(--brand);
    line-height: 1;
    padding-top: 0;
  }
  .rules p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: var(--dark-warm);
  }
  .rules code {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--brand);
    background: #EEF2F7;
    padding: 1px 5px;
    border-radius: 2px;
  }

  /* ---------- Color ---------- */
  .swatches {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 28px;
  }
  .swatch {
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--ivory);
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .swatch:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  }
  .swatch .chip {
    height: 96px;
    border-bottom: 1px solid var(--border);
  }
  .swatch .info {
    padding: 12px 14px 14px;
  }
  .swatch .name {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 15px;
    color: var(--near-black);
    margin: 0;
    line-height: 1.25;
  }
  .swatch .role {
    font-size: 12px;
    color: var(--olive);
    margin: 3px 0 6px;
    line-height: 1.4;
  }
  .swatch .hex {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--stone);
    letter-spacing: 0.4px;
  }
  .swatch.brand .name { color: var(--brand); }
  .swatch.dark .chip { border-bottom-color: var(--deep-dark); }

  .subhead {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 18px;
    color: var(--dark-warm);
    margin: 40px 0 14px;
  }

  /* tag tint table */
  .tint-strip {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    background: var(--parchment);
  }
  .tint {
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--ivory);
    padding: 18px 16px 14px;
  }
  .tint .sample {
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
    color: var(--brand);
    padding: 2px 8px;
    border-radius: 3px;
    letter-spacing: 0.4px;
    margin-left: -1px;
    margin-bottom: 10px;
  }
  .tint .opacity {
    font-family: var(--serif);
    font-size: 14px;
    color: var(--olive);
    margin: 0 0 2px;
  }
  .tint .hex {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--stone);
  }
  .tint.default { outline: 1.5px solid var(--brand); outline-offset: -1.5px; }
  .tint.default .opacity { color: var(--brand); }
  .tint .flag {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: var(--brand);
    margin-bottom: 8px;
    text-transform: uppercase;
    display: block;
    height: 11px;
  }

  /* ---------- Type ---------- */
  .type-grid {
    display: grid;
    grid-template-columns: 180px 1fr 160px;
    column-gap: 40px;
    row-gap: 0;
    border-top: 1px solid var(--border-soft);
  }
  .type-row {
    display: contents;
  }
  .type-row > * {
    padding: 22px 0;
    border-bottom: 1px solid var(--border-soft);
    align-self: stretch;
  }
  .type-label {
    font-family: var(--serif);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    color: var(--stone);
    padding-top: 22px;
  }
  .type-specs {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--olive);
    line-height: 1.6;
    text-align: right;
    padding-top: 22px;
  }
  .type-specs b { color: var(--dark-warm); font-weight: 500; }
  .type-sample.display {
    font-family: var(--serif); font-weight: 500;
    font-size: 54px; line-height: 1.1; color: var(--near-black);
    letter-spacing: -0.5px;
  }
  html[lang="zh-CN"] .type-sample.display {
    font-size: 48px;
  }
  html[lang="ja"] .type-sample.display {
    font-size: 42px;
    line-height: 1.12;
    letter-spacing: 0.3px;
  }
  html[lang="zh-CN"] .type-sample.display { letter-spacing: 0.5px; }
  .type-sample.h1 {
    font-family: var(--serif); font-weight: 500;
    font-size: 30px; line-height: 1.2; color: var(--near-black);
  }
  .type-sample.h2 {
    font-family: var(--serif); font-weight: 500;
    font-size: 22px; line-height: 1.25; color: var(--near-black);
  }
  .type-sample.h3 {
    font-family: var(--serif); font-weight: 500;
    font-size: 17px; line-height: 1.3; color: var(--near-black);
  }
  .type-sample.lede {
    font-family: var(--serif); font-weight: 500;
    font-size: 15px; line-height: 1.55; color: var(--near-black);
    max-width: 540px;
  }
  .type-sample.body {
    font-family: var(--serif); font-weight: 500;
    font-size: 14px; line-height: 1.55; color: var(--dark-warm);
    max-width: 540px;
  }
  .type-sample.dense {
    font-family: var(--serif); font-weight: 500;
    font-size: 14px; line-height: 1.4; color: var(--dark-warm);
    max-width: 540px;
  }
  .type-sample.caption {
    font-family: var(--serif); font-weight: 500;
    font-size: 12px; line-height: 1.45; color: var(--olive);
  }
  .type-sample.label {
    font-family: var(--serif); font-weight: 500;
    font-size: 12px; line-height: 1.35; color: var(--brand);
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  /* family cards */
  .family-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 24px;
  }
  .family {
    background: var(--ivory);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px 24px 22px;
    transition: box-shadow 0.2s;
  }
  .family:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  }
  .family .glyph {
    font-weight: 500;
    font-size: 80px;
    line-height: 1;
    color: var(--near-black);
    margin: 0 0 18px;
    letter-spacing: -1px;
    height: 80px;
    display: flex;
    align-items: center;
  }
  .family.serif .glyph { font-family: var(--serif); }
  .family.sans .glyph { font-family: var(--sans); }
  .family.mono .glyph { font-family: var(--mono); font-weight: 500; font-size: 64px; }
  .family .role {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 18px;
    color: var(--near-black);
    margin: 0 0 4px;
  }
  .family .name {
    font-size: 12px;
    color: var(--olive);
    font-family: var(--mono);
    margin: 0 0 12px;
  }
  .family .use {
    font-size: 12px;
    color: var(--dark-warm);
    line-height: 1.55;
    margin: 0;
  }

  /* ---------- Spacing ---------- */
  .space-table {
    width: 100%;
    border-collapse: collapse;
  }
  .space-table th, .space-table td {
    text-align: left;
    padding: 14px 16px 14px 0;
    border-bottom: 1px solid var(--border-soft);
    font-size: 14px;
    color: var(--dark-warm);
    vertical-align: middle;
  }
  .space-table th {
    font-family: var(--serif);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    color: var(--stone);
    padding-top: 0;
  }
  .space-table td.name {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 15px;
    color: var(--near-black);
    width: 120px;
  }
  .space-table td.val { font-family: var(--mono); font-size: 13px; color: var(--olive); width: 130px; }
  .space-table td.bar {
    width: 280px;
  }
  .bar span {
    display: block;
    height: 4px;
    background: var(--border);
    border-radius: 2px;
  }
  .space-table td.use { color: var(--olive); font-size: 13px; }

  /* radius row */
  .radii {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 18px;
  }
  .radius {
    text-align: center;
    flex: 0 0 auto;
  }
  .radius .box {
    width: 72px;
    height: 72px;
    background: var(--ivory);
    border: 1px solid var(--border);
    margin-bottom: 8px;
  }
  .radius .r { font-family: var(--mono); font-size: 12px; color: var(--dark-warm); }
  .radius .r b { color: var(--brand); font-weight: 500; }
  .radius .label { font-size: 12px; color: var(--olive); margin-top: 2px; }

  /* ---------- Components ---------- */
  .comp-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    align-items: stretch;
  }
  .comp {
    background: var(--ivory);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px 28px 24px;
    transition: box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .comp:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  }
  .comp h4 {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 16px;
    color: var(--near-black);
    margin: 0 0 4px;
  }
  .comp .hint {
    font-size: 12px;
    color: var(--stone);
    font-family: var(--mono);
    margin: 0 0 20px;
  }
  .comp .demo { margin-bottom: 4px; flex: 1; }

  /* Buttons */
  .btn {
    display: inline-block;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    letter-spacing: 0.4px;
  }
  .btn-primary {
    background: var(--brand);
    color: var(--ivory);
    box-shadow: 0 0 0 1px var(--brand);
  }
  .btn-secondary {
    background: var(--warm-sand);
    color: var(--dark-warm);
    box-shadow: 0 0 0 1px var(--border);
  }
  .btn-ghost {
    background: transparent;
    color: var(--brand);
    box-shadow: 0 0 0 1px var(--brand);
  }

  /* Tags */
  .tag {
    display: inline-block;
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 2px;
    color: var(--brand);
    letter-spacing: 0.4px;
  }
  .tag.calm { background: #EEF2F7; }
  .tag.standard { background: #E4ECF5; border-radius: 4px; padding: 2px 8px; }
  .tag.brush {
    background: linear-gradient(to right, #D6E1EE, #E4ECF5 70%, #EEF2F7);
  }

  /* Quote */
  .quote {
    border-left: 2px solid var(--brand);
    padding: 4px 0 4px 14px;
    color: var(--olive);
    font-family: var(--serif);
    font-size: 15px;
    line-height: 1.55;
    margin: 0;
  }

  /* Metrics */
  .metrics {
    display: flex;
    gap: 28px;
  }
  .metric {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .metric-value {
    font-family: var(--serif);
    font-size: 24px;
    font-weight: 500;
    color: var(--brand);
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }
  .metric-label {
    font-size: 12px;
    color: var(--olive);
  }

  /* Section title inline sample: size-led hierarchy, no decoration */
  .sample-section-title {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 20px;
    color: var(--near-black);
    display: block;
  }

  /* Code block */
  .code {
    background: var(--ivory);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 12px 14px;
    font-family: var(--mono);
    font-size: 12px;
    line-height: 1.55;
    color: var(--near-black);
    margin: 0;
    white-space: pre;
    overflow-x: auto;
  }
  .code .k { color: var(--brand); }
  .code .c { color: var(--stone); }

  /* List */
  ul.dash {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--dark-warm);
  }
  ul.dash li { position: relative; padding-left: 14px; }
  ul.dash li::before {
    content: "\2013";
    position: absolute;
    left: 0;
    color: var(--brand);
  }

  /* Shadows demo */
  .shadow-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 8px;
  }
  .shadow-demo {
    background: var(--ivory);
    border-radius: 12px;
    padding: 24px 20px;
    min-height: 110px;
    transition: box-shadow 0.2s;
  }
  .shadow-demo:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  }
  .shadow-demo .t {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 15px;
    color: var(--near-black);
    margin: 0 0 4px;
  }
  .shadow-demo .s {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--olive);
    line-height: 1.5;
  }
  .sd-ring { box-shadow: 0 0 0 1px var(--border); }
  .sd-whisper { box-shadow: 0 4px 24px rgba(0,0,0,0.05); }
  .sd-alt { background: var(--deep-dark); color: #b0aea5; }
  .sd-alt .t { color: var(--ivory); font-family: var(--serif); }
  .sd-alt .s { color: #b0aea5; }

  /* Decision table */
  .decision {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .decision th, .decision td {
    padding: 12px 16px 12px 0;
    border-bottom: 1px solid var(--border-soft);
    text-align: left;
    vertical-align: top;
  }
  .decision th {
    font-size: 12px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--stone);
    font-weight: 500;
    padding-top: 0;
  }
  .decision td.task {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 14px;
    color: var(--near-black);
    width: 38%;
  }
  .decision td.how { color: var(--dark-warm); }
  .decision td.how code {
    font-family: var(--mono);
    font-size: 12px;
    background: #EEF2F7;
    color: var(--brand);
    padding: 1px 5px;
    border-radius: 2px;
  }

  /* Demo grid */
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    align-items: start;
  }
  .demo-card a img {
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--border);
    transition: box-shadow 0.2s;
  }
  .demo-card a img:hover {
    box-shadow: 0 4px 24px rgba(0,0,0,0.05);
  }
  .demo-card .demo-title {
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 500;
    color: var(--near-black);
    margin: 10px 0 0;
  }
  .demo-card .demo-desc {
    font-size: 12px;
    color: var(--olive);
    margin: 2px 0 0;
  }

@media (min-width: 980px) {
  html[lang="ja"] .section-lede.section-lede-nowrap {
    white-space: nowrap;
    font-size: clamp(12.5px, 1.2vw, 14.5px);
    line-height: 1.45;
    letter-spacing: 0;
  }

  html[lang="ja"] .type-sample.display .display-line-nowrap {
    white-space: nowrap;
  }

  html[lang="ja"] .demo-desc.demo-desc-nowrap {
    white-space: nowrap;
    font-size: 12px;
    letter-spacing: 0;
  }
}

  /* Chart showcase */
  .chart-showcase {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    align-items: start;
  }
  .chart-card {
    background: var(--ivory);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 16px 12px;
  }
  .chart-card svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .chart-card svg text {
    font-family: var(--sans);
  }
  .chart-label {
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
    color: var(--brand);
    letter-spacing: 0.3px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
  .chart-caption {
    font-size: 12px;
    color: var(--olive);
    margin: 8px 0 0;
    line-height: 1.4;
  }

  /* Background text */
  .background-text {
    font-family: var(--serif);
    font-size: 16px;
    line-height: 1.6;
    color: var(--dark-warm);
  }
  .background-text p {
    margin-bottom: 14px;
  }

  /* Brand footer */
  .footer {
    margin-top: 24px;
    padding-top: 40px;
    border-top: 1px solid var(--border-soft);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 40px;
  }
  .footer .mark {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .footer .mark img { width: 56px; height: 56px; }
  .footer .mark .wm-name {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 28px;
    color: var(--near-black);
    margin: 0;
    line-height: 1;
  }
  .footer .mark .wm-sub {
    font-family: var(--serif);
    font-size: 14px;
    color: var(--olive);
    margin: 4px 0 0;
  }
  .footer .colophon {
    font-size: 12px;
    color: var(--stone);
    line-height: 1.6;
    max-width: 420px;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .footer .colophon b { color: var(--dark-warm); font-weight: 500; }

  /* Anti-patterns */
  .anti {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 20px;
  }
  .anti > div {
    padding: 18px 20px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.55;
  }
  .anti .no {
    background: var(--ivory);
    border: 1px solid var(--border);
  }
  .anti .yes {
    background: var(--ivory);
    border: 1px solid var(--border);
    border-left: 3px solid var(--brand);
  }
  .anti h5 {
    font-family: var(--sans);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    margin: 0 0 8px;
    color: var(--stone);
  }
  .anti .yes h5 { color: var(--brand); }
  .anti p {
    margin: 0;
    color: var(--dark-warm);
  }
  .anti code {
    font-family: var(--mono);
    font-size: 12px;
    color: var(--brand);
    background: #EEF2F7;
    padding: 1px 4px;
    border-radius: 2px;
  }

@media (max-width: 768px) {
  /* Container + spacing */
  .page { padding: 48px 20px 64px; }
  section { margin-bottom: 48px; }
  .section-head { margin-bottom: 20px; }

  /* Typography scale */
  .hero h1 { font-size: 46px; letter-spacing: -0.6px; margin-bottom: 10px; }
  .hero h1 .cn { margin-left: 8px; }
  .hero .tagline { font-size: 17px; }
  .hero-tokens { gap: 14px; margin-top: 14px; }
  .section-title { font-size: 24px; }
  .manifesto { font-size: 17px; line-height: 1.5; }
  .subhead { font-size: 16px; margin: 28px 0 12px; }

  /* Grids: single column */
  .demo-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .demo-card { min-width: 0; }
  .demo-card .demo-desc { overflow-wrap: break-word; word-break: break-word; }
  .swatches { grid-template-columns: repeat(2, 1fr) !important; gap: 10px; }
  .tint-strip { grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .rules { grid-template-columns: 1fr; }
  .rules li:nth-child(odd) { padding-right: 0; border-right: none; }
  .rules li:nth-child(even) { padding-left: 0; }
  .type-grid { grid-template-columns: 1fr; row-gap: 0; }
  .type-row { display: block; padding: 16px 0; border-bottom: 1px solid var(--border-soft); }
  .type-row > * { border-bottom: none; padding: 4px 0; }
  .family-grid { grid-template-columns: 1fr; }
  .comp-grid { grid-template-columns: 1fr; }
  .shadow-row { grid-template-columns: 1fr; }
  .anti { grid-template-columns: 1fr; }
  .chart-showcase { grid-template-columns: 1fr; }

  /* Table: hide bar column */
  .space-table td.bar { display: none; }

  /* Type samples */
  .type-sample.display { font-size: 36px; }
  html[lang="zh-CN"] .type-sample.display { font-size: 28px; letter-spacing: 0.3px; }
  html[lang="ja"] .type-sample.display { font-size: 26px; letter-spacing: 0.2px; }
  .family .glyph { font-size: 48px; }
  .family .glyph.mono { font-size: 40px; }

  /* Footer */
  .footer { flex-direction: column; align-items: flex-start; gap: 24px; }
  .footer .colophon { text-align: left; max-width: 100%; }
  .footer .mark .wm-name { font-size: 22px; }

  /* Lang switch + eyebrow */
  .lang-switch { top: 16px; right: 16px; }
  .eyebrow { justify-content: flex-start; gap: 8px; }
  .eyebrow-date { display: none; }
  .hero-tokens { display: none; }

  /* Misc */
  .hero { padding-bottom: 32px; margin-bottom: 36px; }
  .comp { padding: 20px 16px 16px; }
  .family { padding: 20px 16px 16px; }
  .radius .box { width: 56px; height: 56px; }
}
```

## 参考资料（references/）


=== FILE: .claude/skills/kami/references/design.md ===
# Design System

## Principles

kami's aesthetic compresses into one sentence: **warm parchment canvas, ink-blue accent, serif carries hierarchy, avoid cool grays and hard shadows**.

This is not a UI framework. It is a constraint system for print, designed to keep pages stable, clear, and readable.

**The ten invariants** (each has a real cost, think before overriding):

1. Page background parchment `#f5f4ed`, never pure white
2. Single accent: ink-blue `#1B365D`, no second chromatic color
3. All grays warm-toned (yellow-brown undertone), no cool blue-grays
4. English: serif for everything (headlines and body). Chinese: serif headlines, sans body. Sans only for UI elements (labels, eyebrows, meta) in both
5. Serif weight locked at 500, no bold
6. Line-heights: tight headlines 1.1-1.3, dense body 1.4-1.45, reading body 1.5-1.55
7. Letter-spacing: Chinese body 0.3pt for comfortable reading; English body 0; tracking only for short labels and overlines
8. Tag backgrounds must be solid hex, never rgba (WeasyPrint renders a double rectangle)
9. Depth via ring shadow or whisper shadow, never hard drop shadows
10. **No italic anywhere**. No `font-style: italic` in any template or demo. No italic @font-face declarations needed

This system is a fusion of Anthropic's visual language and real Chinese / English resume iteration. Details below.

---

## 1. Color

**Single accent, warm neutrals only, zero cool tones** - this is the core.

### Brand

```css
--brand:       #1B365D;   /* Ink Blue - the only chromatic color. CTAs, accents, section-title left bar. */
--brand-light: #2D5A8A;   /* Ink Light - brighter variant, for links on dark surfaces. */
```

**Rule**: ink-blue covers ≤ **5% of document surface area**. More than that is ornament, not restraint.

### Surface

```css
--parchment:    #f5f4ed;   /* Page background - warm cream, the emotional foundation */
--ivory:        #faf9f5;   /* Card / lifted container - brighter than parchment */
--warm-sand:    #e8e6dc;   /* Button default / interactive surface */
--dark-surface: #30302e;   /* Dark-theme container - warm charcoal */
--deep-dark:    #141413;   /* Dark-theme page background - not pure black, slight olive undertone */
```

**Never**: `#ffffff` pure white as page background. `#f8f9fa` / `#f3f4f6` or any cool-gray surface.

### Text

```css
--near-black:  #141413;   /* Primary text - deepest but not pure black, warm olive undertone */
--dark-warm:   #3d3d3a;   /* Secondary text, table headers, links */
--olive:       #504e49;   /* Subtext - descriptions, captions. JA override: #4d4c48 (YuMincho thin strokes need darker text) */
--stone:       #6b6a64;   /* Tertiary - dates, metadata */
```

Four levels: near-black (primary) > dark-warm (secondary) > olive (subtext) > stone (tertiary). No fifth level needed.

**Mnemonic**: every gray has a **yellow-brown undertone**. In `rgb()`, warm gray is R ≈ G > B (or R > G > B with small gaps). Cool gray is R < G < B or R = G = B (neutral).

### Border

```css
--border:      #e8e6dc;   /* Primary border - section dividers, table headers, card borders */
--border-soft: #e5e3d8;   /* Secondary border - row separators, subtle dividers */
```

### Translucent -> Solid conversion (TAGS MUST BE SOLID)

**Why**: WeasyPrint's alpha compositing for padding vs glyph areas produces a visible double rectangle on zoom. See `production.md` Part 4 Pitfall #1.

Ink Blue `#1B365D` over parchment `#f5f4ed`:

| rgba alpha | Solid hex |
|---|---|
| 0.08 | `#EEF2F7` |
| 0.14 | `#E4ECF5` |
| **0.18** | **`#E4ECF5`** ← default tag |
| 0.22 | `#D0DCE9` |
| 0.30 | `#D6E1EE` |

---

## 2. Typography

### Stacks

```css
/* Single serif per page. --sans always equals var(--serif). */

/* English */
font-family: Charter, Georgia, Palatino,
             "Times New Roman", serif;

/* Chinese */
font-family: "TsangerJinKai02",
             "Source Han Serif SC", "Noto Serif CJK SC",
             "Songti SC", "STSong",
             Georgia, serif;

/* Japanese */
font-family: "YuMincho", "Yu Mincho",
             "Hiragino Mincho ProN",
             "Noto Serif CJK JP", "Source Han Serif JP",
             "TsangerJinKai02",
             Georgia, serif;

/* Mono, with CJK fallback for comments and labels */
font-family: "JetBrains Mono", "SF Mono", "Fira Code",
             Consolas, Monaco,
             "TsangerJinKai02", "Source Han Serif SC",
             monospace;
```

Any font-family that may render Chinese or Japanese must include a CJK fallback, including `@page` footer text, `pre`, `code`, and SVG labels. A pure mono stack can render missing glyph boxes in WeasyPrint.

### Size scale (pt for print A4, px for screen)

**Print:**

| Role | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| Display | 36pt | 500 | 1.10 | Cover title, one-pager hero |
| H1 Section | 22pt | 500 | 1.20 | Chapter titles |
| H2 | 16pt | 500 | 1.25 | Subsection |
| H3 | 13pt | 500 | 1.30 | Item titles |
| Body Lead | 11pt | 400 | 1.55 | Intro paragraphs |
| Body | 10pt | 400 | 1.55 | Reading body |
| Body Dense | 9.2pt | 400 | 1.42 | Dense body (resume, one-pager) |
| Caption | 9pt | 400 | 1.45 | Notes, figure captions |
| Label | 9pt | 600 | 1.35 | Small labels, corner tags |
| Tiny | 9pt | 400 | 1.40 | Footer, minor metadata |

**Screen (px)** ≈ pt × 1.33 (9pt ≈ 12px, 18pt ≈ 24px).
**Minimum floor**: web text >= 12px, PDF text >= 9pt.

### Weight

- **Serif body**: 400 (W04 font file)
- **Serif headings**: 500 (W05 font file, real bold, not synthetic)
- **Sans body**: 400 default
- **Sans labels / small titles**: 500 or 600
- **Forbidden**: 900 black, 100 thin

**Design principle**: Serif uses only two weights (400/500), no synthetic bold (600/700), maintaining restrained typography.

- `strong { font-weight: 500 }` in long-doc templates locks bold to W05, preventing browsers from synthesizing 700 on top of W05
- **Web only**: W04 covers weight 400-500 (single `font-weight: 400 500` declaration); W05 is PDF-only because WeasyPrint cannot synthesize bold

### Line-height

Print documents are **tighter** than English web body. English web typically runs 1.6-1.75; in print at pt sizes that feels loose and floats.

| Tier | Value | Use |
|---|---|---|
| Tight headline | 1.10-1.30 | Display, H1, H2 |
| Dense body | 1.40-1.45 | Resume, one-pager, dense information |
| Reading body | 1.50-1.55 | Long-doc chapters, letters |
| Label / caption | 1.30-1.40 | Small labels, multi-line metadata |

**Forbidden**:
- 1.60+ - loose feel, web rhythm, not print
- 1.00-1.05 - lines collide except at extreme display sizes

### Letter-spacing

- Body text: **0**
- Chinese and Japanese body text with TsangerJinKai02: **0.1–0.2pt** to compensate for the font's natural density; section titles and Mincho samples: **0**
- Chinese lede text (14–22pt) with TsangerJinKai02: **0.03–0.06em** to open up large-body paragraphs without breaking density; EN and JA lede: **0** (only TsangerJinKai02 needs density compensation)
- Chinese and Japanese display text (24pt+): **0.2–1pt** optical spacing for visual breathing room at large sizes; scale with font size
- English headings may use subtle optical tightening when needed; keep it localized, never inherited by body copy
- Small labels (< 10pt): +0.2 to +0.5pt for readability
- All-caps overlines: +0.5 to +1pt mandatory
- **Slide-specific**: print tracking x0.5 at slide scale. Eyebrow max 3px (not 8px), display titles -0.5pt. Large type at 40pt+ will look scattered at print tracking values

---

## 3. Spacing

### Base unit: 4pt (4px on screen)

| Tier | Value | Use |
|---|---|---|
| xs | 2-3pt | Inline adjacent elements |
| sm | 4-5pt | Tag padding, dense layout |
| md | 8-10pt | Component interior |
| lg | 16-20pt | Between components / card padding |
| xl | 24-32pt | Section-title margins |
| 2xl | 40-60pt | Between major sections |
| 3xl | 80-120pt | Between chapters (long docs) |

### Page margins (A4)

| Document | Top | Right | Bottom | Left |
|---|---|---|---|---|
| Resume (dense) | 11mm | 13mm | 11mm | 13mm |
| One-Pager | 15mm | 18mm | 15mm | 18mm |
| Long Doc | 20mm | 22mm | 22mm | 22mm |
| Letter | 25mm | 25mm | 25mm | 25mm |
| Portfolio | 12mm | 15mm | 12mm | 15mm |

**Rule**: denser = smaller margins, more formal (letter) = larger margins.

### Slide-scale spacing

Print uses mm/pt; slides (screen) use px. The scale relationships differ:

```css
--slide-pad: 80px;   /* slide four-side padding baseline */
```

**Key rules**:
- Slide padding-top: 72-80px (print is 96-120px; slides are more compact)
- Slide letter-spacing = print value / 2 (8px tracking "falls apart" on screen; halve it)
- Macro scale (font size, padding): multiply print pt values by ~1.6
- Micro scale (letter-spacing, border, radius): multiply by ~0.6

---

## 4. Components

### Cards / Containers

```css
.card {
  background: var(--ivory);
  border: 0.5pt solid var(--border-cream);
  border-radius: 8pt;
  padding: 16pt 20pt;
}

.card-featured {
  border-radius: 16pt;
  box-shadow: 0 4pt 24pt rgba(0,0,0,0.05);   /* whisper shadow */
}
```

Radius scale: 4pt -> 6pt -> 8pt (default) -> 12pt -> 16pt -> 24pt -> 32pt (hero containers).

### Buttons

```css
/* Primary - brand-colored */
.btn-primary {
  background: var(--brand);
  color: var(--ivory);
  padding: 8pt 16pt;
  border-radius: 8pt;
  box-shadow: 0 0 0 1pt var(--brand);   /* ring shadow */
}

/* Secondary - warm-sand */
.btn-secondary {
  background: var(--warm-sand);
  color: var(--dark-warm);
  padding: 8pt 16pt;
  border-radius: 8pt;
  box-shadow: 0 0 0 1pt var(--border);
}
```

### Tags

Three tiers from weak to strong visual weight:

**Lightest solid** (default, most restrained):
```css
.tag {
  background: #EEF2F7;      /* 0.08 solid equivalent */
  color: var(--brand);
  font-size: 9pt;
  font-weight: 600;
  padding: 1pt 5pt;
  border-radius: 2pt;
  letter-spacing: 0.4pt;
  text-transform: uppercase;
}
```

**Standard solid** (when more contrast needed):
```css
.tag {
  background: #E4ECF5;      /* 0.18 solid equivalent */
  color: var(--brand);
  padding: 1pt 6pt;
  border-radius: 4pt;
}
```

**Gradient brush** (only when "hand-painted" feel is required - use sparingly):
```css
.tag {
  background: linear-gradient(to right, #D6E1EE, #E4ECF5 70%, #EEF2F7);
  color: var(--brand);
  padding: 1pt 5pt;
  border-radius: 2pt;
}
```

**Philosophy**: tint depth should be one step lighter than what decoration wants. Prefer pale over saturated. In iteration, "gradient brush" often steals focus - lightest solid wins most of the time.

**Never**: `background: rgba(201, 100, 66, 0.18)` - WeasyPrint double-rectangle bug.

### Lists

```css
ul, ol {
  padding-left: 16pt;
  line-height: 1.55;
}
ul li::marker { color: var(--brand); }
```

Editorial bookish variant - **en-dash instead of bullet**:

```css
ul.dash { list-style: none; padding-left: 0; }
ul.dash li { padding-left: 14pt; }
ul.dash li::before {
  content: "\2013";
  color: var(--brand);
}
```

### Quote

```css
.quote {
  border-left: 2pt solid var(--brand);
  padding: 4pt 0 4pt 14pt;
  color: var(--olive);
  line-height: 1.55;
}
```

### Code

```css
.code-block {
  background: var(--ivory);
  border: 0.5pt solid var(--border-cream);
  border-radius: 6pt;
  padding: 10pt 14pt;
  font-family: var(--mono);
  font-size: 9pt;
  line-height: 1.5;
}
```

### Section Title

```css
.section-title {
  font-family: var(--serif);
  font-size: 14pt;
  font-weight: 500;
  color: var(--near-black);
  margin: 24pt 0 10pt 0;
  border-left: 2.5pt solid var(--brand);
  border-radius: 1.5pt;
  padding-left: 8pt;
}
```

### Table (kami-table)

Unified table component across all templates. Base class applies to bare `<table>` or `.kami-table`.

```css
table, .kami-table {
  width: 100%; border-collapse: collapse;
  font-size: 9.5pt; margin: 12pt 0; break-inside: avoid;
}
table th, .kami-table th {
  text-align: left; font-weight: 500; color: var(--dark-warm);
  padding: 6pt 8pt; border-bottom: 1pt solid var(--border);
}
table td, .kami-table td {
  padding: 5pt 8pt; border-bottom: 0.3pt solid var(--border-soft);
  vertical-align: top;
}
```

**Variants** (combine freely on the same element):

| Class | Purpose |
|---|---|
| `.compact` | 8pt font, tighter padding. For data-dense tables in resume/one-pager. |
| `.financial` | Right-align all columns except the first, enable `tabular-nums`. For revenue, pricing, metrics. |
| `.striped` | Alternating `var(--ivory)` background on even rows. Improves scanability for wide tables. |

**Total row**: add `.total` to the final `<tr>` for a bold summary row with a `1pt` brand top border.

```html
<table class="kami-table financial striped">
  <thead><tr><th>Category</th><th>Q1</th><th>Q2</th></tr></thead>
  <tbody>
    <tr><td>Revenue</td><td>$12.4M</td><td>$14.1M</td></tr>
    <tr class="total"><td>Total</td><td>$12.4M</td><td>$14.1M</td></tr>
  </tbody>
</table>
```

### Metric

Key numbers side-by-side (one-pager header, resume top, portfolio cover):

```css
.metrics { display: flex; gap: 24pt; }
.metric  { flex: 1; display: flex; align-items: baseline; gap: 6pt; }
.metric-value {
  font-family: var(--serif);
  font-size: 16pt;
  font-weight: 500;
  color: var(--brand);
  font-variant-numeric: tabular-nums;   /* align digits in columns */
}
.metric-label { font-size: 9pt; color: var(--olive); }
```

### Section Header (`.kami-section-header`)

Lightweight section opener for content slides. Has an eyebrow and a horizontal rule.

```css
.kami-section-header {
  margin-bottom: 36px;
}
.kami-section-header .eyebrow {
  display: flex;
  align-items: center;             /* dot is geometric, center beats baseline */
  gap: 8px;
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: 14px;
}
.kami-section-header .eyebrow::before {
  content: "";
  display: inline-block;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--brand);
  flex-shrink: 0;
}
.kami-section-header .rule {
  height: 1px;
  background: var(--border-warm);
  margin-bottom: 36px;             /* gap below rule >= 36px (>= 2x the gap above) */
}
.kami-section-header h1 {
  font-family: var(--serif);
  font-size: 38px;
  font-weight: 500;
  line-height: 1.1;
  color: var(--near-black);
}
```

**Spacing rule**: eyebrow to rule: 14px; rule to H1: **≥ 36px** (the gap below must be at least double the gap above, creating a visual anchor).

### Code Card (`.kami-code-card`)

For displaying pseudocode or code snippets in slides. More structured than a plain code block.

```css
.kami-code-card {
  background: var(--ivory);
  border: 1px solid var(--border-cream);
  border-radius: 8px;
  padding: 20px 24px;
  overflow: hidden;
}
.kami-code-card pre {
  font-family: var(--mono);
  font-size: 13px;                 /* 14px for larger slides */
  line-height: 1.55;
  color: var(--near-black);
  margin: 0;
  white-space: pre;
}
/* Syntax colors: existing tokens only, no new colors */
.kami-code-card .k { color: var(--brand); }    /* keyword / string */
.kami-code-card .c { color: var(--stone); }    /* comment */

/* Optional line numbers: 1px left divider */
.kami-code-card.numbered {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 16px;
}
.kami-code-card .line-nums {
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.55;
  color: var(--stone);
  text-align: right;
  border-right: 1px solid var(--border-soft);
  padding-right: 12px;
  user-select: none;
}
```

**Content philosophy**: use pseudocode style. Comments should outnumber code lines. The reader sees logic, not syntax.

---

## 5. Depth & Shadow

**Core rule**: do not use traditional hard shadows. Depth comes from three sources:

### 1. Ring shadow (border-like)

For **button** hover/focus states.

```css
/* Button default */
box-shadow: 0 0 0 1pt var(--ring-warm);

/* Button hover/active */
box-shadow: 0 0 0 1pt var(--ring-deep);
```

**Do not use for card hover**: ring shadow is a border replacement. Layering it over an existing border creates three-layer visual stacking (border + ring + offset), which feels digital, not paper-like.

### 2. Whisper shadow (barely visible lift)

For **card hover** and **featured card** elevation.

```css
/* Card hover - mimics paper lifting slightly */
.card {
  transition: box-shadow 0.2s;
}
.card:hover {
  box-shadow: 0 4pt 24pt rgba(0, 0, 0, 0.05);
}

/* Featured card default state */
.featured-card {
  box-shadow: 0 4pt 24pt rgba(0, 0, 0, 0.05);
}
```

**Why whisper, not ring**: paper elevation is depth change, not outline change. Whisper shadow is singular, soft, outline-free, matching the paper-like tone.

### 3. Section-level light/dark alternation

Long docs alternate parchment `#f5f4ed` and `#141413` dark sections. This section-level light change creates the strongest contrast.

**Forbidden**: `box-shadow: 0 2px 8px rgba(0,0,0,0.3)` and relatives.

---

## 6. Print & Pagination

### break-inside protection

```css
.card, .metric, .project-item, .quote, .code-block, figure, .callout {
  break-inside: avoid;
}
```

### Force break

```css
.page-break { break-before: page; }
```

### Page background extending past margins

```css
@page {
  size: A4;
  margin: 20mm 22mm;
  background: #f5f4ed;   /* extends past margin area, prevents printed white edges */
}
```

---

## 7. Quick decisions

When you're not sure "what should I use":

| Need | Use |
|---|---|
| Big headline | serif 500, size by level, line-height 1.10-1.30 |
| Reading body (EN) | serif 400, 9.5-10pt, line-height 1.55 |
| Reading body (CN) | sans 400, 9.5-10pt, line-height 1.55 |
| Emphasize a number | `color: var(--brand)`, no bold |
| Divide two sections | 2.5pt brand left bar, or 0.5pt warm-gray dotted |
| Quote someone | 2pt brand left border + olive color |
| Show code | ivory background + 0.5pt border + 6pt radius + mono |
| Primary vs secondary button | Primary = brand fill + ivory text; Secondary = warm-sand + dark-warm |
| Highlight one card in a list | `border: 0.5pt solid var(--brand)` or `border-left: 3pt solid var(--brand)` |
| Start a chapter | serif heading + 2.5pt brand left bar |
| Cover page | Display-size heading + right-aligned author/date + heavy whitespace |
| Data card | ivory background + 8pt radius + serif big number + sans small label |

Not on this table -> return to first principles: **serif carries authority, sans carries utility, warm gray carries rhythm, ink-blue carries focus**.

---

## 8. Deck Recipe (long deck rules)

For decks longer than 20 slides, the following rules apply. Each came from real production work.

| Rule | Content |
|------|---------|
| R1 | Slide container fixed at 1920×1080, scaled externally. No dynamic vh/vw units |
| R2 | Slide titles use Display (64px), not H1 (30px). H1 is a print hierarchy level |
| R4 | Slide letter-spacing = print value / 2. 8px tracking "falls apart" on screen |
| R5 | Section header: gap below rule ≥ 36px (at least 2x the gap above) |
| R6 | Eyebrow dot uses `align-items: center`, not baseline (dot is geometric, not text) |
| R7 | Slide padding-top 72-80px (print is 96-120px; slides are more compact) |
| R8 | Images use `object-fit: contain` + flex centering. Never stretch or crop |
| R9 | Use `.kami-slide-footer` for page number and deck mark, absolutely positioned to bottom |
| R10 | Code uses pseudocode style: more comment lines than code lines. Show logic, not syntax |

=== FILE: .claude/skills/kami/references/diagrams.md ===
# Diagrams

kami's drawing capability. **14 diagram types** covering structural, process, and data chart scenarios. All wear kami's skin (parchment + ink-blue + warm grays). No second design system.

Every diagram is a **self-contained HTML + inline SVG**. No Mermaid, no JS, no build step. Browse them as standalone pages, or copy the `<svg>...</svg>` block into a long-doc `<figure>` to embed.

---

## 1. Selection

| Showing… | Use | Template |
|---|---|---|
| System components + connections | **Architecture** | `assets/diagrams/architecture.html` |
| Decision branches, "if A then B else C" | **Flowchart** | `assets/diagrams/flowchart.html` |
| Two-axis positioning / prioritization | **Quadrant** | `assets/diagrams/quadrant.html` |
| Category comparison (revenue, market share, quarterly) | **Bar Chart** | `assets/diagrams/bar-chart.html` |
| Trend over time (stock price, growth rate, time series) | **Line Chart** | `assets/diagrams/line-chart.html` |
| Proportional breakdown (spend, user segments, share) | **Donut Chart** | `assets/diagrams/donut-chart.html` |
| Finite states + directed transitions (lifecycle, state machine) | **State Machine** | `assets/diagrams/state-machine.html` |
| Time axis + milestone events (roadmap, project progress) | **Timeline** | `assets/diagrams/timeline.html` |
| Cross-responsibility process (multi-role, API request path) | **Swimlane** | `assets/diagrams/swimlane.html` |
| Hierarchical relationships (org chart, module deps, directory tree) | **Tree** | `assets/diagrams/tree.html` |
| Vertically stacked system layers (OSI, application stack) | **Layer Stack** | `assets/diagrams/layer-stack.html` |
| Set intersections (feature overlap, audience comparison, capability map) | **Venn** | `assets/diagrams/venn.html` |
| OHLC price action (stock price, trading days, up/down candles) | **Candlestick** | `assets/diagrams/candlestick.html` |
| Revenue bridge, valuation decomposition, cash flow breakdown | **Waterfall** | `assets/diagrams/waterfall.html` |

Not on the list:
- **Compare two things**: use a table. A three-column table beats any diagram of a binary contrast.
- **One box with a label**: delete the box, write the sentence.

### The question before drawing

> Would a well-written paragraph teach the reader less than this diagram?

If "no", don't draw. Diagrams add signal to hierarchy, direction, and magnitude. They don't decorate prose.

---

## 2. Complexity budget

**Target density: 4/10**. Enough to be technically complete, not so dense the reader needs a guide.

- Nodes > 9 -> this is two diagrams, not one
- Two nodes that always travel together -> they're one node
- A line whose meaning is obvious from layout -> remove the line
- 5 nodes in ink-blue -> you haven't decided what's focal

**Focal rule**: 1-2 focal elements per diagram (`#1B365D` stroke + `#EEF2F7` fill). Everything else goes neutral. Focal signal comes from contrast, not count.

---

## 3. Embedding in long-doc / portfolio

### Standalone preview

Open `assets/diagrams/architecture.html` (or `flowchart.html`, `quadrant.html`) directly. Each file is a complete HTML page with title, SVG, and caption.

### Embed in a kami document

Extract **only the `<svg>...</svg>` block** from the template (leave the frame / h1 / eyebrow behind). Drop it into a long-doc `<figure>`:

```html
<figure>
  <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
    <!-- svg content copied from architecture.html -->
  </svg>
  <figcaption>Figure 1. {{Short editorial caption in serif.}}</figcaption>
</figure>
```

`long-doc.html` already styles `figure` and `figcaption`. No extra CSS required.

### Editing nodes / text

Edit the `<text>` and `<rect>` values directly. Rules:

- **All coordinates, widths, and gaps must be divisible by 4.** This is the anti-AI-slop floor. Break it once and the diagram starts looking "close enough".
- Node widths: 128 / 144 / 160 (three tiers, don't add more). Small diagrams (viewBox width < 360) may compress to 2 tiers, but still keep it 2 - don't tailor each node.
- Node heights: 32 (pill) / 64 (standard)
- Font sizes: 7 (small mono label) / 9 (sublabel mono) / 12 (name sans)
- **Arrow endpoints land exactly on node edges**: start `(box.x + box.w, box.y + box.h/2)`, end `(box.x, box.y + box.h/2)`, not "close enough". A 10px gap is visible to the eye.
- **SVG top padding**: the `y` in `<text y="…">` is the baseline. `y` must be ≥ font-size × 1.2, otherwise the tops of capital letters extend above the viewBox and get clipped (classic symptom: "TOOLS" renders as "TOULS"). Either pad the viewBox at the top or move `y` into the safe zone.
- **Loop arc control points**: for a four-cardinal-node ring, each arc is a Q-curve whose control point sits at the **outer intersection of the two adjacent tangent axes**, not at a node corner. Example for PLAN (top) → ACT (right): start = PLAN's right-edge midpoint, end = ACT's top-edge midpoint, control = `(ACT.x + ACT.w/2, PLAN.y + PLAN.h/2)`. This gives a pure horizontal tangent at departure and pure vertical at arrival, reading as a clean quarter-circle. Control at the node corner produces a squashed arc.
- **Closed loops need a dashed framing ring**: four directed arcs alone force the reader to mentally connect them into a loop. A dashed circle centered on the visual center (radius slightly larger than center-to-inner-edge distance) makes the loop immediately readable. Draw the ring below the nodes; solid node fills mask where the ring crosses each node; the ring shows only between nodes.
- **Chevron arrows, not filled triangles**: use `<path d="M2 1 L8 5 L2 9" fill="none" stroke=... stroke-width="1.5" stroke-linecap="round"/>`. A filled triangle reads as technical UI; an open two-stroke chevron reads as editorial schematic. kami defaults to chevron. **WeasyPrint does not support `<marker orient="auto">`**: all markers render at 0° (pointing right). The fix is to skip `<marker>` and draw each arrowhead as a manual chevron `<path>` with hardcoded direction (see production.md #15).

### Color token map

Shared tokens across the three diagrams, mapping directly to kami's design system:

| SVG role | kami token | Value |
|---|---|---|
| Canvas | `--parchment` | `#f5f4ed` |
| Standard node fill | (white) | `#ffffff` |
| Standard node stroke | `--near-black` | `#141413` |
| Store node fill | near-black 5% | `rgba(20,20,19,0.05)` |
| Store node stroke | `--olive` | `#504e49` |
| Cloud node fill | near-black 3% | `rgba(20,20,19,0.03)` |
| Cloud node stroke | near-black 30% | `rgba(20,20,19,0.30)` |
| External node fill | olive 8% | `rgba(94,93,89,0.08)` |
| External node stroke | `--stone` | `#6b6a64` |
| **Focal fill** | `--brand-tint` | `#EEF2F7` |
| **Focal stroke** | `--brand` | `#1B365D` |
| Standard arrow | `--olive` | `#504e49` |
| Focal arrow | `--brand` | `#1B365D` |
| Primary text | `--near-black` | `#141413` |
| Secondary text | `--olive` | `#504e49` |
| Tertiary text / small mono label | `--stone` | `#6b6a64` |

Don't add a fourth state ("warning amber", "success green"). kami has one accent.

---

## 4. AI-slop anti-patterns

Scan for these when drawing or reviewing:

| Anti-pattern | Why it fails |
|---|---|
| Dark mode + cyan / purple glow | Cheap "technical" signifier with no design decision |
| All nodes identical size | Destroys hierarchy |
| JetBrains Mono as the universal "dev" font | Mono is for technical content (ports, URLs, fields). Names go in sans. |
| Legend floating inside the diagram area | Collides with nodes |
| Arrow labels without a masking rect | Line bleeds through the text |
| Vertical `writing-mode` text on arrows | Unreadable |
| Three equal-width summary cards as a default | Template feel. Vary widths. |
| `box-shadow` on anything | kami only permits ring / whisper |
| `rounded-2xl` / border-radius above 10px | Max 6-10px. Beyond, it starts to look like App Store chrome. |
| Ink Blue on every "important" node | Focal rule is 1-2, not a signaling system |
| Decorative icons | Disaster |
| Gradient backgrounds | kami forbids them |
| Focal color contradicts the caption's claim | Caption says "Simple **core**", but the ACT node is painted ink-blue - two focals competing. Focal color must match the word emphasized (`<span class="hl">`) in the caption |
| Cycle diagram with a dashed ring AND four directed arcs | Same loop drawn twice; reader thinks there are two flows |
| SVG text clipped at the viewBox top | `text` y is the baseline; cap letters extend above y=0. Pad the top by font-size × 1.2 or adjust the viewBox |
| 5-10px gap between arrow endpoint and node edge | Reads as "arrow floating in space". Anchor endpoints to exact `box.x / box.x+w / box.y / box.y+h` |
| Per-node custom widths within one diagram | Four steps at widths 60 / 76 / 80 / 100 feel hand-patched. Small diagram: 2 tiers. Large: 3 tiers. That's the full budget |
| Porting an external diagram with one accent color per node type (purple/amber/green/red) | kami has one accent. When adapting external diagrams, migrate the focal to whichever element the caption's `<span class="hl">` emphasizes; concentrate color there, keep all other nodes neutral |
| Ring diagram: every node is a single word, center is empty | Four labeled boxes looping with no anchor. Either add a subtitle to each node or place one line of text at the center (exit condition, LOC count, etc.). Pick one. |

---

## 5. Common pairings

### Technical white paper
- Architecture (system overview) + built-in timeline (from long-doc)
- One architecture diagram per chapter, maximum. If you want two, the chapter is covering two topics and should split.

### Portfolio project page
- Quadrant (competitive positioning) or architecture (the layer you owned)
- **Not every project needs a diagram.** Only when the diagram says something prose can't.

### One-pager
- Quadrant (priority) or flowchart (decision path)
- One diagram only. If you're tempted to add a second, kill the weaker one.

### Resume
- **No diagrams.** Resume real-estate costs more than diagrams. Rare exception: a URL to a portfolio diagram when showing system-level capability.

### Slides
- One diagram per slide, max. The diagram is the body. Text is caption, not a sidebar.

---

## 6. Data charts (bar / line / donut)

Five data-driven chart types for investment reports, financial comparisons, and market-share breakdowns. Like the first three diagram types, all are self-contained HTML + inline SVG, embeddable in any kami document.

### Color palette (derived from kami warm palette)

| Role | Value | Use |
|---|---|---|
| Primary series | `#1B365D` ink-blue | First group / focal data |
| Series 2 | `#504e49` olive | Second group |
| Series 3 | `#6b6a64` stone | Third group |
| Series 4 | `#b8b7b0` light-stone | Fourth group |
| Series 5 | `#d4d3cd` mist | Fifth group |
| Series 6 | `#EEF2F7` brand-tint | Sixth group |
| Grid lines | `#e8e7e1` | Axes / reference lines |
| Data labels | `#141413` near-black | Numeric text |

### Data limits

| Chart | Max categories | Max series | Template |
|---|---|---|---|
| Bar chart | 8 groups | 3 series | `assets/diagrams/bar-chart.html` |
| Line chart | 12 points | 3 lines | `assets/diagrams/line-chart.html` |
| Donut chart | 6 segments | n/a | `assets/diagrams/donut-chart.html` |
| Candlestick | 30 days | n/a | `assets/diagrams/candlestick.html` |
| Waterfall | 8 segments | n/a | `assets/diagrams/waterfall.html` |

### Editing data

Each file has `<!-- DATA START -->` / `<!-- DATA END -->` comments. Only change SVG elements between those markers (`<rect>` coordinates, `<polyline>` points, `<path>` arcs, `<text>` values). Leave surrounding structure and styles untouched.

**Coordinate rules (same as the first three diagram types)**:
- All coordinates divisible by 4
- Bar chart corner radius `rx=2` (distinct from node radius 6-10)
- Line chart: `<polyline>` points format `"x1,y1 x2,y2 ..."`, data points marked with `<circle>`
- Donut chart: `<path>` arcs use `A R R 0 large-arc sweep_flag x y`; `large-arc=1` only when segment > 180°

**Bar / line chart Y-axis formula** (default scale: max=140, chart-height=280, scale=2):
```
bar_height = value × 2
bar_top_y  = 320 - bar_height   (baseline y = 320)
dot_y      = 320 - value × 2
```

**Donut arc coordinates** (cx=300 cy=200 R=136 r=76, clockwise from top at -90°):
```
angle_start = -90 + sum_of_previous_percentages × 3.6
angle_end   = angle_start + this_percentage × 3.6
outer_x = 300 + 136 × cos(angle_deg × π/180)
outer_y = 200 + 136 × sin(angle_deg × π/180)
inner_x = 300 + 76  × cos(angle_deg × π/180)
inner_y = 200 + 76  × sin(angle_deg × π/180)
```

**Candlestick Y-axis formula** (default: price range 100-160, chart-height=280, scale=4.67):
```
candle_y = 320 - (price - 100) * 4.67
Up candle: fill=#1B365D (close > open), body from open_y to close_y
Down candle: fill=#6b6a64 (close < open), body from close_y to open_y
Wick: 1.2px stroke from high_y to low_y, centered on candle
```

**Waterfall formula** (default: max=200, chart-height=280, scale=1.4):
```
bar_y = 320 - value * 1.4
Floating bars: top = running_total_y, height = abs(delta) * 1.4
Positive: fill=#1B365D · Negative: fill=#6b6a64 · Total: fill=#4d4c48
Connector: dashed 0.8px #b8b7b0 between adjacent bar edges
```

---

## 7. Build / preview

```bash
python3 scripts/build.py diagram-architecture
python3 scripts/build.py diagram-flowchart
python3 scripts/build.py diagram-quadrant
python3 scripts/build.py diagram-bar-chart
python3 scripts/build.py diagram-line-chart
python3 scripts/build.py diagram-donut-chart
python3 scripts/build.py diagram-state-machine
python3 scripts/build.py diagram-timeline
python3 scripts/build.py diagram-swimlane
python3 scripts/build.py diagram-tree
python3 scripts/build.py diagram-layer-stack
python3 scripts/build.py diagram-venn
python3 scripts/build.py diagram-candlestick
python3 scripts/build.py diagram-waterfall

# or all
python3 scripts/build.py
```

Or just open `assets/diagrams/*.html` in a browser.

---

## 8. Credit

This capability is inspired by Cathryn Lavery's [diagram-design](https://github.com/cathrynlavery/diagram-design) (a Claude Code skill with 13 editorial diagram types). kami borrowed the **approach** (inline SVG, semantic tokens, complexity budget, anti-slop table). Not the full catalog.

=== FILE: .claude/skills/kami/references/production.md ===
# Production (Build · Verify · Troubleshoot)

The engineering runbook for kami: from HTML / Python templates to PDF / PPTX deliverables. Four parts: **HTML -> PDF** · **Python -> PPTX** · **Verify & Debug** · **16 known pitfalls**.

---

## Part 1 · HTML -> PDF (WeasyPrint)

### Install

```bash
pip install weasyprint pypdf --break-system-packages --quiet
```

Linux first-time:
```bash
apt install -y libpango-1.0-0 libpangoft2-1.0-0 fonts-noto-cjk
```

### Generate

```python
from weasyprint import HTML
HTML('doc.html').write_pdf('output.pdf')
```

**CWD matters**: `@font-face { src: url("xxx.ttf") }` uses relative paths, so run from the directory containing the font file.

```bash
cd /path/to/html-and-font
python3 -c "from weasyprint import HTML; HTML('doc.html').write_pdf('out.pdf')"
```

### Fonts

**Most stable setup**: font file alongside HTML, `@font-face` with relative path.

```html
<style>
@font-face {
  font-family: "TsangerJinKai02";
  src: url("TsangerJinKai02-W04.ttf");
  font-weight: 400 500;
}
body { font-family: Charter, Georgia, Palatino, serif; }
</style>
```

**No commercial font available**: fallback chains are embedded in every template.

```css
/* English */
font-family: Charter, Georgia, Palatino,
             "Times New Roman", serif;

/* Chinese */
font-family: "TsangerJinKai02", "Source Han Serif SC",
             "Noto Serif CJK SC", "Songti SC", Georgia, serif;

/* Japanese */
font-family: "YuMincho", "Yu Mincho", "Hiragino Mincho ProN",
             "Noto Serif CJK JP", "Source Han Serif JP",
             "TsangerJinKai02", Georgia, serif;
```

**Font fallback affects page count**. Any font swap requires re-running the page-count check. If it overflows: lower `font-size` first, then tighten margins, then cut content.

**Claude Desktop skill ZIPs do not bundle large Chinese font files**: `TsangerJinKai02-W04.ttf` and `TsangerJinKai02-W05.ttf` are close to 19MB each and can make Claude.ai / Desktop skill upload or execution time out. Release ZIPs must be generated with `scripts/package-skill.sh`, which excludes both TTF files. Templates still keep local-first and jsDelivr fallback `@font-face` paths.

### Page spec

```css
@page {
  size: A4;                     /* or 210mm 297mm / A4 landscape / 13in 10in */
  margin: 20mm 22mm;
  background: #f5f4ed;          /* extend past margins to avoid white printed edge */
}
```

### Headers & footers

```css
@page {
  @top-right {
    content: counter(page);
    font-family: serif; font-size: 9pt; color: #6b6a64;
  }
  @bottom-center {
    content: "{{DOC_NAME}} · {{AUTHOR}}";
    font-size: 9pt; color: #6b6a64;
  }
}

@page:first {
  @top-right { content: ""; }
  @bottom-center { content: ""; }
}
```

### WeasyPrint support matrix

| Solid | Partial | Unsupported |
|---|---|---|
| CSS Grid / Flexbox | CSS filter / transform (partial) | JavaScript |
| `@page` rules | inline SVG (some attrs) | `position: sticky` |
| `@font-face` | gradients (slow, use sparingly) | CSS animations / transitions |
| `break-before` / `break-inside: avoid` | | |
| CSS variables `var(--name)` | | |
| `::before` / `::after` | | |

### PDF metadata

WeasyPrint reads standard meta tags in `<head>` and writes them into the PDF (Title / Author / Subject / Keywords). All templates have pre-built placeholders:

```html
<head>
  <title>{{DOC_TITLE}}</title>
  <meta name="author"      content="{{AUTHOR}}">
  <meta name="description" content="{{DESCRIPTION}}">
  <meta name="keywords"    content="{{KEYWORDS}}">
  <meta name="generator"   content="Kami">
</head>
```

**Auto-inference rules** (Claude fills these from the document content without asking):

| Field | Source |
|---|---|
| `<title>` | H1 heading or `.header .title` text |
| `author` | Resume / letter / portfolio: person's name from the document; everything else: `"Kami"` |
| `description` | One sentence extracted from the first 2 paragraphs, ≤150 characters |
| `keywords` | 3-5 keywords from title + section headings, comma-separated |
| `generator` | Fixed `"Kami"`, already set in template, do not change |

**Verify**:

```bash
pdfinfo assets/examples/one-pager-en.pdf   # shows Title / Author / Subject
```

---

## Part 2 · Python -> PPTX (python-pptx)

PPT shares the same design language but the medium (screen, 16:9, one-idea-per-slide) changes the details: fonts larger, layouts more rigid.

### Install

```bash
pip install python-pptx --break-system-packages --quiet
```

### Dimensions

- **16:9 widescreen** (preferred): 13.33 × 7.5 inch
- **4:3 traditional**: 10 × 7.5 inch
- **Safe zone**: 0.5 inch margin on all sides (projector crop), plus 0.3 inch at bottom for page number

### Palette (1:1 with design.md)

```python
from pptx.dml.color import RGBColor

PARCHMENT   = RGBColor(0xf5, 0xf4, 0xed)
IVORY       = RGBColor(0xfa, 0xf9, 0xf5)
BRAND       = RGBColor(0x1B, 0x36, 0x5D)
NEAR_BLACK  = RGBColor(0x14, 0x14, 0x13)
DARK_WARM   = RGBColor(0x3d, 0x3d, 0x3a)
OLIVE       = RGBColor(0x5e, 0x5d, 0x59)
STONE       = RGBColor(0x87, 0x86, 0x7f)
BORDER_WARM = RGBColor(0xe8, 0xe6, 0xdc)
TAG_BG      = RGBColor(0xee, 0xf2, 0xf7)
```

### Type (bigger than print, optimized for projection)

| Role | Size | Font |
|---|---|---|
| Title | 48pt | Serif 500 |
| Subtitle | 24pt | Serif 400 |
| H2 chapter | 32pt | Serif 500 |
| H3 subtitle | 20pt | Serif 500 |
| Body | 18pt | Serif 400 |
| Caption | 14pt | Serif 400 |
| Footer | 12pt | Serif 400 |

English stack on PowerPoint:
- Serif: `Charter` -> `Georgia` -> `Palatino`
- Sans: same as serif (single-font-per-page rule)

### Eight standard layouts

1. **Cover**: parchment background, centered display title + brand-colored short line + subtitle / author / date
2. **Contents**: parchment, left-aligned `01  Chapter title` (number serif brand-colored)
3. **Chapter divider**: full brand ink-blue background, centered white title - the **only** fully chromatic slide in the deck
4. **Content slide**: eyebrow (serif stone) + core claim (serif near-black) + brand line + body (serif dark-warm)
5. **Data slide**: top takeaway + 2-4 metric cards (big number serif brand + small label serif olive)
6. **Comparison**: two columns with a 0.5pt warm-gray divider
7. **Quote**: parchment, minimal, centered serif quote + `- Source`
8. **Closing**: parchment, centered "Thank you / Q&A / Contact"

### Script skeleton

Full working example in `assets/templates/slides-en.py`. Key bits:

```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN

PARCHMENT = RGBColor(0xf5, 0xf4, 0xed)
BRAND     = RGBColor(0x1B, 0x36, 0x5D)
SERIF = "Charter"
SANS  = SERIF

prs = Presentation()
prs.slide_width  = Inches(13.33)
prs.slide_height = Inches(7.5)

def blank_slide():
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid(); bg.fill.fore_color.rgb = PARCHMENT
    bg.line.fill.background(); bg.shadow.inherit = False
    return slide
```

### PPT notes

1. **One idea per slide** - if it runs over three lines, split it
2. **No default PowerPoint template** - it's cool-blue-gray, clashes with parchment
3. **Animations**: don't. Parchment is a print aesthetic, not a SaaS demo. At most `fade`
4. **Export to PDF** for sharing - cross-machine consistency is better than .pptx
 - macOS: Keynote -> Export to PDF
 - Linux: `libreoffice --headless --convert-to pdf output.pptx`

### Slide scale rules (from production decks)

Print and slide share the same palette and serif, but sizing is different.
One rule covers most adjustments: **macro spacing x1.6, micro details x0.5** (letter-spacing, border weight, border-radius).

| Item | Print | Slide | Why |
|---|---|---|---|
| Container | A4 portrait | 1920x1080 or A4 landscape | Fixed ratio, never `100vw x 100vh` |
| Title size | 30-34pt | 48-64pt | Projection needs larger display |
| Slide padding | N/A | 72-80px top, 80px sides | Less than 72px top feels cramped |
| Eyebrow tracking | 0.5-1pt | 3px max | Print tracking looks scattered at slide scale |
| Display tracking | 0 to -0.2pt | -0.5pt | Tighten large titles to prevent letter gaps |
| Header gap | 8-14pt | 36px+ between rule and H1 | Below 36px the rule looks like an underline |
| Line-height titles | 1.1-1.3 | 1.3 minimum | CJK characters collide below 1.3 at slide sizes |
| Code blocks | Full runnable code | Pseudocode + `.hl` keywords | Slide code is for structure, not execution |
| Images | Inline with text | `width:100%; object-fit:contain; max-height:780px` | Avoid fixed height that clips different ratios |
| Footer | Per-template | Single component, CSS-injected text | Prevents drift across 50+ slides |
| Punctuation | Standard | Use ` - ` for short joins, `<ol>` for parallel items | CJK commas break visual rhythm at slide scale |

---

## Part 3 · Verify & Debug

### The three-step loop (mandatory after every change)

```bash
# 1. Generate
python3 -c "from weasyprint import HTML; HTML('doc.html').write_pdf('out.pdf')"

# 2. Page count
python3 -c "from pypdf import PdfReader; print(len(PdfReader('out.pdf').pages))"

# 3. Visual inspect (when in doubt)
pdftoppm -png -r 300 out.pdf inspect
```

**Not verified = not done.**

### Did the font actually load?

```bash
pdffonts output.pdf
```

If the output shows `DejaVuSerif` / `Bitstream Vera` - your specified font didn't load, fell through to system ultimate fallback. Expected: `Charter`, `Georgia`, `TsangerJinKai02`, or a Japanese Mincho face such as `YuMincho`, `Hiragino-Mincho`, `Noto-Serif-CJK-JP`, or `Source-Han-Serif-JP`.

### One-step build + validate

Project script `scripts/build.py` is the productized version of the three-step loop:

```bash
python3 scripts/build.py               # all 12 examples
python3 scripts/build.py resume-en     # one target + page count + fonts
python3 scripts/build.py --check       # scan for CSS rule violations
```

### Layout stabilizer (HTML templates)

When a constrained template is near page overflow (one-pager, letter, resume, and English variants), run the stabilizer first, then verify:

```bash
python3 scripts/stabilize.py all --out-dir dist/stabilized --report
python3 scripts/stabilize.py one-pager letter resume one-pager-en letter-en resume-en --strict --report
python3 scripts/build.py --check
python3 scripts/build.py --verify
```

`scripts/stabilize.py` is intentionally independent from `scripts/build.py`. Thresholds and solver behavior are controlled by `references/stabilizer_profiles.json`.

### Hi-res visual inspection

```bash
pdftoppm -png -r 160 output.pdf preview      # standard
pdftoppm -png -r 300 output.pdf preview      # detail bugs
pdftoppm -png -r 400 output.pdf preview      # extreme detail (tag double-rect check)
```

### 5-point pre-ship review

A successful render is not enough. Scan these before delivery:

| Dimension | Pass standard |
|---|---|
| Fact accuracy | Numbers, dates, versions, funding, specs, and market facts have sources; uncertainty is written as magnitude or marked as missing |
| Content structure | Headlines read as a summary; each paragraph opens with a claim; no ceremonial filler |
| Material coverage | Branded docs include logo, product image, or UI screenshot coverage; missing materials are clearly marked |
| Typographic detail | Fonts load correctly, line-height stays in spec, emphasis only marks numbers or distinctive phrases, tag backgrounds are solid hex |
| PDF readiness | Page count fits, placeholders are replaced, visual inspection shows no overflow, overlap, or broken page breaks |

If any row fails, fix it before delivery.

---

## Part 4 · 16 known pitfalls

Every entry below came from a real failure. Check here first when something looks wrong.

### 1. Tag / Badge double-rectangle bug (the worst)

**Symptom**: PDFs show two concentric rectangles on tag backgrounds at zoom - an outer softer one and an inner tighter one. Especially visible on mobile PDF viewers.

**Root cause**: WeasyPrint renders `rgba(..., 0.xx)` by compositing the **padding area** and the **glyph pixel area** independently. Glyph anti-aliasing stacks alpha differently, creating the second visible edge.

**Fix**: Tag backgrounds must be solid hex. No rgba.

```css
/* avoid */ .tag { background: rgba(201, 100, 66, 0.18); }
/* use   */ .tag { background: #E4ECF5; }
```

**rgba -> solid conversion** (parchment `#f5f4ed` base + ink-blue `#1B365D`):

| rgba alpha | Solid hex |
|---|---|
| 0.08 | `#EEF2F7` |
| 0.14 | `#E4ECF5` |
| **0.18** | **`#E4ECF5`** ← default |
| 0.22 | `#D0DCE9` |
| 0.30 | `#D6E1EE` |

Formula: `solid_channel = base + (foreground - base) × alpha`. Different base colors (e.g. ivory) need re-computing.

**Want "breathing" texture?** Use `linear-gradient` - the whole tag rasterizes as one bitmap, no alpha compositing:

```css
.tag { background: linear-gradient(to right, #D6E1EE, #E4ECF5 70%, #EEF2F7); }
```

**Aesthetic warning**: gradients work engineering-wise but usually oversell the tag. Priority order: lightest solid (`#EEF2F7`) > standard solid (`#E4ECF5`) > gradient (rarely). If the reader's eye lands on the tag background shape before the text inside - you went too far.

### 2. Thin border + radius = double circle

**Symptom**: `border: 0.4pt solid ...` + `border-radius: 2pt` shows two parallel arcs on zoom.

**Root cause**: WeasyPrint strokes border inner and outer paths separately when `< 1pt` + rounded corners - at thin widths they can't overlap.

**Fix (pick one)**:
1. Use background fill instead (preferred, design-consistent)
2. Border ≥ 1pt
3. Drop `border-radius`

### 3. 2-page hard-limit overflow

For resume, one-pager, and other length-capped docs.

**Common causes**: font fallback, content added, font-size bumped by accident, line-height pushed from 1.4 to 1.6.

**Diagnose**: `pdffonts output.pdf` to verify what actually loaded.

**Fix (priority)**:
1. Cut redundant qualifiers ("deeply researched" -> "researched")
2. Merge related data points in the same section
3. Drop non-essential items whole (not piecemeal)
4. Reduce section spacing (use sparingly - affects global rhythm)
5. Last resort: shrink font by 0.1-0.2pt

**Don't**: cut cover / education / timeline structural blocks; cut emphasis (resume becomes flat).

### 4. Font fallback causes page count inconsistency

**Symptom**: 2 pages locally, 4 pages in CI / on server.

**Root cause**: font file neither alongside HTML nor system-installed.

**Fix**:

```bash
# Put .ttf alongside the HTML
cp TsangerJinKai02-W04.ttf workspace/

# Or system install (Linux)
apt install fonts-noto-cjk
mkdir -p ~/.fonts && cp *.ttf ~/.fonts/ && fc-cache -f
```

### 5. CJK and Latin crowding (Chinese mode only)

**Symptom**: "125.4k GitHub Stars" - k and G feel glued.

**Wrong fixes**: hand-added `&nbsp;` / `margin-left: 2mm` (misaligns adjacent elements).

**Right fix**: separate spans with flex gap:

```html
<div class="metric">
  <span class="metric-value">125.4k</span>
  <span class="metric-label">GitHub Stars</span>
</div>
```
```css
.metric { display: flex; align-items: baseline; gap: 6pt; }
```

### 6. Full-width vs half-width spaces (Chinese mode)

- **Between Chinese characters**: U+3000 full-width space + `·` + space
- **Between Latin words**: half-width space + `·` + space
- **Mixed**: prefer flex gap, don't hand-type spaces

### 7. Thousands / percent / arrows - be consistent

| Use | Avoid |
|---|---|
| `5,000+` | `5000+` |
| `90%` | `90 %` (pre-space) |
| `->` | `->` / `-&gt;` |

Self-check:
```bash
grep -oE '->|->|⟶|⇒' doc.html | sort | uniq -c
grep -oE '[0-9]{4,}' doc.html | sort -u
```

### 8. Too much / too little emphasis

- Four or five ink-blue runs in one line -> visual fatigue, no focal point
- Entire section with none -> flat, no scan handles

**Rule**: ≤ 2 emphases per line, ≥ 1 per section, only **quantifiable numbers or distinctive phrases** get highlighted - never adjectives.

Healthy ratio: one emphasis per 80-150 words.

### 9. `height: 100vh` doesn't work

**Symptom**: full-bleed cover using `height: 100vh` renders empty.

**Root cause**: viewport units are undefined in WeasyPrint's `@page` context.

**Fix**:

```css
.cover {
  min-height: 257mm;                   /* A4 height 297 - 40mm margins */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

### 10. `break-inside` fails inside flex

**Symptom**: `.card { break-inside: avoid }` still splits across pages.

**Root cause**: WeasyPrint's flex/grid `break-inside` support on direct children is incomplete.

**Fix**: wrap the flex item in an extra block:

```html
<div class="row">
  <div class="card-wrapper"><div class="card">...</div></div>
</div>
```
```css
.row { display: flex; }
.card-wrapper { break-inside: avoid; }
```

### 11. Hide page number on the first page

```css
@page:first {
  @top-right { content: ""; }
}
```

### 12. Printed white margin around the page

**Symptom**: printing produces a white border even though `background` is set.

**Root cause**: default `@page background` only covers the content area, not the margin.

**Fix**:

```css
@page {
  size: A4; margin: 20mm;
  background: #f5f4ed;    /* extends past margins */
}
```

### 13. Blurry images

**Symptom**: images in PDF look soft.

**Root cause**: WeasyPrint renders at source pixel density. A4 @ 300 dpi = 2480 × 3508 pixels.

**Fix**: source images at 2x or 3x.

### 14. Verification loop (catch-all)

```bash
python3 -c "from weasyprint import HTML; HTML('doc.html').write_pdf('out.pdf')"
python3 -c "from pypdf import PdfReader; print(len(PdfReader('out.pdf').pages))"
pdftoppm -png -r 300 out.pdf inspect    # when in doubt
```

**Not verified = not done.**

### 15. SVG marker `orient="auto"` ignored

**Symptom**: SVG arrows using `<marker orient="auto">` or `orient="auto-start-reverse"` all point right (the marker's default drawing direction), regardless of the path's tangent angle.

**Root cause**: WeasyPrint's SVG renderer does not support the `orient="auto"` attribute on markers. The marker is always drawn at 0°.

**Fix**: skip `<marker>` entirely. Draw each arrowhead as a manual chevron `<path>` at the endpoint, with the direction hardcoded.

```xml
<!-- Bad: marker arrow, WeasyPrint renders all pointing right -->
<defs>
  <marker id="a" orient="auto" ...>
    <path d="M2 1L8 5L2 9" .../>
  </marker>
</defs>
<path d="M 440 52 Q 568 52 568 244" marker-end="url(#a)"/>

<!-- Good: manual chevron, direction per endpoint -->
<path d="M 440 52 Q 568 52 568 244" fill="none" stroke="#504e49" stroke-width="1.5"/>
<path d="M 560 236 L 568 244 L 576 236" fill="none" stroke="#504e49" stroke-width="1.5"
      stroke-linecap="round" stroke-linejoin="round"/>
```

Chevron templates (tip at endpoint, 8px arm length):

| Direction | chevron path |
|---|---|
| down | `M (x-8) (y-8) L x y L (x+8) (y-8)` |
| left | `M (x+8) (y-8) L x y L (x+8) (y+8)` |
| up | `M (x-8) (y+8) L x y L (x+8) (y+8)` |
| right | `M (x-8) (y-8) L x y L (x-8) (y+8)` |

### 16. Slide letter-spacing must be halved

**Symptom**: Slide text looks "scattered" or over-spaced when print letter-spacing values (e.g. `letter-spacing: 8px`) are used directly.

**Root cause**: Print letter-spacing values are tuned for small sizes (8-12pt). At slide sizes (48-64px), the same absolute value gets multiplied out of control.

**Fix**: Slide letter-spacing = print value / 2. Mono fonts are exempt (fixed-width by nature, no extra tracking needed).

```css
/* Print eyebrow */
.eyebrow { letter-spacing: 6px; }

/* Slide eyebrow */
.slide .eyebrow { letter-spacing: 3px; }   /* halved */
```

=== FILE: .claude/skills/kami/references/stabilizer_profiles.json ===
{
  "defaults": {
    "line_height": {
      "min": 1.0,
      "max": 1.55
    },
    "body_font_size_pt": {
      "min": 9.0,
      "max": 12.0
    },
    "body_line_height": {
      "min": 1.35,
      "max": 1.55
    },
    "section_gap_pt": {
      "min": 12.0,
      "max": 30.0
    },
    "page_margin_mm": {
      "min": [8.0, 10.0, 8.0, 10.0]
    },
    "overflow_solver": {
      "enabled": true,
      "max_iterations": 40,
      "section_gap_step_pt": 1.0,
      "body_line_height_step": 0.02,
      "body_font_step_pt": 0.2,
      "margin_step_mm": 1.0
    }
  },
  "targets": {
    "one-pager": {
      "section_gap_pt": {
        "min": 12.0,
        "max": 24.0
      },
      "page_margin_mm": {
        "min": [12.0, 14.0, 12.0, 14.0]
      },
      "overflow_solver": {
        "max_iterations": 30
      }
    },
    "one-pager-en": {
      "section_gap_pt": {
        "min": 12.0,
        "max": 24.0
      },
      "page_margin_mm": {
        "min": [12.0, 14.0, 12.0, 14.0]
      },
      "overflow_solver": {
        "max_iterations": 30
      }
    },
    "letter": {
      "body_font_size_pt": {
        "min": 10.5,
        "max": 12.0
      },
      "body_line_height": {
        "min": 1.45,
        "max": 1.55
      },
      "section_gap_pt": {
        "min": 18.0,
        "max": 32.0
      },
      "page_margin_mm": {
        "min": [20.0, 20.0, 20.0, 20.0]
      },
      "overflow_solver": {
        "max_iterations": 20
      }
    },
    "letter-en": {
      "body_font_size_pt": {
        "min": 10.5,
        "max": 12.0
      },
      "body_line_height": {
        "min": 1.45,
        "max": 1.55
      },
      "section_gap_pt": {
        "min": 18.0,
        "max": 32.0
      },
      "page_margin_mm": {
        "min": [20.0, 20.0, 20.0, 20.0]
      },
      "overflow_solver": {
        "max_iterations": 20
      }
    },
    "resume": {
      "body_font_size_pt": {
        "min": 8.8,
        "max": 9.8
      },
      "body_line_height": {
        "min": 1.34,
        "max": 1.45
      },
      "section_gap_pt": {
        "min": 8.0,
        "max": 22.0
      },
      "page_margin_mm": {
        "min": [7.0, 10.0, 7.0, 10.0]
      },
      "overflow_solver": {
        "max_iterations": 60,
        "body_font_step_pt": 0.1,
        "margin_step_mm": 0.5
      }
    },
    "resume-en": {
      "body_font_size_pt": {
        "min": 8.8,
        "max": 10.0
      },
      "body_line_height": {
        "min": 1.35,
        "max": 1.48
      },
      "section_gap_pt": {
        "min": 8.0,
        "max": 22.0
      },
      "page_margin_mm": {
        "min": [9.0, 10.0, 9.0, 10.0]
      },
      "overflow_solver": {
        "max_iterations": 60,
        "body_font_step_pt": 0.1,
        "margin_step_mm": 0.5
      }
    },
    "long-doc": {
      "overflow_solver": {
        "enabled": false
      }
    },
    "long-doc-en": {
      "overflow_solver": {
        "enabled": false
      }
    },
    "portfolio": {
      "overflow_solver": {
        "enabled": false
      }
    },
    "portfolio-en": {
      "overflow_solver": {
        "enabled": false
      }
    }
  }
}

=== FILE: .claude/skills/kami/references/tokens.json ===
{
  "--parchment":  "#f5f4ed",
  "--ivory":      "#faf9f5",
  "--brand":      "#1B365D",
  "--near-black": "#141413",
  "--dark-warm":  "#3d3d3a",
  "--charcoal":   "#4d4c48",
  "--olive":      "#504e49",
  "--stone":      "#6b6a64"
}

=== FILE: .claude/skills/kami/references/writing.md ===
# Content Strategy

How to write, not how to lay out. Good typography with bad content is just "polished mediocrity". This document covers the writing principles for both Chinese and English output. Shared rules come first; language-specific details are called out where they matter.

---

## Core principles (all documents)

### 1. Data over adjectives

- Avoid: "Delivered significant business growth"
- Use: write the specific numbers and deltas

Every sentence should survive the follow-up question "how much, specifically?". If you can't answer, don't write it.

### 2. Judgment over execution

Junior writes "what they did". Mid writes "how they did it". **Senior writes "why they made that call, and what they predicted correctly"**.

- Avoid: "Led the platform build-out"
- Use: write what judgment you made and how it was proven right

### 3. Distinctive phrasing over industry clichés

- Avoid: "Embrace the AI era, pioneer digital transformation paradigms"
- Use: say it in your own words, skip the industry vocabulary

**Distinctive phrasing is memorable**. A line you invented beats a line borrowed from an earnings call. It sounds like a person thinking, not a deck regurgitating.

### 4. Honest boundaries

- If you didn't do it, don't claim it
- If you don't know the exact number, don't invent one. Write a vague but honest magnitude
- Attribute collaborators

### 5. Sources before phrasing

For companies, products, people, launch dates, versions, funding, financials, market data, or technical specs, verify the source before writing. Priority: user-provided source material > official pages / docs / press releases > filings / app stores / repo releases > credible media.

- Do not write "latest", "new", version numbers, or market figures before checking them
- If sources conflict, list the conflict and ask the user instead of choosing one
- If only the magnitude is known, write the magnitude instead of false precision

### 6. Materials serve recognition

Branded documents should first make the subject recognizable, then use decoration and atmosphere with restraint.

- Company / product / project docs should confirm logo, product image, UI screenshot, and brand color before layout
- If a key material is missing, mark the gap or ask the user. Do not fill the page with unrelated imagery
- Physical products prefer official product images; digital products prefer real UI screenshots
- If brand color is unknown, keep kami ink-blue rather than inventing a new color

---

## Per-document strategies

### One-Pager

**Single purpose**: the reader grasps the point in 30 seconds.

**Structure**:
1. **Headline** (serif display) + one-line subtitle (sans body)
2. **Metrics** - 3-4 cards, numbers first
3. **Core argument** (1-2 paragraphs)
4. **Key evidence / roadmap** (3-5 short bullets)
5. **Next step / contact** (footer)

**Rules**:
- Length target: English 200-350 words; Chinese 400-600 characters
- All section headlines should work as a standalone outline - reading just the headlines should deliver the gist
- Data must fill 30%+ of the body
- Company / product one-pagers must confirm logo, core screenshot or product image, and source for key metrics
- No opening ceremony ("In recent years, as technology has rapidly evolved...")

### Long Document

**Structure**:
1. **Cover** - big title + subtitle + author + date
2. **Contents** (auto-generated or hand-written TOC)
3. **Executive Summary** (≤ 1 page + 3-5 takeaways)
4. **Body** - chapters that each stand alone as an essay
5. **Appendix / references** (if applicable)

**Rules**:
- Every chapter opens with a "claim paragraph" (2-3 sentences summarizing the argument)
- After long paragraphs (>5 lines), intersperse callouts / quotes / figures to relieve eye fatigue
- Highlight key data / conclusions with `<span class="hl">`
- Chapters with external facts must preserve source cues so readers can distinguish fact, judgment, and inference
- Use "chapter breaks" (blank page + chapter number) between major sections

### Letter

**Structure**:
1. Letterhead (sender info, top right or centered)
2. Date (right-aligned)
3. Recipient salutation (left-aligned)
4. Body (3-5 paragraphs)
5. Sign-off ("Sincerely," / "Best regards,")
6. Signature (serif 500)
7. Enclosures (if any)

**Rules**:
- Minimal - no decorative elements
- Body prefers serif (editorial feel)
- Slightly larger type (11-12pt body) - this will be read, not scanned
- Paragraph spacing ≥ 10pt

**Common use cases**:
- Resignation / notice
- Recommendation letter
- Formal collaboration proposal
- Personal statement

**Language notes**:
- Chinese sign-offs can use "此致 / 敬礼", "顺颂商祺", or a context-appropriate formal closing
- English sign-offs should stay simple: "Best regards," / "Sincerely," / "Warm regards,"

### Portfolio

**Structure**:
1. **Cover** (name + one-line positioning + contact)
2. **About** (half-page introduction)
3. **Per-project 1-2 pages**:
 - Project title + type tag + date range
 - One-line description
 - 2-3 hero images (if applicable)
 - Role + challenge + outcome
4. **Selected works list** (additional projects as a short list)
5. **Contact** (return to contact details)

**Rules**:
- Visuals first, text supports
- Every project's outcome must be quantifiable
- Final product screenshots / real photos > design mockups > code screenshots
- If project images are missing, mark the gap. Do not fill the layout with unrelated imagery
- Don't list every tech stack - a mono tag row is enough

### Resume

The most constrained document type in kami.

**Hard constraints**:
- Strictly 2 A4 pages
- Every project follows three-part: Role / Actions / Impact
- 5 core skills, each with at least one brand-color emphasis
- Team size, tech stack, narrative voice must stay consistent throughout

**Key sections**:
- Header + 4 metric cards
- Summary (~50 English words or ~80 Chinese characters)
- Timeline (3 steps - long-range evolution signal)
- 3-5 core projects
- Public work / impact (optional)
- 5 core skills
- Education

**Metric card selection rule**:
- 1 card on **time** (years, consistency)
- 1 card on **scale** (team, users, projects, or other quantifiable scope)
- 2 cards on **results** (quantifiable external proof)

---

## Quality bars by document type

Structure is necessary but not sufficient. These bars define what separates compelling content from template-filling.

### Resume

**Impact formula**: Action + Scope + Measurable Result + Business Outcome. Every bullet must answer "what did I do, at what scale, with what result, and why did it matter?"

| Avoid | Use |
|---|---|
| "Worked on backend services" | "Redesigned order pipeline serving 2M daily txns, cut p99 latency from 800ms to 120ms, saved $340K/yr in infra costs" |
| "Led a team to deliver features" | "Led 5-engineer squad that shipped real-time collaboration (3-month timeline), adopted by 40% of enterprise accounts within one quarter" |
| "Improved performance" | "Reduced cold-start time 62% across 14 Lambda functions by replacing runtime init with pre-baked layers, cutting median API response from 1.2s to 0.45s" |

**Rules**:
1. Start every bullet with a strong past-tense verb (designed, led, reduced, migrated). Never "Responsible for" or "Helped with"
2. Every bullet needs at least one number. If no hard metric exists, use scope (team size, user count, codebase size)
3. Connect technical work to business outcomes: revenue, cost, reliability, user retention, time-to-market
4. Include before/after pairs when possible: "from X to Y" is more credible than "improved by Z%"
5. Use precise numbers over round ones: "$280K" reads as measured, "$300K" reads as estimated
6. Distinguish ownership: "owned" vs "contributed to" vs "coordinated". Inflating scope is the fastest way to lose credibility in an interview

**Senior vs junior**: junior resumes show execution ("built X"). Senior resumes show judgment ("evaluated 3 approaches, chose Y because of tradeoff Z") and multiplier effect ("mentored 4 engineers, 2 promoted within 12 months")

### Portfolio

**Core rule**: open every case study with the problem and its stakes, not with your role or the project name.

| Avoid | Use |
|---|---|
| "I redesigned the dashboard" | "Enterprise users abandoned the analytics dashboard at 73% rate within the first session. I led the redesign that cut abandonment to 31%." |
| "The client was happy" | "Task completion time dropped from 4.2 min to 1.8 min. NPS increased from 22 to 51 over 3 months." |

**Rules**:
1. Show 2-3 decision points where you chose between alternatives. Explain the tradeoff, not just the winner
2. Three-layer outcomes: quantitative metric (conversion rate +80%) + qualitative evidence (user quote) + business context ($1.2M additional annual revenue)
3. State your exact role and scope: "I designed" vs "I led" vs "I contributed to" are very different signals
4. 3-5 deep case studies beats 12 shallow ones. Depth is credibility
5. Always close the loop: every problem introduced must have a measured resolution
6. Prefer final product screenshots over mockups. If product images are missing, mark the gap rather than filling with unrelated imagery

### Slides

**Core rule**: every slide title should be a full declarative sentence (an assertion), not a topic label. The body provides one piece of evidence supporting the assertion.

| Avoid | Use |
|---|---|
| Title: "Q3 Performance" | Title: "Q3 revenue grew 23% because enterprise deals closed 2x faster" |
| 7 bullet fragments per slide | One chart proving the assertion |
| "Key Takeaways" slide with 8 points | One clear ask or recommendation |

**Rules**:
1. 20-40 words per slide maximum. If a slide has more than 40 words, split it or convert text to a visual
2. 5 items per list maximum (working memory capacity)
3. Three-act structure: Setup (slides 1-4, establish stakes) -> Evidence (slides 5-12, build the case) -> Resolution (slides 13-16, deliver the payoff)
4. Reading just the slide titles in sequence should tell the full argument
5. Include a "so what" moment every 3-4 slides to re-anchor the audience
6. End with one clear ask, not a bullet list of "key points"

### Equity Report

**Core rule**: lead with the variant perception (what you see that the market doesn't) and tie every thesis driver to a measurable financial impact.

| Avoid | Use |
|---|---|
| "Strong management team" | "Management delivered 23% revenue CAGR over 5 years while keeping debt-to-equity below 0.4" |
| "Massive opportunity" | "We estimate 25% upside to $X based on DCF with 12% WACC and 3% terminal growth" |
| Vague "risks include competition" | "BYD's 35% unit cost advantage in the $20-30K segment threatens 15% of addressable volume by 2027" |

**Rules**:
1. Investment thesis on page 1, above the fold. Rating + price target (if applicable) + 3-5 bullet thesis drivers
2. Every claim backed by a number or a source. No unquantified superlatives
3. At least two valuation methods with sensitivity ranges. Single-method valuation is amateur
4. Catalysts must have dates and expected magnitude: "Robotaxi launch in Dallas, June 2025, adding estimated $X to revenue run-rate by Q4"
5. Competitive positioning with market share numbers, not narrative: "23% share of the $45B market, up from 18% in 2022"
6. Risk factors quantified and connected to the financial model, not generic disclaimers
7. Professional tone: "we estimate" / "our base case" / "we see upside to". Never "this stock will moon" or "buy the dip"
8. Acknowledge counter-arguments before dismissing them. One-sided analysis signals bias, not conviction
9. Separate GAAP from non-GAAP clearly. Flag one-time items (warranty reserves, tax benefits, restructuring charges)

### Long Document

**Core rule**: each chapter's claim paragraph must survive the "so what?" test. If the reader asks "why should I care?", the first paragraph must have the answer.

**Rules**:
1. Evidence density: at least one data point per paragraph. A paragraph with zero numbers is an opinion paragraph and should be rare
2. Callout or figure after every 3-4 paragraphs of dense text. Long unbroken prose causes eye fatigue in print
3. Counter-arguments addressed before they become reader objections. If you can predict the pushback, address it proactively
4. Source cues preserved inline: "(Gartner, 2025)" or "according to the company's 10-K" so readers can distinguish fact from inference
5. Each chapter should stand alone as a mini-essay with its own arc: claim -> evidence -> conclusion

### One-Pager

**Core rule**: the reader grasps the point in 30 seconds. Every element that doesn't serve 30-second comprehension is bloat.

**Rules**:
1. Metrics are the headline, not supporting evidence. If your 4 metric cards don't tell the story, the metrics are wrong
2. The lead paragraph must contain the single sharpest claim, not context-setting
3. Bullet points should be evidence, not restated arguments. Each bullet: fact + number + "so what"
4. Footer is for contact and classification, not for squeezing in one more argument

### Letter

**Core rule**: first paragraph states purpose in one sentence. Last paragraph states the specific ask or next step. Everything in between is evidence.

**Rules**:
1. One point per middle paragraph, each with its own evidence
2. Tone calibration per use case: resignation (grateful + clear), recommendation (specific + enthusiastic), proposal (value-first + concrete), personal statement (authentic + structured)
3. Sign-off matches formality: "Sincerely" for formal, "Best regards" for professional-warm, "Warm regards" for personal
4. Under no circumstances exceed one page. If you need two pages, it's a memo or a proposal, not a letter

### Changelog

**Core rule**: one sentence per change, verb-led, user-facing language. If the user cannot understand the change from the sentence alone, rewrite it.

| Avoid | Use |
|---|---|
| "Refactored internal state management module" | "Fix crash when switching tabs rapidly on iPad" |
| "Updated dependencies" | "Upgrade OpenSSL to 3.2.1 (patches CVE-2026-1234)" |

**Rules**:
1. Breaking changes always first, with migration path ("Replace `config.old` with `config.new`; run `migrate.sh` to convert")
2. 5-8 items per section. If more, this is probably 2 releases
3. Group by user impact (Breaking / Features / Fixes), not by component or file
4. No internal jargon. "Fix memory leak in image decoder" is clear. "Fix retain cycle in UIImageDecoderBridge" is not

---

## Coupling rules (layout × content)

### Emphasis rhythm

Across any document:
- ≤ 2 emphasized items per line
- Emphasis must be a **quantifiable number** or a **distinctive phrase**
- Do not emphasize adjectives

### Number formatting

| Use | Avoid |
|---|---|
| 5,000+ | 5000+ (missing thousands separator) |
| 5,000+ | 5，000+ (full-width comma in a metric) |
| 90% | 90 % (space before percent) |
| ~$10M | $9,876,543 (false precision reads fake) |
| 2026.04 | 2026年4月 / April 2026 (when horizontal space is tight) |
| -> | → |

### Language-specific punctuation

Chinese documents:
- Prefer `「」` for quoted prose, not straight double quotes
- Keep numbers, commas, percent signs, and dates half-width in metric-heavy areas
- Add spaces between Chinese text and Latin product names when it improves readability

English documents:
- Use straight quotes in source text unless the document already has a typographic quote convention
- Prefer compact date forms (`2026.04`) in dense layouts and natural dates (`April 2026`) in prose

### Emphasis is not bold

Use `color: var(--brand)` alone - don't also add `font-weight: bold`. Bold breaks the single-weight design language.

---

## Pre-ship checklist

Run through before every draft:

- [ ] Any jargon like "leverage / unlock / embrace / pioneer"? Cut.
- [ ] Any Chinese filler like "拥抱 / 打造 / 赋能 / 重构"? Rewrite in plain language.
- [ ] Does every paragraph's first sentence stand alone? If not, that paragraph has no claim.
- [ ] Are all numbers verifiable? If asked "where did this come from", can you answer?
- [ ] Are current facts, versions, launch dates, funding, financials, and specs backed by reliable sources?
- [ ] Does every branded document have logo, product image, or UI screenshot coverage? Are missing materials clearly marked?
- [ ] At least one **distinctive phrase** (not industry boilerplate)?
- [ ] Every emphasized (brand-colored) span is either a number or a distinctive phrase? If not, remove the emphasis.
- [ ] Paragraph lengths even? No paragraph over 5 lines?
- [ ] Number format consistent (commas, percent signs, arrows)?
- [ ] Chinese punctuation and Chinese / Latin spacing consistent where applicable?
- [ ] Page count within the document's constraint (resume 2, one-pager 1, letter 1)?

---

## Writing references

- **Paul Graham's essays** - short, direct, judgmental. The gold standard for essayistic writing.
- **Stripe Press books** - print-grade typography paired with deep content. Where to learn the craft of the single sentence.
- **Minto's Pyramid Principle** - conclusion first, evidence below. The shape of every one-pager and exec summary.
- **Ben Horowitz's blog** - how to write technical and business judgment in prose ordinary people can read. The template for long-doc voice.

None are required, but reading any one of them will move the dial on both your writing and your judgment.


## 模板系统（assets/templates/）


=== FILE: .claude/skills/kami/assets/templates/changelog-en.html ===
<!DOCTYPE html>
<!-- ==================================================================
     CHANGELOG · English · parchment design system
     1-2 page A4 release notes / version changelog
     Structure: version header -> Breaking -> Features -> Fixes -> Thanks
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{{PROJECT_NAME}} · {{VERSION}} Release Notes</title>
<meta name="author" content="{{AUTHOR}}">
<meta name="description" content="{{DESCRIPTION}}">
<meta name="keywords" content="{{KEYWORDS}}">
<meta name="generator" content="Kami">
<style>
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 400; font-style: normal; }
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 500; font-style: normal; }

  @page {
    size: A4;
    margin: 20mm 22mm 22mm 22mm;
    background: #f5f4ed;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;

    --serif: Charter, Georgia,
             Palatino, "Times New Roman", serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", "Fira Code",
             Consolas, Monaco, monospace;
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 20mm 22mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10.5pt;
    line-height: 1.55;
  }

  strong { font-weight: 500; }
  .hl { color: var(--brand); font-weight: 500; }

  /* VERSION HEADER */
  .version-header {
    text-align: center;
    margin-bottom: 24pt;
    padding-bottom: 16pt;
    border-bottom: 0.5pt solid var(--border);
  }
  .version-logo {
    font-family: var(--sans);
    font-size: 14pt;
    font-weight: 500;
    color: var(--brand);
    letter-spacing: 2pt;
    text-transform: uppercase;
    margin-bottom: 8pt;
  }
  .version-title {
    font-family: var(--serif);
    font-size: 30pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.15;
    letter-spacing: -0.5pt;
    margin-bottom: 6pt;
  }
  .version-tagline {
    font-size: 12pt;
    color: var(--olive);
    line-height: 1.5;
  }
  .version-date {
    font-size: 10pt;
    color: var(--stone);
    margin-top: 6pt;
    font-variant-numeric: tabular-nums;
  }

  /* SECTIONS */
  h2 {
    font-family: var(--serif);
    font-size: 16pt;
    font-weight: 500;
    color: var(--near-black);
    margin: 20pt 0 8pt 0;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
    break-after: avoid;
  }

  h3 {
    font-size: 13pt;
    font-weight: 500;
    color: var(--dark-warm);
    margin: 14pt 0 4pt 0;
    break-after: avoid;
  }

  p { margin: 0 0 8pt 0; line-height: 1.55; }

  /* CHANGE LIST */
  ol.changes {
    margin: 6pt 0 14pt 0;
    padding-left: 24pt;
    line-height: 1.55;
  }
  ol.changes li {
    margin-bottom: 4pt;
  }
  ol.changes li::marker {
    color: var(--brand);
    font-weight: 500;
  }

  /* TAG */
  .tag {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--brand);
    font-family: var(--sans);
    font-size: 9pt;
    font-weight: 500;
    padding: 1pt 6pt;
    border-radius: 3pt;
    letter-spacing: 0.4pt;
    text-transform: uppercase;
    margin-right: 3pt;
  }
  .tag.breaking {
    background: #f0e0d8;
    color: #8b4513;
  }

  /* CALLOUT */
  .callout {
    background: var(--ivory);
    border-left: 2pt solid var(--brand);
    padding: 8pt 14pt;
    border-radius: 3pt;
    margin: 12pt 0;
    line-height: 1.55;
    break-inside: avoid;
  }

  /* THANKS */
  .thanks {
    margin-top: 16pt;
    padding: 10pt 14pt;
    background: var(--ivory);
    border: 0.5pt solid var(--border);
    border-radius: 4pt;
    font-size: 10pt;
    line-height: 1.55;
    break-inside: avoid;
  }
  .thanks-label {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 4pt;
  }

  /* FOOTER */
  .changelog-footer {
    margin-top: 20pt;
    padding-top: 8pt;
    border-top: 0.3pt dotted var(--border);
    font-size: 9pt;
    color: var(--stone);
    text-align: center;
    line-height: 1.5;
    font-variant-numeric: tabular-nums;
  }
</style>
</head>
<body>

<!-- VERSION HEADER -->
<div class="version-header">
  <div class="version-logo">{{PROJECT_NAME}}</div>
  <div class="version-title">{{VERSION}} {{RELEASE_NAME}}</div>
  <div class="version-tagline">{{One-line release highlight.}}</div>
  <div class="version-date">{{RELEASE_DATE}}</div>
</div>

<!-- CHANGELOG -->
<h2>Changelog</h2>

<h3>Breaking Changes</h3>
<ol class="changes">
  <li><span class="tag breaking">Breaking</span> {{Breaking change description.}}</li>
</ol>

<h3>Features</h3>
<ol class="changes">
  <li>{{New feature 1: one-line description.}}</li>
  <li>{{New feature 2: one-line description.}}</li>
  <li>{{New feature 3: one-line description.}}</li>
</ol>

<h3>Fixes</h3>
<ol class="changes">
  <li>{{Fix 1: one-line description.}}</li>
  <li>{{Fix 2: one-line description.}}</li>
  <li>{{Fix 3: one-line description.}}</li>
</ol>

<!-- THANKS (optional) -->
<div class="thanks">
  <div class="thanks-label">Acknowledgements</div>
  {{Thank contributors, e.g. "Thanks to @user1, @user2 for their contributions."}}
</div>

<!-- FOOTER -->
<div class="changelog-footer">
  {{One-line project description.}}<br>
  {{PROJECT_URL}}
</div>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/changelog.html ===
<!DOCTYPE html>
<!-- ==================================================================
     CHANGELOG TEMPLATE · parchment design system
     1-2 页 A4 版本更新日志 / Release Notes
     结构：版本标题 -> Breaking -> Features -> Fixes -> 致谢
     遵循 tw93/Mole release note 格式
     ================================================================== -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{{项目名}} · {{版本号}} 更新日志</title>
<meta name="author" content="{{作者}}">
<meta name="description" content="{{摘要}}">
<meta name="keywords" content="{{关键词}}">
<meta name="generator" content="Kami">
<style>
  /* Regular weight */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W04.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W04.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  /* Bold weight - W05 for all bold variants */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W05.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W05.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @page {
    size: A4;
    margin: 20mm 22mm 22mm 22mm;
    background: #f5f4ed;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;
    --serif: "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", Georgia, serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 20mm 22mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10.5pt;
    line-height: 1.55;
    letter-spacing: 0.3pt;
  }

  strong { font-weight: 500; }
  .hl { color: var(--brand); font-weight: 500; }

  /* ========== VERSION HEADER ========== */
  .version-header {
    text-align: center;
    margin-bottom: 24pt;
    padding-bottom: 16pt;
    border-bottom: 0.5pt solid var(--border);
  }
  .version-logo {
    font-family: var(--serif);
    font-size: 14pt;
    font-weight: 500;
    color: var(--brand);
    letter-spacing: 1pt;
    margin-bottom: 8pt;
  }
  .version-title {
    font-family: var(--serif);
    font-size: 28pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.2;
    margin-bottom: 6pt;
  }
  .version-tagline {
    font-size: 12pt;
    color: var(--olive);
    line-height: 1.5;
  }
  .version-date {
    font-size: 10pt;
    color: var(--stone);
    margin-top: 6pt;
    font-variant-numeric: tabular-nums;
  }

  /* ========== SECTIONS ========== */
  h2 {
    font-family: var(--serif);
    font-size: 16pt;
    font-weight: 500;
    color: var(--near-black);
    margin: 20pt 0 8pt 0;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
    break-after: avoid;
  }

  h3 {
    font-size: 13pt;
    font-weight: 500;
    color: var(--dark-warm);
    margin: 14pt 0 4pt 0;
    break-after: avoid;
  }

  p { margin: 0 0 8pt 0; line-height: 1.55; }

  /* ========== CHANGE LIST ========== */
  ol.changes {
    margin: 6pt 0 14pt 0;
    padding-left: 24pt;
    line-height: 1.55;
  }
  ol.changes li {
    margin-bottom: 4pt;
  }
  ol.changes li::marker {
    color: var(--brand);
    font-weight: 500;
  }

  /* ========== TAG ========== */
  .tag {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--brand);
    font-size: 9pt;
    font-weight: 500;
    padding: 1pt 6pt;
    border-radius: 3pt;
    margin-right: 3pt;
  }
  .tag.breaking {
    background: #f0e0d8;
    color: #8b4513;
  }

  /* ========== CALLOUT ========== */
  .callout {
    background: var(--ivory);
    border-left: 2pt solid var(--brand);
    padding: 8pt 14pt;
    border-radius: 3pt;
    margin: 12pt 0;
    line-height: 1.55;
    break-inside: avoid;
  }

  /* ========== THANKS ========== */
  .thanks {
    margin-top: 16pt;
    padding: 10pt 14pt;
    background: var(--ivory);
    border: 0.5pt solid var(--border);
    border-radius: 4pt;
    font-size: 10pt;
    line-height: 1.55;
    break-inside: avoid;
  }
  .thanks-label {
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 0.5pt;
    text-transform: uppercase;
    margin-bottom: 4pt;
  }

  /* ========== FOOTER ========== */
  .changelog-footer {
    margin-top: 20pt;
    padding-top: 8pt;
    border-top: 0.3pt dotted var(--border);
    font-size: 9pt;
    color: var(--stone);
    text-align: center;
    line-height: 1.5;
  }
</style>
</head>
<body>

<!-- ========== VERSION HEADER ========== -->
<div class="version-header">
  <div class="version-logo">{{项目名}}</div>
  <div class="version-title">{{版本号}} {{版本名称}}</div>
  <div class="version-tagline">{{一句话版本亮点}}</div>
  <div class="version-date">{{发布日期}}</div>
</div>

<!-- ========== CHANGELOG (英文) ========== -->
<h2>Changelog</h2>

<h3>Breaking Changes</h3>
<ol class="changes">
  <li><span class="tag breaking">Breaking</span> {{破坏性变更描述}}</li>
</ol>

<h3>Features</h3>
<ol class="changes">
  <li>{{新功能 1：一句话描述}}</li>
  <li>{{新功能 2：一句话描述}}</li>
  <li>{{新功能 3：一句话描述}}</li>
</ol>

<h3>Fixes</h3>
<ol class="changes">
  <li>{{修复 1：一句话描述}}</li>
  <li>{{修复 2：一句话描述}}</li>
  <li>{{修复 3：一句话描述}}</li>
</ol>

<!-- ========== 更新日志 (中文) ========== -->
<h2>更新日志</h2>

<h3>破坏性变更</h3>
<ol class="changes">
  <li><span class="tag breaking">Breaking</span> {{同上对应的中文描述}}</li>
</ol>

<h3>新功能</h3>
<ol class="changes">
  <li>{{对应中文描述}}</li>
  <li>{{对应中文描述}}</li>
  <li>{{对应中文描述}}</li>
</ol>

<h3>修复</h3>
<ol class="changes">
  <li>{{对应中文描述}}</li>
  <li>{{对应中文描述}}</li>
  <li>{{对应中文描述}}</li>
</ol>

<!-- ========== THANKS (可选) ========== -->
<div class="thanks">
  <div class="thanks-label">致谢</div>
  {{感谢贡献者，格式如："感谢 @user1、@user2 的贡献。"}}
</div>

<!-- ========== FOOTER ========== -->
<div class="changelog-footer">
  {{项目一句话描述}}<br>
  {{项目 URL}}
</div>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/equity-report-en.html ===
<!DOCTYPE html>
<!-- ==================================================================
     EQUITY REPORT · English · parchment design system
     2-3 page A4 equity research / valuation / investment memo
     Structure: header -> metrics -> charts -> financials -> comps -> risks -> summary
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{{COMPANY_NAME}} · Equity Report</title>
<meta name="author" content="{{AUTHOR}}">
<meta name="description" content="{{DESCRIPTION}}">
<meta name="keywords" content="{{KEYWORDS}}">
<meta name="generator" content="Kami">
<style>
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 400; font-style: normal; }
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 500; font-style: normal; }

  @page {
    size: A4;
    margin: 16mm 18mm 18mm 18mm;
    background: #f5f4ed;

    @bottom-center {
      content: counter(page) "  ·  {{COMPANY_NAME}} Report";
      font-family: Charter, Georgia, Palatino, serif;
      font-size: 9pt;
      color: #6b6a64;
    }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;
    --positive:  #1B365D;
    --negative:  #6b6a64;

    --serif: Charter, Georgia,
             Palatino, "Times New Roman", serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", "Fira Code",
             Consolas, Monaco, monospace;
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 16mm 18mm 18mm 18mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10pt;
    line-height: 1.5;
  }

  strong { font-weight: 500; }
  .hl { color: var(--brand); font-weight: 500; }

  /* HEADER */
  .report-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .ticker-block { flex: 1; }
  .ticker-eyebrow {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1.5pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 4pt;
  }
  .ticker-name {
    font-family: var(--serif);
    font-size: 26pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.12;
    letter-spacing: -0.3pt;
    margin-bottom: 4pt;
  }
  .ticker-sub {
    font-size: 10pt;
    color: var(--olive);
    line-height: 1.4;
  }
  .price-block {
    text-align: right;
    padding-top: 4pt;
  }
  .price-current {
    font-family: var(--serif);
    font-size: 30pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.5pt;
  }
  .price-change {
    font-size: 10pt;
    font-weight: 500;
    margin-top: 2pt;
    font-variant-numeric: tabular-nums;
  }
  .price-change.up { color: var(--positive); }
  .price-change.down { color: var(--negative); }
  .price-date {
    font-size: 9pt;
    color: var(--stone);
    margin-top: 2pt;
    font-variant-numeric: tabular-nums;
  }

  /* METRICS */
  .metrics {
    display: flex;
    gap: 16pt;
    margin-bottom: 16pt;
    padding: 6pt 0;
    border-top: 0.3pt dotted var(--border);
    border-bottom: 0.3pt dotted var(--border);
  }
  .metric {
    flex: 1;
    display: flex;
    align-items: baseline;
    gap: 5pt;
  }
  .metric-value {
    font-family: var(--serif);
    font-size: 18pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.3pt;
  }
  .metric-label {
    font-size: 9pt;
    color: var(--olive);
    line-height: 1.3;
  }

  /* SECTIONS */
  h2 {
    font-family: var(--serif);
    font-size: 16pt;
    font-weight: 500;
    color: var(--near-black);
    margin: 18pt 0 6pt 0;
    break-after: avoid;
  }

  h3 {
    font-size: 13pt;
    font-weight: 500;
    color: var(--dark-warm);
    margin: 12pt 0 4pt 0;
    break-after: avoid;
  }

  p { margin: 0 0 8pt 0; line-height: 1.5; }

  ul, ol {
    margin: 4pt 0 8pt 0;
    padding-left: 18pt;
    line-height: 1.5;
  }
  ul li::marker { color: var(--brand); }
  ol li::marker { color: var(--brand); font-weight: 500; }

  /* TAG */
  .tag {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--brand);
    font-family: var(--sans);
    font-size: 9pt;
    font-weight: 500;
    padding: 1pt 6pt;
    border-radius: 3pt;
    letter-spacing: 0.4pt;
    text-transform: uppercase;
    margin-right: 3pt;
  }

  /* TABLE (kami-table) */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    margin: 8pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-family: var(--sans);
    font-weight: 500;
    color: var(--dark-warm);
    padding: 5pt 8pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 4pt 8pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 3pt 6pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 2pt 6pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }

  /* CALLOUT */
  .callout {
    background: var(--ivory);
    border-left: 2pt solid var(--brand);
    padding: 8pt 12pt;
    border-radius: 3pt;
    margin: 10pt 0;
    line-height: 1.5;
    break-inside: avoid;
  }

  /* FIGURE */
  figure { margin: 12pt 0; break-inside: avoid; }
  figcaption {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--stone);
    margin-top: 4pt;
    text-align: center;
  }

  /* RISK MATRIX */
  .risk-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10pt;
    margin: 8pt 0;
  }
  .risk-item {
    padding: 6pt 10pt;
    background: var(--ivory);
    border-radius: 3pt;
    break-inside: avoid;
  }
  .risk-label {
    font-family: var(--sans);
    font-size: 9pt;
    font-weight: 500;
    color: var(--brand);
    letter-spacing: 0.3pt;
    text-transform: uppercase;
    margin-bottom: 2pt;
  }
  .risk-desc {
    font-size: 9pt;
    color: var(--olive);
    line-height: 1.45;
  }

  /* TWO-COLUMN */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16pt;
  }

  /* ANALYST SUMMARY */
  .analyst-box {
    background: var(--ivory);
    border: 0.5pt solid var(--border);
    border-radius: 4pt;
    padding: 10pt 14pt;
    margin: 12pt 0;
    break-inside: avoid;
  }
  .analyst-label {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 4pt;
  }

  /* FOOTER */
  .report-footer {
    margin-top: 16pt;
    padding-top: 6pt;
    border-top: 0.3pt dotted var(--border);
    font-size: 9pt;
    color: var(--stone);
    display: flex;
    justify-content: space-between;
    font-variant-numeric: tabular-nums;
  }

  .page-break { break-before: page; }
</style>
</head>
<body>

<!-- HEADER -->
<div class="report-header">
  <div class="ticker-block">
    <div class="ticker-eyebrow">{{EYEBROW - e.g. Equity Research / Valuation / Investment Memo}}</div>
    <div class="ticker-name">{{COMPANY_NAME}} <span style="font-size: 14pt; color: var(--stone);">{{TICKER}}</span></div>
    <div class="ticker-sub">{{SECTOR}} · {{EXCHANGE}} · {{One-line thesis.}}</div>
  </div>
  <div class="price-block">
    <div class="price-current">{{CURRENT_PRICE}}</div>
    <div class="price-change up">{{CHANGE - e.g. "+12.3%"}}</div>
    <div class="price-date">{{DATE}}</div>
  </div>
</div>

<!-- METRICS -->
<div class="metrics">
  <div class="metric">
    <div class="metric-value">{{NUMBER}}</div>
    <div class="metric-label">Market Cap</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{NUMBER}}</div>
    <div class="metric-label">P/E Ratio</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{NUMBER}}</div>
    <div class="metric-label">Revenue</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{NUMBER}}</div>
    <div class="metric-label">Margin</div>
  </div>
</div>

<!-- INVESTMENT THESIS -->
<h2>Investment Thesis</h2>
<p>{{Two or three sentences laying out the core thesis. Use <span class="hl">key figures</span> to support the argument. This paragraph is the soul of the report.}}</p>

<div class="callout">
  {{One-line verdict: buy / hold / watch, and the single strongest reason.}}
</div>

<!-- CHART -->
<h2>Price Action</h2>
<figure>
  <div style="height: 60mm; background: var(--ivory); border: 0.5pt solid var(--border-soft); border-radius: 4pt; display: flex; align-items: center; justify-content: center; color: var(--stone); font-size: 9pt;">
    [Candlestick / price chart placeholder - extract SVG from diagrams/]
  </div>
  <figcaption>{{Chart title, e.g. "20-day price action showing accumulation phase."}}</figcaption>
</figure>

<!-- FINANCIALS -->
<h2>Financial Overview</h2>
<table class="financial striped">
  <thead>
    <tr>
      <th>Metric</th>
      <th>FY2023</th>
      <th>FY2024</th>
      <th>FY2025E</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Revenue</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
    <tr><td>Net Income</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
    <tr><td>EPS</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
    <tr><td>Gross Margin</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
    <tr><td>ROE</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
  </tbody>
</table>

<!-- REVENUE BREAKDOWN -->
<h2>Revenue Breakdown</h2>
<figure>
  <div style="height: 50mm; background: var(--ivory); border: 0.5pt solid var(--border-soft); border-radius: 4pt; display: flex; align-items: center; justify-content: center; color: var(--stone); font-size: 9pt;">
    [Revenue breakdown chart placeholder - donut or waterfall]
  </div>
  <figcaption>{{Chart title.}}</figcaption>
</figure>

<!-- COMPETITIVE POSITIONING -->
<div class="page-break"></div>
<h2>Competitive Landscape</h2>
<p>{{Industry landscape overview, one or two paragraphs.}}</p>

<table class="financial compact striped">
  <thead>
    <tr>
      <th>Company</th>
      <th>Mkt Cap</th>
      <th>P/E</th>
      <th>Rev Growth</th>
      <th>Margin</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><strong>{{TARGET}}</strong></td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
    <tr><td>{{COMP_A}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
    <tr><td>{{COMP_B}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
    <tr><td>{{COMP_C}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{VAL}}</td></tr>
  </tbody>
</table>

<!-- RISKS -->
<h2>Risk Factors</h2>
<div class="risk-grid">
  <div class="risk-item">
    <div class="risk-label">{{Risk Type 1}}</div>
    <div class="risk-desc">{{Risk description.}}</div>
  </div>
  <div class="risk-item">
    <div class="risk-label">{{Risk Type 2}}</div>
    <div class="risk-desc">{{Risk description.}}</div>
  </div>
  <div class="risk-item">
    <div class="risk-label">{{Risk Type 3}}</div>
    <div class="risk-desc">{{Risk description.}}</div>
  </div>
  <div class="risk-item">
    <div class="risk-label">{{Risk Type 4}}</div>
    <div class="risk-desc">{{Risk description.}}</div>
  </div>
</div>

<!-- ANALYST SUMMARY -->
<div class="analyst-box">
  <div class="analyst-label">Analyst Summary</div>
  {{Three to five sentences summarizing the position. Include target price (if applicable), rating, key catalysts, and core assumptions.}}
</div>

<!-- FOOTER -->
<div class="report-footer">
  <span>{{FIRM / DISCLAIMER}}</span>
  <span>{{AUTHOR}} · {{DATE}}</span>
</div>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/equity-report.html ===
<!DOCTYPE html>
<!-- ==================================================================
     EQUITY REPORT TEMPLATE · parchment design system
     2-3 页 A4 个股研报 / 估值分析 / 投资备忘
     结构：标题区 -> 核心指标 -> 图表分析 -> 竞争格局 -> 风险 -> 总结
     ================================================================== -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{{股票名称}} · 个股研报</title>
<meta name="author" content="{{作者}}">
<meta name="description" content="{{摘要}}">
<meta name="keywords" content="{{关键词}}">
<meta name="generator" content="Kami">
<style>
  /* Regular weight */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W04.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W04.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  /* Bold weight - W05 for all bold variants */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W05.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W05.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @page {
    size: A4;
    margin: 16mm 18mm 18mm 18mm;
    background: #f5f4ed;

    @bottom-center {
      content: counter(page) "  ·  {{股票名称}} 研报";
      font-family: "TsangerJinKai02", "Source Han Serif SC",
                   "Noto Serif CJK SC", "Songti SC", Georgia, serif;
      font-size: 9pt;
      color: #6b6a64;
    }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;
    --positive:  #1B365D;
    --negative:  #6b6a64;
    --serif: "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", Georgia, serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 16mm 18mm 18mm 18mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10pt;
    line-height: 1.5;
    letter-spacing: 0.3pt;
  }

  strong { font-weight: 500; }
  .hl { color: var(--brand); font-weight: 500; }

  /* ========== HEADER ========== */
  .report-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .ticker-block { flex: 1; }
  .ticker-eyebrow {
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 4pt;
  }
  .ticker-name {
    font-family: var(--serif);
    font-size: 24pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.15;
    margin-bottom: 4pt;
  }
  .ticker-sub {
    font-size: 10pt;
    color: var(--olive);
    line-height: 1.4;
  }
  .price-block {
    text-align: right;
    padding-top: 4pt;
  }
  .price-current {
    font-family: var(--serif);
    font-size: 28pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .price-change {
    font-size: 10pt;
    font-weight: 500;
    margin-top: 2pt;
    font-variant-numeric: tabular-nums;
  }
  .price-change.up { color: var(--positive); }
  .price-change.down { color: var(--negative); }
  .price-date {
    font-size: 9pt;
    color: var(--stone);
    margin-top: 2pt;
  }

  /* ========== METRICS ========== */
  .metrics {
    display: flex;
    gap: 14pt;
    margin-bottom: 16pt;
    padding: 6pt 0;
    border-top: 0.3pt dotted var(--border);
    border-bottom: 0.3pt dotted var(--border);
  }
  .metric {
    flex: 1;
    display: flex;
    align-items: baseline;
    gap: 4pt;
  }
  .metric-value {
    font-family: var(--serif);
    font-size: 16pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .metric-label {
    font-size: 9pt;
    color: var(--olive);
    line-height: 1.3;
  }

  /* ========== SECTIONS ========== */
  h2 {
    font-family: var(--serif);
    font-size: 16pt;
    font-weight: 500;
    color: var(--near-black);
    margin: 18pt 0 6pt 0;
    break-after: avoid;
  }

  h3 {
    font-size: 13pt;
    font-weight: 500;
    color: var(--dark-warm);
    margin: 12pt 0 4pt 0;
    break-after: avoid;
  }

  p { margin: 0 0 8pt 0; line-height: 1.5; }

  ul, ol {
    margin: 4pt 0 8pt 0;
    padding-left: 18pt;
    line-height: 1.5;
  }
  ul li::marker { color: var(--brand); }
  ol li::marker { color: var(--brand); font-weight: 500; }

  /* ========== TAG ========== */
  .tag {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--brand);
    font-size: 9pt;
    font-weight: 500;
    padding: 1pt 6pt;
    border-radius: 3pt;
    margin-right: 3pt;
  }

  /* ========== TABLE (kami-table) ========== */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    margin: 8pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 5pt 8pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 4pt 8pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 3pt 6pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 2pt 6pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }

  /* ========== CALLOUT ========== */
  .callout {
    background: var(--ivory);
    border-left: 2pt solid var(--brand);
    padding: 8pt 12pt;
    border-radius: 3pt;
    margin: 10pt 0;
    line-height: 1.5;
    break-inside: avoid;
  }

  /* ========== FIGURE ========== */
  figure {
    margin: 12pt 0;
    break-inside: avoid;
  }
  figcaption {
    font-size: 9pt;
    color: var(--stone);
    margin-top: 4pt;
    text-align: center;
  }

  /* ========== RISK MATRIX ========== */
  .risk-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10pt;
    margin: 8pt 0;
  }
  .risk-item {
    padding: 6pt 10pt;
    background: var(--ivory);
    border-radius: 3pt;
    break-inside: avoid;
  }
  .risk-label {
    font-size: 9pt;
    font-weight: 500;
    color: var(--brand);
    margin-bottom: 2pt;
  }
  .risk-desc {
    font-size: 9pt;
    color: var(--olive);
    line-height: 1.4;
  }

  /* ========== TWO-COLUMN ========== */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16pt;
  }

  /* ========== ANALYST SUMMARY ========== */
  .analyst-box {
    background: var(--ivory);
    border: 0.5pt solid var(--border);
    border-radius: 4pt;
    padding: 10pt 14pt;
    margin: 12pt 0;
    break-inside: avoid;
  }
  .analyst-label {
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 0.5pt;
    text-transform: uppercase;
    margin-bottom: 4pt;
  }

  /* ========== FOOTER ========== */
  .report-footer {
    margin-top: 16pt;
    padding-top: 6pt;
    border-top: 0.3pt dotted var(--border);
    font-size: 9pt;
    color: var(--stone);
    display: flex;
    justify-content: space-between;
  }

  .page-break { break-before: page; }
</style>
</head>
<body>

<!-- ========== HEADER ========== -->
<div class="report-header">
  <div class="ticker-block">
    <div class="ticker-eyebrow">{{EYEBROW · 如 "个股研报" / "估值分析" / "投资备忘"}}</div>
    <div class="ticker-name">{{公司名称}} <span style="font-size: 14pt; color: var(--stone);">{{股票代码}}</span></div>
    <div class="ticker-sub">{{行业}} · {{交易所}} · {{一句核心判断}}</div>
  </div>
  <div class="price-block">
    <div class="price-current">{{当前价格}}</div>
    <div class="price-change up">{{涨跌幅 如 "+12.3%"}}</div>
    <div class="price-date">{{日期}}</div>
  </div>
</div>

<!-- ========== METRICS ========== -->
<div class="metrics">
  <div class="metric">
    <div class="metric-value">{{数字}}</div>
    <div class="metric-label">市值</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{数字}}</div>
    <div class="metric-label">P/E</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{数字}}</div>
    <div class="metric-label">营收</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{数字}}</div>
    <div class="metric-label">利润率</div>
  </div>
</div>

<!-- ========== INVESTMENT THESIS ========== -->
<h2>投资逻辑</h2>
<p>{{2-3 句核心投资论点。用 <span class="hl">关键数据</span> 支撑判断。这段是整份研报的灵魂。}}</p>

<div class="callout">
  {{一句话总结：买入/持有/观望的核心理由。}}
</div>

<!-- ========== CHART (嵌入 SVG 图表) ========== -->
<h2>价格走势</h2>
<figure>
  <!-- 从 candlestick.html 或 line-chart.html 提取 <svg> 嵌入此处 -->
  <div style="height: 60mm; background: var(--ivory); border: 0.5pt solid var(--border-soft); border-radius: 4pt; display: flex; align-items: center; justify-content: center; color: var(--stone); font-size: 9pt;">
    [K 线图 / 价格走势图占位 · 从 diagrams/ 提取 SVG 嵌入]
  </div>
  <figcaption>{{图表标题，如 "近 20 个交易日价格走势"}}</figcaption>
</figure>

<!-- ========== FINANCIALS ========== -->
<h2>财务概览</h2>
<table class="financial striped">
  <thead>
    <tr>
      <th>指标</th>
      <th>FY2023</th>
      <th>FY2024</th>
      <th>FY2025E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>营收</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
    <tr>
      <td>净利润</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
    <tr>
      <td>EPS</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
    <tr>
      <td>毛利率</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
    <tr>
      <td>ROE</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
  </tbody>
</table>

<!-- ========== REVENUE BREAKDOWN (可选图表) ========== -->
<h2>收入结构</h2>
<figure>
  <div style="height: 50mm; background: var(--ivory); border: 0.5pt solid var(--border-soft); border-radius: 4pt; display: flex; align-items: center; justify-content: center; color: var(--stone); font-size: 9pt;">
    [营收分解图占位 · 环形图或瀑布图]
  </div>
  <figcaption>{{图表标题}}</figcaption>
</figure>

<!-- ========== COMPETITIVE POSITIONING ========== -->
<div class="page-break"></div>
<h2>竞争格局</h2>
<p>{{行业格局概述，1-2 段。}}</p>

<table class="financial compact striped">
  <thead>
    <tr>
      <th>公司</th>
      <th>市值</th>
      <th>P/E</th>
      <th>营收增速</th>
      <th>利润率</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>{{目标公司}}</strong></td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
    <tr>
      <td>{{竞品 A}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
    <tr>
      <td>{{竞品 B}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
    <tr>
      <td>{{竞品 C}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
      <td>{{数据}}</td>
    </tr>
  </tbody>
</table>

<!-- ========== RISKS ========== -->
<h2>风险提示</h2>
<div class="risk-grid">
  <div class="risk-item">
    <div class="risk-label">{{风险类型 1}}</div>
    <div class="risk-desc">{{风险描述}}</div>
  </div>
  <div class="risk-item">
    <div class="risk-label">{{风险类型 2}}</div>
    <div class="risk-desc">{{风险描述}}</div>
  </div>
  <div class="risk-item">
    <div class="risk-label">{{风险类型 3}}</div>
    <div class="risk-desc">{{风险描述}}</div>
  </div>
  <div class="risk-item">
    <div class="risk-label">{{风险类型 4}}</div>
    <div class="risk-desc">{{风险描述}}</div>
  </div>
</div>

<!-- ========== ANALYST SUMMARY ========== -->
<div class="analyst-box">
  <div class="analyst-label">分析师总结</div>
  {{3-5 句总结。包含目标价（如有）、评级建议、核心催化剂、关键假设。}}
</div>

<!-- ========== FOOTER ========== -->
<div class="report-footer">
  <span>{{机构名 / 免责声明}}</span>
  <span>{{作者}} · {{日期}}</span>
</div>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/letter-en.html ===
<!DOCTYPE html>
<!-- ==================================================================
     LETTER · English · parchment design system
     A4 formal letter / memo / recommendation / resignation / statement
     Characteristics: minimal, serif-led, slightly larger body type
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{{LETTER_SUBJECT}}</title>
<meta name="author" content="{{AUTHOR}}">
<meta name="description" content="{{DESCRIPTION}}">
<meta name="keywords" content="{{KEYWORDS}}">
<meta name="generator" content="Kami">
<style>
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 400; font-style: normal; }
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 500; font-style: normal; }

  @page {
    size: A4;
    margin: 25mm 25mm 25mm 25mm;
    background: #f5f4ed;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --ivory:     #faf9f5;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;

    --serif: Charter, Georgia,
             Palatino, "Times New Roman", serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 25mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 11.5pt;
    line-height: 1.55;
  }

  .letterhead {
    text-align: right;
    margin-bottom: 30pt;
    font-size: 10pt;
    line-height: 1.55;
    color: var(--olive);
  }
  .letterhead .sender-name {
    font-size: 13pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 4pt;
  }
  .letterhead a { color: var(--dark-warm); text-decoration: none; }

  .date {
    text-align: right;
    font-size: 10.5pt;
    color: var(--olive);
    margin-bottom: 24pt;
    font-variant-numeric: tabular-nums;
  }

  .recipient {
    margin-bottom: 24pt;
    line-height: 1.5;
  }
  .recipient .to {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--stone);
    letter-spacing: 0.5pt;
    text-transform: uppercase;
    margin-bottom: 3pt;
    font-weight: 500;
  }
  .recipient .name {
    font-size: 12pt;
    font-weight: 500;
    color: var(--near-black);
  }
  .recipient .org {
    font-size: 10.5pt;
    color: var(--olive);
  }

  .subject {
    margin-bottom: 24pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .subject .label {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 3pt;
    font-weight: 500;
  }
  .subject .title {
    font-size: 16pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.25;
    letter-spacing: -0.2pt;
  }

  .salutation {
    margin-bottom: 18pt;
    font-size: 12pt;
    color: var(--near-black);
  }

  .body-content p {
    margin-bottom: 12pt;
    text-align: left;
    line-height: 1.55;
  }
  .body-content p:first-child { text-indent: 0; }
  .body-content p.indent { text-indent: 1.5em; }

  .body-content .hl {
    color: var(--brand);
    font-weight: 500;
  }

  .closing {
    margin-top: 28pt;
    line-height: 1.55;
  }
  .closing .regards {
    margin-bottom: 30pt;
    color: var(--near-black);
  }
  .closing .signature {
    font-size: 14pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 3pt;
  }
  .closing .signoff-meta {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--olive);
    line-height: 1.5;
  }

  .attachments {
    margin-top: 36pt;
    padding-top: 10pt;
    border-top: 0.5pt dotted var(--border);
    font-family: var(--sans);
    font-size: 9.5pt;
    color: var(--stone);
    line-height: 1.55;
  }
  .attachments .label {
    color: var(--brand);
    margin-right: 6pt;
    font-weight: 500;
    letter-spacing: 0.5pt;
    text-transform: uppercase;
  }

  /* Memo variant: sans-led, no indent */
  body.memo {
    font-family: var(--sans);
    font-size: 10.5pt;
    line-height: 1.55;
  }
  body.memo .body-content p { text-indent: 0; margin-bottom: 10pt; }

  /* TABLE (kami-table) */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10pt;
    margin: 10pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 5pt 8pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 4pt 8pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 3pt 6pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 2pt 6pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }
</style>
</head>
<body>

<div class="letterhead">
  <div class="sender-name">{{SENDER_NAME}}</div>
  <div>{{SENDER_ADDRESS / DEPARTMENT / ORGANIZATION}}</div>
  <div>{{PHONE}} · <a href="mailto:{{EMAIL}}">{{EMAIL}}</a></div>
</div>

<div class="date">{{DATE, e.g. April 18, 2026}}</div>

<div class="recipient">
  <div class="to">To</div>
  <div class="name">{{RECIPIENT_NAME_OR_TITLE}}</div>
  <div class="org">{{RECIPIENT_ORG / DEPARTMENT}}</div>
</div>

<div class="subject">
  <div class="label">Re</div>
  <div class="title">{{One-sentence subject line: what this letter is about.}}</div>
</div>

<div class="salutation">{{Dear {{NAME}},}}</div>

<div class="body-content">

<p>
{{Paragraph 1: state the purpose. Why you are writing and the core intent.
No preamble. Two sentences at most so the reader knows what you want from this letter.}}
</p>

<p>
{{Paragraph 2: elaborate. Background, reasoning, evidence. Use
<span class="hl">brand-color emphasis</span> on the single most important point.}}
</p>

<p>
{{Paragraph 3: be specific. What you want the reader to do, by when,
and how to reach you. Give the action a clear exit.}}
</p>

<p>
{{Paragraph 4 (optional): close. Express anticipation, gratitude, or a courteous sign-off line.}}
</p>

</div>

<div class="closing">
  <div class="regards">
    {{Closing - "Best regards," / "Sincerely," / "Warm regards,"}}
  </div>

  <div class="signature">{{HANDWRITTEN_NAME_OR_SIGNATURE}}</div>
  <div class="signoff-meta">
    {{TITLE · DEPARTMENT}}<br>
    {{DATE (optional restatement)}}
  </div>
</div>

<div class="attachments">
  <span class="label">Enclosures</span>
  {{List - ① Attachment 1 · ② Attachment 2}}
</div>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/letter.html ===
<!DOCTYPE html>
<!-- ==================================================================
     LETTER TEMPLATE · parchment design system
     A4 正式信件 / 备忘录 / 推荐信 / 辞职信 / 个人声明
     特点：极简，serif 主导，字号稍大，段距宽松
     ================================================================== -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{{信件主题}}</title>
<meta name="author" content="{{作者}}">
<meta name="description" content="{{摘要}}">
<meta name="keywords" content="{{关键词}}">
<meta name="generator" content="Kami">
<style>
  /* Regular weight */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W04.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W04.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  /* Bold weight - W05 for all bold variants */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W05.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W05.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @page {
    size: A4;
    margin: 25mm 25mm 25mm 25mm;
    background: #f5f4ed;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --ivory:     #faf9f5;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --serif: "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", Georgia, serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 25mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 11.5pt;
    line-height: 1.55;
    letter-spacing: 0.3pt;
  }

  /* ========== LETTERHEAD 信头 ========== */
  .letterhead {
    text-align: right;
    margin-bottom: 30pt;
    font-size: 10pt;
    line-height: 1.55;
    color: var(--olive);
  }
  .letterhead .sender-name {
    font-size: 13pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 4pt;
  }
  .letterhead a {
    color: var(--dark-warm);
    text-decoration: none;
  }

  /* ========== META ========== */
  .date {
    text-align: right;
    font-size: 10.5pt;
    color: var(--olive);
    margin-bottom: 20pt;
    font-variant-numeric: tabular-nums;
  }

  .recipient {
    margin-bottom: 24pt;
    line-height: 1.5;
  }
  .recipient .to {
    font-size: 10pt;
    color: var(--stone);
    letter-spacing: 0.5pt;
    text-transform: uppercase;
    margin-bottom: 3pt;
  }
  .recipient .name {
    font-size: 12pt;
    font-weight: 500;
    color: var(--near-black);
  }
  .recipient .org {
    font-size: 10.5pt;
    color: var(--olive);
  }

  /* ========== SUBJECT ========== */
  .subject {
    margin-bottom: 24pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .subject .label {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 3pt;
  }
  .subject .title {
    font-size: 15pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.3;
  }

  /* ========== SALUTATION ========== */
  .salutation {
    margin-bottom: 18pt;
    font-size: 12pt;
    color: var(--near-black);
  }

  /* ========== BODY ========== */
  .body-content p {
    margin-bottom: 14pt;
    text-align: justify;
    text-justify: inter-ideograph;
    line-height: 1.55;
    text-indent: 2em;    /* 中文段落首行缩进 */
  }
  .body-content p:first-child { text-indent: 2em; }
  .body-content p.no-indent { text-indent: 0; }

  .body-content .hl {
    color: var(--brand);
    font-weight: 500;
  }

  /* ========== CLOSING ========== */
  .closing {
    margin-top: 30pt;
    line-height: 1.55;
  }
  .closing .regards {
    margin-bottom: 30pt;
    color: var(--near-black);
  }
  .closing .signature {
    font-size: 14pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 3pt;
  }
  .closing .signoff-meta {
    font-size: 10pt;
    color: var(--olive);
  }

  /* ========== ATTACHMENT ========== */
  .attachments {
    margin-top: 36pt;
    padding-top: 10pt;
    border-top: 0.5pt dotted var(--border);
    font-size: 9.5pt;
    color: var(--stone);
    font-family: var(--sans);
    line-height: 1.55;
  }
  .attachments .label {
    color: var(--brand);
    margin-right: 6pt;
    font-weight: 500;
  }

  /* ========== 一些特殊变体 ========== */
  /* 如果是 memo（备忘录），用 sans 字体，去掉首行缩进 */
  body.memo {
    font-family: var(--sans);
    line-height: 1.55;
  }
  body.memo .body-content p { text-indent: 0; margin-bottom: 10pt; }

  /* ========== TABLE (kami-table) ========== */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 10pt;
    margin: 10pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 5pt 8pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 4pt 8pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 3pt 6pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 2pt 6pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }
</style>
</head>
<body>

<!-- ========== LETTERHEAD（寄件人） ========== -->
<div class="letterhead">
  <div class="sender-name">{{寄件人姓名}}</div>
  <div>{{寄件人地址 / 部门 / 机构}}</div>
  <div>{{电话}}　·　<a href="mailto:{{EMAIL}}">{{EMAIL}}</a></div>
</div>

<!-- ========== 日期 ========== -->
<div class="date">{{日期 如 2026 年 4 月 18 日}}</div>

<!-- ========== 收件人 ========== -->
<div class="recipient">
  <div class="to">致</div>
  <div class="name">{{收件人姓名 / 称谓}}</div>
  <div class="org">{{收件人机构 / 部门}}</div>
</div>

<!-- ========== 主题 ========== -->
<div class="subject">
  <div class="label">关于</div>
  <div class="title">{{信件主题，一句话说清}}</div>
</div>

<!-- ========== 称呼 ========== -->
<div class="salutation">{{称呼 如 "尊敬的 XX 先生：" / "Dear XX,"}}</div>

<!-- ========== 正文 ========== -->
<div class="body-content">

<p>
{{第一段：破题。说明写这封信的缘由和核心意图。
不要绕弯，1-2 句话让读者知道你要说什么。}}
</p>

<p>
{{第二段：展开。给出背景、理由、论据。
如有 <span class="hl">关键信息</span> 可用高亮突出。}}
</p>

<p>
{{第三段：具体。说清楚你希望对方做什么、
何时做、怎么联系。让行动有明确出口。}}
</p>

<p>
{{第四段（可选）：收尾。表达期待、致谢或礼貌性结束语。}}
</p>

</div>

<!-- ========== 敬语 ========== -->
<div class="closing">
  <div class="regards">
    {{敬语。中文常用 "此致 / 敬礼！"、"顺颂商祺"。英文 "Best regards," / "Sincerely,"}}
  </div>

  <div class="signature">{{签名 / 亲笔姓名}}</div>
  <div class="signoff-meta">
    {{职位 · 部门}}<br>
    {{日期复写 · 可选}}
  </div>
</div>

<!-- ========== 附件（可选） ========== -->
<div class="attachments">
  <span class="label">附件</span>
  {{附件清单：① 附件名 1 · ② 附件名 2}}
</div>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/long-doc-en.html ===
<!DOCTYPE html>
<!-- ==================================================================
     LONG DOCUMENT · English · parchment design system
     Multi-page A4 white paper / tech report / annual review
     Flow: cover -> toc -> exec summary -> chapters -> appendix
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{{DOC_TITLE}}</title>
<meta name="author" content="{{AUTHOR}}">
<meta name="description" content="{{DESCRIPTION}}">
<meta name="keywords" content="{{KEYWORDS}}">
<meta name="generator" content="Kami">
<style>
  /* Palatino is a system font, no @font-face needed */
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 400; font-style: normal; }
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 500; font-style: normal; }

  @page {
    size: A4;
    margin: 20mm 22mm 22mm 22mm;
    background: #f5f4ed;

    @top-right {
      content: string(section-title);
      font-family: Charter, Georgia, Palatino, serif;
      font-size: 8pt;
      color: #6b6a64;
    }

    @bottom-center {
      content: counter(page) "  ·  {{DOC_TITLE}}";
      font-family: Charter, Georgia, Palatino, serif;
      font-size: 9pt;
      color: #6b6a64;
    }
  }
  @page:first {
    @top-right { content: ""; }
    @bottom-center { content: ""; }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;

    --serif: Charter, Georgia,
             Palatino, "Times New Roman", serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", "Fira Code",
             Consolas, Monaco, monospace;
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 20mm 22mm 22mm 22mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10.5pt;
    line-height: 1.55;
  }

  .sans { font-family: var(--sans); }

  /* COVER */
  .cover {
    min-height: 240mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40mm 0 0 0;
    break-after: page;
  }
  .cover-eyebrow {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--brand);
    letter-spacing: 2pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 18pt;
  }
  .cover-title {
    font-size: 40pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.12;
    letter-spacing: -0.5pt;
    margin-bottom: 16pt;
  }
  .cover-sub {
    font-family: var(--sans);
    font-size: 14pt;
    color: var(--olive);
    line-height: 1.45;
    max-width: 85%;
    margin-bottom: 30pt;
  }
  .cover-meta {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--stone);
    line-height: 1.55;
    font-variant-numeric: tabular-nums;
  }
  .cover-meta strong { color: var(--dark-warm); font-weight: 500; }

  /* TOC */
  .toc { break-after: page; }
  .toc h2 {
    font-size: 22pt;
    font-weight: 500;
    margin-bottom: 14pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .toc-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 6pt 0;
    border-bottom: 0.3pt dotted var(--border);
    font-size: 11pt;
  }
  .toc-num {
    color: var(--brand);
    font-weight: 500;
    min-width: 30pt;
    font-variant-numeric: tabular-nums;
  }
  .toc-title {
    flex: 1;
    color: var(--near-black);
    padding-left: 6pt;
  }
  .toc-page {
    color: var(--stone);
    font-variant-numeric: tabular-nums;
  }

  /* HEADINGS */
  h1 {
    font-size: 24pt;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.3pt;
    margin: 0 0 10pt 0;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
    color: var(--near-black);
    break-after: avoid;
  }
  h2 {
    font-size: 16pt;
    font-weight: 500;
    line-height: 1.25;
    margin: 24pt 0 6pt 0;
    color: var(--near-black);
    break-after: avoid;
    string-set: section-title content();
  }
  h3 {
    font-size: 13pt;
    font-weight: 500;
    line-height: 1.3;
    margin: 18pt 0 4pt 0;
    color: var(--dark-warm);
    break-after: avoid;
  }

  .chapter-num {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 6pt;
  }

  /* PARAGRAPHS */
  p { margin: 0 0 10pt 0; line-height: 1.55; color: var(--near-black); }

  .lead {
    font-size: 12pt;
    line-height: 1.55;
    color: var(--dark-warm);
    margin-bottom: 14pt;
  }

  .hl { color: var(--brand); font-weight: 500; }
  strong { font-weight: 500; }

  /* LISTS */
  ul, ol {
    margin: 6pt 0 10pt 0;
    padding-left: 20pt;
    line-height: 1.55;
  }
  ul li::marker { color: var(--brand); }
  ol li::marker { color: var(--brand); font-weight: 500; }

  /* QUOTE */
  blockquote, .quote {
    border-left: 2pt solid var(--brand);
    margin: 12pt 0;
    padding: 4pt 0 4pt 16pt;
    color: var(--olive);
    line-height: 1.55;
    break-inside: avoid;
  }
  blockquote .cite, .quote .cite {
    display: block;
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--stone);
    margin-top: 4pt;
  }

  /* CODE */
  code {
    font-family: var(--mono);
    font-size: 9pt;
    background: var(--ivory);
    padding: 1pt 4pt;
    border-radius: 2pt;
    color: var(--dark-warm);
  }
  pre {
    font-family: var(--mono);
    font-size: 9pt;
    line-height: 1.5;
    background: var(--ivory);
    border: 0.5pt solid var(--border-soft);
    border-radius: 4pt;
    padding: 10pt 14pt;
    margin: 10pt 0;
    white-space: pre-wrap;
    color: var(--near-black);
    break-inside: avoid;
  }
  pre code { background: transparent; padding: 0; font-size: inherit; }

  /* TABLE (kami-table) */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    margin: 12pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-family: var(--sans);
    font-weight: 500;
    color: var(--dark-warm);
    padding: 6pt 8pt;
    border-bottom: 1pt solid var(--border);
    background: var(--ivory);
  }
  table td, .kami-table td {
    padding: 5pt 8pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 3pt 6pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 2pt 6pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }

  /* CALLOUT / TAKEAWAY */
  .callout {
    background: var(--ivory);
    border-left: 2pt solid var(--brand);
    padding: 10pt 14pt;
    border-radius: 3pt;
    margin: 12pt 0;
    line-height: 1.55;
    break-inside: avoid;
  }
  .takeaway {
    background: var(--ivory);
    border: 0.5pt solid var(--border);
    border-radius: 4pt;
    padding: 10pt 14pt;
    margin: 14pt 0;
    break-inside: avoid;
  }
  .takeaway-label {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 4pt;
  }

  /* TAG */
  .tag {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--brand);
    font-family: var(--sans);
    font-size: 9pt;
    font-weight: 500;
    padding: 1pt 6pt;
    border-radius: 3pt;
    letter-spacing: 0.4pt;
    text-transform: uppercase;
    margin-right: 4pt;
  }

  /* FIGURE */
  figure { margin: 14pt 0; break-inside: avoid; }
  figure img { max-width: 100%; border-radius: 4pt; }
  figcaption {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--stone);
    margin-top: 6pt;
    text-align: center;
  }

  /* CHAPTER BREAK */
  .chapter { break-before: page; }
</style>
</head>
<body>

<!-- COVER -->
<section class="cover">
  <div>
    <div class="cover-eyebrow">{{EYEBROW - e.g. Technical Report / Annual Review / White Paper}}</div>
    <div class="cover-title">{{Document title<br>can span two lines}}</div>
    <div class="cover-sub">{{One-line subtitle - what this is and who it's for.}}</div>
  </div>
  <div class="cover-meta">
    <strong>{{AUTHOR / TEAM}}</strong><br>
    {{Version 1.0}} · {{YYYY.MM}}<br>
    {{PUBLISHER / ORGANIZATION}}
  </div>
</section>

<!-- TOC -->
<section class="toc">
  <h2>Contents</h2>
  <div class="toc-item"><span class="toc-num">01</span><span class="toc-title">Executive Summary</span><span class="toc-page">03</span></div>
  <div class="toc-item"><span class="toc-num">02</span><span class="toc-title">Background &amp; Problem Statement</span><span class="toc-page">04</span></div>
  <div class="toc-item"><span class="toc-num">03</span><span class="toc-title">Methodology &amp; Findings</span><span class="toc-page">06</span></div>
  <div class="toc-item"><span class="toc-num">04</span><span class="toc-title">Conclusions &amp; Recommendations</span><span class="toc-page">09</span></div>
  <div class="toc-item"><span class="toc-num">05</span><span class="toc-title">Appendix</span><span class="toc-page">11</span></div>
</section>

<!-- Chapter 01 -->
<section>
  <div class="chapter-num">01 · Executive Summary</div>
  <h1>Executive Summary</h1>

  <p class="lead">
    {{Two or three sentences opening the whole thesis. Use <span class="hl">brand-color emphasis</span> to grab attention on the sharpest claim. A reader of only this paragraph should understand what the document argues.}}
  </p>

  <h2>Key Takeaways</h2>
  <ul>
    <li>{{Takeaway 1 - a quantified conclusion in one line.}}</li>
    <li>{{Takeaway 2 - an insight backed by data.}}</li>
    <li>{{Takeaway 3 - a forward-looking judgment.}}</li>
  </ul>

  <div class="takeaway">
    <div class="takeaway-label">Questions this document answers</div>
    {{List the three core questions as actual questions - so the reader can decide in ten seconds whether to read on.}}
  </div>
</section>

<!-- Chapter 02 -->
<section class="chapter">
  <div class="chapter-num">02 · Background</div>
  <h1>Background &amp; Problem Statement</h1>

  <p class="lead">
    {{Chapter intro - what this chapter is solving, why it matters. One or two sentences.}}
  </p>

  <h2>Current State</h2>
  <p>{{Three to five lines describing the status quo. Use <span class="hl">specific figures</span> rather than adjectives.}}</p>

  <h2>The Core Problem</h2>
  <p>{{State the problem specifically. Use a callout to emphasize a key observation:}}</p>

  <div class="callout">
    {{A short quoted line or key observation. Different in tone from the body so the reader gets a breath.}}
  </div>

  <h2>Metrics of Success</h2>
  <table>
    <thead>
      <tr>
        <th>Dimension</th>
        <th>Current</th>
        <th>Target</th>
        <th>Gap</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>{{DIMENSION_1}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{GAP}}</td></tr>
      <tr><td>{{DIMENSION_2}}</td><td>{{VAL}}</td><td>{{VAL}}</td><td>{{GAP}}</td></tr>
    </tbody>
  </table>
</section>

<!-- Chapter 03 -->
<section class="chapter">
  <div class="chapter-num">03 · Methodology</div>
  <h1>Methodology &amp; Findings</h1>

  <p class="lead">{{Chapter intro.}}</p>

  <h2>Approach</h2>
  <p>{{Describe the methodology. Code or formula examples welcome:}}</p>

  <pre><code>def analyze(data):
    return transform(data)</code></pre>

  <h2>Key Findings</h2>

  <h3>Finding 1 - {{TITLE}}</h3>
  <p>{{A paragraph with data: <span class="hl">specific numbers or ratios</span>.}}</p>

  <h3>Finding 2 - {{TITLE}}</h3>
  <p>{{A paragraph.}}</p>

  <blockquote>
    {{A quoted passage - user interview, expert perspective, or cited source.}}
    <span class="cite"> - {{SOURCE / PERSON}}, {{DATE}}</span>
  </blockquote>
</section>

<!-- Chapter 04 -->
<section class="chapter">
  <div class="chapter-num">04 · Conclusions</div>
  <h1>Conclusions &amp; Recommendations</h1>

  <p class="lead">{{Chapter intro - a one-line summary of the conclusion, then the recommendations below.}}</p>

  <h2>Core Conclusions</h2>
  <ol>
    <li>{{Conclusion 1.}}</li>
    <li>{{Conclusion 2.}}</li>
    <li>{{Conclusion 3.}}</li>
  </ol>

  <h2>Recommended Next Steps</h2>
  <p>{{Concrete, executable recommendations tied to the conclusions.}}</p>

  <div class="takeaway">
    <div class="takeaway-label">Call to Action</div>
    {{If the reader does one thing, what is it? Specific enough to start Monday morning.}}
  </div>
</section>

<!-- Chapter 05 -->
<section class="chapter">
  <div class="chapter-num">05 · Appendix</div>
  <h1>Appendix</h1>

  <h2>A. References</h2>
  <ul>
    <li>{{Reference 1}}</li>
    <li>{{Reference 2}}</li>
  </ul>

  <h2>B. Glossary</h2>
  <p><strong>{{TERM}}</strong> - {{definition}}</p>
  <p><strong>{{TERM}}</strong> - {{definition}}</p>

  <h2>C. Acknowledgements</h2>
  <p>{{Acknowledgement paragraph.}}</p>
</section>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/long-doc.html ===
<!DOCTYPE html>
<!-- ==================================================================
     LONG DOCUMENT TEMPLATE · parchment design system
     多页 A4 白皮书/技术报告/年度总结
     结构：封面 -> 目录 -> 执行摘要 -> 正文章节 -> 附录
     ================================================================== -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{{文档标题}}</title>
<meta name="author" content="{{作者}}">
<meta name="description" content="{{摘要}}">
<meta name="keywords" content="{{关键词}}">
<meta name="generator" content="Kami">
<style>
  /* Regular weight */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W04.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W04.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  /* Bold weight - W05 for all bold variants */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W05.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W05.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @page {
    size: A4;
    margin: 20mm 22mm 22mm 22mm;
    background: #f5f4ed;

    @top-right {
      content: string(section-title);
      font-family: "TsangerJinKai02", "Source Han Serif SC",
                   "Noto Serif CJK SC", "Songti SC", Georgia, serif;
      font-size: 8pt;
      color: #6b6a64;
    }

    @bottom-center {
      content: counter(page) "  ·  {{文档标题}}";
      font-family: "TsangerJinKai02", "Source Han Serif SC",
                   "Noto Serif CJK SC", "Songti SC", Georgia, serif;
      font-size: 9pt;
      color: #6b6a64;
    }
  }

  @page:first {
    @top-right { content: ""; }
    @bottom-center { content: ""; }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;
    --serif: "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", Georgia, serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 20mm 22mm 22mm 22mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10.5pt;
    line-height: 1.55;
    letter-spacing: 0.3pt;
  }

  .sans {
    font-family: var(--sans);
  }

  /* ========== COVER ========== */
  .cover {
    min-height: 240mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 40mm 0 0 0;
    break-after: page;
  }
  .cover-eyebrow {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 18pt;
  }
  .cover-title {
    font-size: 36pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.15;
    letter-spacing: 0.3pt;
    margin-bottom: 16pt;
  }
  .cover-sub {
    font-family: var(--sans);
    font-size: 14pt;
    color: var(--olive);
    line-height: 1.5;
    max-width: 85%;
    margin-bottom: 30pt;
  }
  .cover-meta {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--stone);
    line-height: 1.5;
  }
  .cover-meta strong {
    color: var(--dark-warm);
    font-weight: 500;
  }

  /* ========== TOC（目录）========== */
  .toc { break-after: page; }
  .toc h2 {
    font-size: 22pt;
    font-weight: 500;
    margin-bottom: 14pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .toc-item {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 6pt 0;
    border-bottom: 0.3pt dotted var(--border);
    font-size: 11pt;
  }
  .toc-num {
    color: var(--brand);
    font-weight: 500;
    min-width: 30pt;
  }
  .toc-title {
    flex: 1;
    color: var(--near-black);
    padding-left: 6pt;
  }
  .toc-page {
    color: var(--stone);
    font-variant-numeric: tabular-nums;
  }

  /* ========== HEADINGS ========== */
  h1 {
    font-size: 22pt;
    font-weight: 500;
    line-height: 1.2;
    margin: 0 0 10pt 0;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
    color: var(--near-black);
    break-after: avoid;
  }

  h2 {
    font-size: 16pt;
    font-weight: 500;
    line-height: 1.25;
    margin: 24pt 0 6pt 0;
    color: var(--near-black);
    break-after: avoid;
    string-set: section-title content();
  }

  h3 {
    font-size: 13pt;
    font-weight: 500;
    line-height: 1.3;
    margin: 18pt 0 4pt 0;
    color: var(--dark-warm);
    break-after: avoid;
  }

  .chapter-num {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 6pt;
  }

  /* ========== PARAGRAPHS ========== */
  p {
    margin: 0 0 10pt 0;
    line-height: 1.55;
    color: var(--near-black);
  }

  .lead {
    font-size: 12pt;
    line-height: 1.55;
    color: var(--dark-warm);
    margin-bottom: 14pt;
  }

  .hl { color: var(--brand); font-weight: 500; }
  strong { font-weight: 500; }

  /* ========== LISTS ========== */
  ul, ol {
    margin: 6pt 0 10pt 0;
    padding-left: 20pt;
    line-height: 1.55;
  }
  ul li::marker { color: var(--brand); }
  ol li::marker { color: var(--brand); font-weight: 500; }

  /* ========== QUOTE ========== */
  blockquote, .quote {
    border-left: 2pt solid var(--brand);
    margin: 12pt 0;
    padding: 4pt 0 4pt 16pt;
    color: var(--olive);
    line-height: 1.55;
    break-inside: avoid;
  }
  blockquote .cite, .quote .cite {
    display: block;
    font-size: 9pt;
    color: var(--stone);
    margin-top: 4pt;
  }

  /* ========== CODE ========== */
  /* Mono first for English glyphs, then CJK fallback so Chinese comments
     inside code/pre render correctly. A mono-only chain causes missing
     glyphs rendered as "?" or missing-glyph boxes in WeasyPrint when the system lacks
     a mono font with CJK coverage. */
  code {
    font-family: "JetBrains Mono", "SF Mono", Consolas,
                 "TsangerJinKai02", "Source Han Serif SC",
                 "Noto Serif CJK SC", "Songti SC", monospace;
    font-size: 9pt;
    background: var(--ivory);
    padding: 1pt 4pt;
    border-radius: 2pt;
    color: var(--dark-warm);
  }
  pre {
    font-family: "JetBrains Mono", "SF Mono", Consolas,
                 "TsangerJinKai02", "Source Han Serif SC",
                 "Noto Serif CJK SC", "Songti SC", monospace;
    font-size: 9pt;
    line-height: 1.5;
    background: var(--ivory);
    border: 0.5pt solid var(--border-soft);
    border-radius: 4pt;
    padding: 10pt 14pt;
    margin: 10pt 0;
    white-space: pre-wrap;
    color: var(--near-black);
    break-inside: avoid;
  }
  pre code { background: transparent; padding: 0; font-size: inherit; }

  /* ========== TABLE (kami-table) ========== */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    margin: 12pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 6pt 8pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 5pt 8pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 3pt 6pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 2pt 6pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }

  /* ========== CALLOUT ========== */
  .callout {
    background: var(--ivory);
    border-left: 2pt solid var(--brand);
    padding: 10pt 14pt;
    border-radius: 3pt;
    margin: 12pt 0;
    line-height: 1.55;
    break-inside: avoid;
  }

  .takeaway {
    background: var(--ivory);
    border: 0.5pt solid var(--border);
    border-radius: 4pt;
    padding: 10pt 14pt;
    margin: 14pt 0;
    break-inside: avoid;
  }
  .takeaway-label {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 0.5pt;
    text-transform: uppercase;
    margin-bottom: 4pt;
  }

  /* ========== TAG ========== */
  .tag {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--brand);
    font-family: var(--sans);
    font-size: 9pt;
    font-weight: 500;
    padding: 1pt 6pt;
    border-radius: 3pt;
    margin-right: 4pt;
  }

  /* ========== FIGURE ========== */
  figure {
    margin: 14pt 0;
    break-inside: avoid;
  }
  figure img {
    max-width: 100%;
    border-radius: 4pt;
  }
  figcaption {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--stone);
    margin-top: 6pt;
    text-align: center;
  }

  /* ========== EXECUTIVE SUMMARY ========== */
  .exec-summary {
    background: var(--ivory);
    border: 0.5pt solid var(--border);
    border-radius: 6pt;
    padding: 16pt 20pt;
    margin: 14pt 0;
    break-inside: avoid;
  }
  .exec-summary h2 {
    margin-top: 0;
    font-size: 13pt;
  }

  /* ========== CHAPTER BREAK ========== */
  .chapter { break-before: page; }
</style>
</head>
<body>

<!-- ═════════════ COVER ═════════════ -->
<section class="cover">
  <div>
    <div class="cover-eyebrow">{{EYEBROW · 如 "技术报告" / "年度总结" / "白皮书"}}</div>
    <div class="cover-title">{{文档主标题<br>可以两行}}</div>
    <div class="cover-sub">{{副标题，一句话说清这份文档是什么 / 为谁而写}}</div>
  </div>
  <div class="cover-meta">
    <strong>{{作者 / 团队}}</strong><br>
    {{版本 V1.0}}  ·  {{日期 2026.04}}<br>
    {{发布方 / 机构}}
  </div>
</section>

<!-- ═════════════ 目录 ═════════════ -->
<section class="toc">
  <h2>目录</h2>
  <div class="toc-item">
    <span class="toc-num">01</span>
    <span class="toc-title">执行摘要</span>
    <span class="toc-page">03</span>
  </div>
  <div class="toc-item">
    <span class="toc-num">02</span>
    <span class="toc-title">背景与问题定义</span>
    <span class="toc-page">04</span>
  </div>
  <div class="toc-item">
    <span class="toc-num">03</span>
    <span class="toc-title">方法与发现</span>
    <span class="toc-page">06</span>
  </div>
  <div class="toc-item">
    <span class="toc-num">04</span>
    <span class="toc-title">结论与建议</span>
    <span class="toc-page">09</span>
  </div>
  <div class="toc-item">
    <span class="toc-num">05</span>
    <span class="toc-title">附录</span>
    <span class="toc-page">11</span>
  </div>
</section>

<!-- ═════════════ Chapter 01：执行摘要 ═════════════ -->
<section>
  <div class="chapter-num">01 · Executive Summary</div>
  <h1>执行摘要</h1>

  <p class="lead">
    {{一段 2-3 句话的大论点开场。用 <span class="hl">关键词高亮</span> 抓住读者注意力。
    让读者读这段就能理解整份文档想表达什么。}}
  </p>

  <h2>核心 Takeaways</h2>
  <ul>
    <li>{{Takeaway 1：一句话，可量化的结论}}</li>
    <li>{{Takeaway 2：有数据的洞察}}</li>
    <li>{{Takeaway 3：对未来的判断}}</li>
  </ul>

  <div class="takeaway">
    <div class="takeaway-label">本文档回答的问题</div>
    {{用疑问句列出 3 个本文档的核心问题。让读者立刻 get 到是否需要读完。}}
  </div>
</section>

<!-- ═════════════ Chapter 02：背景 ═════════════ -->
<section class="chapter">
  <div class="chapter-num">02 · Background</div>
  <h1>背景与问题定义</h1>

  <p class="lead">
    {{章节导语：这一章要解决什么问题，为什么重要。1-2 句。}}
  </p>

  <h2>当前现状</h2>
  <p>{{3-5 行段落，铺陈当前状况。用 <span class="hl">具体数据</span> 而不是形容词。}}</p>

  <h2>核心问题</h2>
  <p>{{陈述具体的核心问题。可以用 callout 突出关键观察：}}</p>

  <div class="callout">
    {{一段重要引用或核心观察。和正文语气略有不同，给读者呼吸节奏。}}
  </div>

  <h2>衡量标准</h2>
  <table>
    <thead>
      <tr>
        <th>维度</th>
        <th>当前水平</th>
        <th>目标水平</th>
        <th>差距</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{维度 1}}</td>
        <td>{{数据}}</td>
        <td>{{数据}}</td>
        <td>{{差距}}</td>
      </tr>
      <tr>
        <td>{{维度 2}}</td>
        <td>{{数据}}</td>
        <td>{{数据}}</td>
        <td>{{差距}}</td>
      </tr>
    </tbody>
  </table>
</section>

<!-- ═════════════ Chapter 03：方法 ═════════════ -->
<section class="chapter">
  <div class="chapter-num">03 · Methodology</div>
  <h1>方法与发现</h1>

  <p class="lead">{{章节导语}}</p>

  <h2>研究方法</h2>
  <p>{{描述方法论。可以用代码 / 公式示例：}}</p>

  <pre><code>示例代码块
def analyze(data):
    return transform(data)</code></pre>

  <h2>关键发现</h2>

  <h3>发现 1：{{标题}}</h3>
  <p>{{一段论述。包含数据：<span class="hl">具体数字 / 具体比例</span>。}}</p>

  <h3>发现 2：{{标题}}</h3>
  <p>{{一段论述。}}</p>

  <blockquote>
    {{一段引用，可以是用户访谈、专家观点、文献引用}}
    <span class="cite"> - {{来源 / 人物}}，{{日期}}</span>
  </blockquote>
</section>

<!-- ═════════════ Chapter 04：结论 ═════════════ -->
<section class="chapter">
  <div class="chapter-num">04 · Conclusions</div>
  <h1>结论与建议</h1>

  <p class="lead">{{章节导语：一句话总结结论，下面展开建议。}}</p>

  <h2>核心结论</h2>
  <ol>
    <li>{{结论 1}}</li>
    <li>{{结论 2}}</li>
    <li>{{结论 3}}</li>
  </ol>

  <h2>下一步建议</h2>
  <p>{{基于结论的具体可执行建议。}}</p>

  <div class="takeaway">
    <div class="takeaway-label">Call to Action</div>
    {{如果读者要做一件事，是什么？具体到可以周一早上就开始行动。}}
  </div>
</section>

<!-- ═════════════ Chapter 05：附录 ═════════════ -->
<section class="chapter">
  <div class="chapter-num">05 · Appendix</div>
  <h1>附录</h1>

  <h2>A. 参考资料</h2>
  <ul>
    <li>{{参考文献 1}}</li>
    <li>{{参考文献 2}}</li>
  </ul>

  <h2>B. 术语表</h2>
  <p><strong>{{术语}}</strong>：{{定义}}</p>
  <p><strong>{{术语}}</strong>：{{定义}}</p>

  <h2>C. 致谢</h2>
  <p>{{致谢段落}}</p>
</section>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/one-pager-en.html ===
<!DOCTYPE html>
<!-- ==================================================================
     ONE-PAGER · English · parchment design system
     Single A4 proposal / report / executive summary
     Build: python3 scripts/build.py one-pager-en
     Target: exactly 1 page
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{{DOC_TITLE}}</title>
<meta name="author" content="{{AUTHOR}}">
<meta name="description" content="{{DESCRIPTION}}">
<meta name="keywords" content="{{KEYWORDS}}">
<meta name="generator" content="Kami">
<style>
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 400; font-style: normal; }
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 500; font-style: normal; }

  @page {
    size: A4;
    margin: 15mm 18mm 15mm 18mm;
    background: #f5f4ed;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --sand:      #e8e6dc;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;

    --serif: Charter, Georgia,
             Palatino, "Times New Roman", serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 15mm 18mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10pt;
    line-height: 1.45;
  }

  .serif { font-family: var(--serif); }

  .header {
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
    margin-bottom: 14pt;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20pt;
  }
  .title-block { flex: 1; }
  .eyebrow {
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 4pt;
    font-weight: 500;
  }
  h1 {
    font-family: var(--serif);
    font-size: 26pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.12;
    letter-spacing: -0.3pt;
    margin-bottom: 5pt;
  }
  .subtitle {
    font-size: 11.5pt;
    color: var(--olive);
    line-height: 1.4;
  }
  .meta {
    font-size: 9pt;
    color: var(--stone);
    text-align: right;
    line-height: 1.5;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  /* METRICS - horizontal baseline, no containers (matches resume aesthetic). */
  .metrics {
    display: flex;
    gap: 16pt;
    margin-bottom: 18pt;
    padding: 4pt 0 6pt 0;
    border-bottom: 0.3pt dotted var(--border);
  }
  .metric {
    flex: 1;
    background: transparent;
    padding: 0;
    display: flex;
    align-items: baseline;
    gap: 5pt;
    break-inside: avoid;
  }
  .metric-value {
    font-family: var(--serif);
    font-size: 22pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.3pt;
  }
  .metric-label {
    font-size: 9pt;
    color: var(--olive);
    line-height: 1.3;
  }

  section { margin-bottom: 18pt; break-inside: avoid; }
  section:last-of-type { margin-bottom: 0; }

  h2 {
    font-family: var(--serif);
    font-size: 16pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 6pt;
  }
  h2 .sub {
    font-size: 9pt;
    color: var(--stone);
    font-weight: 400;
    margin-left: 6pt;
  }

  p { margin-bottom: 6pt; line-height: 1.45; }
  p:last-child { margin-bottom: 0; }

  .lead {
    font-size: 12.5pt;
    line-height: 1.5;
    color: var(--dark-warm);
    margin-bottom: 14pt;
  }

  .hl { color: var(--brand); font-weight: 500; }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18pt;
  }

  ul.dash {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul.dash li {
    position: relative;
    padding-left: 14pt;
    margin-bottom: 4pt;
    line-height: 1.45;
  }
  ul.dash li::before {
    content: "\2013";
    position: absolute;
    left: 0;
    color: var(--brand);
  }

  .timeline {
    display: flex;
    gap: 12pt;
    margin-top: 6pt;
  }
  .tl-step { flex: 1; break-inside: avoid; }
  .tl-year {
    font-family: var(--serif);
    font-size: 11pt;
    font-weight: 500;
    color: var(--brand);
    margin-bottom: 2pt;
    letter-spacing: 0.3pt;
    text-transform: uppercase;
  }
  .tl-head {
    font-size: 10pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 2pt;
  }
  .tl-body {
    font-size: 9pt;
    color: var(--olive);
    line-height: 1.45;
  }

  .tag {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--brand);
    font-size: 9pt;
    font-weight: 500;
    padding: 1pt 6pt;
    border-radius: 3pt;
    letter-spacing: 0.4pt;
    text-transform: uppercase;
    margin-right: 3pt;
  }

  /* TABLE (kami-table) */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
    margin: 8pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 4pt 6pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 3pt 6pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 2pt 5pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 1pt 5pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }

  /* CALLOUT - transparent, single brand bar. No filled container. */
  .callout {
    background: transparent;
    border-left: 1.8pt solid var(--brand);
    padding: 4pt 0 4pt 14pt;
    margin: 10pt 0;
    font-size: 10.5pt;
    line-height: 1.55;
    color: var(--olive);
    break-inside: avoid;
  }
  .callout .hl, .callout .em-brand { color: var(--brand); }

  .footer {
    margin-top: 18pt;
    padding-top: 6pt;
    border-top: 0.3pt dotted var(--border);
    font-size: 9pt;
    color: var(--stone);
    display: flex;
    justify-content: space-between;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.3pt;
  }
</style>
</head>
<body>

<div class="header">
  <div class="title-block">
    <div class="eyebrow">{{EYEBROW - e.g. Proposal / Report / Exec Summary}}</div>
    <h1>{{Document headline - verb-led, fits in two lines, bookish.}}</h1>
    <div class="subtitle">{{One-line subtitle or the single sharpest claim.}}</div>
  </div>
  <div class="meta">
    {{AUTHOR}}<br>
    {{YYYY.MM.DD}}<br>
    {{VERSION / STATUS}}
  </div>
</div>

<div class="metrics">
  <div class="metric">
    <div class="metric-value">{{NUMBER}}</div>
    <div class="metric-label">{{LABEL}}</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{NUMBER}}</div>
    <div class="metric-label">{{LABEL}}</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{NUMBER}}</div>
    <div class="metric-label">{{LABEL}}</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{NUMBER}}</div>
    <div class="metric-label">{{LABEL}}</div>
  </div>
</div>

<p class="lead">
  {{~30-40 words. The one paragraph that sets the whole document's tone. Use <span class="hl">brand-color emphasis</span> on the sharpest claim or number. Everything below is in service of this.}}
</p>

<div class="two-col">
  <section>
    <h2>{{Section one}}</h2>
    <p>{{One or two sentences expanding the claim.}}</p>
    <ul class="dash">
      <li>{{Short bullet: a data point, observation, or judgment.}}</li>
      <li>{{Short bullet with <span class="hl">key figure</span>.}}</li>
      <li>{{Short bullet.}}</li>
    </ul>
  </section>

  <section>
    <h2>{{Section two}}</h2>
    <p>{{One or two sentences.}}</p>
    <ul class="dash">
      <li>{{Short bullet.}}</li>
      <li>{{Short bullet.}}</li>
      <li>{{Short bullet.}}</li>
    </ul>
  </section>
</div>

<section>
  <h2>Roadmap<span class="sub">three-step arc for proposals</span></h2>
  <div class="timeline">
    <div class="tl-step">
      <div class="tl-year">Phase 1</div>
      <div class="tl-head">{{STAGE_TITLE}}</div>
      <div class="tl-body">{{One-line explanation.}}</div>
    </div>
    <div class="tl-step">
      <div class="tl-year">Phase 2</div>
      <div class="tl-head">{{STAGE_TITLE}}</div>
      <div class="tl-body">{{One-line explanation.}}</div>
    </div>
    <div class="tl-step">
      <div class="tl-year">Phase 3</div>
      <div class="tl-head">{{STAGE_TITLE}}</div>
      <div class="tl-body">{{One-line explanation.}}</div>
    </div>
  </div>
</section>

<div class="callout">
  {{Key quote / critical note / the single takeaway that must not be missed.}}
</div>

<div class="footer">
  <span>{{CONFIDENTIALITY - internal / public / draft}}</span>
  <span>{{PAGE / CONTACT}}</span>
</div>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/one-pager.html ===
<!DOCTYPE html>
<!-- ==================================================================
     ONE-PAGER TEMPLATE · parchment design system
     单页 A4 方案/报告/执行摘要
     改完跑：python3 -c "from weasyprint import HTML; HTML('one-pager.html').write_pdf('out.pdf')"
     目标：页数必须 == 1
     ================================================================== -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{{文档标题}}</title>
<meta name="author" content="{{作者}}">
<meta name="description" content="{{摘要}}">
<meta name="keywords" content="{{关键词}}">
<meta name="generator" content="Kami">
<style>
  /* Regular weight */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W04.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W04.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  /* Bold weight - W05 for all bold variants */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W05.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W05.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @page {
    size: A4;
    margin: 15mm 18mm 15mm 18mm;
    background: #f5f4ed;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --sand:      #e8e6dc;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;
    --serif: "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", Georgia, serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 15mm 18mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10pt;
    line-height: 1.45;
    letter-spacing: 0.3pt;
  }

  .serif {
    font-family: var(--serif);
  }

  /* ========== HEADER ========== */
  .header {
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
    margin-bottom: 14pt;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20pt;
  }
  .title-block {
    flex: 1;
  }
  .eyebrow {
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 4pt;
  }
  h1 {
    font-family: var(--serif);
    font-size: 24pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.15;
    margin-bottom: 5pt;
  }
  .subtitle {
    font-size: 11pt;
    color: var(--olive);
    line-height: 1.4;
  }
  .meta {
    font-size: 9pt;
    color: var(--stone);
    text-align: right;
    line-height: 1.45;
    white-space: nowrap;
  }

  /* ========== METRICS ========== */
  /* 横向 baseline 布局 - -  和 resume.html 一致的 kami native 姿态。
     背景透明、无边框，用 typography 本身承担层次，不加容器。 */
  .metrics {
    display: flex;
    gap: 14pt;
    margin-bottom: 18pt;
    padding: 4pt 0 6pt 0;
    border-bottom: 0.3pt dotted var(--border);
  }
  .metric {
    flex: 1;
    background: transparent;
    padding: 0;
    display: flex;
    align-items: baseline;
    gap: 4pt;
    break-inside: avoid;
  }
  .metric-value {
    font-family: var(--serif);
    font-size: 20pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.2pt;
  }
  .metric-label {
    font-size: 9pt;
    color: var(--olive);
    line-height: 1.3;
  }

  /* ========== SECTIONS ========== */
  section { margin-bottom: 18pt; break-inside: avoid; }
  section:last-of-type { margin-bottom: 0; }

  h2 {
    font-family: var(--serif);
    font-size: 16pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 6pt;
  }
  h2 .sub {
    font-size: 9pt;
    color: var(--stone);
    font-weight: 400;
    margin-left: 6pt;
  }

  p { margin-bottom: 6pt; line-height: 1.45; }
  p:last-child { margin-bottom: 0; }

  .lead {
    font-size: 12pt;
    line-height: 1.5;
    color: var(--dark-warm);
    margin-bottom: 14pt;
  }

  .hl { color: var(--brand); font-weight: 500; }

  /* ========== 2-column grid ========== */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18pt;
  }

  /* ========== 短横线 list（代替默认 bullet） ========== */
  ul.dash {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul.dash li {
    position: relative;
    padding-left: 14pt;
    margin-bottom: 4pt;
    line-height: 1.45;
  }
  ul.dash li::before {
    content: "\2013";
    position: absolute;
    left: 0;
    color: var(--brand);
  }

  /* ========== Timeline (横向进度点) ========== */
  .timeline {
    display: flex;
    gap: 12pt;
    margin-top: 6pt;
  }
  .tl-step {
    flex: 1;
    break-inside: avoid;
  }
  .tl-year {
    font-family: var(--serif);
    font-size: 11pt;
    font-weight: 500;
    color: var(--brand);
    margin-bottom: 2pt;
  }
  .tl-head {
    font-size: 10pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 2pt;
  }
  .tl-body {
    font-size: 9pt;
    color: var(--olive);
    line-height: 1.4;
  }

  /* ========== Tag ========== */
  .tag {
    display: inline-block;
    background: var(--tag-bg);    /* 实色！不要 rgba */
    color: var(--brand);
    font-size: 9pt;
    font-weight: 500;
    padding: 1pt 5pt;
    border-radius: 3pt;
    letter-spacing: 0.3pt;
    margin-right: 3pt;
  }

  /* ========== Callout / 高亮块 ========== */
  /* 参考 resume.html .team-culture：透明底 + 单左侧 brand 竖条。
     不做容器也不做圆角，气质是"一条旁注"而不是"一个卡片"。 */
  .callout {
    background: transparent;
    border-left: 1.8pt solid var(--brand);
    padding: 4pt 0 4pt 14pt;
    margin: 10pt 0;
    font-size: 10pt;
    line-height: 1.5;
    color: var(--olive);
    break-inside: avoid;
  }
  .callout .hl, .callout .em-brand { color: var(--brand); }

  /* ========== TABLE (kami-table) ========== */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
    margin: 8pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 4pt 6pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 3pt 6pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 2pt 5pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 1pt 5pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }

  /* ========== FOOTER ========== */
  .footer {
    margin-top: 18pt;
    padding-top: 6pt;
    border-top: 0.3pt dotted var(--border);
    font-size: 9pt;
    color: var(--stone);
    display: flex;
    justify-content: space-between;
    letter-spacing: 0.3pt;
  }
</style>
</head>
<body>

<!-- ========== HEADER ========== -->
<div class="header">
  <div class="title-block">
    <div class="eyebrow">{{EYEBROW · 如 "产品方案" / "项目提案" / "执行摘要"}}</div>
    <h1>{{文档主标题（serif，2 行内，动词+名词结构最好）}}</h1>
    <div class="subtitle">{{一行副标题 / 一句核心论点}}</div>
  </div>
  <div class="meta">
    {{作者名}}<br>
    {{日期 YYYY.MM.DD}}<br>
    {{版本号 / 状态}}
  </div>
</div>

<!-- ========== METRICS（可选，3-4 卡最佳） ========== -->
<div class="metrics">
  <div class="metric">
    <div class="metric-value">{{数字}}</div>
    <div class="metric-label">{{标签描述}}</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{数字}}</div>
    <div class="metric-label">{{标签描述}}</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{数字}}</div>
    <div class="metric-label">{{标签描述}}</div>
  </div>
  <div class="metric">
    <div class="metric-value">{{数字}}</div>
    <div class="metric-label">{{标签描述}}</div>
  </div>
</div>

<!-- ========== LEAD（导语，一段） ========== -->
<p class="lead">
  {{一段 40-60 字的核心论点导语。用「<span class="hl">关键词</span>」高亮重点。这段定调整个文档。}}
</p>

<!-- ========== 核心内容（两栏） ========== -->
<div class="two-col">
  <section>
    <h2>{{section 标题 1}}</h2>
    <p>{{这里写 1-2 句段落，展开论点。}}</p>
    <ul class="dash">
      <li>{{短 bullet：数据/观察/判断}}</li>
      <li>{{短 bullet：带 <span class="hl">关键数字</span> 的论据}}</li>
      <li>{{短 bullet}}</li>
    </ul>
  </section>

  <section>
    <h2>{{section 标题 2}}</h2>
    <p>{{1-2 句段落。}}</p>
    <ul class="dash">
      <li>{{短 bullet}}</li>
      <li>{{短 bullet}}</li>
      <li>{{短 bullet}}</li>
    </ul>
  </section>
</div>

<!-- ========== Timeline / Roadmap（可选） ========== -->
<section>
  <h2>时间线 / 路线图<span class="sub">（适用于方案类文档）</span></h2>
  <div class="timeline">
    <div class="tl-step">
      <div class="tl-year">阶段 1</div>
      <div class="tl-head">{{阶段标题}}</div>
      <div class="tl-body">{{一句解释}}</div>
    </div>
    <div class="tl-step">
      <div class="tl-year">阶段 2</div>
      <div class="tl-head">{{阶段标题}}</div>
      <div class="tl-body">{{一句解释}}</div>
    </div>
    <div class="tl-step">
      <div class="tl-year">阶段 3</div>
      <div class="tl-head">{{阶段标题}}</div>
      <div class="tl-body">{{一句解释}}</div>
    </div>
  </div>
</section>

<!-- ========== CALLOUT（可选）========== -->
<div class="callout">
  {{关键引用 / 重要提示 / 核心 takeaway。比正文更需要引起注意的内容放这里。}}
</div>

<!-- ========== FOOTER ========== -->
<div class="footer">
  <span>{{机密级别 / 内部 / 公开 等}}</span>
  <span>{{页码 / 联系方式}}</span>
</div>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/portfolio-en.html ===
<!DOCTYPE html>
<!-- ==================================================================
     PORTFOLIO · English · parchment design system
     Multi-page A4 portfolio / case studies
     Structure: cover -> About -> project pages -> Contact
     Each project 1-2 pages, visuals over words
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{{NAME}} · Portfolio</title>
<meta name="author" content="{{NAME}}">
<meta name="description" content="{{DESCRIPTION}}">
<meta name="keywords" content="{{KEYWORDS}}">
<meta name="generator" content="Kami">
<style>
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 400; font-style: normal; }
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 500; font-style: normal; }

  @page {
    size: A4;
    margin: 12mm 15mm 12mm 15mm;
    background: #f5f4ed;
  }
  @page:first { margin: 0; }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --brand-deep:#a64f33;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;

    --serif: Charter, Georgia,
             Palatino, "Times New Roman", serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 12mm 15mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10pt;
    line-height: 1.45;
  }

  .serif { font-family: var(--serif); }

  /* COVER */
  .cover {
    width: 100%;
    height: 297mm;
    padding: 25mm 20mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    break-after: page;
  }
  .cover-top {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--brand);
    letter-spacing: 2.5pt;
    text-transform: uppercase;
    font-weight: 500;
  }
  .cover-center {
    display: flex;
    flex-direction: column;
    gap: 14pt;
  }
  .cover-name {
    font-family: var(--serif);
    font-size: 64pt;
    font-weight: 500;
    line-height: 1.02;
    color: var(--near-black);
    letter-spacing: -1pt;
  }
  .cover-tagline {
    font-family: var(--serif);
    font-size: 18pt;
    color: var(--olive);
    line-height: 1.4;
    max-width: 80%;
  }
  .cover-line {
    width: 80pt;
    height: 2pt;
    background: var(--brand);
    margin: 18pt 0 4pt 0;
  }
  .cover-meta {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 10pt;
    color: var(--stone);
    font-variant-numeric: tabular-nums;
  }
  .cover-meta strong {
    color: var(--dark-warm);
    font-weight: 500;
  }

  /* ABOUT */
  section.about {
    break-after: page;
    padding: 10mm 0;
  }
  .about-eyebrow {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1.5pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 8pt;
  }
  .about-title {
    font-family: var(--serif);
    font-size: 34pt;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.5pt;
    margin-bottom: 20pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .about-lead {
    font-family: var(--serif);
    font-size: 15pt;
    line-height: 1.5;
    color: var(--dark-warm);
    margin-bottom: 24pt;
    max-width: 90%;
  }
  .about-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24pt;
  }
  .about-body p { line-height: 1.45; margin-bottom: 10pt; }
  .about-body h3 {
    font-family: var(--serif);
    font-size: 13pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 6pt;
  }

  /* PROJECT PAGE */
  .project {
    break-before: page;
    break-after: page;
    padding: 8mm 0;
  }
  .project-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .project-num {
    font-family: var(--serif);
    font-size: 48pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1;
    margin-right: 18pt;
    letter-spacing: -1pt;
  }
  .project-title-block { flex: 1; padding-top: 6pt; }
  .project-type {
    font-family: var(--sans);
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1.5pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 3pt;
  }
  .project-title {
    font-family: var(--serif);
    font-size: 24pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.2;
    letter-spacing: -0.3pt;
    margin-bottom: 4pt;
  }
  .project-subtitle {
    font-size: 11pt;
    color: var(--olive);
    line-height: 1.4;
  }
  .project-date {
    text-align: right;
    font-size: 9pt;
    color: var(--stone);
    font-variant-numeric: tabular-nums;
    min-width: 80pt;
    padding-top: 10pt;
  }

  /* Tags */
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4pt;
    margin-bottom: 14pt;
  }
  .tag {
    background: var(--tag-bg);
    color: var(--brand);
    font-family: var(--sans);
    font-size: 9pt;
    font-weight: 500;
    padding: 2pt 8pt;
    border-radius: 3pt;
    letter-spacing: 0.4pt;
    text-transform: uppercase;
  }

  /* Hero image */
  .project-hero {
    width: 100%;
    height: 110mm;
    background: var(--ivory);
    border: 0.5pt solid var(--border-soft);
    border-radius: 6pt;
    margin-bottom: 14pt;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--stone);
    font-size: 10pt;
  }
  .project-hero img { width: 100%; height: 100%; object-fit: cover; }

  /* 3-column body */
  .project-body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16pt;
  }
  .project-block h3 {
    font-family: var(--serif);
    font-size: 12pt;
    font-weight: 500;
    color: var(--brand);
    margin-bottom: 4pt;
    letter-spacing: 0.3pt;
  }
  .project-block p {
    font-size: 9.5pt;
    line-height: 1.5;
    color: var(--dark-warm);
  }
  .project-block .hl { color: var(--brand); font-weight: 500; }

  /* Results */
  .project-results {
    display: flex;
    gap: 14pt;
    margin-top: 14pt;
    padding-top: 10pt;
    border-top: 0.5pt dotted var(--border);
  }
  .result-item { flex: 1; }
  .result-value {
    font-family: var(--serif);
    font-size: 20pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .result-label {
    font-size: 9pt;
    color: var(--olive);
    margin-top: 2pt;
    line-height: 1.3;
  }

  /* 2-image variant */
  .project-visuals-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10pt;
    margin-bottom: 14pt;
  }
  .project-visuals-2col .project-hero {
    height: 80mm;
    margin-bottom: 0;
  }

  /* SELECTED WORKS */
  section.more-works {
    break-before: page;
    padding-top: 10mm;
  }
  .more-works-title {
    font-family: var(--serif);
    font-size: 26pt;
    font-weight: 500;
    letter-spacing: -0.3pt;
    margin-bottom: 16pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .work-item {
    display: grid;
    grid-template-columns: 40pt 1fr 80pt;
    gap: 12pt;
    padding: 8pt 0;
    border-bottom: 0.3pt dotted var(--border);
    align-items: baseline;
  }
  .work-year {
    font-family: var(--serif);
    color: var(--brand);
    font-size: 11pt;
    font-variant-numeric: tabular-nums;
  }
  .work-title-block .title {
    font-family: var(--serif);
    font-size: 11pt;
    font-weight: 500;
    color: var(--near-black);
  }
  .work-title-block .desc {
    font-size: 9pt;
    color: var(--olive);
    margin-top: 1pt;
  }
  .work-link {
    text-align: right;
    font-size: 9pt;
    color: var(--stone);
    font-variant-numeric: tabular-nums;
  }

  /* CONTACT */
  section.contact {
    break-before: page;
    padding: 20mm 0;
    min-height: 230mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact-eyebrow {
    font-family: var(--sans);
    font-size: 10pt;
    color: var(--brand);
    letter-spacing: 2pt;
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 12pt;
  }
  .contact-title {
    font-family: var(--serif);
    font-size: 52pt;
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: -1pt;
    margin-bottom: 20pt;
    color: var(--near-black);
  }
  .contact-line {
    width: 80pt;
    height: 2pt;
    background: var(--brand);
    margin-bottom: 24pt;
  }
  .contact-list {
    font-size: 12pt;
    line-height: 1.55;
    color: var(--dark-warm);
  }
  .contact-list strong {
    font-family: var(--sans);
    color: var(--stone);
    font-weight: 500;
    font-size: 10pt;
    letter-spacing: 1pt;
    margin-right: 12pt;
    display: inline-block;
    min-width: 80pt;
    text-transform: uppercase;
  }
  .contact-list a {
    color: var(--brand);
    text-decoration: none;
  }

  /* TABLE (kami-table) */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    margin: 10pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 5pt 8pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 4pt 8pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 3pt 6pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 2pt 6pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="cover-top">{{YEAR_RANGE - e.g. Selected Works 2023–2026}}</div>

  <div class="cover-center">
    <div class="cover-name">{{NAME}}<br>Portfolio</div>
    <div class="cover-tagline">{{One-line self-description or portfolio theme.}}</div>
    <div class="cover-line"></div>
  </div>

  <div class="cover-meta">
    <div>
      <strong>{{DISCIPLINE / ROLE}}</strong><br>
      {{LOCATION}}
    </div>
    <div style="text-align: right;">
      {{EMAIL}}<br>
      {{WEBSITE / SOCIAL}}
    </div>
  </div>
</div>

<!-- ABOUT -->
<section class="about">
  <div class="about-eyebrow">About</div>
  <div class="about-title">{{Single-line positioning headline.}}</div>
  <div class="about-lead">
    {{Two or three lines of introduction in serif. Not sales-y. Describe in your own words what you care about and what you do well.}}
  </div>
  <div class="about-body">
    <div>
      <h3>Background</h3>
      <p>{{A paragraph on your past experience.}}</p>
    </div>
    <div>
      <h3>Focus</h3>
      <p>{{A paragraph on your current focus or methodology.}}</p>
    </div>
  </div>
</section>

<!-- PROJECT 01 -->
<section class="project">
  <div class="project-header">
    <div class="project-num">01</div>
    <div class="project-title-block">
      <div class="project-type">{{PROJECT_TYPE - e.g. Product Design / Open Source}}</div>
      <div class="project-title">{{PROJECT_NAME}}</div>
      <div class="project-subtitle">{{One-line description of what this project did.}}</div>
    </div>
    <div class="project-date">{{DATE - e.g. 2025.04 - 2026.02}}</div>
  </div>

  <div class="project-tags">
    <span class="tag">{{Tag 1}}</span>
    <span class="tag">{{Tag 2}}</span>
    <span class="tag">{{Tag 3}}</span>
  </div>

  <div class="project-hero">
    <!-- Replace with: <img src="project-01-hero.png" alt=""> -->
    [hero image placeholder - replace with &lt;img&gt;]
  </div>

  <div class="project-body">
    <div class="project-block">
      <h3>Context</h3>
      <p>{{Why this project? What problem does it solve? Who is the user?}}</p>
    </div>
    <div class="project-block">
      <h3>Approach</h3>
      <p>{{How it was done - key decisions, design rationale, technical approach.}}</p>
    </div>
    <div class="project-block">
      <h3>Outcome</h3>
      <p>{{Results - <span class="hl">figures</span>, feedback, impact.}}</p>
    </div>
  </div>

  <div class="project-results">
    <div class="result-item">
      <div class="result-value">{{NUMBER}}</div>
      <div class="result-label">{{LABEL}}</div>
    </div>
    <div class="result-item">
      <div class="result-value">{{NUMBER}}</div>
      <div class="result-label">{{LABEL}}</div>
    </div>
    <div class="result-item">
      <div class="result-value">{{NUMBER}}</div>
      <div class="result-label">{{LABEL}}</div>
    </div>
  </div>
</section>

<!-- PROJECT 02 (2-image variant) -->
<section class="project">
  <div class="project-header">
    <div class="project-num">02</div>
    <div class="project-title-block">
      <div class="project-type">{{PROJECT_TYPE}}</div>
      <div class="project-title">{{PROJECT_NAME}}</div>
      <div class="project-subtitle">{{One-line description.}}</div>
    </div>
    <div class="project-date">{{DATE}}</div>
  </div>

  <div class="project-tags">
    <span class="tag">{{Tag}}</span>
    <span class="tag">{{Tag}}</span>
  </div>

  <div class="project-visuals-2col">
    <div class="project-hero">[left image]</div>
    <div class="project-hero">[right image]</div>
  </div>

  <div class="project-body">
    <div class="project-block">
      <h3>Context</h3>
      <p>{{Context.}}</p>
    </div>
    <div class="project-block">
      <h3>Approach</h3>
      <p>{{Approach.}}</p>
    </div>
    <div class="project-block">
      <h3>Outcome</h3>
      <p>{{Outcome.}}</p>
    </div>
  </div>
</section>

<!-- MORE WORKS -->
<section class="more-works">
  <div class="more-works-title">Selected Works</div>

  <div class="work-item">
    <span class="work-year">2025</span>
    <div class="work-title-block">
      <div class="title">{{WORK_TITLE}}</div>
      <div class="desc">{{One-line description.}}</div>
    </div>
    <div class="work-link">{{LINK / STATUS}}</div>
  </div>

  <div class="work-item">
    <span class="work-year">2024</span>
    <div class="work-title-block">
      <div class="title">{{WORK_TITLE}}</div>
      <div class="desc">{{One-line description.}}</div>
    </div>
    <div class="work-link">{{LINK / STATUS}}</div>
  </div>

  <div class="work-item">
    <span class="work-year">2023</span>
    <div class="work-title-block">
      <div class="title">{{WORK_TITLE}}</div>
      <div class="desc">{{One-line description.}}</div>
    </div>
    <div class="work-link">{{LINK / STATUS}}</div>
  </div>
</section>

<!-- CONTACT -->
<section class="contact">
  <div class="contact-eyebrow">Let's Talk</div>
  <div class="contact-title">{{One-line opening - e.g. "Open to new collaborations."}}</div>
  <div class="contact-line"></div>
  <div class="contact-list">
    <div><strong>Email</strong><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></div>
    <div><strong>Phone</strong>{{PHONE}}</div>
    <div><strong>Website</strong><a href="{{URL}}">{{URL}}</a></div>
    <div><strong>{{PLATFORM}}</strong><a href="{{URL}}">@{{HANDLE}}</a></div>
  </div>
</section>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/portfolio.html ===
<!DOCTYPE html>
<!-- ==================================================================
     PORTFOLIO TEMPLATE · parchment design system
     多页 A4 作品集 / 案例集 / 项目集
     结构：封面 -> About -> 若干项目页 -> Contact
     每个项目 1-2 页，视觉重于文字
     ================================================================== -->
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{{名字}} · 作品集</title>
<meta name="author" content="{{名字}}">
<meta name="description" content="{{摘要}}">
<meta name="keywords" content="{{关键词}}">
<meta name="generator" content="Kami">
<style>
  /* Regular weight */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W04.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W04.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  /* Bold weight - W05 for all bold variants */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W05.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W05.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @page {
    size: A4;
    margin: 12mm 15mm 12mm 15mm;
    background: #f5f4ed;
  }

  @page:first {
    margin: 0;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --near-black:#141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --brand-deep:#a64f33;
    --border:    #e8e6dc;
    --border-soft:#e5e3d8;
    --tag-bg:    #E4ECF5;
    --serif: "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", Georgia, serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 12mm 15mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 10pt;
    line-height: 1.45;
    letter-spacing: 0.3pt;
  }

  .serif {
    font-family: var(--serif);
  }

  /* ════════════ COVER ════════════ */
  .cover {
    width: 100%;
    height: 297mm;
    padding: 25mm 20mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    break-after: page;
  }
  .cover-top {
    font-family: var(--serif);
    font-size: 10pt;
    color: var(--brand);
    letter-spacing: 2pt;
    text-transform: uppercase;
  }
  .cover-center {
    display: flex;
    flex-direction: column;
    gap: 14pt;
  }
  .cover-name {
    font-family: var(--serif);
    font-size: 58pt;
    font-weight: 500;
    line-height: 1.05;
    color: var(--near-black);
    letter-spacing: 1pt;
  }
  .cover-tagline {
    font-family: var(--serif);
    font-size: 18pt;
    color: var(--olive);
    line-height: 1.4;
    max-width: 80%;
  }
  .cover-line {
    width: 80pt;
    height: 2pt;
    background: var(--brand);
    margin: 18pt 0 4pt 0;
  }
  .cover-meta {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 10pt;
    color: var(--stone);
  }
  .cover-meta strong {
    color: var(--dark-warm);
    font-weight: 500;
  }

  /* ════════════ ABOUT ════════════ */
  section.about {
    break-after: page;
    padding: 10mm 0;
  }
  .about-eyebrow {
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 8pt;
  }
  .about-title {
    font-family: var(--serif);
    font-size: 32pt;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 20pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .about-lead {
    font-family: var(--serif);
    font-size: 15pt;
    line-height: 1.5;
    color: var(--dark-warm);
    margin-bottom: 24pt;
    max-width: 90%;
  }
  .about-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24pt;
  }
  .about-body p {
    line-height: 1.45;
    margin-bottom: 10pt;
  }
  .about-body h3 {
    font-family: var(--serif);
    font-size: 13pt;
    font-weight: 500;
    color: var(--near-black);
    margin-bottom: 6pt;
  }

  /* ════════════ PROJECT PAGE ════════════ */
  .project {
    break-before: page;
    break-after: page;
    padding: 8mm 0;
  }
  .project-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .project-num {
    font-family: var(--serif);
    font-size: 42pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1;
    margin-right: 18pt;
  }
  .project-title-block {
    flex: 1;
    padding-top: 6pt;
  }
  .project-type {
    font-size: 9pt;
    color: var(--brand);
    letter-spacing: 1pt;
    text-transform: uppercase;
    margin-bottom: 3pt;
  }
  .project-title {
    font-family: var(--serif);
    font-size: 22pt;
    font-weight: 500;
    color: var(--near-black);
    line-height: 1.2;
    margin-bottom: 4pt;
  }
  .project-subtitle {
    font-size: 11pt;
    color: var(--olive);
    line-height: 1.4;
  }
  .project-date {
    text-align: right;
    font-size: 9pt;
    color: var(--stone);
    font-variant-numeric: tabular-nums;
    min-width: 80pt;
    padding-top: 10pt;
  }

  /* Tags row */
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4pt;
    margin-bottom: 14pt;
  }
  .tag {
    background: var(--tag-bg);
    color: var(--brand);
    font-size: 9pt;
    font-weight: 500;
    padding: 2pt 7pt;
    border-radius: 3pt;
  }

  /* Image / Visual */
  .project-hero {
    width: 100%;
    height: 110mm;
    background: var(--ivory);
    border: 0.5pt solid var(--border-soft);
    border-radius: 6pt;
    margin-bottom: 14pt;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--stone);
    font-size: 10pt;
  }
  .project-hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 3 段式 */
  .project-body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16pt;
  }
  .project-block h3 {
    font-family: var(--serif);
    font-size: 11pt;
    font-weight: 500;
    color: var(--brand);
    margin-bottom: 4pt;
    letter-spacing: 0.3pt;
  }
  .project-block p {
    font-size: 9.5pt;
    line-height: 1.45;
    color: var(--dark-warm);
  }
  .project-block .hl {
    color: var(--brand);
    font-weight: 500;
  }

  /* Results metrics row */
  .project-results {
    display: flex;
    gap: 14pt;
    margin-top: 14pt;
    padding-top: 10pt;
    border-top: 0.5pt dotted var(--border);
  }
  .result-item {
    flex: 1;
  }
  .result-value {
    font-family: var(--serif);
    font-size: 18pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .result-label {
    font-size: 9pt;
    color: var(--olive);
    margin-top: 2pt;
    line-height: 1.3;
  }

  /* ════════════ 2-IMAGE VARIANT ════════════ */
  .project-visuals-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10pt;
    margin-bottom: 14pt;
  }
  .project-visuals-2col .project-hero {
    height: 80mm;
    margin-bottom: 0;
  }

  /* ════════════ SELECTED WORKS LIST ════════════ */
  section.more-works {
    break-before: page;
    padding-top: 10mm;
  }
  .more-works-title {
    font-family: var(--serif);
    font-size: 24pt;
    font-weight: 500;
    margin-bottom: 16pt;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .work-item {
    display: grid;
    grid-template-columns: 40pt 1fr 80pt;
    gap: 12pt;
    padding: 8pt 0;
    border-bottom: 0.3pt dotted var(--border);
    align-items: baseline;
  }
  .work-year {
    font-family: var(--serif);
    color: var(--brand);
    font-size: 11pt;
  }
  .work-title-block .title {
    font-family: var(--serif);
    font-size: 11pt;
    font-weight: 500;
    color: var(--near-black);
  }
  .work-title-block .desc {
    font-size: 9pt;
    color: var(--olive);
    margin-top: 1pt;
  }
  .work-link {
    text-align: right;
    font-size: 9pt;
    color: var(--stone);
  }

  /* ════════════ CONTACT ════════════ */
  section.contact {
    break-before: page;
    padding: 20mm 0;
    min-height: 230mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact-eyebrow {
    font-size: 10pt;
    color: var(--brand);
    letter-spacing: 2pt;
    text-transform: uppercase;
    margin-bottom: 12pt;
  }
  .contact-title {
    font-family: var(--serif);
    font-size: 48pt;
    font-weight: 500;
    line-height: 1.1;
    margin-bottom: 20pt;
    color: var(--near-black);
  }
  .contact-line {
    width: 80pt;
    height: 2pt;
    background: var(--brand);
    margin-bottom: 24pt;
  }
  .contact-list {
    font-size: 12pt;
    line-height: 1.55;
    color: var(--dark-warm);
  }
  .contact-list strong {
    color: var(--stone);
    font-weight: 500;
    font-size: 10pt;
    letter-spacing: 0.5pt;
    margin-right: 12pt;
    display: inline-block;
    min-width: 70pt;
    text-transform: uppercase;
  }
  .contact-list a {
    color: var(--brand);
    text-decoration: none;
  }

  /* ════════════ TABLE (kami-table) ════════════ */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
    margin: 10pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 5pt 8pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 4pt 8pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 3pt 6pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 2pt 6pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }
</style>
</head>
<body>

<!-- ════════════ COVER ════════════ -->
<div class="cover">
  <div class="cover-top">{{年份 或 领域标签 · 如 "Selected Works 2023–2026"}}</div>

  <div class="cover-center">
    <div class="cover-name">{{名字<br>作品集}}</div>
    <div class="cover-tagline">{{一句自我描述 / 作品集主题}}</div>
    <div class="cover-line"></div>
  </div>

  <div class="cover-meta">
    <div>
      <strong>{{专业 / 角色}}</strong><br>
      {{所在地}}
    </div>
    <div style="text-align: right;">
      {{EMAIL}}<br>
      {{网站 / 社交链接}}
    </div>
  </div>
</div>

<!-- ════════════ ABOUT ════════════ -->
<section class="about">
  <div class="about-eyebrow">About</div>
  <div class="about-title">{{一句自我定位的 headline}}</div>
  <div class="about-lead">
    {{2-3 行的自我介绍引言。serif 字体，斜体感，不写太 sales。
    用自己的语言描述你关心什么、擅长什么。}}
  </div>
  <div class="about-body">
    <div>
      <h3>经历</h3>
      <p>{{一段关于你过往经历的概述。}}</p>
    </div>
    <div>
      <h3>关注</h3>
      <p>{{一段关于你当前的关注点 / 方法论。}}</p>
    </div>
  </div>
</section>

<!-- ════════════ PROJECT 01 ════════════ -->
<section class="project">
  <div class="project-header">
    <div class="project-num">01</div>
    <div class="project-title-block">
      <div class="project-type">{{项目类型 · 如 "Product Design" / "Open Source"}}</div>
      <div class="project-title">{{项目名称}}</div>
      <div class="project-subtitle">{{一句话描述这个项目做了什么}}</div>
    </div>
    <div class="project-date">{{时间 · 如 "2025.04 - 2026.02"}}</div>
  </div>

  <div class="project-tags">
    <span class="tag">{{标签 1}}</span>
    <span class="tag">{{标签 2}}</span>
    <span class="tag">{{标签 3}}</span>
  </div>

  <!-- 主图 -->
  <div class="project-hero">
    <!-- 替换为：<img src="project-01-hero.png" alt=""> -->
    [项目主图占位 · 替换为 &lt;img src="xxx.png"&gt;]
  </div>

  <!-- 三段式正文 -->
  <div class="project-body">
    <div class="project-block">
      <h3>Context</h3>
      <p>{{为什么做这个项目？要解决什么问题？谁是用户？}}</p>
    </div>
    <div class="project-block">
      <h3>Approach</h3>
      <p>{{怎么做的？关键决策、设计考量、技术方案。}}</p>
    </div>
    <div class="project-block">
      <h3>Outcome</h3>
      <p>{{结果是什么？<span class="hl">数据</span>、反馈、影响。}}</p>
    </div>
  </div>

  <!-- 关键数据（可选）-->
  <div class="project-results">
    <div class="result-item">
      <div class="result-value">{{数字}}</div>
      <div class="result-label">{{标签}}</div>
    </div>
    <div class="result-item">
      <div class="result-value">{{数字}}</div>
      <div class="result-label">{{标签}}</div>
    </div>
    <div class="result-item">
      <div class="result-value">{{数字}}</div>
      <div class="result-label">{{标签}}</div>
    </div>
  </div>
</section>

<!-- ════════════ PROJECT 02 (双图版式) ════════════ -->
<section class="project">
  <div class="project-header">
    <div class="project-num">02</div>
    <div class="project-title-block">
      <div class="project-type">{{项目类型}}</div>
      <div class="project-title">{{项目名称}}</div>
      <div class="project-subtitle">{{一句话描述}}</div>
    </div>
    <div class="project-date">{{时间}}</div>
  </div>

  <div class="project-tags">
    <span class="tag">{{标签}}</span>
    <span class="tag">{{标签}}</span>
  </div>

  <!-- 并排两图 -->
  <div class="project-visuals-2col">
    <div class="project-hero">[左图]</div>
    <div class="project-hero">[右图]</div>
  </div>

  <div class="project-body">
    <div class="project-block">
      <h3>Context</h3>
      <p>{{背景}}</p>
    </div>
    <div class="project-block">
      <h3>Approach</h3>
      <p>{{方法}}</p>
    </div>
    <div class="project-block">
      <h3>Outcome</h3>
      <p>{{结果}}</p>
    </div>
  </div>
</section>

<!-- ════════════ MORE WORKS（可选） ════════════ -->
<section class="more-works">
  <div class="more-works-title">更多作品</div>

  <div class="work-item">
    <span class="work-year">2025</span>
    <div class="work-title-block">
      <div class="title">{{作品标题}}</div>
      <div class="desc">{{一句描述}}</div>
    </div>
    <div class="work-link">{{链接 / 状态}}</div>
  </div>

  <div class="work-item">
    <span class="work-year">2024</span>
    <div class="work-title-block">
      <div class="title">{{作品标题}}</div>
      <div class="desc">{{一句描述}}</div>
    </div>
    <div class="work-link">{{链接 / 状态}}</div>
  </div>

  <div class="work-item">
    <span class="work-year">2023</span>
    <div class="work-title-block">
      <div class="title">{{作品标题}}</div>
      <div class="desc">{{一句描述}}</div>
    </div>
    <div class="work-link">{{链接 / 状态}}</div>
  </div>
</section>

<!-- ════════════ CONTACT ════════════ -->
<section class="contact">
  <div class="contact-eyebrow">Let's Talk</div>
  <div class="contact-title">{{欢迎联系的一句话 · 如 "期待新的合作机会"}}</div>
  <div class="contact-line"></div>
  <div class="contact-list">
    <div><strong>Email</strong><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></div>
    <div><strong>Phone</strong>{{电话}}</div>
    <div><strong>Website</strong><a href="{{URL}}">{{URL}}</a></div>
    <div><strong>{{其他平台}}</strong><a href="{{URL}}">@{{ID}}</a></div>
  </div>
</section>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/resume-en.html ===
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{{NAME}} · Resume</title>
<meta name="author" content="{{NAME}}">
<meta name="description" content="{{DESCRIPTION}}">
<meta name="keywords" content="{{KEYWORDS}}">
<meta name="generator" content="Kami">
<style>
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 400; font-style: normal; }
  @font-face { font-family: "JetBrains Mono"; src: url("../fonts/JetBrainsMono.woff2") format("woff2"); font-weight: 500; font-style: normal; }

  @page {
    size: A4;
    margin: 11mm 13mm 11mm 13mm;
    background: #f5f4ed;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --sand:      #e8e6dc;
    --border:    #e8e6dc;
    --border-soft: #e5e3d8;
    --near-black: #141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --brand-tint: #EEF2F7;
    --brand-tint-strong: #E4ECF5;

    --serif: Charter, Georgia,
             Palatino, "Times New Roman", serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", "Fira Code",
             Consolas, Monaco, monospace;
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 11mm 13mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 9.4pt;
    line-height: 1.42;
    letter-spacing: 0;
  }

  .serif { font-family: var(--serif); }
  .mono  { font-family: var(--mono); }

  a { color: var(--brand); text-decoration: none; }

  /* HEADER */
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 3mm;
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding-left: 8pt;
  }
  .header > div:first-child { flex-shrink: 0; }
  .name {
    font-family: var(--serif);
    font-size: 26pt;
    font-weight: 500;
    letter-spacing: -0.2pt;
    color: var(--near-black);
    line-height: 1;
    display: flex;
    align-items: baseline;
    gap: 3mm;
    white-space: nowrap;
  }
  .alias {
    font-size: 12.5pt;
    font-weight: 400;
    color: var(--stone);
  }
  .contact {
    text-align: right;
    font-size: 9pt;
    color: var(--stone);
    line-height: 1.5;
  }
  .contact .role {
    color: var(--brand);
    font-size: 10.5pt;
    font-weight: 500;
  }
  .contact .sep { color: var(--border); margin: 0 0.4em; }
  .contact a { color: var(--dark-warm); }
  .contact .loc { color: var(--olive); font-weight: 500; }

  /* METRICS */
  .metrics { display: flex; gap: 7mm; margin-bottom: 3mm; }
  .metric {
    flex: 1;
    padding: 1mm 0;
    display: flex;
    align-items: baseline;
    gap: 2mm;
    break-inside: avoid;
  }
  .metric-value {
    font-family: var(--serif);
    font-size: 14pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .metric-value .unit {
    font-size: 10.5pt;
    margin-left: 0.5mm;
    font-weight: 500;
    color: var(--brand);
  }
  .metric-label { font-size: 9pt; color: var(--olive); line-height: 1.2; }

  /* SECTION TITLE */
  .section-title {
    font-family: var(--serif);
    font-size: 13pt;
    font-weight: 500;
    color: var(--near-black);
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding: 0 0 0 8pt;
    margin: 5mm 0 2mm 0;
    display: flex;
    align-items: baseline;
    gap: 2.5mm;
  }
  .section-title .sub {
    margin-left: auto;
    font-family: var(--sans);
    font-weight: 400;
    font-size: 9pt;
    color: var(--stone);
    letter-spacing: 0.2pt;
  }
  section:first-of-type .section-title { margin-top: 0; }
  .page-break > .section-title { margin-top: 0; }

  /* SUMMARY */
  .summary { font-size: 9.4pt; line-height: 1.42; color: var(--near-black); }
  .summary .hl { color: var(--brand); }

  /* TIMELINE */
  .timeline { display: flex; gap: 7mm; margin-bottom: 2.5mm; }
  .tl-step { flex: 1; padding: 0.8mm 0; break-inside: avoid; }
  .tl-top {
    display: flex; align-items: baseline; gap: 2mm;
    margin-bottom: 0.6mm;
  }
  .tl-year {
    font-family: var(--serif);
    font-size: 11pt; font-weight: 500;
    color: var(--brand); line-height: 1;
  }
  .tl-head {
    font-size: 11pt; font-weight: 500;
    color: var(--near-black);
  }
  .tl-body { font-size: 9pt; color: var(--olive); line-height: 1.45; }

  /* PROJECTS */
  .project {
    padding: 1.6mm 0;
    border-top: 0.4pt solid var(--border-soft);
    break-inside: avoid;
  }
  .project:first-of-type {
    border-top: 0.4pt solid var(--border);
    padding-top: 1.6mm;
  }
  .proj-head {
    display: flex; align-items: baseline;
    gap: 2mm; margin-bottom: 0.9mm;
  }
  .proj-name {
    font-family: var(--serif);
    font-size: 11pt; font-weight: 500; color: var(--near-black);
  }
  .proj-kind { font-size: 11pt; color: var(--olive); }
  .proj-role {
    font-size: 9pt; color: var(--brand); font-weight: 500;
    margin-left: auto; background: #EEF2F7;
    padding: 0.4mm 1.6mm; border-radius: 2pt; letter-spacing: 0.3pt;
    text-transform: uppercase;
  }
  .proj-lines { display: table; width: 100%; }
  .proj-row { display: table-row; }
  .proj-label {
    display: table-cell; width: 16mm;
    font-size: 9pt; color: var(--brand);
    font-weight: 500; letter-spacing: 0.4pt;
    text-transform: uppercase;
    padding: 0.4mm 0 0.4mm 0; vertical-align: top;
  }
  .proj-text {
    display: table-cell; font-size: 9.2pt;
    color: var(--near-black); line-height: 1.45;
    padding: 0 0 0.4mm 1mm;
  }
  .proj-text .hl { color: var(--brand); }

  /* PAGE 2 FORCE BREAK */
  .page-break { break-before: page; }

  /* OPEN SOURCE */
  .os-intro {
    font-size: 9.4pt; line-height: 1.45;
    color: var(--near-black);
    margin: 1.6mm 0 2.4mm 0;
    break-inside: avoid;
  }
  .os-intro .hl { color: var(--brand); }
  .os-intro .strong { color: var(--near-black); font-weight: 500; }

  .os-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 9mm; row-gap: 1.2mm;
  }
  .os-item {
    display: flex; align-items: baseline;
    gap: 2.5mm; padding: 1.2mm 0;
    border-bottom: 0.3pt dotted var(--border);
    break-inside: avoid;
  }
  .os-name {
    font-family: var(--serif);
    font-size: 10.5pt; font-weight: 500;
    flex-shrink: 0; min-width: 18mm;
  }
  .os-name a { color: var(--brand); }
  .os-desc { font-size: 9pt; color: var(--olive); line-height: 1.4; flex: 1; }
  .os-star {
    font-size: 9pt; color: var(--dark-warm);
    font-weight: 500; white-space: nowrap;
    flex-shrink: 0; min-width: 10mm; text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .os-star.big { color: var(--brand); font-size: 9.2pt; }

  .os-highlight {
    margin-top: 2.5mm;
    padding: 1.8mm 3mm;
    background: var(--brand-tint);
    border-left: 1.4pt solid var(--brand);
    border-radius: 2pt;
    font-size: 9pt; line-height: 1.45;
    color: var(--near-black);
    break-inside: avoid;
  }
  .os-highlight .hl { color: var(--brand); }
  .os-highlight .tag {
    display: inline-block;
    background: var(--brand); color: var(--ivory);
    font-size: 9pt; font-weight: 500;
    padding: 0.2mm 1.6mm; border-radius: 2pt;
    margin-right: 1.5mm; letter-spacing: 0.5pt;
    text-transform: uppercase;
    transform: translateY(-0.2mm);
  }

  /* CONVICTIONS */
  .convictions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3mm;
    margin-top: 1.4mm;
  }
  .conv-card { padding: 0 2mm 0 0; break-inside: avoid; }
  .conv-head {
    font-family: var(--serif);
    font-size: 10pt; font-weight: 500;
    color: var(--near-black); margin-bottom: 1mm;
    display: flex; align-items: baseline; gap: 2mm;
  }
  .conv-head .year {
    color: var(--brand); font-weight: 500;
    font-size: 9pt;
    font-variant-numeric: tabular-nums;
  }
  .conv-body {
    font-size: 9pt; color: var(--olive);
    line-height: 1.45;
  }
  .conv-body .hl { color: var(--brand); }

  /* IMPACT */
  .handle-strip {
    padding: 0; margin: 1.4mm 0 2mm 0;
    display: flex; align-items: baseline; gap: 3.5mm;
    break-inside: avoid;
  }
  .handle-strip .handle {
    font-family: var(--serif);
    font-size: 10pt; font-weight: 500; color: var(--brand);
    flex-shrink: 0;
  }
  .handle-strip .follower { font-size: 9pt; color: var(--stone); flex-shrink: 0; font-variant-numeric: tabular-nums; }
  .handle-strip .desc { font-size: 9pt; color: var(--olive); line-height: 1.45; flex: 1; }

  .impact-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 6mm; }
  .inf-block-title {
    margin-top: 2.5mm;
    font-family: var(--serif);
    font-size: 10pt; font-weight: 500;
    color: var(--near-black);
    margin-bottom: 1.5mm; padding-bottom: 0.5mm;
    border-bottom: 0.3pt dotted var(--border);
    display: flex; align-items: baseline; gap: 2mm;
  }
  .inf-block-title .small {
    font-family: var(--sans);
    font-size: 9pt; color: var(--stone);
    font-weight: 400;
  }
  .art-row {
    padding: 1.8mm 0;
    border-bottom: 0.3pt dotted var(--border-soft);
  }
  .talk-row {
    display: flex; justify-content: space-between;
    align-items: flex-start;
    gap: 2mm; padding: 1.8mm 0;
    border-bottom: 0.3pt dotted var(--border-soft);
  }
  .art-row:last-of-type, .talk-row:last-of-type { border-bottom: none; }
  .art-header {
    display: flex; align-items: baseline;
    justify-content: space-between;
    gap: 2mm;
  }
  .art-title, .talk-title {
    font-size: 9.2pt; color: var(--near-black);
    font-weight: 500; line-height: 1.4;
    flex: 1 1 auto; min-width: 0;
  }
  .art-stats, .talk-venue {
    font-size: 9pt; color: var(--stone);
    line-height: 1.4; margin-top: 0.6mm;
  }
  .art-stats .em-brand { color: var(--brand); }
  .art-date, .talk-date {
    font-size: 9pt; color: var(--stone);
    font-variant-numeric: tabular-nums;
    font-weight: 400;
    white-space: nowrap;
  }

  /* SKILLS */
  .skill-row {
    display: flex; gap: 3mm; padding: 1.8mm 0;
    border-bottom: 0.3pt dotted var(--border);
    align-items: baseline;
  }
  .skill-row:last-of-type { border-bottom: none; }
  .skill-label {
    font-size: 9pt; font-weight: 500;
    color: var(--brand); letter-spacing: 0.5pt;
    text-transform: uppercase;
    width: 32mm; flex-shrink: 0;
    line-height: 1.35;
  }
  .skill-body { font-size: 9.2pt; color: var(--near-black); line-height: 1.45; flex: 1; }
  .skill-body .em-brand { color: var(--brand); }

  .no-break { break-inside: avoid; }

  /* EDUCATION */
  .edu-row {
    display: flex; justify-content: space-between;
    align-items: baseline; padding: 1.8mm 0;
  }
  .edu-row .school {
    font-family: var(--serif);
    font-weight: 500; font-size: 11pt;
  }
  .edu-row .major { color: var(--olive); font-size: 9.4pt; }
  .edu-row .date { color: var(--stone); font-variant-numeric: tabular-nums; font-size: 9pt; }

  /* TABLE (kami-table) */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
    margin: 6pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 3pt 6pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 2pt 6pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 2pt 4pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 1pt 4pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }
</style>
</head>
<body>

<!-- =====================================================================
     Usage:
 - Replace all {{VAR}} placeholders with real content
 - Drop sections that don't apply (e.g. no open source -> remove that block)
 - Each project strictly three-part: ROLE / ACTIONS / IMPACT
 - Must verify: 2 pages exactly (strict)
       python3 scripts/build.py resume-en
 - Content strategy: references/writing.md
     ===================================================================== -->


<!-- ═══════════ PAGE 1 ═══════════ -->

<div class="header">
  <div>
    <div class="name serif">{{NAME}}<span class="alias">{{ALIAS_OR_PREFERRED_NAME}}</span></div>
  </div>
  <div class="contact">
    <span class="role">{{ROLE_TITLE - e.g. AI / Agent Engineer}}</span>
    <br>
    <a href="{{GITHUB_URL}}">github.com/{{GITHUB_ID}}</a>
    <span class="sep">·</span>
    <a href="{{X_URL}}">x.com/{{X_ID}}</a>
    <span class="sep">·</span>
    <a href="mailto:{{EMAIL}}">{{EMAIL}}</a>
    <span class="sep">·</span>
    <span class="loc">{{CITY}}, {{COUNTRY_OR_REGION}}</span>
  </div>
</div>

<!-- Four strongest numeric badges -->
<div class="metrics">
  <div class="metric"><span class="metric-value serif">{{NUMBER}}<span class="unit">{{UNIT}}</span></span><span class="metric-label">{{LABEL}}</span></div>
  <div class="metric"><span class="metric-value serif">{{NUMBER}}<span class="unit">{{UNIT}}</span></span><span class="metric-label">{{LABEL}}</span></div>
  <div class="metric"><span class="metric-value serif">{{NUMBER}}<span class="unit">{{UNIT}}</span></span><span class="metric-label">{{LABEL}}</span></div>
  <div class="metric"><span class="metric-value serif">{{NUMBER}}<span class="unit">{{UNIT}}</span></span><span class="metric-label">{{LABEL}}</span></div>
</div>

<section>
  <div class="section-title">Summary</div>
  <div class="summary">
    {{~50 words. Structure: current role + seniority + tenure. Team composition (size, seniority mix, cross-functional collaborators). Long-term direction. Three to five core areas of depth.}}
  </div>
</section>

<section>
  <div class="section-title">Experience<span class="sub">{{START_DATE}} - Present · {{KEY_MILESTONE}}</span></div>

  <!-- Timeline: three-step long-range arc -->
  <div class="timeline">
    <div class="tl-step">
      <div class="tl-top"><div class="tl-year serif">{{YEAR}}</div><div class="tl-head">{{STAGE_TITLE}}</div></div>
      <div class="tl-body">{{One sentence on what this stage meant.}}</div>
    </div>
    <div class="tl-step">
      <div class="tl-top"><div class="tl-year serif">{{YEAR}}</div><div class="tl-head">{{STAGE_TITLE}}</div></div>
      <div class="tl-body">{{One sentence on what this stage meant.}}</div>
    </div>
    <div class="tl-step">
      <div class="tl-top"><div class="tl-year serif">{{YEAR}}</div><div class="tl-head">{{STAGE_TITLE}}</div></div>
      <div class="tl-body">{{One sentence on what this stage meant.}}</div>
    </div>
  </div>

  <!-- Project block - repeat 3–5 times -->
  <div class="project">
    <div class="proj-head">
      <span class="proj-name serif">{{PROJECT_NAME}}</span>
      <span class="proj-kind">· {{PROJECT_TYPE}}</span>
      <span class="proj-role">{{ROLE - e.g. tech lead}}</span>
    </div>
    <div class="proj-lines">
      <div class="proj-row">
        <div class="proj-label">Role</div>
        <div class="proj-text">{{~40 words: what the project is, why it existed, what your seat at the table was.}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">Actions</div>
        <div class="proj-text">{{~55 words: technical approach, key decisions, execution path.}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">Impact</div>
        <div class="proj-text">{{~65 words: numbers-first. Highlight <span class="hl">1-2 key figures</span>.}}</div>
      </div>
    </div>
  </div>

  <div class="project">
    <div class="proj-head">
      <span class="proj-name serif">{{PROJECT_NAME}}</span>
      <span class="proj-kind">· {{PROJECT_TYPE}}</span>
      <span class="proj-role">{{ROLE}}</span>
    </div>
    <div class="proj-lines">
      <div class="proj-row">
        <div class="proj-label">Role</div>
        <div class="proj-text">{{~40 words.}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">Actions</div>
        <div class="proj-text">{{~55 words.}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">Impact</div>
        <div class="proj-text">{{~65 words, include <span class="hl">key figures</span>.}}</div>
      </div>
    </div>
  </div>

  <div class="project">
    <div class="proj-head">
      <span class="proj-name serif">{{PROJECT_NAME}}</span>
      <span class="proj-kind">· {{PROJECT_TYPE}}</span>
      <span class="proj-role">{{ROLE}}</span>
    </div>
    <div class="proj-lines">
      <div class="proj-row">
        <div class="proj-label">Role</div>
        <div class="proj-text">{{Project context and your seat.}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">Actions</div>
        <div class="proj-text">{{Execution path.}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">Impact</div>
        <div class="proj-text">{{Quantifiable outcome with <span class="hl">key figures</span>.}}</div>
      </div>
    </div>
  </div>
</section>


<!-- ═══════════ PAGE 2 ═══════════ -->

<section class="page-break">
  <div class="section-title">Open Source &amp; Indie Work<span class="sub">{{TIME_RANGE}} · {{SUBTITLE}}</span></div>

  <div class="os-intro">
    <span class="hl">{{One-line positioning statement.}}</span> {{Short sketch of your indie developer identity: design instinct, solo end-to-end delivery, cross-language range, user reception.}} Cumulative GitHub: <span class="strong">{{STARS_TOTAL}} stars · {{FORKS_TOTAL}} forks · {{FOLLOWERS_TOTAL}} followers</span>.
  </div>

  <div class="os-grid">
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{PROJECT}}</a></span>
      <span class="os-desc">{{Stack + core positioning + platform.}}</span>
      <span class="os-star big">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{PROJECT}}</a></span>
      <span class="os-desc">{{Description.}}</span>
      <span class="os-star big">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{PROJECT}}</a></span>
      <span class="os-desc">{{Description.}}</span>
      <span class="os-star">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{PROJECT}}</a></span>
      <span class="os-desc">{{Description.}}</span>
      <span class="os-star">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{PROJECT}}</a></span>
      <span class="os-desc">{{Description.}}</span>
      <span class="os-star">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{PROJECT}}</a></span>
      <span class="os-desc">{{Description.}}</span>
      <span class="os-star">★ {{STARS}}</span>
    </div>
  </div>

  <div class="os-highlight">
    <span class="tag">{{HIGHLIGHT}}</span>{{A single anecdote that sets your work apart: the moment it went viral, the notable person who shared it, the community that formed around it.}}
  </div>
</section>

<section>
  <div class="section-title">Judgment &amp; Conviction</div>
  <div class="convictions">
    <div class="conv-card">
      <div class="conv-head"><span class="year">{{DATE}}</span>{{EVENT_TITLE}}</div>
      <div class="conv-body">
        {{Specific call you made or action you took, and the downstream evidence that the judgment was right.}}
      </div>
    </div>
    <div class="conv-card">
      <div class="conv-head"><span class="year">{{DATE}}</span>{{EVENT_TITLE}}</div>
      <div class="conv-body">
        {{Specific call or action.}}
      </div>
    </div>
    <div class="conv-card">
      <div class="conv-head"><span class="year">{{DATE}}</span>{{EVENT_TITLE}}</div>
      <div class="conv-body">
        {{Specific call or action.}}
      </div>
    </div>
  </div>
</section>

<section>
  <div class="section-title">Public Impact</div>

  <div class="handle-strip">
    <span class="handle serif">{{PLATFORM}} · <a href="{{URL}}">@{{HANDLE}}</a></span>
    <span class="follower">{{FOLLOWERS}} followers</span>
    <span class="desc">{{Blog / newsletter / other content product.}}</span>
  </div>

  <div class="impact-grid">
    <div>
      <div class="inf-block-title">Selected writing<span class="small">{{SUBTITLE}}</span></div>
      <div class="art-row">
        <div class="art-header">
          <a class="art-title" href="{{URL}}">{{ARTICLE_TITLE}}</a>
          <span class="art-date">{{DATE}}</span>
        </div>
        <div class="art-stats">{{Views / likes / impact metric.}}</div>
      </div>
      <div class="art-row">
        <div class="art-header">
          <a class="art-title" href="{{URL}}">{{ARTICLE_TITLE}}</a>
          <span class="art-date">{{DATE}}</span>
        </div>
        <div class="art-stats">{{Views / likes.}}</div>
      </div>
    </div>

    <div>
      <div class="inf-block-title">Invited talks<span class="small">{{SUBTITLE}}</span></div>
      <div class="talk-row">
        <div>
          <div class="talk-title">{{TALK_TITLE}}</div>
          <div class="talk-venue">{{HOST / VENUE}}</div>
        </div>
        <div class="talk-date">{{DATE}}</div>
      </div>
      <div class="talk-row">
        <div>
          <div class="talk-title">{{TALK_TITLE}}</div>
          <div class="talk-venue">{{HOST / VENUE}}</div>
        </div>
        <div class="talk-date">{{DATE}}</div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="section-title">Core Skills</div>
  <!-- Five fixed rows, each with at least one brand-color emphasis -->
  <div class="skill-row">
    <div class="skill-label">{{SKILL_LABEL_1}}</div>
    <div class="skill-body">{{Description with at least <span class="em-brand">one emphasis</span>.}}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">{{SKILL_LABEL_2}}</div>
    <div class="skill-body">{{Description with at least <span class="em-brand">one emphasis</span>.}}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">{{SKILL_LABEL_3}}</div>
    <div class="skill-body">{{Description with at least <span class="em-brand">one emphasis</span>.}}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">{{SKILL_LABEL_4}}</div>
    <div class="skill-body">{{Description with at least <span class="em-brand">one emphasis</span>.}}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">{{SKILL_LABEL_5}}</div>
    <div class="skill-body">{{Description with at least <span class="em-brand">one emphasis</span>.}}</div>
  </div>
</section>

<section class="no-break">
  <div class="section-title">Education</div>
  <div class="edu-row">
    <div>
      <span class="school serif">{{SCHOOL}}</span>
      <span class="major"> · {{COLLEGE}} · {{MAJOR}} · {{One-line judgment-flavored note, e.g. "declined grad school, went straight to industry".}}</span>
    </div>
    <div class="date">{{DATE_RANGE}}</div>
  </div>
</section>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/resume.html ===
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{{姓名}} · 简历</title>
<meta name="author" content="{{姓名}}">
<meta name="description" content="{{摘要}}">
<meta name="keywords" content="{{关键词}}">
<meta name="generator" content="Kami">
<style>
  /* Regular weight */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W04.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W04.ttf") format("truetype");
    font-weight: 400;
    font-style: normal;
  }

  /* Bold weight - W05 for all bold variants */
  @font-face {
    font-family: "TsangerJinKai02";
    src: url("../fonts/TsangerJinKai02-W05.ttf") format("truetype"),
       url("https://cdn.jsdelivr.net/gh/tw93/Kami@main/assets/fonts/TsangerJinKai02-W05.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }

@page {
    size: A4;
    margin: 9mm 13mm 9mm 13mm;
    background: #f5f4ed;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment: #f5f4ed;
    --ivory:     #faf9f5;
    --sand:      #e8e6dc;
    --border:    #e8e6dc;
    --border-soft: #e5e3d8;
    --near-black: #141413;
    --dark-warm: #3d3d3a;
    --olive:     #504e49;
    --stone:     #6b6a64;
    --brand:     #1B365D;
    --brand-tint: #EEF2F7;          /* solid equivalent of rgba(1B365D, 0.08), avoids tag double-rectangle bug */
    --brand-tint-strong: #E4ECF5;   /* solid equivalent of rgba(1B365D, 0.14) */
    --serif: "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", Georgia, serif;
    --sans: var(--serif);
  }

  html, body { background: var(--parchment); }

  @media screen {
    body { max-width: 210mm; margin: 0 auto; padding: 9mm 13mm; }
  }

  body {
    color: var(--near-black);
    font-family: var(--serif);
    font-size: 9.2pt;
    line-height: 1.42;
    letter-spacing: 0.3pt;
  }

  .serif {
    font-family: var(--serif);
  }

  a { color: var(--brand); text-decoration: none; }

  /* HEADER */
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 3mm;
    margin-bottom: 3mm;
    border-bottom: 0.5pt solid #e3baa9;
  }
  .header > div:first-child { flex-shrink: 0; }
  .name {
    font-family: var(--serif);
    font-size: 26.5pt;
    font-weight: 500;
    letter-spacing: 0.5pt;
    color: var(--near-black);
    line-height: 1;
    margin-bottom: 0;
    display: flex;
    align-items: baseline;
    gap: 2.2mm;
    white-space: nowrap;
  }
  .alias {
    font-size: 12.5pt;
    font-weight: 400;
    color: var(--stone);
    letter-spacing: 0.2pt;
  }
  .alias::before {
    content: "";
  }
  .tagline { font-size: 9.5pt; color: var(--olive); line-height: 1.3; }
  .tagline .accent { color: var(--brand); font-weight: 500; }

  .contact {
    text-align: right;
    font-size: 9pt;
    color: var(--stone);
    line-height: 1.5;
    margin-bottom: -0.5mm;
  }
  .contact a { color: var(--dark-warm); }
  .contact .loc { color: var(--olive); font-weight: 500; }

  /* METRICS */
  .metrics { display: flex; gap: 6mm; margin-bottom: 3mm; margin-left: 0; margin-right: 0; }
  .metric {
    flex: 1;
    background: transparent;
    padding: 1mm 0;
    display: flex;
    align-items: baseline;
    gap: 1.8mm;
    break-inside: avoid;
  }
  .metric-value {
    font-family: var(--serif);
    font-size: 13pt;
    font-weight: 500;
    color: var(--brand);
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .metric-label { font-size: 9pt; color: var(--olive); line-height: 1.2; }

  .metric-value .unit {
    font-size: 10.5pt;
    margin-left: 0.3mm;
    font-weight: 500;
    color: var(--brand);
  }

  /* SECTION */
  .section-title {
    font-family: var(--serif);
    font-size: 12.5pt;
    font-weight: 500;
    color: var(--near-black);
    border-left: 2.5pt solid var(--brand);
    border-radius: 1.5pt;
    padding: 0 0 0 8pt;
    margin: 5mm 0 1.6mm 0;
    display: flex;
    align-items: baseline;
    gap: 2mm;
  }
  .section-title .sub {
    margin-left: auto;
    font-family: var(--serif);
    font-weight: 400;
    font-size: 9pt;
    color: var(--stone);
    letter-spacing: 0.3pt;
  }

  section:first-of-type .section-title { margin-top: 0; }
  .page-break > .section-title { margin-top: 0; }

  /* Unify gap from section-title bottom border to first content's first line = 3mm
     (section-title margin-bottom 1.8mm + first-child top spacing 1.2mm) */
  .section-title + .skill-row { padding-top: 1.2mm; }
  .section-title + .edu-row { padding-top: 1.2mm; }

  /* SUMMARY */
  .summary { font-size: 9.2pt; line-height: 1.42; color: var(--near-black); }
  .summary .em-brand { color: var(--brand); }
  .summary .hl { color: var(--brand); }

  /* TIMELINE */
  .timeline { display: flex; gap: 6mm; margin-bottom: 2mm; margin-left: 0; margin-right: 0; }
  .tl-step {
    flex: 1; background: transparent;
    padding: 0.8mm 0;
    break-inside: avoid;
  }
  .tl-top {
    display: flex; align-items: baseline; gap: 1.5mm;
    margin-bottom: 0.5mm;
  }
  .tl-year {
    font-family: var(--serif);
    font-size: 11pt; font-weight: 500;
    color: var(--brand); line-height: 1;
  }
  .tl-head {
    font-size: 11pt; font-weight: 500;
    color: var(--near-black);
  }
  .tl-body { font-size: 9pt; color: var(--olive); line-height: 1.40; letter-spacing: 0.3pt; }

  /* PROJECTS */
  .project {
    padding: 1.2mm 0 1.2mm 0;
    border-top: 0.4pt solid var(--border-soft);
    break-inside: avoid;
  }
  .project:first-of-type { border-top: 0.4pt solid var(--border); padding-top: 1.2mm; }
  .proj-head {
    display: flex; align-items: baseline;
    gap: 2mm; margin-bottom: 0.75mm;
  }
  .proj-name {
    font-family: var(--serif);
    font-size: 11pt; font-weight: 500; color: var(--near-black);
  }
  .proj-kind { font-size: 11pt; color: var(--olive); }
  .proj-role {
    font-size: 9pt; color: var(--brand); font-weight: 500;
    margin-left: auto; background: #EEF2F7;
    padding: 0.4mm 1.2mm; border-radius: 2pt; letter-spacing: 0.05pt;
  }
  .proj-lines { display: table; width: 100%; }
  .proj-row { display: table-row; }
  .proj-label {
    display: table-cell; width: 11mm;
    font-size: 9pt; color: var(--brand);
    font-weight: 500; letter-spacing: 0.2pt;
    padding: 0.2mm 0 0.4mm 0; vertical-align: top;
  }
  .proj-text {
    display: table-cell; font-size: 9pt;
    color: var(--near-black); line-height: 1.40; letter-spacing: 0.3pt;
    padding: 0 0 0.4mm 0.5mm;
  }
  .proj-text .hl { color: var(--brand); }

  .team-culture {
    margin-top: 2mm; padding: 1.5mm 2.5mm;
    background: transparent;
    border-left: 1.4pt solid var(--brand);
    border-radius: 2pt;
    font-size: 9pt; color: var(--olive); line-height: 1.40;
    break-inside: avoid;
  }
  .team-culture .hl { color: var(--brand); }

  /* PAGE 2 FORCE BREAK */
  .page-break { break-before: page; }

  /* OPEN SOURCE - NEW ENHANCED LAYOUT */
  .os-intro {
    font-size: 9.2pt; line-height: 1.40; letter-spacing: 0.3pt;
    color: var(--near-black);
    padding: 0; margin: 1.2mm 0 2mm 0;
    background: transparent;
    break-inside: avoid;
  }
  .os-intro .hl { color: var(--brand); }
  .os-intro .strong { color: var(--near-black); }

  .os-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8mm; row-gap: 1mm;
  }
  .os-item {
    display: flex; align-items: baseline;
    gap: 2mm; padding: 1mm 0 1mm 0;
    border-bottom: 0.3pt dotted var(--border);
    break-inside: avoid;
  }
  .os-name {
    font-family: var(--serif);
    font-size: 10pt; font-weight: 500;
    flex-shrink: 0; min-width: 14mm;
  }
  .os-name a { color: var(--brand); }
  .os-desc { font-size: 9pt; color: var(--olive); line-height: 1.40; flex: 1; }
  .os-star {
    font-size: 9pt; color: var(--dark-warm);
    font-weight: 500; white-space: nowrap; flex-shrink: 0; min-width: 7.5mm; text-align: right;
  }
  .os-star.big { color: var(--brand); font-size: 9.2pt; }

  .os-highlight {
    margin-top: 2.5mm;
    padding: 1.8mm 2.8mm;
    background: var(--brand-tint);
    border: 0.4pt solid #D6E1EE;
    border-radius: 2pt;
    font-size: 9pt; line-height: 1.40;
    color: var(--near-black);
    letter-spacing: 0.3pt;
    break-inside: avoid;
  }
  .os-highlight .hl { color: var(--brand); }
  .os-highlight .tag {
    display: inline-block;
    background: var(--brand); color: var(--ivory);
    font-size: 9pt; font-weight: 500;
    padding: 0.2mm 1.5mm; border-radius: 2pt;
    margin-right: 1.2mm; letter-spacing: 0.2pt;
    transform: translateY(-0.2mm);
  }

  /* AI CONVICTION - NEW SECTION */
  .ai-conviction {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2.5mm;
    margin-top: 1.2mm;
  }
  .ai-card {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0 2mm 0 0;
    break-inside: avoid;
  }
  .ai-card-head {
    font-family: var(--serif);
    font-size: 9.8pt; font-weight: 500;
    color: var(--near-black); margin-bottom: 0.9mm;
    display: flex; align-items: baseline; gap: 1.5mm;
  }
  .ai-card-head .year {
    color: var(--brand); font-weight: 500;
    font-size: 9pt;
  }
  .ai-card-body {
    font-size: 9pt; color: var(--olive);
    line-height: 1.40; letter-spacing: 0.3pt;
  }
  .ai-card-body .hl { color: var(--brand); }
  .ai-card-body .em-brand { color: var(--brand); }

  /* INFLUENCE */
  .twitter-strip {
    background: transparent;
    padding: 0; margin: 1.2mm 0 2mm 0;
    display: flex; align-items: baseline; gap: 3mm;
    break-inside: avoid;
  }
  .twitter-strip .handle {
    font-family: var(--serif);
    font-size: 9.8pt; font-weight: 500; color: var(--brand);
    flex-shrink: 0;
  }
  .twitter-strip .follower { font-size: 9pt; color: var(--stone); flex-shrink: 0; }
  .twitter-strip .desc { font-size: 9pt; color: var(--olive); line-height: 1.40; letter-spacing: 0.3pt; flex: 1; }

  .influence-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 5.5mm; }
  .inf-block-title {
    margin-top: 2.5mm;
    font-family: var(--serif);
    font-size: 9.8pt; font-weight: 500;
    color: var(--near-black);
    margin-bottom: 1.5mm; padding-bottom: 0.5mm;
    border-bottom: 0.3pt dotted var(--border);
    display: flex; align-items: baseline; gap: 2mm;
  }
  .inf-block-title .small {
    font-family: var(--serif);
    font-size: 9pt; color: var(--stone);
    font-weight: 400; margin-left: 0; letter-spacing: 0.2pt;
  }
  .art-row {
    padding: 1.6mm 0;
    border-bottom: 0.3pt dotted var(--border-soft);
  }
  .talk-row {
    display: flex; justify-content: space-between;
    align-items: flex-start;
    gap: 2mm; padding: 1.6mm 0;
    border-bottom: 0.3pt dotted var(--border-soft);
  }
  .art-row:last-of-type, .talk-row:last-of-type { border-bottom: none; }
  .art-header {
    display: flex; align-items: baseline;
    justify-content: space-between;
    gap: 2mm; padding-right: 3mm;
  }
  .art-title, .talk-title {
    font-size: 9pt; color: var(--near-black);
    font-weight: 500; line-height: 1.40;
    flex: 1 1 auto; min-width: 0;
  }
  .art-stats, .talk-venue {
    font-size: 9pt; color: var(--stone);
    line-height: 1.40; margin-top: 0.5mm; padding-left: 0; letter-spacing: 0.3pt;
  }
  .art-stats .em-brand {
    color: var(--brand);
  }
  .art-date {
    font-size: 9pt; color: var(--stone);
    font-variant-numeric: tabular-nums;
    font-weight: 400;
  }
  .art-stats .lang-cn, .art-stats .lang-en {
    display: inline-block;
    font-size: 9pt; font-weight: 500;
    margin-right: 0.5mm;
    letter-spacing: 0.2pt;
    color: var(--stone);
  }
  .talk-date {
    font-size: 9pt; color: var(--stone); font-weight: 500;
    white-space: nowrap; font-variant-numeric: tabular-nums;
    padding-top: 0.3mm;
  }

  /* SKILLS */
  .skill-row {
    display: flex; gap: 2.5mm; padding: 1.7mm 0;
    border-bottom: 0.3pt dotted var(--border);
    align-items: baseline;
  }
  .skill-row:last-of-type { border-bottom: none; }
  .skill-label {
    font-size: 9pt; font-weight: 500;
    color: var(--brand); letter-spacing: 0.3pt;
    width: 22mm; flex-shrink: 0;
    line-height: 1.36;
  }
  .skill-body { font-size: 9pt; color: var(--near-black); line-height: 1.40; letter-spacing: 0.3pt; flex: 1; }
  .skill-body .em-brand { color: var(--brand); }

  .no-break { break-inside: avoid; }

  /* EDUCATION */
  .edu-row {
    display: flex; justify-content: space-between;
    align-items: baseline; font-size: 9.5pt; padding: 1.7mm 0;
  }
  .edu-row .school {
    font-family: var(--serif);
    font-weight: 500; font-size: 10.7pt;
  }
  .edu-row .major { color: var(--olive); font-size: 9.5pt; }
  .edu-row .date { color: var(--stone); font-variant-numeric: tabular-nums; font-size: 9pt; }

  /* TABLE (kami-table) */
  table, .kami-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
    margin: 6pt 0;
    break-inside: avoid;
  }
  table th, .kami-table th {
    text-align: left;
    font-weight: 500;
    color: var(--dark-warm);
    padding: 3pt 6pt;
    border-bottom: 1pt solid var(--border);
    background: transparent;
  }
  table td, .kami-table td {
    padding: 2pt 6pt;
    border-bottom: 0.3pt solid var(--border-soft);
    vertical-align: top;
  }
  table.compact th, .kami-table.compact th { padding: 2pt 4pt; font-size: 8pt; }
  table.compact td, .kami-table.compact td { padding: 1pt 4pt; font-size: 8pt; line-height: 1.4; }
  table.financial td:not(:first-child), .kami-table.financial td:not(:first-child) {
    text-align: right; font-variant-numeric: tabular-nums;
  }
  table.financial th:not(:first-child), .kami-table.financial th:not(:first-child) { text-align: right; }
  table.striped tbody tr:nth-child(even) td, .kami-table.striped tbody tr:nth-child(even) td {
    background: var(--ivory);
  }
  table .total td, .kami-table .total td {
    font-weight: 500; border-top: 1pt solid var(--brand); border-bottom: none; color: var(--near-black);
  }
</style>
</head>
<body>

<!-- =====================================================================
     使用说明：
 - 所有 {{变量}} 替换为实际内容
 - 删除不适用的 section（如无开源/AI判断/对外影响力）
 - 项目可加减，每个严格遵守 角色/动作/结果 三段式
 - 改完验证：必须 2 页
       python3 -c "from weasyprint import HTML; HTML('resume.html').write_pdf('out.pdf')"
 - 内容策略详见 references/writing.md
     ===================================================================== -->


<!-- ═══════════ PAGE 1 ═══════════ -->

<div class="header">
  <div>
    <div class="name serif">{{姓名}}<span class="alias">{{别名/英文名}}</span></div>
  </div>
  <div class="contact">
    <span style="color: var(--brand); font-size: 10.5pt; font-weight: 500;">{{岗位定位，如"AI / Agent 工程"}}</span>　·　<a href="{{GITHUB_URL}}">GitHub @{{GITHUB_ID}}</a>　·　<a href="{{X_URL}}">X @{{X_ID}}</a>　·　<a href="tel:{{PHONE}}">{{PHONE}}</a>　·　<a href="mailto:{{EMAIL}}">{{EMAIL}}</a>　·　{{年龄}} 岁在{{城市}}
  </div>
</div>

<!-- 4 个最强的数字标签 -->
<div class="metrics">
  <div class="metric"><span class="metric-value serif">{{数字}}<span class="unit">{{单位}}</span></span><span class="metric-label">{{标签}}</span></div>
  <div class="metric"><span class="metric-value serif">{{数字}}<span class="unit">{{单位}}</span></span><span class="metric-label">{{标签}}</span></div>
  <div class="metric"><span class="metric-value serif">{{数字}}<span class="unit">{{单位}}</span></span><span class="metric-label">{{标签}}</span></div>
  <div class="metric"><span class="metric-value serif">{{数字}}<span class="unit">{{单位}}</span></span><span class="metric-label">{{标签}}</span></div>
</div>

<section>
  <div class="section-title">个人简介</div>
  <div class="summary">
    {{80 字以内。建议结构：现任职位 + 级别 + 时长。团队构成（人数、梯队、协作方）。长期演进方向。核心沉淀领域（4-6 个方向）。}}
  </div>
</section>

<section>
  <div class="section-title">工作经历<span class="sub">{{起始时间}} - 至今（{{关键里程碑}}）</span></div>

  <!-- Timeline 3 步：长期演进信号 -->
  <div class="timeline">
    <div class="tl-step">
      <div class="tl-top"><div class="tl-year serif">{{年份}}</div><div class="tl-head">{{阶段标题}}</div></div>
      <div class="tl-body">{{一句解释这一步的意义}}</div>
    </div>
    <div class="tl-step">
      <div class="tl-top"><div class="tl-year serif">{{年份}}</div><div class="tl-head">{{阶段标题}}</div></div>
      <div class="tl-body">{{一句解释这一步的意义}}</div>
    </div>
    <div class="tl-step">
      <div class="tl-top"><div class="tl-year serif">{{年份}}</div><div class="tl-head">{{阶段标题}}</div></div>
      <div class="tl-body">{{一句解释这一步的意义}}</div>
    </div>
  </div>

  <!-- 项目模板 - 重复此块 3-5 次 -->
  <div class="project">
    <div class="proj-head">
      <span class="proj-name serif">{{项目名}}</span>
      <span class="proj-kind">· {{项目类型}}</span>
      <span class="proj-role">{{角色定位，如"方向主导"}}</span>
    </div>
    <div class="proj-lines">
      <div class="proj-row">
        <div class="proj-label">角色</div>
        <div class="proj-text">{{~60 字：项目是什么 + 为什么做 + 你的位置}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">动作</div>
        <div class="proj-text">{{~80 字：技术方案 / 关键决策 / 执行路径}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">结果</div>
        <div class="proj-text">{{~100 字：数据为王。<span class="hl">关键数字</span> 高亮 1-2 处。}}</div>
      </div>
    </div>
  </div>

  <div class="project">
    <div class="proj-head">
      <span class="proj-name serif">{{项目名}}</span>
      <span class="proj-kind">· {{项目类型}}</span>
      <span class="proj-role">{{角色定位}}</span>
    </div>
    <div class="proj-lines">
      <div class="proj-row">
        <div class="proj-label">角色</div>
        <div class="proj-text">{{~60 字}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">动作</div>
        <div class="proj-text">{{~80 字}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">结果</div>
        <div class="proj-text">{{~100 字，含 <span class="hl">关键数字</span>}}</div>
      </div>
    </div>
  </div>

  <div class="project">
    <div class="proj-head">
      <span class="proj-name serif">{{项目名}}</span>
      <span class="proj-kind">· {{项目类型}}</span>
      <span class="proj-role">{{角色}}</span>
    </div>
    <div class="proj-lines">
      <div class="proj-row">
        <div class="proj-label">角色</div>
        <div class="proj-text">{{项目背景和定位}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">动作</div>
        <div class="proj-text">{{执行路径}}</div>
      </div>
      <div class="proj-row">
        <div class="proj-label">结果</div>
        <div class="proj-text">{{可量化结果，含 <span class="hl">关键数字</span>}}</div>
      </div>
    </div>
  </div>
</section>


<!-- ═══════════ PAGE 2 ═══════════ -->

<section class="page-break">
  <div class="section-title">开源项目 &amp; 独立开发者<span class="sub">{{时间跨度}} · {{一句副标题}}</span></div>

  <div class="os-intro">
    <span class="hl">{{一句自我定位}}</span>，{{简述开发者身份：设计审美 / 独立完成流程 / 跨语言实战 / 用户反馈}}。GitHub 累计 <span class="strong">{{STARS_TOTAL}} stars · {{FORKS_TOTAL}} forks · {{FOLLOWERS_TOTAL}} followers</span>。
  </div>

  <div class="os-grid">
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{项目名}}</a></span>
      <span class="os-desc">{{语言 + 核心定位 + 平台}}</span>
      <span class="os-star big">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{项目名}}</a></span>
      <span class="os-desc">{{描述}}</span>
      <span class="os-star big">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{项目名}}</a></span>
      <span class="os-desc">{{描述}}</span>
      <span class="os-star">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{项目名}}</a></span>
      <span class="os-desc">{{描述}}</span>
      <span class="os-star">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{项目名}}</a></span>
      <span class="os-desc">{{描述}}</span>
      <span class="os-star">★ {{STARS}}</span>
    </div>
    <div class="os-item">
      <span class="os-name serif"><a href="{{URL}}">{{项目名}}</a></span>
      <span class="os-desc">{{描述}}</span>
      <span class="os-star">★ {{STARS}}</span>
    </div>
  </div>

  <div class="os-highlight">
    <span class="tag">{{亮点 TAG}}</span>{{这个项目的独特故事：开源时机 / 传播范围 / 知名人物推荐等}}
  </div>
</section>

<section>
  <div class="section-title">AI 判断与行动</div>
  <div class="ai-conviction">
    <div class="ai-card">
      <div class="ai-card-head"><span class="year">{{时间}}</span>{{事件标题}}</div>
      <div class="ai-card-body">
        {{具体做了什么判断或行动，为什么证明判断力}}
      </div>
    </div>
    <div class="ai-card">
      <div class="ai-card-head"><span class="year">{{时间}}</span>{{事件标题}}</div>
      <div class="ai-card-body">
        {{具体做了什么判断或行动}}
      </div>
    </div>
    <div class="ai-card">
      <div class="ai-card-head"><span class="year">{{时间}}</span>{{事件标题}}</div>
      <div class="ai-card-body">
        {{具体做了什么判断或行动}}
      </div>
    </div>
  </div>
</section>

<section>
  <div class="section-title">对外影响力</div>

  <div class="twitter-strip">
    <span class="handle serif">{{平台}} · <a href="{{URL}}">@{{HANDLE}}</a></span>
    <span class="follower">{{粉丝数}} 粉丝</span>
    <span class="desc">{{博客 / 周刊 / 其他内容产品简介}}</span>
  </div>

  <div class="influence-grid">
    <div>
      <div class="inf-block-title">代表性技术长文<span class="small">{{副标题}}</span></div>
      <div class="art-row">
        <div class="art-header">
          <a class="art-title" href="{{URL}}">《{{文章标题}}》</a>
          <span class="art-date">{{日期}}</span>
        </div>
        <div class="art-stats">{{浏览量 / 赞数 / 影响力指标}}</div>
      </div>
      <div class="art-row">
        <div class="art-header">
          <a class="art-title" href="{{URL}}">《{{文章标题}}》</a>
          <span class="art-date">{{日期}}</span>
        </div>
        <div class="art-stats">{{浏览量 / 赞数}}</div>
      </div>
    </div>

    <div>
      <div class="inf-block-title">受邀演讲<span class="small">{{副标题}}</span></div>
      <div class="talk-row">
        <div>
          <div class="talk-title">《{{演讲标题}}》</div>
          <div class="talk-venue">{{主办方 / 地点}}</div>
        </div>
        <div class="talk-date">{{日期}}</div>
      </div>
      <div class="talk-row">
        <div>
          <div class="talk-title">《{{演讲标题}}》</div>
          <div class="talk-venue">{{主办方 / 地点}}</div>
        </div>
        <div class="talk-date">{{日期}}</div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="section-title">核心能力</div>
  <!-- 5 项固定结构，每项至少 1 处橙色高亮 -->
  <div class="skill-row">
    <div class="skill-label">{{能力 1<br>标签}}</div>
    <div class="skill-body">{{描述。至少 <span class="em-brand">1 处强调</span>}}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">{{能力 2<br>标签}}</div>
    <div class="skill-body">{{描述。至少 <span class="em-brand">1 处强调</span>}}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">{{能力 3<br>标签}}</div>
    <div class="skill-body">{{描述。至少 <span class="em-brand">1 处强调</span>}}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">{{能力 4<br>标签}}</div>
    <div class="skill-body">{{描述。至少 <span class="em-brand">1 处强调</span>}}</div>
  </div>
  <div class="skill-row">
    <div class="skill-label">{{能力 5<br>标签}}</div>
    <div class="skill-body">{{描述。至少 <span class="em-brand">1 处强调</span>}}</div>
  </div>
</section>

<section class="no-break">
  <div class="section-title">教育背景</div>
  <div class="edu-row">
    <div>
      <span class="school serif">{{学校}}</span>
      <span class="major">　· {{学院}} · {{专业}} · {{一句判断性描述，如"放弃保研直接就业"}}</span>
    </div>
    <div class="date">{{起止时间}}</div>
  </div>
</section>

</body>
</html>

=== FILE: .claude/skills/kami/assets/templates/slides-en.py ===
#!/usr/bin/env python3
"""
slides-en.py - parchment design system, English slide deck generator.

Usage:
  pip install python-pptx --break-system-packages
  python3 slides-en.py

Output:
  output.pptx (16:9, parchment aesthetic, Charter serif)

This is a template. Fill in your content and run it directly.
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

# ═══════════════════════════════════════════════════════════
# Design system constants
# ═══════════════════════════════════════════════════════════

PARCHMENT   = RGBColor(0xf5, 0xf4, 0xed)
IVORY       = RGBColor(0xfa, 0xf9, 0xf5)
BRAND       = RGBColor(0x1B, 0x36, 0x5D)
BRAND_DEEP  = RGBColor(0x1B, 0x36, 0x5D)
NEAR_BLACK  = RGBColor(0x14, 0x14, 0x13)
DARK_WARM   = RGBColor(0x3d, 0x3d, 0x3a)
CHARCOAL    = RGBColor(0x4d, 0x4c, 0x48)
OLIVE       = RGBColor(0x5e, 0x5d, 0x59)
STONE       = RGBColor(0x87, 0x86, 0x7f)
BORDER      = RGBColor(0xe8, 0xe6, 0xdc)
WHITE       = RGBColor(0xff, 0xff, 0xff)

# English Silicon Valley stack. PowerPoint falls back silently if the
# primary face is not installed on the viewing machine.
SERIF = "Charter"
SANS  = SERIF

SLIDE_W = Inches(13.33)
SLIDE_H = Inches(7.5)


# ═══════════════════════════════════════════════════════════
# Helpers
# ═══════════════════════════════════════════════════════════

def blank_slide(prs, bg_color=PARCHMENT):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = bg_color
    bg.line.fill.background()
    bg.shadow.inherit = False
    return slide


def add_text(slide, text, left, top, width, height,
             font=SANS, size=18, bold=False, italic=False,
             color=NEAR_BLACK, align=PP_ALIGN.LEFT,
             vanchor=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(left, top, width, height)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = 0
    tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = vanchor
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    return tb


def add_line(slide, left, top, width, color=BRAND, weight_pt=1):
    line = slide.shapes.add_connector(1, left, top, left + width, top)
    line.line.color.rgb = color
    line.line.width = Pt(weight_pt)
    return line


def add_card(slide, left, top, width, height,
             fill=IVORY, border=BORDER, border_weight=0.5):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                                  left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = fill
    card.line.color.rgb = border
    card.line.width = Pt(border_weight)
    card.shadow.inherit = False
    return card


# ═══════════════════════════════════════════════════════════
# Slide templates
# ═══════════════════════════════════════════════════════════

def cover_slide(prs, title, subtitle, author, date):
    s = blank_slide(prs)
    add_text(s, title,
             Inches(1), Inches(2.5), Inches(11.33), Inches(1.5),
             font=SERIF, size=48, color=NEAR_BLACK,
             align=PP_ALIGN.CENTER)
    add_line(s, Inches(6.17), Inches(4.3), Inches(1), weight_pt=1.5)
    add_text(s, subtitle,
             Inches(1), Inches(4.6), Inches(11.33), Inches(0.8),
             font=SANS, size=18, color=OLIVE,
             align=PP_ALIGN.CENTER)
    add_text(s, f"{author} · {date}",
             Inches(1), Inches(6.5), Inches(11.33), Inches(0.4),
             font=SANS, size=13, color=STONE,
             align=PP_ALIGN.CENTER)
    return s


def toc_slide(prs, items):
    s = blank_slide(prs)
    add_text(s, "Contents",
             Inches(1.2), Inches(0.8), Inches(10), Inches(0.8),
             font=SERIF, size=34, color=NEAR_BLACK)
    add_line(s, Inches(1.2), Inches(1.8), Inches(11), weight_pt=1)

    for i, item in enumerate(items):
        y = Inches(2.4 + i * 0.9)
        add_text(s, f"0{i+1}",
                 Inches(1.2), y, Inches(1), Inches(0.6),
                 font=SERIF, size=28, color=BRAND)
        add_text(s, item,
                 Inches(2.4), y, Inches(9), Inches(0.6),
                 font=SERIF, size=22, color=NEAR_BLACK,
                 vanchor=MSO_ANCHOR.MIDDLE)
    return s


def chapter_slide(prs, number, title):
    s = blank_slide(prs, bg_color=BRAND)
    add_text(s, f"0{number}",
             Inches(0.8), Inches(0.5), Inches(2), Inches(0.8),
             font=SERIF, size=28, color=WHITE)
    add_text(s, title,
             Inches(1), Inches(3), Inches(11.33), Inches(1.5),
             font=SERIF, size=60, color=WHITE,
             align=PP_ALIGN.CENTER)
    return s


def content_slide(prs, eyebrow, title, body, page_num=None):
    s = blank_slide(prs)
    add_text(s, eyebrow.upper(),
             Inches(1.2), Inches(0.6), Inches(10), Inches(0.4),
             font=SANS, size=11, color=STONE)
    add_text(s, title,
             Inches(1.2), Inches(1.2), Inches(11.33), Inches(1.2),
             font=SERIF, size=34, color=NEAR_BLACK)
    add_text(s, body,
             Inches(1.2), Inches(3), Inches(11), Inches(3.5),
             font=SANS, size=18, color=DARK_WARM)
    if page_num is not None:
        add_text(s, f" - {page_num:02d}",
                 Inches(11.5), Inches(6.9), Inches(1.5), Inches(0.3),
                 font=SANS, size=11, color=STONE,
                 align=PP_ALIGN.RIGHT)
    return s


def metrics_slide(prs, title, metrics):
    """metrics: [(value, label), ...]"""
    s = blank_slide(prs)
    add_text(s, title,
             Inches(1.2), Inches(0.8), Inches(11), Inches(1),
             font=SERIF, size=30, color=NEAR_BLACK,
             align=PP_ALIGN.CENTER)
    add_line(s, Inches(6.17), Inches(2), Inches(1))

    n = len(metrics)
    card_w = Inches(2.8)
    gap = Inches(0.3)
    total_w = card_w * n + gap * (n - 1)
    start = (SLIDE_W - total_w) / 2

    for i, (value, label) in enumerate(metrics):
        x = start + (card_w + gap) * i
        add_text(s, value,
                 x, Inches(3), card_w, Inches(1.5),
                 font=SERIF, size=56, color=BRAND,
                 align=PP_ALIGN.CENTER)
        add_text(s, label,
                 x, Inches(4.8), card_w, Inches(0.6),
                 font=SANS, size=14, color=OLIVE,
                 align=PP_ALIGN.CENTER)
    return s


def quote_slide(prs, quote, source):
    s = blank_slide(prs)
    add_text(s, f"\u201c{quote}\u201d",
             Inches(1.5), Inches(2.8), Inches(10.33), Inches(2.5),
             font=SERIF, size=30, color=NEAR_BLACK,
             align=PP_ALIGN.CENTER,
             vanchor=MSO_ANCHOR.MIDDLE)
    add_text(s, f" - {source}",
             Inches(1.5), Inches(5.2), Inches(10.33), Inches(0.4),
             font=SANS, size=14, color=OLIVE,
             align=PP_ALIGN.CENTER)
    return s


def ending_slide(prs, message, contact):
    s = blank_slide(prs)
    add_text(s, message,
             Inches(1), Inches(3), Inches(11.33), Inches(1.2),
             font=SERIF, size=44, color=NEAR_BLACK,
             align=PP_ALIGN.CENTER)
    add_line(s, Inches(6.17), Inches(4.5), Inches(1), weight_pt=1.5)
    add_text(s, contact,
             Inches(1), Inches(4.8), Inches(11.33), Inches(0.6),
             font=SANS, size=16, color=OLIVE,
             align=PP_ALIGN.CENTER)
    return s


# ═══════════════════════════════════════════════════════════
# Main - example deck, replace with your content
# ═══════════════════════════════════════════════════════════

def main():
    prs = Presentation()
    prs.slide_width  = SLIDE_W
    prs.slide_height = SLIDE_H

    cover_slide(prs,
        title="{{DOCUMENT_TITLE}}",
        subtitle="{{One-line description.}}",
        author="{{AUTHOR}}",
        date="2026.04")

    toc_slide(prs, items=[
        "{{Chapter 1}}",
        "{{Chapter 2}}",
        "{{Chapter 3}}",
        "Q&A",
    ])

    chapter_slide(prs, 1, "{{Chapter Title}}")

    content_slide(prs,
        eyebrow="{{Chapter · This page}}",
        title="{{Core claim as a sentence}}",
        body=("{{A short body paragraph, 18pt sans. Keep it under three lines. "
              "One slide, one core idea. The reader's attention is the scarce resource.}}"),
        page_num=5)

    metrics_slide(prs,
        title="Key Results",
        metrics=[
            ("+42%",   "Conversion lift"),
            ("3.8M",   "Monthly actives"),
            ("99.9%",  "Availability SLA"),
            ("5,000+", "QPS peak"),
        ])

    quote_slide(prs,
        quote="Good design is as little design as possible.",
        source="Dieter Rams")

    ending_slide(prs,
        message="Thank you",
        contact="{{EMAIL}} · {{WEBSITE}}")

    prs.save('output.pptx')
    print("OK: Saved output.pptx")


if __name__ == '__main__':
    main()

=== FILE: .claude/skills/kami/assets/templates/slides.py ===
#!/usr/bin/env python3
"""
gen_slides.py - parchment design system slide deck generator

用法：
  pip install python-pptx --break-system-packages
  python3 gen_slides.py

输出：
  output.pptx (16:9 宽屏, parchment 风格)

这是一个模板脚本 - 填充自己的内容后直接运行。
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

# ═══════════════════════════════════════════════════════════
# Design System Constants
# ═══════════════════════════════════════════════════════════

# 色板
PARCHMENT   = RGBColor(0xf5, 0xf4, 0xed)
IVORY       = RGBColor(0xfa, 0xf9, 0xf5)
BRAND       = RGBColor(0x1B, 0x36, 0x5D)
BRAND_DEEP  = RGBColor(0x1B, 0x36, 0x5D)
NEAR_BLACK  = RGBColor(0x14, 0x14, 0x13)
DARK_WARM   = RGBColor(0x3d, 0x3d, 0x3a)
CHARCOAL    = RGBColor(0x4d, 0x4c, 0x48)
OLIVE       = RGBColor(0x5e, 0x5d, 0x59)
STONE       = RGBColor(0x87, 0x86, 0x7f)
BORDER      = RGBColor(0xe8, 0xe6, 0xdc)
WHITE       = RGBColor(0xff, 0xff, 0xff)

# Fonts. Single serif per page. PPT falls back on the viewer's system.
# For Japanese best-effort output, set LANG = "ja" before generating.
LANG = "zh"
CN_SERIF = "Source Han Serif SC"
JA_SERIF = "YuMincho"  # Windows: Yu Mincho; Linux: Noto Serif CJK JP

SERIF = JA_SERIF if LANG == "ja" else CN_SERIF
SANS  = SERIF

# 16:9 宽屏
SLIDE_W = Inches(13.33)
SLIDE_H = Inches(7.5)


# ═══════════════════════════════════════════════════════════
# Helpers
# ═══════════════════════════════════════════════════════════

def blank_slide(prs, bg_color=PARCHMENT):
    """创建空白幻灯片，指定背景色"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])   # 6 = Blank
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE,
                                 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = bg_color
    bg.line.fill.background()
    bg.shadow.inherit = False
    return slide


def add_text(slide, text, left, top, width, height,
             font=SANS, size=18, bold=False, italic=False,
             color=NEAR_BLACK, align=PP_ALIGN.LEFT,
             vanchor=MSO_ANCHOR.TOP):
    """加一段文字"""
    tb = slide.shapes.add_textbox(left, top, width, height)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = 0
    tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = vanchor
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    return tb


def add_line(slide, left, top, width, color=BRAND, weight_pt=1):
    """加水平线"""
    line = slide.shapes.add_connector(1, left, top, left + width, top)
    line.line.color.rgb = color
    line.line.width = Pt(weight_pt)
    return line


def add_card(slide, left, top, width, height,
             fill=IVORY, border=BORDER, border_weight=0.5):
    """加卡片背景"""
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE,
                                   left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = fill
    card.line.color.rgb = border
    card.line.width = Pt(border_weight)
    card.shadow.inherit = False
    return card


# ═══════════════════════════════════════════════════════════
# Slide Templates
# ═══════════════════════════════════════════════════════════

def cover_slide(prs, title, subtitle, author, date):
    """封面：大标题 + 副标题 + 作者/日期"""
    s = blank_slide(prs)
    # 大标题（serif 44pt 居中）
    add_text(s, title,
             Inches(1), Inches(2.5), Inches(11.33), Inches(1.5),
             font=SERIF, size=44, color=NEAR_BLACK,
             align=PP_ALIGN.CENTER)
    # 品牌色短线
    add_line(s, Inches(6.17), Inches(4.2), Inches(1), weight_pt=1.5)
    # 副标题
    add_text(s, subtitle,
             Inches(1), Inches(4.5), Inches(11.33), Inches(0.8),
             font=SANS, size=18, color=OLIVE,
             align=PP_ALIGN.CENTER)
    # 作者 + 日期
    add_text(s, f"{author}　·　{date}",
             Inches(1), Inches(6.5), Inches(11.33), Inches(0.4),
             font=SANS, size=13, color=STONE,
             align=PP_ALIGN.CENTER)
    return s


def toc_slide(prs, items):
    """目录页：01 章节名 列表"""
    s = blank_slide(prs)
    add_text(s, "目录",
             Inches(1.2), Inches(0.8), Inches(10), Inches(0.8),
             font=SERIF, size=32, color=NEAR_BLACK)
    add_line(s, Inches(1.2), Inches(1.8), Inches(11), weight_pt=1)

    for i, item in enumerate(items):
        y = Inches(2.4 + i * 0.9)
        add_text(s, f"0{i+1}",
                 Inches(1.2), y, Inches(1), Inches(0.6),
                 font=SERIF, size=28, color=BRAND)
        add_text(s, item,
                 Inches(2.4), y, Inches(9), Inches(0.6),
                 font=SERIF, size=22, color=NEAR_BLACK,
                 vanchor=MSO_ANCHOR.MIDDLE)
    return s


def chapter_slide(prs, number, title):
    """章节首页：油墨蓝色背景 + 居中大标题"""
    s = blank_slide(prs, bg_color=BRAND)
    add_text(s, f"0{number}",
             Inches(0.8), Inches(0.5), Inches(2), Inches(0.8),
             font=SERIF, size=26, color=WHITE)
    add_text(s, title,
             Inches(1), Inches(3), Inches(11.33), Inches(1.5),
             font=SERIF, size=56, color=WHITE,
             align=PP_ALIGN.CENTER)
    return s


def content_slide(prs, eyebrow, title, body, page_num=None):
    """内容页：小标题 + 大标题 + 正文"""
    s = blank_slide(prs)
    # eyebrow
    add_text(s, eyebrow,
             Inches(1.2), Inches(0.6), Inches(10), Inches(0.4),
             font=SANS, size=12, color=STONE)
    # title
    add_text(s, title,
             Inches(1.2), Inches(1.2), Inches(11.33), Inches(1.2),
             font=SERIF, size=32, color=NEAR_BLACK)
    # body
    add_text(s, body,
             Inches(1.2), Inches(3), Inches(11), Inches(3.5),
             font=SANS, size=18, color=DARK_WARM)
    # page number
    if page_num is not None:
        add_text(s, f" - {page_num:02d}",
                 Inches(11.5), Inches(6.9), Inches(1.5), Inches(0.3),
                 font=SANS, size=11, color=STONE,
                 align=PP_ALIGN.RIGHT)
    return s


def metrics_slide(prs, title, metrics):
    """数据页：标题 + N 张数据卡并排
    metrics: [(value, label), ...]
    """
    s = blank_slide(prs)
    # 标题
    add_text(s, title,
             Inches(1.2), Inches(0.8), Inches(11), Inches(1),
             font=SERIF, size=28, color=NEAR_BLACK,
             align=PP_ALIGN.CENTER)
    add_line(s, Inches(6.17), Inches(2), Inches(1))

    # 数据卡
    n = len(metrics)
    card_w = Inches(2.8)
    gap = Inches(0.3)
    total_w = card_w * n + gap * (n - 1)
    start = (SLIDE_W - total_w) / 2

    for i, (value, label) in enumerate(metrics):
        x = start + (card_w + gap) * i
        # 大数字
        add_text(s, value,
                 x, Inches(3), card_w, Inches(1.5),
                 font=SERIF, size=52, color=BRAND,
                 align=PP_ALIGN.CENTER)
        # 标签
        add_text(s, label,
                 x, Inches(4.8), card_w, Inches(0.6),
                 font=SANS, size=14, color=OLIVE,
                 align=PP_ALIGN.CENTER)
    return s


def quote_slide(prs, quote, source):
    """引用页：极简，居中引文"""
    s = blank_slide(prs)
    add_text(s, f"\u201c{quote}\u201d",
             Inches(1.5), Inches(2.8), Inches(10.33), Inches(2.5),
             font=SERIF, size=28, color=NEAR_BLACK,
             align=PP_ALIGN.CENTER,
             vanchor=MSO_ANCHOR.MIDDLE)
    add_text(s, f" - {source}",
             Inches(1.5), Inches(5.2), Inches(10.33), Inches(0.4),
             font=SANS, size=14, color=OLIVE,
             align=PP_ALIGN.CENTER)
    return s


def ending_slide(prs, message, contact):
    """结束页"""
    s = blank_slide(prs)
    add_text(s, message,
             Inches(1), Inches(3), Inches(11.33), Inches(1.2),
             font=SERIF, size=40, color=NEAR_BLACK,
             align=PP_ALIGN.CENTER)
    add_line(s, Inches(6.17), Inches(4.5), Inches(1), weight_pt=1.5)
    add_text(s, contact,
             Inches(1), Inches(4.8), Inches(11.33), Inches(0.6),
             font=SANS, size=16, color=OLIVE,
             align=PP_ALIGN.CENTER)
    return s


# ═══════════════════════════════════════════════════════════
# Main: 示例 deck，按实际需求改
# ═══════════════════════════════════════════════════════════

def main():
    prs = Presentation()
    prs.slide_width  = SLIDE_W
    prs.slide_height = SLIDE_H

    # 1. 封面
    cover_slide(prs,
        title="{{文档标题}}",
        subtitle="{{一句话描述}}",
        author="{{作者}}",
        date="2026.04")

    # 2. 目录
    toc_slide(prs, items=[
        "{{章节 1}}",
        "{{章节 2}}",
        "{{章节 3}}",
        "{{Q&A}}",
    ])

    # 3. 章节首页
    chapter_slide(prs, 1, "{{章节标题}}")

    # 5. 内容页
    content_slide(prs,
        eyebrow="{{章节 · 本页}}",
        title="{{核心论点标题}}",
        body="{{一段正文，18pt sans 字体。控制在 3 行内，一屏一个核心信息。}}",
        page_num=5)

    # 7. 数据页
    metrics_slide(prs,
        title="关键结果",
        metrics=[
            ("+42%",   "转化率提升"),
            ("3.8M",   "月活用户"),
            ("99.9%",  "可用性 SLA"),
            ("5,000+", "QPS 峰值"),
        ])

    # 6. 引用
    quote_slide(prs,
        quote="好的设计是尽可能少的设计。",
        source="Dieter Rams")

    # 7. 结束
    ending_slide(prs,
        message="Thank you",
        contact="{{邮箱}}　·　{{网站}}")

    prs.save('output.pptx')
    print("OK: Saved output.pptx")


if __name__ == '__main__':
    main()


## 图表组件（assets/diagrams/）


=== FILE: .claude/skills/kami/assets/diagrams/architecture.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Architecture (kami palette)
     Components + connections in a system. One focal node, everything else
     in warm neutrals. Drop the <svg> block into a long-doc or portfolio
     figure element to embed.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Architecture · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 1000px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 860px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Architecture · kami diagram</p>
    <h1>{{System name}} in production</h1>

    <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(20,20,19,0.08)"/>
        </pattern>
        <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#504e49"/>
        </marker>
        <marker id="arrow-brand" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#1B365D"/>
        </marker>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.55"/>

      <!-- Arrows (behind nodes) -->
      <line x1="168" y1="240" x2="220" y2="240" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>
      <line x1="364" y1="240" x2="416" y2="240" stroke="#1B365D" stroke-width="1.4" marker-end="url(#arrow-brand)"/>
      <line x1="576" y1="224" x2="628" y2="180" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>
      <line x1="576" y1="256" x2="628" y2="300" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>

      <!-- Arrow labels (masked rect prevents line bleed-through) -->
      <rect x="172" y="220" width="48" height="12" rx="2" fill="#f5f4ed"/>
      <text x="196" y="230" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.1em">HTTPS</text>

      <rect x="368" y="220" width="48" height="12" rx="2" fill="#f5f4ed"/>
      <text x="392" y="230" fill="#1B365D" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.1em">SSR</text>

      <rect x="560" y="180" width="56" height="12" rx="2" fill="#f5f4ed"/>
      <text x="588" y="190" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.1em">READ</text>

      <rect x="560" y="288" width="56" height="12" rx="2" fill="#f5f4ed"/>
      <text x="588" y="298" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.1em">QUERY</text>

      <!-- Node 1: Reader (external) -->
      <rect x="40" y="208" width="128" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="40" y="208" width="128" height="64" rx="6" fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="62" y="226" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">USER</text>
      <text x="104" y="246" fill="#141413" font-size="12" font-weight="600" font-family="inherit" text-anchor="middle">Reader</text>
      <text x="104" y="262" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">Browser</text>

      <!-- Node 2: Edge / CDN (cloud) -->
      <rect x="220" y="208" width="144" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="220" y="208" width="144" height="64" rx="6" fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="242" y="226" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">EDGE</text>
      <text x="292" y="246" fill="#141413" font-size="12" font-weight="600" font-family="inherit" text-anchor="middle">CDN</text>
      <text x="292" y="262" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">cache · SSL</text>

      <!-- Node 3: Origin (FOCAL - brand accent) -->
      <rect x="416" y="208" width="160" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="416" y="208" width="160" height="64" rx="6" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="438" y="226" fill="#1B365D" font-size="7" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">ORIGIN</text>
      <text x="496" y="246" fill="#141413" font-size="12" font-weight="600" font-family="inherit" text-anchor="middle">App Server</text>
      <text x="496" y="262" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">render · route</text>

      <!-- Node 4: Store (content) -->
      <rect x="628" y="128" width="144" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="628" y="128" width="144" height="64" rx="6" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="650" y="146" fill="#141413" font-size="7" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">BUNDLE</text>
      <text x="700" y="166" fill="#141413" font-size="12" font-weight="600" font-family="inherit" text-anchor="middle">Content</text>
      <text x="700" y="182" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">*.mdx · assets</text>

      <!-- Node 5: Database (store) -->
      <rect x="628" y="288" width="144" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="628" y="288" width="144" height="64" rx="6" fill="rgba(20,20,19,0.05)" stroke="#504e49" stroke-width="1"/>
      <text x="650" y="306" fill="#504e49" font-size="7" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">STORE</text>
      <text x="700" y="326" fill="#141413" font-size="12" font-weight="600" font-family="inherit" text-anchor="middle">Database</text>
      <text x="700" y="342" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">postgres · vectors</text>

      <!-- Legend strip -->
      <line x1="40" y1="390" x2="920" y2="390" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <text x="40" y="406" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.22em">LEGEND</text>

      <rect x="40" y="422" width="14" height="10" rx="2" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="60" y="430" fill="#504e49" font-size="8.5" font-family="inherit">Focal · origin</text>

      <rect x="170" y="422" width="14" height="10" rx="2" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="190" y="430" fill="#504e49" font-size="8.5" font-family="inherit">Backend · bundle</text>

      <rect x="320" y="422" width="14" height="10" rx="2" fill="rgba(20,20,19,0.05)" stroke="#504e49" stroke-width="1"/>
      <text x="340" y="430" fill="#504e49" font-size="8.5" font-family="inherit">Store</text>

      <rect x="420" y="422" width="14" height="10" rx="2" fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="440" y="430" fill="#504e49" font-size="8.5" font-family="inherit">Cloud</text>

      <rect x="510" y="422" width="14" height="10" rx="2" fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="530" y="430" fill="#504e49" font-size="8.5" font-family="inherit">External</text>

      <line x1="620" y1="428" x2="650" y2="428" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>
      <text x="658" y="430" fill="#504e49" font-size="8.5" font-family="inherit">Standard flow</text>

      <line x1="780" y1="428" x2="810" y2="428" stroke="#1B365D" stroke-width="1.4" marker-end="url(#arrow-brand)"/>
      <text x="818" y="430" fill="#504e49" font-size="8.5" font-family="inherit">Primary path</text>
    </svg>

    <p class="caption">Focal rule: one ink-blue node per diagram, marking the component the reader should look at first. Every other box stays in warm neutrals so the accent actually means something.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/bar-chart.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Bar Chart (kami palette)
     Grouped bar chart for categorical comparison (revenue, market share, etc.)
     Up to 8 categories × 3 series. Demo: 4 quarters × 2 series.
     DATA START / DATA END marks the region Claude replaces when filling.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Bar Chart · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:    #f5f4ed;
    --ivory:        #faf9f5;
    --near-black:   #141413;
    --olive:        #504e49;
    --stone:        #6b6a64;
    --light-stone:  #b8b7b0;
    --mist:         #d4d3cd;
    --brand:        #1B365D;
    --brand-tint:   #EEF2F7;
    --grid:         #e8e7e1;
    --border:       #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 920px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 640px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Bar Chart · kami diagram</p>
    <h1>{{Chart Title}}</h1>

    <!-- ============================================================
         DATA START
         Chart area: x=60 y=40 w=560 h=280 · base y=320
         viewBox: 0 0 680 420
         Groups: 4 · group-width=140 · bar-width=32 · gap=8
         Scale: max=140 · 1 unit = 2px
         Y-axis labels: 0/20/40/60/80/100/120/140
         Series colors: brand=#1B365D  olive=#504e49
         ============================================================ -->
    <svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">

      <!-- Canvas -->
      <rect width="100%" height="100%" fill="#f5f4ed"/>

      <!-- Horizontal grid lines (y = 320 down to 40, step 40 = 20 units × 2px) -->
      <line x1="60" y1="320" x2="620" y2="320" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="280" x2="620" y2="280" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="240" x2="620" y2="240" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="200" x2="620" y2="200" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="160" x2="620" y2="160" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="120" x2="620" y2="120" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="80"  x2="620" y2="80"  stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="40"  x2="620" y2="40"  stroke="#e8e7e1" stroke-width="0.8"/>

      <!-- Y-axis labels -->
      <text x="52" y="324" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">0</text>
      <text x="52" y="284" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">20</text>
      <text x="52" y="244" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">40</text>
      <text x="52" y="204" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">60</text>
      <text x="52" y="164" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">80</text>
      <text x="52" y="124" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">100</text>
      <text x="52" y="84"  fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">120</text>
      <text x="52" y="44"  fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">140</text>

      <!-- Y-axis unit label -->
      <text x="16" y="184" fill="#6b6a64" font-size="9" font-family="'JetBrains Mono', monospace" letter-spacing="0.12em" transform="rotate(-90 16 184)" text-anchor="middle">UNIT</text>

      <!-- X-axis baseline -->
      <line x1="60" y1="320" x2="620" y2="320" stroke="#141413" stroke-width="0.8"/>

      <!-- ==================================================
           BARS · replace values between DATA START / DATA END
           Group centers: 130, 270, 410, 550
           Series A (brand) bars at: 94/234/374/514 · h from base 320
           Series B (olive) bars at: 134/274/414/554 · h from base 320
           ================================================== -->

      <!-- Group 1: x-label "2021" -->
      <!-- Series A: value 44 → height 88, top y=232 -->
      <rect x="94"  y="232" width="32" height="88" fill="#1B365D" rx="2"/>
      <!-- Series B: value 32 → height 64, top y=256 -->
      <rect x="134" y="256" width="32" height="64" fill="#504e49" rx="2"/>

      <!-- Group 2: x-label "2022" -->
      <!-- Series A: value 60 → height 120, top y=200 -->
      <rect x="234" y="200" width="32" height="120" fill="#1B365D" rx="2"/>
      <!-- Series B: value 48 → height 96, top y=224 -->
      <rect x="274" y="224" width="32" height="96"  fill="#504e49" rx="2"/>

      <!-- Group 3: x-label "2023" (focal) -->
      <!-- Series A: value 72 → height 144, top y=176 -->
      <rect x="374" y="176" width="32" height="144" fill="#1B365D" rx="2"/>
      <!-- Series B: value 64 → height 128, top y=192 -->
      <rect x="414" y="192" width="32" height="128" fill="#504e49" rx="2"/>

      <!-- Group 4: x-label "2024" -->
      <!-- Series A: value 88 → height 176, top y=144 -->
      <rect x="514" y="144" width="32" height="176" fill="#1B365D" rx="2"/>
      <!-- Series B: value 76 → height 152, top y=168 -->
      <rect x="554" y="168" width="32" height="152" fill="#504e49" rx="2"/>

      <!-- Data labels (top of each bar) -->
      <text x="110" y="228" fill="#141413" font-size="10" font-family="inherit" font-weight="500" text-anchor="middle">44</text>
      <text x="150" y="252" fill="#141413" font-size="10" font-family="inherit" text-anchor="middle">32</text>

      <text x="250" y="196" fill="#141413" font-size="10" font-family="inherit" font-weight="500" text-anchor="middle">60</text>
      <text x="290" y="220" fill="#141413" font-size="10" font-family="inherit" text-anchor="middle">48</text>

      <text x="390" y="172" fill="#141413" font-size="10" font-family="inherit" font-weight="500" text-anchor="middle">72</text>
      <text x="430" y="188" fill="#141413" font-size="10" font-family="inherit" text-anchor="middle">64</text>

      <text x="530" y="140" fill="#141413" font-size="10" font-family="inherit" font-weight="500" text-anchor="middle">88</text>
      <text x="570" y="164" fill="#141413" font-size="10" font-family="inherit" text-anchor="middle">76</text>

      <!-- X-axis category labels (group centers) -->
      <text x="130" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">2021</text>
      <text x="270" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">2022</text>
      <text x="410" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">2023</text>
      <text x="550" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">2024</text>

      <!-- ================================================== DATA END -->

      <!-- Legend -->
      <line x1="60" y1="368" x2="620" y2="368" stroke="#e8e7e1" stroke-width="0.8"/>

      <rect x="60" y="380" width="12" height="12" fill="#1B365D" rx="2"/>
      <text x="78" y="391" fill="#504e49" font-size="10" font-family="inherit">{{Series A label}}</text>

      <rect x="200" y="380" width="12" height="12" fill="#504e49" rx="2"/>
      <text x="218" y="391" fill="#504e49" font-size="10" font-family="inherit">{{Series B label}}</text>

    </svg>

    <p class="caption">{{Caption text. The focal series in ink-blue carries the primary argument. State the takeaway here, not a description of what is plotted.}}</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/candlestick.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Candlestick Chart (kami palette)
     OHLC price history for equity analysis.
     Up to 30 data points. Demo: 20 trading days.
     DATA START / DATA END marks the region Claude replaces when filling.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Candlestick Chart · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:    #f5f4ed;
    --ivory:        #faf9f5;
    --near-black:   #141413;
    --olive:        #504e49;
    --stone:        #6b6a64;
    --light-stone:  #b8b7b0;
    --brand:        #1B365D;
    --brand-tint:   #EEF2F7;
    --grid:         #e8e7e1;
    --border:       #e8e6dc;
    --up:           #1B365D;
    --down:         #6b6a64;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 920px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 640px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Candlestick · kami diagram</p>
    <h1>{{Chart Title}}</h1>

    <!-- ============================================================
         DATA START
         Chart area: x=60 y=40 w=640 h=280 · base y=320
         viewBox: 0 0 760 420
         Candles: 20 · candle-spacing=32 · body-width=16
         Price range: 100-160 · scale: 1 unit = 4.67px (280/60)
         Y-axis: 100 / 110 / 120 / 130 / 140 / 150 / 160
         Up color: #1B365D (brand) · Down color: #6b6a64 (stone)
         Wick: 1.2px stroke centered on candle
         ============================================================ -->
    <svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg">

      <!-- Canvas -->
      <rect width="100%" height="100%" fill="#f5f4ed"/>

      <!-- Horizontal grid lines (y: 320=100, 273=110, 227=120, 180=130, 133=140, 87=150, 40=160) -->
      <line x1="60" y1="320" x2="700" y2="320" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="273" x2="700" y2="273" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="227" x2="700" y2="227" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="180" x2="700" y2="180" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="133" x2="700" y2="133" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="87"  x2="700" y2="87"  stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="40"  x2="700" y2="40"  stroke="#e8e7e1" stroke-width="0.8"/>

      <!-- Y-axis labels -->
      <text x="52" y="324" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">100</text>
      <text x="52" y="277" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">110</text>
      <text x="52" y="231" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">120</text>
      <text x="52" y="184" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">130</text>
      <text x="52" y="137" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">140</text>
      <text x="52" y="91"  fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">150</text>
      <text x="52" y="44"  fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">160</text>

      <!-- Candlesticks: 20 days, x starts at 76, spacing=32
           price_to_y(p) = 320 - (p - 100) * 4.67
           Up candle: fill=#1B365D (close > open, body from open to close)
           Down candle: fill=#6b6a64 (close < open, body from close to open) -->

      <!-- Day 1: O=120 H=128 L=116 C=126 (UP) -->
      <line x1="76" y1="187" x2="76" y2="245" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="68" y="194" width="16" height="28" fill="#1B365D" rx="1"/>

      <!-- Day 2: O=126 H=132 L=122 C=130 (UP) -->
      <line x1="108" y1="171" x2="108" y2="217" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="100" y="180" width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 3: O=130 H=136 L=126 C=124 (DOWN) -->
      <line x1="140" y1="152" x2="140" y2="208" stroke="#6b6a64" stroke-width="1.2"/>
      <rect x="132" y="180" width="16" height="28" fill="#6b6a64" rx="1"/>

      <!-- Day 4: O=124 H=128 L=118 C=122 (DOWN) -->
      <line x1="172" y1="189" x2="172" y2="236" stroke="#6b6a64" stroke-width="1.2"/>
      <rect x="164" y="208" width="16" height="9" fill="#6b6a64" rx="1"/>

      <!-- Day 5: O=122 H=130 L=120 C=128 (UP) -->
      <line x1="204" y1="180" x2="204" y2="227" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="196" y="189" width="16" height="28" fill="#1B365D" rx="1"/>

      <!-- Day 6: O=128 H=134 L=126 C=132 (UP) -->
      <line x1="236" y1="161" x2="236" y2="199" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="228" y="171" width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 7: O=132 H=138 L=128 C=136 (UP) -->
      <line x1="268" y1="143" x2="268" y2="189" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="260" y="152" width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 8: O=136 H=142 L=132 C=134 (DOWN) -->
      <line x1="300" y1="124" x2="300" y2="171" stroke="#6b6a64" stroke-width="1.2"/>
      <rect x="292" y="143" width="16" height="9" fill="#6b6a64" rx="1"/>

      <!-- Day 9: O=134 H=140 L=130 C=138 (UP) -->
      <line x1="332" y1="133" x2="332" y2="180" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="324" y="143" width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 10: O=138 H=144 L=134 C=136 (DOWN) -->
      <line x1="364" y1="115" x2="364" y2="161" stroke="#6b6a64" stroke-width="1.2"/>
      <rect x="356" y="133" width="16" height="9" fill="#6b6a64" rx="1"/>

      <!-- Day 11: O=136 H=140 L=132 C=140 (UP) -->
      <line x1="396" y1="133" x2="396" y2="171" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="388" y="133" width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 12: O=140 H=146 L=136 C=144 (UP) -->
      <line x1="428" y1="105" x2="428" y2="152" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="420" y="115" width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 13: O=144 H=148 L=140 C=142 (DOWN) -->
      <line x1="460" y1="96" x2="460" y2="133" stroke="#6b6a64" stroke-width="1.2"/>
      <rect x="452" y="115" width="16" height="9" fill="#6b6a64" rx="1"/>

      <!-- Day 14: O=142 H=148 L=138 C=146 (UP) -->
      <line x1="492" y1="96" x2="492" y2="143" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="484" y="105" width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 15: O=146 H=152 L=142 C=148 (UP) -->
      <line x1="524" y1="77"  x2="524" y2="124" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="516" y="96"  width="16" height="9" fill="#1B365D" rx="1"/>

      <!-- Day 16: O=148 H=152 L=144 C=146 (DOWN) -->
      <line x1="556" y1="77"  x2="556" y2="115" stroke="#6b6a64" stroke-width="1.2"/>
      <rect x="548" y="96"  width="16" height="9" fill="#6b6a64" rx="1"/>

      <!-- Day 17: O=146 H=150 L=142 C=150 (UP) -->
      <line x1="588" y1="87"  x2="588" y2="124" stroke="#1B365D" stroke-width="1.2"/>
      <rect x="580" y="87"  width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 18: O=150 H=154 L=146 C=148 (DOWN) -->
      <line x1="620" y1="68"  x2="620" y2="96"  stroke="#6b6a64" stroke-width="1.2"/>
      <rect x="612" y="77"  width="16" height="19" fill="#6b6a64" rx="1"/>

      <!-- Day 19: O=148 H=156 L=146 C=154 (UP) -->
      <line x1="652" y1="59"  x2="652" y2="96"  stroke="#1B365D" stroke-width="1.2"/>
      <rect x="644" y="68"  width="16" height="19" fill="#1B365D" rx="1"/>

      <!-- Day 20: O=154 H=158 L=150 C=152 (DOWN) -->
      <line x1="684" y1="49"  x2="684" y2="87"  stroke="#6b6a64" stroke-width="1.2"/>
      <rect x="676" y="59"  width="16" height="9" fill="#6b6a64" rx="1"/>
      <!-- DATA END -->

      <!-- X-axis date labels (every 5th day) -->
      <text x="76"  y="340" fill="#6b6a64" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{D1}}</text>
      <text x="236" y="340" fill="#6b6a64" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{D6}}</text>
      <text x="396" y="340" fill="#6b6a64" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{D11}}</text>
      <text x="556" y="340" fill="#6b6a64" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{D16}}</text>
      <text x="684" y="340" fill="#6b6a64" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{D20}}</text>

      <!-- Legend -->
      <line x1="60" y1="368" x2="700" y2="368" stroke="#e8e7e1" stroke-width="0.8"/>

      <rect x="60" y="380" width="12" height="12" fill="#1B365D" rx="2"/>
      <text x="78" y="391" fill="#504e49" font-size="10" font-family="Charter, Georgia, serif">Up (close > open)</text>

      <rect x="240" y="380" width="12" height="12" fill="#6b6a64" rx="2"/>
      <text x="258" y="391" fill="#504e49" font-size="10" font-family="Charter, Georgia, serif">Down (close &lt; open)</text>

    </svg>

    <p class="caption">{{Caption: e.g. "20-day price action showing accumulation phase."}}</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/donut-chart.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Donut Chart (kami palette)
     Proportional distribution (spend breakdown, user segments, etc.)
     Up to 6 segments. Demo: 6-segment revenue mix.
     DATA START / DATA END marks the region Claude replaces when filling.

     Arc path formula (clockwise, starting from top -90°):
       M outer_start_x outer_start_y
       A R R 0 large-arc 1 outer_end_x outer_end_y
       L inner_end_x inner_end_y
       A r r 0 large-arc 0 inner_start_x inner_start_y
       Z
     cx=300 cy=200  R=136 (outer)  r=76 (inner)
     large-arc flag = 1 if segment > 180°, else 0
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Donut Chart · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:    #f5f4ed;
    --ivory:        #faf9f5;
    --near-black:   #141413;
    --olive:        #504e49;
    --stone:        #6b6a64;
    --light-stone:  #b8b7b0;
    --mist:         #d4d3cd;
    --brand:        #1B365D;
    --brand-tint:   #EEF2F7;
    --grid:         #e8e7e1;
    --border:       #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 920px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 640px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Donut Chart · kami diagram</p>
    <h1>{{Chart Title}}</h1>

    <!-- ============================================================
         DATA START
         viewBox: 0 0 680 420
         Donut center: cx=300 cy=200  R=136 (outer)  r=76 (inner)
         6 segments, clockwise from top (-90°):
           S1: 32%  -90° to  25.2°  fill=#1B365D  (focal/largest)
           S2: 24%  25.2° to 111.6° fill=#504e49
           S3: 18% 111.6° to 176.4° fill=#6b6a64
           S4: 12% 176.4° to 219.6° fill=#b8b7b0
           S5:  8% 219.6° to 248.4° fill=#d4d3cd
           S6:  6% 248.4° to 270°   fill=#EEF2F7 stroke=#e8e7e1
         Center text: primary label + secondary label at (300,200)
         Legend: x=476 from y=144 to y=296 step=24
         ============================================================ -->
    <svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">

      <!-- Canvas -->
      <rect width="100%" height="100%" fill="#f5f4ed"/>

      <!-- ==================================================
           DONUT SEGMENTS · replace between DATA START / DATA END
           Arc coordinates pre-computed for cx=300 cy=200 R=136 r=76
           ================================================== -->

      <!-- S1: 32% · -90° to 25.2° · span 115.2° · large-arc=0 -->
      <path d="M 300 64 A 136 136 0 0 1 423.1 257.9 L 368.8 232.4 A 76 76 0 0 0 300 124 Z"
            fill="#1B365D"/>

      <!-- S2: 24% · 25.2° to 111.6° · span 86.4° · large-arc=0 -->
      <path d="M 423.1 257.9 A 136 136 0 0 1 249.1 326.1 L 271.5 270.5 A 76 76 0 0 0 368.8 232.4 Z"
            fill="#504e49"/>

      <!-- S3: 18% · 111.6° to 176.4° · span 64.8° · large-arc=0 -->
      <path d="M 249.1 326.1 A 136 136 0 0 1 164.3 208.6 L 224.2 204.8 A 76 76 0 0 0 271.5 270.5 Z"
            fill="#6b6a64"/>

      <!-- S4: 12% · 176.4° to 219.6° · span 43.2° · large-arc=0 -->
      <path d="M 164.3 208.6 A 136 136 0 0 1 195.2 113.3 L 241.4 151.6 A 76 76 0 0 0 224.2 204.8 Z"
            fill="#b8b7b0"/>

      <!-- S5: 8% · 219.6° to 248.4° · span 28.8° · large-arc=0 -->
      <path d="M 195.2 113.3 A 136 136 0 0 1 249.8 73.6 L 271.9 129.4 A 76 76 0 0 0 241.4 151.6 Z"
            fill="#d4d3cd"/>

      <!-- S6: 6% · 248.4° to 270° · span 21.6° · large-arc=0 -->
      <path d="M 249.8 73.6 A 136 136 0 0 1 300 64 L 300 124 A 76 76 0 0 0 271.9 129.4 Z"
            fill="#EEF2F7" stroke="#e8e7e1" stroke-width="0.8"/>

      <!-- Thin separator ring over segment joins (visual polish) -->
      <circle cx="300" cy="200" r="136" fill="none" stroke="#f5f4ed" stroke-width="1.5"/>
      <circle cx="300" cy="200" r="76"  fill="none" stroke="#f5f4ed" stroke-width="1.5"/>

      <!-- Donut hole background -->
      <circle cx="300" cy="200" r="75" fill="#f5f4ed"/>

      <!-- Center label (primary value + secondary text) -->
      <text x="300" y="193" fill="#1B365D" font-size="26" font-family="inherit" font-weight="500" text-anchor="middle">32%</text>
      <text x="300" y="214" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="middle" letter-spacing="0.1em">{{CENTER LABEL}}</text>

      <!-- ================================================== DATA END -->

      <!-- Legend (right of donut) -->
      <line x1="460" y1="120" x2="460" y2="300" stroke="#e8e7e1" stroke-width="0.8"/>

      <!-- S1 -->
      <rect x="472" y="136" width="12" height="12" fill="#1B365D" rx="2"/>
      <text x="492" y="147" fill="#141413" font-size="9.5" font-family="inherit" font-weight="500">32%</text>
      <text x="532" y="147" fill="#504e49" font-size="9" font-family="inherit">{{Category A}}</text>

      <!-- S2 -->
      <rect x="472" y="160" width="12" height="12" fill="#504e49" rx="2"/>
      <text x="492" y="171" fill="#141413" font-size="9.5" font-family="inherit">24%</text>
      <text x="532" y="171" fill="#504e49" font-size="9" font-family="inherit">{{Category B}}</text>

      <!-- S3 -->
      <rect x="472" y="184" width="12" height="12" fill="#6b6a64" rx="2"/>
      <text x="492" y="195" fill="#141413" font-size="9.5" font-family="inherit">18%</text>
      <text x="532" y="195" fill="#504e49" font-size="9" font-family="inherit">{{Category C}}</text>

      <!-- S4 -->
      <rect x="472" y="208" width="12" height="12" fill="#b8b7b0" rx="2"/>
      <text x="492" y="219" fill="#141413" font-size="9.5" font-family="inherit">12%</text>
      <text x="532" y="219" fill="#504e49" font-size="9" font-family="inherit">{{Category D}}</text>

      <!-- S5 -->
      <rect x="472" y="232" width="12" height="12" fill="#d4d3cd" rx="2"/>
      <text x="492" y="243" fill="#141413" font-size="9.5" font-family="inherit">8%</text>
      <text x="532" y="243" fill="#504e49" font-size="9" font-family="inherit">{{Category E}}</text>

      <!-- S6 -->
      <rect x="472" y="256" width="12" height="12" fill="#EEF2F7" stroke="#e8e7e1" stroke-width="0.8" rx="2"/>
      <text x="492" y="267" fill="#141413" font-size="9.5" font-family="inherit">6%</text>
      <text x="532" y="267" fill="#504e49" font-size="9" font-family="inherit">{{Category F}}</text>

      <!-- Bottom rule -->
      <line x1="60" y1="380" x2="620" y2="380" stroke="#e8e7e1" stroke-width="0.8"/>
      <text x="60" y="397" fill="#6b6a64" font-size="9" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">TOTAL · 100%</text>
      <text x="460" y="397" fill="#6b6a64" font-size="9" font-family="inherit">{{Source / period}}</text>

    </svg>

    <p class="caption">{{Caption text. The ink-blue segment is the focal category. Lead with the insight, not the breakdown.}}</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/flowchart.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Flowchart (kami palette)
     Decision logic with branches. One focal decision, two to four outcomes.
     Use when the structure IS the point. If a table communicates the
     same thing, use a table instead.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Flowchart · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 960px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 820px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Flowchart · kami diagram</p>
    <h1>{{Question the flow answers}}</h1>

    <svg viewBox="0 0 860 520" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#504e49"/>
        </marker>
        <marker id="arrow-brand" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#1B365D"/>
        </marker>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>

      <!-- ========== Flow ========== -->
      <!-- Start → Check -->
      <line x1="430" y1="72" x2="430" y2="112" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>

      <!-- Check → Decision (focal) -->
      <line x1="430" y1="176" x2="430" y2="216" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>

      <!-- Decision → Yes branch (brand) -->
      <path d="M 360 268 L 200 268 L 200 332" fill="none" stroke="#1B365D" stroke-width="1.4" marker-end="url(#arrow-brand)"/>
      <rect x="170" y="284" width="34" height="14" rx="2" fill="#f5f4ed"/>
      <text x="187" y="294" fill="#1B365D" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.12em">YES</text>

      <!-- Decision → No branch -->
      <path d="M 500 268 L 660 268 L 660 332" fill="none" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>
      <rect x="636" y="284" width="30" height="14" rx="2" fill="#f5f4ed"/>
      <text x="651" y="294" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.12em">NO</text>

      <!-- Yes outcome → End -->
      <path d="M 200 396 L 200 440 L 396 440" fill="none" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>

      <!-- No outcome → End -->
      <path d="M 660 396 L 660 440 L 464 440" fill="none" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>

      <!-- ========== Nodes ========== -->

      <!-- Start (pill) -->
      <rect x="360" y="40" width="140" height="32" rx="16" fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="430" y="58" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">Start</text>

      <!-- Check step -->
      <rect x="350" y="112" width="160" height="64" rx="6" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="364" y="130" fill="#504e49" font-size="7" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">STEP 01</text>
      <text x="430" y="150" fill="#141413" font-size="12" font-weight="600" font-family="inherit" text-anchor="middle">{{Describe input}}</text>
      <text x="430" y="166" fill="#504e49" font-size="9" font-family="inherit" text-anchor="middle">one short line</text>

      <!-- Decision diamond (FOCAL) -->
      <polygon points="430,216 500,242 500,268 430,320 360,268 360,242"
               fill="#EEF2F7" stroke="#1B365D" stroke-width="1.2"/>
      <text x="430" y="266" fill="#141413" font-size="11" font-weight="600" font-family="inherit" text-anchor="middle">{{Decision}}</text>
      <text x="430" y="282" fill="#1B365D" font-size="8" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.15em">BRANCH</text>

      <!-- Yes outcome -->
      <rect x="120" y="332" width="160" height="64" rx="6" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="134" y="350" fill="#504e49" font-size="7" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">OUTCOME A</text>
      <text x="200" y="370" fill="#141413" font-size="12" font-weight="600" font-family="inherit" text-anchor="middle">{{Path taken}}</text>
      <text x="200" y="386" fill="#504e49" font-size="9" font-family="inherit" text-anchor="middle">what happens next</text>

      <!-- No outcome -->
      <rect x="580" y="332" width="160" height="64" rx="6" fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="594" y="350" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace" letter-spacing="0.15em">OUTCOME B</text>
      <text x="660" y="370" fill="#141413" font-size="12" font-weight="600" font-family="inherit" text-anchor="middle">{{Alt path}}</text>
      <text x="660" y="386" fill="#504e49" font-size="9" font-family="inherit" text-anchor="middle">skipped / deferred</text>

      <!-- End (pill) -->
      <rect x="396" y="424" width="68" height="32" rx="16" fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="430" y="442" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">End</text>

      <!-- Legend -->
      <line x1="40" y1="484" x2="820" y2="484" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <text x="40" y="500" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.22em">LEGEND</text>

      <polygon points="180,492 192,498 180,504 168,498" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="202" y="502" fill="#504e49" font-size="8.5" font-family="inherit">Focal decision</text>

      <rect x="310" y="494" width="14" height="10" rx="2" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="330" y="502" fill="#504e49" font-size="8.5" font-family="inherit">Step · outcome</text>

      <rect x="440" y="494" width="14" height="10" rx="16" fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="460" y="502" fill="#504e49" font-size="8.5" font-family="inherit">Start · end</text>

      <rect x="560" y="494" width="14" height="10" rx="2" fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="580" y="502" fill="#504e49" font-size="8.5" font-family="inherit">Deferred branch</text>
    </svg>

    <p class="caption">The decision diamond carries the accent. Its two branches diverge into equal weights so the reader sees the question, not an implied answer.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/layer-stack.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Layer Stack (kami palette)
     Horizontal bands stacked vertically, showing system layers.
     One focal layer in ink-blue; request/response flow on the sides.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Layer Stack · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 1000px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 860px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Layer Stack · kami diagram</p>
    <h1>{{System name}} architecture layers</h1>

    <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(20,20,19,0.08)"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.55"/>

      <!-- ── Layer bands (x=96 w=724) ── -->

      <!-- L1: Presentation, y=52, h=56 -->
      <rect x="96" y="52" width="724" height="56" rx="4" fill="#faf9f5" stroke="#141413" stroke-width="1"/>
      <text x="128" y="74" fill="#141413" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">01</text>
      <text x="152" y="74" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit">Presentation</text>
      <text x="152" y="94" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace">
            UI · views · routing</text>

      <!-- L2: Business Logic, y=116, h=56, FOCAL -->
      <rect x="96" y="116" width="724" height="56" rx="4" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="128" y="138" fill="#1B365D" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">02 · FOCAL</text>
      <text x="224" y="138" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit">Business Logic</text>
      <text x="224" y="158" fill="#1B365D" font-size="9" font-family="'JetBrains Mono', monospace">
            rules · validation · orchestration</text>

      <!-- L3: Data Access, y=180, h=56 -->
      <rect x="96" y="180" width="724" height="56" rx="4"
            fill="#f5f4ed" stroke="#504e49" stroke-width="1"/>
      <text x="128" y="202" fill="#504e49" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">03</text>
      <text x="152" y="202" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit">Data Access</text>
      <text x="152" y="222" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace">
            repositories · queries · cache</text>

      <!-- L4: Storage, y=244, h=56 -->
      <rect x="96" y="244" width="724" height="56" rx="4"
            fill="#f0efe8" stroke="#6b6a64" stroke-width="1"/>
      <text x="128" y="266" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">04</text>
      <text x="152" y="266" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit">Storage</text>
      <text x="152" y="286" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace">
            database · object store · search index</text>

      <!-- L5: Infrastructure, y=308, h=56 -->
      <rect x="96" y="308" width="724" height="56" rx="4"
            fill="#eae9e1" stroke="#b8b7b0" stroke-width="1"/>
      <text x="128" y="330" fill="#b8b7b0" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">05</text>
      <text x="152" y="330" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit">Infrastructure</text>
      <text x="152" y="350" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace">
            cloud · network · runtime</text>

      <!-- ── Left: REQUEST down-arrow ── -->
      <line x1="52" y1="64" x2="52" y2="352" stroke="#504e49" stroke-width="1.2"/>
      <path d="M 47,346 L 52,352 L 57,346"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="28" y="192" width="48" height="12" rx="2" fill="#f5f4ed"/>
      <text x="52" y="202" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.1em">REQUEST</text>

      <!-- ── Right: RESPONSE up-arrow ── -->
      <line x1="872" y1="352" x2="872" y2="64" stroke="#1B365D" stroke-width="1.4"/>
      <path d="M 867,70 L 872,64 L 877,70"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="848" y="192" width="52" height="12" rx="2" fill="#f5f4ed"/>
      <text x="872" y="202" fill="#1B365D" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.1em">RESPONSE</text>

      <!-- ── Legend ── -->
      <line x1="40" y1="388" x2="920" y2="388" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <text x="40" y="404" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.22em">LEGEND</text>

      <rect x="40" y="418" width="14" height="10" rx="2" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="60" y="426" fill="#504e49" font-size="8.5" font-family="inherit">Focal layer</text>

      <rect x="170" y="418" width="14" height="10" rx="2" fill="#faf9f5" stroke="#141413" stroke-width="1"/>
      <text x="190" y="426" fill="#504e49" font-size="8.5" font-family="inherit">Top layer</text>

      <rect x="290" y="418" width="14" height="10" rx="2" fill="#eae9e1" stroke="#b8b7b0" stroke-width="1"/>
      <text x="310" y="426" fill="#504e49" font-size="8.5" font-family="inherit">Foundation</text>

      <line x1="420" y1="424" x2="452" y2="424" stroke="#504e49" stroke-width="1.2"/>
      <path d="M 446,420 L 452,424 L 446,428"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>
      <text x="460" y="427" fill="#504e49" font-size="8.5" font-family="inherit">Request direction</text>

      <line x1="620" y1="424" x2="652" y2="424" stroke="#1B365D" stroke-width="1.4"/>
      <path d="M 646,420 L 652,424 L 646,428"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>
      <text x="660" y="427" fill="#504e49" font-size="8.5" font-family="inherit">Response direction</text>
    </svg>

    <p class="caption">Focal rule: one layer in ink-blue marks where the most domain-specific logic lives. Layers above carry user-facing concerns; layers below carry infrastructure. Side arrows orient the reader to flow direction without cluttering the bands.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/line-chart.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Line Chart (kami palette)
     Trend lines for time-series or ordered data (stock price, growth rate, etc.)
     Up to 12 points × 3 lines. Demo: 8 months × 2 lines.
     DATA START / DATA END marks the region Claude replaces when filling.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Line Chart · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:    #f5f4ed;
    --ivory:        #faf9f5;
    --near-black:   #141413;
    --olive:        #504e49;
    --stone:        #6b6a64;
    --brand:        #1B365D;
    --brand-tint:   #EEF2F7;
    --grid:         #e8e7e1;
    --border:       #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 920px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 640px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Line Chart · kami diagram</p>
    <h1>{{Chart Title}}</h1>

    <!-- ============================================================
         DATA START
         Chart area: x=60 y=40 w=560 h=280 · base y=320
         viewBox: 0 0 680 420
         Points: 8 · x-spacing=80 · x positions: 60,140,220,300,380,460,540,620
         Scale: max=140 · 1 unit = 2px · y = 320 - value×2
         Y-axis labels: 0/20/40/60/80/100/120/140
         Line 1 (brand): stroke=#1B365D  · dot fill=#1B365D
         Line 2 (olive): stroke=#504e49  · dot fill=white stroke=#504e49
         ============================================================ -->
    <svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">

      <!-- Canvas -->
      <rect width="100%" height="100%" fill="#f5f4ed"/>

      <!-- Horizontal grid lines -->
      <line x1="60" y1="320" x2="620" y2="320" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="280" x2="620" y2="280" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="240" x2="620" y2="240" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="200" x2="620" y2="200" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="160" x2="620" y2="160" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="120" x2="620" y2="120" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="80"  x2="620" y2="80"  stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="40"  x2="620" y2="40"  stroke="#e8e7e1" stroke-width="0.8"/>

      <!-- Vertical grid lines (at each data point) -->
      <line x1="140" y1="40" x2="140" y2="320" stroke="#e8e7e1" stroke-width="0.5" stroke-dasharray="3 4"/>
      <line x1="220" y1="40" x2="220" y2="320" stroke="#e8e7e1" stroke-width="0.5" stroke-dasharray="3 4"/>
      <line x1="300" y1="40" x2="300" y2="320" stroke="#e8e7e1" stroke-width="0.5" stroke-dasharray="3 4"/>
      <line x1="380" y1="40" x2="380" y2="320" stroke="#e8e7e1" stroke-width="0.5" stroke-dasharray="3 4"/>
      <line x1="460" y1="40" x2="460" y2="320" stroke="#e8e7e1" stroke-width="0.5" stroke-dasharray="3 4"/>
      <line x1="540" y1="40" x2="540" y2="320" stroke="#e8e7e1" stroke-width="0.5" stroke-dasharray="3 4"/>

      <!-- Y-axis labels -->
      <text x="52" y="324" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">0</text>
      <text x="52" y="284" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">20</text>
      <text x="52" y="244" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">40</text>
      <text x="52" y="204" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">60</text>
      <text x="52" y="164" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">80</text>
      <text x="52" y="124" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">100</text>
      <text x="52" y="84"  fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">120</text>
      <text x="52" y="44"  fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="end">140</text>

      <!-- Y-axis unit label -->
      <text x="16" y="184" fill="#6b6a64" font-size="9" font-family="'JetBrains Mono', monospace" letter-spacing="0.12em" transform="rotate(-90 16 184)" text-anchor="middle">UNIT</text>

      <!-- X-axis baseline -->
      <line x1="60" y1="320" x2="620" y2="320" stroke="#141413" stroke-width="0.8"/>

      <!-- ==================================================
           LINES AND DOTS · replace values between DATA START / DATA END
           x positions: 60 140 220 300 380 460 540 620
           y = 320 - value × 2  (max 140 fills chart height 280)

           Demo data:
           Line 1 (brand): 52, 60, 56, 72, 80, 76, 88, 96
             y:            216,200,208,176,160,168,144,128
           Line 2 (olive): 36, 44, 48, 52, 60, 64, 68, 76
             y:            248,232,224,216,200,192,184,168
           ================================================== -->

      <!-- Line 1 (brand #1B365D) -->
      <polyline
        points="60,216 140,200 220,208 300,176 380,160 460,168 540,144 620,128"
        fill="none" stroke="#1B365D" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>

      <!-- Line 2 (olive #504e49) -->
      <polyline
        points="60,248 140,232 220,224 300,216 380,200 460,192 540,184 620,168"
        fill="none" stroke="#504e49" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="5 3"/>

      <!-- Dots · Line 1 (brand, filled) -->
      <circle cx="60"  cy="216" r="4" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <circle cx="140" cy="200" r="4" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <circle cx="220" cy="208" r="4" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <circle cx="300" cy="176" r="4" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <circle cx="380" cy="160" r="4" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <circle cx="460" cy="168" r="4" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <circle cx="540" cy="144" r="4" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <!-- Focal dot (last point) slightly larger -->
      <circle cx="620" cy="128" r="5.5" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>

      <!-- Dots · Line 2 (olive, open) -->
      <circle cx="60"  cy="248" r="3.5" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>
      <circle cx="140" cy="232" r="3.5" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>
      <circle cx="220" cy="224" r="3.5" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>
      <circle cx="300" cy="216" r="3.5" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>
      <circle cx="380" cy="200" r="3.5" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>
      <circle cx="460" cy="192" r="3.5" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>
      <circle cx="540" cy="184" r="3.5" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>
      <circle cx="620" cy="168" r="3.5" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>

      <!-- End-of-line value labels -->
      <text x="628" y="132" fill="#1B365D" font-size="11" font-family="inherit" font-weight="600">96</text>
      <text x="628" y="172" fill="#504e49" font-size="10" font-family="inherit">76</text>

      <!-- X-axis labels -->
      <text x="60"  y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">Jan</text>
      <text x="140" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">Feb</text>
      <text x="220" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">Mar</text>
      <text x="300" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">Apr</text>
      <text x="380" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">May</text>
      <text x="460" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">Jun</text>
      <text x="540" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">Jul</text>
      <text x="620" y="340" fill="#141413" font-size="11" font-family="inherit" text-anchor="middle">Aug</text>

      <!-- ================================================== DATA END -->

      <!-- Legend -->
      <line x1="60" y1="368" x2="620" y2="368" stroke="#e8e7e1" stroke-width="0.8"/>

      <!-- Line 1 legend: solid segment + dot -->
      <line x1="60" y1="386" x2="84" y2="386" stroke="#1B365D" stroke-width="2" stroke-linecap="round"/>
      <circle cx="72" cy="386" r="3.5" fill="#1B365D"/>
      <text x="92" y="390" fill="#504e49" font-size="10" font-family="inherit">{{Line 1 label}}</text>

      <!-- Line 2 legend: dashed segment + open dot -->
      <line x1="220" y1="386" x2="244" y2="386" stroke="#504e49" stroke-width="1.5" stroke-dasharray="5 3" stroke-linecap="round"/>
      <circle cx="232" cy="386" r="3" fill="#f5f4ed" stroke="#504e49" stroke-width="1.5"/>
      <text x="252" y="390" fill="#504e49" font-size="10" font-family="inherit">{{Line 2 label}}</text>

    </svg>

    <p class="caption">{{Caption text. The ink-blue line carries the primary trend argument. State what the trend means, not what was plotted.}}</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/quadrant.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Quadrant (kami palette)
     Two-axis positioning. 4 quadrants, 6-10 plotted points, 1-2 focal.
     Classic use: Impact × Effort, Reach × Confidence, Urgency × Importance.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Quadrant · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 920px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 780px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Quadrant · kami diagram</p>
    <h1>{{X axis}} × {{Y axis}}</h1>

    <svg viewBox="0 0 820 540" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#504e49"/>
        </marker>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>

      <!-- Quadrant zones (subtle background tint on the "preferred" quadrant) -->
      <rect x="80" y="60" width="660" height="380" fill="none" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <rect x="410" y="60" width="330" height="190" fill="rgba(201,100,66,0.04)"/>

      <!-- Cross axes (through midpoint) -->
      <line x1="80" y1="250" x2="740" y2="250" stroke="rgba(20,20,19,0.18)" stroke-width="0.8"/>
      <line x1="410" y1="60" x2="410" y2="440" stroke="rgba(20,20,19,0.18)" stroke-width="0.8"/>

      <!-- Axis arrows + labels -->
      <line x1="80" y1="460" x2="740" y2="460" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>
      <line x1="60" y1="440" x2="60" y2="60" stroke="#504e49" stroke-width="1.2" marker-end="url(#arrow)"/>

      <text x="410" y="480" fill="#141413" font-size="11" font-weight="600" font-family="inherit" text-anchor="middle" letter-spacing="0.08em">{{X axis · low to high}}</text>
      <text x="30" y="250" fill="#141413" font-size="11" font-weight="600" font-family="inherit" text-anchor="middle" letter-spacing="0.08em" transform="rotate(-90 30 250)">{{Y axis · low to high}}</text>

      <!-- Quadrant labels -->
      <text x="244" y="88" fill="#6b6a64" font-size="8.5" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.22em">HIGH-Y · LOW-X</text>
      <text x="244" y="102" fill="#504e49" font-size="10" font-family="inherit" text-anchor="middle" font-style="italic">incubate</text>

      <text x="576" y="88" fill="#1B365D" font-size="8.5" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.22em">HIGH-Y · HIGH-X</text>
      <text x="576" y="102" fill="#1B365D" font-size="10" font-family="inherit" text-anchor="middle" font-style="italic" font-weight="500">do first</text>

      <text x="244" y="428" fill="#6b6a64" font-size="8.5" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.22em">LOW-Y · LOW-X</text>
      <text x="244" y="420" fill="#6b6a64" font-size="10" font-family="inherit" text-anchor="middle" font-style="italic">drop</text>

      <text x="576" y="428" fill="#6b6a64" font-size="8.5" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="0.22em">LOW-Y · HIGH-X</text>
      <text x="576" y="420" fill="#504e49" font-size="10" font-family="inherit" text-anchor="middle" font-style="italic">delegate</text>

      <!-- Plotted points -->
      <!-- 1: Top-left (incubate) -->
      <circle cx="190" cy="180" r="5" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="200" y="184" fill="#141413" font-size="10" font-family="inherit" font-weight="500">{{Item A}}</text>

      <!-- 2: Top-right FOCAL (do first) -->
      <circle cx="550" cy="140" r="6.5" fill="#1B365D" stroke="#1B365D" stroke-width="1"/>
      <text x="562" y="145" fill="#1B365D" font-size="11" font-family="inherit" font-weight="600">{{Item B · focal}}</text>

      <!-- 3: Top-right secondary -->
      <circle cx="640" cy="200" r="5" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="650" y="204" fill="#141413" font-size="10" font-family="inherit" font-weight="500">{{Item C}}</text>

      <!-- 4: Top-right -->
      <circle cx="490" cy="210" r="5" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="500" y="214" fill="#141413" font-size="10" font-family="inherit">{{Item D}}</text>

      <!-- 5: Bottom-right (delegate) -->
      <circle cx="580" cy="350" r="4.5" fill="rgba(20,20,19,0.05)" stroke="#504e49" stroke-width="1"/>
      <text x="590" y="354" fill="#504e49" font-size="10" font-family="inherit">{{Item E}}</text>

      <!-- 6: Bottom-left (drop) -->
      <circle cx="180" cy="380" r="4" fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="190" y="384" fill="#6b6a64" font-size="10" font-family="inherit">{{Item F}}</text>

      <!-- 7: Bottom-left -->
      <circle cx="280" cy="340" r="4" fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="290" y="344" fill="#6b6a64" font-size="10" font-family="inherit">{{Item G}}</text>

      <!-- 8: Near center -->
      <circle cx="380" cy="270" r="4" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="390" y="274" fill="#141413" font-size="10" font-family="inherit">{{Item H}}</text>

      <!-- Legend -->
      <line x1="40" y1="502" x2="780" y2="502" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <text x="40" y="518" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace" letter-spacing="0.22em">LEGEND</text>

      <circle cx="180" cy="514" r="5" fill="#1B365D" stroke="#1B365D" stroke-width="1"/>
      <text x="192" y="518" fill="#504e49" font-size="8.5" font-family="inherit">Focal · do first</text>

      <circle cx="328" cy="514" r="5" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="340" y="518" fill="#504e49" font-size="8.5" font-family="inherit">Near-focal</text>

      <circle cx="450" cy="514" r="5" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="462" y="518" fill="#504e49" font-size="8.5" font-family="inherit">Standard</text>

      <circle cx="555" cy="514" r="5" fill="rgba(20,20,19,0.05)" stroke="#504e49" stroke-width="1"/>
      <text x="567" y="518" fill="#504e49" font-size="8.5" font-family="inherit">Secondary</text>

      <circle cx="660" cy="514" r="5" fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="672" y="518" fill="#504e49" font-size="8.5" font-family="inherit">Drop</text>
    </svg>

    <p class="caption">The ink-blue point is where the reader's eye lands. The tinted upper-right quadrant is the preferred region. Everything else recedes so the judgment reads instantly.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/state-machine.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · State Machine (kami palette)
     Finite states + directed transitions. One focal state, everything
     else in warm neutrals. Drop the <svg> block into a long-doc figure.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>State Machine · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 1000px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 860px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">State Machine · kami diagram</p>
    <h1>{{Component name}} lifecycle</h1>

    <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(20,20,19,0.08)"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.55"/>

      <!-- ── Back arc: Processing → Idle (reset / timeout) ── -->
      <path d="M 560,196 Q 356,120 152,196"
            fill="none" stroke="#504e49" stroke-width="1.2" stroke-dasharray="4,3"/>
      <rect x="328" y="120" width="56" height="12" rx="2" fill="#f5f4ed"/>
      <text x="356" y="130" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.1em">RESET</text>
      <!-- Left-pointing chevron at Idle top -->
      <path d="M 158,191 L 152,196 L 158,201"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>

      <!-- ── Forward arrows (behind nodes) ── -->
      <!-- Start dot → Idle -->
      <line x1="46" y1="228" x2="80" y2="228" stroke="#6b6a64" stroke-width="1.2"/>
      <path d="M 74,224 L 80,228 L 74,232"
            fill="none" stroke="#6b6a64" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Idle → Active -->
      <line x1="224" y1="228" x2="284" y2="228" stroke="#1B365D" stroke-width="1.4"/>
      <rect x="226" y="218" width="56" height="12" rx="2" fill="#f5f4ed"/>
      <text x="254" y="228" fill="#1B365D" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.1em">TRIGGER</text>
      <path d="M 278,224 L 284,228 L 278,232"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Active → Processing -->
      <line x1="428" y1="228" x2="488" y2="228" stroke="#504e49" stroke-width="1.2"/>
      <rect x="430" y="218" width="56" height="12" rx="2" fill="#f5f4ed"/>
      <text x="458" y="228" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.1em">SUBMIT</text>
      <path d="M 482,224 L 488,228 L 482,232"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Processing → Done -->
      <line x1="632" y1="228" x2="720" y2="228" stroke="#504e49" stroke-width="1.2"/>
      <rect x="634" y="218" width="84" height="12" rx="2" fill="#f5f4ed"/>
      <text x="676" y="228" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.1em">COMPLETE</text>
      <path d="M 714,224 L 720,228 L 714,232"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Done → End marker -->
      <line x1="848" y1="228" x2="896" y2="228" stroke="#504e49" stroke-width="1.2"/>
      <path d="M 890,224 L 896,228 L 890,232"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>

      <!-- ── Start marker (solid circle) ── -->
      <circle cx="40" cy="228" r="6" fill="#141413"/>

      <!-- ── State nodes ── -->

      <!-- S1: Idle -->
      <rect x="80" y="196" width="144" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="80" y="196" width="144" height="64" rx="6"
            fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="102" y="214" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">STATE</text>
      <text x="152" y="234" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Idle</text>
      <text x="152" y="250" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">waiting</text>

      <!-- S2: Active (FOCAL) -->
      <rect x="284" y="196" width="144" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="284" y="196" width="144" height="64" rx="6"
            fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="306" y="214" fill="#1B365D" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">FOCAL</text>
      <text x="356" y="234" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Active</text>
      <text x="356" y="250" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">editing</text>

      <!-- S3: Processing -->
      <rect x="488" y="196" width="144" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="488" y="196" width="144" height="64" rx="6"
            fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="510" y="214" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">STATE</text>
      <text x="560" y="234" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Processing</text>
      <text x="560" y="250" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">running</text>

      <!-- S4: Done -->
      <rect x="720" y="196" width="128" height="64" rx="6" fill="#f5f4ed"/>
      <rect x="720" y="196" width="128" height="64" rx="6"
            fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="742" y="214" fill="#141413" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">TERMINAL</text>
      <text x="784" y="234" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Done</text>
      <text x="784" y="250" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">resolved</text>

      <!-- ── End marker (double circle) ── -->
      <circle cx="916" cy="228" r="8" fill="none" stroke="#141413" stroke-width="1.4"/>
      <circle cx="916" cy="228" r="4" fill="#141413"/>

      <!-- ── Legend ── -->
      <line x1="40" y1="386" x2="920" y2="386" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <text x="40" y="402" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.22em">LEGEND</text>

      <circle cx="47" cy="420" r="6" fill="#141413"/>
      <text x="60" y="424" fill="#504e49" font-size="8.5" font-family="inherit">Start</text>

      <rect x="100" y="413" width="14" height="10" rx="2" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="120" y="421" fill="#504e49" font-size="8.5" font-family="inherit">Focal state</text>

      <rect x="230" y="413" width="14" height="10" rx="2" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="250" y="421" fill="#504e49" font-size="8.5" font-family="inherit">Terminal</text>

      <line x1="360" y1="418" x2="392" y2="418" stroke="#1B365D" stroke-width="1.4"/>
      <path d="M 386,414 L 392,418 L 386,422"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>
      <text x="400" y="421" fill="#504e49" font-size="8.5" font-family="inherit">Forward transition</text>

      <line x1="560" y1="418" x2="592" y2="418" stroke="#504e49" stroke-width="1.2"
            stroke-dasharray="4,3"/>
      <path d="M 586,414 L 592,418 L 586,422"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>
      <text x="600" y="421" fill="#504e49" font-size="8.5" font-family="inherit">Reset / timeout</text>
    </svg>

    <p class="caption">Focal rule: one ink-blue state per diagram, marking where the user spends most time. Start and terminal markers follow UML convention; the dashed arc shows the exceptional path.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/swimlane.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Swimlane (kami palette)
     Process flow across responsibility lanes. Focal lane in ink-blue;
     other lanes in warm neutrals. Orthogonal elbow connectors only.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Swimlane · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 1000px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 860px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Swimlane · kami diagram</p>
    <h1>{{System name}} request flow</h1>

    <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(20,20,19,0.08)"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.55"/>

      <!-- ── Lane backgrounds ── -->
      <!-- Lane 1: Client, y=56..176 -->
      <rect x="64" y="56" width="880" height="120" rx="0" fill="rgba(20,20,19,0.02)"/>
      <!-- Lane 2: Server, y=176..296 (focal) -->
      <rect x="64" y="176" width="880" height="120" fill="#EEF2F7" opacity="0.40"/>
      <!-- Lane 3: Database, y=296..416 -->
      <rect x="64" y="296" width="880" height="120" rx="0" fill="rgba(20,20,19,0.02)"/>

      <!-- Lane dividers -->
      <line x1="64" y1="56"  x2="944" y2="56"  stroke="#e8e6dc" stroke-width="1"/>
      <line x1="64" y1="176" x2="944" y2="176" stroke="#1B365D" stroke-width="0.8" stroke-dasharray="4,3"/>
      <line x1="64" y1="296" x2="944" y2="296" stroke="#e8e6dc" stroke-width="0.8" stroke-dasharray="4,3"/>
      <line x1="64" y1="416" x2="944" y2="416" stroke="#e8e6dc" stroke-width="1"/>

      <!-- Lane label column -->
      <rect x="0" y="56" width="64" height="360" fill="#f5f4ed" stroke="#e8e6dc" stroke-width="0.8"/>
      <text x="32" y="124" fill="#6b6a64" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.15em"
            transform="rotate(-90, 32, 116)">CLIENT</text>
      <text x="32" y="244" fill="#1B365D" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.15em"
            transform="rotate(-90, 32, 236)">SERVER</text>
      <text x="32" y="364" fill="#6b6a64" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.15em"
            transform="rotate(-90, 32, 356)">DATABASE</text>

      <!-- ── Connectors (drawn behind nodes) ── -->

      <!-- N1 → N2: (152,140) → (152,212) vertical -->
      <line x1="152" y1="140" x2="152" y2="212" stroke="#504e49" stroke-width="1.2"/>
      <path d="M 147,206 L 152,212 L 157,206"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>

      <!-- N2 → N3: (224,236) → (288,236) horizontal -->
      <line x1="224" y1="236" x2="288" y2="236" stroke="#1B365D" stroke-width="1.4"/>
      <path d="M 282,231 L 288,236 L 282,241"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>

      <!-- N3 → N4: elbow (360,260) → (360,296) → (568,296) → (568,332) -->
      <polyline points="360,260 360,296 568,296 568,332"
                fill="none" stroke="#504e49" stroke-width="1.2"/>
      <path d="M 563,326 L 568,332 L 573,326"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>

      <!-- N4 → N5: (640,356) → (776,356) → (776,140) -->
      <polyline points="640,356 812,356 812,140"
                fill="none" stroke="#504e49" stroke-width="1.2"/>
      <path d="M 807,146 L 812,140 L 817,146"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>

      <!-- ── Nodes ── -->

      <!-- N1: Request, Lane 1, x=80 y=92 w=144 h=48 -->
      <rect x="80" y="92" width="144" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="80" y="92" width="144" height="48" rx="6"
            fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="102" y="108" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">USER</text>
      <text x="152" y="124" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Request</text>

      <!-- N2: Validate, Lane 2, x=80 y=212 w=144 h=48 FOCAL -->
      <rect x="80" y="212" width="144" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="80" y="212" width="144" height="48" rx="6"
            fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="102" y="228" fill="#1B365D" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">FOCAL</text>
      <text x="152" y="244" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Validate</text>

      <!-- N3: Route, Lane 2, x=288 y=212 w=144 h=48 -->
      <rect x="288" y="212" width="144" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="288" y="212" width="144" height="48" rx="6"
            fill="rgba(20,20,19,0.03)" stroke="rgba(20,20,19,0.30)" stroke-width="1"/>
      <text x="310" y="228" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">HANDLER</text>
      <text x="360" y="244" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Route</text>

      <!-- N4: Query, Lane 3, x=496 y=332 w=144 h=48 -->
      <rect x="496" y="332" width="144" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="496" y="332" width="144" height="48" rx="6"
            fill="rgba(20,20,19,0.05)" stroke="#504e49" stroke-width="1"/>
      <text x="518" y="348" fill="#504e49" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">STORE</text>
      <text x="568" y="364" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Query</text>

      <!-- N5: Respond, Lane 1, x=740 y=92 w=144 h=48 -->
      <rect x="740" y="92" width="144" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="740" y="92" width="144" height="48" rx="6"
            fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="762" y="108" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">USER</text>
      <text x="812" y="124" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">Respond</text>

      <!-- ── Legend ── -->
      <rect x="64" y="416" width="880" height="44" fill="#f5f4ed"/>
      <text x="80" y="434" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.22em">LEGEND</text>
      <rect x="160" y="426" width="14" height="10" rx="2" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="180" y="434" fill="#504e49" font-size="8.5" font-family="inherit">Focal lane / node</text>
      <rect x="320" y="426" width="14" height="10" rx="2" fill="rgba(20,20,19,0.05)" stroke="#504e49" stroke-width="1"/>
      <text x="340" y="434" fill="#504e49" font-size="8.5" font-family="inherit">Store</text>
      <rect x="420" y="426" width="14" height="10" rx="2" fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="440" y="434" fill="#504e49" font-size="8.5" font-family="inherit">Client / external</text>
    </svg>

    <p class="caption">Focal rule: the Server lane carries the business logic, so it gets the ink-blue tint. Client and Database lanes stay in warm neutral to keep the eye on what actually decides the outcome.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/timeline.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Timeline (kami palette)
     Horizontal time axis with alternating above/below event labels.
     One focal milestone in ink-blue; all others in warm neutrals.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Timeline · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 1000px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 860px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Timeline · kami diagram</p>
    <h1>{{Project name}} milestones</h1>

    <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(20,20,19,0.08)"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.55"/>

      <!-- ── Horizontal axis ── -->
      <line x1="60" y1="228" x2="900" y2="228" stroke="#b8b7b0" stroke-width="1.4"/>
      <!-- Axis end arrow (right) -->
      <path d="M 894,224 L 900,228 L 894,232"
            fill="none" stroke="#b8b7b0" stroke-width="1.5" stroke-linecap="round"/>

      <!-- ================================================================
           Events: x = 140, 292, 444, 596, 748
           Alternating: above (0,2,4), below (1,3)
           Event 2 (x=444) is focal
           ================================================================ -->

      <!-- Event 0: x=140, ABOVE, "Concept" 2019 -->
      <line x1="140" y1="220" x2="140" y2="168" stroke="#6b6a64" stroke-width="1" stroke-dasharray="3,3"/>
      <circle cx="140" cy="228" r="5" fill="#6b6a64" stroke="#f5f4ed" stroke-width="1.5"/>
      <rect x="88" y="128" width="104" height="40" rx="4"
            fill="#f5f4ed" stroke="#e8e6dc" stroke-width="0.8"/>
      <text x="140" y="143" fill="#6b6a64" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.15em">2019</text>
      <text x="140" y="159" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">Concept</text>

      <!-- Event 1: x=292, BELOW, "Prototype" 2020 -->
      <line x1="292" y1="236" x2="292" y2="288" stroke="#6b6a64" stroke-width="1" stroke-dasharray="3,3"/>
      <circle cx="292" cy="228" r="5" fill="#6b6a64" stroke="#f5f4ed" stroke-width="1.5"/>
      <rect x="236" y="288" width="112" height="40" rx="4"
            fill="#f5f4ed" stroke="#e8e6dc" stroke-width="0.8"/>
      <text x="292" y="303" fill="#6b6a64" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.15em">2020</text>
      <text x="292" y="319" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">Prototype</text>

      <!-- Event 2: x=444, ABOVE, "Launch" 2021 FOCAL -->
      <line x1="444" y1="220" x2="444" y2="148" stroke="#1B365D" stroke-width="1.2"/>
      <circle cx="444" cy="228" r="6" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <rect x="380" y="100" width="128" height="48" rx="4"
            fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="444" y="117" fill="#1B365D" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.15em">2021 · FOCAL</text>
      <text x="444" y="138" fill="#141413" font-size="13" font-weight="600"
            font-family="inherit" text-anchor="middle">Launch</text>

      <!-- Event 3: x=596, BELOW, "Growth" 2022 -->
      <line x1="596" y1="236" x2="596" y2="288" stroke="#6b6a64" stroke-width="1" stroke-dasharray="3,3"/>
      <circle cx="596" cy="228" r="5" fill="#504e49" stroke="#f5f4ed" stroke-width="1.5"/>
      <rect x="540" y="288" width="112" height="40" rx="4"
            fill="#f5f4ed" stroke="#e8e6dc" stroke-width="0.8"/>
      <text x="596" y="303" fill="#6b6a64" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.15em">2022</text>
      <text x="596" y="319" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">Growth</text>

      <!-- Event 4: x=748, ABOVE, "Scale" 2023 -->
      <line x1="748" y1="220" x2="748" y2="168" stroke="#6b6a64" stroke-width="1" stroke-dasharray="3,3"/>
      <circle cx="748" cy="228" r="5" fill="#504e49" stroke="#f5f4ed" stroke-width="1.5"/>
      <rect x="692" y="128" width="112" height="40" rx="4"
            fill="#f5f4ed" stroke="#e8e6dc" stroke-width="0.8"/>
      <text x="748" y="143" fill="#6b6a64" font-size="8" font-family="'JetBrains Mono', monospace"
            text-anchor="middle" letter-spacing="0.15em">2023</text>
      <text x="748" y="159" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">Scale</text>

      <!-- ── Legend ── -->
      <line x1="40" y1="390" x2="920" y2="390" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <text x="40" y="406" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.22em">LEGEND</text>

      <circle cx="47" cy="424" r="6" fill="#1B365D" stroke="#f5f4ed" stroke-width="1.5"/>
      <text x="60" y="428" fill="#504e49" font-size="8.5" font-family="inherit">Focal milestone</text>

      <circle cx="183" cy="424" r="5" fill="#504e49" stroke="#f5f4ed" stroke-width="1.5"/>
      <text x="196" y="428" fill="#504e49" font-size="8.5" font-family="inherit">Standard milestone</text>

      <line x1="360" y1="424" x2="392" y2="424" stroke="#6b6a64" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="400" y="428" fill="#504e49" font-size="8.5" font-family="inherit">Connector</text>
    </svg>

    <p class="caption">Focal rule: ink-blue marks the single most important milestone, the moment the reader should remember. Every other event stays in warm stone so the contrast does the work.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/tree.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Tree (kami palette)
     Hierarchy with orthogonal elbow connectors. One focal sub-tree
     in ink-blue; root and other branches in warm neutrals.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tree · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 1000px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 860px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Tree · kami diagram</p>
    <h1>{{System name}} hierarchy</h1>

    <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(20,20,19,0.08)"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.55"/>

      <!-- ── Connector lines (drawn behind nodes) ── -->

      <!-- Root → junction at y=116, then branch to C1(x=248) and C2(x=712) -->
      <line x1="480" y1="88" x2="480" y2="116" stroke="#504e49" stroke-width="1.2"/>
      <line x1="248" y1="116" x2="712" y2="116" stroke="#504e49" stroke-width="1.2"/>
      <line x1="248" y1="116" x2="248" y2="152" stroke="#504e49" stroke-width="1.2"/>
      <line x1="712" y1="116" x2="712" y2="152" stroke="#1B365D" stroke-width="1.4"/>

      <!-- Chevrons at C1 and C2 tops -->
      <path d="M 243,148 L 248,152 L 253,148"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 707,148 L 712,152 L 717,148"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>

      <!-- C1 branch → junction at y=244, then to L1(x=112) and L2(x=268) -->
      <line x1="248" y1="200" x2="248" y2="244" stroke="#504e49" stroke-width="1.2"/>
      <line x1="112" y1="244" x2="268" y2="244" stroke="#504e49" stroke-width="1.2"/>
      <line x1="112" y1="244" x2="112" y2="280" stroke="#504e49" stroke-width="1.2"/>
      <line x1="268" y1="244" x2="268" y2="280" stroke="#504e49" stroke-width="1.2"/>

      <!-- Chevrons at L1 and L2 tops -->
      <path d="M 107,276 L 112,280 L 117,276"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 263,276 L 268,280 L 273,276"
            fill="none" stroke="#504e49" stroke-width="1.5" stroke-linecap="round"/>

      <!-- C2 branch → junction at y=244, then to L3(x=552), L4(x=712), L5(x=872) -->
      <line x1="712" y1="200" x2="712" y2="244" stroke="#1B365D" stroke-width="1.4"/>
      <line x1="552" y1="244" x2="872" y2="244" stroke="#1B365D" stroke-width="1.4"/>
      <line x1="552" y1="244" x2="552" y2="280" stroke="#1B365D" stroke-width="1.4"/>
      <line x1="712" y1="244" x2="712" y2="280" stroke="#1B365D" stroke-width="1.4"/>
      <line x1="872" y1="244" x2="872" y2="280" stroke="#1B365D" stroke-width="1.4"/>

      <!-- Chevrons at L3, L4, L5 tops -->
      <path d="M 547,276 L 552,280 L 557,276"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 707,276 L 712,280 L 717,276"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 867,276 L 872,280 L 877,276"
            fill="none" stroke="#1B365D" stroke-width="1.5" stroke-linecap="round"/>

      <!-- ── Root node ── -->
      <rect x="408" y="40" width="144" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="408" y="40" width="144" height="48" rx="6"
            fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="430" y="56" fill="#141413" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">ROOT</text>
      <text x="480" y="72" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">{{System}}</text>

      <!-- ── Child nodes ── -->

      <!-- C1: left branch -->
      <rect x="176" y="152" width="144" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="176" y="152" width="144" height="48" rx="6"
            fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="198" y="168" fill="#6b6a64" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">MODULE</text>
      <text x="248" y="184" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Module A}}</text>

      <!-- C2: right branch (FOCAL) -->
      <rect x="640" y="152" width="144" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="640" y="152" width="144" height="48" rx="6"
            fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="662" y="168" fill="#1B365D" font-size="7" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.15em">FOCAL</text>
      <text x="712" y="184" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Module B}}</text>

      <!-- ── Leaf nodes (C1 branch) ── -->

      <!-- L1 -->
      <rect x="48" y="280" width="128" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="48" y="280" width="128" height="48" rx="6"
            fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="112" y="300" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Leaf 1}}</text>
      <text x="112" y="316" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">service</text>

      <!-- L2 -->
      <rect x="204" y="280" width="128" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="204" y="280" width="128" height="48" rx="6"
            fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="268" y="300" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Leaf 2}}</text>
      <text x="268" y="316" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">service</text>

      <!-- ── Leaf nodes (C2 branch, focal) ── -->

      <!-- L3 -->
      <rect x="488" y="280" width="128" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="488" y="280" width="128" height="48" rx="6"
            fill="#EEF2F7" stroke="#1B365D" stroke-width="0.8"/>
      <text x="552" y="300" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Leaf 3}}</text>
      <text x="552" y="316" fill="#1B365D" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">component</text>

      <!-- L4 -->
      <rect x="648" y="280" width="128" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="648" y="280" width="128" height="48" rx="6"
            fill="#EEF2F7" stroke="#1B365D" stroke-width="0.8"/>
      <text x="712" y="300" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Leaf 4}}</text>
      <text x="712" y="316" fill="#1B365D" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">component</text>

      <!-- L5 -->
      <rect x="808" y="280" width="128" height="48" rx="6" fill="#f5f4ed"/>
      <rect x="808" y="280" width="128" height="48" rx="6"
            fill="#EEF2F7" stroke="#1B365D" stroke-width="0.8"/>
      <text x="872" y="300" fill="#141413" font-size="11" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Leaf 5}}</text>
      <text x="872" y="316" fill="#1B365D" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">component</text>

      <!-- ── Legend ── -->
      <line x1="40" y1="376" x2="920" y2="376" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <text x="40" y="392" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.22em">LEGEND</text>

      <rect x="40" y="406" width="14" height="10" rx="2" fill="#EEF2F7" stroke="#1B365D" stroke-width="1"/>
      <text x="60" y="414" fill="#504e49" font-size="8.5" font-family="inherit">Focal sub-tree</text>

      <rect x="190" y="406" width="14" height="10" rx="2" fill="#ffffff" stroke="#141413" stroke-width="1"/>
      <text x="210" y="414" fill="#504e49" font-size="8.5" font-family="inherit">Root</text>

      <rect x="280" y="406" width="14" height="10" rx="2" fill="rgba(94,93,89,0.08)" stroke="#6b6a64" stroke-width="1"/>
      <text x="300" y="414" fill="#504e49" font-size="8.5" font-family="inherit">Secondary branch</text>
    </svg>

    <p class="caption">Focal rule: one sub-tree in ink-blue marks the branch where complexity lives, or the path the reader needs to understand first. Orthogonal elbows make parent-child relationships unambiguous.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/venn.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Venn (kami palette)
     Two or three overlapping circles showing set relationships.
     Focal circle in ink-blue tint; intersection label in serif callout.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Venn · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:  #f5f4ed;
    --ivory:      #faf9f5;
    --near-black: #141413;
    --olive:      #504e49;
    --stone:      #6b6a64;
    --brand:      #1B365D;
    --brand-tint: #EEF2F7;
    --border:     #e8e6dc;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 1000px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 860px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Venn · kami diagram</p>
    <h1>{{Topic A}} and {{Topic B}} intersection</h1>

    <svg viewBox="0 0 960 460" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(20,20,19,0.08)"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="#f5f4ed"/>
      <rect width="100%" height="100%" fill="url(#dots)" opacity="0.55"/>

      <!-- ── Venn circles ── -->
      <!-- Circle A (FOCAL): cx=376 cy=208 r=152 -->
      <circle cx="376" cy="208" r="152"
              fill="rgba(27,54,93,0.08)" stroke="#1B365D" stroke-width="1.2"/>

      <!-- Circle B: cx=584 cy=208 r=152 -->
      <circle cx="584" cy="208" r="152"
              fill="rgba(94,93,89,0.07)" stroke="#504e49" stroke-width="1.2"/>

      <!-- ── Zone labels ── -->

      <!-- A-only zone (cx≈264) -->
      <text x="264" y="196" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Set A only}}</text>
      <text x="264" y="214" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">unique to A</text>

      <!-- Intersection zone (cx=480), focal callout -->
      <text x="480" y="198" fill="#1B365D" font-size="13" font-weight="600"
            font-family="inherit" font-style="italic"
            text-anchor="middle">{{Shared}}</text>
      <text x="480" y="218" fill="#1B365D" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">overlap</text>

      <!-- B-only zone (cx≈696) -->
      <text x="696" y="196" fill="#141413" font-size="12" font-weight="600"
            font-family="inherit" text-anchor="middle">{{Set B only}}</text>
      <text x="696" y="214" fill="#504e49" font-size="9" font-family="'JetBrains Mono', monospace"
            text-anchor="middle">unique to B</text>

      <!-- ── Circle labels (top of each circle) ── -->
      <text x="296" y="88" fill="#1B365D" font-size="10" font-weight="600"
            font-family="'JetBrains Mono', monospace" text-anchor="middle"
            letter-spacing="0.1em">SET A</text>
      <text x="664" y="88" fill="#504e49" font-size="10" font-weight="600"
            font-family="'JetBrains Mono', monospace" text-anchor="middle"
            letter-spacing="0.1em">SET B</text>

      <!-- ── Example label rows (bottom of circles) ── -->
      <text x="264" y="292" fill="#6b6a64" font-size="9" font-family="inherit"
            text-anchor="middle">item · item · item</text>
      <text x="480" y="292" fill="#6b6a64" font-size="9" font-family="inherit"
            text-anchor="middle">item · item</text>
      <text x="696" y="292" fill="#6b6a64" font-size="9" font-family="inherit"
            text-anchor="middle">item · item · item</text>

      <!-- ── Legend ── -->
      <line x1="40" y1="372" x2="920" y2="372" stroke="rgba(20,20,19,0.10)" stroke-width="0.8"/>
      <text x="40" y="388" fill="#504e49" font-size="8" font-family="'JetBrains Mono', monospace"
            letter-spacing="0.22em">LEGEND</text>

      <circle cx="47" cy="406" r="12" fill="rgba(27,54,93,0.08)" stroke="#1B365D" stroke-width="1"/>
      <text x="66" y="410" fill="#504e49" font-size="8.5" font-family="inherit">Focal set (A)</text>

      <circle cx="199" cy="406" r="12" fill="rgba(94,93,89,0.07)" stroke="#504e49" stroke-width="1"/>
      <text x="218" y="410" fill="#504e49" font-size="8.5" font-family="inherit">Secondary set (B)</text>

      <text x="375" y="402" fill="#1B365D" font-size="11" font-family="inherit"
            font-style="italic">Overlap</text>
      <text x="435" y="410" fill="#504e49" font-size="8.5" font-family="inherit">Intersection label (serif callout)</text>
    </svg>

    <p class="caption">Focal rule: the circle whose contents matter most to the argument gets the ink-blue stroke. The intersection label uses a serif italic callout to draw the eye to the overlap, which is usually the point of the diagram.</p>
  </div>
</body>
</html>

=== FILE: .claude/skills/kami/assets/diagrams/waterfall.html ===
<!DOCTYPE html>
<!-- ==================================================================
     DIAGRAM · Waterfall Chart (kami palette)
     Revenue bridge / valuation decomposition / cash flow breakdown.
     Start value, positive/negative segments, end value.
     DATA START / DATA END marks the region Claude replaces when filling.
     ================================================================== -->
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Waterfall Chart · kami diagram</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --parchment:    #f5f4ed;
    --ivory:        #faf9f5;
    --near-black:   #141413;
    --olive:        #504e49;
    --stone:        #6b6a64;
    --light-stone:  #b8b7b0;
    --brand:        #1B365D;
    --brand-tint:   #EEF2F7;
    --grid:         #e8e7e1;
    --border:       #e8e6dc;
    --positive:     #1B365D;
    --negative:     #6b6a64;
    --total:        #4d4c48;

    --serif: Charter, Georgia, Palatino, serif;
    --sans: var(--serif);
    --mono:  "JetBrains Mono", "SF Mono", Consolas, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", monospace;
  }

  body {
    font-family: var(--sans);
    background: var(--parchment);
    color: var(--near-black);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .frame { max-width: 920px; width: 100%; }

  .eyebrow {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.5rem;
  }

  h1 {
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 500;
    letter-spacing: -0.3pt;
    line-height: 1.15;
    margin-bottom: 1.6rem;
  }

  svg { width: 100%; min-width: 640px; display: block; }

  .caption {
    font-family: var(--serif);
    font-style: italic;
    font-size: 0.95rem;
    color: var(--olive);
    margin-top: 1rem;
    max-width: 52ch;
  }
</style>
</head>
<body>
  <div class="frame">
    <p class="eyebrow">Waterfall · kami diagram</p>
    <h1>{{Chart Title}}</h1>

    <!-- ============================================================
         DATA START
         Chart area: x=60 y=40 w=600 h=280 · base y=320
         viewBox: 0 0 720 420
         Bars: 7 (start + 4 changes + subtotal + end)
         bar-width=64 · gap=20 · bar-spacing=84
         Scale: max=200 · 1 unit = 1.4px (280/200)
         Y-axis: 0 / 40 / 80 / 120 / 160 / 200
         Positive: #1B365D · Negative: #6b6a64 · Total: #4d4c48
         Connector lines: dashed 0.8px #b8b7b0
         ============================================================ -->
    <svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">

      <!-- Canvas -->
      <rect width="100%" height="100%" fill="#f5f4ed"/>

      <!-- Horizontal grid lines (y: 320=0, 264=40, 208=80, 152=120, 96=160, 40=200) -->
      <line x1="60" y1="320" x2="660" y2="320" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="264" x2="660" y2="264" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="208" x2="660" y2="208" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="152" x2="660" y2="152" stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="96"  x2="660" y2="96"  stroke="#e8e7e1" stroke-width="0.8"/>
      <line x1="60" y1="40"  x2="660" y2="40"  stroke="#e8e7e1" stroke-width="0.8"/>

      <!-- Y-axis labels -->
      <text x="52" y="324" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">0</text>
      <text x="52" y="268" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">40</text>
      <text x="52" y="212" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">80</text>
      <text x="52" y="156" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">120</text>
      <text x="52" y="100" fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">160</text>
      <text x="52" y="44"  fill="#6b6a64" font-size="10" text-anchor="end" font-family="Charter, Georgia, serif">200</text>

      <!-- Bar 1: Start value = 120 (total bar, from baseline to 120) -->
      <!-- y = 320 - 120*1.4 = 152, h = 168 -->
      <rect x="68" y="152" width="64" height="168" fill="#4d4c48" rx="2"/>
      <text x="100" y="144" fill="#141413" font-size="11" font-weight="500" text-anchor="middle" font-family="Charter, Georgia, serif">120</text>

      <!-- Connector: bar1 top to bar2 -->
      <line x1="132" y1="152" x2="152" y2="152" stroke="#b8b7b0" stroke-width="0.8" stroke-dasharray="3,2"/>

      <!-- Bar 2: +30 (positive, floats from 120 to 150) -->
      <!-- bottom y = 152, top y = 152 - 30*1.4 = 110, h = 42 -->
      <rect x="152" y="110" width="64" height="42" fill="#1B365D" rx="2"/>
      <text x="184" y="102" fill="#141413" font-size="11" font-weight="500" text-anchor="middle" font-family="Charter, Georgia, serif">+30</text>

      <!-- Connector: bar2 top to bar3 -->
      <line x1="216" y1="110" x2="236" y2="110" stroke="#b8b7b0" stroke-width="0.8" stroke-dasharray="3,2"/>

      <!-- Bar 3: +20 (positive, floats from 150 to 170) -->
      <!-- bottom y = 110, top y = 110 - 20*1.4 = 82, h = 28 -->
      <rect x="236" y="82" width="64" height="28" fill="#1B365D" rx="2"/>
      <text x="268" y="74" fill="#141413" font-size="11" font-weight="500" text-anchor="middle" font-family="Charter, Georgia, serif">+20</text>

      <!-- Connector: bar3 top to bar4 -->
      <line x1="300" y1="82" x2="320" y2="82" stroke="#b8b7b0" stroke-width="0.8" stroke-dasharray="3,2"/>

      <!-- Bar 4: -40 (negative, floats from 170 down to 130) -->
      <!-- top y = 82, bottom y = 82 + 40*1.4 = 138, h = 56 -->
      <rect x="320" y="82" width="64" height="56" fill="#6b6a64" rx="2"/>
      <text x="352" y="148" fill="#141413" font-size="11" font-weight="500" text-anchor="middle" font-family="Charter, Georgia, serif">-40</text>

      <!-- Connector: bar4 bottom to bar5 -->
      <line x1="384" y1="138" x2="404" y2="138" stroke="#b8b7b0" stroke-width="0.8" stroke-dasharray="3,2"/>

      <!-- Bar 5: +10 (positive, floats from 130 to 140) -->
      <!-- bottom y = 138, top y = 138 - 10*1.4 = 124, h = 14 -->
      <rect x="404" y="124" width="64" height="14" fill="#1B365D" rx="2"/>
      <text x="436" y="116" fill="#141413" font-size="11" font-weight="500" text-anchor="middle" font-family="Charter, Georgia, serif">+10</text>

      <!-- Connector: bar5 top to bar6 -->
      <line x1="468" y1="124" x2="488" y2="124" stroke="#b8b7b0" stroke-width="0.8" stroke-dasharray="3,2"/>

      <!-- Bar 6: -20 (negative, floats from 140 down to 120) -->
      <!-- top y = 124, bottom y = 124 + 20*1.4 = 152, h = 28 -->
      <rect x="488" y="124" width="64" height="28" fill="#6b6a64" rx="2"/>
      <text x="520" y="162" fill="#141413" font-size="11" font-weight="500" text-anchor="middle" font-family="Charter, Georgia, serif">-20</text>

      <!-- Bar 7: End value = 120 (total bar, from baseline to 120) -->
      <rect x="588" y="152" width="64" height="168" fill="#4d4c48" rx="2"/>
      <text x="620" y="144" fill="#141413" font-size="11" font-weight="500" text-anchor="middle" font-family="Charter, Georgia, serif">120</text>
      <!-- DATA END -->

      <!-- X-axis category labels -->
      <text x="100" y="340" fill="#141413" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{Start}}</text>
      <text x="184" y="340" fill="#141413" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{Cat A}}</text>
      <text x="268" y="340" fill="#141413" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{Cat B}}</text>
      <text x="352" y="340" fill="#141413" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{Cat C}}</text>
      <text x="436" y="340" fill="#141413" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{Cat D}}</text>
      <text x="520" y="340" fill="#141413" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{Cat E}}</text>
      <text x="620" y="340" fill="#141413" font-size="10" text-anchor="middle" font-family="Charter, Georgia, serif">{{End}}</text>

      <!-- Legend -->
      <line x1="60" y1="368" x2="660" y2="368" stroke="#e8e7e1" stroke-width="0.8"/>

      <rect x="60" y="380" width="12" height="12" fill="#1B365D" rx="2"/>
      <text x="78" y="391" fill="#504e49" font-size="10" font-family="Charter, Georgia, serif">Increase</text>

      <rect x="180" y="380" width="12" height="12" fill="#6b6a64" rx="2"/>
      <text x="198" y="391" fill="#504e49" font-size="10" font-family="Charter, Georgia, serif">Decrease</text>

      <rect x="300" y="380" width="12" height="12" fill="#4d4c48" rx="2"/>
      <text x="318" y="391" fill="#504e49" font-size="10" font-family="Charter, Georgia, serif">Total</text>

    </svg>

    <p class="caption">{{Caption: e.g. "Revenue bridge from FY2024 to FY2025, showing growth drivers and headwinds."}}</p>
  </div>
</body>
</html>


## 构建工具（scripts/）


=== FILE: .claude/skills/kami/scripts/build.py ===
#!/usr/bin/env python3
"""kami build & check

Usage:
    python3 scripts/build.py                      # build all examples (HTML + diagrams + PPTX)
    python3 scripts/build.py resume               # build one template, print pages + fonts
    python3 scripts/build.py --check              # scan templates for CSS rule violations
    python3 scripts/build.py --check -v           # verbose (show each scanned file)
    python3 scripts/build.py --sync               # check CSS token drift across templates
    python3 scripts/build.py --verify             # build all + page count + font checks
    python3 scripts/build.py --verify resume-en   # single target full verification
    python3 scripts/build.py --check-placeholders path/to/doc.html
    python3 scripts/build.py --check-orphans      # scan example PDFs for orphan text
    python3 scripts/build.py --check-orphans path/to/doc.pdf
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = ROOT / "assets" / "templates"
DIAGRAMS = ROOT / "assets" / "diagrams"
EXAMPLES = ROOT / "assets" / "examples"

# name -> (source, max_pages). max_pages=0 means no hard check.
HTML_TARGETS: dict[str, tuple[str, int]] = {
    # Chinese
    "one-pager":    ("one-pager.html", 1),
    "letter":       ("letter.html", 1),
    "long-doc":     ("long-doc.html", 0),
    "portfolio":    ("portfolio.html", 0),
    "resume":       ("resume.html", 2),
    # English
    "one-pager-en": ("one-pager-en.html", 1),
    "letter-en":    ("letter-en.html", 1),
    "long-doc-en":  ("long-doc-en.html", 0),
    "portfolio-en": ("portfolio-en.html", 0),
    "resume-en":    ("resume-en.html", 2),
    # Equity Report
    "equity-report":    ("equity-report.html", 3),
    "equity-report-en": ("equity-report-en.html", 3),
    # Changelog
    "changelog":    ("changelog.html", 2),
    "changelog-en": ("changelog-en.html", 2),
}
PPTX_TARGETS: dict[str, str] = {
    "slides":    "slides.py",
    "slides-en": "slides-en.py",
}

# Diagram HTMLs live in a separate directory and have no page-count contract.
DIAGRAM_TARGETS: dict[str, str] = {
    "diagram-architecture": "architecture.html",
    "diagram-flowchart":    "flowchart.html",
    "diagram-quadrant":     "quadrant.html",
    "diagram-bar-chart":    "bar-chart.html",
    "diagram-line-chart":   "line-chart.html",
    "diagram-donut-chart":  "donut-chart.html",
    "diagram-state-machine": "state-machine.html",
    "diagram-timeline":      "timeline.html",
    "diagram-swimlane":      "swimlane.html",
    "diagram-tree":          "tree.html",
    "diagram-layer-stack":   "layer-stack.html",
    "diagram-venn":          "venn.html",
    "diagram-candlestick":   "candlestick.html",
    "diagram-waterfall":     "waterfall.html",
}


# ------------------------- build -------------------------

def infer_author() -> str:
    """Infer author name from git config or environment.

    Priority:
    1. git config user.name
    2. KAMI_AUTHOR env var
    3. fallback to "Kami"
    """
    try:
        result = subprocess.run(
            ["git", "config", "user.name"],
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
    except FileNotFoundError:
        pass

    if env_author := os.environ.get("KAMI_AUTHOR"):
        return env_author

    return "Kami"


def set_pdf_metadata(pdf_path: Path, author: str | None = None) -> None:
    """Set PDF metadata using pypdf, only if placeholders are still present."""
    try:
        from pypdf import PdfReader, PdfWriter
    except ImportError:
        return

    if not pdf_path.exists():
        return

    reader = PdfReader(str(pdf_path))

    # Read existing metadata from WeasyPrint
    existing = reader.metadata or {}

    # Check if we need to update anything
    needs_update = False
    metadata = dict(existing)  # Copy all existing metadata

    # Only override author if it's still a placeholder
    if author and existing.get("/Author"):
        author_value = str(existing["/Author"])
        if "{{" in author_value and "}}" in author_value:
            metadata["/Author"] = author
            needs_update = True

    # Always set Producer and Creator to Kami
    if metadata.get("/Producer") != "Kami":
        metadata["/Producer"] = "Kami"
        needs_update = True
    if metadata.get("/Creator") != "Kami":
        metadata["/Creator"] = "Kami"
        needs_update = True

    if not needs_update:
        return

    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)

    writer.add_metadata(metadata)

    with open(pdf_path, "wb") as f:
        writer.write(f)


def build_html(name: str, source: str, max_pages: int,
               src_dir: Path = TEMPLATES) -> bool:
    try:
        from weasyprint import HTML
        from pypdf import PdfReader
    except ImportError:
        print("ERROR: missing deps: pip install weasyprint pypdf --break-system-packages")
        return False

    src = src_dir / source
    if not src.exists():
        print(f"ERROR: {name}: source not found ({src})")
        return False

    EXAMPLES.mkdir(parents=True, exist_ok=True)
    out = EXAMPLES / f"{name}.pdf"

    # weasyprint resolves @font-face relative to CWD. Run from the source dir
    # so fonts placed next to the HTML are found.
    HTML(str(src), base_url=str(src.parent)).write_pdf(str(out))

    # Set PDF metadata (only replaces placeholders, preserves filled values)
    author = infer_author()
    set_pdf_metadata(out, author=author)

    n = len(PdfReader(str(out)).pages)
    msg = f"OK: {name}: {n} pages"
    if max_pages and n > max_pages:
        msg = f"ERROR: {name}: {n} pages (limit {max_pages})"
        print(msg)
        return False
    print(msg)
    return True


def build_slides(name: str = "slides") -> bool:
    source = PPTX_TARGETS.get(name)
    if source is None:
        print(f"ERROR: {name}: unknown slides target")
        return False
    src = TEMPLATES / source
    if not src.exists():
        print(f"ERROR: {name}: source not found ({src})")
        return False

    EXAMPLES.mkdir(parents=True, exist_ok=True)
    out = EXAMPLES / f"{name}.pptx"
    result = subprocess.run(
        [sys.executable, str(src)],
        cwd=str(src.parent),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"ERROR: {name}: {result.stderr.strip() or 'script failed'}")
        return False
    # The script writes output.pptx in cwd; move to examples/ under our name.
    generated = src.parent / "output.pptx"
    if generated.exists():
        generated.replace(out)
        print(f"OK: {name}: generated {out.name}")
        return True
    print(f"ERROR: {name}: output.pptx not produced")
    return False


def build_all() -> int:
    failures = 0
    for name, (source, max_pages) in HTML_TARGETS.items():
        if not build_html(name, source, max_pages):
            failures += 1
    for name, source in DIAGRAM_TARGETS.items():
        if not build_html(name, source, 0, src_dir=DIAGRAMS):
            failures += 1
    for name in PPTX_TARGETS:
        if not build_slides(name):
            failures += 1
    return failures


def build_single(name: str) -> int:
    if name in HTML_TARGETS:
        source, max_pages = HTML_TARGETS[name]
        ok = build_html(name, source, max_pages)
        if ok:
            show_fonts(EXAMPLES / f"{name}.pdf")
        return 0 if ok else 1
    if name in DIAGRAM_TARGETS:
        source = DIAGRAM_TARGETS[name]
        ok = build_html(name, source, 0, src_dir=DIAGRAMS)
        return 0 if ok else 1
    if name in PPTX_TARGETS:
        return 0 if build_slides(name) else 1
    known = list(HTML_TARGETS) + list(DIAGRAM_TARGETS) + list(PPTX_TARGETS)
    print(f"ERROR: unknown target: {name}. Known: {', '.join(known)}")
    return 2


def show_fonts(pdf: Path) -> None:
    if not pdf.exists():
        return
    try:
        out = subprocess.run(["pdffonts", str(pdf)], capture_output=True, text=True, check=False)
        if out.returncode == 0:
            print("--- pdffonts ---")
            print(out.stdout.rstrip())
    except FileNotFoundError:
        pass  # pdffonts not installed; silent


# ------------------------- sync -------------------------

ROOT_BLOCK = re.compile(r":root\s*\{([^}]*)\}", re.DOTALL)
CSS_VAR = re.compile(r"--([\w-]+)\s*:\s*([^;]+);")
TOKENS_FILE = ROOT / "references" / "tokens.json"


def sync_check(verbose: bool = False) -> int:
    if not TOKENS_FILE.exists():
        print(f"ERROR: tokens.json not found at {TOKENS_FILE.relative_to(ROOT)}")
        return 1

    try:
        canonical: dict[str, str] = json.loads(TOKENS_FILE.read_text())
    except json.JSONDecodeError as exc:
        print(f"ERROR: tokens.json is malformed: {exc}")
        return 1

    targets: list[Path] = list(TEMPLATES.glob("*.html"))
    if DIAGRAMS.exists():
        targets.extend(DIAGRAMS.glob("*.html"))

    drift: list[tuple[str, str, str, str]] = []  # (file, token, expected, actual)

    for path in sorted(targets):
        text = path.read_text(encoding="utf-8", errors="replace")
        block_match = ROOT_BLOCK.search(text)
        if not block_match:
            if verbose:
                print(f"  (skip {path.name}: no :root block)")
            continue
        root_block = block_match.group(1)
        found: dict[str, str] = {
            m.group(1): m.group(2).strip()
            for m in CSS_VAR.finditer(root_block)
        }
        rel = path.relative_to(ROOT)
        for token, expected in canonical.items():
            name = token.lstrip("-")
            actual = found.get(name)
            # Only flag if the template defines the token but with a wrong value.
            # Templates that don't use a token don't need to define it.
            if actual is not None and actual.lower() != expected.lower():
                drift.append((str(rel), token, expected, actual))

    if not drift:
        print(f"OK: tokens in sync across {len(targets)} template(s)")
        return 0

    print(f"\n[token-drift] {len(drift)}")
    for file, token, expected, actual in drift:
        print(f"  {file}: {token} expected {expected}, got {actual}")

    return 1


# ------------------------- verify -------------------------

PLACEHOLDER = re.compile(r"\{\{[^}]+\}\}")

# Primary fonts expected in embedded PDF font names
CN_PRIMARY_FONTS = {"TsangerJinKai02"}
EN_PRIMARY_FONTS = {"Charter"}


def _pdf_font_names(pdf_path: Path) -> set[str]:
    def _resolve_pdf_obj(obj):
        if obj is None:
            return None
        try:
            return obj.get_object() if hasattr(obj, "get_object") else obj
        except Exception:
            return obj

    try:
        from pypdf import PdfReader
        reader = PdfReader(str(pdf_path))
        fonts: set[str] = set()
        for page in reader.pages:
            resources = _resolve_pdf_obj(page.get("/Resources"))
            if resources is None or not hasattr(resources, "get"):
                continue
            font_dict = _resolve_pdf_obj(resources.get("/Font"))
            if font_dict is None or not hasattr(font_dict, "values"):
                continue
            for obj in font_dict.values():
                resolved = _resolve_pdf_obj(obj)
                if resolved is None or not hasattr(resolved, "get"):
                    continue
                base = resolved.get("/BaseFont")
                if base:
                    fonts.add(str(base).lstrip("/"))
        return fonts
    except Exception as exc:
        print(f"  WARN: could not read font names from PDF: {exc}")
        return set()


def verify_target(name: str, source: str, max_pages: int, src_dir: Path) -> list[str]:
    issues: list[str] = []
    src = src_dir / source
    if not src.exists():
        issues.append(f"source not found: {src}")
        return issues

    try:
        from weasyprint import HTML
        from pypdf import PdfReader
    except ImportError:
        issues.append("missing deps: pip install weasyprint pypdf --break-system-packages")
        return issues

    EXAMPLES.mkdir(parents=True, exist_ok=True)
    out = EXAMPLES / f"{name}.pdf"
    HTML(str(src), base_url=str(src.parent)).write_pdf(str(out))

    # Set PDF metadata (only replaces placeholders, preserves filled values)
    author = infer_author()
    set_pdf_metadata(out, author=author)

    # page count check
    n = len(PdfReader(str(out)).pages)
    if max_pages and n > max_pages:
        issues.append(f"page overflow: {n} pages (limit {max_pages})")

    # font check
    embedded = _pdf_font_names(out)
    fallback_present = any(
        kw in font for font in embedded
        for kw in ("Georgia", "Palatino", "TsangerJinKai", "YuMincho", "Hiragino", "SourceHan", "Noto", "Charter", "Songti")
    )

    # Diagram templates are language-neutral and often rely on fallback stacks,
    # so only enforce that at least one recognizable serif/sans fallback exists.
    is_diagram = src_dir == DIAGRAMS
    if is_diagram:
        if not fallback_present:
            issues.append(f"no recognizable font embedded in {out.name}")
        return issues

    is_en = name.endswith("-en")
    expected = EN_PRIMARY_FONTS if is_en else CN_PRIMARY_FONTS
    if not any(exp in font_name for exp in expected for font_name in embedded):
        primary = next(iter(expected))
        if not fallback_present:
            issues.append(f"no recognizable font embedded in {out.name}")
        else:
            issues.append(f"primary font ({primary}) not embedded; using fallback")

    return issues


def verify_slides_target(name: str) -> list[str]:
    return [] if build_slides(name) else ["slides build failed"]


def verify_all(target: str | None = None) -> int:
    targets_to_run: dict[str, tuple[str, int, Path] | None] = {}
    if target:
        if target in HTML_TARGETS:
            src, mp = HTML_TARGETS[target]
            targets_to_run[target] = (src, mp, TEMPLATES)
        elif target in DIAGRAM_TARGETS:
            targets_to_run[target] = (DIAGRAM_TARGETS[target], 0, DIAGRAMS)
        elif target in PPTX_TARGETS:
            targets_to_run[target] = None
        else:
            print(f"ERROR: unknown target: {target}")
            return 2
    else:
        for name, (src, mp) in HTML_TARGETS.items():
            targets_to_run[name] = (src, mp, TEMPLATES)
        for name, src in DIAGRAM_TARGETS.items():
            targets_to_run[name] = (src, 0, DIAGRAMS)
        for name in PPTX_TARGETS:
            targets_to_run[name] = None

    failures = 0
    rows: list[tuple[str, str]] = []
    for name, config in targets_to_run.items():
        if config is None:
            issues = verify_slides_target(name)
        else:
            source, max_pages, src_dir = config
            issues = verify_target(name, source, max_pages, src_dir)
        if issues:
            rows.append((f"ERROR: {name}", "; ".join(issues)))
            failures += 1
        else:
            rows.append((f"OK: {name}", "ok"))

    for status, detail in rows:
        print(f"{status}: {detail}")

    return 0 if failures == 0 else 1


def check_placeholders(paths: list[str]) -> int:
    if not paths:
        print("ERROR: provide at least one HTML file to scan")
        return 2

    failures = 0
    for raw in paths:
        path = Path(raw)
        if not path.is_absolute():
            path = ROOT / path
        if not path.exists():
            print(f"ERROR: {raw}: file not found")
            failures += 1
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        hits = list(dict.fromkeys(PLACEHOLDER.findall(text)))
        rel = path.relative_to(ROOT) if path.is_relative_to(ROOT) else path
        if hits:
            print(f"ERROR: {rel}: unfilled placeholder(s): {', '.join(hits)}")
            failures += 1
        else:
            print(f"OK: {rel}: no placeholders")

    return 0 if failures == 0 else 1


# ------------------------- orphan check -------------------------

def check_orphans(paths: list[str]) -> int:
    """Scan PDF for text blocks whose last line has <= 2 words and < 15 chars."""
    try:
        import fitz  # PyMuPDF
    except ImportError:
        print("ERROR: PyMuPDF required: pip install pymupdf --break-system-packages")
        return 2

    if not paths:
        # Default: scan all example PDFs
        if EXAMPLES.exists():
            paths = [str(p) for p in sorted(EXAMPLES.glob("*.pdf"))]
        if not paths:
            print("ERROR: no PDF files to scan")
            return 2

    total = 0
    for raw in paths:
        path = Path(raw)
        if not path.exists():
            print(f"ERROR: {raw}: not found")
            continue
        doc = fitz.open(str(path))
        rel = path.relative_to(ROOT) if path.is_relative_to(ROOT) else path
        for page_num in range(len(doc)):
            page = doc[page_num]
            blocks = page.get_text("blocks")
            for bx0, by0, bx1, by1, text, block_no, block_type in blocks:
                if block_type != 0:  # text blocks only
                    continue
                lines = text.strip().splitlines()
                if len(lines) < 2:
                    continue
                last = lines[-1].strip()
                words = last.split()
                if len(words) <= 2 and len(last) < 15:
                    total += 1
                    print(f"  {rel} p{page_num + 1}: orphan: \"{last}\" ({len(words)} word(s), {len(last)} chars)")
        doc.close()

    if total == 0:
        print(f"OK: no orphans found across {len(paths)} PDF(s)")
        return 0

    print(f"\n{total} orphan(s) found across {len(paths)} PDF(s)")
    return 1


# ------------------------- check -------------------------

# Cool / neutral gray hex values that violate the "warm undertone only" rule.
COOL_GRAY_BLOCKLIST = {
    "#888", "#888888", "#666", "#666666", "#999", "#999999",
    "#ccc", "#cccccc", "#ddd", "#dddddd", "#eee", "#eeeeee",
    "#111", "#111111", "#222", "#222222", "#333", "#333333",
    "#444", "#444444", "#555", "#555555", "#777", "#777777",
    "#aaa", "#aaaaaa", "#bbb", "#bbbbbb",
    # Tailwind cool grays
    "#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb", "#f3f4f6",
    "#4b5563", "#374151", "#1f2937", "#111827",
    # Bootstrap-like neutrals
    "#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd",
    "#6c757d", "#495057", "#343a40", "#212529",
}

RGBA_BG_DIRECT = re.compile(r"background(?:-color)?\s*:\s*[^;]*rgba\s*\(", re.IGNORECASE)
RGBA_VAR_DEF = re.compile(r"--([\w-]+)\s*:\s*[^;]*rgba\s*\(", re.IGNORECASE)
BG_VAR_USE = re.compile(r"background(?:-color)?\s*:\s*[^;]*var\s*\(\s*--([\w-]+)", re.IGNORECASE)
RGBA_BORDER_DIRECT = re.compile(r"border(?:-\w+)?\s*:\s*[^;]*rgba\s*\(", re.IGNORECASE)
BORDER_VAR_USE = re.compile(r"border(?:-\w+)?\s*:\s*[^;]*var\s*\(\s*--([\w-]+)", re.IGNORECASE)
LINE_HEIGHT_LOOSE = re.compile(r"line-height\s*:\s*1\.[6-9]\d*", re.IGNORECASE)
UNICODE_ARROW = re.compile(r"→")  # U+2192; should not appear in EN template body
HEX_ANY = re.compile(r"#[0-9a-fA-F]{3,6}\b")


@dataclass
class Finding:
    file: Path
    line: int
    rule: str
    excerpt: str


def scan_file(path: Path) -> list[Finding]:
    findings: list[Finding] = []
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()

    # Pass 1: collect variable names that hold rgba(...) so the tag-background
    # bug can be detected through one level of indirection.
    rgba_vars: set[str] = set()
    for raw in lines:
        m = RGBA_VAR_DEF.search(raw)
        if m:
            rgba_vars.add(m.group(1))

    is_en = path.name.endswith("-en.html")

    # Pass 2: per-line rule checks
    for i, raw in enumerate(lines, start=1):
        line = raw.strip()
        if not line or line.startswith("//") or line.startswith("#"):
            continue

        if RGBA_BG_DIRECT.search(raw):
            findings.append(Finding(path, i, "rgba-background",
                                    "rgba() used directly on background (tag double-rectangle bug)"))

        bg_var = BG_VAR_USE.search(raw)
        if bg_var and bg_var.group(1) in rgba_vars:
            findings.append(Finding(path, i, "rgba-background",
                                    f"background: var(--{bg_var.group(1)}) resolves to rgba() (tag double-rectangle bug)"))

        if RGBA_BORDER_DIRECT.search(raw):
            findings.append(Finding(path, i, "rgba-border",
                                    "rgba() used on border (violates solid-color invariant)"))

        border_var = BORDER_VAR_USE.search(raw)
        if border_var and border_var.group(1) in rgba_vars:
            findings.append(Finding(path, i, "rgba-border",
                                    f"border: var(--{border_var.group(1)}) resolves to rgba() (solid-color invariant)"))

        if is_en and UNICODE_ARROW.search(raw):
            # skip CSS comment lines (/* ... */) and the arrow-in-CSS-content patterns
            stripped = raw.lstrip()
            if not stripped.startswith("/*") and not stripped.startswith("*") and "content:" not in raw:
                findings.append(Finding(path, i, "arrow-unicode-in-en",
                                        "→ (U+2192) in English template; use 'to' or '->' per patterns §2"))

        m = LINE_HEIGHT_LOOSE.search(raw)
        if m:
            findings.append(Finding(path, i, "line-height-too-loose",
                                    f"{m.group(0)} exceeds 1.55 ceiling"))

        for hex_match in HEX_ANY.finditer(raw):
            h = hex_match.group(0).lower()
            if h in COOL_GRAY_BLOCKLIST:
                findings.append(Finding(path, i, "cool-gray",
                                        f"{h} is a cool / neutral gray, use warm undertone"))
    return findings


def check_all(verbose: bool) -> int:
    targets: list[Path] = []
    for p in TEMPLATES.glob("*.html"):
        targets.append(p)
    for p in TEMPLATES.glob("*.py"):
        targets.append(p)
    if DIAGRAMS.exists():
        for p in DIAGRAMS.glob("*.html"):
            targets.append(p)

    findings: list[Finding] = []
    for p in sorted(targets):
        file_findings = scan_file(p)
        findings.extend(file_findings)
        if verbose:
            print(f"scanned {p.relative_to(ROOT)}: {len(file_findings)} finding(s)")

    if not findings:
        print(f"OK: no violations across {len(targets)} templates")
        return 0

    by_rule: dict[str, list[Finding]] = {}
    for f in findings:
        by_rule.setdefault(f.rule, []).append(f)

    print(f"ERROR: {len(findings)} violation(s) across {len({f.file for f in findings})} file(s)")
    for rule, items in by_rule.items():
        print(f"\n[{rule}] {len(items)}")
        for f in items:
            rel = f.file.relative_to(ROOT)
            print(f"  {rel}:{f.line}  {f.excerpt}")
    return 1


# ------------------------- entry -------------------------

def main(argv: list[str]) -> int:
    args = argv[1:]
    if not args:
        return build_all()
    if args[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    if args[0] == "--check":
        verbose = "-v" in args[1:] or "--verbose" in args[1:]
        css_result = check_all(verbose)
        sync_result = sync_check(verbose)
        return max(css_result, sync_result)
    if args[0] == "--sync":
        verbose = "-v" in args[1:] or "--verbose" in args[1:]
        return sync_check(verbose)
    if args[0] == "--verify":
        target = args[1] if len(args) > 1 and not args[1].startswith("-") else None
        return verify_all(target)
    if args[0] == "--check-orphans":
        return check_orphans(args[1:])
    if args[0] in ("--check-placeholders", "--verify-filled"):
        return check_placeholders(args[1:])
    return build_single(args[0])


if __name__ == "__main__":
    sys.exit(main(sys.argv))

=== FILE: .claude/skills/kami/scripts/package-skill.sh ===
#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-"$ROOT/dist/kami.zip"}"

mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"

cd "$ROOT"

MANIFEST="$(mktemp)"
FILTERED_MANIFEST="$(mktemp)"
trap 'rm -f "$MANIFEST" "$FILTERED_MANIFEST"' EXIT

git ls-files > "$MANIFEST"
awk '
  /^assets\/fonts\/TsangerJinKai02-W0[45]\.ttf$/ { next }
  /^assets\/examples\// { next }
  /^dist\// { next }
  /^\.vercel\// { next }
  /(^|\/)__pycache__\// { next }
  /\.pyc$/ { next }
  /(^|\/)\.DS_Store$/ { next }
  { print }
' "$MANIFEST" > "$FILTERED_MANIFEST"

zip -q "$OUT" -@ < "$FILTERED_MANIFEST"

if zipinfo -1 "$OUT" | grep -qE 'assets/fonts/TsangerJinKai02-W0[45]\.ttf$'; then
  echo "ERROR: bundled TsangerJinKai02 TTF found in $OUT" >&2
  exit 1
fi

echo "OK: wrote $OUT"

=== FILE: .claude/skills/kami/scripts/stabilize.py ===
#!/usr/bin/env python3
"""kami stabilize

Stabilize HTML templates with deterministic normalization and optional overflow solving.

Usage:
    python3 scripts/stabilize.py all
    python3 scripts/stabilize.py one-pager resume-en --out-dir /tmp/kami-stabilized --report
    python3 scripts/stabilize.py one-pager --write --strict --report
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import tempfile
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = ROOT / "assets" / "templates"
PROFILES_FILE = ROOT / "references" / "stabilizer_profiles.json"
TOKENS_FILE = ROOT / "references" / "tokens.json"
DEFAULT_OUT_DIR = ROOT / "dist" / "stabilized"

# HTML targets only. Diagrams/slides are intentionally excluded from stabilize v0.
HTML_TARGETS: dict[str, tuple[str, int]] = {
    "one-pager": ("one-pager.html", 1),
    "letter": ("letter.html", 1),
    "long-doc": ("long-doc.html", 0),
    "portfolio": ("portfolio.html", 0),
    "resume": ("resume.html", 2),
    "one-pager-en": ("one-pager-en.html", 1),
    "letter-en": ("letter-en.html", 1),
    "long-doc-en": ("long-doc-en.html", 0),
    "portfolio-en": ("portfolio-en.html", 0),
    "resume-en": ("resume-en.html", 2),
}

STYLE_BLOCK_RE = re.compile(r"(<style>\s*)(?P<css>.*?)(\s*</style>)", re.DOTALL | re.IGNORECASE)
ROOT_BLOCK_RE = re.compile(r"(^[ \t]*:root[ \t]*\{)(?P<body>.*?)(^[ \t]*\})", re.DOTALL | re.MULTILINE)
BODY_BLOCK_RE = re.compile(r"(^[ \t]*body[ \t]*\{)(?P<body>.*?)(^[ \t]*\})", re.DOTALL | re.MULTILINE)
SECTION_BLOCK_RE = re.compile(r"(^[ \t]*section[ \t]*\{)(?P<body>.*?)(^[ \t]*\})", re.DOTALL | re.MULTILINE)
PAGE_BLOCK_RE = re.compile(r"(^[ \t]*@page[ \t]*\{)(?P<body>.*?)(^[ \t]*\})", re.DOTALL | re.MULTILINE)

CSS_VAR_RE = re.compile(r"(--[\w-]+\s*:\s*)([^;]+)(;)")
RGBA_RE = re.compile(
    r"rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*((?:\d*\.\d+)|\d+)\s*\)",
    re.IGNORECASE,
)
HEX_RE = re.compile(r"#[0-9a-fA-F]{3,6}\b")
LINE_HEIGHT_RE = re.compile(r"(line-height\s*:\s*)([0-9]*\.?[0-9]+)(\s*;)", re.IGNORECASE)
FONT_SIZE_PT_RE = re.compile(r"(font-size\s*:\s*)([0-9]*\.?[0-9]+)(\s*pt\s*;)", re.IGNORECASE)
MARGIN_BOTTOM_PT_RE = re.compile(r"(margin-bottom\s*:\s*)([0-9]*\.?[0-9]+)(\s*pt\s*;)", re.IGNORECASE)
PAGE_MARGIN_MM_RE = re.compile(
    r"(margin\s*:\s*)([0-9]*\.?[0-9]+)mm\s+([0-9]*\.?[0-9]+)mm\s+([0-9]*\.?[0-9]+)mm\s+([0-9]*\.?[0-9]+)mm(\s*;)",
    re.IGNORECASE,
)

COOL_GRAY_BLOCKLIST = {
    "#888",
    "#888888",
    "#666",
    "#666666",
    "#999",
    "#999999",
    "#ccc",
    "#cccccc",
    "#ddd",
    "#dddddd",
    "#eee",
    "#eeeeee",
    "#111",
    "#111111",
    "#222",
    "#222222",
    "#333",
    "#333333",
    "#444",
    "#444444",
    "#555",
    "#555555",
    "#777",
    "#777777",
    "#aaa",
    "#aaaaaa",
    "#bbb",
    "#bbbbbb",
    "#6b7280",
    "#9ca3af",
    "#d1d5db",
    "#e5e7eb",
    "#f3f4f6",
    "#4b5563",
    "#374151",
    "#1f2937",
    "#111827",
    "#f8f9fa",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#6c757d",
    "#495057",
    "#343a40",
    "#212529",
}

PARCHMENT_RGB = (245, 244, 237)


@dataclass
class SolverStep:
    action: str
    before: float
    after: float
    unit: str
    pages_before: int
    pages_after: int


@dataclass
class TargetResult:
    target: str
    source: str
    output: str
    changed: bool
    max_pages: int
    pages_before: int | None
    pages_after: int | None
    status: str
    rules: dict[str, int] = field(default_factory=dict)
    solver_steps: list[SolverStep] = field(default_factory=list)
    notes: list[str] = field(default_factory=list)

    def to_json(self) -> dict[str, Any]:
        return {
            "target": self.target,
            "source": self.source,
            "output": self.output,
            "changed": self.changed,
            "max_pages": self.max_pages,
            "pages": {"before": self.pages_before, "after": self.pages_after},
            "status": self.status,
            "rules": self.rules,
            "solver_steps": [
                {
                    "action": s.action,
                    "before": s.before,
                    "after": s.after,
                    "unit": s.unit,
                    "pages_before": s.pages_before,
                    "pages_after": s.pages_after,
                }
                for s in self.solver_steps
            ],
            "notes": self.notes,
        }


def clamp(value: float, lower: float, upper: float) -> float:
    return max(lower, min(upper, value))


def round_number(value: float, digits: int = 3) -> float:
    return float(f"{value:.{digits}f}")


def deep_merge(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    result: dict[str, Any] = dict(base)
    for key, value in override.items():
        if isinstance(value, dict) and isinstance(result.get(key), dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result


def extract_css(html: str) -> tuple[str, re.Match[str]]:
    match = STYLE_BLOCK_RE.search(html)
    if not match:
        raise ValueError("missing <style> block")
    return match.group("css"), match


def replace_css(html: str, css: str, style_match: re.Match[str]) -> str:
    return html[: style_match.start("css")] + css + html[style_match.end("css") :]


def parse_hex(hex_code: str) -> tuple[int, int, int]:
    h = hex_code.lstrip("#")
    if len(h) == 3:
        h = "".join(ch * 2 for ch in h)
    if len(h) != 6:
        raise ValueError(f"unsupported hex: {hex_code}")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    r, g, b = rgb
    return f"#{r:02X}{g:02X}{b:02X}"


def blend_rgba_on_parchment(r: int, g: int, b: int, alpha: float) -> str:
    a = clamp(alpha, 0.0, 1.0)
    out = (
        round(PARCHMENT_RGB[0] + (r - PARCHMENT_RGB[0]) * a),
        round(PARCHMENT_RGB[1] + (g - PARCHMENT_RGB[1]) * a),
        round(PARCHMENT_RGB[2] + (b - PARCHMENT_RGB[2]) * a),
    )
    return rgb_to_hex(out)


def normalize_tokens(css: str, canonical_tokens: dict[str, str]) -> tuple[str, int]:
    match = ROOT_BLOCK_RE.search(css)
    if not match:
        return css, 0

    block = match.group("body")
    changed = 0
    for token, expected in canonical_tokens.items():
        token_name = token if token.startswith("--") else f"--{token}"
        token_re = re.compile(rf"({re.escape(token_name)}\s*:\s*)([^;]+)(;)", re.IGNORECASE)

        def token_repl(m: re.Match[str]) -> str:
            nonlocal changed
            actual = m.group(2).strip()
            if actual.lower() == expected.lower():
                return m.group(0)
            changed += 1
            return f"{m.group(1)}{expected}{m.group(3)}"

        block = token_re.sub(token_repl, block)

    if changed == 0:
        return css, 0
    new_css = css[: match.start("body")] + block + css[match.end("body") :]
    return new_css, changed


def normalize_rgba(css: str) -> tuple[str, int]:
    changed = 0

    def repl(m: re.Match[str]) -> str:
        nonlocal changed
        r, g, b = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
        a = float(m.group(4))
        if max(r, g, b) > 255:
            return m.group(0)
        solid = blend_rgba_on_parchment(r, g, b, a)
        changed += 1
        return solid

    return RGBA_RE.sub(repl, css), changed


def luminance(rgb: tuple[int, int, int]) -> float:
    r, g, b = rgb
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0


def normalize_cool_grays(css: str) -> tuple[str, int]:
    changed = 0

    def repl(m: re.Match[str]) -> str:
        nonlocal changed
        raw = m.group(0)
        normalized = raw.lower()
        if len(normalized) == 4:
            normalized = "#" + "".join(ch * 2 for ch in normalized[1:])
        if normalized not in COOL_GRAY_BLOCKLIST:
            return raw
        lum = luminance(parse_hex(normalized))
        if lum < 0.35:
            replacement = "#4D4C48"
        elif lum < 0.72:
            replacement = "#87867F"
        else:
            replacement = "#E8E6DC"
        if replacement.lower() == normalized:
            return raw
        changed += 1
        return replacement

    return HEX_RE.sub(repl, css), changed


def clamp_line_heights(css: str, minimum: float, maximum: float) -> tuple[str, int]:
    changed = 0

    def repl(m: re.Match[str]) -> str:
        nonlocal changed
        value = float(m.group(2))
        new_value = clamp(value, minimum, maximum)
        if abs(value - new_value) < 1e-6:
            return m.group(0)
        changed += 1
        return f"{m.group(1)}{round_number(new_value, 3)}{m.group(3)}"

    return LINE_HEIGHT_RE.sub(repl, css), changed


def _replace_in_block(
    css: str,
    block_re: re.Pattern[str],
    property_re: re.Pattern[str],
    transform: Any,
) -> tuple[str, bool, float | None, float | None]:
    block_match = block_re.search(css)
    if not block_match:
        return css, False, None, None

    block_body = block_match.group("body")
    prop_match = property_re.search(block_body)
    if not prop_match:
        return css, False, None, None

    before_value = float(prop_match.group(2))
    after_value = float(transform(before_value))
    if abs(after_value - before_value) < 1e-6:
        return css, False, before_value, before_value

    replacement = f"{prop_match.group(1)}{round_number(after_value, 3)}{prop_match.group(3)}"
    new_block = block_body[: prop_match.start()] + replacement + block_body[prop_match.end() :]
    new_css = css[: block_match.start("body")] + new_block + css[block_match.end("body") :]
    return new_css, True, before_value, after_value


def clamp_body_font(css: str, minimum: float, maximum: float) -> tuple[str, int]:
    new_css, changed, _, _ = _replace_in_block(
        css,
        BODY_BLOCK_RE,
        FONT_SIZE_PT_RE,
        lambda value: clamp(value, minimum, maximum),
    )
    return new_css, 1 if changed else 0


def clamp_body_line_height(css: str, minimum: float, maximum: float) -> tuple[str, int]:
    new_css, changed, _, _ = _replace_in_block(
        css,
        BODY_BLOCK_RE,
        LINE_HEIGHT_RE,
        lambda value: clamp(value, minimum, maximum),
    )
    return new_css, 1 if changed else 0


def clamp_section_gap(css: str, minimum: float, maximum: float) -> tuple[str, int]:
    new_css, changed, _, _ = _replace_in_block(
        css,
        SECTION_BLOCK_RE,
        MARGIN_BOTTOM_PT_RE,
        lambda value: clamp(value, minimum, maximum),
    )
    return new_css, 1 if changed else 0


def get_current_value(css: str, block_re: re.Pattern[str], prop_re: re.Pattern[str]) -> float | None:
    block_match = block_re.search(css)
    if not block_match:
        return None
    prop_match = prop_re.search(block_match.group("body"))
    if not prop_match:
        return None
    return float(prop_match.group(2))


def tighten_section_gap(css: str, minimum: float, step: float) -> tuple[str, bool, float, float]:
    value = get_current_value(css, SECTION_BLOCK_RE, MARGIN_BOTTOM_PT_RE)
    if value is None or value <= minimum + 1e-6:
        return css, False, 0.0, 0.0
    target = max(minimum, value - step)
    new_css, changed, before, after = _replace_in_block(
        css,
        SECTION_BLOCK_RE,
        MARGIN_BOTTOM_PT_RE,
        lambda _: target,
    )
    return new_css, changed, before or value, after or value


def tighten_body_line_height(css: str, minimum: float, step: float) -> tuple[str, bool, float, float]:
    value = get_current_value(css, BODY_BLOCK_RE, LINE_HEIGHT_RE)
    if value is None or value <= minimum + 1e-6:
        return css, False, 0.0, 0.0
    target = max(minimum, value - step)
    new_css, changed, before, after = _replace_in_block(
        css,
        BODY_BLOCK_RE,
        LINE_HEIGHT_RE,
        lambda _: target,
    )
    return new_css, changed, before or value, after or value


def tighten_body_font(css: str, minimum: float, step: float) -> tuple[str, bool, float, float]:
    value = get_current_value(css, BODY_BLOCK_RE, FONT_SIZE_PT_RE)
    if value is None or value <= minimum + 1e-6:
        return css, False, 0.0, 0.0
    target = max(minimum, value - step)
    new_css, changed, before, after = _replace_in_block(
        css,
        BODY_BLOCK_RE,
        FONT_SIZE_PT_RE,
        lambda _: target,
    )
    return new_css, changed, before or value, after or value


def tighten_page_margin(
    css: str,
    min_margins: list[float],
    step: float,
) -> tuple[str, bool, float, float]:
    block_match = PAGE_BLOCK_RE.search(css)
    if not block_match:
        return css, False, 0.0, 0.0
    block = block_match.group("body")
    margin_match = PAGE_MARGIN_MM_RE.search(block)
    if not margin_match:
        return css, False, 0.0, 0.0

    before = [float(margin_match.group(i)) for i in range(2, 6)]
    target = [max(min_margins[idx], before[idx] - step) for idx in range(4)]
    if all(abs(before[idx] - target[idx]) < 1e-6 for idx in range(4)):
        return css, False, 0.0, 0.0

    replacement = (
        f"{margin_match.group(1)}"
        f"{round_number(target[0], 3)}mm {round_number(target[1], 3)}mm "
        f"{round_number(target[2], 3)}mm {round_number(target[3], 3)}mm"
        f"{margin_match.group(6)}"
    )
    new_block = block[: margin_match.start()] + replacement + block[margin_match.end() :]
    new_css = css[: block_match.start("body")] + new_block + css[block_match.end("body") :]
    before_sum = sum(before)
    after_sum = sum(target)
    return new_css, True, before_sum, after_sum


def count_pages(html: str, base_dir: Path) -> int:
    try:
        from weasyprint import HTML
        from pypdf import PdfReader
    except ImportError as exc:
        raise RuntimeError("missing deps: pip install weasyprint pypdf --break-system-packages") from exc

    tmp_pdf: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(prefix="kami-stabilize-", suffix=".pdf", delete=False) as tmp:
            tmp_pdf = Path(tmp.name)
        HTML(string=html, base_url=str(base_dir)).write_pdf(str(tmp_pdf))
        return len(PdfReader(str(tmp_pdf)).pages)
    finally:
        if tmp_pdf and tmp_pdf.exists():
            tmp_pdf.unlink()


def load_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise FileNotFoundError(f"missing file: {path}")
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        raise ValueError(f"invalid json root object (expected dict): {path}")
    return raw


def _as_float(value: Any, field: str, target: str) -> float:
    try:
        return float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{target}: {field} must be numeric, got {value!r}") from exc


def _validate_range(profile: dict[str, Any], key: str, target: str) -> None:
    node = profile.get(key)
    if not isinstance(node, dict):
        raise ValueError(f"{target}: missing object field '{key}'")
    if "min" not in node or "max" not in node:
        raise ValueError(f"{target}: '{key}' must contain 'min' and 'max'")
    minimum = _as_float(node["min"], f"{key}.min", target)
    maximum = _as_float(node["max"], f"{key}.max", target)
    if minimum > maximum:
        raise ValueError(f"{target}: '{key}.min' ({minimum}) must be <= '{key}.max' ({maximum})")


def validate_profile(profile: dict[str, Any], target: str) -> None:
    for key in ("line_height", "body_font_size_pt", "body_line_height", "section_gap_pt"):
        _validate_range(profile, key, target)

    page_margin = profile.get("page_margin_mm")
    if not isinstance(page_margin, dict):
        raise ValueError(f"{target}: missing object field 'page_margin_mm'")
    min_margins = page_margin.get("min")
    if not isinstance(min_margins, list) or len(min_margins) != 4:
        raise ValueError(f"{target}: 'page_margin_mm.min' must be an array of 4 numbers")
    for idx, value in enumerate(min_margins):
        _as_float(value, f"page_margin_mm.min[{idx}]", target)

    solver = profile.get("overflow_solver")
    if not isinstance(solver, dict):
        raise ValueError(f"{target}: missing object field 'overflow_solver'")
    if "enabled" in solver and not isinstance(solver["enabled"], bool):
        raise ValueError(f"{target}: 'overflow_solver.enabled' must be a boolean")


def resolve_targets(raw_targets: list[str]) -> list[str]:
    if not raw_targets or raw_targets == ["all"] or "all" in raw_targets:
        return list(HTML_TARGETS.keys())

    resolved: list[str] = []
    for target in raw_targets:
        if target in HTML_TARGETS:
            resolved.append(target)
            continue
        # Accept source file names as aliases.
        normalized = target.removesuffix(".html")
        if normalized in HTML_TARGETS:
            resolved.append(normalized)
            continue
        for name, (source, _max_pages) in HTML_TARGETS.items():
            if source == target or source == f"{normalized}.html":
                resolved.append(name)
                break
        else:
            raise ValueError(f"unknown target: {target}")
    return resolved


def run_for_target(
    target: str,
    source_file: str,
    max_pages: int,
    profile: dict[str, Any],
    canonical_tokens: dict[str, str],
    write_in_place: bool,
    out_dir: Path,
    strict: bool,
) -> TargetResult:
    validate_profile(profile, target)

    source_path = TEMPLATES / source_file
    html = source_path.read_text(encoding="utf-8")
    css, style_match = extract_css(html)

    pages_before: int | None = None
    pages_after: int | None = None
    notes: list[str] = []

    try:
        pages_before = count_pages(html, source_path.parent)
    except RuntimeError as exc:
        notes.append(str(exc))

    rule_hits: dict[str, int] = {}
    changed = False

    css, hits = normalize_tokens(css, canonical_tokens)
    if hits:
        changed = True
    rule_hits["token_sync"] = hits

    css, hits = normalize_rgba(css)
    if hits:
        changed = True
    rule_hits["rgba_to_solid"] = hits

    css, hits = normalize_cool_grays(css)
    if hits:
        changed = True
    rule_hits["cool_gray_normalized"] = hits

    line_min = float(profile["line_height"]["min"])
    line_max = float(profile["line_height"]["max"])
    css, hits = clamp_line_heights(css, line_min, line_max)
    if hits:
        changed = True
    rule_hits["line_height_clamped"] = hits

    body_font_min = float(profile["body_font_size_pt"]["min"])
    body_font_max = float(profile["body_font_size_pt"]["max"])
    css, hits = clamp_body_font(css, body_font_min, body_font_max)
    if hits:
        changed = True
    rule_hits["body_font_clamped"] = hits

    body_lh_min = float(profile["body_line_height"]["min"])
    body_lh_max = float(profile["body_line_height"]["max"])
    css, hits = clamp_body_line_height(css, body_lh_min, body_lh_max)
    if hits:
        changed = True
    rule_hits["body_line_height_clamped"] = hits

    gap_min = float(profile["section_gap_pt"]["min"])
    gap_max = float(profile["section_gap_pt"]["max"])
    css, hits = clamp_section_gap(css, gap_min, gap_max)
    if hits:
        changed = True
    rule_hits["section_gap_clamped"] = hits

    html_after = replace_css(html, css, style_match)
    try:
        pages_after = count_pages(html_after, source_path.parent)
    except RuntimeError as exc:
        if str(exc) not in notes:
            notes.append(str(exc))

    solver_steps: list[SolverStep] = []
    solver_config = profile["overflow_solver"]
    if (
        max_pages > 0
        and solver_config.get("enabled", False)
        and pages_after is not None
        and pages_after > max_pages
        and not notes
    ):
        max_iterations = int(solver_config.get("max_iterations", 40))
        for _ in range(max_iterations):
            if pages_after <= max_pages:
                break

            progressed = False
            actions = [
                (
                    "tighten_section_gap",
                    lambda c: tighten_section_gap(
                        c,
                        gap_min,
                        float(solver_config.get("section_gap_step_pt", 1.0)),
                    ),
                    "pt",
                ),
                (
                    "tighten_body_line_height",
                    lambda c: tighten_body_line_height(
                        c,
                        body_lh_min,
                        float(solver_config.get("body_line_height_step", 0.02)),
                    ),
                    "ratio",
                ),
                (
                    "tighten_body_font",
                    lambda c: tighten_body_font(
                        c,
                        body_font_min,
                        float(solver_config.get("body_font_step_pt", 0.2)),
                    ),
                    "pt",
                ),
                (
                    "tighten_page_margin",
                    lambda c: tighten_page_margin(
                        c,
                        [float(v) for v in profile["page_margin_mm"]["min"]],
                        float(solver_config.get("margin_step_mm", 1.0)),
                    ),
                    "mm_total",
                ),
            ]

            for action_name, action_fn, unit in actions:
                candidate_css, applied, before, after = action_fn(css)
                if not applied:
                    continue
                candidate_html = replace_css(html, candidate_css, style_match)
                candidate_pages = count_pages(candidate_html, source_path.parent)
                solver_steps.append(
                    SolverStep(
                        action=action_name,
                        before=round_number(before, 3),
                        after=round_number(after, 3),
                        unit=unit,
                        pages_before=pages_after,
                        pages_after=candidate_pages,
                    )
                )
                css = candidate_css
                html_after = candidate_html
                pages_after = candidate_pages
                changed = True
                progressed = True
                if pages_after <= max_pages:
                    break

            if not progressed:
                notes.append("solver reached lower bounds before meeting page constraint")
                break

    if write_in_place:
        output_path = source_path
        if changed:
            output_path.write_text(html_after, encoding="utf-8")
    else:
        out_dir.mkdir(parents=True, exist_ok=True)
        output_path = out_dir / source_file
        output_path.write_text(html_after, encoding="utf-8")

    status = "ok"
    page_ok = True
    if max_pages > 0:
        if pages_after is None:
            status = "unverified-pages"
            page_ok = not strict
        elif pages_after > max_pages:
            status = "overflow"
            page_ok = False
    if strict and not page_ok:
        status = "failed-strict"

    result = TargetResult(
        target=target,
        source=str(source_path.relative_to(ROOT)),
        output=str(output_path.relative_to(ROOT) if output_path.is_relative_to(ROOT) else output_path),
        changed=changed,
        max_pages=max_pages,
        pages_before=pages_before,
        pages_after=pages_after,
        status=status,
        rules=rule_hits,
        solver_steps=solver_steps,
        notes=notes,
    )
    return result


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Stabilize Kami HTML templates.")
    parser.add_argument("targets", nargs="*", default=["all"], help="Target names or 'all'")
    parser.add_argument(
        "--write",
        action="store_true",
        help="Write changes back to source templates (default writes to --out-dir)",
    )
    parser.add_argument(
        "--out-dir",
        default=str(DEFAULT_OUT_DIR),
        help="Output directory when not using --write",
    )
    parser.add_argument(
        "--report",
        action="store_true",
        help="Write a JSON report with before/after pages and applied rules",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Return non-zero when constrained targets still exceed page limits",
    )
    return parser


def main(argv: list[str]) -> int:
    parser = build_arg_parser()
    args = parser.parse_args(argv[1:])

    try:
        targets = resolve_targets(args.targets)
    except ValueError as exc:
        print(f"ERROR: {exc}")
        return 2

    try:
        tokens = load_json(TOKENS_FILE)
        profiles = load_json(PROFILES_FILE)
    except (FileNotFoundError, json.JSONDecodeError, ValueError) as exc:
        print(f"ERROR: {exc}")
        return 2

    if not all(isinstance(k, str) and isinstance(v, str) for k, v in tokens.items()):
        print("ERROR: invalid tokens.json, expected string->string map")
        return 2

    defaults = profiles.get("defaults", {})
    target_profiles = profiles.get("targets", {})
    if not isinstance(defaults, dict) or not isinstance(target_profiles, dict):
        print("ERROR: invalid stabilizer_profiles.json, expected keys: defaults(object), targets(object)")
        return 2

    out_dir = Path(args.out_dir)
    all_results: list[TargetResult] = []
    strict_failed = False

    for target in targets:
        source_file, max_pages = HTML_TARGETS[target]
        merged_profile = deep_merge(defaults, target_profiles.get(target, {}))
        try:
            result = run_for_target(
                target=target,
                source_file=source_file,
                max_pages=max_pages,
                profile=merged_profile,
                canonical_tokens=tokens,
                write_in_place=args.write,
                out_dir=out_dir,
                strict=args.strict,
            )
        except ValueError as exc:
            print(f"ERROR: {exc}")
            return 2
        all_results.append(result)
        strict_failed = strict_failed or result.status == "failed-strict"

        page_note = (
            f"{result.pages_after}/{result.max_pages}"
            if result.max_pages > 0 and result.pages_after is not None
            else (str(result.pages_after) if result.pages_after is not None else "n/a")
        )
        print(
            f"{result.status.upper()}: {result.target} | changed={result.changed} "
            f"| pages={page_note} | output={result.output}"
        )
        for note in result.notes:
            print(f"  note: {note}")

    if args.report:
        report_path = out_dir / "stabilize-report.json"
        report_path.parent.mkdir(parents=True, exist_ok=True)
        report = {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "write_mode": bool(args.write),
            "strict": bool(args.strict),
            "targets": [r.to_json() for r in all_results],
        }
        report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
        rel = report_path.relative_to(ROOT) if report_path.is_relative_to(ROOT) else report_path
        print(f"REPORT: {rel}")

    if strict_failed:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))

