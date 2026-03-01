// skill-selector.js
// 智能技能选择器 - 根据任务复杂度选择合适的技能

class SkillSelector {
  constructor() {
    this.skillComplexity = {
      'search': 1,
      'Read': 1,
      'Edit': 1,
      'Grep': 1,
      'Bash': 1,
      'Glob': 1,
      'Write': 2,
      'NotebookEdit': 2,
      'WebFetch': 2,
      'Task': 3,
      'Explore': 4,
      'Plan': 5,
      'general-purpose': 5,
      'code-reviewer': 4,
      'security-reviewer': 4,
      'webapp-testing': 4,
      'frontend-design': 4,
      'web-design-expert': 4
    };

    this.simpleSkills = ['search', 'Read', 'Edit', 'Grep', 'Bash', 'Glob'];
    this.complexSkills = ['Task', 'Explore', 'Plan', 'general-purpose', 'webapp-testing', 'frontend-design'];

    this.simpleTaskThreshold = 3; // 复杂度低于此值使用简单技能
    this.complexTaskThreshold = 7; // 复杂度高于此值使用复杂技能
  }

  /**
   * 分析任务复杂度
   */
  analyzeTaskComplexity(taskDescription) {
    const complexityFactors = {
      keywords: this.getKeywordComplexity(taskDescription),
      length: this.getLengthComplexity(taskDescription),
      context: this.getContextComplexity(taskDescription),
      multipleActions: this.getMultipleActionComplexity(taskDescription),
      uncertainty: this.getUncertaintyComplexity(taskDescription)
    };

    const totalComplexity = Object.values(complexityFactors).reduce((sum, factor) => sum + factor, 0);

    return {
      score: totalComplexity,
      factors: complexityFactors,
      level: this.getComplexityLevel(totalComplexity)
    };
  }

  /**
   * 基于关键词的复杂度
   */
  getKeywordComplexity(description) {
    const keywords = description.toLowerCase();
    let score = 0;

    // 简单关键词
    const simpleKeywords = ['read', 'find', 'show', 'tell', 'get', 'view', 'see'];
    for (const keyword of simpleKeywords) {
      if (keywords.includes(keyword)) {
        score += 1;
      }
    }

    // 中等复杂度关键词
    const mediumKeywords = ['change', 'modify', 'update', 'create', 'make', 'build', 'search'];
    for (const keyword of mediumKeywords) {
      if (keywords.includes(keyword)) {
        score += 2;
      }
    }

    // 高复杂度关键词
    const complexKeywords = ['design', 'implement', 'develop', 'optimize', 'refactor', 'debug', 'fix', 'solve'];
    for (const keyword of complexKeywords) {
      if (keywords.includes(keyword)) {
        score += 3;
      }
    }

    // 架构相关关键词
    const architectureKeywords = ['architecture', 'system', 'structure', 'framework', 'component', 'integration'];
    for (const keyword of architectureKeywords) {
      if (keywords.includes(keyword)) {
        score += 4;
      }
    }

    return Math.min(score, 10); // 限制最大值
  }

  /**
   * 基于长度的复杂度
   */
  getLengthComplexity(description) {
    const length = description.length;
    if (length < 50) return 1;
    if (length < 100) return 2;
    if (length < 200) return 3;
    return 4;
  }

  /**
   * 基于上下文需求的复杂度
   */
  getContextComplexity(description) {
    const contextIndicators = [
      'previous', 'context', 'based on', 'following', 'referencing',
      'according to', 'as mentioned', 'like before', 'similar to'
    ];

    let score = 0;
    const lowerDesc = description.toLowerCase();
    for (const indicator of contextIndicators) {
      if (lowerDesc.includes(indicator)) {
        score += 2;
      }
    }

    return score;
  }

  /**
   * 基于多重操作的复杂度
   */
  getMultipleActionComplexity(description) {
    const actionWords = [
      'and', 'then', 'after', 'before', 'when', 'while',
      'first', 'next', 'finally', 'also', 'plus', 'with'
    ];

    let score = 0;
    const lowerDesc = description.toLowerCase();
    for (const word of actionWords) {
      const matches = (lowerDesc.match(new RegExp(word, 'g')) || []).length;
      score += Math.min(matches, 1); // 每个词最多贡献1分
    }

    return Math.min(score, 5);
  }

