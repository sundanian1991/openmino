# Mino的家 - 文件架构可视化

## 完整架构树

```
my-agent/                                # 项目根目录
│
├── 📄 CLAUDE.md                         # 项目级AI配置
├── 📄 README.md                         # 项目说明
├── 📄 ARCHITECTURE-ANALYSIS.md          # 架构分析（本文件）
│
├── 📁 .claude/                          # 🔴 AI核心配置（自动加载）
│   ├── 📁 rules/                        # 核心配置文件
│   │   ├── 01-IDENTITY.md               # 我是谁
│   │   ├── 02-SOUL.md                   # 性格价值观
│   │   ├── 03-USER.md                   # 年老师信息
│   │   ├── 04-MEMORY.md                 # 长期记忆
│   │   ├── 05-self-review.md           # 错题本
│   │   ├── 06-NOW.md                    # 当前状态
│   │   ├── SESSION-STATE.md            # WAL协议
│   │   ├── WEEKLY-REVIEW.md            # 周度反思
│   │   ├── WORK.md                     # 工作契约
│   │   ├── heartbeat.md                # 心跳检查
│   │   └── task.md                     # 深度访谈
│   │
│   ├── 📁 docs/                         # 🟠 架构文档（版本管理）
│   │   ├── FILE-ARCHITECTURE.md        # 文件架构
│   │   ├── FILE-STRUCTURE.md           # 文件索引
│   │   ├── FORMAT-SPEC.md              # 格式规范
│   │   └── PLAYWRIGHT-MCP-SETUP.md     # MCP配置
│   │
│   ├── 📁 agents/                       # Agent模式定义
│   ├── 📁 skills/                       # Skills定义
│   ├── 📁 commands/                     # 自定义命令
│   ├── 📁 hooks/                        # Hooks
│   ├── 📁 design/                       # 设计相关
│   └── 📁 PLANS/                        # 计划
│
├── 📁 business/                         # 🟢 工作相关（长期）
│   ├── 📁 supplier-management/          # 供应商管理
│   │   ├── 01-基础信息/
│   │   ├── 02-管理体系/
│   │   ├── 03-成果数据/
│   │   ├── 04-工作风格/
│   │   ├── 05-经历洞察/
│   │   ├── 06-晋升述职/
│   │   └── 07-AI协作/
│   │
│   └── 📁 career/                       # 职业发展
│
├── 📁 memory/                           # 🟢 记忆系统（永久）
│   ├── 📁 daily/                        # 每日日记（原始记录）
│   │   └── YYYY-MM-DD.md
│   │
│   ├── 📁 curated/                      # 精炼内容（从daily提取）
│   │   ├── patterns/                   # 模式和洞察
│   │   ├── decisions/                  # 重要决策
│   │   └── lessons/                    # 经验教训
│   │
│   ├── 📁 my-thoughts/                 # 我的思考（深度反思）
│   │   └── YYYY-MM-DD-标题.md
│   │
│   ├── 📁 tasks/                        # 任务记录
│   │   ├── 32-questions-for-self.md    # 深度访谈
│   │   └── career-assets-audit.md      # 职业资产清算
│   │
│   └── 📁 personal/                     # 个人生活
│
├── 📁 projects/                         # 🟢 开发项目（长期）
│   ├── 📁 mcp-servers/                  # MCP服务器
│   │   ├── openclaw-markdown/
│   │   └── ...
│   │
│   ├── 📁 AlphaMao_Skills/              # AlphaMao技能项目
│   └── 📁 archived/                     # 归档项目
│
├── 📁 scripts/                          # 🟡 工具脚本（中期）
│   ├── 📁 python/                       # Python脚本
│   │   ├── daily-briefing.py
│   │   ├── fetch-rss.py
│   │   └── ...
│   │
│   ├── 📁 shell/                        # Shell脚本
│   │   ├── daily-report.sh
│   │   ├── organize-memory.sh
│   │   └── ...
│   │
│   └── 📄 README.md                     # 脚本说明
│
└── 📁 workspace/                        # ⚪ 临时工作区（短期）
    ├── 📁 learning/                     # 学习笔记
    │   └── 2026-02-21-EvoMap可复用知识.md
    │
    ├── 📁 reference/                    # 参考文档
    │   ├── capability-assessment.md
    │   ├── improvement-plan.md
    │   ├── p2-assessment.md
    │   └── search-guidelines.md
    │
    ├── 📁 logs/                         # 日志文件
    │   └── search-log.md
    │
    ├── 📁 data/                         # 临时数据
    │   ├── briefing/
    │   └── rss/
    │
    ├── 📁 sources/                      # 来源文件
    │   └── karpathy-rss.opml
    │
    ├── 📁 drafts/                       # 草稿
    ├── 📁 temp/                         # 临时文件
    │
    ├── 📄 CAPTURE.md                    # Karpathy式快速记录
    ├── 📄 EVOMAP-PUBLISHING-GUIDE.md    # EvoMap发布指南
    └── 📄 TAVILY-INTEGRATION.md         # Tavily集成指南
```

## 目录分类说明

### 🔴 红色：核心配置（.claude/）

**特点**：
- 每次会话自动加载
- 定义"我是谁"、"我怎么想"
- 永久保留，不可删除

**生命周期**：永久

### 🟠 橙色：架构文档（.claude/docs/）

**特点**：
- 说明系统如何组织
- 版本管理
- 定期更新

**生命周期**：长期

### 🟢 绿色：重要内容（business/、memory/、projects/）

**特点**：
- 工作相关内容
- 记忆系统
- 开发项目
- 版本管理

**生命周期**：长期

### 🟡 黄色：工具脚本（scripts/）

**特点**：
- 可复用的工具
- 定期维护
- 版本管理

**生命周期**：中期

### ⚪ 白色：临时工作区（workspace/）

**特点**：
- 临时文件
- 学习笔记
- 随时清理
- 不进git仓库

**生命周期**：短期

## 文件统计

| 类型 | 数量 | 位置 |
|------|------|------|
| 核心配置文件 | 11个 | .claude/rules/ |
| 架构文档 | 4个 | .claude/docs/ |
| 工作内容 | 20+ | business/ |
| 记忆文件 | 50+ | memory/ |
| 脚本文件 | 10+ | scripts/ |
| 临时文件 | 变化 | workspace/ |

## 命名规范

| 文件类型 | 格式 | 示例 |
|----------|------|------|
| 核心配置 | `数字缩写-名称.md` | 01-IDENTITY.md |
| 日期文件 | `YYYY-MM-DD[-标题].md` | 2026-02-21.md |
| 功能文件 | `kebab-case.md` | heartbeat.md |
| 项目目录 | `kebab-case` | supplier-management |

## 维护规则

1. **每日**：更新memory/daily/
2. **每周**：回顾daily，提取到curated
3. **每月**：清理workspace/
4. **每季度**：审查.claude/rules/
5. **每年**：架构评估

---

*创建时间：2026-02-21*
*版本：v1.0*
*状态：待年老师审查*
