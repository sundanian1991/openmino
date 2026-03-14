#!/bin/bash
#
# Daily Claude News Summary
# 每日自动执行 Claude 新闻与技巧总结
#
# 功能：
# - 自动重试（最多 3 次）
# - 超时控制（5 分钟）
# - 失败告警（飞书 Webhook）
# - 执行日志
#
# 使用方式：
#   ./scripts/daily-claude-news.sh
#
# 定时任务配置（crontab -e）：
#   0 9 * * * /Users/sundanian/Documents/projects/ai-agents/my-agent/scripts/daily-claude-news.sh >> /tmp/claude-news.log 2>&1
#

set -e

# ==================== 配置区 ====================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="/tmp/claude-news.log"
MAX_RETRIES=3
RETRY_DELAY=60  # 秒
TIMEOUT_SECONDS=300  # 5 分钟

# 飞书 Webhook（可选，留空则不发送告警）
FEISHU_WEBHOOK=""

# ==================== 函数定义 ====================

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

send_feishu_alert() {
    local message="$1"
    if [ -n "$FEISHU_WEBHOOK" ]; then
        curl -s -X POST "$FEISHU_WEBHOOK" \
            -H "Content-Type: application/json" \
            -d "{\"msg_type\":\"text\",\"content\":{\"text\":\"[Claude 日报] $message\"}}" > /dev/null
        log "已发送飞书告警：$message"
    else
        log "飞书 Webhook 未配置，跳过告警发送"
    fi
}

send_feishu_success() {
    local output_file="$1"
    if [ -n "$FEISHU_WEBHOOK" ]; then
        curl -s -X POST "$FEISHU_WEBHOOK" \
            -H "Content-Type: application/json" \
            -d "{\"msg_type\":\"text\",\"content\":{\"text\":\"✅ Claude 日报生成成功\\n输出文件：$output_file\"}}" > /dev/null
        log "已发送飞书成功通知"
    fi
}

execute_claude_task() {
    local output_file="$1"

    log "开始执行 Claude 任务..."

    # macOS 没有 timeout 命令，用 gtimeout (brew install coreutils) 或后台进程实现
    # 这里用后台进程方式实现超时控制
    if command -v gtimeout &> /dev/null; then
        # Homebrew 安装的 coreutils
        timeout_cmd="gtimeout"
    elif command -v timeout &> /dev/null; then
        # Linux 或已安装 timeout
        timeout_cmd="timeout"
    else
        # 没有 timeout 命令，直接执行不设置超时
        timeout_cmd=""
    fi

    local prompt="
请执行以下任务：
1. 搜索最新的 Claude 新闻（最近 7 天）
2. 整理 Claude 使用技巧
3. 输出格式化的日报到文件：$output_file

要求：
- 使用 tavily_search 搜索实时信息
- 输出包含：重大更新、使用技巧、生态动态、风险提示
- 格式简洁，用 Markdown
"

    if [ -n "$timeout_cmd" ]; then
        $timeout_cmd "$TIMEOUT_SECONDS" claude "$prompt" --output "$output_file"
    else
        # 无 timeout 命令，直接执行（依赖 claude 自身的超时机制）
        claude "$prompt" --output "$output_file"
    fi

    return $?
}

# ==================== 主流程 ====================

main() {
    log "=========================================="
    log "Claude 日报生成任务启动"
    log "=========================================="

    # 生成输出文件名（带日期）
    local today=$(date '+%Y-%m-%d')
    local output_dir="$PROJECT_DIR/docs/每日Claude新闻"
    local output_file="$output_dir/claude-news-$today.md"

    # 确保输出目录存在
    mkdir -p "$output_dir"

    # 重试循环
    local attempt=1
    while [ $attempt -le $MAX_RETRIES ]; do
        log "尝试第 $attempt 次执行（最多 $MAX_RETRIES 次）..."

        if execute_claude_task "$output_file"; then
            log "✅ 执行成功"
            log "输出文件：$output_file"
            send_feishu_success "$output_file"
            log "=========================================="
            log "任务完成"
            log "=========================================="
            exit 0
        else
            log "⚠️ 第 $attempt 次执行失败"

            if [ $attempt -lt $MAX_RETRIES ]; then
                log "等待 $RETRY_DELAY 秒后重试..."
                sleep $RETRY_DELAY
            fi
        fi

        attempt=$((attempt + 1))
    done

    # 所有重试失败
    log "❌ 所有 $MAX_RETRIES 次重试均失败"
    send_feishu_alert "❌ Claude 日报生成失败（已重试 $MAX_RETRIES 次）"

    log "=========================================="
    log "任务失败"
    log "=========================================="
    exit 1
}

# 执行主流程
main "$@"
