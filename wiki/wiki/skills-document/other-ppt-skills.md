# Magazine Web PPT（guizang-ppt-skill）

> Sources: guizang-ppt-skill, 2026-04-28
> Raw:[SKILL](../../raw/skills/guizang-ppt-skill-SKILL.md); [checklist](../../raw/skills/guizang-ppt-skill-checklist.md); [components](../../raw/skills/guizang-ppt-skill-components.md); [layouts](../../raw/skills/guizang-ppt-skill-layouts.md); [themes](../../raw/skills/guizang-ppt-skill-themes.md)

## 概述

Magazine Web PPT 生成"电子杂志 x 电子墨水"风格的横向翻页网页 PPT（单 HTML 文件）。视觉基调是 Monocle 杂志贴上了代码后的样子——不是商务 PPT，也不是消费互联网 UI。含 WebGL 流体背景、衬线标题+非衬线正文、章节幕封、数据大字报、图片网格等模板。

## 设计风格

- **WebGL 流体/等高线/色散背景**（hero 页可见）
- **字体系统**：Noto Serif SC + Playfair Display（标题）/ Noto Sans SC + Inter（正文）/ IBM Plex Mono（元数据）
- **Lucide 线性图标**（零 emoji）
- **横向左右翻页**（键盘、滚轮、触屏、底部圆点、ESC 索引）
- **主题平滑插值**：翻到 hero 页时颜色和 shader 柔顺过渡

## 适用场景

适合线下分享、AI 产品发布、demo day、个人风格强烈的演讲。不适合大段表格数据、复杂图表（应使用常规 PPT 或数据可视化方案）。

## 组件库

覆盖 8 类核心组件：基础 Slide 外壳、字体系统、Chrome & Foot、Callout 引用框、Stat 数字矩阵、Platform 平台卡、Rowline 表格行、Image Grid 图片网格。配合质量检查清单（P0 不能犯的错、P1 排版节奏、P2 视觉打磨、P3 操作细节、最终自检）保证输出质量。
