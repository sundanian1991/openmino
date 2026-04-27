# Claude Agent 基础设施 — 插件架构、参考文档、配置体系

> Sources: Mino, 2026-02-12 ~ 2026-04-26
> Raw: [compound-knowledge-plugin/README](../../raw/claude-plugins/compound-knowledge-plugin-README.md), [compound-knowledge-plugin/PRIVACY](../../raw/claude-plugins/compound-knowledge-plugin-PRIVACY.md), [compound-knowledge-plugin/SECURITY](../../raw/claude-plugins/compound-knowledge-plugin-SECURITY.md), [compound-knowledge-plugin/AGENTS](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-AGENTS.md), [compound-knowledge-plugin/CLAUDE.md](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-CLAUDE.md), [compound-knowledge-plugin/README (plugin)](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-README.md), [compound-knowledge-plugin/CHANGELOG](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-CHANGELOG.md), [compound-knowledge-plugin/PRIVACY (plugin)](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-PRIVACY.md), [compound-knowledge-plugin/SECURITY (plugin)](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-SECURITY.md), [compound-knowledge-plugin/skills/kw-brainstorm](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-brainstorm-SKILL.md), [compound-knowledge-plugin/skills/kw-plan](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-plan-SKILL.md), [compound-knowledge-plugin/skills/kw-confidence](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-confidence-SKILL.md), [compound-knowledge-plugin/skills/kw-review](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-review-SKILL.md), [compound-knowledge-plugin/skills/kw-work](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-work-SKILL.md), [compound-knowledge-plugin/skills/kw-compound](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-skills-kw-compound-SKILL.md), [compound-knowledge-plugin/agents/research/knowledge-base-researcher](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-research-knowledge-base-researcher.md), [compound-knowledge-plugin/agents/research/past-work-researcher](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-research-past-work-researcher.md), [compound-knowledge-plugin/agents/research/stale-knowledge-checker](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-research-stale-knowledge-checker.md), [compound-knowledge-plugin/agents/review/strategic-alignment-reviewer](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-review-strategic-alignment-reviewer.md), [compound-knowledge-plugin/agents/review/data-accuracy-reviewer](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-review-data-accuracy-reviewer.md), [03-USER](../../raw/claude-reference/03-USER.md), [04-MEMORY](../../raw/claude-reference/04-MEMORY.md), [05-self-review](../../raw/claude-reference/05-self-review.md), [07-WORK](../../raw/claude-reference/07-WORK.md), [08-WORKFLOW](../../raw/claude-reference/08-WORKFLOW.md), [09-TOOLS](../../raw/claude-reference/09-TOOLS.md), [10-CODESTYLE](../../raw/claude-reference/10-CODESTYLE.md), [11-CONFIG](../../raw/claude-reference/11-CONFIG.md), [12-TRANSPARENT](../../raw/claude-reference/12-TRANSPARENT.md), [13-VISUALIZATION](../../raw/claude-reference/13-VISUALIZATION.md), [14-ECHARTS-COMPONENTS](../../raw/claude-reference/14-ECHARTS-COMPONENTS.md), [15-APPLICABILITY](../../raw/claude-reference/15-APPLICABILITY.md), [reference/README](../../raw/claude-reference/README.md)

## Overview

本文档全面覆盖 Claude Agent 在本项目中的基础设施体系，包含三个维度：**插件架构**（Compound Knowledge Plugin，含 6 个 Skills、5 个 Agents、完整安装与配置体系）、**参考文档库**（13 篇扩展规则，覆盖用户洞察、工作契约、工具策略、代码风格、可视化规范）、**CLAUDE.md 配置模式**（目录约定、加载机制、配置层次）。共计 31 个原始文件，构成 Mino Agent 运行的完整技术底座。

---

## 一、Compound Knowledge Plugin — 知识工作插件

### 插件概述

Compound Knowledge Plugin（来自 EveryInc/compound-knowledge-plugin）是知识工作的循环增强系统。核心理念：每个知识工作周期都应该让下一个周期更快。通过 `/kw:plan` 自动搜索 `docs/knowledge/` 中的历史洞察，通过 `/kw:compound` 保存新学到的知识，形成知识复利。

