import { getDb } from "./index";
import type { SQLInputValue } from "node:sqlite";

export const LLM_CONFIG_KEY = "llm_config";
export const VAULT_PATH_KEY = "vault_path";
export const KERNEL_KEY = "insight_kernel";

// ===================== settings =====================

export function getSetting(key: string): string | null {
  const row = getDb()
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function setSetting(key: string, value: string): void {
  getDb()
    .prepare(
      `INSERT INTO settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    )
    .run(key, value);
}

export function getAllSettings(): Record<string, string> {
  const rows = getDb()
    .prepare("SELECT key, value FROM settings")
    .all() as { key: string; value: string }[];
  const result: Record<string, string> = {};
  for (const r of rows) result[r.key] = r.value;
  return result;
}

export interface LLMConfig {
  baseURL: string;
  apiKey: string;
  model: string;
}

export const DEFAULT_LLM_CONFIG: LLMConfig = {
  baseURL: "https://open.bigmodel.cn/api/paas/v4",
  apiKey: "",
  model: "glm-5.2",
};

export function getLLMConfig(): LLMConfig {
  const raw = getSetting(LLM_CONFIG_KEY);
  if (!raw) return { ...DEFAULT_LLM_CONFIG };
  try {
    return { ...DEFAULT_LLM_CONFIG, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_LLM_CONFIG };
  }
}

export function setLLMConfig(config: LLMConfig): void {
  setSetting(LLM_CONFIG_KEY, JSON.stringify(config));
}

// ===================== assets =====================

export type AssetType = "Light" | "Asset";
export type AssetStatus = "raw" | "calibrating" | "asset";

export interface TimelineEntry {
  action: string;
  at: string;
  note?: string;
}

export interface Claim {
  claim: string;
  evidence?: string;
  confidence: "high" | "medium" | "low";
}

export interface Asset {
  id: number;
  type: AssetType;
  title: string;
  insight: string | null;
  summary: string | null;
  key_points: string[] | null;
  key_passages: string[] | null;
  entities: string[] | null;
  claims: Claim[] | null;
  connections: string | null;
  okf_type: string | null;
  tags: string[] | null;
  raw_content: string | null;
  source_path: string | null;
  source_type: string | null;
  status: AssetStatus;
  evidence_level: string | null;
  is_contrarian: number;
  dimensions: string[] | null;
  reasoning: string | null;
  topic_id: number | null;
  timeline: TimelineEntry[] | null;
  created_at: string;
  updated_at: string;
}

export interface AssetFilter {
  status?: AssetStatus;
  topic_id?: number;
  type?: AssetType;
  q?: string;
}

function rowToAsset(row: Record<string, unknown>): Asset {
  return {
    ...(row as unknown as Asset),
    tags: row.tags ? (JSON.parse(row.tags as string) as string[]) : null,
    key_points: row.key_points
      ? (JSON.parse(row.key_points as string) as string[])
      : null,
    // key_passages 是 key_points 的别名（前端展示用），保持向后兼容
    key_passages: row.key_points
      ? (JSON.parse(row.key_points as string) as string[])
      : null,
    entities: row.entities
      ? (JSON.parse(row.entities as string) as string[])
      : null,
    claims: row.claims
      ? (JSON.parse(row.claims as string) as Claim[])
      : null,
    okf_type: (row.okf_type as string) ?? null,
    dimensions: row.dimensions
      ? (JSON.parse(row.dimensions as string) as string[])
      : null,
    timeline: row.timeline
      ? (JSON.parse(row.timeline as string) as TimelineEntry[])
      : null,
  };
}

export function listAssets(filter: AssetFilter = {}): Asset[] {
  const where: string[] = [];
  const params: (string | number)[] = [];
  if (filter.status) {
    where.push("status = ?");
    params.push(filter.status);
  }
  if (filter.topic_id !== undefined) {
    where.push("topic_id = ?");
    params.push(filter.topic_id);
  }
  if (filter.type) {
    where.push("type = ?");
    params.push(filter.type);
  }
  if (filter.q) {
    where.push("(title LIKE ? OR insight LIKE ? OR summary LIKE ?)");
    params.push(`%${filter.q}%`, `%${filter.q}%`, `%${filter.q}%`);
  }
  const sql = `SELECT * FROM assets${
    where.length ? " WHERE " + where.join(" AND ") : ""
  } ORDER BY updated_at DESC`;
  const rows = getDb().prepare(sql).all(...params) as Record<string, unknown>[];
  return rows.map(rowToAsset);
}

export function getAsset(id: number): Asset | null {
  const row = getDb()
    .prepare("SELECT * FROM assets WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  return row ? rowToAsset(row) : null;
}

export interface CreateAssetInput {
  title: string;
  insight?: string;
  summary?: string;
  key_points?: string[];
  entities?: string[];
  claims?: Claim[];
  connections?: string;
  okf_type?: string;
  tags?: string[];
  raw_content?: string;
  source_path?: string;
  source_type?: string;
  is_contrarian?: boolean;
  evidence_level?: string;
  dimensions?: string[];
  reasoning?: string;
}

export function createAsset(input: CreateAssetInput): number {
  const result = getDb()
    .prepare(
      `INSERT INTO assets (type, title, insight, summary, key_points, entities, claims, connections, okf_type, tags, raw_content, source_path, source_type, status, is_contrarian, evidence_level, dimensions, reasoning, timeline)
       VALUES ('Light', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'raw', ?, ?, ?, ?, ?)`
    )
    .run(
      input.title,
      input.insight ?? null,
      input.summary ?? null,
      input.key_points ? JSON.stringify(input.key_points) : null,
      input.entities ? JSON.stringify(input.entities) : null,
      input.claims ? JSON.stringify(input.claims) : null,
      input.connections ?? null,
      input.okf_type ?? null,
      input.tags ? JSON.stringify(input.tags) : null,
      input.raw_content ?? null,
      input.source_path ?? null,
      input.source_type ?? null,
      input.is_contrarian ? 1 : 0,
      input.evidence_level ?? null,
      input.dimensions ? JSON.stringify(input.dimensions) : null,
      input.reasoning ?? null,
      JSON.stringify([
        { action: "采集入库", at: new Date().toISOString() },
      ])
    );
  return Number(result.lastInsertRowid);
}

export interface UpdateAssetInput {
  title?: string;
  insight?: string;
  tags?: string[];
  status?: AssetStatus;
}

export function updateAsset(id: number, input: UpdateAssetInput): void {
  const sets: string[] = [];
  const params: any[] = [];
  if (input.title !== undefined) {
    sets.push("title = ?");
    params.push(input.title);
  }
  if (input.insight !== undefined) {
    sets.push("insight = ?");
    params.push(input.insight);
  }
  if (input.tags !== undefined) {
    sets.push("tags = ?");
    params.push(JSON.stringify(input.tags));
  }
  if (input.status !== undefined) {
    sets.push("status = ?");
    params.push(input.status);
  }
  if (sets.length === 0) return;
  sets.push("updated_at = datetime('now')");
  params.push(id);
  getDb()
    .prepare(`UPDATE assets SET ${sets.join(", ")} WHERE id = ?`)
    .run(...params);
}

export interface UpgradeAssetInput {
  is_contrarian: boolean;
  evidence_level: string;
  reasoning?: string;
  dimensions?: string[];
}

export function upgradeAsset(id: number, input: UpgradeAssetInput): void {
  const asset = getAsset(id);
  const timeline: TimelineEntry[] = asset?.timeline ?? [];
  timeline.push({
    action: "升级为资产卡",
    at: new Date().toISOString(),
    note: `${input.evidence_level}${input.is_contrarian ? "·反常识" : ""}`,
  });
  getDb()
    .prepare(
      `UPDATE assets SET
        type = 'Asset', status = 'asset',
        is_contrarian = ?, evidence_level = ?, dimensions = ?, reasoning = ?,
        timeline = ?, updated_at = datetime('now')
       WHERE id = ?`
    )
    .run(
      input.is_contrarian ? 1 : 0,
      input.evidence_level ?? null,
      input.dimensions ? JSON.stringify(input.dimensions) : null,
      input.reasoning ?? null,
      JSON.stringify(timeline),
      id
    );
}

export function assignTopic(assetId: number, topicId: number): void {
  const asset = getAsset(assetId);
  const timeline: TimelineEntry[] = asset?.timeline ?? [];
  // topicId=0 表示解除关联，置为 NULL
  const finalId = topicId === 0 ? null : topicId;
  if (finalId === null) {
    timeline.push({ action: "解除主题关联", at: new Date().toISOString() });
  } else {
    timeline.push({ action: "主题分类", at: new Date().toISOString() });
  }
  getDb()
    .prepare(
      `UPDATE assets SET topic_id = ?, timeline = ?, updated_at = datetime('now') WHERE id = ?`
    )
    .run(finalId, JSON.stringify(timeline), assetId);
}

// ===================== asset_links =====================

export type LinkRelation = "relates_to" | "supports" | "contradicts" | "evolves";

export const LINK_RELATIONS: LinkRelation[] = ["relates_to", "supports", "contradicts", "evolves"];

export function isLinkRelation(v: string): v is LinkRelation {
  return (LINK_RELATIONS as string[]).includes(v);
}

export interface AssetLink {
  id: number;
  from_id: number;
  to_id: number;
  relation: LinkRelation;
  note: string | null;
  created_at: string;
}

/**
 * 创建一条卡片关联。同一对 (from,to,relation) 已存在则跳过，保证幂等。
 */
export function createAssetLink(fromId: number, toId: number, relation: LinkRelation, note?: string): void {
  if (fromId === toId) return; // 不允许自环
  getDb()
    .prepare(
      `INSERT INTO asset_links (from_id, to_id, relation, note)
       SELECT ?, ?, ?, ?
       WHERE NOT EXISTS (
         SELECT 1 FROM asset_links WHERE from_id = ? AND to_id = ? AND relation = ?
       )`
    )
    .run(fromId, toId, relation, note ?? null, fromId, toId, relation);
}

/**
 * 查询某张卡片的所有关联（含双向：既包括它指向别人的，也包括别人指向它的），
 * 带对方卡片的标题/洞察，供详情页"相关洞察"区展示。
 */
export interface AssetLinkWithTarget extends AssetLink {
  target_id: number;
  target_title: string;
  target_insight: string | null;
  direction: "out" | "in";
}

export function listAssetLinks(assetId: number): AssetLinkWithTarget[] {
  const rows = getDb()
    .prepare(
      `SELECT l.id, l.from_id, l.to_id, l.relation, l.note, l.created_at,
              CASE WHEN l.from_id = ? THEN l.to_id ELSE l.from_id END AS target_id,
              a.title AS target_title, a.insight AS target_insight,
              CASE WHEN l.from_id = ? THEN 'out' ELSE 'in' END AS direction
       FROM asset_links l
       JOIN assets a ON a.id = CASE WHEN l.from_id = ? THEN l.to_id ELSE l.from_id END
       WHERE l.from_id = ? OR l.to_id = ?
       ORDER BY l.created_at DESC`
    )
    .all(assetId, assetId, assetId, assetId, assetId) as Record<string, unknown>[];
  return rows as unknown as AssetLinkWithTarget[];
}

export function deleteAssetLink(linkId: number): void {
  getDb().prepare("DELETE FROM asset_links WHERE id = ?").run(linkId);
}

// ===================== topics =====================

export interface Topic {
  id: number;
  name: string;
  description: string | null;
  parent_id: number | null;
  created_at: string;
  asset_count?: number;
}

export function listTopics(): Topic[] {
  return getDb()
    .prepare(
      `SELECT t.*, (SELECT COUNT(*) FROM assets a WHERE a.topic_id = t.id) AS asset_count
       FROM topics t ORDER BY t.name`
    )
    .all() as unknown as Topic[];
}

export function createTopic(name: string, parentId?: number): number {
  const result = getDb()
    .prepare("INSERT INTO topics (name, parent_id) VALUES (?, ?)")
    .run(name, parentId ?? null);
  return Number(result.lastInsertRowid);
}

export function updateTopic(id: number, fields: { name?: string; description?: string; parent_id?: number | null }): void {
  const sets: string[] = [];
  const params: any[] = [];
  if (fields.name !== undefined) { sets.push("name = ?"); params.push(fields.name); }
  if (fields.description !== undefined) { sets.push("description = ?"); params.push(fields.description); }
  if (fields.parent_id !== undefined) { sets.push("parent_id = ?"); params.push(fields.parent_id); }
  if (!sets.length) return;
  params.push(id);
  getDb().prepare(`UPDATE topics SET ${sets.join(", ")} WHERE id = ?`).run(...params);
}

export function deleteTopic(id: number): { unlinkedChildren: number; unlinkedAssets: number } {
  // 先解除子主题的父关联
  const childrenResult = getDb().prepare("UPDATE topics SET parent_id = NULL WHERE parent_id = ?").run(id);
  // 再解除资产的 topic 关联
  const assetsResult = getDb().prepare("UPDATE assets SET topic_id = NULL WHERE topic_id = ?").run(id);
  // 最后删除主题
  getDb().prepare("DELETE FROM topics WHERE id = ?").run(id);
  return {
    unlinkedChildren: Number(childrenResult.changes),
    unlinkedAssets: Number(assetsResult.changes),
  };
}

export function getTopicImpact(id: number): { children: number; assets: number } {
  const children = (getDb().prepare("SELECT COUNT(*) AS c FROM topics WHERE parent_id = ?").get(id) as { c: number }).c;
  const assets = (getDb().prepare("SELECT COUNT(*) AS c FROM assets WHERE topic_id = ?").get(id) as { c: number }).c;
  return { children, assets };
}

// ===================== kernel_entries =====================

export type KernelCategory = "belief" | "contrarian" | "expertise" | "challenge";

export interface KernelEntry {
  id: number;
  category: KernelCategory;
  judgment: string;
  scenarios: string | null;
  counterexamples: string | null;
  confidence: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function listKernelEntries(category?: KernelCategory): KernelEntry[] {
  if (category) {
    return getDb().prepare("SELECT * FROM kernel_entries WHERE category = ? ORDER BY sort_order").all(category) as unknown as KernelEntry[];
  }
  return getDb().prepare("SELECT * FROM kernel_entries ORDER BY category, sort_order").all() as unknown as KernelEntry[];
}

export function createKernelEntry(fields: {
  category: KernelCategory; judgment: string;
  scenarios?: string; counterexamples?: string; confidence?: number;
}): number {
  const maxOrder = (getDb().prepare("SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM kernel_entries WHERE category = ?").get(fields.category) as { next: number }).next;
  const result = getDb().prepare(
    "INSERT INTO kernel_entries (category, judgment, scenarios, counterexamples, confidence, sort_order) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(fields.category, fields.judgment, fields.scenarios ?? null, fields.counterexamples ?? null, fields.confidence ?? 50, maxOrder);
  return Number(result.lastInsertRowid);
}

export function updateKernelEntry(id: number, fields: Partial<{ judgment: string; scenarios: string; counterexamples: string; confidence: number; sort_order: number }>): void {
  const sets: string[] = ["updated_at = datetime('now')"];
  const params: any[] = [];
  for (const [k, v] of Object.entries(fields)) {
    if (v !== undefined) { sets.push(`${k} = ?`); params.push(v); }
  }
  params.push(id);
  getDb().prepare(`UPDATE kernel_entries SET ${sets.join(", ")} WHERE id = ?`).run(...params);
}

export function deleteKernelEntry(id: number): void {
  getDb().prepare("DELETE FROM kernel_entries WHERE id = ?").run(id);
}

export function compileKernel(): string {
  const entries = listKernelEntries();
  if (!entries.length) return "";
  const categoryLabels: Record<string, string> = {
    belief: "底层信念", contrarian: "反常识判断", expertise: "擅长问题域", challenge: "想挑战的常识",
  };
  const groups: Record<string, KernelEntry[]> = {};
  for (const e of entries) (groups[e.category] ??= []).push(e);
  const parts: string[] = [];
  for (const [cat, label] of Object.entries(categoryLabels)) {
    const items = groups[cat];
    if (!items?.length) continue;
    parts.push(`【${label}】`);
    for (const item of items) {
      parts.push(`- ${item.judgment}${item.scenarios ? `（适用：${item.scenarios}）` : ""}${item.counterexamples ? `／反例：${item.counterexamples}` : ""} [置信度:${item.confidence}]`);
    }
  }
  return parts.join("\n");
}

// ===================== writing_styles =====================

export interface WritingStyle {
  id: number;
  name: string;
  config: string;
  is_preset: number;
  created_at: string;
}

export function listWritingStyles(): WritingStyle[] {
  return getDb().prepare("SELECT * FROM writing_styles ORDER BY is_preset DESC, name").all() as unknown as WritingStyle[];
}

export function createWritingStyle(name: string, config: string): number {
  const result = getDb().prepare("INSERT INTO writing_styles (name, config) VALUES (?, ?)").run(name, config);
  return Number(result.lastInsertRowid);
}

export function updateWritingStyle(id: number, fields: { name?: string; config?: string }): void {
  const sets: string[] = [];
  const params: any[] = [];
  if (fields.name !== undefined) { sets.push("name = ?"); params.push(fields.name); }
  if (fields.config !== undefined) { sets.push("config = ?"); params.push(fields.config); }
  if (!sets.length) return;
  params.push(id);
  getDb().prepare(`UPDATE writing_styles SET ${sets.join(", ")} WHERE id = ?`).run(...params);
}

export function deleteWritingStyle(id: number): void {
  getDb().prepare("DELETE FROM writing_styles WHERE id = ?").run(id);
}

export function seedPresetStyles(): void {
  const existing = getDb().prepare("SELECT COUNT(*) AS c FROM writing_styles").get() as { c: number };
  if (existing.c > 0) return;
  const insert = getDb().prepare("INSERT INTO writing_styles (name, config, is_preset) VALUES (?, ?, 1)");
  insert.run("vincent-standard", JSON.stringify({ tone: "温暖顾问风格", sentence: "短句为主", structure: "问题→分析→结论", length: "1500-2500字", quality: "数据与判断分离" }));
  insert.run("academic", JSON.stringify({ tone: "严谨客观", sentence: "逻辑连接词丰富", structure: "摘要→引言→分析→讨论→结论", length: "3000-5000字", quality: "每条结论标注证据等级" }));
  insert.run("client-comm", JSON.stringify({ tone: "温和叙事化", sentence: "平均句长20字", structure: "背景→发现→建议", length: "800-1200字", quality: "每建议附预期效果和风险" }));
}

// ===================== feedback =====================

export function addFeedback(assetId: number, content: string, type?: string): void {
  getDb().prepare("INSERT INTO feedback (asset_id, content, type) VALUES (?, ?, ?)").run(assetId, content, type ?? null);
}

export function listFeedback(assetId: number): { id: number; content: string; type: string | null; created_at: string }[] {
  return getDb().prepare("SELECT * FROM feedback WHERE asset_id = ? ORDER BY created_at DESC").all(assetId) as any[];
}

// ===================== stats =====================

export interface Stats {
  total: number;
  inUse: number;
  realCases: number;
  pending: number;
}

export function getStats(): Stats {
  const total = (
    getDb().prepare("SELECT COUNT(*) AS c FROM assets").get() as { c: number }
  ).c;
  const inUse = (
    getDb()
      .prepare("SELECT COUNT(*) AS c FROM assets WHERE type = 'Asset'")
      .get() as { c: number }
  ).c;
  const realCases = (
    getDb()
      .prepare(
        "SELECT COUNT(*) AS c FROM assets WHERE evidence_level IN ('E3','E4','E5')"
      )
      .get() as { c: number }
  ).c;
  const pending = (
    getDb()
      .prepare(
        "SELECT COUNT(*) AS c FROM assets WHERE status IN ('raw','calibrating')"
      )
      .get() as { c: number }
  ).c;
  return { total, inUse, realCases, pending };
}
