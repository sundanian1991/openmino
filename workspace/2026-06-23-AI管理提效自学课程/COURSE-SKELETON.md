# AI 管理与提效 · 自学课程骨架

> 设计方法：结构化思维（金字塔 + MECE）。切割线 = "一次 AI 协作的生命周期"。
> 横向四层是模块，纵向一根标尺贯穿全程。

---

## 结构总览

```
                    ┌─────────────────────────────────┐
   贯穿标尺 ───────▶ │  智力密度 / Token 经济（第 0 层） │  ← 评判每一层好坏的尺子
                    └─────────────────────────────────┘
                                  │ 贯穿 ↓
        ┌───────────┬─────────────┴──────────┬────────────┐
        ▼           ▼                          ▼            ▼
   ① Context    ② Prompt                 ③ Harness      ④ Loop
   （喂什么）   （怎么说）               （外围脚手架）   （跑起来怎么转）
   进模型前     模型接口层               模型外结构      产出后闭环
```

**为什么这样切（MECE 自检）**：
- 互斥：context 管"信息源"，prompt 管"编码方式"，harness 管"模型外的固定结构"，loop 管"动态执行回路"——四个不同的作用点
- 穷尽：从你敲下回车到拿到结果，任何提效动作必然落在其中一层
- 标尺独立：智力密度不是第五层，而是给前四层打分的维度

---

## 第 0 层 · 智力密度与 Token 经济（标尺层，最先建立）

> 先立尺子，后面每一层都用它衡量。这是你要的"如何用更多的 token，有效使用"的答案。

### 核心命题
**Raw token 数是推理质量的劣质代理。** 前沿共识正从"堆 token"转向"每个 token 的智力密度"。

### 要掌握的概念
| 概念 | 一句话 | 前沿出处 |
|------|--------|---------|
| Per-Token Intelligence | 好模型不只准，还要每个 token 都准 | OckBench (arXiv 2511.05722) |
| Capability Density / Densing Law | 模型正变得更聪明/单位算力 | Nature Machine Intelligence |
| Deep-Thinking Tokens | "深度思考 token"占比比总量更预测准确率 | Google Research |
| Reasoning Economy | 推理过程可压缩，自动化策略砍 69.5% token | VentureBeat |
| Test-Time Compute Scaling | 推理时多花算力换准确率，但要花在刀刃上 | OpenAI o1 范式 |

### 落到你的实践（自洽点）
- 你 06-04 关注过 token 成本（轻量日几百~几千，产研日 30-80 万）→ 这层回答"花得值不值"
- 你的"思维链应依据内容动态生成，而非套固定流程模板"偏好 → 正是 Deep-Thinking Tokens 的直觉版

### 这一层的自洽判断
> 问自己：**这个动作是在堆 token，还是在提升每个 token 的判断密度？**

---

## 第 1 层 · Context（上下文）

> 进模型前，你把什么信息塞进那扇窗口。这是"AI 管理"的起点——你管理的本质是信息。

### 核心命题
**Context Window = RAM。** 上下文是稀缺资源，要像内存管理一样分配，而不是把所有东西都塞进去。

### 子模块（MECE 二分：来源 × 时效）
```
Context
├── A. 来源维度：你给的信息从哪来
│   ├── A1. 静态规则（AGENTS.md / 规则文件）—— 你已在做
│   ├── A2. 动态检索（记忆系统 / RAG / 工具召回）—— 你的 memory/ 体系
│   └── A3. 会话累积（对话历史 / compact 摘要）—— 你的对话摘要机制
└── B. 时效维度：信息怎么保鲜
    ├── B1. 冷启动（首次喂什么）
    ├── B2. 增量更新（WAL 协议、buffer.md）
    └── B3. 遗忘与压缩（compact / 归档）
```

### 前沿实践
- **Context Window as RAM**（Harness 博客）：把上下文当内存，主动驱逐低价值信息
- **Progressive Disclosure**（你 nian-design 里已在用）：分层渐进喂信息
- **长上下文 ≠ 好上下文**：模型在长上下文中会"遗忘"中间部分（lost-in-the-middle）

### 落到你的实践
- AGENTS.md 核心规则索引、memory/ 三级体系、对话摘要模板 = A1+A2+A3 全覆盖
- buffer.md 的 WAL 协议 = B2 增量更新的最佳实践

### 这一层的自洽判断
> 问自己：**窗口里的每一段信息，此刻都在为当前任务贡献判断密度吗？没有就驱逐。**

---

## 第 2 层 · Prompt（提示词）

> 同样的信息，怎么编码让模型更准确地接住。这是最常被过度神化、也最容易被低估的一层。

