# SPEC — 场景 1：极小数据集（2 个数据点）

> 输入：指标,今年,去年 / 营收,1200万,800万

---

## 第一部分：叙事意图

**【可视化目的】**
读者需要在 3 秒内理解"营收从 800 万增长到 1200 万"。认知缺口：增长的幅度感——50% 同比增速是大还是小？

**【想传达什么】**
营收同比增长 50%，增长显著。

**【结论】**
今年营收大幅增长，业务在扩张。

**【思路】**
不画传统图表。decision-rules.md 规则 1：数据很少（≤3 个数字），直接用大字展示。两个数字 + 增长幅度，用 KPI 大字报——数字本身就是视觉。第一眼落在 1200 万（最大字号），第二眼看到 800 万和增长箭头，最终理解"增长 50%"。

---

## 第二部分：视觉执行

**【模式选择】**
- **模式**：69-成套工具 → 变形为 KPI 大字报
- **理由**：数据量不足（≤3 个数字），规则 1 明确不画图，用大字展示

**【标题】**
- **主标题**：营收同比增长 50%，达 1200 万
- **副标题**：年度对比

**【视觉编码】**
- **主数字**：1200 万，42px 大字号，Warm 500（主色信号）
- **对比数字**：800 万，26px 中字号，Stone 400（灰化背景）
- **增长指示**：↑50%，18px，Teal 500（正面信号色）
- **为什么**：大小差异=重要性差异，颜色=信号（Warm=核心数字，Teal=正面增长，Stone=参考基线）

**【数据组织】**
- **字段**：label, value, role, signal
- **排序**：固定——今年值（主）→ 去年值（参考）→ 增长率（信号）
- **示例**：
  | label | value | role | signal |
  |-------|-------|------|--------|
  | 今年营收 | 1200万 | primary | positive |
  | 去年营收 | 800万 | baseline | neutral |
  | 同比增长 | +50% | delta | positive |

**【标注策略】**
- **高亮**：主数字 1200 万 是唯一彩色元素
- **标注内容**：底部脚注写"同比上年增长 400 万"
- **基准线**：无

**【图例与辅助】**
- **图例**：不需要
- **脚注**：数据来源：财务报表

**【布局】**
- **画布**：400 × 250
- **标题区**：顶部，距顶 16px
- **主数字**：居中，距标题 40px
- **对比数字**：主数字右侧，Stone 400
- **增长指示**：主数字下方
- **留白**：四周 ≥30px

---

## 渲染契约 JSON（v2）

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-svg-flow",
  "chartType": "kpi-card",
  "title": "营收同比增长 50%，达 1200 万",
  "subtitle": "年度对比",
  "canvas": {"width": 400, "height": 250},
  "mapping": {
    "x": null,
    "y": null,
    "color": "signal",
    "size": "role",
    "text": "display"
  },
  "data": {
    "fields": ["label", "value", "role", "signal", "display"],
    "rows": [
      {"label": "今年营收", "value": 12000000, "role": "primary", "signal": "positive", "display": "1200万"},
      {"label": "去年营收", "value": 8000000, "role": "baseline", "signal": "neutral", "display": "800万"},
      {"label": "同比增长", "value": 0.50, "role": "delta", "signal": "positive", "display": "↑50%"}
    ]
  },
  "layers": [
    {
      "geom": "geom_text",
      "aes": {"text": "display", "size": "role", "color": "signal"},
      "params": {"primary_size": 42, "baseline_size": 26, "delta_size": 18}
    },
    {
      "geom": "geom_text",
      "aes": {"text": "label"},
      "params": {"size": 12, "color": "#857d74", "position": "below_value"}
    }
  ],
  "scales": [
    {"aesthetic": "color", "type": "manual", "values": {"positive": "#4CAF82", "neutral": "#857d74"}},
    {"aesthetic": "size", "type": "manual", "values": {"primary": 42, "baseline": 26, "delta": 18}}
  ],
  "coord": null,
  "facet": null,
  "theme": "kpi"
}
```
