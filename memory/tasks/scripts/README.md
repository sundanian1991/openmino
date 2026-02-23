# 记忆管理脚本使用指南

> 自动维护.index索引文件，管理P0/P1/P2生命周期

---

## 脚本列表

| 脚本 | 功能 |
|------|------|
| `index_manager.py` | 更新daily和observations索引 |
| `lifecycle_manager.py` | 检查和清理超期文件 |

---

## 使用方法

### 1. 更新索引

```bash
# 更新daily索引
python3 memory/tasks/scripts/index_manager.py --action update-daily

# 更新observations索引
python3 memory/tasks/scripts/index_manager.py --action update-obs

# 按标签查询
python3 memory/tasks/scripts/index_manager.py --action query --tags observer ultrawork
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

## 生命周期规则

| 标签 | 保留周期 | 触发条件 |
|------|---------|---------|
| **P0** | 永久 | 错误、教训、核心决策、重大洞察 |
| **P1** | 90天 | 重要进展、工作里程碑 |
| **P2** | 30天 | 常规记录、临时数据 |

---

## 标记文件生命周期

在daily文件开头添加：

```markdown
---
lifecycle: P1  # P0/P1/P2
tags: [observer, ultrawork]
---

# 文件内容
```

**P0示例**：
- 包含错误、教训的记录
- WAL协议相关
- 核心机制决策

**P1示例**：
- 重要工作进展
- 系统重构
- 人格/工作模式变化

**P2示例**：
- 日常工作记录
- 临时想法
- 待办事项

---

## 集成到UPDATE_MEMORY

UPDATE_MEMORY命令执行时，会：

1. 更新daily/.index
2. 更新observations/.index
3. 检查超期P2文件
4. 清理超期文件（预览模式，需确认）

---

*最后更新：2026-02-23*