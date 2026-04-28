# Agent-Reach 渠道架构与安全模型

> Sources: Mino (AI), 2026-04-24 ~, 2026-04-26
> Raw: [CLAUDE.md](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-CLAUDE.md); [CONTRIBUTING](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-CONTRIBUTING.md); [install](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-install.md); [update](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-update.md); [troubleshooting](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-docs-troubleshooting.md); [SECURITY](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-SECURITY.md); [CHANGELOG](../../raw/workspace-other/Agent-Reach--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-Agent-Reach-CHANGELOG.md)

## 概述

Agent-Reach 的渠道架构是一个典型的可插拔设计模式，每个平台对应一个独立的 channel 文件，继承自 BaseChannel。结合其安全模型（Cookie 本地存储、安全模式、Dry Run），形成了一个"能力开放、安全可控"的工具架构。这篇 wiki 深入分析其架构设计和安全实践。

## 渠道架构设计

### BaseChannel 基类

所有渠道继承自 `agent_reach/channels/base.py` 的 BaseChannel，必须实现四个方法：

| 方法 | 作用 | 返回值 |
|------|------|--------|
| `can_handle(url)` | 路由判断：这个 URL 是否由我处理 | bool |
| `read(url)` | 读取单个 URL 的内容 | str/dict |
| `search(query)` | 搜索功能 | list |
| `check()` | 健康检查：上游工具是否可用 | status enum |

这种设计的好处：
- 新增渠道只需创建一个文件，实现四个方法
- 所有渠道有统一接口，Agent 不需要知道具体是哪个平台
- doctor 可以遍历所有渠道，统一检查健康状态

### 渠道注册机制

`agent_reach/channels/__init__.py` 维护渠道注册表。doctor 遍历时：
1. 加载所有注册的渠道
2. 逐个调用 `check()` 方法
3. 输出状态：✅（正常）、⚠️（需要配置）、❌（故障）

这种设计使得：
- 用户不需要记"哪个平台对应哪个工具"
- 故障精确定位到具体工具
- 新增渠道自动出现在 doctor 输出中

### 上游工具选型策略

Agent Reach 对每个渠道的上游工具选型遵循以下原则：

| 选型标准 | 说明 |
|----------|------|
| 社区活跃度 | Star 数、近期更新 |
| 安装便捷度 | pipx/pip 一行安装 |
| 认证方式 | Cookie 登录 > API Key > 扫码 |
| 功能完整性 | 搜索 + 阅读 + 交互 |
| 免费可用 | 零 API 费用 |

典型选型：

| 平台 | 工具 | Star | 为什么选 |
|------|------|------|----------|
| 读网页 | Jina Reader | 9.8K | 免费、无需 Key、HTML→Markdown |
| 读推特 | twitter-cli | 2.1K | Cookie 登录、搜索/读/时间线 |
| Reddit | rdt-cli | 304 | Cookie 认证、搜索+全文+评论 |
| 视频 | yt-dlp | 154K | YouTube+B站+1800站通吃 |
| GitHub | gh CLI | 官方 | 官方工具、完整 API |
| 小红书 | xhs-cli | 1.5K | pipx 一行安装 |
| 搜索 | Exa via mcporter | — | AI 语义搜索、MCP 免 Key |

### 工具共存策略

更新指南中明确规定：**永远不要卸载用户已安装的旧工具**。

```
# Step 4: Coexistence (DO NOT uninstall old tools)
IMPORTANT: Never uninstall any existing tools the user already has installed.
Old tools (bird, browser_cookie3, miku_ai, etc.) may still be working.
Agent Reach supports both old and new tools as fallback.
```

这是非常务实的设计：
- 旧工具虽然 upstream 仓库归档了，但本地可能仍能工作
- 卸载可能破坏用户已有的工作流
- 新旧并存，Agent Reach 优先使用新工具，旧工具作为 fallback

## 安全模型

### 凭据管理

| 措施 | 实现 |
|------|------|
| 本地存储 | Cookie/Token 存在 `~/.agent-reach/config.yaml` |
| 文件权限 | 600（仅所有者可读写） |
| 不上传 | 代码完全开源，随时可审查 |

### 安装安全

| 模式 | 行为 |
|------|------|
| 全自动 | 自动检测并安装系统依赖 |
| 安全模式 | `--safe`：不自动装系统包，只列需求 |
| 预览模式 | `--dry-run`：预览所有操作，不做改动 |

### 操作边界

安装指南中对 AI Agent 有明确的操作限制：

- **禁止**：运行 sudo 命令（除非用户明确批准）
- **禁止**：修改系统文件（`~/.agent-reach/` 之外）
- **禁止**：安装指南外的包
- **禁止**：关闭防火墙、安全设置
- **禁止**：在 agent workspace 创建文件
- 需要 elevated permissions 时，告诉用户让他们决定

### Cookie 安全建议

两层风险提醒：

1. **封号风险**：平台可能检测到非正常浏览器的 API 调用，导致账号被限制或封禁
2. **凭据泄露风险**：Cookie 等同于完整登录权限

建议：所有需要 Cookie 的平台，使用专用小号，不要用主账号。

## 目录隔离规则

| 用途 | 目录 | 示例 |
|------|------|------|
| 配置与凭据 | `~/.agent-reach/` | config.yaml |
| 上游工具 | `~/.agent-reach/tools/` | douyin-mcp-server/ |
| 临时文件 | `/tmp/` | yt-dlp-output/ |
| 技能文件 | `~/.openclaw/skills/agent-reach/` | SKILL.md |

**铁律**：绝不在 agent workspace 创建文件。如果 clone 仓库或创建文件到 workspace，会污染用户的项目目录，随时间破坏用户的 agent 环境。

## 故障排查模式

### 雪球 API 400

原因：需要登录 Cookie。
解决：`agent-reach configure --from-browser chrome` 自动提取。

### Twitter 连接失败

方案 1：环境变量代理
方案 2：全局代理工具（proxychains）
方案 3：用 Exa 搜索替代 `site:x.com 搜索词`
方案 4：检查认证 `twitter check`

Fallback：如果安装了旧版 bird CLI，也能正常工作。

## 版本管理

版本号必须在三个地方保持一致：
- `pyproject.toml`
- `__init__.py`
- `tests/test_cli.py`

提交格式：`type(scope): message`，一个 commit 一件事。永远不直接 push 到 main，必须 PR。

## 贡献规范

代码质量工具：
- **ruff**：lint 和 import 排序
- **mypy**：类型检查
- **pytest**：测试

添加新渠道的流程：
1. 在 `agent_reach/channels/` 创建新文件
2. 实现渠道接口（继承 BaseChannel，实现四方法）
3. 在 `tests/test_channels.py` 添加测试
4. 更新 `agent_reach/doctor.py` 包含新渠道
5. 更新文档
