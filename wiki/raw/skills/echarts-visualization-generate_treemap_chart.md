# generate_treemap_chart — 矩形树图

## 功能概述
以嵌套矩形面积展示层级数据结构，支持点击钻取，适用于组织架构、业务线供应商分布、预算层级等。ECharts 独有，Chart.js 不支持。

## 输入字段
### 必填
- `data`: array<object>，层级数据结构，每条记录包含 `name`（string）与 `value`（number），可选 `children`（嵌套子节点数组，格式相同）。

### 可选
- `style.roam`: boolean，允许缩放拖拽，默认 `true`。
- `style.breadcrumb`: boolean，显示面包屑导航，默认 `true`。
- `style.showLabel`: boolean，显示标签，默认 `true`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string

## 使用建议
层级不超过 3-4 层以免过密；叶节点必须有 value 值；同层节点 value 总和代表父节点占比。

## 返回结果
- 返回矩形树图 HTML 文件路径。
