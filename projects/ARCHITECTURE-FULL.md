# Mino的家 - 完整目录架构（二级、三级）

## 一级目录总览

```
my-agent/
├── .claude/          # 🔴 AI核心配置（自动加载）
├── business/         # 🟢 工作相关（供应商管理）
├── memory/           # 🟢 记忆系统（永久保存）
├── projects/         # 🟢 开发项目（版本管理）
├── scripts/          # 🟡 工具脚本（可复用）
└── workspace/        # ⚪ 临时工作区（随时清理）
```

---

## 1️⃣ .claude/ - AI核心配置

### 完整结构

```
.claude/
├── rules/                          # 🔴 核心配置（每次会话自动加载）
│   ├── 01-IDENTITY.md              # 我是谁
│   ├── 02-SOUL.md                  # 性格价值观
│   ├── 03-USER.md                  # 年老师信息
│   ├── 04-MEMORY.md                # 长期记忆（五层结构）
│   ├── 05-self-review.md          # 错题本
│   ├── 06-NOW.md                   # 当前状态
│   ├── SESSION-STATE.md           # WAL协议核心记录（L1置顶）
│   ├── WEEKLY-REVIEW.md           # 周度反思机制
│   ├── WORK.md                    # 工作契约
│   ├── heartbeat.md               # 心跳检查
│   └── task.md                    # 深度访谈指引
│
├── docs/                           # 🟠 架构文档（版本管理）
│   ├── ARCHITECTURE-FULL.md       # 完整目录架构（本文件）
│   ├── ARCHITECTURE-ANALYSIS.md   # 架构分析
│   ├── ARCHITECTURE-VISUAL.md     # 可视化架构
│   ├── ARCHITECTURE-EXECUTION-PLAN.md # 执行计划
│   ├── FILE-ARCHITECTURE.md       # 文件架构
│   ├── FILE-STRUCTURE.md          # 文件索引
│   ├── FORMAT-SPEC.md             # 格式规范
│   ├── CLEANUP-PLAN.md            # 清理方案
│   ├── PLAYWRIGHT-MCP-SETUP.md    # MCP配置
│   └── agent-teams-test.md        # Agent团队测试（待整理）
│
├── agents/                         # Agent模式定义
│   ├── INDEX.md                   # Agent索引
│   ├── architect.md               # 软件架构师
│   ├── planner.md                 # 计划专家
│   ├── code-reviewer.md           # 代码审查
│   ├── data-analyst.md            # 数据分析师
│   └── reading-internalizer/      # 阅读内化
│       └── reading-internalizer.md
│
├── skills/                         # Skills定义
│   ├── INDEX.md                   # Skills索引
│   ├── SKILLS-QUICK-REFERENCE.md  # 快速参考
│   ├── SKILLS-FULL-LIST.md        # 完整列表
│   ├── SKILLS-INVENTORY.md        # Skills清单
│   └── [具体skill]/
│       ├── SKILL.md
│       ├── references/            # 参考资料
│       └── templates/             # 模板
│
├── commands/                       # 自定义命令
│   └── UPDATE_MEMORY.md           # 更新记忆命令
│
├── hooks/                          # Hooks配置
│   ├── README.md
│   └── SETTINGS-CONFIG.md
│
├── design/                         # 设计相关
│   └── DESIGN_SYSTEM.md           # 设计系统
│
└── PLANS/                          # 计划
    └── CHECKLIST.md              # 启动前检查
```

### 目录说明

