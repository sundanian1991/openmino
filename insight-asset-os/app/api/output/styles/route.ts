import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { listWritingStyles, createWritingStyle } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  ensureDb();
  return NextResponse.json({ ok: true, data: listWritingStyles() });
}

export async function POST(req: NextRequest) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  if (!body.name || !body.config) {
    return NextResponse.json({ ok: false, error: "name 和 config 必填" }, { status: 400 });
  }
  const id = createWritingStyle(body.name, body.config);
  return NextResponse.json({ ok: true, id });
}
