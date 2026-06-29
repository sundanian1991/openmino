"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, Library, FileText, TrendingUp, Sparkles, ArrowRight, Search } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

interface Stats {
  total: number;
  inUse: number;
  realCases: number;
  pending: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentAssets, setRecentAssets] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/dashboard/stats").then(r => r.json()),
      fetch("/api/assets?status=raw").then(r => r.json()),
    ]).then(([s, a]) => {
      if (s.ok) setStats(s.data);
      if (a.ok) setRecentAssets(a.data.slice(0, 5));
    }).catch(e => setError(e.message));
  }, []);

  return (
    <div className="p-8 max-w-5xl space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold font-serif-cn tracking-wide">仪表盘</h1>
        <p className="text-sm text-fg-secondary mt-1">把零散经验变成可调用的判断力</p>
      </div>

      {error && <div className="text-sm text-error">{error}</div>}

      {/* 待办看板 — Primary metrics */}
      <section className="grid grid-cols-3 gap-4">
        <Link href="/intake" className="card card-hover group">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <Inbox size={16} className="text-accent" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold font-mono tabular-nums">{stats?.pending ?? "—"}</span>
            <span className="text-xs text-fg-secondary">待校准</span>
          </div>
          <div className="text-xs text-fg-muted mt-1.5">轻量卡待处理</div>
        </Link>
        <Link href="/assets" className="card card-hover group">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <Library size={16} className="text-accent" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold font-mono tabular-nums">{stats?.inUse ?? "—"}</span>
            <span className="text-xs text-fg-secondary">可用资产</span>
          </div>
          <div className="text-xs text-fg-muted mt-1.5">已升级为资产卡</div>
        </Link>
        <Link href="/output" className="card card-hover group">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <FileText size={16} className="text-accent" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-semibold font-mono tabular-nums">{stats?.total ?? "—"}</span>
            <span className="text-xs text-fg-secondary">总资产</span>
          </div>
          <div className="text-xs text-fg-muted mt-1.5">所有入库条目</div>
        </Link>
      </section>

      {/* 资产数据统计 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">资产数据</h2>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="资产卡总数" value={stats?.total ?? 0} icon={<Sparkles size={14} />} />
          <StatCard label="在用资产" value={stats?.inUse ?? 0} icon={<TrendingUp size={14} />} />
          <StatCard label="真实案例" value={stats?.realCases ?? 0} icon={null} />
          <StatCard label="待校准" value={stats?.pending ?? 0} icon={null} />
        </div>
      </section>

      {/* 最近待处理 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">最近待处理</h2>
          <Link href="/intake" className="text-xs text-fg-secondary hover:text-accent flex items-center gap-1 transition-colors">
            查看全部 <ArrowRight size={12} />
          </Link>
        </div>
        {recentAssets.length === 0 ? (
          <EmptyState
            icon={Search}
            title="暂无待处理资产"
            description="先去「采集」页面扫描文件夹"
          />
        ) : (
          <div className="space-y-1.5">
            {recentAssets.map((a: any) => (
              <Link key={a.id} href={`/assets/${a.id}`} className="card card-hover flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{a.title}</div>
                  <div className="text-xs text-fg-secondary truncate mt-0.5">{a.insight}</div>
                </div>
                <span className="tag shrink-0">{a.type === "Light" ? "轻量卡" : "资产卡"}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode | null }) {
  return (
    <div className="card">
      <div className="flex items-center gap-1.5 text-xs text-fg-muted mb-1">
        {icon}
        {label}
      </div>
      <div className="text-xl font-semibold font-mono tabular-nums">{value}</div>
    </div>
  );
}
