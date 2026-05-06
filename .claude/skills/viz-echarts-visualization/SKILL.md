---
name: viz:echarts-visualization
description: 使用 ECharts 生成独立交互式 HTML 图表。支持桑基图、K线图、地图、热力图、矩形树图、关系图、折线图、柱状图、饼图、漏斗图、仪表盘、雷达图、散点图、双轴图、直方图、面积图、日历图、主题河流、流向图、树图、旭日图、箱线图、极坐标图、象形柱图、平行坐标等。输出 HTML/SVG/PNG 文件。当用户提到图表、数据可视化、仪表盘、趋势图、对比图、桑基图、K线图、地图或任何可视化需求时自动使用。
dependency:
  nodejs: ">=18.0.0"
---

# ECharts 可视化技能

生成自包含的交互式 HTML 文件，内置 ECharts。用户用浏览器打开即可查看和交互。

## 配色体系（核心）

> viz-echarts 不定义自有配色。默认参考 13-VISUALIZATION.md 的色阶体系，也可根据场景自选配色。

| Ramp | 500（主色） | 300（灰化） | 800（深色文字） |
|------|------------|------------|----------------|
| **Warm** | `#c26d3a` | `#d4a574` | `#6b3410` |
| **Stone** | `#857d74` | `#ada599` | `#2e2c2a` |
| **Teal** | `#2e8b6e` | `#5dbf9e` | `#0f5040` |
| **Coral** | `#c25030` | `#e08060` | `#6b2010` |
| **Sky** | `#3a7ab8` | `#70a8d8` | `#0e4070` |

**用法**：
- 默认 Warm + Stone（主数据 Warm 500，次要/基准 Stone 300）
- 语义需要时：Teal = 正面，Coral = 负面
- 数据系列 ≤ 2 时用 Warm + Stone；3 系列时 + Teal 或 Coral
- 灰化：非高亮元素统一用 Stone 300 `#ada599`
- 禁止超过 2 ramp（除非有语义理由）

**ECharts 主题配置**：
```js
{
  color: ['#c26d3a', '#857d74', '#2e8b6e'],
  backgroundColor: 'transparent',
  animation: false,
  xAxis: {
    axisLine: { lineStyle: { color: '#ada599' } },
    splitLine: { lineStyle: { color: '#f2f0eb', type: 'dashed' } },
    axisLabel: { color: '#857d74', fontSize: 11 }
  },
  yAxis: {
    axisLine: { show: false },
    splitLine: { lineStyle: { color: '#f2f0eb', type: 'dashed' } },
    axisLabel: { color: '#857d74', fontSize: 11 }
  }
}
```

**容器样式**：
```
card: border-radius 10px, 无 box-shadow, 白卡背景
body: 背景色 transparent 或 Warm 50 `#faf0e6`
标题: 16px, 600, Warm 800 `#6b3410`
脚注: 10px, 400, Stone 400 `#ada599`
```

**铁律**：
- 网格线必须 `type: 'dashed'`
- 灰化色必须 `#ada599` 或更浅，禁止用 `#b0b0b0`/`#999` 等随机灰
- 轴标签必须用原始数据值，不用索引编号
- 柱状图 yAxis min 必须为 0
- 禁止渐变、阴影、发光、animation

---

## 工作流

### 步骤 0：数据分析前摇（新增）

> 不要看完数据直接选图。先分析，再推荐，等人确认，最后出图。

**0a. 数据结构识别**

| 数据特征 | 判断依据 | 示例 |
|---------|---------|------|
| 时序型 | 含日期/时间字段，有序 | `[{月, 营收}]` |
| 分类型 | 有限个互斥类别 | `[{区域, 销售额}]` |
| 地理型 | 省/市/区域名 | `[{省份, 产值}]` |
| 层级型 | 父子关系 | `[{分类, 子类, 金额}]` |
| 关系型 | 节点+边 | `[{from, to, weight}]` |
| 多维型 | ≥3 个数值维度 | `[{员工, 效率, 质量, 满意度}]` |

**0b. 分析目标匹配**

判断数据最适合表达什么：

| 目标 | 触发条件 | 推荐图表 |
|------|---------|---------|
| 趋势 | 有时序字段 | `line_chart` / `area_chart` |
| 对比 | 有分类字段 | `bar_chart` / `column_chart` |
| 占比 | 分类+数值+总和有意义 | `pie_chart` / `treemap_chart` / `sunburst_chart` |
| 分布 | 数值密集 | `histogram_chart` / `boxplot_chart` / `heatmap_chart` |
| 关联 | 两个数值字段 | `scatter_chart` / `effect_scatter_chart` |
| 流向 | 源-目标数据 | `sankey_chart` / `lines_chart` |
| 地理 | 含地域字段 | `map_chart` / `lines_chart` |
| 多维 | ≥3 维度 | `radar_chart` / `parallel_chart` |
| 层级 | 父子结构 | `tree_chart` / `treemap_chart` / `sunburst_chart` |
| 转化 | 漏斗递减 | `funnel_chart` / `sankey_chart` |

