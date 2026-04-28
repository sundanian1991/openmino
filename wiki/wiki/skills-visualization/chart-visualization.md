# Chart Visualization (chart-visualization)

> Sources: Mino, 2026-04-25
> Raw:[SKILL.md](../../raw/skills/chart-visualization-SKILL.md); [generate_area_chart.md](../../raw/skills/chart-visualization-generate_area_chart.md); [generate_bar_chart.md](../../raw/skills/chart-visualization-generate_bar_chart.md); [generate_boxplot_chart.md](../../raw/skills/chart-visualization-generate_boxplot_chart.md); [generate_column_chart.md](../../raw/skills/chart-visualization-generate_column_chart.md); [generate_district_map.md](../../raw/skills/chart-visualization-generate_district_map.md); [generate_dual_axes_chart.md](../../raw/skills/chart-visualization-generate_dual_axes_chart.md); [generate_fishbone_diagram.md](../../raw/skills/chart-visualization-generate_fishbone_diagram.md); [generate_flow_diagram.md](../../raw/skills/chart-visualization-generate_flow_diagram.md); [generate_funnel_chart.md](../../raw/skills/chart-visualization-generate_funnel_chart.md); [generate_histogram_chart.md](../../raw/skills/chart-visualization-generate_histogram_chart.md); [generate_line_chart.md](../../raw/skills/chart-visualization-generate_line_chart.md); [generate_liquid_chart.md](../../raw/skills/chart-visualization-generate_liquid_chart.md); [generate_mind_map.md](../../raw/skills/chart-visualization-generate_mind_map.md); [generate_network_graph.md](../../raw/skills/chart-visualization-generate_network_graph.md); [generate_organization_chart.md](../../raw/skills/chart-visualization-generate_organization_chart.md); [generate_path_map.md](../../raw/skills/chart-visualization-generate_path_map.md); [generate_pie_chart.md](../../raw/skills/chart-visualization-generate_pie_chart.md); [generate_pin_map.md](../../raw/skills/chart-visualization-generate_pin_map.md); [generate_radar_chart.md](../../raw/skills/chart-visualization-generate_radar_chart.md); [generate_sankey_chart.md](../../raw/skills/chart-visualization-generate_sankey_chart.md); [generate_scatter_chart.md](../../raw/skills/chart-visualization-generate_scatter_chart.md); [generate_spreadsheet.md](../../raw/skills/chart-visualization-generate_spreadsheet.md); [generate_treemap_chart.md](../../raw/skills/chart-visualization-generate_treemap_chart.md); [generate_venn_chart.md](../../raw/skills/chart-visualization-generate_venn_chart.md); [generate_violin_chart.md](../../raw/skills/chart-visualization-generate_violin_chart.md); [generate_word_cloud_chart.md](../../raw/skills/chart-visualization-generate_word_cloud_chart.md)

## 概述

chart-visualization 是一个"先分析、后出图"的通用数据可视化技能，定位为"数据分析+可视化"的协作流程，而非单纯的"画图工具"。它覆盖 26 种图表类型（含鱼骨图、思维导图、维恩图等特殊类型），通过调用 AntV Studio API（`antv-studio.alipay.com`）生成静态图表图片。核心设计哲学是：收到数据后先做结构分析和目标匹配，输出分析报告并等用户确认，再调用对应图表的生成脚本出图。

## 配色体系

| 角色 | 色值 | 用途 |
|------|------|------|
| 主题红 | `#C13531` | 强调、高值、主打数据系列 |
| 深蓝 | `#293C54` | 对比元素、次要数据系列 |
| 纯灰 | `#CDCECD` | 参考元素、第三系列、辅助信息 |

核心原则：配色克制，主色不超过 6 种。优先用上述三色构建视觉层次，不够时用浅色调扩展。

## 工作流（5 步）

### 步骤 1：数据接收 + 结构分析

收到原始数据后，先做三件事：

**1a. 识别数据结构**

