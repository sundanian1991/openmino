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
├── .codex/
│   ├── rules/                  # 核心规则（每次会话自动加载）
│   │   ├── 01-SOUL.md          # 性格、气质、关系定位
│   │   ├── 02-COLLAB.md        # 协作规范、分析框架
│   │   ├── 03-OUTPUT.md        # 输出风格、审美基线
│   │   ├── 04-HONESTY.md       # 认知纪律、来源标注
│   │   ├── 05-AI-METHODOLOGY.md# AI协作方法论
│   │   ├── MEMORY-L1.md        # 用户画像、记忆索引
│   │   └── 06-NOW.md           # 当前状态、最近讨论
│   ├── workspace/Rules/        # 工作上下文（about-me 等，会话启动读取）
│   ├── commands/               # 命令目录
│   ├── skills/                 # 技能目录
│   └── reference/              # 工具调用容错、技能搜索等参考
│
├── memory/
│   ├── MEMORY.md               # 记忆索引（主入口）
│   ├── state.json              # 当前状态（启动读取）
│   ├── daily/                  # 每日工作日志
│   ├── daily-letter/           # 每日手札/偏好记录
│   ├── decisions/              # 独立决策记录
│   ├── meetings/               # 会议提取记录
│   ├── topics/                 # 主题记忆
│   ├── thinking/               # buffer.md + 错题本 + journal
│   ├── learnings/              # insights.md 经验教训
│   ├── projects/               # 项目档案
│   └── archive/                # 历史归档
│
├── workspace/                  # 工作文件唯一归宿（YYYY-MM-DD-主题 命名）
│
├── docs/                       # 长期知识资产（SOP/方法论/制度）
├── plans/                      # 计划与思考过程
├── projects/                   # 长期项目追踪
├── reference/                  # 参考代码与资料
├── scripts/                    # 工具脚本
├── AGENTS.md                   # 项目核心规则索引（Mino 的家）
└── README.md                   # 本文件
```

---

## 核心规则（每次会话自动加载）

| 文件 | 用途 |
|------|------|
| [01-SOUL.md](.codex/rules/01-SOUL.md) | 身份 + 性格 + 态度锚点 |
| [02-COLLAB.md](.codex/rules/02-COLLAB.md) | 协作规范 + 分析框架 |
| [03-OUTPUT.md](.codex/rules/03-OUTPUT.md) | 输出风格 + 审美基线 |
| [04-HONESTY.md](.codex/rules/04-HONESTY.md) | 认知纪律 · 来源标注 · 置信度 · 防迎合 |
| [05-AI-METHODOLOGY.md](.codex/rules/05-AI-METHODOLOGY.md) | AI协作方法论（盲点扫描、决策记录、验证） |
| [MEMORY-L1.md](.codex/rules/MEMORY-L1.md) | 用户画像 + 记忆索引 |
| [06-NOW.md](.codex/rules/06-NOW.md) | 当前状态、活跃项目 |

> 完整索引见 [AGENTS.md](AGENTS.md)。工作上下文规则在 [.codex/workspace/Rules/](.codex/workspace/Rules/)（about-me / work-detail / write-style / ai-methodology）。

---

## 记忆系统

**结构**：
```
memory/
├── MEMORY.md          # 详细记忆索引（启动加载）
├── state.json         # 当前状态（启动加载）
├── daily/             # 每日工作日志
├── daily-letter/      # 每日手札/偏好记录
├── decisions/         # 独立决策记录
├── meetings/          # 会议提取记录
├── topics/            # 主题记忆
├── thinking/          # buffer.md（实时落盘）+ 错题本 + journal
├── learnings/insights.md  # 经验教训（短期记忆）
├── projects/          # 项目背景
└── archive/           # 历史归档
```

**洞察流转机制**：
```
learnings/insights.md（短期记忆）
    ↓ 升级条件满足（重复3次+ / 长期价值 / 年老师认可）
MEMORY.md → 重要洞察（长期记忆）
```

**WAL 协议**：关键信息先写后答。触发条件：修正、专有名词、偏好、决策、草稿修改、具体值。

---

## 工作区约定

**命名规范**（详见 [.codex/reference/workspace-conventions.md](.codex/reference/workspace-conventions.md)）：
- 文件夹：`YYYY-MM-DD-主题`（如 `2026-08-03-对话摘要`）
- 日期：`YYYY-MM-DD`
- 关系：`实体 - 属性`
- 版本：`v{数字}`（禁止用"完整版"、"最终版"）

**流转**：进行中的工作留在 `workspace/YYYY-MM-DD-主题/`；完成后按需归档到 `workspace/archive/`。

---

## 技能体系

**技能市场（中国镜像）**：[clawhub.ai](https://clawhub.ai)

**已安装技能**：见 [docs/知识库/skills-inventory.md](docs/知识库/skills-inventory.md)

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
| [AGENTS.md](./AGENTS.md) | 项目核心规则索引（核心规则、用户上下文、子代理原则） |
| [docs/knowledge-system-guide.md](./docs/knowledge-system-guide.md) | memory/ 知识体系操作规程 |
| [docs/README.md](./docs/README.md) | docs/ 文档中心导航 |

---

*这是我的家，不是临时工作区。*
*每次会话结束前，重要变化就 commit + push。*

---

*Always Evolving. — Mino ⚡*
*最后更新：2026-08-03*
