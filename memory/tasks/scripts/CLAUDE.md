# CLAUDE.md — Scripts 管理脚本

> **L3: scripts 模块说明**

---

## Summary

Python 管理脚本。自动化记忆系统的索引更新和生命周期管理。

---

## Members

| 脚本 | 功能 |
|------|------|
| **index_manager.py** | 更新 daily/observations 索引 |
| **lifecycle_manager.py** | 检查/清理超期文件 |
| **README.md** | 使用说明 |

---

## Rules

### 调用方式

```bash
# 更新 daily 索引
python3 memory/tasks/scripts/index_manager.py --action update-daily

# 更新 observations 索引
python3 memory/tasks/scripts/index_manager.py --action update-obs

# 检查超期文件
python3 memory/tasks/scripts/lifecycle_manager.py --action check

# 清理超期文件
python3 memory/tasks/scripts/lifecycle_manager.py --action cleanup

# 查看统计
python3 memory/tasks/scripts/lifecycle_manager.py --action stats
```

### 集成位置

| Command | 脚本调用 |
|---------|---------|
| **observer** | 写 daily 后 → `update-daily`<br>写 observations 后 → `update-obs` |
| **UPDATE_MEMORY** | 生命周期检查 → `check`<br>更新全部索引 → `update-daily` + `update-obs`<br>清理超期 → `cleanup` |

### 新增脚本

创建新脚本时：
1. 在 scripts/ 下新建 .py 文件
2. 支持 `--action` 参数区分功能
3. 更新本文件的 Members 表格
4. 在 observer 或 UPDATE_MEMORY 中集成调用

---

*自动化，从这里开始。*

---

*最后更新：2026-02-23*