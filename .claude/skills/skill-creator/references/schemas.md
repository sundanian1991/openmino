# JSON Schemas for Skill Creator

> 技能测试和评估使用的 JSON 数据结构

---

## evals/evals.json

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "eval_name": "descriptive-name",
      "prompt": "用户任务 prompt",
      "expected_output": "预期结果描述",
      "files": [],
      "assertions": []
    }
  ]
}
```

**字段说明**：
| 字段 | 必需 | 说明 |
|------|------|------|
| `skill_name` | ✅ | 技能标识符 |
| `evals[].id` | ✅ | 唯一整数 ID |
| `evals[].eval_name` | ✅ | 描述性名称（viewer 显示用） |
| `evals[].prompt` | ✅ | 执行的任务 |
| `evals[].expected_output` | ❌ | 预期结果描述 |
| `evals[].files` | ❌ | 输入文件路径数组 |
| `evals[].assertions` | ❌ | 可验证断言数组 |

---

## grading.json

```json
{
  "eval_id": 0,
  "run_type": "with_skill",
  "expectations": [
    {
      "text": "断言描述",
      "passed": true,
      "evidence": "通过/失败的证据"
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

**⚠️ 重要**：viewer 依赖 `text`/`passed`/`evidence` 字段名，不是 `name`/`met`/`details`

---

## timing.json

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3
}
```

**注意**：时序数据只能在 Task 完成通知中获取，必须立即保存

---

## benchmark.json

```json
{
  "skill_name": "example-skill",
  "metadata": {
    "timestamp": "2026-03-12T10:00:00Z",
    "evals_run": [1, 2, 3]
  },
  "runs": [
    {
      "eval_id": 1,
      "eval_name": "test-case-1",
      "configuration": "with_skill",
      "run_number": 1,
      "result": {
        "pass_rate": 0.85,
        "time_seconds": 42.5,
        "tokens": 3800
      }
    }
  ],
  "run_summary": {
    "with_skill": {
      "pass_rate": {"mean": 0.85, "stddev": 0.05},
      "time_seconds": {"mean": 45.0, "stddev": 12.0}
    },
    "without_skill": {
      "pass_rate": {"mean": 0.60, "stddev": 0.08},
      "time_seconds": {"mean": 32.0, "stddev": 8.0}
    },
    "delta": {
      "pass_rate": "+0.25",
      "time_seconds": "+13.0"
    }
  }
}
```

**⚠️ 重要**：`configuration` 必须是 `"with_skill"` 或 `"without_skill"`，viewer 依赖这个精确字符串

---

## feedback.json

```json
{
  "reviews": [
    {
      "run_id": "eval-0-with_skill",
      "feedback": "图表缺少轴标签",
      "timestamp": "2026-03-12T10:30:00Z"
    }
  ],
  "status": "complete"
}
```

**注意**：空 feedback 表示用户认为通过良好

---

*最后更新：2026-03-12 — skill-creator 拆分*
