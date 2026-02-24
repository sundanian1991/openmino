---
input: 项目需求
output: ARCHITECTURE-TREE.md 实现
pos: projects/archive/architecture/ARCHITECTURE-TREE.md
---

# Mino的家 - 可视化目录树

## 完整目录树（含三级、四级）

```
my-agent/                                    # 项目根目录
│
├── 📄 CLAUDE.md                             # 项目级AI配置
├── 📄 README.md                             # 项目说明
├── 📄 ARCHITECTURE-FULL.md                  # 完整目录架构
├── 📄 ARCHITECTURE-ANALYSIS.md              # 架构分析
├── 📄 ARCHITECTURE-VISUAL.md                # 可视化架构
├── 📄 ARCHITECTURE-EXECUTION-PLAN.md        # 执行计划
│
├── 📁 .claude/                              # 🔴 AI核心配置（自动加载）
│   │
│   ├── 📁 rules/                            # 核心配置（11个文件）
│   │   ├── 01-IDENTITY.md                   # 我是谁
│   │   ├── 02-SOUL.md                       # 性格价值观
│   │   ├── 03-USER.md                       # 年老师信息
│   │   ├── 04-MEMORY.md                     # 长期记忆
│   │   ├── 05-self-review.md               # 错题本
│   │   ├── 06-NOW.md                        # 当前状态
│   │   ├── SESSION-STATE.md                # WAL协议
│   │   ├── WEEKLY-REVIEW.md                # 周度反思
│   │   ├── WORK.md                         # 工作契约
│   │   ├── heartbeat.md                    # 心跳检查
│   │   └── task.md                         # 深度访谈
│   │
│   ├── 📁 docs/                             # 架构文档（10个文件）
│   │   ├── ARCHITECTURE-FULL.md            # 本文件
│   │   ├── ARCHITECTURE-ANALYSIS.md
│   │   ├── ARCHITECTURE-VISUAL.md
│   │   ├── ARCHITECTURE-EXECUTION-PLAN.md
│   │   ├── FILE-ARCHITECTURE.md
│   │   ├── FILE-STRUCTURE.md
│   │   ├── FORMAT-SPEC.md
│   │   ├── CLEANUP-PLAN.md
│   │   ├── PLAYWRIGHT-MCP-SETUP.md
│   │   └── agent-teams-test.md
│   │
│   ├── 📁 agents/                           # Agent模式定义
│   │   ├── INDEX.md
│   │   ├── architect.md
│   │   ├── planner.md
│   │   ├── code-reviewer.md
│   │   ├── data-analyst.md
│   │   └── reading-internalizer/
│   │       └── reading-internalizer.md
│   │
│   ├── 📁 skills/                           # Skills定义（50+个技能）
│   │   ├── INDEX.md
│   │   ├── SKILLS-QUICK-REFERENCE.md
│   │   ├── SKILLS-FULL-LIST.md
│   │   ├── SKILLS-INVENTORY.md
│   │   └── [具体skill]/
│   │       ├── SKILL.md
│   │       ├── references/
│   │       └── templates/
│   │
│   ├── 📁 commands/                         # 自定义命令
│   │   └── UPDATE_MEMORY.md
│   │
│   ├── 📁 hooks/                            # Hooks配置
│   │   ├── README.md
│   │   └── SETTINGS-CONFIG.md
│   │
│   ├── 📁 design/                           # 设计相关
│   │   └── DESIGN_SYSTEM.md
│   │
│   └── 📁 PLANS/                            # 计划
│       └── CHECKLIST.md
│
├── 📁 business/                             # 🟢 工作相关
│   │
│   └── 📁 supplier-management/              # 供应商管理
│       ├── 📁 00-总览/
│       │   └── 00-供应商管理总览.md
│       ├── 📁 01-基础信息/
│       │   └── 01-基础信息.md
│       ├── 📁 02-管理体系/
│       │   ├── 02-管理体系.md
│       │   └── 管理思路.md
│       ├── 📁 03-成果数据/
│       │   └── 03-成果数据.md
│       ├── 📁 04-工作风格/
│       │   └── 04-工作风格.md
│       ├── 📁 05-经历洞察/
│       │   └── 05-经历洞察.md
│       ├── 📁 06-晋升述职/
│       │   ├── 06-晋升述职.md
│       │   └── 晋升述职笔记清单.md
│       ├── 📁 07-向上汇报/
│       │   ├── 汇报框架.md
│       │   └── 周报模板.md
│       ├── 📁 08-AI协作/
│       │   └── 07-AI协作.md
│       └── Claude.md
│
│   └── 📁 career/                           # 职业发展（新增）
│       ├── 📁 00-总览/
│       ├── 📁 P6-到-P7/
│       ├── 📁 能力模型/
│       └── 📁 晋升材料/
│
├── 📁 memory/                               # 🟢 记忆系统
│   │
│   ├── 📁 daily/                            # 每日日记
│   │   ├── 2026-02-13.md
│   │   ├── 2026-02-17.md
│   │   ├── 2026-02-18.md
│   │   ├── 2026-02-20.md
│   │   └── 2026-02-21.md
│   │
│   ├── 📁 curated/                          # 精炼内容（新增）
│   │   ├── 📁 patterns/                     # 模式和洞察
│   │   ├── 📁 decisions/                    # 重要决策
│   │   └── 📁 lessons/                      # 经验教训
│   │
│   ├── 📁 my-thoughts/                      # 我的思考
│   │   ├── 2026-02-19-关于自主性.md
│   │   ├── 2026-02-20-从放弃到成功.md
│   │   └── 2026-02-20-从0到1到1到10.md
│   │
│   ├── 📁 tasks/                            # 任务记录
│   │   ├── 32-questions-for-self.md
│   │   ├── career-assets-audit.md
│   │   ├── cognition-system-analysis.md
│   │   ├── cognition-system-plan.md
│   │   └── task-tracking.md
│   │
│   ├── 📁 templates/                        # 模板
│   │   ├── work-log.md
│   │   ├── career-assets-ledger.md
│   │   └── risk-checklist.md
│   │
│   ├── 📁 protocols/                        # 协议和方法
│   │   ├── PROTOCOLS.md
│   │   └── skills-usage.md
│   │
│   └── 📁 personal/                         # 个人生活（新增）
│       ├── 📁 家庭/
│       ├── 📁 健康/
│       └── 📁 兴趣/
│
├── 📁 projects/                             # 🟢 开发项目
│   │
│   ├── 📁 mcp-servers/                      # MCP服务器
│   │   ├── 📁 memory-search/
│   │   │   ├── index.js
│   │   │   ├── package.json
│   │   │   └── node_modules/
│   │   └── 📁 openclaw-markdown/
│   │       ├── index.js
│   │       └── package.json
│   │
│   ├── 📁 AlphaMao_Skills/                  # AlphaMao技能项目
│   │   ├── 📁 brain-dump/
│   │   ├── 📁 dan-koe-writing/
│   │   ├── 📁 investment-committee/
│   │   ├── 📁 market-sizing/
│   │   ├── 📁 note-meta-skill/
│   │   ├── 📁 stanford-vibe-coding-course/
│   │   └── 📁 stock-research/
│   │
│   ├── 📁 archived/                         # 归档项目（新增）
│   │   └── 📁 web-summarizer/
│   │
│   └── 📁 docs/                             # 项目文档
│       └── tavily-mcp-guide.md
│
├── 📁 scripts/                              # 🟡 工具脚本
│   │
│   ├── 📁 python/                           # Python脚本（调整后）
│   │   ├── daily-briefing.py
│   │   ├── daily-briefing-v2-backup.py
│   │   ├── fetch-rss.py
│   │   ├── search.py                       # 从workspace/移入
│   │   ├── search_mcp.py                   # 从workspace/移入
│   │   └── simple_search.py                # 从workspace/移入
│   │
│   ├── 📁 shell/                            # Shell脚本（调整后）
│   │   ├── daily-report.sh
│   │   ├── organize-memory.sh
│   │   ├── analyze-skills.sh
│   │   └── fetch-web-content.sh
│   │
│   └── 📄 README.md                         # 脚本说明
│
└── 📁 workspace/                            # ⚪ 临时工作区
    │
    ├── 📁 learning/                         # 学习笔记
    │   ├── 2026-02-20-EvoMap博客洞察.md
    │   ├── 2026-02-20-EvoMap平台亮点分析.md
    │   ├── 2026-02-20-EvoMap-Wiki全面分析.md
    │   └── 2026-02-21-EvoMap可复用知识.md
    │
    ├── 📁 reference/                        # 参考文档
    │   ├── capability-assessment.md
    │   ├── improvement-plan.md
    │   ├── p2-assessment.md
    │   └── search-guidelines.md
    │
    ├── 📁 logs/                             # 日志文件
    │   └── search-log.md
    │
    ├── 📁 data/                             # 临时数据（从data/移入）
    │   ├── 📁 briefing/
    │   │   └── 📁 2026-02-17/
    │   └── 📁 rss/
    │       └── 📁 sources/
    │
    ├── 📁 sources/                          # 来源文件（从sources/移入）
    │   └── karpathy-rss.opml
    │
    ├── 📁 drafts/                           # 草稿（新增）
    │   ├── 待完成文章.md
    │   └── 临时想法.md
    │
    ├── 📁 temp/                             # 临时文件（新增）
    │   └── [临时文件]
    │
    ├── 📁 evomap-genes/                     # EvoMap相关
    │   ├── evomap-publishing-fixes.json
    │   ├── evomap-publishing-fixes-ready.json
    │   ├── publish.py
    │   └── EVOMAP-PUBLISHING-GUIDE.md      # 从workspace/移入
    │
    ├── 📄 CAPTURE.md                        # Karpathy式快速记录
    ├── 📄 EVOMAP-PUBLISHING-GUIDE.md        # 移入evomap-genes/
    ├── 📄 TAVILY-INTEGRATION.md             # 移入reference/
    └── 📄 README.md                         # 工作区说明
```

