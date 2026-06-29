import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import {
  getAsset,
  updateAsset,
  assignTopic,
  listAssetLinks,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  ensureDb();
  const { id } = await params;
  const asset = getAsset(Number(id));
  if (!asset)
    return NextResponse.json(
      { ok: false, error: "资产不存在" },
      { status: 404 }
    );
  // 一次返回卡片 + 它的相关链接，详情页无需再发请求
  return NextResponse.json({ ok: true, data: asset, links: listAssetLinks(Number(id)) });
}

interface UpdateBody {
  title?: string;
  insight?: string;
  tags?: string[];
  status?: "raw" | "calibrating" | "asset";
  topicId?: number | null;
}

async function handleUpdate(
  req: NextRequest,
  params: Promise<{ id: string }>
) {
  ensureDb();
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as UpdateBody;
  const existing = getAsset(Number(id));
  if (!existing)
    return NextResponse.json(
      { ok: false, error: "资产不存在" },
      { status: 404 }
    );

  // 校准字段
  updateAsset(Number(id), {
    title: body.title,
    insight: body.insight,
    tags: body.tags,
    status: body.status,
  });

  // 主题关联（独立处理，因 updateAsset 不含 topicId）
  if (body.topicId !== undefined) {
    if (body.topicId === null) {
      // 解除关联（直接置空，不走时间线）
      assignTopic(Number(id), 0);
    } else {
      assignTopic(Number(id), body.topicId);
    }
  }

  return NextResponse.json({ ok: true, data: getAsset(Number(id)) });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, params);
}

// PATCH 作为 PUT 的别名，兼容前端两种调用方式
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return handleUpdate(req, params);
}
