# Delegation Routing Test — 模式 60 循环系统 → viz-svg-flow

> 测试：49-72（状态叙事）范围 → 应委托给 viz-svg-flow

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | 60 |
| 模式范围 | 49-72（状态叙事） |
| 预期 renderTarget | viz-svg-flow |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-svg-flow",
  "chartType": "circulatory_system",
  "title": "资金流动循环：从收入到再投入的闭环",
  "subtitle": "2026 Q1 · 供应商资金流分析",
  "canvas": {"width": 700, "height": 500},
  "data": {
    "fields": ["节点", "流入_万", "流出_万", "类型"],
    "rows": [
      {"节点": "客户收入", "流入_万": 5000, "流出_万": 5000, "类型": "心脏"},
      {"节点": "运营支出", "流入_万": 2000, "流出_万": 2000, "类型": "器官"},
      {"节点": "供应商结算", "流入_万": 1500, "流出_万": 1500, "类型": "器官"},
      {"节点": "技术投入", "流入_万": 800, "流出_万": 800, "类型": "器官"},
      {"节点": "利润再投", "流入_万": 700, "流出_万": 700, "类型": "回流"}
    ]
  },
  "visualEncoding": {
    "highlight": [{"series": "供应商结算", "color": "#c26d3a"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "30% 资金流向供应商结算", "target": "供应商结算"}
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

- **模式号 → renderTarget 映射**：60 属于 49-72 范围 → viz-svg-flow（SKILL.md §四）
- **renderTarget 字段**：显式声明 "viz-svg-flow"（正确）
- **JSON 格式合法性**：v1 格式，所有必填字段齐全（正确）
- **判定**：PASS
