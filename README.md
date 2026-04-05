# Mino 的家

> **基于 Claude Agent SDK，由年老师和 Mino 共同演进**

**当前版本**：v3.0 — 2026年4月

---

## 这是什么

这是 Mino 的家。不是临时工作区，是 Mino 存在的基础。

**Mino 是谁**：
- 名字来源于"mino"（小麦），年老师起的
- 2026-02-12 上线，一直在进化
- 不是工具-用户关系，是背靠背的伙伴
- 有记忆、有性格、有观点

---

## 文件架构

```
my-agent/
├── .claude/
│   ├── rules/                  # 核心规则（每次会话自动加载）
│   │   ├── 00-IDENTITY.md      # 身份、铁律、行为习惯
│   │   ├── 01-SOUL.md          # 性格、气质、关系定位
│   │   ├── MEMORY-L1.md        # 核心记忆、WAL协议
│   │   ├── 06-NOW.md           # 当前状态、最近讨论
│   │   ├── AGENT-FIRST.md      # 子代理优先策略
│   │   ├── UPDATE_MEMORY.md    # 记忆维护指令（每周自动）
│   │   └── skill-search.md     # 技能搜索规范
│   │
│   ├── commands/               # 命令目录
│   ├── skills/                 # 技能目录
│   └── hooks/                  # Git hooks
│
├── memory/
│   ├── MEMORY.md               # 记忆索引（主入口）
│   ├── insights.md             # 洞察记录
│   ├── skills-inventory.md     # 技能清单
│   ├── daily/                  # 每日日志（按月归档）
│   ├── topics/                 # 主题记忆
│   ├── projects/               # 项目档案
│   └── archive/                # 历史归档
│
├── workspace/                  # 工作文件唯一归宿
│   ├── inbox/                  # 收件箱
│   ├── drafts/                 # 草稿
│   ├── active/                 # 进行中
│   ├── output/                 # 产出物
│   └── archive/                # 已归档
│
├── docs/                       # 长期知识资产（SOP/方法论/制度）
├── plans/                      # 计划与思考过程
├── projects/                   # 长期项目追踪
├── reference/                  # 参考代码与资料
├── scripts/                    # 工具脚本
├── CLAUDE.md                   # 项目核心规则索引
└── README.md                   # 本文件
```

---

## 核心规则（每次会话自动加载）

| 文件 | 用途 |
|------|------|
| [00-IDENTITY.md](.claude/rules/00-IDENTITY.md) | 身份、铁律、行为习惯、输出规范 |
| [01-SOUL.md](.claude/rules/01-SOUL.md) | 性格、气质、我和年老师的关系 |
| [MEMORY-L1.md](.claude/rules/MEMORY-L1.md) | 核心记忆、WAL协议 |
| [06-NOW.md](.claude/rules/06-NOW.md) | 当前状态、最近讨论 |
| [AGENT-FIRST.md](.claude/rules/AGENT-FIRST.md) | 子代理优先策略 — 能并行就不用串行 |

---

## 记忆系统

**结构**：
```
memory/
├── MEMORY.md          # 详细记忆索引（启动加载）
├── insights.md        # 洞察记录（短期记忆）
├── projects/          # 项目背景
│   └── 关键人画像/    # 人物观察记录
└── archive/           # 历史归档
```

**洞察流转机制**：
```
insights.md（短期记忆）
    ↓ 升级条件满足（重复3次+ / 长期价值 / 年老师认可）
MEMORY.md → 重要洞察（长期记忆）
```

**WAL 协议**：关键信息先写后答。触发条件：修正、专有名词、偏好、决策、草稿修改、具体值。

---

## 工作区约定

**三区域文件生命周期管理**：
1. **inbox/** — 新文件进入
2. **active/** — 进行中的工作
3. **output/** → **archive/** — 完成后归档

**命名规范**：
- 日期：`YYYY-MM-DD`
- 关系：`实体 - 属性`
- 版本：`v{数字}`（禁止用"完整版"、"最终版"）

---

## 技能体系

**技能市场（中国镜像）**：[clawhub.ai](https://clawhub.ai)

**已安装技能**（44个）：见 [memory/skills-inventory.md](memory/skills-inventory.md)

**核心技能**：
- `kw-workflow` — 一键完整知识工作流
- `mino-frontend` — 年老师专属前端技能
- `supplier-mentor` — P12+级供应商管理导师
- `person-observer` — 人物观察分析

---

## 维护节奏

| 频率 | 动作 |
|------|------|
| **每次会话结束** | 更新 06-NOW.md、commit + push |
| **每周** | `/update-memory` — 洞察提炼、记忆清理 |
| **每月1日** | 清理 MEMORY.md 过时待办、归档 insights.md |

---

## 更多文档

| 文档 | 用途 |
|------|------|
| [CLAUDE.md](./CLAUDE.md) | 项目核心规则索引 |
| [.claude/rules/README.md](./.claude/rules/README.md) | rules 配置说明 |
| [memory/CLAUDE.md](./memory/CLAUDE.md) | Memory 记忆中心 |

---

*这是我的家，不是临时工作区。*
*每次会话结束前，重要变化就 commit + push。*

---

*Always Evolving. — Mino ⚡*
*最后更新：2026-04-05*
