---
input: Stanford CS146S 课程网站
output: 课程阅读材料完整清单
pos: 课程资源归档
---

# CS146S 阅读材料完整清单

> Stanford University • Fall 2025 • Instructor: Mihail Eric

---

## Week 1: Introduction to Coding LLMs

### 核心阅读

| 资源 | 类型 | 来源 | 链接 |
|------|------|------|------|
| **Deep Dive into LLMs** | 视频 | Andrej Karpathy | [YouTube](https://www.youtube.com/watch?v=7xTGNNLPyMI) |
| **Prompt Engineering Overview** | 文章 | Google Cloud | [Read](https://cloud.google.com/discover/what-is-prompt-engineering) |
| **Prompt Engineering Guide** | 指南 | DAIR.AI | [Read](https://www.promptingguide.ai/techniques) |
| **AI Prompt Engineering: A Deep Dive** | 视频 | - | [YouTube](https://www.youtube.com/watch?v=T9aRN5JkmL8) |
| **How OpenAI Uses Codex** | 论文 | OpenAI | [PDF](https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf) |

**B 站替代**：
- Karpathy Deep Dive into LLMs: [BV1jDNEeJEmm](https://www.bilibili.com/video/BV1jDNEeJEmm/)

---

## Week 2: The Anatomy of Coding Agents

### 核心阅读

| 资源 | 类型 | 来源 | 链接 |
|------|------|------|------|
| **MCP Introduction** | 文章 | Stytch | [Read](https://stytch.com/blog/model-context-protocol-introduction/) |
| **Sample MCP Server Implementations** | 代码 | MCP Official | [GitHub](https://github.com/modelcontextprotocol/servers) |
| **MCP Server Authentication** | 指南 | Cloudflare | [Read](https://developers.cloudflare.com/agents/guides/remote-mcp-server/#add-authentication) |
| **MCP Server SDK** | 文档 | MCP Official | [GitHub](https://github.com/modelcontextprotocol/typescript-sdk/tree/main?tab=readme-ov-file#server) |
| **MCP Registry** | 公告 | MCP Blog | [Read](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/) |
| **MCP Food-for-Thought** | 观点 | Reilly Wood | [Read](https://www.reillywood.com/blog/apis-dont-make-good-mcp-tools/) |

**重点**：理解 MCP 协议是学习 AI Agent 的关键

---

## Week 3: The AI IDE

### 核心阅读

| 资源 | 类型 | 来源 | 链接 |
|------|------|------|------|
| **Specs Are the New Source Code** | 文章 | Ravi Mehta | [Read](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code) |
| **How Long Contexts Fail** | 分析 | DBreunig | [Read](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html) |
| **Devin: Coding Agents 101** | 指南 | Devin.ai | [Read](https://devin.ai/agents101#introduction) |
| **Getting AI to Work In Complex Codebases** | 指南 | HumanLayer | [GitHub](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md) |
| **How FAANG Vibe Codes** | 推特 | Rohan Paul | [X](https://x.com/rohanpaul_ai/status/1959414096589422619) |
| **Writing Effective Tools for Agents** | 官方文档 | Anthropic | [Read](https://www.anthropic.com/engineering/writing-tools-for-agents) |

---

## Week 4: Coding Agent Patterns ⭐

### 核心阅读

| 资源 | 类型 | 来源 | 链接 |
|------|------|------|------|
| **How Anthropic Uses Claude Code** | 官方文档 | Anthropic | [PDF](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf) |
| **Claude Best Practices** | 官方文档 | Anthropic | [Read](https://www.anthropic.com/engineering/claude-code-best-practices) |
| **Awesome Claude Agents** | 资源集合 | Vijay | [GitHub](https://github.com/vijaythecoder/awesome-claude-agents) |
| **Super Claude** | 框架 | SuperClaude | [GitHub](https://github.com/SuperClaude-Org/SuperClaude_Framework) |
| **Good Context Good Code** | 文章 | Stockapp | [Read](https://blog.stockapp.com/good-context-good-code/) |
| **Peeking Under the Hood of Claude Code** | 分析 | Medium | [Read](https://medium.com/@outsightai/peeking-under-the-hood-of-claude-code-70f5a94a9a62) |

**必读**：`How Anthropic Uses Claude Code` 和 `Claude Best Practices`

---

## Week 5: The Modern Terminal

### 核心阅读

| 资源 | 类型 | 来源 | 链接 |
|------|------|------|------|
| **Warp University** | 教程 | Warp | [Read](https://www.warp.dev/university?slug=university) |
| **Warp vs Claude Code** | 对比 | Warp | [Read](https://www.warp.dev/university/getting-started/warp-vs-claude-code) |
| **How Warp Uses Warp to Build Warp** | 案例 | Warp | [Read](https://notion.warp.dev/How-Warp-uses-Warp-to-build-Warp-21643263616d81a6b9e3e63fd8a7380c) |

---

## Week 6: AI Testing and Security

### 核心阅读

| 资源 | 类型 | 来源 | 链接 |
|------|------|------|------|
| **SAST vs DAST** | 对比 | Splunk | [Read](https://www.splunk.com/en_us/blog/learn/sast-vs-dast.html) |
| **Copilot Remote Code Execution via Prompt Injection** | 安全研究 | Embrace The Red | [Read](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/) |
| **Finding Vulnerabilities with Claude Code** | 案例 | Semgrep | [Read](https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/) |
| **Agentic AI Threats** | 安全报告 | Unit42 | [Read](https://unit42.paloaltonetworks.com/agentic-ai-threats/#:~:text=Identity%20spoofing%20and%20impersonation:%20Attackers,accurate%20information%20exchange%20are%20critical.) |
| **OWASP Top Ten** | 安全标准 | OWASP | [Read](https://owasp.org/www-project-top-ten/) |
| **Context Rot** | 研究 | Chroma | [Read](https://research.trychroma.com/context-rot) |
| **Vulnerability Prompt Analysis with O3** | 研究 | Sean Heelan | [GitHub](https://github.com/SeanHeelan/o3_finds_cve-2025-37899/blob/master/system_prompt_uafs.prompt) |

---

## Week 7: Modern Software Support

### 核心阅读

| 资源 | 类型 | 来源 | 链接 |
|------|------|------|------|
| **Code Reviews: Just Do It** | 文章 | Coding Horror | [Read](https://blog.codinghorror.com/code-reviews-just-do-it/) |
| **How to Review Code Effectively** | 指南 | GitHub | [Read](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/) |
| **AI-Assisted Code Review** | 论文 | arXiv | [PDF](https://arxiv.org/pdf/2405.13565) |
| **AI Code Review Best Practices** | 指南 | Graphite | [Read](https://graphite.dev/guides/ai-code-review-implementation-best-practices) |
| **Code Review Essentials** | 文章 | Blake Smith | [Read](https://blakesmith.me/2015/02/09/code-review-essentials-for-software-teams.html) |
| **Lessons from millions of AI code reviews** | 视频 | YouTube | [Watch](https://www.youtube.com/watch?v=TswQeKftnaw) |

---

## Week 8: Automated UI and App Building

### 核心阅读

本周无指定阅读材料，重点在动手实践。

---

## Week 9: Agents Post-Deployment

### 核心阅读

| 资源 | 类型 | 来源 | 链接 |
|------|------|------|------|
| **Introduction to Site Reliability Engineering** | 书籍 | Google SRE | [Read](https://sre.google/sre-book/introduction/) |
| **Observability Basics** | 指南 | Last9 | [Read](https://last9.io/blog/traces-spans-observability-basics/) |
| **Kubernetes Troubleshooting with AI** | 案例 | Resolve.ai | [Read](https://resolve.ai/blog/kubernetes-troubleshooting-in-resolve-ai) |
| **Your New Autonomous Teammate** | 介绍 | Resolve.ai | [Read](https://resolve.ai/blog/product-deep-dive) |
| **Role of Multi Agent Systems** | 文章 | Resolve.ai | [Read](https://resolve.ai/blog/role-of-multi-agent-systems-AI-native-engineering) |
| **Benefits of Agentic AI** | 文章 | Resolve.ai | [Read](https://resolve.ai/blog/Top-5-Benefits) |

---

## Week 10: What's Next

### 核心阅读

本周无指定阅读材料，重点是 Martin Casado (a16z) 的演讲。

---

## 学习优先级��议

### 与 Claude Code 直接相关（必读）⭐⭐⭐

1. **Week 4**: How Anthropic Uses Claude Code
2. **Week 4**: Claude Best Practices
3. **Week 3**: Writing Effective Tools for Agents

### AI Agent 基础（重要）⭐⭐

1. **Week 2**: MCP Introduction
2. **Week 3**: Getting AI to Work In Complex Codebases
3. **Week 4**: Awesome Claude Agents

### AI 安全（推荐）⭐

1. **Week 6**: SAST vs DAST
2. **Week 6**: OWASP Top Ten
3. **Week 6**: Copilot Remote Code Execution

---

## 年老师，你的学习路径

**第 1 周**：Week 1 核心阅读（了解 LLM 基础）
**第 2 周**：Week 4 Claude Code 相关（你正在用的工具）
**第 3 周**：Week 2 MCP 协议（理解你用的 MCP 工具）
**第 4 周**：Week 3 AI IDE（提升使用效率）
**第 5 周+**：根据兴趣选择其他主题
