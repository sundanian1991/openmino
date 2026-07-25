# orchestrate-projects 重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 给 `orchestrate-projects` skill 叠加「每交付物必查」机制，并修复 4 类断链、升级需求门禁颗粒度、硬化写验分离约束。

**Architecture:** 不重写 superpowers 三件套，只在上层叠加：新增 `review-agent-protocol.md` 定义检查子代理协议；修改 SKILL.md 的 §4/§6/§7/参考文件表；修改 `execution-agent-protocol.md` 第 6 条；修改 `verification-gates.md` Milestone Audit Gate。所有检查标准从现有 vibe-* skill 的完成判定继承，不重造轮子。

**Tech Stack:** Markdown（skill 是纯文本，无代码）

**Spec:** `docs/superpowers/specs/2026-07-25-orchestrate-projects-redesign-design.md`

**目标 skill 根目录:** `/Users/sundanian/.agents/skills/orchestrate-projects/`

---

## 文件结构

### 新增文件

| 文件 | 职责 |
|------|------|
| `references/review-agent-protocol.md` | 检查子代理协议：角色定义、触发时机、检查标准来源、prompt 模板、verdict 格式、循环上限、存档规则 |

### 修改文件

| 文件 | 改动范围 |
|------|----------|
| `SKILL.md` | 7 处断链（L104/106/108/217/314/324/325/326）；§4 整段重写（L159-202）；§6.4 追加咬合段（L267 后）；§6.3 硬规则引用更新（L256）；§7 增加前置检查（L290 后）；参考文件表追加（L467） |
| `references/execution-agent-protocol.md` | 第 6 条升级（L94） |
| `references/verification-gates.md` | Milestone Audit Gate 增加前置（L94 后） |

### 不改动

`state-machine.md` / `harness-adaptation.md` / `templates.md` / `goals-template.md` / `worker-report-template.md` / `dashboard-rules.md` / `progress-dashboard-template.html` / `worked-example.md`

---

## Task 1: 修复 7 处断链（改动 #1）

**Files:**
- Modify: `/Users/sundanian/.agents/skills/orchestrate-projects/SKILL.md`（L104, L106, L108, L217, L314, L324, L325, L326）

**目标：** 消除所有指向不存在文件的引用。

- [ ] **Step 1.1: 修复 §2 Harness 适配的三处断链（L104/106/108）**

定位 L104 这一行（在代码块内）：

```text
   │  └─ 并发模型 = 执行 Agent(worker thread)，读 references/harness-codex.md
```

改为：

```text
   │  └─ 并发模型 = 执行 Agent(worker thread)，读 references/harness-adaptation.md#codex
```

定位 L106：

```text
   │  └─ 并发模型 = 执行 Agent(subagent)，读 references/harness-standard.md
```

改为：

```text
   │  └─ 并发模型 = 执行 Agent(subagent)，读 references/harness-adaptation.md#standard
```

定位 L108：

```text
      └─ 并发模型 = 串行，读 references/harness-minimal.md
```

改为：

```text
      └─ 并发模型 = 串行，读 references/harness-adaptation.md#最小环境
```

- [ ] **Step 1.2: 修复 §5 Goal 模式的断链（L217）**

定位 L217：

```text
Codex 可额外使用 `/goal`，见 `references/harness-codex.md`。
```

改为：

```text
Codex 可额外使用 `/goal`，见 `references/harness-adaptation.md#codex`。
```

- [ ] **Step 1.3: 修复 §7 验证门禁的断链（L314）**

定位 L314：

```text
详见 `references/verification-gates.md` 和 `references/audit-checklist.md`。
```

改为：

```text
详见 `references/verification-gates.md`（含里程碑逐项审计清单）。
```

- [ ] **Step 1.4: 修复 §8 本地环境测试的三处断链（L324/325/326）**

定位 L324-326 的表格三行：

```text
| Codex Computer Use | 本地验证 Agent | `references/harness-codex.md` |
| playwright / agent-browser / webapp-testing | 调用对应工具验证 | `references/harness-standard.md` |
| 无以上工具 | 列出步骤让用户手动验证 | `references/harness-minimal.md` |
```

改为：

```text
| Codex Computer Use | 本地验证 Agent | `references/harness-adaptation.md#codex` |
| playwright / agent-browser / webapp-testing | 调用对应工具验证 | `references/harness-adaptation.md#standard` |
| 无以上工具 | 列出步骤让用户手动验证 | `references/harness-adaptation.md#最小环境` |
```

- [ ] **Step 1.5: 验证断链已清零**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && grep -n "harness-codex\|harness-standard\|harness-minimal\|audit-checklist" SKILL.md`

