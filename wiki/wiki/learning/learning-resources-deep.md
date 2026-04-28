# AI 学习资源深度 — 课程/电子书/方法论索引

> Sources: Mino 学习档案, 2026-02-24 至 2026-04-27
> Raw: ../../raw/learning/AI-Agent工作流解析-agency-agents-analysis.md; ../../raw/learning/AI-Agent工作流解析-agency-agents-current.md; ../../raw/learning/AI协作-07-AI协作.md; ../../raw/learning/AI协作-Claude.md; ../../raw/learning/Claude Code-CLAUDE.md; ../../raw/learning/Claude Code-TRANSPARENT-WORKFLOW.md; ../../raw/learning/Claude Code-architecture.md; ../../raw/learning/Claude Code-cheatsheet.md; ../../raw/learning/Claude Code-claude-cli-system-prompt.md; ../../raw/learning/Claude Code-claude-code-guide.md; ../../raw/learning/Claude Code-documentation.md; ../../raw/learning/Claude Code-implement.md; ../../raw/learning/Claude Code-personalization-upgrade-summary.md; ../../raw/learning/Claude Code-plan5-lessons.md; ../../raw/learning/Claude Code-plans.md; ../../raw/learning/Claude Code-prompt.md; ../../raw/learning/Claude Code-use-claude-code.md; ../../raw/learning/技能加载优化-已完成-feature-request-progressive-disclosure.md; ../../raw/learning/技能相关-工具技能-CAPTURE.md; ../../raw/learning/技能相关-工具技能-OBSIDIAN-CLAUDE-DEEP-READING.md; ../../raw/learning/技能相关-工具技能-context-optimization-audit.md; ../../raw/learning/技能相关-工具技能-cowork-plugins-manual.md; ../../raw/learning/技能相关-工具技能-jiyi.md; ../../raw/learning/技能相关-工具技能-skill-improvement-plan.md; ../../raw/learning/技能相关-工具技能-skills-integration-plan.md; ../../raw/learning/技能相关-工具技能-verification-checklist.md

## 概述

本文档汇总了 my-agent 知识库中的全部 23 份学习档案，覆盖三大知识域：Claude Code 七大核心组件（从入门到生产级配置）、AI Agent 工作流与角色体系（Agency-Agents 178 角色清单到工作流架构）、以及技能系统的渐进式优化（从 73 个技能的审计到 Progressive Disclosure 加载机制）。同时记录了配套的方法论资产：CAPTURE 单文件快速记录法、Obsidian + Claude 深度阅读工作流、上下文优化审计流程、以及五层文档体系。核心价值：这不是一份书单或链接列表，而是一套经过实战检验的学习路径——从"知道 Claude Code 能做什么"到"把它配成一个 24 小时在线的夜班同事"。学习不是静态的知识储备，而是持续将知识转化为可执行的系统配置。

## 一、Claude Code 核心组件学习体系

### 1.1 七大组件全景

学习路径围绕 Claude Code 的七大核心组件展开，按难度递进排列：

**基础认知层**：CLAUDE.md（项目上下文文件）、Commands（斜杠命令）、Hooks（事件自动执行器）。这一层的目标是理解 CLI-first 路线与 IDE 集成工具（Cursor、Windsurf）的差异——Claude Code 更轻量、更灵活、可脚本化。验收标准：能创建 CLAUDE.md、自定义 Commands、配置 Hooks。

**进阶能力层**：SubAgents（任务分解与委派）、Skills（可复用能力模块）、Plans（五文件工作流）。这一层的核心是学会拆分任务、委派执行、跟踪进度。/plan5 模式（需求分析 → 任务拆解 → 文件持久化 → 执行追踪）是典型代表。验收标准：能用 SubAgents 处理多步骤任务，能用 Skills 封装重复能力。

**生产配置层**：Memory（记忆系统，含 WAL 协议）、透明工作流。这一层的目标是将 Claude Code 从被动工具升级为主动协作伙伴。个性化交互升级方案（实时人物画像系统、7×24 记忆建模）将交互从"被动记录"推到"主动建模"。

### 1.2 学习计划与验收

