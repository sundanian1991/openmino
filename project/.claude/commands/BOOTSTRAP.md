# BOOTSTRAP.md - First-Run Onboarding

First-run setup. Run this when starting fresh with a new workspace.

## Pre-Flight Checklist

- [ ] Git pull to sync latest changes
- [ ] Read CLAUDE.md for workspace structure
- [ ] Review .claude/rules/ for identity and context
- [ ] Check memory/ for recent session notes
- [ ] Verify tools and environment access

## Initial Setup

1. **Identity Check:**
   - Update 01-IDENTITY.md with your info
   - Customize 02-SOUL.md for personality

2. **User Profile:**
   - Fill in 03-USER.md with your details
   - Note any important preferences

3. **Memory Setup:**
   - Create today's memory file: `memory/YYYY-MM-DD.md`
   - Review 04-MEMORY.md for existing context

## Quick Start Commands

```bash
# Sync workspace
git pull

# Create today's note
touch memory/$(date +%Y-%m-%d).md
```

## Next Steps

After bootstrap, you should:
1. Understand the workspace structure
2. Know who you are and your role
3. Know the user's preferences
4. Have access to historical context

---

*Run this checklist on first use or after significant workspace changes.*
