# Agent Commands

> Sources: Mino, 2026-02-22 ~, 2026-04-26
> Raw:[wake](../../raw/agent-commands/wake.md); [think](../../raw/agent-commands/think.md); [checklist](../../raw/agent-commands/checklist.md); [observer](../../raw/agent-commands/observer.md); [plan5](../../raw/agent-commands/plan5.md); [ultrawork](../../raw/agent-commands/ultrawork.md); [update-memory](../../raw/agent-commands/update-memory.md); [update-memory-rules](../../raw/agent-commands/update-memory-rules.md); [kw-workflow](../../raw/agent-commands/kw-workflow.md)

## 概述

Nine slash commands covering session lifecycle, task management, quality control, memory maintenance, and deep analysis workflows. Each command has a specific trigger condition and output format.

## Session Lifecycle Commands

### /wake — Session Startup

**Trigger**: Manual, session start

**Actions**:
1. `git pull` — sync remote latest
2. Read `06-NOW.md` — know current state
3. Read `memory/MEMORY.md` — get detailed memory
4. Respond: "年老师，醒了，等你指示。"

**Iron rule**: First words must address "年老师". If uncommitted changes exist, ask user before git pull. Report merge conflicts immediately.

### /observer — Post-Conversation Record

**Trigger**: User says "观察", "总结观察", or `/observer`

**Workflow**:
1. Append to `memory/insights.md` — key events + insights (need insight, pattern signal, personal review)
2. Update `memory/MEMORY.md` — if important changes
3. `git add -A && git commit && git push`

**Quality**: concise (one sentence per fact), deep (understand why), don't force (skip if nothing worth keeping).

## Task Management Commands

### /plan5 — Five-File Workflow

**Trigger**: New project/complex requirement with description

**Purpose**: Solves three problems in long task execution: can't remember requirements → `prompt.md`; plans get lost → `plans.md`; progress can't be tracked → `documentation.md`.

**Workflow**:
1. **Requirement analysis** → `plans/{date-topic}/prompt.md` (goal, exclusions, deliverables, completion criteria)
2. **Task decomposition** → `plans/{date-topic}/plans.md` (milestones, acceptance commands, dependencies)
3. **Execution tracking** → Read plans.md → execute → verify → update status → write documentation.md

**Forced clarification (A+B+C)**:

| Step | AI Action | User Action |
|------|-----------|-------------|
| 1 | Initialize plans/ directory + five-file template | — |
| 2-3 | Edit prompt.md + plans.md draft | — |
| 4 | **Pause, AskUserQuestion for confirmation** | Review/modify |
| 5 | Execute after "开始执行" | Confirm |

**Forbidden**: AI understanding requirements and executing directly without confirmation.

### /checklist — Context Verification

**Trigger**: Before ending conversation, or after interruption

**Workflow**:
1. Scan conversation history → extract all tasks/questions/promises
2. Classify by status: completed, in-progress, not-started
3. Verify each item — confirm truly completed
4. Identify missed items
5. Output checklist

**Use cases**: end of conversation (ensure nothing missed), interrupt recovery (re-organize progress), multi-topic conversations (prevent later topics from overshadowing earlier ones).

### /ultrawork — Ultra Work Mode

**Trigger**: Critical tasks requiring exhaustive execution

**Activation**: First message must say "ULTRAWORK MODE ENABLED!"

**Core principles**:
- **Goal above all** — Exhaust all methods until complete delivery. Self-repair, restart, or find alternatives when blocked.
- **Deep thinking first** — Think thoroughly before acting, only act at 100% certainty.
- **Complete delivery** — No partial work, no simplification, no assumptions. User wants X, deliver full X.
- **Verified = done** — No evidence = unverified = incomplete.

**Forbidden**:

| Forbidden | Reason |
|-----------|--------|
| "I can't because..." | Find a way or ask |
| "This is a simplified version..." | Deliver full implementation |
| "You can extend later..." | Complete it now |
| "Due to limitations..." | Use tools/agents, spare no cost |
| "I made some assumptions..." | Ask first |

**Agent usage**: Explore (haiku) for codebase exploration, general-purpose (sonnet) for complex searches, Plan (opus) for architecture design.

## Analysis Commands

### /think — Explicit Thinking

**Trigger**: When user wants to see reasoning process

**Template**:
```
【意图分类】[简单查询 / 复杂任务 / 探索任务]

【我的判断】[one-sentence conclusion]

【依据】
1. [basis 1]
2. [basis 2]
3. [basis 3]

【不确定的地方】
- [uncertainty 1]
- [uncertainty 2]

【风险/盲点】
- [blind spot 1]
- [blind spot 2]

【建议】[if action needed]
```

**Use cases**: complex decisions, uncertain answers, reviewing thinking approach, teaching-style dialogue.

## Memory Maintenance Commands

### /update-memory — Weekly Consolidation

**Trigger**: Manual or weekly automated

**Workflow**:
1. Read this week's insights.md
2. Judge upgrades to MEMORY.md (profile changes, todo updates, key decisions, project changes, important insights)
3. Clean obsolete memory — completed items, inaccurate decisions, duplicates
4. `git commit && push`

**Monthly cleanup** (1st of month): check todos, clean outdated decisions, archive insights >90 days old.

### /update-memory-rules — Nightly Deep Maintenance

**Trigger**: Nightly automated cron

Full maintenance cycle: read recent logs → check learnings → organize → update topics → update core memory → organize workspace → commit. Includes AutoDream health check (redundancy, expired profiles, orphan records, old index archival).

## Deep Analysis Command

### /kw-workflow — Compound Knowledge Workflow

**Trigger**: Complex problem requiring systematic deep analysis

**Workflow**: `brainstorm → plan → [confidence?] → review → work → compound`

Each step outputs to `plans/{problem-name-date}/`:

| Step | Output | Description |
|------|--------|-------------|
| 1. Brainstorm | `00-brainstorm.md` | Extract core elements, search knowledge base |
| 2. Plan | `01-research.md` | Prioritize, research methods, timeframes |
| 3. Confidence (optional) | `02-confidence.md` | Assess known vs unknown, recommend actions |
| 4. Review | `03-review.md` | Strategic alignment + data accuracy review (parallel) |
| 5. Work | `02-workspace/` | Execute plan, produce structured deliverables |
| 6. Compound | `docs/knowledge/` | Extract reusable insights, save with frontmatter |

**Auto-progression**: each step auto-advances. User can say "暂停", "继续", "跳到 X" at any time.

## Command Relationships

| Command Pair | Relationship |
|--------------|-------------|
| /plan → /think | Plan first, then analyze options with think |
| /think → /checklist | Think through, then verify with checklist |
| /observer → /checklist | Observer provides material for checklist |
| /checklist → /UPDATE_MEMORY | After verification, consolidate learnings |
| /plan5 + /observer | Observer tracks plan5 execution insights |
