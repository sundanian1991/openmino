---
name: kw:workflow
description: One-click complete Compound Knowledge workflow — from brainstorm to structured deliverables to knowledge compounding. Use when you want to thoroughly analyze a complex problem: brainstorm → plan → research → review → execute → compound learnings. Triggers on phrases like "完整分析这个问题", "帮我梳理一下", "知识工作流", "深度分析", "从零开始分析", "kw-workflow".
argument-hint: "[problem or topic to analyze]"
---

<problem_input> #$ARGUMENTS </problem_input>

# Compound Knowledge 完整工作流

一键启动从头脑风暴到知识沉淀的完整流程。适用于需要系统化分析的复杂问题。

## 工作流概览

```
brainstorm → plan → review → work → compound
           (confidence 可选)
```

**文件组织**：所有输出保存在 `plans/问题名-日期/` 下

---

## 步骤 1: Brainstorm（头脑风暴）

**目标**：把想法全部倒出来，找到问题的形状

**操作**：
1. 接受用户输入（问题描述、会议记录、笔记等）
2. 提取核心要素：待决策事项、开放性问题、约束条件、干系人、数据点、想法选项
3. 搜索相关知识（`docs/knowledge/`、`plans/`、`docs/solutions/`）
4. 识别主题、张力、缺口
5. 解决关键问题（用 AskUserQuestion 最多问 3 个）
6. 提出方向建议

**输出**：写入 `plans/问题名-日期/00-brainstorm.md`

**进入下一步**：如果用户确认继续，自动进入 Plan

---

## 步骤 2: Plan（制定计划）

**目标**：基于头脑风暴，结构化研究计划

**操作**：
1. 读取 `00-brainstorm.md`
2. 搜索相关知识库（`docs/knowledge/`）和过往计划（`plans/`）
3. 研究过往学习（关键模式、失效方案）
4. 构建研究计划：
   - 研究问题（优先级排序）
   - 研究方法
   - 数据来源
   - 时间框架
5. 创建 workspace 目录结构

**输出**：写入 `plans/问题名-日期/01-research.md`

**进入下一步**：自动进入 Confidence（可选）或 Review

---

## 步骤 3: Confidence（确定性评估，可选）

**目标**：评估计划的确定性，识别盲区

**触发条件**：
- 用户明确要求评估
- 计划涉及高风险决策
- 用户在 Plan 后说 "先评估一下"

**操作**：
1. 评估每个研究问题的确定性等级（High/Medium/Low）
2. 识别盲区和风险
3. 提出缓解措施

**输出**：写入 `plans/问题名-日期/02-confidence.md`

**进入下一步**：自动进入 Review

---

## 步骤 4: Review（双重审查）

**目标**：战略对齐 + 数据准确性审查

**操作**：
1. **战略对齐审查**：
   - 目标清晰度
   - 假设可证伪性
   - 范围比例性
   - 资源意识
   - 战略一致性
2. **数据准确性审查**：
   - 数据/事实的来源验证
   - 标记数据缺口
3. 修复 P2 问题（执行时间框架、数据缺口标记）

**输出**：写入 `plans/问题名-日期/03-review.md`

**进入下一步**：自动进入 Work

---

## 步骤 5: Work（执行计划）

**目标**：按计划执行，产出交付物

**操作**：
1. 读取 `01-research.md` 和 `03-review.md`
2. 按优先级执行研究任务
3. 产出结构化交付物：
   - 边界识别清单
   - 联盟评估
   - 应对策略
   - 触发条件
4. 实时汇报进度

**输出**：写入 `plans/问题名-日期/02-workspace/*.md`

**进入下一步**：自动进入 Compound

---

## 步骤 6: Compound（知识沉淀）

**目标**：提炼洞察，保存到知识库

**操作**：
1. 回顾整个工作流产出
2. 识别可复用的洞察：
   - 核心洞察（insight 类型）
   - 行动框架（playbook 类型）
   - 模式识别（pattern 类型）
