# spec.md — 中国城镇化率可视化编译规格

## Page: 十年城镇化进程

- **场景论文**：一条线，十年向上，没有回头
- **签名视觉元素**：经济学人红色折线 + 终点大圆点标注
- **签名视觉元素 source id**：DNA #043 + #102
- **为什么不能简化为默认模板**：需要经济学人风格（Serif 标题+暖白底+红色主线+极简无网格），非 ECharts 默认主题

### 版式布局

- **版式编号**：#01 单中心
- **画布尺寸**：800 × 500
- **区域划分**：
  - 标题区：顶部居中，Georgia 20px 600
  - 主内容区：中央，图表占 70%
  - 脚注区：底部左对齐，10px 400
- **间距规则**：标题-内容 20px、内容-脚注 16px、四周留白 40px

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道中国城镇化近十年的具体趋势和速度

**【想传达什么】**
- 核心信息：十年间城镇化率从 57% 稳步升至 66%，没有一年倒退

**【结论】**
- 读者应得出的判断：中国城镇化是一个持续、稳定、不可逆的进程

**【思路】**
- 视觉叙事路径：红色折线向上 → 起点 57% → 终点 66% → 十年无回头

### WIIFT 提要

- **WIIFT 提要**：中国城镇化十年新增 8600 万城镇人口，2024 年城镇化率已达 65.89%
- **眨眼检验**：一眼看到红色上升线 + 终点 65.89% → 通过

### 上下文四问

| 维度 | 回答 |
|------|------|
| **情境** | 经济/人口数据展示 |
| **受众** | 对宏观经济有兴趣的普通读者 |
| **沟通者** | 数据可视化作品 |
| **目标** | 让读者理解中国城镇化的持续趋势 |

### TOP-T 框架

- **Topic**：中国城镇化率
- **Guide**：先看红色折线整体走向 → 再看起点 2015 年 57.33% → 再看终点 2024 年 65.89% → 注意中间无下降
- **Takeaway**：十年城镇化，稳步向前从未停歇

### 视觉编码

- **X 轴编码**：年份（2015-2024），等间距
- **Y 轴编码**：城镇化率百分比（55%-70%）
- **颜色编码**：红色 #8B1A1A 编码"城镇化率"主线；终点用同色饱和色；起点用灰色弱化
- **大小编码**：终点 symbolSize 放大至 14，起点 8，其余 6

### 数据组织

- **字段清单**：year, urban_population_pct
- **排序规则**：按 year 升序
- **聚合规则**：无，原始数据
- **数据示例**：2015→57.33, 2020→63.52, 2024→65.89

### 标注策略

- **高亮点**（≤10%）：终点 2024 年数据点
- **标注内容**：终点标注 "65.89%（2024）"，起点标注 "57.33%（2015）"
- **基准线/参考线**：无

### 渲染约束

```
annotations:
  - type: label
    target: { series: "城镇化率", dataIndex: 9 }
    text: "65.89%"
    position: top
    offset: { x: 0, y: -8 }
    style:
      fontSize: 14
      fontWeight: bold
      fill: "#8B1A1A"
  - type: label
    target: { series: "城镇化率", dataIndex: 0 }
    text: "57.33%"
    position: left
    offset: { x: -8, y: 0 }
    style:
      fontSize: 11
      fontWeight: normal
      fill: "#8B8680"
  - type: markPoint
    target: { series: "城镇化率", dataIndex: 9 }
    text: "2024"
    style:
      symbolSize: 14
      fill: "#8B1A1A"
```

```
visualWeight:
  hero: { target: "2024 数据点", style: { color: "#8B1A1A", lineWidth: 3, symbolSize: 14 } }
  medium: { target: "折线", style: { color: "#8B1A1A", lineWidth: 3 } }
  light: { target: "2015 数据点", style: { color: "#8B8680", lineWidth: 1.5 } }
```

```
colorMap:
  "折线": "#8B1A1A"
  "终点": "#8B1A1A"
  "起点": "#8B8680"
  "轴线": "#ADA599"
  "文字": "#1A1A1A"
  default: "#8B8680"
```

```
layout:
  canvas: { width: 800, height: 500 }
  grid: { top: 60, right: 40, bottom: 50, left: 50 }
  legend: { show: false, position: bottom }
  tooltip: { enabled: true }
```

### 视觉权重

- **主角元素（hero）**：2024 年数据点 → symbolSize=14 + 加粗标注 "65.89%"
- **上下文元素（medium）**：折线 → #8B1A1A 线宽 3px
- **背景元素（light）**：坐标轴 → 浅灰细线 + 2015 起点灰色小标注

### 非数据墨水检验

- [x] 无网格线（Economist 风格极简）
- [x] 无装饰性边框、渐变、阴影、emoji
- [x] 无重复标注
- [x] 无图例（单系列自明）

### 布局

- **画布**：800 × 500
- **标题区**：顶部居中，Georgia 20px 600，#1A1A1A
- **图表区**：中央，grid top:60 right:40 bottom:50 left:50
- **标注区**：终点标签在上方，起点标签在左侧
- **留白**：四周 40px
- **配色**：经济学人红（Theme #05）

### 图例与辅助

- **图例**：不需要（单系列）
- **脚注**：数据来源：国家统计局
- **特殊说明**：X 轴显示 2015/2017/2019/2021/2023 关键年份即可，避免拥挤

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | SKILL.md §五 | viz-design SKILL.md | 折线图，趋势 |
| 风格选择 | Theme #05 | color-themes.md | 经济学人红 |
| 配色选择 | #05 | color-themes.md | #8B1A1A 主红 |
| 构图选择 | #01 | composition-templates.md | 单中心 |
| 字体选择 | Georgia/Serif | typography-moods.md | 经济学人风格 |
| DNA 参考 | #043, #102 | chart-dna-index.tsv | 趋势+时间序列 |
