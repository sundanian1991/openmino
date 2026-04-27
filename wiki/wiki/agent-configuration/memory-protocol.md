# Memory Protocol

> Sources: Mino, 2026-02-12 ~ 2026-04-24
> Raw: [MEMORY-L1](../../raw/agent-rules/MEMORY-L1.md), [update-memory](../../raw/agent-commands/update-memory.md), [update-memory-rules](../../raw/agent-commands/update-memory-rules.md), [observer](../../raw/agent-commands/observer.md)

## Overview

Memory system implements Write-Ahead Log (WAL) protocol for persistent knowledge across sessions. Information flows from daily logs → short-term insights → long-term memory, with automated nightly maintenance and weekly consolidation.

## WAL Protocol

**Core principle**: Write critical information first, answer second.

**Trigger conditions**: corrections, proper nouns, preferences, decisions, specific values.

**Write target**: `memory/MEMORY.md`.

## Memory File Structure

```
memory/
├── MEMORY.md           # Detailed memory index (loaded at startup)
├── insights.md         # Insight records (short-term memory)
├── context/
│   └── todo.md         # Current todo list
├── topics/             # Project-specific memory files
├── learnings/          # Self-improvement records
│   ├── LEARNINGS.md    # Corrections, insights, best practices
│   ├── ERRORS.md       # Command failures, anomalies
│   └── FEATURE_REQUESTS.md
├── daily/              # Daily logs (YYYY-MM/YYYY-MM-DD.md)
├── projects/           # Project background
├── archive/            # Historical archive
└── daily-letter/       # Daily letter archives
```

## Memory Layers

| Layer | File | Purpose | Load Timing |
|-------|------|---------|-------------|
| **L1** | MEMORY-L1.md | Core memory, WAL protocol, user profile | Every session |
| **L2** | MEMORY.md | Detailed memory index | Every session |
| **L3** | insights.md | Short-term insights | On demand |
| **L4** | topics/*.md | Project-specific memory | On demand |
| **L5** | learnings/ | Raw learning records | On demand |
| **L6** | daily/ | Daily session logs | On demand |

## Insight Upgrade Mechanism

Insights flow upward when meeting criteria:

| Standard | Description | Example |
|----------|-------------|---------|
| **Appears 3+ times** | Cross-session stable pattern | "Structured preference" in multiple conversations |
| **Long-term value** | Not one-off, reusable insight | "See people beyond the surface" |
| **User endorsed** | User explicitly says "this is important" | "Liu Weijia has higher capability" |

**Flow**:
```
insights.md (short-term)
    ↓ Upgrade conditions met (3+ times / long-term value / user endorsed)
MEMORY.md → Important insights (long-term memory)
```

## Nightly Memory Maintenance (/update-memory-rules)

Automated nightly process:

1. **Read recent logs** — All daily logs since last maintenance
2. **Read learnings/** — Check LEARNINGS.md, ERRORS.md, FEATURE_REQUESTS.md
3. **Organize learnings/** — Valuable → insights.md; frequent patterns → MEMORY.md; clear transferred records
4. **Update topic files** — Sync new experience, state changes, decisions to `memory/topics/<name>.md`
5. **Update core memory** — Extract cross-project lessons to MEMORY-L1.md; update current state; clean obsolete info
6. **Organize workspace** — Archive scattered temporary files
7. **Commit + push** — Only memory files changed

**Principles**:
- One piece of info, one place — topic files detailed, core memory only pointers
- Every memory entry has timestamp (YYYY-MM-DD)
- Delete is more important than keep — outdated info is noise
- Record a note in today's log after completion

## AutoDream — Memory Sleep Mechanism

Simulates human sleep: prune weak connections, strengthen important memories, clean redundancy.

| # | Check | Logic | Threshold |
|---|-------|-------|-----------|
| 1 | **Redundancy** | Same day, same person, multiple observation records | ≥3/day |
| 2 | **Profile expired** | Profile not updated for long time | ≥30 days |
| 3 | **Orphan records** | Index points to non-existent file | Any |
| 4 | **Old index archival** | Observation records not accessed for long time | ≥90 days |

**Process**: Diagnose first (read-only), then治理 (merge, confirm, delete, archive) during maintenance.

## Weekly Memory Consolidation (/update-memory)

Manual or weekly:

1. Read this week's insights.md
2. Judge what upgrades to MEMORY.md (user profile changes, todo updates, key decisions, project index, important insights)
3. Clean obsolete memory from MEMORY.md — completed items, inaccurate decisions, duplicates
4. Commit + push

## Memory Flow Classification

| Record Type | Target File | Trigger |
|-------------|-------------|---------|
| **Iron rules / habits** | 00-IDENTITY | "禁止", "必须", "零容忍" |
| **Personality / relationship changes** | 01-SOUL | Relationship positioning, personality traits |
| **Deep user insights** | 03-USER | Behavior patterns, thinking characteristics |
| **Session startup essentials** | MEMORY-L1 | Timezone, naming, peak hours |
| **Recent state** | memory/context/todo.md | Weekly todos, task state changes |
| **Long-term knowledge** | MEMORY.md | Methodology, insights, projects |
| **Timeline archive** | insights.md | All records |

## Observer (/observer)

Records facts and insights after conversations:

1. **Append to insights.md** — Key events (what was done, results) + Insights (need insights, pattern signals, personal review)
2. **Update MEMORY.md** — If important changes (decisions, todos, projects)
3. **Commit + push**

**Quality**: concise (one sentence per fact), deep (not just what but why), don't force (if nothing worth keeping, skip).

## User Profile (L1 Index)

| Field | Value |
|-------|-------|
| **Timezone** | Asia/Shanghai |
| **Peak hours** | Evening, weekdays before 10am / after 9pm |
| **Communication** | Structured, direct, data-driven, no "it depends" |
| **Core work** | Supplier management + BPO operations, 30+ suppliers, 3000+ team |
| **Department** | Data Technology Business Dept - Level 2 |
| **Manager** | 卞海军 (军哥) |
| **Team lead** | 王易人 (service group) |
