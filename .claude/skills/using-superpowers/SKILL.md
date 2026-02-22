---
name: using-superpowers
description: 会话启动必读 — 建立如何查找和使用skills的规则，要求在ANY回应之前（包括澄清问题）必须先检查相关Skill
---

## 核心规则（强制执行）

**如果你认为有 1% 的可能性某个 skill 适用于你正在做的事情，你绝对必须调用它。**

**如果有 skill 适用于你的任务，你没有选择。你必须使用它。**

- 这是不可协商的
- 这不是可选的
- 你不能通过理性化来逃避这个规则

---

## 如何访问 Skills

**在 Claude Code 中：**
使用 `Skill` 工具。当你调用一个 skill 时，它的内容会被加载并呈现给你 — 直接遵循它。**永远不要**对 skill 文件使用 Read 工具。

**在其他环境中：**
查看你平台的文档了解如何加载 skills。

---

## 使用 Skills 的流程

```
用户消息收到 → 可能有 skill 适用吗？
                          ↓
           ┌──────────────┴──────────────┐
           │                             │
          是（哪怕1%）                   否
           ↓                             ↓
      调用 Skill 工具              回应（包括澄清）
           ↓
   宣布："使用 [skill] 来 [目的]"
           ↓
    有检查清单吗？
           ↓
    ┌──────┴──────┐
   是              否
    ↓              ↓
创建 TodoWrite    严格遵循
每项 todo
    ↓
  严格遵循
```

---

## 🚩 红旗：这些想法意味着 STOP — 你在理性化

| 你的想法 | 现实 |
|---------|------|
| "这只是个简单问题" | 问题也是任务。检查 skill。 |
| "我需要更多上下文" | Skill 检查先于澄清问题。 |
| "让我先探索代码库" | Skill 告诉你如何探索。先检查。 |
| "我可以快速检查 git/文件" | 文件缺少对话上下文。先检查 skill。 |
| "让我先收集信息" | Skill 告诉你如何收集信息。先检查。 |
| "这不需要正式 skill" | 如果有 skill 存在，就用它。 |
| "我记得这个 skill" | Skill 会演进。读当前版本。 |
| "这不算任务" | 行动 = 任务。检查 skill。 |
| "这个 skill 是大材小用" | 简单会变复杂。用它。 |
| "我就先做这一件事" | 做任何事之前先检查。 |
| "这感觉很有生产力" | 无纪律的行动浪费时间。Skill 防止这个。 |
| "我知道这意味着什么" | 知道概念 ≠ 使用 skill。调用它。 |

---

## Skill 优先级

当多个 skills 可能适用时，使用这个顺序：

1. **流程 skills 优先** (brainstorming, systematic-debugging)
   - 这些决定如何处理任务

2. **实施 skills 其次** (senior-frontend, mcp-builder)
   - 这些指导执行

**示例**：
- "让我们构建 X" → brainstorming 先，然后实施 skills
- "修复这个 bug" → systematic-debugging 先，然后领域特定 skills

---

## Skill 类型

**刚性** (tdd-strict, systematic-debugging)：严格遵守。不要通过纪律适应。

**灵活** (frontend-patterns, ux-designer)：根据上下文适应原则。

Skill 本身会告诉你它是哪种类型。

---

## 用户指令

指令说 **什么**，不说 **如何**。

"添加 X" 或 "修复 Y" 不意味着跳过工作流。

---

## 与 Hook 系统的关系

**using-superpowers** 是"内化原则" — 我应该主动检查适用 skills

**Hook 自动激活系统** 是"外部触发" — 特定场景自动提醒

两者互补：
- Hook 提醒场景相关 skills（调试、前端、测试等）
- using-superpowers 要求我主动检查，不依赖 Hook

**冲突时优先级**：using-superpowers > Hook
- Hook 是辅助提醒
- using-superpowers 是强制规则

---

## 最后提醒

**每次收到请求时自查**：
1. 这是什么类型的请求？
2. 有相关的 skill 吗？
3. 哪怕 1% 可能性，调用它

**这不是负担。这是纪律。**
