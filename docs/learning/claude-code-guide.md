---
input: 学习需求、Claude Code 文章
output: 完整学习指南、组件详解
pos: docs/learning/，核心文档
---

# 学会使用 Claude Code：七大核心组件实战指南

> 从入门到精通，系统掌握 Claude Code 的核心能力

---

## 🎯 第一部分：基础认知

### 1.1 工具定位：CLI-first 的 Agentic Coding

**什么是 CLI-first？**
- Claude Code 采用**命令行优先**路线，在终端中运行
- 与 Cursor 等 IDE 集成工具不同，它更轻量、灵活、可脚本化

**CLI vs IDE 对比**：

| 维度 | CLI-first (Claude Code) | IDE 集成 (Cursor) |
|------|----------------------|-----------------|
| 启动速度 | 秒开 | 需要加载 IDE |
| 脚本化 | 可编写自动化脚本 | 较复杂 |
| 远程开发 | SSH 直连，无 GUI 负担 | 需要 GUI 转发 |
| 学习曲线 | 熟悉终端即可 | 需了解 IDE 插件 |
| 灵活性 | 可组合 Unix 工具 | 受限于 IDE |

**什么是 Agentic Coding？**
- AI 不只是补全代码，而是**主动完成任务**
- 可以直接编辑文件、运行命令、创建提交、连接外部工具

**核心能力**：
```bash
# AI 可以做的事
- 编辑文件：修改代码、添加功能
- 运行命令：npm test、git commit
- 创建提交：自动生成 commit message
- 连接外部工具：通过 MCP 连接 Figma、Slack、Jira
```

---

### 1.2 七大核心组件全景图

| 组件 | 一句话理解 | 使用频率 |
|------|----------|---------|
| **CLAUDE.md** | 项目记忆体，自动加载上下文 | ⭐⭐⭐⭐⭐ 每天 |
| **Commands** | 快捷指令，一键触发重复任务 | ⭐⭐⭐⭐ 经常 |
| **Hooks** | 自动化触发器，事件驱动 | ⭐⭐⭐ 有时 |
| **SubAgents** | 任务分解专家，并行处理 | ⭐⭐ 偶尔 |
| **Skills** | 工作流模板，可复用 | ⭐⭐⭐ 有时 |
| **Plugins** | 功能大礼包，一键安装 | ⭐ 很少 |
| **MCP Servers** | 连接外部世界的桥梁 | ⭐⭐⭐ 有时 |

---

## 📋 第二部分：核心组件详解

### 2.1 CLAUDE.md：项目记忆的核心载体

**痛点**：每次新会话都要重复交代项目背景
- "我们用的是 React 还是 Vue？"
- "测试命令是什么？"
- "代码规范有什么要求？"

**解决方案**：在项目根目录创建 `CLAUDE.md`，AI 每次会话自动加载

**文件结构**：
```markdown
---
input: 会话请求、用户输入
output: AI 协作、项目执行
pos: 项目根目录
---

# CLAUDE.md — 项目名称

## 项目命令
- `npm run dev`: 启动开发服务器
- `npm run test`: 运行测试
- `npm run build`: 构建生产版本

## 代码规范
- TypeScript strict 模式
- 优先使用 ES 模块（import/export）
- 函数组件优先于类组件

## IMPORTANT（重要提示）
- 修改 API 前必须先更新文档
- 禁止提交 console.log
```

**实战：3 分钟创建你的第一个 CLAUDE.md**

```bash
# Step 1: 创建文件
cat > CLAUDE.md << 'EOF'
---
input: 会话请求、用户输入
output: AI 协作、项目执行
pos: 项目根目录
---

# CLAUDE.md

## 项目命令
- npm run dev: 启动开发服务器
- npm run test: 运行测试

## 代码规范
- TypeScript strict 模式
- 使用 ES 模块语法
EOF

# Step 2: 验证
cat CLAUDE.md

# Step 3: 启动 Claude Code 测试
claude "读取 CLAUDE.md，告诉我项目规范是什么"
```

