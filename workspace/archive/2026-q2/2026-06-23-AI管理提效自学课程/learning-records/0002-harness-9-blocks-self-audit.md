# Harness 九构件自检 + PEV 缺口确认

通过备课（非用户亲自完成练习），已确认用户 harness 的九构件覆盖状态，并锁定 PEV 的 V（校验）阶段为当前主要缺口。这设定了后续 Harness 深入方向，也喂养了第 6 课 Eval 层的评估对象。

## 已确认的覆盖状态

基于读取用户的 <code>lib/tool-input-repair.ts</code>、<code>.Codex/reference/tool-call-repair.md</code>、<code>AGENTS.md</code>、<code>memory/</code> 结构：

- <strong>完整覆盖 4 个</strong>：工具调用修复、质量门（Git/可视化规范）、长期记忆（memory/ 三级）、权限护栏（subagent 原则）
- <strong>部分覆盖 3 个</strong>：工具设计、PEV 校验回路（靠"主代理决策"软规则）、反馈结构化
- <strong>未结构化 2 个</strong>：成本约束（靠直觉）、短期记忆（靠 context window）

## 关键洞察：用户已暗合三个前沿设计原则

用户在 Repair Layer 代码里做出的三个选择，都暗合 2026 年前沿共识：
1. <strong>宽容而非严格</strong> → 对应 "model proposes — harness executes" 原则
2. <strong>有 Schema 更精准</strong> → 对应 progressive disclosure
3. <strong>执行顺序有讲究</strong> → 修复器的依赖管理

这说明用户不是在补课，而是在给已有实践命名、归位。教学策略应保持"你已在做、我们升级它"的基调，而非"教你新东西"。

## Implications

- <strong>第 2 课切入角度正确</strong>：从 Repair Layer 这个优势点出发建立信心，而非从零教 harness 概念。
- <strong>明确了缺口</strong>：PEV 的 V 阶段（独立于模型的校验）是用户当前最该结构化的方向。后续可考虑做一节专门的"V 阶段搭建"深入课。
- <strong>设定了第 6 课 Eval 层的锚点</strong>：九构件体检表本身就是一个 eval 框架的雏形——"我的 harness 哪里强哪里弱"是评估的最小可行形式。
- <strong>待观察</strong>：用户是否会在课后主动补 V 阶段。如补了，记一条新 learning-record；如没补，第 4 课 Loop 层讲 compact-resume 时可再带一次。
