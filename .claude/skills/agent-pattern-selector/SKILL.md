---
name: agent-pattern-selector
description: 子代理架构决策器。输入任务描述，输出「是否需要子代理 → 拆什么子代理 → 用什么协作模式 → 具体架构图」的完整建议。基于 Anthropic 6 种骨架模式 + 独立性/价值双闸判据。
version: 1.0.0
---

# 子代理架构决策器

> 将任务描述转化为运行时架构决策：**是否需要子代理 → 拆什么子代理 → 用什么协作模式 → 具体架构图**。
>
> 完整权威溯源见 `.Codex/reference/agent-types-reference.md`。

---

## 何时激活此 Skill

**默认不激活**——大多数任务用单代理直做即可。仅当**同时**满足以下两条件时才调用：

1. **存在可独立完成的并行子任务**：任务能拆成若干"互不依赖中间结果"的子块（不是"步骤多"）
2. **任务价值够高**：值得付 ~15× token（多代理实测成本）；或单一 Agent 尝试后质量明显不达标

> ⚠️ 反信号（出现这些**不要**激活）：任务主要是编码 / 单一改动 / 强耦合 / 一问一答 / 单一事实查找 / 要求实时响应。这些场景多代理更慢更贵更乱。

---

## 核心决策流（3 步判断法）

```
任务输入
  │
  ▼
[Step 1] 任务特征扫描 + 价值/成本闸
  ├── 复杂度：步骤数、领域跨度、确定性
  ├── 质量要求：容错率、迭代深度
  ├── 独立性：子任务能否独立跑完、不依赖彼此中间结果？
  └── 价值闸：任务价值是否值得付 ~15× token？
  │       └── 任一不过 → 单代理直做，结束
  ▼
[Step 2] 模式匹配与组合推荐
  ├── 单一模式 or 组合模式
  └── 是否需要子代理拆分
  ▼
[Step 3] 子代理拆分方案 + 架构输出
  ├── 子代理类型定义
  ├── 协作流程设计
  └── 委派四要素核对（目标+输出格式+工具范围+边界）
```

---

## 骨架模式速查表（Anthropic 6 种 + 红线）

> 不记"13/21 种"——那是营销数字。骨架只留这 6 个，足以覆盖所有工程场景。

| 模式 | 一句话定义 | 适用场景 | 复杂度 |
|------|-----------|---------|--------|
| **Single Agent** | 一个 Agent 独立完成 | 问答、助手、客服、单步工具调用 | ★☆☆ |
| **ReAct（Tool Use）** | 边思考边行动，循环迭代 | 搜索、数据库、工具调用、有中间观察 | ★★☆ |
| **Plan-and-Execute** | 先全局规划，再分步执行 | 3-8 步、有明确阶段依赖的长任务 | ★★☆ |
| **Reflection** | 生成 → 检查 → 修正 | 提高正确率、可验证输出的迭代改进 | ★★☆ |
| **Parallelization** | 切片或投票，子任务**预定义**并行 | 子任务固定、彼此无依赖 | ★★☆ |
| **Orchestrator-Workers** | 中央 LLM **动态**拆解→派 worker→合成 | 子任务由主 LLM 按输入现拆（Claude Code `Agent` 工具即此） | ★★★ |

**复杂度递进（低到高）**：
```
Single Agent → ReAct → Plan-and-Execute → Reflection → Parallelization → Orchestrator-Workers
```

### 红线：以下场景绝不派多代理

1. 所有 agent 必须共享同一份上下文（信息耦合高）
2. agent 之间依赖太多（需实时互相协调）
3. 编码任务（"大多数编码任务的真正可并行点比研究少"）
4. 需要实时委派协调（"LLM 目前还不擅长实时协调和委派其他 agent"）

---

## 任务特征 → 模式匹配矩阵

### 维度 1：任务复杂度

| 特征 | 推荐模式 | 子代理？ |
|------|---------|---------|
| 1-3 步，单领域，确定性高 | Single Agent | 否 |
| 3-8 步，单领域，有分支判断 | Plan-and-Execute + ReAct | 可拆 Planner + Executor |
| 8+ 步，**多领域且子任务可独立** | Orchestrator-Workers | 是 |
| 需探索多条路径选最优 | 见附录 ToT/GoT | 视情况 |

### 维度 2：输出质量要求

