---
input: 供给端市场规模估算案例
output: 案例库
pos: market-sizing/references/supply_cases.md
---

# Supply-Based Estimation Cases

## Case 1: Mixue Bingcheng (Single Store Bottleneck)
**Goal**: Estimate the annual revenue of a single Mixue Bingcheng bubble tea store.
**Logic**: Daily Revenue = (Active Hours Output + Idle Hours Output) × Unit Price. Output is constrained by the bottleneck.
**Assumptions**:
- **Process**: Ordering+Payment (30s) -> Making (120s). 
- **Bottleneck**: Making is the bottleneck. If 3 staff make drinks simultaneously, bottleneck = 120s / 3 = 40s per cup.
- **Max Capacity**: 3600s / 40s = 90 cups/hour (or 1.5 cups/min).
- **Active Hours**: 5 hours/day (lunch + dinner rush). Capacity = 5 * 90 = 450 cups.
- **Idle Hours**: 7 hours/day. Assume utilization is 50% (multiplier = 0.5). Capacity = 7 * 90 * 0.5 = 315 cups.
- **Daily Output**: 450 + 315 = 765 cups.
- **Price**: 6 RMB/cup.
**Calculation**: 765 cups * 6 RMB * 365 days = ~1.67 Million RMB / year.