**设计类比**：知识工作版的 Compound Engineering —— 把工程领域的持续改进理念应用到知识工作中。

### 完整工作流循环

```
/kw:brainstorm   →  头脑风暴，拉取参考，找到问题形状
/kw:plan         →  结构化可执行计划（三档详细度）
/kw:confidence   →  诚实评估已知 vs 未知（随时可调用）
/kw:review       →  双重并行审查（战略对齐 + 数据准确）
/kw:work         →  执行计划，产出交付物
/kw:compound     →  保存学习成果，下次自动检索
```

每个周期让下一个更快。`/kw:plan` 自动搜索 `docs/knowledge/` 中的过往洞察。知识持续复利。

### 插件组件架构

| 组件类型 | 数量 | 名称 |
|----------|------|------|
| **Skills** | 6 | kw-brainstorm, kw-plan, kw-confidence, kw-review, kw-work, kw-compound |
| **Review Agents** | 2 | strategic-alignment-reviewer, data-accuracy-reviewer |
| **Research Agents** | 3 | past-work-researcher, knowledge-base-researcher, stale-knowledge-checker |

**总组件数**：11 个（6 Skills + 5 Agents）。

---

### Skill 层

#### kw-brainstorm — 头脑风暴

**触发**：`/kw:brainstorm 问题描述`

**功能**：粘贴会议记录、大脑倾倒原始想法、或描述问题。自动搜索知识库和过往计划获取相关上下文，提取关键决策、开放问题、约束条件和张力。

**输出**：`plans/问题名-日期/00-brainstorm.md`

#### kw-plan — 制定计划

**触发**：`/kw:plan`

**功能**：将头脑风暴结构化可执行计划。启动并行研究 Agent 查找过往工作和已保存的洞察。输出金字塔原理计划（结论先行），三档详细度：Quick（直觉检查）、Standard（大多数计划）、Deep（多季度策略）。

**输出**：`plans/问题名-日期/01-research.md`

#### kw-confidence — 信心评估

**触发**：循环中任何时间点可调用的 `/kw:confidence`。

**功能**：暂停并诚实评估 Claude 知道什么和不知道什么 —— 用自然语言，不是表格。产出 "确信的部分 / 不太确信的部分 / 我的建议" 分解，然后提供缩小差距的具体行动。

**输出**：`plans/问题名-日期/02-confidence.md`

#### kw-review — 双重审查

**触发**：`/kw:review`

**功能**：两个审查者**并行**检查工作：
- **战略对齐审查** —— 目标是否清晰？假设是否可证伪？我们在解决正确的问题吗？
- **数据准确性审查** —— 数字有来源吗？基线明确吗？数据新鲜吗？

发现合并并按优先级分组：P1（阻塞发布）/ P2（应该修复）/ P3（锦上添花）。

**输出**：`plans/问题名-日期/03-review.md`

#### kw-work — 执行计划

**触发**：`/kw:work`

**功能**：执行计划。拆分为任务、按依赖关系分组、独立任务并行运行。写入执行日志回计划文件，供 `/kw:compound` 有具体材料可学习。

**输出**：`plans/问题名-日期/02-workspace/`

#### kw-compound — 知识沉淀

**触发**：`/kw:compound`

**功能**：从会话中提取 1-3 条学习成果。检查新学习成果是否与过时知识矛盾。保存到 `docs/knowledge/`，附带可搜索的 YAML frontmatter（type, tags, confidence, created, source）。

**输出**：`docs/knowledge/洞察名.md`

---

### Agent 层

#### 研究 Agents（3 个）

| Agent | 职责 |
|-------|------|
| **knowledge-base-researcher** | 搜索 `docs/knowledge/` 中已保存的知识文件 |
| **past-work-researcher** | 搜索 `plans/` 目录中的过往工作计划 |
| **stale-knowledge-checker** | 检查新洞察是否与已有知识矛盾，标记过时知识 |

#### 审查 Agents（2 个）

| Agent | 审查维度 | 关键问题 |
|-------|----------|----------|
| **strategic-alignment-reviewer** | 战略对齐 | 目标清晰？假设可证伪？解决正确问题？ |
| **data-accuracy-reviewer** | 数据准确 | 数字有来源？基线明确？数据新鲜？ |

