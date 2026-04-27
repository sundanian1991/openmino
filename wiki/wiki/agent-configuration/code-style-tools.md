# Code Style & Tools

> Sources: Mino, 2026-03-16 ~ 2026-04-27
> Raw: [10-CODESTYLE](../../raw/claude-reference/10-CODESTYLE.md), [09-TOOLS](../../raw/claude-reference/09-TOOLS.md), [11-CONFIG](../../raw/claude-reference/11-CONFIG.md), [13-VISUALIZATION](../../raw/claude-reference/13-VISUALIZATION.md)

## Overview

Coding conventions, Git workflow rules, tool priority system, and configuration norms. Defines how code is written, committed, and what tools to use in each scenario.

## Code Style

### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Variables/Functions | camelCase | `calculateTotal`, `userName` |
| Files/Components | PascalCase | `UserProfile.tsx`, `CLAUDE.md` |
| Constants | UPPER_SNAKE | `MAX_RETRIES`, `API_KEY` |
| CSS Classes | kebab-case | `user-profile`, `btn-primary` |

### Comment Rules

- **Code itself**: English
- **Comments**: Simplified Chinese
- **Git commits**: English prefix, Chinese detail (optional)

### File Format

- **Markdown**: LF line endings, UTF-8 encoding
- **Header**: All `.md` files must have `---` frontmatter (input/output/pos)

### Language Rule

- Conversation: Chinese
- Code: English
- Professional terms: Keep English original

## Git Workflow

### Branch Naming

| Type | Format | Example |
|------|--------|---------|
| New feature | `feat/xxx` | `feat/supplier-evaluation` |
| Bug fix | `fix/xxx` | `fix/plan-first-hook` |
| Documentation | `docs/xxx` | `docs/claude-md-update` |
| Refactoring | `refactor/xxx` | `refactor/memory-system` |

### Commit Format

```
type: description

Optional: detailed explanation (multi-line)
```

**Type values**: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`

### Forbidden Operations

| Operation | Risk | Alternative |
|-----------|------|-------------|
| `--no-verify` | Skips safety checks | Fix issue, new commit |
| `git reset --hard` | Loses uncommitted changes | `git restore` or `git stash` |
| `git push --force` (main) | Overwrites remote history | `git revert` + new commit |
| `git commit --amend` | Modifies published commit | New commit |

### Safe Git Flow

```
1. git status → check state
2. git diff → review changes
3. git add <specific files> → add (never -A or .)
4. git commit -m "message"
5. git status → verify success
```

### Hook Failure Handling

- **Don't**: `--no-verify` to skip
- **Do**: Fix issue, create **new** commit (never amend)

## Document Sync Rules

1. Every folder must have README.md or CLAUDE.md
2. Every `.md` file must have `---` frontmatter

**New file checklist**:
1. Add `---` frontmatter at top
2. Update parent folder's README.md
3. Update CLAUDE.md if structure changed

## Tool Priority

### File Operations

**Core principle**: Dedicated tools > Bash commands

| Operation | Dedicated Tool | Alternative |
|-----------|---------------|-------------|
| Read file | `Read` | cat, head, tail |
| Edit file | `Edit` | sed, awk |
| Create file | `Write` | cat <<EOF, echo |
| Find files (by name) | `Glob` | find, ls |
| Search content (regex) | `Grep` | grep, rg |

**Why**: Dedicated tools are more efficient, formatted output, better UX, avoid shell escape/path issues.

### Search Strategy

| Scenario | Tool | Notes |
|----------|------|-------|
| Known file path | `Read` | Direct read |
| Find by name pattern | `Glob` | `**/*.js`, `src/**/*.ts` |
| Search code content | `Grep` | Regex, filter by file type |
| Wide codebase exploration | `Task(Explore)` | 3+ rounds of searching |
| Research questions | `Task(General)` | Multi-step reasoning, multiple sources |
| Real-time info/news | `tavily_search` | Summary + URL, no raw content |
| Read web page details | `ctx_fetch_and_index` | Sandboxed, 3KB preview |
| Multi-page deep research | `tavily_research` | Multi-source, index after fetch |

### Search Decision Tree

```
Need to find files?
  ├─ Known path → Read
  ├─ By name → Glob
  └─ By content → Grep

