# 子代理类型与架构模式标准定义参考文档

> **用途**：供团队培训、管理汇报、向数据组/供应商提需求时引用的权威溯源依据。
> **版本**：v1.0 | **日期**：2026-06-27
> **覆盖范围**：9 类核心子代理、6 种骨架设计模式（Anthropic 分类）、4 种多 Agent 协作架构。

---

## 一、子代理类型标准定义

| 子代理类型 | 标准定义 | 权威来源 | 典型输入 | 典型输出 | 常见组合模式 |
|-----------|---------|---------|---------|---------|-------------|
| **Researcher** | 通过工具调用（搜索、数据库查询、文档读取）搜集信息并进行事实核查的 Specialist Agent。在 OpenAI 的实践中被定义为「执行信息检索的专项 Agent」，通过 `function_tool` 封装为可调用工具。 | OpenAI *A practical guide to building agents* (2025)[^2]；Anthropic *Building Effective AI Agents* — Tool Use Pattern[^1] | 研究问题、关键词、数据源范围 | 结构化研究结果、引用来源列表、事实核查结论 | ReAct + Tool Use → Writer；Router 分发至 Researcher |
| **Writer** | 负责内容生成与文案撰写的 Agent，接收上游输入（研究结论、数据洞察）并产出结构化文本。Anthropic 将其归类为 Sequential Workflow 中的内容生产节点。 | OpenAI Agents SDK — Content Generation Agent[^3]；Anthropic *Building Effective AI Agents* — Sequential Workflow[^1] | 研究结论、大纲、风格要求 | 初稿文本、分章节内容、多版本文案 | Self-Refine（Writer + Critic 迭代）；Supervisor 统筹 |
| **Coder** | 负责代码生成、脚本编写与调试的 Agent，通过 ReAct 循环结合代码执行工具（如代码解释器）验证输出正确性。 | Anthropic *Building Effective AI Agents* — 代码生成与自动化案例[^1]；OpenAI *A practical guide* — Action Tools[^2] | 功能需求、接口规范、输入数据 | 可执行代码、测试用例、调试报告 | ReAct + Tool Use（代码解释器）；Critic 代码审查 |
| **Analyst** | 对数据进行统计分析与洞察提取的 Specialist Agent。在 OpenAI Portfolio Manager 示例中，对应 Quant / Fundamental 等量化/基本面分析 Agent。 | OpenAI Agents SDK — Specialist Agent（Quant / Fundamental / Macro）[^3]；Anthropic — Tool Use[^1] | 原始数据集、分析目标、维度要求 | 分析结论、可视化建议、异常标记 | ReAct + Tool Use → Writer（报告）；Router 按分析类型分发 |
| **Critic** | 对上游 Agent 输出进行质量审查、逻辑检查与评估的 Evaluator 角色。Shinn et al. 在 Reflexion 中将其定义为对 Actor 输出进行评分的独立组件；Madaan et al. 在 Self-Refine 中将其称为 Feedback Agent。 | Shinn et al. (2023) *Reflexion*[^4]；Madaan et al. (2024) *Self-Refine*[^5] | 待审查的文本/代码/方案、评估标准 | 审查意见、修改建议、质量评分 | Reflection（Actor + Critic 循环）；Self-Refine（Generator + Critic 迭代） |
| **Planner** | 将复杂任务分解为可执行子任务并制定执行计划的 Agent。Wang et al. 在 Plan-and-Solve 中提出「先计划再执行」的两阶段范式；LangGraph 将其作为核心节点类型。 | Wang et al. *Plan-and-Solve Prompting*[^6]；LangGraph — Plan-and-Execute Pattern[^7] | 用户目标、约束条件、可用工具列表 | 任务分解树、执行步骤序列、依赖关系图 | Plan-and-Execute（Planner + Executor）；Hierarchical Supervisor |
| **Supervisor** | 协调多个 Specialist Agent 的中央调度者，控制通信流并做出任务分配决策。LangGraph Supervisor 库明确将其定义为「控制所有通信流和任务委托决策」的层级协调节点。 | LangGraph Supervisor library (2025)[^7]；OpenAI Agents SDK — Portfolio Manager 统领 Specialist Agents[^3] | 高层目标、各 Agent 能力描述 | 任务分配指令、中间结果合并、最终综合输出 | Supervisor Pattern（星型拓扑）；Hierarchical（多层嵌套） |
| **Router** | 识别用户意图并将请求分发给最合适的 Specialist Agent 的入口节点。Anthropic 称其为 Routing Workflow 的核心；OpenAI 在 Agents SDK 中实现了 Triage Agent 和 Handoff 机制。 | Anthropic *Building Effective AI Agents* — Routing Workflow[^1]；OpenAI Agents SDK — Handoff / Triage Agent[^2][^3] | 用户原始请求、Agent 能力矩阵 | 路由决策（目标 Agent ID）、意图分类标签 | Router Pattern → Multi-Agent；Router + Supervisor 双层分发 |
| **Memory Keeper** | 管理短期会话记忆与长期持久记忆的 Agent，负责上下文构建与历史信息检索。Google ADK 将其作为一级概念，通过 `PreloadMemoryTool` 在交互开始时主动注入历史上下文。 | Google ADK (2025) — Session Memory + Long-term Memory 分离机制[^8]；Anthropic — Memory Pattern[^1] | 当前对话上下文、用户 ID、记忆检索查询 | 增强上下文（含历史摘要）、记忆更新后的存储状态 | Memory Pattern + ReAct；Supervisor 架构中的记忆服务层 |

