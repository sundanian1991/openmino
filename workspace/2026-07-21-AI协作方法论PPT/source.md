# AI长周期任务协作方法论：从实验验证到实操框架

当 AI 能连续运行 25 小时，真正的问题不是"它能跑多久"，而是"怎么让它不跑偏"。两篇 OpenAI 内部实践，合成一套完整的方法论。

## 核心命题

当 AI 能连续运行 25 小时，真正的问题不是"它能跑多久"，而是"怎么让它不跑偏"。两篇 OpenAI 内部实践，合成一套完整的方法论。

来源：
- Derrick Choi · Codex 产品经理（原文：https://developers.openai.com/blog/run-long-horizon-tasks-with-codex）
- Gabriel Chua · Codex DX 工程师（原文：https://x.com/gabrielchua/status/2074505300766568563）

## 第一章：实验验证 — 25 小时构建设计工具

Derrick Choi 给了 GPT-5.3-Codex 一个空仓库、完全权限、一个任务：从零构建一个设计工具。然后让它以"Extra High"推理级别运行。

核心数据：
- 25h 连续运行时间
- 13M 消耗 tokens
- 30k 生成代码行数
- 10 核心功能模块

核心发现：这不是"模型变聪明了"的简单升级。真正的变化是：Agent 能保持更长时间的连贯性，端到端完成更大的工作块，并且在出错时能恢复而不丢失主线。

结果不是完美的，但是真实可测试的。10 个核心功能：
- 画布编辑：框架、分组、形状、文本、图片/图标、按钮、图表
- 实时协作：在线状态、光标、选择、跨标签同步编辑
- 检查器控件：几何、样式、文本
- 图层管理：搜索、重命名、锁定/隐藏、排序
- 辅助线/对齐/吸附
- 历史快照+恢复
- 回放时间线+从任意点分支
- 原型模式：热点+流程导航
- 评论：固定线程，可解决/重新打开
- 导出：保存/导入/导出 + CLI 导出为 JSON 和 React+Tailwind

## 第二章：Agent Loop — 为什么能保持连贯

长时间运行的关键不是一个巨大的 prompt，而是 Agent 运行的循环结构。

六步循环：
1. Plan（规划）
2. Edit（编辑代码）
3. Run Tools（运行测试/构建）
4. Observe（观察结果）
5. Repair（修复失败）
6. Update（更新文档）

这个循环之所以重要，是因为它给 Agent 提供了：
- 真实反馈：错误、diff、日志——不是猜测，是实际结果
- 外部化状态：repo、文件、文档、worktrees、输出——不依赖 context window
- 可转向性：基于结果调整方向，中途修正不会丢失进度

这也是为什么 Codex 模型在 Codex 表面上比通用聊天窗口表现更好：harness 提供了结构化上下文（repo 元数据、文件树、diffs、命令输出），并强制执行严格的"完成条件"流程。

## 第三章：5 个协作习惯

Gabriel Chua 在数周实践中总结的五个习惯，构成完整的长周期任务协作框架。

### 习惯 1：让 Codex 自主规划并维护路线图

核心逻辑：跳过 /plan 模式，先对话。描述想法、约束，让 Codex 提问补全上下文，生成初版计划。

- 保持灵活性：早期不需要把半成型的想法写成正式规格文档
- 让它采访你：Codex 可以反思理解、识别缺口、逐步转化为可执行计划
- 设置 Goal：让 Codex 综合对话上下文设定持久目标，自动定义"完成所需的验证证据"
- GOALS.md：大项目写入这个文件，按里程碑结构化记录：产出、工作范围、重要决策、已知阻塞、下一步所需证据
- 持续迭代：Codex 随项目推进更新这个文件，新发现可能改变里程碑范围或完成标准

关键：只有一个 Goal-mode 目标同时激活。里程碑完成后，Codex 更新 GOALS.md，激活下一个目标，继续工作。

### 习惯 2：主线程只做全局协调

核心逻辑：主线程决定下一步做什么、委派任务、评估结果。不需要承载所有实现细节。

