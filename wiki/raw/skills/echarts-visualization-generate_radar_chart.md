# generate_radar_chart — 雷达图

## 功能概述
展示多个维度的能力对比，适用于供应商评分卡、多维度能力评估、KPI 考核等。

## 输入字段
### 必填
- `indicators`: string[] 或 array<object>，雷达各维度的名称。如为对象数组需包含 `name` 和可选 `max`（该维度最大值）。
- `data`: array<object>，每条记录包含 `name`（或 `group`，string）与 `values`（或 `data`，number 数组），对应各维度的得分。

### 可选
- `style.radius`: string，雷达图半径，默认 `65%`。
- `style.areaOpacity`: number，填充透明度，默认 `0.2`。
- `style.lineWidth`: number，线条粗细，默认 `2`。
- `style.splitNumber`: number，分隔段数，默认 `5`。
- `style.labelFontSize`: number，维度标签字号。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string

## 使用建议
维度数控制在 5-10 个之间；各组数值应在同一量级；建议不超过 3 条对比线以免混乱。

## 返回结果
- 返回雷达图 HTML 文件路径。
