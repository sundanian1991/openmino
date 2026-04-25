# ECharts 组件完整清单

> 基于 myagents_files/echarts.js (100K 行) 源码分析 | 2026-04-25

---

## 使用模式

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js" onload="init()"></script>
<script>
function init(){
  var N='#2c3e6b',C='#c25030',GRID='#e0e0e0',LABEL='#999';
  var chart = echarts.init(document.getElementById('id'));
  chart.setOption({ /* 配置 */ });
}
if(window.echarts) init();
</script>
```

## 颜色约束

- **禁止**默认 9 色轮播（`#5070dd, #b6d634...`）
- **默认 3 色**：主题红 `#C13531`（主数据）、主题深蓝 `#293C54`（对比/标注）、纯灰 `#CDCECD`（参考/次要）
- 辅助色：网格 `#e8ecf1`，轴标签 `#98a0ab`
- 多系列时用主题红深浅渐变：`#C13531, #d95a4e, #e76f51, #ee6c4d, #f0a090`
- `animation: false` 关掉默认动画

---

## 一、基础组件 (Basic Components)

| 组件 | 注册位置 | 用途 | 常用配置项 |
|------|----------|------|-----------|
| **Title** | 84305-84306 | 图表标题+副标题 | `text`, `subtext`, `left`, `top`, `textStyle`, `subtextStyle` |
| **Legend** | 85360-85361 | 图例（可切换系列显示） | `data`, `orient`, `x`, `y`, `selected`, `inactiveColor` |
| **ScrollableLegend** | 85903-85904 | 可滚动图例（数据多时自动分页） | `type: 'scroll'`, `pageButtonItemGap`, `pageIconColor` |
| **Tooltip** | 87572-87573 | 悬浮提示 | `trigger: 'item'/'axis'`, `formatter`, `axisPointer`, `showContent` |
| **AxisPointer** | 81208-81209 | 坐标轴指示器（Tooltip 联动） | `type: 'line'/'shadow'/'cross'`, `axis: 'auto'` |
| **Dataset** | 44155-44156 | 数据集（数据管理层） | `source`, `dimensions`, `seriesType`, `transform` |

---

## 二、坐标系 (Coordinate Systems)

| 组件 | 注册位置 | 用途 | 常用配置项 |
|------|----------|------|-----------|
| **Grid** | 53923-53929 | 直角坐标系网格（含 xAxis/yAxis 自动创建） | `left`, `top`, `right`, `bottom`, `containLabel`；依赖 xAxis/yAxis |
| **Polar** | 82509-82515 | 极坐标系（含 angleAxis/radiusAxis 自动创建） | `center`, `radius`；依赖 radiusAxis & angleAxis |
| **Radar** | 55915-55916 | 雷达图坐标系 | `indicator`, `radiusAxis`, `angleAxis` |
| **Geo** | 66356-66357 | 地理坐标系（地图） | `map`, `roam`, `zoom`, `center` |
| **Parallel** | 73741-73746 | 平行坐标系（含 parallelAxis） | `parallelAxis`, `layout`；依赖 parallelAxis |
| **SingleAxis** | 83124-83127 | 单轴坐标系（河流图/甘特图） | `type`, `dimension`, `orient` |
| **Calendar** | 84107-84108 | 日历坐标系（考勤/活跃度） | `range`, `cellSize`, `itemStyle`, `dayLabel`, `monthLabel`, `yearLabel` |
| **CartesianAxis** | 50458-50475 | 直角坐标轴基类 | 通过 Grid 自动注册为 xAxis / yAxis |
| **PolarAxis** | 81272-81321 | 极坐标轴基类 | 通过 Polar 自动注册为 angleAxis / radiusAxis |
| **ParallelAxisModel** | 72618-72697 | 平行坐标轴 | `dim`, `type`, `name`, `max`, `min` |

---

## 三、交互组件 (Interaction Components)

