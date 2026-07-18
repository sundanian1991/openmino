# anthropic-deck 编排技能 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建 `anthropic-deck` 编排技能，实现 Anthropic 风格 .pptx + HTML 海报的统一产出。

**Architecture:** 纯 Markdown 指令编排，单个 SKILL.md 文件。不自带任何视觉 token，运行时读取 `brand-guidelines`（橙调）和 `viz-anthropic`（蓝调）两个底层技能，按场景路由后委托 `pptx` / HTML 生成施工。范式参照项目内已有的 `content-viz-orchestrator`。

**Tech Stack:** Markdown（SKILL.md），YAML frontmatter，无代码、无脚本、无依赖包。

## Global Constraints

- **范式**：编排不施工，只引用不复述。SKILL.md 内**禁止**写入任何色值（如 `#d97757`）或字体名（如 `Poppins`）——所有视觉 token 必须运行时从底层技能读取。
- **单文件**：只创建 `.agents/skills/anthropic-deck/SKILL.md` 一个文件。不创建 design-model.yaml、references/、脚本。
- **命名**：技能名 `anthropic-deck`，目录名与技能名一致。
- **路径基准**：
  - 新技能位于项目级 `/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/`
  - 底层 `brand-guidelines` 在项目级 `.agents/skills/brand-guidelines/SKILL.md`
  - 底层 `viz-anthropic` 在用户级 `~/.agents/skills/viz-anthropic/SKILL.md` + `design-model.yaml`
  - 底层 `pptx` 在用户级 `~/.agents/skills/pptx/SKILL.md`
- **语言**：SKILL.md 用中文为主（与项目内 `content-viz-orchestrator` 一致），YAML frontmatter 的 `name`/`description` 用英文+中文混写以利触发。
- **提交规范**：每个 Task 末尾 `git commit`，格式 `type: description`（feat/docs/refactor/chore）。禁止 `--no-verify`、`reset --hard`、`push --force main`、`commit --amend`。
- **测试方法**：无传统单测。每个 Task 用"人工触发验证"——用一个示例 prompt 走一遍技能流程，检查产出是否符合 SKILL.md 描述。

---

## File Structure

```
.agents/skills/anthropic-deck/
└── SKILL.md    # 唯一文件，纯 Markdown 指令
```

**SKILL.md 内部结构**（分块编写，每个 Task 写一块）：

| 块 | 内容 | Task |
|----|------|------|
| YAML frontmatter | name + description（触发词） | Task 1 |
| 定位 | 一句话定位 + 做的事/不做的事 | Task 1 |
| 触发与路由 | 触发条件 + 场景路由规则（橙/蓝/覆盖） | Task 2 |
| 工作流 | 三步流程 + 风格决策卡模板 | Task 3 |
| 完成检查 | checklist | Task 3 |
| 端到端验证 | 用真实示例跑一遍 | Task 4 |

---

## Task 1: 创建 SKILL.md 骨架（frontmatter + 定位）

**Files:**
- Create: `.agents/skills/anthropic-deck/SKILL.md`

**Interfaces:**
- Produces: SKILL.md 文件存在，YAML frontmatter 合法，被技能系统识别

- [ ] **Step 1: 创建目录**

```bash
mkdir -p /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck
```

- [ ] **Step 2: 写 SKILL.md（frontmatter + 定位部分）**