**0c. 人机确认**

输出以下内容给用户，**等确认后再进入步骤 1**：

```
【数据分析】

数据结构：[时序/分类/地理...]
数据范围：[时间 或 分类 跨度]
数据质量：[有无缺失/异常/空值]

可表达的分析目标：
1. [目标1] → 推荐：[图表类型] — 理由
2. [目标2] → 推荐：[图表类型] — 理由

建议优先：[目标1]，因为 [原因]

你觉得做哪个方向？
```

**一次最多提 2 个分析方向**，不罗列全部可能。用户确认或调整后进入步骤 1。

### 1. 选择图表类型

根据用户的数据和意图选择最合适的图表：

| 意图 | 信号词 | 推荐图表 | 备选 |
|------|--------|---------|------|
| 对比大小 | "谁最大"、"排名"、"差距" | `bar_chart`（横向） | `column_chart`（≤5 项） |
| 看趋势 | "走势"、"变化"、"波动" | `line_chart` | `area_chart`（强调累积） |
| 看占比 | "构成"、"份额"、"比例" | `pie_chart`（≤5 项） | `treemap_chart`（≥6 项） |
| 看流向 | "从哪到哪"、"转移"、"分配" | `sankey_chart` | `lines_chart`（地理路径） |
| 看分布 | "集中在哪"、"频率"、"正态" | `histogram_chart` | `heatmap_chart`（二维） |
| 看关联 | "相关性"、"散点"、"离群" | `scatter_chart` | `effect_scatter_chart`（高亮重点） |
| 看层级 | "组织架构"、"下钻"、"分类" | `tree_chart`（结构） | `sunburst_chart`（占比） |
| 看转化 | "漏斗"、"流失"、"转化率" | `funnel_chart` | `sankey_chart`（含分支） |
| 看多维 | "雷达"、"能力对比"、"画像" | `radar_chart` | `parallel_chart`（≥6 维度） |
| 看地理 | "各省"、"区域"、"地图" | `map_chart` | `lines_chart`（路径） |
| 看业绩 | "营收"、"利润"、"双指标" | `dual_axes_chart` | `line_chart`（单指标） |
| 看日历 | "年度"、"每日"、"打卡" | `calendar_chart` | `heatmap_chart`（非日历） |
| 金融行情 | "开盘收盘"、"K线" | `candlestick_chart` | `line_chart`（只看趋势） |

**经验法则**：不确定时，让主要对比最容易看清。比数值 → 柱状；看变化 → 折线；看构成 → 饼/矩形树图。

### 2. 复杂度上限

每类图表都有可读上限，超过后需换方案：

| 图表类型 | 上限 | 超载症状 | 降级方案 |
|---------|------|---------|---------|
| 柱状/条形图 | 15 | 标签重叠、柱子太细 | 取 Top N，其余归为"其他" |
| 折线图 | 8 条线 | 线条缠绕成毛线球 | 双轴或高亮重点线 |
| 饼图 | 5 块 | 扇区太小无法比较 | 矩形树图或堆叠柱 |
| 桑基图 | 20 条连线 | 节点堆积无法阅读 | 聚合中间层节点 |
| 关系图 | 15 个节点 | 力导向布局混乱 | 环形布局或过滤边 |
| 热力图 | 15×15 格 | 格子太小 | 聚合行列 |
| 雷达图 | 5 轴 | 多边形重叠难以阅读 | ≤3 对象叠加，或改用条形图组 |
| 散点图 | 200 点 | 密集一团 | 加密度轮廓或采样 |
| 日历图 | 1 年 | 行数太多 | 只显示季度或月 |
| 矩形树图 | 30 叶子 | 标签重叠 | 聚合到父级 |

生成前数一下数据点。如果超过上限，要么自动聚合并注明，要么问用户是否看子集。

### 3. 反模式（禁止）

| 反模式 | 问题 | 修复 |
|--------|------|------|
| 颜色超过 6 种 | 人眼区分困难，失去视觉层次 | 主色 ≤6，其余灰度/浅色调 |
| 同时开动画+面积+堆叠 | 视觉噪音大，分不清主次 | 最多开两个装饰效果 |
| 不标注数据单位 | 读者不知该读绝对值还是比例 | 标题或 Y 轴加"（万元）"、"（%）"等 |
| 桑基图节点重叠 | 布局迭代不足或数据太密 | `layoutIterations: 64`，或聚合中间层 |
| 关系图所有边一样粗 | 看不出权重差异 | 用 `value` 映射 `lineStyle.width` |
| 标题空着不填 | 读者不知道在看什么 | 格式："[指标] vs [维度]，[时间范围]" |
| 图例挡住图表 | legend 默认居中可能覆盖数据 | 设 `bottom: 0` 或 `right: 0` 避开 |
| 折线不平滑但数据是趋势 | 锯齿感强像噪音 | `smooth: true` |
| 导出图片模糊 | canvas 默认 1x 分辨率 | `format: 'svg'` 或 `pixelRatio: 2` |

