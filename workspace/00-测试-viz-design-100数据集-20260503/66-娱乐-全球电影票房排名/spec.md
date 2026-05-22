# Compiled SPEC — 可视化编译规格

> 数据集 66：全球电影票房排名（影史 TOP 20）
> 渲染契约

---

## Page: 影史票房 TOP 20

- **场景论文**：用横向柱状图展示电影票房的头部集中度与迪士尼的 IP 统治力
- **签名视觉元素**：阿凡达 Warm 色高亮柱 + 右侧标注"29.24 亿美元，影史第一"
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要突出影史冠军的标杆地位，其余 19 部 Stone 灰化

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者关注单片票房排名，忽略头部集中度；看完应理解 TOP 20 的票房分布和冠军标杆

**【想传达什么】**
- 核心信息（一句话）：阿凡达以 29.24 亿美元领跑影史，TOP 4 全部突破 20 亿，IP 系列占据绝对主导

**【结论】**
- 读者应得出的判断：全球电影票房呈现 IP 驱动格局，迪士尼凭借漫威+阿凡达+动画占据 TOP 20 的半壁江山

**【思路】**
- 视觉叙事路径：第一眼看到 Warm 色高亮的阿凡达 → 第二眼发现 TOP 4 形成第一梯队 → 最终理解 IP 系列的统治力

### 视觉编码

- **X 轴编码**：全球票房（亿美元），从 0 到 30，线性刻度
- **Y 轴编码**：电影名称，按排名从上到下排列（TOP 1→TOP 20）
- **颜色编码**：阿凡达 = Warm 主色 `#c26d3a`；其余 19 部电影 = Stone 300 `#ada599`
- **大小编码**：柱子高度一致，宽度等比于票房

### 数据组织

- **字段清单**：电影名称、全球票房（亿美元）、上映年份、发行商
- **排序规则**：按票房降序排列（排名 1→20）
- **聚合规则**：无聚合，使用原始数据
- **数据示例**：Avatar 29.24 / Avengers Endgame 27.99 / Avatar 2 23.34

### 标注策略

- **高亮点**（≤10%）：仅 Avatar（1/20 = 5%）
- **标注内容**："29.24 亿美元，影史第一"（右侧标注）
- **基准线/参考线**：在 20 亿美元处添加虚线参考线，标记"20 亿俱乐部"

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部左侧，16px/600/Warm800 | 结论先行 |
| 核心数据区 | 横向柱状图，阿凡达 Warm 色 | 第一眼捕获 |
| 高亮元素 | Avatar 柱 Warm 色，右侧标注 | 引导关注 |
| 次要元素 | 其余 19 柱 Stone 300 灰色 | 不抢注意力 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部，距上 20px，左对齐
- **图表区**：标题下方，占画布 75%
- **标注区**：右侧，与 Avatar 柱对齐
- **留白**：四周 ≥20px
- **配色**：Warm 主题 + Stone 辅助

### 图例与辅助

- **图例**：不需要
- **脚注**：数据来源：全球票房统计（不考虑通胀调整）
- **特殊说明**：票房以亿美元计

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 排名对比场景 |
| 风格选择 | restrained-warm | style-schools.md | 商业分析场景 |
| 配色选择 | Warm | color-themes.md | 主 ramp |
| 构图选择 | left-aligned-bar | composition-templates.md | 横向柱状图 |
| 字体选择 | neutral-professional | typography-moods.md | 商业场景 |
| DNA 参考 | Custom | - | McKinsey 风格排名对比 |

## 渲染契约 JSON（机器可读）

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
    "spacing": { "cardPadding": 16, "titleToContent": 12, "cardGap": 12 },
    "cornerRadius": 10,
    "styleSchool": "restrained-warm"
  },
  "charts": [
    {
      "chartId": "chart-1",
      "renderTarget": "viz-echarts",
      "chartType": "bar_chart",
      "title": "阿凡达 29 亿美元领跑影史，TOP 4 全部突破 20 亿",
      "subtitle": "影史 TOP 20 · 全球票房排名（不考虑通胀）",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["电影", "全球票房（亿美元）", "年份", "发行商"],
        "series": [
          { "name": "Avatar（阿凡达）", "values": [29.24], "highlight": true },
          { "name": "Avengers: Endgame（复联4）", "values": [27.99], "highlight": false },
          { "name": "Avatar: The Way of Water（阿凡达2）", "values": [23.34], "highlight": false },
          { "name": "Ne Zha 2（哪吒2）", "values": [22.67], "highlight": false },
          { "name": "Titanic（泰坦尼克号）", "values": [22.64], "highlight": false },
          { "name": "Star Wars: The Force Awakens", "values": [20.71], "highlight": false },
          { "name": "Avengers: Infinity War（复联3）", "values": [20.52], "highlight": false },
          { "name": "Spider-Man: No Way Home", "values": [19.22], "highlight": false },
          { "name": "Inside Out 2（头脑特工队2）", "values": [16.99], "highlight": false },
          { "name": "Jurassic World（侏罗纪世界）", "values": [16.71], "highlight": false },
          { "name": "The Lion King（狮子王）", "values": [16.57], "highlight": false },
          { "name": "The Avengers（复仇者联盟）", "values": [15.20], "highlight": false },
          { "name": "Furious 7（速度与激情7）", "values": [15.15], "highlight": false },
          { "name": "Top Gun: Maverick（壮志凌云2）", "values": [14.96], "highlight": false },
          { "name": "Frozen II（冰雪奇缘2）", "values": [14.50], "highlight": false },
          { "name": "Aquaman（海王）", "values": [14.36], "highlight": false },
          { "name": "Barbie（芭比）", "values": [14.42], "highlight": false },
          { "name": "The Dark Knight（黑暗骑士）", "values": [13.63], "highlight": false },
          { "name": "Zootopia 2（疯狂动物城2）", "values": [13.50], "highlight": false },
          { "name": "Black Panther（黑豹）", "values": [13.49], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "Avatar（阿凡达）", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "29.24 亿美元，影史第一", "target": "Avatar（阿凡达）" }
      ],
      "referenceLines": [
        { "type": "vertical", "value": 20, "label": "20 亿俱乐部", "style": { "color": "#ada599", "dash": [6, 4] } }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 } }
    }
  ]
}
```
