---
input: 降级文件、临时记录
output: 临时记忆（30 天）
pos: memory/的 P2 临时区
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Transient Memory

> **P2 临时记忆 — 短期保留（30 天）**

---

## Summary

存储临时性、事务性的记录。

**30 天后自动删除**（内容已提炼到周文档）。

---

## Members

| 文件 | 用途 |
|------|------|
| daily/ | Transient Daily |
| `CLAUDE.md` | Claude 配置文档 |
| `README.md` | 目录说明文档 |
| `capture-log.md` | Markdown 文档 |

---

## Rules

1. **进入**：从 active/降级而来
2. **生命周期**：30 天后自动删除
3. **清理**：UPDATE_MEMORY 每周检查并清理

---

*这是"暂时的痕迹"。*
