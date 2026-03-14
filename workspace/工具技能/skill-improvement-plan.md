# 技能库改进计划

**创建时间**: 2026-03-12
**审视标准**: skill-creator (最新版)
**技能总数**: 73 个独立技能

---

## 问题汇总

| 问题类型 | 影响技能数 | 优先级 |
|---------|-----------|--------|
| 描述过短（触发不足） | ~15 个 | P0 |
| SKILL.md 超长（>500 行） | 6 个 | P1 |
| INDEX.md 过期 | 1 个文件 | P0 |
| 缺少评估机制 | 全部 | P2 |
| 结构不完整 | ~20 个 | P1 |

---

## P0 改进（会话级影响）

### 1. 修复 INDEX.md

**问题**: 引用了 11 个不存在的技能，导致技能发现失效

**改进步骤**:
1. 扫描实际存在的技能目录
2. 删除不存在的技能引用
3. 更新分类结构

**预计时间**: 30 分钟

---

### 2. 优化短描述技能

**目标技能**（描述<100 字）:
- `managing-up` (33 行)
- `frontend-design` (42 行)
- `github` (52 行)
- `personal-productivity` (58 行)
- `behavioral-product-design` (60 行)
- `product-operations` (60 行)
- `systems-thinking` (65 行)
- `pricing-strategy` (67 行)
- `summarize` (68 行)
- `running-effective-meetings` (70 行)

**改进模板**（参考 skill-creator 新标准）:
```yaml
description: |
  [做什么] + [何时触发] + [pushy 触发提示]

  示例：
  Help users work effectively with their manager and executives.
  Use when someone is: (1) struggling with their manager relationship,
  (2) needs to influence leadership, (3) wants to get better at executive
  communication, or (4) trying to build trust with their boss.

  Make sure to use this skill whenever the user mentions difficulties
  with their boss, executive communication, or workplace relationships
  - even if they don't explicitly ask for "managing up" advice.
```

**预计时间**: 每个 15 分钟 × 10 = 2.5 小时

---

## P1 改进（体验优化）

### 3. 拆分超长 SKILL.md

**目标技能**（>500 行）:

| 技能 | 行数 | 拆分方案 |
|------|------|---------|
| `frontend-slides` | 1097 | 拆分为 `references/animation-guide.md` + `references/template-guide.md` |
| `baoyu-slide-deck` | 692 | 拆分为 `references/design-principles.md` |
| `frontend-patterns` | 631 | 拆分为 `references/react-patterns.md` + `references/state-management.md` |
| `getnote` | 516 | 拆分为 `references/api-reference.md` |
| `agent-browser` | 510 | 拆分为 `references/automation-examples.md` |
| `deep-reading-analyst` | 501 | 拆分为 `references/thinking-models.md` |

**拆分原则**:
- 保留核心工作流在 SKILL.md
- 将详细指南、示例、参考移到 `references/`
- 在 SKILL.md 中明确"何时读取参考文件"

**预计时间**: 每个 30 分钟 × 6 = 3 小时

---

### 4. 补全结构缺失的技能

**目标技能**（有 scripts/但缺少 references/）:
- `survey-analysis` - 已有 scripts/，需补充 `references/workflow-guide.md`
- `supplier-capacity-adjustment` - 已有 scripts/，需补充 `references/calculation-formulas.md`
- `document-writer` - 需补充 `references/templates/` 目录

**预计时间**: 每个 20 分钟 × 3 = 1 小时

---

## P2 改进（长期建设）

### 5. 建立评估机制（试点）

**试点技能**（选择 3 个高频技能）:
1. `weekly-report` - 高频使用，易验证
2. `survey-analysis` - 有明确输出标准
3. `document-writer` - 高频使用

**每个技能需要**:
1. 创建 `evals/evals.json` (5-10 个测试用例)
2. 定义定量评估指标
3. 建立基准测试流程

**预计时间**: 每个 2 小时 × 3 = 6 小时

---

## 执行顺序

```
1. INDEX.md 修复（P0，30 分钟）
   ↓
2. 短描述技能优化（P0，2.5 小时）
   ↓
3. 超长 SKILL.md 拆分（P1，3 小时）
   ↓
4. 结构补全（P1，1 小时）
   ↓
5. 评估机制试点（P2，6 小时）
```

**总预计时间**: ~13 小时

---

## 验证清单

改进后验证：
- [ ] 所有技能描述包含完整触发场景
- [ ] 无 SKILL.md 超过 500 行（或已拆分）
- [ ] INDEX.md 与实际技能目录一致
- [ ] 试点技能有评估用例
- [ ] 参考文件有明确的"何时读取"指引

---

## 附录：完整技能行数统计

详见：`workspace/skill-lines-report.txt`
