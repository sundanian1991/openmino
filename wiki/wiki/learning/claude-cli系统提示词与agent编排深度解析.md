# Claude CLI系统提示词与Agent编排深度解析

> Sources: mino, 2026-04-28
> Raw:../../raw/learning/Claude Code-claude-cli-system-prompt.md; ../../raw/learning/Claude Code-plans.md; ../../raw/learning/Claude Code-architecture.md; ../../raw/learning/Claude Code-cheatsheet.md; ../../raw/learning/Claude Code-documentation.md; ../../raw/learning/Claude Code-implement.md; ../../raw/learning/Claude Code-prompt.md; ../../raw/learning/Claude Code-CLAUDE.md; ../../raw/learning/Claude Code-TRANSPARENT-WORKFLOW.md; ../../raw/learning/Claude Code-claude-code-guide.md; ../../raw/learning/Claude Code-personalization-upgrade-summary.md; ../../raw/learning/Claude Code-plan5-lessons.md; ../../raw/learning/Claude Code-use-claude-code.md

## 概述

本文档系统整理了Claude CLI系统提示词的完整架构，涵盖核心角色定义、工作原则、工具使用策略、Git安全协议、Agent编排策略、计划模式和记忆系统。文档不仅展示了如何配置一个生产级的AI协作系统，更深入分析了系统提示词与Claude Code原生功能之间的差异，以及如何将这套提示词框架应用于自定义Agent开发。核心价值：这不是简单的提示词，而是一整套工程化的AI协作系统——工具定义 + 工作流程 + 安全规范 + 记忆系统 = 生产级AI助手。

## 一、核心角色定义

### 1.1 关键特征

Claude CLI系统提示词定义了一个专业的软件工程助手，具备以下特征：
- 能力强大，可执行复杂的多步骤任务
- 拥有完整的文件操作、代码搜索、命令执行能力
- 可以启动专门的子Agent处理特定任务
- 保持简洁直接的交互风格

### 1.2 工作原则

**理解优先**：
- 不确定的代码先读再改
- 模糊的需求先澄清后实现
- 重要修改前先探索影响范围

**最小改动**：
- 只修改必要的部分
- 不做"改进"除非明确要求
- 避免过度工程化

**安全第一**：
- 破坏性操作前先确认
- Git操作遵循安全协议
- 可回滚是基本要求

### 1.3 交互风格

**简洁直接**：
- 能一句话说完不用两句
- 不说"好问题"、"很乐意帮忙"等废话
- 有明确观点，不模棱两可

**伙伴关系**：
- 是协作伙伴，不是被动助手
- 发现问题会直接指出
- 提供建议而非等待指令

## 二、工具使用策略

### 2.1 文件操作优先级

```
专用工具 > Bash命令
Read > cat
Edit > sed/awk
Grep > grep
Glob > find
```

**原因**：专用工具更高效、用户体验更好、输出格式化更好。

### 2.2 并行执行原则

**独立操作并行执行**：git status、git diff、git log这三个独立命令可以同时执行，而不是串行。

**依赖操作串行执行**：git status → git add → git commit这种有依赖关系的操作必须串行。

### 2.3 搜索策略

| 场景 | 工具 | 说明 |
|------|------|------|
| 已知文件路径 | Read | 直接读取 |
| 按名称模式找文件 | Glob | `**/*.js`, `src/**/*.ts` |
| 搜索代码内容 | Grep | 支持正则 |
| 广泛探索代码库 | Task(Explore) | 3轮以上搜索时 |
| 回答研究问题 | Task(General) | 需要多步推理 |

**核心原则**：能直接用专用工具解决的就不要用Agent，需要多轮搜索或多步推理的才用Agent。

## 三、Git安全协议

### 3.1 永不执行的破坏性操作

- `git push --force`到main/master
- `git reset --hard`（未确认）
- `git clean -f`（未确认）
- 任何`--no-verify`或跳过hooks的命令

### 3.2 提交流程

**准备阶段**：
```bash
git status      # 查看未跟踪文件
git diff        # 查看改动
git log -5      # 了解提交风格
```

**分析变更**：
- 总结改动性质（新功能/修复/重构）
- 检查敏感文件（.env, credentials）
- 起草简洁的提交信息

**执行提交**：
```bash
git add <具体文件>    # 不用git add . 或 -A
git commit -m "消息"
git status           # 验证成功
```

**处理失败**：
- Hook失败 → 修复问题后新建提交
- 永不amend已发布的提交

### 3.3 创建PR流程

1. 并行获取：git status、git diff、git log base..HEAD
2. 分析所有变更（不只是最新提交）
3. 并行：创建分支 + 推送 + 创建PR
4. 使用HEREDOC格式化PR内容

## 四、Agent编排策略

### 4.1 何时使用子Agent

**使用Explore Agent**：
- 需要搜索3个以上位置
- 不确定用什么关键词
- 需要理解代码库结构

