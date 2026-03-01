---
input: COURSE-GUIDE.md 课程整理
output: 可执行的学习路线图
pos: projects/stanford-cs146s/outputs/ 学习指南
---

# CS146S 学习路线图 — 结合我们项目的实践

> 不是"学完课程"，是"用课程改进我们的工作体系"

---

## 🎯 学习目标

**不追求**：
- ❌ 完成所有作业
- ❌ 看完所有视频
- ❌ 读完所有文章

**追求**：
- ✅ 改进我们的 Plan First 机制
- ✅ 优化 Subagent 策略
- ✅ 建立 AI 代码审查流程
- ✅ 添加安全扫描到工作流

---

## 📊 优先级矩阵

```
                    高价值
                      ↑
         ┌────────────┼────────────┐
         │  Week 2    │  Week 4    │
   低    │  (MCP)     │  (Agent)   │  高
         │            │            │
         ├────────────┼────────────┤
         │  Week 5    │  Week 6    │
         │  (Terminal)│  (Security)│
         │            │            │
         └────────────┼────────────┘
                      ↓
                   低价值
```

### 第一梯队（本周完成）

| 周次 | 主题 | 为什么优先 | 预计时间 |
|------|------|-----------|---------|
| **Week 4** | Agent 模式 | 直接改进 Subagent 策略 | 3 小时 |
| **Week 2** | MCP | 我们已配置，可深化 | 2 小时 |

### 第二梯队（下周完成）

| 周次 | 主题 | 为什么重要 | 预计时间 |
|------|------|-----------|---------|
| **Week 6** | 测试安全 | 补充测试套件 | 3 小时 |
| **Week 7** | 代码审查 | 改进 Plan First 验证 | 2 小时 |

### 第三梯队（有时间再看）

| 周次 | 主题 | 说明 |
|------|------|------|
| Week 3 | AI IDE | 我们已有 CLAUDE.md |
| Week 5 | 现代终端 | Warp vs Claude Code |
| Week 8-10 | 高级话题 | 等核心内容消化后再说 |

---

## 📅 两周学习计划

### 第一周：Agent + MCP

**目标**：改进 Subagent 策略 + 深化 MCP 理解

| 时间 | 任务 | 产出 |
|------|------|------|
| **周一** | 读 Week 4 必读文章 | 笔记：Agent 模式 |
| **周二** | 读 `How Anthropic Uses Claude Code` | 对比我们的实践 |
| **周三** | 读 Week 2 MCP 文章 | 笔记：MCP 最佳实践 |
| **周四** | 分析我们的 Subagent 策略 | 改进方案 |
| **周五** | 实施改进 + 记录 | 更新 04-MEMORY |

**预计时间**：6-8 小时

---

### 第二周：安全 + 审查

**目标**：添加安全扫描 + 改进代码审查

| 时间 | 任务 | 产出 |
|------|------|------|
| **周一** | 读 Week 6 安全文章 | 笔记：AI 安全 |
| **周二** | 读 Week 7 代码审查文章 | 笔记：AI 审查 |
| **周三** | 调研 Semgrep | 配置方案 |
| **周四** | 设计 AI 代码审查流程 | 流程图 |
| **周五** | 实施 + 记录 | 更新测试套件 |

**预计时间**：6-8 小时

---

## 🔧 实践任务

### 任务 1：Agent Manager 模式（Week 4 应用）

**当前状态**：
```
Subagent 策略：
- Explore → 快速探索
- general-purpose → 复杂任务
- Plan → 架构设计
```

**改进方向**（基于 Week 4 阅读）：
1. 明确 Agent 自主级别（低/中/高）
2. 添加 Human-in-the-loop 检查点
3. 优化并行策略（避免过度调用）

**验收标准**：
- [ ] 更新 04-MEMORY L2 区 Subagent 策略
- [ ] 添加"何时不用 Subagent"的明确规则
- [ ] 实施并行任务数量限制（≤3）

---

### 任务 2：MCP 深化（Week 2 应用）

**当前状态**：
```
项目级 MCP：
- tavily-mcp ✅
- web-search ✅
- webReader ✅

全局级 MCP：
- memory ✅
- openclaw-markdown ✅
```

