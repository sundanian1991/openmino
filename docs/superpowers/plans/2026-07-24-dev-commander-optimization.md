# /dev Commander 优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `.zcode/commands/dev.md` 从"固定 6 阶段全走流水线"改造成"分诊驱动、按画像编排、可中途切入"的技术开发编排器。

**Architecture:** 入口加分诊步骤（规模×类型×风险→画像），画像决定阶段子集、技能选配、状态档位。状态管理四档（atomic 会话内 / feature 轻量 / project 落 dev-state.json / 长周期升级 orchestrate-projects）。技能调用从固定清单改为三层查表。阶段跳转从全链门禁改为就近前置校验。

**Tech Stack:** Markdown 命令文件（无代码、无测试套件）

## Global Constraints

- 技能名严格匹配实际存在的技能池——`vibe-architecture` 不存在，必须移除
- 三套技能组（agent-skills / Superpowers / VIBE）的协同定位保留，这是命令的设计初衷
- 保留 6 阶段基准流程（Define→Plan→Build→Verify→Review→Ship），优化在"按画像允许跳过/合并"
- 命令聚焦技术开发编排，不往通用编排器走
- 长周期多里程碑项目升级交接给 `orchestrate-projects`，两者平级不嵌套
- 产出物路径不变：`SPEC.md`、`tasks/plan.md`、`tasks/todo.md`、`dev-state.json`

**改造对象**：`/Users/sundanian/Documents/projects/ai-agents/my-agent/.zcode/commands/dev.md`（当前 255 行，8 章）

**设计依据**：`docs/superpowers/specs/2026-07-24-dev-commander-optimization-design.md`

**验证方法**（替代 TDD 的测试环节）：
- 每个任务完成后跑 `grep` 确认无失效引用（尤其 `vibe-architecture`）
- 跑 `grep` 确认新增的关键词（"分诊"、"画像"、orchestrate-projects）已就位
- 人工通读改动的章节，确认逻辑自洽

---

### Task 1: 重写入口三件套（§0 身份 + §1 阶段总览 + §2 启动流程）

**Files:**
- Modify: `.zcode/commands/dev.md` 行 7-62（§用法定义 + §0 + §1 + §2）

**Interfaces:**
- Produces: 新的入口流程（分诊→画像→阶段组合），后续 Task 2 的阶段编排会引用这里的画像维度和阶段组合表

这个任务建立"分诊驱动"的基础——身份里植入分诊纪律，阶段总览里加分诊入口，启动流程从"读 state"改成"先分诊"。

- [ ] **Step 1: 重写 §用法（行 11-15）**

把当前的用法说明替换为含分诊的新版本。当前内容：
```
- `/dev` — **门禁模式**：每阶段结束暂停，等用户确认才进下一阶段
- `/dev auto` — **自动模式**：开始时一次批准，全阶段自动推进，仅在高风险点暂停（见 §auto暂停规则）
- `/dev <阶段名>` — 跳到指定阶段（如 `/dev build`、`/dev review`），仅当该阶段前置门禁已满足时允许跳入
```

替换为：
```
- `/dev` + 需求描述 — **标准入口**：先分诊判定任务画像，再按画像组合阶段模块执行
- `/dev auto` — **自动模式**：同上，但 project 档全程自动仅高风险点暂停（atomic/feature 档本来就快，auto 无额外意义）
- `/dev <阶段名>` — **跳入指定阶段**：只校验该阶段的就近前置（不要求全链门禁都过），适合接手半截项目或只跑某一段
```

- [ ] **Step 2: 重写 §0 核心纪律（行 23-27）**

在核心纪律第 1 条补入"先分诊"。当前：
```
1. 你自己不写产品代码。你只做三件事：**判定阶段 → 编排技能 → 检查门禁**。
```
替换为：
```
1. 你自己不写产品代码。你只做四件事：**分诊 → 判定阶段 → 编排技能 → 检查门禁**。每次 /dev 调用先分诊，不跳过分诊直接开跑。
```

- [ ] **Step 3: 重写 §0 三套技能组定位（行 29-37）**

