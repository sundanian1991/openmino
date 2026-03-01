---
input: Week 1 Day 1 学习 - How Anthropic Uses Claude Code + Claude Code Best Practices
output: 核心洞察提炼 + 对比我们的实践
pos: projects/stanford-cs146s/notes/ 周一学习笔记
---

# Day 1 学习笔记 | 2026-03-01

> 学习主题：Anthropic 内部如何使用 Claude Code

---

## 📖 阅读材料 1：How Anthropic Uses Claude Code

**来源**：Anthropic 内部白皮书（PDF）
**时间**：30 分钟
**链接**：https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf

### 核心内容

**覆盖部门**（9个）：
1. 数据基础设施（Data Infrastructure）
2. 产品开发（Product Development）
3. 安全工程（Security Engineering）
4. 推理（Inference）
5. 数据科学与可视化（Data Science & Visualization）
6. API（API）
7. 增长营销（Growth Marketing）
8. 产品设计（Product Design）
9. RL 工程（RL Engineering）
10. 法务（Legal）

### 核心洞察

**1. Claude Code 应用模式**

| 用例类型 | 说明 | 示例 |
|---------|------|------|
| **开发者** | 编码、调试、重构 | 复杂多步骤任务 |
| **非技术员工** | 自动化任务、桥接技能差距 | 数据分析、文档生成 |

**2. 关键发现**

- **跨部门应用**：不只是工程团队，法务、营销、设计都在用
- **技能桥接**：非技术员工能完成原本需要开发的工作
- **自动化程度高**：从简单任务到复杂项目自动化

### 我们实践的对比

| 主题 | Anthropic 怎么做 | 我们怎么做 | 改进空间 |
|------|-----------------|-----------|---------|
| **Subagent 使用** | 按场景明确分类 | Explore/general-purpose/Plan | ✅ 需要明确自主级别 |
| **并行任务** | 根据任务性质动态选择 | 固定策略 | ✅ 需要优化选择逻辑 |
| **验证机制** | 人工 + 自动结合 | Hook 验证 | ✅ 已有，可增强 |
| **非技术用户** | 法务/营销/设计都在用 | 主要是技术任务 | ✅ 可扩展到文档/汇报 |

---

## 📖 阅读材料 2：Claude Code Best Practices

**来源**：社区整理的最佳实践
**时间**：20 分钟
**链接**：https://rosmur.github.io/claudecode-best-practices/

### 核心要点

**1. Context 管理**

| 实践 | 说明 | 我们现状 |
|------|------|---------|
| **CLAUDE.md** | 项目级指令 | ✅ 已有，完善 |
| **/clear 使用** | 频繁清理上下文 | 会话重启时清理 |
| **文档系统** | 分层记忆体系 | ✅ 四层记忆已建 |

**2. 工具设计**

| 实践 | 说明 | 我们现状 |
|------|------|---------|
| **Token 效率** | 优先专用工具 | ✅ Read/Edit/Glob/Grep |
| **避免冗余** | 不重复信息 | ✅ 有待优化 |
| **错误处理** | 优雅降级 | ✅ Hook 机制 |

**3. 检查清单**

| 实践 | 说明 | 我们现状 |
|------|------|---------|
| **复杂工作流** | 必备 checklist | ✅ Plan First |
| **验证步骤** | 每步可检查 | ✅ verify-plan.sh |
| **人工介入点** | 明确决策点 | ✅ 已有 |

---

## 📖 阅读材料 3：Specs Are the New Source Code

**来源**：Ravi Mehta（Stripe 前工程总监）
**时间**：15 分钟
**链接**：https://blog.ravi-mehta.com/p/specs-are-the-new-source-code

### 核心观点

> **"Specs 是新的源代码 — AI 时代，写规范比写代码更重要"**

### 核心理念

| 时代 | 流程 |
|------|------|
| **传统开发** | 代码 → 文档 |
| **AI 时代** | Spec → AI 生成代码 |

**核心洞察**：
- Spec 质量 = 代码质量
- 开发者角色转变：从"写代码"到"写规范"
- AI 是执行者，人类是架构师

### 我们的应用

| 模板 | 状态 | 改进方向 |
|------|------|---------|
| **Plan First** | ✅ 已有 | 添加 Spec 章节 |
| **SIMPLE-TEMPLATE** | ✅ 已有 | 参考 Spec 格式 |
| **Design Doc** | ❌ 缺失 | 考虑引入 |

---

## 🔑 核心洞察总结

### 洞察 1：Claude Code 的角色定位

**不是"替代开发者"，是"放大能力"**：
- 技术员工：更快完成复杂任务
- 非技术员工：跨越技能差距

### 洞察 2：Spec 的重要性

**AI 时代的开发范式转变**：
- 从"如何写代码"到"如何描述需求"
- Spec 质量 > 代码技巧

### 洞察 3：Context 管理是核心竞争力

**长上下文 ≠ 好记忆**：
- 需要主动的上下文管理
- 四层记忆体系是正确方向

---

## 📋 明日计划（周二）

- [ ] 分析我们的 Subagent 策略（读 04-MEMORY L2 区）
- [ ] 列出当前策略的问题
- [ ] 基于今日阅读，提出改进方案
- [ ] 创建改进清单

**产出目标**：`notes/subagent-analysis.md`

---

## 💭 思考与疑问

**待回答的问题**：
1. 我们的 Subagent 自主级别是否需要明确定义（低/中/高）？
2. 并行任务的数量限制（≤3）是否合理？
3. 非技术场景（如文档、汇报）是否可以更多使用 Claude Code？

---

*创建时间：2026-03-01*
*预计完成：2026-03-07（本周五）*
