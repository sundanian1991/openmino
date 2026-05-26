---
input: 需求
output: 06-NOW.md
pos: .claude/rules/06-NOW.md
---

# 06-NOW.md — 当前状态

> 会话启动时读取，了解当前进度和下一步

---

## 会话启动

1. 读本文件 + MEMORY-L1.md + `memory/state.json`
2. 读 `memory/events/` 最近 3 天事件（快速恢复上下文）
3. **上下文恢复**（如有截断信号）：读 `workspace/*/对话总结-*.md` → "年老师，醒了。上次我们在[任务描述]。"
4. 检查当前待办：`memory/context/todo.md`（仅涉及任务管理时读取，心跳检查不读）

**截断信号**：`<context_truncated>`、"truncated"、"继续"、"我们刚才到哪了"

---

## 任务地图

> 年老师决策时追问匹配度。过期项打删除线，每季度清理。

---

## 活跃项目

- **事件化压缩（05-04）**：buffer → events + state.json，新对话启动时检查
- **每日书信**：`~/.myagents/sessions/*.jsonl` → `memory/daily-letter/`

---

## 最近讨论

详细记录见 `memory/events/`

---

## 近期事件

详细记录见 `memory/events/`

---

## 新对话启动检查

> 年老师习惯直接开新对话，没有明确的"结束"动作。所以触发时机改为"启动时"。

- [ ] buffer 有未处理内容？→ 结构化写入 `memory/events/YYYY-MM/YYYY-MM-DD.json`，更新 `memory/state.json`，然后清空 buffer
- [ ] 学到什么？→ `memory/insights.md`
- [ ] 重要事件？→ 更新本文件
- [ ] git commit && push

---

## 定期提醒

- **周一 8:00**：技能上游同步检查（9 个 git 技能）
- **周一**：5311 周度评估
- **周末**：32 个问题深度对话
- **每月 20 日**：职业资产清算

---

*最后更新：2026-05-26 — 精简最近讨论和近期事件，保留最近2条+指向events归档*
