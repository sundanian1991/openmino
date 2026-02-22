#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 记忆目录路径（相对于项目根目录）
const PROJECT_ROOT = join(__dirname, "../../../");
const MEMORY_DIRS = [
  join(PROJECT_ROOT, "memory/daily"),
  join(PROJECT_ROOT, ".claude/rules")
];

// 从文件中提取内容片段
function extractRelevantContent(filePath, query, contextLines = 2) {
  try {
    const content = readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    const queryLower = query.toLowerCase();
    const results = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes(queryLower)) {
        // 提取上下文
        const start = Math.max(0, i - contextLines);
        const end = Math.min(lines.length, i + contextLines + 1);
        const context = lines.slice(start, end).join("\n");

        results.push({
          lineNumber: i + 1,
          content: context.trim(),
          match: line.trim()
        });

        // 限制返回数量
        if (results.length >= 5) break;
      }
    }

    return results;
  } catch (error) {
    return [];
  }
}

// 递归搜索目录
function searchDirectory(dirPath, query) {
  const results = [];

  try {
    const entries = readdirSync(dirPath);

    for (const entry of entries) {
      const fullPath = join(dirPath, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // 递归搜索子目录
        results.push(...searchDirectory(fullPath, query));
      } else if (entry.endsWith(".md")) {
        // 搜索Markdown文件
        const matches = extractRelevantContent(fullPath, query);
        if (matches.length > 0) {
          results.push({
            file: fullPath.replace(PROJECT_ROOT, ""),
            matches: matches
          });
        }
      }
    }
  } catch (error) {
    // 忽略无法访问的目录
  }

  return results;
}

// 搜索记忆
function searchMemory(query) {
  if (!query || query.trim().length === 0) {
    return { error: "Query cannot be empty" };
  }

  const allResults = [];

  for (const dir of MEMORY_DIRS) {
    allResults.push(...searchDirectory(dir, query));
  }

  // 按匹配数量排序
  allResults.sort((a, b) => b.matches.length - a.matches.length);

  return {
    query,
    totalFiles: allResults.length,
    totalMatches: allResults.reduce((sum, r) => sum + r.matches.length, 0),
    results: allResults.slice(0, 10) // 限制返回前10个文件
  };
}

// 创建MCP服务器
const server = new Server(
  {
    name: "memory-search-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// 注册工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_memory",
        description: "智能搜索Mino的记忆文件 - 搜索daily日记和rules配置，返回相关内容片段",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "搜索关键词（支持中文）"
            }
          },
          required: ["query"]
        }
      },
      {
        name: "list_memory_files",
        description: "列出所有记忆文件",
        inputSchema: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["daily", "rules", "all"],
              description: "文件类型：daily（日记）、rules（配置）、all（全部）",
              default: "all"
            }
          }
        }
      }
    ]
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_memory") {
    const query = args?.query;

    if (!query) {
      throw new Error("Query is required");
    }

    const result = searchMemory(query);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  if (name === "list_memory_files") {
    const type = args?.type || "all";
    const files = [];

    const dirs = [];
    if (type === "daily" || type === "all") {
      dirs.push(MEMORY_DIRS[0]);
    }
    if (type === "rules" || type === "all") {
      dirs.push(MEMORY_DIRS[1]);
    }

    for (const dir of dirs) {
      try {
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isFile() && entry.name.endsWith(".md")) {
            const fullPath = join(dir, entry.name);
            const stat = statSync(fullPath);
            files.push({
              name: entry.name,
              path: fullPath.replace(PROJECT_ROOT, ""),
              size: stat.size,
              modified: stat.mtime
            });
          }
        }
      } catch (error) {
        // 忽略
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ files, count: files.length }, null, 2)
        }
      ]
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Memory Search MCP Server running");
}

main().catch(console.error);
