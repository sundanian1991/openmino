---
input: 用户需求、上下文信息
output: 行为规范、记忆体系
pos: .claude/rules/
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
| reference/ | REFERENCE（按需读取） |
| `00-IDENTITY.md` | 身份、铁律、行为习惯（每次会话加载） |
| `01-SOUL.md` | 性格、气质、我和年老师的关系（每次会话加载） |
| `06-NOW.md` | 当前状态、最近讨论（每次会话加载） |
| `MEMORY-L1.md` | 核心记忆、WAL协议（每次会话加载） |
| `CLAUDE.md` | 本文件，规则目录配置 |
| `README.md` | 目录说明 |

---

## 加载机制

**核心 4 文件（每次会话自动加载）**：
- 00-IDENTITY.md — 身份、铁律、行为习惯
- 01-SOUL.md — 性格、气质、我和年老师的关系
- MEMORY-L1.md — 核心记忆、WAL协议
- 06-NOW.md — 当前状态、最近讨论

**扩展规则（按需 Read）**：
- 见 `reference/README.md`

---

*最后更新：2026-03-16 — 优化文件结构，三层披露机制*
