# Agent-Reach：给 AI Agent 的一键互联网接入工具

> Sources: Mino (AI), 2026-04-24 ~, 2026-04-26
> Raw:[README](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-README.md); [SKILL](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-SKILL.md); [CLAUDE](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-CLAUDE.md); [CONTRIBUTING](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-CONTRIBUTING.md); [install](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-install.md); [update](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-update.md); [troubleshooting](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-troubleshooting.md); [guides: exa/groq/reddit/twitter/wechat/xiaohongshu](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-guides-setup-exa.md); [references: career/dev/search/social/video/web](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-agent_reach-skill-references-social.md)

## 概述

Agent Reach 是一个 Python CLI + 库项目，定位为"AI Agent 的互联网接入层"。核心理念：给 Claude Code、OpenClaw、Cursor、Windsurf 等 AI Agent 一键接入 17+ 互联网平台的能力。项目由 Panniantong 开发，MIT 开源协议，当前版本 1.3.0。

这个项目的独特价值在于：它不是 wrapper 框架，而是脚手架（scaffolding）。安装完成后，Agent 直接调用上游原生工具（twitter-cli、rdt-cli、yt-dlp 等），不需要经过 Agent Reach 的包装层。Agent Reach 只负责安装、配置和健康检查。

## 核心问题与解决方案

### AI Agent 的互联网盲点

AI Agent 已经能写代码、改文档、管项目，但让它在互联网上找信息就遇到大量门槛：

- YouTube 教程拿不到字幕
- Twitter API 要付费
- Reddit 服务器 IP 被 403 封锁
- 小红书必须登录才能看
- B站海外 IP 被屏蔽
- 网页抓回来一堆 HTML 标签

每个平台都有自己的门槛——付费 API、反爬封锁、登录认证、数据清洗。Agent Reach 把这件事变成一句话：复制安装链接给 Agent，几分钟后它就能读推特、搜 Reddit、看 YouTube、刷小红书。

### 17 平台支持矩阵

| 平台 | 零配置 | 需配置 | 上游工具 |
|------|--------|--------|----------|
| 网页阅读 | 是 | — | Jina Reader |
| YouTube | 是 | — | yt-dlp |
| RSS | 是 | — | feedparser |
| GitHub | 是 | 私有库需登录 | gh CLI |
| V2EX | 是 | — | curl API |
| 微博 | 是 | — | mcp-server-weibo |
| 微信公众号 | 是 | — | Exa + Camoufox |
| Twitter/X | 否 | Cookie | twitter-cli |
| Reddit | 否 | Cookie | rdt-cli |
| 小红书 | 否 | Cookie | xhs-cli |
| 抖音 | 否 | MCP 服务 | douyin-mcp-server |
| LinkedIn | 否 | 浏览器登录 | linkedin-scraper-mcp |
| B站增强 | 否 | 代理(服务器) | bili-cli + yt-dlp |
| 全网搜索 | 否 | MCP 配置 | Exa via mcporter |
| 雪球 | 否 | Cookie | 雪球 API |
| 小宇宙播客 | 否 | Groq Key | Whisper 转录 |

## 设计理念：脚手架而非框架

Agent Reach 的核心设计哲学是"scaffolding，不是 framework"。这决定了它与同类工具的本质差异。

### 可插拔渠道架构

每个平台背后是一个独立的 channel 文件，继承自 BaseChannel。每个渠道文件只负责两件事：

1. `check()` 方法：检测对应上游工具是否可用，给 `agent-reach doctor` 提供状态信息
2. `can_handle(url)` 方法：路由判断，决定哪个渠道处理哪个 URL

实际的读取和搜索由 Agent 直接调用上游工具完成。这意味着：

- 不满意某个工具？换掉对应 channel 文件就行
- 上游工具挂了？换一个替代方案，不影响其他渠道
- 新增平台？创建一个 channel 文件，实现四个方法即可

当前选型的典型模式：

| 场景 | 选型 | 为什么 |
|------|------|--------|
| 读网页 | Jina Reader | 9.8K Star，免费，无需 Key |
| 读推特 | twitter-cli | Cookie 登录，搜索/读/时间线 |
| 视频字幕 | yt-dlp | 154K Star，YouTube+B站+1800站 |
| 搜全网 | Exa via mcporter | AI 语义搜索，MCP 接入免 Key |
| 小红书 | xhs-cli | 1.5K Star，pipx 一行安装 |

