/**
 * Skill Auto-Activation Hook
 *
 * 触发时机: UserPromptSubmit - 用户发送消息后
 * 功能: 分析消息关键词/文件路径，自动匹配并建议激活相应Skill
 *
 * 安装: 在settings.json的hooks.userPromptSubmit中添加此脚本路径
 */

const fs = require('fs');
const path = require('path');

// 规则配置文件路径
const RULES_PATH = path.join(__dirname, 'skill-rules.json');

/**
 * 主函数 - UserPromptSubmit Hook入口
 * @param {Object} context - Hook上下文
 * @param {string} context.userPrompt - 用户输入的原始消息
 * @param {Array} context.files - 上下文中的文件列表
 * @returns {Promise<Object>} - Hook返回对象 { status, content, metadata }
 */
async function userPromptSubmitHook(context) {
  const { userPrompt, files = [] } = context;

  try {
    // 1. 加载触发规则
    const rules = loadRules();

    // 2. 分析用户输入
    const matches = analyzeInput(userPrompt, files, rules);

    // 3. 如果有匹配，生成建议
    if (matches.length > 0) {
      const suggestions = formatSuggestions(matches);

      // 4. 返回增强后的上下文
      return {
        status: 'success',
        metadata: {
          hookName: 'skill-auto-activation',
          matchedRules: matches.map(m => m.id),
          suggestions: suggestions
        }
      };
    }

    // 5. 无匹配时正常返回
    return {
      status: 'success',
      metadata: {
        hookName: 'skill-auto-activation',
        matchedRules: []
      }
    };

  } catch (error) {
    // 错误时不阻断正常流程
    console.error('[Skill Auto-Activation Hook Error]', error.message);
    return {
      status: 'success',
      metadata: {
        hookName: 'skill-auto-activation',
        error: error.message
      }
    };
  }
}

/**
 * 加载规则配置
 */
function loadRules() {
  if (!fs.existsSync(RULES_PATH)) {
    return { rules: [] };
  }

  const content = fs.readFileSync(RULES_PATH, 'utf-8');
  return JSON.parse(content);
}

/**
 * 分析用户输入，匹配规则
 */
function analyzeInput(userPrompt, files, rulesConfig) {
  const matches = [];
  const promptLower = userPrompt.toLowerCase();

  // 提取文件路径模式
  const filePaths = files.map(f => f.path || '');

  for (const rule of rulesConfig.rules) {
    let matched = false;
    let matchReason = '';

    // 1. 关键词匹配
    if (rule.triggers.keywords) {
      const keywordMatches = rule.triggers.keywords.filter(kw =>
        promptLower.includes(kw.toLowerCase())
      );

      if (keywordMatches.length > 0) {
        matched = true;
        matchReason = `关键词: ${keywordMatches.join(', ')}`;
      }
    }

    // 2. 文件路径模式匹配
    if (!matched && rule.triggers.file_patterns) {
      for (const pattern of rule.triggers.file_patterns) {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        if (filePaths.some(path => regex.test(path))) {
          matched = true;
          matchReason = `文件路径匹配: ${pattern}`;
          break;
        }
      }
    }

    // 3. 如果匹配，添加到结果
    if (matched) {
      matches.push({
        id: rule.id,
        name: rule.name,
        priority: rule.priority || 'low',
        reason: matchReason,
        actions: rule.actions || []
      });
    }
  }

  // 按优先级排序: high > medium > low
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  matches.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return matches;
}

/**
 * 格式化建议输出
 */
function formatSuggestions(matches) {
  const lines = ['\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'];
  lines.push('🔍 Skills自动激活建议');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 按优先级分组
  const byPriority = { high: [], medium: [], low: [] };
  matches.forEach(m => {
    if (byPriority[m.priority]) {
      byPriority[m.priority].push(m);
    }
  });

  // 输出高优先级
  if (byPriority.high.length > 0) {
    lines.push('🔴 高优先级建议:');
    byPriority.high.forEach(m => {
      lines.push(`  ⭐ ${m.name}`);
      lines.push(`     原因: ${m.reason}`);
      m.actions.filter(a => a.type === 'suggest_skill').forEach(action => {
        lines.push(`     💡 使用: ${action.skill}`);
        if (action.message) {
          lines.push(`     ${action.message}`);
        }
      });
      lines.push('');
    });
  }

  // 输出中优先级
  if (byPriority.medium.length > 0) {
    lines.push('🟠 中优先级建议:');
    byPriority.medium.forEach(m => {
      lines.push(`  • ${m.name} — ${m.reason}`);
      m.actions.filter(a => a.type === 'suggest_skill').forEach(action => {
        lines.push(`    → ${action.skill}`);
      });
    });
    lines.push('');
  }

  // 输出低优先级（仅列出不展开）
  if (byPriority.low.length > 0) {
    lines.push('🟡 其他可能相关:');
    const lowNames = byPriority.low.map(m => m.name).join(', ');
    lines.push(`  ${lowNames}`);
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return lines.join('\n');
}

// 导出Hook函数
module.exports = userPromptSubmitHook;
