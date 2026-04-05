#!/bin/bash
# 脚本说明：生成今日工作简报
# 作者：Mino
# 日期：2026-02-17

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
TODAY=$(date +%Y-%m-%d)
DAILY_FILE="$PROJECT_ROOT/memory/daily/$(date +%Y-%m)/$TODAY.md"

main() {
    echo "📝 生成今日工作简报..."
    echo ""

    # 检查今日日记是否存在
    if [ ! -f "$DAILY_FILE" ]; then
        echo "📄 今日日记不存在，创建中..."
        cat > "$DAILY_FILE" << EOF
# $TODAY

## 今日工作

- [ ] 任务1
- [ ] 任务2

## 重要笔记



---
EOF
        echo "✅ 已创建 $DAILY_FILE"
    fi

    echo ""
    echo "📊 今日内容预览："
    echo "---"

    # 显示今日日记的前20行
    head -20 "$DAILY_FILE"

    echo ""
    echo "💡 编辑日记："
    echo "  open $DAILY_FILE"
    echo ""
    echo "✅ 完成"
}

main "$@"
