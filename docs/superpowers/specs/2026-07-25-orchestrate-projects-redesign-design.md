# orchestrate-projects skill 重构设计

> **状态**：待用户审阅
> **作者**：Mino + sundanian
> **日期**：2026-07-25
> **目标 skill**：`/Users/sundanian/.agents/skills/orchestrate-projects/`

---

## 1. 背景与问题陈述

### 1.1 这个 skill 是什么

`orchestrate-projects` 是 superpowers 编排三件套（`dispatching-parallel-agents` / `executing-plans` / `subagent-driven-development`）+ `verification-before-completion` 之上的**协调层**。它不重写分派协议、不重写验证逻辑、不重写 TDD 流程；只在上层叠加：状态机、工件体系、里程碑门禁、dashboard 共驾、跨会话恢复。

### 1.2 当前可用性评估

底盘方向是对的。9 个 references 没有空架子，`worked-example.md` 提供了端到端 filled 示例。但有 3 个真问题阻碍它达成"把规划做得更重更详细、每个交付都有人检查"的目标：

| # | 问题 | 严重度 | 类别 |
|---|------|--------|------|
| **P1** | **4 类共 7 处断链**：SKILL.md 正文引用了 4 个不存在的 reference 文件（`harness-codex.md` / `harness-standard.md` / `harness-minimal.md` / `audit-checklist.md`），内容已合并进 `harness-adaptation.md` 和 `verification-gates.md`，但正文 inline 引用漏改 | 事实缺陷，必修 | Bug |
| **P2** | **§4 需求门禁颗粒度远低于 §7**：访谈顺序（三轮）+ 需求门禁（5 条散文）全内联在主文件，没有像验证门禁那样的可勾选清单。"需求是否拆解到位"是全链路最不明确的环节——直接违反"把规划做得更重更详细"的诉求 | 高 | 颗粒度缺口 |
| **P3** | **"派验证 Agent 检查作业"是软约束**：`execution-agent-protocol.md` 硬规则第 6 条只写"写代码和验证应尽量分离"——"应尽量"不是"必须"。skill 定义了"验证 Agent"角色，但**何时触发分派、prompt 长什么样、返回什么、和验证门禁怎么咬合，全都没写**。"写完文档→派子代理检查→确认→再写→再确认"这个闭环目前是缺的 | 高 | 机制缺失 |

### 1.3 核心诉求（来自用户）

> "每个阶段、每一个东西，都必须检查，因为这会影响后续的开发。具体谁干、按什么标准干没关系，只要有人干就行。"
>
> "检查只会设定在：你有个交付物，就得把这个交付物的内容能够审查清楚，这是核心。"

翻译成机制语言：

- **每交付物必查**（最细颗粒度）：不是里程碑结束才查，是每个 .md / 代码交付后立即查
- **检查对象 = 交付物本身的内容质量**：扎实不扎实、清楚不清楚、到位没到位
- **检查标准 = 该交付物自己的"完成判定"**：从对应 skill（vibe-* 或本 skill 自身）继承，不重造轮子
- **不做 vibe-* skill 已经做的事**：vibe-idea 已有 11 维体检、vibe-architecture 已有对齐矩阵——检查子代理不复读这些，而是审查"完成判定是否真的满足了"

---

## 2. 设计原则

1. **保持薄封装**：不重写 superpowers 三件套和验证 skill 的逻辑，只在上层叠加触发规则和咬合点
2. **检查职责单一**：检查子代理只审"交付物内容是否扎实"，不做全局一致性审计、不做盲区假设探测（那些是主协调 Agent 的职责）
3. **写验分离硬约束**：写交付物的执行 Agent 和检查子代理不能是同一个，禁止自写自查
4. **二态 verdict**：检查子代理只输出 PASS / NEEDS_REVISION，不引入 BLOCKED（避免项目卡死在检查循环）
5. **NEEDS_REVISION 必须可执行**：不能只说"质量不行"，必须给具体可执行的修改项

