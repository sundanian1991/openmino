---
input: 每日对话记录
output: 事实记录（P1 活跃期）
pos: active/的成员
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Active Daily

> **每日记录 — P1 活跃期（90 天）**

---

## Summary

存储 30-90 天内的日记，记录每天发生的事实。

---

## Rules

1. **命名**：YYYY-MM-DD.md
2. **更新**：每天会话结束后写入
3. **流转**：
   - 90 天后 → UPDATE_MEMORY 检查 → archive/ 或 删除

---
