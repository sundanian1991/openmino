# Compiled SPEC — 全球城市化率排名

## Page: 全球城市化率排名（2023）

- **场景论文**：用水平条形图呈现20国城市化率排名，一眼定位中国在全球格局中的位置
- **签名视觉元素**：中国条形用 Warm 主色高亮
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要20国排序+中国高亮+位置标注

### 叙事意图

**【可视化目的】**
- 认知缺口：读者知道中国城市化率高但不清楚全球排名，看完应理解66%仅排第18位，与发达国家差距显著

**【想传达什么】**
- 核心信息（一句话）：中国城市化率在全球主要国家中处于中下游，距发达国家80%+水平仍有巨大空间

**【结论】**
- 读者应得出的判断：中国66%的城市化率排第18位，低于发达国家（日本92%、美国83%、德国78%），但高于发展中国家（印度36%、印尼58%）

**【思路】**
- 视觉叙事路径：第一眼看到顶部100%城市国家 → 第二眼找到高亮的中国（中下部） → 最终理解中国城市化仍有提升空间

### 视觉编码

- **Y 轴编码**：国家名称（20国，按城市化率降序排列）
- **X 轴编码**：城市化率（%），0-100
- **颜色编码**：中国用 Warm 主色 `#c26d3a`（高亮定位），其余国家用 Stone `#857d74`
- **大小编码**：条形长度编码城市化率

### 数据组织

- **字段清单**：排名、国家、城市化率
- **排序规则**：按城市化率降序
- **聚合规则**：无，原始数据

### 标注策略

- **高亮点**（≤10%）：中国（1/20 = 5%）
- **标注内容**："66%，排第18位，距发达国家80%+差距显著"
- **基准线/参考线**：66%垂直线（中国水平）

### 布局

- **画布**：800 × 550
- **标题区**：顶部居中
- **图表区**：居中，占比75%
- **标注区**：中国条形右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要（高亮即中国）
- **脚注**：数据来源：世界银行，2023年
- **特殊说明**：城市化率 = 城市人口占总人口比例

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 水平条形图表达排名对比 |
| 风格选择 | restrained-warm | style-schools.md | 克制、学术感 |
| 配色选择 | Warm + Stone | color-themes.md | 高亮+灰化 |
| 字体选择 | system-ui | typography-moods.md | 冷静客观 |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "中国城市化率排第18位，距发达国家80%+水平仍有巨大空间",
  "subtitle": "2023年 · 全球主要国家城市化率排名",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["国家", "城市化率"],
    "series": [
      { "name": "新加坡", "values": [100], "highlight": false },
      { "name": "科威特", "values": [100], "highlight": false },
      { "name": "中国香港", "values": [100], "highlight": false },
      { "name": "卡塔尔", "values": [99], "highlight": false },
      { "name": "以色列", "values": [93], "highlight": false },
      { "name": "阿根廷", "values": [93], "highlight": false },
      { "name": "日本", "values": [92], "highlight": false },
      { "name": "澳大利亚", "values": [86], "highlight": false },
      { "name": "巴西", "values": [88], "highlight": false },
      { "name": "英国", "values": [84], "highlight": false },
      { "name": "美国", "values": [83], "highlight": false },
      { "name": "加拿大", "values": [82], "highlight": false },
      { "name": "法国", "values": [82], "highlight": false },
      { "name": "韩国", "values": [81], "highlight": false },
      { "name": "墨西哥", "values": [81], "highlight": false },
      { "name": "德国", "values": [78], "highlight": false },
      { "name": "俄罗斯", "values": [75], "highlight": false },
      { "name": "中国", "values": [66], "highlight": true },
      { "name": "印度尼西亚", "values": [58], "highlight": false },
      { "name": "印度", "values": [36], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "中国", "color": "#c26d3a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "66%，排第18位，距发达国家差距显著", "target": "中国" }
  ],
  "referenceLines": [
    { "type": "vertical", "value": 66, "label": "中国", "style": { "color": "#c26d3a", "dash": [4, 3] } },
    { "type": "vertical", "value": 80, "label": "发达国家门槛", "style": { "color": "#ada599", "dash": [6, 4] } }
  ],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