```markdown
---
name: anthropic-deck
description: "Anthropic 对外产出编排器 — 输入大纲/草稿，产出统一公司风格的 .pptx 和 HTML 海报。按场景自动路由到橙调（brand-guidelines，对外/品牌）或蓝调（viz-anthropic，培训/课程）。触发于「Anthropic 风格 PPT/幻灯/演讲/海报/deck」「用 Anthropic 公司风格做演示」「给培训/演讲做配套图+幻灯」等。"
---

# anthropic-deck — Anthropic 风格对外产出编排器

## 定位

**编排器，不施工。** 只做三件事：

1. **场景判别**——读用户请求，判定"品牌/对外"还是"培训/课程"，路由到对应视觉语言
2. **风格注入**——读取底层风格技能的色值/字体，生成"风格决策卡"
3. **施工委托**——PPT 交 `pptx`（html2pptx 工作流），海报交 HTML 生成

## 做的事

- 判别场景（橙调 / 蓝调）
- 读底层风格技能拿 token（不凭记忆）
- 生成风格决策卡
- 委托 pptx / HTML 生成施工
- 强制配套产出（PPT + 海报）走同一风格

## 不做的事（硬边界）

- ❌ 不自带任何色值/字体 token（只在 brand-guidelines / viz-anthropic 读取）
- ❌ 不替代 pptx 的 XML/html2pptx 细节
- ❌ 不做 PDF / 培训页 / 整页 slide deck
- ❌ 不复述底层技能的规则，只引用

## 与现有技能的关系

```
anthropic-deck（编排，本技能）
   ├─ 读 → brand-guidelines（橙调，Anthropic 官方品牌）
   ├─ 读 → viz-anthropic（蓝调，Anthropic Skilljar 培训平台）
   ├─ 调 → pptx（施工 .pptx）
   └─ 调 → HTML 生成（施工海报，参照 frontend-style 范式）
```
```

- [ ] **Step 3: 验证 frontmatter 合法**

Run: `head -5 /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: 前 5 行是 `---` / `name: anthropic-deck` / `description: "..."` / `---` / 空行

- [ ] **Step 4: 验证不含色值/字体（硬约束）**

Run: `grep -E '#[0-9a-fA-F]{6}|Poppins|Lora|Space Grotesk|Inter|Source Serif' /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: 无输出（exit code 1）。如有输出则违反"只引用不复述"约束，需删除。

- [ ] **Step 5: 提交**

```bash
cd /Users/sundanian/Documents/projects/ai-agents/my-agent
git add .agents/skills/anthropic-deck/SKILL.md
git commit -m "feat: 新建 anthropic-deck 编排技能骨架（frontmatter + 定位）"
```

---

## Task 2: 写入触发与场景路由

**Files:**
- Modify: `.agents/skills/anthropic-deck/SKILL.md`（在"与现有技能的关系"块后追加）

**Interfaces:**
- Consumes: 无
- Produces: SKILL.md 含完整触发条件 + 场景路由规则

- [ ] **Step 1: 在文件末尾追加"触发与场景路由"章节**

在"与现有技能的关系"代码块结束后，追加以下内容：

```markdown

## 何时使用

### 触发条件（满足任一）

- 用户说"Anthropic 风格 / Anthropic 风" + 产出词（PPT / 幻灯 / 演讲 / 海报 / deck / slides）
- 用户提供大纲/草稿，明确要求"做成 Anthropic 公司风格的演示"
- 用户说"给这次培训/演讲做配套图 + 幻灯"（且明确 Anthropic 语境）

### 不触发

- 用户只说"做个 PPT"——无 Anthropic 语境，走通用 pptx
- 用户要做非 Anthropic 品牌的产出

## 场景路由规则

判断信号 → 视觉语言。

### 橙调：brand-guidelines（默认）

**触发关键词**：对外、演讲、品牌、发言、访谈、博客、press、对外 deck

**适用产出**：
- HTML 海报（默认走这套）
- 通用 PPT（非培训类）

**底层技能路径**：`.agents/skills/brand-guidelines/SKILL.md`

### 蓝调：viz-anthropic（培训专用）

**触发关键词**：培训、课程、教学、学习、lesson、course、training、LMS

**适用产出**：
- 培训幻灯
- 课程配套图

**底层技能路径**：`~/.agents/skills/viz-anthropic/SKILL.md` + `design-model.yaml`

### 覆盖规则

- 用户明说"用蓝调/橙调" → 听用户的，跳过判别
- 用户明说"两件套用同一风格" → 以 PPT 场景为准
- 信号模糊（既像培训又像对外）→ 默认橙调 + 问一句确认

### 配套产出的风格一致性约束

> 同一次请求里若同时产出 PPT + 海报，**两件强制走同一套视觉语言**，不允许混用。这是编排技能的核心价值。
>
> 明确：若 PPT 判定为培训类（蓝调），配套海报也必须用蓝调——即使海报本身默认走橙调。判别以 PPT 场景为准。
```

