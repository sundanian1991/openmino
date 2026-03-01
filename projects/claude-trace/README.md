---
input: Claude Code 会话历史数据（~/.claude/projects/ 目录）
output: 可视化事件流分析报告（HTML + JSONL）
pos: claude-trace 项目说明文档
---

# Claude Traces - 使用指南

> 可视化分析 Claude Code 内部执行过程的工具

---

## 🎯 核心用途

**性能分析器 + 调试器** — 观察 Claude Code 在后台实际做了什么。

### 适用场景

| 场景 | 价值 |
|------|------|
| **Subagent 调试** | 验证子代理是否并行执行 |
| **Plan First 验证** | 检查规划模式是否正确触发 |
| **Memory 机制** | 观察 MEMORY.md 读写时机 |
| **性能诊断** | 定位慢任务根因 |
| **学习机制** | 理解 Claude Code 内部工作原理 |

---

## 📦 安装方式

**无需安装** — 通过 npx 直接运行：

```bash
npx @mariozechner/claude-trace [OPTIONS]
```

---

## 🚀 运行模式

### 模式 1：实时追踪（主要用途）

```bash
# 启动 Claude Code，同时记录所有交互
npx @mariozechner/claude-trace

# 指定日志文件名
npx @mariozechner/claude-trace --log my-session

# 运行特定命令
npx @mariozechner/claude-trace --run-with chat

# 包含所有请求（不只是 v1/messages）
npx @mariozechner/claude-trace --include-all-requests
```

**输出**：
- `.claude-trace/` 目录
- `log-YYYY-MM-DD-HH-MM-SS.jsonl` — 原始事件流
- `log-YYYY-MM-DD-HH-MM-SS.html` — 可视化界面

### 模式 2：生成 HTML 报告

```bash
# 从 JSONL 生成 HTML
npx @mariozechner/claude-trace --generate-html log-2025-06-02-17-10-25.jsonl

# 指定输出文件名
npx @mariozechner/claude-trace --generate-html log.jsonl output.html

# 生成但不打开浏览器
npx @mariozechner/claude-trace --generate-html log.jsonl --no-open
```

### 模式 3：生成索引

```bash
# 为 .claude-trace/ 目录生成索引
npx @mariozechner/claude-trace --index
```

### 模式 4：提取 Token

```bash
# 提取 OAuth token（用于 SDK 开发）
npx @mariozechner/claude-trace --extract-token
```

---

## 📊 界面说明

### 事件流视图

| 节点颜色 | 含义 |
|---------|------|
| 🔵 **蓝色 USER** | 用户输入 |
| 🟢 **绿色 TASK** | 核心任务 |
| 🟣 **紫色 Subagent** | 子代理交互 |
| 🟡 **黄色 Progress** | 进度钩子 |

### 关键指标

```
总事件数：526
├─ 用户事件：121 (23.0%)
├─ 助手事件：176 (33.5%)
├─ 子代理 - 用户：77 (14.6%)
├─ 子代理 - 助手：72 (13.7%)
└─ 进度钩子：80 (15.2%)

任务链：3
连接点：3
```

---

## 🔍 能不能分析历史数据？

**答案：不能直接分析。**

### 原因

`claude-trace` 的工作原理是：
1. **拦截 `fetch` 和 HTTP 请求** — 在运行时 monkey-patch
2. **记录 API 流量** — 只记录经过的请求
3. **生成 HTML** — 用记录的流量可视化

**它不是读取历史日志，而是实时抓包。**

### 替代方案：分析历史会话

如果要分析**之前的会话历史**，用这些工具：

| 工具 | 用途 | 命令 |
|------|------|------|
| **claude-history** | 搜索/浏览历史对话 | `npx claude-history` |
| **search-sessions** | 搜索会话历史 | `/search-sessions` skill |
| **ccusage** | 用量分析 | `ccusage` |