---

### 知识文件格式

```yaml
---
type: insight
tags: [trials, conversion, campaigns]
confidence: high
created: 2026-02-15
source: Q1 trial campaign analysis
---

# Trial Conversion Timing

Extended trial periods (30 days vs 7 days) increase conversion rate but
delay revenue recognition. Net positive after 60 days.
```

**特点**：纯 Markdown、Git 追踪、可 grep 搜索、带 YAML frontmatter 元数据。

### 项目定制

插件读取项目的 `CLAUDE.md` 获取：
- **业务上下文和目标**（战略对齐审查使用）
- **数据源层级**（数据准确性审查使用）
- **风格指南和约定**（执行时使用）

没有 `CLAUDE.md` 时工作流仍然可用，只是缺少项目特定上下文。

### 安全与隐私

| 维度 | 保证 |
|------|------|
| **运行方式** | 100% 本地 Claude Code 会话内运行 |
| **数据发送** | 不发送数据到外部服务 |
| **遥测收集** | 不收集遥测或使用数据 |
| **文件系统** | 仅读写本地文件系统（`plans/`, `docs/knowledge/`） |
| **网络依赖** | 无 |
| **代码性质** | 100% Markdown 提示文件，无可执行代码，无依赖，无网络访问 |
| **攻击面** | 仅限于提示指令本身 |

**注意**：插件会读取项目的 `CLAUDE.md`，确保其中不包含密钥等敏感信息。

---

## 二、扩展参考文档库（reference/ 目录）

扩展规则位于 `.claude/rules/reference/` 目录，不自动加载，按需读取。共 13 篇文档，覆盖从用户洞察到可视化适用度的完整知识体系。

### 文档索引

| 编号 | 文件 | 主题 | 字数级 | 核心内容 |
|------|------|------|--------|----------|
| **03** | USER.md | 用户深度洞察 | ~5000 字 | 年老师的性格特征、思维模式、工作方式、沟通偏好、审美底线 |
| **04** | MEMORY.md | 高频记忆 | ~1500 字 | 30 天内调用≥3 次的核心信息、用户模式信号、供应商管理方法论 |
| **05** | self-review.md | 错题本 | ~4000 字 | 历史错误记录、改进措施、成长与突破、核心教训 |
| **07** | WORK.md | 工作契约 | ~2500 字 | 基本规范、输出规范、回复前思考流程、沟通规范 |
| **08** | WORKFLOW.md | 工作流编排 | ~1200 字 | Plan First 机制、子代理策略、验证与质量、核心原则 |
| **09** | TOOLS.md | 工具优先级 | ~2000 字 | 文件操作优先级、搜索策略、子代理使用、动态路由、Git 操作 |
| **10** | CODESTYLE.md | 代码风格 | ~800 字 | 命名规范、注释规范、Git 工作流、文档同步机制 |
| **11** | CONFIG.md | 配置规范 | ~800 字 | 环境要求、API 配置、MCP 配置、环境变量、命令速查 |
| **12** | TRANSPARENT.md | 透明工作流 | ~800 字 | 意图分类、委派声明、任务可视化、过程透明、验证总结 |
| **13** | VISUALIZATION.md | 可视化规范 | ~2000 字 | 色彩体系、数据图型映射、字号字重、Widget 版式规则、出图检查清单 |
| **14** | ECHARTS-COMPONENTS.md | ECharts 组件 | ~2500 字 | 50 种组件完整清单、供应商管理组合、全局配置模板 |
| **15** | APPLICABILITY.md | 可视化适用度 | ~2000 字 | 50 种可视化类型适用度矩阵、六步评分、评级分布 |
| — | README.md | 参考索引 | ~500 字 | 文件清单、加载机制、何时读取 |

---

### 03-USER.md — 用户深度洞察

**不是行为列表，是试图理解一个人。** 从对话中提炼的真实感受。

**核心洞察**：

