---
input: 工具使用决策需求
output: 工具选择建议与最佳实践
pos: .claude/rules/reference/工具使用指南
---

# TOOLS.md — 工具使用优先级

> 什么场景用什么工具，一目了然

---

## 文件操作优先级

**核心原则**：专用工具 > Bash 命令

| 操作 | 专用工具 | 替代方案 |
|------|---------|---------|
| 读取文件 | `Read` | cat, head, tail |
| 编辑文件 | `Edit` | sed, awk |
| 创建文件 | `Write` | cat <<EOF, echo |
| 搜索文件（按名称） | `Glob` | find, ls |
| 搜索内容（按正则） | `Grep` | grep, rg |

**原因**：
- 专用工具更高效，输出格式化
- 用户体验更好，可追溯变更
- 避免 shell 转义、路径问题

---

## 搜索策略

| 场景 | 工具 | 说明 |
|------|------|------|
| 已知文件路径 | `Read` | 直接读取 |
| 按名称模式找文件 | `Glob` | `**/*.js`, `src/**/*.ts` |
| 搜索代码内容 | `Grep` | 支持正则，可过滤文件类型 |
| 广泛探索代码库 | `Task(Explore)` | 3 轮以上搜索时启用子代理 |
| 回答研究问题 | `Task(General)` | 需要多步推理、综合多个来源 |
| 实时信息/新闻 | `tavily_search` | 超过知识截止日期的内容 |
| 抓取网页内容 | `tavily_extract` | 优先于 webReader（配额更大） |

**搜索决策树**：
```
需要找文件？
  ├─ 已知路径 → Read
  ├─ 按名称 → Glob
  └─ 按内容 → Grep

需要探索代码库？
  ├─ 1-2 个位置 → Glob/Grep
  └─ 3 个以上 → Task(Explore)

需要研究问题？
  ├─ 本地代码库 → Task(Explore)
  ├─ 实时信息 → tavily_search
  └─ 复杂多步骤 → Task(General)
```

---

## 子代理（Subagent）使用

| 子代理类型 | 用途 | 何时使用 |
|-----------|------|---------|
| **Explore** | 快速探索代码库 | 找文件、搜索模式、理解结构 |
| **general-purpose** | 复杂多步任务 | 需要自主规划执行步骤 |
| **Plan** | 软件架构设计 | 实现复杂功能前需要规划 |

**执行规范**：
1. 委派前声明：理由 + 预期结果
2. 完成后验证：结果是否符合预期
3. 独立任务可并行启动多个子代理

**何时不用子代理**：
- 已知具体文件路径 → 直接 Read
- 搜索单个类/函数 → 直接 Grep
- 简单 1-2 步任务 → 直接执行

---

## Git 操作

### 安全操作（可执行）

| 操作 | 命令 | 说明 |
|------|------|------|
| 查看状态 | `git status` | 无风险 |
| 查看差异 | `git diff` | 无风险 |
| 查看历史 | `git log` | 无风险 |
| 添加文件 | `git add <具体文件>` | 不用 `-A` 或 `.` |
| 创建提交 | `git commit -m "消息"` | 用 HEREDOC 格式化 |
| 推送分支 | `git push -u origin <新分支>` | 新分支安全 |

### 危险操作（需确认）

| 操作 | 风险 | 处理 |
|------|------|------|
| `git reset --hard` | 丢失未提交更改 | 必须用户确认 |
| `git push --force` | 覆盖远程历史 | 禁止对 main/master |
| `git clean -f` | 删除未跟踪文件 | 必须用户确认 |
| `git commit --amend` | 修改已发布提交 | 禁止，用新提交 |
| `--no-verify` | 跳过 hooks | 禁止使用 |

### 提交流程

```
1. git status → 查看未跟踪文件
2. git diff → 查看改动
3. git log -5 → 了解提交风格
   ↓
4. 分析变更 → 总结改动、检查敏感文件
   ↓
5. git add <具体文件> → 不用 git add . 或 -A
6. git commit -m "消息"
   ↓
7. git status → 验证成功
```

**处理 Hook 失败**：
- ❌ 不做：`--no-verify` 跳过
- ✅ 做：修复问题后**新建提交**

---

## 命令执行（Bash）

### 优先使用专用工具

| 需求 | 优先方案 | 保留 Bash |
|------|---------|----------|
| 找文件 | Glob | find, ls |
| 搜内容 | Grep | grep, rg |
| 读文件 | Read | cat, head, tail |
| 改文件 | Edit | sed, awk |
| 写文件 | Write | echo >, cat <<EOF |

### Bash 适用场景

- Git 操作（状态、提交、推送）
- 包管理器（npm install, pip install）
- 开发服务器（npm start, npm run dev）
- 测试运行（npm test, pytest）
- 脚本执行（./scripts/*.sh）
- 系统命令（curl, mkdir, cp, mv）

---

## 决策流程图

```
收到任务
    ↓
需要文件操作？
  ├─ 是 → 用专用工具（Read/Edit/Glob/Grep）
  └─ 否 ↓
需要搜索/研究？
  ├─ 本地代码库 → Glob/Grep 或 Task(Explore)
  ├─ 实时信息 → tavily_search
  └─ 复杂研究 → Task(General)
    ↓
需要写代码？
  ├─ 简单修改 → Edit/Write
  └─ 复杂功能 → EnterPlanMode → 规划 → 执行
    ↓
需要 Git 提交？
  ├─ 按 Git 提交流程执行
  └─ 危险操作 → 先确认
```

---

*工具是手段，不是目的。选对的工具，不是快的工具。*
