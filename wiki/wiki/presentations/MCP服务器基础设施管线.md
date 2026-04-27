# MCP服务器基础设施管线

> Sources: mino, 2026-04-28
> Raw: [CLAUDE.md](../../raw/presentations/projects-mcp-servers-CLAUDE.md); [README.md](../../raw/presentations/projects-mcp-servers-README.md); [getnote-CLAUDE](../../raw/presentations/projects-mcp-servers-getnote-CLAUDE.md); [getnote-README](../../raw/presentations/projects-mcp-servers-getnote-README.md); [getnote-src-CLAUDE](../../raw/presentations/projects-mcp-servers-getnote-src-CLAUDE.md); [getnote-配置指南](../../raw/presentations/projects-mcp-servers-getnote-配置指南.md); [memos-CLAUDE](../../raw/presentations/projects-mcp-servers-memos-CLAUDE.md); [memos-README](../../raw/presentations/projects-mcp-servers-memos-README.md); [memos-src-CLAUDE](../../raw/presentations/projects-mcp-servers-memos-src-CLAUDE.md)

## Overview

MCP服务器基础设施管线项目记录和管理了多个MCP（Model Context Protocol）服务器的配置、源码和部署信息。主要包括Get笔记和Memos两个核心MCP服务，涵盖CLAUDE.md配置、README文档、源码级CLAUDE.md和配置指南。这些MCP服务是AI Agent与外部知识系统（Get笔记平台、Memos记忆系统）交互的桥梁。

## Get笔记MCP服务

### 项目概况

Get笔记MCP服务提供与Get笔记平台的交互能力，支持笔记的创建、查询和管理。项目包含：
- 顶层CLAUDE.md：项目总体配置和使用规范
- README.md：项目介绍和功能说明
- 配置指南：详细的部署和配置步骤

### 源码配置

getnote-src-CLAUDE.md包含了源码级别的配置说明，详细描述了：
- MCP协议的实现方式
- 与Get笔记API的交互逻辑
- 错误处理和重试机制
- 权限和认证配置

### 配置要点

配置指南覆盖了从安装到使用的全流程：
1. 环境准备：Node.js版本、npm依赖
2. API认证：Get笔记平台的API Key获取和配置
3. 服务启动：本地开发和生产部署的差异
4. 功能验证：测试笔记创建和查询

## MemosMCP服务

### 项目概况

MemosMCP服务提供与Memos记忆系统的交互能力，支持记忆的存储、检索和管理。项目包含：
- CLAUDE.md：服务配置
- README.md：功能说明和使用指南
- 源码CLAUDE.md：实现细节

### 核心能力

Memos服务主要支持：
- 记忆创建：保存新的记忆条目
- 记忆检索：按关键词、标签、时间检索
- 记忆管理：更新、删除、归档记忆

## MCP管线的架构意义

这两个MCP服务代表了AI Agent基础设施的两个关键方向：

1. **外部知识获取**（Get笔记）：连接外部的知识管理平台，将AI Agent的能力延伸到云端笔记系统
2. **内部记忆管理**（Memos）：构建Agent自身的长期记忆系统，支持跨会话的知识积累

两个服务共同构成了"外获+内储"的双通道知识管线。

## 技术栈

两个MCP服务都基于相同的技术栈：
- Hono.js：轻量级Web框架
- MCP SDK：Model Context Protocol标准实现
- Express：HTTP服务
- Zod：类型验证

依赖的node_modules包括@hono/node-server、@modelcontextprotocol/sdk、express、zod等核心库。
