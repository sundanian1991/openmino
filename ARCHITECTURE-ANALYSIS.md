# Mino的家 - 文件架构深度分析

## 第一部分：当前架构问题诊断

### 1.1 文件重复问题

| 文件 | 位置 | 问题 | 建议 |
|------|------|------|------|
| HEARTBEAT.md | 根目录 | 空文件（0字节） | 删除 |
| SESSION-STATE.md | 根目录 + .claude/rules/ | 重复 | 只保留.claude/rules/ |
| Claude.md | 根目录 + business/ + business/供应商管理/ | 重复 | 只保留根目录 |
| Soul.md | business/ | 应该在.claude/rules/ | 移动到.claude/rules/02-SOUL.md |

### 1.2 一级目录混乱

当前有9个一级目录，但分类逻辑不清晰：

| 目录 | 当前内容 | 问题 |
|------|----------|------|
| **business/** | 工作相关（供应商管理） | ✅ 合理 |
| **data/** | briefing、rss | ❓ 用途不明 |
| **docs/** | agent-teams-test、skills-guide | ❓ 与.claude/docs/区别？ |
| **memory/** | daily、my-thoughts、tasks | ✅ 合理 |
| **personal/** | 个人生活 | ✅ 合理 |
| **projects/** | mcp-servers | ❌ 实际是mcp服务器，不是项目 |
| **scripts/** | Python脚本、shell脚本 | ❓ 与workspace/scripts/区别？ |
| **sources/** | 一个opml文件 | ❌ 只有一个文件，不需要目录 |
| **workspace/** | AlphaMao_Skills、docs、learning、logs、reference、*.py | ❌ 太混乱 |

### 1.3 workspace/内容混乱

```
workspace/
├── AlphaMao_Skills/          # 子项目
├── docs/                     # 空目录
├── evomap-genes/             # EvoMap相关
├── learning/                 # 学习笔记
├── logs/                     # 日志
├── reference/                # 参考
├── CAPTURE.md                # Karpathy式快速记录
├── EVOMAP-PUBLISHING-GUIDE.md # EvoMap发布指南
├── TAVILY-INTEGRATION.md     # Tavily集成指南
├── search.py                 # Python脚本
├── search_mcp.py             # Python脚本
└── simple_search.py          # Python脚本
```

**问题**：
- 子项目、工具脚本、文档混在一起
- 没有明确的子目录层次
- 工具脚本应该在scripts/或专门的目录

### 1.4 docs/目录混乱

有3个docs/目录，用途不清晰：

| 位置 | 内容 | 实际用途 |
|------|------|----------|
| **docs/** | agent-teams-test.md、skills-guide.md | 过时文档？ |
| **.claude/docs/** | FILE-ARCHITECTURE.md、FORMAT-SPEC.md等 | 架构文档 ✅ |
| **workspace/docs/** | 空 | 无用 |

---

## 第二部分：设计原则

### 2.1 核心原则

1. **单一职责**：每个目录只有一个明确的目的
2. **层次清晰**：一级目录、二级目录、三级目录各司其职
3. **易于维护**：新增文件时清楚应该放在哪里
4. **面向未来**：架构能支持长期演进

### 2.2 分类维度

按照**生命周期**和**稳定性**分类：

| 生命周期 | 稳定性 | 位置 | 示例 |
|----------|--------|------|------|
| **永久** | 核心配置，不可删除 | `.claude/rules/` | IDENTITY.md、SOUL.md |
| **长期** | 重要内容，版本管理 | `memory/`、`business/` | daily文件、供应商管理 |
| **中期** | 项目文档，定期整理 | `.claude/docs/` | 架构说明、格式规范 |
| **短期** | 临时工作，随时清理 | `workspace/` | 学习笔记、工具脚本 |

### 2.3 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 核心配置 | `数字缩写-名称.md` | 01-IDENTITY.md |
| 功能文件 | `kebab-case.md` | heartbeat.md |
| 项目目录 | `kebab-case` | supplier-management |
| 日期文件 | `YYYY-MM-DD.md` | 2026-02-21.md |

---

## 第三部分：新架构设计

### 3.1 一级目录（9个 → 6个）

```
my-agent/
├── .claude/          # AI核心配置（自动加载）
├── business/         # 工作相关（供应商管理）
├── memory/           # 记忆系统
├── projects/         # 开发项目
├── scripts/          # 工具脚本
└── workspace/        # 临时工作区
```

**删除的目录**：
- ❌ `docs/` → 合并到`.claude/docs/`或`workspace/docs/`
- ❌ `data/` → 合并到`workspace/data/`或`memory/`
- ❌ `sources/` → 合并到`workspace/sources/`
- ❌ `personal/` → 合并到`memory/personal/`

### 3.2 二级目录设计

```
.claude/
├── rules/            # 核心配置（每次会话自动加载）
├── docs/             # 架构文档（版本管理）
├── agents/           # Agent模式定义
├── skills/           # Skills定义
├── commands/         # 自定义命令
├── hooks/            # Hooks
├── design/           # 设计相关
└── PLANS/            # 计划

business/
├── supplier-management/    # 供应商管理
│   ├── 01-基础信息/
│   ├── 02-管理体系/
│   ├── 03-成果数据/
│   ├── 04-工作风格/
│   ├── 05-经历洞察/
│   ├── 06-晋升述职/
│   └── 07-AI协作/
└── career/               # 职业发展（新增）

memory/
├── daily/                # 每日日记（原始记录）
├── curated/              # 精炼内容（从daily提取）
├── my-thoughts/          # 我的思考
├── tasks/                # 任务记录
└── personal/             # 个人生活

projects/
├── mcp-servers/          # MCP服务器
└── archived/             # 归档项目

scripts/
├── python/               # Python脚本
├── shell/                # Shell脚本
└── README.md             # 脚本说明

workspace/
├── learning/             # 学习笔记
├── reference/            # 参考文档
├── logs/                 # 日志文件
├── data/                 # 临时数据
├── sources/              # 来源文件
├── drafts/               # 草稿
└── temp/                 # 临时文件
```

### 3.3 文件放置规则

**决策树**：

```
新文件要保存？
   │
   ├─ 是核心配置（定义我是谁/我怎么想）？
   │   └─ 是 → .claude/rules/
   │
   ├─ 是架构文档（说明系统如何组织）？
   │   └─ 是 → .claude/docs/
   │
   ├─ 是每日记录？
   │   └─ 是 → memory/daily/YYYY-MM-DD.md
   │
   ├─ 是深度思考/感悟？
   │   └─ 是 → memory/my-thoughts/YYYY-MM-DD-标题.md
   │
   ├─ 是工作相关（供应商管理）？
   │   └─ 是 → business/supplier-management/
   │
   ├─ 是开发项目？
   │   └─ 是 → projects/[项目名]/
   │
   ├─ 是工具脚本？
   │   └─ 是 → scripts/[python|shell]/
   │
   └─ 其他临时内容？
       └─ 是 → workspace/[learning|reference|logs|data|drafts|temp]/
```

---

## 第四部分：迁移计划

### 4.1 删除文件/目录

| 操作 | 对象 | 原因 |
|------|------|------|
| 删除 | 根目录/HEARTBEAT.md | 空文件 |
| 删除 | 根目录/SESSION-STATE.md | 重复，.claude/rules/已有 |
| 删除 | workspace/docs/ | 空目录 |
| 删除 | sources/ | 只有一个文件，合并到workspace/sources/ |
| 删除 | docs/ | 合并到.claude/docs/ |
| 删除 | data/ | 合并到workspace/data/ |

### 4.2 移动文件/目录

| 操作 | 从 | 到 | 原因 |
|------|----|----| ----|
| 移动 | business/Soul.md | .claude/rules/02-SOUL.md | 核心配置 |
| 移动 | docs/* | .claude/docs/ | 统一文档位置 |
| 移动 | sources/* | workspace/sources/ | 归类 |
| 移动 | data/* | workspace/data/ | 归类 |
| 移动 | workspace/*.py | scripts/python/ | 脚本归类 |
| 移动 | workspace/*.md | workspace/reference/ | 文档归类 |
| 移动 | workspace/AlphaMao_Skills | projects/AlphaMao_Skills | 项目归类 |

### 4.3 新建目录/文件

| 操作 | 对象 | 原因 |
|------|------|------|
| 新建 | business/career/ | 职业发展内容 |
| 新建 | memory/curated/ | 精炼内容存储 |
| 新建 | memory/personal/ | 个人生活内容 |
| 新建 | projects/archived/ | 归档项目 |

---

## 第五部分：维护规则

### 5.1 定期维护

| 频率 | 任务 | 负责人 |
|------|------|--------|
| 每日 | 更新memory/daily/ | 我（自动） |
| 每周 | 回顾daily文件，提取到curated | 我（自动） |
| 每月 | 清理workspace/ | 我（自动） |
| 每季度 | 审查.claude/rules/内容 | 我+年老师 |
| 每年 | 架构评估和调整 | 我+年老师 |

### 5.2 质量标准

| 标准 | 要求 |
|------|------|
| **无重复** | 同一内容只在一个位置 |
| **无空目录** | 删除无用的空目录 |
| **命名一致** | 遵循命名规范 |
| **分类清晰** | 每个文件都能快速定位 |

---

*创建时间：2026-02-21*
*状态：待年老师审查*