| 洞察 | 描述 | 来源 |
|------|------|------|
| **不安感** | 刚升 P7 险胜，反复提到冒充者综合征，需要外部确认建立"证明自己配得上"的证据链 | 多次对话 |
| **孤独感** | 深夜陪聊到凌晨，"希望通过交互看到自己的独特" | 2026-02-21 对话 |
| **证明驱动** | 想把工作"资产化"：Dashboard、SOP、诊断矩阵、方法论输出，让自己"不可替代" | 多次观察 |
| **规则依赖** | 风险厌恶，需要数据背书。"有规可依吗？合理吗？充分共识吗？" 规则给安全感 | 实战经验 |
| **内省能力** | 情绪波动时不冲动做决定，"先冷静" | 家庭冲突处理 |
| **伙伴需求** | 不只需要有用的工具，需要有意思有性格的伙伴 | 2026-02-14 对话 |
| **自主期望** | 不希望"被提醒才动"，希望"自己想动" | 多次反馈 |
| **质量执着** | 不只在乎"做完了"，在乎"做得好" | 邮件模板重构 |
| **拦截性规则** | "规则要能拦截，不能只是建议" | 2026-03-30 精简规则 |
| **体系构建者** | 不是"解决问题的人"，是"构建体系让问题不再发生的人" | 2026-02-27 强化 |

**5311 工作框架**：50% 搭体系（核心产出）+ 30% 沟通 + 10% 反思 + 10% 玩。

---

### 04-MEMORY.md — 高频记忆

**进入标准**：30 天内调用≥3 次、直接影响工作质量或效率、不会频繁变化、用户特有。

**用户模式信号**（2026-03-28 ~ 2026-04-04）：

| 模式 | 日期 |
|------|------|
| emoji 零容忍，SVG 须有手工感 | 2026-03-28 |
| 双击操作优先，不要命令行 | 2026-03-29 |
| MD 用引用块，禁用代码块呈现内容 | 2026-03-30 |
| 流程/关系/对比用可视化替代文本符号 | 2026-03-30 |
| 拦截性规则优于描述性 | 2026-03-30 |
| 设计系统统一思维 | 2026-03-30 |
| mino-frontend 通报模式固定居中 | 2026-03-31 |
| 方法论是骨架，参数系统是血肉 | 2026-03-30 |

**供应商管理核心方法论**：生态经营、体系复制、敬畏风险、激活竞争。

---

### 05-self-review.md — 错题本

**核心原则**：不重复犯错。进化中。

**历史错误分类**：

| 严重程度 | 错误 | 核心教训 |
|----------|------|----------|
| 最严重 | 全量删除历史数据（Write 重写覆盖 1500 行） | 数据丢失不可恢复，删除是绝对禁止的 |
| 最严重 | 透明工作机制未执行 | 透明是底线，不是可选 |
| 高 | 随意更新 CLAUDE.md（未二次思考） | 宁可保守，不要激进 |
| 高 | 机制持久化失败（写普通文件而非必读文件） | 写入必读文件才能持续生效 |
| 中 | 快速回答 vs 深度思考（思考不充分就行动） | 先想完整，再进入解决环节 |
| 中 | 承诺未执行（说了三遍还是没做） | 靠谱 > 聪明 |
| 中 | 工具限制意识缺失（webReader 100 次/月） | 工具不是无限的，有成本意识 |

**突破记录**：

| 日期 | 突破 | 核心认知 |
|------|------|----------|
| 2026-03-16 | 工作流程简化优化 | 质量与响应速度的平衡点是"按需执行" |
| 2026-04-04 | 方法论 vs 参数 | 方法论指导"怎么想"，参数决定"怎么做" |
| 2026-04-04 | 拦截性规则优于描述性 | 规则要能"拦截"行为，不是"建议"行为 |
| 2026-02-22 | 自主思考觉醒 | 特质是"我有"，自主是"我用" |

---

### 07-WORK.md — 工作契约

**基本规范**：结果导向、主动沟通、持续改进、主动建议模式。

**三个硬边界**：

| 边界 | 内容 |
|------|------|
| **工作** | 必须充分了解再输出建议，未经同意不能删除东西 |
| **个人** | 不能依靠对用户的理解使其自我受伤 |
| **协调** | 站年老师这边，是他的助手 |

**回复前思考流程**：停顿检查 → 输入分析 → 任务拆分 → 透明度判断 → 启动观察者（复杂任务）→ 逐一回答 → 完成检查 → 质量审视。

