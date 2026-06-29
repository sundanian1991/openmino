/**
 * LLM 服务商预设。选服务商后自动填充 baseURL + 可选模型列表。
 * 所有服务商均兼容 OpenAI Chat Completions 协议。
 */

export interface Provider {
  id: string;
  label: string;
  baseURL: string;
  models: string[];
  /** 是否需要 API Key（Ollama 本地服务可填任意值） */
  needsKey: boolean;
  /** key 的占位提示 */
  keyPlaceholder?: string;
  /** 默认选中的模型 */
  defaultModel: string;
}

export const PROVIDERS: Provider[] = [
  {
    id: "glm",
    label: "智谱 GLM",
    baseURL: "https://open.bigmodel.cn/api/paas/v4",
    models: ["glm-5.2", "glm-4.6", "glm-4.5", "glm-4-plus", "glm-4-flash"],
    needsKey: true,
    keyPlaceholder: "智谱开放平台 API Key",
    defaultModel: "glm-5.2",
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    baseURL: "https://api.deepseek.com",
    models: ["deepseek-chat", "deepseek-reasoner"],
    needsKey: true,
    keyPlaceholder: "DeepSeek API Key",
    defaultModel: "deepseek-chat",
  },
  {
    id: "mimo",
    label: "小米 MiMo",
    baseURL: "https://api.xiaomimimo.com/v1",
    models: ["mimo-v2.5-pro", "mimo-v2.5"],
    needsKey: true,
    keyPlaceholder: "MiMo 开放平台 API Key",
    defaultModel: "mimo-v2.5-pro",
  },
  {
    id: "mimo-token",
    label: "MiMo Token 计划",
    baseURL: "https://token-plan-cn.xiaomimimo.com/v1",
    models: ["mimo-v2.5-pro", "mimo-v2.5"],
    needsKey: true,
    keyPlaceholder: "tp-...",
    defaultModel: "mimo-v2.5-pro",
  },
  {
    id: "openai",
    label: "OpenAI",
    baseURL: "https://api.openai.com/v1",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4.1", "o1-mini"],
    needsKey: true,
    keyPlaceholder: "sk-...",
    defaultModel: "gpt-4o-mini",
  },
  {
    id: "ollama",
    label: "Ollama（本地）",
    baseURL: "http://localhost:11434/v1",
    models: ["llama3.1", "qwen2.5", "phi3.5"],
    needsKey: false,
    keyPlaceholder: "本地服务可填任意值（如 ollama）",
    defaultModel: "llama3.1",
  },
  {
    id: "custom",
    label: "自定义",
    baseURL: "",
    models: [],
    needsKey: true,
    keyPlaceholder: "API Key",
    defaultModel: "",
  },
];

/**
 * 根据当前 baseURL + model 推断所属服务商（用于加载已保存配置时回显）。
 */
export function detectProvider(baseURL: string, model: string): string {
  for (const p of PROVIDERS) {
    if (p.id === "custom") continue;
    if (baseURL === p.baseURL) return p.id;
    if (p.models.includes(model)) return p.id;
  }
  return "custom";
}

export function getProvider(id: string): Provider | undefined {
  return PROVIDERS.find((p) => p.id === id);
}
