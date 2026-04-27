# Skill Ecosystem

> Sources: Mino, 2026-02-12 ~ 2026-04-26
> Raw:  — 501 files, [skill-search](../../raw/agent-rules/skill-search.md)

## Overview

The skill ecosystem comprises 501 files across ~76 installed skills covering visualization, document generation, knowledge work, data processing, presentations, and domain expertise. Skills follow on-demand installation — never batch install.

## Skill Management Principles

| Principle | Description |
|-----------|-------------|
| **On-demand install** | Search first, recommend 1-3, confirm, then install |
| **No batch install** | Install only what's needed for current task |
| **Check SKILL.md first** | Read skill instructions before invoking |
| **Simple tasks skip check** | Tasks ≤3 steps don't need skill check |
| **Uncertain → check** | If task is outside current knowledge scope, read SKILL.md first |

## Skill Discovery Sources

| Priority | Platform | Notes |
|----------|----------|-------|
| 1 | Tencent SkillHub | 1.3万 Skills, China-optimized |
| 2 | ClawHub | China mirror |
| 3 | claw123.ai | OpenClaw international |

**API**: `curl -s https://clawhub.ai/api/skills.zh.json`

## Installed Skills Inventory

### Visualization & Design (12 skills)

| Skill | Capability |
|-------|-----------|
| **chart-visualization** | 26 chart types via matplotlib — bar, line, pie, scatter, sankey, fishbone, mind map, org chart, network graph, funnel, etc. |
| **echarts-visualization** | Interactive ECharts HTML — sankey, candlestick, map, heatmap, treemap, graph, radar, gauge, calendar, theme river, etc. |
| **diagram-design** | 13 diagram types as HTML+SVG — architecture, flowchart, sequence, state machine, ER, timeline, swimlane, quadrant, nested, tree, layer stack, venn, pyramid |
| **data-storytelling** | Data narrative strategy and content organization layer |
| **data-visualization** | Chart type selection + Python matplotlib generation |
| **narrative-text-visualization** | Structured narrative text visualization (T8 engine) |
| **infographic-creator** | Text-to-infographic HTML generation |
| **svg-flow-diagram** | Standalone SVG flowcharts and process maps |
| **hand-drawn-icon** | Hand-drawn SVG icon generation |
| **icon-retrieval** | Search and retrieve icon SVGs from libraries |
| **impeccable** | High-quality frontend design — unique, production-grade interfaces |
| **cinematic-ui** | Film-inspired visual systems for websites |

### Document & Presentation (10 skills)

| Skill | Capability |
|-------|-----------|
| **html-ppt-skill** | Static HTML presentations — 36 themes, 15 full-deck templates, 31 layouts, 27 CSS animations, 20 canvas FX, presenter mode |
| **pptx** | PowerPoint advanced operations — create, edit, annotations, speaker notes |
| **pptx-deck-builder** | PptxGenJS deck generation with professional formatting |
| **presentation-skill** | Speech script + PPT auto-generation |
| **guizang-ppt-skill** | "Electronic magazine × electronic ink" style horizontal flip HTML PPT |
| **frontend-slides** | Animation-rich HTML presentations from scratch |
| **docx** | Word document advanced operations — create, edit, revision tracking |
| **minimax-docx** | DOCX via OpenXML SDK (.NET) |
| **minimax-pdf** | High-quality PDF creation with visual design |
| **minimax-xlsx** | Excel spreadsheet operations |
| **xlsx** | Excel formula, formatting, data analysis |
| **kami** | Professional document typesetting — resumes, white papers, legal docs |
| **official-doc** | Official document drafting — supplier management, compliance, coordination |

### Knowledge Work (12 skills)

| Skill | Capability |
|-------|-----------|
| **kw-workflow** | One-click full workflow: brainstorm → plan → review → work → compound |
| **kw-brainstorm** | Brain dump, pull references, find the shape |
| **kw-plan** | Structure into actionable plan, search past learnings |
| **kw-confidence** | Assess known vs unknown, plain language breakdown |
| **kw-review** | Parallel strategic alignment + data accuracy review |
| **kw-work** | Execute plan, break into tasks, run in parallel |
| **kw-compound** | Extract learnings, save to docs/knowledge/ with frontmatter |
| **knowledge-distiller** | Knowledge extraction and summarization |
| **work** | Business management reflection — scenario-based thinking frameworks |
| **work-expression** | Work expression polishing — oral to qualitative+quantitative |
| **kw-review** | Multi-reviewer quality check for knowledge work |
| **task-alignment** | Alignment conversation starting from idea, co-decide |