---

## 二、Agent 设计模式标准定义（Anthropic 6 骨架 + 红线）

> **为什么只列 6 种**：行业流传的"9/13/21 种"多为营销数字，把 Anthropic 的 6 个骨架与 ToT/GoT 等学术模式揉成一锅，易诱导"模式堆砌"。骨架只记这 6 个 + 1 条红线即可；其余高级模式见附录。

| 模式名称 | 标准定义 | 权威来源 | 适用条件 | 复杂度 |
|---------|---------|---------|---------|--------|
| **Single Agent** | 无子代理拆分，单 LLM 直接完成任务。Anthropic 建议「从最简单的方式开始，按需增加复杂度」。 | Anthropic *Building Effective AI Agents* — 最小够用原则[^1] | 1-3 步、单领域、确定性高的简单任务 | ★☆☆ |
| **ReAct（Tool Use）** | 推理（Reasoning）与行动（Acting）交替进行的单 Agent 框架：先思考（Thought），再选工具行动（Action），观察结果（Observation），循环直到完成。Anthropic 将工具分为 Data / Action / Orchestration 三类。 | Yao et al. (2022) *ReAct*[^9]；Anthropic — Tool Use[^1]；OpenAI *A practical guide* — 三类工具定义[^2] | 需要工具调用 + 有中间状态观察的任务 | ★★☆ |
| **Plan-and-Execute** | 两阶段范式：Planner 先制定完整执行计划，Executor 按步骤执行。与 ReAct 的「走一步看一步」不同，此模式在执行前已有全局规划。 | Wang et al. *Plan-and-Solve Prompting*[^6]；LangGraph 官方实现[^7] | 3-8 步、有明确阶段依赖的任务 | ★★★ |
| **Reflection / Reflexion** | Actor 执行后，Evaluator 对结果进行评分/批判，将反馈以自然语言形式写入 Episodic Memory，指导下一轮尝试。核心贡献：从失败中学习。 | Shinn et al. (2023) *Reflexion*[^4] | 可验证输出、需从错误中迭代改进的任务 | ★★★ |
| **Parallelization** | 切片（Sectioning，拆成并行子任务）或投票（Voting，多路生成取优）。子任务**预先定义**，路径固定。 | Anthropic *Building Effective AI Agents* — Parallelization Workflow[^1] | 子任务可独立完成、彼此无依赖 | ★★☆ |
| **Orchestrator-Workers** | 中央 LLM **动态**拆解任务 → 派 worker → 合成结果。与 Parallelization 的关键区别：**子任务由主 LLM 按输入现拆**，非预定义。Claude Code 的 `Agent` 工具即此模式。 | Anthropic *Building Effective AI Agents* — Orchestrator-Workers Workflow[^1] | 子任务可独立跑完、价值值得付 ~15× token | ★★★ |

### 红线：多代理不适用场景（Anthropic 明确划界）

以下 4 类任务**今天不适用多代理**，应单代理直做：

1. **所有 agent 必须共享同一份上下文**（信息耦合高）
2. **agent 之间依赖太多**（需实时互相协调）
3. **编码任务**（"大多数编码任务的真正可并行点比研究少"）
4. **需要实时委派协调**（"LLM 目前还不擅长实时协调和委派其他 agent"）

> 一句话记：**多代理是给"广度优先、上下文能切开、价值够高"的任务准备的。深度耦合、强依赖、单一改动的任务，单代理更稳。**
> 数据支撑：Anthropic 多代理研究系统比单代理高出 90.2%，但 token 用量约为普通对话的 15×；token 解释了 80% 的性能方差。

---

## 三、多 Agent 协作架构标准定义

