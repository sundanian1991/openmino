---
name: skill-cleaner
description: "Audit skills across Claude Code and Codex/OpenClaw: loaded roots, duplicate skills, unused skills, prompt-budget costs, compact descriptions."
---

# Skill Cleaner

Use this when trimming skill prompt budget, finding duplicate skills, auditing enabled/disabled skill roots, or deciding which skills/plugins to remove. Supports both **Claude Code** and **Codex/OpenClaw** environments.

## Workflow

1. Run the analyzer from this skill directory or repo root:

```bash
node --experimental-strip-types skills/skill-cleaner/scripts/skill-cleaner.ts --months 3
```

### Environment Selection

```bash
# Auto-detect (checks project .claude/skills first, then ~/.codex)
node --experimental-strip-types skills/skill-cleaner/scripts/skill-cleaner.ts --no-logs

# Force Claude Code mode (scans .claude/skills/ + ~/.claude/skills/)
node --experimental-strip-types skills/skill-cleaner/scripts/skill-cleaner.ts --env claude --no-logs

# Force Codex mode (scans ~/.codex/skills/ + ~/.codex/plugins/cache/)
node --experimental-strip-types skills/skill-cleaner/scripts/skill-cleaner.ts --env codex --no-logs
```

### Useful Variants

```bash
node --experimental-strip-types skills/skill-cleaner/scripts/skill-cleaner.ts --months 6 --max-log-mb 800 --deep-logs
node --experimental-strip-types skills/skill-cleaner/scripts/skill-cleaner.ts --context-tokens 200000 --budget-percent 2 --no-logs
node --experimental-strip-types skills/skill-cleaner/scripts/skill-cleaner.ts --root ~/Dropbox/boxd/skills --no-logs
```

2. Read the report in this order:
- `Skill Budget`: context size, 2% skills budget, budgeted usage, and pre-budget full-list pressure.
- `Description candidates`: long descriptions where relaxed grammar saves prompt budget.
- `Duplicates`: same skill name or near-identical description/body across roots.
- `Unused candidates`: no recent `$skill` mention, `SKILL.md` read, or explicit skill-use trace in recent logs.
- `Root summary`: where skills came from and whether config marks them disabled.

3. Before deleting or editing:
- Verify the kept copy exists and is loaded.
- Prefer deleting repo-local or `agent-scripts` duplicates when built-ins cover them.
- Keep repo-local maintainer skills when they encode repo policy or live operations.
- Preserve trigger nouns in descriptions: product, tool, action, object.

## Environment Support

| Feature | Claude Code | Codex/OpenClaw |
|---------|-------------|----------------|
| Project skills | `<project>/.claude/skills/` | `~/.codex/skills/` |
| User skills | `~/.claude/skills/` | — |
| Plugin cache | — | `~/.codex/plugins/cache/` |
| Config | `~/.claude/settings.json` | `~/.codex/config.toml` |
| Context window | 200K (Claude models) | 272K (GPT-5.5) or from `~/.codex/models_cache.json` |
| Session logs | `~/.claude/projects/*/conversations/` | `~/.codex/sessions/` |
| Scope labels | `claude-project`, `claude-user` | `codex`, `codex-plugin` |

## Analyzer Notes

- The script mirrors model-visible line shape: `- name: description (file: path)`.
- It applies frontmatter rules: YAML frontmatter only, default name from parent dir, single-line sanitized `name` and `description`.
- Token cost: `ceil(utf8_bytes / 4)`, then full descriptions -> equal description truncation -> omitted minimum lines.
- Claude mode uses 200K context; Codex mode reads `~/.codex/models_cache.json` with 272K fallback.
- It realpath-dedupes roots, so symlinked roots do not create false duplicates.
- For duplicate names, it reports description/body similarity and suggests deletion candidates only when bodies are near copies.
- Delete priority: codex-system > codex > codex-plugin > agent-scripts > claude-user > claude-project > repo > extra.
- Usage evidence is heuristic: `$skill`, `Use $skill`, and paths like `skills/<name>/SKILL.md`.

## Output Policy

- Suggest first; edit only when the user asks.
- If asked to apply cleanup, make small grouped commits: descriptions, deletes, config disables.
- Do not delete ignored/untracked skill dirs without naming the destination or confirming they are disposable.
