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

### Step 4: 生命周期检查（新增）
检查daily文件的生命周期状态：

| 生命周期 | 保留周期 | 操作 |
|---------|---------|------|
| P0 | 永久 | 保留，不删除 |
| P1 | 90天 | 检查是否超期，超期则清理 |
| P2 | 30天 | 超期则删除（重要内容已提炼到周文档） |

**执行**：
```bash
python3 memory/tasks/scripts/lifecycle_manager.py --action check
python3 memory/tasks/scripts/lifecycle_manager.py --action cleanup --dry-run
```

### Step 5: 更新索引（新增）
使用索引管理脚本更新`.index`文件：

```bash
# 更新daily索引
python3 memory/tasks/scripts/index_manager.py --action update-daily

# 更新observations索引
python3 memory/tasks/scripts/index_manager.py --action update-obs
```

### Step 6: 清理过时记忆
从 04-MEMORY.md 中删除：
- 超过30天未使用的内容
- 不再准确的内容
- 重复的内容

### Step 7: 提交
- `git add -A && git commit`
- `git push`

---

## 记忆流转规则

### daily → observations
**触发条件**：
- 同一洞察出现≥3次
- 或有人格/工作模式层面价值
- 或我观察到年老师的独特行为模式

**执行**：
- 从daily提取有价值的观察
- 记录到observations/当月.md
- 按三个维度：需求洞察、模式识别、我的复盘

### observations → 长期记忆
**触发条件**：
- 洞察稳定≥30天
- 或经年老师确认重要
- 或能解释年老师的某个行为

**判断标准**：
- 这个洞察是否改变了我对他的理解？
- 这个洞察是否能指导未来的工作？
- 这个洞察是否反复出现？

**执行**：
- 更新03-USER.md（关于年老师的观察）
- 更新02-SOUL.md（人格特质变化）
- 或更新04-MEMORY.md（可复用经验）

---

## 执行频率

- **默认**：每周执行一次
- **触发**：手动执行 `/UPDATE_MEMORY`

---

## 文件结构

```
memory/
├── daily/           # 日维度 - 事实记录（observer生成）
│   └── .index.md    # 快速索引（脚本更新）
├── weekly/          # 周维度 - 周文档（UPDATE_MEMORY生成）
├── observations/    # 月维度 - 洞察记录（observer生成）
│   └── .index.md    # 快速索引（脚本更新）
├── tasks/scripts/   # 管理脚本
│   ├── index_manager.py    # 索引更新脚本
│   ├── lifecycle_manager.py # 生命周期管理脚本
│   └── README.md            # 脚本使用指南
└── my-thoughts/     # 个人思考
```

---

## 脚本使用

### 更新索引
```bash
python3 memory/tasks/scripts/index_manager.py --action update-daily
python3 memory/tasks/scripts/index_manager.py --action update-obs
```

### 生命周期检查
```bash
python3 memory/tasks/scripts/lifecycle_manager.py --action check
python3 memory/tasks/scripts/lifecycle_manager.py --action cleanup
```

---

## 生命周期标记

每个daily文件开头应标注生命周期：

```markdown
---
lifecycle: P1  # P0=永久, P1=90天, P2=30天
tags: [obsidian-claude, ultrawork]
---
```

---

*这就是你成长的方式。持续进化。*
