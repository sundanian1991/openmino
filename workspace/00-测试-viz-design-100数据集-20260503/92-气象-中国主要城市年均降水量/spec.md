# Compiled SPEC — 可视化编译规格

> 数据集 92：中国主要城市年均降水量

---

## Page: 中国主要城市年降水量排名

- **场景论文**：用横条排名揭示中国城市降水量的南北悬殊差异
- **签名视觉元素**：深圳高亮 + 均值参考线 + 极值标注
- **签名视觉元素 source id**：D-013 (chart-dna-index.tsv)
- **为什么不能简化为默认模板**：需要极值对比标注 + 均值参考线，不是纯排名

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者不知道中国城市间降水量差距如此悬殊，最高是最低的6.7倍

**【想传达什么】**
- 核心信息（一句话）：深圳年降水量是乌鲁木齐的6.7倍，中国降水分布南北差异巨大

**【结论】**
- 读者应得出的判断：中国降水量分布受纬度和距海距离双重影响，南方沿海城市远高于北方内陆

**【思路】**
- 视觉叙事路径：第一眼深圳高亮极值 → 第二眼南北阶梯分布 + 均值线 → 最终理解气候带分异

### 视觉编码

- **Y 轴编码**：15个城市，按降水量降序排列
- **X 轴编码**：年降水量（mm），0-2000 线性标度
- **颜色编码**：深圳 Warm 高亮（#c26d3a），其余 Stone 300
- **大小编码**：条长编码降水量绝对值

### 数据组织

- **字段清单**：城市、年降水量（mm）、气候类型
- **排序规则**：按年降水量降序
- **聚合规则**：无，直接使用原始数据
- **数据示例**：深圳 1930mm / 广州 1736mm / 杭州 1438mm

### 标注策略

- **高亮点**（≤10%）：仅深圳（1/15 = 6.7%）
- **标注内容**："最高：深圳 1930mm"，右侧标注；"最低：乌鲁木齐 286mm"，底部标注
- **基准线/参考线**：15城市均值线（约 930mm）

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中 16/600 Warm-800 | 结论性标题 |
| 核心数据区 | 横向柱状图，深圳高亮 | 横条适配长标签 |
| 高亮元素 | 深圳条 + 极值标注 | 6.7% 高亮率 |
| 次要元素 | 其余14国 Stone 灰化 | 保持可读但不抢焦点 |

### 布局

- **画布**：800 × 550
- **标题区**：顶部居中 16/600
- **图表区**：居中，占画布 75%
- **标注区**：深圳右侧 + 均值参考线
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要
- **脚注**：数据来源：中国气象局国家气象信息中心 1991-2020年气候标准值
- **特殊说明**：无

---

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 城市排名对比 |
| 风格选择 | restrained-warm | style-schools.md | 科普场景，正式清晰 |
| 配色选择 | Warm + Stone | color-themes.md | 主色+辅助色 |
| 构图选择 | 横条排名 | composition-templates.md | 长标签适配 |
| 字体选择 | system-ui sans-serif | typography-moods.md | analytical-clean |
| DNA 参考 | D-013 | chart-dna-index.tsv | 排名高亮 + 极值标注 |

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
      "title": "深圳年降水量是乌鲁木齐的6.7倍，中国降水南北差异巨大",
      "subtitle": "1991-2020年气候标准值 · 中国15个主要城市",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["城市", "年降水量"],
        "series": [
          { "name": "深圳", "values": [1930], "highlight": true },
          { "name": "广州", "values": [1736], "highlight": false },
          { "name": "杭州", "values": [1438], "highlight": false },
          { "name": "武汉", "values": [1269], "highlight": false },
          { "name": "上海", "values": [1166], "highlight": false },
          { "name": "重庆", "values": [1100], "highlight": false },
          { "name": "南京", "values": [1090], "highlight": false },
          { "name": "昆明", "values": [1011], "highlight": false },
          { "name": "成都", "values": [947], "highlight": false },
          { "name": "北京", "values": [572], "highlight": false },
          { "name": "西安", "values": [553], "highlight": false },
          { "name": "天津", "values": [550], "highlight": false },
          { "name": "哈尔滨", "values": [524], "highlight": false },
          { "name": "拉萨", "values": [426], "highlight": false },
          { "name": "乌鲁木齐", "values": [286], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "深圳", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "最高：深圳", "target": "深圳" },
        { "text": "最低：乌鲁木齐", "target": "乌鲁木齐" }
      ],
      "referenceLines": [
        { "type": "horizontal", "value": 930, "label": "15城均值 ~930mm", "style": { "color": "#ada599", "dash": [6, 4] } }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 40, "left": 20 } }
    }
  ]
}
```
