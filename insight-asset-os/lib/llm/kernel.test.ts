import { describe, it, expect } from "vitest";
import { injectKernel } from "./kernel";

describe("injectKernel", () => {
  it("无 kernel 时原样返回", () => {
    expect(injectKernel("你是助手", "")).toBe("你是助手");
    expect(injectKernel("你是助手", null)).toBe("你是助手");
    expect(injectKernel("你是助手", undefined)).toBe("你是助手");
    expect(injectKernel("你是助手", "   \n  ")).toBe("你是助手");
  });

  it("有 kernel 时追加立场段", () => {
    const result = injectKernel("你是助手", "判断1\n判断2");
    expect(result).toContain("你是助手");
    expect(result).toContain("判断1");
    expect(result).toContain("判断2");
    expect(result).toContain("个人判断立场");
  });

  it("kernel 内容会被 trim", () => {
    const result = injectKernel("你是助手", "  判断X  \n  \n");
    expect(result).toContain("判断X");
    expect(result).not.toContain("判断X  ");
  });
});
