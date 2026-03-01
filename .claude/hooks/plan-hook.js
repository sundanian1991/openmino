#!/usr/bin/env node

/**
 * Plan First Hook — 验证 Plan 文档完整性 + CLAUDE.md 三行注释
 *
 * 触发时机：执行 /plan 命令后、任务标记完成前
 *
 * 验证规则：
 * 1. Plan 文档必须存在
 * 2. 所有步骤必须有验证方式
 * 3. 验证清单必须全部通过
 * 4. 评审部分必须填写
 * 5. 目录级 CLAUDE.md 必须有三行注释
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 项目根目录
const PROJECT_ROOT = path.resolve(__dirname, '../..');

// memory 目录在项目根目录下
const MEMORY_DIR = path.join(PROJECT_ROOT, 'memory/active/tasks');
const PLANS_DIR = path.join(MEMORY_DIR, 'plans');
const ACTIVE_DIR = path.join(MEMORY_DIR, 'active');
const TODO_FILE = path.join(MEMORY_DIR, 'todo.md');

// 验证 Plan 文档（支持两种路径）
function validatePlan(planName) {
    // 优先检查 active/ 目录
    const activePlanPath = path.join(ACTIVE_DIR, planName, 'plan.md');
    // 其次检查 plans/ 目录
    const legacyPlanPath = path.join(PLANS_DIR, `${planName}.md`);

    let planPath = null;
    if (fs.existsSync(activePlanPath)) {
        planPath = activePlanPath;
    } else if (fs.existsSync(legacyPlanPath)) {
        planPath = legacyPlanPath;
    }

    if (!planPath) {
        console.error(`❌ Plan 文档不存在：${activePlanPath} 或 ${legacyPlanPath}`);
        return false;
    }

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
    if (content.includes('**状态**：`completed`') || content.includes(' 状态：`completed`')) {
        if (!content.includes('评审清单')) {
            console.error('❌ 任务标记为完成，但缺少评审部分');
            valid = false;
        }
    }

    return valid;
}

// 验证 CLAUDE.md 三行注释
function validateClaudeMdFiles() {
    console.log('🔍 检查 CLAUDE.md 三行注释...');

    try {
        const output = execSync(
            `find "${PROJECT_ROOT}" -name "CLAUDE.md" -o -name "Claude.md" 2>/dev/null`,
            { encoding: 'utf-8' }
        );

        const files = output.trim().split('\n').filter(f => f.length > 0);
        let valid = true;
        let missingCount = 0;

        for (const file of files) {
            // 跳过特殊目录
            if (file.includes('/workspace/') || file.includes('/.git/') || file.includes('/.claude/skills/')) {
                continue;
            }

            const content = fs.readFileSync(file, 'utf-8');
            const lines = content.split('\n');

            // 检查第一行是否为 "---"
            if (lines[0].trim() !== '---') {
                console.error(`❌ 缺少三行注释：${file}`);
                valid = false;
                missingCount++;
            } else {
                // 检查是否有 input/output/pos
                const hasInput = lines.some(l => l.startsWith('input:'));
                const hasOutput = lines.some(l => l.startsWith('output:'));
                const hasPos = lines.some(l => l.startsWith('pos:'));

                if (!hasInput || !hasOutput || !hasPos) {
                    console.error(`❌ 三行注释不完整：${file}`);
                    valid = false;
                    missingCount++;
                }
            }
        }

        if (missingCount > 0) {
            console.error(`\n共发现 ${missingCount} 个 CLAUDE.md 文件缺少三行注释`);
            console.error('运行以下命令自动修复：');
            console.error(`  ./scripts/create-claude-md.sh --all\n`);
        } else {
            console.log('✅ 所有 CLAUDE.md 文件都有完整的三行注释');
        }

        return valid;
    } catch (error) {
        console.error(`❌ 检查 CLAUDE.md 失败：${error.message}`);
        return false;
    }
}

// 验证 Todo 清单 + Active Tasks
function validateTodo() {
    let hasError = false;

    // 1. 验证 todo.md
    if (fs.existsSync(TODO_FILE)) {
        const content = fs.readFileSync(TODO_FILE, 'utf-8');
        const lines = content.split('\n');

        let currentTask = null;
        let currentPlan = null;
        let currentStatus = null;

        // 逐行解析 todo.md
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // 检测新任务开始：### [任务名]
            const taskMatch = line.match(/^### \[(.*?)\]/);
            if (taskMatch) {
                // 如果之前有任务，验证它
                if (currentTask && currentStatus === 'completed' && currentPlan) {
                    console.log(`🔍 验证任务：${currentTask} (Plan: ${currentPlan})`);
                    const planValid = validatePlan(currentPlan);
                    if (!planValid) {
                        console.error(`❌ 任务 "${currentTask}" 的 Plan 验证失败`);
                        hasError = true;
                    } else {
                        console.log(`✅ 任务 "${currentTask}" 验证通过`);
                    }
                }

                // 重置当前任务信息
                currentTask = taskMatch[1];
                currentPlan = null;
                currentStatus = null;
            }

            // 检测状态：**状态**：`xxx`
            const statusMatch = line.match(/\*\*状态\*\*：`(.*?)`/);
            if (statusMatch) {
                currentStatus = statusMatch[1];
            }

            // 检测关联 Plan：**关联 Plan**：`plans/xxx.md` 或 `active/xxx`
            const planMatch = line.match(/\*\*关联 Plan\*\*：`(.*?)`/);
            if (planMatch) {
                // 提取任务名（去掉路径前缀）
                const planPath = planMatch[1];
                if (planPath.includes('active/')) {
                    currentPlan = planPath.replace('active/', '').replace(/\/plan\.md$/, '');
                } else {
                    currentPlan = planPath.replace('plans/', '').replace(/\.md$/, '');
                }
            }
        }

        // 验证最后一个任务
        if (currentTask && currentStatus === 'completed' && currentPlan) {
            console.log(`🔍 验证任务：${currentTask} (Plan: ${currentPlan})`);
            const planValid = validatePlan(currentPlan);
            if (!planValid) {
                console.error(`❌ 任务 "${currentTask}" 的 Plan 验证失败`);
                hasError = true;
            } else {
                console.log(`✅ 任务 "${currentTask}" 验证通过`);
            }
        }
    } else {
        console.warn(`⚠️  Todo 文件不存在：${TODO_FILE}`);
    }

    // 2. 扫描 active/ 目录中的已完成任务
    if (fs.existsSync(ACTIVE_DIR)) {
        const activeTasks = fs.readdirSync(ACTIVE_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const taskName of activeTasks) {
            const planPath = path.join(ACTIVE_DIR, taskName, 'plan.md');
            if (!fs.existsSync(planPath)) continue;

            const content = fs.readFileSync(planPath, 'utf-8');
            const isCompleted = content.includes('**状态**：`completed`') || content.includes(' 状态：`completed`');

            if (isCompleted) {
                console.log(`🔍 验证 Active Task：${taskName}`);
                const planValid = validatePlan(taskName);
                if (!planValid) {
                    console.error(`❌ Active Task "${taskName}" 验证失败`);
                    hasError = true;
                } else {
                    console.log(`✅ Active Task "${taskName}" 验证通过（建议移动到 archive/）`);
                }
            }
        }
    }

    return hasError === false;
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

        case 'validate-claude-md':
            success = validateClaudeMdFiles();
            break;

        case 'validate-all':
            const todoValid = validateTodo();
            const claudeMdValid = validateClaudeMdFiles();
            success = todoValid && claudeMdValid;
            break;

        default:
            console.log('用法：node plan-hook.js [validate-plan|validate-todo|validate-claude-md|validate-all] [planName]');
            console.log('');
            console.log('  validate-plan     验证单个 Plan 文档');
            console.log('  validate-todo     验证 Todo 清单');
            console.log('  validate-claude-md 验证 CLAUDE.md 三行注释');
            console.log('  validate-all      验证所有（Plan + Todo + CLAUDE.md）');
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