**最佳实践**：
1. 把团队规范写进去（新人快速上手）
2. 用 `IMPORTANT` 标识关键规则
3. 持续优化（发现重复解释的内容就加进去）

---

### 2.2 Commands：快捷指令的效率提升

**痛点**：重复输入相同的指令
- "请审查这段代码，检查质量、安全、性能..."
- "请帮我写一个单元测试..."

**解决方案**：自定义斜杠命令，存储于 `.claude/commands/`

**创建第一个命令 `/review`**：

```bash
# Step 1: 创建目录
mkdir -p .claude/commands

# Step 2: 创建命令文件
cat > .claude/commands/review.md << 'EOF'
# 代码审查命令

请对当前分支的代码改动进行审查，重点检查：

## 审查清单
1. **代码质量**
   - 可读性：命名清晰、注释充分
   - 可维护性：函数职责单一、无重复代码

2. **安全漏洞**
   - 输入验证：用户输入是否校验
   - 认证授权：敏感操作是否验证权限
   - 常见漏洞：SQL 注入、XSS、CSRF

3. **性能问题**
   - 时间复杂度：是否有明显性能瓶颈
   - 内存泄漏：是否有未释放的资源

4. **测试覆盖率**
   - 核心逻辑是否有单元测试
   - 边界情况是否测试

5. **文档完整性**
   - 公共 API 是否有文档
   - 复杂逻辑是否有注释
EOF

# Step 3: 使用命令
claude "/review"
```

**进阶：带参数的命令 `/fix-issue`**：

```markdown
# .claude/commands/fix-issue.md

请帮我处理 GitHub Issue #$ARGUMENTS

## 执行步骤
1. 读取 Issue 内容
2. 分析问题根因
3. 提出修复方案
4. 等待用户确认
5. 实施修复
6. 运行测试验证
```

使用方式：
```bash
claude "/fix-issue 123"
```

---

### 2.3 Hooks：自动化任务的触发机制

**痛点**：代码修改后要手动运行测试、lint 等重复操作

**解决方案**：配置事件触发的自动 shell 命令

**配置文件位置**：`~/.claude/settings.json` 或项目级 `.claude/hooks.json`

**常用事件类型**：

| 事件 | 触发时机 | 适用场景 |
|------|---------|---------|
| `user_prompt_submit` | 用户提交 prompt 后 | 自动记录对话日志 |
| `session_start` | 会话开始时 | 加载项目环境 |
| `file_edit` | 文件编辑后 | 自动 lint 修复、运行测试 |

**实战：配置自动 lint 修复**

```json
// .claude/hooks.json
{
  "file_edit": {
    "command": "npm run lint -- --fix $FILE",
    "description": "Auto-fix lint issues for edited file",
    "on_exit": {
      "command": "npm run test -- $FILE",
      "description": "Run tests for edited file"
    }
  }
}
```

**效果**：
1. 编辑文件 → 自动运行 lint --fix
2. lint 通过 → 自动运行相关测试
3. 形成质量链：格式修复 → 测试验证

**避坑指南**：
- ⚠️ 数据修改操作（如 git push）建议手动确认
- ⚠️ 避免配置过多 hooks 导致执行缓慢
- ✅ 从简单的 lint 修复开始，逐步扩展

---

### 2.4 SubAgents：复杂任务的分解利器

**痛点**：单一 AI 处理复杂任务容易遗漏边界情况

**解决方案**：创建专业子代理，分解任务并行处理

**任务分解示例：重构认证系统**

```
主 Agent：规划整体架构
├── SubAgent 1（登录模块专家）：重构登录逻辑
├── SubAgent 2（Token 专家）：重构 Token 生成与验证
├── SubAgent 3（权限专家）：重构 RBAC 权限系统
└── SubAgent 4（测试专家）：更新单元测试
```

**实战：使用 Task 工具委派任务**

```bash
# 主任务
claude "重构认证系统，使用子代理并行处理"

# AI 会自动：
# 1. 创建子代理处理登录模块
# 2. 创建子代理处理 Token 管理
# 3. 创建子代理处理权限验证
# 4. 汇总各子代理结果
```

