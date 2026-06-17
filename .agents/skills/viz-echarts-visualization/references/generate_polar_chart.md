# generate_polar_chart — 极坐标图

## 功能概述
在极坐标系下展示数据，支持极坐标柱状图和极坐标折线图，适用于周期数据、雷达式对比、南丁格尔玫瑰图。

## 输入字段
### 必填
- `data`: array<object>，每条包含 `category`（string）与 `value`（number），可选 `group`（string）。

### 可选
- `style.polarType`: string，系列类型，默认从 `chartType` 推断（`'bar'` 或 `'line'`）。
- `style.startAngle`: number，起始角度，默认 `90`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string
- `chartType`: string，图表类型，默认 `'bar'`。

## 返回结果
- 返回极坐标图 HTML 文件路径。
