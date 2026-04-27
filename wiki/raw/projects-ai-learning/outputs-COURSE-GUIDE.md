---
input: https://themodernsoftware.dev 课程网站
output: 斯坦福 CS146S 课程完整学习指南
pos: projects/stanford-cs146s/ 项目核心文档
---

# CS146S: The Modern Software Developer — 课程完整整理

> 斯坦福大学 2025 秋季课程 · AI 时代的软件开发者的培养方案

---

## 📋 课程概览

| 项目 | 内容 |
|------|------|
| **课程名** | CS146S: The Modern Software Developer |
| **学校** | 斯坦福大学 · 2025 秋季 |
| **学分** | 3 units |
| **先修** | CS111 等价编程经验，推荐 CS221/229 |
| **讲师** | Mihail Eric |
| **助教** | Febie Lin, Brent Ju |
| **格式** | 每周讲座 + 动手编码 + 业界嘉宾 |

### 课程目标

**核心问题**：AI 如何 10x 开发者生产力？

**核心理念**：
> 软件开发已从 0-1 编码演变为**迭代工作流**：plan → generate with AI → modify → repeat

**学生将掌握**：
- AI 辅助开发
- 自动化测试
- 智能文档
- 安全漏洞检测
- 将 LLM 集成到复杂开发工作流

### 评分结构

| 项目 | 占比 |
|------|------|
| **期末项目** | 80% |
| **每周作业** | 15% |
| **课堂参与** | 5% |

---

## 📚 周次大纲

### Week 1: LLM 与 AI 开发入门

**主题**：
- LLM 到底是什么
- 如何有效 prompt

