"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Zap, MessageSquare, Send, Flame, TrendingUp, Clock, Tag, Edit2, Save, X, Quote, FileText, Share2, Trash2, RefreshCw } from "lucide-react";
import { AssetDetailSkeleton } from "@/components/skeleton";

interface AssetLink {
  id: number;
  relation: string;
  note: string | null;
  target_id: number;
  target_title: string;
  target_insight: string | null;
  direction: "out" | "in";
}

const RELATION_LABEL: Record<string, { text: string; cls: string }> = {
  relates_to: { text: "相关", cls: "tag" },
  supports: { text: "支持", cls: "tag tag-accent" },
  contradicts: { text: "反驳", cls: "tag" },
  evolves: { text: "演进", cls: "tag tag-accent" },
};

export default function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [asset, setAsset] = useState<any>(null);
  const [links, setLinks] = useState<AssetLink[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [fbInput, setFbInput] = useState("");
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editInsight, setEditInsight] = useState("");
  const [editTags, setEditTags] = useState("");
  const [relating, setRelating] = useState(false);

  useEffect(() => {
    fetch(`/api/assets/${id}`).then(r => r.json()).then(d => {
      if (d.ok) { setAsset(d.data); setLinks(d.links ?? []); resetEdit(d.data); }
      else setError(d.error ?? "加载失败");
    }).catch(e => setError(e.message));
    fetch(`/api/assets/${id}/feedback`).then(r => r.json()).then(d => {
      if (d.ok) setFeedback(d.data ?? []);
    }).catch(() => {});
  }, [id]);

  function resetEdit(a: any) {
    setEditTitle(a.title);
    setEditInsight(a.insight ?? "");
    setEditTags((a.tags ?? []).join(", "));
  }

  async function handleSave() {
    const res = await fetch(`/api/assets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle.trim(),
        insight: editInsight.trim(),
        tags: editTags.split(",").map((t: string) => t.trim()).filter(Boolean),
      }),
    });
    const d = await res.json();
    if (d.ok) { setAsset(d.data); setEditing(false); setActionMsg("已保存"); }
    else setActionMsg(`保存失败: ${d.error}`);
    setTimeout(() => setActionMsg(""), 2000);
  }

  async function handleAddFeedback() {
    if (!fbInput.trim()) return;
    const res = await fetch(`/api/assets/${id}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: fbInput.trim(), type: "note" }),
    });
    const d = await res.json();
    if (d.ok) { setFeedback(d.data); setFbInput(""); }
  }

  async function handleUpgrade() {
    setActionMsg("");
    const res = await fetch(`/api/assets/${id}/upgrade`, { method: "POST" });
    const d = await res.json();
    if (d.ok) { setAsset(d.data); setActionMsg("AI 升级完成"); }
    else setActionMsg(`升级失败: ${d.error}`);
    setTimeout(() => setActionMsg(""), 2500);
  }

  // 重新发现关联（wiki 积累模式的手动入口）
  async function handleRelate() {
    setRelating(true); setActionMsg("");
    try {
      const res = await fetch(`/api/assets/${id}/relate`, { method: "POST" });
      const d = await res.json();
      if (d.ok) {
        setActionMsg(d.created > 0 ? `发现 ${d.created} 条新关联` : "暂无新关联");
        const fresh = await fetch(`/api/assets/${id}`).then(r => r.json());
        if (fresh.ok) setLinks(fresh.links ?? []);
      } else setActionMsg(`关联失败: ${d.error}`);
    } catch (e: any) { setActionMsg(e.message); }
    finally { setRelating(false); }
    setTimeout(() => setActionMsg(""), 3000);
  }

  async function handleDeleteLink(linkId: number) {
    await fetch(`/api/assets/${id}/links/${linkId}`, { method: "DELETE" });
    setLinks(prev => prev.filter(l => l.id !== linkId));
  }

  if (error) return <div className="p-8 text-error">{error}</div>;
  if (!asset) return <AssetDetailSkeleton />;

  const isAsset = asset.type === "Asset";

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <Link href="/assets" className="inline-flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg transition-colors">
        <ArrowLeft size={13} /> 返回资产库
      </Link>

      {/* Header */}
      <div className="flex gap-4">
        <div className="w-1 rounded-full bg-accent shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-2.5">
            <span className={`tag ${isAsset ? "tag-accent" : ""}`}>{isAsset ? "资产卡" : "轻量卡"}</span>
            {asset.evidence_level && <span className="tag inline-flex items-center gap-1"><TrendingUp size={10} /> {asset.evidence_level}</span>}
            {asset.is_contrarian === 1 && <span className="tag tag-accent inline-flex items-center gap-1"><Flame size={10} /> 反常识</span>}
          </div>

          {editing ? (
            <div className="space-y-3">
              <input className="input font-medium" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
              <textarea className="input min-h-[80px]" value={editInsight} onChange={e => setEditInsight(e.target.value)} />
              <input className="input font-mono text-xs" value={editTags} onChange={e => setEditTags(e.target.value)} placeholder="标签用逗号分隔" />
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold font-serif-cn leading-snug">{asset.title}</h1>
              {asset.insight && <p className="text-sm text-fg-secondary leading-relaxed mt-2">{asset.insight}</p>}
              {asset.reasoning && <p className="text-xs text-fg-muted italic mt-3 leading-relaxed border-l-2 border-border pl-3">{asset.reasoning}</p>}
            </>
          )}

          {/* 原文摘要 */}
          {asset.summary && (
            <div className="mt-4 p-3 rounded-lg bg-bg/40 border border-border">
              <div className="text-[10px] text-fg-muted uppercase tracking-wider mb-1 flex items-center gap-1"><FileText size={10} /> 原文摘要</div>
              <p className="text-xs text-fg-secondary leading-relaxed">{asset.summary}</p>
            </div>
          )}

          {/* 关键句（原文回溯） */}
          {asset.key_passages?.length > 0 && (
            <ul className="mt-3 space-y-2">
              {asset.key_passages.map((kp: string, i: number) => (
                <li key={i} className="text-xs text-fg-secondary leading-relaxed flex gap-2 border-l-2 border-accent/30 pl-3">
                  <Quote size={11} className="shrink-0 mt-1 text-accent/50" />
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
          )}

          {/* 原文全文（OKF 风格阅读面板） */}
          {asset.raw_content && (
            <details className="mt-4 group" open={false}>
              <summary className="text-xs text-fg-muted cursor-pointer hover:text-accent transition-colors flex items-center gap-1.5 select-none">
                <FileText size={11} />
                查看原文全文
                <span className="text-[10px] opacity-60 ml-auto">{asset.raw_content.length.toLocaleString()} 字</span>
              </summary>
              <div className="reader-panel mt-2 whitespace-pre-wrap">
                {asset.raw_content}
              </div>
            </details>
          )}

          {!editing && asset.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {asset.tags.map((t: string) => <span key={t} className="tag inline-flex items-center gap-1"><Tag size={9} />{t}</span>)}
            </div>
          )}

          {/* OKF 字段：实体与知识类型 */}
          {!editing && (asset.entities?.length > 0 || asset.okf_type) && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/50">
              {asset.okf_type && (
                <span className="tag tag-accent text-[10px] inline-flex items-center gap-1">
                  <Zap size={9} />
                  {asset.okf_type === "Insight" ? "洞察" : asset.okf_type === "Evidence" ? "证据" : asset.okf_type === "Observation" ? "观察" : asset.okf_type === "Question" ? "问题" : asset.okf_type}
                </span>
              )}
              {asset.entities?.map((e: string) => (
                <span key={e} className="tag text-[10px] bg-accent/5">{e}</span>
              ))}
            </div>
          )}

          {/* Claims（OKF 风格断言列表） */}
          {!editing && asset.claims?.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-bg/40 border border-border">
              <div className="text-[10px] text-fg-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                <Quote size={10} /> 断言与证据
              </div>
              <ul className="space-y-2">
                {asset.claims.map((c: any, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full ${
                      c.confidence === "high" ? "bg-success" : c.confidence === "medium" ? "bg-warning" : "bg-fg-disabled"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-fg leading-relaxed">{c.claim}</p>
                      {c.evidence && <p className="text-[11px] text-fg-muted mt-0.5 italic">{c.evidence}</p>}
                    </div>
                    <span className={`tag text-[9px] shrink-0 ${
                      c.confidence === "high" ? "bg-success/10 text-success" : c.confidence === "medium" ? "bg-warning/10 text-warning" : "bg-fg-disabled/10 text-fg-disabled"
                    }`}>{c.confidence === "high" ? "高" : c.confidence === "medium" ? "中" : "低"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Edit / Save actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {editing ? (
          <>
            <button onClick={handleSave} className="btn-primary"><Save size={14} /> 保存</button>
            <button onClick={() => { setEditing(false); resetEdit(asset); }} className="btn-secondary"><X size={14} /> 取消</button>
          </>
        ) : (
          <>
            <button onClick={() => { setEditing(true); resetEdit(asset); }} className="btn-secondary"><Edit2 size={14} /> 校准</button>
            {asset.type === "Light" && (
              <button onClick={handleUpgrade} className="btn-primary"><Zap size={14} /> AI 升级</button>
            )}
            <button onClick={handleRelate} disabled={relating} className="btn-secondary">
              {relating ? <RefreshCw size={14} className="animate-spin" /> : <Share2 size={14} />}
              {relating ? "发现中…" : "发现关联"}
            </button>
            <Link href={`/output?asset=${asset.id}`} className="btn-secondary"><MessageSquare size={14} /> 创作</Link>
          </>
        )}
        {actionMsg && <span className="text-xs text-accent ml-2">{actionMsg}</span>}
      </div>

      {/* 相关洞察（wiki 积累网络） */}
      {links.length > 0 && (
        <section>
          <h2 className="section-title mb-4 flex items-center gap-2"><Share2 size={15} className="text-fg-muted" /> 相关洞察 · {links.length}</h2>
          <div className="space-y-2">
            {links.map(l => {
              const rel = RELATION_LABEL[l.relation] ?? RELATION_LABEL.relates_to;
              return (
                <div key={l.id} className="card flex items-start gap-3 py-3 group">
                  <span className={`tag shrink-0 ${rel.cls}`}>{rel.text}</span>
                  <div className="flex-1 min-w-0">
                    <Link href={`/assets/${l.target_id}`} className="text-sm font-medium hover:text-accent transition-colors block truncate">
                      {l.target_title}
                    </Link>
                    {l.target_insight && <p className="text-xs text-fg-secondary mt-1 line-clamp-2">{l.target_insight}</p>}
                    {l.note && <p className="text-[11px] text-fg-muted mt-1 italic">{l.note}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteLink(l.id)}
                    className="text-fg-muted hover:text-error opacity-0 group-hover:opacity-100 transition-all shrink-0"
                    title="移除关联"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Dimensions */}
      {asset.dimensions?.length > 0 && (
        <section>
          <h2 className="section-title mb-4 flex items-center gap-2"><span className="w-1 h-4 bg-accent rounded-full" />维度洞察</h2>
          <div className="space-y-2.5">
            {asset.dimensions.map((d: string, i: number) => (
              <div key={i} className="card flex gap-3 items-start">
                <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-mono flex items-center justify-center mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-fg-secondary leading-relaxed pt-0.5">{d}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Timeline */}
      {asset.timeline?.length > 0 && (
        <section>
          <h2 className="section-title mb-4 flex items-center gap-2"><Clock size={15} className="text-fg-muted" /> 进化时间线</h2>
          <div className="relative pl-7">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
            <div className="space-y-5">
              {asset.timeline.map((t: any, i: number) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-7 top-0.5 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center ${i === 0 ? "bg-accent border-accent" : "bg-bg-alt border-border-visible"}`}>
                    {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="text-sm text-fg font-medium">{t.action}</div>
                    {t.note && <span className="tag tag-accent text-[10px] mt-1">{t.note}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feedback */}
      <section>
        <h2 className="section-title mb-3">反馈 · {feedback.length}</h2>
        {feedback.length > 0 && (
          <div className="space-y-1.5 mb-3">
            {feedback.map((fb: any) => (
              <div key={fb.id} className="card flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm text-fg-secondary">{fb.content}</span>
                <span className="tag text-[10px]">{fb.type || "笔记"}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input value={fbInput} onChange={e => setFbInput(e.target.value)}
            placeholder="添加反馈或备注…" className="input flex-1"
            onKeyDown={e => e.key === "Enter" && handleAddFeedback()} />
          <button onClick={handleAddFeedback} className="btn-secondary"><Send size={13} /></button>
        </div>
      </section>
    </div>
  );
}
