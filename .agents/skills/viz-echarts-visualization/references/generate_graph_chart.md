# generate_graph_chart — 关系图

## 功能概述
以节点和边展示实体间的关系网络，支持力导向和环形布局，适用于供应商合作关系、组织架构、知识图谱等。ECharts 独有，Chart.js 不支持。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `source`（string，起点名称）与 `target`（string，终点名称），可选 `value`（number，边权重）。
  或使用 `nodes` + `links` 格式：`nodes`（array，含 `name`/`category`/`value`）和 `links`（array，含 `source`/`target`/`value`）。

### 可选
- `categories`: array<object>，节点分类定义，每条含 `name`（string）。
- `style.layout`: string，布局类型，默认 `force`，可选 `force`/`circular`。
- `style.roam`: boolean，允许缩放拖拽，默认 `true`。
- `style.repulsion`: number，斥力强度，默认 `150`。
- `style.edgeLength`: array<number>，目标边长范围，默认 `[80, 200]`。
- `style.gravity`: number，向心重力，默认 `0.1`。
- `style.curveness`: number，边曲率，默认 `0`（直线）。
- `style.labelPosition`: string，标签位置，默认 `right`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string

## 使用建议
力导向布局适合 10-50 个节点；节点过多建议用 `circular` 布局；`repulsion` 和 `edgeLength` 可调整布局松紧。

## 返回结果
- 返回关系图 HTML 文件路径。
