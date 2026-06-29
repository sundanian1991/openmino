"use client";

import { useEffect, useState } from "react";
import { FileText, Loader2, Sparkles } from "lucide-react";

interface Style {
  id: number;
  name: string;
  config: string;
  is_preset: number;
}

interface Scaffold {
  title: string;
  sections: { heading: string; purpose: string; key_points: string[] }[];
}

export default function OutputPage() {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [scaffold, setScaffold] = useState<Scaffold | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/output/styles").then(r => r.json()).then(d => {
      if (d.ok) {
        setStyles(d.data);
        if (d.data.length > 0) setSelectedStyle(d.data[0].name);
      }
    }).catch(() => {});
  }, []);

  async function handleGenerate() {
    if (!topic.trim()) return;
    setGenerating(true);
    setError("");
    setScaffold(null);
    try {
      const res = await fetch("/api/output/scaffold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), message: message.trim(), style: selectedStyle }),
      });
      const d = await res.json();
      if (d.ok) setScaffold(d.data);
      else setError(d.error ?? "生成失败");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold font-serif-cn tracking-wide">写作输出</h1>
        <p className="text-sm text-fg-secondary mt-1">基于主题和内核，AI 生成写作骨架</p>
      </div>

      {/* Input */}
      <div className="card space-y-4">
        <div>
          <label className="text-xs text-fg-muted block mb-1.5 uppercase tracking-wider">写作主题</label>
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="例如：供应商管理最佳实践" className="input" />
        </div>
        <div>
          <label className="text-xs text-fg-muted block mb-1.5 uppercase tracking-wider">核心信息（可选）</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="你想传达的核心观点…" className="input min-h-[64px] resize-none" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-fg-muted block mb-1.5 uppercase tracking-wider">写作风格</label>
            <select value={selectedStyle} onChange={e => setSelectedStyle(e.target.value)} className="input">
              {styles.map(s => <option key={s.id} value={s.name}>{s.name}{s.is_preset ? "（预设）" : ""}</option>)}
            </select>
          </div>
          <button onClick={handleGenerate} disabled={generating || !topic.trim()} className="btn-primary self-end">
            {generating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {generating ? "生成中…" : "生成骨架"}
          </button>
        </div>
        {error && <div className="text-sm text-error">{error}</div>}
      </div>

      {/* Result */}
      {scaffold && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-accent" />
            <h2 className="text-base font-medium font-serif-cn">{scaffold.title}</h2>
          </div>
          <div className="space-y-3">
            {scaffold.sections.map((s, i) => (
              <div key={i} className="card">
                <div className="flex items-center gap-2 mb-2">
                  <span className="tag text-[10px]">{i + 1}</span>
                  <h3 className="text-sm font-medium">{s.heading}</h3>
                </div>
                <p className="text-xs text-fg-secondary mb-2 leading-relaxed">{s.purpose}</p>
                <ul className="space-y-1">
                  {s.key_points.map((p, j) => (
                    <li key={j} className="text-xs text-fg-muted flex items-start gap-2 leading-relaxed">
                      <span className="text-accent mt-1.5 shrink-0">·</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
