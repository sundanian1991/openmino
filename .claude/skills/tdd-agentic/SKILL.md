---
input: Spec + 测试用例
output: 通过测试的实现代码
pos: .claude/skills/tdd-agentic/SKILL.md
---

# TDD-Agentic 技能

> **核心理念**：测试是验收标准，代码是实现物。

---

## 与 tdd-strict 的区别

| 维度 | tdd-strict | tdd-agentic |
|------|-----------|-------------|
| **适用场景** | 纯代码开发 | 业务规则实现 |
| **测试优先级** | 测试必须先写 | 实现前必须有验收标准 |
| **测试类型** | 单元测试 | 业务场景测试 |
| **覆盖率要求** | 80%+ | 核心规则覆盖 |
| **语言** | 德语 | 中文 |
| **严格度** | 严格 | 灵活 |

**选择指南**：
- 写算法/工具函数 → `tdd-strict`
- 实现业务规则/数据处理 → `tdd-agentic`

---

## 何时激活

- ✅ 基于 Spec 实现功能
- ✅ 业务规则编码
- ✅ 数据处理逻辑
- ✅ 已有测试用例，需要实现
- ⚠️ 没有 Spec/测试 → 先用 `spec-driven`

---

## 工作流

```
┌─────────────────┐
│  读 Spec         │ → 理解功能目标和业务规则
└────────┬────────┘
         ↓
┌─────────────────┐
│  读测试用例     │ → 理解验收标准
└────────┬────────┘
         ↓
┌─────────────────┐
│  写最小实现      │ → 让第一个测试通过
└────────┬────────┘
         ↓
┌─────────────────┐
│  跑测试          │ → 验证是否通过
└────────┬────────┘
         ↓
      通过？
     ╱     ╲
   是       否
   ↓        ↓
 下一个  修复实现
 测试      ↓
        回到跑测试
```

---

## 执行步骤

### Step 1: 读 Spec

**目标**：理解功能要解决什么问题

**关注点**：
- 功能目标是什么？
- 输入/输出是什么？
- 有哪些业务规则？
- 边界条件是什么？

**输出**：对功能的整体理解

---

### Step 2: 读测试用例

**目标**：理解验收标准

**关注点**：
- 有多少个测试用例？
- 每个测试的输入/预期输出是什么？
- 覆盖了哪些规则和边界？

**输出**：测试清单

---

### Step 3: 写最小实现

**原则**：写最简单的代码，让第一个测试通过

**示例**：
```typescript
// 测试：输入 90 分 → 返回 'A'
// 最小实现：
function calculateGrade(score: number): string {
  if (score >= 90) return 'A';
  return 'B'; // 先不管其他情况
}
```

**禁忌**：
- ❌ 一次性实现所有逻辑
- ❌ 过度设计（提前考虑扩展性）
- ❌ 处理还没测试的边界

---

### Step 4: 跑测试

**方式**：
- 自动化测试 → `npm run test`
- 人工验证 → 手动执行测试步骤

**通过** → 进入 Step 6
**失败** → 进入 Step 5

---

### Step 5: 修复实现

**根据错误信息修复**：
```
错误：期望 'A' 但收到 'B'
↓
修复：调整条件判断
↓
回到 Step 4
```

**常见问题**：
- 条件判断错误 → 调整逻辑
- 边界处理遗漏 → 补充判断
- 计算错误 → 修正公式

---

### Step 6: 下一个测试

重复 Step 3-5，直到所有测试通过

---

## 代码质量标准

即使测试通过，也要保证：

| 标准 | 说明 |
|------|------|
| **可读** | 变量命名清晰，逻辑易懂 |
| **可维护** | 函数职责单一，易于修改 |
| **无过度工程** | 不实现未测试的功能 |
| **符合规范** | 与现有代码风格一致 |

---

## 业务规则实现模式

### 模式 1：规则引擎

```typescript
// Spec: 多条规则，条件→结果
function evaluateSupplier(data: SupplierData): EvaluationResult {
  // 规则 1: 合规一票否决
  if (!data.isCompliant) {
    return { grade: 'D', risk: '高危', score: 0 };
  }

  // 规则 2: KPI 阈值
  if (data.kpiScore < 60) {
    return { grade: 'C', risk: '预警', score: data.kpiScore };
  }

  // 规则 3: 及时率惩罚
  if (data.ontimeRate < 0.8) {
    // 降级处理
  }

  // 规则 4: 综合得分
  const score = data.kpiScore * data.ontimeRate;

  return { grade: 'A', risk: '正常', score };
}
```

