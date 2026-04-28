# AI 学习笔记

> Sources: Stanford CS146S 课程整理, 2026-03, 2026-04-28
> Raw:[CS146S课程指南](../../raw/projects-ai-learning/outputs-COURSE-GUIDE.md); [学习路线图](../../raw/projects-ai-learning/outputs-LEARNING-ROADMAP.md); [CS146S阅读清单](../../raw/projects-ai-learning/outputs-stanford-cs146s-READING.md); [AI学习库笔记](../../raw/projects-ai-learning/memory-learning-notes.md)

## 概述

本文档整理 Stanford CS146S（The Modern Software Developer）课程的核心知识体系，以及 AI 学习资源库的监控学习笔记。核心目标是"用课程改进工作体系"而非单纯完成课程作业。

## CS146S 课程概览

**斯坦福大学 2025 秋季课程**，讲师 Mihail Eric，核心问题：AI 如何 10x 开发者生产力？

核心理念：软件开发已从 0-1 编码演变为**迭代工作流**——plan → generate with AI → modify → repeat。

## 10 周核心知识体系

```
Prompt Engineering → Coding Agent → AI IDE → MCP → Terminal AI
        ↓
    Testing/Security → Code Review → Deployment → Monitoring
```

| 周次 | 主题 | 核心概念 |
|------|------|----------|
| Week 1 | LLM 与 Prompt 工程 | LLM 原理、Prompt 技巧 |
| Week 2 | 编码 Agent 解剖 | Agent 架构、MCP 协议 |
| Week 3 | AI IDE | Context 管理、Specs as Source |
| Week 4 | 编码 Agent 模式 | Agent 自主级别、Human-Agent 协作 |
| Week 5 | 现代终端 | AI 增强 CLI、终端自动化 |
| Week 6 | AI 测试与安全 | Secure Vibe Coding、Context Rot |
| Week 7 | 现代代码审查 | AI 辅助审查、智能文档 |
| Week 8 | 自动化 UI 构建 | 设计民主化、快速原型 |
| Week 9 | 部署后 Agent | 监控可观测性、自动化响应 |
| Week 10 | AI 软件工程未来 | 新兴范式、趋势预测 |

## 关键概念

| 概念 | 含义 | 来源 |
|------|------|------|
| **Vibe Coding** | AI 辅助的直觉式编码 | Week 6 |
| **Context Rot** | 上下文窗口随时间退化 | Week 6 |
| **Agent Manager** | 管理 Agent 自主级别 | Week 4 |
| **Specs as Source** | 规范即源码，先写规范再生成 | Week 3 |
| **MCP** | Model Context Protocol，工具扩展标准 | Week 2 |

## 必读资源（Top 5）

1. [How Anthropic Uses Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf) — Anthropic 内部使用模式
2. [Specs Are the New Source Code](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code) — 规范驱动开发
3. [How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html) — Context Rot 研究
4. [Claude Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Claude Code 最佳实践
5. [Writing Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — Agent 工具设计

## 课程实践应用

| 课程主题 | 对应工作实践 | 可改进点 |
|----------|-------------|----------|
| MCP 协议 | 已配置 MCP 工具 | 构建自定义 MCP Server |
| AI IDE | CLAUDE.md 配置 | 学习 Design Doc Template |
| Agent 模式 | Subagent 策略 | 优化 Agent Manager 模式 |
| 测试安全 | 测试套件框架 | 添加 AI 安全扫描 |
| 代码审查 | Plan First 验证 | 引入 AI 代码审查流程 |

## AI 学习资源库监控

**来源**：Zara Zhang 策划的 AI 学习资源库 (https://zara.faces.site/ai)

### 核心资源源

Google Blog/DeepMind/Research/Cloud/Developers、Smol AI News、Ben's Bites、YouTube 播放列表。

### 高价值发现

- **TLDW 工具** (tldw.us) — 从长 YouTube 视频中高效学习
- **Claude Code 团队** — Cat Wu (PM)、Thariq (trq212)，工具背后的核心团队
- **产品思维** — Granola CEO Chris Pedregal 的产品方法论

### 学习路径

1. 看 Karpathy 的 LLM 深入讲解（用 TLDW 加速）
2. 订阅 Ben's Bites 和 Peter Yang Newsletter
3. 关注 Claude Code 团队核心成员
