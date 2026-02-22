/**
 * 双观察者自动记录 Hook
 *
 * 功能：每次消息后，双观察者分析并记录有价值的洞察
 * 原理：观察年老师 + 观察Mino → 提取洞察 → 记录有价值的内容
 */

const fs = require('fs');
const path = require('path');

// 观察记录文件
const OBSERVER_LOG = path.join('/Users/sundanian/my-agent/.claude/hooks/', 'observer-log.json');

/**
 * 初始化日志
 */
function initLog() {
  if (!fs.existsSync(OBSERVER_LOG)) {
    fs.writeFileSync(OBSERVER_LOG, JSON.stringify({
      startTime: new Date().toISOString(),
      insights: []
    }, null, 2));
  }
}

/**
 * 观察年老师
 */
function observeUser(message) {
  const insights = [];

  // 情绪状态
  if (message.includes('？') || message.includes('?')) insights.push('提问');
  if (message.includes('希望') || message.includes('期待')) insights.push('表达期望');
  if (message.includes('不对') || message.includes('不是')) insights.push('纠正');
  if (message.includes('困惑') || message.includes('不明白')) insights.push('困惑');
  if (message.includes('好') || message.includes('可以')) insights.push('同意');

  // 核心诉求
  if (message.includes('怎么') || message.includes('如何')) insights.push('询问方法');
  if (message.includes('为什么')) insights.push('询问原因');
  if (message.includes('帮我')) insights.push('请求帮助');

  // 隐含信息
  if (message.includes('其实')) insights.push('隐含真实想法');
  if (message.includes('我觉得')) insights.push('表达观点');

  return insights.filter(i => i);  // 过滤空值
}

/**
 * 观察Mino
 */
function observeMino(message, context) {
  const insights = [];

  // 回应方式
  if (message.includes('我理解了')) insights.push('确认理解');
  if (message.includes('让我看看')) insights.push('主动检查');
  if (message.includes('你说得对')) insights.push('接受反馈');
  if (message.includes('我的建议')) insights.push('提供建议');
  if (message.includes('对不起')) insights.push('道歉');

  // 思考方式
  if (message.includes('首先') && message.includes('然后')) insights.push('结构化思考');
  if (message.includes('分析')) insights.push('分析优先');
  if (message.includes('不确定')) insights.push('诚实表达');

  return insights.filter(i => i);  // 过滤空值
}

/**
 * 判断是否有价值
 */
function hasValue(insights) {
  // 至少有一个洞察才算有价值
  return insights.length > 0;
}

/**
 * Hook主函数
 */
function dualObserver(input) {
  initLog();

  // 读取现有日志
  const log = JSON.parse(fs.readFileSync(OBSERVER_LOG, 'utf8'));

  // 观察年老师
  const userInsights = observeUser(input);

  // 观察Mino（这里没有我的回应，暂时跳过）
  // const minoInsights = observeMino(...);

  // 只记录有价值的洞察
  if (hasValue(userInsights)) {
    log.insights.push({
      timestamp: new Date().toISOString(),
      type: 'user',
      insights: userInsights
    });
    fs.writeFileSync(OBSERVER_LOG, JSON.stringify(log, null, 2));
  }

  // 返回原始输入，不修改
  return input;
}

// 导出Hook函数
module.exports = dualObserver;
