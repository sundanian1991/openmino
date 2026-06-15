# spec.md — 数据集 99：2024年全球创新指数排名

## Page: 瑞士领跑全球创新12年

- **场景论文**：排名开场图，结论性标题+C05对比表骨架
- **签名视觉元素**：横向条形图+区域色码+中国高亮
- **签名视觉元素 source id**：模式13（柱状图）
- **为什么不能简化为默认模板**：需要区域分组色彩和高亮策略

### 叙事意图

**【可视化目的】**：建立全球创新格局全景认知
**【想传达什么】**：瑞士绝对领先，欧洲主导前10，中国是中等收入第一
**【结论】**：全球创新版图呈现明显的区域聚集效应
**【思路】**：标题 → 瑞士长条 → 中国高亮条 → 区域色带

### 视觉编码
- **X轴编码**：GII得分（0-70）
- **Y轴编码**：国家（按排名降序排列）
- **颜色编码**：区域分组（西欧=主色，北欧=辅助色，东亚=强调色，其他=Stone 400）
- **高亮**：中国用 accent 色 #c26d3a

### 数据组织
- **字段**：国家、GII得分、区域
- **排序**：按得分降序
- **高亮点**：中国（第11名，中等收入第一）

### 标注策略
- 中国条右侧标注："中等收入经济体第一"
- 瑞士条右侧标注："连续12年第一"

### 布局
- **画布**：800 x 550
- **配色**：restrained-warm

---

## Page: 中国创新产出效率高于投入

- **场景论文**：并列比较，差异揭示效率信号
- **签名视觉元素**：双条对比+差值标注
- **签名视觉元素 source id**：模式26（并列比较）

### 叙事意图

**【可视化目的】**：揭示创新投入与产出的效率差异
**【想传达什么】**：中国投入少产出多，转化效率高
**【结论】**：排名不等于效率，投入产出差距才是关键信号
**【思路】**：标题 → 中国差值 → 极值案例（芬兰-8）

### 视觉编码
- **X轴编码**：排名（1-20，越左越好）
- **Y轴编码**：国家（选差值最大的5国+中国）
- **颜色编码**：产出排名优于投入=绿色 accent，反之=红色系
- **大小编码**：差值用条形长度

### 数据组织
- **字段**：国家、投入排名、产出排名、差值
- **排序**：按差值降序
- **数据示例**：中国(14,11,+3)、芬兰(2,10,-8)、瑞典(3,2,+1)

### 标注策略
- 中国标注："投入14 → 产出11，高效转化"
- 芬兰标注："投入第2，产出仅第10"

### 布局
- **画布**：800 x 550
- **配色**：restrained-warm

---

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 模式13+26 | SKILL.md §五 | 柱状图+并列比较 |
| 风格选择 | restrained-warm | style-schools.md | 克制暖色分析风 |
| 配色选择 | Warm+Stone | color-themes.md | 暖色主色+灰阶 |
| 构图选择 | 单列排序 | composition-templates.md | 横向条形排列 |

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
      "title": "瑞士连续12年领跑全球创新",
      "subtitle": "2024年全球创新指数前20名",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["国家", "GII得分"],
        "series": [
          { "name": "瑞士", "values": [67.6], "highlight": false },
          { "name": "瑞典", "values": [64.4], "highlight": false },
          { "name": "美国", "values": [63.5], "highlight": false },
          { "name": "新加坡", "values": [62.5], "highlight": false },
          { "name": "英国", "values": [61.5], "highlight": false },
          { "name": "韩国", "values": [61.2], "highlight": false },
          { "name": "芬兰", "values": [60.0], "highlight": false },
          { "name": "荷兰", "values": [59.6], "highlight": false },
          { "name": "德国", "values": [58.2], "highlight": false },
          { "name": "丹麦", "values": [57.8], "highlight": false },
          { "name": "中国", "values": [56.3], "highlight": true },
          { "name": "以色列", "values": [55.6], "highlight": false },
          { "name": "加拿大", "values": [54.9], "highlight": false },
          { "name": "法国", "values": [54.1], "highlight": false },
          { "name": "日本", "values": [53.3], "highlight": false },
          { "name": "澳大利亚", "values": [52.0], "highlight": false },
          { "name": "爱沙尼亚", "values": [51.6], "highlight": false },
          { "name": "奥地利", "values": [51.2], "highlight": false },
          { "name": "爱尔兰", "values": [50.8], "highlight": false },
          { "name": "卢森堡", "values": [50.1], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "中国", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "中等收入经济体第一", "target": "中国" },
        { "text": "连续12年第一", "target": "瑞士" }
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
      "chartType": "grouped_bar",
      "title": "中国创新产出效率高于投入",
      "subtitle": "2024年GII · 投入排名 vs 产出排名（差值=产出-投入，正=高效）",
      "canvas": { "width": 800, "height": 450 },
      "data": {
        "fields": ["国家", "创新投入排名", "创新产出排名"],
        "series": [
          { "name": "中国", "values": [14, 11], "highlight": true },
          { "name": "瑞典", "values": [3, 2], "highlight": false },
          { "name": "英国", "values": [6, 4], "highlight": false },
          { "name": "丹麦", "values": [10, 7], "highlight": false },
          { "name": "芬兰", "values": [2, 10], "highlight": false },
          { "name": "新加坡", "values": [4, 6], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "中国", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "投入14→产出11，高效转化", "target": "中国" },
        { "text": "投入第2，产出仅第10", "target": "芬兰" }
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
