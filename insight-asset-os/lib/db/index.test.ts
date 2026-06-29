import { describe, it, expect, beforeEach, afterEach, afterAll } from "vitest";
import { getDb, initDb, resetDbForTest } from "./index";
import fs from "fs";
import path from "path";
import os from "os";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "iao-test-"));
const dbPath = path.join(tmpDir, "test.db");

afterAll(() => {
  resetDbForTest("");
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("db index", () => {
  beforeEach(() => {
    resetDbForTest(dbPath);
  });

  afterEach(() => {
    resetDbForTest("");
  });

  it("initDb 创建所有表", () => {
    initDb(dbPath);
    const db = getDb();
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
      .all() as { name: string }[];
    const names = tables.map((t) => t.name);
    expect(names).toContain("assets");
    expect(names).toContain("topics");
    expect(names).toContain("sources");
    expect(names).toContain("feedback");
    expect(names).toContain("settings");
    expect(names).toContain("kernel_entries");
    expect(names).toContain("writing_styles");
  });

  it("initDb 幂等（重复调用不报错）", () => {
    initDb(dbPath);
    expect(() => initDb(dbPath)).not.toThrow();
  });
});
