import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getLLMConfig, KERNEL_KEY, getAllSettings } from "@/lib/db/queries";
import { testConnection } from "@/lib/llm/test-connection";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  // 支持用请求体里的临时配置测试（未保存前先测）
  const current = getLLMConfig();
  const config = {
    baseURL: body.baseURL ?? current.baseURL,
    apiKey:
      body.apiKey && !body.apiKey.includes("****")
        ? body.apiKey
        : current.apiKey,
    model: body.model ?? current.model,
  };

  if (!config.apiKey) {
    return NextResponse.json(
      { ok: false, error: "未配置 API Key，请先填写" },
      { status: 400 }
    );
  }

  const kernel = getAllSettings()[KERNEL_KEY] ?? undefined;
  const result = await testConnection(config, kernel);
  return NextResponse.json(result);
}
