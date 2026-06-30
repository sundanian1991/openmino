---
name: Spaghetti Graph Deconstruction
description: Reduces visual clutter in multi-series line charts ("spaghetti graphs") by applying structured deconstruction strategies. Use this skill when a time-series line chart contains excessive overlapping data series that obscure trends or comparisons, and the audience needs clearer insight into specific patterns, cross-category differences, or contextual relationships.
---

# Spaghetti Graph Deconstruction

Apply this skill when a line chart displays too many overlapping series, making it difficult to interpret individual trends or compare categories over time.

## Step 1: Assess Data Necessity
- Determine if the full dataset is essential for the message.
- If not, simplify by removing less relevant categories or time periods.

## Step 2: Choose a Deconstruction Strategy
Select one of the following based on your audience context (`live_presentation` or `circulated_report`) and analytical goal:

### A. Emphasize One Line at a Time
- Desaturate or grey out all non-target lines.
- Highlight the target series with bold color, increased line thickness, data markers, and direct labels.
- Best for **live presentations** where you can narrate focus shifts.

### B. Separate Spatially
#### i. Vertical Separation (Small Multiples, Stacked)
- Create vertically stacked panels sharing a common x-axis (time).
- Omit individual y-axes; label start/end values instead.
- Use identical y-axis scales across all panels.
- Ideal when understanding **individual category trends** matters more than cross-category magnitude comparison.

#### ii. Horizontal Separation (Small Multiples, Side-by-Side)
- Arrange panels side-by-side sharing a common y-axis (value scale).
- Enables direct **comparison of magnitudes** across categories at specific time points.
- Maintain consistent axis ranges for valid interpretation.

### C. Combined Approach
- Use a small multiples layout (vertical or horizontal).
- Within each panel, highlight one primary series while keeping others faint for context.
- Ensures consistent scaling and preserves relational context.
- Better suited for **circulated reports** due to higher information density.

## Step 3: Enforce Consistency
- Always use identical axis ranges across panels in spatial separation methods to support accurate comparisons.

## Step 4: Select Terminology
- Refer to spatial separation layouts as "small multiples" in documentation or annotations.

> **Note**: No single strategy fits all cases. Prioritize based on whether the audience needs trend clarity, cross-category comparison, or full contextual awareness.