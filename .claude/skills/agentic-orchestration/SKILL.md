---
input: 复杂任务（Spec + 测试用例）
output: 多 Agent 协同执行结果
pos: .claude/skills/agentic-orchestration/SKILL.md
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

## Agent 角色与职责

```
┌─────────────────────────────────────────────────────────┐
│                    Human (年老师)                        │
│                     最终验收                            │
└─────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────┐
│                   Review Agent                          │
│                   代码审查 + 测试验证                    │
└─────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────┐
│                   Code Agent                            │
│                   编码实现                              │
└─────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────┐
│                   Test Agent                            │
│                   拆解测试用例                          │
└─────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────┐
│                   Spec Agent                            │
│                   写 Spec + 验收标准                     │
└─────────────────────────────────────────────────────────┘
```

---

## Agent 角色详解

### Spec Agent

**职责**：
- 理解需求
- 写 Spec（功能目标、输入输出、业务规则）
- 定义验收标准

**激活技能**：`spec-driven`

**产出**：
```markdown
# [功能] Spec

## 功能目标
...

## 业务规则
1. ...
2. ...

## 验收标准
- [ ] ...
```

---

### Test Agent

**职责**：
- 读 Spec
- 拆解测试用例（一规则一测试）
- 定义预期输入/输出

**激活技能**：`spec-driven` + `testing-patterns`

**产出**：
```markdown
## 测试用例清单

| 编号 | 名称 | 对应规则 | 输入 | 预期输出 |
|------|------|----------|------|----------|
| TC-001 | ... | 规则 1 | ... | ... |
```

---

### Code Agent

**职责**：
- 读 Spec + 测试用例
- 实现功能（TDD 循环）
- 确保测试通过

**激活技能**：`tdd-agentic`

**产出**：
```typescript
// 实现代码
export function evaluateSupplier(data: SupplierData): EvaluationResult {
  // ...
}
```

---

### Review Agent

**职责**：
- 代码审查（逻辑正确性、可读性）
- 验证测试覆盖率
- 提出改进建议

**激活技能**：`requesting-code-review`

**产出**：
```markdown
## 代码审查报告

### ✅ 优点
- ...

### ⚠️ 建议改进
- ...

### ❌ 必须修复
- ...
```

---

## 编排模式

### 模式 1：串行编排（强依赖）

```
Spec Agent → Test Agent → Code Agent → Review Agent → Human
```

**适用场景**：
- 任务步骤有强依赖
- 前一步输出 = 后一步输入
- 需要质量保证

**执行时间**：较长（顺序执行）
**质量保证**：高（每步有验证）

---

### 模式 2：并行编排（独立子任务）

```
              ┌→ Agent A (模块 A) ┐
Spec Agent →  ├→ Agent B (模块 B) ├→ Integration
              └→ Agent C (模块 C) ┘
```

**适用场景**：
- 任务可拆分为独立子任务
- 多模块可并行开发
- 时间敏感

**执行时间**：较短（并行执行）
**质量保证**：中（需要集成测试）

---

### 模式 3：混合编排（推荐）

```
阶段 1（串行）: Spec → Test
      ↓
阶段 2（并行）: Code Agent A + Code Agent B
      ↓
阶段 3（串行）: Review → Human
```

**适用场景**：大多数复杂任务

**优势**：
- 前期保证方向正确
- 中期并行提高效率
- 后期保证质量

---

## 执行流程

### Step 1: 任务分析

**输入**：用户需求

**分析维度**：
- 任务复杂度（步骤数、依赖关系）
- 质量要求（是否需要严格审查）
- 时间要求（是否需要并行加速）

**输出**：编排模式选择

---

### Step 2: Agent 委派

**委派前声明**：
```markdown
【并行任务】[任务名]

- Spec Agent: 写 Spec 文档 — 预期 [输出]
- Test Agent: 拆解测试用例 — 预期 [输出]
- Code Agent: 实现功能 — 预期 [输出]
- Review Agent: 代码审查 — 预期 [输出]

→ 执行模式：[串行/并行/混合]
→ 预计时间：X 分钟
```

---

### Step 3: 过程追踪

**实时更新进度**：
```markdown
【进度】
→ Spec Agent: ✅ 完成
→ Test Agent: ✅ 完成
→ Code Agent: 🔄 进行中 (50%)
→ Review Agent: ⏳ 等待中
```

---

### Step 4: 结果聚合

**汇总各 Agent 产出**：
```markdown
【执行结果】

### Spec Agent 产出
[Spec 文档链接/摘要]

### Test Agent 产出
[测试用例链接/摘要]

### Code Agent 产出
[实现代码链接/摘要]

### Review Agent 产出
[审查报告链接/摘要]
```

---

### Step 5: 人类验收

**验收清单**：
- [ ] Spec 清晰完整
- [ ] 测试覆盖核心规则
- [ ] 代码通过审查
- [ ] 测试全部通过
- [ ] 符合业务预期

---

