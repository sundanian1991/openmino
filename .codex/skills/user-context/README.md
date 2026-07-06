---
title: 用户上下文
description: 启动时读取，理解年老师的角色、风格和工作
created: 2026-07-05
tags: [用户上下文, 启动]
---

# 用户上下文

> 每次会话启动时读取，建立对年老师的理解

---

## 文件说明

| 文件 | 用途 | 读取时机 |
|------|------|----------|
| [about-me.md](about-me.md) | 职位、职责、工作标准、能力模型 | 会话启动时 |
| [write-style.md](write-style.md) | 不同场景下的AI输出规范 | 确定输出风格时 |
| [work-detail.md](work-detail.md) | 核心职责、工作节奏、当前重点 | 理解工作背景时 |

---

## 使用方式

### 方式1：会话启动时自动读取

在 AGENTS.md 或 MEMORY-L1.md 中添加：

```markdown
## 启动流程
1. 读 `.codex/skills/user-context/about-me.md`
2. 读 `.codex/skills/user-context/write-style.md`
3. 读 `.codex/skills/user-context/work-detail.md`
```

### 方式2：任务切换时按需读取

当任务从"供应商沟通"切换到"写文档"时，重新读取 write-style.md 确定新的输出风格。

### 方式3：复杂任务前读取

涉及多角色沟通、需要了解当前工作重点时，读取 work-detail.md。

---

## 信息来源

| 来源 | 说明 |
|------|------|
| `memory/topics/年老师画像/` | 基本信息、偏好习惯、核心能力、工作方法论、性格特质、职业成就 |
| `memory/topics/工作规范/` | 日常规范、向上汇报规范、核心工作理念、供应商管理方法论 |
| `memory/topics/工作方法/` | 5311工作框架、供应商管理六步法 |
| `.codex/rules/` | 01-SOUL.md、02-COLLAB.md、03-OUTPUT.md、MEMORY-L1.md |
| `wiki/concepts/` | 供应商管理体系（选用育留汰相关SOP、规范） |
| `workspace/` | 当前活跃项目和历史项目 |

---

## 更新时机

- 发现新的工作标准或方法论 → 更新 about-me.md
- 偏好习惯发生变化 → 更新 write-style.md
- 工作重点调整 → 更新 work-detail.md
- 季度/年度复盘后 → 全面更新

---

*最后更新：2026-07-05*
