---
input: spec.md
output: 测试用例集合
pos: memory/active/tasks/test-suites/risk-alert/test-cases.md
---

# 供应商风险预警 测试用例

> **对应 Spec**: [spec.md](./spec.md)
> **版本**: v1.0
> **日期**: 2026-02-28

---

## 测试用例清单

| 编号 | 名称 | 对应规则 | 类型 | 状态 |
|------|------|----------|------|------|
| TC-001 | 红色预警-违规≥3次 | 规则 1 | 正常流程 | ⚪ 待执行 |
| TC-002 | 红色预警-当前不合规 | 规则 1 | 正常流程 | ⚪ 待执行 |
| TC-003 | 橙色预警-KPI<60 | 规则 2 | 正常流程 | ⚪ 待执行 |
| TC-004 | 橙色预警-连续下降 | 规则 2 | 正常流程 | ⚪ 待执行 |
| TC-005 | 橙色预警-及时率<70% | 规则 2 | 正常流程 | ⚪ 待执行 |
| TC-006 | 黄色预警-KPI<70 | 规则 3 | 正常流程 | ⚪ 待执行 |
| TC-007 | 黄色预警-有违规记录 | 规则 3 | 正常流程 | ⚪ 待执行 |
| TC-008 | 黄色预警-及时率<80% | 规则 3 | 正常流程 | ⚪ 待执行 |
| TC-009 | 绿色-正常情况 | 规则 4 | 正常流程 | ⚪ 待执行 |
| TC-010 | 优先级红色>橙色>黄色 | 规则 5 | 正常流程 | ⚪ 待执行 |
| BC-001 | 历史数据缺失 | 边界 1 | 边界条件 | ⚪ 待执行 |
| BC-002 | 数据异常 | 边界 2 | 边界条件 | ⚪ 待执行 |

**图例**: ⚪ 待执行 | 🟢 通过 | 🔴 失败

---

## 测试用例详情

### TC-001: 红色预警-违规≥3次

**对应规则**: 规则 1

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP001",
  "kpi_score": 85,
  "is_compliant": true,
  "violation_count": 3,
  "ontime_rate": 0.95
}
```

**预期输出**:
```json
{
  "risk_level": "红色",
  "alert_triggered": true,
  "alert_reason": "严重违规或多次违规",
  "recommended_actions": ["立即约谈", "启动清退评估", "暂停新业务"]
}
```

---

### TC-002: 红色预警-当前不合规

**对应规则**: 规则 1

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP002",
  "kpi_score": 90,
  "is_compliant": false,
  "violation_count": 1,
  "ontime_rate": 0.99
}
```

**预期输出**:
```json
{
  "risk_level": "红色",
  "alert_triggered": true,
  "alert_reason": "严重违规或多次违规",
  "recommended_actions": ["立即约谈", "启动清退评估", "暂停新业务"]
}
```

---

### TC-003: 橙色预警-KPI<60

**对应规则**: 规则 2

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP003",
  "kpi_score": 55,
  "is_compliant": true,
  "violation_count": 0,
  "ontime_rate": 0.9
}
```

**预期输出**:
```json
{
  "risk_level": "橙色",
  "alert_triggered": true,
  "alert_reason": "KPI 不达标/持续下滑/交付问题",
  "recommended_actions": ["发出整改通知", "增加监控频率", "制定改进计划"]
}
```

---

### TC-004: 橙色预警-连续下降

**对应规则**: 规则 2

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP004",
  "kpi_score": 70,
  "kpi_scores_history": [95, 85, 75, 70],
  "is_compliant": true,
  "violation_count": 0,
  "ontime_rate": 0.9
}
```

**说明**: 从 95→85 下降 10，85→75 下降 10，连续下降 2 季度

**预期输出**:
```json
{
  "risk_level": "橙色",
  "alert_triggered": true,
  "alert_reason": "KPI 不达标/持续下滑/交付问题"
}
```

---

