# generate_parallel_chart — 平行坐标图

## 功能概述
在平行坐标系下展示多维数据，适用于多变量对比、降维可视化、高维数据探索。

## 输入字段
### 必填
- `data`: array<object>，每条包含 `values`（number[]，多维数值数组）。
- `dimensions`: array<string|object>，维度名称数组或 `{name, type, min, max}` 对象数组。

### 可选
- `style.parallelLeft/Right/Top/Bottom`: string，图表边距。
- `style.lineWidth`: number，线条宽度，默认 `2`。
- `style.lineOpacity`: number，线条透明度，默认 `0.5`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回平行坐标图 HTML 文件路径。
