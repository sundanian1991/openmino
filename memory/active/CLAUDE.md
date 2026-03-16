---
input: 新文件、当前会话记录
output: 活跃中的记忆（30-90 天）
pos: memory/的 P1 活跃区
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Active Memory

> **P1 活跃记忆 — 中期项目（90 天）**
>
> **相关链接**：[[../CLAUDE]]（根目录记忆系统）| [[记忆系统]]

---

## Summary

存储当前活跃的记忆：最近的日记、思考、任务机制。

**90 天后自动降级到 transient/ 或 archive/**

---

## Members

| 文件 | 用途 |
|------|------|
| daily/ | Daily（活跃期） |
| goals/ | GOALS |
| my-thoughts/ | My Thoughts（活跃期） |
| observations/ | OBSERVATIONS |
| tasks/ | Tasks 任务系统 |
| weekly/ | WEEKLY |
| `CLAUDE.md` | Claude 配置文档 |
| `README.md` | 目录说明文档 |

---

## Rules

1. **进入**：新文件默认进入 active/
2. **生命周期**：90 天后检查 → 有价值降为 P0，无价值降级到 transient/
3. **清理**：UPDATE_MEMORY 每周检查生命周期
4. **项目启动**：复杂项目使用 `tasks/templates/project-workflow.md`，填写 Prompt+Plans 后启动

---

*这是"我现在在哪"。*