- Worker 可能花一小时读不熟悉的代码、尝试多种方法、追踪失败的测试
- 协调者只需要：worker 学到了什么、什么变了、支持证据是什么、下一步该做什么
- 委派方式：可以用 subagent 或独立 thread。独立 thread 的好处是有完整历史，后续可回溯
- 并行推进：多个工作并行时，主线程继续协调，每个调查/实现/审查都保持可检查

### 习惯 3：里程碑后先审计路线图，再 review 代码

核心逻辑：每个里程碑结束后，用独立线程做两件事：审计路线图 + 审查代码。

路线图审计 5 问：
1. 里程碑真的完成了吗？
2. 下一个目标还是对的吗？
3. 有遗漏的里程碑吗？
4. 新证据是否调整了工作顺序？
5. "完成定义"还成立吗？

同步运行 /review：假设登录流程的实现和远程测试都完成了。路线图审计可能发现：没人用真实登录浏览器测试过。同时 /review 可能发现：新路径存储 token 的方式不对，即使远程测试通过了。

协调者更新 GOALS.md，委派 token 修复，添加缺失的浏览器验证，然后才激活下一个里程碑。

### 习惯 4：本机测试交给"本地线程"

核心逻辑：大部分 Codex session 跑在远程实例上，笔记本关了也能继续。但有些检查依赖本机环境。

需要本机的场景：
- 登录态浏览器
- 本地凭据
- Xcode
- macOS 权限
- iOS 模拟器

典型闭环流程：远程 Worker 实现功能 → 远程测试通过 → 本地线程环境校验 → 发现 Bug 回传远程 → 远程修复

项目保持远程优先。你的电脑只在需要时加入。远程线程还可以在你打开笔记本后，继续检查本地线程是否可用。

### 习惯 5：用简报和仪表盘同步全局进度

核心逻辑：Worker thread 通常只报告一个任务。当你回到项目时，需要一个全局视图。

三段式汇报（每次状态变化时输出）：
- What's done：已完成什么
- What's next：下一步是什么
- Any blockers：有无阻塞

就像和 Codex 做每日站会，只不过是每小时一次。

可视化仪表盘：对于跨多个里程碑或并行工作流的项目，维护一个 progress-dashboard.html：
- 当前活跃目标
- 已完成里程碑
- 证据状态
- 阻塞项
- 决策记录
- 最近更新

Codex 可以将仪表盘部署为 Site，保持远程可访问。几小时后回来，无需读取每个 worker thread 就能理解项目状态。

## 第四章：对比分析 — 两篇文章的互补

| 维度 | Derrick Choi（产品经理）| Gabriel Chua（DX 工程师）|
|---|---|---|
| 核心问题 | 模型能跑多久？边界在哪？| 怎么让它不跑偏？|
| 回答方式 | 压力测试实验（25 小时）| 数周实践总结（5 个习惯）|
| 侧重 | 模型能力验证 | 人机协作流程 |
| 核心贡献 | 四文件架构（Prompt/Plan/Implement/Documentation.md）| 五习惯框架 + GOALS.md + 仪表盘 |
| 验证方式 | 代码质量（tests/lint/typecheck）| 路线图审计 + /review 双重验证 |
| 环境 | 单机运行 | 远程+本地线程分工 |
| 角色定位 | 实验设计者 | 技术负责人（带领 AI 团队）|

合在一起才是完整方法论：Derrick 证明了"能跑 25 小时"（能力边界），Gabriel 解决了"怎么跑 25 小时不翻车"（协作流程）。前者是地基，后者是建筑。

核心共识：
- 持久 Goal 为 AI 提供不会漂移的锚点
- 里程碑审计为项目设置多层验收关卡
- 状态外置（文件/仪表盘）避免信息仅存在于线程上下文
- 持续验证（tests/review）不是最后才检查，而是每个里程碑都检查

## 第五章：可迁移框架 — 跨工具适用

这套方法的核心不是特定工具的使用技巧，而是 AI 时代的新型项目管理模式。核心骨架完全通用。

