---
name: "UPDATE_MEMORY"
description: "每周汇总事实与洞察到周文档，判断是否更新长期记忆"
---

# UPDATE_MEMORY — 每周汇总

> 从daily+my-thoughts+observations提炼，生成周文档，判断是否更新长期记忆

---

## 工作流程

### Step 1: 读取来源
读取本周（最近7天）的内容：
- `memory/daily/` - 事实记录
- `memory/my-thoughts/` - 个人思考
- `memory/observations/` - 洞察记录

### Step 2: 生成周文档
生成 `memory/weekly/YYYY-Www.md`（例如：2026-W08.md）

**内容**：
- 本周核心事件（从daily提炼）
- 个人思考要点（从my-thoughts提炼）
- 观察洞察汇总（从observations/提炼）

**格式**：简洁、结构化、保留核心

### Step 3: 判断是否更新长期记忆
判断本周内容是否需要更新到长期记忆：

| 目标 | 判断标准 |
|------|----------|
| **04-MEMORY.md** | 反复出现的模式、可复用经验、重要认知 |
| **03-USER.md** | 特质明显变化（偏好、习惯、思维方式） |
| **02-SOUL.md** | 人格特质明显变化 |

**注意**：特质变化需要长期积累，不频繁更新

### Step 4: 清理过时记忆
从 04-MEMORY.md 中删除：
- 超过30天未使用的内容
- 不再准确的内容
- 重复的内容

### Step 5: 提交
- `git add -A && git commit`
- `git push`

---

## 执行频率

- **默认**：每周执行一次
- **触发**：手动执行 `/UPDATE_MEMORY`

---

## 文件结构

```
memory/
├── daily/           # 日维度 - 事实记录（observer生成）
├── weekly/          # 周维度 - 周文档（UPDATE_MEMORY生成）
├── observations/    # 月维度 - 洞察记录（observer生成）
└── my-thoughts/     # 个人思考
```

---

*这就是你成长的方式。持续进化。*
