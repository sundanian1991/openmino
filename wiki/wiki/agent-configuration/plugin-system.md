# Plugin System

> Sources: Mino, 2026-02-15 ~, 2026-04-26
> Raw:[compound-knowledge-plugin-README](../../raw/claude-plugins/compound-knowledge-plugin-README.md); [compound-knowledge-plugin-AGENTS](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-AGENTS.md); [compound-knowledge-plugin-CHANGELOG](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-CHANGELOG.md); [compound-knowledge-plugin-PRIVACY](../../raw/claude-plugins/compound-knowledge-plugin-PRIVACY.md); [compound-knowledge-plugin-SECURITY](../../raw/claude-plugins/compound-knowledge-plugin-SECURITY.md); [compound-knowledge-plugin/agents/research/past-work-researcher](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-research-past-work-researcher.md)

## 概述

Plugins are compound knowledge packages that bundle skills, agents, and workflows. The primary installed plugin is Compound Knowledge — a knowledge work system that makes each cycle faster by accumulating learnings in markdown files.

## Compound Knowledge Plugin

### Architecture

```
compound-knowledge/
├── skills/                    # 6 workflow skills
│   ├── kw-brainstorm/SKILL.md
│   ├── kw-plan/SKILL.md
│   ├── kw-confidence/SKILL.md
│   ├── kw-review/SKILL.md
│   ├── kw-work/SKILL.md
│   └── kw-compound/SKILL.md
├── agents/
│   ├── review/
│   │   ├── strategic-alignment-reviewer.md
│   │   └── data-accuracy-reviewer.md
│   └── research/
│       ├── knowledge-base-researcher.md
│       ├── past-work-researcher.md
│       └── stale-knowledge-checker.md
├── README.md / CHANGELOG.md / PRIVACY.md / SECURITY.md
└── LICENSE (MIT)
```

**Components**: 6 skills, 2 review agents, 3 research agents.

### The Loop

```
/kw:brainstorm   →  Brain dump, pull references, find the shape
/kw:plan         →  Structure into actionable plan (searches past learnings)
/kw:confidence   →  Gut-check what you know vs. don't (callable anytime)
/kw:review       →  Strategic alignment + data accuracy (parallel)
/kw:work         →  Execute plan, produce deliverables
/kw:compound     →  Save learnings for next time
```

Each cycle makes the next faster. `/kw:plan` searches `docs/knowledge/` for past insights saved by `/kw:compound`. Knowledge compounds over time.

### Workflow Details

**Brainstorm**: Paste meeting transcripts, brain dump raw thoughts, describe problems. Auto-searches knowledge base and past plans. Extracts key decisions, open questions, constraints, tensions.

**Plan**: Structures brainstorm into actionable plan using Pyramid Principle (lead with answer). Three detail tiers: Quick (gut checks), Standard (most plans), Deep (multi-quarter strategies). Launches parallel research agents for past work and saved learnings.

**Confidence**: Callable at any point. Honest assessment of known vs unknown in plain language. Produces "confident about / less confident about / my recommendation" breakdown with specific gap-closing actions.

**Review**: Two parallel reviewers:
- **Strategic Alignment** — Goal clarity, falsifiable hypothesis, solving right problem
- **Data Accuracy** — Numbers sourced, baselines explicit, data freshness

Findings merged, grouped by severity: P1 (blocks shipping) / P2 (should fix) / P3 (nice to have).

**Work**: Execute plan. Break into tasks, group by dependency, run independent tasks in parallel. Writes execution log back to plan file for compound to learn from.

**Compound**: Extract 1-3 learnings from session. Check for stale knowledge contradicted by new learning. Save to `docs/knowledge/` with searchable YAML frontmatter.

### Knowledge Storage Format

```yaml
# docs/knowledge/trial-conversion-timing.md
---
type: insight
tags: [trials, conversion, campaigns]
confidence: high
created: 2026-02-15
source: Q1 trial campaign analysis
---

# Title

Insight content here...
```

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Generic over specific** | No company-specific references. Project context from CLAUDE.md |
| **Opinionated but adaptable** | Strong defaults (Pyramid Principle, P1/P2/P3), adapt to any project |
| **Local first** | `docs/knowledge/` is primary store. External integrations optional |
| **Progressive disclosure** | Start with 6 workflows. Add skills/agents as patterns emerge |

### Customization

The plugin reads project's `CLAUDE.md` for:
- Business context and goals (strategic alignment reviewer)
- Data source hierarchy (data accuracy reviewer)
- Style guides and conventions (during execution)

Works without CLAUDE.md — just lacks project-specific context.

### Security & Privacy

| Aspect | Detail |
|--------|--------|
| **Runtime** | 100% local, no network dependencies |
| **Data** | No external services, no telemetry |
| **Access** | Reads/writes only local filesystem (`plans/`, `docs/knowledge/`) |
| **Code** | 100% markdown prompt files — no executable code, no dependencies |
| **Attack surface** | Limited to prompt instructions themselves |
| **Caution** | Ensure CLAUDE.md contains no secrets (review agents process it) |

## Configuration System

### Directories

| Path | Purpose |
|------|---------|
| `.claude/rules/` | Core rules (auto-loaded every session) |
| `.claude/rules/reference/` | Extended rules (loaded on demand) |
| `.claude/commands/` | Slash commands |
| `.claude/skills/` | Installed skills (~76) |
| `plans/` | Active task plans and knowledge work output |
| `docs/knowledge/` | Compounded knowledge (searchable by /kw:plan) |
| `memory/` | Memory system (detailed in memory-protocol) |

### Config Paths

```
commandsDir: ./.claude/commands
skillsDir: ./.claude/skills
```

### Environment

| Component | Requirement |
|-----------|-------------|
| Node.js | 18+ |
| npm | 9+ |
| Git | 2.30+ |
| macOS | 12.0+ |

### MCP Tools

| Tool | Purpose | Scope |
|------|---------|-------|
| tavily-mcp | Web search/API | Project-level |
| web-search | Chinese web search | Project-level |
| webReader | Web → Markdown (100/month) | Project-level |
| memory | Knowledge graph memory | Global |
| openclaw-markdown | Markdown protocol | Global |

### Plugin Installation

```bash
# Via Claude Code plugin marketplace
/plugin marketplace add EveryInc/compound-knowledge-plugin
/plugin install compound-knowledge
```
