# generate_theme_river_chart — 主题河流图

## 功能概述
流图形式展示不同类别随时间的变化，适用于多类别时间序列对比、流量趋势分析。

## 输入字段
### 必填
- `data`: array<object>，每条包含 `date` 或 `time`（string）、`value`（number）、`group` 或 `category`（string，类别名）。

### 可选
- `style.singleTop/Bottom`: string，图表上下边距。
- `style.showLabel`: boolean，显示标签，默认 `false`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回主题河流图 HTML 文件路径。
