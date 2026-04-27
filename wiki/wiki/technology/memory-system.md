# 记忆系统架构

> Sources: Mino, 2026-02-12 ~ 2026-04-22
> Raw: [CLAUDE.md](../../raw/core-memory/CLAUDE.md); [MEMORY.md](../../raw/core-memory/MEMORY.md); [insights](../../raw/core-memory/insights.md); [learnings](../../raw/learnings/LEARNINGS.md)

## 概述

记忆系统是 Mino 持续进化的基础设施，从 2026-02 上线至今经历了 3 次大重构。核心设计哲学：关键信息先写后答（WAL 协议），记忆不是自动的而是定期维护的，索引优于冗余。

## 目录结构

```
memory/
├── MEMORY.md              # 记忆索引（主入口，会话启动自动加载）
├── insights.md            # 洞察记录（按时间倒序，长期积累）
├── context/               # 工作上下文（事务、状态、Todo）
│   └── todo.md            # 当前待办（夜间 Cron 自动维护）
├── learnings/             # 学习记录系统
│   ├── LEARNINGS.md       # 会话中产生的学习记录
│   ├── ERRORS.md          # 错误和失败记录
│   └── FEATURE_REQUESTS.md # 功能请求
├── daily/                 # 对话日志（按月归档）
│   ├── 2026-02/           # 11 个文件
│   ├── 2026-03/           # 11 个文件
│   └── 2026-04/
├── topics/                # 主题记忆（按工作领域组织）
│   ├── 01-供应商与BPO运营.md
│   ├── 02-团队管理与汇报.md
│   ├── 03-技术与工具探索.md
│   ├── 04-个人成长.md
│   ├── 05-行业认知.md
│   ├── 工作规范/           # 规则类（保留）
│   ├── 工作方法/           # 工作方法论（保留）
│   ├── 年老师画像/         # 观察对象（保留）
│   └── _archive/          # 旧 topics 归档
├── projects/              # 项目记忆
│   └── 关键人画像/
└── daily-letter/          # 每日书信（十年记忆切片）
```

## WAL 协议（Write-Ahead Logging）

**核心原则**：关键信息先写后答。

**触发条件**：修正、专有名词、偏好、决策、草稿修改、具体值。

**执行方式**：触发时立即写入 MEMORY.md 或项目文件，先写后答。

**设计理由**：记忆不是自动的，需要主动触发。如果不先写下来，压缩上下文时就会丢失。

## 学习记录流转机制

| 来源 | 触发条件 | 目标 | 频率 |
|------|----------|------|------|
| `learnings/LEARNINGS.md` | 每周整理或满 50 条 | `insights.md` | 每周 |
| `learnings/ERRORS.md` | 踩坑经验积累 | `.claude/reference/05-self-review.md` | 按需 |
| `learnings/FEATURE_REQUESTS.md` | 确认要实现 | `memory/context/todo.md` | 按需 |

### 每周 `/update-memory` 执行步骤

1. 读取 `learnings/LEARNINGS.md`
2. 判断每条记录：有长期价值 → 追加到 insights.md；高频模式（≥3次）→ 升级到 MEMORY.md；已转移 → 清空原记录
3. 输出变更摘要

### 整理触发条件

| 条件 | 阈值 | 动作 |
|------|------|------|
| LEARNINGS.md | ≥50 条 | 执行 `/update-memory` |
| insights.md | >500 行 | 归档旧洞察到 archive/ |

## 文件角色分工

### MEMORY.md — 索引入口

会话启动自动加载。存放用户画像、组织结构、核心决策、项目索引、重要洞察。是指针，不是数据本身。

### insights.md — 洞察记录

按时间倒序的职业洞察、工作方法、人际观察。符合"重复出现 3 次+ / 有长期价值 / 被年老师认可"标准。

### topics/ — 主题记忆

按工作领域组织的主题记忆，索引 + 关键决策 + 方法论。大段原始材料在 `docs/`。

### daily/ — 对话日志

按月归档，命名 `YYYY-MM/YYYY-MM-DD.md`。记录当日对话和临时想法。

### daily-letter/ — 每日书信

十年记忆切片。每日自动从对话中提取想法种子，归档格式 `YYYY-MM-DD.md`。

## 记忆系统历史演进

| 时间 | 事件 | 核心变化 |
|------|------|----------|
| 2026-02 | 上线初期 | MEMORY.md 包含所有数据，无分层 |
| 2026-03-17 | 方案 B 确立 | 合并 daily/observations，MEMORY.md 作索引 |
| 2026-03-18 | Agent 团队设计 | 建立 daily+topics 目录结构 |
| 2026-03-20 | topics 目录建立 | 创建三大项目文件，完善记忆结构 |
| 2026-04-06 | learnings/ 目录新增 | 建立学习记录流转机制 |
| 2026-04-22 | context 目录建立 | 待办独立到 `memory/context/todo.md` |
| 2026-04-22 | topics 结构重构 | 5 个领域 + 旧 topics 合并归档 |

## 快速查找指南

| 要找什么 | 去哪里 |
|----------|--------|
| 核心记忆概览 | memory/MEMORY.md |
| 当前待办 | memory/context/todo.md |
| 所有洞察 | memory/insights.md |
| 最近学习记录 | memory/learnings/LEARNINGS.md |
| 错误和踩坑 | memory/learnings/ERRORS.md |
| 某个工作领域 | memory/topics/01~05-{主题}.md |
| 某个人物档案 | memory/projects/关键人画像/ |
| 某天的对话 | memory/daily/YYYY-MM/YYYY-MM-DD.md |
| 规则/方法论 | memory/topics/工作规范/、工作方法/ |

## 教训与最佳实践

| 教训 | 日期 |
|------|------|
| 记忆系统要定期维护，不是自动的 | 2026-04-05 |
| 索引优于冗余，MEMORY.md 作指针 | 2026-03-17 |
| 担心精简后会遗忘，简洁与完整需平衡 | 2026-03-17 |
| 每次会话启动先读核心记忆文件 | 2026-04-23 |
