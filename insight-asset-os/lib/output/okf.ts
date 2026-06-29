/**
 * OKF (Open Knowledge Format) 导出器
 *
 * 将 Insight Asset OS 资产库导出为 OKF 兼容的 Markdown 目录结构。
 * 遵循 Google OKF v0.1 规范：Markdown + YAML frontmatter，人类和 AI 均可读。
 *
 * 输出结构：
 *   data/vault/
 *   ├── index.md              # 全部主题索引
 *   ├── {主题名}/
 *   │   ├── index.md          # 主题概述 + 资产列表
 *   │   ├── {slug}.md         # 每张资产卡 = 一个概念文档
 *   │   └── ...
 *   └── 未分类/
 *       └── ...
 */

import fs from "fs";
import path from "path";
import { listAssets, listTopics, listAssetLinks, getAsset } from "../db/queries";
import type { Asset, Topic, AssetLinkWithTarget } from "../db/queries";

// ===================== YAML Frontmatter 生成 =====================

function frontmatter(asset: Asset, links?: AssetLinkWithTarget[]): string {
  const fm: Record<string, unknown> = {
    type: mapOkfType(asset.okf_type ?? "Insight"),
    evidence_level: asset.evidence_level ?? "E0",
    is_contrarian: asset.is_contrarian === 1,
    entities: asset.entities ?? [],
    tags: asset.tags ?? [],
    source: asset.source_path ?? "未知来源",
  };

  if (asset.claims && asset.claims.length > 0) {
    fm.claims = asset.claims.map((c) => ({
      claim: c.claim,
      evidence: c.evidence ?? "",
      confidence: c.confidence,
    }));
  }

  if (links && links.length > 0) {
    fm.related_to = links
      .filter((l) => l.direction === "out")
      .map((l) => `[[${slugify(l.target_title)}]] (${l.relation})`);
  }

  return [
    "---",
    ...Object.entries(fm).map(([k, v]) => {
      if (Array.isArray(v) || typeof v === "object") {
        return `${k}: ${JSON.stringify(v)}`;
      }
      return `${k}: ${v}`;
    }),
    "---",
    "",
  ].join("\n");
}

// ===================== 文件名生成 =====================

