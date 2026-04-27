# MCP Server 技术基础设施文档

> Sources: GetNote + Memos MCP Server 配置文档 (2026-04)
> Raw: [getnote-CLAUDE.md](../../raw/presentations/projects-mcp-servers-getnote-CLAUDE.md); [getnote-README.md](../../raw/presentations/projects-mcp-servers-getnote-README.md); [getnote-配置指南](../../raw/presentations/projects-mcp-servers-getnote-配置指南.md); [getnote-src-CLAUDE.md](../../raw/presentations/projects-mcp-servers-getnote-src-CLAUDE.md); [memos-CLAUDE.md](../../raw/presentations/projects-mcp-servers-memos-CLAUDE.md); [memos-README.md](../../raw/presentations/projects-mcp-servers-memos-README.md); [memos-src-CLAUDE.md](../../raw/presentations/projects-mcp-servers-memos-src-CLAUDE.md)

## 概述

MCP Server 技术基础设施文档记录了 Mino 知识库中两个核心 MCP（Model Context Protocol）服务器的配置、架构和使用方法——GetNote 笔记服务和 Memos 记忆服务。这些服务器是 Mino 与外部系统交互的技术桥梁，使 AI 能够保存笔记、检索记忆、维护长期知识库。该项目在 presentations 目录下包含了完整的 CLAUDE.md、README.md、配置指南和源代码目录的 CLAUDE.md，说明这些文档可能曾被计划以技术汇报的形式呈现。

## GetNote 笔记服务

**定位**：笔记保存和管理服务。支持纯文本、链接、图片、音频、视频等多种笔记类型，可关联到知识库并添加标签。

**核心能力**：
- 保存笔记：支持 plain_text、link、img_text、audio、video 五种类型
- 知识库管理：列出知识库、将笔记保存到指定知识库
- 笔记列表：获取笔记列表，支持分页（limit + since_id）
- 单篇笔记：获取单篇笔记的详细信息
- 异步任务：保存链接/图片后需要轮询任务进度

**技术栈**：
- 后端框架：Hono（轻量级 Web 框架）
- 运行时：Node.js
- 依赖：express、cors、zod（数据验证）、jose（JWT）、eventsource（SSE）

**配置指南**：包含服务器部署、环境变量设置、API 端点配置等完整部署流程。

## Memos 记忆服务

**定位**：记忆存储和检索服务。支持对话记忆的添加和语义搜索，是 Mino 长期记忆系统的基础设施。

**核心能力**：
- 添加记忆：支持单条或多条消息，可关联会话 ID、用户 ID 和标签
- 搜索记忆：基于语义搜索相关记忆，支持多种记忆类型召回控制
  - conversation_id：会话记忆
  - include_preference：偏好记忆（默认召回）
  - include_skill：技能记忆（默认不召回）
  - include_tool_memory：工具记忆（默认不召回）
- 记忆限制：默认返回 9 条，最大 25 条

**技术栈**：与 GetNote 相同（Hono + Node.js + express + zod + jose + eventsource），说明两个服务共享相同的技术底座。

## 架构模式

两个 MCP Server 共享相同的架构模式：

**统一技术栈**：都使用 Hono 作为 Web 框架，express 作为底层运行时，zod 作为数据验证，jose 作为认证。这种一致性降低了维护成本，也说明这是 Mino 团队的标准化技术选择。

**CLAUDE.md 驱动**：每个服务目录都有 CLAUDE.md 文件，说明这些服务的设计和使用都遵循 Mino 的规则体系。CLAUDE.md 定义了服务的行为规范、使用约束和交互方式。

**README.md 文档化**：每个服务都有 README.md，包含项目介绍、安装步骤、使用方法。这是标准的技术文档实践，确保服务可被他人理解和使用。

**node_modules 归档**：大量的 node_modules README 文件被归档到 presentations 目录中。这些是技术项目执行时的附带文件，不属于核心内容。在演示文稿场景中，它们可能是作为技术依赖说明被包含的。

## 与 Mino 工作流的关联

MCP Server 是 Mino 知识工作流的技术基础：

**GetNote** 支撑了知识沉淀流程——每日书信、项目笔记、观察记录等都通过 GetNote 服务保存。没有 GetNote，知识就无法持久化。

**Memos** 支撑了记忆检索流程——WAL 协议中的"关键信息先写后答"、会话启动时的"截断信号恢复"、以及跨会话的偏好和技能记忆加载，都依赖 Memos 服务。

这两个服务的技术稳定性直接影响到 Mino 的核心能力——记忆和知识管理。

## 在 presentations 目录中的意义

这些技术基础设施文档出现在 presentations 目录中，说明可能曾有技术汇报的计划——向团队或上级汇报 MCP Server 的配置状态和集成进展。这类汇报的价值在于：让非技术人员理解技术基础设施的现状、能力和风险，从而在资源分配和优先级决策时做出合理判断。
