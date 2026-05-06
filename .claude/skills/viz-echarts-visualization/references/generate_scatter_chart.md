# generate_scatter_chart — 散点图

## 功能概述
展示两个变量之间的相关性关系，适用于双变量分布分析、异常值检测、供应商效率散点等。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `x`（number）与 `y`（number），可选 `group`（string）用于分组着色。

### 可选
- `style.symbolSize`: number，散点大小，默认 `10`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string
- `xAxisTitle`: string
- `yAxisTitle`: string

## 使用建议
数据点少于 10 个时考虑改用气泡图或表格；超过 500 个时建议先抽样；分组不超过 5 个。

## 返回结果
- 返回散点图 HTML 文件路径。
