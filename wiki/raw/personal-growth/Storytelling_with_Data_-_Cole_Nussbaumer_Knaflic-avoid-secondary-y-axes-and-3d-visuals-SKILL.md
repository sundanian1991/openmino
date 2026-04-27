---
name: Avoid Secondary Y-Axes and 3D Visuals
description: Replace misleading 3D charts and dual-axis time-series visuals with clearer, more honest alternatives. Use this skill whenever you are tempted to use 3D effects for single-dimension data or a secondary y-axis to show two metrics with different units or scales—common in multi-metric dashboards, business performance reports, or time-series comparisons.
---

# Avoid Secondary Y-Axes and 3D Visuals

Apply this skill when designing charts that risk distorting data perception or implying false relationships. Follow these steps:

## 1. Eliminate 3D Visuals
- **Never** use 3D bar charts, pie charts, or other 3D effects for single-dimension data.
- **Reason**: 3D distorts visual perception (e.g., Excel’s tangent-plane rendering makes bar heights ambiguous) and adds distracting "chart junk" like side/floor panels.
- **Exception**: Only acceptable if plotting three continuous variables (e.g., scientific surface plots)—and even then, use with extreme caution.

## 2. Replace Secondary Y-Axes
Secondary y-axes force viewers to decode which series maps to which axis and often imply spurious correlations. Instead:

- **Alternative 1: Direct labeling**
  - Place values directly on lines or bars.
  - Omit the secondary axis entirely.
  - Best when precise values matter.

- **Alternative 2: Split into aligned charts**
  - Create two vertically stacked charts sharing the same x-axis.
  - Each chart uses its own left y-axis.
  - Best for comparing trends across metrics.

- **Alternative 3 (discouraged): Color-linked axes**
  - Use color to connect axis titles to data series.
  - Avoid unless absolutely necessary—color is better reserved for emphasis.

## 3. Apply the Golden Rule
If your visual requires explanation to decode depth, axes, or mappings, it has failed. Prioritize simplicity and clarity over decorative complexity.

## When to Use This Skill
- You’re building a dashboard with multiple metrics.
- You’re comparing time-series with different units (e.g., revenue vs. user count).
- You’re preparing a business report and considering 3D charts for visual appeal.
- You notice your audience struggling to interpret axis mappings or relative magnitudes.