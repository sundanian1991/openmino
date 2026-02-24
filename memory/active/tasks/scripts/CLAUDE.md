---
input: 自动化需求、索引更新触发
output: Python 管理脚本（索引、生命周期）
pos: active/tasks/的子模块，L3 脚本工具
# 文件夹变化需同步注释及所属文件夹 md
---

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
3. 文件头加三行注释（input/output/pos）
4. 更新本文件的 Members 表格
5. 在 observer 或 UPDATE_MEMORY 中集成调用

### Python 文件头规范

```python
#!/usr/bin/env python3
"""
{脚本名称}
input: [依赖外部资源，如文件、配置]
output: [对外提供功能，如索引更新、清理]
pos: scripts 目录的成员，文件夹变化需更新此注释
# 文件更新需同步注释及所属文件夹 md
"""
```

---

*自动化，从这里开始。*

---

*最后更新：2026-02-23*