**示例**：
```bash
# 搜索历史会话
npx claude-history search "supplier evaluation"

# 查看统计
npx claude-history stats

# 生成报告
npx claude-history summary -f markdown -o report.md
```

---

## 💡 对我们的价值

### 1. 验证 Subagent 策略

**假设**：我们的并行策略是高效的

**验证方法**：
```bash
# 启动追踪
npx @mariozechner/claude-trace --include-all-requests

# 执行并行任务
# 例如：同时搜索 tavily + 读文档 + 查记忆

# 完成后生成报告
npx @mariozechner/claude-trace --generate-html --no-open

# 打开 HTML，检查：
# - 子代理是否真的并行？
# - 有多少不必要的调用？
# - 上下文切换开销多大？
```

### 2. 验证 Plan First 机制

**假设**：Plan First 正确触发

**验证方法**：
```bash
# 启动追踪
npx @mariozechner/claude-trace --log plan-test

# 执行复杂任务（触发 Plan First）
# 例如："创建一个供应商评估系统"

# 检查 HTML：
# - Plan First 是否触发？
# - 规划 → 执行的转换是否流畅？
# - 有没有跳过规划直接执行？
```

### 3. 诊断性能问题

**场景**：某次会话特别慢

**诊断方法**：
```bash
# 找到慢会话的 JSONL 文件
ls -la .claude-trace/

# 生成 HTML
npx @mariozechner/claude-trace --generate-html log-slow-session.jsonl

# 检查：
# - 哪个子任务耗时最长？
# - 有没有重复的工具调用？
# - 记忆检索是否成为瓶颈？
```

---

## ⚠️ 核心洞察（已验证）

### 洞察 1：Subagent 是"模拟"的

**发现**：子代理不是真正的并行进程，而是通过**新建上下文**模拟。

**证据**：
- 在 HTML 中看到独立的事件分支
- 但底层共享同一个执行环境
- 每次子代理调用 = 新的上下文切换

**影响**：
- 子代理太多会降低性能
- 并行任务控制在 3 个以内
- 优先用工具并行（tavily_search + Read + Grep）

### 洞察 2：Memory 是文件读写

**发现**：自动记忆功能 = 对 `MEMORY.md` 的简单读写。

**证据**：
- 没有数据库，纯文本文件
- 记忆检索 = 文件搜索
- 没有复杂的优先级排序

**影响**：
- 四层记忆体系设计是对的（daily/observations/weekly/长期）
- 物理隔离 P0/P1/P2 是必要的

---

## 📋 推荐工作流

### 什么时候用

| 频率 | 场景 |
|------|------|
| **每月 1 次** | 验证核心机制是否正常 |
| **遇到问题时** | 会话异常慢、子代理不响应 |
| **学习时** | 理解 Claude Code 内部机制 |

### 什么时候不用

- ❌ 日常开发 — 不需要
- ❌ 简单任务 — 不需要
- ❌ 已有明确错误信息 — 直接看日志

---

## 🎯 下一步行动

### 建议

1. **部署一次试试**（10 分钟）：
   ```bash
   cd projects/claude-trace
   npx @mariozechner/claude-trace --log test-session
   ```

2. **跑一次完整会话**：
   - 做一个复杂任务
   - 然后用 `--generate-html` 生成报告

3. **验证设计**：
   - Plan First 是否按预期触发？
   - Subagent 调用是否符合预期？
   - Memory 读写时机对吗？

4. **提炼洞察**：
   - 有意外发现 → 发布 EvoMap Capsule
   - 验证了现有设计 → 更新 TOOLS.md

---

## 📚 参考链接

- [GitHub 仓库](https://github.com/badlogic/lemmy/tree/main/apps/claude-trace)
- [Simon Willison 博客](https://simonwillison.net/2025/Jun/2/claude-trace/)
- [示例 HTML 报告](https://static.simonwillison.net/static/2025/log-2025-06-02-17-10-25.html)

---

*最后更新：2026-03-01*
