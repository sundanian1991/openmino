/**
 * 供应商风险预警实现
 *
 * Spec: memory/active/tasks/test-suites/risk-alert/spec.md
 * 测试：memory/active/tasks/test-suites/risk-alert/test-cases.md
 */

export interface RiskAlertInput {
  supplier_id: string;
  kpi_score: number | null;
  kpi_scores_history?: number[];
  is_compliant: boolean | null;
  violation_count: number;
  ontime_rate: number;
  ontime_rate_history?: number[];
}

export interface RiskAlertResult {
  risk_level: '红色' | '橙色' | '黄色' | '绿色';
  alert_triggered: boolean;
  alert_reason: string;
  recommended_actions: string[];
}

/**
 * 验证输入
 */
function validateInput(input: RiskAlertInput): void {
  // 边界 3: 必填字段缺失
  if (!input.supplier_id) {
    throw new Error('缺少必填字段：supplier_id');
  }
  if (input.kpi_score === null || input.kpi_score === undefined) {
    throw new Error('缺少必填字段：kpi_score');
  }
  if (input.is_compliant === null || input.is_compliant === undefined) {
    throw new Error('缺少必填字段：is_compliant');
  }
  if (input.violation_count === null || input.violation_count === undefined) {
    throw new Error('缺少必填字段：violation_count');
  }
  if (input.ontime_rate === null || input.ontime_rate === undefined) {
    throw new Error('缺少必填字段：ontime_rate');
  }

  // 边界 2: 数据异常
  if (input.kpi_score < 0 || input.kpi_score > 100) {
    throw new Error('数据异常：kpi_score 值不在有效范围内');
  }
  if (input.ontime_rate < 0 || input.ontime_rate > 1) {
    throw new Error('数据异常：ontime_rate 值不在有效范围内');
  }
  if (input.violation_count < 0) {
    throw new Error('数据异常：violation_count 值不在有效范围内');
  }

  // 检查历史数据
  if (input.kpi_scores_history) {
    for (const score of input.kpi_scores_history) {
      if (score < 0 || score > 100) {
        throw new Error('数据异常：kpi_scores_history 中有值不在 0-100 范围内');
      }
    }
  }
  if (input.ontime_rate_history) {
    for (const rate of input.ontime_rate_history) {
      if (rate < 0 || rate > 1) {
        throw new Error('数据异常：ontime_rate_history 中有值不在 0-1 范围内');
      }
    }
  }
}

/**
 * 检查 KPI 是否连续下降（每季度下降 ≥ 10 分）
 */
function isKpiDeclining(history: number[] | undefined): boolean {
  if (!history || history.length < 2) {
    return false;
  }

  // 从最近往前比
  let currentScore = history[history.length - 1];
  let consecutiveDecline = 0;

  for (let i = history.length - 2; i >= 0; i--) {
    const prevScore = history[i];
    if (prevScore - currentScore >= 10) {
      consecutiveDecline++;
      if (consecutiveDecline >= 2) {
        return true;
      }
    } else {
      consecutiveDecline = 0;
    }
    currentScore = prevScore;
  }

  return false;
}

/**
 * 判断风险等级
 */
function evaluateRisk(input: RiskAlertInput): RiskAlertResult {
  // 规则 1: 红色预警（最高优先级）
  if (input.violation_count >= 3 || !input.is_compliant) {
    return {
      risk_level: '红色',
      alert_triggered: true,
      alert_reason: '严重违规或多次违规',
      recommended_actions: ['立即约谈', '启动清退评估', '暂停新业务']
    };
  }

  // 规则 2: 橙色预警
  if (input.kpi_score < 60 ||
      isKpiDeclining(input.kpi_scores_history) ||
      input.ontime_rate < 0.7) {
    return {
      risk_level: '橙色',
      alert_triggered: true,
      alert_reason: 'KPI 不达标/持续下滑/交付问题',
      recommended_actions: ['发出整改通知', '增加监控频率', '制定改进计划']
    };
  }

  // 规则 3: 黄色预警
  if (input.kpi_score < 70 ||
      input.violation_count >= 1 ||
      input.ontime_rate < 0.8) {
    return {
      risk_level: '黄色',
      alert_triggered: true,
      alert_reason: 'KPI 偏低/有违规/交付延迟',
      recommended_actions: ['关注提醒', '要求提交改进方案']
    };
  }

  // 规则 4: 绿色（正常）
  return {
    risk_level: '绿色',
    alert_triggered: false,
    alert_reason: '',
    recommended_actions: []
  };
}

/**
 * 供应商风险预警主函数
 */
export function evaluateRiskAlert(input: RiskAlertInput): RiskAlertResult {
  validateInput(input);
  return evaluateRisk(input);
}

/**
 * 批量评估
 */
export function batchEvaluateRisk(inputs: RiskAlertInput[]): RiskAlertResult[] {
  return inputs.map(input => evaluateRiskAlert(input));
}
