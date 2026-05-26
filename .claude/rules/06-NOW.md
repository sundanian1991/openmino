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

> 每次新对话启动读取，用于优先级对齐。年老师决策时我会追问匹配度。
> 更新规则：新增内容追加到表底，过期项打删除线，每季度清理空项。

### 核心项目（最高优先级）
- 灵魂文件迭代 — 2026-05-06 完成

### 快速增长业务
- [空]

### 核心目标
- [空]

### 当前推进中
- [空]

### 该放弃的
- [空]

---

## 活跃项目

**每日书信（04-12）**：数据源 `~/.myagents/sessions/*.jsonl`，归档 `memory/daily-letter/`

**memory 重构（04-22）**：待办独立到 `memory/context/todo.md`，夜间 Cron 自动维护

**事件化压缩（05-04）**：buffer → `memory/events/` + `memory/state.json`，对标 OpenClaw 做梦机制。触发：每次新对话启动时检查 buffer 是否有未处理内容

**MemOS 迁移（04-24）**：~90 条记忆已上传，供应商管理规范待集中上传

---

## 最近讨论

### 2026-05-09 自我认知建设 + 基础设施清算 + Cron 大瘦身
- OPINIONS.md 个人信念地图完成：1717 会话 → 35 条精选信念，周度 Cron 自动增量更新
- Cron 大瘦身：晨间思考砍掉（产出为零），所有 Cron 统一模型
- 任务验收标准强制化：59 个任务逐条补写，不再接受"大概内容"
- 判断力与审美训练技能升级：融合元认知+张力设计原则
- PPT 技能合并（presentation→html-ppt）+ 主动推送四层架构落地
- ppt-pptx-deck-builder 质量反馈：克制设计 > 装饰过度，颜色系统压缩到 3 角色

### 2026-05-08 ppt-master 首用 + Cron 空跑根因定位
- Aham PPT 介绍项目完成（公众号→11 页咨询级 PPT，Anthropic 暖色调）
- ppt-master 端到端跑通：source→strategist→executor→quality→PPTX export
- **Cron 空跑根因锁定**：默认模型太弱（5-10s + null content），加 --model opus 后正常
- 推送机制从"心跳扫描"转向"实时写入 + 心跳兜底"

历史讨论详见 `memory/events/`

---

## 近期事件

- 05-18：技能同步检查（2 个 git 技能：takeaway-skill 本地有修改跳过，compound-knowledge-plugin 无更新）
- 05-09：OPINIONS.md 个人信念地图 + Cron 大瘦身 + 任务验收标准强制化

更早事件见 `memory/events/`

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
