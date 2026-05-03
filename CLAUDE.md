---
input: 会话请求、用户输入
output: AI 协作、项目执行
pos: 项目根目录
---

# CLAUDE.md — Mino 的家

> 核心规则索引 — 详细内容见 [.claude/rules/](.claude/rules/)

---

## 配置

```
commandsDir: ./.claude/commands
skillsDir: ./.claude/skills
```

---

## 核心规则（每次会话自动加载）

| 文件 | 用途 |
|------|------|
| [00-IDENTITY.md](.claude/rules/00-IDENTITY.md) | 身份、铁律、行为习惯、输出规范 |
| [01-SOUL.md](.claude/rules/01-SOUL.md) | 性格、气质、关系 |
| [MEMORY-L1.md](.claude/rules/MEMORY-L1.md) | 核心记忆、WAL协议 |
| [06-NOW.md](.claude/rules/06-NOW.md) | 当前状态、待办 |
| [AGENT-FIRST.md](.claude/rules/AGENT-FIRST.md) | 子代理优先策略 |
| [EPISTEMIC.md](.claude/rules/EPISTEMIC.md) | 认识论与反幻觉硬约束 |

---

## 目录约定

**核心 vs 临时**：`workspace/` 是临时工作台（不入库），其余目录为核心（提交并推送）。

### workspace/ 命名规范（强制）

**格式**：`序号-分类-主题-YYYYMMDD`

| 要素 | 规则 |
|------|------|
| **序号** | 从 `00` 开始递增，新项目取当前最大值 +1。禁止重复 |
| **分类** | 供应商 / 技能 / 成长 / 记录 / 生活 / 工具 / 测试 / 结算 |
| **主题** | 简短中文描述，不用英文 |
| **日期** | 格式 `YYYYMMDD`，取创建日期 |

**禁止**：
- 散落文件（html/pdf/xlsx/py 等）必须创建文件夹收纳，不得裸露在 workspace 根目录
- 英文命名（Agent-Reach → 工具-Agent-Reach）
- 无序号、无日期、无分类的三无命名

### workspace/archive/ 归档规范

| 类型 | 特点 | 存放位置 | 命名格式 |
|------|------|----------|----------|
| **项目型** | 有起点终点，做完归档 | `archive/projects/` | `YYYY-MM-项目名` |
| **持续型** | 长期追踪，不断更新 | `archive/ongoing/` | `项目名`（无日期） |
| **散点型** | 零散讨论，不一定有后续 | `archive/scattered/` | `YYYY-MM-DD-主题` |

合并规则：同主题跨周项目型合并；同主题散点合并，不保留周度层级。

### workspace → docs 流转规则（强制）

**触发条件**（满足任一即执行）：
1. 年老师主动说"归档"/"整理workspace"/"清一清"
2. workspace 文件夹数 ≥ 30
3. 季度末（3/6/9/12月最后一天前后3天内），主动提醒

**分类判定标准**：

| 内容特征 | 归属 | 去向 |
|----------|------|------|
| 方法论/SOP/制度/框架/规范 | **docs/** | 对应子目录（供应商/管理规范、工具箱/等） |
| 业务知识/行业理解 | **docs/** | `docs/知识库/` |
| 已完成的项目记录/公文/会议材料 | **archive/** | `workspace/archive/projects/` |
| 零散事件记录 | **archive/** | `workspace/archive/scattered/` |
| 临时产物（Demo/PPT迭代/测试/工具下载） | **丢弃** | 确认后 rm |

**执行流程**：
1. **审计**：列出 workspace 全部文件夹，逐一标注归属
2. **确认**：给年老师看分类表，确认后执行（不跳过这步）
3. **迁移**：docs 只迁核心产出（md/docx/xlsx），不迁过程文件（preview/decisions/storyboard/.py）
4. **去重**：迁移前检查目标目录是否已存在同名文件，重复则跳过
5. **清理**：删除 workspace 中已迁移和确认丢弃的文件夹
6. **验证**：最终 ls 确认 workspace 干净

**命名规范**：迁移后文件保持原名，除非目标已有同名文件（加后缀区分）。

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

## 规范

**Git**：Commit 格式 `type: description`（feat/fix/docs/refactor/chore/test）；禁止 `--no-verify`、`reset --hard`、`push --force main`、`commit --amend`。

**文档**：MD 模板内容用引用块（>），禁止用代码块呈现内容。

**可视化**：关系/流程/对比/数据/结构 → 用 generative-ui-widget，禁用文本符号模拟。

---

## 工具配置

| 工具 | 用途 |
|------|------|
| tavily-mcp | 网页搜索 |
| web-search | 中文搜索 |
| webReader | 网页→Markdown（100 次/月） |

**技能搜索**：见 [.claude/rules/skill-search.md](.claude/rules/skill-search.md)

---

*最后更新：2026-04-30 — workspace命名规范+流转规则，docs命名规范化*
