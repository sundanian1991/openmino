import fs from "fs";
import path from "path";
import { parseFile, parseBuffer, detectType, type SourceType } from "../indexer";
import { chat } from "../llm/client";
import { buildIntakePrompt } from "../llm/prompts";
import { extractJson } from "../llm/json";
import { createAsset } from "../db/queries";
import type { LLMConfig } from "../llm/client";

// ===================== scan =====================

export interface ScannedFile {
  path: string;
  name: string;
  type: SourceType;
  size: number;
}

/**
 * 递归扫描目录，返回所有受支持类型的文件。
 */
export function scanDirectory(dir: string): ScannedFile[] {
  if (!fs.existsSync(dir)) {
    throw new Error(`目录不存在: ${dir}`);
  }
  const stat = fs.statSync(dir);
  if (!stat.isDirectory()) {
    throw new Error(`不是目录: ${dir}`);
  }

  const results: ScannedFile[] = [];
  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      // 跳过隐藏目录（如 .git, node_modules）
      if (entry.name.startsWith(".")) continue;
      if (entry.name === "node_modules") continue;
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const type = detectType(fullPath);
        if (type) {
          const stat = fs.statSync(fullPath);
          results.push({
            path: fullPath,
            name: entry.name,
            type,
            size: stat.size,
          });
        }
      }
    }
  }
  walk(dir);
  return results.sort((a, b) => a.name.localeCompare(b.name));
}

// ===================== intake =====================

export interface IntakeResult {
  path: string;
  name: string;
  ok: boolean;
  assetId?: number;
  title?: string;
  error?: string;
}

/** LLM 提炼出的结构化知识卡（10 字段 OKF 风格） */
interface IntakeCard {
  title: string;
  insight: string;
  summary?: string;
  key_passages?: string[];
  entities?: string[];
  claims?: { claim: string; evidence?: string; confidence: "high" | "medium" | "low" }[];
  connections?: string;
  is_contrarian?: boolean;
  evidence_level?: string;
  dimensions?: string[];
  okf_type?: string;
  tags: string[];
}

/**
 * 共享提炼逻辑：拿到解析后的纯文本 → LLM 提炼 → 校验 → 返回结构化卡片。
 * path 模式（fs 扫描）和 buffer 模式（浏览器上传）都走这里。
 * 关联发现由独立流程 relateAsset 处理，不塞进采集 prompt。
 */
async function extractCard(
  text: string,
  config: LLMConfig,
  kernel?: string
): Promise<IntakeCard> {
  const { system, user } = buildIntakePrompt(text);
  const raw = await chat(
    [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    config,
    kernel
  );
  const card = extractJson<IntakeCard>(raw);

  if (!card.title || !card.insight) {
    throw new Error("LLM 输出缺少 title 或 insight");
  }
  return card;
}

/**
 * 采集单个磁盘文件：解析 → LLM 提炼轻量卡 → 入库。
 * 单个文件失败不影响其他文件。
 */
export async function intakeFile(
  filePath: string,
  config: LLMConfig,
  kernel?: string
): Promise<IntakeResult> {
  const name = path.basename(filePath);
  try {
    const { text, type } = await parseFile(filePath);
    if (!text.trim()) {
      return { path: filePath, name, ok: false, error: "文件内容为空" };
    }

    const card = await extractCard(text, config, kernel);
    const assetId = createAsset({
      title: card.title,
      insight: card.insight,
      summary: card.summary,
      key_points: Array.isArray(card.key_passages) ? card.key_passages : [],
      entities: Array.isArray(card.entities) ? card.entities : [],
      claims: card.claims ?? [],
      connections: card.connections,
      okf_type: card.okf_type,
      tags: Array.isArray(card.tags) ? card.tags : [],
      raw_content: text,
      source_path: filePath,
      source_type: type,
      is_contrarian: card.is_contrarian ?? false,
      evidence_level: card.evidence_level,
      dimensions: card.dimensions,
    });

    return { path: filePath, name, ok: true, assetId, title: card.title };
  } catch (e) {
    return {
      path: filePath,
      name,
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * 采集上传的内存文件（浏览器 webkitdirectory 场景）。
 * 与 intakeFile 共享 extractCard，但 source_path 存相对路径（webkitRelativePath）。
 */
export async function intakeBuffer(
  name: string,
  buffer: Buffer,
  relativePath: string,
  config: LLMConfig,
  kernel?: string
): Promise<IntakeResult> {
  try {
    const { text, type } = await parseBuffer(name, buffer);
    if (!text.trim()) {
      return { path: relativePath, name, ok: false, error: "文件内容为空" };
    }

    const card = await extractCard(text, config, kernel);
    const assetId = createAsset({
      title: card.title,
      insight: card.insight,
      summary: card.summary,
      key_points: Array.isArray(card.key_passages) ? card.key_passages : [],
      entities: Array.isArray(card.entities) ? card.entities : [],
      claims: card.claims ?? [],
      connections: card.connections,
      okf_type: card.okf_type,
      tags: Array.isArray(card.tags) ? card.tags : [],
      raw_content: text,
      source_path: relativePath,
      source_type: type,
      is_contrarian: card.is_contrarian ?? false,
      evidence_level: card.evidence_level,
      dimensions: card.dimensions,
    });

    return { path: relativePath, name, ok: true, assetId, title: card.title };
  } catch (e) {
    return {
      path: relativePath,
      name,
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * 批量采集磁盘文件：顺序处理（避免并发触发 LLM 限流），逐个返回结果。
 */
export async function intakeFiles(
  filePaths: string[],
  config: LLMConfig,
  kernel?: string,
  onProgress?: (result: IntakeResult) => void
): Promise<IntakeResult[]> {
  const results: IntakeResult[] = [];
  for (const fp of filePaths) {
    const result = await intakeFile(fp, config, kernel);
    results.push(result);
    onProgress?.(result);
  }
  return results;
}
