---
input: 供应商管理需求
output: 供应商风险预警规则定义
pos: memory/active/tasks/test-suites/risk-alert/spec.md
---

# 供应商风险预警 Spec

> **版本**: v1.0
> **日期**: 2026-02-28
> **作者**: Mino

---

## 功能目标

根据供应商的 KPI 表现、合规状态、交付记录，自动判断风险等级并触发相应的预警机制。

---

## 输入

| 字段 | 类型 | 必填 | 范围 | 说明 |
|------|------|------|------|------|
| supplier_id | string | 是 | - | 供应商 ID |
| kpi_score | number | 是 | 0-100 | 最近一个季度 KPI 得分 |
| kpi_scores_history | number[] | 否 | - | 历史 KPI 得分（最近 4 季度） |
| is_compliant | boolean | 是 | - | 本季度是否合规 |
| violation_count | number | 是 | 0+ | 累计违规次数 |
| ontime_rate | number | 是 | 0-1 | 交付及时率 |
| ontime_rate_history | number[] | 否 | - | 历史及时率（最近 4 季度） |

---

## 输出

| 字段 | 类型 | 说明 |
|------|------|------|
| risk_level | string | 风险等级（红色/橙色/黄色/绿色） |
| alert_triggered | boolean | 是否触发预警 |
| alert_reason | string | 触发原因 |
| recommended_actions | string[] | 建议措施 |

---

## 业务规则

### 规则 1：红色预警（最高风险）

**触发条件**（满足任一即触发）：
- `violation_count >= 3`（累计违规 ≥ 3 次）
- `is_compliant = false`（当前不合规）

**结果**：
- `risk_level = '红色'`
- `alert_triggered = true`
- `alert_reason = '严重违规或多次违规'`
- `recommended_actions = ['立即约谈', '启动清退评估', '暂停新业务']`

---

### 规则 2：橙色预警（高风险）

**触发条件**（满足任一即触发）：
- `kpi_score < 60`（当前季度 KPI < 60）
- `kpi_scores_history` 连续 2 季度下降（每季度下降 ≥ 10 分）
- `ontime_rate < 0.7`（交付及时率 < 70%）

**结果**：
- `risk_level = '橙色'`
- `alert_triggered = true`
- `alert_reason = 'KPI 不达标/持续下滑/交付问题'`
- `recommended_actions = ['发出整改通知', '增加监控频率', '制定改进计划']`

---

### 规则 3：黄色预警（中等风险）

**触发条件**（满足任一即触发）：
- `kpi_score < 70`（当前季度 KPI < 70）
- `violation_count >= 1`（有违规记录）
- `ontime_rate < 0.8`（交付及时率 < 80%）

**结果**：
- `risk_level = '黄色'`
- `alert_triggered = true`
- `alert_reason = 'KPI 偏低/有违规/交付延迟'`
- `recommended_actions = ['关注提醒', '要求提交改进方案']`

---

### 规则 4：绿色（正常）

**触发条件**：不满足红色/橙色/黄色任一条件

**结果**：
- `risk_level = '绿色'`
- `alert_triggered = false`
- `alert_reason = ''`
- `recommended_actions = []`

---

### 规则 5：预警优先级

**规则**：红色 > 橙色 > 黄色 > 绿色

**说明**：如果同时满足多个预警条件，触发最高级别预警。

---

## 边界条件

### 边界 1：历史数据缺失

**条件**：`kpi_scores_history` 或 `ontime_rate_history` 为空数组

**处理**：按"无历史数据"处理，不参与连续下降判断

---

### 边界 2：数据异常

**条件**：
- `kpi_score < 0` 或 `kpi_score > 100`
- `ontime_rate < 0` 或 `ontime_rate > 1`
- `violation_count < 0`

**处理**：抛出错误 `"数据异常：[字段名] 值不在有效范围内"`

---

### 边界 3：必填字段缺失

**条件**：`supplier_id`、`kpi_score`、`is_compliant`、`violation_count`、`ontime_rate` 任一为空

**处理**：抛出错误 `"缺少必填字段：[字段名]"`

---

## 验收标准

- [ ] 测试用例 1: 红色预警 - 违规 ≥ 3 次
- [ ] 测试用例 2: 红色预警 - 当前不合规
- [ ] 测试用例 3: 橙色预警 - KPI < 60
- [ ] 测试用例 4: 橙色预警 - KPI 连续下降
- [ ] 测试用例 5: 橙色预警 - 及时率 < 70%
- [ ] 测试用例 6: 黄色预警 - KPI < 70
- [ ] 测试用例 7: 黄色预警 - 有违规记录
- [ ] 测试用例 8: 黄色预警 - 及时率 < 80%
- [ ] 测试用例 9: 绿色 - 正常情况
- [ ] 测试用例 10: 优先级 - 红色 > 橙色 > 黄色
- [ ] 边界测试 1: 历史数据缺失 → 正常处理
- [ ] 边界测试 2: 数据异常 → 抛出错误

---

## 版本历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v1.0 | 2026-02-28 | 初始版本 | Mino |
