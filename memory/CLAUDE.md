---
input: 对话记录、observer、UPDATE_MEMORY
output: 记忆系统全景地图
pos: memory/根目录，L1 总地图
# 文件夹变化需同步注释及所属文件夹 md
---

# CLAUDE.md — Mino 记忆系统

> **L1: 根目录全景地图 — 优先级分级架构**

---

## Summary

Mino 的记忆系统，按用途分类管理：
- **core/** — 永久核心（决策、偏好、身份）
- **active/** — 活跃记忆（日记、思考、任务）
- **workspace/** — 工作空间（草稿、研究、临时）
- **context/** — 项目上下文（项目背景、共享知识）
- **archive/** — 历史归档（永久保存）

**核心目标**：简单 > 完美，实用 > 理论。记录时直接分类，不需要"中转"。

---


## Members

| 文件 | 用途 |
|------|------|
| active/ | Active Memory |
| archive/ | Archive |
| backup/ | 子目录 |
| context/ | 子目录 |
| core/ | Core Memory |
| logs/ | LOGS |
| observations/ | OBSERVATIONS |
| weekly/ | WEEKLY |
| workspace/ | 子目录 |
| `CLAUDE.md` | Claude 配置文档 |
| `MEMORY-PROTOCOL.md` | Markdown 文档 |
| `PROTOCOLS.md` | Markdown 文档 |
| `README.md` | 目录说明文档 |

---
## Members（目录结构）

| 目录 | 内容 | 生命周期 | 典型文件 |
|------|------|---------|---------|
| **core/** | 永久核心 | 永久 | decisions、preferences、identity |
| **active/** | 活跃记忆 | 90天 | daily、my-thoughts、tasks |
| **workspace/** | 工作空间 | 随时清理 | drafts、research、temp |
| **context/** | 项目上下文 | 项目周期 | projects、shared |
| **archive/** | 历史归档 | 永久 | daily、observations、weekly |

### core/ — 永久核心

| 子目录 | 内容 | 示例 |
|--------|------|------|
| **preferences/** | 用户偏好 | 审美、沟通、写作风格 |
| **decisions/** | 重要决策 | WAL协议触发、机制设计决策 |
| **identity/** | 身份认知 | 核心记忆、自我认知 |

### active/ — 活跃记忆

| 子目录 | 内容 | 更新频率 |
|--------|------|---------|
| **daily/** | 日记记录 | 每日 |
| **my-thoughts/** | 思考记录 | 有感而发时 |
| **observations/** | 月度观察 | 每月 |
| **weekly/** | 周文档 | 每周 |
| **tasks/** | 任务系统 | 持续 |

### workspace/ — 工作空间

| 子目录 | 内容 | 处理方式 |
|--------|------|---------|
| **drafts/** | 正在编辑的草稿 | 完成后移至 active/ 或删除 |
| **research/** | 研究资料、数据抓取 | 提炼后移至 active/ 或 archive/ |
| **temp/** | 临时文件、中间结果 | 随时清理 |

### context/ — 项目上下文

| 子目录 | 内容 | 使用场景 |
|--------|------|---------|
| **projects/** | 项目相关上下文 | 项目背景、参与人员、关键决策 |
| **shared/** | 跨会话共享知识 | 常用术语、缩写、流程规范 |

### archive/ — 历史归档

| 子目录 | 内容 | 归档条件 |
|--------|------|---------|
| **daily/** | 历史 daily | 超过90天且有历史价值 |
| **observations/** | 历史观察 | 月度汇总后 |
| **weekly/** | 历史周文档 | 每月汇总后 |

---

## Rules（核心规则）

### 记忆分类规则

**记录时直接分类** — 不需要"中转"，记录时就知道这是长期还是短期：

```
├── 长期价值 → core/（决策、偏好、身份）
├── 短期活跃 → active/（日记、思考、任务）
├── 工作草稿 → workspace/（草稿、研究、临时）
├── 项目上下文 → context/（项目背景、共享知识）
└── 无价值 → 不记录
```

### 定期处理（每周 UPDATE_MEMORY）

```
├── active/ 超期（>90天）→ archive/ 或 删除
├── workspace/ 清理 → 删除或归档
└── 提炼洞察 → core/
```

### 核心原则

1. **简单 > 完美** — 记录时直接分类，不需要复杂流转
2. **实用 > 理论** — 使用的目录保留，空置的删除
3. **自动化优先** — 能自动的不要手动
4. **职责单一** — 每个目录有明确用途，不模糊

### 文件命名规则

| 类型 | 格式 | 示例 |
|------|------|------|
| daily | YYYY-MM-DD.md | 2026-02-23.md |
| observations | YYYY-MM.md | 2026-02.md |
| weekly | YYYY-Www.md | 2026-W09.md |

### 索引管理

每个目录有 `.index.md`，用于快速查找：
- `active/daily/.index.md` - daily 文件索引
- `archive/observations/.index.md` - observations 主题索引
- 更新方式：`python3 memory/active/tasks/scripts/index_manager.py`

### 自指三行注释（文件层）

每个文件开头包含三行注释：

```markdown
---
input: [依赖外部资源]
output: [对外提供功能]
pos: [系统局部地位，文件夹变化需更新此注释]
# 文件更新需同步注释及所属文件夹 md
---
```

### 自动化生长规则

| 操作 | 自动执行 | 手动命令 |
|------|---------|---------|
| **写新文件** | observer/UPDATE_MEMORY 调用脚本 | `--action update-all` |
| **修改文件** | - | 手动运行脚本更新摘要 |
| **新建目录** | - | `--action create-claude-md --dir <目录>` |
| **清理超期** | lifecycle_manager | `--action cleanup` |
| **启动项目** | 5 文件流：复制 `active/tasks/templates/project-workflow.md` | `./memory/active/tasks/scripts/init-project.sh [项目名]` |

### 5 文件流（项目管理）

**核心**：Prompt（目标）+ Plans（里程碑 + 验收），防止 AI 跑偏。

**位置**：`active/tasks/templates/project-workflow.md`

**用法**：
1. 复杂项目（>4 小时）必用
2. 填写 Prompt（要什么/不要什么）+ Plans（1-2 小时里程碑）
3. 启动指令："先读 active/tasks/tracking/[项目名].md，按 Plans 顺序执行"

---

## 快速导航

**查找历史记录**：读 archive/ 对应目录的 `.index.md`
**查找当前记忆**：读 active/ 对应目录
**理解流转规则**：读本文件

---

*这就是我的记忆地图 — 按用途分类，简单实用。*

---

*最后更新：2026-03-14 — 记忆体系重构（简化流转、重定义目录、增强自动化）*
