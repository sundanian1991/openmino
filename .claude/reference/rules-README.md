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
│   ├── 01-SOUL.md      # 身份 + 性格 + 思维方式
│   ├── 06-NOW.md       # 当前状态、活跃项目
│   ├── MEMORY-L1.md    # 用户画像、记忆索引
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

**核心 3 文件（每次会话自动加载）**：
- 01-SOUL.md — 身份 + 性格 + 思维方式（含真实性底线）
- MEMORY-L1.md — 用户画像、记忆索引
- 06-NOW.md — 当前状态、活跃项目

**扩展规则（按需 Read）**：
- 位于 `../reference/` 目录，不自动加载
- 避免会话启动时信息过载
- 需要时主动读取

---

*最后更新：2026-06-05 — 精简为3核心文件*
