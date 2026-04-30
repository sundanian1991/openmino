# generate_effect_scatter_chart — 动态散点图

## 功能概述
带涟漪动画的散点图，适用于需要突出关键数据点的场景。

## 输入字段
### 必填
- `data`: array<object>，每条包含 `x`（number）与 `y`（number），可选 `group`（string）。

### 可选
- `style.symbolSize`: number，散点大小，默认 `12`。
- `style.rippleBrush`: string，涟漪样式，默认 `fill`。
- `style.rippleScale`: number，涟漪缩放倍数，默认 `3`。
- `components.toolbox`: object，设为 `{showToolbox: true}` 启用 Toolbox（导出图片、数据视图、还原、图表切换）。
- `components.dataZoom`: object，非空对象即可启用数据缩放（滑块 + 滚轮）。
- `components.marks`: object，`markPoint`（标注点）、`markLine`（标注线如平均值/最大/最小）、`markArea`（标注区域）。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回动态散点图 HTML 文件路径。
