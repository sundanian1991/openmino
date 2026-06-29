import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getAsset, getLLMConfig } from "@/lib/db/queries";
import { relateAsset } from "@/lib/core/relate";

export const dynamic = "force-dynamic";

/**
 * 为指定卡片触发关联发现。采集后通常自动调用，
 * 此端点供详情页「重新发现关联」手动触发用。
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  ensureDb();
  const { id } = await params;
  const numId = Number(id);
  if (!getAsset(numId)) {
    return NextResponse.json({ ok: false, error: "资产不存在" }, { status: 404 });
  }
  const llmConfig = getLLMConfig();
  if (!llmConfig.apiKey) {
    return NextResponse.json({ ok: false, error: "请先配置 LLM API Key" }, { status: 400 });
  }
  const kernel = undefined; // 关联发现不注入 kernel，避免污染语义判断
  const outcome = await relateAsset(numId, llmConfig, kernel);
  return NextResponse.json(outcome);
}
