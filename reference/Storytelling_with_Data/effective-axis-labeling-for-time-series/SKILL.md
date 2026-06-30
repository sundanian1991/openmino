---
name: Effective Axis Labeling for Time-Series Charts
description: Apply strategic axis labeling to time-series charts (line graphs, bar charts with temporal axes) when the goal is to communicate overall trends rather than exact daily values. Use this skill when your audience prioritizes interpretability and cognitive ease over granular date lookup or precise daily metrics.
---

# Effective Axis Labeling for Time-Series Charts

Apply this skill to improve readability and reduce visual clutter in time-series visualizations by making deliberate choices about axis labeling based on data span, audience needs, and value scale.

## When to Use
- Your chart displays time-series data (e.g., days, weeks, months)
- The primary goal is trend communication, not exact value lookup
- Audience prefers intuitive interpretation over precision
- Data density would cause clutter if every tick were labeled

## How to Execute
1. **Determine the total time span** of your data (e.g., 30-day campaign with data through day 10).
2. **Assess audience needs**: decide whether they require exact dates or just contextual trend understanding.
3. **Choose a labeling interval** based on data density and cognitive load:
   - For daily data: label every 5th or 7th day
   - Optionally add super-categories like “Week 1”, “Week 2”
4. **Avoid visual noise**: never label every point if it creates clutter.
5. **Handle y-axis monetary values**:
   - If values are in thousands and intuitive (e.g., $50,000), keep full numbers
   - If values are in millions, round and relabel the axis (e.g., “Money raised (millions of dollars)”)
6. **Justify your choice** based on audience intuition (e.g., “Thinking about numbers in the thousands isn’t intuitive, so I preserved the zeros.”)
7. **Remember**: there’s no single correct answer—make a deliberate, context-aware decision.

> **Note**: Do not use this approach when exact daily values are critical for decision-making or when the audience requires granular date lookup.