## 案例：供应商评分系统

### 任务分析

**需求**：实现供应商评分系统

**复杂度**：高（多条规则、边界处理）
**质量要求**：高（影响业务决策）
**时间要求**：中

**编排模式**：混合编排

---

### 执行计划

```
阶段 1（串行）:
  Spec Agent → 写供应商评分 Spec
  Test Agent → 拆解测试用例

阶段 2（并行）:
  Code Agent A → 实现评分逻辑
  Code Agent B → 实现等级判定
  Code Agent C → 实现风险标识

阶段 3（串行）:
  Review Agent → 代码审查
  Human → 最终验收
```

---

### 委派声明

```markdown
【并行任务】供应商评分系统

**阶段 1: Spec + Test**
- Spec Agent: 写供应商评分 Spec — 预期 [功能目标、业务规则、输入输出]
- Test Agent: 拆解测试用例 — 预期 [10+ 测试用例，覆盖所有规则]

**阶段 2: 编码（并行）**
- Code Agent A: 实现综合得分计算 — 预期 [calculateScore 函数]
- Code Agent B: 实现等级判定逻辑 — 预期 [calculateGrade 函数]
- Code Agent C: 实现风险标识逻辑 — 预期 [calculateRisk 函数]

**阶段 3: 审查 + 验收**
- Review Agent: 代码审查 — 预期 [审查报告]
- Human: 最终验收

→ 执行模式：混合编排
→ 预计时间：30 分钟
```

---

### 进度追踪

```markdown
【进度】2026-02-28 15:30

**阶段 1: Spec + Test**
→ Spec Agent: ✅ 完成
   - Spec 文档：memory/active/tasks/test-suites/supplier-evaluation/spec.md
   - 包含：4 条业务规则、3 个边界条件

→ Test Agent: ✅ 完成
   - 测试用例：12 个
   - 覆盖：所有规则 + 边界 + 错误处理

**阶段 2: 编码**
→ Code Agent A: 🔄 进行中 (80%)
→ Code Agent B: ⏳ 等待中
→ Code Agent C: ⏳ 等待中

**阶段 3: 审查 + 验收**
→ Review Agent: ⏳ 等待中
→ Human: ⏳ 等待中
```

---

### 结果汇总

```markdown
【执行结果】2026-02-28 16:00

### Spec Agent 产出
- Spec 文档：[链接](memory/active/tasks/test-suites/supplier-evaluation/spec.md)
- 4 条业务规则、3 个边界条件

### Test Agent 产出
- 测试用例：[链接](memory/active/tasks/test-suites/supplier-evaluation/test-cases.md)
- 12 个测试用例，覆盖所有规则

### Code Agent 产出
- 实现代码：[链接](src/evaluation/supplier.ts)
- 3 个函数：calculateScore, calculateGrade, calculateRisk
- 测试通过率：100%

### Review Agent 产出
- 审查报告：[链接](memory/reviews/supplier-evaluation-review.md)
- 建议：2 个（已修复）
- 必须修复：0 个

### 最终验收
- [x] Spec 清晰完整
- [x] 测试覆盖核心规则
- [x] 代码通过审查
- [x] 测试全部通过
- [ ] 符合业务预期 → 待 Human 确认
```

---

## 最佳实践

### 1. 委派前明确预期

```markdown
❌ 坏：让 Agent"实现功能"
✅ 好：明确"实现 X 函数，输入 Y，输出 Z，通过 N 个测试"
```

### 2. 并行任务独立边界

```markdown
❌ 坏：Agent A 和 Agent B 修改同一文件
✅ 好：Agent A 修改 fileA.ts，Agent B 修改 fileB.ts
```

### 3. 设置检查点

```markdown
✅ 好：阶段 1 完成后，暂停确认，再进入阶段 2
❌ 坏：一口气执行完，发现问题从头来
```

### 4. 审查不可少

```markdown
✅ 好：Code Agent 完成后，Review Agent 审查
❌ 坏：直接交付 Human 验收
```

---

## 常见问题

### Q: 什么时候用多 Agent？

**A**: 任务有 5+ 步骤，或需要多个专业领域（Spec + Test + Code + Review）。

### Q: 多 Agent 会更慢吗？

**A**: 串行模式会更慢（步骤多），但并行模式可以显著加速（独立子任务）。

### Q: 怎么保证多 Agent 输出一致？

**A**: 通过 Spec 统一语言，通过 Review 统一质量。

---

## 与其他技能配合

| 技能 | 配合方式 |
|------|---------|
| **spec-driven** | Spec Agent 使用 |
| **tdd-agentic** | Code Agent 使用 |
| **requesting-code-review** | Review Agent 使用 |
| **testing-patterns** | Test Agent 使用 |

---

## 成功标志

- ✅ 任务拆解清晰
- ✅ Agent 职责明确
- ✅ 过程可追踪
- ✅ 结果可验收

---

*复杂任务拆解，多 Agent 协同，人类监督验收。*
