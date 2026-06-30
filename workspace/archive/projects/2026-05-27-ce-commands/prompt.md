# 需求：创建 /ce:plan 和 /ce:work 命令

## 目标

在 `.claude/commands/` 下创建两个自定义 slash command，实现"计划优先 + 执行自动化"的开发工作流。

## 排除项

- 不实现"多 Agent 并行研究"（需要更复杂的框架支持）
- 不修改现有 /plan5 命令
- 不涉及外部工具安装

## 交付物

1. `.claude/commands/ce-plan.md` — 计划命令
2. `.claude/commands/ce-work.md` — 执行命令

## 完成标准

- [ ] `/ce:plan` 可触发，输出结构化 plan.md
- [ ] `/ce:work` 可触发，读取 plan.md 并执行任务
- [ ] 支持断点续接（新会话指向计划即可继续）
- [ ] 命令文件格式正确，可被 Claude Code 识别
