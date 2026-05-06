# generate_calendar_chart — 日历热力图

## 功能概述
以日历形式展示每日数据的密度或强度，适用于年度活动追踪、提交记录、打卡统计。

## 输入字段
### 必填
- `data`: array，每条为 `[date, value]` 数组或 `{date, value}` 对象，日期格式 `YYYY-MM-DD`。

### 可选
- `style.range`: string | string[]，日期范围，默认 `'2026'`，可设为 `['2025-01-01', '2026-12-31']`。
- `style.cellSize`: number，单元格大小，默认 `20`。
- `style.visualMin/Max`: number，visualMap 范围。
- `style.visualType`: string，visualMap 类型，默认 `piecewise`。
- `style.colorRange`: string[]，颜色范围，默认 GitHub 风格绿色系。
- `style.calLeft/Right`: number，日历左右边距，默认 `40`。
- `style.showYear`: boolean，显示年份，默认 `true`。
- `style.firstDay`: number，一周第一天，默认 `0`（周日），`1` 为周一。
- `style.dayNames`: string[]，自定义星期名称。
- `style.monthNames`: string，自定义月份名称映射，默认 `'en'`。
- `style.backgroundColor`: string
- `style.palette`: string[]
- `theme`: string
- `title`: string

## 返回结果
- 返回日历热力图 HTML 文件路径。