---

## 3. 五块改动（骨架）

### 改动 #1：修 4 类共 7 处断链

**目标**：消除所有指向不存在文件的引用。

**位置**（SKILL.md）：

| 行号 | 当前引用 | 改为 |
|------|---------|------|
| L104 | `references/harness-codex.md` | `references/harness-adaptation.md#codex` |
| L106 | `references/harness-standard.md` | `references/harness-adaptation.md#standard` |
| L108 | `references/harness-minimal.md` | `references/harness-adaptation.md#最小环境` |
| L217 | `references/harness-codex.md` | `references/harness-adaptation.md#codex` |
| L314 | `references/verification-gates.md` 和 `references/audit-checklist.md` | `references/verification-gates.md`（删除对 `audit-checklist.md` 的引用，因为其内容已并入该文件的「逐项审计清单」章节） |
| L324 | `references/harness-codex.md` | `references/harness-adaptation.md#codex` |
| L325 | `references/harness-standard.md` | `references/harness-adaptation.md#standard` |
| L326 | `references/harness-minimal.md` | `references/harness-adaptation.md#最小环境` |

**前置校验**：实施前用 `grep -n "harness-codex\|harness-standard\|harness-minimal\|audit-checklist" SKILL.md` 确认无残留断链。

**验收**：grep 结果为空。

---

### 改动 #2：§4 需求门禁升级——从散文到可勾选清单

**目标**：把 §4.1（访谈三轮）+ §4.2（需求门禁 5 条散文）+ §4.3（路线图门禁）升级为与 §7 同等颗粒度的可勾选清单。访谈顺序保留，但每轮加"产出物 + 验收清单"。

**当前 §4.2 需求门禁（散文）**：

```markdown
- 有 `PROJECT.md`
- 有可验证 `REQUIREMENTS.md`
- 每个 v1 需求有 Requirement ID
- 有 out of scope
- 没有"做好体验""支持管理"这类不可验收表达
```

**重设计为可勾选清单**：

```markdown
### 4.2 需求门禁（进入路线图前的硬门禁）

进入路线图前必须逐项打勾，不全绿则不通过。检查对象是 `.planning/PROJECT.md` 和 `.planning/REQUIREMENTS.md` 的内容质量。

**存在性**
- [ ] `PROJECT.md` 已创建，且非空模板
- [ ] `REQUIREMENTS.md` 已创建，且非空模板

**项目意图（PROJECT.md）**
- [ ] 一句话能说清"这是什么、给谁用、解决什么问题"
- [ ] 核心价值可被一句话验收（不是"做好体验"这类伪需求）
- [ ] 用户画像明确（谁使用、他们要完成什么）
- [ ] 约束已列出（时间/技术/数据/安全/人力，至少覆盖适用项）
- [ ] 边界明确：out of scope 已列出至少 3 条"明确不做"

**需求可验收性（REQUIREMENTS.md）**
- [ ] 每个 v1 需求有唯一 Requirement ID（REQ-01, REQ-02, ...）
- [ ] 每条需求可被一句话验收——能回答"怎么算完成"
- [ ] 无伪需求表达：扫描"支持/做好/优化/完善/提升"等不可验收动词，每条都能改写成"用户能做 X，结果为 Y"
- [ ] 无模糊量词："较快""较多""较完善"已替换为具体数值或可观测行为
- [ ] 优先级已标注（v1 / v2 / deferred），deferred 有原因

**一致性**
- [ ] 每条 v1 需求都能追溯到 PROJECT.md 的核心价值（无游离需求）
- [ ] PROJECT.md 的核心价值都有至少一条 v1 需求支撑（无空头价值）

**输出**
- [ ] 门禁 verdict：PASS / NEEDS_REVISION
- [ ] NEEDS_REVISION 必须列出具体修改项（"REQ-03 不可验收：'支持管理'改为'管理员能在 /admin 创建/删除用户'"）
- [ ] PASS 后才能进入 §4.3 路线图门禁
```

