import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import { detectType, truncate, parseFile } from "./index";

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "iao-idx-"));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("detectType", () => {
  it("识别 md/txt/pdf/docx/html", () => {
    expect(detectType("a.md")).toBe("md");
    expect(detectType("a.markdown")).toBe("md");
    expect(detectType("a.txt")).toBe("txt");
    expect(detectType("a.pdf")).toBe("pdf");
    expect(detectType("a.docx")).toBe("docx");
    expect(detectType("a.html")).toBe("html");
    expect(detectType("a.htm")).toBe("html");
  });

  it("不支持的类型返回 null", () => {
    expect(detectType("a.xlsx")).toBeNull();
    expect(detectType("a.epub")).toBeNull();
    expect(detectType("a")).toBeNull();
  });

  it("大小写不敏感", () => {
    expect(detectType("A.PDF")).toBe("pdf");
    expect(detectType("A.MD")).toBe("md");
  });
});

describe("truncate", () => {
  it("短文本原样返回", () => {
    expect(truncate("短文本", 100)).toBe("短文本");
  });

  it("长文本被截断且保留首尾", () => {
    const long = "x".repeat(10000);
    const result = truncate(long, 1000);
    expect(result.length).toBeLessThan(long.length);
    expect(result).toContain("截断");
    expect(result.startsWith("x")).toBe(true);
    expect(result.endsWith("x")).toBe(true);
  });
});

describe("parseFile", () => {
  it("解析 md 文件", async () => {
    const p = path.join(tmpDir, "t.md");
    fs.writeFileSync(p, "# 标题\n\n正文内容");
    const result = await parseFile(p);
    expect(result.type).toBe("md");
    expect(result.text).toContain("正文内容");
  });

  it("解析 txt 文件", async () => {
    const p = path.join(tmpDir, "t.txt");
    fs.writeFileSync(p, "纯文本笔记");
    const result = await parseFile(p);
    expect(result.type).toBe("txt");
    expect(result.text).toBe("纯文本笔记");
  });

  it("解析 html 文件并提取正文（移除 script/style）", async () => {
    const p = path.join(tmpDir, "t.html");
    fs.writeFileSync(
      p,
      `<html><head><style>.x{}</style></head><body>
       <script>alert(1)</script>
       <article>这是正文<script>hack</script></article></body></html>`
    );
    const result = await parseFile(p);
    expect(result.type).toBe("html");
    expect(result.text).toContain("正文");
    expect(result.text).not.toContain("alert");
    expect(result.text).not.toContain("hack");
    expect(result.text).not.toContain(".x{}");
  });

  it("不支持的类型抛错", async () => {
    const p = path.join(tmpDir, "t.xlsx");
    fs.writeFileSync(p, "fake");
    await expect(parseFile(p)).rejects.toThrow(/不支持/);
  });
});
