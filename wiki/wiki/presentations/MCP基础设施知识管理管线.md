# MCP基础设施：Get笔记与Memos的知识管理管线

> Sources: MCP Servers 项目 - Get笔记和 Memos 配置文档 (2026-02-23)
> Raw: [Get笔记CLAUDE.md](../../raw/presentations/projects-mcp-servers-getnote-CLAUDE.md); [Get笔记README](../../raw/presentations/projects-mcp-servers-getnote-README.md); [Get笔记配置指南](../../raw/presentations/projects-mcp-servers-getnote-配置指南.md); [Get笔记源码CLAUDE.md](../../raw/presentations/projects-mcp-servers-getnote-src-CLAUDE.md); [Memos CLAUDE.md](../../raw/presentations/projects-mcp-servers-memos-CLAUDE.md); [Memos README](../../raw/presentations/projects-mcp-servers-memos-README.md); [Memos源码CLAUDE.md](../../raw/presentations/projects-mcp-servers-memos-src-CLAUDE.md)

## 概述

MCP（Model Context Protocol）基础设施项目是 Mino 知识库中关于外部知识系统集成的最完整实践。该项目搭建了两条知识管理管线：Get笔记（外部知识库搜索）和 Memos（个人记忆存储）。这两条管线让 AI 能够查询外部知识库、保存和管理长期记忆，从而扩展了本地文件系统的知识边界。本文分析这两条管线的设计逻辑、实现方式和应用价值。

## Get笔记管线

### 功能定位

Get笔记 MCP 服务器让 Claude Code 能够查询 Get笔记知识库的内容。核心能力是自然语言搜索——用户问"我的供应商管理框架是什么"，AI 自动调用搜索工具从知识库中获取答案。

### 技术实现

**API 配置**：
- API 地址：`https://open-api.biji.com/getnote/openapi`
- QPS 限制：公测期间 2 次/秒
- 日调用量：5000 次/天
- 认证方式：Bearer Token

**工具定义**：`getnote_search`，接收三个参数：
- `question`（必填）：搜索问题
- `deep_seek`（选填，默认 true）：深度思考模式
- `refs`（选填，默认 true）：返回引用来源

**核心逻辑**：
1. 接收用户问题
2. 调用 Get笔记 API 的 `/knowledge/search` 端点
3. 返回答案 + 深度思考内容 + 引用来源

### 配置方式

支持两种配置方式：
- **项目级配置**（推荐）：在 `.claude/mcp.json` 中配置，只对当前项目生效
- **全局配置**：在 `~/.claude/settings.json` 中配置，对所有项目生效

### 应用场景

**知识查询**：问"我的供应商管理框架是什么"，自动从知识库获取。

**上下文补充**：当本地文件缺少某些信息时，通过 Get笔记 补充。

**知识沉淀**：日常想法记录到 Get笔记，需要时通过 MCP 查询。

## Memos管线

### 功能定位

Memos MCP 服务器提供个人记忆存储能力。与 Get笔记 的"搜索"不同，Memos 更注重"管理"——保存、检索、组织个人记忆和想法。

### 技术架构

Memos 是一个自托管的轻量级笔记服务，支持：
- Markdown 格式笔记
- 标签分类
- 时间线浏览
- API 访问

**核心能力**：
- 快速记录想法和观察
- 标签化管理
- 时间线回顾

### 在 Mino 系统中的角色

Memos 在 Mino 系统中承担"快速记忆"的角色：

- **临时记录**：对话中的想法、观察、待办，快速记录到 Memos
- **标签管理**：用标签分类，如 `#供应商` `#人物观察` `#方法论`
- **时间线回顾**：通过时间线查看某段时间的记录

与本地 `memory/` 目录的关系：Memos 是"快速入口"，本地 memory 是"长期归档"。想法先到 Memos，确认有价值后迁移到本地。

## 两条管线的协同

### 输入与输出

Get笔记 和 Memos 形成了一条知识管理的"输入-存储-查询"闭环：

```
想法产生 → 记录到 Memos → 沉淀到 Get笔记 → 通过 MCP 查询 → 辅助决策
```

- **Memos**：快速记录，低门槛
- **Get笔记**：结构化存储，支持深度搜索
- **MCP 查询**：在对话中即时获取知识

### 知识流动

知识在管线中的流动方向：

1. **对话中产生的想法** → Memos 快速记录
2. **确认有价值的知识** → Get笔记 结构化存储（添加标签、分类）
3. **需要时** → 通过 MCP 工具查询
4. **查询结果** → 辅助当前对话和决策

这条管线解决了知识管理中最实际的痛点：想法产生时快速记录，需要时即时获取，不需要记忆"存在哪里"。

## 对知识工作流的意义

### 扩展知识边界

本地文件系统有边界——只能访问项目目录下的文件。MCP 管线扩展了这个边界：

- Get笔记：扩展到云端知识库
- Memos：扩展到个人记忆系统
- 未来可能扩展到其他 MCP 服务（数据库、API、文件存储等）

### 降低知识检索成本

没有 MCP 管线时，检索知识需要：
1. 回忆"这个信息存在哪里"
2. 打开对应文件或系统
3. 搜索或浏览找到内容

有 MCP 管线后：
1. 问 AI："我的供应商管理框架是什么"
2. AI 自动查询并返回

检索成本从"主动搜索"降低到"自然语言提问"。

### 支持持续学习

管线支持持续学习的闭环：
- 每次对话都产生新的知识（observer 机制）
- 新知识自动记录到 Memos
- 有价值的内容沉淀到 Get笔记
- 下次对话时可以查询到

这让知识管理从"手动整理"变成了"自动积累"。
