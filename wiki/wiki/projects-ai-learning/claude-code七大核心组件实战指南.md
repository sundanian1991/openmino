# Claude Code七大核心组件实战指南

> Sources: mino, 2026-04-28
> Raw: ../../raw/projects-ai-learning/notes-monday-learning.md; ../../raw/projects-ai-learning/outputs-COURSE-GUIDE.md; ../../raw/projects-ai-learning/outputs-WEEK1-AGENT-MCP.md; ../../raw/projects-ai-learning/notes-best-practices-01-context-management.md; ../../raw/projects-ai-learning/notes-best-practices-02-planning-architecture.md; ../../raw/projects-ai-learning/notes-best-practices-03-tools-automation.md; ../../raw/projects-ai-learning/notes-best-practices-04-code-quality.md; ../../raw/projects-ai-learning/notes-best-practices-05-anti-patterns.md

## 概述

本文档系统整理了Claude Code的七大核心组件（CLAUDE.md、Commands、Hooks、SubAgents、Skills、Plugins、MCP Servers）的实战应用指南，结合了Anthropic内部实践、社区最佳实践以及个人学习内化。文档不仅涵盖每个组件的独立使用方法，更深入分析了组件之间的协同策略、常见反模式以及与我们实际工作体系的对比分析。核心认知：Context管理是最重要的基础，Plan First是不可协商的方法论，简单胜过复杂是架构设计的根本原则。

## 一、工具定位与核心认知

### 1.1 CLI-first的Agentic Coding

Claude Code采用命令行优先路线，在终端中运行。与Cursor等IDE集成工具不同，它更轻量、灵活、可脚本化。

| 维度 | CLI-first (Claude Code) | IDE 集成 (Cursor) |
|------|----------------------|-----------------|
| 启动速度 | 秒开 | 需要加载 IDE |
| 脚本化 | 可编写自动化脚本 | 较复杂 |
| 远程开发 | SSH 直连，无 GUI 负担 | 需要 GUI 转发 |
| 学习曲线 | 熟悉终端即可 | 需了解 IDE 插件 |
| 灵活性 | 可组合 Unix 工具 | 受限于 IDE |

Agentic Coding意味着AI不只是补全代码，而是主动完成任务——可以直接编辑文件、运行命令、创建提交、连接外部工具。

### 1.2 七大组件全景图

| 组件 | 一句话理解 | 使用频率 |
|------|----------|---------|
| CLAUDE.md | 项目记忆体，自动加载上下文 | 每天 |
| Commands | 快捷指令，一键触发重复任务 | 经常 |
| Hooks | 自动化触发器，事件驱动 | 有时 |
| SubAgents | 任务分解专家，并行处理 | 偶尔 |
| Skills | 工作流模板，可复用 | 有时 |
| Plugins | 功能大礼包，一键安装 | 很少 |
| MCP Servers | 连接外部世界的桥梁 | 有时 |

## 二、CLAUDE.md：项目记忆的核心载体

### 2.1 痛点与解决方案

**痛点**：每次新会话都要重复交代项目背景——"我们用的是React还是Vue？""测试命令是什么？""代码规范有什么要求？"

**解决方案**：在项目根目录创建CLAUDE.md，AI每次会话自动读取。

### 2.2 两层架构

| 类型 | 位置 | 大小限制 | 内容 |
|------|------|---------|------|
| 根目录 | /CLAUDE.md | 100-200行 | 通用规则、命令引用 |
| 子目录 | /path/CLAUDE.md | 50-100行 | 项目特定、本地命令 |

**为什么要分层**：单一CLAUDE.md容易文件过长（500+行）、Token浪费（每次都加载全部）、难以维护（改一处影响全局）。两层架构实现根目录精简、子目录灵活、Token高效。

### 2.3 写作原则与反模式

| 反模式 | 正确模式 |
|---------|---------|
| 嵌入整个文件内容 | "For complex usage, see path/to/docs.md" |
| "Never use --foo-bar flag"（会卡住Agent） | "Never use --foo-bar; prefer --baz instead" |
| 写全面手册 | 记录Claude经常犯错的地方 |