Need to explore codebase?
  ├─ 1-2 locations → Glob/Grep
  └─ 3+ locations → Task(Explore)

Need to research?
  ├─ Local code → Task(Explore)
  ├─ Real-time info → tavily_search (summary + URL)
  ├─ Web page details → ctx_fetch_and_index (sandboxed)
  └─ Complex multi-step → Task(General)
```

### Sub-Agent Usage

| Type | Purpose | When |
|------|---------|------|
| **Explore** | Fast codebase exploration | Find files, search patterns |
| **general-purpose** | Complex multi-step tasks | Needs autonomous planning |
| **Plan** | Software architecture | Complex feature planning |

**When NOT to use sub-agents**: known file path → direct Read; single class/function → direct Grep; simple 1-2 step task → direct execution.

## Dynamic Routing

```
Receive task
    ↓
Simple? (single question, clear answer)
  ├─ Yes → Direct execution
  └─ No ↓
Complex?
    ↓
Check dependency
  ├─ Strong chain → Serial mode (depth-first)
  └─ Independent → Parallel mode (multi-agent)
```

**When parallel**: 3+ independent sub-tasks, multi-source aggregation, time-sensitive high-throughput scenarios.

**Mixed mode best practice**:
```
Phase 1 (serial): Understand + design framework
    ↓
Phase 2 (parallel): Sub-tasks execute simultaneously
    ↓
Phase 3 (serial): Integration + validation
```

## Bash Usage

### When to use dedicated tools vs Bash

| Need | Priority | Keep Bash |
|------|----------|-----------|
| Find files | Glob | find, ls |
| Search content | Grep | grep, rg |
| Read files | Read | cat, head, tail |
| Modify files | Edit | sed, awk |
| Write files | Write | echo >, cat <<EOF |

### Bash appropriate uses

- Git operations (status, commit, push)
- Package managers (npm install, pip install)
- Dev servers (npm start, npm run dev)
- Test running (npm test, pytest)
- Script execution (./scripts/*.sh)
- System commands (curl, mkdir, cp, mv)

## Configuration

### Environment

| Component | Version | Verify |
|-----------|---------|--------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | 2.30+ | `git --version` |
| macOS | 12.0+ | `sw_vers` |

### API Configuration

**Choose one** (not both):
```bash
# Method 1 (recommended)
export ANTHROPIC_AUTH_TOKEN="your-token"

# Method 2
export ANTHROPIC_API_KEY="your-key"
```

### MCP Configuration

| Tool | Purpose | Level |
|------|---------|-------|
| tavily-mcp | Web search | Project |
| web-search | Chinese web search | Project |
| webReader | Web → Markdown | Project |
| memory | Knowledge graph | Global |

### Common Commands

| Operation | Command | Description |
|-----------|---------|-------------|
| Performance analysis | `npx @mariozechner/claude-trace` | Visualize event flow |
| Verify plan | `./scripts/verify-plan.sh [name\|all]` | Verify plan completeness |
| Search memory | `grep -r "keyword" memory/` | Quick history search |
| Session stats | `npx claude-history stats` | View session statistics |

## Visualization Norms (Summary)

For full visualization rules, see [13-VISUALIZATION](../../raw/claude-reference/13-VISUALIZATION.md). Key points:

- **One chart, one insight** — Title states conclusion, not description
- **Color is signal, not decoration** — Default Warm ramp, ≤2 ramps per chart
- **Every element must justify existence** — Delete if removal doesn't lose information
- **Hard constraints**: No gradients, shadows, animations, emoji, pie charts (>3 categories), dual Y-axis
- **ECharts theme**: `animation: false`, transparent background, Stone grid lines
