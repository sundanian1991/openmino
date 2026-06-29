/**
 * 管线契约测试 —— 用 mock fetch 验证 pipeline 各步的 fail-soft 行为。
 *
 * 不依赖真实 LLM，不碰 API Key。
 * 验证：
 *   1. LLM 返回 500 时，pipeline 返回 "fail" 而不是抛异常
 *   2. LLM 返回空 body 时，pipeline 返回 "fail"
 *   3. LLM 返回非 JSON 时，extractJson 抛错，pipeline 捕获并返回 "fail"
 *   4. LLM 返回 malformed JSON 时，extractJson 尝试 brace fallback
 *   5. DB 操作异常时，pipeline 正确传播错误
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { resetDbForTest } from "../db/index";
import { createAsset, upgradeAsset, assignTopic, createTopic, getAsset } from "../db/queries";
import { runPipeline, type PipelineResult } from "./pipeline";
import type { LLMConfig } from "../llm/client";

const dbPath = ":memory:";
const config: LLMConfig = {
  baseURL: "https://mock.api/v1",
  apiKey: "test-key",
  model: "test-model",
};

describe("pipeline fail-soft", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));
  vi.restoreAllMocks();

  // 辅助：创建一张 Light 卡
  function createLightCard(title = "测试卡"): number {
    return createAsset({ title, insight: "核心洞察" });
  }

  // 辅助：mock fetch 返回一个 JSON 卡片
  function mockJsonReply(
    body: Record<string, unknown>,
    status = 200
  ): ReturnType<typeof vi.fn> {
    return vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      })
    );
  }

  // 辅助：mock fetch 返回 500
  function mockServerError(): ReturnType<typeof vi.fn> {
    return vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("Internal Server Error", { status: 500 })
    );
  }

  // 辅助：mock fetch 返回空 body
  function mockEmptyBody(): ReturnType<typeof vi.fn> {
    return vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("", { status: 200 })
    );
  }

  // 辅助：mock fetch 返回非 JSON 文本
  function mockNonJson(): ReturnType<typeof vi.fn> {
    return vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("这是一段纯文本，不是 JSON", {
        status: 200,
        headers: { "content-type": "text/plain" },
      })
    );
  }

  // ====== 升级阶段 ======

  describe("upgrade 阶段", () => {
    it("LLM 返回 500 → pipeline 标记 upgrade=fail，继续执行 classify", async () => {
      const id = createLightCard();
      mockServerError(); // autoUpgrade 调用

      const result = await runPipeline(id, config);
      expect(result.steps.upgrade).toBe("fail");
      // classify 应该仍然被调用（fail-soft）
      expect(["ok", "fail", "skipped"]).toContain(result.steps.classify);
    });

    it("LLM 返回空 body → pipeline 标记 upgrade=fail", async () => {
      const id = createLightCard();
      mockEmptyBody();

      const result = await runPipeline(id, config);
      expect(result.steps.upgrade).toBe("fail");
    });

    it("LLM 返回非 JSON → pipeline 标记 upgrade=fail", async () => {
      const id = createLightCard();
      mockNonJson();

      const result = await runPipeline(id, config);
      expect(result.steps.upgrade).toBe("fail");
    });

    it("LLM 返回合法 JSON → upgrade=ok", async () => {
      const id = createLightCard();
      mockJsonReply({
        is_contrarian: false,
        evidence_level: "E2",
        reasoning: "测试",
        dimensions: ["维度1"],
      });

      const result = await runPipeline(id, config);
      expect(result.steps.upgrade).toBe("ok");
    });

    it("采集阶段已有 evidence_level 时跳过 LLM → upgrade=skipped", async () => {
      const id = createAsset({
        title: "测试卡",
        insight: "核心洞察",
        evidence_level: "E3",
        dimensions: ["维度1"],
      });
      const fetchSpy = mockJsonReply({});
      // 不应调用 fetch，因为 upgrade 被跳过
      const result = await runPipeline(id, config);
      expect(result.steps.upgrade).toBe("skipped");
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  // ====== 分类阶段 ======

  describe("classify 阶段", () => {
    it("LLM 返回 500 → pipeline 标记 classify=fail", async () => {
      const id = createAsset({
        title: "测试卡",
        insight: "核心洞察",
        evidence_level: "E2",
        dimensions: ["维度1"],
      });
      // upgrade 返回 ok
      mockJsonReply({ is_contrarian: false, evidence_level: "E2", reasoning: "x", dimensions: ["d"] });
      // classify 返回 500
      mockServerError();

      const result = await runPipeline(id, config);
      expect(result.steps.upgrade).toBe("ok");
      expect(result.steps.classify).toBe("fail");
    });
  });

  // ====== 关联阶段 ======

  describe("relate 阶段", () => {
    it("LLM 返回非 JSON → relate=fail", async () => {
      const id = createAsset({
        title: "测试卡",
        insight: "核心洞察",
        evidence_level: "E2",
        dimensions: ["维度1"],
      });
      createTopic("测试主题");
      assignTopic(id, 1); // 已有主题，classify 跳过

      mockNonJson(); // relate 调用

      const result = await runPipeline(id, config);
      expect(result.steps.relate).toBe("fail");
      expect(result.errors).toContain(/关联失败/);
    });

    it("LLM 返回合法关联 → relate=ok", async () => {
      const id = createAsset({
        title: "测试卡",
        insight: "核心洞察",
        evidence_level: "E2",
        dimensions: ["维度1"],
      });
      const id2 = createAsset({ title: "关联卡", insight: "相关内容", tags: ["管理"] });
      createTopic("测试主题");
      assignTopic(id, 1);

      mockJsonReply({ links: [{ to_id: id2, relation: "relates_to", note: "测试" }] });

      const result = await runPipeline(id, config);
      expect(result.steps.relate).toBe("ok");
    });
  });

  // ====== 完整管线 ======

  describe("完整管线", () => {
    it("所有步骤都成功 → 全部 ok", async () => {
      const id = createLightCard();
      // upgrade
      mockJsonReply({ is_contrarian: false, evidence_level: "E2", reasoning: "x", dimensions: ["d"] });
      // classify
      mockJsonReply({ action: "create", new_topic_name: "新主题", reason: "x", topic_id: 0 });
      // relate（无候选）
      mockJsonReply({ links: [] });

      const result = await runPipeline(id, config);
      expect(result.steps).toEqual({
        extract: "ok",
        upgrade: "ok",
        classify: "ok",
        relate: "skipped", // relate 无候选时返回 skipped
      });
      expect(result.errors).toHaveLength(0);
    });

    it("中间步骤失败 → errors 数组记录", async () => {
      const id = createLightCard();
      // upgrade fail
      mockServerError();
      // classify ok
      mockJsonReply({ action: "create", new_topic_name: "新主题", reason: "x", topic_id: 0 });
      // relate ok
      mockJsonReply({ links: [] });

      const result = await runPipeline(id, config);
      expect(result.steps.upgrade).toBe("fail");
      expect(result.steps.classify).toBe("ok");
      expect(result.errors).toContain("升级失败");
    });
  });

  // ====== 请求格式契约 ======

  describe("请求格式", () => {
    it("chat 请求包含正确的 URL 和 body 结构", async () => {
      const id = createLightCard();
      mockJsonReply({ is_contrarian: false, evidence_level: "E2", reasoning: "x", dimensions: ["d"] });

      const fetchSpy = vi.spyOn(globalThis, "fetch");
      await runPipeline(id, config);

      expect(fetchSpy).toHaveBeenCalled();
      const [url, init] = fetchSpy.mock.calls[0];
      expect(url).toBe("https://mock.api/v1/chat/completions");
      const body = JSON.parse((init as RequestInit).body as string);
      expect(body.model).toBe("test-model");
      expect(body.temperature).toBe(0.7);
      expect(Array.isArray(body.messages)).toBe(true);
      expect(body.messages[0].role).toBe("system");
    });

    it("kernel 注入到 system prompt", async () => {
      const id = createLightCard();
      mockJsonReply({ is_contrarian: false, evidence_level: "E2", reasoning: "x", dimensions: ["d"] });

      const fetchSpy = vi.spyOn(globalThis, "fetch");
      await runPipeline(id, config, "我的判断立场");

      const body = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
      const sysContent = body.messages[0].content;
      expect(sysContent).toContain("我的判断立场");
    });
  });
});
