# generate_bar_chart — 横向柱状图

## 功能概述
横向柱状对比不同类别的指标，可分组或堆叠展示，适用于排名对比、横向标签较长的场景。

## 输入字段
### 必填
- `data`: array<object>，每条至少含 `category`（string）与 `value`（number），如需分组补充 `group`（string）。

### 可选
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string
- `xAxisTitle`: string
- `yAxisTitle`: string

## 使用建议
类别名称较长时用横向优于纵向；分组数据每组应覆盖所有类别以保证对齐。

## 返回结果
- 返回横向柱状图 HTML 文件路径。
