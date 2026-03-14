#!/usr/bin/env node

/**
 * Transparent Workflow Monitor — 透明工作流监控系统
 *
 * 触发时机：UserPromptSubmit Hook（用户发送消息前）
 *
 * 功能：
 * 1. 分析任务复杂度（步骤数、风险级别）
 * 2. 如果 ≥4 步，自动注入透明工作流提醒
 * 3. 记录执行日志到 memory/active/tasks/monitoring/transparent-workflow.log
 *
 * 评分标准：
 * - 简单：≤3 步 → 直接执行
 * - 中等：4-6 步 → 建议展开
 * - 复杂：≥7 步 → 必须展开
 */

const fs = require('fs');
const path = require('path');

// 日志文件路径
const LOG_DIR = path.join(__dirname, '../../memory/active/tasks/monitoring');
const LOG_FILE = path.join(LOG_DIR, 'transparent-workflow.log');

// 确保日志目录存在
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * 分析任务步骤数
 */
function analyzeSteps(userPrompt) {
    let steps = 0;
    const evidence = [];

    // 显式步骤关键词
    const explicitPatterns = [
        /第一步.*第二.*第[三四五六七八九十]/,
        /首先.*然后.*接下来.*最后/,
        /1\..*2\..*3\./,
        /步骤[一二三四五六七八九十]/g
    ];

    for (const pattern of explicitPatterns) {
        const matches = userPrompt.match(pattern);
        if (matches) {
            const count = matches[0].split(/[,，、]/).length;
            steps = Math.max(steps, count);
            evidence.push(`显式步骤词：${matches[0]}`);
        }
    }

    // 动作词数量（扩展）
    const actionWords = userPrompt.match(/(创建|添加|删除|修改|更新|重构|实现|优化|分析|设计|写|做|搞|包括|部署|配置|集成|测试|验证|生成|编写|开发|建立)/g);
    if (actionWords) {
        steps = Math.max(steps, actionWords.length);
        evidence.push(`动作词：${actionWords.length} 个`);
    }

    // 序列词 + 1
    const sequenceWords = userPrompt.match(/(先|再|然后|接下来|之后|最后|最后一步)/g);
    if (sequenceWords) {
        const seqSteps = sequenceWords.length + 1;
        if (seqSteps > steps) {
            steps = seqSteps;
            evidence.push(`序列词推断：${seqSteps} 步`);
        }
    }

    // 问号数量（多个独立问题）
    const questions = userPrompt.match(/\?/g);
    if (questions && questions.length >= 2) {
        if (questions.length > steps) {
            steps = questions.length;
            evidence.push(`问题数：${questions.length} 个`);
        }
    }

    // "和"、"与"、"以及" 连接的多个任务
    const multiTasks = userPrompt.match(/(和|与|以及).*?(创建|添加|删除|修改|更新|重构|实现|优化|分析|设计)/g);
    if (multiTasks) {
        steps = Math.max(steps, multiTasks.length + 1);
        evidence.push(`多任务连接：${multiTasks.length + 1} 个`);
    }

    return { steps: Math.min(steps, 20), evidence }; // 上限 20 步
}

/**
 * 分析风险级别
 */
function analyzeRisk(userPrompt) {
    let riskScore = 0;
    const riskFactors = [];

    if (/删除|delete|remove/.test(userPrompt)) {
        riskScore += 2;
        riskFactors.push('删除操作');
    }
    if (/覆盖|overwrite/.test(userPrompt)) {
        riskScore += 2;
        riskFactors.push('覆盖操作');
    }
    if (/清空|clear|reset/.test(userPrompt)) {
        riskScore += 2;
        riskFactors.push('清空操作');
    }
    if (/批量|全部|所有/.test(userPrompt)) {
        riskScore += 1;
        riskFactors.push('批量操作');
    }

    return { score: Math.min(riskScore, 5), factors: riskFactors };
}

/**
 * 确定复杂度等级
 */
function getComplexityLevel(steps, riskScore) {
    // 风险操作自动提升等级
    const adjustedSteps = riskScore >= 2 ? steps + 2 : steps;

    if (adjustedSteps >= 7) {
        return 'COMPLEX'; // 必须展开
    } else if (adjustedSteps >= 4) {
        return 'MEDIUM'; // 建议展开
    } else {
        return 'SIMPLE'; // 直接执行
    }
}

/**
 * 生成提醒消息
 */
function generateReminder(level, steps, evidence, riskFactors) {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (level === 'COMPLEX') {
        return `
╔══════════════════════════════════════════════════════════════════════╗
║  🎯 TRANSPARENT WORKFLOW CHECK - 复杂任务                            ║
╚══════════════════════════════════════════════════════════════════════╝

检测到复杂任务（${steps} 步）

${evidence.map(e => `  • ${e}`).join('\n')}
${riskFactors.length > 0 ? `\n风险因素：\n${riskFactors.map(f => `  ⚠️  ${f}`).join('\n')}` : ''}

【强制要求】必须展开透明工作流：

  1. 【意图分类】说明这是什么类型的任务
  2. 【任务拆分】列出所有步骤
  3. 【实时进度】执行时更新进度
  4. 【验证总结】完成后验证并总结

参考模板：.claude/rules/reference/TRANSPARENT-WORKFLOW.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${timestamp}
`;
    } else if (level === 'MEDIUM') {
        return `
╔══════════════════════════════════════════════════════════════════════╗
║  🎯 TRANSPARENT WORKFLOW CHECK - 中等任务                            ║
╚══════════════════════════════════════════════════════════════════════╝

检测到中等任务（${steps} 步）

${evidence.map(e => `  • ${e}`).join('\n')}

【建议】展开透明工作流：
  - 【任务拆分】列出步骤
  - 【验证总结】完成后总结

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${timestamp}
`;
    } else {
        return '';
    }
}

/**
 * 记录到日志
 */
function logExecution(userPrompt, level, steps, evidence, riskFactors) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        prompt: userPrompt.slice(0, 100) + (userPrompt.length > 100 ? '...' : ''),
        level,
        steps,
        evidence,
        riskFactors
    };

    const logLine = JSON.stringify(logEntry) + '\n';
    fs.appendFileSync(LOG_FILE, logLine);
}

/**
 * 主函数
 */
function main() {
    const userPrompt = process.argv[2] || '';

    if (!userPrompt) {
        process.exit(0);
    }

    // 分析任务
    const { steps, evidence } = analyzeSteps(userPrompt);
    const { score: riskScore, factors: riskFactors } = analyzeRisk(userPrompt);
    const level = getComplexityLevel(steps, riskScore);

    // 记录日志
    logExecution(userPrompt, level, steps, evidence, riskFactors);

    // 生成提醒
    const reminder = generateReminder(level, steps, evidence, riskFactors);

    // 输出提醒（会注入到用户消息中）
    if (reminder) {
        console.log(reminder);
    }

    process.exit(0);
}

main();
