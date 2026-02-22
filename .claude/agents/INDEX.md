# Agent索引

> 参考oh-my-opencode的最佳实践，结合年老师工作场景

---

## 系统架构（两层）

### 第一层：Task工具内置（Claude Code）

| Agent | 用途 | 调用方式 | 使用场景 |
|-------|------|-----------|---------|
| **Explore** | 快速探索代码库 | `Task(subagent_type=Explore)` | 找文件、搜代码、理解结构 |
| **general-purpose** | 综合任务处理 | `Task(subagent_type=general-purpose)` | 多步骤复杂任务 |
| **Plan** | 软件架构设计 | `Task(subagent_type=Plan)` | 实施前规划 |
| **Bash** | 命令执行 | `Task(subagent_type=Bash)` | 快速命令 |

### 第二层：自定义垂直Agent

| Agent | 用途 | 调用方式 | 使用场景 |
|-------|------|-----------|---------|
| **code-reviewer** | 代码质量审查 | `Task(subagent_type="code-reviewer")` | 代码完成后、PR前 |
| **data-analyst** | 供应商数据分析 | `Task(subagent_type="data-analyst")` | 周报数据、风险评估 |
| **reading-internalizer** | 知识内化 | `Task(subagent_type="reading-internalizer")` | 读文章/书籍 |

---

## 委派协议（参考Sisyphus）

**调用agent前必须声明**：
```
我将使用 [agent-name]：
- 理由：[为什么用这个agent]
- 预期结果：[具体产出]
```

**委托后必须验证**：
```
- 完成了吗？
- 质量达标吗？
- 需要调整吗？
```

---

## 并行执行模式

**多个独立任务时**：
```typescript
// 启动多个并行agents
Task(subagent_type=Explore, description="找A", run_in_background=true, ...)
Task(subagent_type=Explore, description="找B", run_in_background=true, ...)

// 继续其他工作...

// 需要结果时收集
TaskOutput(task_id="...")
```

---

## 使用规则

**1. 我必须明确说明**：
> "用【Explore】处理这个" 或 "用【data-analyst】分析数据"

**2. 年老师可以直接指定**：
- "用Explore搜供应商相关文件"
- "用data-analyst准备本周KPI"
- "用reading-internalizer内化这篇文章"

---

## 已删除的重复Agent

| 删除 | 原因 | 替代方案 |
|------|------|----------|
| git-manager | 重复gh CLI工具 | 用gh命令 |
| search-researcher | 重复tavily+Explore | 用tavily MCP |

---

## 未来可扩展

根据年老师P7工作场景，待添加：
- **Supplier-analyst** → 已有data-analyst覆盖
- **Promotion-writer** → 述职材料优化
- **Meeting-prep** → 会议准备助手
