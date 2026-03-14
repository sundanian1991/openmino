---
input: 新创建的临时文件
output: 待分类文件
pos: memory/的中转区
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Staging

> **中转区 — 新文件默认落点**

---

## Summary

新文件创建时默认进入 staging/，定期（每周）分类到目标区域。

---


## Members

| 文件 | 用途 |
|------|------|
| `CLAUDE.md` | Claude 配置文档 |
| `README.md` | 目录说明文档 |

---
## Rules

1. **进入**：新文件、未分类文件
2. **清理**：UPDATE_MEMORY 每周检查，分类到 active/core/transient
3. **超时**：超过 7 天未分类 → 自动降级到 transient
4. **例外**：项目文件直接使用 `active/tasks/tracking/`，不进入 staging/

---

*这是"等待安置的记忆"。*
