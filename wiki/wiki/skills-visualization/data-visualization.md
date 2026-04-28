# Data Visualization — Python matplotlib 专业可视化

> Sources: data-visualization SKILL.md (2026); Python matplotlib 可视化规范, 2026-04-28
> Raw:[SKILL.md](../../raw/skills/data-visualization-SKILL.md); [README](../../raw/skills/data-visualization-README.md); [图表选择](../../raw/skills/data-visualization-chart_selection.md); [可视化规范](../../raw/skills/data-visualization-visualization_spec.md)

## 概述

data-visualization 是基于 Python matplotlib 的专业数据可视化技能。它提供三套专业风格模板（BCG、The Economist、McKinsey），每套风格都按真实报告的视觉规范提取并可复刻。与 echarts-visualization（生成交互式 HTML）不同，data-visualization 生成的是静态图片代码，适合论文、出版物、打印报告等场景。

---

## 一、三套风格模板

### BCG 风格（默认）
- **主色**：绿色 `#2ca02c`，无渐变
- **特点**：简洁、无多余元素
- **标题**：必须含样本量 `(N=X)`
- **边框**：去除上/右/下边框，无网格线
- **适用**：通用数据分析、研究报告

### The Economist 风格
- **背景**：白色（非蓝灰）
- **标志**：顶部全宽红线 `#E3120B` + 左上角红色方块 tag
- **主色**：`#006BA2`（蓝），灰化对照 `#758D99`
- **对齐**：所有左对齐元素共用基准 `LEFT_X=0.14`
- **适用**：媒体发布、公开报告

### McKinsey 风格
- **配色**：亮青 `#2CBDEF` + 浅灰 `#D4D4D4` 二元对照
- **编号**：左上"Exhibit X"小灰字 + 下方全宽细分隔线
- **标题**：超大粗体（15~17pt），结论句
- **图例**：右上角，色块 + 文字纵向排列
- **柱子**：窄（`width=0.32~0.38`），数字直接写在柱上
- **适用**：咨询汇报、高管演示

---

## 二、图表选择速查

| 数据类型 | 推荐图表 |
|---------|---------|
| 趋势变化 | Line Chart |
| 类别比较 | Bar Chart |
| 占比分布（≤5项） | Pie/Donut |
| 占比分布（>5项） | Stacked Bar |
| Top vs Others | 分组柱状图（McKinsey 标配） |
| Likert-scale | 100% 堆叠单条（渐变色） |
| 相关性 | Scatter Plot |
| 层级结构 | Treemap |

完整 25 种数据类型映射见 `references/chart_selection.md`。

---

## 三、示例脚本库

所有示例都是完整可运行的 Python 脚本，改数据即用：

| 脚本 | 风格 | 图表类型 | 参考 |
|------|------|---------|------|
| `bcg_hbar.py` | BCG | 水平柱状图 | 通用调研报告 |
| `economist_hbar.py` | Economist | 水平条形图 | 类别排行对比 |
| `economist_line.py` | Economist | 折线图（时间序列） | 多系列趋势 |
| `mckinsey_grouped_vbar.py` | McKinsey | 分组垂直柱 | Exhibit 7 样式 |
| `mckinsey_grouped_hbar.py` | McKinsey | 分组水平条 | Exhibit 4 样式 |
| `mckinsey_stack100.py` | McKinsey | 100% 堆叠单条 | Exhibit 1 样式 |

---

## 四、三条常见坑

1. **禁用 `fig.add_axes`**：会与布局系统冲突。Economist 的红线/tag 用 `ax.plot + mpatches.Rectangle` 配 `fig.transFigure + clip_on=False`。

2. **禁用 `ax.set_ylabel` 放中文单位**：会伸出 `LEFT_X` 左侧破坏对齐。y 方向单位写进副标题；`set_xlabel` 可用。

3. **轴刻度 formatter 禁止含中文汉字**：字体缺失变方块。中文单位用副标题或 `set_xlabel`。

---

## 五、关键约束

- 占比数据超过 5 项时，用堆叠柱状图替代饼图
- 中文必须通过 `FontProperties` 显式设置（`/System/Library/Fonts/STHeiti Light.ttc`）
- BCG 标题含样本量 `(N=X)`；McKinsey 标题是结论句 + "Exhibit X"编号；Economist 标题是描述性短句
- 数据标签格式 `{:.1f}%` 或 `{:.2f}`（看量级）

---

## 六、与 echarts-visualization 的分工

| 维度 | data-visualization | echarts-visualization |
|------|-------------------|----------------------|
| 技术栈 | Python matplotlib | JavaScript ECharts |
| 输出 | 静态图片（PNG/SVG） | 交互式 HTML |
| 适用 | 论文、出版物、打印 | 网页、仪表盘、演示 |
| 风格 | 3 套专业咨询风格 | 自定义/品牌化 |
| 交互 | 无 | tooltip、缩放、筛选 |

两者互补而非竞争：静态出版用 data-visualization，交互展示用 echarts-visualization。
