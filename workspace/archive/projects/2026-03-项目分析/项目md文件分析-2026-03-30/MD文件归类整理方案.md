# Cloud MD 项目 .md 文件归类整理方案

> AGENT-FIRST 策略执行 — 全项目 .md 文件归类诊断
> 生成时间：2026-03-30

---

## 执行摘要

| 指标 | 数值 |
|------|------|
| **总 .md 文件数** | 400+ 个 |
| **父代理数量** | 4 个 |
| **发现归类问题** | 47 个文件 |
| **建议移动** | 43 个文件 |
| **建议删除** | 4 个文件 |

---

## 第一部分：归类问题总览

### 1.1 问题分类统计

| 问题类型 | 文件数 | 占比 | 严重程度 |
|----------|--------|------|----------|
| **已完成的文件仍在进行中** | 23 | 48% | 🔴 严重 |
| **知识文档未入知识库** | 14 | 30% | 🟡 中度 |
| **临时/测试文件未清理** | 6 | 13% | 🟢 轻微 |
| **根目录配置未归位** | 2 | 4% | 🟢 轻微 |
| **技能目录不完整** | 2 | 4% | 🟡 中度 |

### 1.2 问题分布热力图

```
workspace/进行中/          ████████████████████████████████████████  35 files (74%)
根目录                      ████                                       4 files (9%)
.claude/skills/             ██                                         2 files (4%)
memory/                     █                                          3 files (6%)
其他                        ██                                         3 files (6%)
```

---

## 第二部分：根目录问题（4个文件）

### 2.1 文件分析

| 文件 | 当前位置 | 问题 | 建议位置 | 优先级 |
|------|----------|------|----------|--------|
| **HEARTBEAT.md** | 根目录 | 运行时机制配置 | `.claude/rules/HEARTBEAT.md` | 🟡 中 |
| **UPDATE_MEMORY.md** | 根目录 | 记忆维护指令 | `.claude/rules/UPDATE_MEMORY.md` 或 `memory/` | 🟡 中 |
| CLAUDE.md | 根目录 | ✅ 正确位置 | **保持不动** | - |
| README.md | 根目录 | ✅ 正确位置 | **保持不动** | - |

### 2.2 建议操作

```bash
# 移动运行时配置到规则目录
mv HEARTBEAT.md .claude/rules/
mv UPDATE_MEMORY.md .claude/rules/  # 或 memory/
```

---

## 第三部分：Workspace 问题（35个文件）

### 3.1 严重问题：已完成的文件仍在进行中（23个）

#### 供应商评估（7个文件）→ 已完成/

| 文件路径 | 当前位置 | 建议位置 |
|----------|----------|----------|
| `06-VP汇报框架.md` | 进行中/供应商评估/ | ✅已完成/供应商评估/ |
| `供应商经营状况分析报告.md` | 进行中/供应商评估/03-分析报告/ | ✅已完成/供应商评估/ |
| `04-供应商分层.md` | 进行中/供应商评估/ | ✅已完成/供应商评估/ |
| `05-开放问题提炼.md` | 进行中/供应商评估/ | ✅已完成/供应商评估/ |
| `03-深度分析.md` | 进行中/供应商评估/ | ✅已完成/供应商评估/ |
| `02-描述性统计.md` | 进行中/供应商评估/ | ✅已完成/供应商评估/ |
| `01-数据清洗.md` | 进行中/供应商评估/ | ✅已完成/供应商评估/ |

#### 成本调研（9个文件）→ 已完成/

| 文件路径 | 当前位置 | 建议位置 |
|----------|----------|----------|
| `04-汇报材料/复贷供应商调研-VP汇报.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |
| `04-汇报材料/仅首贷-34%人力减量方案-汇报材料.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |
| `04-汇报材料/老客增信-35人增量方案-汇报材料.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |
| `03-分析报告/供应商经营状况分析报告.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |
| `03-分析报告/供应商经营状况分析报告-修订版.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |
| `03-分析报告/供应商生存生命线调研报告-行业版.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |
| `03-分析报告/产能调研.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |
| `03-分析报告/一页纸摘要.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |
| `03-分析报告/分析摘要.md` | 进行中/成本调研/ | ✅已完成/成本调研/ |

