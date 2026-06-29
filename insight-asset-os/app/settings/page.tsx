"use client";

import { useEffect, useState } from "react";
import { Save, Wifi, Folder, BrainCircuit, Layers } from "lucide-react";
import { PROVIDERS, detectProvider, getProvider } from "@/lib/llm/providers";

interface SettingsData {
  llm: { baseURL: string; apiKey: string; model: string };
  llmApiKeySet: boolean;
  vaultPath: string;
  insightKernel: string;
}

export default function SettingsPage() {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [savedHint, setSavedHint] = useState(false);
  const [providerId, setProviderId] = useState("glm");

  async function load() {
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error(`加载失败 (${res.status})`);
      const d: SettingsData = await res.json();
      setData(d);
      setProviderId(detectProvider(d.llm.baseURL, d.llm.model));
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : String(e));
    }
  }
  useEffect(() => { load(); }, []);

  function selectProvider(id: string) {
    const p = getProvider(id);
    setProviderId(id);
    if (p && id !== "custom") {
      setData((d) => (d ? { ...d, llm: { ...d.llm, baseURL: p.baseURL, model: p.defaultModel } } : d));
    }
  }

  async function save() {
    if (busy) return;
    setBusy(true); setSavedHint(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ llm: data?.llm, vaultPath: data?.vaultPath, insightKernel: data?.insightKernel }),
      });
      if (!res.ok) throw new Error(`保存失败 (${res.status})`);
      setSavedHint(true); await load();
      setTimeout(() => setSavedHint(false), 2000);
    } catch (e) {
      setSavedHint(false);
      alert(`保存失败：${e instanceof Error ? e.message : String(e)}`);
    } finally { setBusy(false); }
  }

  async function testLlm() {
    if (busy) return;
    setBusy(true); setTestResult(null);
    try {
      const res = await fetch("/api/llm-test", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data?.llm ?? {}) });
      const result = await res.json();
      setTestResult(result.ok ? { ok: true, text: `连通成功：${result.reply}` } : { ok: false, text: `失败：${result.error}` });
    } catch (e) {
      setTestResult({ ok: false, text: `请求失败：${e instanceof Error ? e.message : String(e)}` });
    } finally { setBusy(false); }
  }

  function updateLLM(field: "baseURL" | "apiKey" | "model", value: string) {
    setData((d) => (d ? { ...d, llm: { ...d.llm, [field]: value } } : d));
    if (field === "baseURL") setProviderId(detectProvider(value, data?.llm.model ?? ""));
  }

  if (loadError) return <div className="p-8 text-error">{loadError}</div>;
  if (!data) return <div className="p-8 text-fg-secondary">加载中…</div>;

  const currentProvider = getProvider(providerId);
  const isCustom = providerId === "custom";

  return (
    <div className="p-8 max-w-2xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold font-serif-cn tracking-wide">设置</h1>
        <p className="text-sm text-fg-secondary mt-1">配置 LLM 服务、数据路径和判断立场</p>
      </div>

      <section className="card space-y-4">
        <div className="flex items-center gap-2.5 mb-1">
          <Wifi size={15} className="text-accent" />
          <h2 className="text-sm font-medium">LLM 服务</h2>
        </div>
        <Field label="服务商">
          <select className="input" value={providerId} onChange={(e) => selectProvider(e.target.value)}>
            {PROVIDERS.map((p) => (<option key={p.id} value={p.id}>{p.label}</option>))}
          </select>
        </Field>
        <Field label="Base URL">
          <input className="input" value={data.llm.baseURL} onChange={(e) => updateLLM("baseURL", e.target.value)} />
        </Field>
        <Field label="API Key">
          <input type="password" className="input"
            placeholder={currentProvider?.keyPlaceholder ? (data.llmApiKeySet ? `已设置（不改可留空）· ${currentProvider.keyPlaceholder}` : currentProvider.keyPlaceholder) : (data.llmApiKeySet ? "已设置（不改可留空）" : "请填写 API Key")}
            value={data.llm.apiKey} onChange={(e) => updateLLM("apiKey", e.target.value)} />
        </Field>
        <Field label="模型">
          {isCustom || !currentProvider?.models.length ? (
            <input className="input" placeholder="输入模型名称" value={data.llm.model} onChange={(e) => updateLLM("model", e.target.value)} />
          ) : (
            <select className="input" value={data.llm.model} onChange={(e) => updateLLM("model", e.target.value)}>
              {!currentProvider.models.includes(data.llm.model) && data.llm.model && <option value={data.llm.model}>{data.llm.model}</option>}
              {currentProvider.models.map((m) => (<option key={m} value={m}>{m}</option>))}
            </select>
          )}
        </Field>
        <div className="flex items-center gap-3 pt-1">
          <button onClick={testLlm} disabled={busy} className="btn-secondary">{busy ? "测试中…" : "测试连通"}</button>
        </div>
        {testResult && (
          <div className={`rounded-lg px-3 py-2 text-xs leading-relaxed ${
            testResult.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
          }`}>
            {testResult.ok ? (
              <span>✓ {testResult.text}</span>
            ) : (
              <div>
                <div className="font-medium mb-0.5">✗ 连通失败</div>
                <div className="opacity-80 break-all">{testResult.text}</div>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="card space-y-4">
        <div className="flex items-center gap-2.5 mb-1">
          <Folder size={15} className="text-accent" />
          <h2 className="text-sm font-medium">文件夹路径（Vault）</h2>
        </div>
        <Field label="本地文件夹绝对路径">
          <input className="input" placeholder="/Users/you/Documents/notes" value={data.vaultPath}
            onChange={(e) => setData((d) => (d ? { ...d, vaultPath: e.target.value } : d))} />
        </Field>
        <p className="text-xs text-fg-muted">采集时会递归扫描该目录下的 md/txt/pdf/docx/html 文件。</p>
      </section>

      <section className="card space-y-4">
        <div className="flex items-center gap-2.5 mb-1">
          <Layers size={15} className="text-accent" />
          <h2 className="text-sm font-medium">本地 Embedding 引擎</h2>
        </div>
        <p className="text-xs text-fg-secondary leading-relaxed">
          使用 node-llama-cpp + Qwen3-Embedding-0.6B GGUF 模型（~610MB），在本地为文本生成语义向量，用于自动聚类和语义搜索。
          模型已随 linkly-ai 预装，无需联网下载，纯本地计算。
        </p>
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={async () => {
              if (busy) return;
              setBusy(true);
              try {
                const res = await fetch("/api/batch", { method: "POST" });
                const d = await res.json();
                if (d.ok) {
                  alert(`✓ 处理完成\n- 新嵌入: ${d.embedded} 条\n- 已有: ${d.skipped} 条\n- 聚类: ${d.clusters} 个\n- 自动创建主题: ${d.topicsCreated} 个\n- 已分配: ${d.assigned} 条`);
                } else {
                  alert(`✗ 失败: ${d.error ?? d.errors?.join("; ")}`);
                }
              } catch (e: any) { alert(`请求失败: ${e.message}`); }
              finally { setBusy(false); }
            }}
            disabled={busy}
            className="btn-secondary"
          >
            {busy ? "处理中…" : "运行智能聚类"}
          </button>
          <span className="text-xs text-fg-muted">基于语义自动发现主题分组</span>
        </div>
      </section>

      <section className="card space-y-4">
        <div className="flex items-center gap-2.5 mb-1">
          <BrainCircuit size={15} className="text-accent" />
          <h2 className="text-sm font-medium">Insight Kernel</h2>
        </div>
        <textarea className="input min-h-[120px] font-mono text-sm"
          placeholder={"每行一条你的核心判断，例如：\n管理是放大器，不是解决方案\n供应商的核心能力是响应速度，不是成本"}
          value={data.insightKernel}
          onChange={(e) => setData((d) => (d ? { ...d, insightKernel: e.target.value } : d))} />
        <p className="text-xs text-fg-muted">也可到「内核」页面结构化管理，编译后自动保存至此。</p>
      </section>

      <div className="flex items-center gap-3">
        <button onClick={save} disabled={busy} className="btn-primary"><Save size={14} />{busy ? "处理中…" : "保存设置"}</button>
        {savedHint && <span className="text-xs text-success">✓ 已保存</span>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-fg-muted mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
