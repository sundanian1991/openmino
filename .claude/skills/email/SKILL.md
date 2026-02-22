---
name: sending-email
description: Use when user needs to send email via SMTP, create email templates for business communication, or automate regular email reports like daily news/weekly summaries
---

# Sending Email

## Overview

Send professional business emails through nodemailer with standardized templates based on email type and recipient.

## When to Use

```
Need to communicate for work?
    ├─ One-off email? → Pick appropriate template from templates/
    ├─ Regular report? → Use automation pattern
    └─ Not sure? → Ask: Who is recipient? What is purpose?
```

**Use when:**
- Sending business emails (reports, notifications, collaboration)
- Creating standardized email templates
- Setting up automated email reports (daily news, weekly summaries)
- Providing email communication templates for user

**Don't use for:** Personal casual messages, non-SMTP email providers

## Configuration

SMTP server pre-configured for sundanian@yeah.net:
- Host: smtp.yeah.net
- Port: 465 (SSL)
- Secure: true

### 默认签名（正式邮件自动追加）

HTML格式：
```html
<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
  <p><strong>孙大年</strong></p>
  <p style="margin: 5px 0; color: #666; font-size: 13px;">
    京东科技-金融科技事业群-数据科技业务部-电销服务组
  </p>
  <p style="margin: 5px 0; color: #666; font-size: 13px;">
    电话：+86 18249515580 &nbsp;|&nbsp; 邮箱：sundanian@jd.com
  </p>
  <p style="margin: 5px 0; color: #666; font-size: 13px;">
    地址：北京市经济技术开发区科创十一街京东总部二号楼A座19层
  </p>
  <p style="margin-top: 15px; padding: 10px; background: #f9f9f9; border-left: 3px solid #e74c3c; color: #666; font-size: 12px;">
    <strong>重要提示：</strong>此邮件及附件具保密性质，包含商业秘密，受法律保护不得泄露。如果您意外收到此邮件，请立即通知我，并从您的系统中删除此邮件及附件，禁止使用、复制或向他人披露。
  </p>
</div>
```

文本格式：
```

--
孙大年
京东科技-金融科技事业群-数据科技业务部-电销服务组
电话：+86 18249515580 | 邮箱：sundanian@jd.com
地址：北京市经济技术开发区科创十一街京东总部二号楼A座19层

重要提示：此邮件及附件具保密性质，包含商业秘密，受法律保护不得泄露。
```

## Quick Reference

### 通用邮件 (2个)
| 正式汇报 | formal-report.md | 向上汇报、专项汇报、周报月报 |
| 通知类 | notification.md | 会议通知、变更通知、紧急事项 |
| 协作类 | collaboration.md | 方案审阅、决策请求、跨部门协作 |
| 内部简洁 | internal.md | 日常沟通、快速同步 |

### 供应商管理 - 全生命周期 (6个文件)
| 储备寻求 | supplier-reserve.md | 寻源计划、合作邀约、准入协同、供应商池更新 |
| 引入上线 | supplier-onboard.md | 准入评估、准入通知、系统接入、试运行、转正评估 |
| 日常运营 | supplier-operations.md | 运营报告、定期总结、整改通知、约谈邀约、巡检报告、故障通报 |
| 评估激励 | supplier-evaluation-full.md | 季度排名汇报、评估结果通知、排名公布、合同续约、年度表彰 |
| 清退处置 | supplier-clearance.md | 风险处置、清退决策、清退通知、交接计划、完成报告 |
| 结算对账 | supplier-settlement.md | 月度对账、结算异常、付款通知、成本分析、审计协助、税务协调 |

### 扩展模块 (6个文件)
| 商务谈判 | supplier-negotiation.md | 价格谈判、激励方案、合同讨论 |
| 分量扩项 | supplier-allocation.md | 分量调整、扩项申请、产能调配 |
| 内部协调 | internal-coordination.md | 决策请示、会议邀请、进度同步 |
| 合规管控 | compliance-risk-control.md | 合规培训、案例通报、风险预警 |
| 处罚争议 | punishment-dispute.md | 处罚决定、申诉、复查 |
| 风险通报 | risk-alert.md | 合规风险、异常情况 |

**数据统计**：
- 模板文件：18个
- 模板总数：50+（每个文件包含多个场景模板）
- 覆盖范围：供应商全生命周期 + 内部协调

## Implementation

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.yeah.net',
  port: 465,
  secure: true,
  auth: {
    user: 'sundanian@yeah.net',
    pass: 'GFTHt35ZqjdxFUfP'
  }
});

await transporter.sendMail({
  from: 'sundanian@yeah.net',
  to: 'recipient@company.com',
  subject: 'Subject line',
  text: 'Plain text content',
  html: '<p>HTML content</p>',
  attachments: [{ filename: 'file.pdf', path: '/path/to/file.pdf' }]
});
```

## Email Best Practices

### 邮件写作标准（专业简洁，空间舒适）

**核心原则：段落逻辑优先，视觉装饰为零，适度留白舒适**

| 正确做法 | 错误做法 |
|----------|----------|
| 段落开始用**加粗关键词**区分 | 用分割线/边框等装饰 |
| 表格用于数据展示 | 用表格做视觉分隔 |
| 段落靠内在逻辑推进 | 依赖分段/标题堆叠 |
| 适度留白保持阅读节奏 | 段落过密或过疏 |

**标准格式示例：**

```html
<p>尊敬的XXX：</p>

