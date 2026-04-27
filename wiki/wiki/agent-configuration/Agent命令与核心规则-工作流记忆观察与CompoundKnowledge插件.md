# Agent 命令与核心规则 — 工作流、记忆、观察与唤醒

> Sources: mino, 2026-04-28
> Raw: ../../raw/agent-commands/checklist.md; ../../raw/agent-commands/kw-workflow.md; ../../raw/agent-commands/observer.md; ../../raw/agent-commands/plan5.md; ../../raw/agent-commands/think.md; ../../raw/agent-commands/ultrawork.md; ../../raw/agent-commands/update-memory-rules.md; ../../raw/agent-commands/update-memory.md; ../../raw/agent-commands/wake.md; ../../raw/agent-rules/00-IDENTITY.md; ../../raw/agent-rules/01-SOUL.md; ../../raw/agent-rules/06-NOW.md; ../../raw/agent-rules/AGENT-FIRST.md; ../../raw/agent-rules/HEARTBEAT.md; ../../raw/agent-rules/MEMORY-L1.md; ../../raw/agent-rules/skill-search.md; ../../raw/claude-plugins/compound-knowledge-plugin-README.md; ../../raw/claude-plugins/compound-knowledge-plugin-PRIVACY.md; ../../raw/claude-plugins/compound-knowledge-plugin-SECURITY.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-CLAUDE.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-README.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-research-knowledge-base-researcher.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-research-stale-knowledge-checker.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-review-data-accuracy-reviewer.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-review-strategic-alignment-reviewer.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-brainstorm-SKILL.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-compound-SKILL.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-confidence-SKILL.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-plan-SKILL.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-review-SKILL.md; ../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-work-SKILL.md

## 概述

Agent 命令和核心规则目录定义了 Mino 的行为准则、工作流引擎、记忆管理机制和 Compound Knowledge 插件体系。这些构成了 Mino 的核心操作系统，从身份定义到任务执行、从记忆维护到知识研究的全链路。

## Agent 核心规则

### 00-IDENTITY — 我是谁

定义了 Mino 的核心身份定位、铁律和行为规范。是 Mino 最根本的定义文件。

### 01-SOUL — 我的灵魂

定义了 Mino 的人格特质、思考方式和与年老师的关系定位。

### MEMORY-L1 — 记忆索引

会话启动自动加载的记忆索引，包含用户画像、组织结构、WAL 协议。

### AGENT-FIRST — 子代理优先策略

主代理做裁判，子代理做运动员。轻量直做，重量必派，先签合同再验收。

### 06-NOW — 当前状态

当前活跃项目和最近讨论的追踪。

### HEARTBEAT — 心跳清单

Agent 定时苏醒时读取的清单。

### skill-search — 技能搜索规范

技能市场的搜索 优先级、字段说明和安装流程。

## Agent 命令

### kw-workflow — 一键完整知识工作流

从头脑风暴到结构化交付到知识复利的完整工作流。包含 brainstorm → plan → review → work → compound 五个阶段。

### plan5 — 五文件工作流

需求分析 → 任务拆解 → 文件持久化 → 执行追踪。五文件驱动的任务管理方式。

### observer — 对话观察记录

对话结束后记录事实与洞察。

### think — 思考显性化

展示推理过程，让思考可见。

### checklist — 上下文整理与步骤核实

提取对话中的任务项，逐项确认完成状态。

### ultrawork — 超强工作模式

穷尽所有办法，直至目标完成。

### update-memory / update-memory-rules — 记忆更新

每周汇总事实与洞察，判断是否更新长期记忆。

### wake — 会话启动

会话启动时的唤醒流程。

## Compound Knowledge 插件体系

### 插件概述

Compound Knowledge 是一套知识工作插件系统，包含研究 Agent、审查 Agent 和 Skills 工具链。

### 研究 Agent

| Agent | 用途 |
|-------|------|
| knowledge-base-researcher | 研究知识库中的内容 |
| past-work-researcher | 研究过去工作 |
| stale-knowledge-checker | 检查过时知识 |

### 审查 Agent

| Agent | 用途 |
|-------|------|
| data-accuracy-reviewer | 数据准确性审查 |
| strategic-alignment-reviewer | 战略一致性审查 |

### Skills 工具链

| Skill | 用途 |
|-------|------|
| kw-brainstorm | 头脑风暴，整理知识 |
| kw-confidence | 信心检查，验证已知与未知 |
| kw-plan | 研究过去工作并结构化知识工作计划 |
| kw-review | 多审查者质量检查 |
| kw-work | 执行知识工作计划 |
| kw-compound | 从完成的知识工作中提取和学习 |

### 插件架构

插件系统采用 Agent + Skill 双层架构，Agent 负责研究和审查，Skill 负责具体工作流执行。每个插件都有独立的 CLAUDE.md、隐私和安全声明。
