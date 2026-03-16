#!/usr/bin/env node

/**
 * L3 智能自动层 - 条件触发 Hook
 *
 * 功能：
 * 1. 读取 health-checks.js 生成的健康报告
 * 2. 根据阈值自动触发维护任务
 * 3. 更新 ops/queue/queue.json 任务队列
 * 4. 生成用户提醒（需要高优先级干预的问题）
 */

const fs = require('fs');
const path = require('path');

// ==================== 配置 ====================
const HEALTH_REPORT_PATH = path.join(process.cwd(), 'ops/queue/health-report.json');
const QUEUE_FILE = path.join(process.cwd(), 'ops/queue/queue.json');

// 触发阈值
const THRESHOLDS = {
  orphans: 5,      // Orphan notes > 5 → 触发 /connect
  stale: 10,       // Stale notes > 10 → 触发 /maintain
  dangling: 3      // Dangling links > 3 → 提醒用户
};

// ==================== 工具函数 ====================

/**
 * 读取 JSON 文件
 * @param {string} filePath - 文件路径
 * @returns {object|null} - JSON 对象
 */
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`读取 JSON 文件失败：${filePath}`);
    console.error(error.message);
    return null;
  }
}

/**
 * 写入 JSON 文件
 * @param {string} filePath - 文件路径
 * @param {object} data - JSON 数据
 */
function writeJsonFile(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`写入 JSON 文件失败：${filePath}`);
    console.error(error.message);
  }
}

/**
 * 生成唯一任务 ID
 * @returns {string} - 任务 ID
 */