学习计划分为三个阶段：基础认知（1-2 小时）、核心组件入门（3-4 小时）、高级生产配置（持续迭代）。每个阶段都有明确的验收标准。实际执行中，年老师采用了更务实的路径：不是按阶段学完再做，而是在实际搭建供应商管理系统的同时学——建分层分级表的时候配 CLAUDE.md，做可视化的时候调 Hooks，写汇报材料的时候练透明工作流。学与做合一，验收标准自然嵌入到工作产出中。

### 1.3 关键经验教训

/plan5 使用经验文档记录了一次失败的复盘：第一次尝试输出深色主题 HTML，比例失调，审美极差——原因是技能没理解需求，直接输出代码。教训是**先确认方向再交付，先给选项再动手**。这个教训后来反复出现在其他场景中（花叔 PPT 三版不满意、可视化三版重做），说明它是一个通用原则：创意类工作流中，方向对齐的优先级高于执行速度。

## 二、AI Agent 工作流与角色体系

### 2.1 Agency-Agents 角色生态

两份工作流解析文档记录了从 34 个原有角色扩展到 178 个 Agency-Agents 角色的全过程。按业务领域分类标注了与年老师工作的相关性，核心高相关性角色包括：planner（实施计划制定）、tdd-guide（测试先行指导）、code-reviewer（代码审查）、data-analyst（数据分析）。

角色扩展的核心逻辑是**从通用能力到领域专精**。原有 34 个角色覆盖了软件工程全流程，但缺乏供应商管理、数据分析、报告生成等年老师日常需要的能力。Agency-Agents 的引入补齐了这块短板。

### 2.2 工作流架构

AI 协作指南（07-AI协作.md）定义了三类交互模式：写文档/报告时使用结构化框架（SCQA、STAR）、用数据支撑观点、举具体案例说明；问题分析时先理清背景再拆解因素再给出判断；技能专长时先说明能力边界再给出使用场景。

这套架构的价值在于**把"怎么和 AI 协作"这件事本身变成了可执行的规则**。不是"你问我答"的被动模式，而是定义需求进来后该走什么路：分类 → 路由 → 执行 → 验收。这和年老师做供应商管理的思路一脉相承——不是"出了问题再处理"，是"先建轨道让车自己跑"。

### 2.3 供应商管理体系模块

供应商管理体系作为电销业务交付的核心知识库，包含岗位信息、管理体系、成果数据、工作风格、经历洞察、晋升述职、AI 协作规范七大模块。模块地位定义为"核心知识库"，不是参考资料，而是每次决策的依据。

这体现了一个重要原则：**知识管理的目的不是"收集"，是"对齐"**。之前讨论的所有规范、结构、方法论，都应该围绕这本指引来对齐，而不是凭空搭建。指引是根，其他都是枝叶。制度执行大于制度创新。

## 三、技能系统优化方法论

### 3.1 从审计到渐进式加载

技能库改进计划记录了 73 个独立技能的全面审计结果：约 15 个技能描述过短（触发不足）、6 个 SKILL.md 超长（超过 500 行）、1 个 INDEX.md 过期、全部缺少评估机制、约 20 个结构不完整。

这个问题直接触发了 Feature Request：支持 Skills 的 Progressive Disclosure（渐进式披露）加载机制。当前 MyAgents 启动时完整加载所有技能的 SKILL.md 文件，启动 token 消耗高达约 140-165K tokens（核心规则 6K + 技能文件 109K + 系统消息 25-50K）。三层渐进披露方案是：Metadata（名称 + 描述，始终加载，约 100 词）→ SKILL.md body（触发时加载，理想不超过 500 行）→ Bundled resources（按需加载，无限制）。

这是典型的**用系统设计思维解决性能问题**——不是简单地"少装点技能"，而是设计一套智能加载机制，让系统在需要的时候才加载需要的东西。

### 3.2 上下文优化审计

上下文优化审计报告识别了重复内容分布：多个文件描述相同概念（身份、性格、习惯、工作原则在至少 4 个文件中重复），核心规则文件和扩展规则文件之间存在大量重叠。

验证清单提供了具体的检查步骤：核心规则加载验证、Hooks 功能验证、Skills 触发验证、SubAgents 委派验证。这套流程的价值在于：优化不是主观判断"好像快了一点"，而是有清单可以逐项确认。

### 3.3 CAPTURE 快速记录法

