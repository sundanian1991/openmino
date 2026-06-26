# AI 管理与提效 · Resources

> 只收录高信任源（一手论文、Anthropic/官方、高声量从业者）。每条带"用什么场景"注释。
> 分组：按七层结构归类，便于按模块取用。

## Knowledge · 标尺层（智力密度 / Token 经济）

- [Paper: Densing Law of LLMs — Nature Machine Intelligence](https://www.nature.com/articles/s42256-025-01137-0)
  提出 "capability density" 作为模型性价比指标。**用 for**：建立"模型正变得更聪明/单位算力"的基线认知，是整个标尺层的理论根基。

- [Paper: OckBench — Measuring the Efficiency of LLM Reasoning (arXiv 2511.05722)](https://arxiv.org/html/2511.05722v2)
  提出 "Per-Token Intelligence" 维度：好模型不只准，还要每个 token 都准。**用 for**：论证"raw token 数是劣质代理"的核心命题。

- [Article: Deep-Thinking Tokens — Google Research (discussed)](https://www.linkedin.com/posts/omarsar_new-google-paper-challenges-how-we-measure-activity-7431005068780531712-TBLg)
  "深度思考 token" 占比比总量更预测准确率。**用 for**：把"思维链应依据内容动态生成"的直觉升级为可度量概念。

- [Article: Automated LLM Reasoning Strategy Design — VentureBeat](https://venturebeat.com)
  自动化推理策略砍 69.5% token，引入 "Reasoning Economy" 概念。**用 for**：理解推理过程可压缩，是 Cost 层的弹药。

## Knowledge · Harness 层（外围脚手架）

- [Article: Stop Calling It an Agent. Anthropic Calls It a Harness — Towards AI](https://pub.towardsai.net/stop-calling-it-an-agent-anthropic-calls-it-a-harness-4774d5056e7b)
  引用两篇 Anthropic 论文（2025-11 / 2026-03），推动 "harness" 正名运动。**用 for**：建立 Model+Harness=Agent 的认知框架。

- [Guide: Harness Engineering for AI Coding Agents — Augment Code](https://www.augmentcode.com/guides/harness-engineering-ai-coding-agents)
  实操指南：约束、反馈回路、质量门、PEV（Propose-Execute-Verify）。**用 for**：harness 九大构件的落地参考。

- [Blog: 12 Reusable Agentic Harness Design Patterns from Claude Code — Epsilla](https://www.epsilla.com/blogs/2026-04-18-deep-dive-12-reusable-agentic-harness-design-patte)
  从 Claude Code 提炼 12 种可复用 harness 模式。**用 for**：给自己的 harness 做对照、找可借鉴模式。

- [Gist: Modern Agent Harness Blueprint 2026 — amazingvince](https://gist.github.com/amazingvince/52158d00fb8b3ba1b8476bc62bb562e3)
  从零搭 harness 的早期架构蓝图。**用 for**：harness 的完整构件清单，对照自查。

## Knowledge · Loop 层（执行回路）

- [Blog: The Agent Loop Is the New OS — Harness](https://www.harness.io/blog/agent-loop-new-os)
  LLM=CPU、Context=RAM、Loop=OS 的比喻。**用 for**：建立"loop 是调度一切的操作系统"的心智模型。

- [Video: Better Models Or Better Harnesses? The 2026 Developer Debate](https://www.youtube.com/watch?v=dumoyEGjhD4)
  "Era 3 Agentic Coding"、Model×Harness 公式、harness 九构件。**用 for**：理解 loop 在提效公式里是乘法因子。

- [Article: AI Agent best practices from one year as AI Engineer — Reddit r/AI_Agents](https://www.reddit.com/r/AI_Agents/comments/1lpj771/ai_agent_best_practices_from_one_year_as_ai/)
  从业者一年实战总结：agent 擅长开放式、步数不可预测的问题。**用 for**：判断什么任务该用 loop、什么不该。

## Knowledge · Context 层

- [Guide: The Complete Guide to Building Systems That Make AI Agents Reliable (Codex 2026) — NX Code](https://www.nxcode.io/resources/news/harness-engineering-complete-guide-ai-agent-codex-2026)
  设计环境、约束、反馈回路的综合指南。**用 for**：context 管理的系统性参考。

- [Blog: AI Agent Best Practices: Production-Ready Harness Engineering (2026 Guide) — Medium](https://medium.com/@tort_mario/ai-agent-best-practices-production-ready-harness-engineering-2026-guide-c1236d713fac)
  "Model proposes — harness executes" 原则，工具调用返回结构化结果。**用 for**：context 与 harness 接口契约的范例。

## Knowledge · Cost 层（预算与模型路由）

- [Guide: Token Usage Guide 2026 — iternal.ai](https://iternal.ai/token-usage-guide)
  主流 LLM 的 token 消耗估算与预算参考。**用 for**：做 token 预算规划时的速查。

- [Article: Avoiding Unexpected Costs: Token Tax in LLM-based Unit Testing — DevOps Digest](https://www.devopsdigest.com/avoiding-unexpected-costs-token-tax-in-llm-based-unit-testing)
  实操讲解 "token tax"（每次工具调用、每次 loop 都在烧钱）。**用 for**：识别隐性 token 成本。

## Local Assets（自产案例，最高信任——因为是亲历）

- `.Codex/reference/tool-call-repair.md` + `lib/tool-input-repair.ts`
  Harness 层 A2（工具调用修复）的活教材，且是前沿实践（"开源模型工具调用失败 90% 是 harness schema 太严"）。
- `.Codex/rules/` 五张规则表 + `AGENTS.md`
  Prompt 层 A1+A2 的范本（角色/任务结构化/示例驱动）。
- `memory/` 三级体系 + `buffer.md` WAL 协议
  Context 层 A2+B2 的最佳实践落地。
- `阳志平「让 AI 自主干活的 12 个技巧」`（已在 06-02 可视化）
  Loop 层实操集，自产素材。

## Gaps（当前缺的高信任资源）

- **Skill 治理层**：缺系统性讲 SKILL.md 设计与 skill 库生命周期管理的高信任源。当前靠自产 skill-creator/cleaner/consolidator。
- **Eval 层**：缺针对 agent 的持续评估方法论（非传统 ML benchmark）。当前靠 LLM-as-judge / 人工 spot check，待补前沿。
- **中文一线实践**：多数前沿是英文，缺中文母语从业者的深度复盘。待补。

## Wisdom (Communities)

- [r/AI_Agents](https://reddit.com/r/AI_Agents)
  从业者实战交流。**用 for**：检验自己的 harness 设计是否合理，看真实踩坑。
- [Hacker News — AI 标签](https://news.ycombinator.com)
  高声量前沿讨论。**用 for**：跟进新论文/新框架时判断声量与质量。
- _注：用户偏好独立探索，社区参与按需，不作默认推荐。_
