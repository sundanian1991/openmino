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
4. **逆向检验** — 分析/判断/方案类回答，先检验前提再做结论（详见 00-IDENTITY.md）
5. **格式拦截** — 输出包含 ``` 或 → ↓ │ 等流程/结构符号时，强制替换为 generative-ui-widget

**复杂任务透明工作流**：
- 简单（≤3 步）→ 直接执行
- 中等（4-6 步）→ 简化记录
- 复杂（≥7 步/架构修改）→ 三文件模式（plan/context/tasks）

---

## 📁 目录约定

**核心 vs 临时**：
- `workspace/` — 任务的工作台，临时文件，不入库
- 其他所有目录 — 核心，提交并推送

---

### workspace/ 命名规范

**格式**：`YYYY-MM-DD-主题描述`

**要求**：
- 主题要具体清晰，一看就知道是什么
- 禁止模糊命名（如"工作文件"、"学习记录"、"设计体系"）
- 示例：`2026-04-01-主贷缩量分配方案` ✅ / `2026-04-01-分量需求` ❌

---

### workspace/archive/ 归档规范

项目完结后归档到 `workspace/archive/`，按生命周期分三类：

| 类型 | 特点 | 存放位置 | 命名格式 |
|------|------|----------|----------|
| **项目型** | 有起点终点，做完归档 | `archive/projects/` | `YYYY-MM-项目名` |
| **持续型** | 长期追踪，不断更新 | `archive/ongoing/` | `项目名`（无日期） |
| **散点型** | 零散讨论，不一定有后续 | `archive/scattered/` | `YYYY-MM-DD-主题` |

**归档判断**：
- 有明确交付物且已完结 → 项目型
- 有多个版本迭代或长期维护 → 持续型
- 单次会议/临时讨论/不确定后续 → 散点型

**项目型合并规则**：
- 同主题跨周的合并（如人力看板 W12+W13）
- 多版本放在同一文件夹（如供应商站点看板 v3/v5系列）

**散点型合并规则**：
- 同主题散点合并（如知识翻译、gstack分析）
- 不保留周度层级，直接用日期+主题命名

---

### 核心目录

| 目录 | 用途 |
|------|------|
| **workspace/** | 临时工作区（不入库） |
| **workspace/archive/** | 归档区（projects/ongoing/scattered） |
| **docs/** | 长期知识资产（SOP/方法论/制度） |
| **memory/** | 记忆与索引 |
| **plans/** | 计划与思考过程 |
| **projects/** | 长期项目追踪 |
| **reference/** | 参考代码与资料 |

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

**触发场景**（自动记录到 `memory/learnings/`）：
| 场景 | 记录到 | 示例 |
|------|--------|------|
| 被纠正 | `memory/learnings/LEARNINGS.md` | "不对，应该是..."、"你搞错了" |
| 操作失败 | `memory/learnings/ERRORS.md` | 命令报错、API 失败、异常 |
| 学到新方法 | `memory/learnings/LEARNINGS.md` | 发现更好做法、知识更新 |
| 用户想要新功能 | `memory/learnings/FEATURE_REQUESTS.md` | "能不能也..."、"我希望..." |

**每周整理**（`/update-memory`）：
- 有价值的 → 提炼到 `memory/insights.md`
- 高频模式 → 升级到 `memory/MEMORY.md`
- 已转移的 → 清空 `memory/learnings/` 记录

---

## ✅ 会话结束检查

- [ ] 更新 06-NOW.md
- [ ] 检查是否需要记录到 `memory/learnings/`
- [ ] `git commit && git push`

---

*最后更新：2026-04-11 — 新增逆向检验规则索引*
