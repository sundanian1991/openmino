# /dev Commander 优化设计

> 把 `/dev` 从"固定 6 阶段全走流水线"改造成"分诊驱动、按画像编排、可中途切入"的技术开发编排器。

---

## 0. 背景与根因

### 三个痛点

用户反馈 `/dev` 不够灵活、状态管理不好用、技能调用不准。探索后确认这是同一个根因的三个症状：

**根因：命令把"所有任务 = 完整 6 阶段软件项目"写死了。** 任务一旦不符合这个假设，三个问题同时爆发——

| 痛点 | 根因表现 |
|------|---------|
| 灵活性差（规模/入口/组合） | 固定 6 阶段、固定顺序、固定技能清单 |
| 状态管理不好用 | `dev-state.json` 假设长流程需断点续传，小任务根本不需要 |
| 技能调用不准 | 每阶段列 4-6 个技能全跑一遍，而非按需选配 |

### 探索发现的事实问题

1. **`vibe-architecture` 不存在**——命令 §3 PLAN 阶段和 §7 技能索引都引用了它，但技能池只有 `vibe-idea/interaction/design/prototype/implement`。这是会让命令在 PLAN 阶段卡住的失效引用。
2. **`dev-state.json` 从未被创建**——暗示状态机设计偏重，从未被端到端跑完过。

### 优化方向决策

- **定位收敛**：`/dev` 聚焦技术开发编排，不往通用编排器走（做垂不做宽）。
- **保留 6 阶段基准**：Define→Plan→Build→Verify→Review→Ship 作为基准流程不变，优化重点在"按画像允许跳过或合并阶段"。
- **分诊驱动**：入口处加 30 秒分诊，判定任务画像，决定跑哪些阶段、调哪些技能、要不要落状态文件。

---

## 1. 整体机制：分诊 → 画像 → 编排

### 流程

```
/dev 触发
  │
  ├─ ① 分诊（30 秒）
  │     判定三个维度 → 任务画像
  │
  ├─ ② 命令读画像 → 匹配阶段模块组合
  │     （不是固定全走 6 阶段，而是按画像选子集）
  │
  └─ ③ 按选中的阶段模块执行，每个模块自带进入条件 + 编排 + 门禁
```

### 任务画像三维度

| 维度 | 取值 | 判定依据 |
|------|------|---------|
| **规模** | atomic（原子）/ feature（特性）/ project（项目） | 改动范围：单点 vs 多文件成体系 vs 跨模块大改 |
| **类型** | bugfix / feature / refactor / infra（基础设施） | 任务性质 |
| **风险** | low / high | 是否触及认证、支付、数据迁移、不可逆操作、线上部署 |

三维度组合出画像标签，如 `feature / feature / low`、`atomic / bugfix / low`、`project / infra / high`。

### 分诊执行方式

commander 读用户请求 + 扫代码上下文，**自行判定画像**，用一句话宣告：

> 📋 画像：`feature / feature / low` —— 中等规模新功能，低风险。将执行 **Plan→Build→Verify→Review** 四阶段，跳过 Define（需求已明确）和 Ship（无部署）。

用户不同意可一句话纠正（"不，这是 refactor"），commander 重判。**不做多轮追问**——分诊为提速，不为拖慢。

### 画像 → 阶段组合（预设规则）

| 画像 | 执行阶段 | 跳过 |
|------|---------|------|
| atomic + bugfix/feature + low | Build → Verify | Define/Plan/Review/Ship |
| feature + * + low | Plan → Build → Verify → Review | Define/Ship |
| feature/project + * + high | Plan → Build → Verify → Review → Ship | Define（若需求明确）/ 或全走 |
| project + *（新项目，需求未定） | 全 6 阶段 | 无 |
| 用户显式指定 `/dev build` 等 | 仅该阶段（+ 就近前置，见 §4） | 其余 |

