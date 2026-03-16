---
input: [Hooks 体系说明]
output: [功能清单、使用指南]
pos: [.claude/hooks/README.md，Hooks 配置入口]
---

# Hooks 体系说明

> Mino 的 hooks 配置 - 按 Ars Contexta 体系整合

---

## 体系架构

```
Ars Contexta 插件 (自动管理)
    ├── SessionStart: session-orient.sh
    ├── PostToolUse: write-validate.sh, auto-commit.sh
    └── Stop: session-capture.sh

自定义 Hooks (手动配置)
    ├── UserPromptSubmit: transparent-workflow-monitor.js
    └── 独立工具: status-bar.js

按需脚本
    ├── scripts/maintenance/health-checks.js
    └── scripts/maintenance/auto-maintenance.js
```

---

## 当前配置

### Ars Contexta Hooks (插件自动管理)

| Hook | 触发时机 | 功能 |
|------|---------|------|
| **session-orient.sh** | SessionStart | 注入工作区树、加载身份、维护信号 |
| **write-validate.sh** | PostToolUse (Write) | 每次写入时验证 schema |
| **auto-commit.sh** | PostToolUse (Write, async) | Git 自动提交（非阻塞）|
| **session-capture.sh** | Stop | 保存会话状态到 `ops/sessions/` |

**配置方式**：由 Ars Contexta 插件自动管理，无需手动配置

---

### 自定义 Hooks

| Hook | 文件 | 触发时机 | 功能 |
|------|------|---------|------|
| **透明工作流监控** | `transparent-workflow-monitor.js` | UserPromptSubmit | 分析任务复杂度，自动注入提醒 |
| **状态栏** | `status-bar.js` | 手动/定时 | 显示模型、context、token 统计 |

**配置方式**：`settings.local.json`

---

### 按需脚本

| 脚本 | 功能 | 运行方式 |
|------|------|---------|
| **health-checks.js** | 知识库健康检测 | `node scripts/maintenance/health-checks.js` |
| **auto-maintenance.js** | 自动维护任务触发 | `node scripts/maintenance/auto-maintenance.js` |

---

## 文件结构

```
.claude/
├── hooks/                          # 自定义 hooks
│   ├── transparent-workflow-monitor.js
│   ├── status-bar.js
│   ├── view-workflow-log.sh
│   ├── CLAUDE.md
│   └── README.md
├── hooks-archive/                  # 已归档的未使用 hooks
│   ├── auto-categorize.js
│   ├── connection-suggest.js
│   ├── agentic-loop-hook.js
│   ├── plan-hook.js
│   ├── skills-auto-activate.js
│   └── task-complexity-analyzer.js
└── settings.local.json             # 自定义 hooks 配置

scripts/
└── maintenance/                    # 按需维护脚本
    ├── health-checks.js
    └── auto-maintenance.js

ops/                                # Ars Contexta 运行时数据
├── sessions/                       # 会话记录
├── queue/                          # 任务队列
├── config.yaml                     # 知识系统配置
└── methodology/                    # 研究图谱
```

---

## 与 Ars Contexta 的关系

### 功能重叠处理

| 原功能 | 现在由 | 说明 |
|--------|--------|------|
| auto-categorize.js | Ars Contexta | Ars Contexta 有更强的分类系统 |
| connection-suggest.js | Ars Contexta | Ars Contexta 有语义搜索和连接推荐 |
| health-checks.js | 保留为按需脚本 | Ars Contexta 不自动运行健康检查 |
| auto-maintenance.js | 保留为按需脚本 | 同上 |

### 保留的独立功能

- **transparent-workflow-monitor.js** - 独立的透明工作流监控，与 Ars Contexta 无冲突
- **status-bar.js** - 状态栏显示工具，独立功能

---

## 使用指南

### 运行健康检查

```bash
# 生成健康报告
node scripts/maintenance/health-checks.js

# 查看报告
cat ops/queue/health-report.json
```

### 运行自动维护

```bash
# 根据健康报告生成维护任务
node scripts/maintenance/auto-maintenance.js

# 查看任务队列
cat ops/queue/queue.json
```

### 查看透明工作流日志

```bash
# 今天的记录
./.claude/hooks/view-workflow-log.sh today

# 统计分析
./.claude/hooks/view-workflow-log.sh analyze

# 所有记录
./.claude/hooks/view-workflow-log.sh all
```

---

## Ars Contexta 命令参考

| 命令 | 功能 |
|------|------|
| `/arscontexta:help` | 上下文指导和命令发现 |
| `/arscontexta:health` | 运行诊断检查 |
| `/reduce` | 从源提取洞察 |
| `/reflect` | 查找连接，更新 MOCs |
| `/verify` | 组合质量检查 |
| `/stats` | Vault 指标 |

---

*最后更新：2026-03-15 — 按 Ars Contexta 体系整合*
