# Compiled SPEC — 可视化编译规格

> 数据集 91：2023年全球保险密度排名

---

## Page: 全球保险密度 TOP15 排名

- **场景论文**：用横条排名揭示全球保险市场的极端不均衡
- **签名视觉元素**：美国条 Warm 高亮 + 全球均值/中国参考线
- **签名视觉元素 source id**：D-013 (chart-dna-index.tsv)
- **为什么不能简化为默认模板**：需要双参考线（全球均值+中国）+ 美国独立高亮标注

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者不知道各国保险密度差距有多大，中国在全球的位置

**【想传达什么】**
- 核心信息（一句话）：美国保险密度一骑绝尘，是第二名爱尔兰的1.1倍、中国的17倍

**【结论】**
- 读者应得出的判断：保险密度与经济发展水平高度相关，但结构差异反映各国保险文化深度不同

**【思路】**
- 视觉叙事路径：第一眼美国高亮条 → 第二眼排名递减+参考线 → 最终理解全球保险市场不均衡

### 视觉编码

- **Y 轴编码**：15个国家/地区，按排名从上到下排列
- **X 轴编码**：人均保费支出（美元），0-10000 线性标度
- **颜色编码**：美国 Warm 高亮（#c26d3a），其余 Stone 300（#857d74）
- **大小编码**：条长编码人均保费绝对值

### 数据组织

- **字段清单**：国家/地区、人均总保费（美元）、排名
- **排序规则**：按人均总保费降序
- **聚合规则**：无，直接使用原始排名数据
- **数据示例**：美国 $9,640 / 爱尔兰 $8,500 / 瑞士 $8,200

### 标注策略

- **高亮点**（≤10%）：仅美国（1/15 = 6.7%）
- **标注内容**："是中国的17倍"，右侧标注，写幅度不写绝对值
- **基准线/参考线**：全球均值 $880（虚线）、中国 $570（点线+标签）

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中 16/600 Warm-800 | 结论性标题，第一眼定位 |
| 核心数据区 | 横向柱状图，美国高亮 | 横条适配长标签，高亮引导视线 |
| 高亮元素 | 美国条 + 右侧标注 | 6.7% 高亮率，符合 ≤10% |
| 次要元素 | 其余14国 Stone 灰化 | 不抢焦点但保持可读 |

### 布局

- **画布**：800 × 550
- **标题区**：顶部居中 16/600
- **图表区**：居中，占画布 75%
- **标注区**：美国条右侧 + 底部参考线
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要（单色+高亮自解释）
- **脚注**：数据来源：Swiss Re Institute sigma 3/2024
- **特殊说明**：中国（$570）不在 TOP15 内，仅以参考线标注

---

## Page: 寿险 vs 非寿险结构差异（TOP5）

- **场景论文**：用堆叠条揭示"同为高保险密度，结构完全不同"
- **签名视觉元素**：两段双色，标注占比
- **签名视觉元素 source id**：D-014 (chart-dna-index.tsv)

### 叙事意图

**【可视化目的】**
- 认知缺口：读者以为保险密度高的国家结构相似，实际差异巨大

**【想传达什么】**
- 核心信息（一句话）：同为保险强国，美国靠商业险、爱尔兰香港靠寿险，发展路径迥异

**【结论】**
- 保险密度不等于保险结构，各国保险模式反映其经济社会特征

**【思路】**
- 第一眼：TOP5 堆叠条 → 第二段比例差异明显 → 理解各国保险发展模式不同

### 视觉编码

- **Y 轴编码**：TOP5 国家（美国、爱尔兰、瑞士、中国香港、丹麦）
- **X 轴编码**：人均保费（美元），堆叠展示
- **颜色编码**：非寿险 Warm（#c26d3a）/ 寿险 Warm-Light（#e8a87c）
- **大小编码**：各段长度编码金额

### 数据组织

