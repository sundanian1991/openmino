# Delegation Routing Test — 模式 C07 趋势+拐点叙事 → viz-echarts（数据特征）

> 测试：C01-C16（逻辑图表）按数据特征分流 → 数据型 → viz-echarts

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | C07 |
| 模式范围 | C01-C16（逻辑图表） |
| 数据特征 | 数据型（带注释的时间序列，有明确数值） |
| 预期 renderTarget | viz-echarts |

> 注：题目写 "C07-概念齿轮(概念)"，但 C07 实际是"趋势+拐点叙事"，齿轮是 39 号。
> 这里测试 C07 趋势+拐点叙事（有数据）→ viz-echarts 的路由。

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["月份", "营收_万", "备注"],
    "rows": [
      {"月份": "1月", "营收_万": 320, "备注": "年初预算收紧"},
      {"月份": "2月", "营收_万": 280, "备注": null},
      {"月份": "3月", "营收_万": 350, "备注": "新供应商上线"},
      {"月份": "4月", "营收_万": 340, "备注": null},
      {"月份": "5月", "营收_万": 420, "备注": "旺季来临"},
      {"月份": "6月", "营收_万": 510, "备注": "历史新高"},
      {"月份": "7月", "营收_万": 480, "备注": null},
      {"月份": "8月", "营收_万": 460, "备注": null},
      {"月份": "9月", "营收_万": 390, "备注": "旺季结束"}
    ]
  },
  "mapping": {
    "x": "月份",
    "y": "营收_万",
    "fill": null,
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_line",
      "aes": {"y": "营收_万"},
      "params": {"color": "#C13531", "size": 2, "smooth": false},
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": {"x": "3月", "y": 350, "label": "新供应商上线，拐点"},
      "params": {"color": "#c26d3a", "fontSize": 11},
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": {"x": "6月", "y": 510, "label": "历史新高"},
      "params": {"color": "#c26d3a", "fontSize": 11},
      "readerWeight": "hero"
    },
    {
      "geom": "geom_label",
      "aes": {"x": "9月", "y": 390, "label": "旺季结束，回落"},
      "params": {"color": "#6b7280", "fontSize": 10},
      "readerWeight": "medium"
    }
  ],
  "scales": [
    {"aesthetic": "y", "type": "linear", "name": "月度营收（万元）"}
  ],
  "coord": {"type": "cartesian", "flip": false},
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": {"major": "#f3f4f6", "minor": false},
    "fontFamily": "system-ui",
    "titleSize": 16,
    "axisLabelSize": 10,
    "canvas": {"width": 800, "height": 550}
  },
  "title": "3 月拐点后营收增长 60%，6 月创新高后回落",
  "subtitle": "2026 年 1-9 月 · 月度营收趋势"
}
```

## 路由验证

- **模式号 → renderTarget 映射**：C07 属于 C01-C16 范围 → 数据特征（有时间序列数据）→ viz-echarts
- **JSON 格式合法性**：v2 格式，所有必填字段齐全，包含多个 geom_label 标注拐点（正确）
- **判定**：PASS

---

## 补充：概念型 C 系列路由测试

> C01-C16 中如果是**纯概念型**（无数值，只有概念关系），应走 viz-svg-flow。

### 概念齿轮示例（39 号模式，非 C 系列）

39-齿轮属于 31-48（结构关系）→ viz-svg-flow，不属于 C 系列。

### 假设的"概念型" C 系列场景

如果有一个 C01 MECE 拆解场景但**没有数值，纯概念分解**：
- 意图：业务 MECE 分解（概念性）
- 数据特征：纯概念（无数值）
- renderTarget 应为：viz-svg-flow（概念型逻辑图表用 SVG 渲染更合适）

> **结论**：C01-C16 的路由取决于数据特征：
> - 有精确数据 → viz-echarts
> - 纯概念关系 → viz-svg-flow
> 这与 SKILL.md §四 的规定一致。