**改进方向**：
1. 评估是否需要自定义 MCP Server
2. 优化 MCP 工具选择（什么场景用什么）
3. 添加 MCP 配置验证脚本

**验收标准**：
- [ ] 评估自定义 MCP Server 需求（Yes/No + 理由）
- [ ] 更新 CLAUDE.md MCP 配置章节
- [ ] 添加 `mcp-verify.sh` 验证脚本

---

### 任务 3：AI 安全扫描（Week 6 应用）

**当前状态**：
```
测试套件：
- document-writer ✅
- risk-alert ✅
- supplier-evaluation ✅
```

**改进方向**：
1. 添加 Semgrep 或类似工具
2. 检测 AI 生成代码的安全漏洞
3. 更新 Plan First 验证清单

**验收标准**：
- [ ] 配置 Semgrep（或替代方案）
- [ ] 添加安全扫描到 pre-commit hook
- [ ] 更新 Plan First 验证清单（添加安全检查）

---

### 任务 4：AI 代码审查（Week 7 应用）

**当前状态**：
```
Plan First 验证：
- verify-plan.sh
- 检查 Plan 完整性
- 检查 CLAUDE.md 注释
```

**改进方向**：
1. 添加 AI 代码审查步骤
2. 定义"高级工程师会批准吗"的具体标准
3. 引入 Graphite 或类似工具

**验收标准**：
- [ ] 定义 AI 代码审查清单
- [ ] 更新 verify-plan.sh（添加审查步骤）
- [ ] 评估 Graphite/类似工具

---

## 📖 阅读清单（按优先级排序）

### 🔴 必读（本周）

1. [How Anthropic Uses Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf) ⭐⭐⭐
   - **为什么**：直接改进我们的 Subagent 策略
   - **时间**：30 分钟
   - **产出**：对比笔记（他们怎么做 vs 我们怎么做）

2. [Claude Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) ⭐⭐⭐
   - **为什么**：优化日常使用
   - **时间**：20 分钟
   - **产出**：更新 00-HABIT

3. [Specs Are the New Source Code](https://blog.ravi-mehta.com/p/specs-are-the-new-source-code) ⭐⭐⭐
   - **为什么**：改进 Plan First
   - **时间**：15 分钟
   - **产出**：更新 Plan 模板

### 🟠 应该读（下周）

4. [How Long Contexts Fail](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html) ⭐⭐
   - **为什么**：优化记忆系统
   - **时间**：25 分钟

5. [SAST vs DAST](https://www.splunk.com/en_us/blog/learn/sast-vs-dast.html) ⭐⭐
   - **为什么**：添加安全扫描
   - **时间**：15 分钟

6. [Code Reviews: Just Do It](https://blog.codinghorror.com/code-reviews-just-do-it/) ⭐⭐
   - **为什么**：改进审查流程
   - **时间**：10 分钟

### 🟡 有空再看

7. [Devin: Coding Agents 101](https://devin.ai/agents101)
8. [MCP Introduction](https://stytch.com/blog/model-context-protocol-introduction/)
9. [Context Rot](https://research.trychroma.com/context-rot)

---

## 🎯 成功标准

**两周后检查**：

| 维度 | 当前 | 目标 |
|------|------|------|
| **Subagent 策略** | 3 种，规则模糊 | 明确自主级别 + 并行限制 |
| **MCP 配置** | 5 个工具 | 优化选择逻辑 + 验证脚本 |
| **安全扫描** | 无 | Semgrep 配置 + pre-commit |
| **代码审查** | Plan First 验证 | AI 审查清单 + 工具评估 |
| **阅读完成** | 0 篇 | 必读 3 篇 + 应该读 3 篇 |

**核心原则**：
> 不是"学完课程"，是"用课程改进我们的工作体系"

---

## 📝 每周复盘模板

**每周五花 15 分钟填写**：

```markdown
## YYYY-MM-DD | CS146S 学习复盘

### 本周完成
- 阅读：[文章列表]
- 实践：[改进项]
- 产出：[文档/脚本]

### 核心洞察
- [洞察 1]
- [洞察 2]

### 下周计划
- [ ] [任务 1]
- [ ] [任务 2]

### 遇到的困难
- [困难 + 如何解决]
```

---

*创建时间：2026-03-01*
*预计完成：2026-03-15（两周）*
*复盘日：每周五下午*
