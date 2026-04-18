---
input: 洞察、决策、人物画像、项目记忆
output: 记忆索引、知识复利
pos: memory/根目录，记忆与索引存储
---

# CLAUDE.md — Memory 记忆中心

> **记忆是持续进化的方式**

---

## 核心定位

Memory 是**核心区**，存放：
- 洞察与经验教训
- 决策记录
- 人物画像
- 项目记忆
- 对话日志
- 学习记录

**留存周期**：永久保留

---

## 目录结构

```
memory/
├── MEMORY.md           # 记忆索引（主入口）
├── insights.md         # 洞察记录（长期）
│
├── learnings/          # 学习记录系统（临时→定期整理）
│   ├── LEARNINGS.md
│   ├── ERRORS.md
│   └── FEATURE_REQUESTS.md
│
├── daily/              # 日志（按月归档）
│   ├── 2026-02/        # 11 个文件
│   ├── 2026-03/        # 11 个文件
│   └── 2026-04/
│
├── topics/             # 主题记忆（持续积累）
│   ├── Mino成长思考/    # 19 个文件
│   ├── 设计规范/        # Dashboard布局等
│   ├── 工作规范/        # 数据处理、技能搜索、文档格式
│   ├── 工作方法/        # 5311框架等
│   ├── 供应商管理/      # 供应商管理：工具箱+看板+指标体系
│   └── 电销知识库/
│
└── projects/           # 项目记忆
    └── 关键人画像/
```

---

## 学习记录流转机制

### learnings/ → 核心文件

| 来源 | 触发条件 | 目标 | 频率 |
|------|----------|------|------|
| `learnings/LEARNINGS.md` | 每周整理或满 50 条 | `insights.md` | 每周 |
| `learnings/ERRORS.md` | 踩坑经验积累 | `.claude/reference/05-self-review.md` | 按需 |
| `learnings/FEATURE_REQUESTS.md` | 确认要实现 | `.claude/rules/06-NOW.md` 待办 | 按需 |

### 流转执行方式

**每周 `/update-memory` 时**：
1. 读取 `learnings/LEARNINGS.md`
2. 判断每条记录：
   - 有长期价值 → 追加到 `insights.md`
   - 高频模式（≥3次）→ 升级到 `MEMORY.md`
   - 已转移 → 清空原记录
3. 输出变更摘要

---

## 文件类型说明

### MEMORY.md
- **用途**：记忆索引，指向各处详细记忆
- **内容**：用户画像、组织结构、核心决策、项目索引
- **更新**：每次有重要变化时更新

### insights.md
- **用途**：洞察记录，按时间倒序
- **内容**：职业洞察、工作方法、人际观察
- **更新**：每次有新洞察时追加

### learnings/
- **LEARNINGS.md**：会话中产生的学习记录（临时）
- **ERRORS.md**：错误和失败记录
- **FEATURE_REQUESTS.md**：功能请求
- **维护**：由 `/update-memory` 定期整理

### daily/
- **用途**：对话日志，按月归档
- **命名**：`YYYY-MM/YYYY-MM-DD.md`
- **内容**：当日对话记录、临时想法

### topics/
- **用途**：主题记忆，独立成篇
- **命名**：`{主题}.md`
- **内容**：某个主题的完整记录

### projects/
- **关键人画像/**：人物观察记录，由 person-observer 管理
- **{项目名}/**：长期项目追踪

---

## AI 访问指南

当 AI 需要在 memory/ 创建文件时：

### 第一步：判断文件类型

| 文件类型 | 存放位置 | 命名规则 |
|---------|---------|---------|
| 学习记录 | memory/learnings/LEARNINGS.md | 追加 |
| 错误记录 | memory/learnings/ERRORS.md | 追加 |
| 功能请求 | memory/learnings/FEATURE_REQUESTS.md | 追加 |
| 洞察记录 | memory/insights.md | 追加 |
| 主题记忆 | memory/topics/ | `{主题}.md` |
| 对话日志 | memory/daily/YYYY-MM/ | `YYYY-MM-DD.md` |
| 项目记录 | memory/projects/{项目}/ | `{内容}.md` |

### 第二步：检查目录是否存在

```bash
# 创建目录（如需要）
mkdir -p memory/daily/$(date +%Y-%m)
```

### 第三步：创建或追加文件

- **学习/错误/请求**：追加到 learnings/ 对应文件
- **洞察**：追加到 insights.md
- **日志**：创建 `YYYY-MM-DD.md`
- **主题**：检查是否已存在，存在则追加，不存在则创建

---

## WAL 协议

**核心原则**：关键信息先写后答

**触发条件**：修正、专有名词、偏好、决策、草稿修改、具体值

**执行方式**：触发时立即写入 `MEMORY.md` 或 `insights.md`

---

## 快速查找

| 要找什么 | 去哪里 |
|---------|--------|
| 核心记忆概览 | memory/MEMORY.md |
| 所有洞察 | memory/insights.md |
| 最近学习记录 | memory/learnings/LEARNINGS.md |
| 错误和踩坑 | memory/learnings/ERRORS.md |
| 某个人物档案 | memory/projects/关键人画像/ |
| 某天的对话 | memory/daily/YYYY-MM/YYYY-MM-DD.md |
| 某主题记录 | memory/topics/{主题}.md |

---

## 整理触发条件

| 条件 | 阈值 | 动作 |
|------|------|------|
| LEARNINGS.md | ≥ 50 条 | 执行 `/update-memory` |
| insights.md | > 500 行 | 归档旧洞察到 archive/ |

---

*最后更新：2026-04-06 — 新增 learnings/ 目录 + 流转机制*