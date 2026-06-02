# Compiled SPEC — 可视化编译规格

> 渲染契约。渲染技能按此执行。

## Page: 全球最难买房城市 TOP20

- **场景论文**：用横向柱状图揭示"中国 3 城霸占 TOP3，深圳是纽约的 3 倍"
- **签名视觉元素**：TOP3 Warm 色高亮 + 梯队虚线分隔
- **签名视觉元素 source id**：DNA-013 + Custom
- **为什么不能简化为默认模板**：需要梯队分组标注和 TOP3 国别高亮

### 叙事意图

**【可视化目的】**
- 认知缺口：读者知道香港房价高，但不知道深圳/北京/上海全部进入全球最难买房 TOP3

**【想传达什么】**
- 核心信息：中国 3 城包揽全球购房负担 TOP3，深圳的房价收入比是纽约/东京的约 3 倍

**【结论】**
- 读者应得出的判断：中国一线城市的住房负担能力处于全球极端水平

**【思路】**
- 第一眼看到 TOP3 中国城市的超长条 → 第二眼看到梯队分组（超高/高/中等/合理）→ 最终理解亚洲城市占据不负担顶部

### 视觉编码

- **X 轴编码**：房价收入比（数值越大越难负担）
- **Y 轴编码**：城市名称（20 个城市，按比值降序排列）
- **颜色编码**：中国 3 城 Warm 色（`#c26d3a`）高亮，其余 Stone 色（`#857d74`），亚洲其他国家 Teal（`#2e8b6e`）
- **大小编码**：无

### 数据组织

- **字段清单**：城市、房价收入比（取区间中值）、国家/地区
- **排序规则**：房价收入比降序
- **聚合规则**：区间值取中值（如 32-38 → 35）
- **数据示例**：香港:35, 深圳:32.5, 北京:30.5

### 标注策略

- **高亮点**（≤10%）：仅 TOP3（香港、深圳、北京）
- **标注内容**：中国 3 城霸占 TOP3（深圳 = 3 倍纽约）
- **基准线/参考线**：国际合理线（房价收入比 = 6）

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中 16px/600 Warm800 | 结论性标题 |
| 核心数据区 | 横向柱状，降序排列 | 排行天然阅读方向 |
| 高亮元素 | TOP3 Warm 色，其余 Stone | 视觉冲击在顶部 |
| 次要元素 | 梯队分隔虚线 | 辅助理解分层 |

### 布局

- **画布**：800 × 550
- **标题区**：顶部，16/600
- **图表区**：居中，占比 80%
- **标注区**：TOP3 右侧
- **留白**：四周 ≥20px
- **配色**：restrained-warm

### 图例与辅助

- **图例**：不需要
- **脚注**：房价收入比 = 中位房价 / 中位家庭年收入。数据口径因国家统计方式不同而有差异
- **特殊说明**：区间值取中值用于排序

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "中国3城包揽全球最难买房TOP3——深圳购房难度是纽约3倍",
  "subtitle": "2024年 · 全球20主要城市房价收入比",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["城市", "房价收入比", "国家/地区"],
    "series": [
      { "name": "香港", "values": [35], "highlight": true },
      { "name": "深圳", "values": [32.5], "highlight": true },
      { "name": "北京", "values": [30.5], "highlight": true },
      { "name": "上海", "values": [28], "highlight": false },
      { "name": "孟买", "values": [25], "highlight": false },
      { "name": "德黑兰", "values": [24], "highlight": false },
      { "name": "首尔", "values": [22.5], "highlight": false },
      { "name": "新加坡", "values": [20], "highlight": false },
      { "name": "悉尼", "values": [16.5], "highlight": false },
      { "name": "温哥华", "values": [15.5], "highlight": false },
      { "name": "伦敦", "values": [14.5], "highlight": false },
      { "name": "旧金山", "values": [13.5], "highlight": false },
      { "name": "洛杉矶", "values": [12.5], "highlight": false },
      { "name": "东京", "values": [11.5], "highlight": false },
      { "name": "纽约", "values": [11], "highlight": false },
      { "name": "墨尔本", "values": [11], "highlight": false },
      { "name": "慕尼黑", "values": [10], "highlight": false },
      { "name": "巴黎", "values": [10], "highlight": false },
      { "name": "多伦多", "values": [10], "highlight": false },
      { "name": "斯德哥尔摩", "values": [9], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "香港", "color": "#c26d3a" },
      { "series": "深圳", "color": "#c26d3a" },
      { "series": "北京", "color": "#c26d3a" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.15
  },
  "annotations": [
    { "text": "中国3城霸占TOP3", "target": "香港" },
    { "text": "深圳=3x纽约", "target": "深圳" }
  ],
  "referenceLines": [
    { "type": "vertical", "value": 6, "label": "国际合理线", "style": { "color": "#ada599", "dash": [6, 4] } }
  ],
  "theme": "default",
  "layout": { "padding": { "top": 20, "right": 30, "bottom": 20, "left": 20 } }
}
```
