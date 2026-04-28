# 花叔Design项目

> Sources: 花叔Design PPT README (2026-04-22); 技能全量可视化分析 (2026-04-21); 技能元数据索引, 2026-04-28
> Raw:[花叔Design PPT README](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-02-技能-huashu-design-PPT-20260422-README.md); [技能全量可视化分析](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-06-技能-全量可视化分析-20260421-00-技能顺序列表.md); [技能元数据索引](../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-06-技能-全量可视化分析-20260421-_metadata-index.md)

## 概述

花叔Design（Huashu-Design）是 Mino 技能体系中专注于高保真 HTML 原型和交互 Demo 的前端设计技能。它采用"用 HTML 做设计"的理念，跳过传统 Figma/Sketch 流程，直接以浏览器为画布，产出可运行、可交互的高保真原型。该技能同时具备完整的 PPT 演示能力，能够自介绍、自展示、自交付。

---

## 一、技能定位与核心理念

花叔Design 的核心理念是"设计即代码"——不是简单的 CSS 美化，而是通过 HTML+CSS+JS 构建完整的设计系统。与传统设计工具不同，花叔Design 的产出物就是最终可用的网页原型，而非需要二次开发的"设计稿"。

**五大核心支柱**：
1. **核心资产协议**：定义可复用的设计资产（tokens、组件、布局模式）
2. **Junior Designer 工作流**：让初级设计师（或 AI）也能产出专业级设计
3. **反 AI Slop 清单**：对抗 AI 生成内容的低质美学——拒绝紫色渐变、Emoji 图标、装饰性圆角卡片等 AI 味视觉
4. **设计方向顾问模式**：当不确定用什么风格时，提供专业的设计方向建议
5. **专业交付能力**：产出可直接交付的 HTML 原型，而非需要翻译的 PSD/Figma 文件

---

## 二、演示文稿系统

花叔Design 自带一套 12 页的演示文稿系统，用于向用户/团队介绍技能本身。

### 文件结构

```
huashu-design-ppt/
├── index.html              # Deck 索引（多文件拼接器）
├── shared/tokens.css       # 设计系统 Token（品牌色/字体/间距）
└── slides/
    ├── 01-cover.html           # 封面
    ├── 02-what-is-it.html      # 项目定位
    ├── 03-philosophy.html      # 五大核心支柱概览
    ├── 04-asset-protocol.html  # 核心资产协议（v1.1）
    ├── 05-junior-flow.html     # Junior Designer 工作流
    ├── 06-anti-slop.html       # 反 AI Slop 清单
    ├── 07-pillars-detail.html  # 五大支柱详解
    ├── 08-fallback-mode.html   # 设计方向顾问模式
    ├── 09-delivery.html        # 专业交付能力
    ├── 10-comparison.html      # 与其他技能对比
    ├── 11-getting-started.html # 快速开始
    └── 12-thank-you.html       # 封底
```

### 设计规范

- **尺寸**：1920×1080 (16:9)
- **风格**：Pentagram 信息建筑派（深色背景 `#111111` + 暖砖红 `#D4532B` accent）
- **字体**：Inter (Display) + Noto Serif SC (中文)
- **装饰**：左垂直渐变线条（Pentagram 标志性元素）
- **零外部依赖**：纯 HTML+CSS+内联样式，可在任何现代浏览器中运行

### 导出能力

支持三种导出方式：
1. **PPTX 导出**（推荐）：通过 `export_deck_pptx.mjs` 脚本，支持图片模式（100% 视觉保真）和可编辑模式
2. **浏览器打印为 PDF**：按 P 键打印，保存为 PDF 后转换
3. **Playwright 截图**：自动生成 12 张 PNG，可在 PowerPoint 中手动拼接

---

## 三、与其他技能的关系

在技能全量可视化分析中，花叔Design 被归类为前端设计类技能。与之相关的技能包括：

- **impeccable**：高品质前端设计，anti-AI-slop 美学（168 行 SKILL.md，9 文件，132K）
- **cinematic-ui**：电影感 UI 设计，导演级艺术指导（270 行，87 文件，11M）
- **mino-frontend**：年老师专属前端技能，54 设计系统（679 行，2461 文件，11M）
- **diagram-design**：技术图表设计，架构/流程/序列图（389 行，106 文件，2.3M）
- **chart-visualization**：数据图表可视化，26 种图表类型（68 行，28 文件，116K）

花叔Design 在其中的独特定位是"高保真 HTML 原型"——不是生成图表或信息图，而是做完整的交互界面。

---

## 四、设计技能对比测试

2026-04-24 进行了设计技能大比武，对同一素材同一场景进行标准化评估。测试执行框架包含：

- 测试材料：供应商月度概览数据
- 执行框架：统一的评估流程和验收标准
- 对比维度：视觉品质、信息传达效率、设计一致性

这次测试是花叔Design 在真实场景中的能力验证，也是技能体系中设计类技能的横向对标。

---

## 五、验证清单与质量保证

花叔Design 的 PPT 交付前需通过以下验证：

- HTML 语法验证通过（全部页面）
- tokens.css 路径正确且加载正常
- 无外部依赖（纯 HTML+CSS+内联样式）
- 符合反 AI slop 原则（无紫渐变、无 Emoji 图标、无装饰性圆角卡片）
- 品牌识别元素应用（暖砖红 accent + 深色背景 + Pentagram 网格）

这套验证清单也是整个 Mino 技能体系的质量标准——任何前端交付物都应满足零外部依赖、反 slop 美学、品牌一致性三项基本要求。
