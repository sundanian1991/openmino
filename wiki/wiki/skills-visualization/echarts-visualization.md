# ECharts Visualization (echarts-visualization)

> Sources: Mino, 2026-04-25
> Raw: [SKILL.md](../../raw/skills/echarts-visualization-SKILL.md); [generate_area_chart.md](../../raw/skills/echarts-visualization-generate_area_chart.md); [generate_bar_chart.md](../../raw/skills/echarts-visualization-generate_bar_chart.md); [generate_boxplot_chart.md](../../raw/skills/echarts-visualization-generate_boxplot_chart.md); [generate_calendar_chart.md](../../raw/skills/echarts-visualization-generate_calendar_chart.md); [generate_candlestick_chart.md](../../raw/skills/echarts-visualization-generate_candlestick_chart.md); [generate_column_chart.md](../../raw/skills/echarts-visualization-generate_column_chart.md); [generate_dual_axes_chart.md](../../raw/skills/echarts-visualization-generate_dual_axes_chart.md); [generate_effect_scatter_chart.md](../../raw/skills/echarts-visualization-generate_effect_scatter_chart.md); [generate_funnel_chart.md](../../raw/skills/echarts-visualization-generate_funnel_chart.md); [generate_gauge_chart.md](../../raw/skills/echarts-visualization-generate_gauge_chart.md); [generate_graph_chart.md](../../raw/skills/echarts-visualization-generate_graph_chart.md); [generate_heatmap_chart.md](../../raw/skills/echarts-visualization-generate_heatmap_chart.md); [generate_histogram_chart.md](../../raw/skills/echarts-visualization-generate_histogram_chart.md); [generate_line_chart.md](../../raw/skills/echarts-visualization-generate_line_chart.md); [generate_lines_chart.md](../../raw/skills/echarts-visualization-generate_lines_chart.md); [generate_map_chart.md](../../raw/skills/echarts-visualization-generate_map_chart.md); [generate_parallel_chart.md](../../raw/skills/echarts-visualization-generate_parallel_chart.md); [generate_pictorial_bar_chart.md](../../raw/skills/echarts-visualization-generate_pictorial_bar_chart.md); [generate_pie_chart.md](../../raw/skills/echarts-visualization-generate_pie_chart.md); [generate_polar_chart.md](../../raw/skills/echarts-visualization-generate_polar_chart.md); [generate_radar_chart.md](../../raw/skills/echarts-visualization-generate_radar_chart.md); [generate_sankey_chart.md](../../raw/skills/echarts-visualization-generate_sankey_chart.md); [generate_scatter_chart.md](../../raw/skills/echarts-visualization-generate_scatter_chart.md); [generate_sunburst_chart.md](../../raw/skills/echarts-visualization-generate_sunburst_chart.md); [generate_theme_river_chart.md](../../raw/skills/echarts-visualization-generate_theme_river_chart.md); [generate_tree_chart.md](../../raw/skills/echarts-visualization-generate_tree_chart.md); [generate_treemap_chart.md](../../raw/skills/echarts-visualization-generate_treemap_chart.md); [generate-echarts.js](../../raw/skills/echarts-visualization-generate-echarts.js)

## Overview

echarts-visualization 使用 Apache ECharts 生成交互式 HTML 图表文件。与 chart-visualization 生成静态图片不同，本技能输出自包含的 HTML 页面，用户用浏览器打开即可查看和交互（缩放、数据视图、图表类型切换、导出图片等）。支持 26 种图表类型，涵盖金融（K线图）、地理（地图+流向动画）、统计（箱线图、热力图、日历图）、关系网络（桑基图、力导向关系图）、多维分析（平行坐标、主题河流）等高级场景。

## 配色体系

与 chart-visualization 共享同一套三色体系：

| 色值 | 角色 | 用途 |
|------|------|------|
| `#C13531` | 主题红（主色） | 标题、强调、高值数据、第一数据系列 |
| `#293C54` | 深蓝（对比色） | 对比元素、中值数据、第二系列 |
| `#CDCECD` | 纯灰（辅助色） | 参考线、低值数据、次要信息、第三系列 |

**用法**：数据系列 ≤ 3 时严格用三色；4-6 系列时用三色的浅色调扩展。禁止超过 6 色。

## 主题选择

| 场景 | 推荐主题 | 理由 |
|------|---------|------|
| 报告/看板/PPT | `default` | 白底三色，清晰专业 |
| 极简/克制 | `binary` | 纯三色，极致简洁 |
| 深色背景 | `dark` | 深色底+明亮色 |
| 论文/报告 | `academy` | 学术风格，白底灰字 |
| 备用 | `restraint` | 极简克制配色，深蓝+橙红 |

## 工作流

### 步骤 0：数据分析前摇

**不要看完数据直接选图。先分析，再推荐，等人确认，最后出图。**

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

输出数据分析报告（数据结构、范围、质量、可表达的分析目标），等确认后再进入图表生成。**一次最多提 2 个分析方向**，不罗列全部可能。

