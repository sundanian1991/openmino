---
type: source
title: "Widget指南"
authors: ["年老师"]
raw: "raw/VZ-2026-500_widget指南.md"
ingested: 2026-06-17
created: 2026-06-17
updated: 2026-06-17
tags: [工具]
concepts: [Widget硬约束]
entities: [色阶token系统, Widget输出格式]
---

# Widget指南

对话消息流内嵌渲染的 HTML 片段系统：运行在沙箱 iframe，由 `<generative-ui-widget>` 包裹。唯一风格 Flat（无渐变/阴影/模糊/发光/3D），原因：流式渲染时这些效果会闪烁崩坏。

**核心贡献**：定义了 widget 的 11 条硬约束和 7 Ramps × 7 Stops 色阶 token 系统。色阶是 [[配色优先级]] 和 [[羊皮纸色彩系统]] 的底层 token 基础。

**Where this fits**：
- [[Widget硬约束]] — 11 条不可违反
- [[色阶token系统]] — 7 ramps × 7 stops
- [[Widget输出格式]] — generative-ui-widget 结构