核心骨架（不依赖特定工具）：
- 路线图锚定：用结构化文件（GOALS.md）记录里程碑、范围、决策、证据。不依赖 /codex 的 /goal 指令。
- 里程碑验收：每个里程碑完成后审计+review。不依赖 /review 指令，可以用独立对话或 subagent。
- 远程本地分工：远程跑大部分，本机只做环境依赖的校验。任何支持多 session 的工具都适用。
- 状态外置：进度汇报+仪表盘。不依赖 /side 指令，可以用 markdown 文件或简单 HTML。

工具对应关系：
| Codex 能力 | Claude Code 对应 | Cursor 对应 |
|---|---|---|
| /goal（持久目标）| CLAUDE.md + memory 文件 | .cursorrules + 项目上下文 |
| GOALS.md（路线图）| 任何 markdown 文件 | 任何 markdown 文件 |
| Subagent（委派）| Agent tool（/agent）| 多文件编辑 + terminal |
| 独立 Thread（可回溯）| 新对话窗口 | 新对话窗口 |
| /review（代码审查）| 独立对话 + review 指令 | 独立对话 + 代码审查 |
| /side（不打断主线程）| 并行对话窗口 | 并行对话窗口 |
| Computer Use（本机测试）| 本地 terminal 执行 | 本地 terminal 执行 |

## 第六章：实操工具箱

### 可复制的启动 Prompt

```
Coordinate this as a long-running project.

Begin by interviewing me about what I am trying to build.
Let me describe rough ideas and constraints conversationally,
then turn that discussion into an initial plan.

Create GOALS.md as the shared roadmap. Organize it around
milestones, with the intended outcome, scope, decisions,
blockers, and evidence required for each one.

Set and maintain one objective at a time. The active objective
should correspond to the current milestone.

Keep this thread focused on the objective, constraints,
decisions, and project state. Delegate implementation to
subagents or new threads.

Require workers to return conclusions, changes, and evidence
rather than full transcripts.

After each milestone, audit GOALS.md against the current state
and review the implementation. Update the roadmap before
activating the next objective.

When the project state changes, report only:
- What's done
- What's next
- Any blockers

Do not declare completion until the agreed evidence exists.
```

### GOALS.md 模板

```markdown
# 项目路线图

## 项目目标
[一句话描述最终要交付什么]

## 当前状态
- 活跃里程碑：M1
- 完成度：15%
- 最后更新：2026-07-21

## M1：[里程碑名称]
状态：进行中
目标产出：[具体交付物]
工作范围：
- [ ] 任务1
- [ ] 任务2

重要决策：
- 决策1：[描述] — 原因：[为什么]

已知阻塞：
- [阻塞描述]

完成证据：
- [ ] 测试通过
- [ ] 代码审查通过
- [ ] 功能演示

## 决策日志
| 日期 | 决策 | 原因 | 影响 |
|------|------|------|------|
| 07-21 | 选择方案A | 性能更好 | M1范围扩大 |
```

### 进度汇报模板

```markdown
## 进度更新 — [日期 时间]

### What's done
- [完成项1]

### What's next
- [下一步1]

### Any blockers
- [阻塞项，或"无"]

### 证据
- [测试结果/审查结论/演示截图]
```

## 第七章：范式升级 — 开发者角色转变

这套方法的本质不是工具使用技巧，而是 AI 时代的新型项目管理模式。

角色转变：
| 过去 | 现在 |
|---|---|
| 亲自写代码的执行者 | 带领 AI 团队的技术负责人 |
| 关注实现细节 | 关注目标、里程碑、验收标准 |
| 手动测试验证 | 设计验证流程让 AI 自动执行 |
| 单线程工作 | 多 worker 并行协调 |

底层三要素：
1. 持久锚点：Goal + GOALS.md，为 AI 提供不会漂移的目标
2. 验收关卡：里程碑审计 + review，多层验证防止偏差累积
3. 状态外置：简报 + 仪表盘，项目状态不依赖线程上下文

核心逻辑：模型负责发挥智能能力，而开发者的核心作用是引导这份智能始终锚定同一目标，沿着验证证据的路径稳步推进。

适用边界：这套架构不是适用于所有小任务。仅当项目满足以下特征时投入产出比最高：
- 项目推进过程中会持续涌现新信息
- 涉及多块独立并行工作
- 需要多个不同环境的验证证据
