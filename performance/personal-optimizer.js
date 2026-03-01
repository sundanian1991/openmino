// personal-optimizer.js
// 个性化优化配置系统 - 使用模式分析、个性化配置、动态调优

class PersonalOptimizer {
  constructor() {
    this.usageLogs = [];
    this.personalConfig = {};
    this.adaptiveSettings = {};
    this.optimizationHistory = [];
    this.maxLogEntries = 5000;
  }

  /**
   * 分析使用模式
   */
  async analyzeUsagePatterns(days = 30) {
    console.log(`🔍 分析过去 ${days} 天的使用模式...`);

    // 模拟使用数据（在实际应用中会从真实的使用日志中读取）
    const usageData = this.generateSimulatedUsageData(days);

    const analysis = {
      mostUsedCommands: this.getTopCommands(usageData),
      peakUsageTimes: this.getPeakTimes(usageData),
      preferredFileTypes: this.getPreferredFileTypes(usageData),
      commonWorkflows: this.getIdentifiedWorkflows(usageData),
      performanceBottlenecks: this.getIdentifiedBottlenecks(usageData),
      idlePatterns: this.getIdlePatterns(usageData)
    };

    return analysis;
  }

  /**
   * 生成模拟使用数据（在实际应用中替换为真实数据读取）
   */
  generateSimulatedUsageData(days) {
    const data = [];
    const now = Date.now();

    for (let i = 0; i < days * 24; i++) {
      // 每小时模拟一些使用数据
      const timestamp = now - (i * 60 * 60 * 1000);

      // 模拟工作时间活动更多
      const hour = new Date(timestamp).getHours();
      const isWorkingHour = hour >= 9 && hour <= 18;
      const activityCount = isWorkingHour ?
        Math.floor(Math.random() * 10) + 5 : // 工作时间：5-15 次操作
        Math.floor(Math.random() * 5);       // 非工作时间：0-4 次操作

      for (let j = 0; j < activityCount; j++) {
        const operations = [
          { type: 'Read', target: this.getRandomFile(), duration: this.getRandomDuration(100, 500) },
          { type: 'Edit', target: this.getRandomFile(), duration: this.getRandomDuration(200, 800) },
          { type: 'Grep', target: this.getRandomPattern(), duration: this.getRandomDuration(300, 1200) },
          { type: 'search', target: this.getRandomQuery(), duration: this.getRandomDuration(1000, 3000) },
          { type: 'Task', target: this.getRandomTask(), duration: this.getRandomDuration(2000, 10000) },
          { type: 'Bash', target: this.getRandomCommand(), duration: this.getRandomDuration(500, 2000) }
        ];

        const op = operations[Math.floor(Math.random() * operations.length)];

        data.push({
          timestamp: timestamp - (j * 60000), // 每分钟插入一次操作
          operation: op.type,
          target: op.target,
          duration: op.duration,
          contextSize: this.getRandomContextSize(),
          memoryUsage: this.getRandomMemoryUsage()
        });
      }
    }

    return data.sort((a, b) => b.timestamp - a.timestamp);
  }

  getRandomFile() {
    const files = [
      'CLAUDE.md', 'memory/active/tasks/todo.md', 'memory/active/daily/2026-02-25.md',
      '.claude/rules/06-NOW.md', 'memory/core/decisions/2026-02-25.md', 'docs/learning/claude-code-learning.html'
    ];
    return files[Math.floor(Math.random() * files.length)];
  }

  getRandomPattern() {
    const patterns = ['function', 'class', 'import', 'export', 'const', 'let', 'var', 'async'];
    return patterns[Math.floor(Math.random() * patterns.length)];
  }

  getRandomQuery() {
    const queries = ['Claude Code usage', 'performance optimization', 'skill usage', 'memory management', 'file operations'];
    return queries[Math.floor(Math.random() * queries.length)];
  }

  getRandomTask() {
    const tasks = ['Explore', 'Plan', 'general-purpose', 'code-reviewer', 'webapp-testing'];
    return tasks[Math.floor(Math.random() * tasks.length)];
  }

  getRandomCommand() {
    const commands = ['git status', 'npm install', 'ls -la', 'grep -r', 'find . -name'];
    return commands[Math.floor(Math.random() * commands.length)];
  }

