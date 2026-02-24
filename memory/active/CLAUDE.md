---
input: 新文件、当前会话记录
output: 活跃中的记忆（30-90 天）
pos: memory/的 P1 活跃区
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Active Memory

> **P1 活跃记忆 — 中期项目（90 天）**

---

## Summary

存储当前活跃的记忆：最近的日记、思考、任务机制。

**90 天后自动降级到 transient/ 或 archive/**

---

## Members

| 目录 | 内容 | 维护 |
|------|------|------|
| **daily/** | 最近的日记（30 天内） | observer 生成 |
| **my-thoughts/** | 最近的思考 | 有感而发 |
| **tasks/** | 运行中的机制 | 系统维护 |

---

## Rules

1. **进入**：新文件默认进入 active/
2. **生命周期**：90 天后检查 → 有价值降为 P0，无价值降级到 transient/
3. **清理**：UPDATE_MEMORY 每周检查生命周期
4. **项目启动**：复杂项目使用 `tasks/templates/project-workflow.md`，填写 Prompt+Plans 后启动

---

*这是"我现在在哪"。*
