import { injectKernel } from "./kernel";

export interface LLMConfig {
  baseURL: string;
  apiKey: string;
  model: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * 调用 OpenAI 兼容的 chat/completions 接口。
 * 若提供 kernel，会注入到 system prompt 让输出带上个人判断立场。
 */
export async function chat(
  messages: ChatMessage[],
  config: LLMConfig,
  kernel?: string
): Promise<string> {
  const finalMessages: ChatMessage[] = [...messages];
  // 若首条是 system，把 kernel 合并进去；否则前置一条 system 注入 kernel
  if (finalMessages.length > 0 && finalMessages[0].role === "system") {
    finalMessages[0] = {
      role: "system",
      content: injectKernel(finalMessages[0].content, kernel),
    };
  } else if (kernel && kernel.trim()) {
    finalMessages.unshift({
      role: "system",
      content: injectKernel("", kernel),
    });
  }

  const url = `${config.baseURL.replace(/\/$/, "")}/chat/completions`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: finalMessages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`LLM 请求失败 ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("LLM 返回内容为空");
  }
  return content;
}
