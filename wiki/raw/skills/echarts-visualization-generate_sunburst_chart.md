# generate_sunburst_chart — 旭日图

## 功能概述
以同心圆环展示层级数据的占比，比矩形树图更适合展示层级占比关系。

## 输入字段
### 必填
- `data`: array<object>，顶层节点数组，每个节点包含 `name`（string）、`value`（number），可选 `children`（嵌套子节点数组）。

### 可选
- `style.radius`: string[]，内/外半径，默认 `['15%', '80%']`。
- `style.showLabel`: boolean，显示标签，默认 `true`。
- `style.labelRotate`: string，标签旋转方式，默认 `radial`。
- `style.borderWidth`: number，节点边框宽度，默认 `2`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回旭日图 HTML 文件路径。