**§4.1 访谈三轮升级**：每轮明确"产出物 + 验收点"，避免访谈发散无产出。

```markdown
### 4.1 访谈顺序

一次问 2-3 个问题，不要一次全抛。每轮结束有明确产出物。

**第一轮：现状和动机**
- 问题：当前系统/流程状态？最痛的问题？触发事件？
- 产出物：PROJECT.md 的"问题陈述"和"触发背景"两节草稿
- 验收点：能用一句话说清"为什么要做这个项目"

**第二轮：用户和核心价值**
- 问题：谁使用？他们要完成什么？v1 最核心要兑现什么？
- 产出物：PROJECT.md 的"用户画像"和"核心价值"两节草稿
- 验收点：核心价值可被一句话验收（不是"做好体验"）

**第三轮：约束和边界**
- 问题：时间/技术/数据/安全/人力限制？明确不做什么？哪些需要用户决策？
- 产出物：PROJECT.md 的"约束"和"out of scope"两节草稿
- 验收点：out of scope 至少 3 条"明确不做"

> 访谈是闲聊式的，可以多轮，不限于三轮。但每轮结束必须有产出物，不能只聊天不落地。
```

**新增 §4.0**：访谈前置的"闲聊阶段"明示化，呼应用户"前面那部分闲聊，聊得越多越好"。

```markdown
### 4.0 闲聊阶段（访谈前）

在正式访谈三轮之前，先进入无结构的闲聊阶段。目的是把想法充分展开，不要急着收敛成需求。

**做什么**：
- 让用户充分描述想法、背景、动机、顾虑
- AI 不打断、不评判、不急于结构化
- 可以问开放问题："再多说说？""这个让你想到什么？""还有别的顾虑吗？"
- 可以多轮，没有上限

**不做的事**：
- 不在闲聊阶段写 PROJECT.md
- 不在闲聊阶段做需求拆解
- 不在闲聊阶段做技术选型

**何时进入正式访谈**：
- 用户主动说"差不多够了""可以开始整理了"
- 或 AI 判断信息已经充分（用户的想法、动机、约束、边界都已浮出水面），主动提议："我听到的大概是 X / Y / Z，要不要开始整理成项目文件？"

> 用户原话："特别是前面那部分，进行闲聊，聊得越多越好。随后再进行整理，逐步整理并逐步确认。"
```

**验收**：§4 全文重写后，颗粒度与 §7 持平（可勾选清单 + verdict + 失败处理）。

---

### 改动 #3：新增「检查子代理协议」（核心）

**目标**：把"每交付物必查"从概念变成机制。定义：检查子代理的角色、何时触发、prompt 模板、verdict 格式、与验证门禁的咬合。

**新增 reference 文件**：`references/review-agent-protocol.md`

#### 3.1 角色定义

```markdown
## 检查子代理（Review Agent）

被主协调 Agent 派出去审查某个交付物**内容质量**的独立子代理。

**职责边界（严格）**：
- 只审"这个交付物的完成判定是否满足"
- 只审"内容本身是否扎实、清楚、到位"
- 不做全局一致性审计、不做跨链路检查、不做盲区假设探测
- 不重跑 vibe-* skill 自己的 lint（那是 vibe-* skill 的职责）

**写验分离硬约束**：
- 写交付物的执行 Agent 和检查子代理不能是同一个
- 禁止"自写自查"——执行 Agent 不能审查自己刚写的产物
- 检查子代理只读不写：它不修改交付物，只产出 verdict 和修改项清单
```

#### 3.2 何时触发

