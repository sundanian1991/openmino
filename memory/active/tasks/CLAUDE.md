---
input: 项目启动请求、机制需求
output: 任务系统文件（机制、提醒、脚本、模板）
pos: active/的子模块，P1 活跃工作机制
# 文件夹变化需同步注释及所属文件夹 md
---

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

### 5 文件流（项目管理）

**核心文件**（必做）：
1. **Prompt** — 定义目标边界（要什么/不要什么）
2. **Plans** — 任务拆解 + 验收命令（1-2 小时里程碑）

**辅助文件**（按需）：
3. **Architecture** — 技术规范
4. **Implement** — 操作手册
5. **Documentation** — 进度日志（active/daily/自动记录）

**使用方式**：
1. 复制 `templates/project-workflow.md` 到 `tracking/[项目名].md`
2. 填写 Prompt + Plans
3. 启动指令：`先读 tracking/[项目名].md，按 Plans 顺序执行`

---

*这里是工作机制的所在地。*

---

*最后更新：2026-02-23*