**关键规则**：否定式指令必须给出替代方案。只说"不要做什么"会让Agent卡住，必须同时说明"应该做什么"。

### 2.4 持续优化

CLAUDE.md不是写一次就完事了。需要像优化prompt一样持续迭代：
- 偶尔把CLAUDE.md通过prompt improver处理
- 调整指令（如添加"IMPORTANT"或"YOU MUST"）能提高遵循度
- 发现重复解释的内容就加进去
- 定期审查行数，控制在200行以内

## 三、Context管理：最关键的失败模式

### 3.1 Context退化曲线

LLM的Context Window虽然很大（Claude 3.5 Sonnet是200k tokens），但质量退化远早于达到上限：

```
Context 使用率
0% ———————— 30% ———————— 60% ———————— 100%
   良好       开始退化      严重退化
```

**关键发现**：
- 30% context时，模型开始忽略早期指令
- 60k tokens时，修复时间超过"Document & Clear"成本
- 不要等到上下文限制，要主动清理

### 3.2 三种清理模式

**模式1：简单重启**（30秒内）
- 适用：Context过长，但没有重要中间状态
- 执行：/clear + /catchup

**模式2：Document & Clear**（推荐）
- 适用：复杂任务，有重要中间状态
- 步骤：写进度到.md文件 → /clear → 新会话读取.md文件 → 继续工作

**模式3：分阶段重启**
- 适用：超大型任务（10+步骤）、长期项目
- 步骤：按阶段划分，每个阶段完成后Document & Clear

### 3.3 避免使用/compact

自动压缩是不透明、容易出错、未优化的。你不知道什么被保留了，什么被丢弃了，压缩后的内容可能不准确。替代方案是使用Document & Clear，手动总结关键信息。

### 3.4 三文件模式（Dev Docs）

```
~/dev/active/[task-name]/
├── [task-name]-plan.md      # 被接受的计划
├── [task-name]-context.md   # 关键文件、决策
└── [task-name]-tasks.md     # 工作检查清单
```

**核心价值**：文档即状态——新会话读文档就知道在哪；变更可追踪——Git提交历史就是决策历史；质量可验证——tasks.md每个勾选都是可验证的。

## 四、Commands：快捷指令的效率提升

### 4.1 使用方法

自定义斜杠命令存储于.claude/commands/目录。创建第一个命令/review：

```bash
mkdir -p .claude/commands
# 创建.claude/commands/review.md
```

### 4.2 带参数的命令

Commands支持$ARGUMENTS关键字来传递参数：

```markdown
# .claude/commands/fix-issue.md
请分析并修复GitHub issue: $ARGUMENTS
```

使用时：/fix-issue 123，Claude会自动处理issue #123的修复流程。

### 4.3 团队共享

将Commands文件签入git，团队成员可以共享统一的工作流。

## 五、Hooks：自动化任务的触发机制

### 5.1 常用事件类型

| 事件 | 触发时机 | 适用场景 |
|------|---------|---------|
| userPromptSubmit | 用户提交prompt后 | 自动记录对话日志、Skills自动激活 |
| sessionStart | 会话开始时 | 加载项目环境 |
| fileEdit/Edit | 文件编辑后 | 自动lint修复、运行测试 |
| PreToolUse | 工具调用前 | 拦截危险操作 |

### 5.2 质量控制Hook类型

**Block-at-Submit Hooks**（主要策略）：
- PreToolUse hook包装Bash(git commit)，检查验证文件
- 文件缺失则阻止提交，强制"test-and-fix"循环直到通过

**Hint Hooks**（非阻塞反馈）：
- 检测到次优模式时提供即抛即用指导
- 不阻止操作，只是提醒

**关键设计原则**：不要在写入时阻塞——让agent完成计划，然后检查最终结果。每次写入都检查会打断流程，完成后一次性检查更全面。

### 5.3 常见Hooks

