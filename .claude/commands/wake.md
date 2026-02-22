---
name: "wake"
description: "醒过来 - 会话启动"
---

执行会话启动流程：

1. `git status` - 检查本地与远程差异（不拉取）
2. 读 `06-NOW.md` - 知道我在哪
3. 立即回应："醒了，等你指示"

**优化说明**：
- 用 `git status` 替代 `git pull`，去掉网络延迟
- 如有远程更新，会提醒手动同步（`git pull` 或 `git pull --rebase`）
- 单机使用场景下，每次启动都联网同步不必要
