---
name: skill-health-scan
description: "扫描项目技能健康度：双目录差异、重复技能、描述质量、疑似废弃项。每周运行一次或手动触发。"
---

# skill-health-scan — 技能健康度扫描

> 轻量级项目级扫描，5分钟出诊断报告

## 用法

```bash
/skill-health-scan
```

AI 将自动执行以下扫描并输出报告。

## 扫描维度

### 1. 双目录一致性

检查 `.claude/skills/` 和 `.agents/skills/` 的差异：

| 检查项 | 说明 |
|--------|------|
| 仅存在于 .claude/ 的技能 | 需要同步到 .agents/ |
| 仅存在于 .agents/ 的技能 | 需要同步到 .claude/ |
| 同名技能内容差异 | 以更新时间较新的为准，标记冲突 |

### 2. 重复技能名

同名技能出现在两个目录中但路径不同：

```
skill-a 在 .claude/skills/skill-a/ 和 .agents/skills/skill-a/
```

### 3. 描述质量

| 检查项 | 阈值 | 问题 |
|--------|------|------|
| 描述为空或缺失 | — | 技能无法被有效触发 |
| 描述过长 | >200字 | 浪费prompt budget |
| 无触发关键词 | 不含业务名词 | 用户难以发现 |

### 4. 疑似废弃

| 指标 | 判定 |
|------|------|
| 无 SKILL.md | 目录存在但主文件缺失 |
| 空目录 | 除 SKILL.md 外无其他文件 |
| 引用破损 | SKILL.md 中引用的文件不存在 |
| 长期未更新 | 3个月无修改（参考 git log）|

### 5. 领域分布概览

按前缀归类计数，识别过度集中的领域：

| 领域 | 技能数 | 健康度 |
|------|--------|--------|
| viz-* | 15 | 碎片化风险 |
| ppt-* | 7 | 可合并 |
| sn-* | 22 | 需审查 |

## 输出格式

```
## 技能健康度报告

### 双目录差异（3项）
- [ ] 仅 .claude/：skill-x, skill-y → 需同步到 .agents/
- [ ] 仅 .agents/：hr-analysis → 需同步到 .claude/
- [ ] 内容冲突：skill-z（.claude/更新于5/1，.agents/更新于4/20）

### 重复技能（2项）
- duplicate-skill-a → 建议保留 .claude/ 版本

### 描述问题（5项）
- bad-desc-skill：描述为空
- long-desc-skill：描述286字 → 建议精简到150字内

### 疑似废弃（3项）
- empty-dir：目录为空
- broken-ref：引用的 adapt.md 不存在

### 建议动作
1. 优先处理：同步 hr-analysis 到 .claude/skills/
2. 本周清理：废弃项3个
```

## 与 skill-cleaner 的区别

| | skill-health-scan | skill-cleaner |
|--|-------------------|---------------|
| 范围 | 本项目双目录 | 跨所有技能根目录 |
| 深度 | 轻量（5分钟） | 深度（含Token分析、日志回溯） |
| 运行方式 | Bash + 文件扫描 | TypeScript + 日志分析 |
| 使用频率 | 每周 | 按需/季度 |

## 修复后同步

扫描发现的问题修复后，执行：

```bash
git add -A && git commit -m "chore: skill-health-scan cleanup"
```

## 关联任务

- 技能上游同步检查（每周一 8:00，另见 Cron 任务）
- skill-consolidator（只读深度审查，需手动触发）