### 核心命题
**Prompt 不是"咒语"，是接口设计。** 好的 prompt 降低模型的理解损耗，等于提升单位 token 的智力产出。

### 子模块（MECE：按 prompt 的作用对象切）
```
Prompt
├── A. 给模型的指令（一次性编码）
│   ├── A1. 角色与人设（SOUL 类规则）
│   ├── A2. 任务结构化（输入/输出/约束三件套）
│   └── A3. 示例驱动（few-shot / 模板）
├── B. 给 skill 的指令（可复用编码）
│   ├── B1. SKILL.md 的写法
│   └── B2. 命令/工作流（/teach /nian-design 这类）
└── C. 给 harness 的指令（系统级编码）
    ├── C1. System Prompt 注入（你的 tool-call-repair 注入片段）
    └── C2. 工具调用格式约束（5 条格式规则）
```

### 前沿实践
- **结构化 prompt > 自然语言 prompt**：模型对 XML/Markdown 结构的解析准确率更高
- **"思维链应依据内容动态生成"**（你的原话）—— 前沿叫 task-adaptive reasoning
- **Prompt 即程序**：把 prompt 当有版本、可测试、可迭代的代码

### 落到你的实践
- AGENTS.md 的 5 张规则表 = A1+A2 的范本
- 一堆 SKILL.md = B1，/teach /howto-ai = B2
- tool-call-repair.md 的 System Prompt 注入片段 = C1+C2 的活教材

### 这一层的自洽判断
> 问自己：**这段 prompt 能不能变成一个可复用、可测试的资产？还是一次性的咒语？**

---

## 第 3 层 · Harness（外围脚手架）

> 模型本身能力固定时，决定产出质量的是它外面的那层结构。这是 Anthropic 正名的概念，也是你最容易出系统性优势的地方。

### 核心命题
**Model + Harness = Agent。** 模型提议，harness 执行、校验、修复。多数"模型不行"其实是"harness 没搭好"。

### 子模块（MECE：按脚手架的职能切）
```
Harness
├── A. 工具层（模型能调什么）
│   ├── A1. 工具设计（颗粒度、返回结构）
│   └── A2. 工具调用修复（你的 Repair Layer）★ 你已有前沿案例
├── B. 校验层（怎么知道对不对）
│   ├── B1. 质量门（quality gate / 硬规则校验）
│   └── B2. PEV 回路（Propose-Execute-Verify）★ 前沿范式
├── C. 记忆与状态层（跨轮记住什么）
│   └── C1. 短期/长期记忆架构（你的 memory/ 三级）
└── D. 护栏层（不让它跑飞）
    ├── D1. 权限边界（危险操作确认）
    └── D2. 成本约束（token 预算）
```

### 前沿实践（重点）
- **"Stop calling it an agent, Anthropic calls it a harness"**（Towards AI）—— 正名运动
- **PEV Loop = Propose → Execute → Verify**（Augment Code）—— 当前公认回路范式
- **9 building blocks of an AI harness**（YouTube 2026 辩论）—— harness 的完整构件清单
- **12 Reusable Harness Design Patterns from Claude Code**（Epsilla）—— 可复用模式
- **"开源模型工具调用失败 90% 是 harness 层 schema 太严"**（Ahmad Awais）★ 你已落地

### 落到你的实践（这层你最富）
- `lib/tool-input-repair.ts` + `.Codex/reference/tool-call-repair.md` = A2，且是前沿实践
- AGENTS.md 的 Git/可视化规范、subagent 原则 = B1+D1
- memory/ 三级 + buffer.md WAL = C1
- "模型提议-主代理决策"原则 = PEV 的你在用版

### 这一层的自洽判断
> 问自己：**这个失败是模型笨，还是我的 harness 没接住？90% 是后者。**

---

## 第 4 层 · Loop（执行回路与提效）

> 前三层是静态结构，这层是动态运转。你要的"类似 loop 的前沿实践"和"如何用更多 token、有效使用"主要落在这里。

### 核心命题
**Agent Loop = OS。** 把模型当 CPU、context 当 RAM，loop 就是调度一切的操作系统。提效 = 让这个 OS 转得更聪明，而非更快堆 token。

### 子模块（MECE：按 loop 的形态切）
```
Loop
├── A. 单 agent 自循环
│   ├── A1. ReAct（Reason-Act-Observe）—— 基础回路
│   ├── A2. Reflection / Self-Verify —— 自我校验回路 ★ 对应 Deep-Thinking Tokens
│   └── A3. Compact-Resume —— 长任务续接（你的对话摘要）
├── B. 多 agent 协作回路
│   ├── B1. 主-子代理派发（你的 subagent 架构）
│   ├── B2. 并行扇出-汇总（Dynamic Workflow）
│   └── B3. 批判-修订回路（code review / evals）
└── C. 人机协作回路
    ├── C1. Human-in-the-loop（危险操作确认、方向校准）
    └── C2. 异步回路（心跳、定时任务、后台 agent）
```

