# generate_pictorial_bar_chart — 象形柱图

## 功能概述
用自定义图形（圆形、三角形、箭头等）替代传统柱状图的柱子，适用于创意数据展示、信息图表。

## 输入字段
### 必填
- `data`: array<object>，每条包含 `category`（string）与 `value`（number）。

### 可选
- `style.symbol`: string，图形类型，默认 `roundRect`，可选 `circle`、`triangle`、`diamond`、`arrow`、`image://url`。
- `style.symbolSize`: string[]，图形尺寸 [宽, 高]，默认 `['100%', '100%']`。
- `style.symbolRepeat`: boolean，是否重复排列图形，默认 `false`。
- `style.showLabel`: boolean，显示标签，默认 `true`。
- `style.maxY`: number，y 轴最大值。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回象形柱图 HTML 文件路径。
