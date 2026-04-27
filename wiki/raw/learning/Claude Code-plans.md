---
input: prompt.md 定义的学习目标
output: 分阶段学习计划 + 验收标准
pos: docs/learning/，学习计划
---

# 学习计划：Claude Code 七大核心组件

## 推荐学习顺序

**阶段 1：基础认知（1-2 小时）**
- [ ] 理解 CLI-first 路线 vs IDE 集成
- [ ] 理解 Agentic Coding 概念
- 验收：能说出 Claude Code 与 Cursor 的区别

**阶段 2：核心组件入门（3-4 小时）**
- [ ] CLAUDE.md — 项目上下文文件
- [ ] Commands — 斜杠命令
- [ ] Hooks — 事件自动执行器
- 验收：能创建 CLAUDE.md、自定义 Commands、配置 Hooks

**阶段 3：进阶组件（4-6 小时）**
- [ ] SubAgents — 专业子代理
- [ ] Skills — 可复用技能包
- [ ] MCP Servers — 外部数据源连接器
- 验收：能配置 SubAgents、创建 Skills、连接 MCP Server

**阶段 4：整合应用（2-3 小时）**
- [ ] Plugins — 功能组合包
- [ ] 组件协同策略
- 验收：能安装 Plugins、组合多个组件形成工作流

**阶段 5：实战演练（持续）**
- [ ] 新项目上手实战
- [ ] 日常开发实战
- [ ] 团队协作实战
- 验收：完成 3 个实战场景

---

## 阶段 1：基础认知

### 学习目标
- 理解 Claude Code 的定位
- 理解 CLI-first 的优势
- 理解 Agentic Coding 概念

### 任务清单
- [ ] 阅读：工具定位部分
- [ ] 对比：Claude Code vs Cursor vs 终端手动操作
- [ ] 实践：用 Claude Code 完成一个简单任务

### 验收标准
- [ ] 能说出 CLI-first 的三个优势
- [ ] 能说出 agentic coding 的核心特点

---

## 阶段 2：核心组件入门

### 2.1 CLAUDE.md
- [ ] 理解：CLAUDE.md 的作用和加载机制
- [ ] 实践：为当前项目创建 CLAUDE.md
- [ ] 验收：`cat CLAUDE.md` 包含项目命令和规范

### 2.2 Commands
- [ ] 理解：Commands 的存储位置和触发机制
- [ ] 实践：创建一个代码审查命令 `/review`
- [ ] 验收：`/review` 能输出审查要点

### 2.3 Hooks
- [ ] 理解：Hooks 的事件类型和配置方式
- [ ] 实践：配置 Edit 事件自动 lint 修复
- [ ] 验收：编辑文件后自动运行 lint --fix

---

## 阶段 3：进阶组件

### 3.1 SubAgents
- [ ] 理解：SubAgents 的任务分解机制
- [ ] 实践：设计一个重构任务的子代理分工
- [ ] 验收：画出子代理分工图

### 3.2 Skills
- [ ] 理解：SKILL.md 格式和工作流封装
- [ ] 实践：封装一个"添加 API 端点"的 Skill
- [ ] 验收：SKILL.md 包含完整的实现步骤

### 3.3 MCP Servers
- [ ] 理解：MCP 协议和连接器机制
- [ ] 实践：配置一个 MCP Server（如 Tavily）
- [ ] 验收：能用 MCP 工具搜索网页

---

## 阶段 4：整合应用

### 4.1 Plugins
- [ ] 理解：Plugins 的打包和安装机制
- [ ] 实践：安装官方 PR 审查插件
- [ ] 验收：`/plugin install` 成功安装

### 4.2 组件协同
- [ ] 理解：组件组合的 1+1>2 效果
- [ ] 实践：设计一个"新功能开发"工作流
- [ ] 验收：画出组件协同流程图

---

## 阶段 5：实战演练

### 实战 1：新项目上手
- [ ] 创建 CLAUDE.md
- [ ] 配置团队 Commands
- [ ] 配置质量 Hooks
- 验收：新成员能通过文档快速上手

### 实战 2：日常开发
- [ ] 使用 Skills 封装常用操作
- [ ] 使用 SubAgents 处理复杂任务
- 验收：开发效率提升可感知

### 实战 3：团队协作
- [ ] 创建团队 Plugins
- [ ] 统一工作流标准
- 验收：团队配置一键安装

---

*最后更新：2026-02-24*
