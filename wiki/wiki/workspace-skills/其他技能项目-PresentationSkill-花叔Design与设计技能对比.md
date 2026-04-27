# 其他技能项目 — Presentation Skill、花叔 Design 与设计技能对比测试

> Sources: mino, 2026-04-28
> Raw: ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-15-技能-书信精华PPT-20260416-presentation-skill-README.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-15-技能-书信精华PPT-20260416-presentation-skill-SKILL.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-02-技能-huashu-design-PPT-20260422-README.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-19-测试-设计技能对比-20260424-测试执行框架.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-19-测试-设计技能对比-20260424-测试材料-供应商月度概览.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-06-技能-全量可视化分析-20260421-00-技能顺序列表.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-06-技能-全量可视化分析-20260421-_metadata-index.md

## 概述

除 PPT Master 外，workspace-skills 目录还包含了多个独立技能项目的研究材料：Presentation Skill（演讲脚本+HTML PPT 一键生成器）、花叔 Design（HTML 高保原型设计技能）及其介绍演示文稿，以及设计技能对比测试框架。这些技能各有侧重，覆盖了从自动生成演示到专业高保真设计的不同场景。

## Presentation Skill — 演讲脚本 + PPT 一键生成器

### 核心定位

输入一个主题，自动生成演讲脚本和品牌级设计质感的 HTML 幻灯片。支持 62 种世界级品牌设计风格，一键切换。

### 触发词

"/ppt"、"做PPT"、"演讲稿"、"presentation"、"幻灯片"、"做个演示"

### 工作流

```
引导选风格 → 生成演讲脚本 → 设计幻灯片 → 输出 HTML → 浏览器预览
```

### 输入参数

| 参数 | 必须 | 说明 |
|------|------|------|
| 主题 | 是 | 演讲/演示的主题 |
| 风格 | 否 | 设计风格名称（不指定则引导选择） |
| 时长 | 否 | 目标演讲时长，默认 10 分钟 |
| 语言 | 否 | 脚本语言，默认中文 |
| 页数 | 否 | 幻灯片页数，默认约 1 页/分钟 |

### 设计风格分类

按场景分类的 62 种品牌设计风格：

- **科技/AI**：claude（温暖陶土）、vercel（极简黑白）、linear（超精简紫色）、stripe（标志性紫色渐变）
- **企业/品牌**：pentagram（信息建筑派）、apple（极致简洁）、google（材料设计）
- **学术/教育**：academic（学术规范）、university（高校品牌）
- **更多**：覆盖咨询、金融、政府等多场景

### 输出

单个 HTML 文件，包含完整的幻灯片和演讲脚本，支持：
- 点击/自动播放
- 键盘控制（方向键、空格、PageUp/PageDown）
- 导出 PDF

## 花叔 Design — HTML 高保真原型设计技能

### 项目定位

用 HTML 做高保真原型、交互 Demo。Pentagram 信息建筑派风格，深色背景 + 暖砖红 accent。

### 演示文稿结构

花叔 Design 的介绍 PPT 包含 12 页：

| 页码 | 内容 |
|------|------|
| 01 | 封面 |
| 02 | 项目定位 — 是什么 |
| 03 | 五大核心支柱概览 |
| 04 | 核心资产协议（v1.1） |
| 05 | Junior Designer 工作流 |
| 06 | 反 AI Slop 清单 |
| 07 | 五大支柱详解 |
| 08 | 设计方向顾问模式 |
| 09 | 专业交付能力 |
| 10 | 与其他技能对比 |
| 11 | 快速开始 |
| 12 | 封底 |

### 设计规范

- 尺寸：1920x1080（16:9）
- 风格：Pentagram 信息建筑派（深色背景 #111111 + 暖砖红 #D4532B accent）
- 字体：Inter (Display) + Noto Serif SC (中文)
- 装饰：左垂直渐变线条（Pentagram 标志性元素）
- 多文件结构：index.html 作为拼接器，每页独立 HTML 文件

## 设计技能对比测试（2026-04-24）

### 测试背景

对 5 个设计技能进行标准化对比测试，使用同一份测试数据（供应商管理月度概览），评估各技能在相同场景下的产出质量。

### 参与技能

| 序号 | 技能 | 完整度 | Brief 解读方向 |
|------|------|--------|---------------|
| 1 | diagram-design | 389 行 | 信息关系图 |
| 2 | huashu-design | 801 行 | 高保真仪表盘原型 |
| 3 | presentation-skill | 452 行 | 品牌级汇报幻灯片 |
| 4 | mino-frontend | 679 行 | 企业级数据看板页面 |
| 5 | html-ppt-skill | 186 行 | 轻量演示幻灯片 |

### 测试材料

使用 8 家供应商、5 个指标的供应商月度概览数据作为统一测试数据。

### 评估维度

| 维度 | 说明 |
|------|------|
| 视觉 | 视觉美观度 |
| 信息 | 信息传达清晰度 |
| 实用 | 实际可用性 |
| 调整 | 调整灵活性 |
| 主观满意度 | 整体满意度 |

### 执行方式

每次指定一个技能名，调用对应技能生成，产出保存到 `产出-{技能名}/` 目录，然后逐项评估。

## 技能顺序列表与元数据

全量可视化分析项目的技能顺序列表和元数据索引，记录了各技能的加载顺序和依赖关系。
