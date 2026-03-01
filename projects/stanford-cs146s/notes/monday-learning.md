---
input: Day 1 必读文章（3篇）+ 我们的实践对比
output: 实践导向学习笔记
pos: projects/stanford-cs146s/notes/ 周一学习笔记
---

# Day 1 学习笔记 | 实践导向版

> 统一结构：核心内容 → 实践对比 → 行动建议

---

## 📌 结构说明

每篇文章按此模式分析：
1. **核心内容提炼** — 主要讲了什么
2. **关键要点提取** — 需要记住的要点
3. **与我们实践的对比** — 我们怎么做 vs 他们建议
4. **核心逻辑脉络** — 为什么这么做
5. **实践建议** — 我们应该做什么

---

# 文章 1：How Anthropic Teams Use Claude Code

## 📖 核心内容提炼

**来源**：Anthropic 内部白皮书（PDF）
**访问方式**：Claude Code 在 Anthropic 的 9 个部门内部应用案例

**覆盖部门**（9个）：
1. 数据基础设施（Data Infrastructure）
2. 产品开发（Product Development）
3. 安全工程（Security Engineering）
4. 推理（Inference）
5. 数据科学与可视化（Data Science & Visualization）
6. API（API）
7. 增长营销（Growth Marketing）
8. 产品设计（Product Design）
9. RL 工程（RL Engineering）
10. 法务（Legal）

---

## 🔑 关键要点提取

### 要点 1：跨部门广泛应用

**发现**：Claude Code 不只是工程工具，是全组织能力放大器

| 部门类型 | 传统障碍 | Claude Code 突破 |
|---------|---------|-----------------|
| **技术部门** | 效率瓶颈 | 自动化复杂任务 |
| **非技术部门** | 技能差距 | 桥接技能鸿沟 |
| **法务/营销** | 依赖工程 | 独立完成工作 |

### 要点 2：技能桥接效应

**核心洞察**：
> 非技术员工能完成原本需要开发的工作

**示例场景**：
- 法务：独立分析合同条款，不需工程协助
- 营销：自己构建落地页，不等开发排期
- 产品设计：快速原型验证，减少沟通成本

### 要点 3：自动化程度分层

| 任务类型 | 自动化程度 | 人工介入 |
|---------|-----------|---------|
| **重复性任务** | 高自动化 | 验收即可 |
| **复杂决策** | 辅助决策 | 关键点介入 |
| **创造性工作** | 协作模式 | 持续对话 |

---

## 🔄 与我们实践的对比

| 维度 | Anthropic 做法 | 我们做法 | 差距分析 |
|------|---------------|---------|---------|
| **应用范围** | 9个部门全用 | 主要是技术任务 | ✅ 可扩展到文档/汇报 |
| **Subagent 策略** | 按场景明确分类 | Explore/general-purpose/Plan | ✅ 需要明确自主级别 |
| **并行任务** | 根据任务性质动态选择 | 固定策略 | ✅ 需要优化选择逻辑 |
| **验证机制** | 人工 + 自动结合 | Hook 验证 | ✅ 已有，可增强 |
| **非技术场景** | 法务/营销/设计都在用 | 主要是技术任务 | ✅ 值得探索 |

---

## 🧠 核心逻辑脉络

```
Claude Code 定位
    ↓
不是"替代开发者"
    ↓
是"能力放大器"
    ↓
技术员工 → 更快完成复杂任务
非技术员工 → 跨越技能差距
    ↓
组织整体能力提升
```

**关键认知**：
- Claude Code 的价值 = **覆盖部门数量** × **应用深度**
- 不只是提升效率，是**改变工作方式**

---

## ✅ 实践建议

### 立即可做（本周）

1. **扩展非技术场景**
   - 用 Claude Code 起草正式汇报文档
   - 用 Claude Code 优化供应商管理材料
   - 用 Claude Code 分析业务数据

2. **明确 Subagent 自主级别**
   - Explore（低自主）：每步确认
   - general-purpose（中自主）：阶段确认
   - Plan（高自主）：仅验收

### 中期优化（本月）

3. **优化并行策略**
   - 简单任务：直接执行
   - 独立任务：并行 ≤3
   - 强依赖链：串行执行

