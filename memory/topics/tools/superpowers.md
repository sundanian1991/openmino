# Superpowers 插件

> AI 编程技能框架，提供结构化开发工作流

## 安装信息

- **安装日期**：2026-07-22
- **版本**：5.0.7
- **安装路径**：`~/.myagents/plugins/superpowers/`
- **来源**：`file:///Users/sundanian/.claude/plugins/superpowers`（本地 Claude Code 插件目录）

## 核心功能

Superpowers 是一套 AI 编程技能框架，强制执行结构化开发流程：

| 技能 | 功能 |
|------|------|
| `brainstorming` | 头脑风暴，苏格拉底式追问澄清需求 |
| `writing-plans` | 撰写详细实施计划，拆解为 2-5 分钟任务 |
| `executing-plans` | 按计划执行，遇阻塞才停止 |
| `test-driven-development` | 强制 TDD（红-绿-重构） |
| `systematic-debugging` | 系统化调试四阶段：根因→分析→假设→修复 |
| `subagent-driven-development` | 子代理分工执行，自动审查 |
| `requesting-code-review` | 主动请求代码审查 |
| `receiving-code-review` | 接收审查反馈 |
| `verification-before-completion` | 完成前强制验证 |
| `using-git-worktrees` | Git 工作区隔离 |
| `dispatching-parallel-agents` | 并行代理处理 |
| `finishing-a-development-branch` | 完成分支收尾 |
| `writing-skills` | 编写新技能 |
| `using-superpowers` | 使用入门 |

## 与 MyAgents 技能的关系

| Superpowers 技能 | MyAgents 对应技能 |
|---|---|
| `brainstorming` | `kw-brainstorm` |
| `writing-plans` | `kw-plan` |
| `executing-plans` | `kw-work` |
| `requesting-code-review` | `kw-review` |
| `test-driven-development` | 无直接对应 |
| `systematic-debugging` | `thinking-lenses`（部分覆盖） |

## 使用方式

在 MyAgents 会话中：
- 直接对话："使用 brainstorming 技能"
- 或："我想添加 [功能]"（自动触发 brainstorming）

## 注意事项

- Superpowers 是为 Claude Code 设计的，在 MyAgents 中通过 cc-plugin 协议兼容
- 安装后需要重启 MyAgents 会话（或运行 `myagents reload`）才能生效
- 与 MyAgents 现有 kw-* 技能功能有重叠，可根据场景选择使用

---

*创建：2026-07-22 · Superpowers v5.0.7 安装到 MyAgents*
