# Compiled SPEC — 岐力职场人力分析

> 从 storyboard.md 提取的精确渲染参数。Phase 3 纯技术翻译，不引入新设计决策。

---

## globalStyle（从 storyboard 继承，全文共享）

```json
{
  "colorRamps": ["Warm", "Stone"],
  "palette": {
    "primary": "#d4a574",
    "alert": "#c0392b",
    "light": "#e8d5c0",
    "positive": "#2e7d32",
    "title": "#1a1a1a",
    "subtitle": "#888888",
    "axis": "#888888",
    "grid": "#eee",
    "bg": "#f8f6f3",
    "cardBg": "#ffffff"
  },
  "typography": {
    "title": { "size": 18, "weight": 700 },
    "chartTitle": { "size": 15, "weight": 600 },
    "subtitle": { "size": 13, "weight": 400 },
    "axisLabel": { "size": 11, "weight": 400 },
    "annotation": { "size": 11, "weight": 600 },
    "footnote": { "size": 10, "weight": 400 }
  },
  "spacing": { "cardPadding": 24, "cardGap": 24, "titleToContent": 16 },
  "cornerRadius": 12,
  "styleSchool": "restrained-warm"
}
```

---

## Page 1: KPI 总览卡片组

- **场景论文**：5个数字定全局基调
- **签名视觉元素**：流失率卡片红色高亮，其余暖棕
- **布局**：5列等宽卡片，满宽

### 视觉编码

| KPI | 数值 | 颜色 | 说明 |
|-----|------|------|------|
| 历史总人数 | 117 | `#d4a574` | 中性 |
| 当前在职 | 63 | `#d4a574` | 中性 |
| 已流失 | 54 | `#c0392b` | 警示 |
| 流失率 | 46.2% | `#c0392b` | 警示 |
| 人均GMV | 402万 | `#d4a574` | 中性 |

### 渲染约束

```
layout:
  container: { display: grid, gridTemplateColumns: repeat(5, 1fr), gap: 16px }
  card: { background: #ffffff, borderRadius: 12px, padding: 20px, textAlign: center }
  value: { fontSize: 32, fontWeight: 700 }
  label: { fontSize: 13, color: #888 }

colorMap:
  "117": "#1a1a1a"
  "63": "#1a1a1a"
  "54": "#c0392b"
  "46.2%": "#c0392b"
  "402万": "#1a1a1a"
```

---

## Page 2: 在职人员司龄结构（环形图）

- **场景论文**：65%的在职人员入职不超过60天
- **签名视觉元素**：环形图中心显示"63人在职"

### 视觉编码

- **类型**：环形图（pie, radius 40%-70%）
- **颜色**：从主色 `#d4a574` 递减到 `#e8d5c0`
- **中心标注**：`63人在职`，14px/600

### 数据组织

| 段 | 值 | 颜色 |
|----|------|------|
| 0-30天 | 23 | `#d4a574` |
| 31-60天 | 18 | `#c99060` |
| 61-90天 | 10 | `#b8784c` |
| 91-180天 | 6 | `#a06838` |
| 181-365天 | 6 | `#e8d5c0` |

### 渲染约束

```
series:
  type: pie
  radius: ["40%", "70%"]
  center: ["50%", "50%"]
  label: { formatter: "{b}\n{c}人", fontSize: 12 }
  emphasis: { disabled: true }

annotations:
  - type: text
    target: { center: true }
    text: "63人在职"
    style: { fontSize: 14, fontWeight: 600, fill: "#1a1a1a" }
```

---

## Page 3: 在职人员按入职月人均GMV（柱状+折线双轴）

- **场景论文**：3月入职的23人在职，人均568万GMV——当前产出主力
- **签名视觉元素**：柱状颜色深=高产出，三级色阶

### 视觉编码

