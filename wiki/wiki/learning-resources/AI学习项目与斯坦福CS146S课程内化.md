# AI 学习项目与斯坦福 CS146S 课程内化

> Sources: mino, 2026-04-28
> Raw:../../raw/projects-ai-learning/CLAUDE.md; ../../raw/projects-ai-learning/notes-README.md; ../../raw/projects-ai-learning/notes-best-practices-CLAUDE.md; ../../raw/projects-ai-learning/outputs-CLAUDE.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-README.md; ../../raw/projects-ai-learning/outputs-alternative-resources-CLAUDE.md; ../../raw/projects-ai-learning/guides-CLAUDE.md

## 概述

斯坦福大学 CS146S 课程（The Modern Software Developer）的学习项目是年老师系统化提升 AI 工程能力的重要途径。课程聚焦 Agent 模式、MCP、安全扫描和代码审查等现代软件开发最佳实践。

## 项目定位

这个项目不追求：
- 完成所有作业
- 看完所有视频

而是追求：
- 用课程改进我们的工作体系
- 内化 Agent/MCP/安全/审查最佳实践
- 两周落地4个改进任务

这种"学以致用、快速内化"的定位体现了年老师一贯的学习风格：不追求形式上的完成，而追求实质性的提升。

## 两周学习计划

### 第一周：Agent + MCP

**主题**：改进 Subagent 策略，优化 MCP 配置

**核心任务**：
1. 改进 Subagent 策略（明确自主级别）
2. 优化 MCP 配置（添加验证脚本）

**必读文章**：
- How Anthropic Uses Claude Code（Anthropic 内部使用指南）
- Claude Code Best Practices
- Specs Are the New Source Code

### 第二周：安全 + 审查

**主题**：添加安全扫描和 AI 审查流程

**核心任务**：
1. 添加 Semgrep 安全扫描
2. 改进 AI 代码审查流程

## 关键洞察

> **软件开发已从 0-1 编码演变为迭代工作流**：plan → generate with AI → modify → repeat

这个洞察直接关联到年老师的工作方式：不是"写代码"，而是"驱动AI完成迭代工作流"。

## 改进方向

基于课程学习，确定了四个改进方向：

1. **Agent Manager 模式**：明确自主级别，什么情况下让Agent独立工作，什么情况下需要人工干预
2. **MCP 深化**：优化配置，添加验证脚本确保外部连接的可靠性
3. **AI 安全扫描**：添加 Semgrep，在AI生成代码后自动进行安全扫描
4. **AI 代码审查**：改进验证流程，不仅仅是语法检查，还包括逻辑和安全性审查

## 替代资源

除了 CS146S 课程，项目还收集了替代学习资源：
- 其他 AI Agent 相关课程
- 开源最佳实践文档
- 行业报告和白皮书

这些资源作为课程的补充，确保学习路径的完整性。
