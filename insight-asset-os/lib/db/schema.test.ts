import { describe, it, expect } from "vitest";
import { SCHEMA_SQL } from "./schema";

describe("schema", () => {
  it("包含 assets 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS assets");
  });

  it("包含 topics 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS topics");
  });

  it("包含 sources 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS sources");
  });

  it("包含 feedback 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS feedback");
  });

  it("包含 settings 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS settings");
  });

  it("assets 表包含 evidence_level 字段", () => {
    expect(SCHEMA_SQL).toContain("evidence_level");
  });

  it("包含 kernel_entries 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS kernel_entries");
  });

  it("包含 writing_styles 表", () => {
    expect(SCHEMA_SQL).toContain("CREATE TABLE IF NOT EXISTS writing_styles");
  });

  it("kernel_entries 包含 category/judgment/confidence 字段", () => {
    expect(SCHEMA_SQL).toContain("category");
    expect(SCHEMA_SQL).toContain("judgment");
    expect(SCHEMA_SQL).toContain("confidence");
  });
});
