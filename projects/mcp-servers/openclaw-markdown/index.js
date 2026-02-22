#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import TurndownService from "turndown";

// 初始化 Turndown
const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
  headingStyle: "atx"
});

// 隐私脱敏 - 检测并替换URL中的敏感参数
const SENSITIVE_PARAMS = ["token", "key", "secret", "password", "pwd", "auth", "token", "apikey", "api_key"];

function redactUrl(url) {
  if (!url) return url;
  try {
    const urlObj = new URL(url);
    let modified = false;

    SENSITIVE_PARAMS.forEach(param => {
      if (urlObj.searchParams.has(param)) {
        urlObj.searchParams.set(param, "***");
        modified = true;
      }
    });

    return modified ? urlObj.toString() : url;
  } catch {
    return url;
  }
}

// HTTP请求函数
async function fetchUrl(url, acceptMarkdown = true) {
  const headers = {};
  if (acceptMarkdown) {
    headers["Accept"] = "text/markdown, text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8";
  }

  const response = await fetch(url, { headers });

  // 检查Content-Signal
  const contentSignal = response.headers.get("Content-Signal") || "";
  const policyAction = contentSignal.includes("ai-train=no") ? "block_train" : "allow_input";

  // 检查响应类型
  const contentType = response.headers.get("Content-Type") || "";
  const isMarkdown = contentType.includes("text/markdown");
  const isHtml = contentType.includes("text/html");

  let text = await response.text();
  let format = "unknown";
  let fallbackUsed = false;

  if (isMarkdown) {
    format = "markdown";
  } else if (isHtml) {
    // HTML转Markdown
    text = turndownService.turndown(text);
    format = "html-fallback";
    fallbackUsed = true;
  }

  return {
    url,
    finalUrl: response.url,
    contentType,
    status: response.status,
    policyAction,
    content: text,
    format,
    fallbackUsed,
    headers: {
      contentSignal,
      xMarkdownTokens: response.headers.get("x-markdown-tokens")
    }
  };
}

// 创建MCP服务器
const server = new Server(
  {
    name: "openclaw-markdown-browser",
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
        name: "fetch_markdown",
        description: "智能获取网页内容 - 支持Cloudflare Markdown协议、隐私脱敏、策略检查、HTML自动转Markdown",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "要获取的URL"
            }
          },
          required: ["url"]
        }
      }
    ]
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "fetch_markdown") {
    const url = request.params.arguments?.url;

    if (!url) {
      throw new Error("URL is required");
    }

    try {
      const result = await fetchUrl(url);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error.message,
              url: redactUrl(url)
            }, null, 2)
          }
        ],
        isError: true
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("OpenClaw Markdown MCP Server running");
}

main().catch(console.error);