### 步骤 1：选择图表类型

根据用户意图选择图表。经验法则：不确定时，让主要对比最容易看清。比数值 → 柱状；看变化 → 折线；看构成 → 饼/矩形树图。

### 步骤 2：复杂度上限

每类图表都有可读上限，超过后需换方案：

| 图表类型 | 上限 | 超载症状 | 降级方案 |
|---------|------|---------|---------|
| 柱状/条形图 | 15 | 标签重叠、柱子太细 | 取 Top N，其余归为"其他" |
| 折线图 | 8 条线 | 线条缠绕成毛线球 | 双轴或高亮重点线 |
| 饼图 | 5 块 | 扇区太小无法比较 | 矩形树图或堆叠柱 |
| 桑基图 | 20 条连线 | 节点堆积无法阅读 | 聚合中间层节点 |
| 关系图 | 15 个节点 | 力导向布局混乱 | 环形布局或过滤边 |
| 热力图 | 15×15 格 | 格子太小 | 聚合行列 |
| 雷达图 | 8 轴 | 多边形难以阅读 | 将相关轴分组 |
| 散点图 | 200 点 | 密集一团 | 加密度轮廓或采样 |
| 日历图 | 1 年 | 行数太多 | 只显示季度或月 |
| 矩形树图 | 30 叶子 | 标签重叠 | 聚合到父级 |

生成前数一下数据点。如果超过上限，要么自动聚合并注明，要么问用户是否看子集。

### 步骤 3：数据转换指南

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

### 步骤 4-5：生成与交付

用 JSON 规格调用生成脚本，输出 HTML 文件路径。返回文件路径（用户浏览器打开）和 `_meta.spec`（HTML 中嵌入的 JSON 注释，供后续编辑用）。

## 26 种图表类型详解

### ECharts 独有图表（15 种）

**桑基图（generate_sankey_chart）**：展示实体间的流量分配与流向，节点宽度映射数值。`source`/`target`/`value` 三字段。`layoutIterations` 默认 32，节点堆积时可增至 64。`nodeAlign` 控制对齐方式。

**K线图/蜡烛图（generate_candlestick_chart）**：展示金融数据 OHLC（开盘、收盘、最高、最低）。`upColor` 默认 `#ef5350`，`downColor` 默认 `#26a69a`。`barMaxWidth` 默认 30px。数据按时间升序排列，OHLC 顺序为 open/close/low/high（注意不是常规 OHLC 顺序）。

**地图（generate_map_chart）**：基于 GeoJSON 展示区域分布。`name` 必须与 GeoJSON 中行政区划名称完全匹配。中国地图使用省级名称。颜色映射建议用单色系渐变。

**热力图（generate_heatmap_chart）**：以颜色深浅展示二维矩阵中数据密度或强度。x/y 为数组索引值（从 0 开始），不是直接标签。需配合 `xAxisData` 和 `yAxisData`。

**矩形树图（generate_treemap_chart）**：以嵌套矩形面积展示层级数据结构，支持点击钻取。`roam` 允许缩放拖拽，`breadcrumb` 显示面包屑导航。叶节点必须有 value 值。

**关系图（generate_graph_chart）**：以节点和边展示实体间的关系网络，支持力导向（`force`）和环形（`circular`）布局。`repulsion` 默认 150，`edgeLength` 默认 [80, 200]。力导向适合 10-50 个节点。

**仪表盘（generate_gauge_chart）**：展示单项指标的完成度或当前状态。`radius` 默认 75%，`showProgress` 显示进度条，`detailFormatter` 默认 `{value}%`。多仪表盘时建议用不同 radius 避免重叠。

**散点图（generate_scatter_chart）**：展示两个变量之间的相关性。`symbolSize` 默认 10。少于 10 个点考虑改用气泡图或表格；超过 500 个建议抽样。

**动态散点图（generate_effect_scatter_chart）**：带涟漪动画的散点图，适用于需要突出关键数据点的场景。`rippleScale` 默认 3 倍。

**象形柱图（generate_pictorial_bar_chart）**：用自定义图形替代传统柱子。`symbol` 可选 `circle`、`triangle`、`diamond`、`arrow`、`image://url`。`symbolRepeat` 可重复排列图形。

**平行坐标（generate_parallel_chart）**：在平行坐标系下展示多维数据。`lineOpacity` 默认 0.5。适用于多变量对比、降维可视化。

**主题河流（generate_theme_river_chart）**：流图形式展示不同类别随时间的变化。`data` 每条含 `date`/`time`、`value`、`group`/`category`。

**日历热力图（generate_calendar_chart）**：以日历形式展示每日数据的密度或强度。`data` 每条为 `[date, value]` 数组或 `{date, value}` 对象。`style.range` 默认 `'2026'`。`colorRange` 默认 GitHub 风格绿色系。

