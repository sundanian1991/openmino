---
name: "update-memory"
description: "每周汇总事实与洞察到周文档，判断是否更新长期记忆"
---

# update-memory — 每周汇总

> 从daily+my-thoughts+observations提炼，生成周文档，判断是否更新长期记忆

---

## 工作流程

### Step 1: 读取来源
读取本周（最近7天）的内容：
- `memory/active/daily/` - 事实记录
- `memory/active/my-thoughts/` - 个人思考
- `memory/active/observations/` - 洞察记录

### Step 2: 生成周文档
生成 `memory/active/weekly/YYYY-Www.md`（例如：2026-W08.md）

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

### Step 4: 更新索引（手动）
创建新 daily 文件时，手动更新索引：

```markdown
| 文件名 | 日期 | 生命周期 | 标签 | 备注 |
|--------|------|---------|------|------|
| 2026-03-07.md | 2026-03-07 | P2 | 上下文优化, Skills懒加载 | - |
```

**更新时机**：
- 创建新 daily 文件时
- UPDATE_MEMORY 执行时

### Step 5: 生命周期检查（手动）
检查 daily 文件的生命周期状态：

| 生命周期 | 保留周期 | 操作 |
|---------|---------|------|
| P0 | 永久 | 保留，不删除 |
| P1 | 90天 | 检查是否超期，超期则清理 |
| P2 | 30天 | 超期则删除（重要内容已提炼到周文档） |

**检查方式**：
1. 查看 daily 文件的修改日期
2. 对比当前日期，判断是否超过保留周期
3. 删除过期文件
4. 从 `.index.md` 中移除对应记录

### Step 6: 清理过时记忆
从 04-MEMORY.md 中删除：
- 超过30天未使用的内容
- 不再准确的内容
- 重复的内容

### Step 7: 提交
- `git add <相关文件>`
- `git commit -m "chore: UPDATE_MEMORY Week XX"`
- `git push`

---

## 定期清理提醒

**每月清理**（建议每月1日）：
- [ ] 检查 P2 文件是否超过 30 天
- [ ] 检查 P1 文件是否超过 90 天
- [ ] 删除过期文件
- [ ] 更新索引
- [ ] 清理 04-MEMORY.md 中的过时内容

---

## 记忆流转规则

### daily → observations
**触发条件**：
- 同一洞察出现≥3次
- 或有人格/工作模式层面价值
- 或我观察到年老师的独特行为模式

**执行**：
- 从 daily 提取有价值的观察
- 记录到 memory/active/observations/当月.md
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
- **手动触发**：`/update-memory`
- **自动执行**：每周一早上9点（launchd 定时任务）

### 自动化执行（2026-03-14 新增）

**脚本**：`scripts/auto-update-memory.sh`

**功能**：
- 检查超期文件（lifecycle_manager）
- 归档超期文件到 archive/
- 自动更新索引
- 记录执行日志

**配置**：
- 文件：`~/Library/LaunchAgents/com.mino.update-memory.plist`
- 时间：每周一早上9点
- 日志：`memory/logs/update-memory.log`

**启用**：
```bash
# 加载定时任务
launchctl load ~/Library/LaunchAgents/com.mino.update-memory.plist

# 验证已加载
launchctl list | grep com.mino.update-memory

# 手动测试
./scripts/auto-update-memory.sh
```

**详细说明**：`memory/logs/AUTO-UPDATE-SETUP.md`

---

## 文件结构

```
memory/
├── active/
│   ├── daily/           # 日维度 - 事实记录（observer生成）
│   │   └── .index.md    # 快速索引（手动更新）
│   ├── weekly/          # 周维度 - 周文档（update-memory生成）
│   ├── observations/    # 月维度 - 洞察记录（observer生成）
│   │   └── .index.md    # 快速索引（手动更新）
│   └── my-thoughts/     # 个人思考
└── core/                # 永久记忆
```

---

## 生命周期标记

每个 daily 文件开头应标注生命周期和自指三行：

```markdown
---
lifecycle: P1  # P0=永久，P1=90 天，P2=30 天
tags: [obsidian-claude, ultrawork]
input: 当日对话记录、涉及文件路径
output: 事实摘要、可供 observations 提炼洞察
pos: daily 目录的成员
# 文件更新需同步注释及所属文件夹 md
---
```

**三行说明**：
- `input`：依赖外部资源（对话、文件）
- `output`：对外提供功能（事实记录、洞察来源）
- `pos`：系统局部地位（daily 目录成员）

---

## 索引维护

### 创建 daily 文件时
1. 创建文件：`memory/active/daily/YYYY-MM-DD.md`
2. 添加到索引：编辑 `.index.md`
3. 格式：`| 文件名 | 日期 | 生命周期 | 标签 | 备注 |`

### 清理过期文件时
1. 删除文件：`rm memory/active/daily/YYYY-MM-DD.md`
2. 从索引移除：编辑 `.index.md`
3. 删除对应行

---

*这就是你成长的方式。持续进化。*