| 二级目录 | 用途 | 生命周期 | 自动加载 |
|---------|------|----------|----------|
| **rules/** | 核心配置文件 | 永久 | ✅ 是 |
| **docs/** | 架构和说明文档 | 长期 | ❌ 否 |
| **agents/** | Agent模式定义 | 长期 | ❌ 否 |
| **skills/** | Skills定义 | 长期 | ❌ 否 |
| **commands/** | 自定义命令 | 长期 | ❌ 否 |
| **hooks/** | Hooks配置 | 长期 | ❌ 否 |
| **design/** | 设计系统 | 长期 | ❌ 否 |
| **PLANS/** | 计划和检查 | 长期 | ❌ 否 |

---

## 2️⃣ business/ - 工作相关

### 完整结构

```
business/
├── supplier-management/              # 供应商管理（核心工作）
│   ├── 00-总览/
│   │   └── 00-供应商管理总览.md
│   │
│   ├── 01-基础信息/
│   │   └── 01-基础信息.md
│   │
│   ├── 02-管理体系/
│   │   ├── 02-管理体系.md
│   │   └── 管理思路.md
│   │
│   ├── 03-成果数据/
│   │   └── 03-成果数据.md
│   │
│   ├── 04-工作风格/
│   │   └── 04-工作风格.md
│   │
│   ├── 05-经历洞察/
│   │   └── 05-经历洞察.md
│   │
│   ├── 06-晋升述职/
│   │   ├── 06-晋升述职.md
│   │   └── 晋升述职笔记清单.md
│   │
│   ├── 07-向上汇报/
│   │   ├── 汇报框架.md
│   │   └── 周报模板.md
│   │
│   ├── 08-AI协作/
│   │   └── 07-AI协作.md
│   │
│   └── Claude.md                   # 项目级AI配置
│
└── career/                          # 职业发展（新增）
    ├── 00-总览/
    │   └── 00-职业发展总览.md
    │
    ├── P6-到-P7/
    │   └── P6到P7的转型.md
    │
    ├── 能力模型/
    │   └── 供应商管理能力模型.md
    │
    └── 晋升材料/
        ├── 述职PPT.md
        └── 案例整理.md
```

### 目录说明

| 二级目录 | 三级目录 | 用途 | 示例文件 |
|---------|---------|------|----------|
| **supplier-management/** | 01-基础信息 | 供应商基本信息 | 35家供应商名单 |
| | 02-管理体系 | 管理框架和SOP | 五大支柱、指标体系 |
| | 03-成果数据 | 数据和成果 | KPI数据、改进成果 |
| | 04-工作风格 | 工作方式和偏好 | 沟通风格、决策方式 |
| | 05-经历洞察 | 重要经历和洞察 | 关键事件、经验教训 |
| | 06-晋升述职 | 晋升相关材料 | 述职PPT、案例 |
| | 07-向上汇报 | 汇报框架和模板 | 周报、月报模板 |
| | 08-AI协作 | 与AI协作的经验 | 协作模式、最佳实践 |
| **career/** | P6-到-P7 | 职业转型记录 | 转型过程中的思考 |
| | 能力模型 | 能力发展模型 | 当前能力、目标能力 |
| | 晋升材料 | 晋升相关材料 | 述职、答辩准备 |

---

## 3️⃣ memory/ - 记忆系统

### 完整结构

```
memory/
├── daily/                           # 每日日记（原始记录）
│   ├── 2026-02-13.md
│   ├── 2026-02-17.md
│   ├── 2026-02-18.md
│   ├── 2026-02-20.md
│   └── 2026-02-21.md
│
├── curated/                         # 精炼内容（从daily提取）
│   ├── patterns/                    # 模式和洞察
│   │   ├── 工作模式.md
│   │   ├── 决策模式.md
│   │   └── 沟通模式.md
│   │
│   ├── decisions/                   # 重要决策
│   │   ├── 2026年关键决策.md
│   │   └── 供应商管理决策.md
│   │
│   └── lessons/                     # 经验教训
│       ├── 工作教训.md
│       └── 管理教训.md
│
├── my-thoughts/                     # 我的思考（深度反思）
│   ├── 2026-02-19-关于自主性.md
│   ├── 2026-02-20-从放弃到成功.md
│   └── 2026-02-20-从0到1到1到10.md
│
├── tasks/                           # 任务记录
│   ├── 32-questions-for-self.md     # 深度访谈问题
│   ├── career-assets-audit.md       # 职业资产清算
│   ├── cognition-system-analysis.md # 认知系统分析
│   ├── cognition-system-plan.md     # 认知系统计划
│   └── task-tracking.md             # 任务追踪
│
├── templates/                       # 模板
│   ├── work-log.md                 # 工作日志模板
│   ├── career-assets-ledger.md     # 职业资产台账
│   └── risk-checklist.md           # 风险检查清单
│
├── protocols/                       # 协议和方法
│   ├── PROTOCOLS.md                # 总协议
│   └── skills-usage.md             # Skills使用协议
│
└── personal/                        # 个人生活（新增）
    ├── 家庭/
    │   └── 家庭关系.md
    ├── 健康/
    │   └── 健康记录.md
    └── 兴趣/
        └── 兴趣爱好.md
```

### 目录说明

| 二级目录 | 三级目录 | 用途 | 维护频率 |
|---------|---------|------|----------|
| **daily/** | - | 每日原始记录 | 每天 |
| **curated/** | patterns/ | 模式和洞察 | 每周提取 |
| | decisions/ | 重要决策 | 每周提取 |
| | lessons/ | 经验教训 | 每周提取 |
| **my-thoughts/** | - | 深度思考反思 | 有重要思考时 |
| **tasks/** | - | 长期任务记录 | 持续更新 |
| **templates/** | - | 各类模板 | 按需添加 |
| **protocols/** | - | 协议和方法 | 按需更新 |
| **personal/** | 家庭/健康/兴趣 | 个人生活 | 隐私内容 |

---

## 4️⃣ projects/ - 开发项目

### 完整结构

```
projects/
├── mcp-servers/                     # MCP服务器项目
│   ├── memory-search/              # 记忆搜索MCP
│   │   ├── index.js
│   │   ├── package.json
│   │   └── node_modules/           # gitignored
│   │
│   └── openclaw-markdown/          # OpenClaw Markdown MCP
│       ├── index.js
│       └── package.json
│
├── AlphaMao_Skills/                 # AlphaMao技能项目
│   ├── brain-dump/
│   ├── dan-koe-writing/
│   ├── investment-committee/
│   ├── market-sizing/
│   ├── note-meta-skill/
│   ├── stanford-vibe-coding-course/
│   └── stock-research/
│
├── archived/                        # 归档项目（新增）
│   └── web-summarizer/             # 已归档的网页摘要项目
│
└── docs/                            # 项目文档
    └── tavily-mcp-guide.md        # Tavily MCP指南
```

### 目录说明

| 二级目录 | 用途 | 示例 |
|---------|------|------|
| **mcp-servers/** | MCP服务器开发 | memory-search、openclaw-markdown |
| **AlphaMao_Skills/** | AlphaMao相关技能项目 | 各种学习笔记和技能 |
| **archived/** | 已完成或暂停的项目 | web-summarizer |
| **docs/** | 项目相关文档 | 技术文档、API文档 |

---

## 5️⃣ scripts/ - 工具脚本

### 完整结构

```
scripts/
├── python/                          # Python脚本
│   ├── daily-briefing.py           # 日报生成
│   ├── daily-briefing-v2-backup.py # 日报v2备份
│   ├── fetch-rss.py                # RSS抓取
│   ├── search.py                   # 搜索工具（从workspace/移入）
│   ├── search_mcp.py               # MCP搜索（从workspace/移入）
│   └── simple_search.py            # 简单搜索（从workspace/移入）
│
├── shell/                           # Shell脚本
│   ├── daily-report.sh             # 日报脚本
│   ├── organize-memory.sh          # 记忆整理
│   ├── analyze-skills.sh           # Skills分析
│   └── fetch-web-content.sh        # 网页内容抓取
│
└── README.md                        # 脚本说明
    ├── 使用指南
    ├── 依赖说明
    └── 维护记录
```

### 目录说明

| 二级目录 | 用途 | 维护 |
|---------|------|------|
| **python/** | Python工具脚本 | 按需添加 |
| **shell/** | Shell工具脚本 | 按需添加 |
| **README.md** | 脚本使用说明 | 持续更新 |

---

## 6️⃣ workspace/ - 临时工作区

### 完整结构

```
workspace/
├── learning/                        # 学习笔记
│   ├── 2026-02-20-EvoMap博客洞察.md
│   ├── 2026-02-20-EvoMap平台亮点分析.md
│   ├── 2026-02-20-EvoMap-Wiki全面分析.md
│   └── 2026-02-21-EvoMap可复用知识.md
│
├── reference/                       # 参考文档
│   ├── capability-assessment.md    # 能力评估标准
│   ├── improvement-plan.md         # 改进计划
│   ├── p2-assessment.md            # P2改进评估
│   └── search-guidelines.md        # 搜索指南
│
├── logs/                            # 日志文件
│   └── search-log.md               # 搜索日志
│
├── data/                            # 临时数据（从data/移入）
│   ├── briefing/
│   │   └── 2026-02-17/
│   └── rss/                        # RSS相关数据
│       └── sources/
│
├── sources/                         # 来源文件（从sources/移入）
│   └── karpathy-rss.opml           # Karpathy的RSS源
│
├── drafts/                          # 草稿（新增）
│   ├── 待完成文章.md
│   └── 临时想法.md
│
├── temp/                            # 临时文件（新增）
│   └── [临时文件]
│
├── evomap-genes/                    # EvoMap相关
│   ├── evomap-publishing-fixes.json
│   ├── evomap-publishing-fixes-ready.json
│   ├── publish.py                  # 发布工具
│   └── EVOMAP-PUBLISHING-GUIDE.md  # 发布指南（移入）
│
├── CAPTURE.md                       # Karpathy式快速记录
├── TAVILY-INTEGRATION.md            # Tavily集成指南（移入reference/）
└── README.md                        # 工作区说明
```

### 目录说明

| 二级目录 | 用途 | 清理周期 |
|---------|------|----------|
| **learning/** | 学习笔记和洞察 | 每月评估，有价值→curated |
| **reference/** | 参考文档和指南 | 每月评估，有价值→.claude/docs/ |
| **logs/** | 各类日志 | 每周清理 |
| **data/** | 临时数据 | 每周清理 |
| **sources/** | 来源文件 | 按需清理 |
| **drafts/** | 草稿和临时想法 | 每周清理 |
| **temp/** | 临时文件 | 每次会话后清理 |
| **evomap-genes/** | EvoMap相关 | 保留（活跃使用） |

---

## 文件归属规则

### 根目录文件

```
my-agent/
├── CLAUDE.md                        # ✅ 保留：项目级AI配置
├── README.md                        # ✅ 保留：项目说明
├── ARCHITECTURE-FULL.md             # ✅ 新增：完整架构（本文件）
├── ARCHITECTURE-ANALYSIS.md         # ✅ 新增：架构分析
├── ARCHITECTURE-VISUAL.md           # ✅ 新增：可视化架构
└── ARCHITECTURE-EXECUTION-PLAN.md   # ✅ 新增：执行计划
```

### 删除的文件

```
❌ HEARTBEAT.md（根目录，空文件）
❌ SESSION-STATE.md（根目录，重复）
❌ Soul.md（business/，重复）
❌ 00-供应商管理原始版.md（旧版本）
❌ 晋升述职笔记清单.md（根目录，移入supplier-management/06-晋升述职/）
```

---

## 目录统计对比

| 指标 | 当前 | 优化后 | 改进 |
|------|------|--------|------|
| 一级目录 | 9个 | 6个 | -3个 |
| 重复文件 | 4个 | 0个 | -4个 |
| 空目录 | 多个 | 0个 | 清理 |
| docs/目录 | 3个混乱 | 1个清晰 | 统一 |

---

## 决策树：新文件放哪里？

```
新文件要保存？
│
├─ 是核心配置（定义我是谁/我怎么想）？
│   └─ ✅ → .claude/rules/
│
├─ 是架构文档（说明系统如何组织）？
│   └─ ✅ → .claude/docs/
│
├─ 是每日记录？
│   └─ ✅ → memory/daily/YYYY-MM-DD.md
│
├─ 是深度思考/感悟？
│   └─ ✅ → memory/my-thoughts/YYYY-MM-DD-标题.md
│
├─ 是模式/决策/教训（精炼内容）？
│   └─ ✅ → memory/curated/{patterns|decisions|lessons}/
│
├─ 是供应商管理相关？
│   └─ ✅ → business/supplier-management/[对应目录]/
│
├─ 是职业发展相关？
│   └─ ✅ → business/career/[对应目录]/
│
├─ 是MCP服务器或开发项目？
│   └─ ✅ → projects/[项目名]/
│
├─ 是Python/Shell工具脚本？
│   └─ ✅ → scripts/{python|shell}/
│
├─ 是学习笔记？
│   └─ ✅ → workspace/learning/
│
├─ 是参考文档？
│   └─ ✅ → workspace/reference/
│
├─ 是日志？
│   └─ ✅ → workspace/logs/
│
└─ 其他临时内容？
    └─ ✅ → workspace/{drafts|temp|data}/
```

---

## 维护规则

### 每日
- 更新memory/daily/YYYY-MM-DD.md
- 清理workspace/temp/

### 每周
- 回顾daily文件，提取到memory/curated/
- 清理workspace/logs/
- 清理workspace/drafts/

### 每月
- 清理workspace/整体
- 评估workspace/learning/内容，有价值的提升到memory/
- 评估workspace/reference/内容，有价值的提升到.claude/docs/

### 每季度
- 审查.claude/rules/内容
- 更新架构文档

### 每年
- 架构评估和调整

---

*创建时间：2026-02-21*
*版本：v1.0*
*状态：等待年老师最终确认*
