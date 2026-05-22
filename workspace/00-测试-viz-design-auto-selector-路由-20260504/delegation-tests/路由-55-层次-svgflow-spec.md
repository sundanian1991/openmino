# Delegation Routing Test — 模式 55 层次 → viz-svg-flow

> 测试：49-72（状态叙事）范围 → 应委托给 viz-svg-flow

## 路由判定

| 检查项 | 值 |
|--------|------|
| 模式号 | 55 |
| 模式范围 | 49-72（状态叙事） |
| 预期 renderTarget | viz-svg-flow |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-svg-flow",
  "chartType": "layers",
  "title": "技术栈分层：从基础设施到应用的 4 层架构",
  "subtitle": "2026 · 技术架构全景",
  "canvas": {"width": 700, "height": 500},
  "data": {
    "fields": ["层级", "组件", "职责"],
    "rows": [
      {"层级": "L4 应用层", "组件": "Web/Mobile/API", "职责": "用户交互"},
      {"层级": "L3 服务层", "组件": "微服务集群", "职责": "业务逻辑"},
      {"层级": "L2 数据层", "组件": "DB/Cache/Queue", "职责": "数据持久化"},
      {"层级": "L1 基础设施", "组件": "K8s/网络/存储", "职责": "底层支撑"}
    ]
  },
  "visualEncoding": {
    "highlight": [{"series": "L3 服务层", "color": "#c26d3a"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "服务层是当前改造重点", "target": "L3 服务层"}
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

- **模式号 → renderTarget 映射**：55 属于 49-72 范围 → viz-svg-flow（SKILL.md §四）
- **renderTarget 字段**：显式声明 "viz-svg-flow"（正确）
- **JSON 格式合法性**：v1 格式，所有必填字段齐全（正确）
- **判定**：PASS