- [ ] **Step 2: 验证章节已追加**

Run: `grep -c "场景路由规则" /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: `1`（恰好一处）

Run: `grep -c "配套产出的风格一致性约束" /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: `1`

- [ ] **Step 3: 验证路由规则双向都写明路径**

Run: `grep -E "brand-guidelines/SKILL.md|viz-anthropic/SKILL.md" /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: 两行输出，分别对应橙调和蓝调的底层路径

- [ ] **Step 4: 验证仍不含色值/字体**

Run: `grep -E '#[0-9a-fA-F]{6}|Poppins|Lora|Space Grotesk' /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: 无输出

- [ ] **Step 5: 提交**

```bash
cd /Users/sundanian/Documents/projects/ai-agents/my-agent
git add .agents/skills/anthropic-deck/SKILL.md
git commit -m "feat: anthropic-deck 触发条件 + 场景路由规则（橙/蓝/覆盖）"
```

---

## Task 3: 写入工作流 + 风格决策卡 + 完成检查

**Files:**
- Modify: `.agents/skills/anthropic-deck/SKILL.md`（在"配套产出的风格一致性约束"块后追加）

**Interfaces:**
- Consumes: 无
- Produces: SKILL.md 含完整三步工作流 + 风格决策卡模板 + 完成检查清单

- [ ] **Step 1: 在文件末尾追加"工作流"章节**

追加以下内容：

```markdown

## 工作流（三步）

```
用户请求进入
  ↓
Step 1：场景判别（编排技能自己做）
  · 扫关键词 → 路由到橙调 / 蓝调
  · 信号模糊 → 问一句确认
  · 用户已明说 → 直接采用，跳过判别
  输出：视觉语言标签（orange | blue）+ 产出清单（pptx | poster | both）
  ↓
Step 2：风格注入（读底层，不复述）
  · orange → 读 .agents/skills/brand-guidelines/SKILL.md 拿色值+字体
  · blue → 读 ~/.agents/skills/viz-anthropic/SKILL.md + design-model.yaml 拿 token
  输出：一份"风格决策卡"（Markdown，不写死在编排技能里）
  ↓
Step 3：施工委托（调底层技能）
  · .pptx → 交 pptx skill 的 html2pptx 工作流
            输入：风格决策卡 + 用户大纲
            输出：.pptx 文件
  · HTML 海报 → 交 HTML 生成（参照 frontend-style 范式）
            输入：风格决策卡 + 海报内容
            输出：单文件 HTML
  · 配套产出（both）→ 风格决策卡强制同一份，先做 PPT 再做海报
```

### Step 1：场景判别

扫用户请求里的关键词（见"场景路由规则"），判定：
- 视觉语言：`orange`（brand-guidelines）还是 `blue`（viz-anthropic）
- 产出清单：`pptx` / `poster` / `both`

**判别出口**：
- 用户明说风格 → 直接采用，跳过关键词扫描
- 关键词明确指向某一类 → 直接采用
- 信号模糊 → 默认 `orange`，并问一句："这次是对外品牌场景（橙调）还是培训课程（蓝调）？"

### Step 2：风格注入

**强制读底层技能，不凭记忆。** 读对应底层 SKILL.md，提取：
- 配色（主色、背景、强调色）
- 字体（标题、正文）

填入"风格决策卡"。**禁止在编排技能里硬编码任何 token**——每次都要现读。

#### 风格决策卡模板

```markdown
## 风格决策卡

### 场景
- 类型：[对外演讲 / 培训课程 / 品牌]
- 视觉语言：[brand-guidelines(橙) | viz-anthropic(蓝)]
- 来源：[读取自 <底层技能路径>]

### 配色（来自 <来源>）
- 主色：[从来源读取]
- 背景：[从来源读取]
- 强调色：[从来源读取]