4. **增强验证机制**
   - 人工验收关键决策
   - Hook 自动检查常规问题
   - 多轮审查高风险任务

---

# 文章 2：Claude Code Best Practices

## 📖 核心内容提炼

**来源**：社区综合分析 12 篇文章的 Best Practices
**规模**：4987 字，25 分钟阅读时间

**三个核心观点**：
1. **Context 管理最重要** — Context 退化是主要失败模式
2. **Plan First 不可协商** — 生产代码必须先规划
3. **简单胜过复杂** — 简单控制循环 > 多 Agent 系统

---

## 🔑 关键要点提取

### 要点 1：Context 管理（最关键）

#### CLAUDE.md 文件结构

| 类型 | 位置 | 大小限制 | 内容 |
|------|------|---------|------|
| **根目录** | `/CLAUDE.md` | 100-200 行 | 通用规则、命令引用 |
| **子目录** | `/path/CLAUDE.md` | 50-100 行 | 项目特定、本地命令 |

**反模式避免**：
```
❌ @-file docs（嵌入整个文件）
❌ "Never use --foo-bar flag"（会卡住 Agent）
❌ 写全面手册

✅ "For complex usage, see path/to/docs.md"
✅ "Never use --foo-bar; prefer --baz instead"
✅ 记录 Claude 经常犯错的地方
```

#### 激进的 Context 清理

**清理阈值**：
- 60k tokens 或 30% context
- 不要等到上下文限制

**清理模式**：
```
简单重启：/clear + /catchup
复杂任务：Document & Clear
  1. 写进度到 .md 文件
  2. /clear 清理上下文
  3. 新会话读取 .md 文件
  4. 继续工作
```

**避免 /compact**：
> "自动压缩是不透明、容易出错、未优化的" — Shrivu Shankar

#### 文档系统（Dev Docs）

**三文件模式**：
```
~/dev/active/[task-name]/
├── [task-name]-plan.md      # 被接受的计划
├── [task-name]-context.md   # 关键文件、决策
└── [task-name]-tasks.md     # 工作检查清单
```

**动态文档方法**：
- 实施时更新计划
- 每次提交前检查计划最新状态
- 让新对话准确接续之前工作

---

### 要点 2：规划与架构

#### Planning Mode 是强制的

**规划工作流**：

```
Step 1: 初始规划
  1. 进入 Planning Mode
  2. 提供高层描述 + 现有代码指针
  3. 让 Claude 研究并提出方案
  4. 彻底审查（早期发现误解）

Step 2: 计划验证
  - 问澄清问题
  - 挑战假设
  - 请求 2-3 个替代方案（优劣对比）
  - 使用 "think", "think hard", "ultrathink" 深度分析

Step 3: 文档化
  - 退出 plan mode 并创建 dev docs
  - 或使用 /dev-docs slash 命令
  - 存储在版本控制位置

Step 4: 实施
  - 用计划启动新上下文
  - 分阶段实施（每次 1-2 部分）
  - 阶段之间审查
  - 边做边更新计划
```

#### Explore, Plan, Code, Commit

**工作流**：
```
1. Explore：读相关文件、图片、URL（明确告知暂不编码）
2. Plan：用 subagents 验证细节，用 "think" 模式创建计划
3. Code：实施并明确验证步骤
4. Commit：更新 README/changelog，创建 PR
```

**关键洞察**：
> "步骤 #1-#2 至关重要 — 没有它们，Claude 倾向于直接跳到编码"

---

### 要点 3：工具使用与自动化

#### Skills 系统

**关键发现**：Skills 需要自动激活才能可靠工作

**问题**：手动 skills 约 90% 时间被忽略

**解决方案**：基于 Hook 的自动激活

**自动激活模式**：

**UserPromptSubmit Hook**（Claude 看到消息前）：
```
1. 分析 prompt 的关键词/意图
2. 检查相关 skills
3. 注入 "🎯 SKILL ACTIVATION CHECK - Use X skill"
4. Claude 读问题前看到提醒
```

**Stop Event Hook**（响应后）：
```
1. 分析编辑的文件
2. 检查风险模式（try-catch, DB ops, async）
3. 显示温和的自我检查提醒
4. 非阻塞感知
```