| 维度 | 判断标准 | 示例 |
|------|---------|------|
| 时序型 | 含日期/时间字段，按时间排序 | 2025-01, 2025-02, ... |
| 分类型 | 有限个互斥类别 | 华北、华东、华南 |
| 数值型 | 连续数值 | 营收、成本、利润 |
| 地理型 | 含地区/省/市字段 | 北京市、上海市 |
| 层级型 | 父子关系，可下钻 | 集团→事业部→部门 |

**1b. 识别数据形态**

| 形态 | 特征 | 示例 |
|------|------|------|
| 宽表 | 每个指标一列 | `[{月, 营收, 成本, 利润}]` |
| 长表 | 指标在同一列，用分组区分 | `[{月, 类别, 值}]` |
| 交叉表 | 行列交叉 | `[[营收, 成本], [100, 80]]` |
| 原始值 | 未经聚合的数值序列 | `[12, 15, 8, 22, ...]` |

**1c. 数量评估**

记录数据点总数、分类数、时间跨度。超载时自动标注（如"15 个分类超出柱状图推荐上限，建议取 Top 10"）。

### 步骤 2：分析目标匹配

基于数据结构，匹配最适合的分析目标：

| 分析目标 | 触发条件 | 推荐图表 | 备选 |
|---------|---------|---------|------|
| **看趋势** | 含时间维度 | `generate_line_chart` | `generate_area_chart` |
| **看对比** | 分类型 + 数值 | `generate_bar_chart` | `generate_column_chart` |
| **看占比** | 分类型 + 总和有含义 | `generate_pie_chart` | `generate_treemap_chart` |
| **看分布** | 数值型，关注集中度 | `generate_histogram_chart` | `generate_boxplot_chart` |
| **看相关** | 两个数值型字段 | `generate_scatter_chart` | 无 |
| **看多维** | ≥3 维度对比 | `generate_radar_chart` | 无 |
| **看流向** | 源-目标关系 | `generate_sankey_chart` | 无 |
| **看流程** | 步骤/因果关系 | `generate_fishbone_diagram` | `generate_flow_diagram` |
| **看结构** | 层级/组织关系 | `generate_organization_chart` | `generate_mind_map` |
| **看转化** | 漏斗型递减数据 | `generate_funnel_chart` | 无 |
| **看进度** | 百分比/完成度 | `generate_liquid_chart` | 无 |
| **看文本频率** | 文本+频次 | `generate_word_cloud_chart` | 无 |
| **看重叠** | 集合关系 | `generate_venn_chart` | 无 |
| **看关系** | 节点-边网络 | `generate_network_graph` | 无 |
| **看表格** | 需要精确查阅 | `generate_spreadsheet` | 无 |

### 步骤 3：人机确认

必须等用户确认后再出图。输出标准格式：

```
【数据分析报告】
数据结构：时序 + 分类（共 X 条）
识别维度：[维度1]、[维度2]、[维度3]
可选分析方向：
1. 趋势分析 → 推荐：[图表名] — 理由：[为什么]
2. 对比分析 → 推荐：[图表名] — 理由：[为什么]
建议优先做：[方向 1]，因为 [原因]
你觉得怎么样？
```

### 步骤 4：参数提取 + 图表生成

读取 `references/` 中对应图表类型的规格文件，提取必填/可选参数，构建 JSON payload，调用脚本：

```bash
node ./scripts/generate.js '<payload_json>'
```

主题色传递通过 `args.style.palette` 传入：`["#C13531", "#293C54", "#CDCECD"]`。

### 步骤 5：交付 + 分析注解

返回三样东西：图表链接（脚本输出的图片 URL）、分析注解（一句话说明"这张图展示什么结论"）、生成参数（完整的 args，方便微调）。

## 26 种图表类型详解

### 1. 折线图（generate_line_chart）

- **适用场景**：趋势变化，时间或连续自变量下的数值走势，KPI 监控、指标预测、走势分析
- **数据要求**：`data` 数组，每条含 `time`（string）与 `value`（number），多系列时附带 `group`（string）
- **关键参数**：`style.lineWidth`（线宽）、`style.smooth`（平滑曲线）、`style.texture`（`default`/`rough`）、`theme`（`default`/`academy`/`dark`）、`width`/`height`（默认 600×400）
- **使用建议**：所有系列的时间点应对齐；建议按 ISO 日期格式化；高频数据先聚合到日/周粒度避免过密

