# generate_area_chart — 面积图

## 功能概述
展示连续自变量（常为时间）下的数值趋势，支持堆叠模式观察不同分组的累计贡献，适合 KPI、能源、产出等时间序列场景。

## 输入字段
### 必填
- `data`: array<object>，元素包含 `time`（string）与 `value`（number），堆叠时需补充 `group`（string）。

### 可选
- `stack`: boolean，默认 `false`，开启堆叠需确保每条数据都含 `group` 字段。
- `style.showArea`: boolean，非堆叠模式下显示面积填充，默认 `false`。
- `style.areaOpacity`: number，面积透明度，默认 `0.5`。
- `style.smooth`: boolean，平滑曲线，默认 `true`。
- `style.lineWidth`: number，边界线宽，默认 `2`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回面积图 HTML 文件路径。
