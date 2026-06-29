import fs from "fs";
import path from "path";

/**
 * 文件解析器分发：根据 source_type 调用对应解析器，返回纯文本。
 * 解析失败时抛错（由调用方决定如何处理，如跳过该文件）。
 */
export type SourceType = "md" | "txt" | "pdf" | "docx" | "html";

export interface ParseResult {
  text: string;
  type: SourceType;
}

/** 根据文件扩展名推断 source_type */
export function detectType(filePath: string): SourceType | null {
  const ext = path.extname(filePath).toLowerCase().replace(".", "");
  if (ext === "md" || ext === "markdown") return "md";
  if (ext === "txt") return "txt";
  if (ext === "pdf") return "pdf";
  if (ext === "docx") return "docx";
  if (ext === "html" || ext === "htm") return "html";
  return null;
}

/** 截断长文，保留首尾，避免超出 LLM 上下文窗口 */
export function truncate(text: string, maxChars = 8000): string {
  if (text.length <= maxChars) return text;
  const head = text.slice(0, Math.floor(maxChars * 0.7));
  const tail = text.slice(text.length - Math.floor(maxChars * 0.3));
  return `${head}\n\n[...内容过长已截断...]\n\n${tail}`;
}

export async function parseFile(filePath: string): Promise<ParseResult> {
  const type = detectType(filePath);
  if (!type) {
    throw new Error(`不支持的文件类型: ${filePath}`);
  }
  const buf = fs.readFileSync(filePath);
  return parseBuffer(filePath, buf);
}

/**
 * 从内存 Buffer 解析文件内容 —— 与 parseFile 共享解析逻辑。
 * 上传场景（浏览器拿到 File）无磁盘路径，走这条路径。
 */
export async function parseBuffer(name: string, buf: Buffer): Promise<ParseResult> {
  const type = detectType(name);
  if (!type) {
    throw new Error(`不支持的文件类型: ${name}`);
  }
  switch (type) {
    case "md":
    case "txt":
      return { text: buf.toString("utf-8"), type };
    case "pdf":
      return { text: await parsePdf(buf), type };
    case "docx":
      return { text: await parseDocx(buf), type };
    case "html":
      return { text: parseHtml(buf.toString("utf-8")), type };
  }
}

function parsePlainText(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}

async function parsePdf(buf: Buffer): Promise<string> {
  // 用动态 require 规避 pdf-parse 在 import 时就执行测试代码的已知问题
  const { default: pdfParse } = require("pdf-parse") as {
    default: (buf: Buffer) => Promise<{ text: string }>;
  };
  const data = await pdfParse(buf);
  return data.text;
}

async function parseDocx(buf: Buffer): Promise<string> {
  const mammoth = require("mammoth") as {
    extractRawText: (opts: { buffer: Buffer }) => Promise<{ value: string }>;
  };
  const result = await mammoth.extractRawText({ buffer: buf });
  return result.value;
}

function parseHtml(html: string): string {
  const cheerio = require("cheerio") as typeof import("cheerio");
  const $ = cheerio.load(html);
  // 移除脚本、样式等非正文内容
  $("script,style,noscript").remove();
  // 公众号文章正文通常在 #js_content 或 article 标签
  const article =
    $("#js_content").text() ||
    $("article").text() ||
    $("body").text();
  return article.replace(/\s+\n/g, "\n").trim();
}
