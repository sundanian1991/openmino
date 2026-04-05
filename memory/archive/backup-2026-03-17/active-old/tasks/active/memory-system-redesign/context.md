---
input: 现有文档、代码分析
output: 关键上下文和依赖
pos: context 文档，提供背景信息
---

# Context — 记忆体系重构

> **关键上下文和依赖关系**

---

## 相关文件

| 文件 | 作用 | 依赖 |
|------|------|------|
| **memory/CLAUDE.md** | 记忆体系总地图 | 需要更新 |
| **04-MEMORY.md** | 长期记忆（L2-L5区） | 需要更新新目录结构 |
| **UPDATE_MEMORY.md** | 每周汇总流程 | 需要增强自动化 |
| **lifecycle_manager.py** | 生命周期管理脚本 | 需要增强归档功能 |
| **index_manager.py** | 索引管理脚本 | 需要增强自动更新 |

---

## 现有机制

### 1. Observer 机制
- **位置**：`.claude/commands/observer.md`
- **触发**：手动执行 `/observer`
- **输出**：
  - `memory/active/daily/YYYY-MM-DD.md`（事实记录）
  - `memory/active/observations/YYYY-MM.md`（洞察记录）

### 2. UPDATE_MEMORY 机制
- **位置**：`.claude/commands/UPDATE_MEMORY.md`
- **触发**：手动执行 `/UPDATE_MEMORY`
- **输出**：`memory/active/weekly/YYYY-Www.md`

### 3. 生命周期管理
- **位置**：`memory/active/tasks/scripts/lifecycle_manager.py`
- **触发**：手动执行 `python lifecycle_manager.py check/cleanup`
- **配置**：
  - P0：永久
  - P1：90天
  - P2：30天

---

## 当前数据状态

### Active 目录
- `daily/`：最近记录至 2026-03-14
- `observations/`：2026-03 更新
- `weekly/`：2026-W10（3月6日）

### Archive 目录
- 有历史文件，但未定期更新

### 待处理
- `active/daily/2026-02-13.md` — 超过30天，需归档
- 多个 P2 文件需清理

---

## 技术约束

### 1. Claude Code 自动化限制
- 不能直接用 cron（需要通过 launchd）
- command 调用需要通过 CLI

### 2. Git 安全
- 所有删除操作前先 commit
- 删除目录前先备份

### 3. 向后兼容
- 保持 core/ 和 active/ 结构不变
- 只重构 staging/transient/context

---

## 用户偏好（来自 04-MEMORY.md）

| 偏好 | 说明 |
|------|------|
| **"具体化"要求** | 文件目录要有明确用途，不能模糊 |
| **"整理到一个表里"** | 偏好表格化、结构化的展示 |
| **可靠性** | 宁可保守，不要激进 |

---

## 决策记录

### 为什么删除 staging/
- **理由**：实际从未使用，流转链太复杂
- **替代**：workspace/ 直接用于工作文件

### 为什么重定义 context/
- **理由**：原有模板文件无意义
- **新用途**：项目上下文，跨会话共享知识

### 为什么合并 transient/ 到 workspace/temp/
- **理由**：transient 概念太抽象
- **新用途**：明确是临时文件，随时清理

---

*最后更新：2026-03-14*

---

## 相关链接

- [[../../../../index/任务系统]] — Plan First 任务跟踪
- [[../../../../index/记忆系统]] — 记忆体系导航
