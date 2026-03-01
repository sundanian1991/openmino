---
name: taskmaster
description: |
  Taskmaster is a Claude Code stop hook that keeps the agent working until all plans and user requests are 100% complete.
  Use when you want to ensure comprehensive completion of all requested tasks before terminating a session.
author: Siqi Chen (blader)
version: 1.0.0
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - TodoWrite
  - AskUserQuestion
---

# Taskmaster

A Claude Code stop hook that keeps the agent working until all plans and user requests are 100% complete.

## Problem
Claude Code sessions often end prematurely before all tasks are fully completed, leaving work partially done or requiring the user to restart multiple times to get comprehensive results.

## Context / Trigger Conditions
Use when:
- Working on multi-part requests with several components
- Completing complex tasks with multiple deliverables
- Ensuring all aspects of a plan are executed before stopping
- User has asked for several things in one prompt
- Task involves multiple steps that should all be completed

## Solution
Taskmaster implements a verification system that:
1. Parses the original request to identify all requested tasks/components
2. Tracks completion status of each component
3. Automatically continues work until everything is 100% complete
4. Asks for clarification only when requirements are ambiguous
5. Reports comprehensive completion status before terminating

### Pre-session initialization:
- Parse initial user request into discrete tasks
- Create completion checklist
- Set completion thresholds for each task

### During work:
- Track progress against checklist
- Identify incomplete components
- Continue working on unfinished items
- Update completion status continuously

### Before stopping:
- Verify all items are 100% complete
- If incomplete, continue work automatically
- If all complete, provide comprehensive summary

## Verification
- All originally requested tasks have been completed
- Completion checklist shows 100% status
- User requirements have been fully satisfied
- No loose ends or partially completed work

## Example
**User Request**: "Create a React component with TypeScript, add tests, write documentation, and set up the configuration files"

Without Taskmaster, Claude might complete just the component and stop.

With Taskmaster, Claude will:
1. Create the React component ✓
2. Add TypeScript definitions ✓
3. Write tests ✓
4. Create documentation ✓
5. Set up configuration files ✓
6. Verify all 5 components are complete before stopping

## Notes
- Taskmaster doesn't change Claude's working behavior, just the stopping condition
- Only intervenes when there are objectively incomplete tasks
- Maintains Claude's normal working patterns while ensuring completeness
- Works in the background without interrupting normal workflow

## References
- Task completion verification patterns
- Multi-component request processing
- Work session completeness assurance