### 4. 数据转换指南

用户的数据很少恰好是脚本需要的格式。按以下模式转换：

| 用户数据格式 | 目标格式 | 示例 |
|-------------|---------|------|
| 表格 `[{时间, 指标A, 指标B}]` | 分组 `[{time, value, group}]` | 按时间展开，每个指标一个 group |
| 矩阵 `[[1,2],[3,4]]` | 热力图 `[{x, y, value}]` | 行列索引 + 值 → [row, col, val] |
| 层级 `{A: {B: 10, C: 20}}` | 树形 `{name, value, children}` | 递归：键→name，值→value/children |
| 源-目标 `[{from, to, amount}]` | 桑基 `[{source, target, value}]` | from→source, to→target, amount→value |
| 原始数值 `[12, 15, 8, ...]` | 直方图 `[{value}]` | 每个数一条 `{value: n}` |
| K线 `[{日期, 开, 收, 高, 低}]` | K线 `[{date, open, close, low, high}]` | 列名映射即可 |
| 坐标 `[{经度, 纬度, 值}]` | 地图 `[{name, value}]` | 需配合 GeoJSON 地名匹配 |

**生成前**：如果数据转换不明显，先告诉用户你打算怎么映射。例如："你的数据有 A/B/C 三列，我打算把 A 当时间、B/C 当两个分组对比，对吗？"

### 5. 通用组件层

笛卡尔坐标系图表（折线、柱状、条形、散点、K线、热力图）支持以下可选组件：

| 组件 | 用法 | 功能 |
|------|------|------|
| 工具箱 | `components.toolbox: { showToolbox: true }` | 导出图片、数据视图、还原、图表类型切换 |
| 数据缩放 | `components.dataZoom: {}` | 滑块 + 鼠标滚轮缩放 |
| 标注点 | `components.marks.markPoint: [{ name, x, y, value }]` | 峰值、异常等标注 |
| 标注线 | `components.marks.markLine: [{ type: "average"\|"max"\|"min" }]` | 均值线、最值线 |
| 标注区域 | `components.marks.markArea: [{ name, xRange, color }]` | 高亮特定区间 |
| 时间线 | `components.timeline: { autoPlay: true, playInterval: 2000 }` | 多快照数据自动轮播 |
| 可滚动图例 | `components.scrollableLegend: {}` | 类别过多时自动分页 |

### 6. 生成图表

用 JSON 规格调用生成脚本：

```json
{
  "tool": "generate_<图表类型>_chart",
  "args": {
    "data": [...],
    "title": "...",
    "theme": "default | dark | academy",
    "style": { "palette": [...] }
  }
}
```

```bash
node .claude/skills/echarts-visualization/scripts/generate-echarts.js '<JSON规格>'
```

### 7. 返回结果

脚本输出 HTML 文件路径。返回：
- 文件路径（用户浏览器打开）
- `_meta.spec`（HTML 中嵌入的 JSON 注释，供后续编辑用）

## 支持的图表类型

| 工具名 | 描述 | ECharts 独有 |
|--------|------|-------------|
| `generate_sankey_chart` | 桑基图 — 流量流向 | 是 |
| `generate_candlestick_chart` | K线图/蜡烛图 — OHLC 金融 | 是 |
| `generate_map_chart` | 地图 — 区域热力 | 是 |
| `generate_heatmap_chart` | 热力图 — 矩阵密度 | 是 |
| `generate_treemap_chart` | 矩形树图 — 层级钻取 | 是 |
| `generate_graph_chart` | 关系图 — 节点力导向 | 是 |
| `generate_radar_chart` | 雷达图 — 多维对比 | 是 |
| `generate_funnel_chart` | 漏斗图 — 转化递减 | 是 |
| `generate_gauge_chart` | 仪表盘 — KPI 进度 | 是 |
| `generate_scatter_chart` | 散点图 — 相关性 | 是 |
| `generate_effect_scatter_chart` | 动态散点图 — 涟漪高亮 | 是 |
| `generate_pictorial_bar_chart` | 象形柱图 — 自定义图形 | 是 |
| `generate_parallel_chart` | 平行坐标 — 多维对比 | 是 |
| `generate_theme_river_chart` | 主题河流 — 时间流图 | 是 |
| `generate_calendar_chart` | 日历热力 — 年度追踪 | 是 |
| `generate_lines_chart` | 流向路径 — 动画航线 | 是 |
| `generate_tree_chart` | 树图 — 层级结构 | 是 |
| `generate_sunburst_chart` | 旭日图 — 层级占比 | 是 |
| `generate_boxplot_chart` | 箱线图 — 统计分布 | 是 |
| `generate_polar_chart` | 极坐标 — 玫瑰图/周期 | 是 |
| `generate_line_chart` | 折线图 — 趋势 | 基础 |
| `generate_area_chart` | 面积图 — 堆叠趋势 | 基础 |
| `generate_dual_axes_chart` | 双轴图 — 柱线叠加 | 是 |
| `generate_histogram_chart` | 直方图 — 频率分布 | 是 |
| `generate_bar_chart` | 横向柱状图 — 对比 | 基础 |
| `generate_column_chart` | 纵向柱状图 — 对比 | 基础 |
| `generate_pie_chart` | 饼/环图 — 占比 | 基础 |

