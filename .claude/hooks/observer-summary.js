/**
 * 观察者自动总结 Hook
 *
 * 功能：会话结束时自动触发观察者总结
 * 原理：Stop Hook → 调用/observer → 保存到OBSERVATION.md
 */

/**
 * 检查会话是否有价值观察
 */
function shouldObserve(input) {
  // 简单判断：如果有足够多的对话，就值得观察
  const minTurns = 10;  // 至少10轮对话
  const estimatedTurns = Math.floor(input.length / 500);  // 粗略估计

  return estimatedTurns >= minTurns;
}

/**
 * Hook主函数
 */
function observerSummary(input) {
  // 只在会话结束时执行
  // 这里只是标记，实际执行由Claude在会话结束时完成

  if (shouldObserve(input)) {
    const reminder = `
📊 会话即将结束

建议执行 /observer 生成本次对话的观察报告

观察报告将记录：
- 年老师的核心诉求和隐含信息
- 我的思考方式和工作习惯
- 本次对话的关键洞察
    `.trim();

    return reminder + '\n\n---\n\n' + input;
  }

  return input;
}

// 导出Hook函数
module.exports = observerSummary;
