import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { updateTopic, deleteTopic, getTopicImpact } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  ensureDb();
  const { id } = await params;
  const impact = getTopicImpact(Number(id));
  return NextResponse.json({ ok: true, data: impact });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  ensureDb();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  updateTopic(Number(id), body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  ensureDb();
  const { id } = await params;
  const impact = deleteTopic(Number(id));
  return NextResponse.json({ ok: true, impact });
}
