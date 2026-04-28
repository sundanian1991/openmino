# Magazine Web PPT（guizang-ppt-skill）

> Sources: guizang-ppt-skill, 2026-04-28
> Raw:[SKILL](../../raw/skills/guizang-ppt-skill-SKILL.md); [checklist](../../raw/skills/guizang-ppt-skill-checklist.md); [components](../../raw/skills/guizang-ppt-skill-components.md); [layouts](../../raw/skills/guizang-ppt-skill-layouts.md); [themes](../../raw/skills/guizang-ppt-skill-themes.md)

## 概述

生成"电子杂志 x 电子墨水"风格的横向翻页网页 PPT（单 HTML 文件）。视觉基调是 Monocle 杂志贴上了代码——不是商务 PPT，也不是消费互联网 UI。含 WebGL 流体背景、衬线标题+非衬线正文、章节幕封、数据大字报、图片网格。

## 设计风格

- WebGL 流体/等高线/色散背景（hero 页可见）
- 字体：Noto Serif SC + Playfair Display（标题）/ Noto Sans SC + Inter（正文）/ IBM Plex Mono（元数据）
- Lucide 线性图标（零 emoji）
- 横向翻页（键盘/滚轮/触屏/底部圆点/ESC 索引）

## 适用场景

线下分享、AI 产品发布、demo day、个人风格演讲。不适合大段表格数据、复杂图表。

## 工作流程

**Step 1** · 需求澄清：受众/时长（15min≈10 页/30min≈20 页/45min≈25-30 页）/素材/主题色。无大纲时用叙事弧搭骨架：钩子→定调→主体→转折→收束。

**Step 2** · 拷贝 `template.html` 到项目，**改掉 `[必填]` 占位符**。

**Step 3** · 选主题色（5 套预设，不接受自定义）：墨水经典（默认）/ 靛蓝瓷 / 森林墨 / 牛皮纸 / 沙丘。

**Step 4** · **预检（最重要）**：写 slide 前 Read `template.html` 的 `<style>`，确认类名存在。从 layouts.md 复制骨架，不从空白写。10 种布局：封面/幕封/大字报/左文右图/图片网格/流水线/悬念/大引用/对比/图文混排。

**Step 5** · 自检（见下方清单）。

## 组件库

| 组件 | 关键类 | 用途 |
|------|--------|------|
| Slide 外壳 | `slide light/dark/hero` | 每页，必须带 `data-theme` |
| 字体 | `.display-zh` / `.h1-zh` / `.body-zh` / `.kicker` / `.big-num` | 衬线=标题数字，非衬线=正文，等宽=元数据 |
| Chrome & Foot | `.chrome` / `.foot` | 页眉页脚杂志感 |
| Callout | `.callout` + `.q-big` | 金句引用框 |
| Stat 数字矩阵 | `.stat`（`.m`→`.n`→`.l`） | 数据指标 |
| Pillar | `.pillar`（`.ic`/`.t`/`.d`） | 三支柱概念 |
| Figure 图片框 | `.tile` + `.frame-img` | 图片容器 |
| Icons | `data-lucide="target"` | Lucide 线性图标 |
| Ghost | `.ghost` | 巨型装饰背景字 |
| Highlight | `.hi` | 荧光标记 |

### 图片规范（最容易踩坑）

- **用 `height:Nvh` 固定高度**，不用 `aspect-ratio`（网格中撑破）
- **只裁底部**（`object-position:top`），左右和顶部不裁
- **标准比例**：16:10 / 4:3 / 3:2 / 1:1 / 16:9
- **不用 `align-self:end`**（滑到被浏览器工具栏遮挡）

## 质量检查清单

### P0 · 不能犯的错

| 规则 | 后果 |
|------|------|
| 生成前 Read template.html `<style>` 确认类名 | 样式全部丢失 |
| 禁用 emoji 图标 | 破坏杂志格调 |
| 图片用 `height:Nvh` 不用 `aspect-ratio` | 网格撑破 |
| 大标题 ≤5 字且 `nowrap` | 1 字 1 行 |
| 标题衬线/正文非衬线/元数据等宽 | 视觉混乱 |

### P1-P2 · 节奏与视觉

- Hero 和 non-hero 交替，连续 3 页同主题不允许
- 8 页以上必须有 ≥1 hero dark + ≥1 hero light + ≥1 dark 正文页
- 术语统一用英文（Skills/Harness/Pipeline），不硬翻译
- Dark hero 遮罩 12-15%，light hero 16-20%，普通页 92-95%
- 图片圆角 4px（不超过 8px）

## 核心原则

克制优于炫技 | 结构优于装饰 | 图片是第一公民（只裁底部，固定高度）| 节奏靠 hero 页交替 | 术语统一不混合翻译
