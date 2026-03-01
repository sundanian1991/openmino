/**
 * 供应商评分计算实现
 *
 * Spec: memory/active/tasks/test-suites/supplier-evaluation/spec.md
 * 测试：memory/active/tasks/test-suites/supplier-evaluation/test-cases.md
 */

export interface SupplierInput {
  kpi_score: number | null;
  is_compliant: boolean;
  ontime_rate: number;
  quality_rate?: number;
}

export interface EvaluationResult {
  grade: 'A' | 'B' | 'C' | 'D';
  risk: '正常' | '预警' | '高危';
  score: number;
  reasons: string[];
}

/**
 * 验证输入
 */
function validateInput(input: SupplierInput): void {
  // 边界 1: 输入为空
  if (input.kpi_score === null || input.kpi_score === undefined) {
    throw new Error('缺少必填字段：kpi_score');
  }
  if (input.is_compliant === null || input.is_compliant === undefined) {
    throw new Error('缺少必填字段：is_compliant');
  }
  if (input.ontime_rate === null || input.ontime_rate === undefined) {
    throw new Error('缺少必填字段：ontime_rate');
  }

  // 边界 2: KPI 超出范围
  if (input.kpi_score < 0 || input.kpi_score > 100) {
    throw new Error('KPI 得分必须在 0-100 之间');
  }

  // 边界 3: 及时率超出范围
  if (input.ontime_rate < 0 || input.ontime_rate > 1) {
    throw new Error('交付及时率必须在 0-1 之间');
  }
}

/**
 * 根据 KPI 确定基础等级
 */
function getBaseGrade(kpiScore: number): 'A' | 'B' | 'C' | 'D' {
  if (kpiScore >= 90) return 'A';
  if (kpiScore >= 80) return 'B';
  if (kpiScore >= 60) return 'C';
  return 'D';
}

/**
 * 等级降级
 */
function downgradeGrade(grade: 'A' | 'B' | 'C' | 'D'): 'A' | 'B' | 'C' | 'D' {
  const gradeOrder: Record<'A' | 'B' | 'C' | 'D', number> = {
    'A': 4,
    'B': 3,
    'C': 2,
    'D': 1
  };

  const newLevel = gradeOrder[grade] - 1;
  if (newLevel <= 0) return 'D';
  if (newLevel === 1) return 'D';
  if (newLevel === 2) return 'C';
  if (newLevel === 3) return 'B';
  return 'A';
}

/**
 * 获取权重系数
 */
function getWeightCoefficient(grade: 'A' | 'B' | 'C' | 'D'): number {
  const coefficients: Record<'A' | 'B' | 'C' | 'D', number> = {
    'A': 1.0,
    'B': 0.95,
    'C': 0.9,
    'D': 0
  };
  return coefficients[grade];
}

/**
 * 供应商评分计算主函数
 */
export function evaluateSupplier(input: SupplierInput): EvaluationResult {
  const reasons: string[] = [];

  // 验证输入
  validateInput(input);

  // 边界 4: 质量率缺失 → 默认 1.0
  const qualityRate = input.quality_rate ?? 1.0;

  // 规则 1: 合规一票否决
  if (!input.is_compliant) {
    return {
      grade: 'D',
      risk: '高危',
      score: 0,
      reasons: ['合规一票否决']
    };
  }
  reasons.push('合规');

  // 规则 5: 等级判定
  let grade = getBaseGrade(input.kpi_score);
  reasons.push(`KPI${input.kpi_score}，基础等级${grade}`);

  // 规则 2: KPI 阈值判定
  let risk: '正常' | '预警' | '高危' = '正常';
  if (input.kpi_score < 60) {
    if (grade === 'A' || grade === 'B') {
      grade = 'C';
      reasons.push('KPI<60，等级最高为 C');
    }
    risk = '预警';
    reasons.push('KPI<60，风险预警');
  }

  // 规则 3: 及时率惩罚
  if (input.ontime_rate < 0.8) {
    const oldGrade = grade;
    grade = downgradeGrade(grade);
    reasons.push(`及时率${input.ontime_rate}<0.8，降级${oldGrade}→${grade}`);
  } else {
    reasons.push(`及时率≥0.8，无惩罚`);
  }

  // 规则 4: 综合得分计算
  const weightCoefficient = getWeightCoefficient(grade);
  const score = input.kpi_score * input.ontime_rate * qualityRate * weightCoefficient;

  return {
    grade,
    risk,
    score: Math.round(score * 100) / 100, // 保留 2 位小数
    reasons
  };
}

/**
 * 批量评估
 */
export function batchEvaluate(inputs: SupplierInput[]): EvaluationResult[] {
  return inputs.map(input => evaluateSupplier(input));
}