**skill-rules.json 模式**：
```json
{
  "backend-dev-guidelines": {
    "type": "domain",
    "enforcement": "suggest",
    "priority": "high",
    "promptTriggers": {
      "keywords": ["backend", "controller", "API"],
      "intentPatterns": ["(create|add).*?(route|endpoint)"]
    },
    "fileTriggers": {
      "pathPatterns": ["backend/src/**/*.ts"],
      "contentPatterns": ["router\\."]
    }
  }
}
```

**Skill 结构**（Anthropic 最佳实践）：
- 主 SKILL.md：低于 500 行
- 用渐进式披露 + 资源文件
- 重构前：1500+ 行文件
- 重构后：300-400 行主文件 + 10-11 个资源文件
- Token 效率提升 40-60%

---

#### Hooks 质量控制

**共识 Hook 类型**：

**1. Block-at-Submit Hooks**（主要策略）：
```
PreToolUse hook 包装 Bash(git commit)
  → 检查 /tmp/agent-pre-commit-pass 文件
  → 文件缺失则阻止提交
  → 强制 "test-and-fix" 循环直到通过
```

**2. Hint Hooks**（非阻塞反馈）：
```
检测到次优模式时提供即抛即用指导
```

**关键洞察**：
> "不要在写入时阻塞 — 让 agent 完成计划，然后检查最终结果"

**常见 Hooks**：
- Build checker（TypeScript/linter 错误）
- Test runner（确保测试通过）
- Error handling reminder（温和的哲学提醒）
- Skills auto-activation（上文已述）

---

#### 简单控制循环

**关键洞察**：
> "Debuggability >>> 复杂的手调多 Agent lang-chain-graph-node 混合体"

**Claude Code 架构**：
- 一个主线程（扁平消息列表）
- 最多一个分支（subagent 结果加入主历史）
- 无复杂多 Agent 系统
- 大多数任务用简单迭代工具调用

**引用**：
> "尽管多 Agent 系统很流行，Claude Code 只有一个主线程……我高度怀疑你的应用需要多 Agent 系统。"

**原因**：
- 每个抽象层让调试指数级变难
- 偏离通用模型改进轨迹
- LLM 是脆弱的；增加复杂性会不可预测地破坏

---

#### LLM Search > RAG

**Claude Code 方法**：复杂的 ripgrep、jq、find 命令（无 RAG）

**为什么不用 RAG**：

RAG 引入隐藏失败模式：
- 什么相似度函数？
- 什么重排器？
- 如何 chunk 代码？
- 如何处理大 JSON/logs？

LLM Search：
- 看 10 行理解结构
- 需要再看 10 行（就像人类）
- RL 可学习（BigLabs 已在工作）
- 模型做重活（更少移动部分）

**引用**：
> "这是 LLM 时代的 Camera vs Lidar"

---

### 要点 4：生产代码质量

#### TDD（测试驱动开发）

**为什么 AI 更重要**：
> AI 生成的代码经常"表面上工作"但包含微妙 bug。测试提供唯一可靠的验证机制。

**共识模式**（4+ 来源）：
```
1. 实施前写测试
2. 确认测试失败（避免 mock 实现）
3. 分开提交测试
4. 实施直到测试通过
5. 实施期间不修改测试
```

#### 代码审查（包括 AI 自己的工作）

**关键洞察**：
> "我相信我对有我名字的 PR 中的代码负责，不管它是如何生产的" — Chris Dzombak

**多层审查流程**：
```
1. Claude 自审查：用 subagents 或新鲜上下文
2. 人工审查：手动验证行为和测试覆盖
3. 多 Claude 实例：一个写，另一个审查（新上下文 = 更好批判）
```

**检查什么**：
- 意大利面代码（难以跟随的逻辑）
- 重大 API/后端变更
- 不必要的 imports、functions、comments
- 缺少错误处理
- 安全漏洞

---

## 🔄 与我们实践的对比

