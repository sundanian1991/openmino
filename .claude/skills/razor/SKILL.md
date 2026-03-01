---
name: razor
description: |
  Razor is a Claude Code skill that minimizes branch diffs against merge base with structured, explicit tradeoffs.
  Helps balance code quality improvements with practical constraints during code reviews and refactoring.
author: Siqi Chen (blader)
version: 1.0.0
allowed-tools:
  - Read
  - Edit
  - Grep
  - Glob
  - WebSearch
---

# Razor

Minimize your branch diff against merge base with structured, explicit tradeoffs. A skill for Claude Code and Codex.

## Problem
Large diffs make code reviews difficult, increase merge conflicts, and slow down development velocity. However, comprehensive improvements are sometimes necessary. Finding the right balance requires structured decision-making about tradeoffs.

## Context / Trigger Conditions
Use when:
- Refactoring code for a pull request
- Making improvements that could result in large diffs
- Balancing code quality improvements with delivery speed
- Working on legacy code that needs updates
- Trying to reduce review burden while still making necessary changes
- Preparing code for merging with minimal disruption

## Solution
Razor implements a structured approach to minimize diffs while preserving necessary changes:

### 1. Diff Impact Assessment
Before making changes, assess the potential diff impact:
- Count lines affected by proposed changes
- Identify areas with the most changes needed
- Evaluate the risk of introducing bugs
- Estimate review time needed

### 2. Change Prioritization Framework
Classify changes by priority:
- **Critical (Must Change)**: Security issues, bugs, broken functionality
- **High (Should Change)**: Major performance issues, significant maintainability problems
- **Medium (Could Change)**: Style improvements, minor refactoring
- **Low (Nice to Change)**: Cosmetic changes, documentation improvements

### 3. Diff Reduction Strategies
Apply these techniques to minimize diff size:

#### Strategy A: Incremental Approach
- Split large changes into smaller, atomic commits
- Address one issue at a time
- Ensure each commit passes tests independently
- Group related changes logically

#### Strategy B: Scope Limitation
- Focus on functional changes first, style later
- Limit refactoring to affected areas only
- Avoid changing unrelated code
- Resist the temptation to fix everything at once

#### Strategy C: Surgical Precision
- Make minimal changes to achieve the objective
- Change only what is necessary
- Preserve existing patterns unless harmful
- Maintain compatibility with surrounding code

### 4. Tradeoff Documentation
For each decision, document the tradeoff:
```
Change: [Description of what you're changing]
Benefit: [Why this change is valuable]
Cost: [How much diff this adds, review time needed]
Tradeoff: [Balance between benefit and cost]
Decision: [Make change / Defer to future / Compromise]
```

### 5. Diff Measurement Techniques
```
# Before committing, check potential diff size:
git diff --stat HEAD
git diff --numstat HEAD | awk '{ added += $1; deleted += $2 } END { print "Added:", added, "Deleted:", deleted }'

# Check for large files being changed:
git diff --stat HEAD | sort -n -k3

# Get a preview of the diff complexity:
git diff --shortstat HEAD
```

### 6. Selective Application
Apply changes selectively based on impact:
- For high-traffic or critical code: Be more conservative
- For experimental or rarely-changed code: Allow more flexibility
- For performance-critical sections: Prioritize correctness over style
- For user-facing code: Focus on functional improvements

## Verification
- Diff size is minimized while preserving necessary changes
- Critical issues are addressed
- Review burden is reasonable
- Code quality is improved, even incrementally
- Risk of introducing bugs is minimized

## Example Scenario
**Situation**: Improving a complex API endpoint that has inconsistent error handling, mixed promise/callback patterns, and unclear logging.

**Without Razor**: Change everything at once → 300+ line diff, hours of review time.

**With Razor**:
1. **Critical**: Fix error handling (security/performance) → 30 lines
2. **High**: Fix callback/promise inconsistency → 25 lines
3. **Medium**: Improve logging clarity → 15 lines
4. **Total**: 70 lines instead of 300+, with clear justification for each change

## Notes
- The goal is not to avoid all changes, but to make necessary changes efficiently
- Sometimes larger diffs are justified by substantial benefits
- Communicate the reasoning behind diff size decisions
- Balance technical perfectionism with practical delivery needs
- Consider team bandwidth for code reviews

## References
- Code review best practices
- Git diff minimization techniques
- Change management strategies
- Refactoring patterns with minimal impact