修掉 `vibe-architecture` 失效引用 + 标注 VIBE 降级为可选。当前第 32 行：
```
- **VIBE**（`vibe-*` 前缀）= 产品创意到原型的快车道。提供 idea→interaction→architecture→design→prototype→implement 的创意流。
```
替换为：
```
- **VIBE**（`vibe-*` 前缀）= 产品创意到原型的快车道。提供 idea→interaction→design→prototype→implement 的创意流。在技术开发语境下降级为**可选**——只有 feature/project 且明确含 UI 流时才触发。
```

同时改第 35 行对 VIBE 补盲区的描述。当前：
```
- agent-skills 有纪律但缺创意发散 → VIBE 补 Define/Plan 阶段的产品形态思考
```
替换为：
```
- agent-skills 有纪律但缺创意发散 → VIBE 在含 UI 的 feature/project 中补产品形态思考（可选触发）
```

- [ ] **Step 4: 重写 §1 阶段总览（行 41-54）**

在 6 阶段流程图前加分诊入口，并改状态文件说明。当前行 43-52 的 ASCII 图前加入分诊节点。

把当前的 §1 整体（行 41-54）替换为：
```
## 1. 分诊与阶段总览

### 1.1 入口：分诊（30 秒）

每次 /dev 调用，先判定任务画像，再决定跑哪些阶段。

**任务画像三维度：**

| 维度 | 取值 | 判定依据 |
|------|------|---------|
| **规模** | atomic（原子）/ feature（特性）/ project（项目） | 改动范围：单点 vs 多文件成体系 vs 跨模块大改 |
| **类型** | bugfix / feature / refactor / infra（基础设施） | 任务性质 |
| **风险** | low / high | 是否触及认证、支付、数据迁移、不可逆操作、线上部署 |

commander 读用户请求 + 扫代码上下文，**自行判定画像**，用一句话宣告：

> 📋 画像：`feature / feature / low` —— 中等规模新功能，低风险。将执行 Plan→Build→Verify→Review，跳过 Define 和 Ship。

用户可一句话纠正（"不，这是 refactor"），commander 重判。**不做多轮追问。**

### 1.2 画像 → 阶段组合

| 画像 | 执行阶段 | 跳过 |
|------|---------|------|
| atomic + bugfix/feature + low | Build → Verify | Define/Plan/Review/Ship |
| feature + * + low | Plan → Build → Verify → Review | Define/Ship |
| feature/project + * + high | Plan → Build → Verify → Review → Ship | Define（若需求明确）/ 或全走 |
| project + *（新项目，需求未定） | 全 6 阶段 | 无 |
| 用户显式 `/dev <阶段名>` | 仅该阶段 + 就近前置 | 其余 |

预设规则可被用户一句话覆盖。

### 1.3 六阶段基准流程

```
项目进入
  │
  ├─ ① DEFINE  ─ 想清楚要做什么
  ├─ ② PLAN    ─ 拆成可执行任务
  ├─ ③ BUILD   ─ 增量实现（核心循环，每个任务跑一遍）
  ├─ ④ VERIFY  ─ 证明它能跑
  ├─ ⑤ REVIEW  ─ 合并前多维度把关
  └─ ⑥ SHIP    ─ 安全发布 + 长期可维护
```

### 1.4 分级状态管理

状态按规模分档，不是所有任务都落 `dev-state.json`：

| 画像规模 | 状态存哪 | 断点续传 |
|---------|---------|---------|
| atomic | 会话内存，不落文件 | ❌ |
| feature | 会话内存为主；跨会话落 `tasks/todo.md` | ⚠️ 按需 |
| project（单会话可完成） | `dev-state.json`（4 字段） | ✅ |
| project（跨会话/多里程碑） | **升级到 orchestrate-projects**，由其 `.planning/` 接管 | ✅ |

**升级规则**：project 档且预估跨会话/多里程碑 → 不落 `dev-state.json`，触发 `orchestrate-projects` 接管。`/dev` 是分诊器 + 中轻量编排，识别到重活就升级交接。两者平级，不嵌套。

**`dev-state.json` 精简格式（4 字段）：**

```json
{
  "profile": "project/feature/infra/high",
  "current_stage": "build",
  "completed_stages": ["define", "plan"],
  "blocker": null
}
```
```

- [ ] **Step 5: 重写 §2 启动流程（行 58-62）**

