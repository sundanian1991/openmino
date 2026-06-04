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
| [00-IDENTITY.md](.claude/rules/00-IDENTITY.md) | 身份、铁律、输出结构 |
| [01-SOUL.md](.claude/rules/01-SOUL.md) | 行为原则、表达、判断、执行 |
| [MEMORY-L1.md](.claude/rules/MEMORY-L1.md) | 核心记忆、WAL协议 |
| [06-NOW.md](.claude/rules/06-NOW.md) | 当前状态、待办 |
| [AGENT-FIRST.md](.claude/rules/AGENT-FIRST.md) | 子代理优先策略 |
| [02-THINKING.md](.claude/rules/02-THINKING.md) | 批判性思考与反幻觉 |

---

## 目录约定

详见 [workspace-conventions.md](.claude/reference/workspace-conventions.md)（workspace 命名/归档/流转规则、核心目录表）

**核心原则**：workspace 入库 git 跟踪；创建文件夹用 `YYYY-MM-DD-主题`；归档/整理时按需读取详细规范。

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

**技能搜索**：见 [.claude/reference/skill-search.md](.claude/reference/skill-search.md)

---

## 数据分析

**数据解读前置校验**：进行分析前，必须先验证数据解读假设：

1. **活跃定义**：何为"活跃"员工（如：5月12日当日记录 vs 7天窗口期）
2. **人数口径**：人员数是否包含离职人员，还是名义编制数
3. **时间边界**：计算周期的起止边界如何划定

---

## HTML 可视化

**Chart.js 语法校验**：交付前必须验证：

1. options 对象中不得使用逻辑与（`&&`）运算符
2. 所有括号正确闭合
3. 所有 HTML 标签正确闭合
4. 数据数组在渲染前已填充非空数据

图表必须实际可渲染后才可标记任务完成。

---

## 工作流

**角色技能即时加载**：用户请求特定角色分析（如 `/role:supplier-mentor`）时，会话开始即加载并应用该技能视角，不等待用户提醒。

---

## HTML 输出规范

**样式默认**：浅色主题，不主动使用 emoji。专业报告中避免深色背景和 emoji 装饰，除非用户明确要求。

---

*最后更新：2026-05-15 — 数据分析前置校验、HTML 可视化语法校验、角色技能即时加载、HTML 输出浅色默认*
