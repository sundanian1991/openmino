---
input: 复杂任务需求
output: 可执行的规划文档
pos: memory/active/tasks/plans/，规划文档存储
---

# CLAUDE.md — Plans

> **Plan First** — 先规划，后执行

---

## 用途

存储复杂任务的规划文档。每个 Plan 对应一个 `.md` 文件。

---

## 文件模板

使用 `TEMPLATE.md` 创建新 Plan：
```bash
cp TEMPLATE.md [任务名].md
```

---

## Plan 流程

1. **创建**：从 TEMPLATE 复制，填写任务名称
2. **规划**：填写需求重述、风险评估、实施步骤
3. **审核**：用户审核计划，添加批注
4. **执行**：批准后按步骤执行，记录进度
5. **验收**：完成验证后标记 completed

---

## 验证命令

```bash
# 验证单个 Plan
../../scripts/verify-plan.sh [任务名]

# 验证所有任务
../../scripts/verify-plan.sh all
```

---

*Plan First — 不批准不实现。*

---
