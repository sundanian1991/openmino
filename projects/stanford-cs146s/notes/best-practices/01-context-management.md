---
input: monday-learning.md 文章2 要点1
output: Context 管理详细实践指南
pos: stanford-cs146s/notes/best-practices/
---

# 01 - Context 管理（最关键）

> **核心认知**：Context 退化是 Claude Code 的主要失败模式

---

## 🎯 为什么 Context 管理最重要

### 问题本质

LLM 的 Context Window 是有限的：
- Claude 3.5 Sonnet: 200k tokens
- Claude 3 Opus: 200k tokens
- 但 **质量退化远早于达到上限**

### 退化曲线

```
Context 使用率
    ↓
0% ———————— 30% ———————— 60% ———————— 100%
   ✅ 良好       ⚠️ 开始退化      ❌ 严重退化
```

**关键发现**：
- 30% context 时，模型开始忽略早期指令
- 60k tokens 时，修复时间超过"Document & Clear"成本
- **不要等到上下文限制，要主动清理**

### 来源引用

> "Context 管理是最重要的 — 它是主要失败模式" — 12 篇文章综合分析

---

## 📁 CLAUDE.md 文件结构

### 两层架构

| 类型 | 位置 | 大小限制 | 内容 |
|------|------|---------|------|
| **根目录** | `/CLAUDE.md` | 100-200 行 | 通用规则、命令引用 |
| **子目录** | `/path/CLAUDE.md` | 50-100 行 | 项目特定、本地命令 |

### 为什么要分层

```
单一 CLAUDE.md
    ↓
❌ 文件过长（500+ 行）
❌ Token 浪费（每次都加载全部）
❌ 难以维护（改一处影响全局）

两层 CLAUDE.md
    ↓
✅ 根目录精简（通用规则）
✅ 子目录灵活（项目特定）
✅ Token 高效（按需加载）
```

### 写作原则

#### 反模式避免

| ❌ 反模式 | ✅ 正确模式 |
|---------|-----------|
| `@-file docs`（嵌入整个文件） | "For complex usage, see path/to/docs.md" |
| `"Never use --foo-bar flag"`（会卡住 Agent） | `"Never use --foo-bar; prefer --baz instead"` |
| 写全面手册 | 记录 Claude 经常犯错的地方 |

#### 为什么这样写

**问题示例**：
```markdown
❌ 错误写法
"Never use the --foo-bar flag because it causes issues."
```

**为什么会卡住**：
- Agent 收到任务时，可能只有 `--foo-bar` 能解决问题
- 看到 "Never" 会直接卡住，不知道怎么替代
- 结果：Agent 停滞，不执行任何操作

**正确写法**：
```markdown
✅ 正确写法
"Never use --foo-bar; prefer --baz instead. If --baz is unavailable, use --qux with caution."
```

**为什么有效**：
- 给出明确的替代方案
- 说明特殊情况的处理方式
- Agent 有路径可走，不会卡住

### 实际示例

#### 根目录 CLAUDE.md（通用规则）

```markdown
---
input: 全局配置
output: 通用规则 + 命令引用
pos: /
---

# 项目通用规则

## 命令速查

| 命令 | 用途 | 文件 |
|------|------|------|
| `/plan` | 进入规划模式 | .claude/commands/plan.md |
| `/test` | 运行测试 | .claude/commands/test.md |

## 开发规范

- 代码风格：见 `docs/CODING-STANDARDS.md`
- 提交规范：见 `docs/COMMIT-CONVENTIONS.md`
- 详见：`.claude/rules/WORK.md`
```

#### 子目录 CLAUDE.md（项目特定）

```markdown
---
input: 供应商管理项目
output: 项目特定规则
pos: work/供应商管理/
---

# 供应商管理项目规则

## 本地命令

| 命令 | 用途 |
|------|------|
| `供应商:评估` | 运行供应商评估脚本 |
| `供应商:汇报` | 生成周汇报材料 |

## 特殊约束

- 汇报材料必须使用 `templates/weekly-report.md`
- 数据源：`data/suppliers/`
- 严禁直接修改 `data/suppliers/master.json`
```

