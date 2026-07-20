#!/bin/bash
# 每日记忆整理触发器 — 每日 10:00 执行
# 检查前一日 buffer 是否有待整理内容，有则通知年老师

set -e

WORKSPACE="/Users/sundanian/Documents/projects/ai-agents/my-agent"
BUFFER="$WORKSPACE/memory/thinking/buffer.md"
LOG_DIR="$WORKSPACE/memory/logs"
mkdir -p "$LOG_DIR"

DATE=$(date +%Y-%m-%d)
LOG="$LOG_DIR/daily-organize.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始检查..." >> "$LOG"

# 检查 buffer 是否有实际条目（排除头部说明和空行）
# buffer 格式：条目以 "- YYYY-MM-DD HH:MM |" 开头
ENTRIES=$(grep -c -- '^- [0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\} ' "$BUFFER" 2>/dev/null || true)
ENTRIES=$(echo "$ENTRIES" | tail -1)  # 取最后一行防止意外

if [ "$ENTRIES" -gt 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 发现 $ENTRIES 条待整理" >> "$LOG"
    
    # 触发 Claude Code 执行整理
    cd "$WORKSPACE"
    
    claude --dangerously-skip-permissions "$(cat scripts/daily-memory-organizer.md)

请执行以上整理指令。" 2>> "$LOG"
    
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 整理完成" >> "$LOG"
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 无需整理（buffer 为空）" >> "$LOG"
fi
