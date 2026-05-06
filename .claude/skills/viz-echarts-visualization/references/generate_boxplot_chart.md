# generate_boxplot_chart — 箱线图

## 功能概述
展示数据分布（最小值、Q1、中位数、Q3、最大值），适用于统计分析、异常值检测、多组数据对比。

## 输入字段
### 必填
- `data`: array<object>，每条包含 `name`（string）、`min`、`Q1`、`median`、`Q3`、`max`（均为 number）。或传入原始值数组 `[[组1值...], [组2值...]]`。

### 可选
- `xAxisData`: string[]，x 轴类别标签。
- `style.boxWidth`: number[]，箱子宽度 [最小, 最大]，默认 `[7, 50]`。
- `style.borderWidth`: number，边框宽度，默认 `1`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回箱线图 HTML 文件路径。