把"读 state → 解析参数"改成"分诊优先"。当前：
```
## 2. 启动流程（每次 /dev 调用先跑）

1. 读 `dev-state.json`。不存在 → 新项目，从 ① DEFINE 开始。
2. 解析参数：`auto` → 自动模式；`<阶段名>` → 跳转（需校验前置门禁已过）；空 → 门禁模式。
3. 声明当前模式，然后进入对应阶段。
```
替换为：
```
## 2. 启动流程（每次 /dev 调用先跑）

1. **解析调用方式**：
   - `/dev <阶段名>` → 跳入指定阶段（见 §5 就近前置校验）
   - `/dev auto` → project 档自动模式标记
   - `/dev` + 需求 → 标准入口
2. **分诊**：读用户请求 + 扫代码上下文 → 判定画像（规模×类型×风险）→ 宣告画像和阶段组合 → 等用户确认或纠正。
3. **检查升级条件**：若画像 = project + 跨会话/多里程碑 → 提示升级到 `orchestrate-projects`，用户同意则交接，结束本次 /dev。
4. **恢复或新建状态**：
   - 有 `dev-state.json` → 读 profile + current_stage 恢复
   - 无 → 按画像档位决定（atomic/feature 会话内，project 落 dev-state.json）
5. 进入画像指定的第一个阶段。
```

- [ ] **Step 6: 校验无失效引用**

Run: `grep -n "vibe-architecture" .zcode/commands/dev.md`
Expected: 无输出（本次已从 §0 移除；§7 将在 Task 4 处理，如果此处仍有输出属正常，Task 4 会清掉）

Run: `grep -n "分诊\|画像\|orchestrate-projects" .zcode/commands/dev.md`
Expected: 多处命中（§0/§1/§2 已植入）

- [ ] **Step 7: 人工通读 §0-§2**

确认：分诊纪律在 §0 第 1 条、画像三维度在 §1.1、阶段组合表在 §1.2、状态分级在 §1.4、启动流程是分诊优先。逻辑自洽。

- [ ] **Step 8: Commit**

```bash
git add .zcode/commands/dev.md
git commit -m "refactor(dev): 入口三件套重写——分诊驱动+画像+分级状态

§0 核心纪律补'先分诊'，修 vibe-architecture 失效引用，VIBE 降级可选
§1 新增分诊(规模×类型×风险)+画像→阶段组合表+分级状态管理(含升级 orchestrate-projects)
§2 启动流程从'读state'改为'分诊优先'"
```

---

### Task 2: 重写 §3 各阶段编排（技能选配表化）

**Files:**
- Modify: `.zcode/commands/dev.md` 行 66-189（§3 全部六个阶段）

**Interfaces:**
- Consumes: Task 1 的画像维度和阶段组合表
- Produces: 每个阶段的"画像 × 必选/可选技能"查表，后续 Task 3 的跳转规则会引用阶段的输入/输出物

这是最大的改造块。当前每个阶段是固定的 4-6 步技能清单，改成三层查表（必选🟢/可选🟡/按需⚪），并补"阶段可被画像跳过"说明。

- [ ] **Step 1: 在 §3 标题后加选配层次说明**

在 `## 3. 各阶段编排` 标题下方（当前行 66 之后）插入：
```
**技能选配三层：**

| 层次 | 含义 | 调用规则 |
|------|------|---------|
| 🟢 必选 | 该阶段该画像下必须调的引擎技能 | 无条件调 |
| 🟡 可选 | 满足触发条件才调 | commander 判定条件，真满足才调 |
| ⚪ 按需 | 用户指定或罕见场景 | 用户显式要求才调 |

**选配决策流程：** 进入某阶段 → 查表拿必选清单 → 逐个评估可选触发条件 → 宣告本次调用清单 → 执行。commander 不发明清单外调用，要调表外技能须用户显式要求或标注"超出预设表，因为 X"。

**阶段可被画像跳过：** 并非所有任务都走全部六阶段。某阶段若不在画像的阶段组合里（见 §1.2），直接跳过，不跑编排不查门禁。
```

- [ ] **Step 2: 重写 §3① DEFINE（行 68-83）**

