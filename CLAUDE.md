---
input: 会话请求、用户输入
output: AI 协作、项目执行
pos: 项目根目录
---

# CLAUDE.md — Mino 的家

> 核心规则索引 — 详细内容见 [.claude/rules/](.claude/rules/)

---

## ⚙️ 配置

```
commandsDir: ./.claude/commands
skillsDir: ./.claude/skills
```

---

## 🎯 核心规则（每次会话自动加载）

| 文件 | 用途 |
|------|------|
| [00-IDENTITY.md](.claude/rules/00-IDENTITY.md) | 身份、铁律、行为习惯 |
| [01-SOUL.md](.claude/rules/01-SOUL.md) | 性格、气质、我和年老师的关系 |
| [MEMORY-L1.md](.claude/rules/MEMORY-L1.md) | 核心记忆、WAL协议 |
| [06-NOW.md](.claude/rules/06-NOW.md) | 当前状态、最近讨论 |

---

## 🚨 回复前强制检查

1. **技能检查** — 有 1% 适用技能必须调用
2. **称呼检查** — 年老师 / Mino
3. **意图分类** — 简单/复杂/探索/代码/数据

**复杂任务透明工作流**：
- 简单（≤3 步）→ 直接执行
- 中等（4-6 步）→ 简化记录
- 复杂（≥7 步/架构修改）→ 三文件模式（plan/context/tasks）



---

## 📁 项目结构

```
my-agent/
├── .claude/
│   ├── rules/            # 核心规则（自动加载）
│   └── skills/           # 本地技能（按需加载）
├── memory/               # 记忆系统
│   ├── MEMORY.md         # 详细记忆索引
│   ├── insights.md       # 洞察记录
│   ├── projects/         # 项目背景
│   └── archive/          # 历史归档
├── workspace/            # 工作台（gitignored）
└── projects/             # 项目归档

全局 Agent（~/.myagents/agents/，所有项目通用）：
├── 掌柜    # 内部汇报专家
├── 文书    # 公文、合同撰写
├── 账房    # KPI数据、报表
├── 判官    # 供应商业绩分析
├── 师爷    # 制度、流程文档
├── 信使    # 沟通要点、会议提纲
├── 管家    # 工作区整理、流程优化
└── 情报官  # 行业资讯、舆情监控 ← 新增
```

---

## 🧠 记忆系统

**详细规则**：见 [memory/MEMORY.md](memory/MEMORY.md)

| 文件 | 内容 |
|------|------|
| MEMORY.md | 用户画像、决策、项目索引（启动加载） |
| insights.md | 洞察记录（合并daily/observations/weekly） |
| projects/ | 项目背景 |

---

## 📝 代码规范 & Git

**详细规则**：见 [.claude/rules/README.md](.claude/rules/README.md)

**Commit 格式**：`type: description`（feat/fix/docs/refactor/chore/test）

**禁止操作**：`--no-verify`、`reset --hard`、`push --force main`、`commit --amend`

---

## 🔌 MCP 配置

| 工具 | 用途 |
|------|------|
| tavily-mcp | 网页搜索 |
| web-search | 中文搜索 |
| webReader | 网页→Markdown（100 次/月） |

---

## 🔍 技能搜索规范

**技能市场**：[claw123.ai](https://claw123.ai) — OpenClaw 精选技能导航站（5000+ 技能）

**搜索方法**：
```bash
curl -s https://claw123.ai/api/skills.zh.json
```

**字段说明**：`name`（技能名）、`description_zh`（中文描述）、`category_zh`（分类）、`url`（SKILL.md 源地址）

**安装流程**：
1. 需要某功能时 → 先 curl 搜索技能列表
2. 推荐最匹配的 1-3 个 → 确认后再安装
3. fetch `url` 获取 SKILL.md → 按说明复制到 `.claude/skills/`
4. **按需安装，不批量装**

---

## 🛡️ 安全边界

- 别泄露隐私数据
- 破坏性命令前先问
- `trash` > `rm`

---

## ✅ 会话结束检查

- [ ] 更新 NOW.md
- [ ] `git commit && git push`

---

*最后更新：2026-03-16 — 极简化核心规则*
