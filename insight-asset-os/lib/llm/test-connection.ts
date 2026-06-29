import { chat, type LLMConfig } from "./client";

export interface ConnectionResult {
  ok: boolean;
  reply?: string;
  error?: string;
}

/**
 * 用一条简短的 ping 消息验证 LLM 配置是否可用。
 * 不抛异常，错误全部转成 { ok: false, error } 返回，便于 UI 展示。
 * 可选 kernel 会注入到 system prompt（与正式调用一致）。
 */
export async function testConnection(
  config: LLMConfig,
  kernel?: string
): Promise<ConnectionResult> {
  try {
    const reply = await chat(
      [
        {
          role: "system",
          content:
            "你是一个连通测试助手。用一句简短中文回复确认你能正常工作。",
        },
        { role: "user", content: "ping" },
      ],
      config,
      kernel
    );
    return { ok: true, reply };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
