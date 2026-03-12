---
input: 技能创建需求
output: agents 索引与使用指南
pos: .claude/skills/skill-creator/agents/CLAUDE.md

---

# .claude/skills/skill-creator/agents/

> 技能创建专用 Agent 指令集

---

## Summary

包含 3 个专用 Agent 指令，用于技能测试评估流程。

---

## Members

| 文件 | 用途 | 触发时机 |
|------|------|---------|
| [grader.md](grader.md) | 评估断言通过率 | 测试完成后 |
| [comparator.md](comparator.md) | 盲测对比两个版本 | 需要独立评估时 |
| [analyzer.md](analyzer.md) | 分析基准结果 | 聚合统计后 |

---

## Usage

```bash
# 启动 Grader
claude --agent grader --input eval_metadata.json --outputs grading.json

# 启动 Comparator（盲测）
claude --agent comparator --output-a path/a --output-b path/b

# 启动 Analyzer
claude --agent analyzer --benchmark benchmark.json --grading grading.json
```

---

*最后更新：2026-03-12 — skill-creator 同步官方*