| 组件 | 注册位置 | 用途 | 常用配置项 |
|------|----------|------|-----------|
| **MarkPoint** | 88230-88231 | 标注点（最大值/最小值/自定义） | `data`, `symbol`, `symbolSize`, `itemStyle`, `label` |
| **MarkLine** | 88644-88645 | 标注线（目标线/平均线） | `data`, `symbol`, `lineStyle`, `label`, `type: 'average'/'max'/'min'` |
| **MarkArea** | 89053-89054 | 标注区域（时间区间高亮） | `data`, `itemStyle`, `label`, `silent` |
| **Toolbox** | 97933-97934 | 工具栏（保存/数据视图/缩放） | `feature: {saveAsImage, dataView, dataZoom, restore, magicType, brush}` |
| **Brush** | 93883-93884 | 区域选择（刷选） | `brushType`, `brushMode`, `xAxisIndex`, `yAxisIndex`, `geoIndex` |
| **DataZoom (Inside)** | 91705-91706 | 内置数据区域缩放（鼠标滚轮） | `filterMode`, `xAxisIndex`, `yAxisIndex` |
| **DataZoom (Slider)** | 92690-92691 | 滑动条数据区域缩放 | `type: 'slider'`, `start`, `end`, `orient`, `zoomLock` |
| **DataZoom (Select)** | 96474-96475 | 选择框数据区域缩放 | `type: 'select'`, `brushStyle` |
| **Timeline** | 90222-90223 | 时间线轮播组件 | `axisType`, `data`, `playInterval`, `autoPlay`, `controlPosition` |
| **VisualMap (Continuous)** | 95772-95773 | 视觉映射-连续型 | `type: 'continuous'`, `min`, `max`, `inRange`, `calculable` |
| **VisualMap (Piecewise)** | 96428-96429 | 视觉映射-分段型 | `type: 'piecewise'`, `pieces`, `splitNumber`, `categories` |
| **AxisPointer** | 81208-81209 | 坐标轴指示器 | `type: 'line'/'shadow'/'cross'`, `snap`, `label` |

---

## 四、装饰组件 (Graphic Components)

| 组件 | 注册位置 | 用途 | 常用配置项 |
|------|----------|------|-----------|
| **Graphic** | 98563-98564 | 原生图形元素（自定义装饰） | `type: 'group'/'image'/'text'/'circle'/'rect'` |

---

## 五、图表类型 (Series / Chart Types)

共 **21 种图表类型**，全部通过 `registerSeriesModel()` 注册：

| 图表类型 | 注册行 | 全称 type 值 | 用途 | 依赖坐标系 | 常用配置项 |
|----------|--------|-------------|------|-----------|-----------|
| **Bar** | 45968 / 44444 | `series.bar` | 柱状/条形图 | grid, polar | `barWidth`, `barGap`, `barCategoryGap`, `stack`, `showBackground` |
| **Line** | 48522 / 46055 | `series.line` | 折线图 | grid, polar | `smooth`, `step`, `areaStyle`, `symbol`, `lineStyle`, `connectNulls` |
| **Pie** | 49867 / 49731 | `series.pie` | 饼图/环形图 | 无 | `radius`, `center`, `roseType`, `label`, `itemStyle`, `selectedMode` |
| **Scatter** | 53943 / 49926 | `series.scatter` | 散点图 | grid, polar, geo, singleAxis, calendar | `symbolSize`, `symbol`, `large` |
| **EffectScatter** | 54272 / 54227 | `series.effectScatter` | 带涟漪动画散点图 | grid, polar | `effect`, `ripple`, `symbol` |
| **Candlestick** | 55052 / 54826 | `series.candlestick` | K线图（股票） | grid (xAxis, yAxis) | `itemStyle: {color, borderColor, color0, borderColor0}` |
| **Radar** | 55934 / 55408 | `series.radar` | 雷达图 | radar | `indicator`, `radarIndex`, `areaStyle`, `symbol` |
| **Heatmap** | 56448 / 56422 | `series.heatmap` | 热力图 | grid, geo, calendar, matrix | `itemStyle`, `blurSize`, `minAlpha` |
| **Tree** | 59272 / 58963 | `series.tree` | 树图 | grid | `layout: 'orthogonal'/'radial'`, `orient`, `symbol`, `leaves` |
| **Treemap** | 62111 / 59501 | `series.treemap` | 矩形树图 | 无 | `nodeClick`, `roam`, `levels`, `breadcrumb` |
| **Sunburst** | 63002 / 62662 | `series.sunburst` | 旭日图 | 无 | `nodeClick`, `levels`, `radius` |
| **Map** | 66469 / 65459 | `series.map` | 地图 | geo | `map`, `roam`, `zoom`, `selectedMode`, `mapValueCalculation` |
| **Lines** | 68455 / 68335 | `series.lines` | 线图（流向/路径） | grid, polar, geo, calendar | `coordinateSystem`, `polyline`, `lineStyle`, `effect` |
| **Graph** | 70907 / 70820 | `series.graph` | 关系图 | grid, polar, geo, singleAxis, calendar | `layout: 'none'/'force'/'circular'`, `categories`, `roam` |
| **Boxplot** | 71420 / 71000 | `series.boxplot` | 箱线图 | grid (xAxis, yAxis) | `boxWidth`, `itemStyle` |
| **Parallel** | 73754 / 71663 | `series.parallel` | 平行坐标图 | parallel | `lineStyle`, `inactiveOpacity` |
| **Gauge** | 74519 / 74389 | `series.gauge` | 仪表盘 | 无 | `startAngle`, `endAngle`, `radius`, `axisLine`, `axisTick`, `pointer`, `anchor` |
| **Funnel** | 75143 / 74751 | `series.funnel` | 漏斗图 | 无 | `sort: 'descending'/'ascending'/'none'`, `gap`, `label` |
| **Sankey** | 76262 / 75648 | `series.sankey` | 桑基图 | 无 | `layoutIteration`, `levels`, `lineStyle`, `label` |
| **ThemeRiver** | 76826 / 76666 | `series.themeRiver` | 主题河流图 | singleAxis | `boundaryGap`, `itemStyle` |
| **PictorialBar** | 77536 / 77499 | `series.pictorialBar` | 象形柱状图 | grid | `symbol`, `symbolSize`, `symbolRepeat`, `symbolRotate` |
| **Custom** | 79756 / 77588 | `series.custom` | 自定义渲染系列 | grid, polar, geo, singleAxis, calendar | `renderItem` 函数 |

