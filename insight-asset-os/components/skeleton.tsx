/**
 * 骨架屏组件。替换 "加载中…" 文字，提供内容已就位的视觉预期。
 * 走 CSS 变量色，自动适配亮/暗主题。
 */

/** 单个骨架条（脉冲动画） */
export function SkeletonBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-bg-hover ${className}`}
      style={{ minHeight: "1rem" }}
    />
  );
}

/** 资产列表骨架（N 行卡片占位） */
export function AssetsListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="grid gap-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <SkeletonBar className="w-2/3 h-4" />
            <SkeletonBar className="w-full h-3" />
            <SkeletonBar className="w-4/5 h-3" />
          </div>
          <SkeletonBar className="w-14 h-5 rounded-full" />
        </div>
      ))}
    </div>
  );
}

/** 资产详情骨架 */
export function AssetDetailSkeleton() {
  return (
    <div className="p-8 max-w-3xl space-y-8">
      <SkeletonBar className="w-24 h-3" />
      <div className="space-y-3">
        <SkeletonBar className="w-3/4 h-6" />
        <SkeletonBar className="w-full h-4" />
        <SkeletonBar className="w-5/6 h-4" />
      </div>
      <div className="flex gap-1.5">
        <SkeletonBar className="w-16 h-6 rounded-full" />
        <SkeletonBar className="w-16 h-6 rounded-full" />
      </div>
      <div className="space-y-2">
        <SkeletonBar className="w-28 h-5" />
        <SkeletonBar className="w-full h-16" />
        <SkeletonBar className="w-full h-16" />
      </div>
    </div>
  );
}