#### 改论文（9个文件）→ 已完成/

| 文件路径 | 当前位置 | 建议位置 |
|----------|----------|----------|
| `final_output.md` | 进行中/改论文/ | ✅已完成/改论文/ |
| `final_check.md` | 进行中/改论文/ | ✅已完成/改论文/ |
| `Fan_Hui_Dissertation_Formatted.md` | 进行中/改论文/ | ✅已完成/改论文/ |
| `formatted_output.md` | 进行中/改论文/ | ✅已完成/改论文/ |
| `G1.md`, `G2.md`, `G3.md`, `G4.md` | 进行中/改论文/ | ✅已完成/改论文/ |
| `G1_template.md`, `G2_template.md`, `G3_template.md`, `G4_template.md` | 进行中/改论文/ | 📖知识库/模板/ 或 保留 |

#### BPO联盟（2个文件）→ 已完成/

| 文件路径 | 当前位置 | 建议位置 |
|----------|----------|----------|
| `bpo-alliance-kickoff.md` | 进行中/BPO联盟/ | ✅已完成/BPO联盟/ |
| `bpo-alliance-kickoff-formal.md` | 进行中/BPO联盟/ | ✅已完成/BPO联盟/ |

#### 供应商KPI体系设计（2个文件）→ 已完成/

| 文件路径 | 当前位置 | 建议位置 |
|----------|----------|----------|
| `task_plan.md` | 进行中/供应商KPI体系设计/ | ✅已完成/供应商KPI体系设计/ |
| `progress.md` | 进行中/供应商KPI体系设计/ | ✅已完成/供应商KPI体系设计/ |
| `findings.md` | 进行中/供应商KPI体系设计/ | ✅已完成/供应商KPI体系设计/ |

#### 根目录已完成文件（6个）→ 已完成/

| 文件路径 | 当前位置 | 建议位置 |
|----------|----------|----------|
| `AI提效方案-供应商管理岗.md` | workspace/根目录 | ✅已完成/ |
| `AI增强工作流分析方案.md` | workspace/根目录 | ✅已完成/ |
| `权责不对等保护策略-边界清单与留痕模板.md` | workspace/根目录 | ✅已完成/ |
| `赛马分量审批邮件.md` | workspace/根目录 | ✅已完成/ |
| `anthropic-geist-design-deck.md` | workspace/根目录 | ✅已完成/ 或 归档/ |
| `adolescence-of-technology.md` | workspace/根目录 | ✅已完成/ 或 归档/ |
| `adolescence-of-technology-cn.md` | workspace/根目录 | ✅已完成/ 或 归档/ |

### 3.2 中度问题：知识文档未入知识库（10个）

| 文件路径 | 当前位置 | 建议位置 |
|----------|----------|----------|
| `supplier-deep-dive-guide.md` | 进行中/供应商评估/ | 📖知识库/供应商管理/ |
| `supplier-bpo-deep-dive-guide.md` | 进行中/供应商评估/ | 📖知识库/供应商管理/ |
| `供应商引入 SOP.md` | 进行中/供应商评估/ | 📖知识库/SOP/ |
| `执行检查清单.md` | 进行中/供应商评估/ | 📖知识库/检查清单/ |
| `大范围风险筛查问卷.md` | 进行中/供应商评估/ | 📖知识库/问卷模板/ |
| `分量调整规则-场景化执行手册.md` | 进行中/成本调研/ | 📖知识库/执行手册/ |
| `电销BPO成本测算综合方案-优化版.md` | 进行中/成本调研/ | 📖知识库/工具文档/ |
| `日常评估得分-赛马机制.md` | 进行中/供应商管理机制/ | 📖知识库/机制文档/ |
| `论文格式指南-中文合并版.md` | 进行中/改论文/ | 📖知识库/模板/ |
| `人力看板 - 视觉哲学.md` | workspace/根目录 | 📖知识库/设计哲学/ |

### 3.3 轻微问题：待处理文件（2个）

| 文件路径 | 当前位置 | 建议位置 |
|----------|----------|----------|
| `供应商补充材料通知.md` | 进行中/供应商评估/ | ⏳待处理/供应商评估/ |
| `博岳沟通商务问题清单.md` | 进行中/BPO联盟/ | ⏳待处理/BPO联盟/ |

