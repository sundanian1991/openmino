# generate_dual_axes_chart — 双轴图

## 功能概述
在同一画布上叠加柱状与折线（或两条不同量纲曲线），用于同时展示趋势与对比，如营收 vs 利润、温度 vs 降雨。

## 输入字段
### 必填
- `categories`: string[]，X 轴刻度（如年份、月份、品类）。
- `series`: array<object>，每项至少包含 `type`（`column`/`line`）与 `data`（number[]，长度与 categories 一致），可选 `axisYTitle`、`name`。

### 可选
- `style.axisXTitle`: string，X 轴标题。
- `style.lineWidth`: number，折线线宽，默认 `2`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回双轴图 HTML 文件路径。
