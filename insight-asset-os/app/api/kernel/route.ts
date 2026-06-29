import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { listKernelEntries, createKernelEntry } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  ensureDb();
  const url = new URL(req.url);
  const category = url.searchParams.get("category") as any;
  return NextResponse.json({ ok: true, data: listKernelEntries(category) });
}

export async function POST(req: NextRequest) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  if (!body.category || !body.judgment) {
    return NextResponse.json({ ok: false, error: "category 和 judgment 必填" }, { status: 400 });
  }
  const id = createKernelEntry(body);
  return NextResponse.json({ ok: true, id });
}
