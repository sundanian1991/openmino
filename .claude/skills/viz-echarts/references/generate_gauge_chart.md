# generate_gauge_chart — 仪表盘

## 功能概述
展示单项指标的完成度或当前状态，适用于 KPI 完成率、目标进度、实时状态指示等。

## 输入字段
### 必填
- `data`: array<object> 或单个 object。每个对象包含 `value`（number，当前值），可选 `name`（string，指标名称）、`min`（number，最小值）、`max`（number，最大值）。

### 可选
- `style.radius`: string 或 string[]，仪表盘半径，默认 `75%`。
- `style.min`: number，全局最小值，默认 `0`。
- `style.max`: number，全局最大值，默认 `100`。
- `style.showProgress`: boolean，显示进度条，默认 `true`。
- `style.progressWidth`: number，进度条宽度，默认 `15`。
- `style.showTick`: boolean，显示刻度，默认 `true`。
- `style.showSplit`: boolean，显示分隔线，默认 `true`。
- `style.detailOffset`: string，数值显示偏移，默认 `0% 40%`。
- `style.detailFontSize`: number，数值字号，默认 `24`。
- `style.detailFormatter`: string，数值格式化模板，默认 `{value}%`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string

## 使用建议
多仪表盘时建议用不同 radius 数组值避免重叠；默认值域 0-100，需改范围时设 `min`/`max`。

## 返回结果
- 返回仪表盘 HTML 文件路径。
