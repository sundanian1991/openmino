"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Scan, Loader2, CheckCircle, XCircle, FolderOpen, Inbox, ChevronLeft, Folder, X, Home, UploadCloud, Zap, Tag, Share2, Circle } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

interface PipelineSteps {
  extract: "ok" | "fail";
  upgrade: "ok" | "fail" | "skipped";
  classify: "ok" | "fail" | "skipped";
  relate: "ok" | "fail" | "skipped";
}

interface ScanResult { path: string; name: string; ok: boolean; error?: string; assetId?: number; title?: string; pipeline?: PipelineSteps; pipelineErrors?: string[]; }
interface DirEntry { name: string; path: string; }
interface BrowseData { current: string; parent: string | null; dirs: DirEntry[]; quick?: DirEntry[] & { name: string; path: string }[]; }

export default function IntakePage() {
  const [vaultPath, setVaultPath] = useState("");
  const [pathInput, setPathInput] = useState("");
  const [scanning, setScanning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [pendingCards, setPendingCards] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [savedHint, setSavedHint] = useState(false);
  // 文件夹浏览器弹窗
  const [browserOpen, setBrowserOpen] = useState(false);
  const [browseData, setBrowseData] = useState<BrowseData | null>(null);
  const [browseLoading, setBrowseLoading] = useState(false);
  // webkitdirectory 上传用
  const dirInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => {
      if (d.vaultPath) { setVaultPath(d.vaultPath); setPathInput(d.vaultPath); }
    }).catch(() => {});
    loadPending();
  }, []);

  function loadPending() {
    fetch("/api/assets?status=raw&type=Light").then(r => r.json()).then(d => {
      if (d.ok) setPendingCards(d.data);
    }).catch(() => {});
  }

  // 手动输入路径后保存
  async function savePath(p: string) {
    setError("");
    const res = await fetch("/api/settings", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vaultPath: p }),
    });
    if (res.ok) {
      setVaultPath(p);
      setPathInput(p);
      setSavedHint(true);
      setTimeout(() => setSavedHint(false), 1500);
    } else {
      const d = await res.json();
      setError(d.error || "保存失败");
    }
  }

  async function browse(dir?: string) {
    setBrowseLoading(true);
    try {
      const url = dir ? `/api/browse?dir=${encodeURIComponent(dir)}` : "/api/browse";
      const res = await fetch(url);
      const d = await res.json();
      if (d.ok) setBrowseData(d);
      else setError(d.error);
    } catch (e: any) { setError(e.message); }
    finally { setBrowseLoading(false); }
  }

  function openBrowser() {
    setBrowserOpen(true);
    browse();
  }

  function selectDir(p: string) {
    setBrowserOpen(false);
    savePath(p);
  }

  async function handleScan() {
    if (!vaultPath) { setError("请先选择 Vault 文件夹"); return; }
    setScanning(true); setError(""); setResults([]);
    try {
      const res = await fetch("/api/intake/scan", { method: "POST" });
      const data = await res.json();
      if (data.ok) { setResults(data.results ?? []); loadPending(); }
      else setError(data.error ?? "扫描失败");
    } catch (e: any) { setError(e.message); }
    finally { setScanning(false); }
  }

  // webkitdirectory：直接选文件夹上传内容，无需配置 vault 路径
  async function handleUploadDir(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    // 仅保留受支持类型
    const supported = files.filter(f => /\.(md|markdown|txt|pdf|docx|html|htm)$/i.test(f.name));
    if (supported.length === 0) {
      setError("所选文件夹没有支持的文件（md/txt/pdf/docx/html）");
      e.target.value = "";
      return;
    }
    setUploading(true); setError(""); setResults([]); setUploadProgress({ done: 0, total: supported.length });
    try {
      const form = new FormData();
      for (const f of supported) {
        // webkitRelativePath 编码进 filename，后端用它作为 source_path
        const rel = (f as File & { webkitRelativePath?: string }).webkitRelativePath || f.name;
        form.append("files", f, rel);
      }
      const res = await fetch("/api/intake/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.ok) { setResults(data.results ?? []); loadPending(); }
      else setError(data.error ?? "上传采集失败");
    } catch (err: any) { setError(err.message); }
    finally {
      setUploading(false);
      setUploadProgress(null);
      e.target.value = "";
    }
  }

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold font-serif-cn tracking-wide">采集</h1>
        <p className="text-sm text-fg-secondary mt-1">扫描本地文件夹，LLM 自动提取知识卡</p>
      </div>

      {/* 方式一：直接上传文件夹（webkitdirectory，免配置路径） */}
      <div className="card space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <UploadCloud size={18} className="text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">直接选择文件夹</div>
            <div className="text-xs text-fg-secondary mt-0.5">弹原生选择器，选整个文件夹即采。无需配置路径，适合临时采集。</div>
          </div>
          <input
            ref={dirInputRef}
            type="file"
            // @ts-expect-error webkitdirectory 是非标准属性，TS 不识别但浏览器支持
            webkitdirectory=""
            directory=""
            multiple
            className="hidden"
            onChange={handleUploadDir}
          />
          <button
            onClick={() => dirInputRef.current?.click()}
            disabled={uploading}
            className="btn-primary shrink-0"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
            {uploading ? (uploadProgress ? `采集中… ${uploadProgress.done}/${uploadProgress.total}` : "采集中…") : "选择文件夹"}
          </button>
        </div>
      </div>

      {/* 方式二：Vault 路径扫描（持久监控、增量） */}
      <div className="card space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <FolderOpen size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-fg-muted uppercase tracking-wider mb-1">Vault 文件夹（持久扫描）</div>
            <div className="flex gap-2">
              <input
                className="input flex-1 font-mono text-xs"
                placeholder="粘贴或输入文件夹路径，如 /Users/you/Documents/notes"
                value={pathInput}
                onChange={e => setPathInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && pathInput.trim() && savePath(pathInput.trim())}
              />
              <button onClick={openBrowser} className="btn-secondary shrink-0">
                <Folder size={14} /> 浏览
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs">
            {vaultPath ? (
              <span className="text-fg-secondary">已选：<span className="font-mono text-fg">{vaultPath}</span></span>
            ) : (
              <span className="text-fg-muted">未选择文件夹</span>
            )}
            {savedHint && <span className="text-success ml-2">✓ 已保存</span>}
          </div>
          <button onClick={handleScan} disabled={scanning || !vaultPath} className="btn-primary shrink-0">
            {scanning ? <Loader2 size={14} className="animate-spin" /> : <Scan size={14} />}
            {scanning ? "扫描中…" : "开始扫描"}
          </button>
        </div>
        {error && <div className="text-xs text-error bg-error/10 rounded-md px-3 py-2">{error}</div>}
      </div>

      {/* 采集结果 */}
      {results.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">采集结果</h2>
            <span className="tag">{results.filter(r => r.ok).length}/{results.length} 成功</span>
          </div>
          <div className="space-y-1 max-h-[70vh] overflow-auto pr-1">
            {results.map((r, i) => (
              <div key={i} className={`card flex flex-col gap-2 py-3 ${r.ok ? "" : "opacity-60"}`}>
                <div className="flex items-center gap-3">
                  {r.ok ? <CheckCircle size={15} className="text-success shrink-0" /> : <XCircle size={15} className="text-error shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{r.title || r.name}</div>
                    {r.path && <div className="text-xs text-fg-muted truncate font-mono">{r.path.replace(vaultPath, "~")}</div>}
                  </div>
                  {r.ok && r.assetId && (
                    <Link href={`/assets/${r.assetId}`} className="text-xs text-focus hover:text-accent transition-colors shrink-0">查看</Link>
                  )}
                  {!r.ok && <span className="text-xs text-error shrink-0">{r.error}</span>}
                </div>
                {/* 管线步骤状态 */}
                {r.ok && r.pipeline && (
                  <div className="flex items-center gap-1.5 ml-8">
                    <PipeStep icon={Zap} label="升级" status={r.pipeline.upgrade} />
                    <span className="text-fg-disabled text-[10px]">→</span>
                    <PipeStep icon={Tag} label="分类" status={r.pipeline.classify} />
                    <span className="text-fg-disabled text-[10px]">→</span>
                    <PipeStep icon={Share2} label="关联" status={r.pipeline.relate} />
                  </div>
                )}
                {r.pipelineErrors && r.pipelineErrors.length > 0 && (
                  <div className="text-[10px] text-error ml-8">{r.pipelineErrors.join("；")}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 待校准列表 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">待校准</h2>
          <span className="tag">{pendingCards.length} 条</span>
        </div>
        {pendingCards.length === 0 ? (
          <EmptyState icon={Inbox} title="暂无待校准内容"
            description="选择文件夹采集后，生成的知识卡会显示在此等待校准" />
        ) : (
          <div className="space-y-2">
            {pendingCards.map((card: any) => (
              <div key={card.id} className="card">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{card.title}</div>
                    <div className="text-xs text-fg-secondary mt-1 line-clamp-2">{card.insight}</div>
                    {card.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {card.tags.map((t: string) => <span key={t} className="tag">{t}</span>)}
                      </div>
                    )}
                  </div>
                  <Link href={`/assets/${card.id}`} className="btn-secondary text-xs shrink-0 py-1.5 px-3">校准</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 文件夹浏览器弹窗 */}
      {browserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setBrowserOpen(false)}>
          <div className="card max-w-lg w-full mx-4 max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-sm font-medium flex items-center gap-2"><Folder size={15} className="text-accent" /> 选择文件夹</h3>
              <button onClick={() => setBrowserOpen(false)} className="text-fg-muted hover:text-fg"><X size={16} /></button>
            </div>
            {/* 路径栏 */}
            <div className="flex items-center gap-1.5 py-2.5 text-xs text-fg-muted font-mono border-b border-border overflow-x-auto whitespace-nowrap">
              {browseData?.parent && (
                <button onClick={() => browse(browseData.parent!)} className="hover:text-fg shrink-0">
                  <ChevronLeft size={14} className="inline" /> 上级
                </button>
              )}
              <button onClick={() => browse()} className="hover:text-fg shrink-0"><Home size={13} className="inline" /> 主目录</button>
              <span className="truncate">{browseData?.current}</span>
            </div>
            {/* 快捷入口 */}
            {browseData?.quick && browseData.quick.length > 0 && (
              <div className="flex flex-wrap gap-1.5 py-2 border-b border-border">
                {browseData.quick.map(q => (
                  <button key={q.path} onClick={() => browse(q.path)} className="tag hover:tag-accent transition-colors">
                    {q.name}
                  </button>
                ))}
              </div>
            )}
            {/* 目录列表 */}
            <div className="flex-1 overflow-auto py-1">
              {browseLoading ? (
                <div className="text-center py-8 text-xs text-fg-muted">加载中…</div>
              ) : browseData?.dirs.length === 0 ? (
                <div className="text-center py-8 text-xs text-fg-muted">此目录无子文件夹</div>
              ) : (
                browseData?.dirs.map(d => (
                  <button key={d.path} onClick={() => browse(d.path)}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-bg-hover transition-colors text-left group">
                    <Folder size={14} className="text-fg-muted group-hover:text-accent shrink-0" />
                    <span className="text-sm flex-1 truncate">{d.name}</span>
                    <span className="text-[10px] text-fg-muted opacity-0 group-hover:opacity-100">进入</span>
                  </button>
                ))
              )}
            </div>
            {/* 选定当前目录 */}
            <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
              <span className="text-xs text-fg-muted font-mono truncate flex-1">{browseData?.current}</span>
              <button onClick={() => selectDir(browseData?.current || "")} className="btn-primary text-xs shrink-0">
                选定此文件夹
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PipeStep({ icon: Icon, label, status }: { icon: React.ElementType; label: string; status: string }) {
  const colors: Record<string, string> = {
    ok: "text-success",
    fail: "text-error",
    skipped: "text-fg-disabled",
  };
  const bgColors: Record<string, string> = {
    ok: "bg-success/10",
    fail: "bg-error/10",
    skipped: "bg-bg-hover",
  };
  const labels: Record<string, string> = {
    ok: "✓",
    fail: "✗",
    skipped: "—",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${bgColors[status] ?? "bg-bg-hover"} ${colors[status] ?? "text-fg-disabled"}`}>
      <Icon size={10} />
      {label}{labels[status] ?? ""}
    </span>
  );
}
