# SPEC — 场景 5：单行数据（单个 KPI）

> 输入：指标,值 / 年度总营收,1.2 亿

---

## 第一部分：叙事意图

**【可视化目的】**
3 秒内让读者建立"今年做了 1.2 亿"的认知。不需要分析、不需要对比、不需要趋势。认知缺口：1.2 亿是大是小？需要一个量级标注帮助理解。

**【想传达什么】**
年度总营收达到 1.2 亿。

**【结论】**
今年业务规模达到 1.2 亿量级。

**【思路】**
不画任何图表。decision-rules.md 规则 1 明确：≤3 个数字直接用大字展示。单一数值 = 超大字号的数字 + 指标标签。第一眼被 1.2 亿（最大字号）抓住，第二眼看到"年度总营收"标签，最终建立"今年 1.2 亿"的认知。

---

## 第二部分：视觉执行

**【模式选择】**
- **模式**：69-成套工具 → 退化为单值大字报
- **理由**：仅 1 个数值，规则 1 直接适用。大字报是最小有效可视化

**【标题】**
- **主标题**：年度总营收 1.2 亿
- **副标题**：2026 年度

**【视觉编码】**
- **数字**：1.2 亿，52px 超大字号，Warm 500
- **标签**：年度总营收，14px，Stone 400，数字上方
- **量级标注**：底部 Stone 400 小字"相当于日均 33 万"
- **为什么**：字号差异制造视觉层次——数字是主角，标签是配角

**【数据组织】**
- **字段**：label, value, display
- **排序**：N/A（单行）
- **示例**：
  | label | value | display |
  |-------|-------|---------|
  | 年度总营收 | 120000000 | 1.2 亿 |

**【标注策略】**
- **高亮**：数字本身是唯一彩色元素
- **标注内容**：底部量级参照"日均 33 万"
- **基准线**：无

**【图例与辅助】**
- **图例**：不需要
- **脚注**：数据来源：财务报表

**【布局】**
- **画布**：350 × 200
- **数字**：垂直+水平居中
- **标签**：数字上方 12px
- **量级标注**：数字下方 40px
- **留白**：四周 ≥30px

---

## 渲染契约 JSON（v2）

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-svg-flow",
  "chartType": "single-kpi",
  "title": "年度总营收 1.2 亿",
  "subtitle": "2026 年度",
  "canvas": {"width": 350, "height": 200},
  "mapping": {
    "x": null,
    "y": null,
    "color": "role",
    "size": "role",
    "text": "display"
  },
  "data": {
    "fields": ["label", "value", "display", "role"],
    "rows": [
      {"label": "年度总营收", "value": 120000000, "display": "1.2 亿", "role": "value"},
      {"label": "年度总营收", "value": null, "display": "年度总营收", "role": "label"},
      {"label": "量级参照", "value": 330000, "display": "日均 33 万", "role": "context"}
    ]
  },
  "layers": [
    {
      "geom": "geom_text",
      "aes": {"text": "display", "size": "role"},
      "params": {"value_size": 52, "label_size": 14, "context_size": 12}
    }
  ],
  "scales": [
    {"aesthetic": "color", "type": "manual", "values": {"value": "#c98a6a", "label": "#857d74", "context": "#857d74"}},
    {"aesthetic": "size", "type": "manual", "values": {"value": 52, "label": 14, "context": 12}}
  ],
  "coord": null,
  "facet": null,
  "theme": "kpi"
}
```
