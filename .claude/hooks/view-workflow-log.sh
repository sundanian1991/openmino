#!/bin/bash

# Transparent Workflow Log Viewer
# 用法：./view-workflow-log.sh [today|week|all|analyze]

LOG_FILE="memory/active/tasks/monitoring/transparent-workflow.log"
ACTION="${1:-today}"

case "$ACTION" in
    today)
        # 今天的记录
        echo "=== 今天的透明工作流执行记录 ==="
        date
        echo ""
        grep "$(date +%Y-%m-%d)" "$LOG_FILE" 2>/dev/null | jq -r '"\(.timestamp | .[0:19]) | \(.level) | \(.steps)步 | \(.prompt)"' 2>/dev/null || grep "$(date +%Y-%m-%d)" "$LOG_FILE"
        ;;
    week)
        # 最近 7 天
        echo "=== 最近 7 天的透明工作流执行记录 ==="
        date
        echo ""
        grep "$(date -v-7d +%Y-%m-%d \| sed 's/-/[/g')[/g]" "$LOG_FILE" 2>/dev/null | tail -20
        ;;
    analyze)
        # 统计分析
        echo "=== 透明工作流执行统计 ==="
        date
        echo ""
        echo "总任务数：$(wc -l < "$LOG_FILE" 2>/dev/null || echo 0)"
        echo "复杂任务：$(grep -c '"level":"COMPLEX"' "$LOG_FILE" 2>/dev/null || echo 0)"
        echo "中等任务：$(grep -c '"level":"MEDIUM"' "$LOG_FILE" 2>/dev/null || echo 0)"
        echo "简单任务：$(grep -c '"level":"SIMPLE"' "$LOG_FILE" 2>/dev/null || echo 0)"
        echo ""
        echo "=== 最近 5 条复杂任务 ==="
        grep '"level":"COMPLEX"' "$LOG_FILE" 2>/dev/null | tail -5 | jq -r '"\(.timestamp | .[0:19]) | \(.steps)步 | \(.prompt)"' 2>/dev/null || grep '"level":"COMPLEX"' "$LOG_FILE" 2>/dev/null | tail -5
        ;;
    all)
        # 所有记录
        echo "=== 所有透明工作流执行记录 ==="
        cat "$LOG_FILE" 2>/dev/null | jq '.' 2>/dev/null || cat "$LOG_FILE"
        ;;
    *)
        echo "用法：./view-workflow-log.sh [today|week|all|analyze]"
        echo ""
        echo "  today   - 今天的记录"
        echo "  week    - 最近 7 天"
        echo "  all     - 所有记录"
        echo "  analyze - 统计分析"
        exit 1
        ;;
esac
