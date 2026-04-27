# Claude Code 学习体系 — 从工具到工作流

> Sources: mino, 2026-04-28
> Raw: ../../raw/learning/Claude Code-claude-code-guide.md; ../../raw/learning/Claude Code-TRANSPARENT-WORKFLOW.md; ../../raw/learning/Claude Code-claude-cli-system-prompt.md; ../../raw/learning/Claude Code-architecture.md; ../../raw/learning/Claude Code-documentation.md; ../../raw/learning/Claude Code-implement.md; ../../raw/learning/Claude Code-prompt.md; ../../raw/learning/Claude Code-use-claude-code.md; ../../raw/learning/Claude Code-personalization-upgrade-summary.md; ../../raw/learning/Claude Code-plan5-lessons.md; ../../raw/learning/Claude Code-plans.md; ../../raw/learning/Claude Code-CLAUDE.md

## Overview

2025年底至2026年初，年老师系统学习了 Claude Code 的核心组件和使用方法，从最初的"把它当聊天机器人"到建立完整的"工具→工作流→体系"认知。学习材料涵盖七大核心组件、透明工作机制、个性化升级和五文件工作流等主题。

## Claude Code 的七大核心组件

学习指南将 Claude Code 的能力分为七个层次，按使用频率排列：

> **CLAUDE.md（每天）**：项目记忆体，每次会话自动加载上下文。解决"每次新会话都要重复交代背景"的问题。
> **Commands（经常）**：快捷指令，一键触发重复任务。如 `/build`、`/test`、`/deploy`。
> **Skills（有时）**：工作流模板，可复用的最佳实践。如代码审查、文档生成、数据分析。
> **Hooks（有时）**：自动化触发器，事件驱动。如 pre-commit 自动格式化、post-save 自动测试。
> **SubAgents（偶尔）**：任务分解专家，并行处理复杂任务。如 Explore agent 搜索文件、Planner agent 设计方案。
> **MCP Servers（有时）**：连接外部世界的桥梁。如连接 Figma、Slack、Jira。
> **Plugins（很少）**：功能大礼包，一键安装扩展能力。

## 透明工作流机制

透明工作流（TRANSPARENT-WORKFLOW.md）定义了五步工作法：

### 五步工作流

| 步骤 | 名称 | 核心动作 |
|------|------|---------|
| Step 1 | Intent Gate（意图分类） | 收到请求后先分类：简单查询/复杂任务/探索任务/代码任务/数据任务 |
| Step 2 | Pre-Declaration（委派前声明） | 使用agent或工具时说明理由和预期 |
| Step 3 | Todo Management（任务可视化） | 多步骤任务时列出拆分清单 |
| Step 4 | Progress Visibility（过程透明） | 执行中实时汇报进度 |
| Step 5 | Verification & Summary（验证总结） | 完成后逐项对照验收 |

这个机制的核心价值：**让AI的思考过程可见，不再是黑盒操作**。

## 个性化升级的关键决策

个性化升级总结文档记录了几个关键的配置决策：

### CLAUDE.md 的结构化演进

从最初的简单说明，逐步演化为分层结构：

```
CLAUDE.md（入口，索引）
    ↓
.claude/rules/（核心规则，每次自动加载）
    ├── 00-IDENTITY.md    # 身份与铁律
    ├── 01-SOUL.md        # 性格与气质
    ├── AGENT-FIRST.md    # 子代理优先
    ├── MEMORY-L1.md      # 记忆索引
    └── 06-NOW.md         # 当前状态
        ↓
.claude/reference/（扩展规则，按需读取）
    ├── 03-USER.md        # 用户画像
    ├── 07-WORK.md        # 工作契约
    ├── 09-TOOLS.md       # 工具使用
    └── 10-CODESTYLE.md   # 代码规范
        ↓
.claude/commands/（快捷指令）
.claude/skills/（工作流模板）
```

### Hooks 的自动化设计

关键 hooks：
- **status-bar.js**：会话状态栏，实时显示当前任务和进度
- **transparent-thinking-checker.js**：检查AI是否展示了思考过程
- **transparent-thinking-reminder.js**：提醒AI展示思考过程

## Plan5 工作流的经验教训

Plan5 是从学习中总结的五文件工作流：

1. **需求分析**（requirements.md）— 明确要做什么
2. **任务拆解**（tasks.md）— 拆解为可执行步骤
3. **文件持久化**（persist.md）— 记录到文件系统
4. **执行追踪**（track.md）— 跟踪执行进度
5. **验证总结**（verify.md）— 对照需求验收

关键教训：
- **不要跳过需求分析**：直接开始写代码是最常见的错误
- **任务拆解要具体**："重构代码"不是任务，"将X函数从A文件移到B文件"才是
- **持久化是核心**：不记录到文件系统的讨论，下次会话就会丢失
- **验证要对照合同**：完成标志是什么，必须提前定义

## 架构理解

Claude Code 的架构理解文档揭示了几个关键概念：

> **CLI-first vs IDE**：Claude Code 采用命令行优先路线，比 IDE 集成工具更轻量、灵活、可脚本化。
> **Agentic Coding**：AI 不只是补全代码，而是主动完成任务 — 编辑文件、运行命令、创建提交。
> **上下文管理**：通过 CLAUDE.md 实现跨会话记忆，通过 rules/ 实现行为控制。

## 核心学习路径

从学习材料的顺序可以看出年老师的学习路径：

```
1. 了解工具定位（CLI-first, Agentic Coding）
    ↓
2. 学习七大组件（CLAUDE.md, Commands, Skills, Hooks...）
    ↓
3. 建立工作流（透明工作流, Plan5）
    ↓
4. 个性化升级（rules分层, hooks自动化）
    ↓
5. 持续优化（skills管理, 插件评估）
```

## 工具掌握的关键指标

学习材料中隐含了几个判断"是否真正掌握"的指标：

1. **能否在3分钟内创建一个新的 CLAUDE.md**：说明理解了上下文管理的核心
2. **能否用一句话说清每个组件的用途**：说明理解了工具的定位
3. **能否自主设计新的 hooks**：说明理解了事件驱动机制
4. **能否为重复任务创建 commands**：说明理解了自动化思维
