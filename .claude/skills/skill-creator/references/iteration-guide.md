---
input: skill-creator 技能迭代需求
output: 测试运行、评估聚合、迭代改进流程
pos: .claude/skills/skill-creator/references/iteration-guide.md

# Skill Creator 迭代流程指南

> 详细的测试运行、评估和迭代流程


## 完整流程概览

```
Step 1: 运行测试 (并行) → Step 2: 起草断言 → Step 3: 保存时序 → Step 4: 评估聚合 → Step 5: 读取反馈
```


## Step 1: 运行所有测试（并行）

### 为每个测试用例启动两个 subagent

**With-skill 运行**：
```
执行这个任务：
- 技能路径：<path-to-skill>
- 任务：<eval prompt>
- 输入文件：<eval files if any>
- 保存输出到：<workspace>/iteration-<N>/eval-<ID>/with_skill/outputs/
- 输出内容：<用户关心的文件>
```

**Baseline 运行**：
- **创建新技能**：无技能版本（same prompt, no skill path）
- **改进现有技能**：使用旧版本技能

### 关键点

✅ 必须同时启动 with-skill 和 baseline 运行
✅ 不要先运行 with-skill 再运行 baseline
✅ 所有运行应在相近时间完成


## Step 2: 等待运行时起草断言

**不要干等** — 在运行期间起草定量断言

### 好的断言特征

- ✅ 客观可验证
- ✅ 描述性名称（一看就知道检查什么）
- ✅ 可重复执行

### 断言类型

| 类型 | 适用场景 |
|------|---------|
| `contains` | 输出包含特定文本 |
| `equals` | 输出完全匹配 |
| `regex` | 格式验证（日期、邮箱等） |
| `function` | 复杂逻辑验证 |

### 保存断言

更新每个测试用例的 `eval_metadata.json`：

```json
{
  "eval_id": 0,
  "eval_name": "descriptive-name",
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


## Step 3: 保存时序数据

当每个 subagent 完成时，Task 通知包含：
- `total_tokens`
- `duration_ms`

**立即保存**到 `timing.json`：

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3
}
```

**注意**：这是唯一获取时序数据的机会 — 不会持久化在其他地方


## Step 4: 评估、聚合、启动 Viewer

### 4.1: 评估每个运行

使用 `agents/grader.md` 评估每个断言：

```bash
# 使用 subagent 或 inline 评估
# 保存结果到 grading.json
```

**grading.json 格式**（viewer 依赖这些字段名）：
```json
{
  "eval_id": 0,
  "run_type": "with_skill",
  "assertions": [
    {
      "text": "断言描述",
      "passed": true,
      "evidence": "通过/失败的证据"
    }
  ]
}
```

**⚠️ 重要**：必须使用 `text`/`passed`/`evidence` 字段名，不是 `name`/`met`/`details`

### 4.2: 聚合为基准

```bash
python -m scripts.aggregate_benchmark <workspace>/iteration-N --skill-name <name>
```

**输出**：
- `benchmark.json` — 结构化数据
- `benchmark.md` — 可读报告

**格式要求**：
- `with_skill` 版本放在 `baseline` 之前
- 包含 `mean ± stddev` 和 `delta`

### 4.3: 分析师洞察

读取 `agents/analyzer.md`，识别：
- 总是通过的断言（非区分性）
- 高方差测试用例（可能不稳定）
- 时间/Token 权衡

### 4.4: 启动 Viewer

```bash
nohup python <skill-creator-path>/eval-viewer/generate_review.py \
  <workspace>/iteration-N \
  --skill-name "my-skill" \
  --benchmark <workspace>/iteration-N/benchmark.json \
  > /dev/null 2>&1 &
VIEWER_PID=$!
```

**迭代 2+**：添加 `--previous-workspace <workspace>/iteration-<N-1>`

**Cowork/无显示环境**：
```bash
python .../generate_review.py \
  <workspace>/iteration-N \
  --skill-name "my-skill" \
  --benchmark <workspace>/iteration-N/benchmark.json \
  --static <output-path>
```

### 告知用户

"我已经在浏览器中打开了结果。有两个标签页：
- **Outputs**：点击每个测试用例留下反馈
- **Benchmark**：查看定量对比

完成后回来告诉我。"


## Step 5: 读取反馈

用户完成后，读取 `feedback.json`：

```json
{
  "reviews": [
    {"run_id": "eval-0-with_skill", "feedback": "图表缺少轴标签", "timestamp": "..."},
    {"run_id": "eval-1-with_skill", "feedback": "", "timestamp": "..."}
  ],
  "status": "complete"
}
```

**注意**：空 feedback 表示用户认为该测试用例通过良好

### 清理 Viewer

```bash
kill $VIEWER_PID 2>/dev/null
```


## 迭代改进

### 如何思考改进

1. **从反馈泛化**
   - 目标是创建能用百万次的技能
   - 不要针对特定测试用例过拟合
   - 避免过度严格的 MUST 规则

2. **保持简洁**
   - 移除不增加价值的指令
   - 阅读 transript，识别浪费时间的工作

3. **解释为什么**
   - 说明原因，不只是规则
   - 使用推理，不只是命令

4. **寻找重复工作**
   - 如果所有测试用例都写了类似的 helper 脚本
   - 提取到 `scripts/` 目录

### 迭代循环

1. 应用改进到技能
2. 重新运行所有测试用例到 `iteration-<N+1>/`
3. 启动 viewer（带 `--previous-workspace`）
4. 等待用户反馈
5. 读取反馈，再次改进

**停止条件**：
- 用户满意
- 所有 feedback 为空（都通过了）
- 没有实质性进展


## 平台适配

### Claude Code（完整版）
- ✅ 并行 subagents
- ✅ 浏览器 viewer
- ✅ Description 优化循环

### Claude.ai（简化版）
- ❌ 无 subagents → 顺序执行
- ❌ 无浏览器 → 直接展示结果
- ❌ 无 benchmark → 专注定性反馈

### Cowork（头枕模式）
- ✅ Subagents（可能超时，允许顺序执行）
- ⚠️ 无浏览器 → 使用 `--static` 生成 HTML
- ✅ Feedback 下载为文件


## 常见问题

### Q: 测试用例应该多详细？

A: 真实用户会说的话，不是抽象请求。包含：
- 文件路径
- 个人背景
- 列名/值
- 公司名/URL
- 一些 backstory
- 可能有拼写错误或缩写

### Q: 应该有多少测试用例？

A: 2-3 个开始，迭代后扩展到 5-10 个

### Q: 如何判断技能是否改进？

A: 三个维度：
1. **定性**：用户 feedback 更积极
2. **定量**：pass rate 提高
3. **效率**：tokens/duration 降低


*最后更新：2026-03-12 — skill-creator 拆分*

