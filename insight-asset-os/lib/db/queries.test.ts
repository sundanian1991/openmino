import { describe, it, expect, beforeEach, afterEach, afterAll } from "vitest";
import { resetDbForTest } from "./index";
import {
  getSetting,
  setSetting,
  getAllSettings,
  getLLMConfig,
  setLLMConfig,
  LLM_CONFIG_KEY,
  VAULT_PATH_KEY,
  KERNEL_KEY,
  createAsset,
  listAssets,
  getAsset,
  updateAsset,
  upgradeAsset,
  createTopic,
  listTopics,
  updateTopic,
  deleteTopic,
  assignTopic,
  getStats,
  createKernelEntry,
  listKernelEntries,
  updateKernelEntry,
  deleteKernelEntry,
  compileKernel,
  createWritingStyle,
  listWritingStyles,
  updateWritingStyle,
  deleteWritingStyle,
  seedPresetStyles,
  addFeedback,
  listFeedback,
} from "./queries";
import fs from "fs";
import path from "path";
import os from "os";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "iao-q-"));
const dbPath = path.join(tmpDir, "test.db");

afterAll(() => {
  resetDbForTest("");
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("settings queries", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("getSetting 未设置时返回 null", () => {
    expect(getSetting("not_exist")).toBeNull();
  });

  it("setSetting/getSetting 往返", () => {
    setSetting("foo", "bar");
    expect(getSetting("foo")).toBe("bar");
  });

  it("setSetting 覆盖已存在值", () => {
    setSetting("foo", "1");
    setSetting("foo", "2");
    expect(getSetting("foo")).toBe("2");
  });

  it("导出的 key 常量正确", () => {
    expect(LLM_CONFIG_KEY).toBe("llm_config");
    expect(VAULT_PATH_KEY).toBe("vault_path");
    expect(KERNEL_KEY).toBe("insight_kernel");
  });

  it("getAllSettings 返回所有键值", () => {
    setSetting("a", "1");
    setSetting("b", "2");
    const all = getAllSettings();
    expect(all.a).toBe("1");
    expect(all.b).toBe("2");
  });

  it("getLLMConfig 未配置时返回默认值 glm-5.2", () => {
    const cfg = getLLMConfig();
    expect(cfg.baseURL).toContain("bigmodel");
    expect(cfg.model).toBe("glm-5.2");
    expect(cfg.apiKey).toBe("");
  });

  it("setLLMConfig/getLLMConfig 往返", () => {
    setLLMConfig({
      baseURL: "https://api.deepseek.com/v1",
      apiKey: "sk-xxx",
      model: "deepseek-chat",
    });
    const cfg = getLLMConfig();
    expect(cfg.baseURL).toBe("https://api.deepseek.com/v1");
    expect(cfg.apiKey).toBe("sk-xxx");
    expect(cfg.model).toBe("deepseek-chat");
  });
});

describe("asset queries", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("createAsset + getAsset 往返", () => {
    const id = createAsset({
      title: "测试标题",
      insight: "测试洞察",
      tags: ["管理", "决策"],
      source_path: "/tmp/x.md",
      source_type: "md",
    });
    const a = getAsset(id)!;
    expect(a.title).toBe("测试标题");
    expect(a.insight).toBe("测试洞察");
    expect(a.tags).toEqual(["管理", "决策"]);
    expect(a.type).toBe("Light");
    expect(a.status).toBe("raw");
    expect(a.timeline?.[0].action).toBe("采集入库");
  });

  it("listAssets 支持 status 筛选", () => {
    createAsset({ title: "a" });
    const id2 = createAsset({ title: "b" });
    updateAsset(id2, { status: "calibrating" });
    const calibrating = listAssets({ status: "calibrating" });
    expect(calibrating).toHaveLength(1);
    expect(calibrating[0].title).toBe("b");
  });

  it("listAssets 支持全文搜索 q", () => {
    createAsset({ title: "管理放大器", insight: "判断1" });
    createAsset({ title: "其他", insight: "判断2" });
    const result = listAssets({ q: "管理" });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("管理放大器");
  });

  it("upgradeAsset 把轻量卡升级为资产卡", () => {
    const id = createAsset({ title: "x", insight: "y" });
    upgradeAsset(id, {
      is_contrarian: true,
      evidence_level: "E3",
      reasoning: "有案例",
      dimensions: ["适用边界"],
    });
    const a = getAsset(id)!;
    expect(a.type).toBe("Asset");
    expect(a.status).toBe("asset");
    expect(a.is_contrarian).toBe(1);
    expect(a.evidence_level).toBe("E3");
    expect(a.reasoning).toBe("有案例");
    expect(a.dimensions).toEqual(["适用边界"]);
    const actions = a.timeline?.map((t) => t.action);
    expect(actions).toContain("升级为资产卡");
  });

  it("assignTopic 关联主题并记录时间线", () => {
    const aid = createAsset({ title: "x" });
    const tid = createTopic("管理决策");
    assignTopic(aid, tid);
    const a = getAsset(aid)!;
    expect(a.topic_id).toBe(tid);
  });
});

