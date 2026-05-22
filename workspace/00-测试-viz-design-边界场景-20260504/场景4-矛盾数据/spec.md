# SPEC — 场景 4：矛盾数据（自报 vs 实际）

> 输入：3 家供应商自报达成率 vs 系统实际达成率

---

## 第一部分：叙事意图

**【可视化目的】**
读者以为"供应商数据可信"。这张图要让他们看到自报和实际的巨大差距——20-27 个百分点的差异不可能是统计误差，是系统性虚报。认知缺口：供应商的自报数据有多不可信。

**【想传达什么】**
3 家头部供应商均存在严重虚报，自报数据完全不能作为评估依据。

**【结论】**
供应商达成率虚报 20-27 个百分点，需建立数据核验机制。

**【思路】**
每家供应商两根并列柱子——左边自报（Warm 500，乐观色），右边实际（Coral 500，警示色）。第一眼看到 Warm 和 Coral 之间的巨大落差，第二眼看到差距标注（-26pp/-27pp/-21pp），最终理解"供应商在系统性虚报"。标注不写数字，写"虚报"定性判断。

---

## 第二部分：视觉执行

**【模式选择】**
- **模式**：26-并列比较
- **理由**：pattern-index 快速选图"谁多谁少" → 并列比较(26)。两组数据逐项对比，差距柱子天然表达"落差"

**【标题】**
- **主标题**：3 家供应商自报数据虚报 20-27pp，数据完全不可信
- **副标题**：自报达成率 vs 系统实际达成率

**【视觉编码】**
- **X 轴**：供应商（毅航、毛毛虫、伽玛）
- **Y 轴**：达成率（0-100%）
- **每组 2 根柱**：左=自报（Warm 500），右=实际（Coral 500）
- **差距标注**：每对柱子上方标差距（-26pp/-27pp/-21pp），Coral 500
- **为什么**：Warm=Coral 对比制造视觉冲击，差距数字本身就是叙事

**【数据组织】**
- **字段**：supplier, self_reported, actual, gap
- **排序**：按差距从大到小（毛毛虫 -27pp → 毅航 -26pp → 伽玛 -21pp）
- **示例**：
  | supplier | self_reported | actual | gap |
  |----------|---------------|--------|-----|
  | 毛毛虫 | 95% | 68% | -27pp |
  | 毅航 | 98% | 72% | -26pp |
  | 伽玛 | 92% | 71% | -21pp |

**【标注策略】**
- **高亮**：差距最大的毛毛虫（-27pp）加 Coral 500 标注"虚报最严重"
- **标注内容**：每对柱子上方标"-27pp"，不写"95% vs 68%"（数字已体现在柱子高度）
- **基准线**：100% 处灰色虚线（满分的视觉参考）

**【图例与辅助】**
- **图例**：底部 Warm 500 = 自报，Coral 500 = 实际
- **脚注**：数据来源：供应商自报表 vs 业务系统，2026 Q1

**【布局】**
- **画布**：600 × 400
- **标题区**：顶部
- **图表区**：3 组柱子水平均分，每组内两柱间距 8px，组间距 60px
- **差距标注**：柱子上方 16px 处

---

## 渲染契约 JSON（v2）

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-echarts",
  "chartType": "grouped-bar-comparison",
  "title": "3 家供应商自报数据虚报 20-27pp，数据完全不可信",
  "subtitle": "自报达成率 vs 系统实际达成率",
  "canvas": {"width": 600, "height": 400},
  "mapping": {
    "x": "supplier",
    "y": "value",
    "color": "source",
    "size": null,
    "group": "supplier"
  },
  "data": {
    "fields": ["supplier", "source", "value", "gap"],
    "rows": [
      {"supplier": "毛毛虫", "source": "自报", "value": 95, "gap": -27},
      {"supplier": "毛毛虫", "source": "实际", "value": 68, "gap": -27},
      {"supplier": "毅航", "source": "自报", "value": 98, "gap": -26},
      {"supplier": "毅航", "source": "实际", "value": 72, "gap": -26},
      {"supplier": "伽玛", "source": "自报", "value": 92, "gap": -21},
      {"supplier": "伽玛", "source": "实际", "value": 71, "gap": -21}
    ]
  },
  "layers": [
    {
      "geom": "geom_bar",
      "aes": {"x": "supplier", "y": "value", "fill": "source"},
      "params": {"groupGap": 0.3, "barGap": 0.1}
    },
    {
      "geom": "geom_label",
      "aes": {"text": "gap_label"},
      "params": {"values": {"毛毛虫": "-27pp", "毅航": "-26pp", "伽玛": "-21pp"}, "position": "above_group", "size": 14, "color": "#E8875F"}
    },
    {
      "geom": "geom_label",
      "aes": {"text": "highlight_text"},
      "params": {"text": "虚报最严重", "target": "毛毛虫", "position": "above_gap_label", "size": 12, "color": "#E8875F"}
    },
    {
      "geom": "geom_hline",
      "aes": {"y": 100},
      "params": {"linetype": "dashed", "color": "#d4d0cb", "width": 1}
    }
  ],
  "scales": [
    {"aesthetic": "fill", "type": "manual", "values": {"自报": "#c98a6a", "实际": "#E8875F"}}
  ],
  "coord": {"type": "cartesian2d", "xAxis": {"type": "category"}, "yAxis": {"type": "value", "min": 0, "max": 100}},
  "facet": null,
  "theme": "comparison"
}
```
