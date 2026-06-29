import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getLLMConfig, KERNEL_KEY, getSetting } from "@/lib/db/queries";
import { classifyAsset } from "@/lib/core/classify";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  const assetId = Number(body.assetId);
  if (!assetId) {
    return NextResponse.json(
      { ok: false, error: "缺少 assetId" },
      { status: 400 }
    );
  }

  const config = getLLMConfig();
  if (!config.apiKey) {
    return NextResponse.json(
      { ok: false, error: "未配置 LLM API Key" },
      { status: 400 }
    );
  }

  const kernel = getSetting(KERNEL_KEY) ?? undefined;
  const result = await classifyAsset(assetId, config, kernel);
  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result);
}