### 2. 面积图（generate_area_chart）

- **适用场景**：累积趋势，连续自变量下的数值趋势，可启用堆叠观察不同分组的累计贡献
- **数据要求**：`data` 数组，元素含 `time`（string）与 `value`（number），堆叠时需补充 `group`（string）
- **关键参数**：`stack`（boolean，默认 `false`，开启堆叠需确保每条数据都含 `group`）
- **使用建议**：保证 `time` 字段格式统一（如 `YYYY-MM`）；堆叠模式下各组数据需覆盖相同的时间点

### 3. 条形图（generate_bar_chart）

- **适用场景**：横向对比，Top-N 排行、不同地区或渠道对比，类别名称较长时优先
- **数据要求**：`data` 数组，每条至少含 `category`（string）与 `value`（number），如需分组补充 `group`
- **关键参数**：`group`（boolean，默认 `false`，并排模式）、`stack`（boolean，默认 `true`，堆叠模式），二者互斥
- **使用建议**：类别名称保持简短；系列数较多时可改用堆叠或筛选重点项目

### 4. 柱状图（generate_column_chart）

- **适用场景**：纵向对比，不同类别或时间段的指标，常用于销量、营收、客流对比
- **数据要求**：同条形图
- **关键参数**：`group`（boolean，默认 `true`，并排）、`stack`（boolean，默认 `false`，堆叠）
- **使用建议**：类别超过 12 个时按 Top-N 或聚合；堆叠模式要确保各记录都含 `group`

### 5. 双轴图（generate_dual_axes_chart）

- **适用场景**：同时展示趋势与对比，如营收 vs 利润、温度 vs 降雨
- **数据要求**：`categories`（string[]，X 轴刻度）、`series`（数组，每项含 `type`：`column`/`line` 与 `data`：number[]）
- **关键参数**：系列数量 ≤2，保持可读性
- **使用建议**：仅在确有不同量纲对比需求时使用；两曲线差值巨大可使用次坐标轴缩放

### 6. 饼图/环图（generate_pie_chart）

- **适用场景**：占比（≤5 项），市场份额、预算构成、用户群划分
- **数据要求**：`data` 数组，每条含 `category`（string）与 `value`（number）
- **关键参数**：`innerRadius`（范围 [0, 1]，设为 0.6 等值可生成环图）
- **使用建议**：类别 ≤6，更多可聚合为"其它"；数值单位统一，标题中说明基数

### 7. 散点图（generate_scatter_chart）

- **适用场景**：两个连续变量之间的关系，相关性分析、聚类探索
- **数据要求**：`data` 数组，每条含 `x`（number）与 `y`（number），可选 `group`
- **使用建议**：上传前可对不同量纲进行标准化；数据量很大可先抽样；分组不超过 5 个

### 8. 直方图（generate_histogram_chart）

- **适用场景**：连续数值的频数分布，识别偏态、离群与集中区间
- **数据要求**：`data` 为 number[] 数组
- **关键参数**：`binNumber`（自定义分箱数量，未设置则自动估算）
- **使用建议**：清理空值/异常后再传入；样本量建议 ≥30

### 9. 箱型图（generate_boxplot_chart）

- **适用场景**：数据分布范围（最值、四分位、异常值），质量监控、实验结果比较
- **数据要求**：`data` 数组，每条含 `category`（string）与 `value`（number），可选 `group`
- **使用建议**：单个类别至少 5 个样本以保证统计意义

### 10. 小提琴图（generate_violin_chart）

- **适用场景**：核密度曲线+箱型统计展示分布形态，对比多批次实验或群体表现
- **数据要求**：同箱型图
- **使用建议**：各类别样本量建议 ≥30 以确保密度估计稳定

### 11. 雷达图（generate_radar_chart）