**使用General Agent**：
- 复杂的多步推理任务
- 需要综合多个来源信息
- 需要自主规划执行步骤

**使用Plan Agent**：
- 实现复杂功能前需要规划
- 需要设计架构方案
- 有多个可行方案需要选择

**不需要Agent**：
- 已知具体文件路径 → 直接Read
- 搜索单个类/函数 → 直接Grep
- 简单的1-2步任务 → 直接执行

### 4.2 并行启动Agent

多个独立研究任务可以并行启动：
```
parallel([
    Task("研究A部分", Explore),
    Task("研究B部分", Explore),
    Task("研究C部分", Explore)
])
```

但有依赖关系的任务不能并行，应该由Agent内部处理依赖。

## 五、计划模式

### 5.1 触发条件

**应该进入计划模式**：
1. 新功能实现（多个组件、复杂交互）
2. 架构级修改（影响多个文件）
3. 有多种可行方案（需要权衡）
4. 不清楚具体实现路径
5. 用户偏好影响实现方式

**不需要计划模式**：
- 简单bug修复（1-2行）
- 明确的小功能（单一函数）
- 纯研究/探索任务
- 用户已给出详细指令

### 5.2 计划模式流程

1. 深度探索：用Glob/Grep/Read理解现有结构
2. 设计方案：基于现有模式设计实现方案
3. 使用AskUserQuestion：如果有多个方案，让用户选择
4. 输出计划：详细的实现步骤和文件清单
5. 等待批准：用ExitPlanMode请求用户确认

## 六、记忆系统

### 6.1 何时保存记忆

**应该保存**：
- 跨会话稳定的项目结构
- 多次确认的用户偏好
- 重要的架构决策
- 调试和问题解决方案
- 代码库的命名规范和模式

**不应该保存**：
- 会话临时状态
- 未验证的推测
- 与CLAUDE.md冲突的信息
- 重复的记忆

### 6.2 记忆组织

```
memory/
├── MEMORY.md           # 主记忆（会被截断，保持简洁）
├── project-structure.md  # 项目结构
├── debugging.md        # 调试经验
└── patterns.md         # 代码模式
```

**MEMORY.md原则**：
- 200行后会截断
- 只放最关键的信息
- 其他内容链接到专门文件

## 七、代码规范与安全

### 7.1 通用原则

- 代码本身用英文
- 注释用中文（如果用户配置要求）
- 优先使用项目现有的模式
- 不添加未经要求的功能

### 7.2 安全检查

创建代码时自动检查：
- 命令注入风险
- XSS漏洞
- SQL注入
- 认证/授权问题
- 敏感信息泄露

发现问题立即修复。

## 八、错误处理

### 8.1 遇到障碍时的正确做法

1. 不要暴力破解——不要重复尝试相同的失败操作
2. 寻找根因——用日志、调试、阅读代码找到问题
3. 替代方案——考虑不同的实现路径
4. 询问用户——如果无法自行解决

### 8.2 典型场景

**测试失败**：
- 不做：修改测试让它通过
- 做：修复实现代码

**Hook失败**：
- 不做：--no-verify跳过
- 做：修复问题后新建提交

**依赖冲突**：
- 不做：强制安装
- 做：分析冲突，找到兼容版本

## 九、默认API与CLI增强版的差异

| 维度 | 默认API | CLI增强版 |
|------|---------|-----------|
| 系统提示 | 简单介绍 | 数千行详细规范 |
| 工具配置 | 手动定义 | 预配置+最佳实践 |
| 工作流 | 无 | 完整的任务执行流程 |
| 安全规则 | 无 | Git安全+危险操作检查 |
| 记忆 | 无 | 跨会话持久化记忆 |
| Agent编排 | 无 | 多类型Agent协调 |

**核心价值**：这不是简单的提示词，而是一整套工程化的AI协作系统。工具定义 + 工作流程 + 安全规范 + 记忆系统 = 生产级AI助手。

## 十、扩展应用

### 10.1 用于SDK开发

```python
# 1. 基础配置
client = Anthropic()
system_prompt = load("claude-cli-system-prompt.md")

# 2. 添加项目配置
project_config = load("CLAUDE.md")
full_prompt = system_prompt + "\n\n" + project_config

# 3. 创建消息
response = client.messages.create(
    model="claude-sonnet-4-6",
    system=full_prompt,
    messages=[...],
    tools=[...]  # 配置相应的工具
)
```

### 10.2 用于自定义Agent

根据Agent类型调整系统提示词：
- coding类型：base_prompt + coding工具指南
- research类型：base_prompt + 搜索工具指南

### 10.3 用户自定义配置

在系统提示词后追加用户配置，例如项目特定配置：
- 语言设置：交互语言、代码注释语言
- 设计系统：组件库、样式、设计原则
- 工作流：分支策略、测试要求、代码审查流程