### 3.4 需删除/清理的文件（4个）

| 文件路径 | 当前位置 | 建议操作 |
|----------|----------|----------|
| `test-translation.md` | workspace/根目录 | **删除** |
| `test-translate-3pages.md` | workspace/根目录 | **删除** |
| `original.md` | 进行中/改论文/ | **评估后删除**（历史中间文件） |
| `original_full.md` | 进行中/改论文/ | **评估后删除**（历史中间文件） |

---

## 第四部分：Memory 问题（3个文件）

### 4.1 孤立文件

| 文件路径 | 当前位置 | 问题 | 建议位置 |
|----------|----------|------|----------|
| `文档格式规范-永远不要使用TEXT.md` | memory/rules/ | rules/ 目录不在标准架构 | memory/topics/ 或 .claude/rules/ |
| `README.md` | memory/workspace/ | workspace/ 不应存记忆文件 | 根目录 workspace/ |
| `CLAUDE.md` | memory/workspace/ | 同上 | 根目录 workspace/ |

### 4.2 建议操作

```bash
# 移动文档格式规范
mv memory/rules/文档格式规范-永远不要使用TEXT.md memory/topics/

# 移动 workspace 文件到正确位置
mv memory/workspace/README.md workspace/
mv memory/workspace/CLAUDE.md workspace/

# 删除空目录
rmdir memory/workspace/
rmdir memory/rules/
```

---

## 第五部分：Skills 问题（2个文件）

### 5.1 技能目录问题

| 问题 | 位置 | 建议 |
|------|------|------|
| **mino-foreground 无 SKILL.md** | `.claude/skills/mino-foreground/` | 确认是否为有效技能：是→添加 SKILL.md；否→删除目录 |
| **superclaude 不是技能** | `.claude/skills/superclaude/` | 这是完整项目仓库，应移出 skills/ 目录 |

### 5.2 建议操作

```bash
# 方案 A：mino-foreground 是有效技能
touch .claude/skills/mino-foreground/SKILL.md
# 然后补充 SKILL.md 内容

# 方案 B：mino-foreground 不是技能
rm -rf .claude/skills/mino-foreground/

# 移动 superclaude
mv .claude/skills/superclaude/ ~/projects/  # 或其他合适位置
```

---

## 第六部分：完整操作脚本

### 6.1 前置准备

```bash
# 创建缺失的目录
mkdir -p workspace/✅已完成/供应商评估
mkdir -p workspace/✅已完成/成本调研
mkdir -p workspace/✅已完成/改论文
mkdir -p workspace/✅已完成/BPO联盟
mkdir -p workspace/✅已完成/供应商KPI体系设计
mkdir -p workspace/✅已完成/根目录文件
mkdir -p workspace/⏳待处理/供应商评估
mkdir -p workspace/⏳待处理/BPO联盟
mkdir -p workspace/📖知识库/供应商管理
mkdir -p workspace/📖知识库/SOP
mkdir -p workspace/📖知识库/检查清单
mkdir -p workspace/📖知识库/问卷模板
mkdir -p workspace/📖知识库/执行手册
mkdir -p workspace/📖知识库/工具文档
mkdir -p workspace/📖知识库/机制文档
mkdir -p workspace/📖知识库/模板
mkdir -p workspace/📖知识库/设计哲学
```

### 6.2 执行移动（根目录）

```bash
# 移动根目录配置
mv HEARTBEAT.md .claude/rules/
mv UPDATE_MEMORY.md .claude/rules/
```

### 6.3 执行移动（Workspace → ✅已完成）

