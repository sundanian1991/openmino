#!/usr/bin/env node

/**
 * MemOS MCP Server
 *
 * 为 Mino 提供云端记忆能力
 * - add_message: 添加对话记忆
 * - search_memory: 检索相关记忆
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ============ 配置 ============
const CONFIG = {
  API_BASE: "https://memos.memtensor.cn/api/openmem/v1",
  API_KEY: process.env.MEMOS_API_KEY || "mpg-IjBklEsmy6TBl6JF55QO4WOZ4u/yzfEh84OznkPz",
  DEFAULT_USER_ID: "mino",
  DEFAULT_CONVERSATION_ID: "my-agent-session",
};

// ============ 工具定义 ============
const TOOLS = [
  {
    name: "add_message",
    description: "添加对话记忆到 MemOS（一条或多条消息）",
    inputSchema: {
      type: "object",
      properties: {
        messages: {
          type: "array",
          description: "消息数组，每条消息包含 role（user/assistant）和 content",
          items: {
            type: "object",
            properties: {
              role: {
                type: "string",
                enum: ["user", "assistant", "system"],
                description: "消息发送者角色",
              },
              content: {
                type: "string",
                description: "消息内容",
              },
            },
            required: ["role", "content"],
          },
        },
        user_id: {
          type: "string",
          description: "用户唯一标识（默认：mino）",
        },
        conversation_id: {
          type: "string",
          description: "会话唯一标识（默认：my-agent-session）",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "自定义标签（如：#工作、#决策、#学习）",
        },
      },
      required: ["messages"],
    },
  },
  {
    name: "search_memory",
    description: "从 MemOS 检索相关记忆",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "查询内容（问题或关键词）",
        },
        user_id: {
          type: "string",
          description: "用户唯一标识（默认：mino）",
        },
        conversation_id: {
          type: "string",
          description: "会话唯一标识（可选）",
        },
        memory_limit_number: {
          type: "number",
          description: "返回记忆条数上限（默认：9，最大：25）",
        },
        include_preference: {
          type: "boolean",
          description: "是否召回偏好记忆（默认：true）",
        },
        include_tool_memory: {
          type: "boolean",
          description: "是否召回工具记忆（默认：false）",
        },
        include_skill: {
          type: "boolean",
          description: "是否召回技能记忆（默认：false）",
        },
      },
      required: ["query"],
    },
  },
];

// ============ HTTP 请求封装 ============
async function callMemOS(endpoint, data) {
  const url = `${CONFIG.API_BASE}${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${CONFIG.API_KEY}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MemOS API 错误 (${response.status}): ${errorText}`);
  }

  return response.json();
}

// ============ Server 创建 ============
const server = new Server(
  {
    name: "memos-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============ 工具列表 ============
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

// ============ 工具调用 ============
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "add_message": {
        const {
          messages,
          user_id = CONFIG.DEFAULT_USER_ID,
          conversation_id = CONFIG.DEFAULT_CONVERSATION_ID,
          tags = [],
        } = args;

        const result = await callMemOS("/add/message", {
          user_id,
          conversation_id,
          messages,
          tags,
          async_mode: true,
        });

        return {
          content: [{
            type: "text",
            text: `✅ 记忆已添加\ntask_id: ${result.data?.task_id || "未知"}\n状态: ${result.data?.status || "未知"}`,
          }],
        };
      }

      case "search_memory": {
        const {
          query,
          user_id = CONFIG.DEFAULT_USER_ID,
          conversation_id,
          memory_limit_number = 9,
          include_preference = true,
          include_tool_memory = false,
          include_skill = false,
        } = args;

        const data = {
          query,
          user_id,
          memory_limit_number,
          include_preference,
          include_tool_memory,
          include_skill,
        };

        if (conversation_id) {
          data.conversation_id = conversation_id;
        }

        const result = await callMemOS("/search/memory", data);

        // 格式化返回结果
        const { data: memoryData } = result;
        const parts = [];

        // 事实记忆
        if (memoryData.memory_detail_list?.length > 0) {
          parts.push("📝 **事实记忆**:");
          memoryData.memory_detail_list.forEach((mem, idx) => {
            parts.push(`${idx + 1}. ${mem.memory_key || "无标题"}`);
            parts.push(`   ${mem.memory_value}`);
            parts.push(`   相关度: ${(mem.relativity * 100).toFixed(0)}% | 类型: ${mem.memory_type}\n`);
          });
        }

        // 偏好记忆
        if (memoryData.preference_detail_list?.length > 0) {
          parts.push("❤️ **偏好记忆**:");
          memoryData.preference_detail_list.forEach((pref, idx) => {
            parts.push(`${idx + 1}. ${pref.preference}`);
            if (pref.reasoning) {
              parts.push(`   原因: ${pref.reasoning}`);
            }
            parts.push(`   相关度: ${(pref.relativity * 100).toFixed(0)}%\n`);
          });
        }

        // 工具记忆
        if (memoryData.tool_memory_detail_list?.length > 0) {
          parts.push("🔧 **工具记忆**:");
          memoryData.tool_memory_detail_list.forEach((tool, idx) => {
            parts.push(`${idx + 1}. ${tool.tool_value}`);
            parts.push(`   类型: ${tool.tool_type}\n`);
          });
        }

        // 技能记忆
        if (memoryData.skill_detail_list?.length > 0) {
          parts.push("⚡ **技能记忆**:");
          memoryData.skill_detail_list.forEach((skill, idx) => {
            const skillValue = skill.skill_value || {};
            parts.push(`${idx + 1}. ${skillValue.name || "未命名技能"}`);
            if (skillValue.description) {
              parts.push(`   描述: ${skillValue.description}`);
            }
            parts.push(`   相关度: ${skill.relativity || "N/A"}\n`);
          });
        }

        if (parts.length === 0) {
          parts.push("未找到相关记忆");
        }

        return {
          content: [{
            type: "text",
            text: parts.join("\n"),
          }],
        };
      }

      default:
        throw new Error(`未知工具: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: "text",
        text: `❌ 错误: ${error.message}`,
      }],
      isError: true,
    };
  }
});

// ============ 启动 Server ============
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MemOS MCP Server 运行中...");
}

main().catch((error) => {
  console.error("Server 启动失败:", error);
  process.exit(1);
});
