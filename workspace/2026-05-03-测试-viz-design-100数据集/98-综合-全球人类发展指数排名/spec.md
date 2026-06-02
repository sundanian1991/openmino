# spec.md — 全球人类发展指数排名

## 可视化目的

**为什么要做**：HDI 排名数据如果只用表格呈现，读者只能看到"谁第一"。通过两图配合，让读者理解 HDI 的多维本质——健康、教育、收入缺一不可。

**想传达什么**：高 GDP/GNI 不等于高人类发展，预期寿命和教育才是关键变量。

**结论**：美国用全球最高的 GNI 之一却因 77.9 岁的预期寿命跌出前 15，证明金钱买不到健康。

**思路**：图 1 水平条形图建立排名认知 → 图 2 气泡图拆解三维关系，回答"为什么"。

## 视觉执行 — 图 1

### 模式选择

- **模式**：13 — 柱状图（水平条形图）
- **理由**：20 个分类的排名对比，水平条形标签可读性最佳

### 标题

- **主标题**：瑞士领跑人类发展指数，美国因寿命短板跌至第16
- **副标题**：2024 年 · UNDP 人类发展报告 · Top 20

### 视觉编码

- **Y 轴**：国家名称（20 个）
- **X 轴**：HDI 得分（0.91-0.97 范围，注意不从 0 开始以放大差异）
- **颜色**：瑞士 = Sky 500（#3a7ab8），美国 = Coral 500（#c25030），其余 = Stone 400（#857d74）

### 标注策略

- 瑞士旁标注 "0.967"
- 美国旁标注 "寿命 77.9 岁"

## 视觉执行 — 图 2

### 模式选择

- **模式**：05 — 气泡图
- **理由**：需要同时表达 GNI（x）、HDI（y）、教育（气泡大小）、寿命（颜色警示）四个维度

### 标题

- **主标题**：高收入不等于高发展，教育年限才是隐形推手
- **副标题**：Top 20 国家 · 气泡大小 = 平均受教育年限

### 视觉编码

- **X 轴**：人均 GNI（美元）
- **Y 轴**：HDI 得分
- **气泡大小**：平均受教育年限（范围 11.9-14.1）
- **气泡颜色**：美国 = Coral 500（#c25030）警示，其余 = Sky 400（#3a7ab8）

