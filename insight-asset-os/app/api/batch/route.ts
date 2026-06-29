import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getLLMConfig } from "@/lib/db/queries";
import { batchProcess } from "@/lib/core/pipeline-batch";

export const dynamic = "force-dynamic";

/**
 * POST /api/batch — 批量智能处理（embedding + 聚类 + 主题生成）
 */
export async function POST() {
  ensureDb();

  const llmConfig = getLLMConfig();
  // 批量管线只需要 embedding（本地），不强制要求 LLM API Key
  // 但若有 LLM，后续深度提取可由独立管线完成

  const result = await batchProcess();
  return NextResponse.json(result);
}
