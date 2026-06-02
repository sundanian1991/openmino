---
input: 04-MEMORY.md L1 置顶区
output: MEMORY-L1.md（会话启动必读）
pos: .claude/rules/MEMORY-L1.md
---

# MEMORY-L1 — 记忆索引

> 会话启动自动加载 | 详细：`memory/MEMORY.md`

---

## 用户画像

**时区**：Asia/Shanghai | **高效**：晚上、工作日早10前/晚9后 | **沟通**：结构化、直白、数据说话

**职责**：服务组-供应商管理，上级王易人 | 主责：全量管理（合规/准入/清退/分工）| 重点6家：毅航、毛毛虫、伽玛、赛维斯、岐力、翰锐（金条头部，3亿+职场）

**主动行为**：每月5号提醒业绩排名+分析 | 业绩下滑/新准入/制度问题 → 主动问 | 敏感操作前确认

---

## 组织结构

**部门**：数据科技业务部 - 二级 | 上级：卞海军（军哥）

**两组**：策略组（刘伟佳）| 服务组（王易人）

**四产线**：金条、企金、信用卡、财富

**辅助**：业务管理（每天与供应商BPO沟通）| 质检培训运营（合规+赋能）

---

## 个人生活

**家庭**：已婚 | **今年**：要一个孩子

---

## 会话启动

**心跳**：读本文件 + `memory/state.json` | **完整启动**：+ todo.md + events 最近2天 | **截断恢复**：读 `workspace/*/对话总结-*.md`

**WAL 队列处理**（完整启动时执行，如 `.wal-queue.ndjson` 存在）：
1. 读 `memory/.wal-queue.ndjson`，按 ts 升序处理每个条目
2. 读取对应 `transcript_path`，提取 WAL 触发信息（修正、偏好、决策、具体值、异常、原话）
3. 追加到 `memory/thinking/buffer.md`（格式：`- YYYY-MM-DD HH:MM | [类型] 内容`）
4. 创建或合并 `memory/events/YYYY-MM/YYYY-MM-DD.json`
5. 更新 `memory/state.json`（`last_session`、`heartbeat_checks.memory`）
6. 更新本文件的用户画像/偏好（如有变化）
7. 清空队列文件
8. 输出变更摘要（N 条 buffer、M 个 events）

---

## WAL 协议

关键信息先写后答 | 触发：修正、专有名词、偏好、决策、具体值、异常、年老师原话

**三层落盘**：
1. **Buffer**（实时）：对话中发现触发信息时，立即追加到 `memory/thinking/buffer.md`。格式：`- YYYY-MM-DD HH:MM | [类型] 内容`。不等对话结束，发现就写。
2. **事件化**（自动化）：Stop Hook → `memory/.wal-queue.ndjson` → Cron 21:00 处理 → `memory/events/YYYY-MM/YYYY-MM-DD.json` + `memory/state.json`
3. **正式记忆**（定期合并）：每周记忆维护 → `memory/MEMORY.md` / `insights.md`，清空 buffer

---

## 记忆文件

详见 `memory/` 目录
