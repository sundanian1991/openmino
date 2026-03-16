#!/usr/bin/env node

/**
 * Claude Code 自定义状态栏 - 实时信息展示
 *
 * 显示内容：
 * - 当前模型版本
 * - 工作目录（简短）
 * - Context 用量（0%/200k）
 * - 会话时长
 * - Token 统计（in/out）
 * - 费用估算
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

// 状态栏格式配置
const STATUS_CONFIG = {
  separator: ' │ ',
  workspaceMaxChars: 20
};

// 持久化存储路径
const STATUS_STATE_DIR = path.join(os.homedir(), '.claude', 'status-state');
const SESSION_STATE_FILE = path.join(STATUS_STATE_DIR, 'session-state.json');

/**
 * 确保状态目录存在
 */
function ensureStateDir() {
  if (!fs.existsSync(STATUS_STATE_DIR)) {
    fs.mkdirSync(STATUS_STATE_DIR, { recursive: true });
  }
}

/**
 * 读取会话状态
 */
function loadSessionState() {
  try {
    if (fs.existsSync(SESSION_STATE_FILE)) {
      return JSON.parse(fs.readFileSync(SESSION_STATE_FILE, 'utf8'));
    }
  } catch (e) {
    // Ignore read errors
  }
  return null;
}

/**
 * 保存会话状态
 */
function saveSessionState(state) {
  ensureStateDir();
  try {
    fs.writeFileSync(SESSION_STATE_FILE, JSON.stringify(state, null, 2));
  } catch (e) {
    // Ignore write errors
  }
}

/**
 * 格式化时长 (秒 → 人类可读)
 */
function formatDuration(seconds) {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) {
    return `${mins}m ${secs}s`;
  }
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}

/**
 * 获取工作目录名称
 */
function getWorkspaceName() {
  const cwd = process.cwd();
  const parts = cwd.split(path.sep);
  const last = parts[parts.length - 1];
  if (last.length <= STATUS_CONFIG.workspaceMaxChars) {
    return last;
  }
  const parent = parts[parts.length - 2];
  return `${parent}/${last}`.slice(-STATUS_CONFIG.workspaceMaxChars);
}

/**
 * 从 RTK 数据库获取 Token 统计
 */
function getRTKTokenStats() {
  try {
    const rtkDbPath = path.join(os.homedir(), 'Library', 'Application Support', 'rtk', 'history.db');
    if (!fs.existsSync(rtkDbPath)) {
      return { input: 0, output: 0 };
    }

    // 查询今天的 token 使用量
    const todayStats = execSync(
      `sqlite3 "${rtkDbPath}" "SELECT COALESCE(SUM(input_tokens), 0), COALESCE(SUM(output_tokens), 0) FROM commands WHERE date(timestamp) = date('now')"`,
      { encoding: 'utf8' }
    ).trim().split('|');

    const input = parseInt(todayStats[0]) || 0;
    const output = parseInt(todayStats[1]) || 0;

    return { input, output };
  } catch (e) {
    // 如果 RTK 不可用，返回 0
    return { input: 0, output: 0 };
  }
}

/**
 * 获取会话信息
 */
function getSessionInfo() {
  const now = Date.now();
  const state = loadSessionState() || { startTime: now };

  // 模型信息
  const model = process.env.CLAUDE_MODEL || process.env.MODEL || 'glm-4.7';
  const modelShort = model.replace(/^(claude-|Pro\/MiniMaxAI\/)/i, '').split('/')[0] || model;

  // 工作目录
  const workspace = getWorkspaceName();

  // 会话时长
  const startTime = state.startTime || now;
  const duration = Math.floor((now - startTime) / 1000);

  // Token 统计（优先从 RTK 数据库读取）
  const rtkStats = getRTKTokenStats();
  const tokenIn = rtkStats.input || state.tokenIn || 0;
  const tokenOut = rtkStats.output || state.tokenOut || 0;
  const contextWindow = 200000; // 默认 200k
  const contextUsed = tokenIn + tokenOut;
  const contextPercent = ((contextUsed / contextWindow) * 100).toFixed(0);

  // 估算费用 (基于典型定价)
  const costEstimate = ((tokenIn / 1000) * 0.015 + (tokenOut / 1000) * 0.075).toFixed(4);

  return {
    model: modelShort,
    workspace: workspace,
    duration: formatDuration(duration),
    tokenIn: tokenIn,
    tokenOut: tokenOut,
    contextUsed: contextUsed,
    contextWindow: contextWindow,
    contextPercent: contextPercent,
    costEstimate: costEstimate,
    rtkEnabled: rtkStats.input > 0 || rtkStats.output > 0
  };
}

