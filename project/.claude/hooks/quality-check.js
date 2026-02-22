/**
 * Quality Check Hook
 *
 * 触发时机: Stop - Claude完成回复后
 * 功能: 分析文件变更，检测风险模式，提供质量控制提醒
 *
 * 安装: 在settings.json的hooks.stop中添加此脚本路径
 */

const fs = require('fs');
const path = require('path');

// 规则配置文件路径
const RULES_PATH = path.join(__dirname, 'skill-rules.json');

/**
 * 主函数 - Stop Hook入口
 * @param {Object} context - Hook上下文
 * @param {string} context.response - Claude的完整回复
 * @param {Array} context.files - 上下文中的文件列表
 * @returns {Promise<Object>} - Hook返回对象 { status, message }
 */
async function stopHook(context) {
  const { response, files = [] } = context;

  try {
    // 1. 加载质量检查规则
    const rules = loadRules();
    if (!rules.quality_checks || !rules.quality_checks.enabled) {
      return { status: 'success' };
    }

    // 2. 分析文件变更
    const changedFiles = analyzeChangedFiles(files);
    if (changedFiles.length === 0) {
      return { status: 'success' };
    }

    // 3. 执行质量检查
    const issues = runQualityChecks(changedFiles, rules.quality_checks.rules);

    // 4. 如果发现问题，生成提醒
    if (issues.length > 0) {
      const message = formatQualityReport(changedFiles, issues);
      return {
        status: 'success',
        message: message
      };
    }

    return { status: 'success' };

  } catch (error) {
    console.error('[Quality Check Hook Error]', error.message);
    return { status: 'success' };
  }
}

/**
 * 加载规则配置
 */
function loadRules() {
  if (!fs.existsSync(RULES_PATH)) {
    return { quality_checks: { enabled: false } };
  }
  const content = fs.readFileSync(RULES_PATH, 'utf-8');
  return JSON.parse(content);
}

/**
 * 分析变更的文件
 */
function analyzeChangedFiles(files) {
  // 简化版：假设所有在上下文中的文件都可能被修改
  // 实际场景中可能需要更精确的变更检测
  return files.filter(f => f.path && f.content);
}

/**
 * 执行质量检查
 */
function runQualityChecks(changedFiles, checkRules) {
  const issues = [];

  for (const file of changedFiles) {
    const filePath = file.path;
    const content = file.content || '';

    for (const rule of checkRules) {
      // 检查文件路径是否匹配
      const pathMatches = rule.file_patterns.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(filePath);
      });

      if (!pathMatches) continue;

      // 执行检查
      for (const check of rule.checks) {
        const regex = new RegExp(check.pattern, 'gi');
        const matches = content.match(regex);

        if (matches && matches.length > 0) {
          issues.push({
            file: filePath,
            rule: rule.name,
            check: check.message,
            severity: check.severity || 'info',
            count: matches.length
          });
        }
      }
    }
  }

  return issues;
}

/**
 * 格式化质量报告
 */
function formatQualityReport(changedFiles, issues) {
  const lines = [];
  lines.push('\n⚠️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('⚠️  质量检查提醒');
  lines.push('⚠️  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 文件变更摘要
  lines.push(`📁 检测到 ${changedFiles.length} 个文件被修改`);
  changedFiles.forEach(f => {
    lines.push(`   • ${f.path}`);
  });
  lines.push('');

  // 按严重程度分组
  const bySeverity = { error: [], warning: [], info: [] };
  issues.forEach(issue => {
    if (bySeverity[issue.severity]) {
      bySeverity[issue.severity].push(issue);
    }
  });

  // 输出错误级别
  if (bySeverity.error.length > 0) {
    lines.push('🚨 错误级别（需立即处理）:');
    bySeverity.error.forEach(issue => {
      lines.push(`   ${issue.check}`);
      lines.push(`   文件: ${issue.file}`);
    });
    lines.push('');
  }

  // 输出警告级别
  if (bySeverity.warning.length > 0) {
    lines.push('⚠️  警告级别（建议处理）:');
    bySeverity.warning.forEach(issue => {
      lines.push(`   ${issue.check}`);
      lines.push(`   文件: ${issue.file}`);
    });
    lines.push('');
  }

  // 输出信息级别
  if (bySeverity.info.length > 0) {
    lines.push('❓ 信息级别（供参考）:');
    bySeverity.info.forEach(issue => {
      lines.push(`   ${issue.check}`);
      lines.push(`   文件: ${issue.file}`);
    });
  }

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return lines.join('\n');
}

// 导出Hook函数
module.exports = stopHook;
