# AI 学习监控项目深度 — 资源追踪与变化检测

> 不是"学完课程"，是"用课程改进我们的工作体系"

> Sources: mino, 2026-04-28
>
> （共 46 个文件）


---

## 概述

AI 学习监控项目（projects-ai-learning）是该 wiki 中文件数量最多、结构最复杂的子项目。它不是单一项目，而是两个并行子项目的集合：一是对 Zara Zhang AI 资源库的长期监控与变化检测，二是对斯坦福大学 CS146S 课程的深度学习与实践转化。

该项目包含 46 个文件，覆盖资源扫描、课程整理、学习路线、最佳实践笔记、周度监控、替代资源、集成指南等多个维度。核心理念始终一致：不追求"学完所有内容"，追求"用所学改进我们的工作体系"。

---

## 子项目一：Zara Zhang AI 资源库监控

### 项目背景

2026 年 2 月 28 日，Mino 首次完整扫描了 Zara Zhang 手工精选的 AI 学习资源库（https://zara.faces.site/ai）。该资源库的特点是免费访问和非技术人员友好，作者 Zara Zhang 是产品经理背景，筛选标准注重实用性和可理解性。

### 资源库全景

首次扫描识别出 64 项资源，分为五大类：

**Featured Videos（6 个）**：Zara 亲自观看并推荐的 AI 视频。包括 Andrej Karpathy 的 Deep Dive into LLMs（3.5 小时，最好的 LLM 入门教程）、Anthropic 官方的 Prompting 101、Google NotebookLM 幕后故事等。每个视频都配有 LongCut 时间戳学习工具链接。

**Video Podcasts（12 个）**：推荐持续关注的播客频道，包括 Latent Space（AI 工程师社区）、AI & I（最聪明的人如何用 AI）、Google DeepMind Podcast、Training Data（Sequoia 对话 AI 创业者）、Lenny's Podcast（产品增长）等。

**People to Follow（31 人）**：原则是"关注构建者，而非影响者"。涵盖 Andrej Karpathy（AI 教育）、Swyx（AI 工程师社区）、Cat Wu 和 Thariq（Claude Code 团队）、Amanda Askell（Claude 人格专家）、Guillermo Rauch（Vercel CEO）、Amjad Masad（Replit CEO）等。

**Newsletters（6 个）**：AI Valley（每日 AI 动态）、Every（AI 时代深度思考）、Ben's Bites（非技术人员友好）、AINews by smol.ai（AI 工程师专用）、Peter Yang（PM 技巧）、The Keyword（Google AI 新闻）。

**Products（9 个）**：NotebookLM（知识整理）、Granola（AI 会议笔记）、Snipd（播客高光提取）、TLDW（YouTube 视频学习工具）等。

### 监控机制

项目设计了三层执行策略：阶段一完成初始抓取建立基线存档；阶段二建立每周一次的定期监控对比更新；阶段三形成个人学习笔记库定期回顾。抓取频率设定为每周一次，避免过度请求。文件按日期组织在 outputs/ 目录。

---

## 子项目二：斯坦福 CS146S 课程深度内化

### 课程概览

CS146S: The Modern Software Developer 是斯坦福大学 2025 秋季课程，讲师 Mihail Eric。核心问题：AI 如何 10x 开发者生产力？核心理念：软件开发已从 0-1 编码演变为迭代工作流——plan → generate with AI → modify → repeat。

课程 10 周，每周包含讲座、阅读材料和动手作业。业界嘉宾阵容豪华：Cognition（Devin）Head of Research Silas Alberti、Claude Code 创始人 Boris Cherney、Warp CEO Zach Lloyd、Semgrep CEO Isaac Evans、Graphite CPO Tomas Reimers、Vercel Head of AI Research Gaspar Garcia、a16z General Partner Martin Casado。

### 课程 10 周结构

| 周次 | 主题 | 核心概念 | 必读亮点 |
|------|------|---------|---------|
| **Week 1** | LLM 与 AI 开发入门 | Prompt Engineering | Karpathy 77 分钟视频 |
| **Week 2** | 编码 Agent 解剖 | MCP（Model Context Protocol） | MCP 服务器实现列表 |
| **Week 3** | AI IDE | Context 管理、Specs as Source | Specs Are the New Source Code |
| **Week 4** | 编码 Agent 模式 | Agent Manager 模式 | Anthropic 如何使用 Claude Code（PDF） |
| **Week 5** | 现代终端 | AI 增强 CLI | Warp vs Claude Code |
| **Week 6** | AI 测试与安全 | Secure Vibe Coding、Context Rot | Copilot Prompt Injection RCE |
| **Week 7** | 现代代码审查 | AI 代码审查 | 百万次 AI 代码审查经验教训 |
| **Week 8** | 自动化 UI 构建 | 前端民主化 | 单个 prompt 构建端到端应用 |
| **Week 9** | 部署后 Agent | SRE、可观测性 | Google SRE Book |
| **Week 10** | AI 软件工程未来 | 未来 10 年趋势 | Martin Casado（a16z） |

