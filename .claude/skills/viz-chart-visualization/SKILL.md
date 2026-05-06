---
name: viz:chart-visualization
description: 接收渲染契约 JSON，调用 Chart.js 生成图表。不自作主张做数据分析或图表选择——那是上游 viz-design 的职责。覆盖 26 种图表类型（含鱼骨图、思维导图、维恩图等特殊类型）。
dependency:
  nodejs: ">=18.0.0"
---

# Chart Visualization Skill

接收渲染契约 JSON，调用 Chart.js 生成图表。不自行做数据分析或图表选择——那是上游 viz-design 的职责。

## 工作流

### 步骤 1：接收渲染契约 JSON

从上游（viz-design 或其他调用方）接收渲染契约 JSON。

**必须等用户确认后再出图。** 简单确认格式：

```
收到的渲染契约包含：[图表类型] × [图表数量]
确认图表类型和配色方案无误？需要调整吗？
```

用户确认或调整后进入步骤 2。

### 步骤 2：参数提取 + 图表生成

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

### 步骤 3：交付 + 分析注解

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
| 越过用户直接出图 | 用户无机会检查渲染契约 | 先展示契约摘要，确认后再生成 |
| 颜色超过 6 种 | 人眼无法区分 | 用红/深蓝/灰三色为主，扩展用浅色 |
| 数据不预处理就传参 | 图表无法正确渲染 | 先做数据转换（宽表→长表等） |
| 替上游做数据分析 | 越权做了 viz-design 的事 | 收到什么渲染契约就渲染什么，不自行分析数据 |
| 不解释图表含义 | 用户看了图不知重点 | 交付时附一句话解读 |

---

## 参考资料

各图表类型的详细参数规格见 `references/` 目录。
对于 ECharts 原生支持的交互式图表（折线、柱状、饼图、雷达、散点、漏斗、桑基、矩形树图等），优先使用 `viz-echarts` 技能获取交互式 HTML。
