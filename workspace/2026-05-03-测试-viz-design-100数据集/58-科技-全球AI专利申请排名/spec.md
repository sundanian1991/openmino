# Phase 3：渲染规格

> 数据集：58-科技-全球AI专利申请排名
> 日期：2026-05-03

---

## 可视化目的

**为什么要做这张图**：让读者在 3 秒内理解中国在 AI 专利申请量上的绝对领先地位，量级差距一目了然。

**想传达什么**：中国 AI 专利数量碾压式领先，是第二名美国的近 5 倍。

**结论**：中国在国家战略层面的 AI 投入规模远超其他国家，专利申请量是核心证据。

**思路**：水平条形图 + 单色高亮（中国） + 倍数标注。

---

## 模式选择

**模式**：13-柱状图（Bar Chart — 水平布局）
**匹配理由**：分类排名对比的标准表达，国家名称水平排列易读，条形长度直观传达量级差距。

---

## 标题

**主标题**：中国 AI 专利申请量碾压全球：是美国的 5 倍
**副标题**：2023 年度 · 世界知识产权组织（WIPO）

---

## 视觉编码

| 视觉通道 | 编码内容 |
|----------|----------|
| Y 轴 | 国家名称（按数量降序） |
| X 轴 | 专利申请数量（件） |
| 颜色 | 中国 Teal 500（#2e8b6e），其余 Stone 300（#ada599） |
| 条形高度 | 30px，间距 12px |
| 圆角 | 右侧 6px |

---

## 数据组织

```json
{
  "fields": ["country", "patent_count"],
  "series": [
    {"name": "中国", "values": [78000], "highlight": true},
    {"name": "美国", "values": [16000], "highlight": false},
    {"name": "日本", "values": [8500], "highlight": false},
    {"name": "韩国", "values": [6200], "highlight": false},
    {"name": "德国", "values": [4800], "highlight": false},
    {"name": "英国", "values": [3200], "highlight": false}
  ]
}
```

**排序规则**：按专利数量降序
**X 轴范围**：0-90000（从零基线开始）

---

## 标注策略

| 标注 | 目标 | 内容 | 位置 |
|------|------|------|------|
| 数值 | 中国条形末端 | "78,000 件" | 末端右侧 |
| 倍数 | 中美之间 | "5x" | 中国条形末端上方 |
| 组合 | 中国条形下方 | "日韩德总和 = 中国 1/3" | 底部 |

---

## 布局

| 元素 | 规范 |
|------|------|
| 画布 | 800 × 550px |
| 标题 | 18px, 600, Teal 700 (#1a6b50), 左对齐 |
| 副标题 | 11px, 400, Stone 500 (#857d74), 标题下方 6px |
| 轴标签 | 11px, 400, Stone 500 |
| 脚注 | 10px, 400, Stone 400 (#ada599), 底部 |
| 内边距 | 20px 四边 |

---

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "中国 AI 专利申请量碾压全球：是美国的 5 倍",
  "subtitle": "2023 年度 · 世界知识产权组织（WIPO）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["country", "patent_count"],
    "series": [
      {"name": "中国", "values": [78000], "highlight": true},
      {"name": "美国", "values": [16000], "highlight": false},
      {"name": "日本", "values": [8500], "highlight": false},
      {"name": "韩国", "values": [6200], "highlight": false},
      {"name": "德国", "values": [4800], "highlight": false},
      {"name": "英国", "values": [3200], "highlight": false}
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"series": "中国", "color": "#2e8b6e"},
      {"series": "其他", "color": "#ada599"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1,
    "orientation": "horizontal"
  },
  "annotations": [
    {"text": "78,000 件", "target": "中国", "position": "right"},
    {"text": "5x", "target": "中美差距", "position": "between"},
    {"text": "日韩德总和 = 中国 1/3", "target": "底部", "position": "below"}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 20,
      "right": 20,
      "bottom": 20,
      "left": 20
    }
  }
}
```