**关键**：预设规则可被用户一句话覆盖。commander 宣告画像后，用户说"走全流程"或"跳过 review"，立即生效。

---

## 2. 分级状态管理

核心：**状态管理按规模分档**，不再对所有任务强制 `dev-state.json`。

### 四档策略

| 画像规模 | 状态存哪 | 断点续传 | 阶段切换 |
|---------|---------|---------|---------|
| **atomic** | 会话内存（不落文件） | ❌ | commander 脑内追踪，结束即清 |
| **feature** | 会话内存为主；跨会话则落 `tasks/todo.md`（勾选追踪） | ⚠️ 按需 | 阶段完成时口头宣告，不写 dev-state.json |
| **project（单会话可完成）** | `dev-state.json`（项目根，4 字段） | ✅ | 每阶段转换时更新文件 |
| **project（跨会话/多里程碑）** | 升级到 `orchestrate-projects`，由其 `.planning/` 接管 | ✅ | 转交后由其里程碑门禁接管 |

判定规则：默认按分诊的规模维度走对应档。用户可一句话覆盖。

### `/dev` 与 `orchestrate-projects` 的关系

两者平级，分诊时二选一：

| | `/dev` | `orchestrate-projects` |
|---|---|---|
| **时间尺度** | 单次会话内 | 跨数天到数周 |
| **状态体系** | `dev-state.json`（4 字段）或会话内 | `.planning/`（PROJECT/ROADMAP/STATE/dashboard） |
| **核心循环** | 阶段流水线 | 里程碑推进 |
| **适用** | 中轻量开发 | 长周期多里程碑项目 |

**升级规则**：project 档且预估跨会话/多里程碑 → 不落 `dev-state.json`，触发 `orchestrate-projects` 接管。`/dev` 是分诊器 + 中轻量编排，识别到重活就升级交接。

### `dev-state.json` 精简（project 档）

只存恢复必需的四字段：

```json
{
  "profile": "project/feature/infra/high",
  "current_stage": "build",
  "completed_stages": ["define", "plan"],
  "blocker": null
}
```

- 去掉"pending 任务列表"——那是 plan.md/todo.md 的职责。
- 去掉"模式"——由调用参数决定，重入时重新读参数。

### 重入逻辑

```
/dev 重入
  ├─ 找 dev-state.json
  │   ├─ 不存在 → 新任务，走分诊
  │   └─ 存在 → 读 profile + current_stage
  │              ├─ atomic/feature 且本会话内 → 不需要文件，直接续
  │              └─ project / 跨会话 → 从 current_stage 恢复
  ├─ /dev auto 重入 → 从 current_stage 的下一个 pending 恢复
  └─ /dev <阶段名> → 见 §4 入口
```

### 模式与档位解绑

atomic/feature 本来就只跑 2-4 个阶段，门禁暂停点少，auto 和非 auto 体验差不多 → 默认非 auto，阶段间自然停顿。project 才保留两种模式的明显区别。小任务不被"要不要 auto"的选择负担。

---

## 3. 技能精准选配表

这是"技能调用准确"痛点的直接解法。核心：**从"每阶段列 4-6 个技能全跑"改成"画像维度 × 阶段 → 必选/可选/按需"的查表法。**

### 三个选配层次

| 层次 | 含义 | 调用规则 |
|------|------|---------|
| 🟢 必选 | 该阶段该画像下必须调的"引擎技能" | 无条件调 |
| 🟡 可选 | 满足触发条件才调 | commander 判定条件，真满足才调 |
| ⚪ 按需 | 用户指定或罕见场景 | 用户显式要求才调 |

### Build 阶段选配表（以循环核心为例）

