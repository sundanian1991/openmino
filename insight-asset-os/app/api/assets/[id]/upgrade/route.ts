import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getAsset, upgradeAsset } from "@/lib/db/queries";
import { getSetting, KERNEL_KEY, getLLMConfig } from "@/lib/db/queries";
import { chat } from "@/lib/llm/client";
import { buildUpgradePrompt } from "@/lib/llm/prompts";
import { extractJson } from "@/lib/llm/json";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  ensureDb();
  const { id } = await params;
  const asset = getAsset(Number(id));
  if (!asset) return NextResponse.json({ ok: false, error: "资产不存在" }, { status: 404 });

  const llmConfig = getLLMConfig();
  if (!llmConfig.apiKey) {
    return NextResponse.json({ ok: false, error: "请先配置 LLM" }, { status: 400 });
  }

  const prompt = buildUpgradePrompt(asset.title, asset.insight ?? "");
  const kernel = getSetting(KERNEL_KEY) ?? undefined;
  try {
    const reply = await chat(
      [{ role: "system", content: prompt.system }, { role: "user", content: prompt.user }],
      llmConfig,
      kernel
    );
    const result = extractJson<{ is_contrarian: boolean; evidence_level: string; reasoning: string; dimensions: string[] }>(reply);
    upgradeAsset(Number(id), {
      is_contrarian: result.is_contrarian,
      evidence_level: result.evidence_level,
      reasoning: result.reasoning,
      dimensions: result.dimensions,
    });
    return NextResponse.json({ ok: true, data: getAsset(Number(id)) });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