### 常见错误

| 错误 | 后果 | 修正 |
|------|------|------|
| 在 CLAUDE.md 中写完整文档 | 文件过长，Token 浪费 | 摘要 + 外部文档链接 |
| 使用否定式指令但不给替代 | Agent 卡住 | "不要X，要做Y" |
| 项目规则写进根目录 CLAUDE.md | 其他项目也加载污染 | 写到子目录 CLAUDE.md |
| 不限制行数 | 文件膨胀失控 | 定期审查，100-200 行上限 |

---

## 🧹 激进的 Context 清理

### 清理阈值

| 指标 | 阈值 | 行动 |
|------|------|------|
| Token 数量 | 60k+ | 立即清理 |
| Context 占用 | 30%+ | 立即清理 |
| 新手能修复？ | 是 | Document & Clear |

### 三种清理模式

#### 模式 1：简单重启

**适用场景**：
- Context 过长，但没有重要中间状态
- 新任务，不需要承接之前工作

**执行步骤**：
```
1. /clear → 清理上下文
2. /catchup → 快速恢复项目上下文
```

**优点**：
- 快速（30秒内）
- 简单，不需要额外文件

**缺点**：
- 丢失中间状态
- 不适合复杂任务

---

#### 模式 2：Document & Clear（推荐）

**适用场景**：
- 复杂任务，有重要中间状态
- 需要新会话继续工作
- 跨会话协作

**执行步骤**：

```
Step 1: 写进度到 .md 文件
  ├── 当前状态：完成了什么
  ├── 中间结果：重要变量、数据
  ├── 下一步：待办事项
  └── 依赖文件：关键文件路径

Step 2: /clear 清理上下文

Step 3: 新会话读取 .md 文件

Step 4: 继续工作
```

**模板示例**：

```markdown
---
context: [任务名] 进度保存
status: 进行中
next: [下一步行动]
---

# [任务名] - 当前进度

## ✅ 已完成

- [x] 步骤1：XXX
- [x] 步骤2：YYY

## 🔄 当前状态

**中间结果**：
- 变量 A：XXX
- 数据结构：YYY

**关键发现**：
- 问题1：XXX（已解决）
- 问题2：YYY（待解决）

## 📋 下一步

1. [ ] 步骤3：ZZZ
2. [ ] 步骤4：AAA

## 📎 依赖文件

- `path/to/file1.md` — 配置文件
- `path/to/file2.ts` — 代码文件
```

**优点**：
- 保留中间状态
- 新会话快速接续
- 可追溯历史

**缺点**：
- 需要维护额外文件
- 需要手动同步状态

---

#### 模式 3：分阶段重启

**适用场景**：
- 超大型任务（10+ 步骤）
- 多人协作
- 长期项目（数天/数周）

**执行步骤**：

```
阶段 1：规划与设计
  ├── 产出：plan.md, design.md
  ├── /clear
  └── 新会话：读取规划文档

阶段 2：实施
  ├── 产出：progress.md
  ├── /clear
  └── 新会话：读取进度文档

阶段 3：验证与优化
  ├── 产出：test-results.md, optimization.md
  └── 完成
```

**优点**：
- 每个阶段 Context 最小化
- 清晰的阶段边界
- 易于并行协作

**缺点**：
- 需要提前规划阶段
- 文档维护成本高

---

### 避免使用 /compact

> **"自动压缩是不透明、容易出错、未优化的"** — Shrivu Shankar

**问题**：
- `/compact` 会自动压缩上下文
- 你不知道什么被保留了，什么被丢弃了
- 压缩后的内容可能不准确

**替代方案**：
- 使用 Document & Clear
- 手动总结关键信息
- 保留原始文档引用

---

## 📂 文档系统（Dev Docs）

### 三文件模式

**来源**：Dev Docs 最佳实践

