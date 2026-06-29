import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { listTopics, createTopic } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  ensureDb();
  return NextResponse.json({ ok: true, data: listTopics() });
}

export async function POST(req: NextRequest) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  if (!body.name) return NextResponse.json({ ok: false, error: "name 必填" }, { status: 400 });
  const id = createTopic(body.name, body.parent_id ?? undefined);
  return NextResponse.json({ ok: true, id });
}
