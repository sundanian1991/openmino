---
name: Strategic Ordering in Stacked Bar Charts
description: Order segments in stacked bar charts (including 100% stacked bars) to maximize interpretability of key trends when displaying ordinal categorical data over time. Use this skill when one segment is the primary focus and categories have a natural order (e.g., performance levels: Miss < Meet < Exceed).
---

# Strategic Ordering in Stacked Bar Charts

Use this skill to design stacked bar charts that make it easy for viewers to track changes in a focal category over time by leveraging consistent baseline alignment and visual hierarchy.

## When to Use
- You are visualizing ordinal categorical data (not nominal)
- One segment (e.g., “Miss” or “Exceed”) is the primary analytical focus
- You are showing change over time using stacked or 100% stacked bars
- Middle categories are secondary and can tolerate inconsistent baselines

## How to Execute
1. **Identify the natural order** of your categories (e.g., Miss < Meet < Exceed).
2. **Place the primary focus category adjacent to a consistent baseline**:
   - If highlighting “Miss”, place it at the bottom (aligned with x-axis)
   - If highlighting “Exceed”, place it at the top (aligned with chart ceiling)
3. **Accept inconsistent baselines for middle categories** if they are lower priority.
4. **Use color strategically**:
   - Assign one attention-grabbing color (e.g., burnt red) to the focal category
   - Use neutral shades (e.g., greys) for other segments
5. **Add direct numeric labels only to the emphasized segment** (e.g., white text on red bars).
6. **Include a footnote** if needed to clarify context (e.g., changing total counts in 100% stacked bars).
7. **Apply Gestalt principles**: position annotations near relevant data using proximity for clarity.

> **Note**: Do not apply this technique to nominal categories without inherent order or when all segments are equally important.