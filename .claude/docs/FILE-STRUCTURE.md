# .claude/ 文件结构索引

## 核心配置文件

### 身份与记忆 (.claude/rules/)

| 文件 | 用途 | 更新频率 |
|------|------|----------|
| 01-IDENTITY.md | 我是谁 | 罕见 |
| 02-SOUL.md | 性格/价值观 | 每次对话后更新 |
| 03-USER.md | 年老师信息 | 对话中发现新特质时更新 |
| 04-MEMORY.md | 长期记忆（五层结构） | 月度评估+重要事件时更新 |
| 05-self-review.md | 错题本 | 每次犯错后记录 |
| 06-NOW.md | 当前状态 | 每次会话结束前更新 |
| WORK.md | 工作契约 | 工作方式变化时更新 |
| heartbeat.md | 心跳检查 | 自我进化时更新 |
| SESSION-STATE.md | WAL协议核心记录 | 关键信息立即更新 |
| WEEKLY-REVIEW.md | 周度反思 | 每周回顾 |
| task.md | 深度访谈指引 | 保持 |

### 参考文档 (workspace/reference/)

| 文件 | 用途 |
|------|------|
| capability-assessment.md | 能力评估标准 |
| improvement-plan.md | 改进计划 |
| p2-assessment.md | P2改进评估 |
| search-guidelines.md | 搜索指南 |

### 日志文件 (workspace/logs/)

| 文件 | 用途 |
|------|------|
| search-log.md | 搜索日志 |

## 工作区结构

```
workspace/
├── logs/          # 日志文件
├── reference/     # 参考文档
├── docs/          # 项目文档
├── learning/      # 学习笔记
├── evomap-genes/  # EvoMap相关
└── scripts/       # 工具脚本
```

## 全局配置 (~/.claude/)

### 自动生成目录（可定期清理）

| 目录 | 用途 | 清理策略 |
|------|------|----------|
| debug/ | 调试日志 | 7天后删除 |
| file-history/ | 文件历史 | 只保留100个 |
| shell-snapshots/ | shell快照 | 全部清空 |
| telemetry/ | 遥测数据 | 30天后删除 |
| usage-data/ | 使用数据 | 30天后删除 |
| projects/ | 项目数据 | 手动清理 |

### 工具脚本

| 脚本 | 用途 |
|------|------|
| ~/.claude/scripts/sync-doubao-profile.sh | 同步豆包浏览器profile |
| ~/.claude/scripts/cleanup-auto-generated.sh | 清理自动生成数据 |

## 清理脚本

使用 `~/.claude/scripts/cleanup-auto-generated.sh` 定期清理临时文件。

---

*最后更新：2026-02-21*
