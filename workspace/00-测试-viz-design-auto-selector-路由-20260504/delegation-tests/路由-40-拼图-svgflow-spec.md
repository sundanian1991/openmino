# Delegation Routing Test — 模式 40 拼图 → viz-svg-flow

> 测试：31-48（结构关系）范围 → 应委托给 viz-svg-flow

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | 40 |
| 模式范围 | 31-48（结构关系） |
| 预期 renderTarget | viz-svg-flow |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-svg-flow",
  "chartType": "puzzle",
  "title": "团队能力拼图：缺少的最后一块是数据分析",
  "subtitle": "2026 Q1 · 服务组能力评估",
  "canvas": {"width": 600, "height": 500},
  "data": {
    "fields": ["能力模块", "状态", "占比_pct"],
    "rows": [
      {"能力模块": "供应商管理", "状态": "已就位", "占比_pct": 30},
      {"能力模块": "质量控制", "状态": "已就位", "占比_pct": 25},
      {"能力模块": "合规审核", "状态": "已就位", "占比_pct": 20},
      {"能力模块": "数据分析", "状态": "缺失", "占比_pct": 15},
      {"能力模块": "培训赋能", "状态": "已就位", "占比_pct": 10}
    ]
  },
  "visualEncoding": {
    "highlight": [{"series": "数据分析", "color": "#c26d3a"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "数据分析能力缺失是最大瓶颈", "target": "数据分析"}
  ],
  "theme": "default",
  "layout": {
    "titlePosition": "top",
    "chartArea": "center",
    "padding": {"top": 20, "right": 20, "bottom": 20, "left": 20}
  }
}
```

## 路由验证

- **模式号 → renderTarget 映射**：40 属于 31-48 范围 → viz-svg-flow（SKILL.md §四）
- **renderTarget 字段**：显式声明 "viz-svg-flow"（正确）
- **JSON 格式合法性**：v1 格式，所有必填字段齐全（正确）
- **判定**：PASS