**流向路径图（generate_lines_chart）**：带流动动画的路径/航线图，配合地图使用。`showEffect` 默认 `true`，`trailLength` 默认 0.4。`coords` 为 `[lon, lat]` 坐标点数组。

**树图（generate_tree_chart）**：展示层级关系的树状结构。`layout` 可选 `orthogonal`（正交）或 `radial`（径向）。`orient` 默认 `LR`（左→右）。`expandAndCollapse` 允许展开/折叠。

### 基础图表（11 种）

**折线图**：`smooth` 默认 `true`，`lineWidth` 默认 2。
**面积图**：`showArea` 默认 `false`（非堆叠下），`areaOpacity` 默认 0.5。
**双轴图**：`series` 每项含 `type`（`column`/`line`）与 `data`。
**直方图**：`binCount` 默认按 √n 自动计算。
**横向柱状图**：类别名称较长时优先。
**纵向柱状图**：10 个以上类别时考虑改用折线图或滚动。
**饼/环图**：`innerRadius` 默认 0（饼图），设 0.5 生成环图。
**雷达图**：维度数 5-10 个之间，建议不超过 3 条对比线。`areaOpacity` 默认 0.2。
**漏斗图**：`sort` 默认 `descending`，`gap` 默认 2。
**箱线图**：可传入预计算的 `min/Q1/median/Q3/max`，也可传入原始值数组 `[[组1值...], [组2值...]]`。`boxWidth` 默认 [7, 50]。
**极坐标图**：支持极坐标柱状图和极坐标折线图，适用于周期数据、南丁格尔玫瑰图。

### 旭日图（generate_sunburst_chart）

以同心圆环展示层级数据的占比，比矩形树图更适合展示层级占比。`radius` 默认 `['15%', '80%']`，`labelRotate` 默认 `radial`，`borderWidth` 默认 2。

## 通用组件层

笛卡尔坐标系图表（折线、柱状、条形、散点、K线、热力图）支持以下可选组件：

| 组件 | 用法 | 功能 |
|------|------|------|
| 工具箱 | `components.toolbox: { showToolbox: true }` | 导出图片、数据视图、还原、图表类型切换 |
| 数据缩放 | `components.dataZoom: {}` | 滑块 + 鼠标滚轮缩放 |
| 标注点 | `components.marks.markPoint: [{ name, x, y, value }]` | 峰值、异常等标注 |
| 标注线 | `components.marks.markLine: [{ type: "average"|"max"|"min" }]` | 均值线、最值线 |
| 标注区域 | `components.marks.markArea: [{ name, xRange, color }]` | 高亮特定区间 |
| 时间线 | `components.timeline: { autoPlay: true, playInterval: 2000 }` | 多快照数据自动轮播 |
| 可滚动图例 | `components.scrollableLegend: {}` | 类别过多时自动分页 |

## 反模式（禁止）

| 反模式 | 问题 | 修复 |
|--------|------|------|
| 颜色超过 6 种 | 人眼区分困难 | 主色 ≤6，其余灰度/浅色调 |
| 同时开动画+面积+堆叠 | 视觉噪音大 | 最多开两个装饰效果 |
| 不标注数据单位 | 读者不知该读绝对值还是比例 | 标题或 Y 轴加"（万元）"、"（%）"等 |
| 桑基图节点重叠 | 布局迭代不足或数据太密 | `layoutIterations: 64`，或聚合中间层 |
| 关系图所有边一样粗 | 看不出权重差异 | 用 `value` 映射 `lineStyle.width` |
| 标题空着不填 | 读者不知道在看什么 | 格式："[指标] vs [维度]，[时间范围]" |
| 图例挡住图表 | legend 默认居中可能覆盖数据 | 设 `bottom: 0` 或 `right: 0` |
| 折线不平滑但数据是趋势 | 锯齿感强像噪音 | `smooth: true` |
| 导出图片模糊 | canvas 默认 1x 分辨率 | `format: 'svg'` 或 `pixelRatio: 2` |

## 输出格式

| 格式 | 说明 |
|------|------|
| `html`（默认） | 交互式 HTML 页面，浏览器打开后可交互 |
| `svg` | SVG 渲染，内置 "Download SVG" 按钮，可直接嵌入 PPT/报告 |
| `png` | 工具栏导出按钮默认输出 2x PNG，适合高清截图 |

嵌入 PPT/报告推荐 `format: 'svg'`——矢量无损缩放，文件小，完美兼容 Keynote/PowerPoint。

## 与 chart-visualization 的对比

| 维度 | chart-visualization | echarts-visualization |
|------|---------------------|----------------------|
| 输出 | 静态图片（URL） | 交互式 HTML 文件 |
| 渲染引擎 | AntV Studio API | Apache ECharts |
| 交互 | 无 | 缩放、数据视图、导出、切换 |
| 独有图表 | 鱼骨图、思维导图、维恩图、电子表格 | K线图、热力图、日历图、流向动画、平行坐标 |
| 适用场景 | 快速出图、嵌入报告 | 数据看板、用户探索、PPT 嵌入 |
