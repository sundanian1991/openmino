---
type: concept
title: "Widget 硬约束"
tags: [工具]
sources: [VZ-2026-500-widget指南]
created: 2026-06-17
updated: 2026-06-17
---

# Widget 硬约束

> 来源：[[VZ-2026-500-widget指南]]

Widget 运行在沙箱 iframe 中，流式渲染。以下约束不可违反——违反会导致闪烁、崩坏或渲染截断。

## 11 条硬约束

| 约束 | 原因 |
|------|------|
| 禁止渐变、阴影、模糊、发光 | 流式渲染闪烁 |
| 禁止动画 | Chart.js 设 `animation: false` |
| 禁止 fetch / ajax / WebSocket | CSP 禁止网络请求 |
| 禁止 position:fixed | iframe 高度自适应 |
| 禁止 display:none / tab / carousel | 流式渲染崩溃 |
| 禁止 700+ 字重 | 只有 400 和 600 |
| 禁止 emoji | 用 SVG 或 CSS 替代 |
| 最小字号 11px | 可读性 |
| 响应式 | 百分比宽度，SVG 用 viewBox，最小 300px |
| 数据必须内联 | 网络被 CSP 阻断 |
| 单 widget ≤ 4000 字符 | 超过拆多个 |

> **关键**：回答文字和大型 widget 不要混在同一条回复（会导致渲染截断）。

## 相关概念

- [[Widget输出格式]] — generative-ui-widget 结构
- [[色阶token系统]] — Widget 内可用的色阶
