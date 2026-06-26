# 前知识基线 + 4+3 结构共识

用户在第一节课前已披露大量前知识，且与 AI 协同确定了课程结构。这些设定了后续教学的下限，避免重复教已知内容。

## 已确认的前知识（深度：可操作）

1. **Harness 正名**：用户已知道 Anthropic 把模型外围脚手架叫 harness（非 agent），且自己已落地 Tool Call Repair Layer（`lib/tool-input-repair.ts` + `.Codex/reference/tool-call-repair.md`）。
2. **Context 管理实践**：用户已有成熟的三级 memory 体系（memory/daily、memory/thinking、buffer.md WAL 协议），并维护对话摘要机制。
3. **Prompt 资产化**：用户已有 `.Codex/rules/` 五张规则表、AGENTS.md、数十个 SKILL.md，理解 prompt 即程序。
4. **Loop 直觉**：用户已落地 subagent 架构、compact-resume，并引用过阳志平「让 AI 自主干活的 12 个技巧」。
5. **Token 成本意识**：用户 06-04 记录过 token 消耗量级（轻量日几百~几千、产研日 30-80 万），有强经济直觉。

## 关键决策：4+3 课程结构

用户认可"空间四层 + 治理三层"的 MECE 切法：
- 空间四层：Context / Prompt / Harness / Loop（一次协作的生命周期）
- 治理三层：Skill / Eval / Cost（跨多次协作的沉淀、度量、预算）
- 切割线是"一次 AI 协作的生命周期"，而非"职能"，因为前者每层都有用户现成案例锚定。

## Implications

- **跳过的内容**：不教 prompt 基础、不教什么是 agent、不教 memory 概念——用户已深度掌握。直接从"把散点串成自洽结构"切入。
- **Skill 独立成层**：用户同意 skill 横切四层，不应降格为 Prompt 子项。这是本工作区与其他 AI 课程的结构差异点。
- **第一课切入点**：从标尺层（智力密度）开始，因为它贯穿全课、且锚定用户已有的 token 成本关注。不按"案例最多的 Harness 先"的直觉顺序，因为标尺先立起来后面每层才有评判依据。
- **待观察**：用户是否会要求把 Loop 层扩展到 2 倍篇幅（NOTES.md 待确认项）。如提出，调整后续 lesson 配比。
