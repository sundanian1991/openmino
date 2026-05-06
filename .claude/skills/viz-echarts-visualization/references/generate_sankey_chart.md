# generate_sankey_chart — 桑基图

## 功能概述
展示实体间的流量分配与流向关系，节点宽度映射数值，适用于资金流向、用户路径、供应商业务分配等分析。ECharts 独有，Chart.js 不支持。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `source`（string，起始节点）、`target`（string，目标节点）与 `value`（number，流量值）。

### 可选
- `style.nodeGap`: number，节点间距，默认 `12`。
- `style.nodeAlign`: string，节点对齐方式，默认 `justify`，可选 `left`/`right`/`center`。
- `style.curveness`: number，连线曲率，默认 `0.5`。
- `style.layoutIterations`: number，布局迭代次数，默认 `32`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string

## 使用建议
确保 source/target 名称一致以正确合并节点；避免过多无关联节点导致布局混乱；流量值建议用正整数。

## 返回结果
- 返回桑基图 HTML 文件路径。
