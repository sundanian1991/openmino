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
| [01-SOUL.md](.claude/rules/01-SOUL.md) | 身份 + 性格 + 思维方式 |
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

## 规范

**Git**：Commit 格式 `type: description`（feat/fix/docs/refactor/chore/test）；禁止 `--no-verify`、`reset --hard`、`push --force main`、`commit --amend`。

**可视化**：关系/流程/对比/数据/结构 → 用 generative-ui-widget，禁用文本符号模拟。

---

## 工具配置

| 工具 | 用途 |
|------|------|
| tavily-mcp | 网页搜索 |
| web-search | 中文搜索 |
| webReader | 网页→Markdown（100 次/月） |

**技能搜索**：见 [.claude/reference/skill-search.md](.claude/reference/skill-search.md)

---

## 数据分析

**数据解读前置校验**：进行分析前，必须先验证数据解读假设：

1. **活跃定义**：何为"活跃"员工
2. **人数口径**：人员数是否包含离职人员
3. **时间边界**：计算周期的起止边界

---

*最后更新：2026-06-05 — 规则体系精简，删除行为约束层*