function slugify(title: string): string {
  return title
    .replace(/[^\w\u4e00-\u9fff]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function mapOkfType(t: string): string {
  const map: Record<string, string> = {
    Insight: "Insight",
    Evidence: "Evidence",
    Observation: "Observation",
    Question: "Question",
  };
  return map[t] ?? "Insight";
}

// ===================== Markdown 正文生成 =====================

function assetBody(asset: Asset): string {
  const lines: string[] = [];

  lines.push(`# ${asset.title}`);
  lines.push("");

  if (asset.insight) {
    lines.push(`> **核心判断**：${asset.insight}`);
    lines.push("");
  }

  if (asset.summary) {
    lines.push("## 摘要");
    lines.push("");
    lines.push(asset.summary);
    lines.push("");
  }

  if (asset.key_passages && asset.key_passages.length > 0) {
    lines.push("## 关键段落");
    lines.push("");
    for (const kp of asset.key_passages) {
      lines.push(`> ${kp}`);
      lines.push("");
    }
  }

  if (asset.dimensions && asset.dimensions.length > 0) {
    lines.push("## 维度洞察");
    lines.push("");
    for (const d of asset.dimensions) {
      lines.push(`- ${d}`);
    }
    lines.push("");
  }

  if (asset.claims && asset.claims.length > 0) {
    lines.push("## 断言与证据");
    lines.push("");
    for (const c of asset.claims) {
      lines.push(`- **断言**：${c.claim}`);
      if (c.evidence) lines.push(`  - 证据：${c.evidence}`);
      lines.push(`  - 置信度：${c.confidence}`);
      lines.push("");
    }
  }

  if (asset.raw_content) {
    lines.push("## 原始内容");
    lines.push("");
    lines.push(asset.raw_content);
    lines.push("");
  }

  return lines.join("\n");
}

// ===================== 目录生成 =====================

function topicIndex(topic: Topic, assets: Asset[]): string {
  const lines: string[] = [];
  lines.push(`# ${topic.name}`);
  lines.push("");

  if (topic.description) {
    lines.push(topic.description);
    lines.push("");
  }

  lines.push(`共 ${assets.length} 条资产`);
  lines.push("");

  for (const a of assets) {
    const okfLabel = a.okf_type === "Evidence" ? "📊" : a.okf_type === "Question" ? "❓" : a.okf_type === "Observation" ? "👁" : "💡";
    lines.push(`- ${okfLabel} [${a.title}](${slugify(a.title)}.md)`);
    if (a.insight) lines.push(`  - ${a.insight.slice(0, 80)}`);
  }

  return lines.join("\n");
}

function rootIndex(topics: Topic[], uncategorized: Asset[]): string {
  const lines: string[] = [];
  lines.push("# Insight Asset OS — 知识库索引");
  lines.push("");
  lines.push(`> 导出时间：${new Date().toISOString()}`);
  lines.push(`> 总资产数：${listAssets().length}`);
  lines.push("");

  lines.push("## 主题");
  lines.push("");

  for (const t of topics) {
    const count = (t as any).asset_count ?? 0;
    lines.push(`- [${t.name}](./${slugify(t.name)}/index.md)（${count} 条）`);
  }

  if (uncategorized.length > 0) {
    lines.push(`- [未分类](./未分类/index.md)（${uncategorized.length} 条）`);
  }

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("*此知识库由 Insight Asset OS 自动生成。OKF 格式兼容 Google Open Knowledge Format。*");

  return lines.join("\n");
}

// ===================== 导出主函数 =====================

export interface OkfExportResult {
  ok: boolean;
  outputDir: string;
  files: number;
  topics: number;
  error?: string;
}

/**
 * 导出完整资产库为 OKF 格式
 *
 * @param outputDir 输出目录（如 data/vault）
 */
export function exportOkf(outputDir: string = "data/vault"): OkfExportResult {
  try {
    // 确保目录存在
    fs.mkdirSync(outputDir, { recursive: true });

    const allAssets = listAssets();
    const allTopics = listTopics();

    // 按主题分组
    const topicMap = new Map<number, Asset[]>();
    const uncategorized: Asset[] = [];

    for (const a of allAssets) {
      if (a.topic_id) {
        const arr = topicMap.get(a.topic_id) ?? [];
        arr.push(a);
        topicMap.set(a.topic_id, arr);
      } else {
        uncategorized.push(a);
      }
    }

    let fileCount = 0;

    // 每个资产生成一个 .md
    function writeAsset(a: Asset, dir: string) {
      const links = listAssetLinks(a.id);
      const content = frontmatter(a, links) + assetBody(a);
      const fileName = `${slugify(a.title)}.md`;
      fs.writeFileSync(path.join(dir, fileName), content, "utf-8");
      fileCount++;
    }

    // 每个主题生成目录
    for (const t of allTopics) {
      const assets = topicMap.get(t.id) ?? [];
      const dirName = slugify(t.name);
      const topicDir = path.join(outputDir, dirName);
      fs.mkdirSync(topicDir, { recursive: true });

      // index.md
      fs.writeFileSync(
        path.join(topicDir, "index.md"),
        topicIndex(t, assets),
        "utf-8"
      );
      fileCount++;

      // 每个资产
      for (const a of assets) {
        writeAsset(a, topicDir);
      }
    }

    // 未分类目录
    if (uncategorized.length > 0) {
      const uncatDir = path.join(outputDir, "未分类");
      fs.mkdirSync(uncatDir, { recursive: true });
      fs.writeFileSync(
        path.join(uncatDir, "index.md"),
        `# 未分类\n\n共 ${uncategorized.length} 条资产，待分配主题。\n\n${uncategorized.map((a) => `- [${a.title}](${slugify(a.title)}.md)`).join("\n")}`,
        "utf-8"
      );
      fileCount++;
      for (const a of uncategorized) {
        writeAsset(a, uncatDir);
      }
    }

    // 根 index.md
    fs.writeFileSync(
      path.join(outputDir, "index.md"),
      rootIndex(allTopics, uncategorized),
      "utf-8"
    );
    fileCount++;

    return {
      ok: true,
      outputDir,
      files: fileCount,
      topics: allTopics.length + (uncategorized.length > 0 ? 1 : 0),
    };
  } catch (e) {
    return {
      ok: false,
      outputDir,
      files: 0,
      topics: 0,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
