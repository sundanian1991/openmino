# AI学习库监控与最佳实践

> Sources: mino, 2026-04-27
> Raw: ../../raw/projects-ai-learning/project.md; ../../raw/projects-ai-learning/CLAUDE.md; ../../raw/projects-ai-learning/memory-CLAUDE.md; ../../raw/projects-ai-learning/memory-long-term.md; ../../raw/projects-ai-learning/memory-learning-notes.md; ../../raw/projects-ai-learning/memory-2026-03-01.md; ../../raw/projects-ai-learning/memory-2026-03-08.md; ../../raw/projects-ai-learning/memory-2026-03-15.md; ../../raw/projects-ai-learning/outputs-2026-02-28-full-scan.md; ../../raw/projects-ai-learning/outputs-2026-03-01-weekly-monitor.md; ../../raw/projects-ai-learning/outputs-COURSE-GUIDE.md; ../../raw/projects-ai-learning/outputs-LEARNING-ROADMAP.md; ../../raw/projects-ai-learning/outputs-WEEK1-AGENT-MCP.md; ../../raw/projects-ai-learning/outputs-resources-list.md; ../../raw/projects-ai-learning/outputs-initial-scan.md; ../../raw/projects-ai-learning/outputs-weekly-monitor-2026-03-01.md; ../../raw/projects-ai-learning/outputs-weekly-monitor-2026-03-08.md; ../../raw/projects-ai-learning/outputs-weekly-monitor-2026-03-15.md; ../../raw/projects-ai-learning/outputs-alternative-resources-complete-alternative-resources.md; ../../raw/projects-ai-learning/outputs-alternative-resources-cs25-transformers-course.md; ../../raw/projects-ai-learning/outputs-alternative-resources-domestic-ai-resources.md; ../../raw/projects-ai-learning/outputs-alternative-resources-final-learning-path-cn.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-CLAUDE.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-LEARNING-GUIDE.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-READING.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-SLIDES.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-STUDY-PLAN.md; ../../raw/projects-ai-learning/notes-best-practices-01-context-management.md; ../../raw/projects-ai-learning/notes-best-practices-02-planning-architecture.md; ../../raw/projects-ai-learning/notes-best-practices-03-tools-automation.md; ../../raw/projects-ai-learning/notes-best-practices-04-code-quality.md; ../../raw/projects-ai-learning/notes-best-practices-05-anti-patterns.md; ../../raw/projects-ai-learning/notes-best-practices-INDEX.md; ../../raw/projects-ai-learning/notes-monday-learning.md; ../../raw/projects-ai-learning/notes-subagent-analysis.md; ../../raw/projects-ai-learning/notes-CLAUDE.md; ../../raw/projects-ai-learning/guides-APIFY-GUIDE.md; ../../raw/projects-ai-learning/guides-apify-demo-CLAUDE.md; ../../raw/projects-ai-learning/guides-apify-demo-README.md; ../../raw/projects-ai-learning/scripts-CLAUDE.md

## 概述

AI学习库监控项目是年老师系统性学习AI技术趋势和最佳实践的长期项目。项目起始于2026年2月底，主要围绕两个知识源展开：Faces平台上的AI学习资源库（https://zara.faces.site/ai）和斯坦福大学CS146S课程（The Modern Software Developer）。项目的核心理念不是"学完所有内容"，而是"用学习改进我们的工作体系"。通过每周监控更新、整理学习笔记、提取最佳实践，项目为Mino（麦诺）的行为规则和能力进化提供了持续的知识输入。

## 一、AI学习库监控体系

### 监控目标

长期关注https://zara.faces.site/ai的内容更新，保存并整理下来学习。该网站是Faces平台上的AI学习资源库，聚合了多个高质量AI信息来源：Google Blog（Innovation & AI）、Google DeepMind Blog、Google Research Blog、Google Cloud Blog、Google Developers Blog、Smol AI News、Ben's Bites、YouTube播放列表。

### 执行策略

**阶段1：初始抓取（本周）**。抓取网站完整内容结构，整理现有资源清单，建立基线存档。

**阶段2：定期监控（持续）**。每周抓取一次，对比更新，记录新增内容。抓取频率控制在每周一次，避免过度请求。

**阶段3：学习整理（持续）**。提取关键信息，形成个人学习笔记，定期回顾。

### 监控执行记录

项目于2026年2月28日完成首次完整抓取和整理，建立了完整的资源清单和基线存档。之后在3月1日、3月8日、3月15日分别执行了三次周度监控，对比内容变化，记录新增资源。

**周度监控流程**：
1. 抓取网站当前内容状态
2. 与上一次抓取的基线对比
3. 识别新增、更新、删除的内容
4. 更新资源清单
5. 记录监控日志

### 替代学习资源

除了主要监控的网站，项目还整理了替代学习资源：
- **CS25 Transformers课程**：深入理解Transformer架构的学术课程
- **国内AI资源**：面向中国用户的AI学习资源和社区
- **完整学习路径（中文版）**：整合了国际和国内资源的系统化学习路径

这些补充资源确保了学习的全面性和本地相关性。

## 二、斯坦福CS146S课程学习

### 课程概况

斯坦福大学《The Modern Software Developer》课程（CS146S），课程网站https://themodernsoftware.dev，作业仓库https://github.com/mihail911/modern-software-dev-assignments。课程涵盖10周内容，覆盖现代软件开发的核心主题。

### 学习策略——"不追求vs追求"

**不追求**：
- 完成所有作业
- 看完所有视频
- 读完所有文章

**追求**：
- 用课程改进我们的工作体系
- 内化Agent/MCP/安全/审查最佳实践
- 两周落地4个改进任务

