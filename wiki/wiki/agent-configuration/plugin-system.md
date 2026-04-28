# 插件系统

> Sources: Mino, 2026-02-15 ~, 2026-04-26
> Raw:[compound-knowledge-plugin-README](../../raw/claude-plugins/compound-knowledge-plugin-README.md); [compound-knowledge-plugin-AGENTS](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-AGENTS.md); [compound-knowledge-plugin-CHANGELOG](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-CHANGELOG.md); [compound-knowledge-plugin-PRIVACY](../../raw/claude-plugins/compound-knowledge-plugin-PRIVACY.md); [compound-knowledge-plugin-SECURITY](../../raw/claude-plugins/compound-knowledge-plugin-SECURITY.md); [compound-knowledge-plugin/agents/research/past-work-researcher](../../raw/claude-plugins/compound-knowledge-plugin-plugins-compound-knowledge-agents-research-past-work-researcher.md)

## 概述

插件是复合知识包，将技能、智能体和工作流打包。目前安装的主要插件是 Compound Knowledge——一个知识工作系统，通过在 Markdown 文件中积累学习成果，让每个循环周期都比上一个更快。

## Compound Knowledge 插件

### 架构

```
compound-knowledge/
├── skills/                    # 6 个工作流技能
│   ├── kw-brainstorm/SKILL.md
│   ├── kw-plan/SKILL.md
│   ├── kw-confidence/SKILL.md
│   ├── kw-review/SKILL.md
│   ├── kw-work/SKILL.md
│   └── kw-compound/SKILL.md
├── agents/
│   ├── review/
│   │   ├── strategic-alignment-reviewer.md
│   │   └── data-accuracy-reviewer.md
│   └── research/
│       ├── knowledge-base-researcher.md
│       ├── past-work-researcher.md
│       └── stale-knowledge-checker.md
└── README / CHANGELOG / PRIVACY / SECURITY
```

**组件**：6 个技能、2 个审查智能体、3 个研究智能体。

### 六步循环

```
/kw:brainstorm   →  头脑风暴，拉取参考，找方向
/kw:plan         →  结构化为可执行计划（搜索过往学习成果）
/kw:confidence   →  诚实评估已知/未知（随时可调用）
/kw:review       →  战略对齐 + 数据准确性审查（并行执行）
/kw:work         →  执行计划，产出交付物
/kw:compound     →  沉淀学习成果，供下次使用
```

每次循环让下一次更快。`/kw:plan` 会搜索 `docs/knowledge/` 中由 `/kw:compound` 保存的过往洞察。知识随时间累积。

### 各环节详解

**Brainstorm**：粘贴会议记录、头脑中原始想法、描述问题。自动搜索知识库和过往计划，提取关键决策、开放问题、约束条件和张力点。

**Plan**：用金字塔原理（结论先行）将头脑风暴结构化为可执行计划。三个详细度层级：Quick（快速检查）、Standard（大多数计划）、Deep（跨季度策略）。启动并行的过往工作和学习成果搜索智能体。

**Confidence**：随时可调用。用直白语言评估已知和未知的边界。产出"确定的 / 不确定的 / 我的建议"分解，附带具体的填补行动。

**Review**：两个并行审查员：
- **战略对齐审查** — 目标清晰度、可证伪假设、是否在解决正确的问题
- **数据准确性审查** — 数据来源、基线是否明确、数据新鲜度

发现按严重程度分组：P1（阻碍发布）/ P2（应该修复）/ P3（锦上添花）。

**Work**：执行计划。拆分为任务，按依赖关系分组，独立任务并行执行。将执行日志回写到计划文件中，供 Compound 学习。

**Compound**：从会话中提取 1-3 条学习成果。检查是否有与新学习矛盾的陈旧知识。保存到 `docs/knowledge/`，带可搜索的 YAML frontmatter。

### 知识存储格式

```yaml
# docs/knowledge/trial-conversion-timing.md
---
type: insight
tags: [trials, conversion, campaigns]
confidence: high
created: 2026-02-15
source: Q1 试用活动分析
---

# 标题

洞察内容...
```

### 设计原则

| 原则 | 说明 |
|------|------|
| **通用优于特定** | 无公司特定引用，项目上下文来自 CLAUDE.md |
| **有立场但可适配** | 强默认值（金字塔原理、P1/P2/P3），适配任何项目 |
| **本地优先** | `docs/knowledge/` 为主存储，外部集成可选 |
| **渐进式披露** | 从 6 个工作流开始，模式出现后再加技能/智能体 |

### 安全与隐私

| 维度 | 详情 |
|------|------|
| **运行时** | 100% 本地，无网络依赖 |
| **数据** | 无外部服务，无遥测 |
| **访问** | 仅读写本地文件系统 |
| **代码** | 100% Markdown 提示文件——无可执行代码 |
| **注意** | 确保 CLAUDE.md 不含密钥（研究智能体会处理它） |

## 配置系统

| 路径 | 用途 |
|------|------|
| `.claude/rules/` | 核心规则（每次会话自动加载） |
| `.claude/rules/reference/` | 扩展规则（按需读取） |
| `.claude/commands/` | 斜杠命令 |
| `.claude/skills/` | 已安装技能 |
| `plans/` | 活跃计划和知识工作产出 |
| `docs/knowledge/` | 复合知识（可被 /kw:plan 搜索） |
| `memory/` | 记忆系统 |

### MCP 工具

| 工具 | 用途 | 范围 |
|------|------|------|
| tavily-mcp | 网页搜索 | 项目级 |
| web-search | 中文搜索 | 项目级 |
| webReader | 网页→Markdown（100次/月） | 项目级 |
| memory | 知识图谱记忆 | 全局 |
