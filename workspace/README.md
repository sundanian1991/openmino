# workspace 工作区

临时工作目录，所有内容入库 git 跟踪。

## 命名规范

- 文件夹：`YYYY-MM-DD-主题`
- 禁止裸露文件散落在 workspace 根目录
- 归档/流转规则见 `.claude/reference/workspace-conventions.md`

## 对话摘要

有实质性多轮对话、产生了代码/决策/产出时，在 `workspace/YYYY-MM-DD-对话摘要/` 下创建 `对话总结-YYYY-MM-DD.md`。

### 模板

```markdown
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

### 维护时机

- 完成阶段性任务 → 追加 worklog
- 做出关键决策 → 追加 Decisions
- compact 后新 session 启动 → 读取恢复