| 画像 | 🟢 必选 | 🟡 可选（条件触发） |
|------|--------|-------------------|
| **atomic** | `incremental-implementation` + `source-driven-development` | 条件几乎不触发 |
| **feature** | `incremental-implementation` + `source-driven-development` | `dispatching-parallel-agents`（子任务可独立分离时）· `frontend-ui-engineering`（有 UI 改动时） |
| **project** | `incremental-implementation` + `source-driven-development` + `context-engineering` | `dispatching-parallel-agents` · `vibe-design→prototype→implement`（有 UI 流）· `doubt-driven-development`（**risk=high 时升级为必选**） |

**`source-driven-development` 逃生条件**：当改动完全不涉及外部 API/库/框架（纯本地逻辑、改变量名、调配置值），commander 可判定跳过。

### 全阶段速览（必选层）

```
         atomic                    feature                      project
DEFINE   —                         —                            interview-me → spec-driven-development
PLAN     —                         planning-and-task-breakdown → writing-plans
                                   （+ vibe-interaction，仅 UI 项目）
BUILD    incremental-impl          +source-driven-dev           +context-engineering
         +source-driven-dev
VERIFY   test-driven-dev           test-driven-dev              test-driven-dev + verification-before-completion
                                   （+ browser-testing，前端时）
REVIEW   —                         code-review-and-quality      +code-simplification
                                                                （+ security/perf，敏感时）
SHIP     —                         —                            git-workflow → shipping-and-launch
```

"—" 表示该画像默认跳过此阶段（与 §1 画像→阶段表对齐）。每格是必选技能，可选层另查。

**atomic 的完整技能数**：Build 的 2 个（`incremental-implementation` + `source-driven-development`）+ Verify 的 1 个（`test-driven-development`）= **3 个技能**，比全流程轻得多但有兜底。

### 修复失效引用

- ❌ `vibe-architecture`（不存在）→ 从 PLAN 阶段移除。架构骨架设计改由 `planning-and-task-breakdown` 承担。
- VIBE 系列在技术开发语境下**降级为可选**——只有 feature/project 且明确含 UI 流时才触发 `vibe-design→prototype→implement`，不再是 PLAN 阶段默认步骤。

### commander 选配决策流程

```
进入某阶段
  ├─ 查表：该阶段 × 当前画像 → 拿到必选技能清单
  ├─ 逐个评估可选技能的触发条件
  │     条件为真 → 加入本次调用清单
  │     条件为假 → 跳过，不调
  ├─ 宣告本次将调用的技能清单（一句话）
  └─ 执行调用
```

**约束**：commander 不发明清单外的技能调用。要调表外技能，必须用户显式要求或 commander 显式标注"此处超出预设表，因为 X"。

---

## 4. 入口与阶段编排

这是"灵活性"痛点的直接落点。核心：**从"单一入口 + 线性流水线"改成"多入口 + 阶段模块化"。**

### 三种入口形态

| 调用方式 | 行为 | 适用 |
|---------|------|------|
| `/dev` + 自然语言需求 | 走分诊 → 画像 → 阶段组合 | 标准入口 |
| `/dev auto` | 同上，但 project 档全程自动仅高风险暂停 | project 档 |
| `/dev <阶段名>` | **跳入指定阶段**，只校验"该阶段就近前置" | 中途切入 |

### 阶段跳转的关键改造：就近前置校验

当前命令要求"前置门禁必须全过"才能跳。改造后放宽为**就近前置校验**——不查"之前阶段是否走过"，只查"这一阶段的输入物是否存在"：

```
/dev verify  → 只校验：Build 是否有提交产出（不要求 Define/Plan 文档）
/dev review  → 只校验：有可审查的代码变更
/dev ship    → 只校验：有可发布的版本物
/dev build   → 只校验：有明确任务（来自 plan.md 或用户当场给的）
```

这让接手半截项目、临时只想跑某一段成为可能。例如：接手同事做到一半的项目，代码已有但没文档——`/dev review` 能直接跑，不会被"Define/Plan 门禁未过"挡住。

### 阶段模块化

每个阶段写成**自包含模块**，有自己的：进入条件 → 编排（查 §3 选配表）→ 门禁。阶段之间靠**显式产物交接**，不靠状态机硬锁：

