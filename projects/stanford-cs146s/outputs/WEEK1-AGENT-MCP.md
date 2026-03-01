---
input: 斯坦福 CS146S Week 2 & Week 4 课程材料
output: 第一周完整学习计划（Agent + MCP）
pos: projects/stanford-cs146s/outputs/ 周学习文档
---

# 第一周学习计划：Agent 模式 + MCP 深化

> **核心理念**：不追求"学完课程"，追求"用课程改进我们的工作体系"

---

## 📋 本周概览

| 维度 | 内容 |
|------|------|
| **主题** | Agent 模式 + MCP 深化 |
| **目标** | 改进 Subagent 策略 + 优化 MCP 配置 |
| **预计时间** | 6-8 小时 |
| **核心产出** | Subagent 策略更新 + MCP 验证脚本 |
| **复盘时间** | 周五下午 15 分钟 |

---

## 🎯 学习目标

**不追求**：
- ❌ 看完所有视频
- ❌ 完成所有作业
- ❌ 掌握所有工具

**追求**：
- ✅ 理解 Anthropic 的 Agent 最佳实践
- ✅ 改进我们的 Subagent 策略
- ✅ 优化 MCP 工具选择逻辑
- ✅ 建立可验证的改进标准

---

## 📖 核心阅读材料（按优先级）

### 🔴 必读（周一完成）

#### 1. How Anthropic Uses Claude Code ⭐⭐⭐

**来源**：Anthropic 内部白皮书
**时间**：30 分钟
**链接**：[PDF](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf)

**核心要点**：
- Claude Code 的内部使用模式
- 团队如何管理 Agent 自主级别
- 什么任务适合 Claude Code，什么不适合
- 最佳实践与常见陷阱

**我们的对比**：
| 主题 | 他们怎么做 | 我们怎么做 | 改进空间 |
|------|----------|----------|---------|
| Subagent | 明确自主级别 | 规则模糊 | ✅ 需要明确 |
| 并行任务 | 按场景使用 | 统一策略 | ✅ 需要优化 |
| 验证机制 | 人工 + 自动 | Hook 验证 | ✅ 已有 |

**阅读任务**：
- [ ] 标注 3 个核心洞察
- [ ] 标注 5 个可复用的模式
- [ ] 对比我们的 Subagent 策略

---

#### 2. Claude Code Best Practices ⭐⭐⭐

