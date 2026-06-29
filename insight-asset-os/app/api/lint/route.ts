import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { lintAssets } from "@/lib/core/lint";

export const dynamic = "force-dynamic";

/** 资产库健康检查：发现孤立、证据不足、信息单薄等问题 */
export async function GET() {
  ensureDb();
  try {
    const report = lintAssets();
    return NextResponse.json({ ok: true, data: report });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
