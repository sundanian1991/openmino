/**
 * 公文写作工具实现
 *
 * Spec: memory/active/tasks/test-suites/document-writer/spec.md
 * 测试：memory/active/tasks/test-suites/document-writer/test-cases.md
 */

export interface DocumentInput {
  scenario: string;
  recipient: string;
  sender?: string;
  subject: string;
  key_content: string;
  action_request?: string;
  tone?: 'formal' | 'casual';
  additional_info?: {
    deadline?: string;
    attachments?: string[];
    cc?: string[];
    priority?: 'high' | 'urgent' | 'normal';
    data_table?: {
      headers: string[];
      rows: string[][];
    };
  };
}

export interface DocumentOutput {
  subject: string;
  body: string;
  signature: string;
  raw_text: string;
  attachments: string[];
}

// 场景到模板的映射
const SCENARIO_TEMPLATES: Record<string, string> = {
  formal_report: 'formal-report',
  notification: 'notification',
  collaboration: 'collaboration',
  internal: 'internal',
  supplier_reserve: 'supplier-reserve',
  supplier_onboard: 'supplier-onboard',
  supplier_operations: 'supplier-operations',
  supplier_evaluation: 'supplier-evaluation',
  supplier_clearance: 'supplier-clearance',
  supplier_settlement: 'supplier-settlement',
  supplier_negotiation: 'supplier-negotiation',
  supplier_allocation: 'supplier-allocation',
  internal_coordination: 'internal-coordination',
  compliance_risk: 'compliance-risk-control',
  punishment_dispute: 'punishment-dispute',
  risk_alert: 'risk-alert',
};

// HTML 转义
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// 完整签名（外部）
const EXTERNAL_SIGNATURE = `
--------------------------------------------------------

孙大年
京东科技-金融科技事业群-数据科技业务部-电销服务组
电话：+86 18249515580
邮箱：sundanian@jd.com
地址：北京市经济技术开发区科创十一街京东总部二号楼A座19层

重要提示：此邮件及附件具保密性质，包含商业秘密，受法律保护不得泄露，特此提醒您此邮件的机密性。如果您意外收到此邮件，请立即通知我，并从您的系统中删除此邮件及附件，禁止使用、复制或向他人披露邮件及附件相关内容。
`.trim();

// 简洁签名（内部）
const INTERNAL_SIGNATURE = `
孙大年 | 电话：18249515580 | sundanian@jd.com
`.trim();

/**
 * 验证必填字段
 */
function validateInput(input: DocumentInput): void {
  if (!input.scenario) {
    throw new Error('缺少必填字段：scenario');
  }
  if (!input.recipient) {
    throw new Error('缺少必填字段：recipient');
  }
  if (!input.subject) {
    throw new Error('缺少必填字段：subject');
  }
  if (!input.key_content) {
    throw new Error('缺少必填字段：key_content');
  }
}

/**
 * 判断是否外部收件人
 */
function isExternalRecipient(recipient: string): boolean {
  const externalKeywords = ['总', '经理', '总监', '供应商', '公司', '董', '副总裁'];
  return externalKeywords.some((keyword) => recipient.includes(keyword));
}

/**
 * 获取签名
 */
function getSignature(recipient: string): string {
  return isExternalRecipient(recipient) ? EXTERNAL_SIGNATURE : INTERNAL_SIGNATURE;
}

/**
 * 添加优先级前缀
 */
function addPriorityPrefix(subject: string, priority?: string): string {
  if (!priority || priority === 'normal') {
    return subject;
  }
  if (priority === 'high' || priority === 'urgent') {
    return `【重要】${subject}`;
  }
  return subject;
}

/**
 * 生成数据表格
 */
