---
input: monday-learning.md 文章2拆分
output: Claude Code Best Practices 导航索引
pos: stanford-cs146s/notes/best-practices/
---

# Claude Code Best Practices — 详细版

> 从 monday-learning.md 文章2拆分而来，每篇独立展开

---

## 📚 文件导航

| 文件 | 核心主题 | 预计阅读时间 |
|------|---------|-------------|
| **[01-context-management.md](./01-context-management.md)** | Context 管理最重要 | 15 分钟 |
| **[02-planning-architecture.md](./02-planning-architecture.md)** | Plan First 不可协商 | 12 分钟 |
| **[03-tools-automation.md](./03-tools-automation.md)** | Skills & Hooks & 简单控制循环 | 18 分钟 |
| **[04-code-quality.md](./04-code-quality.md)** | TDD & 代码审查 | 10 分钟 |
| **[05-anti-patterns.md](./05-anti-patterns.md)** | 反模式与避坑 | 8 分钟 |

---

## 🎯 核心认知

> **Claude Code 成功的关键** = Context 管理（基础） + Plan First（方法论） + 简单胜过复杂（架构） + 质量 Gates（保障）

---

## 📊 快速参考

### Context 管理阈值

| 指标 | 阈值 | 行动 |
|------|------|------|
| Token 数量 | 60k+ | 立即清理 |
| Context 占用 | 30%+ | 立即清理 |
| 修复时间 | 新手能修复 | Document & Clear |

### Plan First 触发条件

```
步骤 ≥3 步 → ✅ 必须 Plan First
涉及删除/覆盖 → ✅ 必须 Plan First
新功能实现 → ✅ 必须 Plan First
架构级修改 → ✅ 必须 Plan First
```

### 子代理选择

| 任务类型 | 子代理 | 用途 |
|---------|--------|------|
| 探索代码库 | Explore | 快速查找文件、搜索模式 |
| 复杂搜索 | general-purpose | 多步骤研究任务 |
| 架构设计 | Plan | 软件架构规划 |

---

## 🔗 相关资源

- [原文来源](https://github.com/anthropics/claude-code-best-practices) — 社区综合分析
- [Day 1 学习笔记](../monday-learning.md) — 三篇文章汇总

---

*创建时间：2026-03-01*
