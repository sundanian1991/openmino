import { chat, type LLMConfig } from "../llm/client";
import { buildClassifyPrompt } from "../llm/prompts";
import { extractJson } from "../llm/json";
import { listTopics, createTopic, assignTopic, getAsset } from "../db/queries";

export interface ClassifyResult {
  action: "match" | "create";
  topic_id?: number;
  new_topic_name?: string;
  reason: string;
}

export interface ClassifyOutcome {
  ok: boolean;
  topicId?: number;
  topicName?: string;
  created: boolean;
  reason?: string;
  error?: string;
}

/**
 * 对单张资产卡进行主题分类。
 * LLM 决定匹配已有主题还是新建，本函数据此落库。
 */
export async function classifyAsset(
  assetId: number,
  config: LLMConfig,
  kernel?: string
): Promise<ClassifyOutcome> {
  const asset = getAsset(assetId);
  if (!asset) {
    return { ok: false, created: false, error: "资产卡不存在" };
  }

  const topics = listTopics();
  const { system, user } = buildClassifyPrompt(
    asset.title,
    asset.insight ?? "",
    topics.map((t) => ({ id: t.id, name: t.name }))
  );

  let result: ClassifyResult;
  try {
    const raw = await chat(
      [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      config,
      kernel
    );
    result = extractJson<ClassifyResult>(raw);
  } catch (e) {
    return {
      ok: false,
      created: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }

  let topicId: number;
  let topicName: string;
  let created = false;

  if (result.action === "create") {
    if (!result.new_topic_name) {
      return {
        ok: false,
        created: false,
        error: "LLM 要求新建主题但未提供名称",
      };
    }
    topicId = createTopic(result.new_topic_name);
    topicName = result.new_topic_name;
    created = true;
  } else {
    if (!result.topic_id) {
      return { ok: false, created: false, error: "未指定匹配的主题" };
    }
    topicId = result.topic_id;
    const matched = topics.find((t) => t.id === result.topic_id);
    if (!matched) {
      return {
        ok: false,
        created: false,
        error: `主题 #${result.topic_id} 不存在`,
      };
    }
    topicName = matched.name;
  }

  assignTopic(assetId, topicId);
  return { ok: true, topicId, topicName, created, reason: result.reason };
}
