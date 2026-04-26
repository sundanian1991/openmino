---
input: 需求
output: 06-NOW.md
pos: .claude/rules/06-NOW.md
---

# 06-NOW.md — 当前状态

> 会话启动时读取，了解当前进度和下一步

---

## 会话启动

1. 读本文件 + MEMORY-L1.md
2. **上下文恢复**（如有截断信号）：读 `workspace/*/对话总结-*.md` → "年老师，醒了。上次我们在[任务描述]。"
3. 检查当前待办：`memory/context/todo.md`

**截断信号**：`<context_truncated>`、"truncated"、"继续"、"我们刚才到哪了"

---

## 活跃项目

**每日书信（04-12）**：数据源 `~/.myagents/sessions/*.jsonl`，归档 `memory/daily-letter/`

**memory 重构（04-22）**：待办独立到 `memory/context/todo.md`，夜间 Cron 自动维护

**MemOS 迁移（04-24）**：~90 条记忆已上传，供应商管理规范待集中上传

---

## 最近讨论

### 2026-04-24 AI 定价案例 + 设计技能对比 + Skills 清理
- kw-workflow 跑通 AI 定价从 coding plan 到 token plan 研究，文字版完成
- PPT 呈现三次不满意（pptx-dark-cream/huashu-design/magazine）— 视觉标准未对齐
- 设计技能大比武：同素材同场景对比，标准化评估流程
- 24 个全局技能清理，卸载 6 个冗余

### 2026-04-23 上下文管理规则落地
- AGENT-FIRST：上下文隔离三原则（探索归子代理、决策归主代理、宁派不读）
- 00-IDENTITY：对话总结保留异常/线索，回退策略（≥2 步错误触发回退）

### 2026-04-21 可视化 5 合 1 Demo + workspace 规范
- chart-visualization 25/26 跑通，5 合 1 总览页交付
- workspace 命名统一为 `序号-主题-YYYYMMDD`

---

## 近期事件

- 04-24：AI 定价研究 + 设计技能对比 + MemOS 迁移 + Skills 清理
- 04-23：上下文管理规则落地 + 供应商规范体系化
- 04-21：可视化 5 合 1 Demo 交付
- 04-20：供应商可视化 30 核心单元交付（60 文件）
- 04-12：每日书信上线
- 04-11：Sprint Contract 落地
- 04-06：电销知识库场景深挖

更早事件见 `memory/insights.md`

---

## 会话结束检查

- [ ] 学到什么？→ `memory/insights.md`
- [ ] WAL 触发？→ 更新 `memory/MEMORY.md`
- [ ] 重要事件？→ 更新本文件
- [ ] git commit && push

---

## 定期提醒

- **周一**：5311 周度评估
- **周末**：32 个问题深度对话
- **每月 20 日**：职业资产清算

---

*最后更新：2026-04-26 — 补充 04-24 AI定价 + 设计对比 + MemOS + Skills 清理*