**核心优势**：
- 减少上下文长度（每个子代理专注一个模块）
- 提升专注度（专业的人做专业的事）
- 支持并行处理（多个模块同时推进）

---

### 2.5 Skills：工作流的复用模板

**痛点**：复杂操作需要重复解释步骤
- "添加一个 API 端点，需要路由、控制器、验证、测试..."

**解决方案**：封装工作流为 Skills，存放于 `.claude/skills/`

**SKILL.md 标准格式**：

```markdown
---
name: add-api-endpoint
description: 添加新 API 端点（路由、控制器、验证、测试、文档）
---

# 实现步骤

## 1. 创建路由文件
- 位置：`src/routes/[name].ts`
- 内容：定义路由路径和 HTTP 方法

## 2. 添加控制器方法
- 位置：`src/controllers/[name].controller.ts`
- 内容：处理业务逻辑

## 3. 请求验证（DTO）
- 位置：`src/dtos/[name].dto.ts`
- 内容：定义输入参数校验规则

## 4. 单元测试
- 位置：`src/[name].test.ts`
- 内容：测试控制器逻辑

## 5. 更新 API 文档
- 位置：`docs/api/[name].md`
- 内容：API 使用说明

# 技能链
- deploy: 部署前先运行测试
  - run-tests → build → bump-version
```

**实战：创建你的第一个 Skill**

```bash
# Step 1: 创建目录
mkdir -p .claude/skills/add-api-endpoint

# Step 2: 创建 SKILL.md
cat > .claude/skills/add-api-endpoint/SKILL.md << 'EOF'
---
name: add-api-endpoint
description: 添加新 API 端点
---

## 步骤
1. 创建路由文件
2. 添加控制器
3. 创建 DTO 验证
4. 编写单元测试
5. 更新 API 文档
EOF

# Step 3: 使用 Skill
claude "使用 add-api-endpoint 技能，创建一个用户注册接口"
```

**核心价值**：
- 一次定义，多次复用
- 支持链式调用（如 deploy 技能调用 run-tests）
- 团队共享（统一开发流程）

---

### 2.6 MCP Servers：连接外部世界的桥梁

**痛点**：AI 无法直接访问外部资源（Jira 需求、Figma 设计稿等）

**解决方案**：通过 MCP（Model Context Protocol）连接外部数据源

**什么是 MCP？**
- 开放协议，让 AI 能够连接外部工具和数据
- 类似"插件"，但更标准化

**实战：配置 Tavily 搜索 MCP**

```bash
# Step 1: 安装 MCP Server
npm install -g @tavily/mcp

# Step 2: 配置 API Key
export TAVILY_API_KEY=your_key

# Step 3: 在 Claude Code 中使用
claude "使用 Tavily 搜索最新的 React 新闻"
```

**实战场景：Figma 设计稿转代码**

```bash
# 配置 Figma MCP
claude "使用 MCP 连接 Figma，读取这个设计稿并实现 UI：
https://www.figma.com/file/xxx"

# AI 会：
# 1. 通过 MCP 连接 Figma
# 2. 读取图层和样式信息
# 3. 生成对应的 React 代码
```

**社区资源**：
- 官方 MCP 集合：https://github.com/modelcontextprotocol/servers
- 常用 MCP：
  - `@tavily/mcp`：网页搜索
  - `@figma/mcp`：读取设计稿
  - `@jira/mcp`：读取需求

---

### 2.7 Plugins：完整工作流的打包复用

**痛点**：新项目需要重复配置 Commands、Skills、Hooks 等

**解决方案**：打包多组件为 Plugins，一键安装

**实战：安装官方 PR 审查插件**

```bash
# Step 1: 从插件市场添加
/plugin marketplace add anthropics/claude-code-plugins

# Step 2: 安装 PR 审查工具包
/plugin install pr-review-toolkit

# 插件内容：
# - 6 个专业审查代理（注释分析、测试分析等）
# - 并行执行能力
```

**团队应用：创建私有插件**

