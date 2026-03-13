---
input: 需求端市场规模估算案例
output: 案例库
pos: market-sizing/references/demand_cases.md
---

# Demand-Based Estimation Cases

## Case 1: Pork Consumption (Individual Demand)
**Goal**: Estimate annual pork market size in China.
**Logic**: Population × (1 - Vegetarian Rate) × (Daily meat intake × Pork ratio) × Price
**Assumptions**:
- Target base: 1.4 billion people
- Penetration: 97% (assume 3% vegetarians)
- Volume: 200g meat/day (2 meals). Pork ratio = 50% = 100g/day = 36.5kg/year.
- Price: 12 RMB/kg
**Calculation**: 1.4B * 0.97 * 36.5 * 12 = ~594 Billion RMB.

## Case 2: Carpets (Household Demand & Stock/Flow)
**Goal**: Estimate carpet market in Beijing.
**Logic**: Must convert population to households. If growing, separate new demand from replacement demand.
**Assumptions**:
- Base: 20 million people. Beijing household size = 2.31 people/house -> ~8.6M households.
- Penetration: Growing from 40% to 50%.
- New Demand: 8.6M * (50% - 40%) = 860k carpets.
- Replacement Demand: Assuming 4-year lifespan. Previous base = 8.6M * 40% = 3.44M. Annual replacement = 3.44M * 25% = 860k carpets.
- Total Volume: 860k + 860k = 1.72M carpets.
- Price: 200 RMB.
**Calculation**: 1.72M * 200 = 344 Million RMB.