**文件结构**：

```
~/dev/active/[task-name]/
├── [task-name]-plan.md      # 被接受的计划
├── [task-name]-context.md   # 关键文件、决策
└── [task-name]-tasks.md     # 工作检查清单
```

### 文件职责

| 文件 | 内容 | 更新时机 |
|------|------|---------|
| **plan.md** | 需求、方案、风险评估 | 创建时、重大变更时 |
| **context.md** | 相关文件、技术决策、依赖 | 发现新信息时 |
| **tasks.md** | 可验证的检查清单 | 每步完成时 |

### 动态文档方法

**核心原则**：文档是活的，不是写完就不管了

**更新流程**：

```
实施时更新计划
    ↓
每完成一步 → 更新 tasks.md ✅
    ↓
每次提交前 → 检查计划最新状态
    ↓
让新对话准确接续之前工作
```

**示例**：

```markdown
# [task-name]-tasks.md

## 任务清单

- [x] 1. 设计数据模型
- [x] 2. 创建数据库 Schema
- [x] 3. 实现用户 CRUD API
- [ ] 4. 实现权限验证
- [ ] 5. 编写单元测试
- [ ] 6. 集成测试

## 当前状态

**进行中**：步骤 3 - 用户 CRUD API
- 已完成：GET /users/:id
- 进行中：POST /users
- 待开始：PUT /users/:id, DELETE /users/:id

## 阻塞问题

无

## 下次会话继续

从步骤 3.2 POST /users 继续
```

### 为什么三文件模式有效

**对比传统方式**：

| 传统方式 | 三文件模式 |
|---------|-----------|
| 计划在脑子里/聊天记录 | 明确的 plan.md |
| 决策散落在对话中 | context.md 集中记录 |
- 待办不清晰 | tasks.md 可验证清单 |
| 新会话难以接续 | 文档即状态，快速接续 |

**核心价值**：
- **文档即状态**：新会话读文档就知道在哪
- **变更可追踪**：Git 提交历史就是决策历史
- **质量可验证**：tasks.md 每个 ✅ 都是可验证的

---

## 🔄 与我们实践的对比

| 维度 | Anthropic/社区建议 | 我们做法 | 差距分析 |
|------|-------------------|---------|----------|
| **CLAUDE.md 大小** | 根目录 100-200 行 | 完善，可能偏长 | ⚠️ 需审查 token 使用 |
| **Context 清理** | 60k/30% 主动清理 | 会话重启时 | ✅ 可更主动 |
| **Dev Docs** | 三文件模式 | ✅ Plan First 已有 | 符合最佳实践 |
| **/compact 使用** | 避免 | 未使用 | ✅ 符合 |

---

## ✅ 行动建议

### 立即可做（本周）

1. **审查 CLAUDE.md 大小**
   ```bash
   # 检查根目录 CLAUDE.md 行数
   wc -l /path/to/CLAUDE.md

   # 如果 >200 行，考虑拆分
   ```

2. **建立清理阈值意识**
   - 每次会话开始时：检查 Context 使用率
   - 达到 60k tokens 时：主动清理
   - 复杂任务时：使用 Document & Clear

3. **标准化三文件模式**
   - 复杂任务必须创建 plan/context/tasks
   - 使用模板：`TEMPLATE.md`
   - 每步完成更新 tasks.md ✅

### 中期优化（本月）

4. **建立清理习惯**
   - 每天会话结束：评估是否需要清理
   - 跨天任务：使用 Document & Clear 保存状态
   - 定期（每周）review：清理过期文档

5. **优化 CLAUDE.md 结构**
   - 根目录保持在 200 行以内
   - 项目特定规则放到子目录
   - 使用外部文档链接，减少内联内容

---

## 📚 相关资源

- [02 - 规划与架构](./02-planning-architecture.md) — Plan First 机制
- [原文讨论](https://github.com/anthropics/claude-code-best-practices) — 社区实践

---

*创建时间：2026-03-01*
