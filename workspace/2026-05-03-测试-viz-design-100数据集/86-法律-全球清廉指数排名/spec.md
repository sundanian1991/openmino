# Compiled SPEC — 可视化编译规格

> 数据集 86：2024 年全球清廉指数排名（CPI）前20名 | 渲染契约

---

## Page: 全球清廉指数 TOP 20

- **场景论文**：用横向柱状图揭示清廉治理的区域集中性——北欧+西欧几乎垄断前20
- **签名视觉元素**：丹麦柱子 Warm 主色高亮 + "北欧占 TOP5 的 4 席"标注
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要突出北欧集团优势和中国的对照位置

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者不知道清廉程度与区域高度相关，北欧+西欧主导

**【想传达什么】**
- 核心信息（一句话）：丹麦以 90 分位居全球最清廉，北欧国家包揽 TOP5 中的 4 席

**【结论】**
- 读者应得出的判断：清廉不是个别国家的偶然，而是治理体系的系统性差异，北欧模式值得研究

**【思路】**
- 视觉叙事路径：第一眼看到丹麦（最长柱子，彩色）→ 第二眼看到北欧国家密集区 → 最终理解清廉与区域治理体系强相关

### 视觉编码

- **X 轴编码**：CPI 得分（0-100），线性刻度 0-100
- **Y 轴编码**：国家名称，按排名从高到低排列
- **颜色编码**：丹麦用 Warm 主色（#c26d3a），北欧国家用 Warm 浅色（#e8a87c），其余 Stone 灰化（#857d74）
- **大小编码**：柱子宽度统一，长度映射 CPI 得分

### 数据组织

- **字段清单**：排名、国家、CPI得分（0-100）、区域
- **排序规则**：按 CPI 得分降序排列
- **聚合规则**：无聚合，原始数据直出
- **数据示例**：丹麦 90 / 芬兰 87 / 新西兰 85

### 标注策略

- **高亮点**（≤10%）：丹麦（TOP 1）、中国（关联性，虽不在 TOP 20 但脚注标注）
- **标注内容**：丹麦右侧标注"全球最清廉，90 分"；图表右侧标注"北欧占 TOP5 的 4 席"
- **基准线/参考线**：在全球平均分 43 分处加虚线参考线，在 TOP 20 最低分 70 处加虚线

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，16px/600，标题色 #6b3410 | 第一眼锚定主题 |
| 核心数据区 | 丹麦柱子最长最醒目 | 视觉权重最高 |
| 高亮元素 | 丹麦 Warm 主色，北欧 Warm 浅色 | 区分主次高亮 |
| 次要元素 | 其余柱子 Stone 灰化 | 不抢注意力 |

### 布局

- **画布**：800 × 600
- **标题区**：顶部居中 + 16px/600
- **图表区**：中上部，占比 75%
- **标注区**：高亮柱子右侧 + 图表右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要（排序柱状图不需要图例）
- **脚注**：数据来源：透明国际 CPI 2024 | 中国排名第76位，得分42 | 全球平均分约43分
- **特殊说明**：仅展示 TOP 20

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 单维度排名对比 |
| 风格选择 | restrained-warm | style-schools.md | 专业克制 |
| 配色选择 | Warm + Stone | color-themes.md | 高亮+灰化 |
| 构图选择 | left-heavy | composition-templates.md | 长名称左对齐 |
| 字体选择 | system-ui | typography-moods.md | 中性专业 |
| DNA 参考 | Custom | chart-dna-db | 高亮 TOP1 + 北欧标注 |

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "丹麦领跑全球清廉指数，北欧包揽 TOP5 的 4 席",
  "subtitle": "2024 · 透明国际清廉指数（CPI）TOP 20",
  "canvas": { "width": 800, "height": 600 },
  "data": {
    "fields": ["国家", "CPI得分"],
    "series": [
      { "name": "丹麦", "values": [90], "highlight": true },
      { "name": "芬兰", "values": [87], "highlight": true },
      { "name": "新西兰", "values": [85], "highlight": false },
      { "name": "挪威", "values": [84], "highlight": true },
      { "name": "新加坡", "values": [84], "highlight": false },
      { "name": "瑞典", "values": [83], "highlight": true },
      { "name": "瑞士", "values": [82], "highlight": false },
      { "name": "荷兰", "values": [80], "highlight": false },
      { "name": "卢森堡", "values": [78], "highlight": false },
      { "name": "德国", "values": [77], "highlight": false },
      { "name": "澳大利亚", "values": [75], "highlight": false },
      { "name": "冰岛", "values": [75], "highlight": true },
      { "name": "爱尔兰", "values": [75], "highlight": false },
      { "name": "加拿大", "values": [74], "highlight": false },
      { "name": "中国香港", "values": [74], "highlight": false },
      { "name": "奥地利", "values": [72], "highlight": false },
      { "name": "比利时", "values": [72], "highlight": false },
      { "name": "爱沙尼亚", "values": [71], "highlight": false },
      { "name": "日本", "values": [71], "highlight": false },
      { "name": "法国", "values": [70], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "丹麦", "color": "#c26d3a" },
      { "series": "芬兰", "color": "#e8a87c" },
      { "series": "挪威", "color": "#e8a87c" },
      { "series": "瑞典", "color": "#e8a87c" },
      { "series": "冰岛", "color": "#e8a87c" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.3
  },
  "annotations": [
    { "text": "全球最清廉，90 分", "target": "丹麦" },
    { "text": "北欧占 TOP5 的 4 席", "target": "图表右侧" }
  ],
  "referenceLines": [
    { "type": "vertical", "value": 70, "label": "TOP20 门槛", "style": { "color": "#ada599", "dash": [6, 4] } },
    { "type": "vertical", "value": 43, "label": "全球平均", "style": { "color": "#ada599", "dash": [3, 3] } }
  ],
  "theme": "default",
  "layout": {
    "titlePosition": "top",
    "chartArea": "center",
    "padding": { "top": 20, "right": 30, "bottom": 20, "left": 20 }
  }
}
```
