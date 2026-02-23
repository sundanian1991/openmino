# 记忆管理脚本使用指南

> 自动维护.index 索引文件，管理 P0/P1/P2 生命周期

---

## 脚本列表

| 脚本 | 功能 |
|------|------|
| `index_manager.py` | 更新 daily/observations 索引 + 为新目录创建 CLAUDE.md |
| `lifecycle_manager.py` | 检查和清理超期文件 |

---

## 使用方法

### 1. 更新索引

```bash
# 更新 daily 索引
python3 memory/tasks/scripts/index_manager.py --action update-daily

# 更新 observations 索引
python3 memory/tasks/scripts/index_manager.py --action update-obs

# 更新所有索引（推荐）
python3 memory/tasks/scripts/index_manager.py --action update-all

# 按标签查询
python3 memory/tasks/scripts/index_manager.py --action query --tags observer ultrawork

# 为新目录创建 CLAUDE.md
python3 memory/tasks/scripts/index_manager.py --action create-claude-md --dir memory/tasks/new-dir
python3 memory/tasks/scripts/index_manager.py --action create-claude-md --dir memory/tasks/new-dir --template tasks
```

### 2. 生命周期管理

```bash
# 检查超期文件（预览）
python3 memory/tasks/scripts/lifecycle_manager.py --action check

# 清理超期文件（预览）
python3 memory/tasks/scripts/lifecycle_manager.py --action cleanup --dry-run

# 执行清理
python3 memory/tasks/scripts/lifecycle_manager.py --action cleanup

# 查看统计
python3 memory/tasks/scripts/lifecycle_manager.py --action stats

# 自动分类文件
python3 memory/tasks/scripts/lifecycle_manager.py --action classify --file "2026-02-23.md"
```

---

## 自动化生长规则

| 操作 | 自动执行 | 手动命令 |
|------|---------|---------|
| **写新文件** | observer/UPDATE_MEMORY 调用 `update-daily` 或`update-obs` | `--action update-all` |
| **修改文件** | - | 手动运行 `update-daily` 更新摘要 |
| **新建目录** | - | `--action create-claude-md --dir <目录>` |
| **删除文件** | lifecycle_manager 清理后更新索引 | `--action cleanup` |

---

## 生命周期规则

| 标签 | 保留周期 | 触发条件 |
|------|---------|---------|
| **P0** | 永久 | 错误、教训、核心决策、重大洞察 |
| **P1** | 90 天 | 重要进展、工作里程碑 |
| **P2** | 30 天 | 常规记录、临时数据 |

---

## 标记文件生命周期

在 daily 文件开头添加：

```markdown
---
lifecycle: P1  # P0/P1/P2
tags: [observer, ultrawork]
---

# 文件内容
```

**P0 示例**：
- 包含错误、教训的记录
- WAL 协议相关
- 核心机制决策

**P1 示例**：
- 重要工作进展
- 系统重构
- 人格/工作模式变化

**P2 示例**：
- 日常工作记录
- 临时想法
- 待办事项

---

## 集成到 Command

### observer

```bash
# 写 daily 后
python3 memory/tasks/scripts/index_manager.py --action update-daily

# 写 observations 后
python3 memory/tasks/scripts/index_manager.py --action update-obs
```

### UPDATE_MEMORY

```bash
# 生命周期检查
python3 memory/tasks/scripts/lifecycle_manager.py --action check

# 更新所有索引
python3 memory/tasks/scripts/index_manager.py --action update-all

# 清理超期文件
python3 memory/tasks/scripts/lifecycle_manager.py --action cleanup
```

---

*最后更新：2026-02-23 — 加入自动化生长规则*
