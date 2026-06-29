"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, ChevronRight, ChevronDown, Folder, FolderTree } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

interface Topic {
  id: number;
  name: string;
  description: string | null;
  parent_id: number | null;
  asset_count?: number;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [newName, setNewName] = useState("");
  const [newParentId, setNewParentId] = useState<number | undefined>(undefined);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  useEffect(() => { loadTopics(); }, []);

  function loadTopics() {
    fetch("/api/topics").then(r => r.json()).then(d => {
      if (d.ok) setTopics(d.data);
    });
  }

  async function handleCreate() {
    if (!newName.trim()) return;
    await fetch("/api/topics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newName.trim(), parent_id: newParentId }) });
    setNewName("");
    setNewParentId(undefined);
    loadTopics();
  }

  async function handleUpdate(id: number) {
    if (!editName.trim()) return;
    await fetch(`/api/topics/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: editName.trim() }) });
    setEditingId(null);
    loadTopics();
  }

  async function handleDelete(id: number) {
    // 先查影响
    const impactRes = await fetch(`/api/topics/${id}`);
    const impact = await impactRes.json();
    const { children, assets } = impact.ok ? impact.data : { children: 0, assets: 0 };
    const parts: string[] = [];
    if (children > 0) parts.push(`${children} 个子主题`);
    if (assets > 0) parts.push(`${assets} 个关联资产`);
    const desc = parts.length ? `（将解除 ${parts.join("、")} 的关联）` : "";
    if (!confirm(`确定删除此主题？${desc}`)) return;
    await fetch(`/api/topics/${id}`, { method: "DELETE" });
    loadTopics();
  }

  const rootTopics = topics.filter(t => !t.parent_id);
  const childrenOf = (parentId: number) => topics.filter(t => t.parent_id === parentId);

  function toggleExpand(id: number) {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpanded(next);
  }

  function renderTopic(t: Topic, depth: number = 0) {
    const children = childrenOf(t.id);
    const isExpanded = expanded.has(t.id);
    return (
      <div key={t.id}>
        <div className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-bg-hover transition-colors group" style={{ paddingLeft: `${12 + depth * 24}px` }}>
          <div className="w-4 flex items-center justify-center text-fg-muted">
            {children.length > 0 ? (
              <button onClick={() => toggleExpand(t.id)} className="hover:text-fg transition-colors">
                {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              </button>
            ) : (
              <Folder size={13} />
            )}
          </div>
          {editingId === t.id ? (
            <input value={editName} onChange={e => setEditName(e.target.value)}
              onBlur={() => handleUpdate(t.id)} onKeyDown={e => e.key === "Enter" && handleUpdate(t.id)}
              className="flex-1 bg-transparent border-b border-accent outline-none text-sm py-0.5" autoFocus />
          ) : (
            <>
              <span className="text-sm flex-1 truncate">{t.name}</span>
              {t.asset_count !== undefined && t.asset_count > 0 && (
                <span className="tag text-[10px]">{t.asset_count}</span>
              )}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingId(t.id); setEditName(t.name); }} className="w-6 h-6 flex items-center justify-center rounded hover:bg-bg-raised text-fg-muted hover:text-fg transition-colors">
                  <Edit2 size={11} />
                </button>
                <button onClick={() => handleDelete(t.id)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-bg-raised text-fg-muted hover:text-error transition-colors">
                  <Trash2 size={11} />
                </button>
              </div>
            </>
          )}
        </div>
        {isExpanded && children.map(child => renderTopic(child, depth + 1))}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold font-serif-cn tracking-wide">主题分类</h1>
        <p className="text-sm text-fg-secondary mt-1">按领域组织你的思想资产</p>
      </div>

      {/* Create */}
      <div className="card flex items-center gap-2.5">
        <input value={newName} onChange={e => setNewName(e.target.value)}
          placeholder="新主题名称" className="input flex-1"
          onKeyDown={e => e.key === "Enter" && handleCreate()} />
        <select value={newParentId ?? ""} onChange={e => setNewParentId(e.target.value ? Number(e.target.value) : undefined)} className="input w-[140px] text-sm shrink-0">
          <option value="">顶级主题</option>
          {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <button onClick={handleCreate} className="btn-primary shrink-0">
          <Plus size={14} /> 创建
        </button>
      </div>

      {/* Tree */}
      <div className="card p-2">
        {rootTopics.length === 0 ? (
          <EmptyState
            icon={FolderTree}
            title="还没有主题"
            description="创建第一个主题，或采集后在「资产详情」页用 AI 自动分类生成"
          />
        ) : (
          rootTopics.map(t => renderTopic(t))
        )}
      </div>
    </div>
  );
}
