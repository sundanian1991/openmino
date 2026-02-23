# CLAUDE.md — Daily 记录

> **L2: daily模块说明**

---

## Summary

日维度事实记录。记录每天发生的事实、涉及文件、产生结果。

**特点**：简洁、按时间顺序、不展开细节。

---

## Members

| 文件 | 用途 |
|------|------|
| **.index.md** | 快速索引（lifecycle/tags/summary） |
| **YYYY-MM-DD.md** | 事实记录 |

---

## Rules

### 文件命名

格式：`YYYY-MM-DD.md`

### 写作原则

- 一天一个文件
- 一天内多件事 → 按时间顺序记录在同一天文件中
- 简洁记录，不用详细展开
- 记录三要素：做了什么、涉及哪些文件、产生了什么结果

### 文件头标记

```markdown
---
lifecycle: P2  # P0=永久, P1=90天, P2=30天
tags: [obsidian-claude, ultrawork]
---
```

### 索引更新

写完文件后执行：
```bash
python3 memory/tasks/scripts/index_manager.py --action update-daily
```

---

*每天的事实，从这里开始。*

---

*最后更新：2026-02-23*