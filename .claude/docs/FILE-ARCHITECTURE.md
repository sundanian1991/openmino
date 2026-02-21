# Mino的文件架构

## 设计原则

1. **项目相关**放在`my-agent/`中，方便git管理
2. **全局配置**放在`~/.claude/`中，跨项目共享
3. **临时工作**放在`workspace/`中，可随时清理
4. **核心配置**放在`rules/`中，每次会话自动加载

## 目录结构

```
my-agent/                                    # 项目根目录
├── .claude/
│   ├── rules/                               # 核心配置（每次会话自动加载）
│   │   ├── 01-IDENTITY.md                   # 我是谁
│   │   ├── 02-SOUL.md                       # 性格价值观
│   │   ├── 03-USER.md                       # 年老师信息
│   │   ├── 04-MEMORY.md                     # 长期记忆（五层结构）
│   │   ├── 05-self-review.md               # 错题本
│   │   ├── 06-NOW.md                        # 当前状态
│   │   ├── SESSION-STATE.md                # WAL协议核心记录
│   │   ├── WEEKLY-REVIEW.md                # 周度反思机制
│   │   ├── WORK.md                         # 工作契约
│   │   ├── heartbeat.md                    # 心跳检查
│   │   └── task.md                         # 深度访谈指引
│   │
│   ├── docs/                                # 项目文档
│   │   ├── FILE-ARCHITECTURE.md            # 文件架构（本文件）
│   │   ├── FILE-STRUCTURE.md               # 文件结构索引
│   │   ├── FORMAT-SPEC.md                  # 文档格式规范
│   │   ├── CLEANUP-PLAN.md                 # 清理方案
│   │   └── PLAYWRIGHT-MCP-SETUP.md         # Playwright MCP配置说明
│   │
│   ├── agents/                              # Agent模式定义
│   ├── skills/                              # Skills定义
│   └── commands/                            # 自定义命令
│
├── workspace/                               # 工作区（gitignored，随时清理）
│   ├── logs/                                # 日志文件
│   │   └── search-log.md
│   ├── reference/                           # 参考文档
│   │   ├── capability-assessment.md
│   │   ├── improvement-plan.md
│   │   ├── p2-assessment.md
│   │   └── search-guidelines.md
│   ├── docs/                                # 项目文档
│   ├── learning/                            # 学习笔记
│   ├── scripts/                             # 工具脚本
│   └── evomap-genes/                        # EvoMap相关
│
├── memory/                                  # 记忆系统
│   ├── daily/                               # 每日日记（原始记录）
│   │   └── YYYY-MM-DD.md
│   ├── my-thoughts/                         # 我的思考（深度反思）
│   └── tasks/                               # 任务记录
│
├── business/                                # 工作相关
├── personal/                                # 个人生活
└── projects/                                # 开发项目

~/.claude/                                   # 全局配置（跨项目）
├── .mcp.json                               # MCP服务器配置
├── settings.json                           # 全局设置
└── scripts/                                # 全局脚本
    ├── sync-doubao-profile.sh              # 同步豆包登录态
    └── cleanup-auto-generated.sh          # 清理自动生成数据
```

## 文件分类规则

### rules/（核心配置，自动加载）

**必须满足条件**：
- 每次会话都需要的信息
- 定义"我是谁"、"我怎么想"、"我怎么工作"
- 核心记忆和机制文件

**示例**：IDENTITY、SOUL、USER、MEMORY、NOW、WORK、heartbeat

### workspace/（工作区，可清理）

**用途**：
- 临时工作文件
- 学习笔记
- 工具脚本
- 参考文档

**特点**：
- 可以随时删除
- 不进git仓库
- 用于临时存储

### memory/（记忆系统，永久保存）

**用途**：
- daily/：每日原始记录
- my-thoughts/：深度思考和反思
- tasks/：长期任务追踪

**特点**：
- 永久保存
- 定期整理和提炼
- 重要内容提升到MEMORY.md

### docs/（项目文档，版本控制）

**用途**：
- 架构说明
- 格式规范
- 配置指南

**特点**：
- 进git仓库
- 版本化管理
- 长期维护

## 新文件放置指南

当需要保存新文件时，按此流程判断：

```
是核心配置吗？（定义我是谁/我怎么想）
   ↓ 是
放入 rules/

是每日记录吗？
   ↓ 是
放入 memory/daily/

是深度思考吗？
   ↓ 是
放入 memory/my-thoughts/

是临时工作吗？
   ↓ 是
放入 workspace/

是项目文档吗？
   ↓ 是
放入 .claude/docs/
```

## 维护规则

1. **rules/**：只放核心配置，保持精简
2. **memory/daily/**：每周整理，重要内容提升
3. **workspace/**：每月清理，删除无用文件
4. **docs/**：按需更新，保持同步

---

*创建时间：2026-02-21*
*最后更新：2026-02-21*
