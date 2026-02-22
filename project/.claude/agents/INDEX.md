# Agent索引

> 常用Agent模式和使用场景

---

## 可用Agent

| Agent名 | 用途 | 调用方式 | 使用场景 |
|---------|------|-----------|---------|
| **Explore** | 快速探索代码库 | `Task(subagent_type=Explore)` | 需要找文件、搜代码、理解项目结构时 |
| **general-purpose** | 综合任务处理 | `Task(subagent_type=general-purpose)` | 不确定用哪个agent时的默认选择 |
| **Planner** | 实施计划制定 | `Task(subagent_type=Plan)` | 复杂功能实施前，需要制定计划时 |
| **Code-reviewer** | 代码审查 | `Task(subagent_type=Code-reviewer)` | 写完代码后，需要review时 |
| **Security-reviewer** | 安全审查 | `Task(subagent_type=Security-reviewer)` | 处理认证、支付、敏感数据前 |
| **Tdd-guide** | 测试驱动开发 | `Task(subagent_type=Tdd-guide)` | 新功能开发、bug修复时 |
| **E2e-runner** | E2E测试 | `Task(subagent_type=E2e-runner)` | 关键用户流程需要验证时 |
| **Reading-internalizer** | 知识内化 | `Task(subagent_type=reading-internalizer)` | 读文章/书籍，需要消化整理笔记时 |

---

## 使用规则

**1. 我用Task工具时必须明确说**：
> "用【Explore agent】处理这个" 或 "用【Code-reviewer agent】检查这段代码"

**2. 年老师可以直接指定**：
- "用Explore agent搜一下供应商管理相关文件"
- "用general-purpose agent分析这个问题"

---

## 待补充Agent

根据年老师工作场景，待添加：
- **Supplier-analyst**: 供应商数据分析Agent
- **Promotion-writer**: 述职材料优化Agent
- **Meeting-prep**: 会议准备Agent