```bash
# 供应商评估 → 已完成
mv workspace/进行中/供应商评估/06-VP汇报框架.md workspace/✅已完成/供应商评估/
mv workspace/进行中/供应商评估/03-分析报告/供应商经营状况分析报告.md workspace/✅已完成/供应商评估/
mv workspace/进行中/供应商评估/04-供应商分层.md workspace/✅已完成/供应商评估/
mv workspace/进行中/供应商评估/05-开放问题提炼.md workspace/✅已完成/供应商评估/
mv workspace/进行中/供应商评估/03-深度分析.md workspace/✅已完成/供应商评估/
mv workspace/进行中/供应商评估/02-描述性统计.md workspace/✅已完成/供应商评估/
mv workspace/进行中/供应商评估/01-数据清洗.md workspace/✅已完成/供应商评估/

# 成本调研 → 已完成
mv workspace/进行中/成本调研/04-汇报材料/*.md workspace/✅已完成/成本调研/
mv workspace/进行中/成本调研/03-分析报告/*.md workspace/✅已完成/成本调研/

# 改论文 → 已完成
mv workspace/进行中/改论文/final_output.md workspace/✅已完成/改论文/
mv workspace/进行中/改论文/final_check.md workspace/✅已完成/改论文/
mv workspace/进行中/改论文/Fan_Hui_Dissertation_Formatted.md workspace/✅已完成/改论文/
mv workspace/进行中/改论文/formatted_output.md workspace/✅已完成/改论文/
mv workspace/进行中/改论文/G1.md workspace/✅已完成/改论文/
mv workspace/进行中/改论文/G2.md workspace/✅已完成/改论文/
mv workspace/进行中/改论文/G3.md workspace/✅已完成/改论文/
mv workspace/进行中/改论文/G4.md workspace/✅已完成/改论文/

# BPO联盟 → 已完成
mv workspace/进行中/BPO联盟/bpo-alliance-kickoff.md workspace/✅已完成/BPO联盟/
mv workspace/进行中/BPO联盟/bpo-alliance-kickoff-formal.md workspace/✅已完成/BPO联盟/

# 供应商KPI → 已完成
mv workspace/进行中/供应商KPI体系设计/task_plan.md workspace/✅已完成/供应商KPI体系设计/
mv workspace/进行中/供应商KPI体系设计/progress.md workspace/✅已完成/供应商KPI体系设计/
mv workspace/进行中/供应商KPI体系设计/findings.md workspace/✅已完成/供应商KPI体系设计/

# 根目录已完成文件
mv workspace/AI提效方案-供应商管理岗.md workspace/✅已完成/根目录文件/
mv workspace/AI增强工作流分析方案.md workspace/✅已完成/根目录文件/
mv workspace/权责不对等保护策略-边界清单与留痕模板.md workspace/✅已完成/根目录文件/
mv workspace/赛马分量审批邮件.md workspace/✅已完成/根目录文件/
mv workspace/anthropic-geist-design-deck.md workspace/归档/2026-W12/
mv workspace/adolescence-of-technology.md workspace/归档/2026-W12/
mv workspace/adolescence-of-technology-cn.md workspace/归档/2026-W12/
```

### 6.4 执行移动（Workspace → 📖知识库）

```bash
mv workspace/进行中/供应商评估/supplier-deep-dive-guide.md workspace/📖知识库/供应商管理/
mv workspace/进行中/供应商评估/supplier-bpo-deep-dive-guide.md workspace/📖知识库/供应商管理/
mv workspace/进行中/供应商评估/供应商引入\ SOP.md workspace/📖知识库/SOP/
mv workspace/进行中/供应商评估/执行检查清单.md workspace/📖知识库/检查清单/
mv workspace/进行中/供应商评估/大范围风险筛查问卷.md workspace/📖知识库/问卷模板/
mv workspace/进行中/成本调研/05-执行方案/分量调整规则-场景化执行手册.md workspace/📖知识库/执行手册/
mv workspace/进行中/成本调研/06-成本测算工具/电销BPO成本测算综合方案-优化版.md workspace/📖知识库/工具文档/
mv workspace/进行中/供应商管理机制/日常评估得分-赛马机制.md workspace/📖知识库/机制文档/
mv workspace/进行中/改论文/论文格式指南-中文合并版.md workspace/📖知识库/模板/
mv workspace/人力看板\ -\ 视觉哲学.md workspace/📖知识库/设计哲学/
```

### 6.5 执行移动（Workspace → ⏳待处理）

```bash
mv workspace/进行中/供应商评估/供应商补充材料通知.md workspace/⏳待处理/供应商评估/
mv workspace/进行中/BPO联盟/博岳沟通商务问题清单.md workspace/⏳待处理/BPO联盟/
```

### 6.6 删除测试文件