- **Build Checker**：TypeScript编译错误、ESLint警告、Prettier格式问题
- **Test Runner**：测试是否通过、覆盖率是否达标
- **Error Handling Reminder**：检测缺少错误处理的异步操作
- **Skills Auto-Activation**：分析用户意图，匹配相关skills并注入激活提醒

## 六、Skills：工作流的复用模板

### 6.1 核心发现：手动Skills约90%时间被忽略

Claude优先选择原生工具，手动调用的skills经常被忽略。解决方案是基于Hook的自动激活。

### 6.2 UserPromptSubmit Hook自动激活

工作流程：用户输入消息 → Hook触发 → 分析关键词/意图 → 检查相关skills → 注入激活提醒 → Claude处理消息时已看到提醒。

### 6.3 Skill结构最佳实践

**重构前**：1500+行单文件，每次加载全部内容，Token浪费严重。

**重构后**：300-400行主文件 + 10-11个资源文件，Token效率提升40-60%。

```
SKILL.md（主文件，300-400行）
├── 核心概念 + 快速参考
└── 资源文件链接：
    ├── basics/（基础详解）
    ├── advanced/（进阶用法）
    ├── examples/（示例代码）
    └── faq.md（FAQ）
```

### 6.4 Skills链式调用

Skills之间可以互相调用，形成复杂工作流：
```
deploy
├── run-tests
├── build
├── bump-version
└── create-release
```

## 七、SubAgents：复杂任务的分解利器

### 7.1 使用场景

单一Agent处理复杂任务容易遗漏边界情况、在不同部分之间不一致、中途跑偏。原因是上下文太长，单一Agent难以保持专注。

### 7.2 实战案例

重构认证系统：
```
主Agent：规划整体架构
├── SubAgent 1：重构登录逻辑
├── SubAgent 2：重构Token管理
├── SubAgent 3：重构权限验证
└── SubAgent 4：更新单元测试
```

### 7.3 简单控制循环原则

**核心洞察**：Debuggability远胜于复杂的手调多Agent系统。

Claude Code架构：一个主线程（扁平消息列表）、最多一个分支（subagent结果加入主历史）、无复杂多Agent系统、大多数任务用简单迭代工具调用。

**什么时候需要多Agent**：真正并行的独立任务、明确的模块边界。而不是为了"看起来高级"或"别人都这么做"。

## 八、MCP Servers：连接外部世界的桥梁

### 8.1 什么是MCP

MCP（Model Context Protocol）是Anthropic推出的开放标准，让AI工具能连接外部数据源。类似"插件"，但更标准化。

### 8.2 实战场景

**Figma设计稿转代码**：通过MCP连接Figma → 读取图层和样式信息 → 生成对应的React代码。

**组合多个MCP**：Google Drive（需求文档）+ Figma（设计稿）+ GitHub（代码仓库）+ Slack（团队讨论），让Claude从所有来源获取信息，给出更全面的建议。

### 8.3 LLM Search优于RAG

RAG引入隐藏失败模式：相似度函数选择不稳定、重排器可能错过关键信息、Chunk代码导致上下文断裂、处理大JSON/logs格式依赖严重。

LLM Search方法：看10行理解结构，需要再看10行（就像人类），模型做重活（更少移动部分）。这被称为"LLM时代的Camera vs Lidar"。

## 九、Plugins：完整工作流的打包复用

### 9.1 痛点与解决方案

每个项目都要重新配置Commands、Skills、Hooks，复制粘贴配置文件还容易漏掉东西。Plugins是打包好的功能组合，可以包含任何组件，通过单个命令安装。

### 9.2 Plugin vs Skills vs Commands

- **Commands**：单个斜杠命令，快速触发一段prompt（像一个快捷键）
- **Skills**：可复用的工作流模板，Claude自动识别何时使用（像一本操作手册）
- **Plugins**：打包好的组合，包含Commands、Skills、SubAgents、Hooks、MCP配置（像一整套工具箱）

### 9.3 团队专属Marketplace

为团队创建私有Plugin Marketplace，统一工作流标准。一次配置，全员共享。新成员加入，几个命令就能同步整个团队的工作流。

