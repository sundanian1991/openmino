# Phase 3 — 编译规格

> 数据集 33：全球碳排放排名
> 渲染契约。渲染技能按此执行。

---

## Page: 全球碳排放 Top 20

- **场景论文**：用水平条形图揭示"前 3 国排放量超过全球一半"的集中度真相
- **签名视觉元素**：前 3 国 Warm 500 实色填充 + 右侧占比标注，其余 17 国 Stone 300 半透明
- **签名视觉元素 source id**：Custom

### 叙事意图

**【可视化目的】**
- 认知缺口：人们知道中国排放大，但不知道是美国的 2.8 倍

**【想传达什么】**
- 核心信息（一句话）：中国承担全球三分之一的碳排放，总量断层领先

**【结论】**
- 读者应得出的判断：全球碳排放高度集中在少数国家

**【思路】**
- 视觉叙事路径：第一眼中国超长柱体 → 第二眼美印跟随 → 最终理解 TOP3 占半壁江山

### 视觉编码

- **X 轴编码**：CO2 排放总量（吨），线性刻度
- **Y 轴编码**：国家名称，按总量降序排列
- **颜色编码**：TOP3（中国/美国/印度）用 Warm 500 主色，其余 17 国 Stone 300 灰化
- **大小编码**：柱体宽度统一，长度编码排放量

### 数据组织

- **字段清单**：国家、CO2 排放量（吨）、人均（吨）、占全球比例
- **排序规则**：按 CO2 排放总量降序
- **聚合规则**：无聚合，原始数据
- **数据示例**：中国 131.2 亿吨、美国 46.3 亿吨、印度 31.5 亿吨

### 标注策略

- **高亮点**（≤10%）：3/20 = 15%，略超边界。改为仅高亮中国（1/20=5%），美国印度用次级强调色
- **标注内容**：中国柱体右侧标注"占全球 33%"
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
  "title": "中国排放总量是美国的 2.8 倍，占全球三分之一",
  "subtitle": "2024 年全球碳排放 Top 20 国家",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["国家", "CO2 排放量（吨）", "人均（吨）", "占全球比例"],
    "series": [
      { "name": "中国", "values": [13124727993], "highlight": true },
      { "name": "美国", "values": [4632164876], "highlight": false },
      { "name": "印度", "values": [3153829130], "highlight": false },
      { "name": "俄罗斯", "values": [2009154097], "highlight": false },
      { "name": "日本", "values": [972266973], "highlight": false },
      { "name": "伊朗", "values": [828989585], "highlight": false },
      { "name": "印度尼西亚", "values": [812204159], "highlight": false },
      { "name": "沙特阿拉伯", "values": [652511035], "highlight": false },
      { "name": "韩国", "values": [588008898], "highlight": false },
      { "name": "德国", "values": [579935607], "highlight": false },
      { "name": "加拿大", "values": [577972624], "highlight": false },
      { "name": "巴西", "values": [491468781], "highlight": false },
      { "name": "墨西哥", "values": [475992111], "highlight": false },
      { "name": "土耳其", "values": [460027460], "highlight": false },
      { "name": "南非", "values": [440167752], "highlight": false },
      { "name": "越南", "values": [430819227], "highlight": false },
      { "name": "澳大利亚", "values": [383403111], "highlight": false },
      { "name": "意大利", "values": [299228526], "highlight": false },
      { "name": "马来西亚", "values": [295954220], "highlight": false },
      { "name": "英国", "values": [292419359], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "中国", "color": "#c26d3a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "占全球 33.12%", "target": "中国" },
    { "text": "人均 17.73 吨，远高于中国 9.13 吨", "target": "沙特阿拉伯" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
