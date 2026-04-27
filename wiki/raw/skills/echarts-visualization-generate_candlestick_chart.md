# generate_candlestick_chart — K线图/蜡烛图

## 功能概述
展示金融数据的开盘、收盘、最高、最低价，适用于股价、汇率、业务指标波动分析。ECharts 独有，Chart.js 不支持。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `date`（或 `time`，string）与 `open`（number）、`close`（number）、`low`（number）、`high`（number）。

### 可选
- `style.barMaxWidth`: number，K 线最大宽度（像素），默认 `30`。
- `style.upColor`: string，阳线颜色，默认 `#ef5350`。
- `style.downColor`: string，阴线颜色，默认 `#26a69a`。
- `style.upBorderColor`: string，阳线边框颜色。
- `style.downBorderColor`: string，阴线边框颜色。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string
- `xAxisTitle`: string
- `yAxisTitle`: string

## 使用建议
数据按时间升序排列；OHLC 顺序为 open/close/low/high（注意不是 OHLC 常规顺序）；建议配合均线等指标叠加使用。

## 返回结果
- 返回 K 线图 HTML 文件路径。
