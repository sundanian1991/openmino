# Daily AI Insights Collection

请执行AI洞察日报收集任务。

## 核心任务

使用 AnySearch skill（CLI 脚本）搜索并整理AI领域最新内容。

### 工具调用约定（重要）

当前环境**没有** `mcp__anysearch__*` MCP 工具，必须通过 CLI 脚本调用。执行前**先 cd 到 skill 目录**（用绝对路径，否则工作目录不持久会报 module not found）：

```bash
AS_DIR="/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anysearch"
cd "$AS_DIR" && node scripts/anysearch_cli.js <command> [options]
```

可用命令：
- `batch_search --query "Q1" --query "Q2" ... `（≤5 个并行）
- `search "Q" --freshness week --max_results 5`
- `extract "URL"`（拉全文为 Markdown，截断 5 万字）
- `doc`（查接口规范，离线操作）

`.env` 已配 ANYSEARCH_API_KEY，自动加载。

### Step 1: 批量搜索

用 `batch_search`，每组 ≤5 个 query 并行。统一加 `--freshness week` 和 `--max_results 5`（batch 模式下通过 `--queries` JSON 数组传参）：

```bash
node scripts/anysearch_cli.js batch_search --queries '[
  {"query":"OpenAI product manager interview blog","freshness":"week","max_results":5},
  {"query":"Anthropic product team Cat Wu interview","freshness":"week","max_results":5}
]'
```

**公司维度**（批次1）：
- OpenAI product manager interview blog
- Anthropic product team Cat Wu interview
- Claude Code new features product strategy
- Google Gemini product manager AI strategy
- Kimi 月之暗面 产品策略 产品经理

**公司维度**（批次2）：
- 智谱 AI产品 产品经理 最新
- DeepSeek product strategy AI 2026
- NVIDIA Nemotron open model product strategy

**人物维度**（批次1）：
- Cat Wu Anthropic product interview
- Andrew Ambrosino OpenAI Codex interview
- Grant Sanderson 3Blue1Brown AI interview
- Thariq Shihipar Anthropic unknowns field guide
- Andrej Karpathy blog AI product engineering

**人物维度**（批次2）：
- Boris Cherny Claude Code design philosophy
- Dario Amodei Anthropic CEO AI safety strategy
- Alex Albert Anthropic Claude tips
- Mike Krieger Anthropic Labs AI product

**概念维度**（批次1）：
- AI product taste judgment product manager
- agentic coding AI product manager strategy
- AI product team speed iteration daily shipping

**概念维度**（批次2）：
- AI eval design product manager evaluation
- AI organization transformation product team structure
- human AI collaboration product manager workflow

### Step 2: 提取有价值内容

对搜索结果中有价值的文章（排除新闻快讯、股市报道、纯营销内容），使用 `extract` 命令提取完整内容：

```bash
node scripts/anysearch_cli.js extract "https://example.com/article"
```

筛选标准：
- 有实质性观点、方法论、案例分析的内容
- 产品管理、组织效率、AI工作流相关
- 优先：博客文章、播客逐字稿、深度访谈

### Step 3: 分类整理

按三个维度分类：

**按公司**：OpenAI/Anthropic/Google/Kimi/智谱/DeepSeek/NVIDIA

**按人物**：Cat Wu/Andrew Ambrosino/Grant Sanderson/Thariq Shihipar/Andrej Karpathy/Boris Cherny/Dario Amodei/Alex Albert/Mike Krieger

**按概念**：Product Taste/Agentic Coding/Speed/Eval Design/Org Transformation/Human-AI Collaboration

### Step 4: 输出Markdown

保存到 `./output/daily-ai-insights/YYYY-MM-DD.md`

每篇文章格式：
```
#### [文章标题](URL)
- **来源**：URL
- **搜索关键词**：xxx
- **涉及人物**：xxx
- **涉及概念**：xxx
- **原始内容节选**：（500-1000字核心原文）
```

### 质量要求
- 宁缺毋滥，只收录有实质性观点/方法论/案例的内容
- 去重：同一篇文章不重复出现
- 中英文兼顾，保持原文语言
- 只收录最近7天内发布的内容

### 完成后
发送总结报告：收录数量、关键发现、文件路径。
