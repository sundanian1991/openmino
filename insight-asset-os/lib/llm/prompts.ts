import { truncate } from "../indexer";

/**
 * 采集 prompt：把原文提炼为结构化知识卡（10 字段 OKF 风格）
 *
 * 与旧版的关键差异：
 * 1. entities：提取命名实体（人/组织/概念/指标）→ 让知识可检索
 * 2. claims：每条断言配原文证据 + 置信度 → OKF 式结构化论证
 * 3. evidence_level + is_contrarian 在采集阶段就判断（合并原 upgrade 职责）
 * 4. okf_type：知识类型标记（Insight | Evidence | Observation | Question）
 * 5. key_passages 替代原 key_points，强调保留原文原话
 */
export function buildIntakePrompt(rawContent: string, existingInsights?: string): {
  system: string;
  user: string;
} {
  const connectHint = existingInsights
    ? `\n\n用户已有的判断立场（仅供参考，用于发现关联）：\n${existingInsights}`
    : "";
  return {
    system: `你是一个个人思想资产整理助手。任务是从给定的原文中提炼出一张「结构化知识卡」。

目标：把原文中最有价值的内容，转换为可检索、可论证、可关联的结构化知识单元。

输出要求（严格遵守 JSON 格式，不要任何额外文字、不要 markdown 代码块）：
{
  "title": "不超过20字的标题，概括这条内容",
  "insight": "一句话核心洞察，30-80字，要是可复用的判断/观点，不是复述原文",
  "summary": "150字以内的原文摘要，客观复述原文讲了什么（不掺判断）",
  "key_passages": ["3-5条原文中最有信息量的关键段落，尽量保留原话，每条不超过120字"],
  "entities": ["提取原文中出现的命名实体：人名/组织名/概念术语/量化指标。每项不超过15字，3-10个"],
  "claims": [
    {
      "claim": "从原文中提取的一个断言/主张",
      "evidence": "原文中支持该断言的证据或出处",
      "confidence": "high|medium|low"
    }
  ],
  "connections": "与已有知识/经验的关联提示，30-80字；如无明显关联则留空字符串",
  "is_contrarian": false,
  "evidence_level": "E1",
  "dimensions": ["2-4条维度洞察，展开判断的适用场景、边界、可复用方式"],
  "okf_type": "Insight",
  "tags": ["3-5个标签，反映主题领域"]
}

字段说明与提炼原则：
- title：这条内容的"名字"，简短有力
- insight：你能记住并复用的判断。不是复述原文，是提炼出的可迁移观点
- summary：事实性复述原文内容，与 insight（你的提炼判断）分开
- key_passages：摘原文原话，让日后能回溯论证；宁可少而精，不要大段照抄
- entities：让知识可被检索的关键。提取人名、组织名、专业术语、量化指标（如"响应速度"、"ROI>30%"、"E2级证据"）
- claims：核心价值。每条 claim 是原文中的断言，evidence 是支持它的原文证据，confidence 基于原文论证强度
  - high：原文有明确数据或案例支持
  - medium：原文有逻辑推理但缺硬证据
  - low：原文仅表态或推测
- connections：这张卡与你已有判断的桥梁，让知识连成网
- is_contrarian：true 当且仅当这条判断明确反对主流叙事或常见认知
- evidence_level：基于原文论证强度，按 E0-E5 标准定级
  - E0：个人推测，无验证
  - E1：单次观察
  - E2：多次观察
  - E3：有案例验证
  - E4：多案例 + 反例检验
  - E5：系统性验证，高置信
- dimensions：把核心判断展开为适用场景、边界条件、复用方式
- okf_type：知识类型
  - Insight：可复用的判断/观点
  - Evidence：案例/数据/事实记录
  - Observation：观察性描述（偏事实，弱判断）
  - Question：提出了一个好问题但未解答
- tags：领域词，如"管理"、"供应商"、"决策"、"认知"。3-5个
- 如果原文是多条杂乱信息，提炼最核心的那一条`,
    user: `请提炼以下原文：\n\n${truncate(rawContent)}${connectHint}`,
  };
}

/**
 * 关联发现 prompt：找出新卡片与已有卡片的语义关联。
 * 这是"知识积累"的核心 —— 让多张讲同主题的卡片自动建立网络，
 * 后续查询一张时能看到相关的全部，而不是孤岛。
 *
 * relation 词汇表（受控，落库前会校验）：
 * - relates_to  泛相关，同主题但无强逻辑关系
 * - supports    支持/印证对方判断
 * - contradicts 反驳/挑战对方判断
 * - evolves     是对方判断的演进/细化
 */