describe("topic queries", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("createTopic + listTopics 含 asset_count", () => {
    const tid = createTopic("认知");
    const list = listTopics();
    expect(list).toHaveLength(1);
    expect(list[0].name).toBe("认知");
    expect(list[0].asset_count).toBe(0);
    const aid = createAsset({ title: "x" });
    assignTopic(aid, tid);
    const list2 = listTopics();
    expect(list2[0].asset_count).toBe(1);
  });
});

describe("getStats", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("统计正确", () => {
    createAsset({ title: "a" });
    const id2 = createAsset({ title: "b" });
    upgradeAsset(id2, {
      is_contrarian: false,
      evidence_level: "E4",
      dimensions: [],
    });
    const stats = getStats();
    expect(stats.total).toBe(2);
    expect(stats.inUse).toBe(1);
    expect(stats.realCases).toBe(1);
    expect(stats.pending).toBe(1);
  });
});

describe("topic update/delete", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("updateTopic 修改名称", () => {
    const id = createTopic("旧名");
    updateTopic(id, { name: "新名" });
    expect(listTopics().find(t => t.id === id)!.name).toBe("新名");
  });

  it("deleteTopic 删除", () => {
    const id = createTopic("待删");
    deleteTopic(id);
    expect(listTopics().length).toBe(0);
  });
});

describe("kernel entry queries", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("createKernelEntry/listKernelEntries 往返", () => {
    createKernelEntry({ category: "belief", judgment: "管理是放大器", confidence: 80 });
    expect(listKernelEntries().length).toBe(1);
    expect(listKernelEntries("belief").length).toBe(1);
    expect(listKernelEntries("contrarian").length).toBe(0);
  });

  it("updateKernelEntry 修改内容", () => {
    const id = createKernelEntry({ category: "belief", judgment: "旧判断" });
    updateKernelEntry(id, { judgment: "新判断" });
    expect(listKernelEntries().find(e => e.id === id)!.judgment).toBe("新判断");
  });

  it("deleteKernelEntry 删除", () => {
    const id = createKernelEntry({ category: "belief", judgment: "待删" });
    deleteKernelEntry(id);
    expect(listKernelEntries().length).toBe(0);
  });

  it("compileKernel 编译所有条目为文本", () => {
    createKernelEntry({ category: "belief", judgment: "判断A", scenarios: "场景X" });
    createKernelEntry({ category: "contrarian", judgment: "反常识B", confidence: 90 });
    const compiled = compileKernel();
    expect(compiled).toContain("判断A");
    expect(compiled).toContain("反常识B");
    expect(compiled).toContain("底层信念");
    expect(compiled).toContain("反常识判断");
  });

  it("compileKernel 无条目时返回空串", () => {
    expect(compileKernel()).toBe("");
  });
});

describe("writing style queries", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("seedPresetStyles 创建预设风格且幂等", () => {
    seedPresetStyles();
    expect(listWritingStyles().length).toBe(3);
    seedPresetStyles();
    expect(listWritingStyles().length).toBe(3);
  });

  it("createWritingStyle 往返", () => {
    const id = createWritingStyle("my-style", JSON.stringify({ tone: "自定义" }));
    expect(listWritingStyles().find(s => s.id === id)?.name).toBe("my-style");
  });

  it("updateWritingStyle 修改配置", () => {
    const id = createWritingStyle("s1", "{}");
    updateWritingStyle(id, { config: JSON.stringify({ tone: "新" }) });
    expect(JSON.parse(listWritingStyles().find(s => s.id === id)!.config).tone).toBe("新");
  });

  it("deleteWritingStyle 删除", () => {
    const id = createWritingStyle("s1", "{}");
    deleteWritingStyle(id);
    expect(listWritingStyles().length).toBe(0);
  });
});

describe("feedback queries", () => {
  beforeEach(() => resetDbForTest(dbPath));
  afterEach(() => resetDbForTest(""));

  it("addFeedback/listFeedback 往返", () => {
    const id = createAsset({ title: "F" });
    addFeedback(id, "反馈内容", "calibrate");
    addFeedback(id, "另一个反馈");
    const fb = listFeedback(id);
    expect(fb).toHaveLength(2);
    const contents = fb.map(f => f.content);
    expect(contents).toContain("反馈内容");
    expect(contents).toContain("另一个反馈");
  });
});
