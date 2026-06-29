import { listAssets, getStats } from "../db/queries";
import type { Asset } from "../db/queries";

export type LintLevel = "warning" | "info";

export interface LintIssue {
  level: LintLevel;
  type: string;
  assetId?: number;
  assetTitle?: string;
  message: string;
  suggestion?: string;
}

export interface LintReport {
  total: number;
  issues: LintIssue[];
  summary: { orphans: number; lowEvidence: number; thinCards: number; noTags: number };
  checkedAt: string;
}

/**
 * 资产库健康检查（lint）。
 * 借鉴 llm-wiki 的 lint 理念：发现孤立、证据不足、信息单薄等问题，提示人工复核。
 * 纯规则检查（不调 LLM），快速且可重复执行。语义矛盾需 LLM，留作未来增强。
 */
export function lintAssets(): LintReport {
  const all = listAssets();
  const issues: LintIssue[] = [];
  const summary = { orphans: 0, lowEvidence: 0, thinCards: 0, noTags: 0 };

  for (const a of all) {
    // 1. 孤立资产：资产卡但没有主题归属
    if (a.type === "Asset" && !a.topic_id) {
      summary.orphans++;
      issues.push({
        level: "warning",
        type: "orphan",
        assetId: a.id,
        assetTitle: a.title,
        message: "资产卡未归属任何主题",
        suggestion: "在详情页用 AI 分类或手动指定主题，让知识连成网",
      });
    }

    // 2. 证据不足：资产卡但证据等级为 E0/E1 或未标注
    if (a.type === "Asset" && (!a.evidence_level || ["E0", "E1"].includes(a.evidence_level))) {
      summary.lowEvidence++;
      issues.push({
        level: "warning",
        type: "low_evidence",
        assetId: a.id,
        assetTitle: a.title,
        message: `证据等级偏低（${a.evidence_level ?? "未标注"}）`,
        suggestion: "补充真实案例或观察，提升至 E2 以上以增强可信度",
      });
    }

    // 3. 信息单薄：缺少 summary 和 key_points（6 字段采集中至少应有一个）
    if (!a.summary && (!a.key_points || a.key_points.length === 0)) {
      summary.thinCards++;
      issues.push({
        level: "info",
        type: "thin_card",
        assetId: a.id,
        assetTitle: a.title,
        message: "卡片信息单薄（无摘要、无关键要点）",
        suggestion: "重新采集或手动补充，让知识可回溯",
      });
    }

    // 4. 缺标签：没有 tags 不利于检索和聚类
    if (!a.tags || a.tags.length === 0) {
      summary.noTags++;
      issues.push({
        level: "info",
        type: "no_tags",
        assetId: a.id,
        assetTitle: a.title,
        message: "缺少标签",
        suggestion: "添加标签便于按主题检索",
      });
    }
  }

  return {
    total: all.length,
    issues,
    summary,
    checkedAt: new Date().toISOString(),
  };
}
