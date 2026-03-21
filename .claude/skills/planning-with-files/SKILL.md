---
name: planning-with-files
version: "3.0.0"
description: 五文件工作流 — 用持久化文件解决 AI 长任务崩溃问题。支持 Manus 三文件模式和 Derrick Choi 五文件模式。
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - WebFetch
  - WebSearch
hooks:
  PreToolUse:
    - matcher: "Write|Edit|Bash|Read|Glob|Grep"
      hooks:
        - type: command
          command: "cat task_plan.md 2>/dev/null | head -30 || true"
  PostToolUse:
    - matcher: "Write|Edit"
      hooks:
        - type: command
          command: "echo '[planning-with-files] File updated. If this completes a phase, update task_plan.md status.'"
  Stop:
    - hooks:
        - type: command
          command: |
            SCRIPT_DIR="${CLAUDE_PLUGIN_ROOT:-$HOME/.claude/plugins/planning-with-files}/scripts"

            IS_WINDOWS=0
            if [ "${OS-}" = "Windows_NT" ]; then
              IS_WINDOWS=1
            else
              UNAME_S="$(uname -s 2>/dev/null || echo '')"
              case "$UNAME_S" in
                CYGWIN*|MINGW*|MSYS*) IS_WINDOWS=1 ;;
              esac
            fi

            if [ "$IS_WINDOWS" -eq 1 ]; then
              if command -v pwsh >/dev/null 2>&1; then
                pwsh -ExecutionPolicy Bypass -File "$SCRIPT_DIR/check-complete.ps1" 2>/dev/null ||
                powershell -ExecutionPolicy Bypass -File "$SCRIPT_DIR/check-complete.ps1" 2>/dev/null ||
                sh "$SCRIPT_DIR/check-complete.sh"
              else
                powershell -ExecutionPolicy Bypass -File "$SCRIPT_DIR/check-complete.ps1" 2>/dev/null ||
                sh "$SCRIPT_DIR/check-complete.sh"
              fi
            else
              sh "$SCRIPT_DIR/check-complete.sh"
            fi
---

# Planning with Files — 五文件工作流

**核心机制**：用持久化文件解决 AI 长任务崩溃问题

```
Context Window = RAM（易失，有限）
Filesystem = Disk（持久，无限）

→ 重要的东西写进文件里。
```

---

## 两种模式

### 模式 A：Derrick Choi 五文件流（推荐用于复杂开发项目）

| 文件 | 优先级 | 核心功能 |
|------|--------|----------|
| `docs/prompt.md` | ★★★★★ | 定义项目边界：目标/排除项/交付物/完成标准 |
| `docs/plans.md` | ★★★★★ | 任务拆解与验证：1-2 小时里程碑 + 验收命令 |
| `docs/architecture.md` | ★★★ | 技术规范锁定：防止架构频繁变更 |
| `docs/implement.md` | ★★★ | 操作手册：详细执行步骤 |
| `docs/documentation.md` | ★★ | 进度追踪：AI 工作日志 |

**核心机制**：
- **排除项** = 防跑偏核心（明确不要什么）
- **小里程碑** = 1-2 小时可完成的粒度
- **强制验证** = 验收不通过禁止进入下一阶段

### 模式 B：Manus 三文件流（推荐用于研究/探索任务）

| 文件 | 核心功能 |
|------|----------|
| `task_plan.md` | 阶段追踪、决策记录 |
| `findings.md` | 研究发现存储 |
| `progress.md` | 会话日志 |

---

## Quick Start — 五文件流

```bash
# 1. 初始化（一键创建 docs/目录 + 五个模板）
/Users/sundanian/.myagents/projects/mino/.claude/skills/planning-with-files/scripts/init.sh
```

**然后**：

| 步骤 | AI 动作 | 用户动作 |
|------|--------|----------|
| 2 | 编辑 `docs/prompt.md` 草案 | 审阅需求边界 |
| 3 | 编辑 `docs/plans.md` 草案 | 审阅任务拆解 |
| 4 | **暂停，等待确认** | 说"开始执行"或修改 |
| 5 | 按 `plans.md` 执行 | 等待完成 |

> **强制规则**：AI 编辑完草案后必须暂停等用户确认，禁止直接执行

## FIRST: Check for Previous Session (v2.2.0)

**Before starting work**, check for unsynced context from a previous session:

```bash
# Linux/macOS
$(command -v python3 || command -v python) ${CLAUDE_PLUGIN_ROOT}/scripts/session-catchup.py "$(pwd)"
```

```powershell
# Windows PowerShell
& (Get-Command python -ErrorAction SilentlyContinue).Source "$env:USERPROFILE\.claude\skills\planning-with-files\scripts\session-catchup.py" (Get-Location)
```

If catchup report shows unsynced context:
1. Run `git diff --stat` to see actual code changes
2. Read current planning files
3. Update planning files based on catchup + git diff
4. Then proceed with task

## Important: Where Files Go

- **Templates** are in `${CLAUDE_PLUGIN_ROOT}/templates/`
- **Your planning files** go in **你的工作目录**

| Location | What Goes There |
|----------|-----------------|
| Skill directory (`${CLAUDE_PLUGIN_ROOT}/`) | Templates, scripts, reference docs |
| **当前工作目录** | `task_plan.md`, `findings.md`, `progress.md` |

### 工作目录选择原则

**开始前，先决定任务归属**：

