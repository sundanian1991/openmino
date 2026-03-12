---
name: skill-creator
description: 创建新技能、迭代优化现有技能、运行测试评估技能性能。当用户想要从零创建技能、编辑或优化现有技能、运行 evals 测试技能、或使用基准测试对比技能性能时触发。
---

# Skill Creator

用于创建新技能并通过迭代循环持续改进。

## 核心工作流（5 步循环）

```
1. 明确意图 → 2. 写草稿 → 3. 运行测试 → 4. 评估结果 → 5. 迭代改进
```

### 快速索引

| 步骤 | 详细指南 |
|------|---------|
| Step 1: 明确意图 | 下方「Capture Intent」 |
| Step 2: 写草稿 | 下方「Write SKILL.md」 |
| Step 3: 运行测试 | [references/iteration-guide.md](references/iteration-guide.md) |
| Step 4: 评估结果 | [references/iteration-guide.md](references/iteration-guide.md#step-4-评估聚合启动-viewer) |
| Step 5: 迭代改进 | 下方「Improving the Skill」 |

---

## Capture Intent

**关键问题**：
1. 这个技能要让 Claude 能做什么？
2. 何时触发？（用户说什么话/什么场景）
3. 预期输出格式是什么？
4. 需要测试用例吗？（客观输出需要，主观输出不需要）

## Write SKILL.md

**标准结构**：
```markdown
---
name: skill-name
description: 何时触发 + 做什么（要 pushy，包含具体场景）
---

# 技能名称
## 核心工作流 / 输出格式 / 质量检查清单
```

**Description 编写原则**：
- 包含触发场景和具体上下文
- 要"pushy" — 防止 undertrigger
- 示例：`"当用户提到仪表盘、数据可视化、内部指标时触发，即使用户没说'dashboard'"`

---

## Running & Evaluating（简化版）

**测试用例**（保存到 `evals/evals.json`）：
```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "用户任务 prompt",
      "expected_output": "预期结果描述",
      "files": []
    }
  ]
}
```

**详细流程**：运行测试、起草断言、保存时序数据、评估聚合、读取反馈

👉 **[references/iteration-guide.md](references/iteration-guide.md)** — 完整 5 步流程

---

## Improving the Skill

**改进原则**：
1. **从反馈泛化** — 不针对特定测试用例过拟合
2. **保持简洁** — 移除不增加价值的指令
3. **解释为什么** — 说明原因，不只是 MUST 规则
4. **复用代码** — 提取共用脚本到 `scripts/`

---

## Platform Adaptation

| 平台 | Subagents | Viewer | Description 优化 |
|------|-----------|--------|-----------------|
| **Claude Code** | ✅ 并行 | ✅ 浏览器 | ✅ 完整支持 |
| **Claude.ai** | ❌ 顺序 | ❌ 直接展示 | ❌ 跳过 |
| **Cowork** | ⚠️ 可能超时 | 📥 `--static` HTML | ✅ 支持 |

---

## Reference Files

| 文件 | 用途 |
|------|------|
| [references/iteration-guide.md](references/iteration-guide.md) | 测试运行、评估、迭代流程 |
| [references/schemas.md](references/schemas.md) | JSON 数据结构（evals.json、grading.json 等）|

**agents/ 目录**（按需读取）：
- `agents/grader.md` — 评估断言
- `agents/comparator.md` — 盲测对比
- `agents/analyzer.md` — 分析基准结果

---

*最后更新：2026-03-12 — 同步官方最新版 (485 行)*
