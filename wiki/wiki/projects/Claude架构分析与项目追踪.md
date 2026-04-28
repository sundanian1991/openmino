# Claude 架构分析与项目追踪

> Sources: mino, 2026-04-28
> Raw:../../raw/projects-archive/CLAUDE.md; ../../raw/projects-archive/README.md; ../../raw/projects-archive/architecture-ARCHITECTURE-ANALYSIS.md; ../../raw/projects-archive/architecture-ARCHITECTURE-EXECUTION-PLAN.md; ../../raw/projects-archive/architecture-ARCHITECTURE-FULL.md
>
> ../../raw/projects-archive/architecture-ARCHITECTURE-SUMMARY.md; ../../raw/projects-archive/architecture-ARCHITECTURE-TREE.md; ../../raw/projects-archive/architecture-ARCHITECTURE-VISUAL.md; ../../raw/projects-claude-trace/CLAUDE.md; ../../raw/projects-claude-trace/README.md

## 概述

raw 目录中的 projects-archive 和 projects-claude-trace 记录了 Claude Code 架构分析的完整过程（2026-02-21 发起），从初始探索、问题诊断到架构全景设计，以及后续的 Claude Trace 追踪工具研究。这些文件已归档，但记录了 Mino 对自身技术架构的深度理解过程。

---

## 一、架构分析项目（2026-02-21）

### 项目背景

Mino 对自身文件系统进行了全面的架构审计，发现 9 个一级目录存在严重混乱：重复文件 4 个、空目录多个、3 个 docs/ 目录用途不清、workspace/ 中子项目/脚本/文档混放。

### 诊断出的四大问题

| 问题 | 具体表现 |
|------|----------|
| **文件重复** | HEARTBEAT.md（根目录空文件）、SESSION-STATE.md（根目录+.claude/rules/ 重复）、Claude.md（根目录+business/ 重复）、Soul.md（应在.claude/rules/） |
| **一级目录混乱** | 9 个一级目录分类逻辑不清：data/ 用途不明、docs/ 与.claude/docs/ 区别不清、projects/ 实际放的是 mcp-servers、sources/ 只有一个文件 |
| **workspace/ 内容混乱** | 子项目(AlphaMao_Skills)、工具脚本(search.py等)、文档(CAPTURE.md等)、学习笔记混在一起 |
| **docs/ 目录三处** | 根目录 docs/、.claude/docs/、workspace/docs/ 三个位置，各有不同内容但无明确职责划分 |

### 设计原则

按**生命周期**和**稳定性**分类：

| 生命周期 | 稳定性 | 位置 | 示例 |
|----------|--------|------|------|
| 永久 | 核心配置，不可删除 | `.claude/rules/` | IDENTITY.md、SOUL.md |
| 长期 | 重要内容，版本管理 | `memory/`、`business/` | daily文件、供应商管理 |
| 中期 | 项目文档，定期整理 | `.claude/docs/` | 架构说明、格式规范 |
| 短期 | 临时工作，随时清理 | `workspace/` | 学习笔记、工具脚本 |

### 新架构设计（9个 → 6个一级目录）

```
my-agent/
├── .claude/          # AI核心配置（自动加载）
│   ├── rules/        # 核心配置（11个文件，每次会话自动加载）
│   ├── docs/         # 架构文档（版本管理）
│   ├── agents/       # Agent模式定义
│   ├── skills/       # Skills定义（50+个技能）
│   ├── commands/     # 自定义命令
│   ├── hooks/        # Hooks配置
│   ├── design/       # 设计相关
│   └── PLANS/        # 计划
├── business/         # 工作相关（供应商管理 + 职业发展）
├── memory/           # 记忆系统（daily/curated/my-thoughts/tasks/templates/protocols/personal）
├── projects/         # 开发项目（mcp-servers/AlphaMao_Skills/archived）
├── scripts/          # 工具脚本（python/shell）
└── workspace/        # 临时工作区（learning/reference/logs/data/sources/drafts/temp）
```

### 文件放置决策树

