---
input: N/A
output: N/A
pos: projects/stanford-cs146s/ 项目说明
---

# CS146S 课程整理项目

> 斯坦福大学《The Modern Software Developer》课程学习与内化

---

## 项目目标

**不追求**：
- ❌ 完成所有作业
- ❌ 看完所有视频

**追求**：
- ✅ 用课程改进我们的工作体系
- ✅ 内化 Agent/MCP/安全/审查最佳实践
- ✅ 两周落地 4 个改进任务

---

## 文件结构

```
projects/stanford-cs146s/
├── outputs/
│   ├── COURSE-GUIDE.md      # 课程完整整理（10 周大纲 + 资源索引）
│   ├── LEARNING-ROADMAP.md  # 两周学习路线图
│   └── WEEK1-AGENT-MCP.md   # 第一周详细计划（Agent + MCP）
├── notes/                   # 每日复盘和洞察记录
│   └── README.md
└── CLAUDE.md                # 本文件
```

---

## 核心资源

| 资源 | 链接 |
|------|------|
| **课程网站** | https://themodernsoftware.dev |
| **作业仓库** | https://github.com/mihail911/modern-software-dev-assignments |
| **课程整理** | `outputs/COURSE-GUIDE.md` |
| **学习路线** | `outputs/LEARNING-ROADMAP.md` |
| **第一周计划** | `outputs/WEEK1-AGENT-MCP.md` |

---

## 第一周学习（2026-03-01 ~ 2026-03-07）

**主题**：Agent 模式 + MCP 深化

**核心任务**：
1. 改进 Subagent 策略（明确自主级别）
2. 优化 MCP 配置（添加验证脚本）

**必读文章**：
- [How Anthropic Uses Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf)（30 分钟）
- [Claude Code Best Practices](https://rosmur.github.io/claudecode-best-practices/)（20 分钟）
- [Specs Are the New Source Code](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code)（15 分钟）

**详细计划**：`outputs/WEEK1-AGENT-MCP.md`

**预计时间**：6-8 小时

**复盘时间**：周五下午

---

## 两周计划

| 周次 | 主题 | 核心任务 | 预计时间 |
|------|------|---------|---------|
| **Week 1** | Agent + MCP | 改进 Subagent 策略 | 6-8 小时 |
| **Week 2** | 安全 + 审查 | 添加安全扫描 + AI 审查 | 6-8 小时 |

---

## 关键洞察

**核心理念**：
> 软件开发已从 0-1 编码演变为**迭代工作流**：plan → generate with AI → modify → repeat

**我们的改进方向**：
1. Agent Manager 模式 — 明确自主级别
2. MCP 深化 — 优化配置 + 验证
3. AI 安全扫描 — 添加 Semgrep
4. AI 代码审查 — 改进验证流程

---

*创建时间：2026-03-01*
*预计完成：2026-03-15*
