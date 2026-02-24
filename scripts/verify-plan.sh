#!/bin/bash

# Plan First 验证脚本
# 用法：./verify-plan.sh [planName]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLAN_HOOK="$SCRIPT_DIR/.claude/hooks/plan-hook.js"

if [ "$1" == "" ]; then
    echo "用法：./verify-plan.sh [planName|all]"
    exit 1
fi

if [ "$1" == "all" ]; then
    node "$PLAN_HOOK" validate-all
else
    node "$PLAN_HOOK" validate-plan "$1"
fi
