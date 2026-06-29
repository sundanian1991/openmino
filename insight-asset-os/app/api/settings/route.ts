import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import {
  getAllSettings,
  setSetting,
  VAULT_PATH_KEY,
  KERNEL_KEY,
  getLLMConfig,
  setLLMConfig,
  type LLMConfig,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  ensureDb();
  const llm = getLLMConfig();
  const all = getAllSettings();
  // 出于安全，返回时遮蔽 apiKey（只透露是否已设置）
  return NextResponse.json({
    llm: {
      baseURL: llm.baseURL,
      apiKey: llm.apiKey ? llm.apiKey.slice(0, 4) + "****" : "",
      model: llm.model,
    },
    llmApiKeySet: Boolean(llm.apiKey),
    vaultPath: all[VAULT_PATH_KEY] ?? "",
    insightKernel: all[KERNEL_KEY] ?? "",
  });
}

export async function PUT(req: NextRequest) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  const { llm, vaultPath, insightKernel } = body as {
    llm?: Partial<LLMConfig> & { apiKey?: string };
    vaultPath?: string;
    insightKernel?: string;
  };

  if (llm) {
    const current = getLLMConfig();
    const merged: LLMConfig = {
      baseURL: llm.baseURL ?? current.baseURL,
      model: llm.model ?? current.model,
      // apiKey 若为空或含 **** 表示用户未修改，保留原值
      apiKey:
        llm.apiKey && !llm.apiKey.includes("****")
          ? llm.apiKey
          : current.apiKey,
    };
    setLLMConfig(merged);
  }
  if (typeof vaultPath === "string") setSetting(VAULT_PATH_KEY, vaultPath);
  if (typeof insightKernel === "string") setSetting(KERNEL_KEY, insightKernel);

  return NextResponse.json({ ok: true });
}
