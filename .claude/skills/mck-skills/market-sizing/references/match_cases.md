---
input: 对标市场规模估算案例
output: 案例库
pos: market-sizing/references/match_cases.md
---

# Match-Based Estimation Cases

## Case 1: ATMs in Hong Kong (Small-to-Large Proxy)
**Goal**: Estimate the total number of ATMs in Hong Kong.
**Logic**: Find a known micro-environment, calculate the ratio of users to ATMs, and extrapolate to the macro-environment.
**Assumptions**:
- **Source Base**: CUHK campus has 10,000 students/staff.
- **Source Metric**: CUHK has 5 ATMs.
- **Ratio**: 10,000 / 5 = 2,000 people per ATM.
- **Target Base**: Hong Kong population = 7,000,000.
**Calculation**: 7,000,000 / 2,000 = 3,500 ATMs.

## Case 2: Financial Workers in a County (Large-to-Small Proxy)
**Goal**: Estimate the number of financial professionals in a specific county.
**Logic**: Use national statistics to establish a macro ratio, then scale down to the micro-environment.
**Assumptions**:
- **Source Base**: China total population = 1.41 billion.
- **Source Metric**: National financial workers = 18.31 million.
- **Ratio**: 1.41B / 18.31M = ~77 people served per financial worker.
- **Target Base**: County population (e.g., 500,000).
**Calculation**: 500,000 / 77 = ~6,493 workers.

## Case 3: Coffee Berries (Complement/Intermediate Goods)
**Goal**: Estimate the market size for raw coffee berries.
**Logic**: Use the known demand of the final product to reverse-engineer the raw material requirement.
**Assumptions**:
- 1 cup of Espresso = 15g coffee beans.
- 15g coffee beans = 90g coffee berries.
- Therefore, estimate total cups of coffee sold annually and multiply by 90g.