<p>一句话概括邮件内容。</p>

<p><strong>事实部分：</strong></p>

<p>具体事实描述，用列表或表格呈现关键数据（时间、人员、数据）。</p>

<p><strong>分析判断：</strong></p>

<p>基于事实的分析，使用"综合评估认为"、"这说明"等专业表述。</p>

<p><strong>建议/结论：</strong></p>

<p>明确的建议或结论，附上理由和依据。</p>

<p><strong>风险提示/后续安排：</strong></p>

<p>必要的风险说明或后续行动步骤。</p>

<p>结尾总结句和行动请求（请审阅/请批示/如有问题请反馈）。</p>
```

**6条具体规则**：

1. **开头称呼**：称呼单行，空一行后接主体
2. **关键词标识**：每个段落开始用`<p><strong>关键词：</strong>`标识
3. **禁止装饰**：不使用分割线、边框等视觉装饰
4. **数据结构化**：时间、人员、数据等用列表/表格清晰呈现
5. **留白适度**：段落之间空一行，保持阅读节奏
6. **结尾行动**：明确的行动请求或请示

**Format Guidelines:**

**Subject line:**
- Start with "关于..." for clarity
- Be specific and concise
- Include timeframe if time-sensitive

**Content structure:**
1. **开头**：称呼+目的
2. **事实部分**：列表/表格呈现（时间、人员、数据等）
3. **过渡句**：段落间用"基于上述..."、"综合评估..."等连接
4. **分析判断**："我们认为..."、"这说明..."等加入观点
5. **结尾**：明确请求（"请审阅"、"如有问题请反馈"）

**Format techniques:**
- Use bullet/numbered lists for structured data (time, personnel, metrics)
- Use tables for dense data presentation
- Use paragraphs for narrative sections with transitions
- **Mark key items with \*\*bold\*\***
- Clear CTA (Call to Action) - "what you need to do"
- Add transitional sentences between sections
- Include analysis/judgment, not just facts

**Tone:**
- Professional and formal, not casual
- Clear and direct, not robotic
- Logical and well-structured

**Signature:**
- Always append the standard signature below

**Format:**
- External use: formal but natural, not robotic
- Internal use: concise but professional
- Always verify recipient before sending

## Automation Patterns

**Daily news summary:**
```javascript
// 1. Fetch news from sources
const news = await fetchNews();

// 2. Format using template
const content = formatDailyNews(news);

// 3. Send to recipient
await transporter.sendMail({
  to: 'user@company.com',
  subject: '关于今日新闻简报',
  html: content
});
```

**Weekly report:**
```javascript
// 1. Collect KPI data
const kpis = await collectKPIs();

// 2. Generate from formal-report.md template
const report = generateWeeklyReport(kpis);

// 3. Send to manager
await transporter.sendMail({
  to: 'manager@company.com',
  subject: '关于第XX周工作汇报',
  html: report
});
```

## Common Mistakes

| ❌ Mistake | ✅ Fix |
|-----------|-------|
| Vague subject like "汇报" | Specific: "关于供应商Q1评估汇报" |
| No action item | Add: "请于周五前反馈" |
| Everything bold | Bold only key items |
| Forgot attachment | Always verify before sending |
| Wrong recipient | Double-check email address |

## See Also

**See templates/ directory for full email templates organized by module:**

**General (4 templates):**
- `templates/formal-report.md` - Detailed reporting format
- `templates/notification.md` - Notification announcements
- `templates/collaboration.md` - Cross-department requests
- `templates/internal.md` - Concise internal communication

**Supplier Lifecycle (6 files, 30+ templates):**
- `templates/supplier-reserve.md` - 寻源储备：寻源计划、合作邀约、准入协同、供应商池更新
- `templates/supplier-onboard.md` - 引入上线：准入评估、准入通知、系统接入、试运行、转正评估
- `templates/supplier-operations.md` - 日常运营：运营报告、定期总结、整改通知、约谈邀约、巡检报告、故障通报
- `templates/supplier-evaluation-full.md` - 评估激励：季度排名汇报、评估结果通知、排名公布、合同续约、年度表彰
- `templates/supplier-clearance.md` - 清退处置：风险处置、清退决策、清退通知、交接计划、完成报告
- `templates/supplier-settlement.md` - 结算对账：月度对账、结算异常、付款通知、成本分析、审计协助、税务协调

**Extended Modules (6 files, 20+ templates):**
- `templates/supplier-negotiation.md` - 商务谈判、价格调整、合同讨论
- `templates/supplier-allocation.md` - 分量扩项、产能调配
- `templates/internal-coordination.md` - 内部协调、决策请示、会议邀请、进度同步
- `templates/compliance-risk-control.md` - 合规培训、案例通报、风险预警
- `templates/punishment-dispute.md` - 处罚决定、争议处理、申诉复查
- `templates/risk-alert.md` 合规风险、异常情况通报