- **字段清单**：国家、非寿险（美元）、寿险（美元）
- **排序规则**：按总保费降序
- **聚合规则**：无

### 标注策略

- **高亮点**（≤10%）：美国非寿险段（1/10 = 10%）
- **标注内容**："非寿险占78%"，标注美国非寿险段
- **基准线/参考线**：无

### 布局

- **画布**：700 × 450
- **标题区**：顶部居中
- **图表区**：居中
- **标注区**：美国非寿险段上方
- **留白**：四周 ≥20px

### 图例与辅助

- **图例**：需要，右上角 — 非寿险/寿险
- **脚注**：数据来源：Swiss Re Institute sigma 3/2024

---

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 + 14-磁带图 | SKILL.md §五 | 排名对比 + 堆叠构成 |
| 风格选择 | restrained-warm | style-schools.md | 商业分析，正式严谨 |
| 配色选择 | Warm + Stone | color-themes.md | 主色+辅助色双 ramp |
| 构图选择 | 横条排名 + 垂直堆叠 | composition-templates.md | 长标签适配 |
| 字体选择 | system-ui sans-serif | typography-moods.md | analytical-serious |
| DNA 参考 | D-013, D-014 | chart-dna-index.tsv | 排名高亮 + 堆叠分段 |

## 渲染委托

**渲染技能**：viz-echarts

---

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "globalStyle": {
    "colorRamps": ["Warm", "Stone"],
    "palette": {
      "primary": "#c26d3a",
      "secondary": "#857d74",
      "accent": "#e8a87c",
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
      "title": "美国保险密度是中国的17倍，全球市场极度不均衡",
      "subtitle": "2023年 · 全球保险密度 TOP15（人均保费支出，美元）",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["国家/地区", "人均总保费"],
        "series": [
          { "name": "美国", "values": [9640], "highlight": true },
          { "name": "爱尔兰", "values": [8500], "highlight": false },
          { "name": "瑞士", "values": [8200], "highlight": false },
          { "name": "中国香港", "values": [7800], "highlight": false },
          { "name": "丹麦", "values": [6300], "highlight": false },
          { "name": "新加坡", "values": [5900], "highlight": false },
          { "name": "荷兰", "values": [5500], "highlight": false },
          { "name": "英国", "values": [5300], "highlight": false },
          { "name": "芬兰", "values": [5100], "highlight": false },
          { "name": "卢森堡", "values": [4900], "highlight": false },
          { "name": "瑞典", "values": [4700], "highlight": false },
          { "name": "法国", "values": [4300], "highlight": false },
          { "name": "日本", "values": [4100], "highlight": false },
          { "name": "比利时", "values": [4000], "highlight": false },
          { "name": "德国", "values": [3800], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "美国", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "是中国的17倍", "target": "美国" }
      ],
      "referenceLines": [
        { "type": "horizontal", "value": 880, "label": "全球均值 $880", "style": { "color": "#ada599", "dash": [6, 4] } },
        { "type": "horizontal", "value": 570, "label": "中国 $570", "style": { "color": "#857d74", "dash": [2, 4] } }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 40, "left": 20 } }
    },
    {
      "chartId": "chart-2",
      "renderTarget": "viz-echarts",
      "chartType": "stacked_bar",
      "title": "同为保险强国，美国靠商业险，爱尔兰香港靠寿险",
      "subtitle": "2023年 · TOP5 国家寿险/非寿险结构对比",
      "canvas": { "width": 700, "height": 450 },
      "data": {
        "fields": ["国家", "非寿险", "寿险"],
        "series": [
          { "name": "非寿险", "values": [7504, 3300, 4100, 2200, 2800], "highlight": false },
          { "name": "寿险", "values": [2136, 5200, 4100, 5600, 3500], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "美国-非寿险", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "非寿险占78%", "target": "美国-非寿险" }
      ],
      "referenceLines": [],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 } }
    }
  ]
}
```
