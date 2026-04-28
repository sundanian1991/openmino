# Claude Code上下文管理与最佳实践深度解析

> Sources: mino, 2026-04-28
> Raw:../../raw/projects-ai-learning/notes-best-practices-01-context-management.md; ../../raw/projects-ai-learning/notes-best-practices-02-planning-architecture.md; ../../raw/projects-ai-learning/notes-best-practices-03-tools-automation.md; ../../raw/projects-ai-learning/notes-best-practices-04-code-quality.md; ../../raw/projects-ai-learning/notes-best-practices-05-anti-patterns.md; ../../raw/projects-ai-learning/notes-subagent-analysis.md

## 概述

本文档深度整合了Claude Code最佳实践系列的全部核心内容，涵盖Context管理、规划与架构、工具与自动化、代码质量和反模式五大主题。文档基于社区综合分析12篇文章的经验，聚焦于Claude Code使用中最重要的失败模式及其解决方案。核心结论：Context退化是主要失败模式，Plan First不可协商，简单控制循环胜过复杂多Agent系统，TDD在AI时代比传统开发更重要。

## 一、Context管理：最关键的失败模式

### 1.1 退化曲线的本质

LLM的Context Window虽然很大（Claude 3.5 Sonnet是200k tokens），但质量退化远早于达到上限。30% context时，模型开始忽略早期指令；60k tokens时，修复时间超过"Document & Clear"成本。关键发现：不要等到上下文限制，要主动清理。

### 1.2 CLAUDE.md两层架构

| 类型 | 位置 | 大小限制 | 内容 |
|------|------|---------|------|
| 根目录 | /CLAUDE.md | 100-200行 | 通用规则、命令引用 |
| 子目录 | /path/CLAUDE.md | 50-100行 | 项目特定、本地命令 |

**写作原则**：
- 不要嵌入整个文件内容，使用外部文档链接
- 否定式指令必须给出替代方案（"不要X，要做Y"），否则Agent会卡住
- 不要写全面手册，只记录Claude经常犯错的地方

**常见错误**：
- 在CLAUDE.md中写完整文档 → 文件过长，Token浪费
- 使用否定式指令但不给替代 → Agent卡住
- 项目规则写进根目录CLAUDE.md → 其他项目也加载污染
- 不限制行数 → 文件膨胀失控

### 1.3 三种清理模式

**简单重启**：适用Context过长但没有重要中间状态的场景。执行/clear + /catchup，30秒内完成。

**Document & Clear（推荐）**：适用复杂任务有重要中间状态的场景。
```
Step 1: 写进度到.md文件（当前状态、中间结果、下一步、依赖文件）
Step 2: /clear 清理上下文
Step 3: 新会话读取.md文件
Step 4: 继续工作
```

**分阶段重启**：适用超大型任务（10+步骤）、多人协作、长期项目。按阶段划分，每个阶段完成后Document & Clear。

### 1.4 避免使用/compact

自动压缩是不透明、容易出错、未优化的。你不知道什么被保留了、什么被丢弃了，压缩后的内容可能不准确。替代方案是使用Document & Clear，手动总结关键信息。

### 1.5 三文件模式（Dev Docs）

```
~/dev/active/[task-name]/
├── [task-name]-plan.md      # 被接受的计划
├── [task-name]-context.md   # 关键文件、决策
└── [task-name]-tasks.md     # 工作检查清单
```

**文件职责**：
- plan.md：需求、方案、风险评估。创建时和重大变更时更新。
- context.md：相关文件、技术决策、依赖。发现新信息时更新。
- tasks.md：可验证的检查清单。每步完成时更新。

**核心价值**：文档即状态、变更可追踪、质量可验证。

## 二、规划与架构：Plan First不可协商

### 2.1 没有规划的后果链

```
收到任务 → 直接编码
    ↓
发现理解错误 → 返工
    ↓
发现架构冲突 → 重构
    ↓
发现边界情况 → 补丁
    ↓
代码质量下降 → 技术债务累积
```

**数据支撑**：规划时间10-15分钟，返工时间节省2-4小时，代码质量显著提升。

### 2.2 完整的Planning Mode工作流

**Step 1：初始规划**
- 进入Planning Mode（或使用/plan命令）
- 提供高层描述 + 现有代码指针
- 让Claude研究并提出方案
- 彻底审查（早期发现误解）

**好的输入示例**：包含当前状态、已有资源、具体需求。
**不好的输入示例**：只说"添加用户设置页面"，没有上下文。

**Step 2：计划验证**
- 问澄清问题，消除歧义
- 挑战假设，发现隐性风险
- 请求2-3个替代方案（优劣对比）
- 使用"think"、"think hard"、"ultrathink"深度分析

**Step 3：文档化**
- 退出plan mode并创建dev docs
- 存储在版本控制位置
- 使用三文件模式

