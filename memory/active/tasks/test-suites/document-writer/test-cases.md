---
input: spec.md
output: 测试用例集合
pos: memory/active/tasks/test-suites/document-writer/test-cases.md
---

# 公文写作工具 测试用例

> **对应 Spec**: [spec.md](./spec.md)
> **版本**: v1.0
> **日期**: 2026-02-28

---

## 测试用例清单

| 编号 | 名称 | 对应规则 | 类型 | 状态 |
|------|------|----------|------|------|
| TC-001 | 正式汇报邮件生成 | 规则 1,2,3 | 正常流程 | ⚪ 待执行 |
| TC-002 | 供应商评估邮件生成 | 规则 1 | 正常流程 | ⚪ 待执行 |
| TC-003 | 内部协调邮件生成 | 规则 1 | 正常流程 | ⚪ 待执行 |
| TC-004 | 带数据表格的邮件 | 规则 3 | 正常流程 | ⚪ 待执行 |
| TC-005 | 高优先级邮件 | 规则 6 | 正常流程 | ⚪ 待执行 |
| TC-006 | 外部收件人签名 | 规则 4 | 正常流程 | ⚪ 待执行 |
| TC-007 | 内部收件人签名 | 规则 4 | 正常流程 | ⚪ 待执行 |
| TC-008 | 简化语气邮件 | 规则 5 | 正常流程 | ⚪ 待执行 |
| BC-001 | 缺少必填字段 | 边界 1 | 边界条件 | ⚪ 待执行 |
| BC-002 | 不支持场景 | 边界 2 | 边界条件 | ⚪ 待执行 |
| BC-003 | 特殊字符转义 | 边界 4 | 边界条件 | ⚪ 待执行 |

**图例**: ⚪ 待执行 | 🟢 通过 | 🔴 失败

---

## 测试用例详情

### TC-001: 正式汇报邮件生成

**对应规则**: 规则 1, 2, 3

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "scenario": "formal_report",
  "recipient": "张总",
  "subject": "关于Q1供应商管理汇报",
  "key_content": "本季度供应商 KPI 平均得分 85.2 分，环比提升 3.5 分。其中 A 类供应商 15 家， B 类供应商 20 家。发现 2 家供应商存在合规风险，已启动整改。",
  "action_request": "请审阅并批示下一步工作计划"
}
```

**预期输出**:
```json
{
  "subject": "关于Q1供应商管理汇报",
  "body": "<p>尊敬的 张总：</p><p>关于 Q1 供应商管理汇报，说明如下。</p><p><strong>基本情况：</strong></p><p>本季度供应商 KPI 平均得分 85.2 分，环比提升 3.5 分。</p><p><strong>供应商分布：</strong></p><p>A 类供应商 15 家，B 类供应商 20 家。</p><p><strong>风险情况：</strong></p><p>发现 2 家供应商存在合规风险，已启动整改。</p><p><strong>下一步计划：</strong></p><p>继续深化供应商评估体系，加强合规管控。</p><p>请审阅并批示下一步工作计划。</p>",
  "has_signature": true,
  "signature_type": "完整签名"
}
```

---

### TC-002: 供应商评估邮件生成

**对应规则**: 规则 1

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "scenario": "supplier_evaluation",
  "recipient": "李经理",
  "subject": "关于XX供应商Q1评估结果通知",
  "key_content": "贵司在 Q1 评估中得分 92 分，评级为 A 级。交付及时率 98%，质量合格率 95%。希望继续保持合作。",
  "action_request": "如有异议请于 3 日内反馈"
}
```

**预期输出**:
```json
{
  "subject": "关于XX供应商Q1评估结果通知",
  "has_template": true,
  "body_contains": ["评估结果", "得分", "评级", "A 级"]
}
```

---

### TC-003: 内部协调邮件生成