## 渲染契约 — 图 1（HDI 排名条形图）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "瑞士领跑人类发展指数，美国因寿命短板跌至第16",
  "subtitle": "2024年 · UNDP人类发展报告 · Top 20",
  "canvas": {
    "width": 800,
    "height": 600
  },
  "data": {
    "fields": ["country", "hdi_score", "life_expectancy", "education_years", "gni_per_capita"],
    "series": [
      {
        "name": "HDI得分",
        "values": [0.967, 0.966, 0.959, 0.956, 0.952, 0.951, 0.950, 0.950, 0.949, 0.949, 0.946, 0.942, 0.942, 0.939, 0.935, 0.929, 0.927, 0.926, 0.920, 0.919],
        "categories": ["瑞士", "挪威", "丹麦", "中国香港", "爱尔兰", "澳大利亚", "瑞典", "德国", "冰岛", "新加坡", "荷兰", "芬兰", "比利时", "新西兰", "加拿大", "韩国", "美国", "奥地利", "日本", "以色列"]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"index": 0, "color": "#3a7ab8", "label": "0.967"},
      {"index": 16, "color": "#c25030", "label": "寿命77.9岁"}
    ],
    "grayscale": true,
    "defaultColor": "#857d74",
    "maxHighlightRatio": 0.1,
    "orientation": "horizontal",
    "valueLabel": true,
    "valueFormat": ".3f"
  },
  "annotations": [
    {"text": "全球最高", "target": "瑞士", "style": "right"},
    {"text": "预期寿命仅77.9岁", "target": "美国", "style": "right"}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 50,
      "right": 60,
      "bottom": 30,
      "left": 90
    }
  },
  "source": {
    "dataSource": "UNDP 2024年人类发展报告",
    "pattern": "模式13-柱状图",
    "styleSchool": "The Economist Data Journalist"
  }
}
```

## 渲染契约 — 图 2（HDI vs GNI 气泡图）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bubble_chart",
  "title": "高收入不等于高发展，教育年限才是隐形推手",
  "subtitle": "Top 20国家 · 气泡大小=平均受教育年限 · 红色=寿命异常",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["country", "gni_per_capita", "hdi_score", "education_years", "life_expectancy"],
    "series": [
      {
        "name": "HDI-GNI-教育",
        "data": [
          {"country": "瑞士", "x": 69660, "y": 0.967, "size": 13.9, "life": 84.0},
          {"country": "挪威", "x": 64660, "y": 0.966, "size": 12.6, "life": 83.2},
          {"country": "冰岛", "x": 55780, "y": 0.959, "size": 12.4, "life": 82.7},
          {"country": "中国香港", "x": 62610, "y": 0.956, "size": 12.2, "life": 85.5},
          {"country": "澳大利亚", "x": 51240, "y": 0.951, "size": 12.7, "life": 84.3},
          {"country": "丹麦", "x": 60410, "y": 0.952, "size": 12.6, "life": 81.4},
          {"country": "瑞典", "x": 55870, "y": 0.949, "size": 12.6, "life": 83.2},
          {"country": "爱尔兰", "x": 68370, "y": 0.950, "size": 12.7, "life": 82.0},
          {"country": "德国", "x": 53470, "y": 0.950, "size": 14.1, "life": 80.6},
          {"country": "荷兰", "x": 57430, "y": 0.946, "size": 12.4, "life": 82.3},
          {"country": "芬兰", "x": 49220, "y": 0.942, "size": 12.8, "life": 81.9},
          {"country": "新加坡", "x": 87560, "y": 0.949, "size": 11.9, "life": 83.5},
          {"country": "比利时", "x": 50660, "y": 0.942, "size": 12.5, "life": 81.4},
          {"country": "新西兰", "x": 42440, "y": 0.939, "size": 12.5, "life": 82.5},
          {"country": "加拿大", "x": 43250, "y": 0.935, "size": 13.8, "life": 82.7},
          {"country": "美国", "x": 65470, "y": 0.927, "size": 13.7, "life": 77.9},
          {"country": "奥地利", "x": 52270, "y": 0.926, "size": 12.0, "life": 81.6},
          {"country": "以色列", "x": 41830, "y": 0.919, "size": 12.8, "life": 82.6},
          {"country": "日本", "x": 42730, "y": 0.920, "size": 13.4, "life": 84.8},
          {"country": "韩国", "x": 43290, "y": 0.929, "size": 12.5, "life": 83.7}
        ]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"country": "美国", "color": "#c25030", "label": "GNI高但HDI偏低"},
      {"country": "新加坡", "color": "#70a8d8", "label": "GNI最高"}
    ],
    "grayscale": false,
    "defaultColor": "#3a7ab8",
    "maxHighlightRatio": 0.1,
    "xAxis": {"field": "gni_per_capita", "label": "人均GNI（美元）", "format": "$,.0f"},
    "yAxis": {"field": "hdi_score", "label": "HDI得分", "format": ".3f"},
    "bubbleSize": {"field": "education_years", "label": "平均受教育年限", "minRadius": 8, "maxRadius": 28}
  },
  "annotations": [
    {"text": "GNI第3高\nHDI仅第16", "target": "美国", "style": "above"},
    {"text": "GNI全球最高\n教育仅11.9年", "target": "新加坡", "style": "above"},
    {"text": "教育14.1年\nTop20最高", "target": "德国", "style": "below"}
  ],
  "referenceLines": [
    {"axis": "x", "value": 55000, "label": "GNI中位线", "color": "#d6d2c9", "dash": [4, 3]},
    {"axis": "y", "value": 0.945, "label": "HDI中位线", "color": "#d6d2c9", "dash": [4, 3]}
  ],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 50,
      "right": 30,
      "bottom": 50,
      "left": 60
    }
  },
  "source": {
    "dataSource": "UNDP 2024年人类发展报告",
    "pattern": "模式05-气泡图",
    "styleSchool": "The Economist Data Journalist"
  }
}
```
