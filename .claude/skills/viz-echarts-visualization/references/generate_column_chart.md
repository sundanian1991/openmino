# generate_column_chart — 纵向柱状图

## 功能概述
纵向柱状对比不同类别或时间段的指标，可分组展示，常用于销量、营收、单量对比。

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
类别名称不宜过长；10 个以上类别时考虑改用折线图或滚动。

## 返回结果
- 返回纵向柱状图 HTML 文件路径。
