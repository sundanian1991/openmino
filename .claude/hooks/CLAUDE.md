---
input: [依赖外部资源]
output: [对外提供功能]
pos: [.claude/hooks，说明目录职责]
---

# CLAUDE.md — HOOKS

> [目录说明]

---

## Summary

[目录功能说明]

---

## Members

| 文件 | 用途 |
|------|------|
| `CLAUDE.md` | Claude 配置文档 |
| `README.md` | 目录说明文档 |
| `agentic-loop-hook.js` | 文件 |
| `plan-hook.js` | 文件 |
| `skills-auto-activate.js` | 文件 |
| `task-complexity-analyzer.js` | 文件 |
| `transparent-workflow-monitor.js` | 文件 |
| `view-workflow-log.sh` | Shell 脚本 |

---

## 透明工作流监控（2026-03-14 新增）

**触发时机**：每次用户发送消息时自动执行

**功能**：
1. 分析任务复杂度（步骤数、风险级别）
2. 如果 ≥4 步，自动注入透明工作流提醒
3. 记录执行日志到 `memory/active/tasks/monitoring/transparent-workflow.log`

**复杂度标准**：
- **简单**（≤3 步）→ 直接执行，无提醒
- **中等**（4-6 步）→ 建议展开透明工作流
- **复杂**（≥7 步）→ 强制要求展开透明工作流

**查看日志**：
```bash
# 今天的记录
./.claude/hooks/view-workflow-log.sh today

# 统计分析
./.claude/hooks/view-workflow-log.sh analyze

# 所有记录
./.claude/hooks/view-workflow-log.sh all
```

**配置位置**：`.claude/settings.local.json` 的 `hooks.UserPromptSubmit`