- **X 轴**：入职月份（25-06 到 26-05）
- **左 Y 轴**：人均GMV（万）
- **右 Y 轴**：在职人数
- **柱色**：三级色阶 — >700万 `#c0392b` / 400-700万 `#d4a574` / <400万 `#e8d5c0`
- **折线**：`#1a1a1a`，symbolSize 8

### 数据组织

| 月份 | 人均GMV | 人数 | 柱色 |
|------|---------|------|------|
| 25-06 | 435.46 | 3 | `#d4a574` |
| 25-07 | 814.22 | 1 | `#c0392b` |
| 25-09 | 827.82 | 2 | `#c0392b` |
| 25-11 | 540.75 | 2 | `#d4a574` |
| 25-12 | 543.0 | 2 | `#d4a574` |
| 26-01 | 689.62 | 2 | `#d4a574` |
| 26-02 | 1030.0 | 1 | `#c0392b` |
| 26-03 | 567.8 | 23 | `#d4a574` |
| 26-04 | 413.59 | 8 | `#d4a574` |
| 26-05 | 32.36 | 19 | `#e8d5c0` |

### 标注清单

```
annotations:
  - type: label
    target: { series: 0, dataIndex: 7 }
    text: "567.8万"
    position: top
    style: { fontSize: 10, fontWeight: 600, fill: "#1a1a1a" }
  - type: label
    target: { series: 1, dataIndex: 7 }
    text: "23人"
    position: top
    offset: { y: -16 }
    style: { fontSize: 10, fontWeight: 600, fill: "#1a1a1a" }
```

### 渲染约束

```
layout:
  grid: { top: 20, right: 60, bottom: 40, left: 50 }
  yAxis: [
    { type: value, name: "GMV(万)" },
    { type: value, name: "人数", splitLine: { show: false } }
  ]
  legend: { show: true, position: bottom }
  barWidth: "50%"

visualWeight:
  hero: { target: "series[0] dataIndex[7]", style: { color: "#c0392b" } }
  medium: { target: "series[1]", style: { color: "#1a1a1a", lineWidth: 2 } }
  light: { target: "series[0] 其余", style: { color: "#d4a574" } }
```

---

## Page 4: 按月入职人数（柱状图）

- **场景论文**：3月集中入职46人，占总量39%
- **签名视觉元素**：3月柱子用 `#c0392b` 高亮

### 视觉编码

- **X 轴**：入职月份
- **Y 轴**：人数
- **柱色**：3月 `#c0392b`，其余 `#d4a574`

### 数据组织

| 月份 | 人数 | 柱色 |
|------|------|------|
| 25-06 | 6 | `#d4a574` |
| 25-07 | 3 | `#d4a574` |
| 25-09 | 2 | `#d4a574` |
| 25-10 | 3 | `#d4a574` |
| 25-11 | 3 | `#d4a574` |
| 25-12 | 3 | `#d4a574` |
| 26-01 | 5 | `#d4a574` |
| 26-02 | 2 | `#d4a574` |
| 26-03 | 46 | `#c0392b` |
| 26-04 | 21 | `#d4a574` |
| 26-05 | 23 | `#d4a574` |

### 标注清单

```
annotations:
  - type: markPoint
    target: { series: 0, dataIndex: 8 }
    text: "46人"
    symbol: circle
    symbolSize: 50
    style: { fontSize: 12, fontWeight: 700, fill: "#ffffff" }
```

### 渲染约束

```
layout:
  grid: { top: 20, right: 20, bottom: 30, left: 50 }
  barWidth: "50%"
  label: { show: true, position: "top", formatter: "{c}人", fontSize: 11 }

visualWeight:
  hero: { target: "dataIndex[8]", style: { color: "#c0392b" } }
  light: { target: "其余", style: { color: "#d4a574" } }
```

---

## Page 5: 月度在职人数趋势（面积折线图）

- **场景论文**：4月峰值76人后回落至65人——增长动能衰减
- **签名视觉元素**：面积填充渐变，峰值标注

### 视觉编码

