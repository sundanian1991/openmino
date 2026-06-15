# Compiled SPEC — 全球新冠疫苗接种率 TOP 20

> 渲染契约。渲染技能 viz-echarts 按此执行。

---

## Page: 接种率排名

- **场景论文**：用水平条形图的长短对比揭示"接种率两极分化 + G7 美国垫底"的格局
- **签名视觉元素**：前 7 名条形标注"92% 高原区" + 美国条形 Coral 色高亮
- **签名视觉元素 source id**：Custom（基于水平条形图标准模式 + 高亮策略）
- **为什么不能简化为默认模板**：需要在 20 个条形中精确高亮 1 个离群值，并标注高原区分界线

### 叙事意图

**【可视化目的】**
- 认知缺口：公众印象中发达国家接种率应该都高，但美国的 68% 在 TOP 20 中垫底

**【想传达什么】**
- 核心信息（一句话）：前 7 名形成 92%+ 高原区，但 G7 中的美国仅 68% 排名末尾

**【结论】**
- 读者应得出的判断：全球疫苗接种率呈现"高原-缓坡-谷底"格局，美国的低接种率在发达国家中异常突出

**【思路】**
- 视觉叙事路径：第一眼看到顶部 7 根等长条形（高原区） → 第二眼看到底部美国 Coral 色短条（谷底） → 理解发达国家内部也存在显著接种率差距

### 视觉编码

- **X 轴编码**：完成基础免疫比例（%），范围 0-100%
- **Y 轴编码**：国家/地区名称（按接种率降序）
- **颜色编码**：Stone 300 灰化为默认，Coral 500 仅用于美国高亮
- **大小编码**：不适用
- **无坐标轴时**：不适用

### 数据组织

- **字段清单**：国家/地区、完成基础免疫比例（%）
- **排序规则**：按接种率降序（数据原序）
- **聚合规则**：无聚合，20 个国家全部展示
- **数据示例**：
  | 国家 | 接种率(%) |
  |------|-----------|
  | 阿联酋 | 99 |
  | 美国 | 68 |

### 标注策略

- **高亮点（≤10%）**：仅美国（1/20 = 5%）
- **标注内容**：
  - 美国："G7 国家中最低，仅 68%"
  - 前 7 名分界线：参考线标注"92% 高原区"
- **基准线/参考线**：92% 参考线（前 7 名高原区下界）

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | Warm 800, 16px/600 | 结论性标题 |
| 高原区（前 7 名） | Stone 300，等长条形 | 默认态，等长暗示高原 |
| 美国条形 | Coral 500 | 唯一高亮，引导注意力到垫底 |
| 92% 参考线 | Stone 500 虚线 | 标识高原区分界 |

### 布局

- **画布**：800 x 650
- **标题区**：左上，y=20-50
- **图表区**：居中，占比 75%
- **标注区**：美国条形右侧
- **留白**：四周 ≥20px
- **配色**：Warm 主色系

### 图例与辅助

- **图例**：需要，说明灰化条 = 其他国家、高亮条 = 美国
- **脚注**：数据来源：Our World in Data + WHO COVID-19 Dashboard，截至 2024 年初
- **特殊说明**：无

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §三 | 排名对比黄金标准 |
| 风格选择 | restrained-warm | style-schools.md | 默认风格 |
| 配色选择 | Warm+Stone | color-themes.md | 默认配色 |
| 构图选择 | 水平条形 | composition-templates.md | 20 个标签需要垂直空间 |
| DNA 参考 | Custom | — | 无精确匹配案例 |

## 渲染委托

**渲染技能**：viz-echarts

```
委托指令：
"用 viz-echarts 渲染以下 SPEC：
- 模式：13-柱状图（水平条形）
- 标题：前 7 名形成 92% 高原区，G7 美国仅 68% 垫底
- 数据字段：国家/地区、完成基础免疫比例
- 高亮：仅美国 Coral 500
- 标注：G7 国家中最低，仅 68%
- 参考线：92% 分界线
- 画布：800x650
请遵循 13-VISUALIZATION.md 配色规范。"
```

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "前 7 名形成 92% 高原区，G7 美国仅 68% 垫底",
  "subtitle": "截至 2024 年初 · 全球完成基础免疫比例 TOP 20",
  "canvas": { "width": 800, "height": 650 },
  "data": {
    "fields": ["国家/地区", "完成基础免疫比例(%)"],
    "series": [
      {
        "name": "其他国家",
        "values": [
          { "category": "阿联酋", "value": 99, "highlight": false },
          { "category": "葡萄牙", "value": 95, "highlight": false },
          { "category": "文莱", "value": 94, "highlight": false },
          { "category": "智利", "value": 93, "highlight": false },
          { "category": "中国", "value": 92, "highlight": false },
          { "category": "马耳他", "value": 92, "highlight": false },
          { "category": "新加坡", "value": 92, "highlight": false },
          { "category": "韩国", "value": 87, "highlight": false },
          { "category": "日本", "value": 86, "highlight": false },
          { "category": "澳大利亚", "value": 85, "highlight": false },
          { "category": "巴西", "value": 84, "highlight": false },
          { "category": "加拿大", "value": 83, "highlight": false },
          { "category": "丹麦", "value": 82, "highlight": false },
          { "category": "意大利", "value": 80, "highlight": false },
          { "category": "西班牙", "value": 80, "highlight": false },
          { "category": "德国", "value": 76, "highlight": false },
          { "category": "英国", "value": 76, "highlight": false },
          { "category": "法国", "value": 75, "highlight": false },
          { "category": "以色列", "value": 72, "highlight": false }
        ]
      },
      {
        "name": "美国",
        "values": [
          { "category": "美国", "value": 68, "highlight": true }
        ]
      }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "美国", "color": "#D85A30" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1,
    "orientation": "horizontal",
    "xLabel": "完成基础免疫比例(%)",
    "yLabel": ""
  },
  "annotations": [
    { "text": "G7 国家中最低", "target": "美国" }
  ],
  "referenceLines": [
    {
      "type": "vertical",
      "value": 92,
      "label": "92% 高原区下界",
      "style": { "color": "#ada599", "dash": [6, 4] }
    }
  ],
  "theme": "default",
  "layout": {
    "titlePosition": "top",
    "chartArea": "center",
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
