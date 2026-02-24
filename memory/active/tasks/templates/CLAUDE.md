# CLAUDE.md — Templates 模板

> **L3: templates 模块说明**

---

## Summary

模板文件。用于快速创建标准化文档。

---

## Members

| 文件 | 用途 |
|------|------|
| **project-workflow.md** | 5 文件流项目模板（Prompt/Plans/Architecture/Implement/Documentation） |
| **work-log.md** | 工作日志模板 |
| **risk-checklist.md** | 风险检查清单 |
| **career-ledger.md** | 职业资产台账 |

---

## Rules

### 使用方式

创建新文件时，从模板复制结构，填充内容。

### 项目启动（核心）

**复杂项目（>4 小时）必用 `project-workflow.md`**：

1. 复制到 `../tracking/[项目名].md`
2. 填写 **Prompt**（要什么/不要什么）+ **Plans**（1-2 小时里程碑 + 验收命令）
3. 启动指令："先读 active/tasks/tracking/[项目名].md，按 Plans 顺序执行"

**脚本快捷启动**：
```bash
./memory/active/tasks/scripts/init-project.sh [项目名]
```

### 新增模板

当发现重复的文档结构时：
1. 提取公共结构
2. 在 templates/ 下新建模板文件
3. 在对应模块的 CLAUDE.md 中说明使用场景

---

*模板，提效工具。*

---

*最后更新：2026-02-23*