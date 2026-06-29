import { NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { listAssets, createAsset, type AssetFilter } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  ensureDb();
  const url = new URL(req.url);
  const filter: AssetFilter = {};
  const status = url.searchParams.get("status");
  if (status) filter.status = status as any;
  const type = url.searchParams.get("type");
  if (type) filter.type = type as any;
  const topic = url.searchParams.get("topic_id");
  if (topic) filter.topic_id = Number(topic);
  const q = url.searchParams.get("q");
  if (q) filter.q = q;
  return NextResponse.json({ ok: true, data: listAssets(filter) });
}

export async function POST(req: Request) {
  ensureDb();
  const body = await req.json().catch(() => ({}));
  if (!body.title) {
    return NextResponse.json({ ok: false, error: "title 必填" }, { status: 400 });
  }
  const id = createAsset(body);
  return NextResponse.json({ ok: true, id });
}