- **X 轴**：月份
- **Y 轴**：在职人数
- **折线**：`#d4a574`，宽度3
- **面积**：从 `rgba(212,165,116,0.3)` 到 `rgba(212,165,116,0.02)` 线性渐变

### 数据组织

| 月份 | 在职人数 |
|------|---------|
| 25-06 | 6 |
| 25-07 | 9 |
| 25-09 | 11 |
| 25-10 | 14 |
| 25-11 | 17 |
| 25-12 | 20 |
| 26-01 | 25 |
| 26-02 | 27 |
| 26-03 | 73 |
| 26-04 | 76 |
| 26-05 | 65 |

### 标注清单

```
annotations:
  - type: markPoint
    target: { series: 0, dataIndex: 9 }
    text: "峰值76人"
    symbol: pin
    symbolSize: 50
    style: { fontSize: 12, fontWeight: 700, fill: "#ffffff" }
  - type: markPoint
    target: { series: 0, dataIndex: 10 }
    text: "65人"
    symbol: circle
    symbolSize: 40
    style: { fontSize: 11, fontWeight: 600, fill: "#1a1a1a" }
```

### 渲染约束

```
layout:
  grid: { top: 20, right: 20, bottom: 30, left: 50 }
  smooth: true

visualWeight:
  hero: { target: "dataIndex[9]", style: { symbolSize: 12, color: "#c0392b" } }
  medium: { target: "dataIndex[10]", style: { symbolSize: 10, color: "#1a1a1a" } }
  light: { target: "其余点", style: { symbolSize: 6, color: "#d4a574" } }
```

---

## Page 6: 各司龄段流失率（水平柱状图）

- **场景论文**：61-90天流失率65.5%——全报告最关键发现
- **签名视觉元素**：61-90天柱子用 `#c0392b` 高亮

### 视觉编码

- **Y 轴**：司龄段（从上到下：0-30天 → 181-365天）
- **X 轴**：流失率（%）
- **柱色**：61-90天 `#c0392b`，其余 `#d4a574`

### 数据组织

| 司龄段 | 流失率 | 总人数 | 流失人数 | 柱色 |
|--------|--------|--------|---------|------|
| 0-30天 | 36.1% | 36 | 13 | `#d4a574` |
| 31-60天 | 33.3% | 27 | 9 | `#d4a574` |
| 61-90天 | 65.5% | 29 | 19 | `#c0392b` |
| 91-180天 | 45.5% | 11 | 5 | `#d4a574` |
| 181-365天 | 57.1% | 14 | 8 | `#d4a574` |

### 标注清单

```
annotations:
  - type: label
    target: { series: 0, dataIndex: 2 }
    text: "65.5%"
    position: right
    style: { fontSize: 14, fontWeight: 700, fill: "#c0392b" }
  - type: label
    target: { series: 0, 其余 }
    text: "{c}%"
    position: right
    style: { fontSize: 12, fontWeight: 600, fill: "#1a1a1a" }
```

### 渲染约束

```
layout:
  grid: { top: 20, right: 80, bottom: 30, left: 80 }
  xAxis: { max: 100 }
  barWidth: "50%"

visualWeight:
  hero: { target: "dataIndex[2]", style: { color: "#c0392b" } }
  light: { target: "其余", style: { color: "#d4a574" } }
```

---

## Page 7: 流失人员在职天数分布（柱状图）

- **场景论文**：19人流失在61-90天——与流失率图互为印证
- **签名视觉元素**：61-90天柱子 `#c0392b` 高亮

### 视觉编码

- **X 轴**：司龄段
- **Y 轴**：流失人数
- **柱色**：61-90天 `#c0392b`，其余 `#d4a574`

### 数据组织

| 司龄段 | 流失人数 | 柱色 |
|--------|---------|------|
| 0-30天 | 13 | `#d4a574` |
| 31-60天 | 9 | `#d4a574` |
| 61-90天 | 19 | `#c0392b` |
| 91-180天 | 5 | `#d4a574` |
| 181-365天 | 8 | `#d4a574` |

