import { describe, it, expect, beforeEach, afterEach, afterAll } from "vitest";
import { resetDbForTest } from "../db/index";
import {
  createAsset,
  upgradeAsset,
  assignTopic,
  createTopic,
} from "../db/queries";
import { lintAssets } from "./lint";
import fs from "fs";
import path from "path";
import os from "os";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "iao-lint-"));
const dbPath = path.join(tmpDir, "test.db");

afterAll(() => {
  resetDbForTest("");
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("lintAssets", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("空库返回无问题", () => {
    const r = lintAssets();
    expect(r.total).toBe(0);
    expect(r.issues).toHaveLength(0);
  });

  it("检出孤立资产卡（资产卡无主题）", () => {
    const id = createAsset({ title: "x", insight: "y" });
    upgradeAsset(id, { is_contrarian: false, evidence_level: "E3", dimensions: [] });
    const r = lintAssets();
    expect(r.summary.orphans).toBe(1);
    expect(r.issues.some((i) => i.type === "orphan")).toBe(true);
  });

  it("有主题的资产卡不算孤立", () => {
    const id = createAsset({ title: "x", insight: "y" });
    const tid = createTopic("管理");
    upgradeAsset(id, { is_contrarian: false, evidence_level: "E3", dimensions: [] });
    assignTopic(id, tid);
    const r = lintAssets();
    expect(r.summary.orphans).toBe(0);
  });

  it("检出证据不足（E0/E1/未标注）", () => {
    const id = createAsset({ title: "x" });
    upgradeAsset(id, { is_contrarian: false, evidence_level: "E1", dimensions: [] });
    const r = lintAssets();
    expect(r.summary.lowEvidence).toBe(1);
  });

  it("检出信息单薄（无 summary 无 key_points）", () => {
    createAsset({ title: "x" });
    const r = lintAssets();
    expect(r.summary.thinCards).toBe(1);
  });

  it("有 summary 的不算单薄", () => {
    createAsset({ title: "x", summary: "有摘要" });
    const r = lintAssets();
    expect(r.summary.thinCards).toBe(0);
  });

  it("检出缺标签", () => {
    createAsset({ title: "x" });
    const r = lintAssets();
    expect(r.summary.noTags).toBe(1);
  });
});
