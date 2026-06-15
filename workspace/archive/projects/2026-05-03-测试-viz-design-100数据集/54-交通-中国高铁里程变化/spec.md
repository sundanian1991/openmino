# Spec — 中国高铁里程变化（2008-2024）

## 可视化目的
让读者理解中国高铁 16 年爆炸式增长及全球绝对领先幅度。

## 想传达什么
从 700 公里到 4.7 万公里，中国高铁是第二名西班牙的 11.7 倍。

## 结论
中国已建成全球最大高铁网络，且仍在稳步增长。

## 思路
折线图展现增长轨迹，柱状图量化全球差距，两张图共同讲述中国高铁故事。

---

## 图 1：中国高铁里程增长趋势

### 模式选择
- 模式 07：折线图
- 匹配理由：16 年时间序列趋势数据

### 标题
- 主标题：16 年从零到 4.7 万公里，中国建成全球最大高铁网络
- 副标题：2008-2024 年中国高铁运营里程变化

### 视觉编码
- X 轴：年份（2008-2024）
- Y 轴：高铁运营里程（万公里），0-5 范围
- 颜色：暖色线条 #E8875F

### 数据组织
- 字段：year, hsr_km, ratio_pct
- 排序：年份升序

### 标注策略
- 高亮：2024 年终点
- 标注：2010 年首条高铁、2019 年突破 3.5 万公里

### 布局
- 画布：800 x 550
- 间距：上 60 / 右 40 / 下 50 / 左 60

---

## 图 2：2024 年全球高铁里程对比

### 模式选择
- 模式 13：柱状图
- 匹配理由：10 国分类对比

### 标题
- 主标题：中国高铁里程是第 2 名西班牙的 11.7 倍
- 副标题：2024 年全球高铁运营里程 TOP 10

### 视觉编码
- Y 轴：国家名称
- X 轴：高铁里程（公里）
- 颜色：中国暖色 #E8875F，其余灰阶

### 数据组织
- 字段：country, hsr_km
- 排序：里程降序

### 标注策略
- 高亮：中国
- 脚注：中国 = 第 2 名 × 11.7

### 布局
- 画布：800 x 550
- 间距：上 60 / 右 100 / 下 40 / 左 120

---

## 渲染契约（机器可读）

### 图 1 JSON — 折线图

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "line_chart",
  "title": "16 年从零到 4.7 万公里，中国建成全球最大高铁网络",
  "subtitle": "2008-2024 年中国高铁运营里程变化（万公里）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["year", "hsr_km", "ratio_pct"],
    "series": [
      {
        "name": "高铁运营里程（万公里）",
        "values": [0.07, 0.87, 0.98, 1.65, 1.98, 2.20, 2.50, 2.97, 3.50, 3.79, 4.00, 4.20, 4.50, 4.70],
        "highlight": true
      }
    ],
    "categories": ["2008", "2010", "2012", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
  },
  "visualEncoding": {
    "highlight": [
      {"series": "高铁运营里程", "index": 13, "color": "#E8875F", "reason": "2024年达4.7万公里"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "2010 首条高铁通车", "target": "2010"},
    {"text": "2019 突破 3.5 万公里", "target": "2019"}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {"top": 60, "right": 40, "bottom": 50, "left": 60}
  }
}
```

### 图 2 JSON — 柱状图

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "中国高铁里程是第 2 名西班牙的 11.7 倍",
  "subtitle": "2024 年全球高铁运营里程 TOP 10（公里）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["country", "hsr_km"],
    "series": [
      {
        "name": "高铁运营里程（公里）",
        "values": [47000, 4000, 3400, 2800, 1900, 1470, 900, 700, 600, 350],
        "highlight": true
      }
    ],
    "categories": ["中国", "西班牙", "日本", "法国", "德国", "意大利", "韩国", "英国", "土耳其", "瑞典"]
  },
  "visualEncoding": {
    "highlight": [
      {"series": "高铁运营里程", "index": 0, "color": "#E8875F", "reason": "全球第一，绝对领先"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "= 第 2 名 × 11.7", "target": "中国"}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {"top": 60, "right": 100, "bottom": 40, "left": 120}
  }
}
```
