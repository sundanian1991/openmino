---
input: 用户需求、上下文信息
output: 行为规范、记忆体系
pos: .claude/rules/
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — RULES

> 核心规则目录 — 定义 Mino 的行为规范和记忆体系

---

## Summary

存放 Mino 的核心规则文件，每次会话自动加载，定义身份、性格、习惯和工作方式。

---

## Members

| 文件 | 用途 |
|------|------|
| reference/ | REFERENCE |
| `00-HABIT.md` | Markdown 文档 |
| `01-IDENTITY.md` | Markdown 文档 |
| `02-SOUL.md` | Markdown 文档 |
| `06-NOW.md` | Markdown 文档 |
| `CLAUDE.md` | Claude 配置文档 |
| `MEMORY-L1.md` | Markdown 文档 |
| `README.md` | 目录说明文档 |

---

## 加载机制

**核心 4 文件（每次会话自动加载）**：
- 00-HABIT.md — 习惯（强制执行）
- 01-IDENTITY.md — 身份
- 02-SOUL.md — 性格
- 06-NOW.md — 当前状态

**扩展规则（按需 Read）**：
- 见 `reference/README.md`

---

*最后更新：2026-03-14 — 更新 Members 表格用途描述*