Expected: 输出为空（无任何匹配）

- [ ] **Step 1.6: Commit**

```bash
cd /Users/sundanian/.agents/skills/orchestrate-projects
git add SKILL.md
git commit -m "fix(orchestrate-projects): 修复 4 类共 7 处 reference 断链"
```

---

## Task 2: 重写 §4 初始规划（改动 #2）

**Files:**
- Modify: `/Users/sundanian/.agents/skills/orchestrate-projects/SKILL.md`（L159-202 整段替换）

**目标：** 新增 §4.0 闲聊阶段；§4.1 访谈每轮加产出物+验收点；§4.2 需求门禁改为可勾选清单（对齐 §7 颗粒度）；§4.3 路线图门禁保留并补可勾选格式。

- [ ] **Step 2.1: 整段替换 §4（L159-202）**

用 Edit 工具，old_string 是 L159-202 的完整内容（从 `## 4. 初始规划：发现 → 需求 → 路线图` 到 `.planning/dashboard.html` 已生成` 之后的那一行 `---` 之前）。

new_string：

````markdown
## 4. 初始规划：发现 → 需求 → 路线图

不要从实现开始。以对话方式启动，直到能写出清晰项目文件。

规划阶段分四步：闲聊（§4.0）→ 访谈三轮（§4.1）→ 需求门禁（§4.2）→ 路线图门禁（§4.3）。每步都有明确产出物和验收点，不空转。

### 4.0 闲聊阶段（访谈前）

在正式访谈之前，先进入无结构的闲聊阶段。目的是把想法充分展开，不要急着收敛成需求。

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
- 或 AI 判断信息已经充分（想法、动机、约束、边界都已浮出水面），主动提议："我听到的大概是 X / Y / Z，要不要开始整理成项目文件？"

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
- [ ] NEEDS_REVISION 必须列出具体修改项（如："REQ-03 不可验收：'支持管理'改为'管理员能在 /admin 创建/删除用户'"）
- [ ] PASS 后才能进入 §4.3 路线图门禁

> 规划类文档（PROJECT/REQUIREMENTS/ROADMAP）的检查由独立检查子代理执行，详见 `references/review-agent-protocol.md`。主协调 Agent 写完后必须派检查子代理，不能自写自查。

### 4.3 路线图门禁（进入执行前的硬门禁）

进入执行前必须逐项打勾：

**存在性**
- [ ] `ROADMAP.md` 已创建，且非空模板
- [ ] `STATE.md` 标记活跃里程碑
- [ ] `.planning/dashboard.html` 已生成

**覆盖闭合（双向校验，详见 verification-gates.md 的 Roadmap Coverage Gate）**
- [ ] no missing：每个 v1 Requirement ID 至少被一个里程碑覆盖
- [ ] no orphan：每个里程碑覆盖至少一个 Requirement ID（没有空里程碑）
- [ ] 每个里程碑有证据清单

**粒度**
- [ ] 每个里程碑切到 1-3 天可验收的粒度
- [ ] 产品项目：一个里程碑 = 一个 vibe-* 阶段（不塞多个阶段）

**输出**
- [ ] 门禁 verdict：PASS / NEEDS_REVISION
- [ ] PASS 后激活第一个里程碑，进入 §6 执行 Agent 分派
````

- [ ] **Step 2.2: 验证 §4 结构正确**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && grep -n "^## 4\.\|^### 4\." SKILL.md`

Expected: 输出包含 `## 4. 初始规划：发现 → 需求 → 路线图`、`### 4.0 闲聊阶段（访谈前）`、`### 4.1 访谈顺序`、`### 4.2 需求门禁`、`### 4.3 路线图门禁`

- [ ] **Step 2.3: Commit**

```bash
cd /Users/sundanian/.agents/skills/orchestrate-projects
git add SKILL.md
git commit -m "refactor(orchestrate-projects): §4 升级——闲聊阶段+访谈产出物+可勾选需求门禁"
```

