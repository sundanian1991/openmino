---
input: CLAUDE.md 拆分需求
output: 配置与环境详细规则
pos: .claude/rules/reference/CONFIG.md
---

# CONFIG.md — 配置与环境详细规则

> 从 CLAUDE.md 拆分而来，按需读取

---

## 配置

```
commandsDir: ./.claude/commands
skillsDir: ./.claude/skills
```

---

## 环境要求

### 系统要求

| 组件 | 版本 | 验证命令 |
|------|------|---------|
| **Node.js** | 18+ | `node --version` |
| **npm** | 9+ | `npm --version` |
| **Git** | 2.30+ | `git --version` |
| **macOS** | 12.0+ | `sw_vers` |

### API 配置

**二选一**（不可同时设置）：

```bash
# 方式 1：AUTH_TOKEN（推荐）
export ANTHROPIC_AUTH_TOKEN="your-token"

# 方式 2：API_KEY
export ANTHROPIC_API_KEY="your-key"
```

**验证配置**：
```bash
env | grep ANTHROPIC
```

---

## MCP 配置

### 项目级（`.mcp.json`）

| 工具 | 用途 | 状态 |
|------|------|------|
| `tavily-mcp` | 网页搜索/API | ✅ 已配置 |
| `web-search` | 中文网页搜索 | ✅ 已配置 |
| `webReader` | 网页→Markdown（100 次/月） | ✅ 已配置 |

### 全局级（`~/.claude/config.json`）

| 工具 | 用途 | 状态 |
|------|------|------|
| `memory` | 知识图谱记忆 | ✅ 已配置 |
| `openclaw-markdown` | Markdown 协议 | ✅ 已配置 |

### 环境变量

```bash
# Tavily API
export TAVILY_API_KEY="your-key"

# GitHub CLI
export GH_TOKEN="your-token"
```

### 配置验证

```bash
# 检查 MCP 服务器
claude mcp list

# 检查环境变量
env | grep -E "TAVILY|GH_TOKEN|ANTHROPIC"
```

---

## Bash 命令速查

| 操作 | 命令 | 说明 |
|------|------|------|
| **性能分析** | `npx @mariozechner/claude-trace` | 可视化事件流 |
| **验证 Plan** | `./scripts/verify-plan.sh [任务名\|todo\|all]` | 验证规划完整性 |
| **搜索记忆** | `grep -r "keyword" memory/` | 快速搜索历史 |
| **检查文档** | `.scripts/check-docs-sync.sh` | 提交前检查 |
| **日志分析** | `npx claude-history stats` | 查看会话统计 |
| **会话搜索** | `/search-sessions "keyword"` | 搜索历史对话 |

---

*配置与环境规则，按需读取*
