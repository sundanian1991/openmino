import { describe, it, expect, vi, beforeEach } from "vitest";
import { testConnection } from "./test-connection";
import { chat } from "./client";

vi.mock("./client", () => ({
  chat: vi.fn(),
}));

describe("testConnection", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("成功时返回 ok=true", async () => {
    (chat as ReturnType<typeof vi.fn>).mockResolvedValue("你好，我是助手");
    const result = await testConnection({
      baseURL: "https://x",
      apiKey: "k",
      model: "m",
    });
    expect(result.ok).toBe(true);
    expect(result.reply).toContain("你好");
  });

  it("失败时返回 ok=false 和错误信息", async () => {
    (chat as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("LLM 请求失败 401: bad")
    );
    const result = await testConnection({
      baseURL: "https://x",
      apiKey: "k",
      model: "m",
    });
    expect(result.ok).toBe(false);
    expect(result.error).toContain("401");
  });

  it("未知异常也能被捕获", async () => {
    (chat as ReturnType<typeof vi.fn>).mockRejectedValue("字符串错误");
    const result = await testConnection({
      baseURL: "https://x",
      apiKey: "k",
      model: "m",
    });
    expect(result.ok).toBe(false);
    expect(result.error).toContain("字符串错误");
  });
});