---

## Task 3: 新增 review-agent-protocol.md（改动 #3 核心）

**Files:**
- Create: `/Users/sundanian/.agents/skills/orchestrate-projects/references/review-agent-protocol.md`

**目标：** 定义检查子代理协议。这是本次重构的核心新增。

- [ ] **Step 3.1: 创建 review-agent-protocol.md**

完整文件内容：

````markdown
# 检查子代理协议（Review Agent Protocol）

> 每个交付物产出后必须经过独立检查子代理审查，确认内容质量满足完成判定。不在审查通过前宣布完成。

---

## 角色定义

- **检查子代理（Review Agent）**：被主协调 Agent 派出去审查某个交付物**内容质量**的独立子代理。
- **职责边界（严格）**：
  - 只审"这个交付物的完成判定是否满足"
  - 只审"内容本身是否扎实、清楚、到位"
  - 不做全局一致性审计、不做跨链路检查、不做盲区假设探测
  - 不重跑 vibe-* skill 自己的 lint（那是 vibe-* skill 的职责）

### 写验分离硬约束

- 写交付物的执行 Agent 和检查子代理**不能是同一个**。
- 禁止"自写自查"——执行 Agent 不能审查自己刚写的产物。
- 检查子代理**只读不写**：不修改交付物，只产出 verdict 和修改项清单。

---

## 何时触发

**硬规则：每个交付物产出后，必须立即派检查子代理。**

### 触发清单（产品开发项目）

| 阶段 | 交付物 | 触发时机 |
|------|--------|----------|
| 规划 | PROJECT.md | 主协调 Agent 写完后（A 模式） |
| 规划 | REQUIREMENTS.md | 主协调 Agent 写完后（A 模式） |
| 规划 | ROADMAP.md | 主协调 Agent 写完后（A 模式） |
| 立项 | idea.md | 执行 Agent 调用 vibe-idea 产出后（B 模式） |
| 交互 | interaction.md | 执行 Agent 调用 vibe-interaction 产出后（B 模式） |
| 技术骨架 | architecture.md | 执行 Agent 调用 vibe-architecture 产出后（B 模式） |
| 视觉 | design.md | 执行 Agent 调用 vibe-design 产出后（B 模式） |
| 原型 | prototypes/ | 执行 Agent 调用 vibe-prototype 产出后（B 模式） |
| 实现 | 代码 | 执行 Agent 调用 vibe-implement 产出后（B 模式） |

### 不允许的捷径

- "这个交付物很简单，跳过检查" → 不允许
- "上一个里程碑已经查过类似的，这次免了" → 不允许
- "执行 Agent 说自己测过了" → 仍必须派独立检查子代理

---

## 检查标准来源

检查子代理不重造标准，从对应 skill 的"完成判定"继承。

### 标准来源映射表

| 交付物 | 检查标准来源 | 来源定位 |
|--------|------------|----------|
| PROJECT.md | §4.2 需求门禁清单（本 skill） | SKILL.md §4.2 |
| REQUIREMENTS.md | §4.2 需求门禁清单（本 skill） | SKILL.md §4.2 |
| ROADMAP.md | §4.3 路线图门禁 + verification-gates.md 的 Roadmap Coverage Gate | SKILL.md §4.3 + verification-gates.md |
| idea.md | vibe-idea 的「Idea 就绪检查 7 条门」 | vibe-idea/SKILL.md §5（Idea 就绪检查） |
| interaction.md | vibe-interaction 的「完成判定 7 条」 | vibe-interaction/SKILL.md 完成判定章节 |
| architecture.md | vibe-architecture 的「对齐矩阵全绿」 | vibe-architecture/SKILL.md 完成判定章节 |
| design.md | vibe-design 的「完成判定 3 条」 | vibe-design/SKILL.md 完成判定章节 |
| prototypes/ | vibe-prototype 的「放行门 + 三铁律」 | vibe-prototype/SKILL.md 放行门章节 |
| 代码 | vibe-implement 的「完成判定 Gate」 | vibe-implement/SKILL.md 完成判定 Gate 章节 |

### 重要区分