```markdown
## 何时触发

**硬规则：每个交付物产出后，必须立即派检查子代理**。

触发清单（产品开发项目）：

| 阶段 | 交付物 | 触发时机 |
|------|--------|----------|
| 规划 | PROJECT.md | 主协调 Agent 写完后 |
| 规划 | REQUIREMENTS.md | 主协调 Agent 写完后 |
| 规划 | ROADMAP.md | 主协调 Agent 写完后 |
| 立项 | idea.md | 执行 Agent 调用 vibe-idea 产出后 |
| 交互 | interaction.md | 执行 Agent 调用 vibe-interaction 产出后 |
| 技术骨架 | architecture.md | 执行 Agent 调用 vibe-architecture 产出后 |
| 视觉 | design.md | 执行 Agent 调用 vibe-design 产出后 |
| 原型 | prototypes/ | 执行 Agent 调用 vibe-prototype 产出后 |
| 实现 | 代码 | 执行 Agent 调用 vibe-implement 产出后 |

**不允许的捷径**：
- "这个交付物很简单，跳过检查" → 不允许
- "上一个里程碑已经查过类似的，这次免了" → 不允许
- "执行 Agent 说自己测过了" → 仍必须派独立检查子代理
```

#### 3.3 检查标准来源

```markdown
## 检查标准来源

检查子代理不重造标准，从对应 skill 的"完成判定"继承：

| 交付物 | 检查标准来源 | 来源行号 |
|--------|------------|----------|
| PROJECT.md | §4.2 需求门禁清单（本 skill） | 本文件 §4.2 |
| REQUIREMENTS.md | §4.2 需求门禁清单（本 skill） | 本文件 §4.2 |
| ROADMAP.md | §4.3 路线图门禁 + verification-gates.md 的 Roadmap Coverage Gate | verification-gates.md |
| idea.md | vibe-idea 的「Idea 就绪检查 7 条门」 | vibe-idea/SKILL.md L123-133 |
| interaction.md | vibe-interaction 的「完成判定 7 条」 | vibe-interaction/SKILL.md L461-471 |
| architecture.md | vibe-architecture 的「完成判定 = 对齐矩阵全绿」 | vibe-architecture/SKILL.md L251-256 |
| design.md | vibe-design 的「完成判定 3 条」 | vibe-design/SKILL.md L126-132 |
| prototypes/ | vibe-prototype 的「放行门 + 三铁律」 | vibe-prototype/SKILL.md L250-252 |
| 代码 | vibe-implement 的「完成判定 Gate」 | vibe-implement/SKILL.md L139-147 |

**重要区分**：
- vibe-* skill 在产出时**应该**自己跑过完成判定（这是它的职责）
- 检查子代理的职责是**独立验证"完成判定是否真的满足了"**——执行 Agent 可能糊弄、可能漏项、可能把"差不多"当成"完成"
- 检查子代理读同一份完成判定清单，但站在独立视角重新核销每一项

**"逐项核销"与"重跑 lint"的区别**：
- **重跑 lint**（vibe-* skill 的职责）：调用工具命令（如 `npx @google/design.md lint design.md`），看退出码和 error 数。这是工具自动检查。
- **逐项核销**（检查子代理的职责）：读完成判定清单的每一条（如 design.md 完成判定 3 条），对每条引用交付物具体段落/行号作为证据，判断是否真满足。这是基于内容的独立审查。
- 两者不重叠：lint 0 error 不等于完成判定满足（lint 不查"用户已确认"这条）；检查子代理不调用 lint 命令（那是 vibe-* skill 的事），但可以**要求执行 Agent 出示 lint 输出**作为证据的一部分。

**与 SKILL.md §6.4 现有映射表的关系**：
- §6.4 现有映射表维度：**里程碑 → vibe-* skill**（M1→vibe-idea, M2→vibe-interaction...）
- 本表（§3.3）维度：**交付物 → 检查标准来源**（idea.md→vibe-idea L123-133...）
- 两者互补不冲突，各自维护：§6.4 表回答"这个里程碑调用哪个 skill"，本表回答"这个交付物按什么标准检查"
```

#### 3.4 检查子代理 prompt 模板