```
新文件要保存？
├─ 核心配置（定义我是谁/我怎么想）？ → .claude/rules/
├─ 架构文档（说明系统如何组织）？ → .claude/docs/
├─ 每日记录？ → memory/daily/YYYY-MM-DD.md
├─ 深度思考/感悟？ → memory/my-thoughts/
├─ 精炼内容（模式/决策/教训）？ → memory/curated/{patterns|decisions|lessons}/
├─ 供应商管理相关？ → business/supplier-management/[对应目录]/
├─ 开发项目？ → projects/[项目名]/
├─ Python/Shell工具脚本？ → scripts/{python|shell}/
├─ 学习笔记？ → workspace/learning/
├─ 参考文档？ → workspace/reference/
└─ 其他临时内容？ → workspace/{drafts|temp|data}/
```

### 维护规则

| 频率 | 任务 |
|------|------|
| 每日 | 更新 memory/daily/，清理 workspace/temp/ |
| 每周 | 回顾 daily 提取到 curated，清理 workspace/logs/ 和 drafts/ |
| 每月 | 清理 workspace/ 整体，评估 learning/ 内容提升到 memory/ |
| 每季度 | 审查 .claude/rules/ 内容，更新架构文档 |
| 每年 | 架构评估和调整 |

---

## 二、交付文档体系

架构分析项目产出了 6 份文档：

| 文档 | 用途 | 状态 |
|------|------|------|
| ARCHITECTURE-ANALYSIS.md | 深度问题诊断 + 设计原则 + 新架构 + 迁移计划 | 已归档 |
| ARCHITECTURE-FULL.md | 完整的二级、三级目录架构（含所有目录说明和文件归属规则） | 已归档 |
| ARCHITECTURE-TREE.md | 可视化目录树（含 emoji 标识和文件数量统计） | 已归档 |
| ARCHITECTURE-VISUAL.md | 带颜色分类的架构可视化（红/橙/绿/黄/白生命周期标识） | 已归档 |
| ARCHITECTURE-SUMMARY.md | 总结与确认文档（含等待年老师确认的 5 个决策点） | 已归档 |
| ARCHITECTURE-EXECUTION-PLAN.md | 8 阶段执行计划（备份→删除→移动→新建→更新→清理→验证），含回滚方案 | 已归档（等待确认状态） |

---

## 三、Claude Trace 追踪工具研究（2026-03-01）

projects-claude-trace 目录记录了 `@mariozechner/claude-trace` 工具的使用指南，用于可视化分析 Claude Code 内部执行过程。

### 核心用途

**性能分析器 + 调试器** — 观察 Claude Code 在后台实际做了什么。适用于 Subagent 调试、Plan First 验证、Memory 机制观察、性能诊断。

### 四种运行模式

| 模式 | 用途 | 命令示例 |
|------|------|----------|
| 实时追踪 | 启动 Claude Code 同时记录所有交互 | `npx @mariozechner/claude-trace --log my-session` |
| 生成 HTML 报告 | 从 JSONL 生成可视化界面 | `npx ... --generate-html log.jsonl` |
| 生成索引 | 为 .claude-trace/ 目录生成索引 | `npx ... --index` |
| 提取 Token | 提取 OAuth token（SDK 开发用） | `npx ... --extract-token` |

### 已验证的核心洞察

| 洞察 | 发现 | 影响 |
|------|------|------|
| Subagent 是"模拟"的 | 不是真正的并行进程，通过新建上下文模拟，底层共享同一执行环境 | 子代理太多会降低性能，并行控制在 3 个以内，优先用工具并行 |
| Memory 是文件读写 | 没有数据库，纯文本文件；记忆检索 = 文件搜索；没有复杂的优先级排序 | 四层记忆体系设计是对的，物理隔离 P0/P1/P2 是必要的 |

### 推荐工作流

| 频率 | 场景 |
|------|------|
| 每月 1 次 | 验证核心机制是否正常 |
| 遇到问题时 | 会话异常慢、子代理不响应 |
| 学习时 | 理解 Claude Code 内部机制 |
