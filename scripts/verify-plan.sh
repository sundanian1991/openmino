#!/bin/bash

# Plan First 验证脚本
# 用法：./verify-plan.sh [planName|claude-md|all]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLAN_HOOK="$SCRIPT_DIR/../.claude/hooks/plan-hook.js"

if [ "$1" == "" ]; then
    echo "用法：./verify-plan.sh [planName|claude-md|all]"
    echo ""
    echo "  planName    验证单个 Plan"
    echo "  claude-md   验证 CLAUDE.md 三行注释"
    echo "  all         验证所有（Plan + CLAUDE.md）"
    exit 1
fi

if [ "$1" == "all" ]; then
    node "$PLAN_HOOK" validate-all
elif [ "$1" == "claude-md" ]; then
    node "$PLAN_HOOK" validate-claude-md
else
    node "$PLAN_HOOK" validate-plan "$1"
fi