---

## 六、统计总结

| 分类 | 数量 | 备注 |
|------|------|------|
| 基础组件 | 6 | Title, Legend, ScrollableLegend, Tooltip, AxisPointer, Dataset |
| 坐标系 | 11 | Grid, Polar, Radar, Geo, Parallel, SingleAxis, Calendar, 3 种 Axis 模型 |
| 交互组件 | 11 | MarkPoint, MarkLine, MarkArea, Toolbox, Brush, 3 种 DataZoom, Timeline, 2 种 VisualMap |
| 装饰组件 | 1 | Graphic |
| 图表类型 | 21 | 全部 series |
| **合计** | **50** | |

---

## 七、供应商管理常用组合

| 场景 | 图表 | 组件搭配 |
|------|------|----------|
| 达标率趋势 | line | Title + Legend + MarkLine（目标线） |
| 产能对比 | bar | Title + MarkPoint（最高值标注） |
| 供应商分布 | pie | Title + Dataset |
| 质量 × 准时率 | scatter | Title + Brush（框选关注供应商） |
| 月度数据缩放 | line + bar | DataZoom（滑块查看历史） |
| 多期对比 | line | Timeline（季度轮播） |
| 供应商分级 | bar + VisualMap | VisualMap（颜色映射评级） |

---

## 八、全局配置模板

```js
var baseTheme = {
  color: ['#C13531', '#293C54', '#CDCECD'],
  backgroundColor: 'transparent',
  animation: false,
  textStyle: { fontFamily: 'system-ui, sans-serif', fontSize: 11 },
  tooltip: { textStyle: { fontSize: 10 } },
  grid: { top: 10, right: 14, bottom: 22, left: 36 },
  xAxis: {
    axisLine: { lineStyle: { color: '#e8ecf1' } },
    axisLabel: { color: '#98a0ab', fontSize: 9 },
    splitLine: { show: false }
  },
  yAxis: {
    axisLine: { show: false },
    splitLine: { lineStyle: { color: '#e8ecf1', type: 'dashed', width: 0.5 } },
    axisLabel: { color: '#98a0ab', fontSize: 9 }
  },
  legend: { textStyle: { fontSize: 10, color: '#98a0ab' } }
};
```