| 阶段 | 输入物 | 输出物（= 下一阶段输入） |
|------|--------|----------------------|
| DEFINE | 用户需求（自然语言） | `SPEC.md` |
| PLAN | `SPEC.md` 或用户当场给的目标 | `tasks/plan.md` + `tasks/todo.md` |
| BUILD | `tasks/plan.md` 或单任务描述 | git commits |
| VERIFY | git commits（代码变更） | 测试报告 |
| REVIEW | 代码变更 | 审查报告 |
| SHIP | 审查通过的代码 | git tag + ADR |

**关键**：输入物可以用上一阶段的产物，**也可以用户当场提供**。`/dev build` 时用户直接说"把 X 函数改成 Y"，没有 plan.md 也行——BUILD 的真正输入是"明确的任务描述"，plan.md 只是常见来源之一。

### 模式与档位的最终关系

| 档位 | 默认模式 | auto 模式 | 门禁暂停点 |
|------|---------|-----------|-----------|
| atomic | 默认跑完，Build→Verify 间自然停 | 无意义，不提供 | 几乎无 |
| feature | 阶段间自然停，等用户确认继续 | 可选，仅高风险停 | Plan/Review 出口 |
| project | 逐阶段确认 | 一次批准，仅 4 类高风险暂停 | 每阶段出口 + 高风险操作前 |
| → 升级 orchestrate-projects | — | — | 转交后由其里程碑门禁接管 |

---

## 5. auto 模式暂停规则（保留）

auto 模式下，仅以下 4 类情况强制暂停：

1. **测试无法通过** / 构建失败且无明显修复 → 进调试，停下报告
2. **规格有歧义** / 任务需要 SPEC 未覆盖的决策 → 停下问用户
3. **高风险/不可逆操作**：认证权限、支付、破坏性数据迁移、删除、部署、涉密 → 必须签字
4. **审查发现 Critical** → 默认 NO-GO，除非用户明确接受风险

---

## 6. 失败模式（commander 必须避免）

1. **跳过门禁** —— 任何理由都不能跳。门禁失败就停下。
2. **自己写产品代码** —— 指挥官不是施工员，施工交给技能和子代理。
3. **技能名记错** —— 技能名严格按选配表，不可臆造。
4. **并行子代理套娃** —— 子代理不再派子代理，保持一层深。
5. **auto 模式越过暂停规则** —— 4 类情况必须停。
6. **混淆三套定位** —— VIBE 管创意端（可选）、agent-skills 管工程纪律、Superpowers 管编排与协作，不错位调用。
7. **分诊不宣告就开跑** —— 必须先宣告画像和阶段组合，给用户纠正机会。

---

## 7. 落地：命令文件改造范围

对 `.zcode/commands/dev.md` 的改造点：

| 原章节 | 改造 |
|--------|------|
| §0 你是谁 | 核心纪律第 1 条补"先分诊再编排" |
| §1 阶段总览 | 补"分诊→画像→阶段组合"入口流程 |
| §2 启动流程 | 重写：分诊判定 → 画像 → 阶段组合（替代原"读 state → 解析参数"） |
| §3 各阶段编排 | 每阶段从"固定技能清单"改成"查 §3 选配表"，补"阶段可被画像跳过" |
| §4 auto 暂停规则 | 保留，补"仅 project 档有意义" |
| §5 阶段跳转 | 改"全链门禁"为"就近前置校验" |
| §6 产出物清单 | 补"输入物"列（阶段模块化交接依据） |
| §7 技能索引 | 删 `vibe-architecture`；VIBE 系列标注"可选"；补 `orchestrate-projects` 升级交接说明 |
| §8 失败模式 | 补第 7 条"分诊不宣告就开跑" |

**产出物**：改造后的 `.zcode/commands/dev.md`（本次设计只定方案，实际改文件是下一步 implementation plan 的事）。