| 特征 | 推荐模式 | 子代理？ |
|------|---------|---------|
| 普通回答，容错率高 | Single Agent | 否 |
| 需要事实准确 | ReAct + Tool Use | 否 |
| 需持续打磨优化 | Self-Refine / Reflection | 可拆 Drafter + Critic |
| 企业级交付物（报告/方案）且价值够高 | Orchestrator-Workers | 是 |

### 维度 3：领域跨度

| 特征 | 推荐模式 | 子代理拆分建议 |
|------|---------|---------------|
| 单一领域 | Single / ReAct | 不拆 |
| 2-3 个**独立**领域 | Orchestrator-Workers | 按领域拆：Search / Code / Writer |
| 3+ 个独立领域 | Orchestrator-Workers + Hierarchical | 按领域 + 按功能双层拆分 |
| 领域未知（需先识别） | Router → 再分发 | Router 本身是一个子代理 |

### 维度 4：自主性与持续性

| 特征 | 推荐模式 |
|------|---------|
| 一问一答 | Single / ReAct |
| 多轮会话，依赖上下文 | Memory + ReAct |
| 需持续执行直到目标达成 | Loop Engineering（见附录） |

---

## 子代理拆分实战指南

### 何时必须拆分子代理？

出现以下任一情况，**且价值闸通过**时，主动建议拆分：

1. **认知负荷超载**：一个 Agent 需同时掌握多个不相关领域
2. **质量瓶颈**：单一 Agent 输出经多次迭代仍不达标
3. **流程依赖**：存在明确的"A 完成 → B 审核 → C 修改"阶段依赖
4. **并行效率**：多个子任务可并行执行，串行太浪费
5. **安全隔离**：某些操作（代码执行、数据修改）需要隔离运行

### 常见子代理类型

| 子代理类型 | 职责 | 协作模式 |
|-----------|------|---------|
| **Planner** | 任务分解、制定执行计划 | 输出计划给 Executor |
| **Researcher** | 信息搜集、事实核查 | 输出研究结果给 Writer |
| **Writer** | 内容生成、文案撰写 | 接收输入，输出草稿 |
| **Critic** | 质量审查、逻辑检查 | 审查 Writer 输出，提出修改意见 |
| **Coder** | 代码生成、调试 | 接收需求，输出代码 |
| **Analyst** | 数据分析、洞察提取 | 接收数据，输出分析结论 |
| **Router** | 意图识别、任务分发 | 接收输入，分发给对应 Agent |
| **Supervisor** | 统筹调度、结果合并 | 协调多个 Agent，合并输出 |
| **Memory Keeper** | 记忆管理、上下文构建 | 为其他 Agent 提供上下文 |

> 各类型的完整定义、权威来源、输入输出规范见 `agent-types-reference.md` 第一章。

### 拆分原则

- **按领域拆分**：金融 Agent / 代码 Agent / 写作 Agent（适合 Router 场景）
- **按阶段拆分**：规划 → 执行 → 审查 → 优化（适合 Pipeline 场景）
- **按功能拆分**：搜索 → 分析 → 合成 → 验证（适合研究类任务）
- **按安全等级拆分**：只读 Agent / 可写 Agent / 执行 Agent（适合企业场景）

### 委派四要素（Anthropic 实战强调，最易被忽略）

派每个子代理时**必须**带齐，否则子代理易重复劳动或偏离：

| 要素 | 说明 | 反例 |
|------|------|------|
| **目标** | 这个子代理要交付什么 | ❌"研究半导体" ✅"梳理 2025 全球 Top10 半导体厂商的产能数据" |
| **输出格式** | 结构化格式要求 | ❌"随便写" ✅"Markdown 表格：厂商/产能(万片/月)/同比/来源链接" |
| **工具范围** | 允许用哪些工具/数据源 | ❌不限制 ✅"仅用 tavily 搜索 + 已有 workspace 文档，不联网爬取" |
| **任务边界** | 做到哪为止、不做什么 | ❌无边界 ✅"只查产能数据，不分析趋势；2025 年 1 月后数据" |

---

## 推荐架构模板（直接套用）

### 模板 A：轻量级（多数日常任务）

```
User → ReAct Agent → [Tool Use: 搜索/API/数据库] → Final Answer
```

- **适用**：简单问答、信息查询、单步工具调用
- **优势**：延迟低、简单直接
- **示例**："查一下今天的天气"

### 模板 B：标准级（质量敏感任务）