function generateTaskId() {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 添加到任务队列
 * @param {object} queue - 队列对象
 * @param {string} type - 任务类型
 * @param {string} command - 命令名称
 * @param {string} reason - 触发原因
 * @param {number} count - 问题数量
 * @param {string[]} affected - 受影响的项目
 */
function addTaskToQueue(queue, type, command, reason, count, affected) {
  const task = {
    id: generateTaskId(),
    type: 'maintenance',
    subtype: type,
    command: command,
    status: 'pending',
    priority: count > THRESHOLDS[type] * 2 ? 'high' : 'medium',
    reason: reason,
    count: count,
    affected: affected.slice(0, 10), // 最多显示 10 个
    createdAt: new Date().toISOString(),
    triggeredBy: 'auto-maintenance-hook'
  };

  // 检查是否已有相同类型的待处理任务，避免重复
  const existingTask = queue.tasks.find(
    t => t.subtype === type && t.status === 'pending' && t.triggeredBy === 'auto-maintenance-hook'
  );

  if (existingTask) {
    // 更新现有任务
    existingTask.count = count;
    existingTask.affected = affected.slice(0, 10);
    existingTask.updatedAt = new Date().toISOString();
    console.log(`更新现有任务：${type} (${count} 个问题)`);
  } else {
    queue.tasks.unshift(task);
    console.log(`添加新任务：${type} (${count} 个问题)`);
  }
}

// ==================== 核心函数 ====================

/**
 * 检查健康报告并触发维护任务
 * @returns {object} - 检查结果
 */
function checkHealthAndTriggerMaintenance() {
  console.log('🔍 运行自动维护检查...');

  // 读取健康报告
  const healthReport = readJsonFile(HEALTH_REPORT_PATH);
  if (!healthReport) {
    console.error('❌ 未找到健康报告，请先运行 health-checks.js');
    return { success: false, error: 'Health report not found' };
  }

  const { summary, details } = healthReport;
  const { orphans, stale, dangling } = details;

  console.log(`📊 健康分数：${summary.healthScore}/100`);
  console.log(`   - Orphan Notes: ${orphans.length}`);
  console.log(`   - Stale Notes: ${stale.length}`);
  console.log(`   - Dangling Links: ${dangling.length}`);

  // 读取或创建队列文件
  let queue = readJsonFile(QUEUE_FILE);
  if (!queue) {
    queue = {
      version: '3.0',
      lastUpdated: new Date().toISOString(),
      tasks: [],
      maintenance_conditions: {
        orphan_threshold: THRESHOLDS.orphans,
        stale_threshold: THRESHOLDS.stale,
        dangling_threshold: THRESHOLDS.dangling
      }
    };
  }

  // 检查并触发维护任务
  const actions = [];

  // 1. Orphan Notes 检查
  if (orphans.length > THRESHOLDS.orphans) {
    addTaskToQueue(
      queue,
      'orphan_notes',
      '/connect',
      `${orphans.length} 个笔记没有 incoming links（阈值：${THRESHOLDS.orphans}）`,
      orphans.length,
      orphans.map(o => o.path)
    );
    actions.push({
      type: 'task_added',
      command: '/connect',
      reason: `Orphan Notes: ${orphans.length} > ${THRESHOLDS.orphans}`
    });
  } else {
    console.log(`✅ Orphan Notes: ${orphans.length} <= ${THRESHOLDS.orphans}（无需操作）`);
  }

  // 2. Stale Notes 检查
  if (stale.length > THRESHOLDS.stale) {
    addTaskToQueue(
      queue,
      'stale_notes',
      '/maintain',
      `${stale.length} 个笔记超过 30 天未更新且连接稀疏（阈值：${THRESHOLDS.stale}）`,
      stale.length,
      stale.map(s => s.path)
    );
    actions.push({
      type: 'task_added',
      command: '/maintain',
      reason: `Stale Notes: ${stale.length} > ${THRESHOLDS.stale}`
    });
  } else {
    console.log(`✅ Stale Notes: ${stale.length} <= ${THRESHOLDS.stale}（无需操作）`);
  }

  // 3. Dangling Links 检查
  if (dangling.length > THRESHOLDS.dangling) {
    // Dangling links 需要用户手动修复，只生成提醒
    queue.alerts = queue.alerts || [];
    queue.alerts.unshift({
      id: generateTaskId(),
      type: 'dangling_links',
      priority: 'high',
      title: `${dangling.length} 个 Wiki Links 指向不存在的文件`,
      description: '需要手动创建缺失的笔记或移除无效的 wiki links',
      affected: dangling.slice(0, 5).map(d => `${d.sourcePath}#${d.targetLink}`),
      createdAt: new Date().toISOString(),
      dismissed: false
    });
    actions.push({
      type: 'alert_generated',
      reason: `Dangling Links: ${dangling.length} > ${THRESHOLDS.dangling}`
    });
    console.log(`⚠️  Dangling Links: ${dangling.length} > ${THRESHOLDS.dangling}（需要用户干预）`);
  } else {
    console.log(`✅ Dangling Links: ${dangling.length} <= ${THRESHOLDS.dangling}（无需操作）`);
  }

  // 4. 健康分数过低提醒
  if (summary.healthScore < 60) {
    queue.alerts = queue.alerts || [];
    const existingAlert = queue.alerts.find(a => a.type === 'low_health_score' && !a.dismissed);
    if (!existingAlert) {
      queue.alerts.unshift({
        id: generateTaskId(),
        type: 'low_health_score',
        priority: 'medium',
        title: `知识图谱健康分数过低：${summary.healthScore}/100`,
        description: '建议运行 /connect 和 /maintain 进行维护',
        createdAt: new Date().toISOString(),
        dismissed: false
      });
      actions.push({
        type: 'alert_generated',
        reason: `Health Score: ${summary.healthScore} < 60`
      });
    }
  }

  // 更新队列
  queue.lastUpdated = new Date().toISOString();
  writeJsonFile(QUEUE_FILE, queue);

  // 输出摘要
  console.log('\\n📋 维护检查完成:');
  if (actions.length === 0) {
    console.log('  ✅ 无需维护操作');
  } else {
    console.log(`  执行了 ${actions.length} 个操作:`);
    actions.forEach(action => {
      if (action.type === 'task_added') {
        console.log(`    - 添加任务：${action.command}（${action.reason}）`);
      } else {
        console.log(`    - 生成提醒：${action.reason}`);
      }
    });
  }

  console.log(`\\n📄 队列已更新：${QUEUE_FILE}`);

  return {
    success: true,
    actions,
    healthScore: summary.healthScore,
    tasksAdded: actions.filter(a => a.type === 'task_added').length,
    alertsGenerated: actions.filter(a => a.type === 'alert_generated').length
  };
}

// ==================== 主函数 ====================

function main() {
  const result = checkHealthAndTriggerMaintenance();

  if (result.success) {
    console.log('\\n✅ 自动维护检查完成');
    process.exit(0);
  } else {
    console.error('\\n❌ 自动维护检查失败');
    process.exit(1);
  }
}

// 执行
main();