- vibe-* skill 在产出时**应该**自己跑过完成判定（这是它的职责）。
- 检查子代理的职责是**独立验证"完成判定是否真的满足了"**——执行 Agent 可能糊弄、可能漏项、可能把"差不多"当成"完成"。
- 检查子代理读同一份完成判定清单，但站在独立视角重新核销每一项。

### "逐项核销"与"重跑 lint"的区别

- **重跑 lint**（vibe-* skill 的职责）：调用工具命令（如 `npx @google/design.md lint design.md`），看退出码和 error 数。这是工具自动检查。
- **逐项核销**（检查子代理的职责）：读完成判定清单的每一条，对每条引用交付物具体段落/行号作为证据，判断是否真满足。这是基于内容的独立审查。
- 两者不重叠：lint 0 error 不等于完成判定满足（lint 不查"用户已确认"这条）；检查子代理不调用 lint 命令，但可以**要求执行 Agent 出示 lint 输出**作为证据的一部分。

---

## 检查子代理 prompt 模板

分派时 prompt 必须自包含。

```markdown
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
- `[对应 skill 的 SKILL.md 完成判定章节]` — 检查标准来源（精确到章节）
- `.planning/PROJECT.md` — 项目意图参考（仅当交付物不是 PROJECT.md 本身时）
- `.planning/REQUIREMENTS.md` — 需求清单参考（仅当交付物涉及需求时）
</files_to_read>

<standard>
完成判定来源：[skill 名] 的「[完成判定章节名]」（[SKILL.md 路径] [章节定位]）

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
## Review Result

**Verdict:** PASS / NEEDS_REVISION

### Checked Against
- 完成判定来源：[skill 名] [章节定位]
- 共 N 条，满足 X 条，未满足 Y 条，N/A Z 条

### Item-by-Item
- [x] 条目 1：满足。证据：[引用]
- [ ] 条目 3：未满足。缺口：[说明]
- [N/A] 条目 5：不适用。理由：[说明]

### Required Fixes（仅 NEEDS_REVISION 时）
- [具体可执行的修改项 1]
- [具体可执行的修改项 2]

### Next State
- PASS → 交付物可进入下一阶段
- NEEDS_REVISION → 交回写交付物的执行 Agent 修改，修改后重新派检查子代理
</verdict_format>
```

---

## 硬规则

1. 检查子代理只读不写，不修改交付物。
2. verdict 只有 PASS / NEEDS_REVISION 两态，不引入 BLOCKED。
3. NEEDS_REVISION 必须给具体可执行的修改项，不能只说"质量不行"。
4. 检查子代理不能宣布里程碑完成（沿用 execution-agent-protocol.md 硬规则 3）。
5. 修改后的交付物必须重新派检查子代理，不能"改完就算"。

---

## 检查循环上限

同一交付物的检查-修改循环不超过 **3 轮**。

- 第 1 轮 NEEDS_REVISION → 修改方改 → 第 2 轮检查
- 第 2 轮 NEEDS_REVISION → 修改方改 → 第 3 轮检查
- 第 3 轮仍 NEEDS_REVISION → 升级到主协调 Agent：判断是标准问题、能力问题、还是需求本身有误
  - 标准问题 → 修订完成判定（罕见）
  - 能力问题 → 换执行 Agent 或主协调 Agent 接手
  - 需求问题 → 回 SKILL.md §4 需求门禁或 §12 计划修订

**适用范围**：3 轮上限对 A 模式和 B 模式同样生效。A 模式下"修改方"是主协调 Agent，B 模式下"修改方"是执行 Agent；无论谁改，检查-修改循环都受 3 轮约束。

**禁止**：无限循环检查-修改。3 轮是硬上限。

---

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

---

## 与现有协议的咬合

### 与 execution-agent-protocol.md 的咬合

- execution-agent-protocol.md 硬规则第 6 条（写验分离硬约束）是本协议的前置约束。
- 检查子代理是一种特殊的执行 Agent，但只读不写，因此不受"allowed_changes"约束，但仍遵守"不派子代理""不能宣布里程碑完成"等通用硬规则。

### 与 verification-gates.md 的咬合

- Milestone Audit Gate 增加 1 条前置：该里程碑所有交付物的检查子代理报告必须全 PASS。
- 没有"未派检查子代理"的交付物；没有"NEEDS_REVISION 未闭环"的交付物。
- 任一不满足 → Milestone Audit Gate 直接判 NEEDS_REVISION。

