# generate_map_chart — 地图

## 功能概述
基于 GeoJSON 展示区域分布数据，支持颜色映射、缩放、拖拽，适用于供应商区域覆盖、业务地域分布等。ECharts 独有，Chart.js 不支持。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `name`（string，行政区划名称）与 `value`（number，指标值）。

### 可选
- `mapName`: string，地图名称，默认 `china`。
- `style.roam`: boolean，允许缩放拖拽，默认 `true`。
- `style.zoom`: number，初始缩放级别，默认 `1`。
- `style.showLabel`: boolean，显示区域标签，默认 `false`。
- `style.areaColor`: string，默认区域填充色。
- `style.borderColor`: string，区域边框颜色。
- `style.visualMin`: number，颜色映射最小值。
- `style.visualMax`: number，颜色映射最大值。
- `style.visualMinText`: string，最小值文本。
- `style.visualMaxText`: string，最大值文本。
- `style.colorRange`: string[]，颜色渐变数组。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string

## 使用建议
`name` 必须与 GeoJSON 中的行政区划名称完全匹配；中国地图使用省级名称（如"北京市"、"广东省"）；颜色映射建议用单色系渐变。

## 返回结果
- 返回地图 HTML 文件路径。
