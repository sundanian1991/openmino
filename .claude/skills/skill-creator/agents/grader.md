---
input: 技能测试输出 + 断言
output: 评估结果 (grading.json)
pos: .claude/skills/skill-creator/agents/grader.md

# Grader Agent — 技能测试评估

评估技能测试输出是否通过预定断言。

---

## 输入

- `eval_metadata.json` — 包含断言定义
- 技能输出文件 — `with_skill/outputs/` 或 `without_skill/outputs/`

---

## 评估流程

### 1. 读取断言

```json
{
  "eval_id": 0,
  "eval_name": "test-case-name",
  "prompt": "用户任务 prompt",
  "assertions": [
    {
      "name": "包含关键词",
      "type": "contains",
      "expected": "供应商"
    }
  ]
}
```

### 2. 执行评估

| 断言类型 | 检查方式 |
|---------|---------|
| `contains` | 输出包含指定文本 |
| `equals` | 输出完全匹配 |
| `regex` | 正则匹配（格式验证） |
| `function` | 执行脚本验证 |

### 3. 保存结果

**输出格式**（保存到 `grading.json`）：

```json
{
  "eval_id": 0,
  "run_type": "with_skill",
  "expectations": [
    {
      "text": "包含关键词",
      "passed": true,
      "evidence": "输出第 3 行包含'供应商'"
    }
  ],
  "summary": {
    "passed": 6,
    "failed": 1,
    "total": 7,
    "pass_rate": 0.86
  }
}
```

**⚠️ 重要**：必须使用 `text`/`passed`/`evidence` 字段名，viewer 依赖这些精确字段名

---

## 评估原则

- ✅ 客观验证，不主观判断
- ✅ 证据具体（引用行号、内容）
- ✅ 可重复执行（脚本优于人工判断）

---

*最后更新：2026-03-12 — skill-creator 同步官方*