/**
 * 格式化状态栏输出
 * 示例效果：Opus 4.6 | Nano Design | 0% (0/200k) | 23m 13s | 8k(in)/11k(out)
 */
function formatStatusBar(info) {
  const parts = [
    info.model,
    info.workspace,
    `${info.contextPercent}% (${info.contextUsed.toLocaleString()}/${(info.contextWindow/1000).toLocaleString()}k)`,
    info.duration,
    `${(info.tokenIn/1000).toFixed(1)}k(in)/${(info.tokenOut/1000).toFixed(1)}k(out)`
  ];
  return parts.join(STATUS_CONFIG.separator);
}

/**
 * 更新 Token 统计（供 Hook 调用）
 */
function updateTokenStats(tokenIn, tokenOut) {
  const state = loadSessionState() || { startTime: Date.now() };
  state.tokenIn = (state.tokenIn || 0) + tokenIn;
  state.tokenOut = (state.tokenOut || 0) + tokenOut;
  state.lastUpdated = Date.now();
  saveSessionState(state);
}

/**
 * 初始化会话（SessionStart 时调用）
 */
function initSession() {
  const state = {
    startTime: Date.now(),
    tokenIn: 0,
    tokenOut: 0,
    lastUpdated: Date.now()
  };
  saveSessionState(state);
}

/**
 * 生成 zsh 配置提示
 */
function generateZshConfig() {
  const homeDir = os.homedir();
  const zshrcPath = path.join(homeDir, '.zshrc');
  const statusScript = path.join(__dirname, 'status-bar.js');

  return `
# ============================================
# Claude Code 状态栏配置
# 由 /statusline 命令自动生成
# ============================================

# Claude Code 状态栏函数
claude_code_status() {
  if [ -n "$CLAUDE_CODE_ACTIVE" ]; then
    node "${statusScript}" 2>/dev/null || true
  fi
}

# 方法 1: 在现有 PS1 后追加状态栏（推荐）
# 找到你的 PS1 定义，在末尾添加 \\$claude_code_status
# 例如：PS1="%n@%m:%~%# \\$(claude_code_status) "

# 方法 2: 使用 precmd 在每次提示前显示
precmd_claude_status() {
  if [ -n "$CLAUDE_CODE_ACTIVE" ]; then
    echo ""
    node "${statusScript}" 2>/dev/null || true
  fi
}
precmd_functions+=(precmd_claude_status)

# 在 Claude Code 中设置环境变量（可选）
alias cc='CLAUDE_CODE_ACTIVE=1 claude'
`;
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2);

  // 命令模式
  if (args[0] === '--init') {
    initSession();
    console.log('Session initialized');
    return;
  }

  if (args[0] === '--update' && args[1] && args[2]) {
    updateTokenStats(parseInt(args[1]), parseInt(args[2]));
    console.log('Token stats updated');
    return;
  }

  if (args[0] === '--config') {
    console.log(generateZshConfig());
    return;
  }

  // 默认：显示状态栏
  const info = getSessionInfo();
  const formatted = formatStatusBar(info);
  console.log(formatted);
}

// 导出函数供 Hook 调用
module.exports = { initSession, updateTokenStats, getSessionInfo, formatStatusBar, generateZshConfig };

if (require.main === module) {
  main();
}
