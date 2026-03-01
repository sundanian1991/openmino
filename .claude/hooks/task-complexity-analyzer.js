#!/usr/bin/env node

/**
 * Task Complexity Analyzer — 任务复杂度评分系统
 *
 * 触发时机：UserPromptSubmit Hook（用户发送消息前）
 *
 * 评分维度：
 * 1. 步骤数量（显式或隐式）
 * 2. 风险级别（删除/覆盖/不可逆）
 * 3. 范围影响（文件数量、模块数量）
 * 4. 不确定性（是否需要探索）
 * 5. 依赖关系（是否有外部依赖）
 *
 * 评分结果：
 * - 0-3 分：简单任务，直接执行
 * - 4-6 分：中等任务，建议规划
 * - 7+ 分：复杂任务，必须 Plan First + 创建 active/[task-name]/
 */

const COMPLEXITY_THRESHOLD = 4; // ≥4 分需要规划
const HIGH_COMPLEXITY_THRESHOLD = 7; // ≥7 分必须 Plan First

/**
 * 评分任务复杂度
 */
function analyzeTaskComplexity(userPrompt) {
    let score = 0;
    const reasons = [];

    // 1. 步骤数量评分（0-4 分）
    const stepScore = analyzeSteps(userPrompt);
    score += stepScore.score;
    reasons.push(...stepScore.reasons);

    // 2. 风险级别评分（0-3 分）
    const riskScore = analyzeRisk(userPrompt);
    score += riskScore.score;
    reasons.push(...riskScore.reasons);

    // 3. 范围影响评分（0-2 分）
    const scopeScore = analyzeScope(userPrompt);
    score += scopeScore.score;
    reasons.push(...scopeScore.reasons);

    // 4. 不确定性评分（0-2 分）
    const uncertaintyScore = analyzeUncertainty(userPrompt);
    score += uncertaintyScore.score;
    reasons.push(...uncertaintyScore.reasons);

    // 5. 依赖关系评分（0-1 分）
    const dependencyScore = analyzeDependencies(userPrompt);
    score += dependencyScore.score;
    reasons.push(...dependencyScore.reasons);

    return { score, reasons };
}

/**
 * 分析步骤数量
 */
function analyzeSteps(prompt) {
    let score = 0;
    const reasons = [];

    // 显式步骤（"第一步...然后...最后..."）
    const explicitSteps = (prompt.match(/(第一步|然后|接下来|最后|之后)/g) || []).length;
    if (explicitSteps >= 3) {
        score += 3;
        reasons.push(`显式步骤：${explicitSteps} 步 (+3)`);
    } else if (explicitSteps >= 2) {
        score += 2;
        reasons.push(`显式步骤：${explicitSteps} 步 (+2)`);
    } else if (explicitSteps >= 1) {
        score += 1;
        reasons.push(`显式步骤：${explicitSteps} 步 (+1)`);
    }

    // 隐式步骤（多个动作）
    const actions = (prompt.match(/(创建|添加|删除|修改|更新|重构|实现|优化)/g) || []).length;
    if (actions >= 3 && explicitSteps < 2) {
        score += 2;
        reasons.push(`隐式动作：${actions} 个 (+2)`);
    } else if (actions >= 2 && explicitSteps < 1) {
        score += 1;
        reasons.push(`隐式动作：${actions} 个 (+1)`);
    }

    // 序列词（"先...再...然后..."）
    const sequenceWords = (prompt.match(/(先|再|然后|接下来|之后|最后)/g) || []).length;
    if (sequenceWords >= 2 && score < 2) {
        score += 1;
        reasons.push(`序列词：${sequenceWords} 个 (+1)`);
    }

    return { score: Math.min(score, 4), reasons };
}

/**
 * 分析风险级别
 */
