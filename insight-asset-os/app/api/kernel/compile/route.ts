import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { compileKernel, setSetting, KERNEL_KEY } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function POST() {
  ensureDb();
  const compiled = compileKernel();
  setSetting(KERNEL_KEY, compiled);
  return NextResponse.json({ ok: true, kernel: compiled });
}
