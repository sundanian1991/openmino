---
type: entity
title: "Widget 输出格式"
tags: [工具]
sources: [VZ-2026-500-widget指南]
created: 2026-06-17
updated: 2026-06-17
---

# Widget 输出格式

> 来源：[[VZ-2026-500-widget指南]]

`<generative-ui-widget>` 的标准结构。视觉在标签内，解释文字在标签外。

## 格式

```
解释文字写在标签外面...

<generative-ui-widget>
<style>/* 短、≤15 行 */</style>
<div class="widget"><!-- SVG/canvas/HTML --></div>
<script>/* 交互逻辑 */</script>
</generative-ui-widget>
```

## 流式渲染顺序

style 先 → HTML 中间 → script 最后。

## 相关

- [[Widget硬约束]] — 11 条约束
- [[色阶token系统]] — 内部可用色阶