```markdown
## 检查子代理 prompt 模板

分派时 prompt 必须自包含。

\`\`\`markdown
<objective>
独立审查 [交付物路径] 的内容质量，确认其满足完成判定。你只读不写，不修改交付物。
</objective>

<context>
- 项目：[项目名]
- 当前里程碑：Mx - [名称]
- 交付物：[路径]
- 交付物类型：[PROJECT.md / idea.md / architecture.md / ...]
- 写交付物的执行 Agent：[Agent ID 或描述]
- 下游消费者：主协调 Agent
</context>

<files_to_read>
- `[交付物路径]` — 被审查的对象
- `[对应 skill 的 SKILL.md 完成判定章节]` — 检查标准来源（精确到行号）
- `.planning/PROJECT.md` — 项目意图参考（仅当交付物不是 PROJECT.md 本身时）
- `.planning/REQUIREMENTS.md` — 需求清单参考（仅当交付物涉及需求时）
</files_to_read>

<standard>
完成判定来源：[skill 名] 的「[完成判定章节名]」（[SKILL.md 路径] L[行号]）

逐项核销该完成判定的每一条，对每条给出：
- [x] 满足 — 附证据（引用交付物的具体段落/行号）
- [ ] 未满足 — 说明缺口
- [N/A] 不适用 — 说明为何不适用
</standard>

<forbidden>
- 不修改交付物（只读）
- 不做全局一致性审计（那是主协调 Agent 的事）
- 不重跑 vibe-* skill 的 lint（那是 vibe-* skill 的职责）
- 不扩大检查范围到完成判定之外的项
</forbidden>

<verdict_format>
\`\`\`markdown
## Review Result

**Verdict:** PASS / NEEDS_REVISION

### Checked Against
- 完成判定来源：[skill 名] L[行号]
- 共 N 条，满足 X 条，未满足 Y 条，N/A Z 条

### Item-by-Item
- [x] 条目 1：满足。证据：[引用]
- [ ] 条目 3：未满足。缺口：[说明]
- [N/A] 条目 5：不适用。理由：[说明]

### Required Fixes（仅 NEEDS_REVISION 时）
- [具体可执行的修改项 1，例如："REQ-03 '支持管理' 不可验收，改为'管理员能在 /admin 创建/删除用户'"]
- [具体可执行的修改项 2]

### Next State
- PASS → 交付物可进入下一阶段
- NEEDS_REVISION → 交回写交付物的执行 Agent 修改，修改后重新派检查子代理
\`\`\`
</verdict_format>
\`\`\`

**硬规则**：
1. 检查子代理只读不写，不修改交付物
2. verdict 只有 PASS / NEEDS_REVISION 两态，不引入 BLOCKED
3. NEEDS_REVISION 必须给具体可执行的修改项，不能只说"质量不行"
4. 检查子代理不能宣布里程碑完成（沿用 execution-agent-protocol.md 硬规则 3）
5. 修改后的交付物必须重新派检查子代理，不能"改完就算"
```

#### 3.5 检查循环上限

```markdown
## 检查循环上限

同一交付物的检查-修改循环不超过 **3 轮**。

- 第 1 轮 NEEDS_REVISION → 执行 Agent 修改 → 第 2 轮检查
- 第 2 轮 NEEDS_REVISION → 执行 Agent 修改 → 第 3 轮检查
- 第 3 轮仍 NEEDS_REVISION → 升级到主协调 Agent：判断是标准问题、执行 Agent 能力问题、还是需求本身有误
  - 标准问题 → 修订完成判定（罕见）
  - 能力问题 → 换执行 Agent 或主协调 Agent 接手
  - 需求问题 → 回 §4 需求门禁或 §12 计划修订

**禁止**：无限循环检查-修改。3 轮是硬上限。

**适用范围**：3 轮上限对 A 模式和 B 模式同样生效。A 模式下"修改方"是主协调 Agent，B 模式下"修改方"是执行 Agent；无论谁改，检查-修改循环都受 3 轮约束。
```

#### 3.6 检查报告存档

