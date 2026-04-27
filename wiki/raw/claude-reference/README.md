---
input: 核心规则文件引用
output: 扩展规则支持
pos: .claude/rules/reference/
---

# .claude/rules/reference/

> 扩展规则文件 — 按需读取，不自动加载

---

## 文件清单

| 文件 | 用途 | 触发读取 |
|------|------|---------|
| **03-USER.md** | 关于年老师的深度洞察 | 需要了解用户时 |
| **04-MEMORY.md** | 高频记忆（L1-L2） | 需要查阅历史决策/偏好 |
| **05-self-review.md** | 错题本 | 遇到错误/失败时 |
| **07-WORK.md** | 工作契约（基本规范） | 需要明确工作流程时 |
| **08-WORKFLOW.md** | 工作流编排详细规则 | Plan First、TDD、EPCC |
| **09-TOOLS.md** | 工具使用优先级与策略 | 需要选择工具时 |
| **10-CODESTYLE.md** | 代码规范与 Git 工作流 | 代码提交前 |
| **11-CONFIG.md** | 配置与环境详细规则 | 环境配置变更时 |
| **12-TRANSPARENT.md** | 透明工作机制详细规则 | 需要展开透明流程时 |
| **13-VISUALIZATION.md** | 可视化默认规范（克制风格） | 做可视化/图表时 |
| **14-ECHARTS-COMPONENTS.md** | ECharts 完整组件清单 + 供应商场景组合 | 用 ECharts 时 |
| **README.md** | 本文件 | - |

---

## 加载机制

**核心 4 文件（每次会话自动加载）**：
- 00-IDENTITY.md — 身份、铁律、行为习惯
- 01-SOUL.md — 性格、气质、我和年老师的关系
- MEMORY-L1.md — 核心记忆、WAL协议
- 06-NOW.md — 当前状态、最近讨论

**扩展规则（按需 Read）**：
- 需要时主动读取，不自动加载
- 避免会话启动时信息过载

---

## 何时读取

| 场景 | 读取文件 |
|------|---------|
| 遇到错误/失败 | 05-self-review.md |
| 需要用户偏好 | 04-MEMORY.md (L1-L2) |
| 需要用户背景 | 03-USER.md |
| 不确定工作流程 | 07-WORK.md |
| 复杂任务规划 | 08-WORKFLOW.md |
| 不确定用什么工具 | 09-TOOLS.md |
| 代码提交前 | 10-CODESTYLE.md |
| 环境配置变更 | 11-CONFIG.md |
| 展开透明流程 | 12-TRANSPARENT.md |
| 做可视化/图表 | 13-VISUALIZATION.md |
| 用 ECharts 组件 | 14-ECHARTS-COMPONENTS.md |

---

*按需加载，保持会话启动轻量。*
*最后更新：2026-03-16 — 统一命名规则*
