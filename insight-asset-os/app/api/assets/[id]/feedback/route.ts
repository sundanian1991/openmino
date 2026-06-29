import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { getAsset, addFeedback, listFeedback } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  ensureDb();
  const { id } = await params;
  if (!getAsset(Number(id))) return NextResponse.json({ ok: false, error: "资产不存在" }, { status: 404 });
  return NextResponse.json({ ok: true, data: listFeedback(Number(id)) });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  ensureDb();
  const { id } = await params;
  if (!getAsset(Number(id))) return NextResponse.json({ ok: false, error: "资产不存在" }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  if (!body.content) return NextResponse.json({ ok: false, error: "content 必填" }, { status: 400 });
  addFeedback(Number(id), body.content, body.type ?? null);
  return NextResponse.json({ ok: true, data: listFeedback(Number(id)) });
}
