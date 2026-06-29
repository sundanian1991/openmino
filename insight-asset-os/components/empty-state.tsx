import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** CTA 按钮，形如 { href, label } */
  action?: { href: string; label: string };
}

/**
 * 统一的空状态组件。带图标、标题、副标题，可选引导按钮。
 * 替换各页散落的 "暂无数据" 文案，保持视觉一致性。
 */
export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
        <Icon size={20} className="text-accent" />
      </div>
      <h3 className="text-sm font-medium text-fg mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-fg-muted max-w-xs leading-relaxed">{description}</p>
      )}
      {action && (
        <Link
          href={action.href}
          className="btn-primary mt-5 text-xs"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