| 架构名称 | 结构描述 | 通信拓扑 | 权威来源 | 适用 Agent 规模 | 典型延迟 |
|---------|---------|---------|---------|----------------|---------|
| **Network（网络）** | Agent 间直接点对点通信，无中央协调节点。每个 Agent 可自主决定向谁发送信息。 | 全连接或有限连接图 | LangGraph — Multi-Agent Concepts[^7] | 2-3 个 Agent | 低 |
| **Supervisor（主管）** | 中央 Supervisor Agent 控制所有通信流和任务委托， Specialist Agent 不直接通信，全部通过 Supervisor 中转。 | 星型拓扑 | LangGraph Supervisor library (2025)[^7]；OpenAI Portfolio Manager[^3] | 4-8 个 Agent | 中 |
| **Hierarchical（层级）** | 多层 Supervisor 嵌套：顶层 Supervisor 向中层 Supervisor 分派任务，中层再管理各自的 Specialist Agent 组。 | 树型拓扑 | LangGraph — Hierarchical Multi-Agent Systems[^7] | 8+ 个 Agent | 中高 |
| **Team-of-Teams（团队之团队）** | 联邦制结构：多个 Supervisor 各自独立管理团队，顶层设协调者（Coordinator）负责跨团队资源分配与结果整合。OpenAI Portfolio Collaboration 中 Portfolio Manager 统领独立 Specialist 团队即为此模式。 | 联邦/两层星型 | OpenAI Agents SDK — Multi-Agent Portfolio Collaboration[^3] | 超大规模、跨部门 | 高 |

**架构选择决策树**：

```
Agent 数量?
├── 2-3 个 → Network 或 Supervisor
├── 4-8 个 → Supervisor（避免全连接通信爆炸）
├── 8+ 个  → Hierarchical 或 Team-of-Teams
└── 开放式讨论/头脑风暴 → 见附录 Group Chat (AutoGen 风格)
```

---

## 四、关键概念对照表（同一概念的不同命名）

| 本文档命名 | Anthropic | OpenAI | LangGraph | Microsoft AutoGen | 学术文献 |
|------------|-----------|--------|-----------|-------------------|---------| 
| Researcher | — | Specialist Agent (信息检索) | Agent Node (Tool Use) | Assistant Agent | ReAct Agent |
| Critic | — | Evaluator | — | Critic Agent | Reflexion Evaluator / Self-Refine Feedback |
| Supervisor | Orchestrator | Portfolio Manager | Supervisor Node | GroupChatManager | — |
| Router | Routing Workflow | Triage Agent / Handoff | Conditional Edge | — | — |
| Planner | — | — | Plan Node | Planner Agent | Plan-and-Solve |
| Writer | Sequential Workflow | Content Agent | Agent Node | — | Generator (Self-Refine) |
| Executor | — | — | Tool Node | UserProxy Agent | Actor (ReAct/Reflexion) |
| Memory Keeper | Memory Pattern | — | Checkpointer / Store | — | Episodic Memory (Reflexion) |

---

## 五、附录：高级选项（学术/特定框架模式）

> 以下模式在工具调用环境（如 Claude Code、MCP）中**基本用不上**，仅在对标学术研究、特殊推理任务或特定框架时参考。

| 模式 | 定义 | 适用边界 |
|------|------|---------|
| **Self-Refine** | Generator 产出 → Feedback Agent 批评 → 自我修正迭代。与 Reflexion 区别：不依赖外部记忆，仅基于当前会话上下文迭代。 | Madaan et al. (2024)[^5]；写作/代码/设计类需持续打磨的质量敏感任务 |
| **Tree of Thoughts (ToT)** | 让 LLM 同时探索多条推理路径（思维树），在每个节点评估（投票/打分），选最优分支继续，支持回溯。 | Yao et al. (2023)[^10]；数学推理、规划、需探索多种方案的任务 |
| **Graph of Thoughts (GoT)** | 思维以图结构组织，节点可聚合、精炼、生成，支持跨分支信息交叉。ToT 的图结构扩展。 | Besta et al. (2023)[^11]；复杂决策、知识图谱推理、多源信息综合 |
| **Loop Engineering** | Agent 在 ReAct 基础上增加循环终止条件判断，持续执行直到达成预设目标或触发退出条件。 | LangGraph — 循环节点与条件边[^7]；自动化监控、定期任务、目标驱动持续执行 |
| **Group Chat** | 参与者轮流发言，由 GroupChatManager 维护发言顺序并选择下一个发言 Agent。支持人工介入。 | Microsoft AutoGen — Group Chat Pattern[^12]；2-7 个 Agent 的开放式讨论/头脑风暴 |

---

## 六、参考文档完整列表

### 官方企业白皮书 / 指南