```markdown
## 检查报告存档

每次检查子代理的 verdict 报告存入 `.planning/agents/`，命名格式：
`YYYYMMDD-HHMM-review-[交付物名].md`

例如：
- `20260725-1430-review-PROJECT.md.md`
- `20260725-1500-review-idea.md.md`

存档目的：
1. 审计追溯——里程碑门禁可回查每个交付物是否真的过检
2. 防回退——下一阶段发现问题时，可回看上一阶段检查报告定位
3. 防糊弄——执行 Agent 知道检查会留档，不会草率产出
```

#### 3.7 SKILL.md 主文件 §6 和 §7 的咬合修改

**§6.4 里程碑与执行流水线咬合**：在现有映射表后追加一段。

```markdown
**检查子代理咬合**：

当里程碑对应某个 vibe-* 阶段时，执行 Agent 产出交付物后，主协调 Agent **必须立即派检查子代理**（详见 `references/review-agent-protocol.md`）。检查子代理独立审查交付物内容是否满足该 skill 的完成判定。

执行 Agent 不能审查自己的产物（写验分离硬约束）。检查子代理只读不写，只产出 PASS / NEEDS_REVISION verdict 和修改项清单。

检查未 PASS 前，交付物不能进入下一阶段，里程碑不能宣布完成。
```

**§7 验证门禁**：Milestone Audit Gate 增加 1 条前置。

```markdown
**新增前置检查（Milestone Audit Gate）**：

- [ ] 该里程碑所有交付物的检查子代理报告均为 PASS（查 `.planning/agents/` 下对应 review 报告）
- [ ] 没有"未派检查子代理"的交付物
- [ ] 没有"NEEDS_REVISION 未闭环"的交付物

任一不满足 → Milestone Audit Gate 直接判 NEEDS_REVISION，不允许通过。
```

**验收**：
- `references/review-agent-protocol.md` 创建完成，含 3.1-3.6 全部章节
- SKILL.md §6.4 追加咬合段
- SKILL.md §7 Milestone Audit Gate 增加前置检查
- SKILL.md 参考文件表追加 `review-agent-protocol.md` 条目

---

### 改动 #4：execution-agent-protocol.md 第 6 条升级

**目标**：把"应尽量分离"从软约束升级为硬规则。

**当前（第 6 条）**：

```markdown
6. 写代码和验证应尽量分离：实现 Agent 完成后，用验证/审查 Agent 挑刺。
```

**改为**：

```markdown
6. **写验分离硬约束**：写交付物的执行 Agent 和审查该交付物的检查子代理不能是同一个。每个交付物产出后必须派独立检查子代理审查（详见 `review-agent-protocol.md`）。禁止自写自查。
```

**验收**：`execution-agent-protocol.md` 第 6 条更新；`SKILL.md` §6.3 分派硬规则同步引用 review-agent-protocol.md。

---

### 改动 #5：§7 验证门禁——Milestone Audit Gate 增加检查子代理前置

（这部分内容已并入改动 #3 的 §3.7，此处不重复。实施时作为改动 #3 的一部分执行。）

---

## 4. 工作流：A/B 混合（已与用户对齐）

### 4.1 A 模式：主协调 Agent 写交付物

**适用**：规划类文档（PROJECT.md / REQUIREMENTS.md / ROADMAP.md），因为需要和用户多轮对话确认。

```text
主协调 Agent：
  1. 与用户闲聊（§4.0）→ 收集想法、动机、约束
  2. 进入访谈三轮（§4.1）→ 每轮产出 PROJECT.md 草稿章节
  3. 写完 PROJECT.md
  4. 派检查子代理审 PROJECT.md（按 §4.2 需求门禁清单）
  5. 收到 NEEDS_REVISION → 主协调 Agent 自己改 → 再派检查子代理
  6. 收到 PASS → 进入下一交付物（REQUIREMENTS.md）
  7. 重复 3-6 直到三件套全 PASS
```