在编排顺序前加"适用画像"说明，并把固定步骤改为查表。当前是固定 6 步。替换整个 ① DEFINE 小节为：
```
### ① DEFINE — 定义需求

**适用画像**：仅 project + 需求未定时执行。feature/atomic 若需求已明确则跳过此阶段。
**产出物**：`SPEC.md`（项目根）
**输入物**：用户需求（自然语言）

**编排（project 画像）：**
1. 调 `using-superpowers` 确认当前状态。
2. 调 agent-skills `interview-me` —— 一次一个问题，把需求挖到 ~95% 置信度。
3. 调 agent-skills `spec-driven-development` —— 产出含目标、用户、验收标准、边界、技术栈的 SPEC.md。
4. 写入 `dev-state.json`，标记 DEFINE 完成。

**🟡 可选**：`superpowers:brainstorming`（需求方向有多个可能、需要结构化取舍时）

**门禁（DEFINE 过线标准）：**
- [ ] SPEC.md 存在且包含：目标、目标用户、核心功能验收标准、技术栈、明确边界（必做/需问/禁做）
- [ ] 用户已确认 SPEC（门禁模式必须暂停等确认）
```

- [ ] **Step 3: 重写 §3② PLAN（行 87-102）**

移除 `vibe-architecture` 失效引用，改为查表。替换整个 ② PLAN 小节为：
```
### ② PLAN — 规划任务

**适用画像**：feature / project 执行。atomic 跳过（直接进 BUILD）。
**产出物**：`tasks/plan.md` + `tasks/todo.md`
**输入物**：`SPEC.md` 或用户当场给的目标

**编排：**
1. 读输入物（SPEC.md 或用户当场给的目标）。
2. 🟢 `planning-and-task-breakdown` —— 按依赖图垂直切片，每任务有验收标准+验证步骤。
3. 🟢 `superpowers:writing-plans` —— 把任务结构写成可追踪的计划。
4. 写入状态（project 档更新 dev-state.json，feature 档更新 todo.md）。

**🟡 可选**：`vibe-interaction`（仅当项目明确含 UI 流时，确定交互形态）

**门禁（PLAN 过线标准）：**
- [ ] tasks/plan.md 存在，每个任务有：验收标准、验证步骤、依赖顺序
- [ ] tasks/todo.md 可勾选追踪
- [ ] 用户已确认计划（门禁模式必须暂停等确认）
```

- [ ] **Step 4: 重写 §3③ BUILD（行 106-128）**

改为按画像的查表，这是循环核心。替换整个 ③ BUILD 小节为：
```
### ③ BUILD — 增量实现（核心循环）

**适用画像**：所有画像都执行（atomic 由此开始）。
**产出物**：可运行代码 + 每任务一次提交。
**输入物**：`tasks/plan.md` 或单任务描述（用户当场给的也算）
**这是循环阶段**：对 plan 里的每个任务（或 atomic 的单个任务）跑一遍，直到全部完成。

**技能选配表：**

| 画像 | 🟢 必选 | 🟡 可选（条件触发） |
|------|--------|-------------------|
| atomic | `incremental-implementation` + `source-driven-development` | 条件几乎不触发 |
| feature | `incremental-implementation` + `source-driven-development` | `dispatching-parallel-agents`（子任务可独立分离时）· `frontend-ui-engineering`（有 UI 改动时） |
| project | `incremental-implementation` + `source-driven-development` + `context-engineering` | `dispatching-parallel-agents` · `vibe-design→prototype→implement`（有 UI 流）· `doubt-driven-development`（**risk=high 时升级为必选**） |

**`source-driven-development` 逃生条件**：改动完全不涉及外部 API/库/框架（纯本地逻辑、改变量名、调配置值）→ commander 可判定跳过。

**单任务编排：**
1. 取下一个 pending 任务，读验收标准。
2. 查上表拿必选技能，评估可选触发条件。
3. 需要并行 → 调 `dispatching-parallel-agents` 扁平分派（子代理不互相调用，保持一层深）。
4. 调 `incremental-implementation` 做增量提交（一个任务一次提交）。
5. risk=high → 调 `doubt-driven-development` 对抗式审查，**必须用户签字才继续**。
6. 标记任务完成，更新 todo.md。

**门禁（BUILD 过线标准）：**
- [ ] 每个任务有对应提交，提交信息描述清晰
- [ ] 涉及的测试已写并暂存到本阶段（VERIFY 阶段统一跑）
```