3. 为每个洞察编写独立文件：
   - YAML frontmatter（type, tags, confidence, source）
   - 核心内容（简洁、可复用）
   - 相关学习引用
4. 保存到 `docs/knowledge/`
5. 更新 `docs/knowledge/INDEX.md` 索引

**输出**：
- 洞察文件：`docs/knowledge/洞察名.md`
- 更新 `docs/knowledge/INDEX.md`

---

## 文件组织结构

```
plans/问题名-日期/
├── 00-brainstorm.md       # 头脑风暴输出
├── 01-research.md         # 研究计划
├── 02-confidence.md       # 确定性评估（可选）
├── 03-review.md           # 双重审查
└── 02-workspace/          # 执行产出
    ├── 边界识别清单.md
    ├── 联盟评估.md
    ├── 应对策略.md
    └── 触发条件.md
```

---

## 关键原则

### 1. 自动推进 vs 用户控制

**默认行为**：每个步骤完成后，自动进入下一步

**用户干预点**：
- Brainstorm 后：用户可选择深入挖掘或直接进入 Plan
- Plan 后：用户可选择 Confidence 评估或直接 Review
- 任何时候：用户可以说 "暂停"、"继续"、"跳到 X"

### 2. 文件即源

**关键**：每步输出都写入文件，下一步从文件读取

- Brainstorm → `00-brainstorm.md` → Plan 读取它
- Plan → `01-research.md` → Review 读取它
- Review → `03-review.md` → Work 读取它

**好处**：
- 可中断恢复
- 可追溯审计
- 可人工修改

### 3. 渐进式披露

**早期**：理解问题、识别张力
**中期**：结构化研究、评估风险
**后期**：产出交付物、沉淀洞察

### 4. 质量保证

**P2 问题必须修复**：
- 缺少执行时间框架 → 补充短期/中期/长期
- 缺少数据来源 → 标记数据缺口

**P3 问题可优化**：
- 建议改进，但不阻塞流程

---

## 触发示例

用户说以下任一短语时触发：

| 用户输入 | 启动 |
|---------|------|
| "完整分析一下供应商流失问题" | ✅ 启动 |
| "帮我梳理这个组织架构问题" | ✅ 启动 |
| "用知识工作流分析一下" | ✅ 启动 |
| "从零开始分析这个问题" | ✅ 启动 |
| "kw-workflow 供应商权责问题" | ✅ 启动 |
| "深度分析这个战略决策" | ✅ 启动 |

---

## Pipeline Mode（自动化场景）

当从其他自动化系统调用时：

- 跳过所有 AskUserQuestion
- 使用合理的默认值
- 自动写入所有文件
- 自动推进到下一步
- 输出结构化结果供解析

---

## 与单独技能的对比

| 场景 | 用单独技能 | 用 kw:workflow |
|------|-----------|----------------|
| 快速头脑风暴 | ✅ /kw:brainstorm | ❌ 太重 |
| 只需要研究计划 | ✅ /kw:plan | ❌ 太重 |
| 完整分析复杂问题 | ❌ 需手动串联多个技能 | ✅ 一键完成 |
| 需要知识沉淀 | ❌ 需手动 /kw:compound | ✅ 自动沉淀 |
| 未知深度的问题 | ❌ 不确定用哪个技能 | ✅ 自动推进 |

**推荐**：当你不确定从哪里开始，或者知道需要完整分析时，用 kw:workflow

---

## 技能依赖

**依赖以下技能**（自动调用）：
- `/kw:brainstorm` — 头脑风暴
- `/kw:plan` — 研究计划
- `/kw:confidence` — 确定性评估（可选）
- `/kw:review` — 双重审查
- `/kw:work` — 执行计划
- `/kw:compound` — 知识沉淀

**依赖以下目录**：
- `plans/` — 计划存放
- `docs/knowledge/` — 知识库
- `docs/solutions/` — 解决方案库