### 学习策略与优先级

Mino 制定了明确的学习优先级矩阵，不按课程顺序学，而是按"对我们工作的价值"排序：

**第一梯队（高价值高相关性）**：Week 4（Agent 模式，直接改进 Subagent 策略）和 Week 2（MCP，已有配置可深化）。

**第二梯队（高价值中相关性）**：Week 6（测试安全，补充测试套件）和 Week 7（代码审查，改进 Plan First 验证）。

**第三梯队（有时间再看）**：Week 3（AI IDE，已有 CLAUDE.md）、Week 5（现代终端）、Week 8-10（高级话题）。

学习路线图设计为两周计划：第一周专注 Agent + MCP（6-8 小时），第二周专注安全 + 审查（6-8 小时）。每周周五 15 分钟复盘。

### 四大实践任务

**任务 1：Agent Manager 模式**。明确 Agent 自主级别（低/中/高），添加 Human-in-the-loop 检查点，优化并行策略（避免过度调用）。验收标准包括更新 Subagent 策略、添加"何时不用 Subagent"规则、实施并行任务数量限制。

**任务 2：MCP 深化**。评估是否需要自定义 MCP Server，优化 MCP 工具选择逻辑，添加 MCP 配置验证脚本。

**任务 3：AI 安全扫描**。添加 Semgrep 或类似工具，检测 AI 生成代码的安全漏洞，更新 Plan First 验证清单添加安全检查。

**任务 4：AI 代码审查**。定义 AI 代码审查清单，更新 verify-plan.sh 添加审查步骤，评估 Graphite 或类似工具。

---

## 子项目三：最佳实践笔记体系

### 五大最佳实践领域

基于 CS146S 课程学习，Mino 建立了五个领域的详细最佳实践笔记：

**01 Context 管理（462 行）**：核心认知是 Context 退化是 Claude Code 的主要失败模式。涵盖上下文质量优于数量、上下文窗口管理策略、Context Rot 预防和修复。

**02 规划与架构（682 行）**：Plan First 不可协商。涵盖规范驱动开发、架构决策模式、从规划到执行的转换。

**03 工具与自动化（614 行）**：Skills 需要自动激活才能可靠工作；Hooks 是质量保障的最后防线。涵盖技能系统优化、自动化脚本设计、质量检查点。

**04 代码质量（615 行）**：AI 生成的代码经常"表面上工作"但包含微妙 bug；测试提供唯一可靠的验证机制。涵盖 TDD 对 AI 的重要性、测试覆盖率策略、质量检查清单。

**05 反模式与避坑（614 行）**：知道什么不该做，比知道什么该做更重要。涵盖常见错误模式、反模式分类、避坑指南。

### Subagent 策略分析

专门的分析文档（237 行）对比了当前 Subagent 策略与 Anthropic 最佳实践，识别改进方向。核心发现：当前策略分为 Explore（快速探索）、general-purpose（复杂任务）、Plan（架构设计）三种，需要明确自主级别和并行限制。

---

## 子项目四：替代学习资源

### CS25 Transformers 课程

斯坦福 CS25: Transformers United 作为补充学习资源，深入理解 Transformer 架构和技术细节。

### 国内 AI 资源（237 行）

考虑到中文学习需求，整理了国内可用的 AI 学习资源，包括中文课程、中文社区、国内 AI 公司动态跟踪。

### 最终学习路径（352 行）

整合所有资源形成完整的中文版学习路径，从 LLM 基础到 Agent 模式到安全审查，逐步递进。

---

## 子项目五：Apify 集成指南

### 快速开始

Apify 集成指南（416 行）提供 5 分钟上手的 Apify + Claude Code 集成方案，用于执行网页抓取任务。包括前置条件、安装步骤、第一个 Actor 执行、结果处理。

---

## 周度监控记录

项目建立了每周监控机制，记录如下：

- **2026-02-28**：首次完整内容扫描，建立 64 项资源的基线
- **2026-03-01**：第一周监控，确认基线状态
- **2026-03-08**：第二周监控，对比变化
- **2026-03-15**：第三周监控，持续跟踪

---

## 关键认知

AI 学习监控项目的核心价值不在于"学了多少"，而在于"学到了什么可以用的"。CS146S 课程提供了业界前沿的 Agent 实践、MCP 深化方向、安全扫描方法和代码审查流程。Zara 资源库提供了持续的学习输入和人物网络。

两个子项目的结合方式：CS146S 提供深度（结构化课程和最佳实践），Zara 资源库提供广度（持续的行业动态和人物洞察）。监控机制确保不错过重要更新，最佳实践笔记确保学习转化为行动。

这种"监控 + 学习 + 实践"三位一体的模式，是 Mino 知识获取和体系建设的核心方法论。