**Step 4：分阶段实施**
- 用计划启动新上下文
- 分阶段实施（每次1-2部分）
- 阶段之间审查
- 边做边更新计划

### 2.3 Explore, Plan, Code, Commit四步流程

**Explore**：读相关文件、图片、URL（明确告知暂不编码）。为什么"暂不编码"很重要？防止Claude跳到编码，确保充分探索，避免基于不完整信息的决策。

**Plan**：用subagents验证细节，用"think"模式创建计划。考虑2-3个方案，分析优劣。

**Code**：按计划执行，不偏离。每个步骤可验证。

**Commit**：更新README/changelog，创建PR。提交前检查代码通过测试、文档已更新。

### 2.4 简单控制循环原则

**核心洞察**：Debuggability远胜于复杂的手调多Agent系统。

Claude Code架构：一个主线程（扁平消息列表）、最多一个分支（subagent结果加入主历史）、无复杂多Agent系统。

**引用**："尽管多Agent系统很流行，Claude Code只有一个主线程……我高度怀疑你的应用需要多Agent系统。"

**简单胜过复杂的原因**：
- 每个抽象层让调试指数级变难
- 偏离通用模型改进轨迹
- LLM是脆弱的；增加复杂性会不可预测地破坏

### 2.5 LLM Search优于RAG

RAG引入隐藏失败模式：相似度函数选择不稳定、重排器可能错过关键信息、Chunk代码导致上下文断裂、处理大JSON/logs格式依赖严重。

LLM Search方法：看10行理解结构，需要再看10行（就像人类），模型做重活（更少移动部分）。这被称为"LLM时代的Camera vs Lidar"。

| 维度 | RAG | LLM Search |
|------|-----|------------|
| 复杂度 | 高（多组件） | 低（直接调用） |
| 可调试性 | 难（黑盒组件） | 易（命令可见） |
| 准确性 | 依赖调参 | 模型能力 |
| 维护成本 | 高 | 低 |
| 随模型进化 | 需重新调参 | 自动提升 |

## 三、工具与自动化：Skills需要自动激活

### 3.1 手动Skills约90%时间被忽略

**原因分析**：用户请求 → Claude理解意图 → 选择工具。如果技能是"手动调用"（需要用户明确说），Claude优先选择原生工具，Skills被忽略。

**解决方案**：基于Hook的自动激活。

### 3.2 UserPromptSubmit Hook自动激活

工作流程：用户输入消息 → Hook触发 → 分析关键词/意图 → 检查相关skills → 注入"SKILL ACTIVATION CHECK"提醒 → Claude处理消息。

### 3.3 skill-rules.json模式

通过JSON配置定义技能的触发条件，包括：
- **type**：domain、quality、workflow
- **enforcement**：suggest（建议）、require（强制）
- **priority**：low、medium、high、critical
- **promptTriggers**：keywords、intentPatterns
- **fileTriggers**：pathPatterns、contentPatterns

### 3.4 Skill结构最佳实践

**重构前**：1500+行单文件，每次加载全部内容。

**重构后**：300-400行主文件 + 10-11个资源文件，Token效率提升40-60%。

主文件包含核心概念和快速参考，详细说明放在资源文件中按需加载。

### 3.5 Hooks质量控制

**Block-at-Submit Hooks**（主要策略）：
- PreToolUse hook包装Bash(git commit)
- 检查验证文件，文件缺失则阻止提交
- 强制"test-and-fix"循环直到通过

**Hint Hooks**（非阻塞反馈）：
- 检测到次优模式时提供即抛即用指导
- 不阻止操作，只是提醒

**关键设计原则**：不要在写入时阻塞——让agent完成计划，然后检查最终结果。

### 3.6 常见Hooks

- **Build Checker**：TypeScript编译错误、ESLint警告
- **Test Runner**：测试是否通过、覆盖率是否达标
- **Error Handling Reminder**：检测缺少错误处理的异步操作
- **Skills Auto-Activation**：分析用户意图，匹配相关skills

## 四、生产代码质量

### 4.1 TDD在AI时代更重要

为什么AI时代更需要TDD：AI生成的代码经常"表面上工作"但包含微妙bug。测试提供唯一可靠的验证机制。

**共识模式**：
1. 实施前写测试
2. 确认测试失败（避免mock实现）
3. 分开提交测试
4. 实施直到测试通过
5. 实施期间不修改测试

### 4.2 代码审查的多层体系

1. Claude自审查：用subagents或新鲜上下文
2. 人工审查：手动验证行为和测试覆盖
3. 多Claude实例：一个写，另一个审查（新上下文 = 更好批判）

**关键洞察**："我相信我对有我名字的PR中的代码负责，不管它是如何生产的"。

