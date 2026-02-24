---
input: 对话记录、observer、UPDATE_MEMORY
output: 记忆系统全景地图
pos: memory/根目录，L1 总地图
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Mino 记忆系统

> **L1: 根目录全景地图 — 优先级分级架构**

---

## Summary

Mino 的记忆系统，按优先级分级管理：
- **P0（core/）** — 永久核心，永不过期
- **P1（active/）** — 活跃记忆，90 天
- **P2（transient/）** — 临时记录，30 天
- **Archive（archive/）** — 历史归档，永久保存

**核心目标**：记忆不是越多越好，是有用就留，没用就清。

---

## Members（优先级结构）

| 目录 | 优先级 | 内容 | 生命周期 |
|------|--------|------|---------|
| **core/** | P0 | 永久核心（偏好、决策、身份） | 永久 |
| **active/** | P1 | 活跃记忆（日记、思考、任务） | 90 天 |
| **transient/** | P2 | 临时记录 | 30 天 |
| **archive/** | - | 历史归档 | 永久 |
| **staging/** | - | 中转区（新文件默认落点） | 7 天未分类降级 |

### core/ — P0 永久核心

| 子目录 | 内容 |
|--------|------|
| **preferences/** | 用户偏好（审美、沟通、写作） |
| **decisions/** | 重要决策、协议（WAL 触发） |
| **identity/** | 身份认知、核心记忆 |

### active/ — P1 活跃记忆（90 天）

| 子目录 | 内容 |
|--------|------|
| **daily/** | 最近的日记（30 天内） |
| **my-thoughts/** | 最近的思考 |
| **tasks/** | 运行中的机制（system/reminders/scripts） |

### archive/ — 历史归档

| 子目录 | 内容 |
|--------|------|
| **daily/** | 90 天以上日记（有历史价值） |
| **observations/** | 月度观察归档 |
| **weekly/** | 周文档归档 |

---

## 向后兼容（旧目录已清空）

| 旧目录 | 新位置 | 状态 |
|--------|--------|------|
| **daily/** | `active/daily/` | 已清空，仅保留 CLAUDE.md |
| **my-thoughts/** | `active/my-thoughts/` | 已清空，仅保留 CLAUDE.md |
| **observations/** | `archive/observations/` | 已清空，仅保留 CLAUDE.md |
| **weekly/** | `archive/weekly/` | 已清空，仅保留 CLAUDE.md |
| **tasks/** | `active/tasks/` | 已清空，子目录保留 CLAUDE.md |

旧目录保留仅用于向后兼容，防止链接断裂。

---

## Rules（核心规则）

### 记忆流转规则

```
新文件 → staging/ → active/ → transient/ → 删除
              ↓           ↓
           core/      archive/
         （提炼）    （归档）
```

1. **新文件进入**：默认 staging/，每周分类
2. **核心提炼**：UPDATE_MEMORY 从 active/提炼到 core/
3. **生命周期**：
   - active/ → 90 天后 → 有价值到 core/，无价值到 transient/
   - transient/ → 30 天后 → DELETE（内容已提炼到 weekly）
4. **归档**：有历史价值的文件 → archive/ 永久保存

### 文件命名规则

| 类型 | 格式 | 示例 |
|------|------|------|
| daily | YYYY-MM-DD.md | 2026-02-23.md |
| observations | YYYY-MM.md | 2026-02.md |
| weekly | YYYY-Www.md | 2026-W09.md |

### 索引管理

每个目录有 `.index.md`，用于快速查找：
- `active/daily/.index.md` - daily 文件索引
- `archive/observations/.index.md` - observations 主题索引
- 更新方式：`python3 memory/active/tasks/scripts/index_manager.py`

### 自指三行注释（文件层）

每个文件开头包含三行注释：

```markdown
---
input: [依赖外部资源]
output: [对外提供功能]
pos: [系统局部地位，文件夹变化需更新此注释]
# 文件更新需同步注释及所属文件夹 md
---
```

### 自动化生长规则

| 操作 | 自动执行 | 手动命令 |
|------|---------|---------|
| **写新文件** | observer/UPDATE_MEMORY 调用脚本 | `--action update-all` |
| **修改文件** | - | 手动运行脚本更新摘要 |
| **新建目录** | - | `--action create-claude-md --dir <目录>` |
| **清理超期** | lifecycle_manager | `--action cleanup` |

---

## 快速导航

**查找历史记录**：读 archive/ 对应目录的 `.index.md`
**查找当前记忆**：读 active/ 对应目录
**理解流转规则**：读本文件

---

*这就是我的记忆地图 — 按优先级分级，让有用的留下，没用的离开。*

---

*最后更新：2026-02-24 — 优先级分级架构改造（P0/P1/P2 物理隔离）*