| 实践 | Anthropic/社区建议 | 我们做法 | 差距/优势 |
|------|-------------------|---------|----------|
| **CLAUDE.md** | 根目录 100-200 行 | ✅ 完善，可能偏长 | 需审查 token 使用 |
| **Context 清理** | 60k/30% 主动清理 | 会话重启时 | ✅ 可更主动 |
| **Dev Docs** | 三文件模式 | ✅ Plan First 已有 | 符合最佳实践 |
| **Planning Mode** | 强制 | ✅ Plan First 机制 | 符合最佳实践 |
| **Skills** | 自动激活 Hook | ❌ 无自动激活 | ⚠️ 需要添加 |
| **Hooks** | 质量 Gates | ✅ pre-commit hook | 符合最佳实践 |
| **TDD** | 测试优先 | ⚠️ 部分遵循 | 可增强 |
| **简单控制循环** | 避免多 Agent | ✅ 用 3 个 subagent | 符合原则 |

---

## 🧠 核心逻辑脉络

```
Claude Code 成功的关键
    ↓
Context 管理（基础）
    ↓
Plan First（方法论）
    ↓
简单胜过复杂（架构）
    ↓
质量 Gates（保障）
    ↓
生产级代码
```

**关键认知**：
- Context 退化是主要失败模式
- Vibe coding 适用于抛弃型 MVP，生产代码需要结构化思考
- 每个抽象层让调试指数级变难

---

## ✅ 实践建议

### 立即可做（本周）

1. **审查 CLAUDE.md 大小**
   - 检查根目录 CLAUDE.md token 使用
   - 考虑拆分或精简到 200 行以内

2. **添加 Skills 自动激活**
   - 实现 UserPromptSubmit Hook
   - 分析 prompt 激活相关 skills

3. **增强 Context 清理意识**
   - 主动在 60k tokens 时清理
   - 使用 Document & Clear 模式处理复杂任务

### 中期优化（本月）

4. **完善 Dev Docs 系统**
   - 标准化三文件模式
   - 更新计划时同步文档

5. **强化 TDD 实践**
   - 测试优先：先写测试
   - 分开提交测试代码
   - 不在实施中修改测试

---

# 文章 3：Specs Are the New Source Code

## 📖 核心内容提炼

**来源**：Ravi Mehta（Stripe 前工程总监）
**核心论点**：
> "Specs 是新的源代码 — AI 时代，写规范比写代码更重要"

**时代转变**：
- 传统：代码 → 文档
- AI 时代：Spec → AI 生成代码

---

## 🔑 关键要点提取

### 要点 1：Spec 重新定位

**Sean Grove（OpenAI）论点**：
> 一个写得好的 prompt（即 spec）是新的源代码。

**当前问题**：
- 我们生成代码 → 保留代码 → 丢弃 prompt
> "这感觉像是你撕碎了源代码，然后非常仔细地版本控制二进制文件"

**正确方式**：
- Spec 包含一切：注释、结构、文档
- 代码是"有损投影"
- Spec 可生成：TypeScript/Rust/服务器/客户端/文档/教程/播客

**关键价值**：
> "书面规范有效地对齐人类，是用于沟通、讨论、辩论、引用和同步的制品。"

---

### 要点 2：原型没有杀死 Spec

**旧工作流**：
```
模糊想法 → wireframes → 设计 → 工程构建 MVP → 客户反馈 → 痛苦的 spec 修订 → wireframes → 设计 → 重建 → 祈祷
```

**新工作流**：
```
模糊想法 → 快速原型 → 客户反馈 → 清晰的 spec → AI 辅助实施
```

**关键洞察**：
> 原型没有杀死 spec。它们让 spec 更好。

**工具**：v0、Lovable、Replit（几小时而非几周）

---

### 要点 3：Spec 驱动开发实践

**Danny Martinez（Decimals 创始人）示例**：

**任务**：添加一个按钮，跳转到公司申请页面

**工具链**：
- 项目管理：Linear
- IDE：VS Code
- 扩展：GitHub Copilot Pro
- 模型：Claude Sonnet 4
- MCP：Linear MCP server

**流程**：
```
1. 从 Slack 消息生成 Linear ticket（00:14）
2. 在 ticket 中明确想要的新文案（00:25）
3. 打开 Copilot，让 Claude 打开 Linear ticket（01:18）
4. 让 Claude 审查 ticket 并相对代码库分析（01:52）
5. 让 Claude 创建分支并实施更改（02:30）
6. 测试更改确保按预期工作（02:52）
7. 在 GitHub 上打开 PR（03:55）
8. 等待工程师审查/批准 PR
```