[^1]: [Anthropic — Building Effective AI Agents: Architecture Patterns and Implementation Frameworks (PDF)](https://resources.anthropic.com/hubfs/Building%20Effective%20AI%20Agents-%20Architecture%20Patterns%20and%20Implementation%20Frameworks.pdf)
> Anthropic 官方企业级 Agent 构建指南，涵盖 Workflow vs Agent 区分、Sequential / Routing / Parallel / Orchestrator 四大模式、Coinbase/Tines/Gradient Labs 生产案例。

[^2]: [OpenAI — A practical guide to building agents (PDF)](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
> OpenAI 官方实践指南，提出 Data / Action / Orchestration 三类工具框架，以及「从简单开始、按需增加复杂度」的核心原则。

[^3]: [OpenAI Developers — Multi-Agent Portfolio Collaboration with OpenAI Agents SDK](https://developers.openai.com/cookbook/examples/agents_sdk/multi-agent-portfolio-collaboration/multi_agent_portfolio_collaboration)
> OpenAI Agents SDK 多 Agent 协作的官方 Cookbook 示例，定义了 Handoff vs Agent-as-Tool 两种协作模式，以及 Portfolio Manager + Specialist (Macro/Quant/Fundamental) 的联邦架构。

### 学术论文

[^4]: [Shinn et al. (2023) — Reflexion: Self-Reflective Agents](https://arxiv.org/abs/2303.11366)
> 提出 Reflexion 框架：Actor + Evaluator + Self-Reflection + Episodic Memory 四组件循环，使 Agent 能从失败中学习。NeurIPS 2023 接收。

[^5]: [Madaan et al. (2024) — Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
> 提出 Self-Refine 框架：Generator 产出 → Feedback Agent 批评 → Generator 自我修正的迭代循环，无需额外训练数据。ICML 2024 接收。

[^6]: [Wang et al. — Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models](https://arxiv.org/abs/2305.04091)
> 提出 Plan-and-Solve 提示范式：将复杂推理任务分解为「制定计划 → 执行计划」两阶段，显著提升零样本 CoT 效果。

[^9]: [Yao et al. (2022) — ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
> ReAct 框架原创论文：将推理（Reasoning）与行动（Acting）交织，在知识密集型推理和决策任务上显著优于单独使用 CoT 或 Action。ICLR 2023 接收。

[^10]: [Yao et al. (2023) — Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/abs/2305.10601)
> ToT 框架：将线性 CoT 扩展为树状搜索结构，支持探索、评估、回溯，在 Game of 24、创意写作等任务上超越 GPT-4 的 CoT。

[^11]: [Besta et al. (2023) — Graph of Thoughts: Solving Elaborate Problems with Large Language Models](https://arxiv.org/abs/2308.09687)
> GoT 框架：将 ToT 进一步扩展为图结构，支持 Aggregation（聚合多个思维）、Refining（精炼思维）、Generation（生成新思维）等图操作。

### 开源框架官方文档

[^7]: [LangGraph — Multi-Agent Supervisor Reference](https://reference.langchain.com/python/langgraph-supervisor)
> LangGraph 官方多 Agent Supervisor 库文档，定义 Hierarchical Multi-Agent Systems 中「supervisor controls all communication flow and task delegation」的协调机制。

[^8]: [Google Cloud — Multi-Agent Architecture and Long-Term Memory with ADK](https://cloud.google.com/blog/topics/developers-practitioners/multi-agent-architecture-and-long-term-memory-with-adk-mcp-and-cloud-run)
> Google ADK (Agent Development Kit, 2025) 官方博客，介绍 `PreloadMemoryTool`、Session Memory 与 Long-term Memory 的三层记忆检索架构。

[^12]: [Microsoft AutoGen — Group Chat Design Pattern](https://microsoft.github.io/autogen/stable//user-guide/core-user-guide/design-patterns/group-chat.html)
> Microsoft AutoGen 官方文档，定义 Group Chat 中 `GroupChatManager` 维护轮流发言顺序的协调机制，支持顺序轮询与人工介入。

---

## 七、使用建议

### 何时引用本文档

| 场景 | 引用章节 |
|------|---------|
| 向数据组提 Agent 架构需求 | 一、二、三章的标准定义表 |
| 供应商培训 / 内部技术分享 | 二（设计模式）、三（协作架构） |
| 管理汇报（如军哥/王易人） | 一（子代理类型）、四（概念对照） |
| 需要对标业界标准时 | 六（参考文档完整列表） |
| 快速判断「该用什么模式」 | 二章的「适用条件」列 + `agent-pattern-selector` skill 的决策矩阵 |

### 更新维护

- **新增来源**：发现新的权威定义（如 AWS Bedrock Agent、Meta Llama Stack 等）时，按本格式补充
- **版本记录**：在文档头部更新版本号和日期
- **交叉验证**：学术文献优先引用 NeurIPS/ICML/ICLR/ACL 等顶会论文；工程实践优先引用官方文档而非第三方博客

---

*本文档与 `.claude/skills/agent-pattern-selector/SKILL.md` 配套使用：SKILL.md 提供运行时决策工具（精简引用），本文档提供完整权威溯源（标准定义参考）。*
