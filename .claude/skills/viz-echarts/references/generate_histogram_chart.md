# generate_histogram_chart — 直方图

## 功能概述
展示数值数据的频率分布，自动分箱统计，适用于数据分布形态分析、正态性检验、异常值识别。

## 输入字段
### 必填
- `data`: array<object>，每条包含 `value`（number）。

### 可选
- `style.binCount`: number，分箱数量，默认按 √n 自动计算。
- `style.binMin/Max`: number，分箱范围边界，默认按数据极值自动计算。
- `style.barGap`: string，柱子间距，默认 `10%`。
- `style.axisXTitle/axisYTitle`: string，坐标轴标题。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回直方图 HTML 文件路径。