## 主题

| 主题 | 描述 | 推荐度 |
|------|------|--------|
| `default` | **【推荐】** 白底，红/深蓝/灰三色体系 | 首选 |
| `binary` | **【推荐】** 纯三色配色（红+深蓝+纯灰），极致克制 | 极简场景首选 |
| `dark` | 深色背景，明亮色彩 | 深色看板 |
| `academy` | 学术风格，白底灰字 | 论文/报告 |
| `restraint` | 极简克制配色，深蓝+橙红 | 备用 |

## 输出格式

| 格式 | 说明 |
|------|------|
| `html`（默认） | 交互式 HTML 页面，浏览器打开后可交互 |
| `svg` | SVG 渲染，内置 "Download SVG" 按钮，可直接嵌入 PPT/报告 |
| `png` | 工具栏导出按钮默认输出 2x PNG，适合高清截图 |

**嵌入 PPT/报告推荐**：`format: 'svg'` — 矢量无损缩放，文件小，完美兼容 Keynote/PowerPoint。

## 接收 viz-design 委托

当上游 viz-design 技能委托渲染时，会传递四个 md 文档路径：

| 文档 | 内容 | 如何使用 |
|------|------|---------|
| `intent.md` | 叙事意图（为什么做、想传达什么） | 理解图表核心主张，确保标题和标注服务于这个主张 |
| `storyboard.md` | 视觉叙事设计（弧线、节拍、签名元素） | 提取阅读路径和签名视觉元素 |
| `spec.md` | 编译规格（数据、视觉编码、标注策略、布局） | **主要输入**：直接映射为 ECharts option |
| `checklist.md` | 验收清单 | 出图后逐项验收 |

**执行流程**：

1. 读四个 md 文档
2. 从 `spec.md` 提取：数据组织、视觉编码、标注策略、布局尺寸
3. 映射到 viz-echarts 的图表类型和数据格式
4. 配色参考 13-VISUALIZATION.md 体系（Warm/Stone/Teal/Coral/Sky），也可自选。按 spec.md 的视觉编码决定高亮/灰化
5. 调用 `generate_<chart_type>_chart` 生成 HTML
6. 出图后读 `checklist.md` 逐项验收

**版式选择**（参考 composition-templates.md，40 种构图模板）：

| 版式 | 适用场景 | 结构 |
|------|---------|------|
| #01 单图居中 | 单张图表，简洁汇报 | 标题→图表→脚注 |
| #03 左右对比 60/40 | 图表+说明 | 左图表，右文字解读 |
| #08 L 型 | 图表+解读+底部注释 | 左图表，右要点，底部全宽条 |
| #14 主次左右 70/30 | 主图+KPI 卡片 | 左大区图表，右侧辅助信息 |
| #04 上下分栏 | 概览+详情 | 上趋势/主图，下明细 |
| #09 卡片阵列 | 多指标总览 | 2-4 张 KPI 卡片横排 |
| #28 顶部 KPI + 多图表 | 管理日报/月报 | 顶部指标栏 + 下方 2×2 图表 |

**默认**：简单场景用 #01；需要解读/辅助信息时用 #08 或 #14；管理看板用 #28。

**版式实现要求**：
- 解读区/说明区必须有实质内容（原因+影响），不重复图表已有数字
- KPI 卡片用卡片层级规范（指标卡：10px 圆角，Stone 50 底色）
- 标注文字写"为什么"，不写纯数字（例："旺季+新供应商上线 → 营收进入上行通道"）

**与 viz-design 的分工**：viz-design 做视觉决策（选什么图、高亮什么、标注什么），viz-echarts 做渲染执行（ECharts option、交互配置、导出）。viz-design 不写 ECharts 代码。

## 参考资料

详细规格见 `references/` 目录。