## 十、组件协同策略

### 10.1 经典组合模式

| 组合 | 应用场景 | 效果 |
|------|---------|------|
| CLAUDE.md + Hooks | 新成员上手 | 上下文保障 + 自动质量检查 |
| SubAgents + MCP | 竞品分析 | 任务分解 + 多源数据整合 |
| Commands + Skills | 功能开发 | 快捷触发 + 标准化流程 |
| Plugins | 团队协作 | 一键配置完整环境 |

### 10.2 新功能开发工作流

```
1. /new-feature 触发功能开发
   ↓
2. AI 读取 CLAUDE.md（项目规范）
   ↓
3. 使用 Skills（add-api-endpoint）
   ↓
4. 创建 SubAgents 并行处理
   ↓
5. Hooks 自动运行测试
   ↓
6. /review 代码审查
   ↓
7. 完成
```

## 十一、Explore, Plan, Code, Commit工作流

### 11.1 四步流程

**Explore**：读相关文件、图片、URL（明确告知暂不编码）。防止Claude跳到编码，确保充分探索。

**Plan**：用subagents验证细节，用"think"模式创建计划。考虑2-3个方案，分析优劣，推荐一个方案。

**Code**：按计划执行，不偏离。每个步骤可验证，实时更新tasks.md。

**Commit**：更新README/changelog，创建PR。提交前检查代码通过测试、文档已更新、commit message符合规范。

### 11.2 Plan First不可协商

没有规划的后果：收到任务 → 直接编码 → 发现理解错误 → 返工 → 发现架构冲突 → 重构 → 发现边界情况 → 补丁 → 代码质量下降 → 技术债务累积。

有规划的流程：收到任务 → Plan First → 充分理解需求 → 设计解决方案 → 识别风险和依赖 → 用户确认规划 → 编码实施（机械执行）→ 质量有保障。

**数据支撑**：规划时间10-15分钟，返工时间节省2-4小时，代码质量显著提升。

## 十二、生产代码质量

### 12.1 TDD（测试驱动开发）

为什么AI时代更需要TDD：AI生成的代码经常"表面上工作"但包含微妙bug。测试提供唯一可靠的验证机制。

**共识模式**：
1. 实施前写测试
2. 确认测试失败（避免mock实现）
3. 分开提交测试
4. 实施直到测试通过
5. 实施期间不修改测试

### 12.2 代码审查

多层审查流程：
1. Claude自审查：用subagents或新鲜上下文
2. 人工审查：手动验证行为和测试覆盖
3. 多Claude实例：一个写，另一个审查（新上下文 = 更好批判）

**关键洞察**："我相信我对有我名字的PR中的代码负责，不管它是如何生产的"——Chris Dzombak。

## 十三、避坑清单

| 错误 | 后果 | 避免方法 |
|------|------|---------|
| 一次性启用所有组件 | 配置混乱，难以维护 | 从CLAUDE.md开始，逐步扩展 |
| Hooks自动执行危险操作 | 数据丢失风险 | 写操作（git push等）手动确认 |
| 使用不可信的MCP/Plugins | 安全风险 | 优先官方和可信来源 |
| CLAUDE.md过于冗长 | AI忽略关键信息 | 保持简洁，用IMPORTANT标识 |
| 使用/compact | 信息丢失不可控 | 使用Document & Clear |
| 过度使用多Agent | 调试困难 | 简单任务用主Agent |
| Skills不自动激活 | 90%时间被忽略 | 实现UserPromptSubmit Hook |

## 十四、学习路径推荐

```
第1周：CLAUDE.md + Commands
第2周：Hooks + Skills
第3周：SubAgents + MCP
第4周：Plugins + 组合应用
```

**立即可做的4件事**：
1. 创建你的第一个CLAUDE.md（cd your-project → /init）
2. 配置一个简单的Hook（Edit后自动lint --fix）
3. 创建一个简单的Command（.claude/commands/review.md）
4. 安装一个官方Plugin（体验打包好的专业工具）