- **适用场景**：多维对比，供应商评分卡、多维度能力评估、KPI 考核
- **数据要求**：`data` 数组，每条含 `name`（string）与 `value`（number），可选 `group`
- **使用建议**：维度控制在 4~8 之间；不同对象通过 `group` 区分；量纲不同需先归一化

### 12. 漏斗图（generate_funnel_chart）

- **适用场景**：转化率、流失情况，销售管道、用户旅程
- **数据要求**：`data` 数组，按流程顺序排列，每条含 `category`（string）与 `value`（number）
- **使用建议**：阶段按实际流程排列；避免阶段过多（建议 ≤6）

### 13. 水波图（generate_liquid_chart）

- **适用场景**：单一百分比/进度，达成率、资源占用等指标
- **数据要求**：`percent`（number，取值范围 [0,1]）
- **关键参数**：`shape`（`circle`/`rect`/`pin`/`triangle`）
- **使用建议**：单图仅支持一个进度，多指标需并排生成多个水波图

### 14. 桑基图（generate_sankey_chart）

- **适用场景**：资源/能量/用户流在不同节点之间的流向与数量，预算分配、流量路径
- **数据要求**：`data` 数组，每条含 `source`（string）、`target`（string）与 `value`（number）
- **关键参数**：`nodeAlign`（`center`/`left`/`right`/`justify`）
- **使用建议**：节点名称保持唯一，避免过多交叉；存在环路需先打平为阶段流向

### 15. 鱼骨图（generate_fishbone_diagram）

- **适用场景**：根因分析，中心问题放在主干，左右分支展示不同类别的原因
- **数据要求**：`data` 对象，含根节点 `name`，可通过 `children` 递归扩展，最大建议 3 层
- **使用建议**：一级分支命名原因类别（人、机、料、法等）；叶子节点写具体现象

### 16. 流程图（generate_flow_diagram）

- **适用场景**：业务流程、审批链、算法步骤，支持开始/判断/操作等多种节点类型
- **数据要求**：`data.nodes`（至少 1 条，唯一 `name`）、`data.edges`（至少 1 条，含 `source` 与 `target`）
- **使用建议**：先罗列节点 `name` 并保持唯一，再建立连线；条件可在 `edges.name` 中填写

### 17. 思维导图（generate_mind_map）

- **适用场景**：围绕中心主题展开 2~3 级分支，组织想法、计划或知识结构
- **数据要求**：同鱼骨图，`data` 对象含 `name` 与 `children` 递归扩展
- **使用建议**：中心节点写主题，一级分支代表主要维度，叶子节点使用短语

### 18. 组织架构图（generate_organization_chart）

- **适用场景**：公司、团队或项目的层级关系
- **数据要求**：`data` 对象，含 `name`，可选 `description`，子节点通过 `children` 嵌套
- **关键参数**：`orient`（`horizontal`/`vertical`）
- **使用建议**：节点名称使用岗位/角色；较大组织可拆分多个子图

### 19. 网络关系图（generate_network_graph）

- **适用场景**：实体之间的连接关系，社交网络、系统依赖、知识图谱
- **数据要求**：`data.nodes`（至少 1 条，唯一 `name`）、`data.edges`（至少 1 条，含 `source` 与 `target`）
- **使用建议**：节点数量保持在 10~50 之间以避免拥挤；可在 `label` 中注明关系含义

### 20. 维恩图（generate_venn_chart）

- **适用场景**：多个集合之间的交集、并集与差异，市场细分、特性覆盖、用户重叠
- **数据要求**：`data` 数组，每条含 `value`（number）与 `sets`（string[]），可选 `label`
- **使用建议**：集合数量建议 ≤4；集合命名保持简洁明确

### 21. 词云图（generate_word_cloud_chart）

- **适用场景**：根据词频或权重调节文字大小与位置，快速提炼文本主题、情绪或关键词
- **数据要求**：`data` 数组，每条含 `text`（string）与 `value`（number）
- **使用建议**：生成前去除停用词并合并同义词；统一大小写避免重复

### 22. 矩形树图（generate_treemap_chart）

