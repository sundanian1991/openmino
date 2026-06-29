/**
 * 一体化采集管线：extractCard → upgradeAsset → classifyAsset → relateAsset
 *
 * 之前（5 步手动）：scan → Light卡 → [手动校准] → [手动升级] → [手动分类] → [手动关联]
 * 之后（采集一步到位）：scan → extractCard → 自动 upgrade → 自动 classify → 自动 relate
 *
 * 每步 fail-soft：失败记录到结果但不阻断后续步骤。
 */

import { chat, type LLMConfig } from "../llm/client";
import { buildUpgradePrompt, buildClassifyPrompt } from "../llm/prompts";
import { extractJson } from "../llm/json";
import { relateAsset } from "./relate";
import {
  getAsset,
  upgradeAsset,
  listTopics,
  createTopic,
  assignTopic,
} from "../db/queries";

// ===================== 管线结果 =====================

export interface PipelineSteps {
  extract: "ok" | "fail";
  upgrade: "ok" | "fail" | "skipped";
  classify: "ok" | "fail" | "skipped";
  relate: "ok" | "fail" | "skipped";
}

export interface PipelineResult {
  assetId: number;
  title: string;
  steps: PipelineSteps;
  errors: string[];
}

// ===================== 升级（LLM） =====================

interface UpgradeLLM {
  is_contrarian: boolean;
  evidence_level: string;
  reasoning?: string;
  dimensions?: string[];
}

/**
 * 对一张已入库的 Light 卡调用 LLM 做升级判断。
 * 如果采集阶段已经提取了 evidence_level 和 dimensions（新 prompt），则跳过 LLM。
 */
async function autoUpgrade(
  assetId: number,
  config: LLMConfig,
  kernel?: string
): Promise<"ok" | "fail" | "skipped"> {
  const asset = getAsset(assetId);
  if (!asset) return "fail";

  // 如果采集阶段已经有了完整判断，直接落库，跳过 LLM
  if (asset.evidence_level && asset.dimensions && asset.dimensions.length > 0) {
    upgradeAsset(assetId, {
      is_contrarian: asset.is_contrarian === 1,
      evidence_level: asset.evidence_level,
      reasoning: asset.reasoning ?? undefined,
      dimensions: asset.dimensions ?? undefined,
    });
    return "ok";
  }

  // 否则调 LLM 做升级
  try {
    const { system, user } = buildUpgradePrompt(asset.title, asset.insight ?? "");
    const raw = await chat(
      [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      config,
      kernel
    );
    const result = extractJson<UpgradeLLM>(raw);

    upgradeAsset(assetId, {
      is_contrarian: result.is_contrarian ?? false,
      evidence_level: result.evidence_level ?? "E1",
      reasoning: result.reasoning,
      dimensions: result.dimensions,
    });
    return "ok";
  } catch {
    return "fail";
  }
}

// ===================== 分类（LLM） =====================

interface ClassifyResult {
  action: "match" | "create";
  topic_id?: number;
  new_topic_name?: string;
  reason?: string;
}

/**
 * 对一张已入库的资产卡做主题分类。
 * 优先匹配已有主题，无匹配则新建。
 */
async function autoClassify(
  assetId: number,
  config: LLMConfig,
  kernel?: string
): Promise<"ok" | "fail" | "skipped"> {
  const asset = getAsset(assetId);
  if (!asset) return "fail";

  const topics = listTopics();

  try {
    const { system, user } = buildClassifyPrompt(
      asset.title,
      asset.insight ?? "",
      topics.map((t) => ({ id: t.id, name: t.name }))
    );
    const raw = await chat(
      [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      config,
      kernel
    );
    const result = extractJson<ClassifyResult>(raw);

    if (result.action === "create" && result.new_topic_name) {
      const topicId = createTopic(result.new_topic_name);
      assignTopic(assetId, topicId);
      return "ok";
    }

    if (result.action === "match" && result.topic_id) {
      const matched = topics.find((t) => t.id === result.topic_id);
      if (matched) {
        assignTopic(assetId, result.topic_id);
        return "ok";
      }
    }

    // 没有结果，跳过
    return "skipped";
  } catch {
    return "fail";
  }
}

// ===================== 主入口 =====================

/**
 * 一体化管线：对一张已入库的资产卡自动执行升级、分类、关联。
 *
 * @param assetId 已入库的资产卡 ID
 * @param config LLM 配置
 * @param kernel 可选，Insight Kernel
 * @returns 每步执行状态
 */
export async function runPipeline(
  assetId: number,
  config: LLMConfig,
  kernel?: string
): Promise<PipelineResult> {
  const asset = getAsset(assetId);
  const errors: string[] = [];
  const steps: PipelineSteps = {
    extract: "ok", // 由 intake 完成，这里只跑后续
    upgrade: "skipped",
    classify: "skipped",
    relate: "skipped",
  };

  if (!asset) {
    return { assetId, title: "未知", steps: { extract: "fail", upgrade: "fail", classify: "fail", relate: "fail" }, errors: ["资产卡不存在"] };
  }

  // Step 1: 升级（如果还是 Light 卡）
  if (asset.type === "Light") {
    steps.upgrade = await autoUpgrade(assetId, config, kernel);
    if (steps.upgrade === "fail") errors.push("升级失败");
  } else {
    steps.upgrade = "skipped";
  }

  // Step 2: 分类（如果没有主题归属）
  const refreshed = getAsset(assetId); // upgrade 可能改了数据
  if (!refreshed?.topic_id) {
    steps.classify = await autoClassify(assetId, config, kernel);
    if (steps.classify === "fail") errors.push("分类失败");
  } else {
    steps.classify = "skipped";
  }

  // Step 3: 关联发现
  try {
    const relateResult = await relateAsset(assetId, config, kernel);
    if (relateResult.ok) {
      steps.relate = relateResult.created > 0 ? "ok" : "skipped";
    } else {
      steps.relate = "fail";
      errors.push(`关联失败: ${relateResult.error}`);
    }
  } catch {
    steps.relate = "fail";
    errors.push("关联异常");
  }

  return { assetId, title: asset.title, steps, errors };
}