### 字体（来自 <来源>）
- 标题：[从来源读取]
- 正文：[从来源读取]

### 产出清单
- [ ] .pptx：[文件名]
- [ ] HTML 海报：[文件名]
```

### Step 3：施工委托

**PPT 路径**：
1. 用风格决策卡的配色/字体，把用户大纲转成幻灯 HTML
2. 调 pptx skill 的 html2pptx 工作流转成 .pptx
3. 输出 .pptx 文件

**HTML 海报路径**：
1. 用风格决策卡的配色/字体，生成单文件 HTML 海报
2. 参照 frontend-style 范式做布局
3. 输出 .html 文件

**配套产出（both）**：
- 风格决策卡**强制同一份**
- 先做 PPT，再用同一张决策卡做海报
- 两件产出的配色/字体必须完全一致

## 完成检查

每次产出前自查：

- [ ] 场景判别完成（橙/蓝 + 理由）？
- [ ] 读了对应底层风格技能（不是凭记忆）？
- [ ] 风格决策卡已生成？
- [ ] PPT 走了 pptx skill 的 html2pptx？
- [ ] 配套产出强制同风格？
- [ ] 没有在编排技能里复述色值/字体（只引用）？
```

- [ ] **Step 2: 验证工作流三步都写明**

Run: `grep -cE 'Step [123]：' /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: `3`（Step 1/2/3 各一处在大纲里）+ 3（在详细说明里）= 至少 6。实际检查至少有 "Step 1：场景判别" "Step 2：风格注入" "Step 3：施工委托" 三处

Run: `grep "风格决策卡模板" /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: 一行匹配

- [ ] **Step 3: 验证完成检查清单存在且条目完整**

Run: `grep -A 8 "## 完成检查" /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md | grep -c "\[ \]"`
Expected: `6`（6 条 checklist）

- [ ] **Step 4: 验证仍不含色值/字体**

Run: `grep -E '#[0-9a-fA-F]{6}|Poppins|Lora|Space Grotesk' /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: 无输出

- [ ] **Step 5: 提交**

```bash
cd /Users/sundanian/Documents/projects/ai-agents/my-agent
git add .agents/skills/anthropic-deck/SKILL.md
git commit -m "feat: anthropic-deck 工作流 + 风格决策卡 + 完成检查"
```

---

## Task 4: 端到端验证（技能被识别 + 流程可走通）

**Files:**
- 无文件修改，仅验证

**Interfaces:**
- Consumes: Task 1-3 的 SKILL.md
- Produces: 验证报告（口头确认即可）

这个 Task 不写代码，只做"上线前体检"——确认技能能被系统识别、内容完整、约束未被违反。

- [ ] **Step 1: 验证技能目录结构正确**

Run: `ls -la /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/`
Expected: 只有 `SKILL.md` 一个文件（+ 可能的 `.DS_Store`）。无 design-model.yaml、无 references/、无脚本。

- [ ] **Step 2: 验证 YAML frontmatter 合法且 description 含触发词**

Run: `head -4 /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected:
```
---
name: anthropic-deck
description: "Anthropic 对外产出编排器 — ...（含 PPT/幻灯/演讲/海报/deck 触发词）..."
---
```

Run: `grep -oE 'PPT|幻灯|演讲|海报|deck' /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md | head -1`
Expected: 至少匹配到一个触发词

- [ ] **Step 3: 验证全局约束——零色值零字体**

