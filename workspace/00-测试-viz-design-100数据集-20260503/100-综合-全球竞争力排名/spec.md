# spec.md — 数据集 100：2024年IMD全球竞争力排名

## Page: 新加坡综合竞争力全球第一

- **场景论文**：排名开场图，结论性标题
- **签名视觉元素**：横向条形图+得分标注+中国高亮
- **签名视觉元素 source id**：模式13（柱状图）
- **为什么不能简化为默认模板**：需要展示得分精确值+区域分组暗示

### 叙事意图

**【可视化目的】**：建立全球竞争力格局认知
**【想传达什么】**：新加坡领跑，亚洲崛起，中国第18
**【结论】**：竞争力排名不是按传统西方主导，新兴经济体在上升
**【思路】**：标题 → 新加坡长条 → 中国高亮 → 区域暗示

### 视觉编码
- **X轴编码**：综合得分（80-100）
- **Y轴编码**：国家/地区（按得分降序）
- **颜色编码**：中国大陆用 accent 色高亮，其余 Stone 灰阶
- **高亮**：中国大陆

### 数据组织
- **字段**：国家/地区、综合得分
- **排序**：按得分降序
- **高亮点**：中国大陆（第18）

### 标注策略
- 新加坡标注："100分满分基准"
- 中国大陆标注："综合排名第18，经济表现第11"

### 布局
- **画布**：800 x 550
- **配色**：restrained-warm

---

## Page: 美国竞争力失衡：经济强政府弱

- **场景论文**：热力图揭示结构性差异
- **签名视觉元素**：20x4 排名热力矩阵
- **签名视觉元素 source id**：模式17（网格图）

### 叙事意图

**【可视化目的】**：揭示综合排名背后的维度差异
**【想传达什么】**：没有国家全面均衡，每个国家都有明显短板
**【结论】**：竞争力=木桶效应，最短维度决定上限
**【思路】**：标题 → 美国格(政府23) → 扫描各国色块模式

### 视觉编码
- **X轴编码**：四个维度（经济表现、政府效率、商业效率、基础设施）
- **Y轴编码**：国家（按综合得分降序）
- **颜色编码**：排名映射5档颜色：1-4深绿/5-8绿/9-12中/13-16浅/17+极浅
- **大小编码**：不适用，用颜色深浅

### 数据组织
- **字段**：国家、经济表现排名、政府效率排名、商业效率排名、基础设施排名
- **排序**：按综合得分降序
- **数据示例**：新加坡(2,1,1,3)、美国(4,23,11,15)

### 标注策略
- 美国政府效率格标注："第23名，严重拖累"
- 爱尔兰经济表现格标注："经济第1"

### 布局
- **画布**：800 x 600
- **配色**：restrained-warm

---

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 模式13+17 | SKILL.md §五 | 柱状图+网格热力图 |
| 风格选择 | restrained-warm | style-schools.md | 克制暖色分析风 |
| 配色选择 | Warm+Stone | color-themes.md | 暖色主色+灰阶 |
| 构图选择 | 矩阵网格 | composition-templates.md | 热力矩阵 |

