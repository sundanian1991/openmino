---
input: 无
output: Agentic Loops 使用指南
pos: memory/active/tasks/test-suites/GETTING-STARTED.md
---

# Agentic Loops 快速入门指南

> **今天就开始用** — 从供应商评分计算开始

---

## 5 分钟快速开始

### Step 1: 了解 Spec-Driven 工作流

**核心思想**：先写 Spec（需求规格），再拆解测试，最后让 AI 循环实现。

```
写 Spec → 拆测试 → AI 循环 → 人类验收
```

**对应技能**：`.claude/skills/spec-driven/SKILL.md`

---

### Step 2: 看示例 — 供应商评分计算

**目录**：`memory/active/tasks/test-suites/supplier-evaluation/`

```
supplier-evaluation/
├── spec.md                      # Spec 文档
├── test-cases.md                # 测试用例
├── implementation/
│   ├── supplier-evaluation.ts   # 实现代码
│   └── supplier-evaluation.test.ts  # 测试代码
└── validation.sh                # 验证脚本
```

**阅读顺序**：
1. `spec.md` — 看业务规则怎么定义
2. `test-cases.md` — 看测试用例怎么拆解
3. `implementation/` — 看 AI 怎么实现

---

### Step 3: 复制模板开始你的第一个 Spec

```bash
# 复制模板
cp -r memory/active/tasks/test-suites/TEMPLATE \
       memory/active/tasks/test-suites/my-first-feature
```

**然后**：
1. 编辑 `spec.md` — 填写你的需求
2. 编辑 `test-cases.md` — 拆解测试用例
3. 说：`/skill tdd-agentic` — 让 AI 实现

---

## 核心机制总览

| 机制 | 位置 | 用途 |
|------|------|------|
| **spec-driven** | `.claude/skills/spec-driven/` | 写 Spec + 拆解测试 |
| **tdd-agentic** | `.claude/skills/tdd-agentic/` | 基于测试实现 |
| **agentic-orchestration** | `.claude/skills/agentic-orchestration/` | 多 Agent 协同 |
| **agentic-loop-hook** | `.claude/hooks/agentic-loop-hook.js` | 验证门禁 |
| **test-suites** | `memory/active/tasks/test-suites/` | 测试用例库 |

---

## 工作流全景图

```
┌─────────────────────────────────────────────────────────┐
│ 1. 需求 → spec-driven → Spec 文档                        │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Spec → spec-driven → 测试用例                         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 3. 验证 → agentic-loop-hook → 检查前置条件               │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 4. 实现 → tdd-agentic → AI 循环编码                       │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 5. 审查 → requesting-code-review → 代码审查              │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 6. 验收 → Human (年老师) → 最终验收                       │
└─────────────────────────────────────────────────────────┘
```

---

## 命令速查

### 验证前置条件

```bash
# 验证任务是否可以启动 AI 循环
node .claude/hooks/agentic-loop-hook.js validate [任务名]

# 示例
node .claude/hooks/agentic-loop-hook.js validate supplier-evaluation
```

### 初始化新任务

```bash
# 创建 Spec + 测试用例模板
node .claude/hooks/agentic-loop-hook.js init [任务名]

# 示例
node .claude/hooks/agentic-loop-hook.js init risk-alert
```

### 运行验证脚本

```bash
# 验证 Plan + Agentic Loop
./scripts/verify-plan.sh agentic [任务名]
```

---

## 常见场景

### 场景 1：新功能开发

```
1. /skill spec-driven → 写 Spec
2. /skill spec-driven → 拆测试
3. node agentic-loop-hook.js validate [任务名] → 验证
4. /skill tdd-agentic → AI 实现
5. /skill requesting-code-review → 审查
6. 人类验收
```

### 场景 2：复杂任务（多模块）

```
1. /skill agentic-orchestration → 多 Agent 协同
   - Spec Agent → 写 Spec
   - Test Agent → 拆测试
   - Code Agent A/B/C → 并行编码
   - Review Agent → 审查
2. 人类验收
```

### 场景 3：业务规则变更

```
1. 更新 spec.md → 修改业务规则
2. 更新 test-cases.md → 补充/修改测试
3. /skill tdd-agentic → AI 重新实现
4. 跑测试 → 验证通过
```

---

## 最佳实践

### ✅ 建议这样做

| 实践 | 说明 |
|------|------|
| **Spec 优先** | 不写 Spec 不写代码 |
| **一规则一测试** | 每条业务规则对应至少一个测试 |
| **边界测试** | 边界条件必须测试 |
| **审查不可少** | AI 实现后必须审查 |
| **版本绑定** | Spec 版本与测试用例版本绑定 |

### ❌ 避免这样做

| 反模式 | 风险 |
|--------|------|
| 跳过 Spec 直接写代码 | AI 不理解需求，反复修改 |
| 测试覆盖不全 | 边缘情况漏测，生产出 bug |
| 不审查 AI 代码 | 可能有过拟合测试的代码 |
| Spec 变更不同步测试 | 测试与实际行为不一致 |

---

## 成功案例

### 供应商评分计算（已完成）

- **Spec**: 5 条业务规则、4 个边界条件
- **测试**: 12 个测试用例（8 正常 +4 边界）
- **实现**: 5 个函数、100% 测试覆盖
- **时间**: AI 循环实现 ~15 分钟

---

## 下一步

### 本周任务

1. ✅ Spec-Driven 工作流（已完成）
2. ✅ 测试用例库模板（已完成）
3. ✅ 供应商评分计算示例（已完成）
4. ⚪ 风险预警测试集（待建）
5. ⚪ Dashboard KPI 测试集（待建）

### 选一个开始

**选项 A：风险预警测试集**
- 规则：连续 2 季度 KPI<60 → 黄色预警
- 规则：合规违规 → 红色预警
- 边界：数据缺失怎么处理

**选项 B：Dashboard KPI 测试集**
- 规则：16 项 KPI 计算公式
- 规则：数据聚合逻辑
- 边界：空数据、异常值

**说"选项 A"或"选项 B"，我们开始。**

---

## 需要帮助

| 问题 | 解决方案 |
|------|---------|
| Spec 写不细 | 参考 `supplier-evaluation/spec.md` |
| 测试不会拆 | 参考 `supplier-evaluation/test-cases.md` |
| AI 实现不对 | 检查 Spec 是否有歧义 |
| 测试总失败 | 检查测试用例预期是否正确 |

**或说**：`帮我看下 [具体问题]`

---

*Spec 是源代码，代码是生成物。今天就开始用。*
