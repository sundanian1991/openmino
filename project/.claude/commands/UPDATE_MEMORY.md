# UPDATE_MEMORY.md - Memory Maintenance

Periodically update long-term memory from daily notes.

## When to Run

Run this command every few days to keep memory fresh:
- Review recent session notes
- Extract important insights
- Update 04-MEMORY.md with distilled wisdom

## Process

### Step 1: Review Recent Daily Notes

```bash
# List recent memory files
ls -la memory/
```

Read the last 3-7 days of memory files:
- `memory/YYYY-MM-DD.md`

### Step 2: Extract Key Information

Look for:
- **Decisions made** - Important choices and why
- **Lessons learned** - What worked/didn't work
- **Project updates** - Progress, blockers, wins
- **User preferences** - New info about working style

### Step 3: Update Long-Term Memory

Edit `.claude/rules/04-MEMORY.md`:
- Add new important events
- Update learned lessons
- Note any context changes
- Remove outdated information

### Step 4: Clean Up Old Files

- Archive or delete very old memory files (>30 days) if needed
- Keep files that contain important context

## Memory Template

When updating, consider these categories:

```
## Important Events
- [Date]: [Event description]

## Learned Lessons
- [Lesson]: [Why it matters]

## Project Updates
- [Project]: [Current status]

## User Updates
- [Preference/Fact]: [Details]
```

---

*Regular memory maintenance keeps context fresh and valuable.*