```
# 选项 1: 在 workspace 的主题子目录中工作（推荐）
cd workspace/供应商管理/🔄 进行中/具体任务名/
# 生成的规划文件会放在这里

# 选项 2: 在 mino/ 个人工作区
cd mino/具体任务/

# 选项 3: 在根目录（仅用于全局规划）
cd /Users/sundanian/Documents/projects/ai-agents/my-agent/
```

**年老师的结构约定**：
- `workspace/[主题]/🔄 进行中/[任务名]/` — 进行中的业务任务
- `workspace/[主题]/📖 知识库/` — 参考资料
- `mino/` — 个人工作区、脚本、测试
- 根目录 — 全局配置，不放任务文件

## Quick Start

Before ANY complex task:

1. **Create `task_plan.md`** — Use [templates/task_plan.md](templates/task_plan.md) as reference
2. **Create `findings.md`** — Use [templates/findings.md](templates/findings.md) as reference
3. **Create `progress.md`** — Use [templates/progress.md](templates/progress.md) as reference
4. **Re-read plan before decisions** — Refreshes goals in attention window
5. **Update after each phase** — Mark complete, log errors

> **Note:** Planning files go in your project root, not the skill installation folder.

## The Core Pattern

```
Context Window = RAM (volatile, limited)
Filesystem = Disk (persistent, unlimited)

→ Anything important gets written to disk.
```

## File Purposes

| File | Purpose | When to Update |
|------|---------|----------------|
| `task_plan.md` | Phases, progress, decisions | After each phase |
| `findings.md` | Research, discoveries | After ANY discovery |
| `progress.md` | Session log, test results | Throughout session |

## Critical Rules

### 0. Confirm Before Execute（五文件流强制）

**适用于 Derrick Choi 五文件流**：

| 步骤 | AI 必须做 | 禁止 |
|------|----------|------|
| 编辑草案后 | 展示 `prompt.md` + `plans.md` | 直接执行 |
| 等待确认 | 用 AskUserQuestion 或明确询问 | 假设用户同意 |
| 用户确认后 | 才能开始执行 | 边改边跑 |

> **规则**：AI 编辑完 `prompt.md` 和 `plans.md` 草案后，必须暂停等用户确认
>
> **目的**：防止 AI 自己理解需求、跑偏

### 1. Create Plan First
Never start a complex task without `task_plan.md`. Non-negotiable.

### 2. The 2-Action Rule
> "After every 2 view/browser/search operations, IMMEDIATELY save key findings to text files."

This prevents visual/multimodal information from being lost.

### 3. Read Before Decide
Before major decisions, read the plan file. This keeps goals in your attention window.

### 4. Update After Act
After completing any phase:
- Mark phase status: `in_progress` → `complete`
- Log any errors encountered
- Note files created/modified

### 5. Log ALL Errors
Every error goes in the plan file. This builds knowledge and prevents repetition.

```markdown
## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| FileNotFoundError | 1 | Created default config |
| API timeout | 2 | Added retry logic |
```

### 6. Never Repeat Failures
```
if action_failed:
    next_action != same_action
```
Track what you tried. Mutate the approach.

## The 3-Strike Error Protocol

```
ATTEMPT 1: Diagnose & Fix
  → Read error carefully
  → Identify root cause
  → Apply targeted fix

ATTEMPT 2: Alternative Approach
  → Same error? Try different method
  → Different tool? Different library?
  → NEVER repeat exact same failing action

ATTEMPT 3: Broader Rethink
  → Question assumptions
  → Search for solutions
  → Consider updating the plan

AFTER 3 FAILURES: Escalate to User
  → Explain what you tried
  → Share the specific error
  → Ask for guidance
```

## Read vs Write Decision Matrix

| Situation | Action | Reason |
|-----------|--------|--------|
| Just wrote a file | DON'T read | Content still in context |
| Viewed image/PDF | Write findings NOW | Multimodal → text before lost |
| Browser returned data | Write to file | Screenshots don't persist |
| Starting new phase | Read plan/findings | Re-orient if context stale |
| Error occurred | Read relevant file | Need current state to fix |
| Resuming after gap | Read all planning files | Recover state |

## The 5-Question Reboot Test

If you can answer these, your context management is solid:

| Question | Answer Source |
|----------|---------------|
| Where am I? | Current phase in task_plan.md |
| Where am I going? | Remaining phases |
| What's the goal? | Goal statement in plan |
| What have I learned? | findings.md |
| What have I done? | progress.md |

## When to Use This Pattern

**Use for:**
- Multi-step tasks (3+ steps)
- Research tasks
- Building/creating projects
- Tasks spanning many tool calls
- Anything requiring organization

**Skip for:**
- Simple questions
- Single-file edits
- Quick lookups

## Templates

Copy these templates to start:

- [templates/task_plan.md](templates/task_plan.md) — Phase tracking
- [templates/findings.md](templates/findings.md) — Research storage
- [templates/progress.md](templates/progress.md) — Session logging

## Scripts

Helper scripts for automation:

- `scripts/init.sh` — 初始化五文件工作流（创建 docs/目录 + 模板）
- `scripts/check-complete.sh` — 验证所有阶段完成
- `scripts/session-catchup.py` — 从上次会话恢复上下文 (v2.2.0)

## Advanced Topics

- **Manus Principles:** See [reference.md](reference.md)
- **Real Examples:** See [examples.md](examples.md)

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| Use TodoWrite for persistence | Create task_plan.md file |
| State goals once and forget | Re-read plan before decisions |
| Hide errors and retry silently | Log errors to plan file |
| Stuff everything in context | Store large content in files |
| Start executing immediately | Create plan file FIRST |
| Repeat failed actions | Track attempts, mutate approach |
| Create files in skill directory | Create files in your project |
