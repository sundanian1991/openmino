---
input: spec.md
output: 测试用例集合
pos: memory/active/tasks/test-suites/supplier-evaluation/test-cases.md
---

# 供应商评分计算 测试用例

> **对应 Spec**: [spec.md](./spec.md)
> **版本**: v1.0
> **日期**: 2026-02-28

---

## 测试用例清单

| 编号 | 名称 | 对应规则 | 类型 | 状态 |
|------|------|----------|------|------|
| TC-001 | 合规 + 高 KPI → A/正常 | 规则 5 | 正常流程 | ⚪ 待执行 |
| TC-002 | 不合规一票否决 | 规则 1 | 正常流程 | ⚪ 待执行 |
| TC-003 | KPI<60 → C 或以下 | 规则 2 | 正常流程 | ⚪ 待执行 |
| TC-004 | 及时率<0.8 → 降级 | 规则 3 | 正常流程 | ⚪ 待执行 |
| TC-005 | 综合得分计算 | 规则 4 | 正常流程 | ⚪ 待执行 |
| TC-006 | 等级判定 -A 级 | 规则 5 | 正常流程 | ⚪ 待执行 |
| TC-007 | 等级判定 -B 级 | 规则 5 | 正常流程 | ⚪ 待执行 |
| TC-008 | 等级判定 -C 级 | 规则 5 | 正常流程 | ⚪ 待执行 |
| BC-001 | 输入为空 → 抛错 | 边界 1 | 边界条件 | ⚪ 待执行 |
| BC-002 | KPI 超范围 → 抛错 | 边界 2 | 边界条件 | ⚪ 待执行 |
| BC-003 | 及时率超范围 → 抛错 | 边界 3 | 边界条件 | ⚪ 待执行 |
| BC-004 | 质量率缺失 → 默认 1.0 | 边界 4 | 边界条件 | ⚪ 待执行 |

**图例**: ⚪ 待执行 | 🟢 通过 | 🔴 失败

---

## 测试用例详情

### TC-001: 合规 + 高 KPI → A/正常

**对应规则**: 规则 5

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "kpi_score": 92,
  "is_compliant": true,
  "ontime_rate": 0.95,
  "quality_rate": 0.98
}
```

**预期输出**:
```json
{
  "grade": "A",
  "risk": "正常",
  "score": 86.71,
  "reasons": ["KPI≥90，基础等级 A", "合规", "及时率≥0.8，无惩罚"]
}
```

**执行方式**:
- [x] 自动化测试（代码实现）

---

### TC-002: 不合规一票否决

**对应规则**: 规则 1

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "kpi_score": 95,
  "is_compliant": false,
  "ontime_rate": 0.99,
  "quality_rate": 0.99
}
```

**预期输出**:
```json
{
  "grade": "D",
  "risk": "高危",
  "score": 0,
  "reasons": ["合规一票否决"]
}
```

---

### TC-003: KPI<60 → C 或以下

**对应规则**: 规则 2

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "kpi_score": 55,
  "is_compliant": true,
  "ontime_rate": 0.9,
  "quality_rate": 0.95
}
```

**预期输出**:
```json
{
  "grade": "C",
  "risk": "预警",
  "score": 44.93,
  "reasons": ["KPI<60，等级最高为 C", "KPI 55 对应基础等级 D，但合规所以是 C"]
}
```

---

### TC-004: 及时率<0.8 → 降级

**对应规则**: 规则 3

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "kpi_score": 88,
  "is_compliant": true,
  "ontime_rate": 0.75,
  "quality_rate": 0.95
}
```

**预期输出**:
```json
{
  "grade": "C",
  "risk": "正常",
  "score": 59.4,
  "reasons": ["KPI 88 基础等级 B", "及时率<0.8，降级 B→C"]
}
```

---

### TC-005: 综合得分计算

**对应规则**: 规则 4

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "kpi_score": 85,
  "is_compliant": true,
  "ontime_rate": 0.9,
  "quality_rate": 0.95
}
```

**预期输出**:
```json
{
  "grade": "B",
  "risk": "正常",
  "score": 68.72,
  "reasons": ["score = 85 * 0.9 * 0.95 * 0.95 = 68.72"]
}
```

---

### TC-006: 等级判定-A 级

**对应规则**: 规则 5

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "kpi_score": 90,
  "is_compliant": true,
  "ontime_rate": 1.0,
  "quality_rate": 1.0
}
```

**预期输出**:
```json
{
  "grade": "A",
  "risk": "正常",
  "score": 90,
  "reasons": ["KPI≥90，等级 A"]
}
```

---

### TC-007: 等级判定-B 级

**对应规则**: 规则 5

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "kpi_score": 85,
  "is_compliant": true,
  "ontime_rate": 1.0,
  "quality_rate": 1.0
}
```

**预期输出**:
```json
{
  "grade": "B",
  "risk": "正常",
  "score": 85,
  "reasons": ["KPI 80-89，等级 B"]
}
```

---

### TC-008: 等级判定-C 级

**对应规则**: 规则 5

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "kpi_score": 70,
  "is_compliant": true,
  "ontime_rate": 1.0,
  "quality_rate": 1.0
}
```

**预期输出**:
```json
{
  "grade": "C",
  "risk": "正常",
  "score": 70,
  "reasons": ["KPI 60-79，等级 C"]
}
```

---

## 边界条件测试

### BC-001: 输入为空 → 抛错

**对应边界**: 边界 1

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "kpi_score": null,
  "is_compliant": true,
  "ontime_rate": 0.9
}
```

**预期行为**:
```
抛出错误："缺少必填字段：kpi_score"
```

---

### BC-002: KPI 超范围 → 抛错

**对应边界**: 边界 2

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "kpi_score": 105,
  "is_compliant": true,
  "ontime_rate": 0.9
}
```

**预期行为**:
```
抛出错误："KPI 得分必须在 0-100 之间"
```

---

### BC-003: 及时率超范围 → 抛错

**对应边界**: 边界 3

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "kpi_score": 85,
  "is_compliant": true,
  "ontime_rate": 1.5
}
```

**预期行为**:
```
抛出错误："交付及时率必须在 0-1 之间"
```

---

### BC-004: 质量率缺失 → 默认 1.0

**对应边界**: 边界 4

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "kpi_score": 90,
  "is_compliant": true,
  "ontime_rate": 0.9
  // quality_rate 缺失
}
```

**预期输出**:
```json
{
  "grade": "A",
  "risk": "正常",
  "score": 81,
  "reasons": ["quality_rate 使用默认值 1.0"]
}
```

---

## 执行汇总

| 类型 | 总数 | 通过 | 失败 | 通过率 |
|------|------|------|------|--------|
| 正常流程 | 8 | 0 | 0 | - |
| 边界条件 | 4 | 0 | 0 | - |
| **总计** | 12 | 0 | 0 | - |

---

## 备注

- 所有测试用例基于 Spec v1.0
- 自动化测试代码位于：`implementation/` 目录
- 执行测试：`npm run test -- supplier-evaluation`