**来源**：社区整理的最佳实践
**时间**：20 分钟
**链接**：[GitHub Pages](https://rosmur.github.io/claudecode-best-practices/)

**核心要点**：
- Context 管理：CLAUDE.md, /clear, 文档系统
- 工具设计：token 效率优先
- 检查清单：复杂工作流必备
- 数据传递：多种方法的最佳实践

**我们的对比**：
| 实践 | 他们推荐 | 我们现状 | 改进空间 |
|------|---------|---------|---------|
| CLAUDE.md | ✅ 已有 | ✅ 完善 | - |
| 检查清单 | ✅ 推荐 | ✅ Plan First | - |
| 文档系统 | ✅ 推荐 | ✅ 四层记忆 | - |
| /clear 使用 | 频繁清理 | 会话重启 | ✅ 可优化 |

**阅读任务**：
- [ ] 标注 3 个新实践
- [ ] 检查我们的 CLAUDE.md 是否覆盖
- [ ] 提取可优化的点

---

#### 3. Specs Are the New Source Code ⭐⭐⭐

**来源**：Ravi Mehta (Stripe 前工程总监)
**时间**：15 分钟
**链接**：[Blog](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code)

**核心观点**：
> "Specs 是新的源代码 — AI 时代，写规范比写代码更重要"

**核心理念**：
- 传统开发：代码 → 文档
- AI 时代：Spec → AI 生成代码
- Spec 质量 = 代码质量

**我们的应用**：
| 模板 | 状态 | 改进方向 |
|------|------|---------|
| Plan First | ✅ 已有 | 添加 Spec 章节 |
| SIMPLE-TEMPLATE | ✅ 已有 | 参考 Spec 格式 |
| Design Doc | ❌ 缺失 | 考虑引入 |

**阅读任务**：
- [ ] 标注 3 个核心原则
- [ ] 思考如何应用到 Plan First
- [ ] 设计 Spec 模板（可选）

---

### 🟠 应该读（周三完成）

#### 4. MCP Introduction ⭐⭐

**来源**：Stytch 工程博客
**时间**：15 分钟
**链接**：[Blog](https://stytch.com/blog/model-context-protocol-introduction/)

**核心要点**：
- MCP 是什么：统一 LLM 工具接口协议
- 为什么需要：打破工具孤岛
- 如何使用：项目级 vs 全局级

**我们的现状**：
- 已配置：5 个 MCP 工具
- 缺失：自定义 MCP Server 评估

**阅读任务**：
- [ ] 标注 MCP 核心概念
- [ ] 评估是否需要自定义 MCP Server
- [ ] 列出 MCP 最佳实践

---

#### 5. Context Rot ⭐⭐

**来源**：Chroma Research
**时间**：20 分钟
**链接**：[Blog](https://research.trychroma.com/context-rot)

**核心概念**：
> "Context Rot = 上下文窗口中的信息随时间退化"

**核心洞察**：
- 长上下文 ≠ 好记忆
- 信息在上下文窗口中会"腐烂"
- 需要主动的上下文管理

**我们的应用**：
| 实践 | 现状 | 改进方向 |
|------|------|---------|
| 四层记忆 | ✅ P0/P1/P2 物理隔离 | - |
| /clear 使用 | 会话重启时 | 可主动清理 |
| 上下文优先级 | WAL 协议 | ✅ 已有 |

**阅读任务**：
- [ ] 标注 3 个核心洞察
- [ ] 对比我们的记忆系统
- [ ] 提取可优化的点

---

### 🟡 有空再看

- [Devin: Coding Agents 101](https://devin.ai/agents101)
- [MCP Server Implementations](https://github.com/modelcontextprotocol/servers)
- [How FAANG Vibe Codes](https://x.com/rohanpaul_ai/status/1959414096589422619)

---

## 🎬 课程幻灯片精华

### Week 2: 编码 Agent 的解剖

**讲座 1**：从零构建编码 Agent
- **链接**：[Slides](https://docs.google.com/presentation/d/11CP26VhsjnZOmi9YFgLlonzdib9BLyAlgc4cEvC5Fps)
- **核心内容**：
  - Agent 架构和组件
  - Tool use / Function calling
  - MCP 基础

**讲座 2**：构建自定义 MCP Server
- **链接**：[Slides](https://docs.google.com/presentation/d/1zSC2ra77XOUrJeyS85houg1DU7z9hq5Y4ebagTch-5o)
- **核心内容**：
  - MCP Server 开发
  - 认证与部署
  - 最佳实践

---

### Week 4: 编码 Agent 模式

**讲座 1**：如何成为 Agent Manager
- **链接**：[Slides](https://docs.google.com/presentation/d/19mgkwAnJDc7JuJy0zhhoY0ZC15DiNpxL8kchPDnRkRQ)
- **核心内容**：
  - 管理 Agent 自主级别
  - Human-Agent 协作模式
  - 何时信任 AI，何时人工介入

**讲座 2**：Boris Cherney (Claude Code 创始人)
- **链接**：[Slides](https://docs.google.com/presentation/d/1bv7Zozn6z45CAh-IyX99dMPMyXCHC7zj95UfwErBYQ8)
- **核心内容**：
  - Claude Code 设计哲学
  - Agent 编排最佳实践
  - 未来趋势

---

## 📅 本周日程

### 周一（2 小时）

**上午（1 小时）**：
- [ ] 读 "How Anthropic Uses Claude Code"（30 分钟）
- [ ] 标注 3 个核心洞察 + 5 个可复用模式（15 分钟）
- [ ] 对比我们的 Subagent 策略（15 分钟）

**下午（1 小时）**：
- [ ] 读 "Claude Code Best Practices"（20 分钟）
- [ ] 读 "Specs Are the New Source Code"（15 分钟）
- [ ] 写对比笔记（25 分钟）

**产出**：`notes/monday-comparison.md`

---

### 周二（1 小时）

**任务**：分析我们的 Subagent 策略

- [ ] 读 04-MEMORY L2 区 Subagent 策略
- [ ] 列出当前策略的问题
- [ ] 基于周一阅读，提出改进方案
- [ ] 创建改进清单

**产出**：`notes/subagent-analysis.md`

---

### 周三（2 小时）

**上午（1 小时）**：
- [ ] 读 "MCP Introduction"（15 分钟）
- [ ] 读 "Context Rot"（20 分钟）
- [ ] 评估自定义 MCP Server 需求（25 分钟）

**下午（1 小时）**：
- [ ] 设计 MCP 验证脚本
- [ ] 更新 CLAUDE.md MCP 章节
- [ ] 创建 MCP 工具选择指南

**产出**：`scripts/mcp-verify.sh`

---

### 周四（2 小时）

**任务**：实施改进

- [ ] 更新 04-MEMORY Subagent 策略
- [ ] 添加 "何时不用 Subagent" 规则
- [ ] 实施并行任务数量限制（≤3）
- [ ] 运行 MCP 验证脚本
- [ ] 测试改进效果

**产出**：
- 更新 `04-MEMORY.md`
- 更新 `CLAUDE.md`
- 新建 `scripts/mcp-verify.sh`

---

### 周五（1 小时）

**任务**：复盘 + 下周计划

- [ ] 填写本周复盘模板（15 分钟）
- [ ] 评估改进效果（15 分钟）
- [ ] 规划下周学习内容（15 分钟）
- [ ] 提取可固化经验（15 分钟）

**产出**：`notes/weekly-review.md`

---

## 📝 本周任务清单

### 阅读任务

| 任务 | 状态 | 预计时间 |
|------|------|---------|
| 读 "How Anthropic Uses Claude Code" | [ ] | 30 分钟 |
| 读 "Claude Code Best Practices" | [ ] | 20 分钟 |
| 读 "Specs Are the New Source Code" | [ ] | 15 分钟 |
| 读 "MCP Introduction" | [ ] | 15 分钟 |
| 读 "Context Rot" | [ ] | 20 分钟 |

### 实践任务

| 任务 | 状态 | 预计时间 |
|------|------|---------|
| 分析 Subagent 策略 | [ ] | 1 小时 |
| 设计 MCP 验证脚本 | [ ] | 1 小时 |
| 实施 Subagent 改进 | [ ] | 2 小时 |
| 更新 CLAUDE.md MCP 章节 | [ ] | 30 分钟 |

### 产出物

| 产出 | 状态 |
|------|------|
| `notes/monday-comparison.md` | [ ] |
| `notes/subagent-analysis.md` | [ ] |
| `scripts/mcp-verify.sh` | [ ] |
| 更新 `04-MEMORY.md` | [ ] |
| 更新 `CLAUDE.md` | [ ] |
| `notes/weekly-review.md` | [ ] |

---

## 🎯 成功标准

**周五检查时**：

| 维度 | 当前 | 目标 |
|------|------|------|
| **Subagent 策略** | 3 种，规则模糊 | 明确自主级别 + 并行限制 |
| **MCP 配置** | 5 个工具 | 优化选择逻辑 + 验证脚本 |
| **阅读完成** | 0 篇 | 必读 3 篇 + 应该读 2 篇 |
| **改进实施** | 0 项 | 4 项全部完成 |

---

## 📋 每日复盘模板

**每日结束时花 5 分钟填写**：

```markdown
## YYYY-MM-DD | Day X 复盘

### 今日完成
- 阅读：[文章列表]
- 实践：[具体任务]
- 产出：[文档/脚本]

### 核心洞察
- [洞察 1]
- [洞察 2]

### 遇到的困难
- [困难 + 如何解决]

### 明日计划
- [ ] [任务 1]
- [ ] [任务 2]
```

---

## 🔗 快速链接

### 必读论文/文章

1. [How Anthropic Uses Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf)
2. [Claude Code Best Practices](https://rosmur.github.io/claudecode-best-practices/)
3. [Specs Are the New Source Code](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code)
4. [MCP Introduction](https://stytch.com/blog/model-context-protocol-introduction/)
5. [Context Rot](https://research.trychroma.com/context-rot)

### 课程幻灯片

- [Week 2: 编码 Agent 的解剖](https://docs.google.com/presentation/d/11CP26VhsjnZOmi9YFgLlonzdib9BLyAlgc4cEvC5Fps)
- [Week 4: Agent Manager](https://docs.google.com/presentation/d/19mgkwAnJDc7JuJy0zhhoY0ZC15DiNpxL8kchPDnRkRQ)
- [Boris Cherney: Claude Code](https://docs.google.com/presentation/d/1bv7Zozn6z45CAh-IyX99dMPMyXCHC7zj95UfwErBYQ8)

### 课程作业

- [Week 2: First Steps in AI IDE](https://github.com/mihail911/modern-software-dev-assignments/tree/master/week2)
- [Week 4: Coding with Claude Code](https://github.com/mihail911/modern-software-dev-assignments/blob/master/week4/assignment.md)

---

## 💡 核心原则

> **不追求"学完课程"，追求"用课程改进我们的工作体系"**

**衡量标准**：
- 不是读了多少文章
- 不是看懂多少概念
- **而是**我们的工作体系有没有改进

**成功定义**：
- Subagent 策略更清晰了？✅
- MCP 配置更优化了？✅
- 有可验证的改进产出？✅

---

*创建时间：2026-03-01*
*预计完成：2026-03-07（本周五）*
*复盘时间：周五下午*
