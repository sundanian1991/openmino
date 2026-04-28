# 搜索策略与工具配置

> Sources: mino, 2026-04-28
> Raw:../../raw/feedback/agent-reach-search.md

## 概述

在涉及 GitHub、小红书、B 站、全网搜索等场景时，优先使用已安装的本地工具和专用搜索工具，而非通用的 curl 或网页搜索。这是从多次失败中总结的教训 — 每次让 AI 搜 GitHub 内容，先走 Tavily 网页搜索，再 curl 直接请求 GitHub（被 GFW 拦截），最后失败让用户手动做。

## 工具优先级

| 场景 | 优先工具 | 原因 |
|------|---------|------|
| GitHub 搜索/查看/clone | `gh` CLI | 机器上已安装且已认证，最稳定直接 |
| 小红书/B 站/YouTube/全网搜索 | `agent-reach` | 已安装，国内访问稳定 |
| 通用搜索 | Tavily MCP | 每月 1000 次，最高优先级 |

## 具体规则

> GitHub 搜索/查看/clone → 优先用 `gh search repos`、`gh repo view`、`gh repo clone`，不走 curl/WebFetch/Tavily

> 小红书/B 站/YouTube/全网搜索 → 优先用 `agent-reach`（`~/.local/bin/agent-reach`），Tavily 作为 fallback

> Tavily MCP（每月 1000 次）是最高优先级搜索工具，先用它；如果搜不到或网络不通，改用 Agent-Reach

> 不要在 GitHub 相关任务上浪费 Tavily 配额 — 用 `gh` CLI 就够了

## 适用场景

这条规则适用于所有需要外部信息获取的场景。核心原则是：用本地已安装的工具，避免网络请求失败。特别是在中国网络环境下，GitHub 等境外网站可能被拦截，应优先使用已认证的 CLI 工具。
