# ECharts 手法对照表

> 从年老师已验证的可视化产出中提取的标准化配置手法。
> 渲染管线和测试体系直接消费此文件，作为"商业级可落地"的配置基准。

---

## 基础主题（baseTheme）

所有图表共享此基础，继承后按需覆盖：

```js
const WARM = '#c26d3a';   // 主色
const STONE = '#857d74';  // 辅色
const TEAL = '#2e8b6e';   // 强调色
const GRID = '#f2f0eb';   // 网格线
const LABEL = '#857d74';  // 标签文字

const baseTheme = {
  color: [WARM, STONE, TEAL],
  backgroundColor: 'transparent',
  animation: false,
  textStyle: { fontFamily: 'system-ui, sans-serif' },
  grid: { top: 10, right: 14, bottom: 22, left: 36 },
  xAxis: {
    axisLine: { lineStyle: { color: '#ada599' } },
    splitLine: { show: false },
    axisLabel: { color: LABEL, fontSize: 11 }
  },
  yAxis: {
    axisLine: { show: false },
    splitLine: { lineStyle: { color: GRID, type: 'dashed' } },
    axisLabel: { color: LABEL, fontSize: 11 }
  },
  legend: { textStyle: { fontSize: 10, color: LABEL } },
  tooltip: { textStyle: { fontSize: 10 } }
};
```

---

## 手法 → 配置对照

### 1. 去网格 / 极简坐标轴

| 手法 | 配置 | 说明 |
|------|------|------|
| Y 轴轴线隐藏 | `yAxis.axisLine: { show: false }` | 默认隐藏 |
| X 轴轴线低饱和 | `xAxis.axisLine: { lineStyle: { color: '#ada599' } }` | 保留但弱化 |
| X 轴网格隐藏 | `xAxis.splitLine: { show: false }` | 默认隐藏 |
| Y 轴网格虚线化 | `yAxis.splitLine: { lineStyle: { color: '#f2f0eb', type: 'dashed' } }` | 极浅虚线 |
| 紧凑间距 | `grid: { top:10, right:14, bottom:22, left:36 }` | 最小留白 |

### 2. 统一配色

| 手法 | 配置 | 说明 |
|------|------|------|
| 全局色板 | `color: ['#c26d3a', '#857d74', '#2e8b6e']` | Warm/Stone/Teal 三色 |
| 柱状图渐变 | `itemStyle: { color: (p) => gradient[p.dataIndex] }` | 按 dataIndex 渐变 |
| 饼图指定色 | `itemStyle: { color: (p) => [WARM, STONE, TEAL][p.dataIndex] }` | 逐项指定 |
| 高亮单色 | `itemStyle: { color: WARM }` + 其余 STONE | 突出一项 |

### 3. 重点标记

| 手法 | 配置 | 适用 |
|------|------|------|
| 均值参考线 | `markLine: { data: [{ type: 'average' }], lineStyle: { color: STONE, type: 'dashed' } }` | 折线图 |
| 目标线（固定值） | `markLine: { data: [{ yAxis: 90 }], lineStyle: { type: 'dashed' } }` | 柱状图/折线图 |
| 高亮区域 | `markArea: { data: [[{ xAxis: 85 }, { xAxis: 100 }]], itemStyle: { color: 'rgba(194,109,58,0.08)' } }` | 散点图/折线图 |
| 目标线（独立 series） | `{ type:'line', data:[90,90,...], lineStyle:{type:'dashed'}, symbol:'none' }` | 折线图（更灵活） |

### 4. 标注样式

| 手法 | 配置 | 说明 |
|------|------|------|
| 柱顶数值 | `label: { show: true, position: 'top', color: LABEL, fontSize: 10 }` | 排名类常用 |
| 轴线名称 | `name: '达标率(%)', nameTextStyle: { color: LABEL }` | 需要单位时 |
| 轴线范围锁定 | `min: 60, max: 100` | 防止自动缩放 |
| 饼图标签 | `label: { color: LABEL, fontSize: 10 }` | 直接标注 |
| 仪表盘数值 | `detail: { offsetCenter: [0, '45%'], color: WARM, fontSize: 28, fontWeight: 600 }` | 大号居中 |

### 5. 画布布局

| 手法 | 配置 | 说明 |
|------|------|------|
| 紧凑 grid | `grid: { top:10, right:14, bottom:22, left:36 }` | 单图默认 |
| 饼图居中 | `center: ['50%', '55%']` | X 居中 Y 偏下 |
| 饼图环形 | `radius: ['40%', '65%']` | 环形饼图 |
| 柱宽固定 | `barWidth: 32` | 控制柱宽 |
| 双 Y 轴 | `yAxis: [{ name:'金额(万)' }, { name:'达标率%', position:'right' }]` | 双轴场景 |

