---
input: 07-WORK.md 任务管理规则
output: Active Tasks 管理
pos: memory/active/tasks/active/ 当前活跃任务
---

# Active Tasks

> 当前正在进行的复杂任务（≥4步）

---

## 文件结构

```
active/
└── [task-name]/
    ├── plan.md           # 规划文档（使用 TEMPLATE.md 或 SIMPLE-TEMPLATE.md）
    ├── context.md        # 关键文件、决策记录、依赖关系
    └── tasks.md          # 可验证的检查清单
```

---

## 文件职责

| 文件 | 内容 | 更新时机 |
|------|------|---------|
| **plan.md** | 需求重述、风险评估、实施步骤、验证方案 | 创建时、重大变更时 |
| **context.md** | 相关文件路径、技术决策、依赖关系、遇到的问题 | 发现新信息时 |
| **tasks.md** | 可验证的检查清单，每步完成后打 ✅ | 每步完成时 |

---

## 何时创建

**强制条件**（满足任意一条）：
- 步骤 ≥4 步
- 涉及删除/覆盖/不可逆操作
- 新功能实现（多个组件、复杂交互）
- 架构级修改（影响多个文件）
- 有多种可行方案需要权衡

**简单任务**（≤3步）→ 直接执行，更新 `../todo.md`

---

## 生命周期

```
创建任务（Plan First）
    ↓
创建 active/[task-name]/plan.md
    ↓
用户批准
    ↓
创建 context.md + tasks.md
    ↓
执行中（更新 tasks.md ✅）
    ↓
完成并验证
    ↓
移动到 archive/ 或删除
```

---

## 状态标记

在 `plan.md` 顶部标记状态：
```markdown
> ⚠️ **状态**: [Planning | Approved | Implementing | Completed | Archived]
```

---

*创建时间：2026-03-01*

---

**相关链接**：[[../../../../index/任务系统]]（任务导航）

---

## 相关链接

- [[../../../index/任务系统]] — Plan First 任务跟踪
