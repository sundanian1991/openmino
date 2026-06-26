# AI 管理与提效 · Glossary

本工作区使用的规范术语。所有 lesson / reference / learning-record 须遵循此处术语。**仅收录用户已理解的概念**——压缩成紧凑定义本身就是学习证据。

## Terms

**Harness（脚手架）**:
模型外围的固定结构——工具、记忆、校验、护栏——它和模型一起构成 agent。Anthropic 推动用它替代被滥用的 "agent" 一词。
_Avoid_: agent wrapper, model scaffolding（意同但非本工作区规范词）

**PEV Loop**:
Propose → Execute → Verify 的执行回路。模型提议、harness 执行、独立校验，三者循环直至收敛。
_Avoid_: agent loop（更宽泛，PEV 是其最严谨形态）, think-act loop

**智力密度（Per-Token Intelligence）**:
单位 token 承载的有效判断量。好模型/好协作不只产出多，更要每个 token 都贡献有效判断。
_Avoid_: token 效率（太宽泛）, reasoning quality（缺了"每 token"维度）

**Capability Density / Densing Law**:
模型正变得更聪明/单位算力的趋势。用"能力密度"衡量模型性价比，而非只看绝对能力。
_Avoid_: 模型压缩（指另一回事）, 模型效率

**Deep-Thinking Tokens**:
推理链中真正承担"深度思考"的 token，其占比比 token 总量更能预测准确率。
_Avoid_: 推理 token（太宽泛）, 思维链长度

**Context Window as RAM**:
把上下文窗口当内存管理——稀缺、需主动分配与驱逐，而非无脑塞满。
_Avoid_: 上下文管理（太泛）, prompt window

**Skill 资产（Skill Asset）**:
把多次协作经验固化成的可调用单元（SKILL.md + 触发机制）。横切四层：正文是 context、触发是 prompt、加载是 harness、复用是 loop。
_Avoid_: prompt 模板（降格了）, 提示词库

**Test-Time Compute Scaling**:
推理时多花算力换准确率的范式（o1 系），关键不是"多想"而是"花在刀刃上"。
_Avoid_: 推理增强（太宽泛）, 多轮思考

## 待收录（等用户在 lesson 里真正用过再加入）

- Model Routing（模型路由）—— 等 Cost 层 lesson 落地后再收录
- Compact-Resume、ReAct、Reflection —— 等 Loop 层 lessons 落地
- Tool Call Repair —— 等 Harness 层 lesson 落地（用户已实践但未在本工作区形式化）
