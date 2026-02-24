---
input: 项目需求
output: 配置指南.md 实现
pos: projects/mcp-servers/getnote/配置指南.md
---

# Get笔记 MCP 配置指南

> 让Claude Code能查询Get笔记知识库的完整配置步骤

---

## 一、前置准备

### 1. 获取API Token和知识库ID

**步骤**：
1. 登录 [Get笔记开放平台](https://open-api.biji.com)
2. 创建应用，获取 `API Token`
3. 创建知识库，获取 `Knowledge Base ID`

**API信息**：
- API地址：`https://open-api.biji.com/getnote/openapi`
- QPS限制：公测期间2次/秒
- 日调用量：5000次/天

---

## 二、安装MCP服务器

### 1. 创建项目目录

```bash
mkdir -p ~/projects/mcp-servers/getnote
cd ~/projects/mcp-servers/getnote
```

### 2. 创建package.json

```json
{
  "name": "getnote-mcp-server",
  "version": "1.0.0",
  "description": "Get笔记知识库MCP服务器",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.4"
  }
}
```

### 3. 创建index.js

完整的MCP服务器代码见下方。

### 4. 安装依赖

```bash
npm install
```

---

## 三、MCP服务器代码（index.js）

```javascript
#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// 配置（从环境变量读取）
const CONFIG = {
  API_URL: 'https://open-api.biji.com/getnote/openapi',
  API_TOKEN: process.env.GETNOTE_API_TOKEN || '',
  KNOWLEDGE_BASE_ID: process.env.GETNOTE_KNOWLEDGE_BASE_ID || '',
};

// 工具定义
const TOOLS = [
  {
    name: 'getnote_search',
    description: '搜索Get笔记知识库内容。支持自然语言提问。',
    inputSchema: {
      type: 'object',
      properties: {
        question: { type: 'string', description: '要搜索的问题' },
        deep_seek: { type: 'boolean', default: true },
        refs: { type: 'boolean', default: true },
      },
      required: ['question'],
    },
  },
];

// API调用
async function callGetnoteAPI(question, deepSeek = true, refs = true) {
  try {
    const response = await fetch(`${CONFIG.API_URL}/knowledge/search`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.API_TOKEN}`,
        'Content-Type': 'application/json',
        'X-OAuth-Version': '1',
      },
      body: JSON.stringify({
        question,
        topic_ids: [CONFIG.KNOWLEDGE_BASE_ID],
        deep_seek: deepSeek,
        refs,
      }),
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();

    if (data.h?.c !== 0) {
      throw new Error(`API返回错误: ${data.h?.e || '未知错误'}`);
    }

    return {
      success: true,
      answer: data.c?.answers || '',
      deepSeek: data.c?.deep_seek || '',
      noRecall: data.c?.no_recall || false,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// MCP服务器初始化
const server = new Server(
  { name: 'getnote-mcp-server', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// 工具列表
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

// 工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'getnote_search') {
    const { question, deep_seek = true, refs = true } = args;

    if (!question) throw new Error('question 必填');
    if (!CONFIG.API_TOKEN || !CONFIG.KNOWLEDGE_BASE_ID) {
      throw new Error('缺少 GETNOTE_API_TOKEN 或 GETNOTE_KNOWLEDGE_BASE_ID');
    }

    const result = await callGetnoteAPI(question, deep_seek, refs);
    if (!result.success) throw new Error(result.error);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            answer: result.answer,
            deep_seek_thought: result.deepSeek,
            no_recall: result.noRecall,
            source: 'Get笔记知识库',
          }, null, 2),
        },
      ],
    };
  }

  throw new Error(`未知工具: ${name}`);
});

// 启动
async function main() {
  if (!CONFIG.API_TOKEN) {
    console.error('错误: 缺少 GETNOTE_API_TOKEN');
    process.exit(1);
  }
  if (!CONFIG.KNOWLEDGE_BASE_ID) {
    console.error('错误: 缺少 GETNOTE_KNOWLEDGE_BASE_ID');
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Get笔记 MCP 服务器已启动');
}

main().catch(console.error);
```

---

## 四、配置到Claude Code

### 方式1：项目级配置（推荐）

在项目根目录创建 `.claude/mcp.json`：

```json
{
  "mcpServers": {
    "getnote": {
      "command": "node",
      "args": ["/Users/你的用户名/projects/mcp-servers/getnote/index.js"],
      "env": {
        "GETNOTE_API_TOKEN": "你的API Token",
        "GETNOTE_KNOWLEDGE_BASE_ID": "你的知识库ID"
      }
    }
  }
}
```

### 方式2：全局配置

编辑 `~/.claude/settings.json`，在 `mcpServers` 下添加：

```json
"getnote": {
  "command": "node",
  "args": ["/Users/你的用户名/projects/mcp-servers/getnote/index.js"],
  "env": {
    "GETNOTE_API_TOKEN": "你的API Token",
    "GETNOTE_KNOWLEDGE_BASE_ID": "你的知识库ID"
  }
}
```

**重启Claude Code生效**。

---

## 五、使用方式

### 方式1：直接指令

```
你："查一下我的Get笔记，关于供应商管理的内容"
```

AI自动调用 `getnote_search` 工具。

### 方式2：自然语言

```
你："我的供应商管理框架是什么？"
```

AI识别问题后主动查询。

---

## 六、API参数说明

### getnote_search

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| question | string | ✅ | 搜索问题 |
| deep_seek | boolean | ❌ | 深度思考（默认true） |
| refs | boolean | ❌ | 返回引用来源（默认true） |

---

## 七、常见问题

**Q: 提示"缺少 GETNOTE_API_TOKEN"？**
A: 检查 `.claude/mcp.json` 中的 `env` 配置是否正确。

**Q: 调用失败？**
A: 检查API Token和知识库ID是否正确，是否已达到配额限制。

**Q: 多个项目都要用？**
A: 改用全局配置（`~/.claude/settings.json`），所有项目共用。

---

*最后更新：2026-02-23*