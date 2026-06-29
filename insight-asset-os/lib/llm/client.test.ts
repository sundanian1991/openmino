import { describe, it, expect, vi, beforeEach } from "vitest";
import { chat, type LLMConfig } from "./client";

const config: LLMConfig = {
  baseURL: "https://open.bigmodel.cn/api/paas/v4",
  apiKey: "test-key",
  model: "glm-4-plus",
};

describe("chat", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("调用正确的 endpoint 并返回内容", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [{ message: { content: "你好" } }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
    );

    const result = await chat(
      [{ role: "user", content: "打招呼" }],
      config,
      "我的判断立场"
    );

    expect(result).toBe("你好");
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://open.bigmodel.cn/api/paas/v4/chat/completions");
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.model).toBe("glm-4-plus");
    const sysMsg = body.messages.find((m: any) => m.role === "system");
    expect(sysMsg.content).toContain("我的判断立场");
  });

  it("baseURL 末尾斜杠会被去除", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ choices: [{ message: { content: "ok" } }] }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
    );
    await chat([{ role: "user", content: "hi" }], {
      ...config,
      baseURL: "https://api.x.com/v1/",
    });
    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.x.com/v1/chat/completions");
  });

  it("HTTP 错误时抛出带状态码的异常", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "bad key" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      })
    );
    await expect(
      chat([{ role: "user", content: "hi" }], config)
    ).rejects.toThrow(/401/);
  });

  it("返回内容为空时抛错", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ choices: [{ message: { content: "" } }] }),
        { status: 200, headers: { "content-type": "application/json" } }
      )
    );
    await expect(
      chat([{ role: "user", content: "hi" }], config)
    ).rejects.toThrow(/空/);
  });
});
