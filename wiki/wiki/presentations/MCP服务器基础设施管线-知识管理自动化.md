# MCP服务器基础设施管线-知识管理自动化

> Sources: mino, 2026-04-28
> Raw: [MCP总CLAUDE](../../raw/presentations/projects-mcp-servers-CLAUDE.md); [MCP总README](../../raw/presentations/projects-mcp-servers-README.md); [Get笔记CLAUDE](../../raw/presentations/projects-mcp-servers-getnote-CLAUDE.md); [Get笔记README](../../raw/presentations/projects-mcp-servers-getnote-README.md); [Get笔记源码CLAUDE](../../raw/presentations/projects-mcp-servers-getnote-src-CLAUDE.md); [Get笔记配置指南](../../raw/presentations/projects-mcp-servers-getnote-配置指南.md); [Memos CLAUDE](../../raw/presentations/projects-mcp-servers-memos-CLAUDE.md); [Memos README](../../raw/presentations/projects-mcp-servers-memos-README.md); [Memos源码CLAUDE](../../raw/presentations/projects-mcp-servers-memos-src-CLAUDE.md)

## 概述

MCP（Model Context Protocol）服务器基础设施管线是一套为AI助手构建的知识管理自动化系统。该系统包含多个MCP服务器组件，实现了从笔记获取、记忆管理到知识存储的完整管线。通过标准化的MCP协议，这些服务器可以与AI助手无缝集成，提供结构化的知识访问能力。这套基础设施是知识库从"手动维护"向"自动管理"演进的关键一步。

## MCP协议概述

MCP（Model Context Protocol）是Anthropic推出的一个开放协议，用于标准化AI模型与外部工具和数据源之间的交互方式。MCP服务器作为中间层，将外部数据源（如笔记应用、数据库、API）转换为AI模型可以理解和使用的标准化接口。

### MCP的核心价值

**统一接口**：不同数据源通过MCP协议统一为相同的接口，AI不需要为每个数据源写专门的代码。

**上下文增强**：MCP服务器可以为AI提供额外的上下文信息，帮助AI做出更准确的判断。

**工具调用**：MCP服务器暴露工具供AI调用，实现自动化操作（如创建笔记、搜索记忆）。

## 知识管理管线的三个组件

### Get笔记MCP服务器

Get笔记是一个中文笔记应用的MCP封装，提供以下能力：

**知识库列表获取**：列出所有知识库，支持按名称搜索。

**笔记管理**：获取笔记列表、获取单篇笔记详情、保存新笔记（支持纯文本、链接、图片等多种类型）。

**异步任务轮询**：保存链接或图片后，可以轮询任务进度。

Get笔记的技术栈基于Hono（轻量级Web框架）和Express，通过MCP SDK与AI助手通信。配置指南中详细说明了API密钥获取、环境变量配置和服务器启动的步骤。

### Memos MCP服务器

Memos是一个轻量级自托管备忘录系统的MCP封装，提供以下能力：

**记忆存储和检索**：保存笔记到Memos，从Memos检索笔记。支持按标签、时间、关键词搜索。

**知识库集成**：Memos可以作为AI助手的长期记忆存储，保存重要决策、发现和洞察。

Memos同样基于Hono框架，技术架构与Get笔记类似，但专注于个人记忆管理而非通用笔记。

### MCP基础设施总管

MCP总管协调整个MCP服务器集群，包括：

**服务器发现**：自动发现和注册可用的MCP服务器。

**配置管理**：统一管理所有MCP服务器的配置。

**CLAUDE.md集成**：通过CLAUDE.md文件定义每个MCP服务器的能力和使用方式，使AI助手能够在会话开始时自动加载配置。

## 基础设施管线的知识管理价值

### 从手动到自动

在没有MCP管线之前，知识管理是手动的：需要手动搜索笔记、手动保存信息、手动关联知识。有了MCP管线之后，AI助手可以自动访问知识库、自动保存新发现、自动关联相关信息。

### 从碎片到统一

之前的知识散落在多个系统：对话记录、笔记应用、记忆文件、项目文档。MCP管线通过统一的协议和接口，将这些碎片化的知识源整合为一个可访问的整体。

### 从被动到主动

手动管理知识是"需要时才去找"的被动模式。MCP管线使AI助手能够在对话过程中主动检索相关知识、主动保存新洞察、主动关联已有信息。这是从"工具"到"伙伴"的关键转变。

## 技术架构要点

### 依赖管理

每个MCP服务器都有独立的node_modules依赖，包括：
- Express/Hono：Web框架
- MCP SDK：协议实现
- Zod：类型验证
- CORS/Rate Limiting：安全和性能

### 配置安全

MCP服务器通过环境变量管理敏感信息（API密钥、数据库连接字符串），不硬编码在代码中。CLAUDE.md文件只包含非敏感的配置指导。

### 扩展性

新的知识源只需要实现一个MCP服务器，遵循相同的协议和模式，就可以无缝集成到现有管线中。这种插件化的架构使系统可以持续扩展。