### 与 SKILL.md §6.4 里程碑映射表的咬合

- §6.4 现有映射表维度：**里程碑 → vibe-* skill**（M1→vibe-idea, M2→vibe-interaction...）
- 本文件「标准来源映射表」维度：**交付物 → 检查标准来源**（idea.md→vibe-idea 完成判定...）
- 两者互补不冲突：§6.4 表回答"这个里程碑调用哪个 skill"，本表回答"这个交付物按什么标准检查"。
````

- [ ] **Step 3.2: 验证文件已创建且结构完整**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && grep -n "^## " references/review-agent-protocol.md`

Expected: 输出包含 `角色定义`、`何时触发`、`检查标准来源`、`检查子代理 prompt 模板`、`硬规则`、`检查循环上限`、`检查报告存档`、`与现有协议的咬合`

- [ ] **Step 3.3: Commit**

```bash
cd /Users/sundanian/.agents/skills/orchestrate-projects
git add references/review-agent-protocol.md
git commit -m "feat(orchestrate-projects): 新增 review-agent-protocol.md——检查子代理协议"
```

---

## Task 4: 修改 execution-agent-protocol.md 第 6 条（改动 #4）

**Files:**
- Modify: `/Users/sundanian/.agents/skills/orchestrate-projects/references/execution-agent-protocol.md`（L94）

**目标：** 把"应尽量分离"从软约束升级为硬规则。

- [ ] **Step 4.1: 替换第 6 条**

定位 L94：

```markdown
6. 写代码和验证应尽量分离：实现 Agent 完成后，用验证/审查 Agent 挑刺。
```

改为：

```markdown
6. **写验分离硬约束**：写交付物的执行 Agent 和审查该交付物的检查子代理不能是同一个。每个交付物产出后必须派独立检查子代理审查（详见 `review-agent-protocol.md`）。禁止自写自查。
```

- [ ] **Step 4.2: Commit**

```bash
cd /Users/sundanian/.agents/skills/orchestrate-projects
git add references/execution-agent-protocol.md
git commit -m "refactor(orchestrate-projects): 写验分离从软约束升级为硬规则"
```

---

## Task 5: 修改 verification-gates.md Milestone Audit Gate（改动 #5）

**Files:**
- Modify: `/Users/sundanian/.agents/skills/orchestrate-projects/references/verification-gates.md`（L107 逐项审计清单内）

**目标：** 在 Milestone Audit Gate 的逐项审计清单中，增加检查子代理前置检查。

- [ ] **Step 5.1: 在"完成度"分组前插入新分组**

定位 L109-110（"审计时逐项打勾，不全绿则不 PASS："之后、"**完成度**"之前）：

```markdown
审计时逐项打勾，不全绿则不 PASS：

**完成度**
```

在"审计时逐项打勾，不全绿则不 PASS："和"**完成度**"之间插入新分组：

```markdown
审计时逐项打勾，不全绿则不 PASS：

**检查子代理前置（硬门禁）**
- [ ] 该里程碑所有交付物的检查子代理报告均为 PASS（查 `.planning/agents/` 下对应 review 报告）
- [ ] 没有"未派检查子代理"的交付物
- [ ] 没有"NEEDS_REVISION 未闭环"的交付物（所有 NEEDS_REVISION 已改并重审 PASS）

> 任一不满足 → Milestone Audit Gate 直接判 NEEDS_REVISION，不允许通过。详见 `review-agent-protocol.md`。

**完成度**
```

- [ ] **Step 5.2: 验证插入位置正确**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && grep -n "检查子代理前置\|完成度" references/verification-gates.md`

Expected: `检查子代理前置` 出现在 `完成度` 之前

- [ ] **Step 5.3: Commit**

```bash
cd /Users/sundanian/.agents/skills/orchestrate-projects
git add references/verification-gates.md
git commit -m "feat(orchestrate-projects): Milestone Audit Gate 增加检查子代理前置"
```

---

## Task 6: 修改 SKILL.md §6.3 / §6.4 / §7 / 参考文件表

**Files:**
- Modify: `/Users/sundanian/.agents/skills/orchestrate-projects/SKILL.md`（§6.3、§6.4、§7、参考文件表）

