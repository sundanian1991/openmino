---
name: sabc-diagnostic
description: >
  金条坐席SABC评级诊断 — 从CRM原始底表到四视角HTML诊断报告。
  读取单Sheet坐席级Excel → 自动识别格式 → 数据清洗 → 参评判定 → SABC百分位评级 → 四视角指标计算 → 阈值红绿灯 → NYT风HTML报告。
  触发词：SABC、坐席评级、供应商绩效分析、金条坐席诊断、坐席等级、CRM底表分析、职场诊断、月度供应商报告。
---

# SABC 诊断分析

> 金条坐席 SABC 诊断 · V3.1
> 从 CRM 原始底表到四视角可视化诊断报告

## 一句话

**给 Excel 底表 → 跑脚本 → 拿 HTML 报告。** 自动适配两种 CRM 导出格式。

---

## 数据源适配

### 格式 A（岐力型 — 42 列）
- 单 Sheet1，J 列 = "时间差"，K 列起 = 数据列
- 字段：坐席类型、职场名称、坐席id、坐席名称、日期... 接通用户数(K)、接通话单数(L)、有效接通话单数(M)... 是否参评(AA)、个人ATT(AC)、件均金额(AE)、日均有效通时(AG)、司龄分段(AP)

### 格式 B（伽玛型 — 41 列）
- 单 Sheet1，J 列 = 接通用户数（无时间差列）
- 字段：坐席类型、职场名称... 接通用户数(J)、接通话单数(K)... 是否参评(Z)、个人ATT(AB)、转化率%(AC)、首贷件均(AD)、日均有效通时(AF)、司龄分段(AN)

### 字段统一映射（内部使用）

```python
FIELD_MAP = {
    'A': 'seat_type',    'B': 'workplace',    'C': 'seat_id',
    'D': 'seat_name',    'E': 'first_call_date', 'G': 'tenure_days',
    'I': 'last_call_time', 'Z': 'is_rated',     'AB': 'att',
    'AC': 'att_raw',      'AD': 'piece',        'AF': 'daily_dur',
    'AN': 'mob_segment',
    # Format A 特有列偏移
}
```

---

## 工作流

```
读取 Excel（Sheet1）
  ↓
自动识别格式 A/B（检查 J 列标题）
  ↓
数据清洗 + 字段统一 + 派生字段计算
  ↓
参评判定（活跃度 ≤7 天 AND 出勤 ≥22 天）
  ↓
首贷/复贷分池 → SABC 百分位评级
  ↓
四视角指标计算 + 阈值红绿灯
  ↓
NYT 风 HTML 报告输出
```

---

## 参评判定

两条规则**同时满足**才参评：
1. 最近一次有效外呼距截止日 ≤ 7 天
2. 近 30 天外呼天数 ≥ 22 天

## SABC 评级（百分位排名制）

仅参评人中排名。首贷/复贷分池，不混排。

| 维度 | 首贷权重 | 复贷权重 |
|------|---------|---------|
| 转化率 | 45% | 35% |
| T0 GMV | 20% | 15% |
| 件均金额 | — | 15% |
| ATT | 15% | 10% |
| 日均有效通时 | 20% | 25% |

综合得分 = Σ(各维度百分位排名 × 权重)
等级：S(Top20%, 核心指标>中位) / A(20-50%) / B(50-80%) / C(Bottom20%)

---

## 输出

| 文件 | 说明 |
|------|------|
| `sabc_diagnostic_report.html` | NYT 数据新闻风，自包含单文件 |
| `narrative_outline.md` | 叙事情报大纲 |

## 用法

```bash
cd /Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/sabc-diagnostic

# 单文件
python scripts/analyze.py \
  --input "/path/to/工作簿-岐力职场.xlsx" \
  --output-dir /path/to/output/

# 多文件合并（跨供应商/跨月份）
python scripts/analyze.py \
  --inputs "/path/to/岐力.xlsx" "/path/to/伽玛.xlsx" \
  --output-dir /path/to/output/
```

### 迭代记录

| 轮次 | 改进 |
|------|------|
| V3.0→V3.1 | 从 6-Sheet 格式改为单 Sheet 底表适配 |
| V3.1 it1-2 | 跑通岐力/伽玛双格式，修复模板占位符 |
| V3.1 it3 | 多文件合并 + has_sd 修复 + combined_n 视角 |
| V3.1 it4-5 | 视觉改进：主视角 badge、数据驱动建议、等级芯片高亮 |

---

## 设计系统

参见 `references/style-guide.md`。珊瑚橙 `#E8734A` 唯一强调色，灰阶层次。

---

*V3.1 · 2026-05-16 · 基于真实 CRM 底表结构*
