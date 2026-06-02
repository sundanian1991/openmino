# spec.md — 渲染契约

## 数据集：93-气象-全球极端天气事件统计

---

## 图表 A：灾害趋势双轴图

### 叙事意图
- **可视化目的**：展示极端天气灾害5年变化趋势，揭示"频率趋稳但损失攀升"的背离现象
- **核心信息**：灾害数量从2021年峰值432回落至390区间，但十亿美元灾害从22起升至28起
- **结论**：气候变化正在让极端天气变得更昂贵，而非更频繁
- **思路**：双Y轴折线图，灰线表频率、红线表损失，两条线在2022年后形成明显交叉背离

### 视觉执行
- **模式选择**：07-折线图 → viz-echarts multi_line
- **标题**（结论性）：极端天气灾害5年趋势：数量趋稳但经济损失持续攀升
- **副标题**：2020-2024年 · 数据来源 EM-DAT + NOAA
- **视觉编码**：
  - X轴：年份（2020-2024）
  - Y1轴（左）：自然灾害事件数（范围350-450），灰色线
  - Y2轴（右）：美国十亿美元灾害数（范围15-30），暖色线
  - 颜色：灰线=事件数，暖色线=十亿美元灾害，红色高亮=2024年峰值
- **数据组织**：5年 × 2核心指标，按时间顺序
- **标注策略**：
  - 2024年十亿美元灾害点标注"28起，5年最高"
  - 2021年事件数点标注"432，频率峰值"
  - 标注写原因不堆数字
- **高亮**：2024年数据点（红色圆圈），高亮比例 = 2/10 = 20%
- **配色**：事件线#8E8E93，损失线#E8875F，高亮#C0392B，背景#FFFFFF

### 渲染契约 JSON（图表 A）

```json
{"version":"viz-design-spec-v1","renderTarget":"viz-echarts","chartType":"multi_line","title":"极端天气灾害5年趋势：数量趋稳但经济损失持续攀升","subtitle":"2020-2024年 · 数据来源 EM-DAT + NOAA","canvas":{"width":800,"height":550},"data":{"fields":["year","disaster_events","us_billion_dollar_disasters"],"series":[{"name":"自然灾害事件数","values":[[2020,416],[2021,432],[2022,387],[2023,399],[2024,393]],"highlight":false,"yAxisIndex":0},{"name":"美国十亿美元灾害","values":[[2020,22],[2021,20],[2022,18],[2023,28],[2024,27]],"highlight":true,"yAxisIndex":1}]},"visualEncoding":{"highlight":[{"point":"2024年十亿美元灾害","color":"#C0392B","reason":"5年最高损失"}],"grayscale":true,"maxHighlightRatio":0.1,"seriesColors":{"自然灾害事件数":"#8E8E93","美国十亿美元灾害":"#E8875F"}},"annotations":[{"text":"432起，频率峰值","x":2021,"y":432,"position":"top"},{"text":"28起，5年最高","x":2024,"y":28,"position":"top","emphasis":true}],"referenceLines":[],"theme":"default","layout":{"padding":{"top":20,"right":60,"bottom":40,"left":60},"yAxisDual":true,"yAxisLeft":{"name":"事件数","min":350,"max":450},"yAxisRight":{"name":"十亿美元灾害","min":15,"max":30}}}
```

---

## 图表 B：2024极端天气快照

### 叙事意图
- **可视化目的**：用2024年关键指标快照呈现极端天气的"前所未有"规模
- **核心信息**：2024年全球报告617起极端天气事件，其中152达"前所未有"级别，温度距平+1.55°C突破巴黎协定红线
- **结论**：2024年多项指标突破历史纪录，气候变化已从未来风险变为当下现实
- **思路**：垂直柱状图展示5个关键指标，温度距平用红色突出（唯一超越阈值的指标）

### 视觉执行
- **模式选择**：13-柱状图 → viz-echarts bar_chart
- **标题**（结论性）：2024年全球极端天气快照：多项指标突破历史纪录
- **副标题**：数据来源 WMO 2024年气候状况报告
- **视觉编码**：
  - X轴：5个指标类别
  - Y轴：数值（因量级差异巨大，使用独立标注）
  - 颜色：温度距平柱红色警报，其余灰色
- **数据组织**：5个指标，按重要性排列
- **标注策略**：
  - 温度距平标注"突破巴黎协定1.5°C目标"
  - 前所未有事件标注"占总数25%"
- **高亮**：温度距平柱（红色），高亮比例 = 1/5 = 20%
- **配色**：普通柱#8E8E93，高亮柱#E8875F，温度柱#C0392B

### 渲染契约 JSON（图表 B）

```json
{"version":"viz-design-spec-v1","renderTarget":"viz-echarts","chartType":"bar_chart","title":"2024年全球极端天气快照：多项指标突破历史纪录","subtitle":"数据来源 WMO 2024年气候状况报告","canvas":{"width":800,"height":550},"data":{"fields":["category","value","unit"],"series":[{"name":"关键指标","values":[{"category":"极端天气事件","value":617,"unit":"起"},{"category":"前所未有事件","value":152,"unit":"起"},{"category":"气候变化致因死亡","value":3700,"unit":"人"},{"category":"温度距平","value":1.55,"unit":"°C"},{"category":"灾害损失","value":1820,"unit":"十亿美元"}],"highlight":true}]},"visualEncoding":{"highlight":[{"item":"温度距平","color":"#C0392B","reason":"突破巴黎协定1.5°C红线"},{"item":"前所未有事件","color":"#E8875F","reason":"占总事件25%"}],"grayscale":true,"maxHighlightRatio":0.1,"categoryColors":{"极端天气事件":"#8E8E93","前所未有事件":"#E8875F","气候变化致因死亡":"#8E8E93","温度距平":"#C0392B","灾害损失":"#8E8E93"}},"annotations":[{"text":"突破巴黎协定1.5°C目标","target":"温度距平","position":"top","emphasis":true},{"text":"占总事件25%","target":"前所未有事件","position":"top"}],"referenceLines":[{"value":1.5,"label":"巴黎协定红线","axis":"y"}],"theme":"default","layout":{"padding":{"top":20,"right":20,"bottom":60,"left":20},"xAxisType":"category"}}
```