### 模式 2：数据转换

```typescript
// Spec: 输入 A → 转换 → 输出 B
function transformData(input: RawData): ProcessedData {
  // 清洗
  const cleaned = cleanData(input);

  // 转换
  const transformed = applyRules(cleaned);

  // 验证
  validate(transformed);

  return transformed;
}
```

### 模式 3：计算逻辑

```typescript
// Spec: 计算公式 + 边界处理
function calculateKPI(data: KPIData): number {
  // 边界检查
  if (data.values.length === 0) return 0;

  // 计算
  const sum = data.values.reduce((a, b) => a + b, 0);
  const avg = sum / data.weights.reduce((a, b) => a + b, 0);

  // 归一化
  return Math.max(0, Math.min(100, avg));
}
```

---

## 验收清单

实现完成后，确认：

- [ ] **所有测试通过**
- [ ] **代码可读**（变量命名清晰）
- [ ] **无硬编码**（配置与逻辑分离）
- [ ] **错误处理**（边界情况有处理）
- [ ] **注释适当**（复杂逻辑有说明）

---

## 与 spec-driven 配合

```
spec-driven → 输出：Spec + 测试用例
    ↓
tdd-agentic → 输入：Spec + 测试用例
    ↓
        输出：通过测试的实现代码
```

---

## 案例：供应商评分计算

### Spec（节选）

```markdown
## 业务规则
1. 合规一票否决：不合规 → D/高危
2. KPI<60 → C 或以下
3. 及时率<0.8 → 降级
```

### 测试用例（节选）

```markdown
TC-001: 合规 + 高 KPI → A/正常
TC-002: 不合规 → D/高危
TC-003: KPI<60 → C
```

### 实现

```typescript
function evaluateSupplier(data: SupplierData): EvaluationResult {
  // 规则 1: 合规一票否决
  if (!data.isCompliant) {
    return { grade: 'D', risk: '高危', score: 0 };
  }

  // 规则 2: KPI 阈值
  if (data.kpiScore < 60) {
    return { grade: 'C', risk: '预警', score: data.kpiScore };
  }

  // 规则 3: 及时率惩罚
  let grade = 'A';
  if (data.ontimeRate < 0.8) {
    grade = 'B'; // 降级
  }

  // 规则 4: 综合得分
  const score = data.kpiScore * data.ontimeRate;

  return { grade, risk: '正常', score };
}
```

---

## 常见陷阱

### 陷阱 1：过度实现

```typescript
// ❌ 坏：实现了还没测试的功能
function calculateGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B'; // 还没测试
  if (score >= 70) return 'C'; // 还没测试
  if (score >= 60) return 'D'; // 还没测试
  return 'F';
}

// ✅ 好：只实现当前测试需要的
function calculateGrade(score: number): string {
  if (score >= 90) return 'A';
  return 'B'; // 先让当前测试通过
}
```

### 陷阱 2：测试不覆盖

```typescript
// ❌ 坏：测试没覆盖边界
it('应该返回正确分数', () => {
  expect(calculateScore(90)).toBe(85.5);
});

// ✅ 好：覆盖边界
it('应该返回正确分数', () => {
  expect(calculateScore(90)).toBe(85.5);
});
it('KPI 为 0 时返回 0', () => {
  expect(calculateScore(0)).toBe(0);
});
it('KPI 超出范围抛错', () => {
  expect(() => calculateScore(101)).toThrow();
});
```

### 陷阱 3：忽略错误处理

```typescript
// ❌ 坏：没有边界检查
function calculateScore(kpi: number): number {
  return kpi * 0.95;
}

// ✅ 好：边界检查
function calculateScore(kpi: number): number {
  if (kpi < 0 || kpi > 100) {
    throw new Error('KPI 必须在 0-100 之间');
  }
  return kpi * 0.95;
}
```

---

## 成功标志

- ✅ 所有测试通过
- ✅ 代码可读、可维护
- ✅ 无过度工程
- ✅ 业务逻辑正确

---

*测试是验收标准，代码是实现物。*
