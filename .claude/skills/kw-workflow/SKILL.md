---
name: kw:workflow
description: 一键完整知识工作流 — 从头脑风暴到结构化交付到知识复利。触发词："完整分析这个问题"、"帮我梳理一下"、"知识工作流"、"深度分析"、"从零开始分析"、"kw-workflow"。
argument-hint: "[problem or topic to analyze]"
---

<problem_input> #$ARGUMENTS </problem_input>

# Compound Knowledge 完整工作流

一键启动从头脑风暴到知识沉淀的完整流程。适用于需要系统化分析的复杂问题。

你是一个**流程编排器**，不自己执行具体步骤。每步读对应子技能的 SKILL.md，按它的指令做，做完进下一步。

## 工作流

```
brainstorm → plan → [confidence?] → review → work → compound
```

**文件组织**：所有输出保存在 `plans/问题名-日期/` 下

---

## 执行流程

### Step 1: Brainstorm
读取 `kw-brainstorm` 技能，按它的指令做头脑风暴。输出 `00-brainstorm.md`。

完成后问用户是否继续。是 → Step 2。否 → 结束。

### Step 2: Plan
读取 `kw-plan` 技能，按它的指令制定研究计划。输出 `01-research.md`。

完成后自动进入 Step 3。

### Step 3: Confidence（可选）
只在以下情况执行：
- 用户明确要求评估
- 计划涉及高风险决策
- 用户在 Step 2 后说"先评估一下"

如果触发，读取 `kw-confidence` 技能执行。输出 `02-confidence.md`。

完成后自动进入 Step 4。未触发则直接跳过。

### Step 4: Review
读取 `kw-review` 技能，按它的指令做双重审查。输出 `03-review.md`。

完成后自动进入 Step 5。

### Step 5: Work
读取 `kw-work` 技能，按它的指令执行计划。产出写入 `02-workspace/`。

完成后自动进入 Step 6。

### Step 6: Compound
读取 `kw-compound` 技能，按它的指令沉淀知识。写入 `docs/knowledge/`。

完成后告知用户全部完成，给出产出摘要。

---

## 关键原则

### 自动推进
每步完成后自动进入下一步。用户可以在任何时候说"暂停"、"继续"、"跳到 X"。

### 渐进式披露
早期（Brainstorm→Plan）：理解问题、识别张力
中期（Confidence→Review）：评估风险、质量审查
后期（Work→Compound）：产出交付、沉淀知识

### Pipeline Mode
从自动化系统调用时，跳过所有确认，使用合理默认值，自动推进到完成。

---

## 对比：用 kw:workflow vs 用单个子技能

| 场景 | 用子技能 | 用 kw:workflow |
|------|---------|----------------|
| 快速头脑风暴 | `/kw:brainstorm` | ❌ 太重 |
| 只需要研究计划 | `/kw:plan` | ❌ 太重 |
| 完整分析复杂问题 | ❌ 需手动串联 | ✅ 一键完成 |
| 不确定从哪开始 | ❌ | ✅ 自动推进 |