### 渲染约束

```
layout:
  grid: { top: 20, right: 20, bottom: 30, left: 50 }
  barWidth: "50%"
  label: { show: true, position: "top", formatter: "{c}人", fontSize: 11 }

visualWeight:
  hero: { target: "dataIndex[2]", style: { color: "#c0392b" } }
  light: { target: "其余", style: { color: "#d4a574" } }
```

---

## Page 8: 流失人员 GMV vs 在职天数（散点图）

- **场景论文**：高GMV人员也在流失——打破"低产出=流失"假设
- **签名视觉元素**：GMV>500万的点标注姓名

### 视觉编码

- **X 轴**：在职天数
- **Y 轴**：GMV（万）
- **散点**：`#c0392b`，opacity 0.6，symbolSize 10
- **标注**：GMV>500万标注姓名，最多8个

### 数据组织（54条记录，从JSON读取）

- 字段：tenure_days, gmv, name
- 过滤：gmv > 500 时标注姓名

### 标注清单

```
annotations:
  - type: label
    target: { condition: gmv > 500 }
    text: "{name}"
    position: right
    style: { fontSize: 10, fill: "#666" }
    maxLabels: 8
```

### 渲染约束

```
layout:
  grid: { top: 20, right: 20, bottom: 40, left: 60 }

visualWeight:
  hero: { target: "gmv > 500", style: { symbolSize: 14, color: "#c0392b", opacity: 0.8 } }
  light: { target: "gmv <= 500", style: { symbolSize: 8, color: "#c0392b", opacity: 0.4 } }
```

---

## Page 9: 流失人员明细表

- **场景论文**：54人逐一列出——可追溯、可复盘
- **签名视觉元素**：等级列用标签色

### 视觉编码

| 列 | 字段 | 格式 |
|----|------|------|
| 姓名 | name | 加粗 |
| 入职月 | hire_month | YYYY-MM |
| 在职天数 | tenure_days | N天 |
| 离线天数 | offline_days | N天 |
| GMV(万) | gmv | 保留1位小数 |
| T0 GMV(万) | t0_gmv | 保留1位小数 |
| 订单数 | orders | 整数 |
| 最后外呼 | last_call | MM-DD |
| 等级 | level | 标签色 |

### 颜色映射

```
colorMap:
  "A": { background: "#e8f5e9", color: "#2e7d32" }
  "B": { background: "#e3f2fd", color: "#1565c0" }
  "C": { background: "#fff3e0", color: "#e65100" }
  "非参评": { background: "#f5f5f5", color: "#999" }
```

### 渲染约束

```
layout:
  container: { maxHeight: 500px, overflowY: auto, borderRadius: 8px, border: "1px solid #eee" }
  table: { width: 100%, borderCollapse: collapse, fontSize: 13 }
  th: { background: "#f5f0eb", padding: "10px 12px", fontWeight: 600, position: sticky, top: 0 }
  td: { padding: "8px 12px", borderBottom: "1px solid #eee" }
  tr:hover: { background: "#faf7f4" }
```

---

## Source ID 清单

| 决策 | 来源 | 说明 |
|------|------|------|
| 模式选择 | storyboard.md Scene 1-9 | 从场景论文继承 |
| 风格选择 | style-schools.md #01 麦肯锡极简 | restrained-warm |
| 配色选择 | 用户指定 | #d4a574 主色、#c0392b 警示 |
| 构图选择 | storyboard.md Phase 0 | 网格布局 2列 |
| 字体选择 | 全局风格 | system-ui, sans-serif |

## 渲染委托

**渲染方式**：自渲染（viz-design 自己写 ECharts HTML，铁律 1）

```
委托指令：
"用 ECharts 渲染以上 9 页 SPEC，输出单个自包含 HTML 文件。
- globalStyle 全文共享
- 9张图按 Page 1-9 顺序排列
- 配色从 globalStyle.palette 继承
- 所有标注必须出现在最终渲染中"
```