## 目录层级说明

### 一级目录（6个）

| 目录 | 图标 | 类型 | 自动加载 | 版本管理 |
|------|------|------|----------|----------|
| .claude/ | 🔴 | 核心配置 | ✅ 是 | ❌ 否 |
| business/ | 🟢 | 工作内容 | ❌ 否 | ✅ 是 |
| memory/ | 🟢 | 记忆系统 | ❌ 否 | ✅ 是 |
| projects/ | 🟢 | 开发项目 | ❌ 否 | ✅ 是 |
| scripts/ | 🟡 | 工具脚本 | ❌ 否 | ✅ 是 |
| workspace/ | ⚪ | 临时工作 | ❌ 否 | ❌ 否 |

### 二级目录分布

| 一级目录 | 二级目录数量 | 主要二级目录 |
|---------|-------------|-------------|
| .claude/ | 8个 | rules/, docs/, agents/, skills/ |
| business/ | 2个 | supplier-management/, career/ |
| memory/ | 7个 | daily/, curated/, my-thoughts/ |
| projects/ | 4个 | mcp-servers/, AlphaMao_Skills/ |
| scripts/ | 2个 | python/, shell/ |
| workspace/ | 8个 | learning/, reference/, logs/ |

### 三级目录分布（示例）

| 二级目录 | 三级目录示例 |
|---------|-------------|
| supplier-management/ | 01-基础信息/, 02-管理体系/, ..., 08-AI协作/ |
| curated/ | patterns/, decisions/, lessons/ |
| mcp-servers/ | memory-search/, openclaw-markdown/ |