**阅读**：
- [Deep Dive into LLMs](https://www.youtube.com/watch?v=7xTGNNLPyMI) - 77 分钟视频
- [Prompt Engineering Guide](https://www.promptingguide.ai/techniques)
- [How OpenAI Uses Codex](https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf)

**作业**：
- [LLM Prompting Playground](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week1)

**讲座**：
- 9/22: LLM 是如何制造的 [Slides](https://docs.google.com/presentation/d/1zT2Ofy88cajLTLkd7TcuSM4BCELvF9qQdHmlz33i4t0)
- 9/26: Power prompting [Slides](https://docs.google.com/presentation/d/1MIhw8p6TLGdbQ9TcxhXSs5BaPf5d_h77QY70RHNfeGs)

---

### Week 2: 编码 Agent 的解剖

**主题**：
- Agent 架构和组件
- Tool use / Function calling
- **MCP (Model Context Protocol)** ← 重点

**阅读**：
- [MCP Introduction](https://stytch.com/blog/model-context-protocol-introduction/)
- [MCP Server Implementations](https://github.com/modelcontextprotocol/servers)
- [MCP Registry](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/)
- [APIs Don't Make Good MCP Tools](https://www.reillywood.com/blog/apis-dont-make-good-mcp-tools/)

**作业**：
- [First Steps in the AI IDE](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week2)

**讲座**：
- 9/29: 从零构建编码 Agent [Slides](https://docs.google.com/presentation/d/11CP26VhsjnZOmi9YFgLlonzdib9BLyAlgc4cEvC5Fps)
- 10/3: 构建自定义 MCP Server [Slides](https://docs.google.com/presentation/d/1zSC2ra77XOUrJeyS85houg1DU7z9hq5Y4ebagTch-5o)

---

### Week 3: AI IDE

**主题**：
- Context 管理和代码理解
- PRDs for agents
- IDE 集成和扩展

**阅读**：
- [Specs Are the New Source Code](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code) ← 重要
- [How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html)
- [Devin: Coding Agents 101](https://devin.ai/agents101)
- [How FAANG Vibe Codes](https://x.com/rohanpaul_ai/status/1959414096589422619)
- [Writing Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents)

**作业**：
- [Build a Custom MCP Server](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week3/assignment.md)

**讲座**：
- 10/6: 从第一个 prompt 到最优 IDE 设置
- 10/10: **Silas Alberti** (Cognition Head of Research) - Devin 背后的团队

---

### Week 4: 编码 Agent 模式

**主题**：
- 管理 Agent 自主级别
- Human-Agent 协作模式

**阅读**：
- [How Anthropic Uses Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf) ← 必读
- [Claude Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Awesome Claude Agents](https://github.com/vijaythecoder/awesome-claude-agents)
- [SuperClaude Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)
- [Peeking Under Claude Code](https://medium.com/@outsightai/peeking-under-the-hood-of-claude-code-70f5a94a9a62)

**作业**：
- [Coding with Claude Code](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week4/assignment.md)

**讲座**：
- 10/13: 如何成为 Agent Manager
- 10/17: **Boris Cherney** (Claude Code 创始人) ← 重磅嘉宾

---

### Week 5: 现代终端

**主题**：
- AI 增强的 CLI
- 终端自动化和脚本

**阅读**：
- [Warp University](https://www.warp.dev/university)
- [Warp vs Claude Code](https://www.warp.dev/university/getting-started/warp-vs-claude-code)
- [How Warp Uses Warp to Build Warp](https://notion.warp.dev/How-Warp-uses-Warp-to-build-Warp-21643263616d81a6b9e3e63fd8a7380c)

**作业**：
- [Agentic Development with Warp](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week5)

**讲座**：
- 10/20: 如何构建 breakout AI 开发者产品
- 10/24: **Zach Lloyd** (Warp CEO)

---

### Week 6: AI 测试与安全

**主题**：
- Secure Vibe Coding
- 漏洞检测历史
- AI 生成的测试套件

**阅读**：
- [SAST vs DAST](https://www.splunk.com/en_us/blog/learn/sast-vs-dast.html)
- [Copilot Prompt Injection RCE](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/) ← 安全风险
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [Context Rot](https://research.trychroma.com/context-rot) ← 重要概念

**作业**：
- [Writing Secure AI Code](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week6/assignment.md)

**讲座**：
- 10/27: AI QA, SAST, DAST
- 10/31: **Isaac Evans** (Semgrep CEO)

---

### Week 7: 现代代码审查

**主题**：
- AI 代码审查
- Debug 和诊断
- 智能文档生成

**阅读**：
- [Code Reviews: Just Do It](https://blog.codinghorror.com/code-reviews-just-do-it/)
- [How to Review Code Effectively (GitHub)](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/)
- [AI-Assisted Code Review](https://arxiv.org/pdf/2405.13565)
- [AI Code Review Best Practices](https://graphite.dev/guides/ai-code-review-implementation-best-practices)
- [Lessons from Millions of AI Code Reviews](https://www.youtube.com/watch?v=TswQeKftnaw)

**作业**：
- [Code Review Reps](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week7)

**讲座**：
- 11/3: AI 代码审查
- 11/7: **Tomas Reimers** (Graphite CPO)

---

### Week 8: 自动化 UI 和应用构建

**主题**：
- 设计/前端民主化
- 快速 UI/UX 原型

**作业**：
- [Multi-stack Web App Builds](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week8)

**讲座**：
- 11/10: 单个 prompt 构建端到端应用
- 11/14: **Gaspar Garcia** (Vercel Head of AI Research)

---

### Week 9: 部署后的 Agent

**主题**：
- AI 系统监控和可观测性
- 自动化事件响应
- 分类和 Debug

**阅读**：
- [SRE Book Introduction](https://sre.google/sre-book/introduction/)
- [Observability Basics](https://last9.io/blog/traces-spans-observability-basics/)
- [Kubernetes Troubleshooting with AI](https://resolve.ai/blog/kubernetes-troubleshooting-in-resolve-ai)
- [Multi-Agent Systems for AI-native Engineering](https://resolve.ai/blog/role-of-multi-agent-systems-AI-native-engineering)

**讲座**：
- 11/17: 事件响应和 DevOps
- 11/21: **Resolve.ai CTO + Technical Staff**

---

### Week 10: AI 软件工程的未来

**主题**：
- 软件开发的未来 10 年
- 新兴 AI 编码范式
- 业界趋势预测

**讲座**：
- 12/1: 软件开发的未来
- 12/5: **Martin Casado** (a16z General Partner) ← 压轴嘉宾

---

## 🎯 核心知识体系

### 1. AI 开发工具链

```
Prompt Engineering → Coding Agent → AI IDE → MCP → Terminal AI
        ↓
    Testing/Security → Code Review → Deployment → Monitoring
```

### 2. 关键概念

| 概念 | 含义 | 周次 |
|------|------|------|
| **Vibe Coding** | AI 辅助的直觉式编码 | Week 6 |
| **Context Rot** | 上下文窗口退化 | Week 6 |
| **Agent Manager** | 管理 Agent 自主级别 | Week 4 |
| **Specs as Source** | 规范即源码 | Week 3 |
| **MCP** | Model Context Protocol | Week 2 |

### 3. 重量级嘉宾

| 周次 | 嘉宾 | 身份 | 公司 |
|------|------|------|------|
| Week 3 | Silas Alberti | Head of Research | Cognition (Devin) |
| Week 4 | Boris Cherney | Creator | Claude Code |
| Week 5 | Zach Lloyd | CEO | Warp |
| Week 6 | Isaac Evans | CEO | Semgrep |
| Week 7 | Tomas Reimers | CPO | Graphite |
| Week 8 | Gaspar Garcia | Head of AI | Vercel |
| Week 9 | Mayank Agarwal | CTO | Resolve.ai |
| Week 10 | Martin Casado | GP | a16z |

---

## 📁 作业仓库

所有作业都在这个 GitHub 仓库：
**https://github.com/mihail911/modern-software-dev-assignments**

| 周次 | 作业 | 链接 |
|------|------|------|
| Week 1 | LLM Prompting Playground | [week1/](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week1) |
| Week 2 | First Steps in AI IDE | [week2/](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week2) |
| Week 3 | Build Custom MCP Server | [week3/](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week3/assignment.md) |
| Week 4 | Coding with Claude Code | [week4/](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week4/assignment.md) |
| Week 5 | Agentic Development with Warp | [week5/](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week5) |
| Week 6 | Writing Secure AI Code | [week6/](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week6/assignment.md) |
| Week 7 | Code Review Reps | [week7/](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week7) |
| Week 8 | Multi-stack Web App Builds | [week8/](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week8) |

---

## 🔗 关键资源索引

### 必读论文/文章（Top 10）

1. [How Anthropic Uses Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf) ⭐⭐⭐
2. [Specs Are the New Source Code](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code) ⭐⭐⭐
3. [How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html) ⭐⭐⭐
4. [Claude Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) ⭐⭐
5. [Devin: Coding Agents 101](https://devin.ai/agents101) ⭐⭐
6. [Context Rot](https://research.trychroma.com/context-rot) ⭐⭐
7. [MCP Introduction](https://stytch.com/blog/model-context-protocol-introduction/) ⭐⭐
8. [Copilot Prompt Injection RCE](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/) ⭐⭐
9. [How FAANG Vibe Codes](https://x.com/rohanpaul_ai/status/1959414096589422619) ⭐
10. [Writing Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents) ⭐

### 视频资源

| 标题 | 链接 | 时长 |
|------|------|------|
| Deep Dive into LLMs | [YouTube](https://www.youtube.com/watch?v=7xTGNNLPyMI) | ~77 分钟 |
| AI Prompt Engineering Deep Dive | [YouTube](https://www.youtube.com/watch?v=T9aRN5JkmL8) | - |
| Lessons from Millions of AI Code Reviews | [YouTube](https://www.youtube.com/watch?v=TswQeKftnaw) | - |

### 工具/框架

| 类别 | 工具 |
|------|------|
| **AI IDE** | Claude Code, Cursor, Warp |
| **Agent** | Devin, SuperClaude |
| **MCP** | modelcontextprotocol/servers |
| **测试** | Semgrep |
| **代码审查** | Graphite |
| **UI 构建** | Vercel v0 |
| **监控** | Resolve.ai |

---

## 💡 与我们项目的相关性

### 直接可复用的内容

| 课程周次 | 我们的对应实践 | 可改进点 |
|---------|--------------|---------|
| **Week 2: MCP** | 已配置 MCP 工具 | 可构建自定义 MCP Server |
| **Week 3: AI IDE** | CLAUDE.md 配置 | 学习 Design Doc Template |
| **Week 4: Agent 模式** | Subagent 策略 | 优化 Agent Manager 模式 |
| **Week 6: 测试安全** | 测试套件框架 | 添加 AI 安全扫描 |
| **Week 7: 代码审查** | Plan First 验证 | 引入 AI 代码审查 |

### 值得学习的模式

1. **Spec-Driven Development** — 先写规范，再生成代码
2. **Context Engineering** — 管理上下文质量，避免 Context Rot
3. **Agent Manager Pattern** — 明确 Agent 自主级别
4. **Secure Vibe Coding** — AI 辅助但不盲目信任

---

## 📅 学习路线建议

### 快速入门（一周）

```
Day 1-2: Week 1 内容 + Prompt Engineering Guide
Day 3-4: Week 2 MCP 内容 + 阅读 MCP Introduction
Day 5-6: Week 4 Claude 最佳实践
Day 7: 完成 Week 1/2/4 作业
```

### 深度学习（四周）

```
Week 1: Week 1-3 内容 + 作业
Week 2: Week 4-6 内容 + 作业
Week 3: Week 7-9 内容 + 作业
Week 4: 期末项目（构建自己的 AI 开发工作流）
```

---

## 🎓 课程亮点

1. **业界前沿** — 嘉宾来自 Devin/Claude Code/Warp/Vercel/a16z
2. **实战导向** — 每周都有动手作业
3. **内容更新快** — 每周更新反映最新发展
4. **语言无关** — 重点在工具和实践，不是特定语言

---

## ⚠️ 注意事项

1. **先修要求**：需要 CS111 等价编程经验
2. **时间投入**：每周 10-12 小时（讲座 + 作业 + 项目）
3. **工具订阅**：部分工具需要付费（GitHub Copilot 等）
4. **内容时效**：AI 领域变化快，内容持续更新

---

*整理时间：2026-03-01*
*课程网站：https://themodernsoftware.dev*
*作业仓库：https://github.com/mihail911/modern-software-dev-assignments*