### 6. 系列通用

| 手法 | 配置 | 说明 |
|------|------|------|
| 平滑折线 | `smooth: true, lineStyle: { width: 2.5 }` | 趋势图 |
| 隐藏数据点 | `symbol: 'none'` | 目标线/参考线 |
| 数据点圆点 | `symbol: 'circle', symbolSize: 6` | 需要标注点时 |
| 堆叠 | `stack: 's'` | 同 stack 值自动堆叠 |
| 关闭动画 | `animation: false` | 静态图输出 |

---

## 8 种图表类型的关键配置

| 图表 | 核心配置 |
|------|---------|
| **折线图** | `smooth:true` + markLine 均值 + 目标线独立 series（虚线） |
| **柱状图** | `barWidth:32` + itemStyle.color 渐变 + label 顶部数值 |
| **饼图** | `radius:['40%','65%']` 环形 + `center:['50%','55%']` 居中 |
| **散点图** | `min/max` 锁定范围 + markLine 十字线 + markArea 高亮区 |
| **双轴图** | `yAxis` 数组 + `yAxisIndex` 绑定 series |
| **堆叠柱状** | `stack:'s'` + 每个 series 独立 itemStyle.color |
| **桑基图** | `lineStyle:{color:'gradient',curveness:0.5}` |
| **仪表盘** | `startAngle:200,endAngle:-20` + axisLine 三段色 + detail 大字号 |

---

## 验证清单

渲染管线出图后，对照此清单逐项检查：

| # | 检查项 | 标准 | 来源 |
|---|--------|------|------|
| 1 | Y 轴轴线 | 隐藏（show: false） | baseTheme |
| 2 | X 轴网格 | 隐藏（show: false） | baseTheme |
| 3 | Y 轴网格 | 虚线 + #f2f0eb | baseTheme |
| 4 | 配色 | Warm/Stone/Teal 三色系 | baseTheme |
| 5 | 标题 | 结论性（不是描述性） | SPEC 规范 |
| 6 | 高亮 | ≤10%，单色系突出 | 通用原则 |
| 7 | 标注 | 写原因+幅度，不写数字 | SPEC 规范 |
| 8 | 动画 | 关闭（animation: false） | baseTheme |
| 9 | 字体 | system-ui, sans-serif | baseTheme |
| 10 | 间距 | grid 紧凑（top:10/right:14） | baseTheme |
| 11 | 单色高亮 | ≥5 系列时仅 1 个 Warm 色，其余 Stone | 前注意觉：色相弹出 |
| 12 | 编码优先级 | X/Y > 颜色 > 大小，最重要维度用位置 | 前注意觉：位置优势 |
| 13 | 闭合上限 | legend/icon 形状 ≤ 6 种，超过用分组 | 格式塔：闭合律 |
| 14 | 组间距 | 组间距 ≥ 2× 组内间距（barGap:'30%',barCategoryGap:'60%'） | 格式塔：邻近律 |
| 15 | 标注线限制 | markLine/markArea 最多 4 条 | 认知负荷：通道容量 |
| 16 | 数据密度 | 单图数据点 ≤ 50，系列 ≤ 7 | 认知负荷：米勒 7±2 |

---

## 前注意觉 + 格式塔 + 认知负荷

> 来源：`docs/工具箱/可视化/用数据说服-视觉实践手册.html`
> 渲染管线已硬编码 autoHighlight / deNoise / resolveRampColor，以下为 AI 选型时的决策规则。

| # | 规则 | ECharts 落地 | 硬编码位置 |
|---|------|-------------|-----------|
| 7.1 | 单色高亮：视觉系统对色相差异前注意觉处理 | ≥5 系列 → `autoHighlight()` | render-viz-design-spec.js |
| 7.2 | 位置 > 颜色 > 大小：空间编码最强 | mapping.x/y 放最重要维度，color 放次维度 | AI 选型规则 |
| 7.3 | 闭合上限：>6 个形状无法并行处理 | legend.data ≤ 6，超过合并为"其他" | AI 选型规则 |
| 7.4 | 邻近 > 相似：空间距离是最强分组信号 | `barGap:'30%'`, `barCategoryGap:'60%'` | `deNoise()` |
| 7.5 | 连接线 < 4：每条额外连线增加认知负荷 | markLine ≤ 2, markArea ≤ 1 | `deNoise()` |
| 7.6 | 米勒 7±2：单图不超过 7 个系列 | 系列 > 7 时拒绝并建议拆图 | AI 选型规则 |
