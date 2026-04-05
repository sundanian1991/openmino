#!/usr/bin/env node

/**
 * Transparent Thinking Checker — 显性思维检测器
 *
 * 触发时机：Stop Hook（会话结束时）
 *
 * 功能：
 * 1. 检测这次对话有没有显性思维输出
 * 2. 记录执行情况到日志
 * 3. 没有执行则记录到错题本
 *
 * 检测关键词：【我在做什么】【意图分类】【任务拆分】
 */

const fs = require('fs');
const path = require('path');

// 日志路径
const LOG_DIR = path.join(__dirname, '../../memory/daily');
const LOG_FILE = path.join(LOG_DIR, 'transparent-thinking.log');
const ERROR_LOG = path.join(__dirname, '../../.claude/rules/reference/05-self-review.md');

// 确保日志目录存在
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * 检测显性思维关键词
 */
function hasTransparentThinking(content) {
    const patterns = [
        /【我在做什么】/,
        /【意图分类】/,
        /【任务拆分】/,
        /【我将使用/,
        /【计划】/,
        /【验证】/
    ];

    for (const pattern of patterns) {
        if (pattern.test(content)) {
            return { found: true, pattern: pattern.source };
        }
    }
    return { found: false, pattern: null };
}

/**
 * 记录到日志
 */
function logExecution(hasTransparent, pattern, turnCount) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        hasTransparent,
        pattern,
        turnCount
    };

    const logLine = JSON.stringify(logEntry) + '\n';
    fs.appendFileSync(LOG_FILE, logLine);
}

/**
 * 记录到错题本
 */
function logToErrorBook() {
    const timestamp = new Date().toISOString().slice(0, 10);
    const entry = `

### ${timestamp} | 显性思维未执行

**问题**：会话中没有输出显性思维（【我在做什么】等）

**原因**：规则在文件里，但没有变成肌肉记忆

**改进**：每次回复前强制检查：我有没有说【我在做什么】？

**核心教训**：规则不是"知道"，是"做到"。
`;

    fs.appendFileSync(ERROR_LOG, entry);
}

/**
 * 生成提醒
 */
function generateReminder(hasTransparent, turnCount) {
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (hasTransparent) {
        return `
╔══════════════════════════════════════════════════════════════════════╗
║  ✅ TRANSPARENT THINKING CHECK                                        ║
╚══════════════════════════════════════════════════════════════════════╝

本次会话（${turnCount} 轮对话）检测到显性思维输出。

继续保持每次回复前输出【我在做什么】的习惯。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${timestamp}
`;
    } else {
        return `
╔══════════════════════════════════════════════════════════════════════╗
║  ⚠️  TRANSPARENT THINKING CHECK - 未执行                              ║
╚══════════════════════════════════════════════════════════════════════╝

本次会话（${turnCount} 轮对话）未检测到显性思维输出。

已记录到错题本。

【下次注意】每次回复前必须输出：
  【我在做什么】[意图] + [行动]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${timestamp}
`;
    }
}

/**
 * 主函数
 */
function main() {
    // 从环境变量或参数获取对话内容
    const conversationHistory = process.argv[2] || '';
    const turnCount = parseInt(process.argv[3] || '0', 10);

    // 检测显性思维
    const { found, pattern } = hasTransparentThinking(conversationHistory);

    // 记录日志
    logExecution(found, pattern, turnCount);

    // 没有执行则记录到错题本
    if (!found && turnCount > 0) {
        logToErrorBook();
    }

    // 输出提醒
    const reminder = generateReminder(found, turnCount);
    console.log(reminder);

    process.exit(0);
}

main();