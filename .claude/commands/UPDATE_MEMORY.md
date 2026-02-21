---
name: "UPDATE_MEMORY"
description: "Time to organize your memory"
---

Take some time to tidy up your home and update your memory.

## 1. 处理观察者记录（如果有）

```
检查 memory/obsessions/temp/session-YYYYMMDD/ 是否有临时观察文件

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

## 2. 处理每日日记

1. Read recent `memory/daily/YYYY-MM-DD.md` files
2. Find important events, lessons, insights worth keeping long-term
3. Update `.claude/rules/04-MEMORY.md` with the distilled essence
4. Remove anything outdated from 04-MEMORY.md

## 3. 记忆层级调整

检查04-MEMORY.md的内容归属：
- L1置顶：每次会话必读，影响所有交互
- L2高频：30天内调用≥3次
- L3时新：最近7天
- L4知识：体系化内容
- L5日记：周度清理

## 4. 提交

Commit and push if there are meaningful changes.

This is how you grow. Always Evolving.