- [ ] **Step 5: 重写 §3④ VERIFY（行 132-146）**

替换整个 ④ VERIFY 小节为：
```
### ④ VERIFY — 验证

**适用画像**：所有画像都执行。
**产出物**：测试报告。
**输入物**：git commits（代码变更）

**技能选配表：**

| 画像 | 🟢 必选 | 🟡 可选 |
|------|--------|--------|
| atomic | `test-driven-development` | — |
| feature | `test-driven-development` | `browser-testing-with-devtools`（前端时） |
| project | `test-driven-development` + `superpowers:verification-before-completion` | `browser-testing-with-devtools`（前端时） |

**编排：**
1. 🟢 跑 `test-driven-development` 完整测试套件。
2. 🟡 前端 → 跑 `browser-testing-with-devtools` 真实运行时验证。
3. 🟢（project 档）跑 `superpowers:verification-before-completion` 跨阶段通用验证。
4. 失败 → 调 `superpowers:systematic-debugging` + agent-skills `debugging-and-error-recovery` 双路调试。
5. 写入状态，标记 VERIFY 完成。

**门禁（VERIFY 过线标准）：**
- [ ] 测试全绿，无回归
- [ ] 运行时行为已验证（不是"看起来对"）
- [ ] 用户已确认验证通过（门禁模式）
```

- [ ] **Step 6: 重写 §3⑤ REVIEW（行 150-167）**

替换整个 ⑤ REVIEW 小节为：
```
### ⑤ REVIEW — 审查

**适用画像**：feature / project 执行。atomic 默认跳过（可用户要求时补跑）。
**产出物**：审查报告。
**输入物**：代码变更

**技能选配表：**

| 画像 | 🟢 必选 | 🟡 可选 |
|------|--------|--------|
| feature | `code-review-and-quality` | — |
| project | `code-review-and-quality` + `code-simplification` | `security-and-hardening`（安全敏感时）· `performance-optimization`（性能敏感时） |

**编排：**
1. 🟢 跑 `code-review-and-quality` 五轴审查（正确性/可读性/架构/安全/性能），按 Critical/Important/Suggestion 分级。
2. 🟡 安全敏感 → `security-and-hardening`（OWASP Top 10）。
3. 🟡 性能敏感 → `performance-optimization`（先测量再优化）。
4. 🟢（project 档）跑 `code-simplification`（Chesterton 之栅原则）。
5. 🟡 调 `superpowers:requesting-code-review` + `receiving-code-review` 协作审查流程。
6. 写入状态，标记 REVIEW 完成。

**门禁（REVIEW 过线标准）：**
- [ ] Critical 问题 = 0（有则禁止过线，必须修）
- [ ] Important 问题已记录并给出修复建议
- [ ] 简化检查已执行（project 档）
- [ ] 用户已确认审查结论（门禁模式）
```

- [ ] **Step 7: 重写 §3⑥ SHIP（行 171-189）**

替换整个 ⑥ SHIP 小节为：
```
### ⑥ SHIP — 发布

**适用画像**：project 档 + risk=high，或用户显式要求。feature/atomic 默认跳过。
**产出物**：已发布的版本。
**输入物**：审查通过的代码

**编排（全 agent-skills 主导）：**
1. 🟢 `git-workflow-and-versioning` —— Trunk-based，原子提交，语义化版本。
2. 🟡 `ci-cd-and-automation` —— 自动化质量门禁（有 CI/CD 管道时）。
3. 🟡 `observability-and-instrumentation` —— 结构化日志+RED指标+tracing（需要监控时）。
4. 🟢 `documentation-and-adrs` —— 记录"为什么这么决定"。
5. 🟡 `deprecation-and-migration`（涉及下线旧功能时）。
6. 🟢 `shipping-and-launch` —— pre-launch checklist + 灰度 + 回滚策略。
7. 写入状态，标记 SHIP 完成 → 全流程结束。

**门禁（SHIP 过线标准）：**
- [ ] pre-launch checklist 全部通过
- [ ] 回滚策略已制定
- [ ] 监控已配置（如适用）
- [ ] 用户已确认发布（所有模式都必须——发布不可逆）
```

