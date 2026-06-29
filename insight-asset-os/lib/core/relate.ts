import { chat, type LLMConfig } from "../llm/client";
import { buildRelatePrompt } from "../llm/prompts";
import { extractJson } from "../llm/json";
import {
  getAsset,
  listAssets,
  createAssetLink,
  isLinkRelation,
  type LinkRelation,
} from "../db/queries";

interface RelateRaw {
  links: { to_id: number; relation: string; note?: string }[];
}

export interface RelateOutcome {
  ok: boolean;
  created: number; // 实际建链数
  skipped: number; // 被丢弃（relation 非法 / to_id 不存在）的数量
  error?: string;
}

/**
 * 候选筛选：不把全库塞给 LLM。
 * 策略：tag 有重叠的优先，最多取 12 张；不足再补最近 8 张。总上限 15。
 */
function pickCandidates(
  assetId: number,
  tags: string[] | null
): { id: number; title: string; insight: string }[] {
  const all = listAssets().filter((a) => a.id !== assetId);
  if (all.length === 0) return [];

  const tagSet = new Set(tags ?? []);
  const scored = all.map((a) => {
    const overlap = (a.tags ?? []).filter((t) => tagSet.has(t)).length;
    return { a, overlap };
  });

  // tag 重叠优先，同 overlap 按 updated_at 倒序（最新在前）
  scored.sort((x, y) => y.overlap - x.overlap);

  const picked = new Set<number>();
  const result: { id: number; title: string; insight: string }[] = [];

  // 第一轮：有 tag 重叠的
  for (const { a, overlap } of scored) {
    if (overlap === 0) break;
    if (picked.has(a.id)) continue;
    picked.add(a.id);
    result.push({ id: a.id, title: a.title, insight: a.insight ?? "" });
    if (result.length >= 12) break;
  }
  // 第二轮：补最近（listAssets 已按 updated_at DESC 排好）
  for (const a of all) {
    if (result.length >= 15) break;
    if (picked.has(a.id)) continue;
    picked.add(a.id);
    result.push({ id: a.id, title: a.title, insight: a.insight ?? "" });
  }
  return result;
}

/**
 * 为指定卡片发现并建立关联。
 * 采集后自动调用，也可在详情页手动触发（"重新发现关联"）。
 */
export async function relateAsset(
  assetId: number,
  config: LLMConfig,
  kernel?: string
): Promise<RelateOutcome> {
  const asset = getAsset(assetId);
  if (!asset) {
    return { ok: false, created: 0, skipped: 0, error: "资产卡不存在" };
  }

  const candidates = pickCandidates(assetId, asset.tags);
  if (candidates.length === 0) {
    return { ok: true, created: 0, skipped: 0 };
  }

  let raw: RelateRaw;
  try {
    const { system, user } = buildRelatePrompt(
      asset.title,
      asset.insight ?? "",
      candidates
    );
    const reply = await chat(
      [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      config,
      kernel
    );
    raw = extractJson<RelateRaw>(reply);
  } catch (e) {
    return {
      ok: false,
      created: 0,
      skipped: 0,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  const candidateIds = new Set(candidates.map((c) => c.id));
  let created = 0;
  let skipped = 0;
  for (const link of raw.links ?? []) {
    if (!isLinkRelation(link.relation)) {
      skipped++;
      continue;
    }
    if (!candidateIds.has(link.to_id)) {
      // to_id 不在候选里，可能是 LLM 幻觉，丢弃
      skipped++;
      continue;
    }
    createAssetLink(assetId, link.to_id, link.relation as LinkRelation, link.note);
    created++;
  }
  return { ok: true, created, skipped };
}