### 前沿实践（重点）
- **PEV Loop**（同第 3 层，但这里是动态视角）：Propose → Execute → Verify 循环运转
- **The Agent Loop Is the New OS**（Harness 博客）—— OS 比喻
- **Era 3 Agentic Coding**：Model × Harness 公式，loop 是乘法因子
- **Test-Time Compute Scaling**：在 loop 里动态决定"还要不要再想一轮"——这是"用更多 token"的正确姿势
- **Dynamic Workflow**（Claude Code 2.1.160，你 06-05 已确认可用）：流水线并行 + 结构化输出
- **阳志平「让 AI 自主干活的 12 个技巧」**（你 06-02 已可视化）—— loop 层实操集

### 落到你的实践
- AGENTS.md "主代理做协调，复杂任务派子代理" = B1
- 对话摘要 + compact = A3
- "Agent 需支持被动调用 + 主动发现"（你 06-05 电销方案原话）= C2 异步回路
- 觅游社区心跳执行 = C2 已落地

### 这一层的自洽判断
> 问自己：**这个 loop 是在盲目多转圈烧 token，还是每一圈都在提升产出的智力密度？**

---

## 四层之间的自洽性检查（关键）

这是"每个环节自洽"的保障。四层不是孤岛，有明确的接口契约：

```
Context ──喂给──▶ Prompt ──编码──▶ 模型 ──被──▶ Harness 包裹
   ↑                                              │
   └──────────── Loop 把产出反哺 ◀──执行/校验────┘
```

| 接口 | 契约（自洽条件） | 违反时的症状 |
|------|-----------------|------------|
| Context → Prompt | 上下文里的信息必须能被 prompt 的结构接住 | 信息喂了但模型没用上 |
| Prompt → Harness | prompt 要求的工具/校验，harness 必须真的提供 | 模型想调工具但调用失败 |
| Harness → Loop | harness 的校验结果必须能驱动 loop 的下一轮 | 校验了但不据之调整 |
| Loop → Context | loop 的产出必须能回写进 context（记忆） | 每次都从零开始，不积累 |

**一句话自洽法则**：任何一层的变化，都要检查它会不会打破相邻层的接口契约。

---

## 自学路径建议（用 teach 的最近发展区）

按"从你已有案例最多 → 最少"排序，保证每一步都踩在最近发展区：

| 阶段 | 模块 | 为什么这个顺序 | 预估 |
|------|------|--------------|------|
| 1 | 第 0 层 标尺 | 先立尺子，且你的 token 成本关注是现成入口 | 半天 |
| 2 | 第 3 层 Harness | 你案例最丰富（Repair Layer），从优势区建立信心 | 1 天 |
| 3 | 第 1 层 Context | 你的 memory 体系已很成熟，整理即成课 | 1 天 |
| 4 | 第 2 层 Prompt | 规则文件已多，提炼方法论 | 1 天 |
| 5 | 第 4 层 Loop | 前沿最多、你最想补的，放最后深入 | 2 天 |

每学完一层，用 teach 的 learning-record 格式记一条"非显而易见的经验"。

---

## 参考资源（RESOURCES，待 /teach 时填充）

### 标尺层
- OckBench: Measuring the Efficiency of LLM Reasoning — https://arxiv.org/html/2511.05722v2
- Densing Law of LLMs — https://www.nature.com/articles/s42256-025-01137-0

### Harness 层
- Stop Calling It an Agent. Anthropic Calls It a Harness — https://pub.towardsai.net/stop-calling-it-an-agent-anthropic-calls-it-a-harness-4774d5056e7b
- Harness Engineering for AI Coding Agents — https://www.augmentcode.com/guides/harness-engineering-ai-coding-agents
- 12 Reusable Agentic Harness Design Patterns from Claude Code — https://www.epsilla.com/blogs/2026-04-18-deep-dive-12-reusable-agentic-harness-design-patte
- 你自己的 tool-call-repair.md（A2 活教材）

### Loop 层
- The Agent Loop Is the New OS — https://www.harness.io/blog/agent-loop-new-os
- Better Models Or Better Harnesses? (Era 3) — https://www.youtube.com/watch?v=dumoyEGjhD4
- 阳志平 12 技巧（你已可视化，本地资产）

### Context 层
- The Complete Guide to Building Systems That Make AI Agents Reliable — https://www.nxcode.io/resources/news/harness-engineering-complete-guide-ai-agent-codex-2026
