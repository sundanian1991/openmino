# Wiki Log

Append-only. Format: `## [YYYY-MM-DD] <operation> | <title>`
Recent entries: `grep "^## \[" log.md | tail -10`

---

## [2026-04-28] expand | Wiki 深度化扩展 — 307 篇 + 全目录覆盖

**本轮新增**：从初始 54 篇扩展至 307 篇（+253 篇），覆盖 2,429 个 raw 文件的 ~41%

**新增文章分布**：
- presentations: 43 篇（+37）— AI 定价、人物分析、供应商管理、设计方法论
- supplier-management: 38 篇（+28）— 定价委员会、准入清退、SLA、沟通机制、六步法
- personal-growth-deep: 33 篇（+27）— 晋升答辩、AI 协作、供应链方法论、数据炼金
- plans-deep: 26 篇（+20）— ABC 管理、V7 汇报、可视化技能、电影叙事
- skills-tools: 25 篇（+19）— 合规管理、准入清退、价格谈判、月度复盘
- workspace-other: 19 篇（+12）— Agent-Reach、OpenWiki、数据可视化理论
- projects: 13 篇（+7）— 供应商体系建设、AI 学习监控、长期项目
- workspace-skills: 13 篇（+8）— PPT Master、手绘 SVG、设计对比、技能清理
- skills-agent-tools: 12 篇（+12）— Lenny Skills、供应商导师、任务执行、技能管理
- skills-visualization: 12 篇（已有）— Widget 设计、ECharts、色阶系统
- skills-document: 10 篇（已修复 Raw 链接）— PPTX/XLSX/PDF/DOCX/Kami 技能
- person-profiles-deep: 10 篇（已有）— 人物深度画像
- personal-development: 9 篇（+3）— 职业发展、权责不对等、成长策略
- agent-configuration: 7 篇（已有）
- supplier-profiles-deep: 6 篇（已去重）— 产线供应商
- workspace-supplier: 5 篇（新建目录）— V7 体系、成本缩量、联盟月报
- 其余目录 2-4 篇不等

**质量修复**：
- skills-document/ 10 篇补全 `> Raw:` 行
- 删除 wiki/wiki/ 嵌套目录 3 篇重复文件
- index.md 重建：307 篇零遗漏验证

## [2026-04-27] migrate | 初始 wiki 构建 — 从 memory 系统迁移

**源文件**：memory/ 目录下 177 个文件（topics/、projects/、persona/、learnings/、archive/、daily/、feedback/ 等）

**raw/ 构建**：177 个源文件按 12 个主题目录归类
- core-memory: 9 文件 | person-profiles: 37 | daily-logs: 40 | archive: 33
- supplier-profiles: 18 | daily-letters: 16 | persona: 7 | work-standards: 8
- projects: 2 | work-methods: 3 | learnings: 3 | feedback: 1

**wiki/ 文章**：20 篇知识文章，7 个主题
- user-profile: 2 篇（角色画像、设计哲学）
- supplier-management: 4 篇（排名思维、场景方法论、六步法、沟通框架）
- technology: 4 篇（Agent 架构、可视化体系、记忆系统、技能生态）
- work-rules: 3 篇（核心原则、日常标准、问题解决）
- person-profiles: 4 篇（卞海军、刘伟佳、王易人、刘乾坤）
- industry-insights: 2 篇（供应商悖论、赛马机制）
- projects: 1 篇（可视化体系交付）

**前置版本**：旧的 wiki/index.md 和 log.md（自定义脚本生成）已备份为 .bak.custom-script

## [2026-04-27] ingest | 首次批量入库 memory 系统

**说明**：将现有 memory/ 记忆体系转为 karpathy-llm-wiki 格式，memory/ 保留继续作为工作记忆使用

## [2026-04-27] migrate | 全面 Wiki 化 — 全项目 2429 raw + 54 wiki 文章

**优先级 1: memory/** (已完成, 177 raw + 20 篇 wiki)
- 核心记忆、洞察、人物画像、工作方法、日常规范等

**优先级 2: docs/** (681 md → 527 raw)
- docs/供应商/ → docs-supplier/ (182 文件)
- docs/工具箱/ → toolbox/ (99 文件)
- docs/个人成长/ → personal-growth/ (220 文件)
- docs/学习资料/ → learning/ (26 文件)

**优先级 3: workspace/** (521 md → 604 raw)
- workspace-supplier/ (92) | workspace-skills/ (105) | workspace-other/ (274)
- workspace-records/ (6) | workspace-growth/ (7) | workspace-life/ (1)

**优先级 4: plans/** (119 md → 119 raw)

**优先级 5: projects/** (590 md → 567 raw)
- presentations/ (463) | projects-ai-learning/ (46) | projects-supplier/ (25)
- projects-self-awareness/ (8) | projects-career-coaching/ (6) | projects-archive/ (8)

**优先级 6: .claude/** (578 md → 554 raw)
- skills/ (501) | agent-rules/ (11) | agent-commands/ (9)
- claude-reference/ (13) | claude-plugins/ (20)

**新增 wiki 文章** (34 篇):
- agent-configuration/: 7 篇 (身份规则、架构、记忆协议、命令、技能、插件、代码风格)
- supplier-management/: 6 篇 (管理体系、准入清退、日常规范、历史项目、运营数据、供应商档案)
- personal-development/: 6 篇 (晋升轨迹、工作风格、经历洞察、数据讲故事、职业发展、权责不对等)
- skills-tools/: 6 篇 (计划模板、SOP 库、可视化组件、设计哲学、AI 定价、管理场景)
- planning-methodology/: 2 篇 (规划方法论、关键决策)
- learning-resources/: 2 篇 (AI Agent 工作流、AI 学习笔记)
- projects/: 5 篇 (演讲稿模式、每日书信、电影叙事、AI 学习监控、OpenWiki)

**最终状态**: 2429 raw 文件 + 54 wiki 文章 + 12 个主题分类
