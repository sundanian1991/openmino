import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getSetting, KERNEL_KEY, getLLMConfig } from "@/lib/db/queries";
import { chat } from "@/lib/llm/client";
import { buildScaffoldPrompt } from "@/lib/llm/prompts";
import { extractJson } from "@/lib/llm/json";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  if (!body.topic) return NextResponse.json({ ok: false, error: "topic 必填" }, { status: 400 });

  const llmConfig = getLLMConfig();
  if (!llmConfig.apiKey) return NextResponse.json({ ok: false, error: "请先配置 LLM" }, { status: 400 });

  const kernel = getSetting(KERNEL_KEY) ?? "";

  // 查找写作风格配置
  let styleConfig: string | undefined;
  if (body.style) {
    const { listWritingStyles } = await import("@/lib/db/queries");
    const styles = listWritingStyles();
    const matched = styles.find(s => s.name === body.style);
    if (matched) {
      try {
        const config = JSON.parse(matched.config);
        styleConfig = Object.entries(config)
          .map(([k, v]) => `- ${k}：${v}`)
          .join("\n");
      } catch {}
    }
  }

  const prompt = buildScaffoldPrompt(body.topic, body.message ?? "", kernel, styleConfig);

  try {
    const reply = await chat(
      [{ role: "system", content: prompt.system }, { role: "user", content: prompt.user }],
      llmConfig,
      kernel
    );
    const scaffold = extractJson<{ title: string; sections: { heading: string; purpose: string; key_points: string[] }[] }>(reply);
    return NextResponse.json({ ok: true, data: scaffold });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
