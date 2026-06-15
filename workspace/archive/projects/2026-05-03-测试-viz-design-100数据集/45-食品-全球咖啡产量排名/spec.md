# Phase 3 — 渲染契约 SPEC

## 可视化目的

让读者在 3 秒内感受到巴西在全球咖啡产量中的绝对主导地位，理解"一超多强"的全球格局。

## 想传达什么

巴西是全球咖啡生产的绝对霸主，产量超过第 2-3 名之和。

## 结论

全球咖啡供应链高度集中在少数几个生产国，巴西的战略地位不可替代。

## 思路

选水平柱状图因为排行数据天然有序，水平布局让国家名可读。高亮仅巴西，其余灰度，利用色彩作为信号而非装饰。

---

## 模式选择

- **模式编号**：13 — 柱状图
- **渲染技能**：viz-echarts → bar_chart
- **匹配理由**：15 国产量排行，典型的"谁多谁少"分类对比，柱状图是最小最优方案

## 标题

- **主标题**：巴西主导全球咖啡生产，产量超第 2-3 名之和
- **副标题**：2023/24 年度 · 全球 TOP15 咖啡生产国

## 视觉编码

- **Y 轴**：国家名称（15 国，降序排列）
- **X 轴**：产量（单位：千袋 60kg）
- **颜色**：巴西 #E8875F（Warm 橙色），其余 #CCCCCC（灰色）
- **大小**：柱子长度编码产量数值

## 数据组织

- **字段**：country（国家）、production（产量千袋）、variety（主要品种）
- **排序**：按产量降序
- **聚合**：无聚合，原始排行数据

## 标注策略

- **高亮**：仅巴西（1/15 = 6.7%）
- **标注**：在巴西柱子末端标注"超 2-3 名之和"
- **脚注**：全球总产量 1.78 亿袋，消费量 1.72 亿袋，供大于求

## 布局

- **画布**：800 × 550
- **Padding**：top 60, right 40, bottom 80, left 120
- **标题位置**：顶部居中
- **配色**：Warm 色系，1 色 ramp

---

## 渲染契约（机器可读）

```json
{"version":"viz-design-spec-v1","renderTarget":"viz-echarts","chartType":"bar_chart","title":"巴西主导全球咖啡生产，产量超第2-3名之和","subtitle":"2023/24年度 · 全球TOP15咖啡生产国","canvas":{"width":800,"height":550},"data":{"fields":["country","production"],"series":[{"name":"产量(千袋)","values":[{"country":"巴西","value":66400},{"country":"越南","value":29000},{"country":"哥伦比亚","value":12500},{"country":"印度尼西亚","value":11500},{"country":"埃塞俄比亚","value":8500},{"country":"洪都拉斯","value":6200},{"country":"印度","value":6000},{"country":"乌干达","value":5500},{"country":"秘鲁","value":4200},{"country":"墨西哥","value":4000},{"country":"危地马拉","value":3800},{"country":"尼加拉瓜","value":2800},{"country":"科特迪瓦","value":2500},{"country":"哥斯达黎加","value":1800},{"country":"巴布亚新几内亚","value":1200}],"highlight":true}]},"visualEncoding":{"highlight":[{"series":"巴西","color":"#E8875F"}],"grayscale":true,"maxHighlightRatio":0.1},"annotations":[{"text":"超第2-3名之和","target":"巴西"}],"referenceLines":[],"theme":"default","layout":{"padding":{"top":60,"right":40,"bottom":80,"left":120}}}
```

## Source ID 追溯

| 决策项 | 来源 |
|--------|------|
| 模式选择 | viz-design SKILL.md §五 决策树 → 柱状图(13) |
| 高亮策略 | 13-VISUALIZATION.md → 颜色是信号不是装饰 |
| 色系 | 13-VISUALIZATION.md → 默认 Warm |
| 标题规范 | 13-VISUALIZATION.md → 标题写结论不写描述 |
| 高亮比例 | viz-design SKILL.md → 高亮 ≤10% |
