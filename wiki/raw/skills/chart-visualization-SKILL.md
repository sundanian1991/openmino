---
name: chart-visualization
description: 通用数据可视化技能。先分析数据结构和分析目标，推荐最佳图表，确认后生成图表图片。覆盖 26 种图表类型（含鱼骨图、思维导图、维恩图等特殊类型）。当用户提供数据想要可视化时使用。
dependency:
  nodejs: ">=18.0.0"
---

# Chart Visualization Skill

先分析，后出图。不只是"画图工具"，是"数据分析+可视化"的协作流程。

## 配色体系

| 角色 | 色值 | 用途 |
|------|------|------|
| 主题红 | `#C13531` | 强调、高值、主打数据系列 |
| 深蓝 | `#293C54` | 对比元素、次要数据系列 |
| 纯灰 | `#CDCECD` | 参考元素、第三系列、辅助信息 |

**原则**：配色克制，主色不超过 6 种。优先用上述三色构建视觉层次，不够时用浅色调扩展。

---

## 工作流

### 步骤 1：数据接收 + 结构分析

收到用户的原始数据后，先做三件事：

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

基于数据结构，判断最适合的分析目标：

| 分析目标 | 触发条件 | 推荐图表 | 备选 | 不可用时 |
|---------|---------|---------|------|---------|
| **看趋势** | 含时间维度 | `generate_line_chart` | `generate_area_chart` | 用柱状图按时间排列 |
| **看对比** | 分类型 + 数值 | `generate_bar_chart` | `generate_column_chart` | 拆分为多个柱状图 |
| **看占比** | 分类型 + 总和有含义 | `generate_pie_chart` | `generate_treemap_chart` | 用堆叠柱状图替代 |
| **看分布** | 数值型，关注集中度 | `generate_histogram_chart` | `generate_boxplot_chart` | 用散点图展示分布 |
| **看相关** | 两个数值型字段 | `generate_scatter_chart` | 无 | 用热力图 |
| **看多维** | ≥3 维度对比 | `generate_radar_chart` | 无 | 分组柱状图 |
| **看流向** | 源-目标关系 | `generate_sankey_chart` | 无 | 用堆叠面积图 |
| **看流程** | 步骤/因果关系 | `generate_fishbone_diagram` | `generate_flow_diagram` | 用思维导图 |
| **看结构** | 层级/组织关系 | `generate_organization_chart` | `generate_mind_map` | 用树图 |
| **看转化** | 漏斗型递减数据 | `generate_funnel_chart` | 无 | 用柱状图排序 |
| **看进度** | 百分比/完成度 | `generate_liquid_chart` | 无 | 用仪表盘 |
| **看文本频率** | 文本+频次 | `generate_word_cloud_chart` | 无 | 用条形图排序 |
| **看重叠** | 集合关系 | `generate_venn_chart` | 无 | 用关系图 |
| **看关系** | 节点-边网络 | `generate_network_graph` | 无 | 用桑基图 |
| **看表格** | 需要精确查阅 | `generate_spreadsheet` | 无 | 无 |

**输出示例**：
> 你的数据包含：时间维度（12 个月）、分类维度（4 个区域）、数值指标（营收/成本）。
> 建议分析方向：**趋势**——各区域营收月度变化（折线图）；**对比**——各区域年度累计对比（柱状图）。
> 推荐图表：`generate_line_chart`（趋势）或 `generate_column_chart`（对比）。

### 步骤 3：人机确认

**必须等用户确认后再出图。** 输出格式：

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

用户确认或调整后进入步骤 4。

### 步骤 4：参数提取 + 图表生成

根据确认的分析方向，读取 `references/` 中对应图表类型的规格文件，提取必填/可选参数，构建 JSON payload 调用脚本。

**主题色传递**：在 args.style.palette 中传入配色：
```json
{
  "style": {
    "palette": ["#C13531", "#293C54", "#CDCECD"]
  }
}
```

**执行命令**：
```bash
node ./scripts/generate.js '<payload_json>'
```

### 步骤 5：交付 + 分析注解

返回三样东西：
1. **图表链接** — 脚本输出的图片 URL
2. **分析注解** — 一句话说明"这张图展示什么结论"
3. **生成参数** — 完整的 args，方便微调

**交付格式**：
```
图表：[URL]

解读：[用一句话说出核心发现]

参数：[args JSON，供后续修改]
```

---

## 图表类型速查

| 工具名 | 适用场景 | 数据要求 |
|--------|---------|---------|
| `generate_line_chart` | 趋势变化 | 时序数据 |
| `generate_area_chart` | 累积趋势 | 时序 + 分组 |
| `generate_bar_chart` | 横向对比 | 分类 + 数值 |
| `generate_column_chart` | 纵向对比 | 分类 + 数值 |
| `generate_dual_axes_chart` | 双轴对比 | 两个不同量级指标 |
| `generate_pie_chart` | 占比（≤5 项） | 分类 + 占比 |
| `generate_scatter_chart` | 相关性 | 两个数值字段 |
| `generate_histogram_chart` | 频率分布 | 数值序列 |
| `generate_boxplot_chart` | 统计分布 | 分组数值 |
| `generate_violin_chart` | 分布密度 | 分组数值 |
| `generate_radar_chart` | 多维对比 | ≥3 维度 + 评分 |
| `generate_funnel_chart` | 转化率 | 阶段 + 数值 |
| `generate_liquid_chart` | 进度/百分比 | 单个百分比 |
| `generate_sankey_chart` | 流量流向 | 源-目标-值 |
| `generate_fishbone_diagram` | 因果分析 | 问题 + 原因分类 |
| `generate_mind_map` | 思维发散 | 中心主题 + 分支 |
| `generate_organization_chart` | 组织结构 | 层级关系 |
| `generate_network_graph` | 复杂关系 | 节点 + 连接 |
| `generate_flow_diagram` | 流程步骤 | 步骤序列 |
| `generate_venn_chart` | 集合重叠 | 集合 + 大小 |
| `generate_word_cloud_chart` | 文本频率 | 词 + 频次 |
| `generate_treemap_chart` | 层级占比 | 父子 + 数值 |
| `generate_path_map` | 路径地图 | 起点-终点坐标 |
| `generate_pin_map` | 点位地图 | 经纬度 + 值 |
| `generate_district_map` | 区域地图 | 区域名 + 值 |
| `generate_spreadsheet` | 精确数据展示 | 行列结构数据 |

---

## 反模式

| 行为 | 问题 | 正确做法 |
|------|------|---------|
| 直接出图不问用户 | 可能方向不对 | 先分析，确认后再出图 |
| 颜色超过 6 种 | 人眼无法区分 | 用红/深蓝/灰三色为主，扩展用浅色 |
| 数据不预处理就传参 | 图表无法正确渲染 | 先做数据转换（宽表→长表等） |
| 用户给什么数据就用什么图 | 忽略数据中的异常/缺失 | 分析阶段先标注数据质量 |
| 不解释图表含义 | 用户看了图不知重点 | 交付时附一句话解读 |

---

## 参考资料

各图表类型的详细参数规格见 `references/` 目录。
对于 ECharts 原生支持的交互式图表（折线、柱状、饼图、雷达、散点、漏斗、桑基、矩形树图等），优先使用 `echarts-visualization` 技能获取交互式 HTML。
