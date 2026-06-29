import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import { scanDirectory } from "./intake";

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "iao-scan-"));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("scanDirectory", () => {
  it("扫描出受支持的文件类型", () => {
    fs.writeFileSync(path.join(tmpDir, "a.md"), "x");
    fs.writeFileSync(path.join(tmpDir, "b.txt"), "x");
    fs.writeFileSync(path.join(tmpDir, "c.pdf"), "x");
    fs.writeFileSync(path.join(tmpDir, "d.docx"), "x");
    fs.writeFileSync(path.join(tmpDir, "e.html"), "x");
    fs.writeFileSync(path.join(tmpDir, "f.png"), "x");
    const files = scanDirectory(tmpDir);
    expect(files).toHaveLength(6);
    const types = files.map((f) => f.type).sort();
    expect(types).toEqual(["docx", "html", "image", "md", "pdf", "txt"]);
  });

  it("忽略不支持的类型", () => {
    fs.writeFileSync(path.join(tmpDir, "a.md"), "x");
    fs.writeFileSync(path.join(tmpDir, "b.xlsx"), "x");
    fs.writeFileSync(path.join(tmpDir, "c.epub"), "x");
    const files = scanDirectory(tmpDir);
    expect(files).toHaveLength(1);
    expect(files[0].type).toBe("md");
  });

  it("递归扫描子目录", () => {
    fs.mkdirSync(path.join(tmpDir, "sub"));
    fs.writeFileSync(path.join(tmpDir, "a.md"), "x");
    fs.writeFileSync(path.join(tmpDir, "sub", "b.md"), "x");
    const files = scanDirectory(tmpDir);
    expect(files).toHaveLength(2);
  });

  it("跳过隐藏目录和 node_modules", () => {
    fs.mkdirSync(path.join(tmpDir, ".git"));
    fs.mkdirSync(path.join(tmpDir, "node_modules"));
    fs.writeFileSync(path.join(tmpDir, "a.md"), "x");
    fs.writeFileSync(path.join(tmpDir, ".git/b.md"), "x");
    fs.writeFileSync(path.join(tmpDir, "node_modules/c.md"), "x");
    const files = scanDirectory(tmpDir);
    expect(files).toHaveLength(1);
  });

  it("目录不存在时抛错", () => {
    expect(() => scanDirectory("/nonexistent/path/xyz")).toThrow(/不存在/);
  });

  it("传入文件而非目录时抛错", () => {
    const fp = path.join(tmpDir, "a.md");
    fs.writeFileSync(fp, "x");
    expect(() => scanDirectory(fp)).toThrow(/不是目录/);
  });

  it("返回结果含 name 和 size", () => {
    fs.writeFileSync(path.join(tmpDir, "a.md"), "hello");
    const files = scanDirectory(tmpDir);
    expect(files[0].name).toBe("a.md");
    expect(files[0].size).toBe(5);
  });
});
