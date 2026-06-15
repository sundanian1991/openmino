# spec.md — 全球音乐流媒体用户数

## 可视化目的

**认知缺口**：读者不知道全球音乐流媒体市场的集中度有多高
**想传达什么**：Spotify以绝对优势领跑，用户数是第二名Apple Music的近两倍，市场"一超多强"格局稳固
**结论**：Spotify一家独大，后几名平台用户规模差距不大，市场集中度极高
**思路**：横向条形图中Spotify的条形长度"突兀"本身就能传达差距感，暖色高亮进一步强化

## 视觉执行

### 模式选择
- **模式**：13-柱状图（横向条形图）
- **理由**：平台对比的标准解法，长标签友好，长度差异=竞争格局直觉

### 标题
- **主标题**：Spotify用户数是第二名近两倍，一超格局稳固
- **副标题**：全球主要音乐流媒体平台用户规模对比

### 视觉编码
- **Y轴**：平台名称（降序排列）
- **X轴**：用户数（亿）
- **颜色**：Spotify使用 Warm800 高亮，其余灰度
- **长度**：条形长度映射用户数

### 数据组织
- **字段**：rank（排名）、name（平台名）、users（用户数，亿）
- **排序**：按用户数降序
- **聚合**：无

### 标注策略
- **高亮**：仅Spotify（1/8 < 10%）
- **标注内容**：Spotify标注"行业领导者"，第二名标注"差距约2x"

### 图例/辅助
- **图例**：颜色说明
- **脚注**：单位说明 + 数据来源

### 布局
- **画布**：800 x 450
- **标题位置**：顶部居中
- **内边距**：上60，右40，下40，左160
- **配色**：Warm单色系

## Source ID

- 模式：viz-design SKILL.md §五 "谁多谁少" → 柱状图(13)
- 配色：13-VISUALIZATION.md Warm色系
- 高亮规则：13-VISUALIZATION.md 高亮≤10%

## 渲染契约（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "Spotify用户数是第二名近两倍，一超格局稳固",
  "subtitle": "全球主要音乐流媒体平台用户规模对比",
  "canvas": {
    "width": 800,
    "height": 450
  },
  "data": {
    "fields": ["rank", "name", "users"],
    "series": [
      {
        "name": "用户数（亿）",
        "values": [6.3, 3.5, 2.8, 1.8, 1.5, 1.2, 0.8, 0.6],
        "highlight": true
      }
    ],
    "categories": ["Spotify", "Apple Music", "Amazon Music", "Tencent Music", "YouTube Music", "Deezer", "Tidal", "Pandora"]
  },
  "visualEncoding": {
    "highlight": [0],
    "grayscale": true,
    "maxHighlightRatio": 0.1,
    "orientation": "horizontal"
  },
  "annotations": [
    {"text": "行业领导者", "target": 0},
    {"text": "差距约2x", "target": "0-1"}
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": {
      "top": 60,
      "right": 40,
      "bottom": 40,
      "left": 160
    }
  }
}
```
