import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { exportOkf } from "@/lib/output/okf";

export const dynamic = "force-dynamic";

/**
 * POST /api/output/okf — 导出资产库为 OKF 格式
 * Body: { outputDir?: string }（可选，默认 data/vault）
 */
export async function POST(req: Request) {
  ensureDb();

  const body = await req.json().catch(() => ({}));
  const outputDir = body.outputDir || "data/vault";

  const result = exportOkf(outputDir);
  return NextResponse.json(result);
}