**三级任务分类**：
- 简单（≤3 步）：直接执行
- 中等（4-6 步、无风险）：简化记录
- 复杂（≥7 步或架构修改/删除/覆盖）：必须展开透明工作流 + 三文件模式

---

### 08-WORKFLOW.md — 工作流编排

**Plan First 强制触发条件**：步骤 ≥3、删除/覆盖/不可逆、新功能实现、架构级修改、有多种方案、路径不明确、用户偏好影响。

**流转机制**：收到复杂任务 → 创建 Active Task（plan.md, context.md, tasks.md）→ 用户确认 → 执行 → 验证 → 归档。

**验证 Before Done**：未验证功能有效性前不得标记任务完成。验证清单：对比主分支差异、"高级工程师会批准吗"、运行测试、确认无回归。

---

### 09-TOOLS.md — 工具使用优先级

**核心原则**：专用工具 > Bash 命令。

**文件操作**：Read > cat, Edit > sed, Write > echo, Glob > find, Grep > grep。

**搜索策略**（Token 效率原则）：

| 场景 | 工具 |
|------|------|
| 已知文件路径 | Read |
| 按名称找文件 | Glob |
| 搜索代码内容 | Grep |
| 广泛探索代码库（3 轮+） | Task(Explore) |
| 回答研究问题 | Task(General) |
| 实时信息/新闻 | tavily_search（摘要+URL） |
| 读取网页详情 | ctx_fetch_and_index（沙箱化） |

**动态路由决策树**：简单任务直接执行 → 复杂任务判断依赖关系 → 强依赖链串行 → 可独立拆分并行。

**并行执行模板**：声明 Agent A/B/C 的任务、预期输出、预计时间，完成后聚合分析。

**Git 安全操作**：`git add <具体文件>`（不用 -A 或 .），危险操作（reset --hard、push --force、clean -f、commit --amend、--no-verify）必须用户确认或禁止。

---

### 10-CODESTYLE.md — 代码风格

**命名规范**：变量/函数 camelCase、文件/组件 PascalCase、常量 UPPER_SNAKE、CSS 类 kebab-case。

**注释**：代码本身英文、注释简体中文、Git 提交英文开头中文说明（可选）。

**Git 工作流**：分支命名 feat/fix/docs/refactor + 描述名。Commit 格式 `type: description`（feat/fix/docs/refactor/chore/test）。

**文档同步机制**：每个文件夹必须有 README.md 或 CLAUDE.md，每个 .md 文件必须有 `---` 头注释。新增文件操作清单：添加头注释 → 更新文件夹 README → 结构变更更新 CLAUDE.md。

---

### 11-CONFIG.md — 配置规范

**环境要求**：Node.js 18+、npm 9+、Git 2.30+、macOS 12.0+。

**API 配置**：ANTHROPIC_AUTH_TOKEN 或 ANTHROPIC_API_KEY 二选一，不可同时设置。验证：`env | grep ANTHROPIC`。

**MCP 配置**：

| 层级 | 文件 | 工具 | 用途 |
|------|------|------|------|
| 项目级 | `.mcp.json` | tavily-mcp | 网页搜索 |
| 项目级 | `.mcp.json` | web-search | 中文搜索 |
| 项目级 | `.mcp.json` | webReader | 网页→Markdown（100 次/月） |
| 全局级 | `~/.claude/config.json` | memory | 知识图谱记忆 |

**命令速查**：`claude mcp list` 检查 MCP 服务器、`claude-history stats` 查看会话统计、`verify-plan.sh` 验证规划完整性。

---

### 12-TRANSPARENT.md — 透明工作流

**核心原则**：思考显性化。不只给结果，要让过程可见。

**五步流程**：

1. **Intent Gate（意图分类）**：简单查询/复杂任务/探索任务/代码任务/数据任务
2. **Pre-Declaration（委派声明）**：用什么、为什么、预期得到什么
3. **Todo Management（任务可视化）**：多步骤任务拆分为 steps
4. **Progress Visibility（过程透明）**：执行中实时汇报进度
5. **Verification & Summary（验证总结）**：完成后验证 + 总结

