#!/usr/bin/env node

/**
 * Agentic Loop Hook — 验证 Agentic Loop 执行条件
 *
 * 触发时机：任务涉及代码生成/规则实现/数据处理前
 *
 * 验证规则：
 * 1. 有 Spec 吗？→ 无则创建
 * 2. 有测试用例吗？→ 无则拆解
 * 3. 启动 AI 循环 → 编码→测试→迭代
 * 4. 验证通过 → 进入人类验收
 */

const fs = require('fs');
const path = require('path');

// 项目根目录
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const TEST_SUITES_DIR = path.join(PROJECT_ROOT, 'memory/active/tasks/test-suites');
const SPECS_DIR = path.join(TEST_SUITES_DIR, 'specs');

/**
 * 检查 Spec 是否存在
 */
function hasSpec(taskName) {
    const specPath = path.join(TEST_SUITES_DIR, taskName, 'spec.md');
    return fs.existsSync(specPath);
}

/**
 * 检查测试用例是否存在
 */
function hasTestCases(taskName) {
    const testCasesPath = path.join(TEST_SUITES_DIR, taskName, 'test-cases.md');
    return fs.existsSync(testCasesPath);
}

/**
 * 验证 Spec 质量
 */
function validateSpec(taskName) {
    const specPath = path.join(TEST_SUITES_DIR, taskName, 'spec.md');

    if (!fs.existsSync(specPath)) {
        return { valid: false, reason: 'Spec 文档不存在' };
    }

    const content = fs.readFileSync(specPath, 'utf-8');

    // 检查必需部分
    const requiredSections = [
        '功能目标',
        '输入',
        '输出',
        '业务规则',
        '验收标准'
    ];

    const missing = [];
    for (const section of requiredSections) {
        if (!content.includes(section)) {
            missing.push(section);
        }
    }

    if (missing.length > 0) {
        return {
            valid: false,
            reason: `Spec 文档缺少必需部分：${missing.join(', ')}`
        };
    }

    // 检查业务规则是否可验证（支持多种格式）
    // 格式 1: `**规则 1**:` (Markdown 粗体 + 英文冒号)
    // 格式 2: `### 规则 1：` (Markdown 标题 + 中文/英文冒号)
    const rulesMatch1 = content.match(/\*\*规则 [1-9]\*\*/g);
    const rulesMatch2 = content.match(/### 规则 [1-9]/g); // 支持中文和英文冒号
    const rulesCount = (rulesMatch1 ? rulesMatch1.length : 0) + (rulesMatch2 ? rulesMatch2.length : 0);

    if (rulesCount === 0) {
        return {
            valid: false,
            reason: 'Spec 文档没有明确的业务规则定义'
        };
    }

    return { valid: true, rulesCount };
}

/**
 * 验证测试用例覆盖
 */
function validateTestCoverage(taskName) {
    const testCasesPath = path.join(TEST_SUITES_DIR, taskName, 'test-cases.md');

    if (!fs.existsSync(testCasesPath)) {
        return { valid: false, reason: '测试用例文档不存在' };
    }

    const content = fs.readFileSync(testCasesPath, 'utf-8');

    // 检查是否有测试用例定义
    const tcMatch = content.match(/TC-\d+:/g);
    if (!tcMatch || tcMatch.length === 0) {
        return {
            valid: false,
            reason: '测试用例文档没有定义具体测试用例'
        };
    }

    return { valid: true, testCount: tcMatch.length };
}

/**
 * 创建 Spec 模板
 */
function createSpecTemplate(taskName) {
    const taskDir = path.join(TEST_SUITES_DIR, taskName);

    if (!fs.existsSync(taskDir)) {
        fs.mkdirSync(taskDir, { recursive: true });
    }

    const templatePath = path.join(TEST_SUITES_DIR, 'TEMPLATE', 'spec.md');
    const targetPath = path.join(taskDir, 'spec.md');

    if (fs.existsSync(templatePath)) {
        fs.copyFileSync(templatePath, targetPath);
        console.log(`✅ 已创建 Spec 模板：${targetPath}`);
    } else {
        console.log('⚠️  模板不存在，手动创建 Spec 文档');
    }
}

/**
 * 创建测试用例模板
 */
function createTestCasesTemplate(taskName) {
    const taskDir = path.join(TEST_SUITES_DIR, taskName);

    if (!fs.existsSync(taskDir)) {
        fs.mkdirSync(taskDir, { recursive: true });
    }

    const templatePath = path.join(TEST_SUITES_DIR, 'TEMPLATE', 'test-cases.md');
    const targetPath = path.join(taskDir, 'test-cases.md');

    if (fs.existsSync(templatePath)) {
        fs.copyFileSync(templatePath, targetPath);
        console.log(`✅ 已创建测试用例模板：${targetPath}`);
    } else {
        console.log('⚠️  模板不存在，手动创建测试用例文档');
    }
}

/**
 * 主验证流程
 */
function validateAgenticLoop(taskName) {
    console.log(`🔍 验证任务：${taskName}`);
    console.log('');

    let needsAction = false;

    // Step 1: 检查 Spec
    console.log('Step 1: 检查 Spec 文档...');
    if (!hasSpec(taskName)) {
        console.log('❌ Spec 文档不存在');
        console.log('📝 建议：先创建 Spec 文档');
        needsAction = true;
    } else {
        const specValid = validateSpec(taskName);
        if (specValid.valid) {
            console.log(`✅ Spec 文档存在且有效（${specValid.rulesCount} 条规则）`);
        } else {
            console.log(`❌ Spec 文档无效：${specValid.reason}`);
            needsAction = true;
        }
    }
    console.log('');

    // Step 2: 检查测试用例
    console.log('Step 2: 检查测试用例...');
    if (!hasTestCases(taskName)) {
        console.log('❌ 测试用例文档不存在');
        console.log('📝 建议：基于 Spec 拆解测试用例');
        needsAction = true;
    } else {
        const testsValid = validateTestCoverage(taskName);
        if (testsValid.valid) {
            console.log(`✅ 测试用例存在且有效（${testsValid.testCount} 个用例）`);
        } else {
            console.log(`❌ 测试用例无效：${testsValid.reason}`);
            needsAction = true;
        }
    }
    console.log('');

    // Step 3: 给出下一步建议
    console.log('Step 3: 下一步建议...');
    if (needsAction) {
        console.log('⚠️  前置条件不满足，暂不能启动 AI 循环');
        console.log('');
        console.log('请按以下顺序准备:');
        if (!hasSpec(taskName)) {
            console.log('  1. 创建 Spec 文档');
            console.log('     → 使用 spec-driven 技能');
        }
        if (!hasTestCases(taskName)) {
            console.log('  2. 拆解测试用例');
            console.log('     → 基于 Spec 中的业务规则');
        }
        console.log('  3. 准备完成后，再次运行验证');
    } else {
        console.log('✅ 前置条件满足，可以启动 AI 循环');
        console.log('');
        console.log('AI 循环流程:');
        console.log('  1. AI 编码 → 2. 跑测试 → 3. 失败则修复 → 4. 通过则验收');
        console.log('');
        console.log('使用以下技能:');
        console.log('  → tdd-agentic: 基于测试实现');
        console.log('  → agentic-orchestration: 多 Agent 协同');
    }

    return !needsAction;
}

// 主函数
function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const taskName = args[1];

    switch (command) {
        case 'validate':
            if (!taskName) {
                console.error('❌ 请提供任务名称');
                process.exit(1);
            }
            const valid = validateAgenticLoop(taskName);
            process.exit(valid ? 0 : 1);

        case 'create-spec':
            if (!taskName) {
                console.error('❌ 请提供任务名称');
                process.exit(1);
            }
            createSpecTemplate(taskName);
            break;

        case 'create-tests':
            if (!taskName) {
                console.error('❌ 请提供任务名称');
                process.exit(1);
            }
            createTestCasesTemplate(taskName);
            break;

        case 'init':
            if (!taskName) {
                console.error('❌ 请提供任务名称');
                process.exit(1);
            }
            console.log(`🚀 初始化任务：${taskName}`);
            createSpecTemplate(taskName);
            createTestCasesTemplate(taskName);
            console.log('✅ 初始化完成，请填充 Spec 和测试用例');
            break;

        default:
            console.log('Agentic Loop Hook - 验证 AI 循环执行条件');
            console.log('');
            console.log('用法：node agentic-loop-hook.js [command] [taskName]');
            console.log('');
            console.log('命令:');
            console.log('  validate     验证任务是否可以启动 AI 循环');
            console.log('  create-spec  创建 Spec 模板');
            console.log('  create-tests 创建测试用例模板');
            console.log('  init         初始化任务（Spec + 测试用例）');
            console.log('');
            console.log('示例:');
            console.log('  node agentic-loop-hook.js validate supplier-evaluation');
            console.log('  node agentic-loop-hook.js init risk-alert');
    }
}

main();
