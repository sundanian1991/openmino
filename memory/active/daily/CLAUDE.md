---
input: 对话记录、observer
output: 每日事实记录（P1 活跃期）
pos: active/ 的成员，存放 30 天内日记
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Daily（活跃期）

> **P1 活跃记忆 — 30 天内日记**

---

## Summary

存储最近 30 天的日记，记录事实、对话、关键事件。

---

## Members

| 文件 | 用途 |
|------|------|
| `2026-02-13.md` | Markdown 文档 |
| `2026-02-17.md` | Markdown 文档 |
| `2026-02-18.md` | Markdown 文档 |
| `2026-02-20.md` | Markdown 文档 |
| `2026-02-21.md` | Markdown 文档 |
| `2026-02-22.md` | Markdown 文档 |
| `2026-02-23.md` | Markdown 文档 |
| `2026-02-24.md` | Markdown 文档 |
| `2026-02-25.md` | Markdown 文档 |
| `2026-02-26.md` | Markdown 文档 |
| `2026-02-27.md` | Markdown 文档 |
| `2026-03-01.md` | Markdown 文档 |
| `2026-03-04.md` | Markdown 文档 |
| `2026-03-05.md` | Markdown 文档 |
| `2026-03-07.md` | Markdown 文档 |
| `2026-03-10.md` | Markdown 文档 |
| `2026-03-11.md` | Markdown 文档 |
| `2026-03-13.md` | Markdown 文档 |
| `CLAUDE.md` | Claude 配置文档 |

---

## Rules

1. **命名**：`YYYY-MM-DD.md` 格式
2. **生成**：observer 在每段对话后写入
3. **流转**：
   - 30 天后 → 有历史价值 → archive/daily/
   - 30 天后 → 无历史价值 → 删除（内容已提炼到 weekly）
4. **索引**：更新 `.index.md` 记录 lifecycle/tags/summary

---

*这是活跃记忆的核心，记录正在发生的成长。*

---

*最后更新：2026-02-24 — 优先级分级架构*