**检查什么**：
- 意大利面代码（难以跟随的逻辑）
- 重大API/后端变更
- 不必要的imports、functions、comments
- 缺少错误处理
- 安全漏洞

### 4.3 Specs Are the New Source Code

**核心论点**：在AI时代，写规范比写代码更重要。

**时代转变**：
- 传统：代码 → 文档
- AI时代：Spec → AI生成代码

**新工作流**：模糊想法 → 快速原型 → 客户反馈 → 清晰的spec → AI辅助实施

**成功条件**：
1. 具体：模糊spec导致混乱代码库
2. 选择性：复杂任务需要知道的人在参与
3. 守门：实际工程师审查变更

**关键认知**：稀缺技能转移——编码 → 沟通。"在不久的将来，最有效沟通的程序员是最有价值的。"

## 五、反模式与避坑指南

### 5.1 六大常见反模式

| 反模式 | 后果 | 修正 |
|--------|------|------|
| 一次性启用所有组件 | 配置混乱，难以维护 | 从CLAUDE.md开始，逐步扩展 |
| Hooks自动执行危险操作 | 数据丢失风险 | 写操作手动确认 |
| 使用不可信的MCP/Plugins | 安全风险 | 优先官方和可信来源 |
| CLAUDE.md过于冗长 | AI忽略关键信息 | 保持简洁，用IMPORTANT标识 |
| 使用/compact | 信息丢失不可控 | 使用Document & Clear |
| 过度使用多Agent | 调试困难 | 简单任务用主Agent |

### 5.2 Context管理反模式

- 在CLAUDE.md中写完整文档 → 摘要 + 外部文档链接
- 使用否定式指令但不给替代 → "不要X，要做Y"
- 项目规则写进根目录CLAUDE.md → 写到子目录CLAUDE.md
- 不限制行数 → 定期审查，100-200行上限

### 5.3 规划反模式

- 不进入Planning Mode直接编码 → 强制Plan First
- 输入缺乏上下文 → 提供当前状态、已有资源、具体需求
- 不挑战假设 → 主动问澄清问题、请求替代方案
- 一次性实施所有步骤 → 分阶段实施，每阶段后审查

### 5.4 Skills反模式

- 手动调用Skills → 实现自动激活Hook
- 单文件超过500行 → 拆分为主文件 + 资源文件
- 不定义触发条件 → 使用skill-rules.json配置

## 六、与我们实践的对比分析

### 6.1 符合最佳实践的方面

| 实践 | 社区建议 | 我们做法 |
|------|---------|---------|
| CLAUDE.md存在 | 必须 | 完善的多层CLAUDE.md |
| Plan First机制 | 强制 | 已有Plan First机制 |
| 子代理策略 | 避免过度 | 限制同一批 ≤5个 |
| 使用Grep/Glob搜索 | 优先于RAG | 使用原生搜索工具 |
| pre-commit hook | 质量Gate | 已有pre-commit hook |

### 6.2 需要改进的方面

| 实践 | 社区建议 | 我们做法 | 改进行动 |
|------|---------|---------|---------|
| CLAUDE.md大小 | 根目录100-200行 | 可能偏长 | 审查并精简 |
| Context清理 | 60k/30%主动清理 | 会话重启时 | 建立主动清理意识 |
| Skills自动激活 | 基于Hook | 无自动激活 | 实现UserPromptSubmit Hook |
| TDD实践 | 测试优先 | 部分遵循 | 强化测试先行 |
| Dev Docs三文件 | 标准化 | 部分遵循 | 完善三文件模式 |

### 6.3 核心差距

最大的差距在于Context管理的主动性。我们已经有很好的CLAUDE.md和Plan First机制，但在Context主动清理、Skills自动激活方面还需要加强。

## 七、行动建议

### 7.1 立即可做（本周）

1. **审查CLAUDE.md大小**：检查根目录CLAUDE.md行数，如果超过200行考虑拆分或精简
2. **建立清理阈值意识**：每次会话开始时检查Context使用率，达到60k tokens时主动清理
3. **标准化三文件模式**：复杂任务必须创建plan/context/tasks，每步完成更新tasks.md

### 7.2 中期优化（本月）

4. **添加Skills自动激活**：实现UserPromptSubmit Hook，定义关键词和意图模式
5. **优化Skill结构**：检查现有Skills文件大小，拆分为主文件 + 资源文件
6. **强化TDD实践**：测试先行，分开提交测试代码，不在实施中修改测试

### 7.3 长期建设

7. **建立清理习惯**：每天会话结束评估是否需要清理，跨天任务使用Document & Clear
8. **优化CLAUDE.md结构**：根目录保持在200行以内，项目特定规则放到子目录
9. **完善Dev Docs系统**：标准化三文件模式，更新计划时同步文档
