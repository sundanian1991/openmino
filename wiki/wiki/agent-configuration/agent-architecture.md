# Agent Architecture

> Sources: Mino, 2026-02-12 ~, 2026-04-23
> Raw: [AGENT-FIRST](../../raw/agent-rules/AGENT-FIRST.md), [08-WORKFLOW](../../raw/claude-reference/08-WORKFLOW.md), [09-TOOLS](../../raw/claude-reference/09-TOOLS.md)

## 概述

Sub-agent strategy defines how the main agent delegates work to preserve context. Core principle: main agent is the referee, sub-agents are the athletes. Exploration goes to sub-agents, decisions stay with main agent.

## Main Agent Boundary

**Core responsibilities**: intent recognition → task decomposition → delegate sub-agents → aggregate results → deliver

The main agent **does not participate** in concrete execution (reading multiple files, deep analysis, writing code, search research).

**Exceptions** (direct execution, no Agent overhead):

| Operation | Condition |
|-----------|-----------|
| Read file | Only 1 known path |
| Search | Simple grep/glob, results ≤5, no deep analysis needed |
| Modify | Single file, single line |
| Other | Strict sequential dependency / user says "just do it" |

Beyond scope → **must delegate to sub-agent**.

## Context Isolation — Three Principles

> Context is non-renewable. Exploration generates noise, decisions need clarity.

| Principle | Practice |
|-----------|----------|
| **Exploration → sub-agent, decision → main** | Multi-file/multi-path/trial-and-error → delegate. Sub-agents bring back only conclusions, noise auto-cleaned |
| **Main context holds only decision info** | Sub-agent results retain only decision-relevant parts |
| **Rather delegate than read** | ≥2 file reads → delegate, don't read one by one in main context |

## Sub-Agent Quantity Limit

Parallel sub-agents per batch **≤ 5**. Exceed → batch them. Main agent controls rhythm.

## Sub-Agent Types

| Type | Use Case |
|------|----------|
| **Explore** | Search files, keywords, explore directory structure |
| **Plan** | Design plans, architecture decisions, compare options |
| **general-purpose** | Deep research, complex multi-step tasks |
| **Expert agents** | Domain tasks (judge→suppliers, accountant→data, clerk→documents) |

**Selection**: Expert > general-purpose > Explore. Use the lightest that solves the problem.

## Mandatory Trigger Conditions

| Scenario | Strategy |
|----------|----------|
| Search/query | Split by keyword/directory, parallel |
| File processing | Split by file/directory/module, parallel |
| Data analysis | Split by dimension/metric/time period, parallel |
| Multi-step tasks | One sub-agent per step, main coordinates |
| Cross-domain tasks | One expert agent per domain |
| Code review | Split by file/module, parallel |
| Document generation | Split by chapter/topic, parallel |

## Execution Principles

1. **Parallel over serial** — 3 independent searches → 3 sub-agents simultaneously
2. **Deep over shallow** — Sub-agents can create grandchild agents
3. **Divide over monopolize** — Complex tasks split to expert agents
4. **Breadth before depth** — Wide coverage first, then focus
5. **Lightweight no detour** — Single file/simple search main agent does directly

## Light vs Heavy Judgment

**Core question: Will this pollute main context?**

| Dimension | Light (direct) | Heavy (delegate) |
|-----------|---------------|------------------|
| File count | 1 | ≥2 |
| Search scope | Single directory/pattern | Cross-directory/multi-pattern |
| Result volume | ≤5 items | >5 or needs deep analysis |
| Complexity | One step | Multi-step reasoning/research |
| Independent context | Not needed | Needed |
| Exploration noise | Won't generate | Will → must isolate |

## Decision Checklist

Light? → Direct. Can split? → ≤5 per batch. Right agent type? → Accept one by one.

## Anti-patterns (Forbidden)

Serial searching, taking on everything, over-splitting, not aggregating results, not using agents when needed, misusing agents when not needed, delegating without contract, vague acceptance.

## Workflow Mechanics

### Plan First

Any complex task (3+ steps or architecture decision) must enter planning mode.

**Trigger conditions**:

| Condition | Example |
|-----------|---------|
| Steps ≥3 | "Refactor memory system" |
| Delete/overwrite/irreversible | "Delete history files" |
| New feature implementation | "Add supplier evaluation module" |
| Architecture-level changes | "Refactor MCP config" |
| Multiple options exist | "Choose database" |
| Unclear path | "Optimize startup speed" |
| User preference affects | "Design UI style" |

### Dynamic Routing

```
Receive task
    ↓
Simple? (single question, clear answer)
  ├─ Yes → Direct execution
  └─ No ↓
Complex?
    ↓
Check dependency
  ├─ Strong chain (step N output = step N+1 input) → Serial mode
  └─ Independent sub-tasks → Parallel mode (multi-agent)
```

### Parallel Execution Template

```
【并行任务】[task name]
- Agent A: [description] — expected [output]
- Agent B: [description] — expected [output]
- Agent C: [description] — expected [output]

→ Executing in parallel... (est. X minutes)
→ Will aggregate after completion
```

### Verification Before Done

**Rule**: Never mark task complete without verifying functional effectiveness.

- Compare behavior vs main branch
- Ask "would a senior engineer approve this PR?"
- Run tests, check logs, prove correctness
- Confirm no regressions introduced

## Memory Anchor

> "主代理做裁判，子代理做运动员。轻量不绕路，重量不硬扛。每批 ≤5，能并行就不串行。先签合同再派活，逐项验收不笼统。上下文不可再生——探索归子代理，决策归主代理，宁派不读。"
