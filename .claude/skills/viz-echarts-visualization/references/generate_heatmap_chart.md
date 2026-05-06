# generate_heatmap_chart — 热力图

## 功能概述
以颜色深浅展示二维矩阵中数据密度或强度，适用于活跃度、关联度、绩效矩阵等场景。ECharts 独有，Chart.js 不支持。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `x`（number，X 轴索引）、`y`（number，Y 轴索引）与 `value`（number，热力值）。
- `xAxisData`: string[]，X 轴类别标签数组。
- `yAxisData`: string[]，Y 轴类别标签数组。

### 可选
- `style.visualMin`: number，颜色映射最小值。
- `style.visualMax`: number，颜色映射最大值。
- `style.colorRange`: string[]，颜色渐变数组。
- `style.showLabel`: boolean，单元格内显示数值，默认 `false`。
- `style.borderColor`: string，单元格边框颜色。
- `style.borderWidth`: number，单元格边框宽度。
- `style.gridHeight`: string，图表区域高度。
- `style.gridTop`: string，图表区域顶部间距。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string
- `xAxisTitle`: string
- `yAxisTitle`: string

## 使用建议
x/y 为数组索引值（从 0 开始），不是直接标签；数据覆盖全部网格时热力图最直观；建议配合 `visualMin/visualMax` 控制颜色范围。

## 返回结果
- 返回热力图 HTML 文件路径。
