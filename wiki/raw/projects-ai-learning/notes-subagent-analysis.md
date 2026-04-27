---
input: 04-MEMORY L2 区 Subagent 策略 + Day 1 学习对比
output: Subagent 策略改进方案
pos: projects/stanford-cs146s/notes/ 周二分析文档
---

# Subagent 策略分析 | Day 2

> 基于 04-MEMORY.md L2 区策略 + Anthropic 最佳实践对比

---

## 📊 当前策略（04-MEMORY.md L2 区）

### 子代理系统工作流

**优先级列表**：
```
planner → tdd-guide → code-reviewer → security-reviewer
```

**可用 Subagent**：
| Subagent | 模型 | 用途 |
|----------|------|------|
| **Explore** | haiku | 快速探索代码库 |
| **general-purpose** | sonnet | 复杂搜索、多步骤任务 |
| **Plan** | opus | 软件架构设计 |
| **Bash** | haiku | 命令执行 |

---

## 🔍 问题识别

### 问题 1：优先级列表混乱

**观察**：
- `planner → tdd-guide → code-reviewer → security-reviewer` 是什么？
- 这些不是 Subagent，是 Skills
- 与下面列出的 Explore/general-purpose/Plan 无关

**影响**：理解混乱，无法执行

---

### 问题 2：缺少自主级别定义

**Anthropic 做法**：
- **低自主**：每步需要人工确认
- **中自主**：阶段性人工介入
- **高自主**：独立完成，人工验收

**我们现状**：❌ 无明确级别

**影响**：
- 不知道何时该人工介入
- 容易过度授权或授权不足

---

### 问题 3：缺少"何时不用 Subagent" 规则

**应该有的规则**：
| 场景 | 行为 |
|------|------|
| 已知文件路径 | 直接 Read，不用 Explore |
| 搜索单个类/函数 | 直接 Grep，不用 general-purpose |
| 简单 1-2 步任务 | 直接执行，不用 Subagent |

**我们现状**：❌ 无明确规则

**影响**：
- 可能过度使用 Subagent
- 浪费时间和上下文

---

### 问题 4：无并行任务数量限制

**Anthropic 建议**：
- 并行 Subagent ≤ 3 个
- 避免上下文混乱

**我们现状**：❌ 无限制

**影响**：
- 可能同时启动过多 Subagent
- 结果聚合困难

---

### 问题 5：Bash 不应该列为 Subagent

**观察**：Bash 是工具，不是 Subagent

**影响**：概念混淆

---

## ✅ 改进方案

### 改进 1：清理优先级列表

**删除**：`planner → tdd-guide → code-reviewer → security-reviewer`

**理由**：
- 这些是 Skills，不是 Subagent 调用优先级
- 造成混淆，应该移除

---

### 改进 2：定义 Subagent 自主级别

| 级别 | Subagent | 人工介入 | 适用场景 |
|------|----------|---------|---------|
| **低** | Explore | 每步确认 | 探索未知代码库、首次访问 |
| **中** | general-purpose | 阶段确认 | 多步骤任务、需要反馈调整 |
| **高** | Plan | 仅验收 | 架构设计、明确边界任务 |

---

### 改进 3：添加"何时不用 Subagent" 规则

**强制规则**：

```
收到任务
    ↓
需要找文件？
  ├─ 已知路径 → Read（不用 Explore）
  ├─ 按名称 → Glob（不用 Explore）
  └─ 按内容 → Grep（不用 Explore）

需要探索代码库？
  ├─ 1-2 个位置 → Glob/Grep（不用 Explore）
  └─ 3 个以上 → Task(Explore)

需要研究问题？
  ├─ 本地代码库 → Task(Explore)
  ├─ 实时信息 → tavily_search
  └─ 复杂多步骤 → Task(general-purpose)
```

---

### 改进 4：添加并行任务限制

**规则**：
```
最大并行 Subagent 数量：≤ 3

超出时：
1. 按优先级排序
2. 合并低优先级任务
3. 串行执行或分批
```

---

### 改进 5：移除 Bash，明确 Subagent 定义

**更新后列表**：
| Subagent | 模型 | 自主级别 | 用途 |
|----------|------|---------|------|
| **Explore** | haiku | 低 | 快速探索代码库 |
| **general-purpose** | sonnet | 中 | 复杂搜索、多步骤任务 |
| **Plan** | opus | 高 | 软件架构设计 |

**Bash**：工具，不列入 Subagent

---

## 📝 建议的 04-MEMORY.md 更新内容

```markdown
### 子代理系统工作流

**Subagent 定义**（按自主级别分类）：

| 级别 | Subagent | 模型 | 人工介入 | 适用场景 |
|------|----------|------|---------|---------|
| **低** | Explore | haiku | 每步确认 | 探索未知代码库、首次访问 |
| **中** | general-purpose | sonnet | 阶段确认 | 多步骤任务、需要反馈调整 |
| **高** | Plan | opus | 仅验收 | 架构设计、明确边界任务 |

**使用决策树**：
```
收到任务
    ↓
需要找文件？
  ├─ 已知路径 → Read（直接）
  ├─ 按名称 → Glob（直接）
  └─ 按内容 → Grep（直接）

需要探索代码库？
  ├─ 1-2 个位置 → Glob/Grep（直接）
  └─ 3 个以上 → Task(Explore)

需要研究问题？
  ├─ 本地代码库 → Task(Explore)
  ├─ 实时信息 → tavily_search
  └─ 复杂多步骤 → Task(general-purpose)
```

**并行执行规则**：
- 最大并行 Subagent：≤ 3
- 超出时按优先级排序或分批执行
- 强依赖链：串行执行（深度优先）
- 可独立拆分：并行执行（多 Agent 协同）

**执行规范**：
1. 委派前声明：理由 + 预期结果
2. 完成后验证：结果是否符合预期
3. 简单任务直接执行，不调用 Subagent
```

---

## 🎯 明日行动（周三）

- [ ] 更新 04-MEMORY.md 的 Subagent 策略
- [ ] 更新 TOOLS.md 的 Subagent 使用规范
- [ ] 测试改进后的策略
- [ ] 记录改进效果

---

## 💡 核心洞察

1. **概念清晰 > 功能复杂**：Bash 是工具不是 Subagent
2. **明确边界 > 灵活多变**：知道何时不用 Subagent 更重要
3. **自主级别是核心**：决定人工介入点，平衡效率与控制
4. **并行需要限制**：≤3 是合理上限，避免混乱

---

*创建时间：2026-03-01（周二）*
*预计实施：2026-03-01（周三）*
