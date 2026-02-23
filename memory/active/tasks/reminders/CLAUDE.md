# CLAUDE.md — Reminders 定时提醒

> **L3: reminders 模块说明**

---

## Summary

定时提醒触发器。在特定时间触发深度对话或复盘。

---

## Members

| 文件 | 触发时间 | 内容 |
|------|----------|------|
| **weekend-dialogue.md** | 每周六/日 | 32 个问题深度对话 |
| **monthly-audit.md** | 每月 20 日 | 职业资产清算 |

---

## Rules

### 触发机制

通过 heartbeat.md 中的逻辑判断时间，自动触发提醒。

### 新增提醒

创建新提醒时：
1. 在 reminders/ 下新建 .md 文件
2. 说明触发时间、对话内容、输出方式
3. 在 heartbeat.md 中集成时间判断逻辑

---

*定时复盘，不忘成长。*

---

*最后更新：2026-02-23*