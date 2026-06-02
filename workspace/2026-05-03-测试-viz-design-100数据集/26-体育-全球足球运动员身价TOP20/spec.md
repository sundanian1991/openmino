# Phase 3: spec.md — 编译规格

## 数据集
26-体育-全球足球运动员身价TOP20

---

## 第一部分：叙事意图

### 【可视化目的】
回答"当今足坛谁最值钱，身价分布是否均匀"这个认知缺口。

### 【想传达什么】
哈兰德和维尼修斯并列 2 亿登顶，但皇马以 4 席成为 TOP20 中最大赢家。

### 【结论】
顶级球员身价高度集中，TOP3 均在 1.8 亿以上，而排名第 20 的球员身价仅为 TOP1 的 30%。

### 【思路】
水平条形图按身价降序排列，"谁最贵"一目了然。高亮 TOP3 强调顶层集中度。

---

## 第二部分：视觉执行

### 【模式选择】
- 模式 13 — 柱状图（水平条形图）
- 理由：20 名球员 × 身价，天然排名对比

### 【标题】
- 主标题：哈兰德与维尼修斯 2 亿并列足坛身价之巅
- 副标题：2025 年估计 · TOP20 球员身价（欧元）

### 【视觉编码】
- X 轴：身价（亿欧元）
- Y 轴：球员名称（按身价降序）
- 颜色：TOP3 = Warm 500（#c26d3a），其余 = Stone 300（#ada599）
- 高亮比例：3/20 = 15%

### 【数据组织】
- 字段：球员、身价（亿欧元）、俱乐部
- 排序：按身价降序
- 数据（按排名）：哈兰德 2.00、维尼修斯 2.00、姆巴佩 1.80、贝林厄姆 1.80、亚马尔 1.80、萨卡 1.60、穆西亚拉 1.50、维尔茨 1.40、罗德里 1.30、巴尔韦德 1.20、凯恩 1.10、福登 1.10、佩德里 1.00、萨利巴 1.00、加维 0.90、格瓦迪奥尔 0.85、拉什福德 0.85、萨拉赫 0.80、努涅斯 0.70、登贝莱 0.60

### 【标注策略】
- 高亮：TOP3（哈兰德、维尼修斯、姆巴佩）
- 标注：哈兰德旁"曼城"、维尼修斯旁"皇马"

### 【图例/辅助】
- 脚注：身价单位为亿欧元，数据为 2025 年估计值

### 【布局】
- 画布：800 × 550
- 标题位置：顶部居中
- 配色：Warm + Stone，≤2 ramp
- 柱形圆角：顶部 6px
- Y 轴标签：球员名直接标注

---

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "哈兰德与维尼修斯 2 亿并列足坛身价之巅",
  "subtitle": "2025 年估计 · TOP20 球员身价（欧元）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["player", "value_eur_bn", "club"],
    "series": [
      {
        "name": "身价",
        "values": [
          {"player": "哈兰德", "value_eur_bn": 2.00, "club": "曼城", "highlight": true},
          {"player": "维尼修斯", "value_eur_bn": 2.00, "club": "皇家马德里", "highlight": true},
          {"player": "姆巴佩", "value_eur_bn": 1.80, "club": "皇家马德里", "highlight": true},
          {"player": "贝林厄姆", "value_eur_bn": 1.80, "club": "皇家马德里"},
          {"player": "亚马尔", "value_eur_bn": 1.80, "club": "巴塞罗那"},
          {"player": "萨卡", "value_eur_bn": 1.60, "club": "阿森纳"},
          {"player": "穆西亚拉", "value_eur_bn": 1.50, "club": "拜仁慕尼黑"},
          {"player": "维尔茨", "value_eur_bn": 1.40, "club": "勒沃库森"},
          {"player": "罗德里", "value_eur_bn": 1.30, "club": "曼城"},
          {"player": "巴尔韦德", "value_eur_bn": 1.20, "club": "皇家马德里"},
          {"player": "凯恩", "value_eur_bn": 1.10, "club": "拜仁慕尼黑"},
          {"player": "福登", "value_eur_bn": 1.10, "club": "曼城"},
          {"player": "佩德里", "value_eur_bn": 1.00, "club": "巴塞罗那"},
          {"player": "萨利巴", "value_eur_bn": 1.00, "club": "阿森纳"},
          {"player": "加维", "value_eur_bn": 0.90, "club": "巴塞罗那"},
          {"player": "格瓦迪奥尔", "value_eur_bn": 0.85, "club": "曼城"},
          {"player": "拉什福德", "value_eur_bn": 0.85, "club": "曼联"},
          {"player": "萨拉赫", "value_eur_bn": 0.80, "club": "利物浦"},
          {"player": "努涅斯", "value_eur_bn": 0.70, "club": "利物浦"},
          {"player": "登贝莱", "value_eur_bn": 0.60, "club": "巴黎圣日耳曼"}
        ]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"series": "身价", "value": "哈兰德", "color": "#c26d3a"},
      {"series": "身价", "value": "维尼修斯", "color": "#c26d3a"},
      {"series": "身价", "value": "姆巴佩", "color": "#c26d3a"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.15
  },
  "annotations": [
    {"text": "曼城", "target": "哈兰德"},
    {"text": "皇马", "target": "维尼修斯"}
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