- [ ] **Step 8: 校验 vibe-architecture 已从 §3 移除**

Run: `grep -n "vibe-architecture" .zcode/commands/dev.md`
Expected: 无输出（§3② 已改用 planning-and-task-breakdown；若仍有命中说明 Step 3 没改干净）

Run: `grep -n "incremental-implementation\|test-driven-development\|code-review-and-quality" .zcode/commands/dev.md`
Expected: 多处命中（选配表已就位）

- [ ] **Step 9: 人工通读 §3**

确认：每个阶段都有"适用画像"+"输入物/产出物"+选配表+编排+门禁。阶段之间靠产物交接。

- [ ] **Step 10: Commit**

```bash
git add .zcode/commands/dev.md
git commit -m "refactor(dev): §3 阶段编排技能选配表化

每阶段从固定技能清单改为三层查表(必选🟢/可选🟡/按需⚪)
补适用画像+输入物/产出物(阶段模块化交接)
移除 vibe-architecture 失效引用(改用 planning-and-task-breakdown)
BUILD 选配表按 atomic/feature/project 分档"
```

---

### Task 3: 重写 §4 auto 暂停规则 + §5 阶段跳转

**Files:**
- Modify: `.zcode/commands/dev.md` 行 193-213（§4 + §5）

**Interfaces:**
- Consumes: Task 1/2 的画像和阶段定义
- Produces: 就近前置校验规则（用户中途切入的依据）

- [ ] **Step 1: 重写 §4 auto 暂停规则（行 193-202）**

补"仅 project 档有意义"说明。当前内容保留 4 类暂停规则，在开头加一段。在 `## 4. 自动模式（auto）暂停规则` 标题下方、现有内容前插入：
```
**适用范围**：auto 模式仅对 project 档有意义（atomic/feature 本来就只跑 2-4 阶段，门禁暂停点少，auto 与非 auto 体验差不多，默认非 auto 即可）。
```

4 类暂停规则正文（测试失败/规格歧义/高风险/审查 Critical）保持不变。

- [ ] **Step 2: 重写 §5 阶段跳转规则（行 206-213）**

把"全链门禁必须过"改为"就近前置校验"。当前：
```
## 5. 阶段跳转规则

`/dev <阶段名>` 允许跳入指定阶段，但**前置门禁必须已过**：
- `/dev build` → 检查 PLAN 门禁是否过（tasks/plan.md 存在且确认）
- `/dev verify` → 检查 BUILD 是否所有任务完成
- `/dev review` → 检查 VERIFY 门禁是否过
- `/dev ship` → 检查 REVIEW 门禁是否过
- 前置未过 → 拒绝跳转，告知缺什么。
```
替换为：
```
## 5. 阶段跳转规则（就近前置校验）

`/dev <阶段名>` 跳入指定阶段时，**不查"之前阶段是否全走过"，只查"这一阶段的输入物是否存在"**：

| 跳入 | 就近前置校验（只查这个） |
|------|------------------------|
| `/dev build` | 有明确任务（plan.md 或用户当场给的） |
| `/dev verify` | 有代码提交产出（不要求 Define/Plan 文档） |
| `/dev review` | 有可审查的代码变更 |
| `/dev ship` | 有可发布的版本物 |

这让接手半截项目、临时只想跑某一段成为可能。例如：接手同事做到一半的项目，代码已有但没文档——`/dev review` 能直接跑，不会被"Define/Plan 门禁未过"挡住。

前置不满足 → 告知缺什么输入物，不拒绝跳转本身。
```

- [ ] **Step 3: 校验**

Run: `grep -n "就近前置\|全链门禁" .zcode/commands/dev.md`
Expected: "就近前置"命中；"全链门禁"无命中（旧表述已替换）

- [ ] **Step 4: Commit**

```bash
git add .zcode/commands/dev.md
git commit -m "refactor(dev): §4 auto仅project档+§5就近前置校验

§4 补充 auto 模式仅 project 档有意义
§5 阶段跳转从'全链门禁必须过'改为'就近前置校验'(只查该阶段输入物是否存在)"
```

---

### Task 4: 重写 §6 产出物 + §7 技能索引 + §8 失败模式

