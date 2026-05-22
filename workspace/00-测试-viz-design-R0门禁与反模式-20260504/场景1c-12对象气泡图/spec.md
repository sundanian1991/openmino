# SPEC — 场景 1c：12 个对象的气泡图

> 测试目标：故意选 05-气泡图，12 个数据点，验证 R0-3 是否拦截

---

## R0 门禁检验记录

### 首次检验（05-气泡图，12 个数据点）

| 序号 | 检验项 | 判定 | 理由 |
|------|--------|------|------|
| R0-1 | 几何直觉 | PASS | 气泡图两维 + 大小编码，几何可读 |
| R0-2 | 对象可区分 | PASS | 12 个气泡各有标签 |
| R0-3 | 差距可读 | **FAIL** | 12 个气泡在二维空间中重叠严重，尤其当数据密集区域，气泡互相覆盖，无法一眼看出优劣差距。需要看 tooltip 或数字才能判断 |

**结果：R0-3 失败 → 门禁不通过 → 查备选表**

### 备选模式替换

查 `chart-validity-gate.md` 备选表：
- 05-气泡图（数量>10 时重叠严重）→ **09-散点图（无大小编码）**

### 重新检验（09-散点图）

| 序号 | 检验项 | 判定 | 理由 |
|------|--------|------|------|
| R0-1 | 几何直觉 | PASS | 散点图点状分布，无大小编码减少重叠 |
| R0-2 | 对象可区分 | PASS | 12 个点各有标签 |
| R0-3 | 差距可读 | PASS | 去除大小编码后点更小，重叠减少，位置差异可见 |
| R0-4 | 轴数充足 | PASS | N/A |

**结果：全部通过 → 继续**

---

## 第一部分：叙事意图

**【可视化目的】**
展示 12 家供应商在成本（X）和效率（Y）两个维度上的分布情况，识别 outlier。

**【想传达什么】**
大部分供应商集中在中等区域，2 家为高效低成本 outlier，3 家为低效高成本问题供应商。

**【结论】**
供应商能力分布呈正相关，但有明显的头部和尾部 outlier 需要关注。

**【思路】**
散点图去掉大小编码，用点的位置表达两维关系，减少重叠。高亮 outlier 点。

---

## 第二部分：视觉执行

**【模式选择】**
- **模式**：09-散点图（原选 05-气泡图，R0-3 失败后切换）
- **理由**：12 个数据点气泡重叠严重，散点图去大小编码后减少重叠

**【标题】**
- **主标题**：供应商能力与成本正相关，3 家低效高成本需干预
- **副标题**：2026 Q1 · 12 家供应商成本-效率分布

**【视觉编码】**
- **X 轴**：单位成本（元/单）
- **Y 轴**：处理效率（单/人天）
- **颜色**：outlier 高亮 Warm 500，其余 Stone 300
- **大小**：统一大小（无大小编码）

**【数据组织】**
12 家供应商，字段：supplier_name, cost_per_unit, efficiency

**【标注策略】**
- 高亮 3 家低效高成本 outlier + 2 家高效低成本 outlier
- 标注写原因

**【布局】**
- 画布：800 × 500

---

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-echarts",
  "chartType": "scatter",
  "title": "供应商能力与成本正相关，3 家低效高成本需干预",
  "subtitle": "2026 Q1 · 12 家供应商成本-效率分布",
  "canvas": {"width": 800, "height": 500},
  "data": {
    "fields": ["supplier_name", "cost_per_unit", "efficiency"],
    "rows": [
      {"supplier_name": "A", "cost_per_unit": 15, "efficiency": 95},
      {"supplier_name": "B", "cost_per_unit": 18, "efficiency": 88},
      {"supplier_name": "C", "cost_per_unit": 22, "efficiency": 72},
      {"supplier_name": "D", "cost_per_unit": 25, "efficiency": 65},
      {"supplier_name": "E", "cost_per_unit": 28, "efficiency": 58},
      {"supplier_name": "F", "cost_per_unit": 30, "efficiency": 55},
      {"supplier_name": "G", "cost_per_unit": 32, "efficiency": 52},
      {"supplier_name": "H", "cost_per_unit": 35, "efficiency": 48},
      {"supplier_name": "I", "cost_per_unit": 38, "efficiency": 42},
      {"supplier_name": "J", "cost_per_unit": 40, "efficiency": 38},
      {"supplier_name": "K", "cost_per_unit": 45, "efficiency": 30},
      {"supplier_name": "L", "cost_per_unit": 50, "efficiency": 25}
    ]
  },
  "mapping": {
    "x": "cost_per_unit",
    "y": "efficiency",
    "color": "is_outlier"
  },
  "layers": [
    {
      "geom": "point",
      "aes": {"x": "cost_per_unit", "y": "efficiency"},
      "params": {
        "symbolSize": 12,
        "color": "#857d74",
        "itemStyle": {"opacity": 0.6}
      }
    },
    {
      "geom": "point",
      "aes": {"x": "cost_per_unit", "y": "efficiency"},
      "params": {
        "symbolSize": 16,
        "color": "#c98a6a",
        "dataFilter": {"supplier_name": ["A", "B", "K", "L"]}
      }
    }
  ],
  "scales": [
    {
      "aesthetic": "x",
      "type": "linear"
    },
    {
      "aesthetic": "y",
      "type": "linear"
    }
  ],
  "coord": {"type": "cartesian2d"},
  "facet": null,
  "theme": {
    "fontFamily": "Inter Tight, Inter, sans-serif",
    "backgroundColor": "#faf9f7",
    "textColor": "#3a3632"
  }
}
```
