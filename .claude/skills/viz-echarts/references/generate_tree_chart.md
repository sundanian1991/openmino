# generate_tree_chart — 树图

## 功能概述
展示层级关系的树状结构，适用于组织架构、决策树、目录结构等。

## 输入字段
### 必填
- `data`: object，根节点对象，包含 `name`（string）与可选 `children`（嵌套子节点数组，格式相同）。

### 可选
- `style.layout`: string，布局类型，默认 `orthogonal`（正交），可选 `radial`（径向）。
- `style.orient`: string，方向，默认 `LR`（左→右），可选 `TB`（上→下）。
- `style.roam`: boolean，允许缩放拖拽，默认 `true`。
- `style.expandAndCollapse`: boolean，允许展开/折叠，默认 `true`。
- `style.top/left/bottom/right`: string，图表边距。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回树图 HTML 文件路径。
