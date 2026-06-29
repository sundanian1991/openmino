import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getStats } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  ensureDb();
  return NextResponse.json({ ok: true, data: getStats() });
}