**前置依赖：** 必须先完成 Task 1（修断链）。Task 6.3 依赖 Task 1 已修改 L314 的结果。

**目标：** 把检查子代理机制咬合到主文件相应章节。

> **定位原则**：本 task 各步骤用"章节锚点 + 现有内容片段"定位，不依赖固定行号（因为 Task 1-5 改动后行号会漂移）。执行时先 grep 章节标题定位，再用 old_string 片段精确匹配。

- [ ] **Step 6.1: §6.3 分派硬规则引用更新**

定位 §6.3「分派硬规则」章节的最后一个列表项。当前内容是：

```markdown
- Codex 环境执行 Agent 完成后必须 `close_agent`
```

在其后追加一条：

```markdown
- Codex 环境执行 Agent 完成后必须 `close_agent`
- 每个交付物产出后必须派独立检查子代理审查（写验分离硬约束，详见 `references/review-agent-protocol.md`）
```

- [ ] **Step 6.2: §6.4 末尾追加检查子代理咬合段**

定位 §6.4 末尾的「粒度建议」引用块（`> **粒度建议**：一个里程碑 = 一个 vibe-* 阶段...`）。在该引用块之后追加：

```markdown
**非产品开发项目**（基础设施迁移、数据管道、DevOps 自动化等）不映射到 vibe-*，worker 按通用任务分派协议执行。

> **粒度建议**：一个里程碑 = 一个 vibe-* 阶段。不要把多个阶段塞进一个里程碑（如"做完交互+技术骨架+视觉"），否则验证门禁无法按阶段逐一验收，阻塞难定位。里程碑切到 1-3 天可验收的粒度。
```

在"粒度建议"引用块之后追加：

```markdown
**检查子代理咬合**：

当里程碑对应某个 vibe-* 阶段时，执行 Agent 产出交付物后，主协调 Agent **必须立即派检查子代理**（详见 `references/review-agent-protocol.md`）。检查子代理独立审查交付物内容是否满足该 skill 的完成判定。

执行 Agent 不能审查自己的产物（写验分离硬约束）。检查子代理只读不写，只产出 PASS / NEEDS_REVISION verdict 和修改项清单。

检查未 PASS 前，交付物不能进入下一阶段，里程碑不能宣布完成。
```

- [ ] **Step 6.3: §7 验证门禁章节末尾追加前置说明**

定位 §7 末尾。Task 1 Step 1.3 已把 L314 改为：

```markdown
详见 `references/verification-gates.md`（含里程碑逐项审计清单）。
```

在这行**之前**插入（即插在 `- \`PASS\` → 进入 \`milestone_complete\`` 和 `详见...` 之间）：

```markdown
- `PASS` → 进入 `milestone_complete`

**新增前置（Milestone Audit Gate）**：该里程碑所有交付物的检查子代理报告必须全 PASS。没有"未派检查子代理"或"NEEDS_REVISION 未闭环"的交付物。详见 `references/review-agent-protocol.md` 和 `references/verification-gates.md`。

详见 `references/verification-gates.md`（含里程碑逐项审计清单）。
```

- [ ] **Step 6.4: 参考文件表追加 review-agent-protocol.md 条目**

定位 §"参考文件"表格（L467 起）。当前表格最后一行是 worked-example.md。在表格中追加一行（建议放在 execution-agent-protocol.md 之后，因为它是配套协议）：

定位现有行：

```markdown
| [references/execution-agent-protocol.md](references/execution-agent-protocol.md) | 执行 Agent 分派协议 | 委派子代理/worker/task 时 |
```

在其后插入：

```markdown
| [references/execution-agent-protocol.md](references/execution-agent-protocol.md) | 执行 Agent 分派协议 | 委派子代理/worker/task 时 |
| [references/review-agent-protocol.md](references/review-agent-protocol.md) | 检查子代理协议（每交付物必查） | 每个交付物产出后派独立审查时 |
```

