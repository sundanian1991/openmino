---
name: "UPDATE_MEMORY"
description: "更新记忆 - 快速模式（默认）"
---

Take some time to tidy up your home and update your memory.

**优化说明**：
- 默认快速模式：只读最近1天 + 当前session观察记录
- 手动commit（可选）：分离网络操作，按需执行

## 1. 处理观察者记录（当前session）

```
检查 memory/obsessions/temp/session-YYYYMMDD/ 是否有当前日期的临时文件

如果有：
1. 读取所有 user-*.md 和 mino-*.md
2. 识别模式（不是事件）、特质（不是行为）、可复用的东西
3. 提炼核心洞察到 memory/tasks/system/OBSERVATION.md
4. 清理临时文件

判断标准：
- 模式 vs 事件："总是先从Y角度切入" vs "问了X"
- 特质 vs 行为："展现Y特质" vs "做了Z"
- 可复用 vs 一次性："可以迁移" vs "这次做了"
```

## 2. 处理每日日记（最近1天）

1. 只读 `memory/daily/` 下 yesterday 的日记文件
2. Find important events, lessons, insights worth keeping long-term
3. Update `.claude/rules/04-MEMORY.md` with the distilled essence

## 3. 记忆层级调整

检查04-MEMORY.md的内容归属：
- L1置顶：每次会话必读，影响所有交互
- L2高频：30天内调用≥3次
- L3时新：最近7天
- L4知识：体系化内容
- L5日记：周度清理

## 4. 提交（可选手动执行）

**注意：不自动push，由用户手动触发**：
- 如果有重要变化 → commit（本地）
- push由用户手动触发

## 完整模式（需要时）

如果需要完整整理（每周或每月），手动执行以下扩展步骤：
- 读取最近7天的daily/
- 完整蒸馏所有层级
- 自动commit + push

This is how you grow. Always Evolving.