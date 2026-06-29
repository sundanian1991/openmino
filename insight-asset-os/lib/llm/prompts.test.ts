import { describe, it, expect } from "vitest";
import {
  buildIntakePrompt,
  buildUpgradePrompt,
  buildClassifyPrompt,
  buildCalibratePrompt,
  buildCompileKernelPrompt,
  buildScaffoldPrompt,
} from "./prompts";

describe("buildIntakePrompt", () => {
  it("返回 system + user 消息", () => {
    const p = buildIntakePrompt("测试原文");
    expect(p.system).toContain("结构化知识卡");
    expect(p.user).toContain("测试原文");
  });

  it("长原文会被截断", () => {
    const long = "A".repeat(10000);
    const p = buildIntakePrompt(long);
    expect(p.user).toContain("[...内容过长已截断...]");
  });
});

describe("buildUpgradePrompt", () => {
  it("包含轻量卡标题和洞察", () => {
    const p = buildUpgradePrompt("测试标题", "测试洞察");
    expect(p.user).toContain("测试标题");
    expect(p.user).toContain("测试洞察");
    expect(p.system).toContain("证据等级");
  });
});

describe("buildClassifyPrompt", () => {
  it("空主题列表时提示暂无主题", () => {
    const p = buildClassifyPrompt("标题", "洞察", []);
    expect(p.user).toContain("暂无已有主题");
  });

  it("有主题列表时显示主题", () => {
    const p = buildClassifyPrompt("标题", "洞察", [{ id: 1, name: "管理" }]);
    expect(p.user).toContain("#1 管理");
  });
});

describe("buildCalibratePrompt", () => {
  it("包含轻量卡信息和原文", () => {
    const p = buildCalibratePrompt("标题", "洞察", "标签1", "原文内容");
    expect(p.user).toContain("标题");
    expect(p.user).toContain("原文内容");
  });
});

describe("buildCompileKernelPrompt", () => {
  it("包含待提取文本", () => {
    const p = buildCompileKernelPrompt("管理是放大器");
    expect(p.user).toContain("管理是放大器");
    expect(p.system).toContain("belief");
  });
});

describe("buildScaffoldPrompt", () => {
  it("包含主题和 kernel", () => {
    const p = buildScaffoldPrompt("管理", "核心信息", "我的判断立场");
    expect(p.user).toContain("管理");
    expect(p.user).toContain("我的判断立场");
  });
});
