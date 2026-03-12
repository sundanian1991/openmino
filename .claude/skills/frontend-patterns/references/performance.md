---
input: frontend-patterns 性能优化需求
output: Memoization、Code Splitting、Virtualization 使用指南
pos: .claude/skills/frontend-patterns/references/performance.md

# Performance Optimization — frontend-patterns

> 性能优化：Memoization、Code Splitting、Virtualization


## Memoization

```typescript
// ✅ useMemo for expensive computations
const sortedMarkets = useMemo(() => {
  return markets.sort((a, b) => b.volume - a.volume)
}, [markets])

// ✅ useCallback for functions passed to children
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query)
}, [])

// ✅ React.memo for pure components
export const MarketCard = React.memo<MarketCardProps>(({ market }) => {
  return (
    <div className="market-card">
      <h3>{market.name}</h3>
      <p>{market.description}</p>
    </div>
  )
})
```

### 何时使用 Memoization

| 场景 | 推荐 | 说明 |
|------|------|------|
| **计算密集型** | ✅ useMemo | 排序、过滤、聚合大量数据 |
| **回调传递给子组件** | ✅ useCallback | 避免子组件不必要的重渲染 |
| **纯展示组件** | ✅ React.memo | 输入不变时跳过重渲染 |
| **简单组件** | ❌ 不需要 | 过度优化反而增加负担 |
| **频繁变化的引用** | ❌ 谨慎使用 | Memo 成本可能超过收益 |


## Code Splitting & Lazy Loading

```typescript
import { lazy, Suspense } from 'react'

// ✅ Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'))
const ThreeJsBackground = lazy(() => import('./ThreeJsBackground'))

export function Dashboard() {
  return (
    <div>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart data={data} />
      </Suspense>

      <Suspense fallback={null}>
        <ThreeJsBackground />
      </Suspense>
    </div>
  )
}
```

### Route-based Code Splitting

```typescript
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const HomePage = lazy(() => import('./pages/HomePage'))
const MarketsPage = lazy(() => import('./pages/MarketsPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```


## Virtualization for Long Lists

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

export function VirtualMarketList({ markets }: { markets: Market[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: markets.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,  // Estimated row height
    overscan: 5  // Extra items to render
  })

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            <MarketCard market={markets[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 虚拟化适用场景

| 数据量 | 推荐方案 |
|--------|---------|
| < 50 项 | 直接渲染 |
| 50-200 项 | 考虑分页或虚拟 |
| 200-1000 项 | 推荐虚拟化 |
| > 1000 项 | 必须虚拟化 |


## 性能检查清单

在提交前端代码前检查：

- [ ] **列表项 > 100**：是否使用虚拟化？
- [ ] **重组件**：是否 lazy loading？
- [ ] **复杂计算**：是否 useMemo？
- [ ] **回调传递**：是否 useCallback？
- [ ] **图片加载**：是否 lazy loading + 占位图？
- [ ] **API 请求**：是否缓存/去重/防抖？
- [ ] **Bundle 大小**：是否分析过（bundle analyzer）？


## 何时读取

**主 SKILL.md 使用**：
- 需要优化渲染性能时
- 处理长列表数据时
- 实现懒加载时

**相关参考**：
- `references/react-patterns.md` — React 组件模式
- `references/state-management.md` — 状态管理


*最后更新：2026-03-12 — 从 SKILL.md 拆分*

