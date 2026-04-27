# AI技术学习资源与课程体系

> Sources: mino, 2026-04-27
> Raw: ../../raw/projects-ai-learning/outputs-resources-list.md; ../../raw/projects-ai-learning/outputs-alternative-resources-complete-alternative-resources.md; ../../raw/projects-ai-learning/outputs-alternative-resources-cs25-transformers-course.md; ../../raw/projects-ai-learning/outputs-alternative-resources-domestic-ai-resources.md; ../../raw/projects-ai-learning/outputs-alternative-resources-final-learning-path-cn.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-CLAUDE.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-LEARNING-GUIDE.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-READING.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-SLIDES.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-STUDY-PLAN.md; ../../raw/projects-ai-learning/outputs-initial-scan.md; ../../raw/projects-ai-learning/notes-monday-learning.md; ../../raw/projects-ai-learning/notes-subagent-analysis.md; ../../raw/projects-ai-learning/memory-learning-notes.md; ../../raw/workspace-other/ebooks--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-ebooks-Storytelling with Data - Cole Nussbaumer Knaflic.md; ../../raw/workspace-other/ebooks--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-ebooks-The Visual Display of Quantitative Information - Edward Tufte.md

## 概述

本文档整合了AI学习项目中关于技术学习资源和课程体系的内容，包括斯坦福CS146S课程的详细学习资源、替代学习资源的整理（国内AI资源、CS25 Transformers课程、完整学习路径）、以及具体的学习笔记（周一学习、子代理分析）。这些内容构成了年老师系统性学习AI技术的知识基础，为Mino的能力进化和供应商管理的AI赋能提供了理论支撑。

## 一、斯坦福CS146S课程——完整学习资源

### 课程概览

CS146S《The Modern Software Developer》是斯坦福大学开设的课程，覆盖现代软件开发的核心主题。课程网站https://themodernsoftware.dev提供完整的课程大纲、阅读材料、作业仓库。

课程共10周，涵盖以下主题：
- Week 1: 现代软件开发概述
- Week 2: MCP（Model Context Protocol）
- Week 3: AI IDE工具
- Week 4: Agent模式
- Week 5: 现代终端
- Week 6: 测试与安全
- Week 7: 代码审查
- Week 8-10: 高级话题

### 学习指南与计划

课程学习指南（LEARNING-GUIDE）提供了完整的学习路线图，包括每个周次的核心主题、必读文章、推荐阅读、预计时间。学习计划（STUDY-PLAN）则针对实际的学习场景进行了调整，选择了最相关的周次优先学习。

### 阅读材料与幻灯片

课程提供了丰富的阅读材料和幻灯片：
- **阅读材料**：涵盖Agent模式、MCP、AI IDE、安全审查等主题的必读和推荐文章
- **幻灯片**：每周课程的讲义，包含核心概念、案例分析、实践建议

这些材料的价值在于提供了学术级别的系统性知识，而非碎片化的博客文章。对于建立完整的知识体系至关重要。

## 二、替代学习资源

### 完整替代资源库

除了主要的监控网站和CS146S课程，项目还整理了更广泛的学习资源：

**学术课程**：
- CS25 Transformers课程：深入理解Transformer架构的斯坦福课程
- 其他大学的AI/ML课程：MIT、CMU等

**行业博客**：
- Anthropic Blog：Claude背后的研究团队
- OpenAI Blog：GPT系列的研究进展
- Google DeepMind Blog：前沿AI研究
- Ben's Bites：AI行业新闻和分析

**社区资源**：
- GitHub上的开源项目和教程
- Reddit的AI/ML社区
- 国内的AI技术社区

### 国内AI资源

面向中国用户的AI学习资源有其独特价值：
- 中文内容，降低学习门槛
- 更关注国内AI生态和应用场景
- 社区活跃度高，互动性强

整理的国内资源包括：
- 国内高校和企业的AI课程
- 中文AI技术博客和社区
- 国内AI工具和应用案例

### 最终学习路径（中文版）

