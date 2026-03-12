---
name: frontend-patterns
description: |
  现代前端开发模式 — React、Next.js、状态管理、性能优化。

  当用户需要以下内容时使用此技能：
  - 构建 React/Next.js 应用
  - 实现组件模式（复合组件、Render Props）
  - 自定义 Hooks 开发
  - 状态管理方案选择
  - 性能优化（Memoization、虚拟化、Code Splitting）
  - 无障碍访问（键盘导航、焦点管理）

  即使没有明确说"用 frontend-patterns"，只要涉及 React 组件设计、前端性能优化就应触发此技能。
---

# Frontend Development Patterns

Modern frontend patterns for React, Next.js, and performant user interfaces.

## Component Patterns

**核心原则**: Composition Over Inheritance

- **Compound Components** — 通过 Context 实现组件间通信（Tabs、Accordion）
- **Render Props** — 函数作为 children 传递逻辑
- **Custom Hooks** — 逻辑复用的首选模式

> **详细参考**: `references/react-patterns.md` — 组件组合、复合组件、Render Props、自定义 Hooks 示例

## State Management

| 方案 | 适用场景 |
|------|---------|
| **useState** | 组件内部简单状态 |
| **useReducer** | 复杂状态逻辑 |
| **Context + Reducer** | 中型应用全局状态 |
| **Zustand** | 中大型应用 |
| **Jotai/Recoil** | 原子化状态 |
| **Redux Toolkit** | 大型企业应用 |

> **详细参考**: `references/state-management.md` — Context + Reducer 模式、状态管理方案对比、最佳实践

## Performance Optimization

**三大优化技术**：

1. **Memoization** — `useMemo`、`useCallback`、`React.memo`
2. **Code Splitting** — `lazy()` + `Suspense`、路由级拆分
3. **Virtualization** — 长列表性能优化（`@tanstack/react-virtual`）

**性能检查清单**：
- [ ] 列表项 > 100：是否使用虚拟化？
- [ ] 重组件：是否 lazy loading？
- [ ] 复杂计算：是否 useMemo？
- [ ] 回调传递：是否 useCallback？

> **详细参考**: `references/performance.md` — Memoization、Code Splitting、Virtualization 示例

## Form Handling

**受控表单 + 验证**：
- 状态管理：`useState` 管理表单数据
- 验证逻辑：自定义 validate 函数
- 错误处理：错误状态 + 用户反馈

## Error Boundaries

**类组件实现**：
```typescript
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean, error: Error | null }
> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }
    return this.props.children
  }
}
```

## Animation Patterns

**Framer Motion**：
- 列表动画：`AnimatePresence` + `motion`
- 模态框动画：叠加层 + 内容动画

## Accessibility

**键盘导航**：
- ArrowUp/ArrowDown 导航
- Enter 选择，Escape 关闭

**焦点管理**：
- 打开时聚焦模态框
- 关闭时恢复原焦点

## References

| File | Content |
|------|---------|
| `references/react-patterns.md` | 组件组合、复合组件、Render Props、自定义 Hooks |
| `references/state-management.md` | Context + Reducer、状态管理方案对比 |
| `references/performance.md` | Memoization、Code Splitting、Virtualization、性能检查清单 |

---

*最后更新：2026-03-12 — 拆分为核心概述 + 3 个参考文件*