export function buildRelatePrompt(
  newTitle: string,
  newInsight: string,
  candidates: { id: number; title: string; insight: string }[]
): { system: string; user: string } {
  return {
    system: `你是一个个人思想资产关联助手。判断新卡片与已有卡片之间的语义关联。

输出要求（严格遵守 JSON 格式，不要任何额外文字、不要 markdown 代码块）：
{
  "links": [
    { "to_id": 1, "relation": "relates_to", "note": "15-30字说明为什么相关" }
  ]
}

relation 只能取这四个值之一：
- relates_to：泛相关（同主题，无强逻辑关系）
- supports：支持/印证对方判断
- contradicts：反驳/挑战对方判断
- evolves：是对方判断的演进或细化

原则：
- 只建立真正有意义的关联，宁可漏不可滥 —— 通常 0-3 条
- to_id 必须来自下方候选列表的真实 id
- 如果没有值得关联的卡片，返回 {"links": []}`,
    user: `新卡片标题：${newTitle}\n新卡片洞察：${newInsight}\n\n已有卡片候选：\n${candidates
      .map((c) => `#${c.id} 《${c.title}》—— ${c.insight}`)
      .join("\n")}`,
  };
}

/**
 * 升级 prompt：把轻量卡升级为资产卡（标注反常识 + 证据等级 + 维度洞察）
 */
export function buildUpgradePrompt(
  title: string,
  insight: string
): { system: string; user: string } {
  return {
    system: `你是一个个人思想资产升级助手。把一张轻量卡升级为「资产卡」，附加更深的判断结构。

输出要求（严格遵守 JSON 格式，不要任何额外文字、不要 markdown 代码块）：
{
  "is_contrarian": false,
  "evidence_level": "E2",
  "reasoning": "为什么这是（或不是）反常识判断，30-60字",
  "dimensions": ["维度1：洞察展开", "维度2：适用边界"]
}

证据等级定义：
- E0：个人推测，无验证
- E1：单次观察
- E2：多次观察
- E3：有案例验证
- E4：多案例 + 反例检验
- E5：系统性验证，高置信

dimensions 是 2-4 条维度洞察，把核心判断展开为：什么场景下成立、边界在哪、可如何复用。
is_contrarian 为 true 当且仅当这条判断与主流叙事相反。`,
    user: `轻量卡标题：${title}\n核心洞察：${insight}`,
  };
}

/**
 * 分类 prompt：为资产卡匹配或建议主题
 */
export function buildClassifyPrompt(
  title: string,
  insight: string,
  existingTopics: { id: number; name: string }[]
): { system: string; user: string } {
  const topicList =
    existingTopics.length > 0
      ? existingTopics.map((t) => `#${t.id} ${t.name}`).join("\n")
      : "（暂无已有主题）";

  return {
    system: `你是一个个人思想资产分类助手。判断一张资产卡应归属哪个主题。

输出要求（严格遵守 JSON 格式，不要任何额外文字、不要 markdown 代码块）：
{
  "action": "match" | "create",
  "topic_id": 0,
  "new_topic_name": "",
  "reason": "20-40字说明为什么归这个主题"
}

规则：
- action="match" 表示归入已有主题，需填 topic_id（必须来自下方列表的某个 id）
- action="create" 表示需要新建主题，需填 new_topic_name（不超过8字），topic_id 留 0
- 优先匹配已有主题（语义接近即匹配），只有确实没有合适的才新建
- 主题名应是抽象领域词，如"管理决策"、"供应商关系"、"个人成长"，而非具体事件`,
    user: `资产卡标题：${title}\n核心洞察：${insight}\n\n已有主题：\n${topicList}`,
  };
}

/**
 * 校准 prompt：对轻量卡做人工校准的 LLM 补充建议
 */
export function buildCalibratePrompt(
  title: string,
  insight: string,
  tags: string,
  rawContent: string
): { system: string; user: string } {
  return {
    system: `你是一个洞察校准助手。用户正在校准一条轻量卡，请检查洞察的准确性和可复用性。

输出要求（严格遵守 JSON 格式，不要任何额外文字、不要 markdown 代码块）：
{
  "suggested_insight": "建议调整后的洞察，或空字符串表示无需修改",
  "is_contrarian": true,
  "note": "校准说明，20-40字"
}

检查要点：
1. insight 是否真正抓住了原文的独特价值？
2. 有没有过度简化或过度解读？
3. 是否包含可复用的判断而非事实陈述？`,
    user: `标题：${title}\n当前洞察：${insight}\n当前标签：${tags}\n\n原文：\n${truncate(rawContent)}`,
  };
}

/**
 * 编译内核 prompt：从自由文本中提取结构化内核条目
 */
export function buildCompileKernelPrompt(
  freeText: string
): { system: string; user: string } {
  return {
    system: `你是一个判断立场提取助手。从用户的自由文本中提取核心判断立场，分类输出 JSON。

输出要求（严格遵守 JSON 格式，不要任何额外文字、不要 markdown 代码块）：
{
  "entries": [
    {
      "category": "belief",
      "judgment": "一句话判断",
      "scenarios": "适用场景（逗号分隔，可选）",
      "confidence": 80
    }
  ]
}

分类说明：
- belief：底层信念——长期价值主张、哲学立场
- contrarian：反常识判断——反对主流叙事的判断
- expertise：擅长问题域——被验证过能力的领域
- challenge：想挑战的常识——想消灭/重塑的行业套话

提取原则：
- 每条 judgment 必须是一句可读的判断，不是关键词
- 只有确属该分类才归入，不要强分
- confidence 0-100，根据文本中的确信程度判断`,
    user: `请从以下文本中提取判断立场：\n\n${freeText}`,
  };
}

/**
 * 写作骨架 prompt：基于主题和 Kernel 生成写作骨架
 */
export function buildScaffoldPrompt(
  topic: string,
  message: string,
  kernel: string,
  styleConfig?: string
): { system: string; user: string } {
  const styleSection = styleConfig
    ? `\n\n## 写作风格要求\n${styleConfig}`
    : "";
  return {
    system: `你是一个写作骨架生成助手。基于主题和个人判断立场，生成写作骨架。

输出要求（严格遵守 JSON 格式，不要任何额外文字、不要 markdown 代码块）：
{
  "title": "文章标题建议",
  "sections": [
    {
      "heading": "段落标题",
      "purpose": "本段写作目的",
      "key_points": ["要点1", "要点2", "要点3"]
    }
  ]
}

原则：
- 3-5 个段落，每段 2-4 个要点
- 骨架要有叙事逻辑，不要只是罗列
- 参考个人判断立场让文章有个人色彩${styleSection}`,
    user: `主题：${topic}\n核心信息：${message}\n\n个人判断立场：\n${kernel}`,
  };
}