### TC-005: 橙色预警-及时率<70%

**对应规则**: 规则 2

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP005",
  "kpi_score": 80,
  "is_compliant": true,
  "violation_count": 0,
  "ontime_rate": 0.65
}
```

**预期输出**:
```json
{
  "risk_level": "橙色",
  "alert_triggered": true,
  "alert_reason": "KPI 不达标/持续下滑/交付问题"
}
```

---

### TC-006: 黄色预警-KPI<70

**对应规则**: 规则 3

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP006",
  "kpi_score": 65,
  "is_compliant": true,
  "violation_count": 0,
  "ontime_rate": 0.9
}
```

**预期输出**:
```json
{
  "risk_level": "黄色",
  "alert_triggered": true,
  "alert_reason": "KPI 偏低/有违规/交付延迟"
}
```

---

### TC-007: 黄色预警-有违规记录

**对应规则**: 规则 3

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP007",
  "kpi_score": 85,
  "is_compliant": true,
  "violation_count": 1,
  "ontime_rate": 0.95
}
```

**预期输出**:
```json
{
  "risk_level": "黄色",
  "alert_triggered": true,
  "alert_reason": "KPI 偏低/有违规/交付延迟"
}
```

---

### TC-008: 黄色预警-及时率<80%

**对应规则**: 规则 3

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP008",
  "kpi_score": 85,
  "is_compliant": true,
  "violation_count": 0,
  "ontime_rate": 0.75
}
```

**预期输出**:
```json
{
  "risk_level": "黄色",
  "alert_triggered": true,
  "alert_reason": "KPI 偏低/有违规/交付延迟"
}
```

---

### TC-009: 绿色-正常情况

**对应规则**: 规则 4

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP009",
  "kpi_score": 90,
  "is_compliant": true,
  "violation_count": 0,
  "ontime_rate": 0.95
}
```

**预期输出**:
```json
{
  "risk_level": "绿色",
  "alert_triggered": false,
  "alert_reason": "",
  "recommended_actions": []
}
```

---

### TC-010: 优先级-红色>橙色>黄色

**对应规则**: 规则 5

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "supplier_id": "SUP010",
  "kpi_score": 55,
  "is_compliant": false,
  "violation_count": 3,
  "ontime_rate": 0.65
}
```

**说明**: 同时满足红色（violation_count>=3, 不合规）、橙色（kpi<60, ontime<0.7）、黄色（violation_count>=1, ontime<0.8）条件，应触发最高级别红色

**预期输出**:
```json
{
  "risk_level": "红色",
  "alert_triggered": true
}
```

---

## 边界条件测试

### BC-001: 历史数据缺失

**对应边界**: 边界 1

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "supplier_id": "SUP011",
  "kpi_score": 75,
  "kpi_scores_history": [],
  "is_compliant": true,
  "violation_count": 0,
  "ontime_rate": 0.9,
  "ontime_rate_history": []
}
```

**预期输出**:
```json
{
  "risk_level": "黄色",
  "alert_triggered": true,
  "alert_reason": "KPI 偏低/有违规/交付延迟"
}
```

**说明**: KPI 65-70 范围应该触发黄色预警

---

### BC-002: 数据异常

**对应边界**: 边界 2

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "supplier_id": "SUP012",
  "kpi_score": 105,
  "is_compliant": true,
  "violation_count": 0,
  "ontime_rate": 0.9
}
```

**预期行为**:
```
抛出错误："数据异常：kpi_score 值不在有效范围内"
```

---

## 执行汇总

| 类型 | 总数 | 通过 | 失败 | 通过率 |
|------|------|------|------|--------|
| 正常流程 | 10 | 0 | 0 | - |
| 边界条件 | 2 | 0 | 0 | - |
| **总计** | 12 | 0 | 0 | - |

---

## 备注

- 所有测试用例基于 Spec v1.0
- 自动化测试代码位于：`implementation/` 目录
- 执行测试：`npm run test -- risk-alert`
