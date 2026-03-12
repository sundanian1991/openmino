---
name: agentic-orchestration
description: |
  复杂任务拆解，多 Agent 并行，人类监督验收。当遇到 5+ 步骤的复杂任务、多模块开发、大规模重构、
  数据迁移等需要多 Agent 协同的场景时触发。即使没有明确说"用多 Agent"，只要任务复杂、步骤繁多、
  需要并行加速或质量保证，就应该使用此技能进行编排。
---

# Agentic Orchestration 技能

> **核心理念**：复杂任务拆解，多 Agent 并行，人类监督验收。

---

## 何时激活

- ✅ 复杂任务（5+ 步骤，多依赖）
- ✅ 多模块开发（前后端 + 测试）
- ✅ 大规模重构（多文件联动）
- ✅ 数据迁移（ETL 多阶段）
- ⚠️ 简单任务 → 单 Agent 即可

---

## Agent 角色概览

| 角色 | 职责 | 激活技能 |
|------|------|---------|
| **Spec Agent** | 理解需求、写 Spec、验收标准 | `spec-driven` |
| **Test Agent** | 拆解测试用例、定义预期输入/输出 | `spec-driven` + `testing-patterns` |
| **Code Agent** | 实现功能（TDD 循环） | `tdd-agentic` |
| **Review Agent** | 代码审查、验证测试覆盖率 | `requesting-code-review` |

---

## 编排模式

### 模式 1：串行编排（强依赖）

```
Spec Agent → Test Agent → Code Agent → Review Agent → Human
```

**适用场景**：前一步输出=后一步输入，需要质量保证

---

### 模式 2：并行编排（独立子任务）

```
              ┌→ Agent A (模块 A) ┐
Spec Agent →  ├→ Agent B (模块 B) ├→ Integration
              └→ Agent C (模块 C) ┘
```

**适用场景**：任务可拆分为独立子任务，时间敏感

---

### 模式 3：混合编排（推荐）

```
阶段 1（串行）: Spec → Test
      ↓
阶段 2（并行）: Code Agent A + Code Agent B
      ↓
阶段 3（串行）: Review → Human
```

**优势**：前期方向正确，中期提高效率，后期保证质量

---

## 核心工作流

### Step 1: 任务分析

**分析维度**：
- 任务复杂度（步骤数、依赖关系）
- 质量要求（是否需要严格审查）
- 时间要求（是否需要并行加速）

**输出**：编排模式选择

---

### Step 2: 委派声明

```markdown
【并行任务】[任务名]

**阶段 1: Spec + Test**
- Spec Agent: [职责] — 预期 [输出]
- Test Agent: [职责] — 预期 [输出]

**阶段 2: 编码（并行）**
- Code Agent A: [职责] — 预期 [输出]

**阶段 3: 审查 + 验收**
- Review Agent: [职责] — 预期 [输出]
- Human: 最终验收

→ 执行模式：[串行/并行/混合]
→ 预计时间：X 分钟
```

---

### Step 3: 过程追踪

```markdown
【进度】
→ Spec Agent: ✅ 完成
→ Test Agent: ✅ 完成
→ Code Agent: 🔄 进行中 (50%)
→ Review Agent: ⏳ 等待中
```

---

### Step 4: 结果聚合

汇总各 Agent 产出（Spec 文档、测试用例、实现代码、审查报告）

---

### Step 5: 人类验收

- [ ] Spec 清晰完整
- [ ] 测试覆盖核心规则
- [ ] 代码通过审查
- [ ] 测试全部通过
- [ ] 符合业务预期

---

## 最佳实践

1. **委派前明确预期** — 明确"实现 X 函数，输入 Y，输出 Z"
2. **并行任务独立边界** — Agent A 和 B 修改不同文件
3. **设置检查点** — 阶段 1 完成后，暂停确认，再进入阶段 2
4. **审查不可少** — Code Agent 完成后，Review Agent 审查

---

## 详细文档

- [Agent 角色详解](references/agent-roles.md)
- [编排模式详解](references/orchestration-patterns.md)
- [案例研究](references/case-studies.md)

---

*复杂任务拆解，多 Agent 协同，人类监督验收。*