function analyzeRisk(prompt) {
    let score = 0;
    const reasons = [];

    // 删除操作
    if (prompt.includes('删除') || prompt.includes('remove') || prompt.includes('delete')) {
        score += 2;
        reasons.push('删除操作 (+2)');
    }

    // 覆盖操作
    if (prompt.includes('覆盖') || prompt.includes('overwrite') || prompt.includes('replace')) {
        score += 2;
        reasons.push('覆盖操作 (+2)');
    }

    // 清空操作
    if (prompt.includes('清空') || prompt.includes('clear') || prompt.includes('reset')) {
        score += 2;
        reasons.push('清空操作 (+2)');
    }

    // 批量操作
    if (prompt.includes('批量') || prompt.includes('全部') || prompt.includes('所有')) {
        score += 1;
        reasons.push('批量操作 (+1)');
    }

    return { score: Math.min(score, 3), reasons };
}

/**
 * 分析范围影响
 */
function analyzeScope(prompt) {
    let score = 0;
    const reasons = [];

    // 多文件操作
    if (prompt.includes('所有文件') || prompt.includes('多个文件') || /\d+\+.*文件/.test(prompt)) {
        score += 2;
        reasons.push('多文件操作 (+2)');
    }

    // 模块级操作
    if (prompt.includes('模块') || prompt.includes('系统') || prompt.includes('架构')) {
        score += 1;
        reasons.push('模块/架构级 (+1)');
    }

    return { score: Math.min(score, 2), reasons };
}

/**
 * 分析不确定性
 */
function analyzeUncertainty(prompt) {
    let score = 0;
    const reasons = [];

    // 探索性任务
    if (prompt.includes('探索') || prompt.includes('研究') || prompt.includes('分析')) {
        score += 1;
        reasons.push('探索性任务 (+1)');
    }

    // 不确定词
    if (prompt.includes('可能') || prompt.includes('应该') || prompt.includes('大概')) {
        score += 1;
        reasons.push('表达不确定 (+1)');
    }

    // 问号数量（多个问题）
    const questionCount = (prompt.match(/\?/g) || []).length;
    if (questionCount >= 2) {
        score += 1;
        reasons.push(`多个问题：${questionCount} 个 (+1)`);
    }

    return { score: Math.min(score, 2), reasons };
}

/**
 * 分析依赖关系
 */
function analyzeDependencies(prompt) {
    let score = 0;
    const reasons = [];

    // 外部依赖
    if (prompt.includes('API') || prompt.includes('数据库') || prompt.includes('第三方') || prompt.includes('依赖')) {
        score += 1;
        reasons.push('外部依赖 (+1)');
    }

    return { score, reasons };
}

/**
 * 输出建议
 */
function getRecommendation(score, reasons) {
    if (score >= HIGH_COMPLEXITY_THRESHOLD) {
        return {
            level: 'HIGH',
            action: 'MUST_PLAN',
            message: `⚠️  复杂任务（${score} 分），必须 Plan First + 创建 active/[task-name]/`,
            reasons: reasons.join('\n  - ')
        };
    } else if (score >= COMPLEXITY_THRESHOLD) {
        return {
            level: 'MEDIUM',
            action: 'SUGGEST_PLAN',
            message: `⚡ 中等任务（${score} 分），建议先规划`,
            reasons: reasons.join('\n  - ')
        };
    } else {
        return {
            level: 'LOW',
            action: 'DIRECT_EXEC',
            message: `✅ 简单任务（${score} 分），可以直接执行`,
            reasons: reasons.length > 0 ? reasons.join('\n  - ') : '无明显复杂度因素'
        };
    }
}

// 主函数
function main() {
    const userPrompt = process.argv[2] || '';

    if (!userPrompt) {
        console.log('用法：node task-complexity-analyzer.js "<用户输入>"');
        process.exit(1);
    }

    const { score, reasons } = analyzeTaskComplexity(userPrompt);
    const recommendation = getRecommendation(score, reasons);

    console.log('\n=== 任务复杂度分析 ===');
    console.log(`\n用户输入：${userPrompt}`);
    console.log(`\n评分：${score} 分`);
    console.log(`\n评分依据：`);
    console.log(`  - ${recommendation.reasons}`);
    console.log(`\n建议：${recommendation.message}`);
    console.log(`\n行动：${recommendation.action}`);
    console.log('\n===================\n');

    // 返回退出码
    if (recommendation.action === 'MUST_PLAN') {
        process.exit(1); // 阻止执行
    } else {
        process.exit(0); // 允许执行
    }
}

main();