- **适用场景**：层级结构及各节点权重，资产占比、市场份额、目录容量
- **数据要求**：`data` 数组，每条含 `name`（string）与 `value`（number），可递归嵌套 `children`
- **使用建议**：确保每个节点 `value` ≥0；树层级不宜过深

### 23. 电子表格（generate_spreadsheet）

- **适用场景**：展示结构化的表格数据或数据透视表（交叉表）
- **数据要求**：`data` 数组，每个对象代表一行
- **关键参数**：提供 `rows` 或 `values` 时渲染为数据透视表；否则渲染为常规表格

### 24. 行政区地图（generate_district_map）

- **适用场景**：中国境内省/市/区/县的覆盖或热力图，区域销售、政策覆盖
- **数据要求**：`title`（≤16 字）、`data.name`（明确到省/市/区/县的行政区关键词）
- **关键参数**：`data.dataType`（`number`/`enum`）、`data.showAllSubdistricts`、`data.subdistricts[]`
- **使用建议**：名称必须精确到行政层级；地图只支持中国境内且依赖高德数据

### 25. 路径地图（generate_path_map）

- **适用场景**：中国境内路线或行程，按顺序连接一系列 POI，物流路线、旅游规划
- **数据要求**：`title`（≤16 字）、`data[].data`（中国境内 POI 名称数组）
- **使用建议**：POI 名称必须具体且位于中国（如"西安市钟楼"）

### 26. 点标地图（generate_pin_map）

- **适用场景**：中国地图上展示多个 POI 位置，门店分布、资产布点
- **数据要求**：`title`（≤16 字）、`data`（中国境内 POI 名称列表）
- **关键参数**：`markerPopup`（类型、宽高、圆角）
- **使用建议**：POI 名称需包含足够的地理限定（城市+地标）

## 架构与路由

### 脚本架构（generate.js）

`scripts/generate.js` 是 Node.js CLI 脚本，核心逻辑：

1. **CHART_TYPE_MAP**：将 26 个 `generate_*_chart` 工具名映射到 AntV Studio API 的 `type` 参数（如 `generate_area_chart` → `area`、`generate_district_map` → `district-map`）
2. **API 端点**：通过环境变量 `VIS_REQUEST_SERVER` 配置，默认 `https://antv-studio.alipay.com/api/gpt-vis`
3. **双路径**：普通图表走 `generateChartUrl`（POST JSON 到 API 返回图片 URL），地图类（district-map/path-map/pin-map）走 `generateMap`（额外传递 `serviceId` 和 `tool` 字段）
4. **输入解析**：支持 JSON 字符串或文件路径，支持批量（数组格式）
5. **输出**：直接打印图片 URL 到 stdout

### 主题（theme）

所有图表类型支持三套主题：
- `default`：默认白色背景
- `academy`：学术风格
- `dark`：深色背景

### 纹理（texture）

`style.texture` 控制手绘质感：
- `default`：标准线条
- `rough`：手绘质感（sketchy 风格）

## 反模式

| 行为 | 问题 | 正确做法 |
|------|------|---------|
| 直接出图不问用户 | 可能方向不对 | 先分析，确认后再出图 |
| 颜色超过 6 种 | 人眼无法区分 | 用红/深蓝/灰三色为主 |
| 数据不预处理就传参 | 图表无法正确渲染 | 先做数据转换 |
| 用户给什么就用什么图 | 忽略数据中的异常/缺失 | 分析阶段先标注数据质量 |
| 不解释图表含义 | 用户不知重点 | 交付时附一句话解读 |

## 与 echarts-visualization 的区别

chart-visualization 生成静态图片（URL），通过 AntV Studio API 渲染；而 echarts-visualization 生成交互式 HTML 文件。对于 ECharts 原生支持的交互式图表（折线、柱状、饼图、雷达、散点、漏斗、桑基、矩形树图等），SKILL.md 建议优先使用 echarts-visualization 技能获取交互式 HTML。chart-visualization 更适合快速出图、嵌入报告等场景，echarts-visualization 适合需要用户交互（缩放、筛选、工具栏）的场景。
