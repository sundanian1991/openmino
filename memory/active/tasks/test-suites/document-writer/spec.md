---
input: 邮件场景需求
output: 结构化邮件内容
pos: memory/active/tasks/test-suites/document-writer/spec.md
---

# 公文写作工具 Spec

> **版本**: v1.0
> **日期**: 2026-02-28
> **作者**: Mino

---

## 功能目标

根据用户输入的场景信息（收件人、主题、核心内容），结合模板库和写作标准，自动生成结构清晰、内容得体的商务邮件。

---

## 输入

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| scenario | string | 是 | 场景类型（见下方） |
| recipient | string | 是 | 收件人姓名/职位 |
| sender | string | 否 | 发件人（默认：孙大年） |
| subject | string | 是 | 邮件主题 |
| key_content | string | 是 | 核心内容（关键信息、数据、问题等） |
| action_request | string | 否 | 期望收件人采取的行动 |
| tone | string | 否 | 语气（formal/casual，默认 formal） |
| additional_info | object | 否 | 额外信息（见下方） |

### 场景类型（scenario）

| 值 | 说明 | 对应模板 |
|---|------|----------|
| formal_report | 正式汇报 | formal-report.md |
| notification | 通知 | notification.md |
| collaboration | 协作 | collaboration.md |
| internal | 内部沟通 | internal.md |
| supplier_reserve | 供应商储备 | supplier-reserve.md |
| supplier_onboard | 供应商引入 | supplier-onboard.md |
| supplier_operations | 供应商运营 | supplier-operations.md |
| supplier_evaluation | 供应商评估 | supplier-evaluation.md |
| supplier_clearance | 供应商清退 | supplier-clearance.md |
| supplier_settlement | 供应商结算 | supplier-settlement.md |
| supplier_negotiation | 商务谈判 | supplier-negotiation.md |
| supplier_allocation | 分量扩项 | supplier-allocation.md |
| internal_coordination | 内部协调 | internal-coordination.md |
| compliance_risk | 合规管控 | compliance-risk-control.md |
| punishment_dispute | 处罚争议 | punishment-dispute.md |
| risk_alert | 风险通报 | risk-alert.md |

### 额外信息（additional_info）

| 字段 | 类型 | 说明 |
|------|------|------|
| deadline | string | 截止时间 |
| attachments | string[] | 附件列表 |
| cc | string[] | 抄送人 |
| priority | string | 优先级（high/normal/low） |
| data_table | object | 结构化数据（用于表格） |

---

## 输出

| 字段 | 类型 | 说明 |
|------|------|------|
| subject | string | 邮件主题 |
| body | string | 邮件正文（HTML 格式） |
| signature | string | 签名 |
| raw_text | string | 纯文本版本 |
| attachments | string[] | 附件建议 |

---

## 业务规则

### 规则 1：模板匹配

**逻辑**：根据 scenario 选择对应模板，填充 key_content

**模板优先级**：
1. 精确匹配：scenario 直接对应模板
2. 模糊匹配：关键词匹配
3. 默认：formal-report 模板

---

### 规则 2：结构生成

**逻辑**：按邮件写作标准生成结构

**标准结构**：
```
称呼：一句话概括
事实部分：关键数据、问题描述
分析判断：基于事实的观点
建议/结论：明确建议
风险提示/后续安排：必要说明
结尾行动：明确的行动请求
```

**规则**：
- 段落开始用**加粗关键词**标识
- 禁止使用分割线/边框等装饰
- 数据用表格或列表呈现
- 段落之间空一行保持节奏

---

### 规则 3：内容填充

**逻辑**：将 key_content 智能填充到模板

**填充规则**：
- 关键信息 → 事实部分
- 数据 → 表格呈现
- 问题描述 → 问题分析
- 行动请求 → 结尾行动

---

### 规则 4：签名追加

**逻辑**：根据收件人类型选择签名

| 收件人类型 | 签名格式 |
|-----------|---------|
| 外部（供应商） | 完整签名（带公司、职位、电话、邮箱、地址、保密提示） |
| 内部（同事/领导） | 简洁签名（姓名+电话+邮箱） |

---

### 规则 5：语气调整

**逻辑**：根据 tone 参数调整语气

| tone | 调整方式 |
|------|----------|
| formal | 完整结构，正式用语 |
| casual | 简化结构，轻松语气 |
| urgent | 强调截止时间，行动明确 |

---

### 规则 6：优先级处理

**逻辑**：根据 priority 添加标记

| priority | 主题前缀 |
|----------|----------|
| high | 【紧急】或【重要】 |
| urgent | 【紧急】 |
| normal | 无前缀 |

---

## 边界条件

### 边界 1：缺少必填字段

**条件**：scenario/recipient/subject/key_content 任一为空

**处理**：抛出错误 `"缺少必填字段：[字段名]"`

---

### 边界 2：不支持的场景

**条件**：scenario 不在支持列表

**处理**：使用 formal-report 作为默认模板，并给出提示

---

### 边界 3：内容过长

**条件**：key_content 超过 2000 字

**处理**：自动分段处理，分多段呈现

---

### 边界 4：特殊字符处理

**条件**：包含 HTML 特殊字符（< > & " '）

**处理**：转义处理，防止 XSS

---

## 验收标准

- [ ] 测试用例 1: 正式汇报邮件生成
- [ ] 测试用例 2: 供应商评估邮件生成
- [ ] 测试用例 3: 内部协调邮件生成
- [ ] 测试用例 4: 带数据表格的邮件
- [ ] 测试用例 5: 高优先级邮件
- [ ] 测试用例 6: 外部收件人签名
- [ ] 测试用例 7: 内部收件人签名
- [ ] 测试用例 8: 简化语气（casual）
- [ ] 边界测试 1: 缺少必填字段 → 抛错
- [ ] 边界测试 2: 不支持场景 → 默认模板
- [ ] 边界测试 3: 特殊字符转义

---

## 版本历史

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|----------|------|
| v1.0 | 2026-02-28 | 初始版本 | Mino |