## 渲染委托
**渲染技能**：viz-echarts

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "globalStyle": {
    "colorRamps": ["Warm", "Stone"],
    "palette": {
      "primary": "#c26d3a",
      "secondary": "#857d74",
      "accent": "#2e8b6e",
      "title": "#6b3410",
      "subtitle": "#857d74",
      "axis": "#ada599",
      "grid": "#f2f0eb",
      "bg": "#faf9f7"
    },
    "typography": {
      "title": { "size": 16, "weight": 600 },
      "subtitle": { "size": 11, "weight": 400 },
      "axisLabel": { "size": 11, "weight": 400 },
      "annotation": { "size": 11, "weight": 600 },
      "footnote": { "size": 10, "weight": 400 }
    },
    "spacing": {
      "cardPadding": 16,
      "titleToContent": 12,
      "cardGap": 12
    },
    "cornerRadius": 10,
    "styleSchool": "restrained-warm"
  },
  "charts": [
    {
      "chartId": "chart-1",
      "renderTarget": "viz-echarts",
      "chartType": "bar_chart",
      "title": "新加坡综合竞争力全球第一",
      "subtitle": "2024年IMD全球竞争力排名前20",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["国家/地区", "综合得分"],
        "series": [
          { "name": "新加坡", "values": [100.0], "highlight": false },
          { "name": "瑞士", "values": [99.1], "highlight": false },
          { "name": "丹麦", "values": [96.5], "highlight": false },
          { "name": "爱尔兰", "values": [95.8], "highlight": false },
          { "name": "中国香港", "values": [93.2], "highlight": false },
          { "name": "瑞典", "values": [92.6], "highlight": false },
          { "name": "阿联酋", "values": [91.5], "highlight": false },
          { "name": "中国台湾", "values": [90.5], "highlight": false },
          { "name": "荷兰", "values": [90.1], "highlight": false },
          { "name": "挪威", "values": [89.8], "highlight": false },
          { "name": "美国", "values": [88.2], "highlight": false },
          { "name": "芬兰", "values": [87.6], "highlight": false },
          { "name": "卡塔尔", "values": [87.2], "highlight": false },
          { "name": "德国", "values": [86.5], "highlight": false },
          { "name": "澳大利亚", "values": [85.9], "highlight": false },
          { "name": "加拿大", "values": [85.1], "highlight": false },
          { "name": "卢森堡", "values": [84.8], "highlight": false },
          { "name": "中国大陆", "values": [84.5], "highlight": true },
          { "name": "沙特阿拉伯", "values": [83.7], "highlight": false },
          { "name": "比利时", "values": [83.0], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "中国大陆", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "综合排名第18，经济表现第11", "target": "中国大陆" },
        { "text": "满分基准", "target": "新加坡" }
      ],
      "referenceLines": [],
      "theme": "default",
      "layout": {
        "titlePosition": "top",
        "chartArea": "center",
        "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
      }
    },
    {
      "chartId": "chart-2",
      "renderTarget": "viz-echarts",
      "chartType": "heatmap",
      "title": "美国竞争力失衡：经济强政府弱",
      "subtitle": "2024年IMD · 四维排名热力图（排名越小颜色越深=越强）",
      "canvas": { "width": 800, "height": 600 },
      "data": {
        "fields": ["国家", "经济表现", "政府效率", "商业效率", "基础设施"],
        "series": [
          { "name": "新加坡", "values": [2, 1, 1, 3], "highlight": false },
          { "name": "瑞士", "values": [8, 3, 2, 2], "highlight": false },
          { "name": "丹麦", "values": [6, 2, 4, 4], "highlight": false },
          { "name": "爱尔兰", "values": [1, 8, 3, 10], "highlight": false },
          { "name": "中国香港", "values": [15, 4, 5, 1], "highlight": false },
          { "name": "瑞典", "values": [12, 5, 7, 5], "highlight": false },
          { "name": "阿联酋", "values": [3, 6, 9, 8], "highlight": false },
          { "name": "中国台湾", "values": [9, 12, 6, 12], "highlight": false },
          { "name": "荷兰", "values": [10, 7, 10, 6], "highlight": false },
          { "name": "挪威", "values": [16, 9, 8, 7], "highlight": false },
          { "name": "美国", "values": [4, 23, 11, 15], "highlight": false },
          { "name": "芬兰", "values": [14, 10, 14, 9], "highlight": false },
          { "name": "卡塔尔", "values": [5, 13, 15, 14], "highlight": false },
          { "name": "德国", "values": [18, 17, 12, 11], "highlight": false },
          { "name": "澳大利亚", "values": [20, 11, 13, 13], "highlight": false },
          { "name": "加拿大", "values": [22, 15, 16, 16], "highlight": false },
          { "name": "卢森堡", "values": [7, 14, 20, 17], "highlight": false },
          { "name": "中国大陆", "values": [11, 20, 18, 20], "highlight": true },
          { "name": "沙特阿拉伯", "values": [13, 18, 22, 19], "highlight": false },
          { "name": "比利时", "values": [19, 21, 17, 18], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "中国大陆", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "政府效率第23严重拖累", "target": "美国-政府效率" },
        { "text": "经济表现全球第1", "target": "爱尔兰-经济表现" }
      ],
      "referenceLines": [],
      "theme": "default",
      "layout": {
        "titlePosition": "top",
        "chartArea": "center",
        "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
      }
    }
  ]
}
```
