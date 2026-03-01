---
name: napkin
description: |
  Napkin provides persistent memory of mistakes and lessons via a per-repo markdown scratchpad.
  The agent maintains a running record of what worked and didn't work in this specific repository,
  helping avoid repeating past mistakes and remembering successful approaches.
author: Siqi Chen (blader)
version: 1.0.0
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
---

# Napkin

Provides persistent memory of mistakes and lessons via a per-repo markdown scratchpad.

The agent maintains a running record of what worked and didn't work in this specific repository, helping avoid repeating past mistakes and remembering successful approaches.

## Problem
Claude Code agents often repeat mistakes in the same repository because they lack persistent memory of what has and hasn't worked before. Each session starts fresh, losing institutional knowledge about the specific project.

## Context / Trigger Conditions
Use automatically when:
- Working in a repository for the second time or more
- Making changes that could benefit from historical context
- Encountering errors that might have occurred before
- Considering approaches that may have been tried previously
- Need to remember successful patterns from previous work in this repo

## Solution
Maintain a `.claude/napkin.md` file in each repository to record:
- Approaches that worked well
- Mistakes to avoid
- Common errors and their solutions
- Project-specific patterns and gotchas
- Successful configurations and settings

### Initialize napkin file:
If `.claude/napkin.md` doesn't exist, create it with this structure:

```markdown
# Repository Napkin Notes

## What Worked Well
- [Date] - [Successful approach/technique/methodology]
- [Example: "Using environment variables for API keys instead of hardcoding"]

## Mistakes to Avoid
- [Date] - [What went wrong and why]
- [Example: "Don't modify the production config file directly, always use the template"]

## Common Errors & Solutions
- [Date] - [Error message] → [Solution]
- [Example: "npm install fails with EACCES → Use npm config set prefix ~/.npm-global"]

## Project-Specific Patterns
- [Date] - [Project-specific convention, quirk, or requirement]
- [Example: "All API endpoints must include version in path like /api/v1/endpoint"]

## Quick References
- [Date] - [Commands, configs, or settings used frequently]
- [Example: "Database reset: docker-compose down && docker-compose up -d db"]
```

### When working in the repository:
1. **Before taking action**, check napkin for relevant past experiences
2. **After discovering something new**, update the napkin appropriately
3. **When hitting an error**, check if it's documented in napkin
4. **When successful with new approach**, add to "What Worked Well" section

### Reading the napkin:
```bash
# Check repository notes before starting work
if [ -f ".claude/napkin.md" ]; then
  echo "Repository notes found:"
  cat .claude/napkin.md
fi
```

### Updating the napkin:
Use the `Edit` tool to append new learnings to the appropriate section.

## Verification
- Verify `.claude/napkin.md` exists in the repository
- Confirm the file is in the correct sections format
- Ensure new learnings are being captured during work sessions

## Example
Working in a React project, you discover that hot reloading doesn't work properly when editing files in the `src/utils/` directory. Instead of forgetting this for the next session, add to the napkin:

```
## Project-Specific Patterns
- [2024-01-15] - Hot reloading doesn't work when editing files in src/utils/, need to manually refresh browser
```

## Notes
- Keep entries concise but informative
- Include dates for context on how recent the information is
- Focus on project-specific information that wouldn't be in general documentation
- Don't duplicate official documentation, link to it instead
- Regularly review and clean up outdated information

## References
- Project-specific knowledge management
- Agent memory persistence techniques
- Repository-level institutional knowledge