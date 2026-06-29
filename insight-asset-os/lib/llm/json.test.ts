import { describe, it, expect } from "vitest";
import { extractJson } from "./json";

describe("extractJson", () => {
  it("纯 JSON 直接解析", () => {
    expect(extractJson('{"a":1}')).toEqual({ a: 1 });
  });

  it("带 markdown 代码块包裹", () => {
    expect(extractJson('```json\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it("带额外文字的代码块", () => {
    expect(extractJson('好的：\n```json\n{"a":1}\n```\n完成')).toEqual({
      a: 1,
    });
  });

  it("裸 JSON 带前后多余文字", () => {
    expect(extractJson('这是结果 {"a":1} 收到')).toEqual({ a: 1 });
  });

  it("解析失败时抛错", () => {
    expect(() => extractJson("完全没有 json 内容")).toThrow(/无法/);
  });

  it("支持泛型", () => {
    const r = extractJson<{ x: number }>('{"x":42}');
    expect(r.x).toBe(42);
  });
});
