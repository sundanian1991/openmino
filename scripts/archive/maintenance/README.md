---
input: [维护脚本使用说明]
output: [命令参考、最佳实践]
pos: [scripts/maintenance/README.md，维护脚本入口]
---

# 维护脚本使用说明

> L3 智能自动层 - 按需运行的维护脚本

---

## 脚本列表

| 脚本 | 功能 | 输出 |
|------|------|------|
| **health-checks.js** | 知识库健康检测 | `ops/queue/health-report.json` |
| **auto-maintenance.js** | 自动维护任务触发 | `ops/queue/queue.json` |

---

## 健康检查 (health-checks.js)

### 运行方式

```bash
# 方式 1：直接运行
node scripts/maintenance/health-checks.js

# 方式 2：通过 npm script（如果配置了）
npm run health-check
```

### 输出报告

```json
{
  "timestamp": "2026-03-15T06:09:34.368Z",
  "summary": {
    "totalNotes": 852,
    "healthScore": 0,
    "orphans": 700,
    "stale": 0,
    "dangling": 73
  },
  "details": {
    "orphans": [...],
    "stale": [...],
    "dangling": [...]
  }
}
```

### 健康分数计算

```
健康分数 = 100 - (orphanRate * 30 + staleRate * 40 + danglingRate * 30)

权重分配：
- Orphan Notes: 30%
- Stale Notes: 40%
- Dangling Links: 30%
```

---

## 自动维护 (auto-maintenance.js)

### 运行方式

```bash
# 根据健康报告生成维护任务
node scripts/maintenance/auto-maintenance.js
```

### 任务队列

```json
{
  "tasks": [
    {
      "id": "task_1773554984885_hap8ibsgk",
      "type": "maintenance",
      "subtype": "orphan_notes",
      "command": "/connect",
      "status": "pending",
      "priority": "medium",
      "reason": "700 个笔记没有 incoming links（阈值：5）"
    }
  ],
  "alerts": [...]
}
```

---

## 配置阈值 (ops/config.yaml)

```yaml
maintenance:
  thresholds:
    orphan_notes: 5      # Orphan notes > 5 → 触发 /connect
    stale_notes: 10      # Stale notes > 10 → 触发 /maintain
    dangling_links: 3    # Dangling links > 3 → 提醒用户
    health_score_min: 60 # 健康分数 < 60 → 提醒用户
```

---

## 工作流程

### 定期维护（推荐每周）

```bash
# 1. 运行健康检查
node scripts/maintenance/health-checks.js

# 2. 查看健康报告
cat ops/queue/health-report.json | jq '.summary'

# 3. 如果健康分数 < 60，运行自动维护
node scripts/maintenance/auto-maintenance.js

# 4. 查看任务队列
cat ops/queue/queue.json | jq '.tasks[] | select(.status == "pending")'

# 5. 根据建议运行维护命令
/connect    # 连接孤立笔记
/maintain   # 审查过期笔记
```

---

## 与 Ars Contexta 集成

Ars Contexta 的 `/arscontexta:health` 命令会调用这些脚本，提供更友好的交互界面。

---

*最后更新：2026-03-15*