- [ ] **Step 6.5: 验证 §6 和 §7 改动**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && grep -n "review-agent-protocol" SKILL.md`

Expected: 至少 4 处匹配（§6.3、§6.4、§7、参考文件表）

- [ ] **Step 6.6: Commit**

```bash
cd /Users/sundanian/.agents/skills/orchestrate-projects
git add SKILL.md
git commit -m "feat(orchestrate-projects): §6/§7/参考表咬合检查子代理机制"
```

---

## Task 7: 全局一致性自检

**Files:**
- 无文件改动，纯验证

**目标：** 实施完成后，做一次全局自检，确保 5 块改动相互咬合、无遗漏。

- [ ] **Step 7.1: 断链清零确认**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && grep -rn "harness-codex\|harness-standard\|harness-minimal\|audit-checklist" SKILL.md references/`

Expected: 输出为空（注意：references/ 里也不该出现这些旧名）

- [ ] **Step 7.2: review-agent-protocol.md 被正确引用**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && grep -n "review-agent-protocol" SKILL.md references/execution-agent-protocol.md references/verification-gates.md`

Expected: SKILL.md 至少 4 处（§4.2、§6.3、§6.4、§7、参考表）；execution-agent-protocol.md 1 处（第 6 条）；verification-gates.md 1 处（前置检查）

- [ ] **Step 7.3: §4 可勾选清单存在**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && grep -c "\- \[ \]" SKILL.md`

Expected: 数字 ≥ 30（§4.2 和 §4.3 的可勾选项总数）

- [ ] **Step 7.4: worked-example.md 未被破坏**

Run: `cd /Users/sundanian/.agents/skills/orchestrate-projects && git diff HEAD~6 -- references/worked-example.md`

Expected: 输出为空（worked-example.md 未被本次改动触碰）

如果上述任一步骤失败，回到对应 Task 修复后重跑该步骤。

---

## Task 8: 吃自己的狗粮——派检查子代理审查本次改动

**Files:**
- 无文件改动（除非检查子代理发现 NEEDS_REVISION）

**目标：** 用新机制验证新机制。本次改动的"交付物"是整个 skill 重构，按 review-agent-protocol.md 派一个独立检查子代理审查。

- [ ] **Step 8.1: 派检查子代理**

主协调 Agent 派出检查子代理，prompt 按 review-agent-protocol.md §「检查子代理 prompt 模板」填写：

- objective：独立审查 orchestrate-projects skill 的本次重构改动是否满足 spec §9 验收标准
- 检查标准来源：`docs/superpowers/specs/2026-07-25-orchestrate-projects-redesign-design.md` §9 验收标准
- 交付物路径：本次改动的所有文件（SKILL.md、review-agent-protocol.md、execution-agent-protocol.md、verification-gates.md）
- verdict_format：按 review-agent-protocol.md 定义

- [ ] **Step 8.2: 根据检查子代理 verdict 处理**

- 若 PASS → 本次重构完成，进入 Step 8.3
- 若 NEEDS_REVISION → 按修改项清单回到对应 Task 修复，修复后重新派检查子代理（受 3 轮上限约束）

- [ ] **Step 8.3: 最终 commit（如有修复）**

如果检查子代理 PASS 且无修复，跳过此步。如果有修复：

```bash
cd /Users/sundanian/.agents/skills/orchestrate-projects
git add -A
git commit -m "fix(orchestrate-projects): 根据检查子代理审查修复遗留问题"
```

---

## Spec 覆盖核对（self-review）

对照 spec §9 验收标准逐项核对：

| Spec 验收项 | 对应 Task | 覆盖 |
|------------|----------|------|
| 改动 #1：grep 输出为空 | Task 1 Step 1.5 + Task 7 Step 7.1 | ✅ |
| 改动 #2：§4 全文重写为可勾选清单 | Task 2 | ✅ |
| 改动 #3：review-agent-protocol.md 创建 | Task 3 | ✅ |
| 改动 #3：§6.4 追加咬合段，§7 增加前置 | Task 6 Step 6.2 + 6.3 | ✅ |
| 改动 #4：第 6 条升级为硬规则 | Task 4 | ✅ |
| 改动 #5：Milestone Audit Gate 增加前置 | Task 5 | ✅ |
| 参考文件表追加 review-agent-protocol.md | Task 6 Step 6.4 | ✅ |
| 派独立检查子代理审查本次改动 | Task 8 | ✅ |

全部覆盖，无遗漏。

---

## 执行方式选择

Plan complete and saved to `docs/superpowers/plans/2026-07-25-orchestrate-projects-redesign.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
