// performance-monitor.js
// 性能监控仪表板 - 实时监控、基准线、预警

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.baseline = {};
    this.alertThresholds = {
      responseTime: 10000, // 10秒
      cpuUsage: 80, // 80%
      memoryUsage: 80, // 80%
      contextSize: 2048 // 2048 tokens
    };

    this.performanceLogs = [];
    this.maxLogEntries = 1000;
    this.slowResponseThreshold = 10000; // 10秒

    // 初始化基线
    this.initializeBaseline();
  }

  /**
   * 记录性能指标
   */
  recordMetric(operation, startTime, endTime, additionalData = {}) {
    const duration = endTime - startTime;
    const timestamp = endTime;

    const metric = {
      operation,
      startTime,
      endTime,
      duration,
      timestamp,
      ...additionalData
    };

    // 存储最近的指标
    this.metrics.set(`${operation}_${timestamp}`, metric);

    // 添加到性能日志
    this.performanceLogs.push(metric);

    // 限制日志数量
    if (this.performanceLogs.length > this.maxLogEntries) {
      this.performanceLogs = this.performanceLogs.slice(-this.maxLogEntries);
    }

    // 检查是否需要告警
    this.checkAlerts(metric);

    return metric;
  }

  /**
   * 开始计时操作
   */
  startTiming(operation, additionalData = {}) {
    return {
      operation,
      startTime: Date.now(),
      additionalData
    };
  }

  /**
   * 结束计时操作
   */
  endTiming(timingInfo) {
    const endTime = Date.now();
    return this.recordMetric(
      timingInfo.operation,
      timingInfo.startTime,
      endTime,
      timingInfo.additionalData
    );
  }

  /**
   * 检查性能告警
   */
  checkAlerts(metric) {
    const alerts = [];

    // 响应时间告警
    if (metric.duration > this.alertThresholds.responseTime) {
      alerts.push({
        type: 'slow_response',
        severity: 'warning',
        message: `Slow response: ${metric.operation} took ${metric.duration}ms`,
        metric
      });
    }

    // 上下文大小告警
    if (metric.contextSize && metric.contextSize > this.alertThresholds.contextSize) {
      alerts.push({
        type: 'large_context',
        severity: 'info',
        message: `Large context: ${metric.contextSize} tokens in ${metric.operation}`,
        metric
      });
    }

    // 记录慢响应
    if (metric.duration > this.slowResponseThreshold) {
      this.logSlowResponse(metric);
    }

    // 如果有告警，输出到控制台
    if (alerts.length > 0) {
      alerts.forEach(alert => {
        console.log(`⚠️ PERF ALERT [${alert.severity.toUpperCase()}]: ${alert.message}`);
      });
    }

    return alerts;
  }

  /**
   * 记录慢响应
   */
  logSlowResponse(metric) {
    console.log(`🐌 SLOW RESPONSE DETECTED:`);
    console.log(`   Operation: ${metric.operation}`);
    console.log(`   Duration: ${metric.duration}ms`);
    console.log(`   Timestamp: ${new Date(metric.timestamp).toISOString()}`);

    if (metric.contextSize) {
      console.log(`   Context Size: ${metric.contextSize} tokens`);
    }
    if (metric.fileCount) {
      console.log(`   Files Processed: ${metric.fileCount}`);
    }
  }

  /**
   * 初始化基线性能数据
   */
  initializeBaseline() {
    this.baseline = {
      averageResponseTime: 2000, // 2秒平均响应时间
      p95ResponseTime: 5000,     // 95%的请求在5秒内完成
      p99ResponseTime: 8000,     // 99%的请求在8秒内完成
      contextGrowthRate: 0.1     // 上下文增长率
    };
  }

  /**
   * 更新基线性能数据
   */
  updateBaseline() {
    const recentMetrics = this.getRecentMetrics(100); // 最近100个指标

    if (recentMetrics.length === 0) return;

    const durations = recentMetrics.map(m => m.duration).sort((a, b) => a - b);
    const avgDuration = durations.reduce((sum, dur) => sum + dur, 0) / durations.length;

    // 更新基线
    this.baseline.averageResponseTime = avgDuration;
    this.baseline.p95ResponseTime = durations[Math.floor(durations.length * 0.95)];
    this.baseline.p99ResponseTime = durations[Math.floor(durations.length * 0.99)];
  }

  /**
   * 获取最近的性能指标
   */
  getRecentMetrics(limit = 50) {
    const metricsArray = Array.from(this.metrics.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    return metricsArray;
  }

  /**
   * 获取性能统计摘要
   */
  getPerformanceSummary(hours = 1) {
    const cutoffTime = Date.now() - (hours * 60 * 60 * 1000);
    const recentMetrics = this.getRecentMetrics(1000).filter(m => m.timestamp >= cutoffTime);

    if (recentMetrics.length === 0) {
      return {
        period: `${hours} hour(s)`,
        totalOperations: 0,
        averageResponseTime: 0,
        p95ResponseTime: 0,
        slowResponses: 0,
        operationsByType: {}
      };
    }

    const durations = recentMetrics.map(m => m.duration);
    const avgDuration = durations.reduce((sum, dur) => sum + dur, 0) / durations.length;

    // 计算P95响应时间
    const sortedDurations = [...durations].sort((a, b) => a - b);
    const p95Index = Math.floor(sortedDurations.length * 0.95);
    const p95Duration = sortedDurations[p95Index];

    // 统计慢响应
    const slowResponses = recentMetrics.filter(m => m.duration > this.slowResponseThreshold).length;

    // 按操作类型统计
    const operationsByType = {};
    recentMetrics.forEach(metric => {
      if (!operationsByType[metric.operation]) {
        operationsByType[metric.operation] = {
          count: 0,
          totalDuration: 0,
          avgDuration: 0
        };
      }

      operationsByType[metric.operation].count++;
      operationsByType[metric.operation].totalDuration += metric.duration;
      operationsByType[metric.operation].avgDuration =
        operationsByType[metric.operation].totalDuration / operationsByType[metric.operation].count;
    });

    return {
      period: `${hours} hour(s)`,
      totalOperations: recentMetrics.length,
      averageResponseTime: Math.round(avgDuration),
      p95ResponseTime: p95Duration,
      slowResponses,
      slowResponseRate: recentMetrics.length > 0 ?
        Math.round((slowResponses / recentMetrics.length) * 100) : 0,
      operationsByType
    };
  }

  /**
   * 检测性能退化
   */
  detectPerformanceDegradation(windowHours = 1, comparisonHours = 24) {
    const currentWindow = this.getPerformanceSummary(windowHours);
    const baselineWindow = this.getPerformanceSummary(comparisonHours);

    const degradationSignals = [];

    // 检查平均响应时间增长
    if (baselineWindow.averageResponseTime > 0) {
      const responseTimeChange =
        ((currentWindow.averageResponseTime - baselineWindow.averageResponseTime) /
         baselineWindow.averageResponseTime) * 100;

      if (responseTimeChange > 20) { // 响应时间增长超过20%
        degradationSignals.push({
          type: 'response_time_increase',
          current: currentWindow.averageResponseTime,
          baseline: baselineWindow.averageResponseTime,
          changePercent: Math.round(responseTimeChange),
          severity: responseTimeChange > 50 ? 'critical' : 'warning'
        });
      }
    }

    // 检查慢响应率增长
    if (baselineWindow.slowResponseRate > 0) {
      const slowResponseChange =
        currentWindow.slowResponseRate - baselineWindow.slowResponseRate;

      if (slowResponseChange > 10) { // 慢响应率增长超过10%
        degradationSignals.push({
          type: 'slow_response_increase',
          currentRate: currentWindow.slowResponseRate,
          baselineRate: baselineWindow.slowResponseRate,
          change: slowResponseChange,
          severity: 'warning'
        });
      }
    }

    return degradationSignals;
  }

  /**
   * 获取性能健康度评分
   */
  getHealthScore() {
    const summary = this.getPerformanceSummary(1); // 最近1小时
    let score = 100;

    // 根据平均响应时间扣分
    if (summary.averageResponseTime > 5000) {
      score -= 20;
    } else if (summary.averageResponseTime > 3000) {
      score -= 10;
    }

    // 根据P95响应时间扣分
    if (summary.p95ResponseTime > 10000) {
      score -= 20;
    } else if (summary.p95ResponseTime > 7000) {
      score -= 10;
    }

    // 根据慢响应率扣分
    if (summary.slowResponseRate > 10) {
      score -= 30;
    } else if (summary.slowResponseRate > 5) {
      score -= 15;
    }

    // 最低分数为0
    score = Math.max(0, score);

    return {
      score,
      level: this.getHealthLevel(score),
      details: {
        responseTime: summary.averageResponseTime,
        p95Time: summary.p95ResponseTime,
        slowResponseRate: summary.slowResponseRate,
        totalOperations: summary.totalOperations
      }
    };
  }

  /**
   * 获取健康等级
   */
  getHealthLevel(score) {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    if (score >= 40) return 'poor';
    return 'critical';
  }

  /**
   * 生成性能报告
   */
  generateReport() {
    const summary = this.getPerformanceSummary(24); // 24小时摘要
    const health = this.getHealthScore();
    const degradation = this.detectPerformanceDegradation();

    const report = {
      timestamp: new Date().toISOString(),
      period: 'Last 24 hours',
      summary,
      health,
      degradationSignals: degradation,
      recommendations: this.getOptimizationRecommendations(summary, health, degradation)
    };

    return report;
  }

  /**
   * 获取优化建议
   */
  getOptimizationRecommendations(summary, health, degradation) {
    const recommendations = [];

    if (health.score < 75) {
      recommendations.push('Performance health is below optimal levels. Consider reviewing recent changes.');
    }

    if (summary.averageResponseTime > 3000) {
      recommendations.push('Average response time is high (>3s). Optimize frequently used operations.');
    }

    if (summary.slowResponseRate > 5) {
      recommendations.push('High percentage of slow responses (>5%). Investigate bottlenecks.');
    }

    if (degradation.some(d => d.severity === 'critical')) {
      recommendations.push('Critical performance degradation detected. Immediate action required.');
    }

    // 针对特定操作类型的建议
    for (const [opType, stats] of Object.entries(summary.operationsByType)) {
      if (stats.avgDuration > 5000) {
        recommendations.push(`Operation '${opType}' has high average duration (${stats.avgDuration}ms). Optimize this operation.`);
      }
    }

    return recommendations;
  }

  /**
   * 导出性能数据
   */
  exportData(format = 'json') {
    const data = {
      metrics: Array.from(this.metrics.values()),
      logs: this.performanceLogs,
      baseline: this.baseline,
      timestamp: new Date().toISOString()
    };

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    }

    // 其他格式的导出可以在这里添加
    return data;
  }
}

module.exports = PerformanceMonitor;