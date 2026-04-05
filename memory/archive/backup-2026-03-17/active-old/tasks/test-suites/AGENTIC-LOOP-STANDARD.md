---
input: Agentic Loop 能力需求
output: Agentic Loop 能力验证标准
pos: memory/active/tasks/test-suites/AGENTIC-LOOP-STANDARD.md
---

# Agentic Loop 能力验证标准

> **定义**：什么是一个完整、可用的 Agentic Loop 能力？

---

## 一、完整的 Agentic Loop 流程

```
需求 → Spec → 测试用例 → 验证前置条件 → AI 循环实现 → 代码审查 → 人类验收
```

---

## 二、每个环节的验证标准

### 1. Spec 文档（spec.md）

**必须包含**：
- [x] 功能目标（一句话描述）
- [x] 输入（字段、类型、必填、说明）
- [x] 输出（字段、类型、说明）
- [x] 业务规则（至少 1 条，格式：`### 规则 N：` 或 `**规则 N**:`）
- [x] 边界条件（至少 1 条）
- [x] 验收标准（测试用例清单）

**格式要求**：
- [x] 结构化表格（输入/输出）
- [x] Markdown 标题层级
- [x] 明确的规则编号

---

### 2. 测试用例（test-cases.md）

**必须包含**：
- [x] 测试用例清单（表格形式：编号、名称、对应规则、类型）
- [x] 至少 3 个正常流程测试（对应业务规则）
- [x] 至少 1 个边界条件测试
- [x] 每个测试有：输入、预期输出、执行方式

**格式要求**：
- [x] 编号：TC-XXX（正常流程）、BC-XXX（边界条件）
- [x] 输入/输出用代码块
- [x] 状态标记：⚪待执行 | 🟢通过 | 🔴失败

---

### 3. 验证门禁（agentic-loop-hook.js）

**必须能验证**：
- [x] Spec 文档存在
- [x] Spec 包含必需部分（功能目标、输入、输出、业务规则、验收标准）
- [x] Spec 包含至少 1 条业务规则
- [x] 测试用例文档存在
- [x] 测试用例数量 ≥ 1

**必须支持**：
- [x] `validate [taskName]` 命令
- [x] `init [taskName]` 命令
- [x] 清晰的错误信息和下一步建议

---

### 4. 实现能力

**必须包含**：
- [x] spec-driven 技能（写 Spec + 拆解测试）
- [x] tdd-agentic 技能（基于测试实现）
- [x] agentic-orchestration 技能（多 Agent 协同）
- [x] 测试用例库模板（TEMPLATE/）

---

### 5. 示例完整性

**供应商评分计算示例必须包含**：
- [x] spec.md（5 条规则 + 4 个边界）
- [x] test-cases.md（12 个测试）
- [x] implementation/supplier-evaluation.ts（实现代码）
- [x] implementation/supplier-evaluation.test.ts（测试代码）
- [x] validation.sh（验证脚本）

**风险预警示例必须包含**：
- [x] spec.md（5 条规则 + 3 个边界）
- [x] test-cases.md（10 个测试 + 2 个边界）
- [x] implementation/risk-alert.ts（实现代码）
- [x] implementation/risk-alert.test.ts（测试代码）
- [x] validation.sh（验证脚本）

---

## 三、验证命令

```bash
# 验证前置条件
node .claude/hooks/agentic-loop-hook.js validate [任务名]

# 初始化新任务
node .claude/hooks/agentic-loop-hook.js init [任务名]

# 运行测试
./memory/active/tasks/test-suites/[任务名]/validation.sh

# 完整验证
./scripts/verify-plan.sh agentic [任务名]
```

---

## 四、验证清单

### 自检清单（每次创建新能力后执行）

- [x] **Spec 文档**
  - [x] 功能目标清晰
  - [x] 输入/输出完整
  - [x] 业务规则 ≥ 1 条
  - [x] 边界条件 ≥ 1 条

- [x] **测试用例**
  - [x] 数量 ≥ 3 个正常流程
  - [x] 数量 ≥ 1 个边界条件
  - [x] 每个测试有输入/输出

- [x] **验证门禁**
  - [x] validate 命令工作正常
  - [x] init 命令工作正常
  - [x] 错误信息清晰

- [x] **技能**
  - [x] spec-driven 可用
  - [x] tdd-agentic 可用
  - [x] agentic-orchestration 可用

- [x] **示例**
  - [x] 供应商评分计算完整
  - [x] 风险预警示例完整
  - [x] 可通过验证脚本

---

## 五、版本历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v1.0 | 2026-02-28 | 初始版本 | Mino |
| v1.1 | 2026-02-28 | 验证通过，更新清单状态 | Mino |

---

## 验证结果（2026-02-28）

### 已验证能力

| 能力 | 验证结果 |
|------|----------|
| spec-driven 技能 | ✅ 可用 |
| tdd-agentic 技能 | ✅ 可用 |
| agentic-orchestration 技能 | ✅ 可用 |
| agentic-loop-hook 验证门禁 | ✅ 可用 |
| 供应商评分计算示例 | ✅ 完整 |
| 风险预警示例 | ✅ 完整 |

### 验证命令执行结果

```bash
# 验证供应商评分
node .claude/hooks/agentic-loop-hook.js validate supplier-evaluation
# ✅ Spec 5 条规则，测试用例 12 个

# 验证风险预警
node .claude/hooks/agentic-loop-hook.js validate risk-alert
# ✅ Spec 5 条规则，测试用例 12 个
```
