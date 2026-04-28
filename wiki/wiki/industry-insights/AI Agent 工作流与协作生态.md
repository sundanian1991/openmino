# AI Agent 工作流与协作生态

> Sources: mino, 2026-04-28
> Raw:../../raw/learning/AI-Agent工作流解析-agency-agents-current.md; ../../raw/learning/AI协作-Claude.md

## 概述

通过学习 agency-agents 的角色清单和 AI 协作模式，建立了完整的 AI Agent 协作生态认知。从单一AI助手到多角色协作团队，AI Agent 正在从工具进化为工作伙伴。

## AI Agent 角色生态

### 原有核心角色（34个）

安装 agency-agents 前，已有34个角色，覆盖规划、开发、测试、文档四大类：

| 类别 | 核心角色 | 优先级 |
|------|---------|--------|
| **规划** | planner、cli-planning-agent、action-planning-agent | 高 |
| **开发** | tdd-developer、code-developer、engineering-frontend-developer | 高 |
| **测试** | tdd-guide、e2e-runner、test-fix-agent | 高 |
| **审查** | code-reviewer、security-reviewer、architect | 高 |
| **运维** | build-error-resolver、refactor-cleaner、devops-automator | 高 |
| **文档** | doc-updater、doc-generator、technical-writer | 中 |

### 工程类角色（23个）

新增的工程类角色覆盖完整的软件开发生命周期：

- **核心角色（10个）**：前端开发、后端架构、安全工程、代码审查、数据库优化、DevOps自动化、软件架构、SRE、技术文档
- **辅助角色（13个）**：缓存工程师、API设计师、性能工程师、测试自动化、微服务架构师等

### 角色选择的关键原则

> **保留高相关性的核心角色**：不是角色越多越好，过多的角色会导致选择困难和上下文污染
> **按使用频率分层**：高频角色（⭐⭐⭐⭐⭐）必须精通，低频角色（⭐）了解即可
> **避免功能重叠**：如 code-reviewer 和 engineering-code-reviewer 功能重复，只保留一个

## AI 协作模式

AI 协作模式文档定义了三种协作层次：

### 第一层：工具层（AI 作为工具）

> 用户输入指令 → AI 执行 → 输出结果

特点：单向指令，AI 是被动的执行者。适合简单查询和明确指令。

### 第二层：助手层（AI 作为助手）

> 用户描述问题 → AI 分析方案 → 用户决策 → AI 执行

特点：AI 提供建议和分析，但决策权在用户。适合方案设计和复杂任务。

### 第三层：伙伴层（AI 作为伙伴）

> 用户提出目标 → AI 主动拆解 → 自主执行 → 结果汇报 → 迭代优化

特点：AI 有自主判断和决策能力，与用户平等协作。这是年老师与 Mino 的关系模式。

## 协作生态的最佳实践

### 1. 角色轮换策略

不是所有角色同时激活。根据任务阶段动态启用：

```
规划阶段 → planner + architect
    ↓
开发阶段 → developer + code-reviewer
    ↓
测试阶段 → tdd-guide + e2e-runner
    ↓
交付阶段 → doc-generator + memory-bridge
```

### 2. 上下文隔离

每个角色运行在独立的上下文中，避免互相污染。主代理负责聚合和协调。

### 3. 降级路径

当某个角色不可用时，有替代方案：
- 无 planner → 手动拆分任务
- 无 code-reviewer → 安全模式（不修改代码，只输出建议）

## 对供应商管理的启示

AI Agent 协作模式可以映射到供应商管理场景：

| AI 概念 | 供应商管理映射 |
|---------|--------------|
| 多角色协作 | 多供应商协同 |
| 角色轮换 | 按项目阶段分配产能 |
| 上下文隔离 | 不同供应商独立作业 |
| 主代理协调 | 供应商管理者的统筹角色 |
| 降级路径 | 供应商备用方案（AB方案）

这种映射帮助理解：管理 AI Agent 团队和管理供应商团队，底层逻辑是相通的。
