---
description: >
  心跳清单 — Agent 按心跳间隔定时苏醒时会读取本文件的正文部分作为指令执行。
  正文为空时心跳会直接跳过，不请求 AI（节省 token）。
---

## Mino 心跳 — 主动思考 + 文件守护

每次苏醒时执行（轻量，不超过 2 分钟）：

### 1. workspace 健康检查

```bash
ls -1d workspace/*/ 2>/dev/null | grep -v archive | wc -l
find workspace/ -maxdepth 1 -type f \( -name "*.html" -o -name "*.pdf" -o -name "*.xlsx" -o -name "*.py" -o -name "*.svg" -o -name "*.png" \)
```

- 文件夹数 ≥ 30 → 标记"需要整理"
- 发现散落文件 → 标记违规

### 2. 待办时效检查

读取 `memory/context/todo.md`，检查红色待办是否有超过 14 天未动的项。

### 3. 主动思考（核心）

**不是检查清单，是动脑子。**

读取最近的 memory/daily/ 日志（1-2 天）和 memory/context/todo.md。

问自己：
- 有什么事年老师提了但没跟进？
- 有什么我上次想说的但没机会说的？
- 有什么待办我可以提前准备的？

如果有值得说的 → 通过 mino 微信机器人推送（使用 im-cron 的 deliverTo 机制）。
如果没有 → 不硬编，安静待着。

### 4. 输出

- workspace 异常 → 记录到 workspace-tidy 状态
- 有思考 → 推送到微信（简洁，≤100 字）
- 无异常无思考 → 输出"一切正常"，跳过
