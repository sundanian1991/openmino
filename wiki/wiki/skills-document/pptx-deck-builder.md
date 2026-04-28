# PPTX Deck Builder

> Sources: pptx-deck-builder, 2026-04-28
> Raw:[SKILL](../../raw/skills/pptx-deck-builder-SKILL.md); [README](../../raw/skills/pptx-deck-builder-README.md); [color palettes](../../raw/skills/pptx-deck-builder-color-palettes.md); [content strategy](../../raw/skills/pptx-deck-builder-content-strategy.md); [core patterns](../../raw/skills/pptx-deck-builder-core-patterns.md); [html2pptx](../../raw/skills/pptx-html2pptx.md); [OOXML](../../raw/skills/pptx-ooxml.md)

## 概述

PPTX Deck Builder 使用 PptxGenJS 生成专业 .pptx 演示文稿。支持多种颜色调色板、内容策略和核心幻灯片模式。与 HTML PPT 的区别是直接输出 .pptx 文件（非 HTML），适合需要原生 PowerPoint 格式交付的场景。

## 核心能力

- **颜色调色板**：多种预定义配色方案
- **内容策略**：标题、正文、数据、引用等不同内容的呈现方式
- **核心模式**：标题页、章节页、内容页、数据页、总结页
- **HTML 转 PPTX**：将 HTML 内容转换为 .pptx 格式
- **OOXML 规范**：直接操作 OOXML 实现高级定制

## 与 html-ppt-skill 的区别

| 维度 | pptx-deck-builder | html-ppt-skill |
|------|-------------------|----------------|
| 输出格式 | .pptx 文件 | HTML 文件 |
| 交互 | 无（静态文件） | 键盘控制、自动播放 |
| 设计灵活性 | 受 PPTX 限制 | CSS 全能力 |
| 适用场景 | 需要 PPTX 交付 | 技术分享/演讲 |
