---
name: Horizontal Stacked Bar for Survey Priority Data
description: Creates a horizontal stacked bar chart to visualize survey data where respondents ranked items by priority (e.g., 1st, 2nd, 3rd), showing both total importance and the composition of ranks. Use this skill when you need to communicate aggregate preference strength alongside how that preference is distributed across ranking tiers.
---

# Horizontal Stacked Bar for Survey Priority Data

Use this skill when displaying survey results in which respondents assigned ranked priorities (typically 1st, 2nd, 3rd) to multiple options, and you must convey both overall importance and the breakdown of those rankings.

## When to Use
- Respondents ranked items (not just selected)
- You need to show total relevance (% selecting an item in any rank) **and** how that total is composed across ranks
- There are 3–4 rank levels maximum
- Proportions matter more than absolute counts

## How to Execute
1. **Calculate Total %**: For each category, sum the percentages of respondents who selected it as 1st, 2nd, or 3rd priority.
2. **Sort categories**: Order them vertically from highest to lowest Total % (highest at top).
3. **Orient horizontally**: Place category names on the left for readability, especially with long labels.
4. **Stack ranks left to right**:
   - Leftmost segment: 1st priority (darkest shade)
   - Middle: 2nd priority (medium shade)
   - Rightmost: 3rd priority (lightest shade)
5. **Apply consistent color family**: Use tonal variation within one hue; optionally highlight the top *N* categories (e.g., top 3) with a distinct color.
6. **Embed numeric labels**:
   - Use small, light-colored text (e.g., grey or light blue)
   - Left-align inside bars to create a clean vertical scan line
7. **Omit the x-axis**: Since values are directly labeled, no axis is needed.
8. **Add a legend**: Place above the first bar with clear labels: **Most**, **2nd**, **3rd**.
9. **Include a footnote**: State sample size (e.g., "N = 4,392") and the original survey question.
10. **Label columns clearly**: Use all caps for headers like "PRIORITY" and "TOTAL %" to improve scannability.

> ⚠️ Avoid this visualization if you have more than 4 ranks or if absolute response counts—not proportions—are the primary focus.