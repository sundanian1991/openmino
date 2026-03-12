# Skill Creator - 精简版

> **核心理念**：技能创建是迭代过程，不是一次性完成。

---

## 核心工作流（5 步循环）

```
1. 明确意图 → 2. 写草稿 → 3. 运行测试 → 4. 评估结果 → 5. 迭代改进
```

### Step 1: 明确意图

**关键问题**：
1. 这个技能要让 Claude 能做什么？
2. 何时触发？（用户说什么话/什么场景）
3. 预期输出格式是什么？
4. 需要测试用例吗？（客观输出需要，主观输出不需要）

### Step 2: 写草稿

**SKILL.md 结构**：
```markdown
---
name: skill-name
description: 何时触发 + 做什么（要 pushy，包含具体场景）
---

# 技能名称

## 核心工作流
[步骤 1-5]

## 输出格式
[模板/示例]

## 质量检查清单
[- [ ] 检查项]
```

### Step 3: 运行测试

**测试用例格式**（保存到 `evals/evals.json`）：
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

**执行方式**：
- 为每个测试用例创建 `workspace/iteration-N/eval-N/with_skill/` 目录
- 使用技能执行任务，保存输出

### Step 4: 评估结果

**定性评估**：
- 打开结果，逐条检查测试用例输出
- 记录用户反馈到 `feedback.json`

**定量评估**（可选）：
- 编写可验证的断言
- 运行 grader 评估通过率

### Step 5: 迭代改进

**改进原则**：
1. **从反馈泛化** - 不针对特定测试用例过拟合
2. **保持简洁** - 移除不增加价值的指令
3. **解释为什么** - 说明原因，不只是 MUST 规则
4. **复用代码** - 提取共用脚本到 `scripts/`

---

## 文件结构

```
skill-name/
├── SKILL.md (必需)
│   ├── YAML frontmatter (name, description)
│   └── Markdown 指令
└── Bundled Resources (可选)
    ├── scripts/    - 可执行代码
    ├── references/ - 参考文档
    └── assets/     - 模板/图标/字体
```

---

## 平台适配

### Claude Code（完整版）
- ✅ 支持 subagents（并行测试）
- ✅ 支持浏览器 viewer
- ✅ 支持 description 优化循环

### Claude.ai（简化版）
- ❌ 无 subagents → 顺序执行测试
- ❌ 无浏览器 → 直接展示结果
- ❌ 无 benchmark → 专注定性反馈

### Cowork（头枕模式）
- ✅ 支持 subagents（可能超时，允许顺序执行）
- ⚠️ 无浏览器 → 使用 `--static` 生成 HTML
- ✅ 支持 packaging

---

## 完整指南

**详细文档**：
- [迭代流程](references/iteration-guide.md) - 运行测试、评估、迭代
- [JSON Schema](references/schemas.md) - evals.json、grading.json 格式

---

*最后更新：2026-03-12 — 拆分为 SKILL.md + references/*
