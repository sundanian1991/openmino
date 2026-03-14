#!/usr/bin/env node

/**
 * Get笔记 MCP Server
 *
 * 为 Mino 提供个人笔记管理能力
 * - save_note: 保存笔记（纯文本、链接、图片）
 * - list_notes: 列出笔记
 * - get_note: 获取笔记详情
 * - list_knowledge: 列出知识库
 * - poll_task: 查询异步任务进度
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ============ 配置 ============
const CONFIG = {
  API_BASE: "https://openapi.biji.com",
  AUTH_TOKEN: process.env.GETNOTE_AUTH_TOKEN || "",
  CLIENT_ID: process.env.GETNOTE_CLIENT_ID || "",
};

// ============ 工具定义 ============
const TOOLS = [
  {
    name: "save_note",
    description: "保存笔记到 Get笔记（支持纯文本、链接、图片）",
    inputSchema: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "笔记内容（纯文本笔记必需）",
        },
        title: {
          type: "string",
          description: "笔记标题（可选）",
        },
        url: {
          type: "string",
          description: "链接 URL（保存链接笔记时使用）",
        },
        type: {
          type: "string",
          enum: ["plain_text", "link", "img_text", "audio", "video"],
          description: "笔记类型（默认：plain_text）",
        },
        tags: {
          type: "array",
          items: { type: "string" },
          description: "标签列表",
        },
        knowledge_id: {
          type: "string",
          description: "知识库 ID（可选）",
        },
      },
      required: [],
    },
  },
  {
    name: "list_notes",
    description: "获取 Get笔记笔记列表",
    inputSchema: {
      type: "object",
      properties: {
        since_id: {
          type: "number",
          description: "起始笔记 ID（用于分页，默认：0）",
        },
        limit: {
          type: "number",
          description: "返回数量限制（默认：20）",
        },
      },
    },
  },
  {
    name: "get_note",
    description: "获取单篇笔记的详细信息",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "笔记 ID",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "list_knowledge",
    description: "获取知识库列表",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "poll_task",
    description: "查询异步任务进度（保存链接/图片后需要轮询）",
    inputSchema: {
      type: "object",
      properties: {
        task_id: {
          type: "string",
          description: "任务 ID",
        },
      },
      required: ["task_id"],
    },
  },
];

// ============ HTTP 请求封装 ============
async function callGetNote(endpoint, data = null, method = "GET") {
  const url = `${CONFIG.API_BASE}${endpoint}`;

  const headers = {
    "Authorization": CONFIG.AUTH_TOKEN,
    "X-Client-ID": CONFIG.CLIENT_ID,
  };

  const options = {
    method,
    headers,
  };

  if (data) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Get笔记 API 错误 (${response.status}): ${errorText}`);
  }

  return response.json();
}

// ============ Server 创建 ============
const server = new Server(
  {
    name: "getnote-mcp-server",
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
      case "save_note": {
        const { content, title, url, type = "plain_text", tags = [], knowledge_id } = args;

        // 构建请求数据
        const data = { type };

        if (content) data.content = content;
        if (title) data.title = title;
        if (url) data.url = url;
        if (tags && tags.length > 0) data.tags = tags;
        if (knowledge_id) data.knowledge_id = knowledge_id;

        const result = await callGetNote("/open/api/v1/resource/note/save", data, "POST");

        if (result.success && result.data) {
          const { task_id, note_id, status } = result.data;

          // 如果有 task_id，说明是异步任务
          if (task_id) {
            return {
              content: [{
                type: "text",
                text: `✅ 笔记保存请求已提交\n任务ID: ${task_id}\n状态: ${status || "处理中"}\n\n使用 poll_task 工具查询任务进度`,
              }],
            };
          }

          // 同步完成，直接返回笔记 ID
          if (note_id) {
            return {
              content: [{
                type: "text",
                text: `✅ 笔记保存成功\n笔记ID: ${note_id}\n状态: ${status || "完成"}`,
              }],
            };
          }
        }

        return {
          content: [{
            type: "text",
            text: `✅ 请求成功\n响应: ${JSON.stringify(result)}`,
          }],
        };
      }

      case "list_notes": {
        const { since_id = 0, limit = 20 } = args;
        const result = await callGetNote(`/open/api/v1/resource/note/list?since_id=${since_id}&limit=${limit}`);

        if (result.success && result.data?.notes) {
          const notes = result.data.notes;
          const parts = [`📝 找到 ${notes.length} 条笔记\n`];

          notes.forEach((note, idx) => {
            parts.push(`${idx + 1}. ${note.title || "无标题"}`);
            parts.push(`   ID: ${note.id}`);
            if (note.tags && note.tags.length > 0) {
              parts.push(`   标签: ${note.tags.join(", ")}`);
            }
            const preview = note.content?.substring(0, 100) || "";
            if (preview) {
              parts.push(`   预览: ${preview}${note.content?.length > 100 ? "..." : ""}`);
            }
            parts.push("");
          });

          return {
            content: [{
              type: "text",
              text: parts.join("\n"),
            }],
          };
        }

        return {
          content: [{
            type: "text",
            text: "未找到笔记",
          }],
        };
      }

      case "get_note": {
        const { id } = args;
        const result = await callGetNote(`/open/api/v1/resource/note/detail?id=${id}`);

        if (result.success && result.data) {
          const note = result.data;
          const parts = [];

          parts.push(`📄 **${note.title || "无标题"}**`);
          parts.push(`ID: ${note.id}`);
          parts.push(`类型: ${note.type || "plain_text"}`);

          if (note.tags && note.tags.length > 0) {
            parts.push(`标签: ${note.tags.join(", ")}`);
          }

          if (note.knowledge_id) {
            parts.push(`知识库ID: ${note.knowledge_id}`);
          }

          parts.push("\n---\n");
          parts.push(note.content || "无内容");

          return {
            content: [{
              type: "text",
              text: parts.join("\n"),
            }],
          };
        }

        return {
          content: [{
            type: "text",
            text: `未找到笔记 ID: ${id}`,
          }],
        };
      }

      case "list_knowledge": {
        const result = await callGetNote("/open/api/v1/resource/knowledge/list");

        if (result.success && result.data?.knowledge_list) {
          const knowledgeList = result.data.knowledge_list;
          const parts = [`📚 找到 ${knowledgeList.length} 个知识库\n`];

          knowledgeList.forEach((kb, idx) => {
            parts.push(`${idx + 1}. ${kb.name || "未命名知识库"}`);
            parts.push(`   ID: ${kb.id}`);
            parts.push(`   描述: ${kb.description || "无描述"}`);
            parts.push("");
          });

          return {
            content: [{
              type: "text",
              text: parts.join("\n"),
            }],
          };
        }

        return {
          content: [{
            type: "text",
            text: "未找到知识库",
          }],
        };
      }

      case "poll_task": {
        const { task_id } = args;
        const result = await callGetNote("/open/api/v1/resource/note/task/progress", { task_id }, "POST");

        if (result.success && result.data) {
          const { status, note_id, error } = result.data;
          const parts = [];

          parts.push(`📊 任务状态查询`);
          parts.push(`任务ID: ${task_id}`);
          parts.push(`状态: ${status || "未知"}`);

          if (note_id) {
            parts.push(`笔记ID: ${note_id}`);
          }

          if (error) {
            parts.push(`错误信息: ${error}`);
          }

          return {
            content: [{
              type: "text",
              text: parts.join("\n"),
            }],
          };
        }

        return {
          content: [{
            type: "text",
            text: `查询任务失败: ${task_id}`,
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
  // 验证配置
  if (!CONFIG.AUTH_TOKEN || !CONFIG.CLIENT_ID) {
    console.error("错误: 缺少 GETNOTE_AUTH_TOKEN 或 GETNOTE_CLIENT_ID 环境变量");
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Get笔记 MCP Server 运行中...");
}

main().catch((error) => {
  console.error("Server 启动失败:", error);
  process.exit(1);
});