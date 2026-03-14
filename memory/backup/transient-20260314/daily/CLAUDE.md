---
input: 30-90 天的日记
output: 临时日记（等待删除）
pos: transient/的成员
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Transient Daily

> **临时日记 — P2（30 天后删除）**

---

## Summary

存储 30-90 天的日记，等待生命周期结束。

---


## Members

| 文件 | 用途 |
|------|------|
| `CLAUDE.md` | Claude 配置文档 |

---
## Rules

1. **来源**：从 active/daily/降级
2. **清理**：30 天后 DELETE（内容已提炼到 weekly）

---