**关键点**：
- 非技术人可以贡献代码库
- 关键不是代码本身：是 spec
- 规则已改变：Specs 是为所有人构建产品的真理来源，包括 LLM

**成功条件**：
1. **具体**：模糊 spec 导致混乱代码库
2. **选择性**：复杂任务需要知道的人在参与
3. **守门**：实际工程师审查变更

---

## 🔄 与我们实践的对比

| 维度 | 文章建议 | 我们做法 | 差距/行动 |
|------|---------|---------|----------|
| **Spec 定位** | 新的源代码 | Plan First 有 spec | ✅ 方向正确 |
| **原型先行** | 快速原型 → 清晰 spec | 直接规划 | ✅ 可探索 |
| **具体性** | 模糊 spec 是灾难 | ✅ Plan First 具体化 | 符合 |
| **非技术参与** | PM 可以写代码 | 主要是技术任务 | ⚠️ 可扩展 |
| **守门机制** | 工程师审查 | ✅ Plan First 验证 | 符合 |

---

## 🧠 核心逻辑脉络

```
AI 时代开发范式
    ↓
实施不再是瓶颈
    ↓
瓶颈 = 知道构建什么 + 对齐团队
    ↓
所有压力聚焦到一个制品
    ↓
Spec（新的源代码）
    ↓
对齐人类 + 机器
```

**关键认知**：
- 稀缺技能转移：编码 → 沟通
- "在不久的将来，最有效沟通的程序员是最有价值的。"
- PM 的核心技能（理解用户需求、明确定义问题、设计优雅解决方案）呈指数级更有价值

---

## ✅ 实践建议

### 立即可做（本周）

1. **强化 Plan First 中的 Spec 章节**
   - 添加"为什么做"（用户需求）
   - 添加"成功标准"（可验证）
   - 添加"约束条件"（技术/业务）

2. **提升 Spec 具体性**
   - 避免"添加用户设置页面"
   - 使用"在 /settings 创建用户设置页面，包含：个人资料、通知偏好、使用现有 UserProfile 组件模式..."

### 中期探索（本月）

3. **原型先行实验**
   - 对于 UI 任务：先用 v0/前端工具快速原型
   - 收集反馈后再写 spec
   - 对比"原型先行"vs"直接规划"的效果

4. **扩展非技术场景**
   - 供应商管理材料：用 spec 驱动生成
   - 汇报文档：用 spec 定义结构
   - 数据分析：用 spec 明确问题

---

# 📊 三篇文章综合洞察

## 共同主题

| 主题 | 文章1 | 文章2 | 文章3 | 综合 |
|------|-------|-------|-------|------|
| **沟通 > 编码** | 跨部门应用 | Context 管理 | Spec 是新源代码 | ✅ |
| **明确 > 模糊** | 技能桥接 | 具体指令 | 具体 spec | ✅ |
| **简单 > 复杂** | 自动化分层 | 简单控制循环 | 原型先行 | ✅ |
| **验证 > 信任** | 人工+自动 | 质量 Gates | 守门机制 | ✅ |

---

## 行动优先级

### 🔴 本周完成（3月1日-3月7日）

1. **更新 Subagent 策略**
   - 定义三级自主（低/中/高）
   - 添加"何时不用 Subagent"规则
   - 实施并行限制 ≤3

2. **添加 Skills 自动激活**
   - 实现 UserPromptSubmit Hook
   - 创建 skill-rules.json

3. **强化 Plan First Spec**
   - 添加"为什么做"章节
   - 提升 Spec 具体性要求

### 🟠 本月完成（3月）

4. **扩展非技术场景**
   - 文档/汇报用 Claude Code
   - 供应商管理材料 spec 驱动

5. **优化 Context 管理**
   - 审查 CLAUDE.md token 使用
   - 主动在 60k 时清理

6. **原型先行实验**
   - UI 任务先用快速原型
   - 收集反馈后再规划

---

*创建时间：2026-03-01（周一）*
*预计复盘：2026-03-07（周五）*
