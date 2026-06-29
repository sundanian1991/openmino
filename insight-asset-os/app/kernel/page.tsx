"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Compass, Lightbulb } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

const CATEGORIES = [
  { key: "belief", label: "底层信念", desc: "长期价值主张、哲学立场" },
  { key: "contrarian", label: "反常识判断", desc: "反对主流叙事的判断" },
  { key: "expertise", label: "擅长问题域", desc: "被验证过能力的领域" },
  { key: "challenge", label: "想挑战的常识", desc: "想消灭/重塑的行业套话" },
];

interface Entry {
  id: number;
  category: string;
  judgment: string;
  scenarios: string | null;
  counterexamples: string | null;
  confidence: number;
}

export default function KernelPage() {
  const [activeTab, setActiveTab] = useState("belief");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newJudgment, setNewJudgment] = useState("");
  const [newScenarios, setNewScenarios] = useState("");
  const [newConfidence, setNewConfidence] = useState(50);
  const [compiled, setCompiled] = useState("");
  const [compileMsg, setCompileMsg] = useState("");

  useEffect(() => { loadEntries(); }, [activeTab]);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => {
      if (d.insightKernel) setCompiled(d.insightKernel);
    }).catch(() => {});
  }, []);

  function loadEntries() {
    fetch(`/api/kernel?category=${activeTab}`).then(r => r.json()).then(d => {
      if (d.ok) setEntries(d.data);
    });
  }

  async function handleCreate() {
    if (!newJudgment.trim()) return;
    await fetch("/api/kernel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: activeTab, judgment: newJudgment.trim(), scenarios: newScenarios.trim() || undefined, confidence: newConfidence }),
    });
    setNewJudgment("");
    setNewScenarios("");
    setNewConfidence(50);
    loadEntries();
  }

  async function handleDelete(id: number) {
    await fetch(`/api/kernel/${id}`, { method: "DELETE" });
    loadEntries();
  }

  async function handleCompile() {
    const res = await fetch("/api/kernel/compile", { method: "POST" });
    const d = await res.json();
    if (d.ok) {
      setCompiled(d.kernel);
      setCompileMsg("已编译并保存 ✓");
      setTimeout(() => setCompileMsg(""), 3000);
    }
  }

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold font-serif-cn tracking-wide">Insight Kernel</h1>
          <p className="text-sm text-fg-secondary mt-1">个人的判断宪法，自动注入所有 LLM 输出</p>
        </div>
        <button onClick={handleCompile} className="btn-primary shrink-0">
          <Compass size={14} /> 编译内核
        </button>
      </div>
      {compileMsg && <div className="text-sm text-accent bg-accent/10 rounded-lg px-3 py-2">{compileMsg}</div>}

      {/* Tabs */}
      <div className="flex gap-0.5 bg-bg-alt rounded-lg p-0.5 border border-border">
        {CATEGORIES.map(cat => (
          <button key={cat.key} onClick={() => setActiveTab(cat.key)}
            className={`flex-1 px-3 py-2 text-xs rounded-md transition-all ${
              activeTab === cat.key ? "bg-bg-raised text-fg shadow-sm" : "text-fg-secondary hover:text-fg"
            }`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {entries.map(e => (
          <div key={e.id} className="card group">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-fg leading-relaxed">{e.judgment}</div>
                <div className="flex items-center gap-3 mt-2">
                  {e.scenarios && <span className="tag text-[10px]">适用：{e.scenarios}</span>}
                  <span className="text-[10px] text-fg-muted font-mono">{e.confidence}%</span>
                </div>
              </div>
              <button onClick={() => handleDelete(e.id)} className="w-7 h-7 flex items-center justify-center rounded hover:bg-bg-raised text-fg-muted hover:text-error opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <EmptyState
            icon={Lightbulb}
            title="此分类暂无条目"
            description="点上方「添加」录入你的核心判断立场"
          />
        )}
      </div>

      {/* New entry form */}
      <div className="card space-y-3">
        <h3 className="text-xs text-fg-secondary font-medium uppercase tracking-wider">新增内核条目</h3>
        <textarea value={newJudgment} onChange={e => setNewJudgment(e.target.value)}
          placeholder="输入一句话判断…" className="input min-h-[64px] resize-none" />
        <div className="flex items-center gap-3">
          <input value={newScenarios} onChange={e => setNewScenarios(e.target.value)}
            placeholder="适用场景（可选）" className="input flex-1" />
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-fg-muted">{newConfidence}%</span>
            <input type="range" min={0} max={100} value={newConfidence}
              onChange={e => setNewConfidence(Number(e.target.value))} className="w-16" />
          </div>
          <button onClick={handleCreate} className="btn-primary shrink-0">
            <Plus size={14} /> 添加
          </button>
        </div>
      </div>

      {/* Compiled output */}
      {compiled && (
        <div>
          <h2 className="section-title mb-3">当前编译内核</h2>
          <pre className="text-xs text-fg-secondary leading-relaxed whitespace-pre-wrap card max-h-48 overflow-auto font-mono">
            {compiled}
          </pre>
        </div>
      )}
    </div>
  );
}
