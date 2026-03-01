/**
 * 公文写作工具测试
 *
 * 对应测试用例：memory/active/tasks/test-suites/document-writer/test-cases.md
 */

import { describe, it, expect } from 'vitest';
import { generateDocument } from '../implementation/document-writer';

describe('公文写作工具 - 正常流程', () => {
  // TC-001: 正式汇报邮件生成
  it('TC-001: 正式汇报邮件生成', () => {
    const result = generateDocument({
      scenario: 'formal_report',
      recipient: '张总',
      subject: '关于Q1供应商管理汇报',
      key_content: '本季度供应商 KPI 平均得分 85.2 分，环比提升 3.5 分。其中 A 类供应商 15 家， B 类供应商 20 家。发现 2 家供应商存在合规风险，已启动整改。',
      action_request: '请审阅并批示下一步工作计划',
    });

    expect(result.subject).toBe('关于Q1供应商管理汇报');
    expect(result.body).toContain('尊敬的 张总');
    expect(result.body).toContain('KPI');
    expect(result.signature).toBeTruthy();
  });

  // TC-002: 供应商评估邮件生成
  it('TC-002: 供应商评估邮件生成', () => {
    const result = generateDocument({
      scenario: 'supplier_evaluation',
      recipient: '李经理',
      subject: '关于XX供应商Q1评估结果通知',
      key_content: '贵司在 Q1 评估中得分 92 分，评级为 A 级。交付及时率 98%，质量合格率 95%。希望继续保持合作。',
      action_request: '如有异议请于 3 日内反馈',
    });

    expect(result.subject).toBe('关于XX供应商Q1评估结果通知');
    expect(result.body).toContain('评估结果');
    expect(result.body).toContain('得分');
  });

  // TC-003: 内部协调邮件生成
  it('TC-003: 内部协调邮件生成', () => {
    const result = generateDocument({
      scenario: 'internal_coordination',
      recipient: '王同事',
      subject: '关于供应商数据对接协调',
      key_content: '需要协调财务部门提供供应商结算数据，预计涉及 35 家供应商的对账信息。',
      action_request: '请确认对接时间和方式',
    });

    expect(result.subject).toBe('关于供应商数据对接协调');
    expect(result.body).toContain('协调');
  });

  // TC-004: 带数据表格的邮件
  it('TC-004: 带数据表格的邮件', () => {
    const result = generateDocument({
      scenario: 'formal_report',
      recipient: '领导',
      subject: '供应商月度 KPI 报表',
      key_content: '10 家重点供应商 KPI 数据',
      additional_info: {
        data_table: {
          headers: ['供应商名称', 'KPI得分', '评级'],
          rows: [
            ['供应商A', '92', 'A'],
            ['供应商B', '85', 'B'],
            ['供应商C', '78', 'C'],
          ],
        },
      },
    });

    expect(result.body).toContain('<table>');
    expect(result.body).toContain('<th>');
    expect(result.body).toContain('供应商名称');
  });

  // TC-005: 高优先级邮件
  it('TC-005: 高优先级邮件', () => {
    const result = generateDocument({
      scenario: 'notification',
      recipient: '全体供应商',
      subject: '关于系统升级通知',
      key_content: '系统将于本周六进行升级维护',
      additional_info: {
        priority: 'high',
      },
    });

    expect(result.subject).toBe('【重要】关于系统升级通知');
  });

  // TC-006: 外部收件人签名
  it('TC-006: 外部收件人签名', () => {
    const result = generateDocument({
      scenario: 'supplier_operations',
      recipient: '供应商张总',
      subject: '关于合作事宜',
      key_content: '感谢贵司支持',
    });

    expect(result.signature).toContain('京东科技');
    expect(result.signature).toContain('孙大年');
    expect(result.signature).toContain('保密提示');
  });

  // TC-007: 内部收件人签名
  it('TC-007: 内部收件人签名', () => {
    const result = generateDocument({
      scenario: 'internal',
      recipient: '同事小李',
      subject: '关于数据同步',
      key_content: '数据已同步完成',
    });

    expect(result.signature).toContain('孙大年');
    expect(result.signature).not.toContain('京东科技');
    expect(result.signature).not.toContain('保密提示');
  });

  // TC-008: 简化语气邮件
  it('TC-008: 简化语气邮件', () => {
    const result = generateDocument({
      scenario: 'internal',
      recipient: '同事',
      subject: '帮忙看下这个数据',
      key_content: '这个月供应商数据有点奇怪，帮忙看看是啥情况',
      tone: 'casual',
    });

    expect(result.body).toContain('帮忙');
    expect(result.body).toContain('看看');
  });
});

describe('公文写作工具 - 边界条件', () => {
  // BC-001: 缺少必填字段
  it('BC-001: 缺少必填字段', () => {
    expect(() => {
      generateDocument({
        scenario: 'formal_report',
        subject: '测试',
        key_content: '内容',
      } as any);
    }).toThrow('缺少必填字段：recipient');
  });

  // BC-002: 不支持场景
  it('BC-002: 不支持场景 - 使用默认模板', () => {
    const result = generateDocument({
      scenario: 'unsupported_scenario',
      recipient: '测试',
      subject: '测试',
      key_content: '内容',
    } as any);

    // 应该不报错，使用默认模板
    expect(result.body).toBeTruthy();
  });

  // BC-003: 特殊字符转义
  it('BC-003: 特殊字符转义', () => {
    const result = generateDocument({
      scenario: 'internal',
      recipient: '测试',
      subject: '关于 <script> 标签',
      key_content: '内容包含 <test> & "引号"',
    });

    // 应该转义，不包含原始特殊字符
    expect(result.body).not.toContain('<script>');
    expect(result.body).not.toContain('&lt;script&gt;');
    expect(result.body).toContain('&lt;test&gt;');
    expect(result.body).toContain('&quot;');
  });
});
