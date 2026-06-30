---
name: GitHub 和跨平台搜索策略
description: 涉及 GitHub/小红书/B站/网页搜索时，优先使用 gh CLI 和 Agent-Reach，而不是 curl 或网页搜索
type: feedback
---

**规则：GitHub 操作优先用 `gh` CLI，跨平台搜索用 Agent-Reach**

**Why：** 每次让 Claude 搜 GitHub 内容，它先走 Tavily 网页搜索，再 curl 直接请求 GitHub（被 GFW 拦截），最后失败让用户手动做。实际上机器上已装 `gh` CLI（已认证），是最稳定最直接的方式。

**How to apply：**
- GitHub 搜索/查看/clone → 优先用 `gh search repos`、`gh repo view`、`gh repo clone`，不走 curl/WebFetch/Tavily
- 小红书/B站/YouTube/全网搜索 → 优先用 `agent-reach`（已安装，`~/.local/bin/agent-reach`），Tavily 作为 fallback
- Travily MCP（每月 1000 次）是最高优先级搜索工具，先用它；如果搜不到或网络不通，改用 Agent-Reach
- 不要在 GitHub 相关任务上浪费 Tavily 配额——用 `gh` CLI 就够了