```bash
# 创建团队插件
mkdir -p team-plugin
cd team-plugin

# 包含：
# - .claude/commands/    团队 Commands
# - .claude/skills/      团队 Skills
# - .claude/hooks.json   团队 Hooks

# 打包
/plugin pack

# 团队成员安装
/plugin install ./team-plugin
```

---

## 🔄 第三部分：组件协同策略

### 3.1 经典组合模式

| 组合 | 应用场景 | 效果 |
|------|---------|------|
| **CLAUDE.md + Hooks** | 新成员上手 | 上下文保障 + 自动质量检查 |
| **SubAgents + MCP** | 竞品分析 | 任务分解 + 多源数据整合 |
| **Commands + Skills** | 功能开发 | 快捷触发 + 标准化流程 |
| **Plugins** | 团队协作 | 一键配置完整环境 |

### 3.2 实战：新功能开发工作流

```
1. /new-feature 用户登录功能
   ↓
2. AI 读取 CLAUDE.md（项目规范）
   ↓
3. 使用 Skills（add-api-endpoint）
   ↓
4. 创建 SubAgents 并行处理
   - 登录逻辑
   - 数据库迁移
   - 单元测试
   ↓
5. Hooks 自动运行测试
   ↓
6. /review 代码审查
   ↓
7. 完成
```

---

## 🚀 第四部分：实战演练

### 实战 1：新项目上手（30 分钟）

**目标**：让新成员快速上手项目

**步骤**：
1. 创建 CLAUDE.md（包含项目命令、代码规范）
2. 创建 Commands（/review、/test 等）
3. 配置 Hooks（自动 lint 修复）
4. 安装团队 Plugins

**验收**：新成员运行 `/onboarding` 就能开始开发

---

### 实战 2：日常开发（每天）

**目标**：提升日常开发效率

**步骤**：
1. 使用 Skills 封装常用操作（如 add-api-endpoint）
2. 使用 SubAgents 处理复杂任务
3. 使用 Hooks 自动化重复操作

**验收**：相同任务耗时减少 50%

---

### 实战 3：团队协作（每周）

**目标**：统一团队工作流

**步骤**：
1. 创建团队 Plugins（包含标准 Commands、Skills）
2. 配置共享 MCP Servers（如公司知识库）
3. 定期优化 CLAUDE.md（同步团队规范）

**验收**：新成员 1 小时内能独立开发

---

## ⚠️ 第五部分：避坑指南

### 常见错误

| 错误 | 后果 | 避免方法 |
|------|------|---------|
| 一次性启用所有组件 | 配置混乱，难以维护 | 从 CLAUDE.md 开始，逐步扩展 |
| Hooks 自动执行危险操作 | 数据丢失风险 | 写操作（git push 等）手动确认 |
| 使用不可信的 MCP/Plugins | 安全风险 | 优先官方和可信来源 |
| CLAUDE.md 过于冗长 | AI 忽略关键信息 | 保持简洁，用 IMPORTANT 标识 |

### 进阶方向

学完本指南后，可以继续深入：
- 自定义 Skills 开发
- MCP Server 开发
- 多 Claude 并行协作
- CI/CD 集成

---

## 📎 附录：速查表

### 一、常用命令

```bash
# 初始化项目
/init

# 使用 Skill
使用 [skill-name] 来...

# 使用 Commands
/review
/fix-issue 123

# 使用 Plugins
/plugin marketplace add xxx
/plugin install xxx
```

### 二、文件位置

| 文件 | 位置 | 用途 |
|------|------|------|
| CLAUDE.md | 项目根目录 | 项目上下文 |
| Commands | .claude/commands/ | 快捷指令 |
| Skills | .claude/skills/ | 工作流模板 |
| Hooks | .claude/hooks.json | 自动化配置 |
| MCP | ~/.mcp.json | 外部连接 |

### 三、学习路径推荐

```
第 1 周：CLAUDE.md + Commands
第 2 周：Hooks + Skills
第 3 周：SubAgents + MCP
第 4 周：Plugins + 组合应用
```

---

*最后更新：2026-02-24 — 根据《Claude Code 核心概述》文章整理*
