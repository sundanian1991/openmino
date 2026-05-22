# Delegation Routing Test — 模式 35 楼梯图 → viz-svg-flow

> 测试：31-48（结构关系）范围 → 应委托给 viz-svg-flow

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | 35 |
| 模式范围 | 31-48（结构关系） |
| 预期 renderTarget | viz-svg-flow |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-svg-flow",
  "chartType": "stairs",
  "title": "供应商能力进阶路径：从合格到卓越的 5 个阶梯",
  "subtitle": "2026 · 供应商分级管理",
  "canvas": {"width": 700, "height": 450},
  "data": {
    "fields": ["阶梯", "能力要求", "代表供应商"],
    "rows": [
      {"阶梯": "L1 合规", "能力要求": "资质齐全，无违规", "代表供应商": "全部"},
      {"阶梯": "L2 交付", "能力要求": "按时交付 > 95%", "代表供应商": "80%"},
      {"阶梯": "L3 质量", "能力要求": "质量评分 > 80", "代表供应商": "60%"},
      {"阶梯": "L4 创新", "能力要求": "主动优化提案", "代表供应商": "20%"},
      {"阶梯": "L5 战略", "能力要求": "共建生态", "代表供应商": "5%"}
    ]
  },
  "visualEncoding": {
    "highlight": [{"series": "L5 战略", "color": "#c26d3a"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "仅 5% 达到战略合作级别", "target": "L5 战略"}
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

- **模式号 → renderTarget 映射**：35 属于 31-48 范围 → viz-svg-flow（SKILL.md §四）
- **renderTarget 字段**：显式声明 "viz-svg-flow"（正确）
- **JSON 格式合法性**：v1 格式，所有必填字段齐全（正确）
- **判定**：PASS
