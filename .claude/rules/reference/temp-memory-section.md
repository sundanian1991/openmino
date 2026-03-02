---
input: 搜索与抓取工具优先级更新
output: 04-MEMORY.md 更新片段
pos: .claude/rules/reference/
---

### 搜索与抓取工具优先级（2026-03-02 更新）

**核心原则**：搜索用 Tavily，批量抓取用 Apify，别让 LLM 做 HTML 解析脏活

| 优先级 | 工具 | 类型 | 说明 | 适用场景 |
|--------|------|------|------|----------|
| 1️⃣ | **tavily** | MCP | 搜索 API，LLM 优化 | 日常快速搜索首选（实时新闻、事实查询） |
| 2️⃣ | **Apify** | MCP | 批量抓取，结构化输出 | 批量数据抓取（竞品监控、邮箱提取、社交媒体） |
| 3️⃣ | **curl** | CLI | 命令行请求网页 | 无配额限制，批量抓取 |
| 4️⃣ | **webReader** | MCP | 网页→Markdown | 精读单个页面（100 次/月，配额有限） |
| 5️⃣ | **web-search** | Skill | Playwright 浏览器搜索 | 搜索结果不稳定时 |
| 6️⃣ | **agent-browser** | Skill | 浏览器代理 | 需要登录/JS 渲染 |

**标准工作流**：
```
Step 1: Tavily 搜索 → 快速了解概况
Step 2: Apify 抓取 → 批量提取目标数据
Step 3: Claude 分析 → 生成报告/洞见
```

**文档**：`.claude/skills/apify-integration/WORKFLOW.md`
