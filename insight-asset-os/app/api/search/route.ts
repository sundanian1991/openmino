import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/ensure-init";
import { embed, isEmbedderAvailable } from "@/lib/embedder";
import { semanticSearch } from "@/lib/embedder/search";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/search?q=查询文本&mode=semantic|keyword
 *
 * mode=semantic: 使用本地 embedding 做语义搜索（需先运行智能聚类生成 embedding）
 * mode=keyword（默认）: 使用 SQLite LIKE 搜索
 */
export async function GET(req: NextRequest) {
  ensureDb();

  const q = req.nextUrl.searchParams.get("q") ?? "";
  const mode = req.nextUrl.searchParams.get("mode") ?? "keyword";

  if (!q.trim()) {
    return NextResponse.json({ ok: true, data: [], mode });
  }

  if (mode === "semantic" && isEmbedderAvailable()) {
    try {
      // 生成查询 embedding
      const queryVec = await embed(q);

      // 加载所有 embedding
      const rows = getDb()
        .prepare(
          `SELECT e.asset_id, e.embedding, a.title, a.insight
           FROM asset_embeddings e
           JOIN assets a ON a.id = e.asset_id
           ORDER BY a.updated_at DESC`
        )
        .all() as {
        asset_id: number;
        embedding: string;
        title: string;
        insight: string | null;
      }[];

      if (rows.length === 0) {
        return NextResponse.json({
          ok: true,
          data: [],
          mode: "semantic",
          hint: "暂无 embedding 数据，请先到「设置」运行智能聚类",
        });
      }

      const candidates = rows.map((r) => ({
        assetId: r.asset_id,
        embedding: JSON.parse(r.embedding) as number[],
        title: r.title,
        insight: r.insight,
      }));

      const results = semanticSearch(queryVec, candidates, 15, 0.2);

      return NextResponse.json({
        ok: true,
        data: results.map((r) => ({
          id: r.assetId,
          title: r.title,
          insight: r.insight,
          _score: Math.round(r.score * 100) / 100,
        })),
        mode: "semantic",
      });
    } catch (e) {
      // 语义搜索失败，降级到关键词
      return NextResponse.json({
        ok: true,
        data: [],
        mode: "keyword",
        hint: `语义搜索失败: ${e instanceof Error ? e.message : String(e)}，请使用关键词搜索`,
      });
    }
  }

  // keyword 模式（回退）
  const rows = getDb()
    .prepare(
      `SELECT id, title, insight, tags FROM assets
       WHERE title LIKE ? OR insight LIKE ? OR summary LIKE ?
       ORDER BY updated_at DESC LIMIT 15`
    )
    .all(`%${q}%`, `%${q}%`, `%${q}%`) as {
    id: number;
    title: string;
    insight: string | null;
    tags: string | null;
  }[];

  return NextResponse.json({
    ok: true,
    data: rows.map((r) => ({
      id: r.id,
      title: r.title,
      insight: r.insight,
    })),
    mode: "keyword",
  });
}