**对应规则**: 规则 1

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "scenario": "internal_coordination",
  "recipient": "王同事",
  "subject": "关于供应商数据对接协调",
  "key_content": "需要协调财务部门提供供应商结算数据，预计涉及 35 家供应商的对账信息。",
  "action_request": "请确认对接时间和方式"
}
```

**预期输出**:
```json
{
  "subject": "关于供应商数据对接协调",
  "body_contains": ["协调", "确认"]
}
```

---

### TC-004: 带数据表格的邮件

**对应规则**: 规则 3

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "scenario": "formal_report",
  "recipient": "领导",
  "subject": "供应商月度 KPI 报表",
  "key_content": "10 家重点供应商 KPI 数据",
  "additional_info": {
    "data_table": {
      "headers": ["供应商名称", "KPI得分", "评级"],
      "rows": [
        ["供应商A", "92", "A"],
        ["供应商B", "85", "B"],
        ["供应商C", "78", "C"]
      ]
    }
  }
}
```

**预期输出**:
```json
{
  "body_contains": ["<table>", "<th>", "<td>", "供应商名称", "KPI得分", "评级"]
}
```

---

### TC-005: 高优先级邮件

**对应规则**: 规则 6

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "scenario": "notification",
  "recipient": "全体供应商",
  "subject": "关于系统升级通知",
  "key_content": "系统将于本周六进行升级维护",
  "priority": "high"
}
```

**预期输出**:
```json
{
  "subject_prefix": "【重要】"
}
```

---

### TC-006: 外部收件人签名

**对应规则**: 规则 4

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "scenario": "supplier_operations",
  "recipient": "供应商张总",
  "subject": "关于合作事宜",
  "key_content": "感谢贵司支持"
}
```

**预期输出**:
```json
{
  "signature_contains": ["京东科技", "孙大年", "电话", "邮箱", "保密提示"]
}
```

---

### TC-007: 内部收件人签名

**对应规则**: 规则 4

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "scenario": "internal",
  "recipient": "同事小李",
  "subject": "关于数据同步",
  "key_content": "数据已同步完成"
}
```

**预期输出**:
```json
{
  "signature_contains": ["孙大年"],
  "signature_not_contains": ["京东科技", "保密提示"]
}
```

---

### TC-008: 简化语气邮件

**对应规则**: 规则 5

**类型**:
- [x] 正常流程

**输入**:
```json
{
  "scenario": "internal",
  "recipient": "同事",
  "subject": "帮忙看下这个数据",
  "key_content": "这个月供应商数据有点奇怪，帮忙看看是啥情况",
  "tone": "casual"
}
```

**预期输出**:
```json
{
  "body_length_less_than_formal": true,
  "body_contains": ["帮忙", "看看"]
}
```

---

## 边界条件测试

### BC-001: 缺少必填字段

**对应边界**: 边界 1

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "scenario": "formal_report",
  "subject": "测试",
  "key_content": "内容"
}
```

**预期行为**:
```
抛出错误："缺少必填字段：recipient"
```

---

### BC-002: 不支持场景

**对应边界**: 边界 2

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "scenario": "unsupported_scenario",
  "recipient": "测试",
  "subject": "测试",
  "key_content": "内容"
}
```

**预期行为**:
```
使用默认 formal_report 模板，给出提示
```

---

### BC-003: 特殊字符转义

**对应边界**: 边界 4

**类型**:
- [x] 边界条件

**输入**:
```json
{
  "scenario": "internal",
  "recipient": "测试",
  "subject": "关于 <script> 标签",
  "key_content": "内容包含 <test> & \"引号\""
}
```

**预期输出**:
```json
{
  "body_safe": true,
  "body_not_contains": ["<script>", "&lt;script&gt;"]
}
```

---

## 执行汇总

| 类型 | 总数 | 通过 | 失败 | 通过率 |
|------|------|------|------|--------|
| 正常流程 | 8 | 0 | 0 | - |
| 边界条件 | 3 | 0 | 0 | - |
| **总计** | 11 | 0 | 0 | - |

---

## 备注

- 所有测试用例基于 Spec v1.0
- 自动化测试代码位于：`implementation/` 目录
- 执行测试：`npm run test -- document-writer`
