# ECharts 图标库

> 来源：echarts.apache.org 官网示例页（chart-types/） + 手动复刻（components/）
> 配色：三色体系 — 红色 `#c13531` 为主，深蓝 `#293c54` 为辅，纯灰 `#cdcecd` 中性

---

## chart-types/ — 图表类型图标（28 个，从官网提取）

| 文件名 | 图表类型 | 中文名 |
|--------|---------|--------|
| bar.svg | bar | 柱状图 |
| boxplot.svg | boxplot | 箱线图 |
| calendar.svg | calendar | 日历图 |
| candlestick.svg | candlestick | K线图 |
| custom.svg | custom | 自定义系列 |
| dataset.svg | dataset | 数据集 |
| datazoom.svg | dataZoom | 数据缩放 |
| drag.svg | drag | 拖拽交互 |
| funnel.svg | funnel | 漏斗图 |
| gauge.svg | gauge | 仪表盘 |
| geo.svg | map | 地图 |
| gl.svg | GL | 3D 渲染 |
| globe.svg | globe | 地球仪 |
| graph.svg | graph | 关系图 |
| heatmap.svg | heatmap | 热力图 |
| line.svg | line | 折线图 |
| lines.svg | lines | 流向图 |
| parallel.svg | parallel | 平行坐标 |
| pictorialbar.svg | pictorialBar | 象形柱图 |
| pie.svg | pie | 饼图 |
| radar.svg | radar | 雷达图 |
| rich.svg | rich | 富文本 |
| sankey.svg | sankey | 桑基图 |
| scatter.svg | scatter | 散点图 |
| sunburst.svg | sunburst | 旭日图 |
| themeriver.svg | themeRiver | 主题河流 |
| tree.svg | tree | 树图 |
| treemap.svg | treemap | 矩形树图 |

---

## components/ — 组件图标（12 个，手动复刻）

| 文件名 | 组件名 | 中文名 |
|--------|-------|--------|
| title.svg | title | 标题 |
| legend.svg | legend | 图例 |
| tooltip.svg | tooltip | 提示框 |
| grid.svg | grid | 网格 |
| xAxis.svg | xAxis | X 轴 |
| yAxis.svg | yAxis | Y 轴 |
| dataZoom.svg | dataZoom | 数据区域缩放 |
| markPoint.svg | markPoint | 标记点 |
| markLine.svg | markLine | 标记线 |
| visualMap.svg | visualMap | 视觉映射 |
| timeline.svg | timeline | 时间线 |
| toolbox.svg | toolbox | 工具箱 |

---

## 配色体系（三色主题）

| 色值 | 名称 | 用途 |
|------|------|------|
| `#c13531` | 主题红 | 图标主色、标题、强调、高值数据、第一系列 |
| `#293c54` | 深蓝 | 图标辅色、对比元素、中值数据、第二系列 |
| `#cdcecd` | 纯灰 | 参考线、低值数据、次要信息、第三系列 |
| `#e8ecf1` | 浅灰蓝 | 分割线、网格线 |
| `#98a0ab` | 中灰 | 文字颜色 |

**搭配原则**：图标/标题/导航用 `#c13531` 主色；辅助信息/对比元素用 `#293c54`；层次用 `#cdcecd` 中性灰；多系列按 红→深蓝→纯灰 循环。
