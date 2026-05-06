# generate_funnel_chart — 漏斗图

## 功能概述
展示流程各阶段的递减转化，适用于销售漏斗、用户转化、审批流程等场景。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `category`（或 `name`，string）与 `value`（number），按流程顺序排列。

### 可选
- `style.sort`: string，排序方式，默认 `descending`，可选 `ascending`/`descending`/`none`。
- `style.width`: string，图表宽度，默认 `80%`。
- `style.height`: string，图表高度，默认 `80%`。
- `style.gap`: number，各阶段间距，默认 `2`。
- `style.showLabel`: boolean，显示标签，默认 `true`。
- `style.align`: string，对齐方式，默认 `center`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string

## 使用建议
阶段不超过 6 个以免过长；使用 `none` 排序可保持原始数据顺序；配合百分比数据更直观。

## 返回结果
- 返回漏斗图 HTML 文件路径。
