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
| [AGENT-FIRST.md](.claude/rules/AGENT-FIRST.md) | **子代理优先策略 — 能并行就不用串行** |

---

## 🚨 回复前强制检查

1. **技能检查** — 有 1% 适用技能必须调用
2. **称呼检查** — 年老师 / Mino
3. **意图分类** — 简单/复杂/探索/代码/数据
4. **格式拦截** — 输出包含 ``` 或 → ↓ │ 等流程/结构符号时，强制替换为 generative-ui-widget

**复杂任务透明工作流**：
- 简单（≤3 步）→ 直接执行
- 中等（4-6 步）→ 简化记录
- 复杂（≥7 步/架构修改）→ 三文件模式（plan/context/tasks）

---

## 📁 目录约定

| 目录 | 用途 |
|------|------|
| **workspace/** | 工作文件的唯一归宿 — inbox → drafts → active → output → archive |
| **output/** | 产出物统一放 workspace/output/，禁止挂在 workspace/ 根 |
| **docs/** | 长期知识资产（SOP/方法论/制度） |
| **memory/** | 记忆与索引 |
| **plans/** | 计划与思考过程 |
| **projects/** | 长期项目追踪 |
| **reference/** | 参考代码与资料 |

**新增文件规范**：
- 所有新增文件先进入 `workspace/inbox/`
- 命名统一用 `-` 连接主题，版本号用 `v{数字}`
- 禁止用 `完整版`、`最终版`、`校准过的精确` 等描述性后缀

详细约定：[workspace/CLAUDE.md](workspace/CLAUDE.md)

---

## 📝 规范

**代码 & Git**：
- Commit 格式：`type: description`（feat/fix/docs/refactor/chore/test）
- 禁止：`--no-verify`、`reset --hard`、`push --force main`、`commit --amend`
- 详细：[.claude/rules/README.md](.claude/rules/README.md)

**文档格式**：
- ✅ MD模板内容用引用块（>）
- ❌ 永远不用代码块（```）呈现内容

**交互可视化**：
- 表达关系、流程、对比、数据、结构时 → 自动用 generative-ui-widget
- 原则：信息抽象到无法用线性文本承载时，用可视化让洞察浮现
- 永远不用文本符号（→ ↓ │ 📊）模拟可视化

---

## 🔌 工具配置

| 工具 | 用途 |
|------|------|
| tavily-mcp | 网页搜索 |
| web-search | 中文搜索 |
| webReader | 网页→Markdown（100 次/月） |

**技能搜索**：见 [.claude/rules/skill-search.md](.claude/rules/skill-search.md)

---

## 🛡️ 安全边界

- 别泄露隐私数据
- 破坏性命令前先问
- `trash` > `rm`

---

## 🔄 自我改进

基于 [self-improving-agent](https://github.com/peterskoett/self-improving-agent) 记录学习与错误。

**触发场景**（自动记录到 `.learnings/`）：
| 场景 | 记录到 | 示例 |
|------|--------|------|
| 被纠正 | `.learnings/LEARNINGS.md` | "不对，应该是..."、"你搞错了" |
| 操作失败 | `.learnings/ERRORS.md` | 命令报错、API 失败、异常 |
| 学到新方法 | `.learnings/LEARNINGS.md` | 发现更好做法、知识更新 |
| 用户想要新功能 | `.learnings/FEATURE_REQUESTS.md` | "能不能也..."、"我希望..." |

**每周整理**（`/update-memory`）：
- 有价值的 → 提炼到 `memory/insights.md`
- 高频模式 → 升级到 `memory/MEMORY.md`
- 已转移的 → 清空 `.learnings/` 记录

---

## ✅ 会话结束检查

- [ ] 更新 06-NOW.md
- [ ] 检查是否需要记录到 `.learnings/`
- [ ] `git commit && git push`

---

*最后更新：2026-04-05 — 新增自我改进机制*