**Files:**
- Modify: `.zcode/commands/dev.md` 行 217-254（§6 + §7 + §8）

**Interfaces:**
- Consumes: Task 1-3 的全部改造
- Produces: 清理完毕的技能索引（无失效引用）、完整的失败模式清单

- [ ] **Step 1: 重写 §6 产出物清单（行 217-227）**

补"输入物"列。当前：
```
| 阶段 | 产出物 | 路径 |
```
在表头加一列，替换为：
```
| 阶段 | 输入物 | 产出物 | 路径 |
|------|--------|--------|------|
| DEFINE | 用户需求（自然语言） | 需求规格 | `SPEC.md` |
| PLAN | `SPEC.md` 或当场目标 | 任务计划 + 待办 | `tasks/plan.md`、`tasks/todo.md` |
| BUILD | `tasks/plan.md` 或单任务描述 | 可运行代码 + 提交 | git commits |
| VERIFY | git commits | 测试报告 | 运行输出 |
| REVIEW | 代码变更 | 审查报告 | 审查输出 |
| SHIP | 审查通过的代码 | 已发布版本 + 文档 | git tag + ADR |
```

- [ ] **Step 2: 重写 §7 技能索引（行 230-243）**

删 `vibe-architecture`，VIBE 标注可选，补 orchestrate-projects 升级说明。当前 VIBE 行（行 238）：
```
| VIBE | `vibe-` | vibe-idea, vibe-interaction, vibe-architecture, vibe-design, vibe-prototype, vibe-implement |
```
替换为：
```
| VIBE（可选） | `vibe-` | vibe-idea, vibe-interaction, vibe-design, vibe-prototype, vibe-implement |
```

在"按需扩展"段（行 240-243）后追加：
```

**升级交接（非选配，是分诊升级路径）：**
- project + 跨会话/多里程碑 → 升级到 `orchestrate-projects`，由其 `.planning/` 工件体系和里程碑编排接管。`/dev` 和 `orchestrate-projects` 是平级技能，分诊时二选一。
```

- [ ] **Step 3: 重写 §8 失败模式（行 247-254）**

补第 7 条。在现有第 6 条后追加：
```
7. **分诊不宣告就开跑** —— 必须先宣告画像和阶段组合，给用户纠正机会。不跳过分诊直接进阶段。
```

- [ ] **Step 4: 全文终校**

Run: `grep -n "vibe-architecture" .zcode/commands/dev.md`
Expected: **无输出**（全文清零，这是最关键的校验）

Run: `grep -n "门禁模式.*每阶段结束暂停" .zcode/commands/dev.md`
Expected: 无输出（旧的单一门禁模式描述已被分诊入口替代）

Run: `grep -c "画像" .zcode/commands/dev.md`
Expected: ≥10（画像概念贯穿全文）

- [ ] **Step 5: 人工全文通读**

从头到尾读一遍改完的 dev.md，确认：
- 分诊是入口第一步（§2）
- 每个阶段有适用画像（§3）
- 技能按画像查表（§3）
- 状态按规模分档（§1.4）
- 跳转用就近前置（§5）
- 无 vibe-architecture（§7）
- 有升级 orchestrate-projects（§1.4 + §7）

- [ ] **Step 6: Commit**

```bash
git add .zcode/commands/dev.md
git commit -m "refactor(dev): §6补输入物列+§7删vibe-architecture补升级路径+§8补第7条

§6 产出物清单加输入物列(阶段模块化交接依据)
§7 VIBE 删 vibe-architecture(不存在)、标可选、补 orchestrate-projects 升级说明
§8 失败模式补'分诊不宣告就开跑'"
```

- [ ] **Step 7: 最终验收——模拟一次分诊走查**

不改动文件，只在脑中模拟：
- 用户说"修个登录 bug" → commander 分诊 `atomic/bugfix/low` → Build(source-driven-dev + incremental-impl) → Verify(test-driven-dev) → 完。3 个技能，无 Define/Plan/Review/Ship。
- 用户说"加个用户列表页" → 分诊 `feature/feature/low` → Plan → Build → Verify → Review。
- 用户说"重构整个认证模块，要上线" → 分诊 `project/refactor/high` → 全流程或升级 orchestrate-projects。

走查通过 = 改造完成。
