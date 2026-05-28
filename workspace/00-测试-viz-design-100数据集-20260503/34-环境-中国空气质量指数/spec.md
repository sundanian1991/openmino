# Phase 3 — 编译规格

> 数据集 34：中国空气质量指数
> 渲染契约。渲染技能按此执行。

---

## Page: 中国 25 城空气质量排名

- **场景论文**：用横向柱状图揭示"南优北劣"的地理梯度
- **签名视觉元素**：按优/良等级分色，拉萨和石家庄高亮对比
- **签名视觉元素 source id**：Custom

### 叙事意图

**【可视化目的】**
- 认知缺口：人们知道北方空气差，但不知道南北差距接近 3 倍

**【想传达什么】**
- 核心信息（一句话）：中国城市空气质量"南优北劣"，最优最差差距近 3 倍

**【结论】**
- 读者应得出的判断：西南沿海城市空气质量优异，华北工业城市普遍垫底

**【思路】**
- 视觉叙事路径：第一眼顶部拉萨极短柱体 → 第二眼底部石家庄超长柱体 → 最终理解南北分化

### 视觉编码

- **X 轴编码**：AQI 均值，线性刻度（值越低越好）
- **Y 轴编码**：城市名称，按 AQI 升序排列（AQI 低的在上）
- **颜色编码**：优级城市用绿色调，良级城市用 Stone 300 灰化；拉萨和石家庄用 Warm 500 高亮
- **大小编码**：柱体宽度统一，长度编码 AQI 值

### 数据组织

- **字段清单**：城市、AQI 均值、PM2.5 年均浓度、空气质量等级
- **排序规则**：按 AQI 均值升序（AQI 越低越好，排在顶部）
- **聚合规则**：无聚合，原始数据
- **数据示例**：拉萨 AQI 28、昆明 AQI 35、石家庄 AQI 78

### 标注策略

- **高亮点**（≤10%）：2/25 = 8%，符合边界
- **标注内容**：拉萨标注"最优"，石家庄标注"最差"
- **基准线/参考线**：无

### 布局

- **画布**：800 x 550
- **标题区**：顶部，16px/600
- **图表区**：居中，占比 75%
- **标注区**：柱体右侧
- **留白**：四周 >=20px

---

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "中国城市空气质量南优北劣，最优最差差距近 3 倍",
  "subtitle": "2024 年中国主要城市 AQI 年均值",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["城市", "AQI 均值", "PM2.5 年均浓度（μg/m3）", "空气质量等级"],
    "series": [
      { "name": "拉萨", "values": [28], "highlight": true },
      { "name": "昆明", "values": [35], "highlight": false },
      { "name": "海口", "values": [36], "highlight": false },
      { "name": "厦门", "values": [38], "highlight": false },
      { "name": "贵阳", "values": [39], "highlight": false },
      { "name": "深圳", "values": [42], "highlight": false },
      { "name": "福州", "values": [43], "highlight": false },
      { "name": "杭州", "values": [45], "highlight": false },
      { "name": "南宁", "values": [46], "highlight": false },
      { "name": "广州", "values": [48], "highlight": false },
      { "name": "西宁", "values": [48], "highlight": false },
      { "name": "上海", "values": [50], "highlight": false },
      { "name": "南京", "values": [52], "highlight": false },
      { "name": "重庆", "values": [54], "highlight": false },
      { "name": "成都", "values": [55], "highlight": false },
      { "name": "武汉", "values": [56], "highlight": false },
      { "name": "沈阳", "values": [58], "highlight": false },
      { "name": "哈尔滨", "values": [60], "highlight": false },
      { "name": "北京", "values": [62], "highlight": false },
      { "name": "天津", "values": [65], "highlight": false },
      { "name": "济南", "values": [68], "highlight": false },
      { "name": "兰州", "values": [70], "highlight": false },
      { "name": "郑州", "values": [72], "highlight": false },
      { "name": "太原", "values": [75], "highlight": false },
      { "name": "石家庄", "values": [78], "highlight": true }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "拉萨", "color": "#2e8b6e" },
      { "series": "石家庄", "color": "#c26d3a" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "最优城市，AQI 仅 28", "target": "拉萨" },
    { "text": "最差城市，AQI 78，是拉萨的 2.8 倍", "target": "石家庄" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
