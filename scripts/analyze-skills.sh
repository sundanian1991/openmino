#!/bin/bash
# 脚本说明：分析skill使用情况
# 作者：Mino
# 日期：2026-02-17

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SKILLS_FILE="$PROJECT_ROOT/memory/skills-usage.md"

main() {
    echo "🔍 分析Skill使用情况..."
    echo ""

    # 检查文件是否存在
    if [ ! -f "$SKILLS_FILE" ]; then
        echo "❌ 找不到 skills-usage.md"
        exit 1
    fi

    # 提取使用记录
    echo "📊 使用记录："
    echo "---"
    grep -A 20 "## 使用记录" "$SKILLS_FILE" | grep "^|" | tail -n +2 || echo "暂无记录"

    echo ""
    echo "📈 按频率统计："
    echo "---"
    grep -A 20 "按使用频率" "$SKILLS_FILE" | grep "^|" | tail -n +2 || echo "暂无数据"

    echo ""
    echo "✅ 分析完成"
}

main "$@"
