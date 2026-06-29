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
| [cognitive-contract.md](memory/cognitive-contract.md) | 认知协议 — Agent 运行时自检清单 |

---

## 子代理原则

**主代理做协调和决策，子代理做执行。** 策略上积极调用，但每次派发要有明确边界。

### 调用类型

| 类型 | 特征 | 适用 |
|------|------|------|
| 同步委托 | 父代理发任务，等子代理返回结果后继续 | 需要结果才能做下一步的单步委托 |
| 异步并行 | 多个子代理同时发，不阻塞，结果回来时合并 | 独立子任务（如同时搜代码+搜文档） |
| 调度委托 | 预设时间或条件触发，未来执行 | 定时巡检、批处理 |

### 派发决策

- 独立可并行 → 一把发多个 Agent（一次消息里多个 tool call）
- 串行依赖（改完再测）→ 同步单个
- 单文件读取、简单搜索、单行修改 → 主代理直做，不绕路
- 不确定要不要派 → 先问自己：这个任务的输出会污染主 agent 上下文吗？会 → 派

### 硬约束

- 子代理 prompt 必须是 **自包含任务描述**（目标、上下文、产出格式），不能写"基于你的发现去做 X"这种甩锅式委托
- 子代理返回结果要可验证：文件路径 + 退出码 + 是否改代码 + 摘要
- 异步子代理完成后不要主动轮询，等通知
- 禁止套娃：子代理不再派子代理（保持一层深）

---

## 目录约定

详见 [workspace-conventions.md](.claude/reference/workspace-conventions.md)。核心原则：workspace 入库 git 跟踪；创建文件夹用 `YYYY-MM-DD-主题`。

---

## 对话摘要

有实质性多轮对话/产出时维护。模板与流程见 [workspace/README.md](workspace/README.md)。

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

