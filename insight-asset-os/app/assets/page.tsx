"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, Inbox, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { AssetsListSkeleton } from "@/components/skeleton";

export default function AssetsPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [searchMode, setSearchMode] = useState<"keyword" | "semantic">("keyword");
  const [loading, setLoading] = useState(true);
  const [searchHint, setSearchHint] = useState("");

  // 防抖：用户停止输入 400ms 后才发起搜索
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(searchQ), 400);
    return () => clearTimeout(timer);
  }, [searchQ]);

  useEffect(() => {
    setLoading(true);
    setSearchHint("");

    // 语义搜索走专门的 /api/search
    if (searchMode === "semantic" && debouncedQ) {
      fetch(`/api/search?q=${encodeURIComponent(debouncedQ)}&mode=semantic`).then(r => r.json()).then(d => {
        if (d.ok) {
          setAssets(d.data ?? []);
          if (d.hint) setSearchHint(d.hint);
        }
      }).finally(() => setLoading(false));
      return;
    }

    // 关键词搜索用原有 API（带回退）
    if (searchMode === "keyword" && debouncedQ) {
      fetch(`/api/search?q=${encodeURIComponent(debouncedQ)}&mode=keyword`).then(r => r.json()).then(d => {
        if (d.ok) setAssets(d.data ?? []);
      }).finally(() => setLoading(false));
      return;
    }

    // 无搜索词：列表模式
    const params = new URLSearchParams();
    if (filter !== "all") params.set("type", filter);
    const qs = params.toString();
    fetch(`/api/assets${qs ? "?" + qs : ""}`).then(r => r.json()).then(d => {
      if (d.ok) setAssets(d.data);
    }).finally(() => setLoading(false));
  }, [filter, debouncedQ, searchMode]);

  return (
    <div className="p-8 max-w-5xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold font-serif-cn tracking-wide">资产库</h1>
        <p className="text-sm text-fg-secondary mt-1">浏览、校准、升级你的思想资产</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input
            className="input pl-8"
            placeholder={searchMode === "semantic" ? "语义搜索…" : "搜索资产…"}
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
          />
        </div>
        <div className="flex gap-1 bg-bg-alt rounded-lg p-0.5 border border-border">
          <button onClick={() => setSearchMode("keyword")}
            className={`px-3 py-1.5 text-xs rounded-md transition-all ${
              searchMode === "keyword" ? "bg-bg-raised text-fg shadow-sm" : "text-fg-secondary hover:text-fg"
            }`}>
            关键词
          </button>
          <button onClick={() => setSearchMode("semantic")}
            className={`px-2.5 py-1.5 text-xs rounded-md transition-all flex items-center gap-1 ${
              searchMode === "semantic" ? "bg-bg-raised text-fg shadow-sm" : "text-fg-secondary hover:text-fg"
            }`}>
            <Sparkles size={11} /> 语义
          </button>
        </div>
        <div className="flex gap-1 bg-bg-alt rounded-lg p-0.5 border border-border">{
          [
            { key: "all", label: "全部" },
            { key: "Light", label: "轻量卡" },
            { key: "Asset", label: "资产卡" },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                filter === f.key ? "bg-bg-raised text-fg shadow-sm" : "text-fg-secondary hover:text-fg"
              }`}>
              {f.label}
            </button>
          ))
        }</div>
      </div>

      {/* Content */}
      {searchHint && (
        <div className="text-xs text-fg-muted bg-bg-alt rounded-lg px-3 py-2">{searchHint}</div>
      )}
      {loading ? (
        <AssetsListSkeleton />
      ) : assets.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="暂无匹配的资产"
          description="先去「采集」页面扫描文件夹，生成轻量卡后即可在此查看"
          action={{ href: "/intake", label: "去采集" }}
        />
      ) : (
        <div className="grid gap-2">
          {assets.map((a: any) => (
            <Link key={a.id} href={`/assets/${a.id}`} className="card card-hover">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{a.title}</span>
                    {a.is_contrarian === 1 && (
                      <span className="tag tag-accent text-[10px]">反常识</span>
                    )}
                  </div>
                  {a.insight && <div className="text-xs text-fg-secondary mt-1 line-clamp-2">{a.insight}</div>}
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <span className={`tag ${a.type === "Asset" ? "tag-accent" : ""}`}>
                    {a.type === "Asset" ? "资产卡" : "轻量卡"}
                  </span>
                  {a.evidence_level && <span className="tag">{a.evidence_level}</span>}
                </div>
              </div>
              {a.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {a.tags.slice(0, 4).map((t: string) => <span key={t} className="tag text-[10px]">{t}</span>)}
                  {a.tags.length > 4 && <span className="tag text-[10px]">+{a.tags.length - 4}</span>}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
