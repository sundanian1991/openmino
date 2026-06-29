"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  Library,
  FolderTree,
  BrainCircuit,
  FileText,
  Settings,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/", label: "仪表盘", icon: LayoutDashboard },
  { href: "/intake", label: "采集", icon: Inbox },
  { href: "/assets", label: "资产库", icon: Library },
  { href: "/topics", label: "主题", icon: FolderTree },
  { href: "/kernel", label: "内核", icon: BrainCircuit },
  { href: "/output", label: "写作", icon: FileText },
  { href: "/settings", label: "设置", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 shrink-0 border-r border-border flex flex-col bg-bg-alt">
      <div className="px-5 py-5 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-sm bg-accent" />
        </div>
        <span className="text-sm font-semibold tracking-wide text-fg font-serif-cn">思想资产</span>
      </div>
      <nav className="flex-1 px-2.5 space-y-0.5">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                active
                  ? "bg-accent/10 text-accent-text font-medium"
                  : "text-fg-secondary hover:text-fg hover:bg-bg-hover"
              )}
            >
              <Icon size={16} className={active ? "text-accent" : ""} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-3 flex items-center justify-between border-t border-border">
        <span className="text-[10px] text-fg-disabled uppercase tracking-wider px-2">
          v0.1 · 本地优先
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
