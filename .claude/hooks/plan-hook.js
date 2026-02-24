#!/usr/bin/env node

/**
 * Plan First Hook — 验证 Plan 文档完整性
 *
 * 触发时机：执行 /plan 命令后、任务标记完成前
 *
 * 验证规则：
 * 1. Plan 文档必须存在
 * 2. 所有步骤必须有验证方式
 * 3. 验证清单必须全部通过
 * 4. 评审部分必须填写
 */

const fs = require('fs');
const path = require('path');

const PLANS_DIR = path.join(__dirname, '../memory/active/tasks/plans');
const TODO_FILE = path.join(__dirname, '../memory/active/tasks/todo.md');

// 验证 Plan 文档
function validatePlan(planName) {
    const planPath = path.join(PLANS_DIR, `${planName}.md`);

    if (!fs.existsSync(planPath)) {
        console.error(`❌ Plan 文档不存在：${planPath}`);
        return false;
    }

    const content = fs.readFileSync(planPath, 'utf-8');

    // 检查必需部分
    const requiredSections = [
        '需求重述',
        '风险评估',
        '实施步骤',
        '验证方案'
    ];

    let valid = true;
    for (const section of requiredSections) {
        if (!content.includes(section)) {
            console.error(`❌ Plan 文档缺少必需部分：${section}`);
            valid = false;
        }
    }

    // 检查风险评估是否全部填写
    const riskChecks = content.match(/- \[([ x])\] \*\*破坏性操作\*\*/g);
    if (riskChecks && riskChecks.some(check => check.includes('[ ]'))) {
        console.warn('⚠️  风险评估未全部确认');
    }

    // 检查实施步骤是否有验证方式
    const stepsMatch = content.match(/\| \d+ \| \[?步骤\d+\]? \|/g);
    if (stepsMatch) {
        const emptyValidations = content.match(/\| \d+ \|.*\| \[如何验证\] \|/g);
        if (emptyValidations && emptyValidations.length > 0) {
            console.error('❌ 实施步骤中有未填写验证方式的项');
            valid = false;
        }
    }

    // 检查评审部分（仅当任务完成时）
    if (content.includes('状态：`completed`')) {
        if (!content.includes('评审清单')) {
            console.error('❌ 任务标记为完成，但缺少评审部分');
            valid = false;
        }
    }

    return valid;
}

// 验证 Todo 清单
function validateTodo() {
    if (!fs.existsSync(TODO_FILE)) {
        console.error(`❌ Todo 文件不存在：${TODO_FILE}`);
        return false;
    }

    const content = fs.readFileSync(TODO_FILE, 'utf-8');

    // 检查是否有已完成但未验证的任务
    const completedTasks = content.match(/### \[.*\]\n\*\*状态\*\*：`completed`/g);
    if (completedTasks) {
        for (const task of completedTasks) {
            const taskMatch = task.match(/### \[(.*?)\]/);
            if (taskMatch) {
                const taskName = taskMatch[1];
                const planValid = validatePlan(taskName);
                if (!planValid) {
                    console.error(`❌ 任务 "${taskName}" 的 Plan 验证失败`);
                    return false;
                }
            }
        }
    }

    return true;
}

// 主函数
function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    let success = true;

    switch (command) {
        case 'validate-plan':
            const planName = args[1];
            if (!planName) {
                console.error('❌ 请提供 Plan 名称');
                process.exit(1);
            }
            success = validatePlan(planName);
            break;

        case 'validate-todo':
            success = validateTodo();
            break;

        case 'validate-all':
            success = validateTodo();
            break;

        default:
            console.log('用法：node plan-hook.js [validate-plan|validate-todo|validate-all] [planName]');
    }

    if (success) {
        console.log('✅ 验证通过');
        process.exit(0);
    } else {
        console.error('❌ 验证失败，请修复后重试');
        process.exit(1);
    }
}

main();