整合国际和国内资源，制定了完整的中文学习路径：
- **入门阶段**：AI基础概念、主流工具介绍、简单应用场景
- **进阶阶段**：Agent模式、MCP、工作流设计、最佳实践
- **高级阶段**：安全审查、架构设计、前沿研究

这条路径确保学习者能够从基础到高级，逐步建立完整的AI知识体系。

## 三、具体学习笔记

### 周一学习——三篇文章汇总

2026-03-01的周一学习覆盖了三篇核心文章：

**文章1：Claude Code Best Practices综合分析**
核心收获是Plan First不可协商、Context管理最重要、简单胜过复杂。这些最佳实践直接影响了Mino的行为规则。

**文章2：How Anthropic Uses Claude Code**
核心收获是Anthropic内部如何使用Claude Code进行软件开发，包括Subagent策略、MCP配置、安全审查流程。对比我们的实践，发现有很多可以改进的地方。

**文章3：Specs Are the New Source Code**
核心收获是规格说明正在成为新的源代码。在AI辅助开发中，写清楚"要什么"比"怎么写"更重要。这直接映射到我们的Plan First机制——规格定义的质量决定了执行质量。

### 子代理分析

子代理分析文档深入研究了子代理（Subagent）的使用策略：

**子代理类型选择**：
- Explore：适合快速搜索和文件查找
- general-purpose：适合多步骤研究任务
- Plan：适合架构规划和复杂设计
- 专家子代理：适合领域特定任务

**子代理使用原则**：
- 能并行就不串行：独立任务同时启动
- 能深入就不浅尝：子代理可以继续创建孙子代理
- 能分工就不包揽：复杂任务拆给专家子代理
- 轻量不绕路：简单任务主代理直做

**上下文隔离**：
- 探索归子代理，决策归主代理
- 主上下文只装决策所需信息
- 宁派不读：涉及≥2个文件的读取，派子代理

这些分析直接影响了AGENT-FIRST.md的制定和完善。

## 四、资源清单与监控

### 初始资源清单

首次抓取时整理的完整资源清单，包含所有AI学习资源的名称、链接、简介、分类。这是后续学习和监控的基线。

### 资源分类

资源按以下维度分类：
- **来源**：学术课程、行业博客、开源项目、社区讨论
- **主题**：Agent模式、MCP、安全审查、AI IDE、测试
- **难度**：入门、进阶、高级
- **语言**：英文、中文

### 周度监控记录

三次周度监控（3月1日、3月8日、3月15日）记录了资源的变化：
- 新增资源
- 更新内容
- 删除资源

监控记录确保了对资源变化的持续跟踪，不会错过任何有价值的新内容。

## 核心洞察

### 学习路径的个性化

学习路径不是"通用的"，而是"个性化的"。年老师的学习路径聚焦于与工作直接相关的主题（Agent模式、MCP、安全审查），而非全面覆盖所有AI知识。这种聚焦确保学习效率最大化——每个学习投入都能产生实际回报。

### 国际化与本地化的平衡

整合国际和国内资源，既保证知识的前沿性（国际资源通常更领先），又保证学习的可行性（中文资源降低门槛）。这种平衡在AI领域尤其重要，因为技术更新极快，而中文内容的更新往往滞后。

### 学习笔记的结构性

学习笔记不是"读后感"，而是"结构化的知识提取"。每篇笔记都有明确的框架：核心收获、对我们的影响、改进方向。这种结构确保学习不只是"输入"，而是"输入→消化→输出"的完整闭环。

## 相关文件索引

| 文件簇 | 文件数 | 核心内容 |
|--------|--------|----------|
| Stanford CS146S | 5 | LEARNING-GUIDE、READING、SLIDES、STUDY-PLAN、CLAUDE |
| 替代资源 | 4 | 完整替代资源、CS25课程、国内AI资源、中文学习路径 |
| 学习笔记 | 4 | monday-learning、subagent-analysis、learning-notes、initial-scan |
| 资源监控 | 3 | resources-list、weekly-monitor × 3 |