  getRandomDuration(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomContextSize() {
    return Math.floor(Math.random() * 3000) + 1000; // 1000-4000 tokens
  }

  getRandomMemoryUsage() {
    return Math.floor(Math.random() * 60) + 20; // 20-80%
  }

  /**
   * 获取最常用的命令
   */
  getTopCommands(usageData) {
    const commandCounts = {};

    usageData.forEach(entry => {
      commandCounts[entry.operation] = (commandCounts[entry.operation] || 0) + 1;
    });

    return Object.entries(commandCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([cmd, count]) => ({ command: cmd, count }));
  }

  /**
   * 获取高峰使用时段
   */
  getPeakTimes(usageData) {
    const hourlyCounts = {};

    usageData.forEach(entry => {
      const hour = new Date(entry.timestamp).getHours();
      hourlyCounts[hour] = (hourlyCounts[hour] || 0) + 1;
    });

    return Object.entries(hourlyCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }));
  }

  /**
   * 获取偏好的文件类型
   */
  getPreferredFileTypes(usageData) {
    const fileExtensions = {};

    usageData
      .filter(entry => entry.target && typeof entry.target === 'string')
      .forEach(entry => {
        const ext = entry.target.split('.').pop();
        if (ext) {
          fileExtensions[ext] = (fileExtensions[ext] || 0) + 1;
        }
      });

    return Object.entries(fileExtensions)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([ext, count]) => ({ extension: ext, count }));
  }

  /**
   * 识别常见工作流
   */
  getIdentifiedWorkflows(usageData) {
    // 简单的工作流识别：连续执行的相关操作
    const workflows = [];
    const sortedData = [...usageData].sort((a, b) => a.timestamp - b.timestamp);

    let currentWorkflow = [];
    let workflowStartTime = null;

    for (let i = 0; i < sortedData.length; i++) {
      const current = sortedData[i];
      const next = sortedData[i + 1];

      currentWorkflow.push(current);

      // 如果下一个操作间隔超过10分钟，或操作类型变化较大，则认为工作流结束
      if (!next || (next.timestamp - current.timestamp) > (10 * 60 * 1000)) {
        if (currentWorkflow.length >= 2) { // 至少2个操作才算工作流
          workflows.push({
            startTime: currentWorkflow[0].timestamp,
            endTime: currentWorkflow[currentWorkflow.length - 1].timestamp,
            duration: currentWorkflow[currentWorkflow.length - 1].timestamp - currentWorkflow[0].timestamp,
            operations: currentWorkflow.map(op => op.operation),
            operationCount: currentWorkflow.length
          });
        }

        currentWorkflow = [];
      }
    }

    return workflows
      .sort((a, b) => b.operationCount - a.operationCount)
      .slice(0, 5);
  }

  /**
   * 识别性能瓶颈
   */
  getIdentifiedBottlenecks(usageData) {
    // 找出执行时间最长的操作
    return usageData
      .filter(entry => entry.duration > 2000) // 超过2秒的操作
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10)
      .map(entry => ({
        operation: entry.operation,
        target: entry.target,
        duration: entry.duration,
        timestamp: entry.timestamp,
        contextSize: entry.contextSize,
        memoryUsage: entry.memoryUsage
      }));
  }

  /**
   * 识别空闲模式
   */
  getIdlePatterns(usageData) {
    const sortedData = [...usageData].sort((a, b) => a.timestamp - b.timestamp);
    const longIntervals = [];

    for (let i = 0; i < sortedData.length - 1; i++) {
      const current = sortedData[i];
      const next = sortedData[i + 1];
      const interval = current.timestamp - next.timestamp; // 注意：时间倒序排列

      if (interval > (30 * 60 * 1000)) { // 超过30分钟的间隔
        longIntervals.push({
          start: next.timestamp,
          end: current.timestamp,
          duration: interval,
          gapType: interval > (2 * 60 * 60 * 1000) ? 'long_break' : 'short_break'
        });
      }
    }

    return longIntervals;
  }

  /**
   * 生成个性化配置
   */
  generatePersonalConfig(usageAnalysis) {
    console.log('⚙️ 生成个性化配置...');

    const config = {
      // 基于最常用命令的优化
      frequentlyUsed: {
        commands: usageAnalysis.mostUsedCommands.slice(0, 5).map(item => item.command),
        optimizationLevel: 'aggressive'
      },

      // 基于高峰时段的时间相关配置
      scheduleBased: {
        peakHours: usageAnalysis.peakUsageTimes.slice(0, 3).map(item => item.hour),
        prefetchWindows: this.calculatePrefetchWindows(usageAnalysis.peakUsageTimes),
        heavyOperationWindows: this.calculateHeavyOpWindows(usageAnalysis.peakUsageTimes)
      },

      // 基于偏好文件类型的优化
      fileTypeBased: {
        preferredTypes: usageAnalysis.preferredFileTypes.slice(0, 3).map(item => item.extension),
        optimizedEditors: this.getOptimizedEditors(usageAnalysis.preferredFileTypes),
        cacheStrategies: this.getCacheStrategies(usageAnalysis.preferredFileTypes)
      },

      // 基于工作流的优化
      workflowBased: {
        commonPatterns: usageAnalysis.commonWorkflows.slice(0, 3).map(workflow => ({
          name: this.inferWorkflowName(workflow),
          operations: workflow.operations,
          optimizationHints: this.getWorkflowOptimizations(workflow)
        }))
      },

      // 性能优化建议
      performance: {
        bottleneckOperations: usageAnalysis.performanceBottlenecks.slice(0, 5).map(item => item.operation),
        recommendedOptimizations: this.getPerformanceRecommendations(usageAnalysis.performanceBottlenecks)
      },

      // 资源管理
      resourceManagement: {
        contextSizeLimit: this.determineContextLimit(usageAnalysis),
        memoryAllocation: this.determineMemoryAllocation(usageAnalysis),
        cacheRetention: this.determineCacheRetention(usageAnalysis)
      }
    };

    this.personalConfig = config;
    return config;
  }

  /**
   * 计算预取窗口
   */
  calculatePrefetchWindows(peakTimes) {
    // 峰值前30分钟开始预取
    return peakTimes.map(time => ({
      startHour: time.hour > 0 ? time.hour - 1 : 23, // 前一小时开始预取
      endHour: time.hour,
      prefetchItems: ['common-files', 'frequent-tools', 'recent-context']
    }));
  }

  /**
   * 计算重操作窗口
   */
  calculateHeavyOpWindows(peakTimes) {
    // 避开峰值时间执行重操作
    const allHours = Array.from({length: 24}, (_, i) => i);
    const peakHourSet = new Set(peakTimes.map(time => time.hour));
    const offPeakHours = allHours.filter(hour => !peakHourSet.has(hour));

    return {
      recommendedHours: offPeakHours.slice(0, 6), // 选择6个非峰值小时
      maintenanceWindows: offPeakHours.filter(hour => hour >= 2 && hour <= 5) // 深夜维护窗口
    };
  }

  /**
   * 获取优化的编辑器（基于文件类型）
   */
  getOptimizedEditors(fileTypes) {
    const editorMap = {
      'md': 'fast-editor', // Markdown 文件使用快速编辑器
      'js': 'cached-editor', // JS 文件使用带缓存的编辑器
      'ts': 'cached-editor', // TS 文件使用带缓存的编辑器
      'py': 'cached-editor', // Python 文件使用带缓存的编辑器
      'html': 'fast-editor', // HTML 文件使用快速编辑器
      'css': 'fast-editor', // CSS 文件使用快速编辑器
      'json': 'fast-editor', // JSON 文件使用快速编辑器
      'sh': 'fast-editor' // Shell 脚本使用快速编辑器
    };

    return fileTypes.map(ft => ({
      type: ft.extension,
      editor: editorMap[ft.extension] || 'default-editor'
    }));
  }

  /**
   * 获取缓存策略（基于文件类型）
   */
  getCacheStrategies(fileTypes) {
    const strategyMap = {
      'md': 'long-retention', // Markdown 文件长期保留
      'js': 'medium-retention', // 代码文件中等保留
      'ts': 'medium-retention', // 代码文件中等保留
      'py': 'medium-retention', // 代码文件中等保留
      'json': 'short-retention', // 配置文件短期保留
      'sh': 'short-retention' // 脚本文件短期保留
    };

    return fileTypes.map(ft => ({
      type: ft.extension,
      strategy: strategyMap[ft.extension] || 'default-retention'
    }));
  }

  /**
   * 推断工作流名称
   */
  inferWorkflowName(workflow) {
    const opSequence = workflow.operations.join('->');

    if (opSequence.includes('Grep') && opSequence.includes('Read') && opSequence.includes('Edit')) {
      return 'code-search-and-modify';
    } else if (opSequence.includes('search') && opSequence.includes('Read')) {
      return 'research-and-read';
    } else if (opSequence.includes('Task') && opSequence.includes('Plan')) {
      return 'planning-workflow';
    } else if (opSequence.includes('Bash') && opSequence.includes('Grep')) {
      return 'system-search-workflow';
    }

    return 'custom-workflow-' + workflow.operationCount;
  }

  /**
   * 获取工作流优化建议
   */
  getWorkflowOptimizations(workflow) {
    const optimizations = [];

    if (workflow.operations.includes('Grep') && workflow.operations.includes('Read')) {
      optimizations.push('batch-file-operations'); // 批量文件操作
    }

    if (workflow.operations.length > 5) {
      optimizations.push('pipeline-optimization'); // 管道优化
    }

    if (workflow.duration > 30000) { // 超过30秒
      optimizations.push('async-operations'); // 异步操作
    }

    return optimizations;
  }

  /**
   * 获取性能优化建议
   */
  getPerformanceRecommendations(bottlenecks) {
    const recommendations = new Set();

    bottlenecks.forEach(bottleneck => {
      if (bottleneck.operation === 'search') {
        recommendations.add('improve-search-indexing');
      } else if (bottleneck.operation === 'Task') {
        recommendations.add('optimize-subagent-startup');
      } else if (bottleneck.operation === 'Read') {
        recommendations.add('implement-file-caching');
      } else if (bottleneck.operation === 'Grep') {
        recommendations.add('enhance-search-algorithms');
      } else if (bottleneck.duration > 5000) {
        recommendations.add('async-processing-for-long-ops');
      }
    });

    return Array.from(recommendations);
  }

  /**
   * 确定上下文限制
   */
  determineContextLimit(analysis) {
    // 基于瓶颈分析和平均上下文大小来确定限制
    const avgContextSize = analysis.performanceBottlenecks.reduce((sum, bt) =>
      sum + (bt.contextSize || 0), 0) / Math.max(analysis.performanceBottlenecks.length, 1);

    if (avgContextSize > 2500) {
      return 2048; // 如果平均上下文很大，降低限制
    } else if (avgContextSize < 1500) {
      return 3072; // 如果平均上下文较小，可以适当提高
    }

    return 2560; // 默认值
  }

  /**
   * 确定内存分配
   */
  determineMemoryAllocation(analysis) {
    // 基于内存使用模式确定分配
    const avgMemoryUsage = analysis.performanceBottlenecks.reduce((sum, bt) =>
      sum + (bt.memoryUsage || 0), 0) / Math.max(analysis.performanceBottlenecks.length, 1);

    if (avgMemoryUsage > 70) {
      return { level: 'conservative', cacheSize: 'small' };
    } else if (avgMemoryUsage < 40) {
      return { level: 'aggressive', cacheSize: 'large' };
    }

    return { level: 'balanced', cacheSize: 'medium' };
  }

  /**
   * 确定缓存保留策略
   */
  determineCacheRetention(analysis) {
    if (analysis.preferredFileTypes.some(ft => ft.extension === 'md' && ft.count > 50)) {
      // 如果经常处理Markdown文件，使用长期保留
      return 'long-term';
    } else if (analysis.preferredFileTypes.some(ft => ['js', 'ts', 'py'].includes(ft.extension))) {
      // 如果经常处理代码文件，使用中期保留
      return 'medium-term';
    }

    return 'short-term'; // 默认短期保留
  }

  /**
   * 应用个性化配置
   */
  async applyPersonalConfig(config) {
    console.log('🔄 应用个性化配置...');

    // 这里会实际应用配置到系统中
    // 在实际实现中，这会修改系统的运行参数

    this.adaptiveSettings = {
      ...config,
      appliedAt: Date.now(),
      appliedBy: 'personal-optimizer'
    };

    // 记录优化历史
    this.optimizationHistory.push({
      timestamp: Date.now(),
      type: 'personal-config-application',
      config: { ...config },
      status: 'applied'
    });

    console.log('✅ 个性化配置已应用');

    return {
      success: true,
      appliedConfig: config,
      appliedAt: new Date().toISOString()
    };
  }

  /**
   * 动态调优
   */
  async dynamicTuning(feedbackData = {}) {
    console.log('🔄 执行动态调优...');

    // 根据反馈数据调整配置
    const tuningAdjustments = this.calculateTuningAdjustments(feedbackData);

    // 应用调整
    Object.assign(this.adaptiveSettings, tuningAdjustments);

    // 记录调优历史
    this.optimizationHistory.push({
      timestamp: Date.now(),
      type: 'dynamic-tuning',
      adjustments: tuningAdjustments,
      feedback: feedbackData,
      status: 'applied'
    });

    console.log('✅ 动态调优完成');

    return {
      success: true,
      adjustments: tuningAdjustments,
      tunedAt: new Date().toISOString()
    };
  }

  /**
   * 计算调优调整
   */
  calculateTuningAdjustments(feedbackData) {
    const adjustments = {};

    // 根据响应时间反馈调整
    if (feedbackData.slowResponseCount > 5) {
      adjustments.contextSizeLimit = Math.max(1024, (this.personalConfig.resourceManagement?.contextSizeLimit || 2048) - 256);
      adjustments.cacheStrategy = 'aggressive-eviction';
    }

    // 根据内存使用反馈调整
    if (feedbackData.highMemoryUsageCount > 3) {
      adjustments.memoryLimit = 'conservative';
      adjustments.cacheRetention = 'short-term';
    }

    // 根据用户满意度反馈调整
    if (feedbackData.userSatisfaction < 0.7) {
      adjustments.prefetchLevel = 'conservative';
      adjustments.backgroundProcesses = 'minimal';
    } else if (feedbackData.userSatisfaction > 0.9) {
      adjustments.prefetchLevel = 'aggressive';
      adjustments.backgroundProcesses = 'optimal';
    }

    return adjustments;
  }

  /**
   * 获取优化建议摘要
   */
  getOptimizationSummary() {
    return {
      configApplied: !!this.adaptiveSettings.appliedAt,
      lastTuned: this.optimizationHistory[this.optimizationHistory.length - 1]?.timestamp,
      totalOptimizations: this.optimizationHistory.length,
      activeSettings: this.adaptiveSettings,
      usageBasedRecommendations: this.personalConfig
    };
  }

  /**
   * 获取完整的优化报告
   */
  async getFullOptimizationReport() {
    const usageAnalysis = await this.analyzeUsagePatterns(30);
    const personalConfig = this.generatePersonalConfig(usageAnalysis);

    return {
      analysisPeriod: 'Last 30 days',
      usageAnalysis,
      personalConfig,
      currentOptimizationState: this.getOptimizationSummary(),
      recommendations: this.getComprehensiveRecommendations(usageAnalysis, personalConfig),
      estimatedImprovement: this.calculateEstimatedImprovement(usageAnalysis)
    };
  }

  /**
   * 获取全面的优化建议
   */
  getComprehensiveRecommendations(usageAnalysis, personalConfig) {
    const recommendations = [];

    // 基于常用命令的建议
    recommendations.push({
      category: 'command-optimization',
      priority: 'high',
      description: `Most used commands: ${personalConfig.frequentlyUsed.commands.join(', ')}`,
      suggestion: 'Implement aggressive caching and preloading for these commands'
    });

    // 基于时间模式的建议
    recommendations.push({
      category: 'schedule-optimization',
      priority: 'medium',
      description: `Peak usage times: ${personalConfig.scheduleBased.peakHours.join(', ')}h`,
      suggestion: 'Schedule heavy operations during off-peak hours'
    });

    // 基于性能瓶颈的建议
    recommendations.push({
      category: 'performance-optimization',
      priority: 'high',
      description: `Bottleneck operations: ${personalConfig.performance.bottleneckOperations.join(', ')}`,
      suggestion: personalConfig.performance.recommendedOptimizations.join('; ')
    });

    // 基于资源管理的建议
    recommendations.push({
      category: 'resource-management',
      priority: 'medium',
      description: `Context size limit: ${personalConfig.resourceManagement.contextSizeLimit} tokens`,
      suggestion: `Adjust based on typical usage patterns`
    });

    return recommendations;
  }

  /**
   * 计算预估改进
   */
  calculateEstimatedImprovement(usageAnalysis) {
    let responseTimeImprovement = 0;
    let efficiencyImprovement = 0;

    // 基于瓶颈分析预估改进
    if (usageAnalysis.performanceBottlenecks.length > 0) {
      responseTimeImprovement = Math.min(30, usageAnalysis.performanceBottlenecks.length * 5); // 每个瓶颈改善5%
    }

    // 基于常用命令预估改进
    if (usageAnalysis.mostUsedCommands.length > 5) {
      efficiencyImprovement = 15; // 常用命令优化改善15%
    }

    // 基于工作流预估改进
    if (usageAnalysis.commonWorkflows.length > 2) {
      efficiencyImprovement += 10; // 工作流优化改善10%
    }

    return {
      responseTimeImprovementPercent: responseTimeImprovement,
      efficiencyImprovementPercent: efficiencyImprovement,
      overallEstimate: `Expected ${Math.round((responseTimeImprovement + efficiencyImprovement) / 2)}% improvement in responsiveness`
    };
  }
}

module.exports = PersonalOptimizer;