### 4.2 B 模式：派执行 Agent 写交付物

**适用**：设计/实现类文档（idea.md / interaction.md / architecture.md / design.md / prototypes/ / 代码），边界清晰适合委派。

```text
主协调 Agent：
  1. 把访谈结论和上游产物打包成 context
  2. 派执行 Agent：「调用 vibe-idea，按其方法论产出 idea.md，allowed_changes=idea.md，acceptance_criteria 引用 vibe-idea 完成判定 L123-133」
  3. 执行 Agent 返回 idea.md 和自检报告
  4. 派检查子代理审 idea.md（按 vibe-idea 完成判定 L123-133）
  5. 收到 NEEDS_REVISION → 把修改项交回执行 Agent 改 → 再派检查子代理
  6. 收到 PASS → 进入下一阶段（vibe-interaction）
  7. 重复直到代码交付完成
```

### 4.3 A/B 选择规则

```markdown
| 交付物 | 模式 | 理由 |
|--------|------|------|
| PROJECT.md | A | 需和用户对话确认意图 |
| REQUIREMENTS.md | A | 需和用户对话确认优先级 |
| ROADMAP.md | A | 需和用户对话确认里程碑切分 |
| idea.md | B | 边界清晰，vibe-idea 方法论已定义 |
| interaction.md | B | 同上 |
| architecture.md | B | 同上 |
| design.md | B | 同上 |
| prototypes/ | B | 同上 |
| 代码 | B | 同上 |
```

**例外**：如果用户明确说"PROJECT.md 你自己写，不用问我"，可降级为 B 模式（但仍需派检查子代理）。反之，如果用户坚持要参与 idea.md 的撰写，可升级为 A 模式。模式选择服务于用户参与度，不僵化。

---

## 5. 数据流

```text
[用户]
  │
  ▼
[闲聊阶段 §4.0] ←── 多轮，无结构
  │
  ▼
[访谈三轮 §4.1] ←── 每轮有产出物
  │
  ▼
[主协调 Agent 写 PROJECT.md]（A 模式）
  │
  ▼
[检查子代理 审 PROJECT.md] ──NEEDS_REVISION──→ [主协调 Agent 改]
  │ PASS                                              │
  ▼                                                   └──→ [再审]
[主协调 Agent 写 REQUIREMENTS.md]（A 模式）
  │
  ▼
[检查子代理 审 REQUIREMENTS.md] ──NEEDS_REVISION──→ [主协调 Agent 改]
  │ PASS                                              │
  ▼                                                   └──→ [再审]
[主协调 Agent 写 ROADMAP.md]（A 模式）
  │
  ▼
[检查子代理 审 ROADMAP.md] ──NEEDS_REVISION──→ [主协调 Agent 改]
  │ PASS                                              │
  ▼                                                   └──→ [再审]
[里程碑 M1：规划完成]
  │
  ▼
[派执行 Agent 调用 vibe-idea 产出 idea.md]（B 模式）
  │
  ▼
[检查子代理 审 idea.md] ──NEEDS_REVISION──→ [执行 Agent 改]
  │ PASS                                       │
  ▼                                            └──→ [再审]
[里程碑 M2：立项完成]
  │
  ▼
... (interaction → architecture → design → prototype → implement)
```

---

## 6. 文件改动清单

### 6.1 新增文件

| 文件 | 用途 |
|------|------|
| `references/review-agent-protocol.md` | 检查子代理协议（核心新增） |

### 6.2 修改文件

| 文件 | 改动 |
|------|------|
| `SKILL.md` | 修 7 处断链（改动 #1）；§4 全文重写（改动 #2）；§6.4 追加咬合段（改动 #3.7）；§7 增加前置检查（改动 #3.7）；§6.3 硬规则引用更新（改动 #4）；参考文件表追加 review-agent-protocol.md |
| `references/execution-agent-protocol.md` | 第 6 条升级为硬规则（改动 #4） |
| `references/verification-gates.md` | Milestone Audit Gate 增加检查子代理前置（改动 #5） |

