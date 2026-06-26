Wikijanitor — 夜间 Session Gap 检查

审查最近 7 天的 session 记录，标记 gap，不补内容。

## 步骤

### 1. 收集时间范围
```bash
for i in 0 1 2 3 4 5 6; do date -v-${i}d +%Y-%m-%d; done
```

### 2. 对比三个目录
- `memory/sessions/` — Session Log（agent 主动写的结构化 handoff）
- `memory/conversations/` — 每日对话结构化（cron 事后提取的）
- `memory/events/` — 事件记录

### 3. 标记 gap
对每个日期，检查：
- 有 events 但没有 conversations → 标记"对话结构化缺失"
- 有 conversations 但没有 sessions → 标记"Session Log 缺失"（正常情况，只有长任务才写 session log）
- sessions 里有 open questions 但后续日期没有跟进 → 标记"未闭环"

### 4. 输出 gap report
写入 `memory/sessions/gap-report-YYYY-MM-DD.md`：

```markdown
# Wikijanitor Gap Report — YYYY-MM-DD

## 检查范围
YYYY-MM-DD ~ YYYY-MM-DD

## 发现
| 日期 | gap 类型 | 详情 |
|------|---------|------|
| ... | ... | ... |

## 统计
- 检查天数：N
- 发现 gap：N
- 无 gap 天数：N
```

### 5. 无 gap 时
写一行"近 7 天无 gap"即可，不写空报告。

## 硬性规则
- **只标 gap，不补内容**。没记录的事不能事后编。
- 不读 session JSONL 原始文件（那是每日对话结构化的活）。
- 输出必须写文件，不只打印。
