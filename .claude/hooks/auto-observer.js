/**
 * 自动观察 Hook
 *
 * 功能：每次用户发送消息后，自动分析并记录观察
 * 原理：UserPromptSubmit → 分析消息 → 追加记录 → 会话结束整合
 */

const fs = require('fs');
const path = require('path');

// 观察记录临时文件
const OBSERVER_TEMP = path.join('/Users/sundanian/my-agent/.claude/hooks/', 'observer-temp.json');

/**
 * 初始化观察记录文件
 */
function initObserverLog() {
  if (!fs.existsSync(OBSERVER_TEMP)) {
    fs.writeFileSync(OBSERVER_TEMP, JSON.stringify({
      startTime: new Date().toISOString(),
      messages: []
    }, null, 2));
  }
}

/**
 * 分析单条消息，提取观察点
 */
function analyzeMessage(userMessage, myResponse) {
  const observations = {
    timestamp: new Date().toISOString(),
    userMessage: userMessage.slice(0, 200) + '...',  // 只保留前200字符
    observations: []
  };

  // 分析年老师的情绪状态
  if (userMessage.includes('？') || userMessage.includes('?')) {
    observations.observations.push('年老师在提问');
  }
  if (userMessage.includes('不对') || userMessage.includes('不是')) {
    observations.observations.push('年老师在纠正');
  }
  if (userMessage.includes('希望') || userMessage.includes('期待')) {
    observations.observations.push('年老师表达期望');
  }

  // 分析我的回应方式
  if (myResponse && myResponse.includes('？')) {
    observations.observations.push('我反问了年老师');
  }
  if (myResponse && myResponse.includes('我理解了')) {
    observations.observations.push('我确认理解');
  }

  return observations;
}

/**
 * Hook主函数
 */
function autoObserver(input) {
  initObserverLog();

  // 读取现有记录
  const log = JSON.parse(fs.readFileSync(OBSERVER_TEMP, 'utf8'));

  // 分析当前消息（注意：这里只有用户消息，没有我的回应）
  const currentObservation = {
    timestamp: new Date().toISOString(),
    userMessage: input.slice(0, 200),
    quickAnalysis: []
  };

  // 简单分析
  if (input.includes('？') || input.includes('?')) {
    currentObservation.quickAnalysis.push('提问');
  }
  if (input.includes('怎么') || input.includes('如何')) {
    currentObservation.quickAnalysis.push('询问方法');
  }
  if (input.includes('为什么')) {
    currentObservation.quickAnalysis.push('询问原因');
  }

  // 追加记录
  log.messages.push(currentObservation);
  fs.writeFileSync(OBSERVER_TEMP, JSON.stringify(log, null, 2));

  // 返回原始输入，不修改
  return input;
}

// 导出Hook函数
module.exports = autoObserver;