### 6.3 不改动的文件

| 文件 | 理由 |
|------|------|
| `state-machine.md` | 状态机不变 |
| `harness-adaptation.md` | 三平台适配不变 |
| `templates.md` / `goals-template.md` | 模板不变 |
| `worker-report-template.md` | worker 报告格式不变（检查子代理有自己的报告格式） |
| `dashboard-rules.md` / `progress-dashboard-template.html` | dashboard 不变（检查报告存 agents/ 目录，dashboard 只展示里程碑级状态） |
| `worked-example.md` | 现有示例不变（可作为对照） |

---

## 7. 边界与不做什么

1. **不重写 superpowers 三件套**：分派协议、验证逻辑、TDD 流程保持薄封装
2. **检查子代理不做全局审计**：只审交付物内容，不做跨产物一致性、盲区假设探测
3. **不引入 BLOCKED verdict**：检查子代理只有 PASS / NEEDS_REVISION，避免卡死
4. **不无限检查**：同一交付物检查-修改循环上限 3 轮
5. **不重跑 vibe-* skill 的 lint**：那是 vibe-* skill 的职责
6. **不改 worked-example.md**：现有示例作为对照保留，新机制不回填旧示例

---

## 8. 风险与权衡

| 风险 | 权衡 | 缓解 |
|------|------|------|
| **检查子代理与 vibe-* skill 自检冗余** | vibe-* skill 产出时应自检完成判定，检查子代理再查一遍可能重复 | 检查子代理明确职责为"独立验证完成判定是否真的满足了"，而非复读 lint。执行 Agent 知道会被独立审查，降低糊弄概率 |
| **项目变慢（最细颗粒度）** | 每交付物必查会增加项目周期 | 用户明确选择"不要速度只要质量"。检查循环上限 3 轮防止无限拖长 |
| **检查标准来源散落** | 完成判定在 6 个 vibe-* skill 里各有行号，检查子代理 prompt 要精确引用 | 在 `review-agent-protocol.md` 里建标准来源映射表（§3.3），单点维护 |
| **A/B 混合工作流复杂度** | 主协调 Agent 要判断何时用 A 何时用 B | §4.3 选择规则表 + 例外说明，规则清晰可执行 |
| **执行 Agent 糊弄检查** | 执行 Agent 知道完成判定，可能写产物时"对答案" | 检查子代理要求"附证据（引用具体段落/行号）"，迫使真实核销而非走过场 |

---

## 9. 验收标准（本 spec 的完成定义）

本 spec 实施完成后，以下全部满足才算完成：

- [ ] 改动 #1：`grep -n "harness-codex\|harness-standard\|harness-minimal\|audit-checklist" SKILL.md` 输出为空
- [ ] 改动 #2：§4 全文重写为可勾选清单颗粒度，含 §4.0 闲聊 / §4.1 访谈三轮（每轮产出物+验收点）/ §4.2 需求门禁（可勾选）/ §4.3 路线图门禁
- [ ] 改动 #3：`references/review-agent-protocol.md` 创建，含角色定义/触发时机/标准来源/prompt 模板/verdict 格式/循环上限/存档规则全部章节
- [ ] 改动 #3：SKILL.md §6.4 追加检查子代理咬合段，§7 增加 Milestone Audit Gate 前置检查
- [ ] 改动 #4：`execution-agent-protocol.md` 第 6 条升级为硬规则，SKILL.md §6.3 同步引用
- [ ] 改动 #5：`verification-gates.md` Milestone Audit Gate 增加检查子代理前置
- [ ] SKILL.md 参考文件表追加 `review-agent-protocol.md`
- [ ] 派一个独立检查子代理审查本次改动（吃自己的狗粮——用新机制验证新机制）

---

## 10. 后续步骤

本 spec 经用户审阅通过后，转入 `writing-plans` skill 生成实施计划。