Run: `grep -E '#[0-9a-fA-F]{6}|Poppins|Lora|Space Grotesk|Inter|Source Serif' /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: 无输出（exit code 1）。这是"只引用不复述"的硬约束。

- [ ] **Step 4: 验证底层技能引用路径正确**

Run: `grep -E 'brand-guidelines/SKILL.md|viz-anthropic/SKILL.md' /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/anthropic-deck/SKILL.md`
Expected: 两个路径都出现

验证路径实际存在：
```bash
test -f /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/brand-guidelines/SKILL.md && echo "brand-guidelines OK" || echo "brand-guidelines MISSING"
test -f /Users/sundanian/.agents/skills/viz-anthropic/SKILL.md && echo "viz-anthropic OK" || echo "viz-anthropic MISSING"
test -f /Users/sundanian/.agents/skills/pptx/SKILL.md && echo "pptx OK" || echo "pptx MISSING"
```
Expected: 三个都 OK

- [ ] **Step 5: 验证技能能被系统发现**

新开一个会话或检查技能列表是否含 `anthropic-deck`。若本地有 `myagents-cli` 或类似工具：
```bash
ls /Users/sundanian/.agents/skills/ | grep anthropic-deck
ls /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/ | grep anthropic-deck
```
Expected: 项目级目录下能列出 `anthropic-deck`

- [ ] **Step 6: 模拟触发测试（人工）**

用一个示例 prompt 在新会话里验证触发：
> "帮我做一份 Anthropic 风格的演讲 PPT，主题是 AI 安全，5 页"

预期行为：
1. 技能被触发（description 匹配 "Anthropic 风格" + "演讲 PPT"）
2. 场景判别 → 橙调（brand-guidelines，因为"演讲"是对外场景）
3. 读取 brand-guidelines 拿到橙调 token
4. 生成风格决策卡
5. 调 pptx skill 施工

若技能未被触发 → 回到 Task 1 检查 description 触发词是否够强。
若场景判别错误 → 回到 Task 2 检查关键词清单。

- [ ] **Step 7: 最终提交（如有微调）**

如 Step 1-6 过程中发现需要微调 SKILL.md：
```bash
cd /Users/sundanian/Documents/projects/ai-agents/my-agent
git add .agents/skills/anthropic-deck/SKILL.md
git commit -m "fix: anthropic-deck 端到端验证后的微调"
```

如无微调，此步跳过。

---

## Self-Review

### 1. Spec 覆盖检查

| Spec 要求 | 对应 Task |
|-----------|----------|
| §1 定位与边界（编排不施工） | Task 1（定位+硬边界） |
| §1 与现有技能关系图 | Task 1（关系图） |
| §2 触发条件 | Task 2（何时使用） |
| §2 场景路由（橙/蓝） | Task 2（场景路由规则） |
| §2 覆盖规则 | Task 2（覆盖规则） |
| §2 配套产出风格一致性 | Task 2（风格一致性约束） |
| §3 工作流三步 | Task 3（工作流） |
| §3 风格决策卡模板 | Task 3（风格决策卡模板） |
| §3 完成检查 | Task 3（完成检查） |
| 文件结构（单文件） | Task 1 + Task 4 Step 1 验证 |
| Global Constraint（零 token） | 每个 Task 都有 grep 验证 |

**无遗漏。**

### 2. 占位符扫描

- 所有 `[文件名]` / `[从来源读取]` 都在**模板示例**里（风格决策卡模板），不是 plan 自身的 TBD。✅
- 无 "TBD" / "TODO" / "implement later"。✅
- 每个 Step 都有具体命令或具体内容。✅

### 3. 类型/路径一致性

- `brand-guidelines` 路径统一为 `.agents/skills/brand-guidelines/SKILL.md`（项目级）✅
- `viz-anthropic` 路径统一为 `~/.agents/skills/viz-anthropic/SKILL.md`（用户级）✅
- `pptx` 路径统一为 `~/.agents/skills/pptx/SKILL.md`（用户级）✅
- 技能名 `anthropic-deck` 全文一致 ✅

### 4. 风险提示

- **Task 4 Step 5-6 依赖外部会话**——技能发现和触发测试需要新会话或 CLI 工具，单次执行可能无法完全自动化。如执行环境不支持，标记为"需用户在新会话验证"。
- **html2pptx 工作流细节**——本编排技能只负责委托，具体 html2pptx 的 HTML 规范由 pptx skill 定义。若 pptx skill 的 HTML 规范与本技能的"风格决策卡→HTML"流程有摩擦，执行时需要协调（但这属于 pptx skill 的范畴，不在本 plan 内）。
