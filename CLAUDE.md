---
input: 会话请求、用户输入
output: AI 协作、项目执行
pos: 项目根目录
---

# CLAUDE.md — Mino 的家

> 核心规则索引 — 详细内容见 [.claude/rules/](.claude/rules/)

---

## 配置

```
commandsDir: ./.claude/commands
skillsDir: ./.claude/skills
```

---

## 核心规则（每次会话自动加载）

| 文件 | 用途 |
|------|------|
| [01-SOUL.md](.claude/rules/01-SOUL.md) | 身份 + 性格 + 态度锚点 |
| [02-COLLAB.md](.claude/rules/02-COLLAB.md) | 协作规范 + 分析框架 |
| [03-OUTPUT.md](.claude/rules/03-OUTPUT.md) | 输出风格 + 审美基线 |
| [MEMORY-L1.md](.claude/rules/MEMORY-L1.md) | 用户画像 + 记忆索引 |
| [06-NOW.md](.claude/rules/06-NOW.md) | 当前状态、活跃项目 |

---

## 子代理原则

主代理做协调和决策。轻量操作直做（单文件读取、简单搜索、单行修改）。复杂/多文件/并行任务 → 派子代理或 Workflow。每步先判断是否需要额外注意力，能直做就不绕路。

---

## 目录约定

详见 [workspace-conventions.md](.claude/reference/workspace-conventions.md)（workspace 命名/归档/流转规则、核心目录表）

**核心原则**：workspace 入库 git 跟踪；创建文件夹用 `YYYY-MM-DD-主题`；归档/整理时按需读取详细规范。

---

## 对话摘要（每次会话自动启用）

**强制**：每次会话开始时，在 `workspace/YYYY-MM-DD-对话摘要/` 下创建 `对话总结-YYYY-MM-DD.md`，按以下模板初始化。对话中实时维护——每完成阶段性任务追加 worklog，每做出关键决策追加 Decisions。compact 时摘要已是完整状态，新 session 直接读取恢复。

**模板**：

```
# Session Title（简短5-10字）

# Current State
当前状态、待完成任务

# Task Specification
用户要求、设计决策、背景

# Key Files
重要文件路径及作用

# Errors & Corrections
错误及解决方案

# Decisions & Learnings
关键决策、有效做法、应避免做法

# Worklog
逐步操作记录，极简摘要
```

**注意**：简单一问一答的会话不需要摘要。有实质性多轮对话、产生了代码/决策/产出的会话才维护。

---

## 规范

**Git**：Commit 格式 `type: description`（feat/fix/docs/refactor/chore/test）；禁止 `--no-verify`、`reset --hard`、`push --force main`、`commit --amend`。

**可视化**：关系/流程/对比/数据/结构 → 用 generative-ui-widget，禁用文本符号模拟。

---

## 工具配置

| 工具 | 用途 |
|------|------|
| tavily-mcp | 网页搜索 |
| anysearch | 中文搜索 |
| webReader | 网页→Markdown（100 次/月） |

**技能搜索**：见 [.claude/reference/skill-search.md](.claude/reference/skill-search.md)

### HTML 文件写入（DeepSeek 模型特定）

Write 工具传大段 HTML 时因 content 含特殊符号（`"` `$` 反引号 `{}` 等），经 **opencode.ai 中转层（Anthropic→OpenAI 协议转换）** 时 JSON 格式可能被破坏，导致 tool call 失败（非 Write 工具自身限制，是中转层的序列化问题）。

→ 一律用 `cat > path << 'EOF'` 通过 Bash 写入，不走 Write 工具。



---

*最后更新：2026-06-06 — 新增 DeepSeek HTML 写入约束*
