/**
 * 供应商风险预警测试
 *
 * 对应测试用例：memory/active/tasks/test-suites/risk-alert/test-cases.md
 */

import { describe, it, expect } from 'vitest';
import { evaluateRiskAlert } from '../implementation/risk-alert';

describe('供应商风险预警 - 正常流程', () => {
  // TC-001: 红色预警-违规≥3次
  it('TC-001: 红色预警-违规≥3次', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP001',
      kpi_score: 85,
      is_compliant: true,
      violation_count: 3,
      ontime_rate: 0.95
    });

    expect(result.risk_level).toBe('红色');
    expect(result.alert_triggered).toBe(true);
    expect(result.alert_reason).toBe('严重违规或多次违规');
  });

  // TC-002: 红色预警-当前不合规
  it('TC-002: 红色预警-当前不合规', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP002',
      kpi_score: 90,
      is_compliant: false,
      violation_count: 1,
      ontime_rate: 0.99
    });

    expect(result.risk_level).toBe('红色');
    expect(result.alert_triggered).toBe(true);
  });

  // TC-003: 橙色预警-KPI<60
  it('TC-003: 橙色预警-KPI<60', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP003',
      kpi_score: 55,
      is_compliant: true,
      violation_count: 0,
      ontime_rate: 0.9
    });

    expect(result.risk_level).toBe('橙色');
    expect(result.alert_triggered).toBe(true);
  });

  // TC-004: 橙色预警-连续下降
  it('TC-004: 橙色预警-连续下降', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP004',
      kpi_score: 70,
      kpi_scores_history: [95, 85, 75, 70],
      is_compliant: true,
      violation_count: 0,
      ontime_rate: 0.9
    });

    expect(result.risk_level).toBe('橙色');
    expect(result.alert_triggered).toBe(true);
  });

  // TC-005: 橙色预警-及时率<70%
  it('TC-005: 橙色预警-及时率<70%', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP005',
      kpi_score: 80,
      is_compliant: true,
      violation_count: 0,
      ontime_rate: 0.65
    });

    expect(result.risk_level).toBe('橙色');
    expect(result.alert_triggered).toBe(true);
  });

  // TC-006: 黄色预警-KPI<70
  it('TC-006: 黄色预警-KPI<70', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP006',
      kpi_score: 65,
      is_compliant: true,
      violation_count: 0,
      ontime_rate: 0.9
    });

    expect(result.risk_level).toBe('黄色');
    expect(result.alert_triggered).toBe(true);
  });

  // TC-007: 黄色预警-有违规记录
  it('TC-007: 黄色预警-有违规记录', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP007',
      kpi_score: 85,
      is_compliant: true,
      violation_count: 1,
      ontime_rate: 0.95
    });

    expect(result.risk_level).toBe('黄色');
    expect(result.alert_triggered).toBe(true);
  });

  // TC-008: 黄色预警-及时率<80%
  it('TC-008: 黄色预警-及时率<80%', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP008',
      kpi_score: 85,
      is_compliant: true,
      violation_count: 0,
      ontime_rate: 0.75
    });

    expect(result.risk_level).toBe('黄色');
    expect(result.alert_triggered).toBe(true);
  });

  // TC-009: 绿色-正常情况
  it('TC-009: 绿色-正常情况', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP009',
      kpi_score: 90,
      is_compliant: true,
      violation_count: 0,
      ontime_rate: 0.95
    });

    expect(result.risk_level).toBe('绿色');
    expect(result.alert_triggered).toBe(false);
    expect(result.recommended_actions).toEqual([]);
  });

  // TC-010: 优先级-红色>橙色>黄色
  it('TC-010: 优先级-红色>橙色>黄色', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP010',
      kpi_score: 55,
      is_compliant: false,
      violation_count: 3,
      ontime_rate: 0.65
    });

    expect(result.risk_level).toBe('红色');
    expect(result.alert_triggered).toBe(true);
  });
});

describe('供应商风险预警 - 边界条件', () => {
  // BC-001: 历史数据缺失
  it('BC-001: 历史数据缺失', () => {
    const result = evaluateRiskAlert({
      supplier_id: 'SUP011',
      kpi_score: 65,
      kpi_scores_history: [],
      is_compliant: true,
      violation_count: 0,
      ontime_rate: 0.9,
      ontime_rate_history: []
    });

    expect(result.risk_level).toBe('黄色');
    expect(result.alert_triggered).toBe(true);
  });

  // BC-002: 数据异常
  it('BC-002: 数据异常-kpi_score>100', () => {
    expect(() => {
      evaluateRiskAlert({
        supplier_id: 'SUP012',
        kpi_score: 105,
        is_compliant: true,
        violation_count: 0,
        ontime_rate: 0.9
      });
    }).toThrow('数据异常：kpi_score 值不在有效范围内');
  });

  it('BC-002: 数据异常-ontime_rate<0', () => {
    expect(() => {
      evaluateRiskAlert({
        supplier_id: 'SUP013',
        kpi_score: 85,
        is_compliant: true,
        violation_count: 0,
        ontime_rate: -0.1
      });
    }).toThrow('数据异常：ontime_rate 值不在有效范围内');
  });
});