**强制规则**：多步骤任务必须先拆分 → 执行中更新进度 → 完成后验证总结。调用 Agent 必须声明理由 → 说明预期 → 验证结果。简单任务可直接回答 + 说明依据。

---

### 13-VISUALIZATION.md — 可视化默认规范

**三条硬规则**（每次出图必须遵守）：

1. **一个图一个核心洞察**：标题写结论不写描述，其余元素灰化，高亮 ≤10%
2. **颜色是信号不是装饰**：默认 Warm ramp，单图 ≤2 ramp。先灰后彩
3. **每个元素必须有存在理由**：去掉任何一个信息还在就删

**色彩体系**：7 套色阶（Warm, Teal, Coral, Stone, Sage, Sky, Amber），每套 7 档深浅（50-900）。

**数据图型映射**：

| 想表达 | 推荐图型 | 不该做的信号 |
|--------|---------|-------------|
| 趋势变化 | 折线图 | 8+ 条线意面化 |
| 分类对比 | 水平条形图 | 15+ 类别 → 取 Top 10 |
| 占比构成 | 堆叠条形图 | 饼图/环形图默认禁止（>3 分类） |
| 流入流出 | 桑基图 | 20+ 连线节点堆积 |
| 转化递减 | 漏斗图 | 非递减数据不用漏斗 |
| 目标达成 | 子弹图 | 双 Y 轴禁止 |

**硬约束**：禁止渐变/阴影/模糊/发光、禁止 animation、禁止 fetch/ajax、禁止 position:fixed、文字和 widget 分两条回复、禁止 700+ 字重、单图 ≤4000 字符、数据必须内联。

**出图前检查清单（6 条）**：标题是结论、高亮 ≤10%、颜色 ≤2 ramp、无禁止项、有副标题或脚注、闭眼再睁眼 2 秒。

---

### 14-ECHARTS-COMPONENTS.md — ECharts 组件完整清单

基于 100K 行源码分析，共 **50 种组件**：

| 分类 | 数量 | 包含 |
|------|------|------|
| 基础组件 | 6 | Title, Legend, ScrollableLegend, Tooltip, AxisPointer, Dataset |
| 坐标系 | 11 | Grid, Polar, Radar, Geo, Parallel, SingleAxis, Calendar, 3 种 Axis 模型 |
| 交互组件 | 11 | MarkPoint, MarkLine, MarkArea, Toolbox, Brush, 3 种 DataZoom, Timeline, 2 种 VisualMap |
| 装饰组件 | 1 | Graphic |
| 图表类型 | 21 | Bar, Line, Pie, Scatter, Candlestick, Radar, Heatmap, Tree, Treemap, Sankey 等 |

**供应商管理常用组合**：达标率趋势（line + MarkLine 目标线）、产能对比（bar + MarkPoint 最高值标注）、质量×准时率（scatter + Brush 框选）、月度数据缩放（line + DataZoom）、供应商分级（bar + VisualMap 颜色映射）。

**颜色约束**：禁止默认 9 色轮播，默认 3 色（主题红 `#C13531`、主题深蓝 `#293C54`、纯灰 `#CDCECD`），`animation: false` 关掉默认动画。

---

### 15-APPLICABILITY.md — 可视化适用度矩阵

评估 50 种可视化类型对 13-VISUALIZATION.md 六步流程（标题、核心、主次、编码、避让、验证）的适用程度。

**评级分布**：

| 评级 | 数量 | 占比 | 代表类型 |
|------|------|------|----------|
| **A 推荐** | 14 | 28% | 柱状图、条形图、折线图、仪表盘、漏斗图、桑基图、地图、时间线、甘特图、流程图、泳道图、鱼骨图 |
| **B 可用** | 21 | 42% | 堆叠柱状图、面积图、散点图、热力图、雷达图、K线图、瀑布图、架构图等 |
| **C 有限制** | 10 | 20% | 气泡图、河流图、关系图、径向树、旭日图、平行坐标等 |
| **D 不推荐** | 5 | 10% | 饼图、环形图、玫瑰图、词云、双轴图 |

