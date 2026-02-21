#!/bin/bash
# 脚本说明：整理记忆文件，扫描并提示需要归档的内容
# 作者：Mino
# 日期：2026-02-17

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DAILY_DIR="$PROJECT_ROOT/memory/daily"
MEMORY_FILE="$PROJECT_ROOT/.claude/rules/04-MEMORY.md"

main() {
    echo "📋 整理记忆文件..."
    echo ""

    # 检查目录是否存在
    if [ ! -d "$DAILY_DIR" ]; then
        echo "❌ 找不到 memory/daily/ 目录"
        exit 1
    fi

    # 列出最近的日记文件
    echo "📅 最近的日记文件："
    echo "---"
    ls -lt "$DAILY_DIR" | head -6 | tail -5 | awk '{print "  " $9}'
    echo ""

    # 统计日记数量
    daily_count=$(ls -1 "$DAILY_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
    echo "📊 日记文件总数：$daily_count"
    echo ""

    # 检查长期记忆文件大小
    if [ -f "$MEMORY_FILE" ]; then
        memory_lines=$(wc -l < "$MEMORY_FILE" | tr -d ' ')
        echo "📖 长期记忆文件行数：$memory_lines"
    fi

    echo ""
    echo "💡 整理建议："
    echo "  1. 阅读最近的日记文件"
    echo "  2. 提取重要内容到 04-MEMORY.md"
    echo "  3. 删除过期的临时内容"
    echo "  4. 使用 /UPDATE_MEMORY 命令自动整理"
    echo ""
    echo "✅ 扫描完成"
}

main "$@"