### Data & Office (5 skills)

| Skill | Capability |
|-------|-----------|
| **antv-s2-expert** | S2 multi-dimensional cross-analysis table (pivot tables) |
| **editorial-card-generator** | Text to editorial-style HTML5 informational cards |
| **markdown-converter** | Document to Markdown converter (PDF, Word, etc.) |
| **pdf** | Comprehensive PDF manipulation — extract text, tables |
| **find-skills** | Skill discovery assistant |

### Domain Expertise (5 skills)

| Skill | Capability |
|-------|-----------|
| **supplier-mentor** | P12+ supplier management mentor — judgment, frameworks, risk assessment |
| **lenny-skills** | Business decision advisor based on Lenny's Newsletter/Podcast |
| **agent-browser** | Browser automation — open pages, fill forms, click, screenshot, scrape |
| **work** | Business management daily thinking — scenario-matched thinking frameworks |

### Meta & Self-Improvement (6 skills)

| Skill | Capability |
|-------|-----------|
| **skill-creator** | Create, modify, and improve skills |
| **darwin-skill** | Autonomous skill optimizer — evaluate, prune, evolve |
| **ownership-skills** | End-to-end ownership awareness |
| **taste** | Develop aesthetic judgment through human feedback |
| **taste-agency** | Judgment and action calibration |
| **legacy-vault** | Archive skill manager for legacy skills |

### Personal & Utility (10 skills)

| Skill | Capability |
|-------|-----------|
| **daily-letter** | Daily letter skill — 10-year memory slices |
| **getnote** | Note saving service |
| **ima-note** | IMA personal note service API |
| **download-anything** | Download virtually any digital resource |
| **ljg-card** | Content caster — transform content into PNG visuals |
| **ljg-xray-book** | Deep structure extraction from books |
| **ljg-xray-paper** | Paper X-ray — extract problem-perspective-results |
| **arming-thought** | "Seek truth from facts" principle at conversation start |
| **person-observer** | Person observation and analysis |
| **workspace-tidy** | Three-area file lifecycle management |

### Frontend & Web (6 skills)

| Skill | Capability |
|-------|-----------|
| **mino-frontend** | Custom frontend skill — HTML slides, dashboards, pages, posters |
| **huashu-design** | High-fidelity prototypes, interaction demos, slides via HTML |
| **impeccable.bak** | Backup of impeccable skill |
| **task-dispatcher** | General task execution scheduler — IPOFA five-ring process |
| **task-implement** | Autonomous task execution driven by task documents |

### Task & Execution (4 skills)

| Skill | Capability |
|-------|-----------|
| **task-dispatcher** | General task scheduler — IPOFA process |
| **task-implement** | Autonomous execution from task documents |
| **task-alignment** | Idea alignment and co-decision |
| **ultrawork** | (Also available as command) Exhaustive work mode |

## Skill Categories Summary

| Category | Count | Key Capabilities |
|----------|-------|-----------------|
| Visualization & Design | 12 | Charts, diagrams, SVG, infographics |
| Document & Presentation | 12 | PPT, Word, PDF, Excel, official docs |
| Knowledge Work | 12 | Brainstorm, plan, review, compound |
| Data & Office | 5 | Pivot tables, cards, converters |
| Domain Expertise | 5 | Supplier management, business advisor |
| Meta & Self-Improvement | 6 | Skill creation, ownership, taste |
| Personal & Utility | 10 | Daily letters, notes, downloads |
| Frontend & Web | 6 | HTML prototypes, dashboards |
| Task & Execution | 4 | Scheduling, autonomous execution |

**Total**: ~76 skills, 501 files

## Skill Usage Guidelines

- **Simple tasks (≤3 steps)**: Answer directly, no skill check needed
- **Complex tasks**: Check if relevant skill exists, read SKILL.md, then invoke
- **Uncertain domain**: If outside current knowledge, read SKILL.md first
- **Never batch install**: Search → recommend → confirm → install one at a time
- **Clean up regularly**: Remove unused skills, archive legacy ones