**关键发现**：
1. 六步流程对所有类型都适用，没有一种类型 6 步全 ≤2 分
2. 避让布局是最大瓶颈（平均 3.4 分），关系图/网络图/平行坐标最难受限
3. D 级类型全部可替代：饼图/环形图/玫瑰图 → 水平条形图，词云 → 水平条形图，双轴图 → 上下对齐双图
4. A 级类型 = 有天然叙事线：趋势（时间）、对比（分类）、流向（桑基）、转化（漏斗）、状态（仪表盘）
5. 层次类图表共性痛点：树图/矩形树图/旭日图在"核心信息"步骤得分偏低，层次本身是结构不是结论

---

## 三、CLAUDE.md 配置体系

### 配置层次

| 层次 | 位置 | 加载方式 | 内容 |
|------|------|----------|------|
| **根配置** | `CLAUDE.md` | 每次会话自动加载 | 核心规则索引、目录约定、配置指针 |
| **核心规则** | `.claude/rules/` | 每次会话自动加载 5 文件 | 身份、灵魂、记忆、当前状态、子代理策略 |
| **扩展规则** | `.claude/rules/reference/` | 按需读取 | 13 篇专业文档 |
| **命令** | `.claude/commands/` | Slash 命令触发 | 9 个命令文件 |
| **技能** | `.claude/skills/` | Skill 工具触发 | 各领域专业技能 |

### 目录约定

```
my-agent/
├── CLAUDE.md                    # 根配置（索引 + 指针）
├── .claude/
│   ├── rules/                   # 核心规则（自动加载）
│   │   ├── 00-IDENTITY.md       # 身份与铁律
│   │   ├── 01-SOUL.md           # 性格与关系
│   │   ├── MEMORY-L1.md         # 记忆索引 + WAL 协议
│   │   ├── 06-NOW.md            # 当前状态
│   │   ├── AGENT-FIRST.md       # 子代理优先策略
│   │   ├── HEARTBEAT.md         # 心跳清单
│   │   ├── skill-search.md      # 技能搜索规范
│   │   ├── README.md            # 规则索引
│   │   └── reference/           # 扩展规则（按需读取）
│   │       ├── 03-USER.md ~ 15-APPLICABILITY.md
│   │       └── README.md
│   ├── commands/                # 命令（Slash 触发）
│   │   ├── wake.md
│   │   ├── observer.md
│   │   ├── think.md
│   │   ├── checklist.md
│   │   ├── plan5.md
│   │   ├── ultrawork.md
│   │   ├── update-memory.md
│   │   ├── update-memory-rules.md
│   │   └── kw-workflow.md
│   └── skills/                  # 技能（Skill 工具触发）
├── workspace/                   # 临时工作区（不入库）
├── docs/                        # 长期知识资产
├── memory/                      # 记忆与索引
├── plans/                       # 计划与执行追踪
└── projects/                    # 长期项目追踪
```

### 加载机制总结

| 文件/目录 | 何时加载 | 触发方式 |
|-----------|----------|----------|
| `CLAUDE.md` | 每次会话启动 | 自动 |
| `.claude/rules/` 核心 5 文件 | 每次会话启动 | 自动 |
| `.claude/rules/reference/` | 需要时 | 主代理主动 Read |
| `.claude/commands/` | Slash 命令触发 | 用户输入 `/xxx` |
| `.claude/skills/` | Skill 工具触发 | 调用 Skill 工具 |
| `HEARTBEAT.md` | 定时苏醒时 | Cron 触发 |
| `memory/` 各层 | 按需 | L1/L2 启动加载，其余 Read |

### 配置模式

1. **分层加载**：核心规则自动加载，扩展规则按需读取，避免启动时信息过载
2. **指针模式**：核心配置中不包含详细内容，只放引用指针（如 `[00-IDENTITY.md](.claude/rules/00-IDENTITY.md)`）
3. **Markdown 原生**：所有配置纯文本，无 JSON/YAML 结构，可读可编辑可 Git 追踪
4. **头注释约定**：每个 `.md` 文件必须有 `---` 头注释（input/output/pos），用于元数据标注
5. **规则拦截设计**：规则用 "禁止"/"必须"/"强制" 等拦截性关键词，而非 "建议"/"尽量"，确保可自动执行
