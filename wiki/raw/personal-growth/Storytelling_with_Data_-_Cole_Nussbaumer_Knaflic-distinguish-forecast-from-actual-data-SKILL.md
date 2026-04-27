---
name: Distinguish Forecast from Actual Data
description: Apply distinct visual treatments to separate historical (actual) data from forward-looking (forecast) data in time-series charts. Use this skill when a visualization includes both actual and forecast values and you need to clearly communicate uncertainty to viewers.
---

# Distinguish Forecast from Actual Data

Apply this skill whenever a chart or dashboard displays both historical (actual) data and projected (forecast) data. The goal is to ensure viewers instantly recognize which parts of the data are known facts versus uncertain projections.

## When to Use
- The visualization includes both actual historical data and future forecast data.
- There is a need to communicate the inherent uncertainty of forecasts.
- The audience must not mistake projections for confirmed results.

## How to Execute
1. **Style actual data** with a solid, bold line.
2. **Style forecast data** with a thinner, dotted or dashed line to indicate lower certainty.
3. **Add clear x-axis labels**: Use 'ACTUAL' and 'FORECAST' in all caps beneath the relevant time segments.
4. **Apply subtle background shading** behind the forecast region to visually isolate it.
5. **Label forecast data points numerically** to clarify expected values; omit labels for historical points unless critical for interpretation.
6. **Emphasize the anchor point** (the last actual data point):
   - Display its value with a bold numeric label (e.g., '$108').
   - Use a distinctive marker (e.g., white fill with colored outline).
7. **Use smaller, solid-color markers** for forecast points to reduce visual clutter against dotted lines.
8. **De-emphasize non-essential elements** like footnotes or gridlines by rendering them in light grey.
9. **Never merge actual and forecast data** into a single undifferentiated line—this misleads interpretation.

Avoid this skill if the chart shows only actual data or if forecast certainty is effectively equivalent to actuals (an extremely rare scenario).