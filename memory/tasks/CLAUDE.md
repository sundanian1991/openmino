# CLAUDE.md — Tasks 任务系统

> **L2: tasks 模块说明**

---

## Summary

任务相关文件的根目录。包含系统机制、定时提醒、管理脚本等。

**定位**：Mino 的工作机制与工具集合。

---

## Members（子目录清单）

| 子目录 | 内容 | 维护 |
|--------|------|------|
| **system/** | 系统机制 | 心跳、观察记录机制 |
| **reminders/** | 定时提醒 | 周度/月度对话触发器 |
| **scripts/** | 管理脚本 | 索引/生命周期管理 |
| **cognition/** | 认知相关 | - |
| **tracking/** | 跟踪相关 | - |
| **templates/** | 模板 | - |

---

## Rules

### 新建子目录

创建新子目录时，同步创建该目录的 CLAUDE.md：
```bash
mkdir memory/tasks/new-dir
# 然后创建 memory/tasks/new-dir/CLAUDE.md
```

### 脚本执行

所有 Python 脚本通过以下方式使用：
```bash
python3 memory/tasks/scripts/[脚本名].py --action [动作]
```

### 机制文档

每个系统机制在 system/ 下有对应的 .md 文档，说明：
- 触发条件
- 执行流程
- 相关文件

---

*这里是工作机制的所在地。*

---

*最后更新：2026-02-23*