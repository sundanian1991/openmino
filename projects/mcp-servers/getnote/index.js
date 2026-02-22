#!/usr/bin/env node

/**
 * Get笔记知识库 MCP 服务器
 *
 * 功能：查询Get笔记知识库内容
 * 作者：Mino
 * 版本：1.0.0
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// ============ 配置（从环境变量读取）============
const CONFIG = {
  API_URL: 'https://open-api.biji.com/getnote/openapi',
  API_TOKEN: process.env.GETNOTE_API_TOKEN || '',
  KNOWLEDGE_BASE_ID: process.env.GETNOTE_KNOWLEDGE_BASE_ID || '',
};

// ============ 工具定义 ============
const TOOLS = [
  {
    name: 'getnote_search',
    description: '搜索Get笔记知识库内容。用于查询用户在Get笔记中存储的知识、笔记、文档等。支持自然语言提问，AI会返回相关的知识内容。',
    inputSchema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: '要搜索的问题或关键词',
        },
        deep_seek: {
          type: 'boolean',
          description: '是否使用深度思考模式（默认true）',
          default: true,
        },
        refs: {
          type: 'boolean',
          description: '是否返回引用来源（默认true）',
          default: true,
        },
      },
      required: ['question'],
    },
  },
];

// ============ API调用函数 ============
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
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // 检查响应状态
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
    return {
      success: false,
      error: error.message,
    };
  }
}

// ============ MCP服务器初始化 ============
const server = new Server(
  {
    name: 'getnote-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============ 工具列表处理 ============
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// ============ 工具调用处理 ============
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'getnote_search') {
    const { question, deep_seek = true, refs = true } = args;

    // 参数验证
    if (!question || typeof question !== 'string') {
      throw new Error('参数错误: question 必须是字符串');
    }

    if (!CONFIG.API_TOKEN || !CONFIG.KNOWLEDGE_BASE_ID) {
      throw new Error('配置错误: 缺少 GETNOTE_API_TOKEN 或 GETNOTE_KNOWLEDGE_BASE_ID 环境变量');
    }

    // 调用API
    const result = await callGetnoteAPI(question, deep_seek, refs);

    if (!result.success) {
      throw new Error(result.error);
    }

    // 返回结果
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

// ============ 启动服务器 ============
async function main() {
  // 检查配置
  if (!CONFIG.API_TOKEN) {
    console.error('错误: 缺少 GETNOTE_API_TOKEN 环境变量');
    console.error('请设置环境变量: export GETNOTE_API_TOKEN="your-token"');
    process.exit(1);
  }

  if (!CONFIG.KNOWLEDGE_BASE_ID) {
    console.error('错误: 缺少 GETNOTE_KNOWLEDGE_BASE_ID 环境变量');
    console.error('请设置环境变量: export GETNOTE_KNOWLEDGE_BASE_ID="your-kb-id"');
    process.exit(1);
  }

  // 启动服务器
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Get笔记 MCP 服务器已启动');
  console.error(`知识库ID: ${CONFIG.KNOWLEDGE_BASE_ID}`);
}

main().catch((error) => {
  console.error('服务器启动失败:', error);
  process.exit(1);
});