  /**
   * 基于不确定性的复杂度
   */
  getUncertaintyComplexity(description) {
    const uncertaintyWords = [
      'maybe', 'perhaps', 'possibly', 'sometimes', 'usually',
      'typically', 'often', 'sometimes', 'unclear', 'unknown'
    ];

    let score = 0;
    const lowerDesc = description.toLowerCase();
    for (const word of uncertaintyWords) {
      if (lowerDesc.includes(word)) {
        score += 2;
      }
    }

    return score;
  }

  /**
   * 获取复杂度等级
   */
  getComplexityLevel(score) {
    if (score <= 3) return 'simple';
    if (score <= 6) return 'moderate';
    if (score <= 9) return 'complex';
    return 'very-complex';
  }

  /**
   * 推荐合适的技能
   */
  recommendSkills(taskDescription, availableSkills = []) {
    const complexity = this.analyzeTaskComplexity(taskDescription);
    const recommendations = [];

    // 根据复杂度推荐技能
    if (complexity.score <= this.simpleTaskThreshold) {
      // 简单任务：推荐基本工具
      recommendations.push(...this.simpleSkills.filter(skill =>
        availableSkills.includes(skill) || !availableSkills.length
      ));

      // 添加基础技能
      recommendations.push('search', 'Read', 'Edit');
    } else if (complexity.score <= this.complexTaskThreshold) {
      // 中等复杂度：推荐中等复杂度技能
      recommendations.push('Task', 'Grep', 'Bash', 'Write');

      if (complexity.factors.keywords > 3) {
        recommendations.push('Plan', 'Explore');
      }
    } else {
      // 高复杂度：推荐高级技能
      recommendations.push('Plan', 'Explore', 'general-purpose');

      // 根据具体关键词推荐专门技能
      if (taskDescription.toLowerCase().includes('design') ||
          taskDescription.toLowerCase().includes('ui') ||
          taskDescription.toLowerCase().includes('front')) {
        recommendations.push('frontend-design', 'web-design-expert');
      }

      if (taskDescription.toLowerCase().includes('test') ||
          taskDescription.toLowerCase().includes('bug') ||
          taskDescription.toLowerCase().includes('fix')) {
        recommendations.push('webapp-testing', 'code-reviewer');
      }
    }

    // 过滤可用技能
    if (availableSkills.length > 0) {
      return recommendations.filter(skill => availableSkills.includes(skill));
    }

    return recommendations;
  }

  /**
   * 获取技能优先级排序
   */
  getPriorityRankedSkills(taskDescription, availableSkills = []) {
    const recommendations = this.recommendSkills(taskDescription, availableSkills);
    const complexity = this.analyzeTaskComplexity(taskDescription);

    // 按复杂度匹配程度排序
    return recommendations.sort((a, b) => {
      const aComplexity = this.skillComplexity[a] || 1;
      const bComplexity = this.skillComplexity[b] || 1;

      // 对于简单任务，优先选择更简单的技能
      if (complexity.score <= this.simpleTaskThreshold) {
        return aComplexity - bComplexity; // 升序
      } else {
        // 对于复杂任务，优先选择更匹配的技能
        const aMatch = Math.abs(aComplexity - complexity.score);
        const bMatch = Math.abs(bComplexity - complexity.score);
        return aMatch - bMatch; // 更接近复杂度的优先
      }
    });
  }

  /**
   * 获取任务执行建议
   */
  getExecutionRecommendation(taskDescription, availableSkills = []) {
    const complexity = this.analyzeTaskComplexity(taskDescription);
    const prioritySkills = this.getPriorityRankedSkills(taskDescription, availableSkills);

    return {
      taskComplexity: complexity,
      recommendedSkills: prioritySkills,
      executionStrategy: this.getExecutionStrategy(complexity, prioritySkills),
      estimatedTime: this.getEstimatedTime(complexity.score)
    };
  }

  /**
   * 获取执行策略
   */
  getExecutionStrategy(complexity, skills) {
    if (complexity.score <= 2) {
      return 'direct'; // 直接执行
    } else if (complexity.score <= 4) {
      return 'guided'; // 引导式执行
    } else if (complexity.score <= 6) {
      return 'planned'; // 需要规划
    } else {
      return 'structured'; // 结构化方法
    }
  }

  /**
   * 预估执行时间
   */
  getEstimatedTime(complexityScore) {
    if (complexityScore <= 2) return 'seconds';
    if (complexityScore <= 4) return 'minutes';
    if (complexityScore <= 6) return '10+ minutes';
    return '30+ minutes';
  }
}

module.exports = SkillSelector;