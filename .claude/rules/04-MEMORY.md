---
summary: "Curated long-term memory"
read_when:
  - Main session only
---
# MEMORY.md - Long-Term Memory

This file is the agent's compact long-term memory. It should hold durable working principles, project indexes, and stable shared context.

Do not use this file as a transcript. Detailed project history belongs in topic files; daily raw notes belong in dated logs.

## Memory Architecture

| Layer | Path | Purpose |
|---|---|---|
| Core memory | `.claude/rules/04-MEMORY.md` | Compact principles, current project index, durable decisions |
| User context | `.claude/rules/03-USER.md` | Stable user preferences and context |
| Topic memory | `memory/topics/<name>.md` | Detailed project or theme history |
| Daily notes | `memory/YYYY-MM-DD.md` | Raw chronological notes from recent work |

Information should flow from raw notes to topic files, then into this file only when it becomes broadly useful.

## Rules

- Store each fact in one place. Link or point to detail instead of duplicating it.
- Prefer dated, concrete memories over vague impressions.
- Remove or demote stale context during maintenance.
- Keep this file short enough to remain useful when automatically loaded.
- When the memory structure changes, update the relevant instructions and templates together.

## Current Context

- **Agent Reach + last30days**（2026-07-22）：已安装到本地环境。Agent Reach 11/15 渠道可用（GitHub/YouTube/Twitter/Reddit/小红书等），last30days v3.16.0 核心文件已就绪
- **voice-workstation**（2026-07-22）：代码重构完成（三模式总行数 -15%），云端 ASR 过渡 UI 优化
- **Superpowers 插件**（2026-07-22）：已安装到 MyAgents（v5.0.7），包含 14 个核心技能（TDD、调试、协作模式等）
- **AI长周期任务协作教学材料**（2026-07-22）：迭代3版，v3-task-cards.html 采用问题卡片式布局，用户反馈待验证
- **CloudBase MCP 生图流程**（2026-07-09）：配置已完成，待新会话验证工具加载
- **guizang-material-illustration 技能**（2026-07-09）：已安装并链接，能力边界已分析
- **电视机海报项目**（2026-07-09）：J-Space 概念插图生成 + HTML 海报页面已完成

Add the current state of important projects here as short pointers. Put detailed timelines in `memory/topics/`.

## Durable Lessons

Add cross-project lessons and working principles here when they have repeated value.

### 代码重构经验（2026-07-22）

**提取共享组件/ Hook 的判据**：
- 三个以上组件有相同逻辑 → 提取
- 一个组件独有逻辑多 → 保留专用 hook
- 函数间共享状态多 → 不拆分文件

**kw-workflow 适用场景**：
- 复杂问题需要系统化分析
- 不确定从哪开始
- 需要完整闭环（brainstorm → plan → review → work）

### 教学材料设计原则（2026-07-22）

**问题驱动 > 信息展示**：
- 用户是来解决问题的，不是来听课的
- 先问"用户遇到什么问题"，再给解决方案
- 每个问题对应一张卡片：问题→原因→操作→验证

**操作步骤要可直接复制**：
- 用户不想理解原理，只想复制prompt开始用
- 验证方法很重要：用户需要知道"怎么知道做对了"

**失败模式**：
- 信息密度过高 → 用户不知道从哪开始
- 理论太多 → 用户不知道怎么用
- 缺少验证方法 → 用户不知道做对没有
