# AI 学习项目与斯坦福 CS146S 课程内化

> Sources: mino, 2026-04-28
> Raw:../../raw/projects-ai-learning/CLAUDE.md; ../../raw/projects-ai-learning/notes-README.md; ../../raw/projects-ai-learning/notes-best-practices-CLAUDE.md; ../../raw/projects-ai-learning/outputs-CLAUDE.md; ../../raw/projects-ai-learning/outputs-stanford-cs146s-README.md; ../../raw/projects-ai-learning/outputs-alternative-resources-CLAUDE.md; ../../raw/projects-ai-learning/guides-CLAUDE.md

## 项目定位

斯坦福大学 CS146S 课程（The Modern Software Developer）的学习项目，目标是系统化提升 AI 工程能力。**不追求完成所有作业、看完所有视频，而是追求用课程改进工作体系。**

| 维度 | 说明 |
|------|------|
| 核心目标 | 内化 Agent/MCP/安全/审查最佳实践 |
| 交付标准 | 两周落地 4 个改进任务 |
| 学习理念 | 学以致用、快速内化 |
| 课程网站 | https://themodernsoftware.dev |
| 作业仓库 | https://github.com/mihail911/modern-software-dev-assignments |

## 课程基本信息

| 项目 | 内容 |
|------|------|
| 课程代码 | CS146S |
| 学分 | 3 units |
| 先修课 | CS111 相当编程经验 |
| 推荐 | CS221/229 |
| 教师 | Mihail Eric |
| Head TA | Febie Lin, Brent Ju |
| 评分 | Final Project 80%、Weekly Assignments 15%、Class Participation 5% |

## 10 周课程大纲

| 周次 | 主题 | 核心内容 | 重要程度 |
|------|------|----------|----------|
| Week 1 | LLM 编码入门 | LLM 原理、Prompt Engineering、Karpathy Deep Dive | ⭐ |
| Week 2 | Agent 架构 | MCP 协议、Tool Use、Function Calling | ⭐⭐ |
| Week 3 | AI IDE | Context 管理、Claude Code 最佳实践、PRDs for Agents | ⭐⭐ |
| Week 4 | Agent 模式 | **Boris Cherney（Claude Code 作者）**讲最佳实践、Agent 自主级别管理 | ⭐⭐⭐ |
| Week 5 | 现代终端 | **Zach Lloyd（Warp CEO）**讲 AI 增强命令行 | ⭐ |
| Week 6 | AI 测试与安全 | **Isaac Evans（Semgrep CEO）**讲 SAST/DAST with AI | ⭐ |
| Week 7 | 现代软件支持 | **Tomas Reimers（Graphite CPO）**讲 AI Code Review | ⭐ |
| Week 8 | 自动 UI 构建 | **Gaspar Garcia（Vercel Head of AI Research）**讲一键生成 UI | ⭐ |
| Week 9 | 部署后 Agent | **Resolve CTO/Staff** 讲监控与可观测性 | ⭐ |
| Week 10 | 未来趋势 | **Martin Casado（a16z General Partner）**讲软件开发未来 | ⭐⭐⭐ |

### 嘉宾阵容

这是课程最值钱的部分：

| 嘉宾 | 公司 | 职位 |
|------|------|------|
| Boris Cherney | Anthropic | Claude Code Creator |
| Zach Lloyd | Warp | CEO |
| Isaac Evans | Semgrep | CEO |
| Tomas Reimers | Graphite | CPO |
| Gaspar Garcia | Vercel | Head of AI Research |
| Mayank Agarwal | Resolve | CTO |
| Milind Ganjoo | Resolve | Technical Staff |
| Martin Casado | a16z | General Partner |

## 两周学习计划

### 第一周：Agent + MCP（2026-03-01 ~ 2026-03-07）

**主题**：改进 Subagent 策略，优化 MCP 配置

| 任务 | 说明 | 预计时间 |
|------|------|----------|
| 改进 Subagent 策略 | 明确自主级别 | 核心 |
| 优化 MCP 配置 | 添加验证脚本 | 核心 |
| 阅读：How Anthropic Uses Claude Code | Anthropic 内部使用指南 | 30 分钟 |
| 阅读：Claude Code Best Practices | 业界最佳实践 | 20 分钟 |
| 阅读：Specs Are the New Source Code | 需求文档新范式 | 15 分钟 |

预计总时间：6-8 小时，复盘时间：周五下午。

### 第二周：安全 + 审查

**主题**：添加 Semgrep 安全扫描，改进 AI 代码审查流程

| 任务 | 说明 |
|------|------|
| 添加安全扫描 | 集成 Semgrep 到工作流 |
| 改进代码审查 | 不仅仅是语法检查，还包括逻辑和安全性 |

## 项目文件结构

```
projects/stanford-cs146s/
├── outputs/
│   ├── COURSE-GUIDE.md      # 课程完整整理（10 周大纲 + 资源索引）
│   ├── LEARNING-ROADMAP.md  # 两周学习路线图
│   └── WEEK1-AGENT-MCP.md   # 第一周详细计划
├── notes/
│   ├── README.md            # 每日复盘索引
│   └── best-practices/
│       ├── 01-context-management.md
│       ├── 02-planning-architecture.md
│       ├── 03-tools-automation.md
│       ├── 04-code-quality.md
│       └── 05-anti-patterns.md
├── guides/
│   └── APIFY-GUIDE.md       # API 抓取指南
└── CLAUDE.md                # 项目配置
```

## 四个改进方向

| 方向 | 当前状态 | 目标 |
|------|----------|------|
| Agent Manager 模式 | 自主级别不明确 | 明确什么情况下 Agent 独立工作，什么情况需要人工干预 |
| MCP 深化 | 基础配置 | 优化配置 + 添加验证脚本确保外部连接可靠性 |
| AI 安全扫描 | 无 | 添加 Semgrep，AI 生成代码后自动扫描 |
| AI 代码审查 | 基础验证 | 不仅是语法检查，还包括逻辑和安全性审查 |

## 关键洞察

> **软件开发已从 0-1 编码演变为迭代工作流：plan → generate with AI → modify → repeat**

这个洞察直接关联到年老师的工作方式：不是"写代码"，而是"驱动 AI 完成迭代工作流"。

## 替代学习资源

| 类别 | 内容 |
|------|------|
| CS25 Transformers | 斯坦福深度学习课程 |
| 国内 AI 资源 | 中文学习路径 |
| 最终学习路径 | 中国本地化学习路线 |

这些作为 CS146S 的补充，确保学习路径的完整性和中文适配。
