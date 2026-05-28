# Compiled SPEC — 43-农业-全球粮食产量排名

> Phase 3 产出：渲染契约

---

## Page: 全球 TOP20 粮食产量排名

- **场景论文**：用横向柱状图揭示"一超多强"的全球粮食格局
- **签名视觉元素**：中国柱子 Warm 高亮，TOP5 占比标注，第二名差距标注
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要标注差距百分比，非单纯排名

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者不知道中国与第二名的产量差距有多大，也不知道 TOP5 的集中度

**【想传达什么】**
- 核心信息（一句话）：中国以 6.9 亿吨产量断层领先，全球粮食生产呈"一超多强"格局

**【结论】**
- 读者应得出的判断：中国是全球粮食安全的核心锚，TOP5 国家主导全球供应

**【思路】**
- 视觉叙事路径：第一眼中国高亮柱子 → 第二眼前 5 名密集区 → 最终理解"一超"与"多强"的分界

### 视觉编码

- **X 轴编码**：产量（百万吨），数值越大柱子越长
- **Y 轴编码**：国家（按产量降序排列，1-20 从上到下）
- **颜色编码**：中国用 Warm 主色（`#c26d3a`），其余 Stone 灰度（`#c4bdb4` 30%）
- **大小编码**：无——柱子长度编码产量值

### 数据组织

- **字段清单**：排名, 国家, 粮食总产量（百万吨）
- **排序规则**：按产量降序（已有排名顺序）
- **聚合规则**：无聚合，直接使用原始排名数据
- **数据示例**：中国 690, 美国 560, 印度 360

### 标注策略

- **高亮点**（≤10%）：中国（1/20 = 5%，符合 ≤10% 规则）
- **标注内容**：
  - 中国柱子末端："6.9亿吨，全球第一"
  - 美国柱子旁标注参考线："— 第二名 5.6亿吨（−23%）"
- **基准线/参考线**：TOP5 平均线（339 百万吨），虚线标注

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居左，16px/600 | 符合 13-VISUALIZATION.md |
| 核心数据区 | 横向柱状图，降序排列 | 排名天然降序 |
| 高亮元素 | 中国柱子 Warm 橙色 | 唯一高亮，≤10% |
| 次要元素 | 其余 19 国 Stone 灰度 | 不抢焦点 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部，距上边 20px
- **图表区**：标题下方，占 75% 高度
- **标注区**：柱子末端右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要（单色高亮，一目了然）
- **脚注**：数据来源：2023/24 年度全球粮食产量估算
- **特殊说明**：粮食包含谷物+豆类+薯类

## Page: 四大粮食品种产量构成

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道"全球粮食"中各品种的比重

**【想传达什么】**
- 核心信息（一句话）：玉米占全球四大粮食品种产量的 50%，是绝对主力

**【结论】**
- 读者应得出的判断：玉米供应安全是全球粮食安全的核心

**【思路】**
- 视觉叙事路径：第一眼最大区块（玉米） → 第二眼小麦（第二大） → 理解品种层级

### 视觉编码

- **面积编码**：品种产量，面积越大产量越高
- **颜色编码**：玉米 Warm 主色，其余 Stone 灰度渐变

### 数据组织

- **字段清单**：品种, 全球产量（百万吨）
- **排序规则**：按产量降序
- **数据**：玉米 1230, 小麦 790, 稻谷 520, 大豆 400

### 标注策略

- **高亮点**（≤10%）：玉米（1/4 = 25% → 改用 Warm 主色 + 其余灰度，不算"高亮"）
- **标注内容**：玉米区块标注"占四大品种 50%"

### 布局

- **画布**：600 x 400
- **配色**：Warm + Stone

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 排名对比最优 |
| 风格选择 | restrained-warm | style-schools.md | 数据驱动克制风格 |
| 配色选择 | Warm + Stone | color-themes.md | 主色高亮+灰度克制 |
| 构图选择 | 横向柱状图 | composition-templates.md | 排名场景标准构图 |
| 品种图模式 | 16-矩形树图 | SKILL.md §五 | 嵌套占比表达 |

## 渲染委托

**渲染技能**：viz-echarts

```
委托指令：
"用 viz-echarts 渲染以下 SPEC：
- 模式：13-柱状图 + 16-矩形树图
- 标题：结论性标题（见 JSON）
- 数据字段：国家/产量 或 品种/产量
- 高亮：中国柱子 Warm 橙色，其余灰度
- 标注：中国标注'全球第一'，TOP5 占比标注
- 画布：800x550
请遵循 13-VISUALIZATION.md 配色规范。"
```

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
      "title": "中国粮食产量断层领先，TOP5 占全球 TOP20 的 53%",
      "subtitle": "2023/24 年度 · 全球 20 大产粮国",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["国家", "产量(百万吨)"],
        "series": [
          { "name": "中国", "values": [690], "highlight": true },
          { "name": "美国", "values": [560], "highlight": false },
          { "name": "印度", "values": [360], "highlight": false },
          { "name": "巴西", "values": [300], "highlight": false },
          { "name": "俄罗斯", "values": [145], "highlight": false },
          { "name": "阿根廷", "values": [140], "highlight": false },
          { "name": "印度尼西亚", "values": [120], "highlight": false },
          { "name": "法国", "values": [70], "highlight": false },
          { "name": "乌克兰", "values": [65], "highlight": false },
          { "name": "加拿大", "values": [63], "highlight": false },
          { "name": "孟加拉国", "values": [58], "highlight": false },
          { "name": "澳大利亚", "values": [55], "highlight": false },
          { "name": "越南", "values": [50], "highlight": false },
          { "name": "泰国", "values": [42], "highlight": false },
          { "name": "巴基斯坦", "values": [40], "highlight": false },
          { "name": "德国", "values": [40], "highlight": false },
          { "name": "墨西哥", "values": [38], "highlight": false },
          { "name": "土耳其", "values": [37], "highlight": false },
          { "name": "缅甸", "values": [33], "highlight": false },
          { "name": "日本", "values": [28], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "中国", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "6.9亿吨，全球第一", "target": "中国" },
        { "text": "TOP5 占 TOP20 的 53%", "target": "俄罗斯" }
      ],
      "referenceLines": [
        { "type": "line", "value": 339, "label": "TOP5 均值", "style": { "color": "#ada599", "dash": [6, 4] } }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 40, "bottom": 20, "left": 80 } }
    },
    {
      "chartId": "chart-2",
      "renderTarget": "viz-echarts",
      "chartType": "treemap",
      "title": "玉米占四大品种产量半壁江山",
      "subtitle": "全球四大粮食品种产量构成",
      "canvas": { "width": 600, "height": 400 },
      "data": {
        "fields": ["品种", "产量(百万吨)"],
        "series": [
          { "name": "玉米", "values": [1230], "highlight": true },
          { "name": "小麦", "values": [790], "highlight": false },
          { "name": "稻谷", "values": [520], "highlight": false },
          { "name": "大豆", "values": [400], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "玉米", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.25
      },
      "annotations": [
        { "text": "占四大品种 50%", "target": "玉米" }
      ],
      "referenceLines": [],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 } }
    }
  ]
}
```
