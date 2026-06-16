# 设计系统模板

> 参照 H092（全组件库五层结构）

---

## 适用场景

- 组件库/设计系统文档展示
- 跨产品 UI 一致性基座
- 品牌内部设计工具

---

## 推荐节奏骨架

1. **Foundation** — 设计令牌（色板/间距/字号/圆角/阴影/字体族）
2. **Components** — 原子→分子→组织，卡片式呈现，每组件含 ID/名称/状态/预览/规格
3. **Data Visualization** — 图表规范（配色映射/轴样式/图例/标注规则）
4. **Interaction** — 状态变化（hover/focus/active/disabled/loading）、过渡曲线和时长
5. **Anti-Patterns** — 常见错误用法、不推荐组合、回退方案

---

## 关键组件组合

- Top Nav（粘性导航 + 分类筛选 + 搜索）
- Comp Card（状态条 / ID 编号 / 名称 / 徽章 / 预览 / 规格行）
- Token Panel（变量名 + 值 + 使用示例）
- Section Header（字母索引 + 标题 + 说明 + 计数）
- Tag / Badge / Label（数据字体，标签化标识）

---

## 对照 H092

H092 的 82 组件覆盖 Foundation 到 Data Viz 四层；Interaction 和 Anti-Patterns 层可根据复杂度横向扩展。每层用独立 section 组织，section header 含字母索引便于跳转。
