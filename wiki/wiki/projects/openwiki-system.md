# OpenWiki 知识库系统

> Sources: Mino 文件架构分析, 2026-02, 2026-04-28
> Raw:[完整架构](../../raw/projects-archive/architecture-ARCHITECTURE-FULL.md); [架构总结](../../raw/projects-archive/architecture-ARCHITECTURE-SUMMARY.md); [执行计划](../../raw/projects-archive/architecture-ARCHITECTURE-EXECUTION-PLAN.md)

## 概述

OpenWiki 是对 Mino 个人知识管理系统的完整目录架构设计与重构方案。目标是将 9 个混乱的一级目录精简为 6 个清晰结构，消除重复文件和空目录，建立文件归属决策树。

## 核心架构

### 6 个一级目录

```
my-agent/
├── .claude/          # AI 核心配置（自动加载）
├── business/         # 工作相关（供应商管理）
├── memory/           # 记忆系统（永久保存）
├── projects/         # 开发项目（版本管理）
├── scripts/          # 工具脚本（可复用）
└── workspace/        # 临时工作区（随时清理）
```

### 目录生命周期与加载策略

| 目录 | 生命周期 | 自动加载 |
|------|----------|----------|
| `.claude/` | 永久 | 是（核心规则） |
| `business/` | 长期 | 否（按需读取） |
| `memory/` | 永久 | 部分（L1 索引） |
| `projects/` | 项目周期 | 否 |
| `scripts/` | 长期 | 否 |
| `workspace/` | 临时 | 否 |

## 二级目录设计

### .claude/ — 8 个二级目录

rules/（核心配置，自动加载）、docs/（架构文档）、agents/（Agent 模式）、skills/（技能定义）、commands/（自定义命令）、hooks/（事件触发）、design/（设计系统）、PLANS/（计划检查）。

### memory/ — 7 个二级目录

| 目录 | 用途 | 维护频率 |
|------|------|----------|
| daily/ | 每日原始记录 | 每天 |
| curated/ | 精炼内容（patterns/decisions/lessons） | 每周提取 |
| my-thoughts/ | 深度思考反思 | 有重要思考时 |
| tasks/ | 长期任务记录 | 持续 |
| templates/ | 各类模板 | 按需 |
| protocols/ | 协议和方法 | 按需 |
| personal/ | 个人生活（家庭/健康/兴趣） | 隐私内容 |

### workspace/ — 清理策略

| 目录 | 清理周期 |
|------|----------|
| temp/ | 每次会话后 |
| logs/ | 每周 |
| drafts/ | 每周 |
| learning/ | 每月评估（有价值的提升到 memory/） |
| reference/ | 每月评估（有价值的提升到 .claude/docs/） |

## 文件归属决策树

```
新文件要保存？
├─ 核心配置（定义我是谁/怎么想）→ .claude/rules/
├─ 架构文档 → .claude/docs/
├─ 每日记录 → memory/daily/YYYY-MM-DD.md
├─ 深度思考 → memory/my-thoughts/
├─ 精炼内容（模式/决策/教训）→ memory/curated/
├─ 供应商管理 → business/supplier-management/
├─ 职业发展 → business/career/
├─ 开发项目 → projects/
├─ 工具脚本 → scripts/{python|shell}/
├─ 学习笔记 → workspace/learning/
└─ 其他临时 → workspace/{drafts|temp|data}/
```

## 改进效果

| 指标 | 优化前 | 优化后 | 改进 |
|------|--------|--------|------|
| 一级目录 | 9 个混乱 | 6 个清晰 | -3 个 |
| 重复文件 | 4 个 | 0 个 | 全部消除 |
| 空目录 | 多个 | 0 个 | 全部清理 |
| docs/目录 | 3 个分散 | 1 个集中 | 统一管理 |

## 维护机制

- **每日**：更新 daily 记录，清理 temp
- **每周**：从 daily 提取到 curated，清理 logs/drafts
- **每月**：整体评估 workspace，有价值内容提升层级
- **每季**：审查 rules 内容，更新架构文档
- **每年**：架构整体评估和调整
