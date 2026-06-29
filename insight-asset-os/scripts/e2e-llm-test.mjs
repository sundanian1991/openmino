// 端到端 LLM 链路测试：采集→升级→分类
// 用法：GLM_API_KEY=xxx node scripts/e2e-llm-test.mjs [MODEL]
// 说明：自包含脚本，内联复刻产品代码的 chat/extractJson 逻辑，验证 LLM 真实返回能被解析。
import fs from "fs";

const API_KEY = process.env.GLM_API_KEY || process.env.BIGMODEL_API_KEY || process.env.ZHIPU_API_KEY;
if (!API_KEY) {
  console.error("✗ 缺少 GLM_API_KEY 环境变量");
  process.exit(1);
}
const MODEL = process.argv[2] || "glm-4-flash";
const BASE_URL = "https://open.bigmodel.cn/api/paas/v4";
const KERNEL = "管理是放大器不是解决方案\n决策依赖少数关键变量而非穷尽信息";

let exitCode = 0;
const check = (label, cond, detail = "") => {
  if (cond) console.log("  ✅ " + label + (detail ? " → " + detail : ""));
  else { console.log("  ❌ " + label + (detail ? " → " + detail : "")); exitCode = 1; }
};

// === 产品代码逻辑的内联复刻（验证逻辑正确性）===
async function chat(messages, config, kernel) {
  const finalMessages = [...messages];
  if (finalMessages.length > 0 && finalMessages[0].role === "system") {
    const k = kernel && kernel.trim()
      ? `${finalMessages[0].content}\n\n## 个人判断立场（Insight Kernel）\n${kernel.trim()}\n\n请在输出中保持与上述立场一致的个人判断风格。`
      : finalMessages[0].content;
    finalMessages[0] = { role: "system", content: k };
  } else if (kernel && kernel.trim()) {
    finalMessages.unshift({ role: "system", content: `## 个人判断立场（Insight Kernel）\n${kernel.trim()}` });
  }
  const url = `${config.baseURL.replace(/\/$/, "")}/chat/completions`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify({ model: config.model, messages: finalMessages, temperature: 0.7 }),
  });
  if (!res.ok) throw new Error(`LLM 请求失败 ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("LLM 返回内容为空");
  return content;
}

function truncate(text, maxChars = 8000) {
  if (text.length <= maxChars) return text;
  return text.slice(0, Math.floor(maxChars * 0.7)) + "\n\n[...截断...]\n\n" + text.slice(-Math.floor(maxChars * 0.3));
}

function extractJson(raw) {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();
  try { return JSON.parse(text); } catch {}
  const brace = text.match(/\{[\s\S]*\}/);
  if (brace) { try { return JSON.parse(brace[0]); } catch {} }
  throw new Error(`无法提取 JSON: ${raw.slice(0, 80)}`);
}

const config = { baseURL: BASE_URL, apiKey: API_KEY, model: MODEL };
const RAW = fs.readFileSync("/tmp/iao-test-vault/管理笔记.md", "utf-8");

console.log("\n========================================");
console.log("  端到端 LLM 链路测试 · model=" + MODEL);
console.log("========================================\n");

// ---- 链路1: 采集 ----
console.log("【链路1：采集 intake】");
let intakeCard;
try {
  const sys1 = `你是一个个人思想资产整理助手。任务是从给定的原文中提炼出一张「轻量卡」。
输出要求（严格遵守 JSON 格式，不要任何额外文字、不要 markdown 代码块）：
{"title": "不超过20字的标题", "insight": "一句话核心洞察30-60字", "tags": ["3-5个标签"]}`;
  const reply1 = await chat(
    [{ role: "system", content: sys1 }, { role: "user", content: `请提炼以下原文：\n\n${truncate(RAW)}` }],
    config, KERNEL
  );
  console.log("  📄 LLM 原始返回（前150字）：", reply1.slice(0, 150).replace(/\n/g, " "));
  intakeCard = extractJson(reply1);
  console.log("  📄 解析结果：", JSON.stringify(intakeCard));
  check("采集-LLM返回有title", !!intakeCard.title, `"${intakeCard.title}"`);
  check("采集-LLM返回有insight", !!intakeCard.insight, intakeCard.insight?.slice(0, 30));
  check("采集-LLM返回有tags", Array.isArray(intakeCard.tags) && intakeCard.tags.length > 0, JSON.stringify(intakeCard.tags));
} catch (e) {
  check("采集执行", false, e.message);
  intakeCard = null;
}

// ---- 链路2: 升级 ----
console.log("\n【链路2：升级 upgrade】");
let upgradeCard;
if (intakeCard) {
  try {
    const sys2 = `你是一个个人思想资产升级助手。把轻量卡升级为资产卡。
输出要求（严格遵守 JSON 格式，不要额外文字、不要 markdown 代码块）：
{"is_contrarian": false, "evidence_level": "E2", "reasoning": "30-60字", "dimensions": ["维度1","维度2"]}
证据等级：E0推测/E1单次/E2多次/E3案例/E4多案例+反例/E5系统验证`;
    const reply2 = await chat(
      [{ role: "system", content: sys2 }, { role: "user", content: `轻量卡标题：${intakeCard.title}\n核心洞察：${intakeCard.insight}` }],
      config, KERNEL
    );
    console.log("  📄 LLM 原始返回（前150字）：", reply2.slice(0, 150).replace(/\n/g, " "));
    upgradeCard = extractJson(reply2);
    console.log("  📄 解析结果：", JSON.stringify(upgradeCard));
    check("升级-LLM返回有evidence_level", typeof upgradeCard.evidence_level === "string", upgradeCard.evidence_level);
    check("升级-LLM返回有is_contrarian", typeof upgradeCard.is_contrarian === "boolean", String(upgradeCard.is_contrarian));
    check("升级-LLM返回有dimensions", Array.isArray(upgradeCard.dimensions), JSON.stringify(upgradeCard.dimensions));
    check("升级-LLM返回有reasoning", typeof upgradeCard.reasoning === "string", upgradeCard.reasoning?.slice(0, 30));
  } catch (e) {
    check("升级执行", false, e.message);
    upgradeCard = null;
  }
}

// ---- 链路3: 分类 ----
console.log("\n【链路3：分类 classify】");
if (intakeCard) {
  try {
    const sys3 = `你是一个个人思想资产分类助手。判断资产卡应归属哪个主题。
输出要求（严格遵守 JSON，不要额外文字、不要 markdown 代码块）：
{"action": "match|create", "topic_id": 0, "new_topic_name": "", "reason": "20-40字"}
规则：优先匹配已有主题，topic_id 来自列表；新建时填 new_topic_name。`;
    const reply3 = await chat(
      [{ role: "system", content: sys3 }, { role: "user", content: `资产卡标题：${intakeCard.title}\n核心洞察：${intakeCard.insight}\n\n已有主题：\n#1 管理决策\n#2 认知方法` }],
      config, KERNEL
    );
    console.log("  📄 LLM 原始返回（前150字）：", reply3.slice(0, 150).replace(/\n/g, " "));
    const classifyCard = extractJson(reply3);
    console.log("  📄 解析结果：", JSON.stringify(classifyCard));
    check("分类-LLM返回有action", ["match", "create"].includes(classifyCard.action), classifyCard.action);
    if (classifyCard.action === "match") {
      check("分类-match时topic_id有效", [1, 2].includes(classifyCard.topic_id), `topic_id=${classifyCard.topic_id}`);
    } else {
      check("分类-create时有new_topic_name", !!classifyCard.new_topic_name, `"${classifyCard.new_topic_name}"`);
    }
    check("分类-LLM返回有reason", typeof classifyCard.reason === "string", classifyCard.reason?.slice(0, 30));
  } catch (e) {
    check("分类执行", false, e.message);
  }
}

console.log("\n========================================");
console.log(exitCode === 0 ? "  🎉 全部通过：3 条 LLM 链路真实调用无 bug" : "  ⚠️ 有失败项，需修复");
console.log("========================================\n");
process.exit(exitCode);
