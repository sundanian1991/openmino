# Tool Call Repair — 工具调用容错指南

> 基于 Ahmad Awais 的 Tool Input Repair Layer 方案 + 实际工程落地。
> 核心洞察：开源模型工具调用失败 90% 可归因于 4 类可修复模式，而非模型能力问题。

---

## 什么时候用

- 用 DeepSeek / Qwen / GLM 等开源模型做工具调用
- 子代理需要调用外部工具（搜索、文件读写、API）
- 写 Skill 时，Skill 内部涉及模型生成工具参数

---

## 快速方案：System Prompt 注入片段

在派发子代理或调用开源模型时，在 System Prompt 中追加以下片段：

```
## 工具调用格式约束（必读）

调用工具时严格遵循以下规则：

1. **可选字段不传 null**：可选参数如果不传值，直接省略整个字段，禁止传 null。
2. **数组传原生数组**：数组类型参数直接传原生数组结构，如 ["a","b"]，
   禁止用 JSON.stringify 序列化为字符串（如 "[\"a\",\"b\"]"）。
3. **数组不嵌套对象**：期望数组的位置，直接传数组，禁止用空对象 {} 包装参数。
4. **单元素也要用数组**：数组类型参数，即使只有一个元素也必须用 [] 包裹，
   如 ["foo"] 而非 "foo"。
5. **文件路径是纯路径**：路径参数是传入工具函数（如 readFile/fopen）的，
   不是聊天输出。禁止使用 Markdown 链接格式 [path](url)，直接传纯路径字符串。

以上规则是你的工具调用契约，违反将导致工具调用失败。
```

## 工程方案：lib/tool-input-repair.ts

适用于你自己写代码的场景。代码在 `lib/tool-input-repair.ts`，提供两个导出：

### `repairToolInput(args, schema?)`

在工具调用入口处，Schema 校验之前调用。返回修复后的参数。

```typescript
import { repairToolInput } from './lib/tool-input-repair';

function handleToolCall(toolName: string, args: any, schema: any) {
  // 在 Schema 校验前修复
  const repaired = repairToolInput(args, schema);
  // 然后用 repaired 执行工具
}
```

### `withRepair(fn, schema?)`

高阶函数，包装工具函数，自动在调用前修复输入。

```typescript
import { withRepair } from './lib/tool-input-repair';

const safeReadFile = withRepair(readFile, readFileSchema);
```

---

## 修复的 5 类错误模式

| # | 错误模式 | 输入示例 | 修复后 |
|---|---------|---------|--------|
| 1 | 可选字段传 null | `{ name: "foo", optional: null }` | `{ name: "foo" }` |
| 2 | 数组序列化为 JSON 字符串 | `{ files: "[\"a\",\"b\"]" }` | `{ files: ["a", "b"] }` |
| 3 | {} 占位包装 | `{ path: { file: "a.txt" } }` | `{ path: [{ file: "a.txt" }] }` |
| 4 | 裸字符串替代数组 | `{ names: "foo" }` | `{ names: ["foo"] }` |
| 5 | Markdown 链接路径 | `{ path: "/x/[a.md](http://x)" }` | `{ path: "/x/a.md" }` |

---

## 设计原则

1. **宽容而非严格**：在 Harness 层修复而非拒绝，对可恢复的噪声保持宽容
2. **有 Schema 时更精准**：传 schema 时只修复已知类型的字段，否则全局扫描
3. **不破坏合法输入**：每个修复都有明确的触发条件，不误伤正常输入
4. **执行顺序有讲究**：修复器按固定顺序执行（JSON 字符串解析在裸字符串包装之前）

---

## 边界与局限

- 修复层处理的是**结构性错误**，不处理语义错误（如传了不存在的文件路径）
- Schema 信息越完整修复越精准；无 Schema 时保守处理
- 仅修复 JSON 层面的参数格式，不修改工具行为本身

---

*最后更新：2026-06-22 — 基于 Command Code Tool Input Repair Layer 方案编写*
