---
input: 高德地图API参考文档
output: API调用说明和状态码
pos: lbs-market-analyzer/references/amap-api-guide.md
---

# AMAP API Reference

## Status Codes
- `1`: Success
- `0`: Failure
- `10001`: Invalid Key
- `20000`: Out of Quota

## Important Parameters
- `keywords`: Multiple keywords can be separated by `|` (e.g., "咖啡|甜品").
- `offset`: Number of records per page (max 20-25 depending on API type).
- `sortrule`: `distance` for proximity, `weight` for relevance.
