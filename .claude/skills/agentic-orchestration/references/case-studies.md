---
input: agentic-orchestration 混合编排实现需求
output: 供应商评分系统的完整案例研究
pos: .claude/skills/agentic-orchestration/references/case-studies.md

# 案例研究：供应商评分系统

> 混合编排模式的完整执行案例


## 任务背景

**需求**：实现供应商评分系统，包含综合得分计算、等级判定、风险标识三个模块。

**复杂度分析**：
- 步骤数：7 步（Spec → Test → Code A → Code B → Code C → Review → Human）
- 依赖关系：Spec 和 Test 是强依赖，三个 Code 模块可并行
- 质量要求：高（影响业务决策）
- 时间要求：中等

**编排模式选择**：混合编排


## 执行计划

### 阶段 1：Spec + Test（串行）

```
Spec Agent → 写供应商评分 Spec
   ↓
检查点 1：确认 Spec 完整无误
   ↓
Test Agent → 拆解测试用例
   ↓
检查点 2：确认测试覆盖核心规则
```

### 阶段 2：编码（并行）

```
Code Agent A → 实现综合得分计算 (calculateScore)
Code Agent B → 实现等级判定逻辑 (calculateGrade)
Code Agent C → 实现风险标识逻辑 (calculateRisk)
```

### 阶段 3：审查 + 验收（串行）

```
Review Agent → 代码审查
   ↓
检查点 3：确认无重大问题
   ↓
Human → 最终验收
```


## 委派声明

```markdown
【并行任务】供应商评分系统

**阶段 1: Spec + Test（串行）**
- Spec Agent: 写供应商评分 Spec
  - 预期：功能目标、4 条业务规则、3 个边界条件、输入输出定义
- Test Agent: 拆解测试用例
  - 预期：10+ 测试用例，覆盖所有规则 + 边界 + 错误处理

**阶段 2: 编码（并行）**
- Code Agent A: 实现综合得分计算
  - 预期：calculateScore 函数，输入供应商数据，输出 0-100 得分
- Code Agent B: 实现等级判定逻辑
  - 预期：calculateGrade 函数，输入得分，输出 A/B/C/D 等级
- Code Agent C: 实现风险标识逻辑
  - 预期：calculateRisk 函数，输入得分 + 规则，输出风险等级

**阶段 3: 审查 + 验收（串行）**
- Review Agent: 代码审查
  - 预期：审查报告，区分"建议"和"必须修复"
- Human: 最终验收

→ 执行模式：混合编排
→ 预计时间：30 分钟
```


## 进度追踪

### T+0min：启动

```markdown
【进度】2026-02-28 15:30

**阶段 1: Spec + Test**
→ Spec Agent: 🔄 进行中
→ Test Agent: ⏳ 等待中

**阶段 2: 编码**
→ Code Agent A: ⏳ 等待中
→ Code Agent B: ⏳ 等待中
→ Code Agent C: ⏳ 等待中

**阶段 3: 审查 + 验收**
→ Review Agent: ⏳ 等待中
→ Human: ⏳ 等待中
```

### T+8min：Spec 完成

```markdown
【进度】2026-02-28 15:38

**阶段 1: Spec + Test**
→ Spec Agent: ✅ 完成
   - Spec 文档：[链接](memory/active/tasks/test-suites/supplier-evaluation/spec.md)
   - 包含：4 条业务规则、3 个边界条件
→ 检查点 1：✅ 确认 Spec 完整无误
→ Test Agent: 🔄 进行中
```

### T+15min：Test 完成

```markdown
【进度】2026-02-28 15:45

**阶段 1: Spec + Test**
→ Spec Agent: ✅ 完成
→ Test Agent: ✅ 完成
   - 测试用例：12 个
   - 覆盖：所有规则 + 边界 + 错误处理
→ 检查点 2：✅ 确认测试覆盖核心规则

**阶段 2: 编码**
→ Code Agent A: 🔄 进行中 (80%)
→ Code Agent B: 🔄 进行中 (30%)
→ Code Agent C: 🔄 进行中 (50%)
```

### T+22min：编码完成

```markdown
【进度】2026-02-28 15:52

**阶段 2: 编码**
→ Code Agent A: ✅ 完成
   - 实现：calculateScore 函数
   - 测试通过率：100%
→ Code Agent B: ✅ 完成
   - 实现：calculateGrade 函数
   - 测试通过率：100%
→ Code Agent C: ✅ 完成
   - 实现：calculateRisk 函数
   - 测试通过率：100%

**阶段 3: 审查 + 验收**
→ Review Agent: 🔄 进行中
```

### T+28min：审查完成

```markdown
【进度】2026-02-28 15:58

**阶段 3: 审查 + 验收**
→ Review Agent: ✅ 完成
   - 审查报告：[链接](memory/reviews/supplier-evaluation-review.md)
   - 建议：2 个（已修复）
   - 必须修复：0 个
→ 检查点 3：✅ 确认无重大问题
→ Human: ⏳ 等待验收
```


## 结果汇总

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


## 关键成功因素

### 1. 前期投入足够时间

- Spec 花了 8 分钟，但避免了后续返工
- Test 花了 7 分钟，确保覆盖所有规则

### 2. 并行执行提高效率

- 三个 Code Agent 并行，总耗时 13 分钟
- 如果串行执行，需要 3×13 = 39 分钟
- 节省时间：39 - 13 = 26 分钟

### 3. 检查点机制

- 检查点 1：确认 Spec 完整，避免方向错误
- 检查点 2：确认测试覆盖，避免质量漏洞
- 检查点 3：确认审查通过，避免交付问题

### 4. Review Agent 把关

- 发现 2 个建议性问题（已修复）
- 无"必须修复"问题，一次性通过


## 经验教训

### ✅ 做得好的

1. **混合编排选择正确** — 平衡效率与质量
2. **检查点执行到位** — 每步确认后再继续
3. **并行边界清晰** — 三个模块修改不同文件
4. **审查意见具体** — 区分"建议"和"必须修复"

### ⚠️ 可改进的

1. **Spec 可以更详细** — 有 1 个边界条件在编码时才发现需要补充
2. **集成测试缺失** — 三个模块集成后没有整体测试
3. **Human 验收延迟** — 完成后等了 1 天才验收


## 复用建议

此案例适用于以下场景：

- ✅ 多模块开发（前后端分离）
- ✅ 规则引擎实现（多条业务规则）
- ✅ 数据转换管道（输入→处理→输出）
- ✅ 评估/评分系统（复杂计算逻辑）

**核心模式**：
1. Spec 先行（定义规则）
2. Test 跟进（定义验收）
3. Code 并行（分模块实现）
4. Review 把关（质量保证）
5. Human 验收（最终确认）


*混合编排是经过验证的最佳实践，推荐作为默认模式。*

