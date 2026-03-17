/**
 * 供应商评分计算测试
 *
 * 对应测试用例：memory/active/tasks/test-suites/supplier-evaluation/test-cases.md
 */

import { describe, it, expect } from 'vitest';
import { evaluateSupplier } from '../implementation/supplier-evaluation';

describe('供应商评分计算 - 正常流程', () => {
  // TC-001: 合规 + 高 KPI → A/正常
  it('TC-001: 合规 + 高 KPI → A/正常', () => {
    const result = evaluateSupplier({
      kpi_score: 92,
      is_compliant: true,
      ontime_rate: 0.95,
      quality_rate: 0.98
    });

    expect(result.grade).toBe('A');
    expect(result.risk).toBe('正常');
    expect(result.score).toBeCloseTo(86.71, 2);
  });

  // TC-002: 不合规一票否决
  it('TC-002: 不合规一票否决', () => {
    const result = evaluateSupplier({
      kpi_score: 95,
      is_compliant: false,
      ontime_rate: 0.99,
      quality_rate: 0.99
    });

    expect(result.grade).toBe('D');
    expect(result.risk).toBe('高危');
    expect(result.score).toBe(0);
    expect(result.reasons).toContain('合规一票否决');
  });

  // TC-003: KPI<60 → C 或以下
  it('TC-003: KPI<60 → C 或以下', () => {
    const result = evaluateSupplier({
      kpi_score: 55,
      is_compliant: true,
      ontime_rate: 0.9,
      quality_rate: 0.95
    });

    expect(result.grade).toBe('C');
    expect(result.risk).toBe('预警');
  });

  // TC-004: 及时率<0.8 → 降级
  it('TC-004: 及时率<0.8 → 降级', () => {
    const result = evaluateSupplier({
      kpi_score: 88,
      is_compliant: true,
      ontime_rate: 0.75,
      quality_rate: 0.95
    });

    expect(result.grade).toBe('C'); // B 降级为 C
    expect(result.risk).toBe('正常');
  });

  // TC-005: 综合得分计算
  it('TC-005: 综合得分计算', () => {
    const result = evaluateSupplier({
      kpi_score: 85,
      is_compliant: true,
      ontime_rate: 0.9,
      quality_rate: 0.95
    });

    expect(result.grade).toBe('B');
    expect(result.score).toBeCloseTo(68.72, 2);
  });

  // TC-006: 等级判定-A 级
  it('TC-006: 等级判定-A 级', () => {
    const result = evaluateSupplier({
      kpi_score: 90,
      is_compliant: true,
      ontime_rate: 1.0,
      quality_rate: 1.0
    });

    expect(result.grade).toBe('A');
    expect(result.score).toBe(90);
  });

  // TC-007: 等级判定-B 级
  it('TC-007: 等级判定-B 级', () => {
    const result = evaluateSupplier({
      kpi_score: 85,
      is_compliant: true,
      ontime_rate: 1.0,
      quality_rate: 1.0
    });

    expect(result.grade).toBe('B');
  });

  // TC-008: 等级判定-C 级
  it('TC-008: 等级判定-C 级', () => {
    const result = evaluateSupplier({
      kpi_score: 70,
      is_compliant: true,
      ontime_rate: 1.0,
      quality_rate: 1.0
    });

    expect(result.grade).toBe('C');
  });
});

describe('供应商评分计算 - 边界条件', () => {
  // BC-001: 输入为空 → 抛错
  it('BC-001: kpi_score 为空抛错', () => {
    expect(() => {
      evaluateSupplier({
        kpi_score: null as any,
        is_compliant: true,
        ontime_rate: 0.9
      });
    }).toThrow('缺少必填字段：kpi_score');
  });

  // BC-002: KPI 超范围 → 抛错
  it('BC-002: KPI>100 抛错', () => {
    expect(() => {
      evaluateSupplier({
        kpi_score: 105,
        is_compliant: true,
        ontime_rate: 0.9
      });
    }).toThrow('KPI 得分必须在 0-100 之间');
  });

  it('BC-002: KPI<0 抛错', () => {
    expect(() => {
      evaluateSupplier({
        kpi_score: -5,
        is_compliant: true,
        ontime_rate: 0.9
      });
    }).toThrow('KPI 得分必须在 0-100 之间');
  });

  // BC-003: 及时率超范围 → 抛错
  it('BC-003: 及时率>1 抛错', () => {
    expect(() => {
      evaluateSupplier({
        kpi_score: 85,
        is_compliant: true,
        ontime_rate: 1.5
      });
    }).toThrow('交付及时率必须在 0-1 之间');
  });

  // BC-004: 质量率缺失 → 默认 1.0
  it('BC-004: 质量率缺失默认 1.0', () => {
    const result = evaluateSupplier({
      kpi_score: 90,
      is_compliant: true,
      ontime_rate: 0.9
      // quality_rate 缺失
    });

    expect(result.grade).toBe('A');
    expect(result.score).toBe(81); // 90 * 0.9 * 1.0 * 1.0 = 81
  });
});