这种学习策略体现了年老师的实用主义学习观——不为学习而学习，而是为了改进实际工作。

### 两周学习路线图

**第一梯队（本周完成）**：
- Week 4（Agent模式）：直接改进Subagent策略，3小时
- Week 2（MCP）：已配置，可深化，2小时

**第二梯队（下周完成）**：
- Week 6（测试安全）：补充测试套件，3小时
- Week 7（代码审查）：改进Plan First验证，2小时

**第三梯队（有时间再看）**：
- Week 3（AI IDE）：已有CLAUDE.md
- Week 5（现代终端）：Warp vs Claude Code
- Week 8-10（高级话题）：等核心内容消化后再说

### 第一周学习成果（2026-03-01至03-07）

主题：Agent模式+MCP深化。

**必读文章**：
- How Anthropic Uses Claude Code：了解Anthropic内部如何使用Claude Code，对比我们的实践
- Claude Code Best Practices：社区综合分析的最佳实践
- Specs Are the New Source Code：规格说明正在成为新的源代码——这直接影响了我们的Plan First机制

**核心任务**：
1. 改进Subagent策略（明确自主级别）
2. 优化MCP配置（添加验证脚本）

### 关键洞察

**核心理念**：软件开发已从0-1编码演变为迭代工作流：plan → generate with AI → modify → repeat。这个理念直接映射到我们的知识工作——不是从头开始写，而是在AI辅助下迭代改进。

**改进方向**：
1. Agent Manager模式——明确自主级别
2. MCP深化——优化配置+验证
3. AI安全扫描——添加Semgrep
4. AI代码审查——改进验证流程

## 三、Claude Code最佳实践

### Context管理最重要

**阈值**：Token数量60k+立即清理；Context占用30%+立即清理；修复时间需要新手能修复时才Document & Clear。

Context管理是Claude Code成功的基础。Context溢出是功能退化的首要原因，必须在达到阈值前主动清理。

### Plan First不可协商

**触发条件**：步骤≥3步、涉及删除/覆盖、新功能实现、架构级修改——必须Plan First。

Plan First是我们已经内化的核心原则。课程验证了这个方向的正确性，并提供了更严格的触发条件。

### Skills & Hooks & 简单控制循环

Skills是可复用的工作模式，Hooks是自动化的触发器，简单控制循环是让AI重复执行直到满足条件的机制。这三者构成了自动化的三层体系。

**子代理选择**：
- Explore：快速查找文件、搜索模式
- general-purpose：多步骤研究任务
- Plan：软件架构规划

### TDD与代码审查

测试驱动开发（TDD）和代码审查是质量保障的两个关键环节。在知识工作语境中，TDD对应"先定义验收标准再执行"，代码审查对应"完成后的逆向检验"。

### 反模式与避坑

常见的反模式包括：过度工程化（为不需要的灵活性做抽象）、上下文污染（不相关的探索信息留在主上下文）、缺少验证（执行后不检查结果）、计划不足（≥3步的任务没有Plan First）。

## 四、Apify爬虫集成

### Apify指南

Apify是一个网页自动化和爬虫平台。项目研究了如何使用Apify来自动化AI学习库的监控流程。

**核心应用**：
- 定期抓取AI学习库的内容更新
- 自动对比新旧内容
- 生成更新报告

### Demo与脚本

项目创建了Apify demo，验证了自动化抓取的可行性。脚本（scripts）定义了抓取、对比、报告的完整流程。

## 五、学习对Mino体系的影响

AI学习项目不是纯粹的个人学习，而是直接影响了Mino（麦诺）的行为规则和能力进化：

**AGENT-FIRST.md**：子代理优先策略的灵感部分来源于课程中的Agent模式学习和最佳实践。

**00-IDENTITY.md**：显性思维、验收合同、逆向检验等原则，与课程中的Plan First、TDD、代码审查有深刻的对应关系。

**09-TOOLS.md**：工具使用优先级的设计，参考了课程中关于Skills、Hooks、MCP的最佳实践。

**12-TRANSPARENT.md**：透明工作流原则，与课程中关于Context管理和计划透明度的建议一致。

## 核心洞察

### 实用主义学习观

年老师的学习方式体现了强烈的实用主义：不为学习而学习，而是为了改进实际工作。CS146S课程的学习目标不是"学完课程"，而是"用课程改进我们的工作体系"。这种学习方式效率极高，因为每个知识点都会立即被评估"对我们有什么用"。

### 持续监控的知识获取

每周监控AI学习库，而不是"一次性学习"，确保了对技术趋势的持续跟进。这是一种"知识流水线"而非"知识批处理"的方式，更适应AI领域的快速变化。

### 最佳实践的跨域迁移

课程中的软件开发最佳实践（Plan First、TDD、Context管理、代码审查）可以直接映射到知识工作的最佳实践。这揭示了一个深层规律：无论是软件开发还是知识工作，高质量工作的底层原则是相通的。

## 相关文件索引

| 文件簇 | 文件数 | 核心内容 |
|--------|--------|----------|
| 项目主文档 | 4 | project.md、CLAUDE.md、memory文件 |
| 监控输出 | 8 | 首次抓取、三次周度监控、资源清单、COURSE-GUIDE、LEARNING-ROADMAP、WEEK1 |
| Stanford CS146S | 5 | LEARNING-GUIDE、READING、SLIDES、STUDY-PLAN、CLAUDE |
| 替代资源 | 4 | 完整替代资源、CS25课程、国内AI资源、中文学习路径 |
| 最佳实践笔记 | 7 | INDEX、5篇详细笔记、monday-learning、subagent-analysis |
| Apify集成 | 4 | APIFY-GUIDE、demo相关文件、scripts |
