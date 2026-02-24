---
pos: docs/plans.md
input: prompt.md 定义的目标
output: 可执行的里程碑计划
update: 每个阶段完成后更新
---

# 任务计划：my-agent 文档同步

## 里程碑

### Phase 1: 检查缺失文档

**任务**：
- [x] 扫描所有一级文件夹是否有 README/CLAUDE
- [x] 扫描二级文件夹
- [x] 扫描所有 .md 文件是否有头注释

**验收命令**：
```bash
# 运行检查脚本
.scripts/check-docs-sync.sh
# 预期：列出所有缺失项
```

**状态**：`completed`

---

### Phase 2: 补齐缺失文档

**任务**：
- [x] 创建缺失的文件夹 README
- [x] 补充缺失的文件头注释

**验收命令**：
```bash
.scripts/check-docs-sync.sh
# 预期：所有检查项 ✅
```

**状态**：`completed`

---

### Phase 3: 建立同步机制

**任务**：
- [x] 创建 check-docs-sync.sh 脚本
- [x] 配置 Git pre-commit hook
- [x] 更新项目 CLAUDE.md

**验收命令**：
```bash
# 检查 CLAUDE.md 是否包含同步规则
grep -A10 "文档同步" CLAUDE.md
```

**状态**：`completed`

---

## 架构变更记录

| 日期 | 变更内容 | 理由 | 是否回滚 |
|------|----------|------|----------|
| 2026-02-24 | 初始化五文件工作流 | /plan5 执行 | 否 |

> 规则：架构变更必须更新此文档，禁止静默修改

---

## 遇到的问题

| 问题 | 解决方案 | 状态 |
|------|----------|------|
| 545 个文件缺头注释 | Bash 批量补充 | ✅ |
| 17 个文件夹缺 README | 批量创建模板 | ✅ |

---

*规则：验证不通过，禁止进入下一阶段*
