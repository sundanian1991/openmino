import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { deleteAssetLink } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

/** 删除一条卡片关联。 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; linkId: string }> }
) {
  ensureDb();
  const { linkId } = await params;
  deleteAssetLink(Number(linkId));
  return NextResponse.json({ ok: true });
}
