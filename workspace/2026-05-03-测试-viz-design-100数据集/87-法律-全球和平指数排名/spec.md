# spec.md — 全球和平指数排名可视化规格

## 可视化目的

**认知缺口**：读者知道"有和平指数"，但不清楚全球和平差距的具体量级和地理分布模式
**想传达什么**：冰岛蝉联全球最和平国家，末尾三国得分是前列的2-3倍，和平鸿沟触目惊心
**结论**：和平不是随机分布的，北欧/西欧长期占据顶端，非洲/中东深陷冲突泥潭
**思路**：横向柱状图展示GPI得分差距，冰岛高亮，其余灰度处理，尾部锚点对比

## 视觉执行

### 模式选择
- **模式**：13-柱状图 → bar_chart
- **匹配理由**：一维排名对比，横向布局适配长文本国家名

### 标题
- **主标题**：冰岛蝉联全球最和平国家，末尾三国得分是前列的2-3倍
- **副标题**：2024年 · 163个国家 GPI 排名（得分越低越和平）

### 视觉编码
- **Y轴**：国家名称（按GPI得分升序排列）
- **X轴**：GPI得分值（0 ~ 3.6）
- **颜色**：冰岛=#2563EB（深蓝），其余全部=#94A3B8（灰），南苏丹/也门/阿富汗=#DC2626（红）
- **大小**：柱子宽度统一 18px

### 数据组织
- **字段**：country, gpi_score, rank, region
- **排序**：GPI得分升序
- **聚合**：无

### 标注策略
- **高亮**：仅冰岛（最和平）
- **高亮比例**：1/19 ≈ 5%
- **标注**：写原因，不堆数字

### 参考线
- GPI = 2.0 处画虚线，区分"相对和平"与"不稳定"

### 布局
- **画布**：800 x 550
- **Padding**：top 60, right 40, bottom 40, left 120
- **配色**：单色灰度 + 冰岛蓝 + 尾部红

## Source ID 追溯

- 模式选择：viz-design SKILL.md §五 模式13
- 色彩方案：13-VISUALIZATION.md 灰度为主 + 单色高亮
- 高亮约束：≤10%，仅冰岛

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "冰岛蝉联全球最和平国家，末尾三国得分是前列的2-3倍",
  "subtitle": "2024年 · 163个国家 GPI 排名（得分越低越和平）",
  "canvas": {
    "width": 800,
    "height": 550
  },
  "data": {
    "fields": ["country", "gpi_score", "rank", "region"],
    "series": [
      {
        "name": "和平指数",
        "values": [
          {"country": "冰岛", "gpi_score": 1.112, "rank": 1, "region": "北欧", "highlight": true},
          {"country": "爱尔兰", "gpi_score": 1.303, "rank": 2, "region": "西欧"},
          {"country": "奥地利", "gpi_score": 1.313, "rank": 3, "region": "西欧"},
          {"country": "新西兰", "gpi_score": 1.323, "rank": 4, "region": "大洋洲"},
          {"country": "新加坡", "gpi_score": 1.339, "rank": 5, "region": "东南亚"},
          {"country": "瑞士", "gpi_score": 1.350, "rank": 6, "region": "西欧"},
          {"country": "葡萄牙", "gpi_score": 1.373, "rank": 7, "region": "南欧"},
          {"country": "丹麦", "gpi_score": 1.382, "rank": 8, "region": "北欧"},
          {"country": "斯洛文尼亚", "gpi_score": 1.394, "rank": 9, "region": "东欧"},
          {"country": "马来西亚", "gpi_score": 1.427, "rank": 10, "region": "东南亚"},
          {"country": "加拿大", "gpi_score": 1.445, "rank": 11, "region": "北美"},
          {"country": "捷克", "gpi_score": 1.459, "rank": 12, "region": "东欧"},
          {"country": "芬兰", "gpi_score": 1.464, "rank": 13, "region": "北欧"},
          {"country": "匈牙利", "gpi_score": 1.465, "rank": 14, "region": "东欧"},
          {"country": "澳大利亚", "gpi_score": 1.469, "rank": 15, "region": "大洋洲"},
          {"country": "中国", "gpi_score": 2.157, "rank": 88, "region": "东亚"},
          {"country": "南苏丹", "gpi_score": 3.523, "rank": 160, "region": "非洲", "highlight": true},
          {"country": "也门", "gpi_score": 3.397, "rank": 161, "region": "中东", "highlight": true},
          {"country": "阿富汗", "gpi_score": 3.336, "rank": 162, "region": "中亚", "highlight": true}
        ]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [
      {"item": "冰岛", "reason": "全球最和平国家", "color": "#2563EB"},
      {"item": "南苏丹", "reason": "冲突最严重国家", "color": "#DC2626"},
      {"item": "也门", "reason": "冲突区域", "color": "#DC2626"},
      {"item": "阿富汗", "reason": "冲突区域", "color": "#DC2626"}
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "全球最和平", "target": "冰岛", "position": "right"},
    {"text": "冲突泥潭", "target": "南苏丹", "position": "right"}
  ],
  "referenceLines": [
    {"value": 2.0, "label": "和平/动荡分界", "style": "dashed"}
  ],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 60,
      "right": 40,
      "bottom": 40,
      "left": 120
    }
  }
}
```
