# generate_pie_chart — 饼/环图

## 功能概述
展示整体与部分的占比，可通过内径形成环图，适用于市场份额、预算构成、供应商份额等。

## 输入字段
### 必填
- `data`: array<object>，每条记录包含 `category`（string）与 `value`（number）。

### 可选
- `style.innerRadius`: number，范围 [0, 1]，默认 `0`（饼图），设为 `0.5` 等值可生成环图。
- `style.showLabel`: boolean，显示标签，默认 `true`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string，默认 `default`，可选 `default`/`dark`/`academy`
- `title`: string

## 使用建议
类别不超过 8 个以免过密；数值总和应接近 100% 或具有可比性；建议用环图时搭配 legend。

## 返回结果
- 返回饼/环图 HTML 文件路径。
