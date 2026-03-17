---
input: 对话中的决策、WAL 协议触发
output: 决策记录、协议文档
pos: core/的成员，P0 永久核心
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Decisions

> **重要决策与协议 — P0 永久核心**

---

## Summary

存储重要决策、工作协议、机制设计。

这些是我们共同建立的"宪法"。

---

## Members

| 文件 | 用途 |
|------|------|
| `CLAUDE.md` | Claude 配置文档 |
| `interaction-speed.md` | Markdown 文档 |
| `interaction-tolerance.md` | Markdown 文档 |

---

## Rules

1. **触发**：WAL 协议的📋决策类型触发时立即写入
2. **更新**：决策变化时，更新文件并记录变更历史
3. **调用**：设计机制、做决策时先查这里
4. **项目启动**：复杂项目使用 `active/tasks/templates/project-workflow.md`，Prompt 部分写完后归档到本目录

---

*这些决策定义了"我们怎么一起工作"。*
