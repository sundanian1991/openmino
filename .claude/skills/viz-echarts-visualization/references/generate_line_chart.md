# generate_line_chart — 折线图

## 功能概述
展示时间或连续自变量的趋势，支持多系列对比，适用于 KPI 监控、指标趋势、走势分析。

## 输入字段
### 必填
- `data`: array<object>，每条包含 `time`（或 `category`，string）与 `value`（number），多系列时附带 `group`（string）。

### 可选
- `style.smooth`: boolean，平滑曲线，默认 `true`。
- `style.lineWidth`: number，折线线宽，默认 `2`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string
- `xAxisTitle`: string
- `yAxisTitle`: string

## 使用建议
所有系列的时间点应对齐；建议按 ISO 日期格式化；高频数据可先聚合到日/周粒度避免过密。

## 返回结果
- 返回折线图 HTML 文件路径。