```
User → Router → Supervisor
                ├── Search Agent (ReAct + Tool)
                ├── Writer Agent (Self-Refine)
                └── Reviewer Agent (Reflection)
                ↓
         Supervisor Merge → Final Answer
```

- **适用**：研究报告、方案撰写、数据分析报告
- **优势**：质量可控、分工明确
- **示例**："帮我写一份供应商产能分析报告"

### 模板 C：企业级（复杂项目，价值够高才用）

```
User → Router → Supervisor → Planner
                              ├── Search Agent → 研究结果
                              ├── Code Agent → 代码/脚本
                              ├── Analyst Agent → 数据洞察
                              └── Writer Agent → 内容产出
                              ↓
                    ReAct Tool Use (调用外部工具)
                              ↓
                    Memory + RAG (上下文构建)
                              ↓
                    Reflection / Self-Refine (质量优化)
                              ↓
                    Supervisor Merge → Final Answer
```

- **适用**：复杂项目、跨领域任务、企业级交付
- **优势**：全面、可扩展、质量最高
- **示例**："帮我设计一套供应商培训体系，包含数据分析、PPT制作、话术设计"

### 模板 D：迭代优化级（写作/代码类）

```
User → Writer Agent → Draft
           ↓
      Critic Agent → Review
           ↓
      [发现问题?] ──Yes──→ Writer Agent → Improve
           │ No
           ↓
      Final Answer
```

- **适用**：高质量写作、代码生成、翻译
- **优势**：输出质量持续提升
- **示例**："帮我润色这份培训方案，让它更专业"

### 模板 E：自主执行级（自动化任务）

```
Goal → Think → Act → Observe → Evaluate
                     ↓
              [Need Continue?] ──Yes──→ 回到 Think
                     │ No
                     ↓
                   Finish
```

- **适用**：自动化监控、定期任务、目标驱动执行
- **示例**："每天监控供应商出勤数据，异常时发通知"

---

## 多 Agent 协作的 4 种架构

当任务必须拆分为多个 Agent 时，选择底层通信结构：

| 架构 | 结构 | 通信方式 | 适用场景 |
|------|------|---------|---------|
| **Network（网络）** | Agent 间直接点对点通信 | 全连接 / 有限连接 | 小规模团队、开放式讨论 |
| **Supervisor（主管）** | 中央 Supervisor 调度所有 Agent | 星型：Supervisor ↔ Agent | 中等规模、需统一决策 |
| **Hierarchical（层级）** | 多层 Supervisor 嵌套 | 树型：顶层→中层→执行层 | 大规模系统、企业级 |
| **Team-of-Teams（团队之团队）** | 多个 Supervisor 各自管理团队，顶层再设协调者 | 联邦制 | 超大规模、跨部门协作 |

**选择建议**：
- 2-3 个 Agent → Network 或 Supervisor
- 4-8 个 Agent → Supervisor（避免全连接爆炸）
- 8+ 个 Agent → Hierarchical 或 Team-of-Teams

---

## 反模式（避免）

| 反模式 | 表现 | 修正 |
|--------|------|------|
| **过度拆分** | 3 步任务拆了 5 个子代理 | 简单任务用 Single Agent |
| **模式堆砌** | 把所有模式都用上 | 按需选择，最小够用 |
| **忽视成本** | 多代理但不评估 token 代价 | 过价值闸：是否值得 ~15× token |
| **忽视延迟** | Multi-Agent 但要求实时响应 | 评估延迟成本，必要时降级 |
| **无监督协作** | 多个 Agent 各自为政 | 必须有 Supervisor 或 Router 统筹 |
| **静态架构** | 架构固定不调整 | 根据任务反馈动态调整 |
| **委派模糊** | 给子代理的指令太短 | 带齐委派四要素 |
| **记忆缺失** | 多轮对话但无 Memory | 长期任务必须加 Memory Pattern |

---

## 与现有 Skill 体系的协同

此 Skill 作为**元架构层**，可指导如何组合使用其他 Skill：

| 用户 Skill | 此 Skill 的建议角色 | 协作模式 |
|-----------|-------------------|---------|
| `ppt-speech-creator` | Writer Agent（内容生成） | Self-Refine |
| `data-viz-fundamentals` | Analyst Agent（数据洞察） | ReAct + Tool |
| `prompt-creator` | Critic Agent（提示词优化） | Reflection |
| `frontend-design` | Writer Agent（设计输出） | Self-Refine |
| `research-intelligence` | Researcher Agent（情报搜集） | ReAct + Tool |
| `xlsx` | Coder Agent（数据处理） | ReAct + Tool |

