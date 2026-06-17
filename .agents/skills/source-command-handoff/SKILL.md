---
name: "source-command-handoff"
description: "将当前对话压缩为接力文档，供新 Agent 续接"
---

# source-command-handoff

Use this skill when the user asks to run the migrated source command `handoff`.

## Command Template

# handoff — 会话接力

> 把当前对话的上下文打包成文档，存到 OS 临时目录，让下一个 Agent 读取后无缝继续。

## 执行流程

### Step 1: 确认范围
确认整段对话是否都需要压缩，还是只需要某个子话题。默认全量。

### Step 2: 压缩内容
提取关键信息：
- 核心内容与已达成共识
- 待办事项（责任人 + DDL）
- 关键决策与推理依据
- 未解决的问题 / 卡点

### Step 3: 补充索引
- 列出建议技能章节（新 Agent 应调用的技能）
- 引用已有 artifacts（PRD / Plan / ADR / Issue / Commit / Diff），**只写路径/URL，不重复内容**
- 标记已脱敏项

### Step 4: 脱敏
自动扫描并脱敏：
- API Key / Token
- 密码 / 密钥
- PII（身份证、手机号、邮箱等）
- 内部敏感链接

### Step 5: 写文件
写入两个位置：
1. OS 临时目录（`/tmp/`），文件名为 `handoff-主题-YYYYMMDD.md`
2. 固定路径 `~/.myagents/handoff/latest.md`（自动覆盖）

**不写入工作区。**

## 约束

- 不重复已有 artifacts 的内容，只引用路径
- 输出单个 .md 文件
- 脱敏标记格式：`[已脱敏：类型 x N]`
- 如果用户传了参数，将其作为下 session 的聚焦方向定制文档

## 新会话续接

在新对话中说一句：
> 读 handoff 继续

Agent 会自动读取 `~/.myagents/handoff/latest.md` 恢复上下文。