function generateDataTable(dataTable?: { headers: string[]; rows: string[][] }): string {
  if (!dataTable || !dataTable.headers || !dataTable.rows) {
    return '';
  }

  let html = '<table border="1" cellpadding="5" style="border-collapse: collapse;">';

  // 表头
  html += '<tr>';
  for (const header of dataTable.headers) {
    html += `<th style="background-color: #f0f0f0;">${escapeHtml(header)}</th>`;
  }
  html += '</tr>';

  // 数据行
  for (const row of dataTable.rows) {
    html += '<tr>';
    for (const cell of row) {
      html += `<td>${escapeHtml(cell)}</td>`;
    }
    html += '</tr>';
  }

  html += '</table>';
  return html;
}

/**
 * 智能分词和结构化
 */
function structureContent(content: string, dataTable?: any): string {
  const paragraphs: string[] = [];

  // 尝试识别数据表格
  if (dataTable) {
    paragraphs.push(generateDataTable(dataTable));
  }

  // 分段处理内容
  const sentences = content.split(/[，。；\n]/).filter((s) => s.trim());

  let currentSection = '';
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    // 识别关键段落
    if (trimmed.includes('得分') || trimmed.includes('KPI') || trimmed.includes('分数')) {
      if (currentSection) {
        paragraphs.push(`<p><strong>数据情况：</strong>${currentSection}</p>`);
      }
      currentSection = trimmed;
    } else if (trimmed.includes('风险') || trimmed.includes('问题') || trimmed.includes('异常')) {
      if (currentSection) {
        paragraphs.push(`<p>${currentSection}</p>`);
      }
      currentSection = '';
      paragraphs.push(`<p><strong>风险问题：</strong>${trimmed}</p>`);
    } else if (trimmed.includes('建议') || trimmed.includes('下一步') || trimmed.includes('计划')) {
      if (currentSection) {
        paragraphs.push(`<p>${currentSection}</p>`);
      }
      currentSection = '';
      paragraphs.push(`<p><strong>下一步计划：</strong>${trimmed}</p>`);
    } else {
      currentSection += trimmed + '。';
    }
  }

  // 处理剩余内容
  if (currentSection) {
    paragraphs.push(`<p>${currentSection}</p>`);
  }

  // 如果没有结构化成功，直接返回段落
  if (paragraphs.length === 0) {
    return `<p>${escapeHtml(content)}</p>`;
  }

  return paragraphs.join('\n');
}

/**
 * 生成邮件正文
 */
function generateBody(
  recipient: string,
  keyContent: string,
  actionRequest: string | undefined,
  tone: string | undefined,
  dataTable?: any
): string {
  const isCasual = tone === 'casual';

  let body = `<p>尊敬的 ${escapeHtml(recipient)}：</p>\n`;

  if (isCasual) {
    // 简化语气
    body += `<p>${escapeHtml(keyContent)}</p>\n`;
  } else {
    // 正式语气：结构化处理
    body += structureContent(keyContent, dataTable);
  }

  // 添加行动请求
  if (actionRequest) {
    if (isCasual) {
      body += `\n<p>${escapeHtml(actionRequest)}</p>`;
    } else {
      body += `\n<p><strong>请协助：</strong>${escapeHtml(actionRequest)}</p>`;
    }
  }

  return body;
}

/**
 * 公文写作主函数
 */
export function generateDocument(input: DocumentInput): DocumentOutput {
  // 验证必填字段
  validateInput(input);

  const sender = input.sender || '孙大年';
  const tone = input.tone || 'formal';
  const additionalInfo = input.additional_info || {};

  // 规则 1: 模板匹配（这里简化处理，实际应该读取模板文件）
  const templateName = SCENARIO_TEMPLATES[input.scenario] || 'formal-report';

  // 规则 6: 优先级前缀
  const finalSubject = addPriorityPrefix(input.subject, additionalInfo.priority);

  // 规则 2+3: 结构生成和内容填充
  const body = generateBody(
    input.recipient,
    input.key_content,
    input.action_request,
    tone,
    additionalInfo.data_table
  );

  // 规则 4: 签名
  const signature = getSignature(input.recipient);

  // 生成纯文本版本
  const rawText = body.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

  return {
    subject: finalSubject,
    body,
    signature,
    raw_text: rawText,
    attachments: additionalInfo.attachments || [],
  };
}