CAPTURE.md 定义了 Karpathy 式单文件极简主义：随时可记，不纠结格式，周度整理。核心用法：随时打开秒级记录，纯文本即可，每周整理有价值内容进入正式记忆系统，无价值内容自然淘汰。

这个方法论和每日书信有互补关系：CAPTURE 是快速记录（想到就写，不纠结格式），书信是深度提炼（从对话中提取模式，写成一封完整的信）。两者合在一起构成了"捕捉 → 提炼"的知识生产流水线。

## 四、配套方法论资产

### 4.1 Obsidian + Claude 深度阅读工作流

将扫描版 PDF 转化为中英双语深度阅读笔记的六步流程：PDF 扫描版 → MinerU OCR → Markdown → Obsidian → Claude 处理 → 双语笔记。核心优势是全程可视化，无需代码。

这个工作流解决了知识获取的最后一公里问题：不是找不到资料，是找到资料后怎么处理。从 PDF 到结构化笔记，中间需要 OCR、格式转换、内容理解和翻译。这个流程把每一步都工具化、自动化了。

### 4.2 五层文档体系

五层文档体系构建了 AI 协作的认知框架，存在严格依赖关系，形成从宏观到微观的漏斗式信息传递：第一层 masterplan.md（为什么做，10000 英尺项目概览）→ 第二层 implementation plan（怎么做，什么顺序）→ 第三层架构文档（技术选型）→ 第四层执行手册（具体步骤）→ 第五层进度日志（执行记录）。

核心前提是：AI 时代的核心竞争力是清晰度，但清晰度会随项目复杂度增加而衰减。小项目可在脑中容纳所有需求和状态，复杂项目涉及多模块、多服务、多交互时，人脑与 AI 的"记忆白板"均无法承载全部信息。五层文档体系就是用结构化的方式对抗这种衰减。

### 4.3 Cowork 插件生态

Claude Cowork 插件手册记录了已安装的 5 个插件包（data、productivity、sales、legal、finance），共计 22 个 Commands 和 28 个 Skills。这是技能生态的外部扩展——不是自己写的规则，而是社区提供的即插即用能力。

## 五、学习路径与下一步

### 5.1 已完成的学习

- Claude Code 七大组件：从认知到生产配置的全链路
- AI Agent 工作流：角色体系 + 交互模式 + 供应商管理模块
- 技能系统审计：73 个技能的问题诊断 + Progressive Disclosure 方案
- 配套方法论：CAPTURE 记录法、深度阅读工作流、五层文档体系

### 5.2 待深挖的方向

**技能渐进式加载的落地实施**：Feature Request 已提出，但尚未完全实现。需要评估 MyAgents 架构是否支持动态 SKILL.md 加载，以及如何在系统提示中实现 metadata-only 模式。

**上下文优化的持续追踪**：审计是一次性的，但上下文会随着新技能安装和新规则编写持续膨胀。需要一个定期（周度或月度）的自动化审计机制。

**学习资源的外部拓展**：4/26 下载了四本数据可视化经典电子书（Storytelling with Data、Tufte、Schwabish、McCandless），其中《Storytelling with Data》已转为 Markdown（386KB）。这些外部资源需要纳入学习体系，而不是散落在 workspace 里。

**李继刚"杠铃阅读策略"的落地**：4/26 晚间分享的杠铃阅读——经典书籍深读 + 前沿论文用 AI 辅助提取认知结构。这和能力蒸馏的理念高度一致：从阅读中提取可复用的认知结构，积累成个人知识体系。xray-paper 和 xray-book 两个技能已安装，待跑通完整流程。

### 5.3 核心学习原则

回顾所有学习档案，可以提炼出三条贯穿始终的原则：

**一、先对齐再执行**。方向确认的优先级高于执行速度。这个原则在 /plan5 教训、花叔 PPT 三次不满意、可视化三版重做中反复验证。

**二、用系统解决性能问题**。不是"少装点"，而是"设计智能加载"。不是"手写记忆"，而是"建 WAL 协议"。不是"逐条清理规则"，而是"做审计 + 验证清单"。

**三、从知识到系统**。学习不是读更多文档，是把知识变成系统配置。CLAUDE.md 是系统，Hooks 是系统，Skills 是系统，每日书信也是系统。知识存进文件只是第一步，让它能自动运转才是终点。
