---
name: Positive-Negative Stacked Bar Design
description: Creates a stacked bar chart that visualizes net change by combining positive (additive) and negative (subtractive) components around a zero baseline, with a highlighted gap representing unmet need. Use this skill when you need to show how inflows and outflows contribute to a final shortfall or surplus—especially in workforce planning, gap analysis, or net-change scenarios where the gap itself is the key insight.
---

# Positive-Negative Stacked Bar Design

Use this visualization technique when your data includes both additions and subtractions that affect a starting value, and your primary goal is to highlight the resulting gap (e.g., unmet staffing needs).

## When to Use
- You are visualizing **net change** composed of **positive contributions** (e.g., promotions, hires) and **negative contributions** (e.g., attrition, exits).
- The **gap** (unmet need or surplus) is the central message of the chart.
- Your audience needs to understand not just the outcome, but **what drove it**.

## How to Execute
1. **Set a horizontal zero baseline** representing the current state (e.g., “Today’s directors”).
2. **Stack positive components above** the baseline using a positive-connotation color (e.g., green).
3. **Stack negative components below** the baseline using a desaturated version of the base color to maintain visual relationship.
4. **Render the gap as an outline-only bar** at the top to signify emptiness or unmet need.
5. **Order layers intentionally**:
   - Base: current state (implicit zero line)
   - Below baseline: negative components (e.g., attrition)
   - Above baseline: positive components (e.g., promotions, acquisitions)
   - Topmost: gap (most visually prominent)
6. **Apply consistent color logic**: data labels match their series color; gap labels use bold black.
7. **Label only the gap numerically**; keep the y-axis for magnitude context but render it in grey.
8. **Guide the viewer’s eye path**: title → bold gap numbers → descriptive text → supporting data layers.
9. **Reinforce meaning through direction**: negative values extend downward, positive values rise upward.

> ⚠️ Do not use this design for purely positive quantities or when inflows and outflows lack conceptual separation.