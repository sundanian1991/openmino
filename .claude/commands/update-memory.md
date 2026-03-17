---
name: "update-memory"
description: "每周汇总事实与洞察，判断是否更新长期记忆"
---

# update-memory — 每周汇总

> 从insights.md提炼，判断是否更新长期记忆

---

## 工作流程

### Step 1: 读取来源

读取 `memory/insights.md` 中本周的内容

### Step 2: 判断是否更新 MEMORY.md

判断本周内容是否需要更新到 `memory/MEMORY.md`：

| 更新目标 | 判断标准 |
|----------|----------|
| 用户画像 | 偏好、习惯明显变化 |
| 当前待办 | 有新增或完成的待办 |
| 关键决策 | 有重要决策记录 |
| 项目索引 | 有新项目或项目状态变化 |

### Step 3: 清理过时记忆

从 MEMORY.md 中删除：
- 已完成的待办
- 不再准确的决策
- 重复的内容

### Step 4: 提交

```bash
git add -A && git commit -m "chore: update-memory weekly"
git push
```

---

## 定期清理提醒

**每月清理**（建议每月1日）：
- [ ] 检查MEMORY.md中的待办是否已完成
- [ ] 清理已过时的决策
- [ ] 归档insights.md中超过90天的内容

---

## 文件结构

```
memory/
├── MEMORY.md     # 详细记忆索引（启动加载）
├── insights.md   # 洞察记录
├── projects/     # 项目背景
└── archive/      # 历史归档
```

---

## 执行频率

- **默认**：每周执行一次
- **手动触发**：`/update-memory`

---

*最后更新：2026-03-17 — 简化结构*