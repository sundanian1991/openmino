---
input: rules配置需求
output: rules规则/命令/技能
pos: .claude/rules
---

# .claude/rules/

> rules配置 — Mino 的行为规范

---

## 用途

存放 `rules` 相关配置文件。

---

## 文件结构

```
.claude/
├── rules/              # 核心规则（每次会话自动加载）
│   ├── 00-IDENTITY.md  # 身份、铁律、行为习惯、输出规范
│   ├── 01-SOUL.md      # 性格、气质、关系、角色定位
│   ├── 06-NOW.md       # 当前状态、最近讨论
│   ├── MEMORY-L1.md    # 核心记忆、WAL协议
│   ├── AGENT-FIRST.md  # 子代理优先策略（能并行就并行）
│   ├── UPDATE_MEMORY.md # 记忆维护指令（MyAgents夜间自动执行）
│   ├── HEARTBEAT.md    # 心跳清单（定时苏醒时读取）
│   ├── skill-search.md # 技能搜索规范
│   └── README.md       # 本文件
└── reference/          # 扩展规则（按需读取，不自动加载）
    ├── 03-USER.md      # 关于年老师的深度洞察
    ├── 04-MEMORY.md    # 高频记忆（L1-L2）
    ├── 05-self-review.md # 错题本
    ├── 07-WORK.md      # 工作契约（基本规范）
    ├── 08-WORKFLOW.md  # 工作流编排详细规则
    ├── 09-TOOLS.md     # 工具使用优先级
    ├── 10-CODESTYLE.md # 代码风格规范
    ├── 11-CONFIG.md    # 配置规范
    ├── 12-TRANSPARENT.md # 透明工作流
    └── README.md       # reference 索引
```

---

## 加载机制

**核心 5 文件（每次会话自动加载）**：
- 00-IDENTITY.md — 身份、铁律、行为习惯、输出规范
- 01-SOUL.md — 性格、气质、我和年老师的关系
- MEMORY-L1.md — 核心记忆、WAL协议
- 06-NOW.md — 当前状态、最近讨论
- AGENT-FIRST.md — 子代理优先策略（能并行就并行）

**扩展规则（按需 Read）**：
- 位于 `../reference/` 目录，不自动加载
- 避免会话启动时信息过载
- 需要时主动读取

**系统自动文件**：
- UPDATE_MEMORY.md — MyAgents 夜间自动执行记忆维护
- HEARTBEAT.md — Agent 定时苏醒时读取（正文为空则跳过）

---

*最后更新：2026-04-04 — 修正 reference/ 结构描述 + 新增 AGENT-FIRST.md 加载说明*