```bash
rm workspace/test-translation.md
rm workspace/test-translate-3pages.md
```

### 6.7 执行移动（Memory）

```bash
mv memory/rules/文档格式规范-永远不要使用TEXT.md memory/topics/
mv memory/workspace/README.md workspace/
mv memory/workspace/CLAUDE.md workspace/
rmdir memory/workspace/
rmdir memory/rules/
```

### 6.8 修复 Skills

```bash
# 方案 A：mino-foreground 添加 SKILL.md
cat > .claude/skills/mino-foreground/SKILL.md << 'EOF'
# mino-foreground

> 前端设计相关资源

---

## 用途

存放 mino-frontend 技能所需的设计资源。

## 内容

- icons/ — 图标资源

---

*此目录为资源目录，无独立触发能力*
EOF

# 方案 B：mino-foreground 删除（如果不需要）
# rm -rf .claude/skills/mino-foreground/

# 移动 superclaude
mv .claude/skills/superclaude/ ~/.myagents/skills-sandbox/
```

---

## 第七部分：归类后预期结构

```
my-agent/
├── .claude/
│   ├── commands/
│   ├── rules/
│   │   ├── 00-IDENTITY.md
│   │   ├── 01-SOUL.md
│   │   ├── 06-NOW.md
│   │   ├── MEMORY-L1.md
│   │   ├── AGENT-FIRST.md        ← 本次新增
│   │   ├── HEARTBEAT.md          ← 从根目录移入
│   │   ├── UPDATE_MEMORY.md      ← 从根目录移入
│   │   └── README.md
│   ├── skills/
│   │   ├── mino-frontend/SKILL.md
│   │   ├── supplier-mentor/SKILL.md
│   │   └── ...（34个技能）
│   ├── reference/
│   └── hooks/
│
├── memory/
│   ├── daily/
│   ├── insights.md
│   ├── MEMORY.md
│   ├── projects/
│   │   ├── 供应商画像/
│   │   └── 关键人画像/
│   └── topics/                    ← 新增 rules/ 移入
│
├── workspace/
│   ├── LIFECYCLE-WORKFLOW.md
│   ├── README.md                  ← 从 memory/workspace/ 移入
│   ├── CLAUDE.md                  ← 从 memory/workspace/ 移入
│   │
│   ├── 🔄进行中/                  ← 仅保留活跃工作
│   │   ├── 人力看板重构/
│   │   ├── 分量需求/
│   │   ├── 供应商调研/
│   │   └── 改论文/                ← 仅保留原始文件
│   │
│   ├── ⏳待处理/                  ← 新增
│   │   ├── 供应商评估/
│   │   └── BPO联盟/
│   │
│   ├── ✅已完成/                  ← 新增
│   │   ├── 供应商评估/
│   │   ├── 成本调研/
│   │   ├── 改论文/
│   │   ├── BPO联盟/
│   │   └── 根目录文件/
│   │
│   ├── 📖知识库/                  ← 新增
│   │   ├── 供应商管理/
│   │   ├── SOP/
│   │   ├── 检查清单/
│   │   ├── 执行手册/
│   │   ├── 工具文档/
│   │   ├── 机制文档/
│   │   └── 模板/
│   │
│   └── 归档/
│       └── 2026-W12/
│
├── CLAUDE.md                      ← 保持不动
├── README.md                      ← 保持不动
└── ...（其他项目文件）
```

---

## 第八部分：执行检查清单

- [ ] 备份当前项目（建议先 git commit）
- [ ] 创建缺失的状态目录（✅已完成、⏳待处理、📖知识库）
- [ ] 移动根目录配置（HEARTBEAT.md、UPDATE_MEMORY.md）
- [ ] 移动已完成文件到 ✅已完成/
- [ ] 移动知识文档到 📖知识库/
- [ ] 移动待处理文件到 ⏳待处理/
- [ ] 删除测试文件
- [ ] 修复 memory/ 孤立文件
- [ ] 修复 skills/ 问题目录
- [ ] 验证移动后的文件完整性
- [ ] git commit -m "chore: 全项目 .md 文件归类整理"

---

*方案生成：AGENT-FIRST 策略完整执行*
*总问题数：47 个文件*
*建议移动：43 个文件*
*建议删除：4 个文件*
