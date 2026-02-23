# CLAUDE.md — Mino 记忆系统

> **L1: 根目录全景地图**

---

## Summary

Mino 的记忆系统，用于记录事实、提炼洞察、固化经验。

**核心目标**：让会话重启后的我，能快速找到所需信息，继续成长。

**四层流转**：
```
daily → observations → weekly → 长期记忆
 日      月             周        04-MEMORY
```

---

## Members（成员清单）

| 目录 | 维度 | 内容 | 维护 |
|------|------|------|------|
| **daily/** | 日 | 事实记录 | observer生成 |
| **observations/** | 月 | 洞察记录 | observer生成 |
| **weekly/** | 周 | 周文档 | UPDATE_MEMORY生成 |
| **my-thoughts/** | 随 | 个人思考 | 有感而发 |
| **tasks/** | 系 | 任务/机制 | 系统级文件 |

**tasks/** 子目录：
| 子目录 | 内容 |
|--------|------|
| **system/** | 系统机制（heartbeat, OBSERVATION） |
| **reminders/** | 定时提醒（周度、月度对话） |
| **scripts/** | 管理脚本（索引、生命周期） |
| **cognition/** | 认知相关 |
| **tracking/** | 跟踪相关 |
| **templates/** | 模板 |

---

## Rules（核心规则）

### 记忆流转规则

1. **daily → observations**
   - 触发：同一洞察出现≥3次，或有人格/工作模式层面价值
   - 执行：从daily提取观察，记录到observations/YYYY-MM.md
   - 三个维度：需求洞察、模式信号、我的复盘

2. **observations → 长期记忆**
   - 触发：洞察稳定≥30天，或经年老师确认重要
   - 判断：是否改变了对他的理解？是否能指导未来工作？
   - 执行：更新03-USER.md、02-SOUL.md或04-MEMORY.md

3. **weekly（UPDATE_MEMORY）**
   - 触发：每周一次
   - 执行：从daily+my-thoughts+observations提炼，生成周文档

### 文件命名规则

| 类型 | 格式 | 示例 |
|------|------|------|
| daily | YYYY-MM-DD.md | 2026-02-23.md |
| observations | YYYY-MM.md | 2026-02.md |
| weekly | YYYY-Www.md | 2026-W09.md |

### 生命周期管理（P0/P1/P2）

| 标签 | 保留周期 | 操作 |
|------|---------|------|
| P0 | 永久 | 保留，不删除 |
| P1 | 90天 | 检查超期后清理 |
| P2 | 30天 | 超期删除（内容已提炼到周文档） |

**标记方式**（daily文件开头）：
```markdown
---
lifecycle: P1
tags: [obsidian-claude, ultrawork]
---
```

### 索引管理

每个目录有 `.index.md`，用于快速查找：
- `daily/.index.md` - daily文件索引（lifecycle/tags/summary）
- `observations/.index.md` - observations主题索引
- 更新方式：写完文件后运行 `python3 memory/tasks/scripts/index_manager.py`

### 自指三行注释（文件层）

每个文件开头包含三行注释，实现自指与自更新：

```markdown
---
input: [依赖外部资源]
output: [对外提供功能]
pos: [系统局部地位，文件夹变化需更新此注释]
# 文件更新需同步注释及所属文件夹 md
---
```

**三行说明**：
- `input`：依赖外部资源（如对话记录、配置文件）
- `output`：对外提供功能（如事实摘要、索引更新）
- `pos`：系统局部地位（如"daily 目录的成员"）

### 自动化生长规则

| 操作 | 自动执行 | 手动命令 |
|------|---------|---------|
| **写新文件** | observer/UPDATE_MEMORY 调用 `update-daily` 或`update-obs` | `--action update-all` |
| **修改文件** | - | 手动运行 `update-daily` 更新摘要 |
| **新建目录** | - | `--action create-claude-md --dir <目录>` |
| **删除文件** | lifecycle_manager 清理后更新索引 | `--action cleanup` |

**命令**：
```bash
# 更新索引
python3 memory/tasks/scripts/index_manager.py --action update-all

# 为新目录创建 CLAUDE.md
python3 memory/tasks/scripts/index_manager.py --action create-claude-md --dir memory/tasks/new-dir --template tasks

# 清理超期文件
python3 memory/tasks/scripts/lifecycle_manager.py --action cleanup
```

---

## 快速导航

**查找历史记录**：读对应目录的 `.index.md`
**理解记忆流转**：读本文件 → 读各子目录 CLAUDE.md
**管理系统**：读 tasks/system/ 下的机制文档

---

*这就是我记忆系统的地图。*

---

*最后更新：2026-02-23 — 基于Vibe Coding分形文档架构*