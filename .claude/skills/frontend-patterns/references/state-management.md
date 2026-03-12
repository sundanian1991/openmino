---
input: frontend-patterns 状态管理方案选择需求
output: Context + Reducer 模式、状态管理方案对比
pos: .claude/skills/frontend-patterns/references/state-management.md

# State Management Patterns — frontend-patterns

> Context + Reducer、状态管理最佳实践


## Context + Reducer Pattern

```typescript
interface State {
  markets: Market[]
  selectedMarket: Market | null
  loading: boolean
}

type Action =
  | { type: 'SET_MARKETS'; payload: Market[] }
  | { type: 'SELECT_MARKET'; payload: Market }
  | { type: 'SET_LOADING'; payload: boolean }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MARKETS':
      return { ...state, markets: action.payload }
    case 'SELECT_MARKET':
      return { ...state, selectedMarket: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const MarketContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
} | undefined>(undefined)

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    markets: [],
    selectedMarket: null,
    loading: false
  })

  return (
    <MarketContext.Provider value={{ state, dispatch }}>
      {children}
    </MarketContext.Provider>
  )
}

export function useMarkets() {
  const context = useContext(MarketContext)
  if (!context) throw new Error('useMarkets must be used within MarketProvider')
  return context
}
```


## 状态管理方案对比

| 方案 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| **useState** | 组件内部简单状态 | 简单、内置 | 无法跨组件共享 |
| **useReducer** | 复杂状态逻辑 | 可预测、易测试 | 样板代码多 |
| **Context + Reducer** | 中型应用全局状态 | 无需依赖、类型安全 | 性能优化需手动处理 |
| **Zustand** | 中大型应用 | 简洁、性能好 | 额外依赖 |
| **Jotai/Recoil** | 原子化状态 | 细粒度更新 | 学习曲线 |
| **Redux Toolkit** | 大型企业应用 | 生态完善、DevTools | 样板代码多 |


## 何时使用 Context + Reducer

**适用场景**：
- 需要全局共享的状态（用户信息、主题、语言）
- 状态变更逻辑复杂，需要可预测的更新
- 不想引入外部状态管理库

**不适用场景**：
- 高频更新的状态（考虑性能）
- 完全独立的组件状态
- 简单的布尔值切换（用 useState 或 useToggle）


## 最佳实践

### 1. 拆分 Context

```typescript
// ✅ GOOD: Separate contexts for different concerns
const MarketDataContext = createContext<Market[] | undefined>(undefined)
const MarketActionsContext = createContext<MarketActions | undefined>(undefined)

// Better performance, components only subscribe to what they need
```

### 2. 使用 Memo 优化

```typescript
// ✅ GOOD: Memoize context value
const value = useMemo(() => ({ state, dispatch }), [state, dispatch])
return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
```

### 3. 自定义 Hook 封装

```typescript
// ✅ GOOD: Encapsulate logic in custom hooks
export function useSelectedMarket() {
  const { state, dispatch } = useMarkets()

  const selectMarket = useCallback((market: Market) => {
    dispatch({ type: 'SELECT_MARKET', payload: market })
  }, [dispatch])

  return { selectedMarket: state.selectedMarket, selectMarket }
}
```


## 何时读取

**主 SKILL.md 使用**：
- 需要实现全局状态管理时
- 需要 Context + Reducer 模式时
- 需要对比状态管理方案时

**相关参考**：
- `references/react-patterns.md` — React 组件模式
- `references/performance.md` — 性能优化


*最后更新：2026-03-12 — 从 SKILL.md 拆分*