### Channel 注册表模式

`agent_reach/channels/__init__.py` 维护所有渠道的注册表。`agent-reach doctor` 遍历注册表，逐个调用 `check()` 方法，输出每个渠道的可用状态（✅/⚠️/❌）。这使得：

- 新增渠道自动出现在 doctor 输出中
- 渠道故障精确定位到具体工具
- 用户不需要记"哪个平台对应哪个工具"

## 安装与配置体系

### 三层安装模式

| 模式 | 命令 | 用途 |
|------|------|------|
| 全自动 | `--env=auto` | 个人电脑，安装所有核心+可选渠道 |
| 安全模式 | `--env=auto --safe` | 不自动装系统包，只列需求由用户决定 |
| 预览模式 | `--env=auto --dry-run` | 只看会做什么，不做任何改动 |

安装流程分五步：
1. 安装 agent-reach CLI + 系统依赖（Node.js、gh CLI、mcporter 等）
2. 激活零配置渠道（Web、YouTube、GitHub、RSS、V2EX）
3. 询问用户需要哪些可选渠道
4. 按需配置凭据（Cookie、API Key、代理）
5. 运行 `agent-reach doctor` 验证

### Cookie 认证通用流程

所有需要登录的平台，统一使用 Cookie-Editor 方式：
1. 浏览器登录对应平台
2. Cookie-Editor Chrome 插件导出 Header String
3. 把字符串发给 Agent
4. Agent 运行配置命令完成接入

安全提醒：
- Cookie 只存在本地 `~/.agent-reach/config.yaml`，文件权限 600
- 建议用专用小号，不要用主账号（封号风险 + 凭据泄露风险）
- Cookie 过期后重新导出即可

### 代理配置

服务器用户需要代理的场景：
- Reddit：服务器 IP 被封锁
- B站：海外 IP 被屏蔽
- Twitter：部分地区需要翻墙

统一配置：`agent-reach configure proxy http://user:pass@ip:port`，约 $1/月。

## SKILL.md 路由系统

Agent Reach 的 SKILL.md 包含完整的路由表，让 AI Agent 知道遇到什么意图该调什么工具。

### 六大分类

| 分类 | 触发词 | 详细文档 |
|------|--------|----------|
| search | 搜/查/search | references/search.md |
| social | 小红书/抖音/推特/微博/B站/Reddit | references/social.md |
| career | 招聘/职位/linkedin | references/career.md |
| dev | github/代码/仓库/issue | references/dev.md |
| web | 网页/链接/公众号/rss | references/web.md |
| video | youtube/视频/播客/字幕 | references/video.md |

### 零配置快速命令

```
Exa 搜索: mcporter call 'exa.web_search_exa(query: "query")'
网页阅读: curl -s "https://r.jina.ai/URL"
GitHub:   gh search repos "query" --sort stars --limit 10
Twitter:  twitter search "query" --limit 10
YouTube:  yt-dlp --write-sub --skip-download "URL"
Reddit:   rdt search "query" --limit 10
```

## 更新与维护机制

### 自动更新流程

1. `agent-reach check-update` 检查新版本
2. `pip install --upgrade` 升级 Agent Reach 包
3. 安装/更新上游 CLI 工具（twitter-cli、rdt-cli、xhs-cli 等）
4. 共存策略：不卸载旧工具，新旧并存（向后兼容）
5. `agent-reach doctor` 验证所有渠道
6. 更新 SKILL.md 到所有 Agent 的技能目录

### 日常监控（OpenClaw 专用）

可配置 cron 任务每日自动检查：
- 运行 `agent-reach watch`
- 全部正常 → 静默
- 有问题或新版本 → 通知用户并建议修复

## 对年老师的参考价值

这个项目展示了"AI Agent 互联网能力标准化"的思路。对年老师的工作有两个参考点：

1. **信息获取渠道化**：供应商管理中需要追踪的舆情、新闻、动态，都可以通过类似的工具接入实现自动化监控
2. **脚手架思维**：不做重框架，只做"帮你把选型和配置做完"。这套思路同样适用于构建供应商管理工具链
