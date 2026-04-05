---
input: 项目启动请求
output: 项目追踪文件索引
pos: active/tasks/tracking/ 的成员
# 文件更新需同步注释及所属文件夹 md
---

# CLAUDE.md — Projects Tracking

> **项目追踪索引 — 进行中的项目**

---

## Summary

存储进行中的项目工作流文件。

每个项目一个 `.md` 文件，包含 Prompt + Plans + Architecture + Documentation。

---

## Members

| 文件 | 用途 |
|------|------|
| `CLAUDE.md` | Claude 配置文档 |
| `execution-log.md` | Markdown 文档 |
| `skills-usage.md` | Markdown 文档 |

---

## Rules

### 启动项目

1. 复制 `../templates/project-workflow.md` 到本目录
2. 填写 **Prompt**（目标边界）和 **Plans**（任务拆解）
3. 启动指令：`先读 active/tasks/tracking/[项目名].md，按 Plans 顺序执行`

### 更新进度

- 每日更新 **Documentation** 部分（或在 `active/daily/` 中记录）
- 完成里程碑后更新 **Plans** 状态

### 完成项目

- 标记状态为 `✅完成`
- 移动到 `archive/projects/`（如有长期价值）

---

*这是项目管理的核心，防止 AI 跑偏。*

---

*最后更新：2026-02-24 — 5 文件流融合*