**示例：用户使用 "帮我做一份供应商培训 PPT"**

此 Skill 的决策：
1. 任务复杂度：中高（内容策划 + PPT 制作 + 演讲稿）
2. 领域跨度：培训内容 + PPT 设计 + 演讲表达
3. 质量要求：高（企业级交付）
4. **独立性闸**：三个子任务可独立完成（内容、PPT、演讲稿可并行起稿）
5. **价值闸**：企业级交付，值得付成本 → 通过
6. **推荐架构**：Orchestrator-Workers → [Planner + Researcher + Writer(PPT) + Writer(演讲稿) + Critic]

---

## 附录·高级选项（基本用不上，仅对标时参考）

> 以下模式在工具调用环境（Claude Code / MCP）中**基本用不上**。仅当任务匹配特定边界时考虑。

| 模式 | 定义 | 适用边界 |
|------|------|---------|
| **Self-Refine** | Generator → Feedback → 修正，基于当前会话上下文迭代（不依赖外部记忆） | 写作/代码/设计类需持续打磨 |
| **Tree of Thoughts (ToT)** | 多条推理路径并行探索，节点评估选优，支持回溯 | 数学推理、规划、需探索多种方案 |
| **Graph of Thoughts (GoT)** | 思维图结构，节点可聚合/精炼/生成，支持跨分支交叉 | 复杂决策、知识图谱推理 |
| **Loop Engineering** | ReAct + 循环终止条件，持续执行直到达成目标 | 自动化监控、定期任务 |
| **Group Chat** | 多 Agent 轮流发言，GroupChatManager 维护顺序 | 开放式讨论/头脑风暴 |

> 各高级模式的完整定义与论文溯源见 `agent-types-reference.md` 附录。

---

## 实战决策流程（运行时使用）

### Step 1：任务扫描 + 价值闸

回答以下问题：

1. **独立性**：这个任务能拆成"互不依赖中间结果"的子块吗？（不能 → 单代理）
2. **价值**：任务价值是否值得付 ~15× token？（不值得 → 单代理）
3. 复杂度：预计几步？（1-3 / 3-8 / 8+）
4. 领域跨度：几个知识领域？（1 / 2-3 / 3+）
5. 质量要求：普通 / 较高 / 极高

### Step 2：模式选择

| 场景 | 选择 |
|------|------|
| 1-3 步 + 单领域 | **Single Agent** |
| 需工具调用 + 有分支判断 | **ReAct** |
| 3-8 步 + 需规划 | **Plan-and-Execute** |
| 高质量要求 + 可验证 | **Reflection** |
| 子任务可独立并行（预定义） | **Parallelization** |
| 多领域 + 子任务需动态拆 | **Orchestrator-Workers** |
| 自动化 + 持续执行 | **Loop Engineering**（附录） |

### Step 3：子代理设计（仅当选了多代理模式时）

1. **确定拆分维度**：领域？阶段？功能？安全等级？
2. **定义每个子代理**：名称、职责、输入输出、使用模式
3. **设计协作流程**：串行？并行？反馈循环？
4. **选择监督机制**：Supervisor 合并？还是 Router 直接分发？
5. **核对委派四要素**：每个子代理的指令都带齐 目标+格式+工具+边界 了吗？

### Step 4：输出架构建议

```markdown
## 架构建议

**推荐模式组合**：XXX + YYY

**子代理拆分**：
- Agent A（Planner）：负责制定执行计划
- Agent B（Researcher）：负责信息搜集
- Agent C（Writer）：负责内容撰写
- Agent D（Critic）：负责质量审查

**协作流程**：
1. Router 识别意图 → 分发给 Supervisor
2. Supervisor 调用 Planner 制定计划
3. 并行执行：Researcher 搜集信息 + Analyst 分析数据
4. Writer 综合输出初稿
5. Critic 审查并提出修改意见
6. Writer 修改后输出终稿

**预期优势**：
- ✓ 任务理解更准确（Router 意图识别）
- ✓ 调度更智能（Supervisor 统筹）
- ✓ 执行更可靠（ReAct + Tool Use）
- ✓ 输出更高质量（Reflection + Self-Refine）
```
