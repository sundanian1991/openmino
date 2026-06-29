import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { updateKernelEntry, deleteKernelEntry } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  ensureDb();
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  updateKernelEntry(Number(id), body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  ensureDb();
  const { id } = await params;
  deleteKernelEntry(Number(id));
  return NextResponse.json({ ok: true });
}
