---
name: Construct Heatmaps for Tabular Pattern Recognition
description: Converts numerical tabular data into a heatmap to help viewers instantly identify high/low values and underlying patterns. Use this skill when you have a grid of numbers (e.g., performance matrices, survey results, or cross-tabulated data) and need to reduce mental scanning effort by leveraging color as a visual cue.
---

# Construct Heatmaps for Tabular Pattern Recognition

Use this skill to transform tables of numerical data into intuitive heatmaps that highlight extremes and reveal patterns at a glance.

## When to Use
- You have a table with consistent numerical values across rows and columns (e.g., percentages, scores, counts).
- Your goal is to help users quickly spot outliers, trends, or clusters without manually comparing every cell.
- Applicable data includes performance matrices, survey results, or any cross-tabulated dataset.

## How to Execute
1. **Start with clean numerical data** in a grid format (rows × columns). Ensure all values use the same scale and unit.
2. **Choose a color scale direction**: decide whether low-to-high values should map to light-to-dark (`low_to_high`) or dark-to-light (`high_to_low`).
3. **Apply conditional formatting** so that color saturation reflects value magnitude—use a monotonic, intuitive gradient (e.g., light blue → dark blue).
4. **Include a legend or subtitle** that clearly explains the color mapping (e.g., "LOW → HIGH" with sample colors).
5. **Decide whether to show numbers**: retain original values inside cells unless color alone is sufficient for interpretation. Showing numbers supports both pattern recognition and precise reading.
6. **Use accessible palettes**: select colorblind-friendly schemes (e.g., viridis, plasma, or ColorBrewer’s sequential palettes).
7. **Validate output**: if using built-in tools (e.g., Excel, Google Sheets, Python’s seaborn), verify that the gradient accurately represents your data and doesn’t mislead.

The result is a heatmap where viewers can immediately identify the highest and lowest values and discern spatial patterns without exhaustive scanning.