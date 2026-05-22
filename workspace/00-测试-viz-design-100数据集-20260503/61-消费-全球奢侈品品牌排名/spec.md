# Compiled SPEC — 61-消费-全球奢侈品品牌排名

> 渲染契约。viz-echarts 按此执行。

---

## Page: 全球奢侈品品牌价值排名

- **场景论文**：从 storyboard 继承 — 排行榜式直叙
- **签名视觉元素**：横向柱状图 + LVMH 同色系标识 + Chanel 增长箭头
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要集团归属色彩分组 + 单品牌增长标注

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者看到排名，但看不到背后的集团博弈。看完后理解 LVMH 以多品牌策略覆盖奢侈品各细分赛道

**【想传达什么】**
- 核心信息（一句话）：保时捷品牌价值第一，LVMH 以集团军之势统治 TOP 15

**【结论】**
- 读者应得出的判断：奢侈品行业品牌价值高度集中，集团化运营（LVMH 3 牌入围）是主流策略，但独立品牌（Porsche）仍可凭单品登顶

**【思路】**
- 视觉叙事路径：第一眼 Porsche 领跑 → 第二眼 LVMH 三牌同色 → 第三眼断崖递减看清头部集中度

### 视觉编码

- **Y 轴编码**：品牌名称（从上到下递减排列），横向排列保证中文品牌名可读
- **X 轴编码**：品牌价值（亿美元），柱长映射绝对值
- **颜色编码**：Porsche 用 Warm 主色高亮（第一名），Chanel 用 Accent 绿色（+45% 增速标注），LVMH 旗下三品牌用同一浅色变体暗示关联，其余 Stone 灰化
- **大小编码**：柱宽统一，不用大小编码

### 数据组织

- **字段清单**：brand（品牌名）、value（品牌价值，亿美元）、group（所属集团）
- **排序规则**：按品牌价值从高到低
- **聚合规则**：不聚合，原始 15 条数据

### 标注策略

- **高亮点**（≤10%）：Porsche（榜首）、Chanel（增速）
- **标注内容**：Porsche 标注"品牌价值榜首"，Chanel 标注"同比+45%增速"
- **基准线/参考线**：无

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，结论性标题 | 一句话定调 |
| 核心数据区 | 15 条横向柱，递减排列 | 排名关系一目了然 |
| 高亮元素 | Porsche Warm 色，Chanel 绿色 | 引导视线到关键洞察 |
| 次要元素 | Stone 灰化 | 不抢高亮风头 |

### 布局

- **画布**：800 × 550
- **标题区**：顶部居中，16px/600/Warm800
- **图表区**：标题下方，占比 80%
- **标注区**：柱端右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要
- **脚注**：数据来源：2025 年全球奢侈品品牌价值排名
- **特殊说明**：Chanel 品牌价值含 +45% 增速标注

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 分类对比 |
| 风格选择 | restrained-warm | style-schools.md | 克制暖色 |
| 配色选择 | Warm + Stone | color-themes.md | 2-ramp |
| 构图选择 | 单列横向条 | composition-templates.md | 排行榜式 |

## 渲染委托

**渲染技能**：viz-echarts

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "保时捷品牌价值登顶，LVMH以3牌入局掌控奢侈品版图",
  "subtitle": "2025年 · 全球TOP15奢侈品品牌",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["brand", "value"],
    "series": [
      { "name": "Porsche（保时捷）", "values": [411], "highlight": true },
      { "name": "Chanel（香奈儿）", "values": [379], "highlight": false },
      { "name": "Louis Vuitton", "values": [310], "highlight": false },
      { "name": "Gucci（古驰）", "values": [180], "highlight": false },
      { "name": "Hermes（爱马仕）", "values": [170], "highlight": false },
      { "name": "Dior（迪奥）", "values": [140], "highlight": false },
      { "name": "Rolex（劳力士）", "values": [130], "highlight": false },
      { "name": "Cartier（卡地亚）", "values": [120], "highlight": false },
      { "name": "Tiffany & Co.", "values": [90], "highlight": false },
      { "name": "Prada（普拉达）", "values": [80], "highlight": false },
      { "name": "Burberry（博柏利）", "values": [55], "highlight": false },
      { "name": "Coach（蔻驰）", "values": [50], "highlight": false },
      { "name": "Versace（范思哲）", "values": [45], "highlight": false },
      { "name": "Omega（欧米茄）", "values": [40], "highlight": false },
      { "name": "Fendi（芬迪）", "values": [38], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "Porsche（保时捷）", "color": "#c26d3a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "品牌价值榜首", "target": "Porsche（保时捷）" },
    { "text": "同比+45%增速", "target": "Chanel（香奈儿）" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