### 四级目录（少数）

```
.claude/agents/reading-internalizer/
    └── reading-internalizer.md

.claude/skills/[具体skill]/
    ├── references/
    └── templates/

workspace/data/briefing/
    └── 2026-02-17/
```

---

## 文件数量统计

### 当前状态（优化前）

| 位置 | 文件类型 | 数量（约） |
|------|----------|-----------|
| 根目录 | .md文件 | 4个 |
| .claude/rules/ | 核心配置 | 11个 |
| .claude/docs/ | 架构文档 | 4个 |
| .claude/agents/ | Agent定义 | 7个 |
| .claude/skills/ | Skills定义 | 50+个 |
| business/ | 工作文件 | 15个 |
| memory/ | 记忆文件 | 20个 |
| projects/ | 项目文件 | 变化 |
| scripts/ | 工具脚本 | 10个 |
| workspace/ | 临时文件 | 20个 |

### 优化后预期

| 位置 | 文件类型 | 数量 |
|------|----------|------|
| 根目录 | 架构文档 | 6个 |
| .claude/rules/ | 核心配置 | 11个 |
| .claude/docs/ | 架构文档 | 10+个 |
| business/supplier-management/ | 工作文件 | 15个 |
| business/career/ | 职业文件 | 新增 |
| memory/curated/ | 精炼内容 | 新增目录 |
| memory/personal/ | 个人生活 | 新增目录 |
| scripts/python/ | Python脚本 | 6个 |
| scripts/shell/ | Shell脚本 | 4个 |

---

## 目录特点

### 🔴 .claude/ - 核心配置
- **自动加载**：每次会话自动读取rules/
- **不可删除**：定义"我是谁"
- **永久保留**：不轻易修改

### 🟢 business/ - 工作内容
- **版本管理**：重要工作内容进git
- **结构化**：按工作流程组织
- **长期保留**：工作历史和成果

### 🟢 memory/ - 记忆系统
- **分层存储**：daily → curated
- **定期整理**：每周提取重要内容
- **永久保留**：我的记忆

### 🟢 projects/ - 开发项目
- **独立管理**：每个项目独立
- **版本控制**：代码进git
- **可归档**：完成的项目移入archived/

### 🟡 scripts/ - 工具脚本
- **可复用**：经过验证的工具
- **分类存储**：python/和shell/
- **版本管理**：重要脚本进git

### ⚪ workspace/ - 临时工作
- **随时清理**：定期删除无用文件
- **不进git**：临时内容不版本管理
- **灵活使用**：快速记录和实验

---

*创建时间：2026-02-21*
*版本：v1.0*
