#!/bin/bash

# Plan First 验证脚本（增强版）
# 用法：./verify-plan.sh [planName|todo|claude-md|agentic|all]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLAN_HOOK="$SCRIPT_DIR/../.claude/hooks/plan-hook.js"
AGENTIC_LOOP_HOOK="$SCRIPT_DIR/../.claude/hooks/agentic-loop-hook.js"

if [ "$1" == "" ]; then
    echo "用法：./verify-plan.sh [planName|todo|claude-md|agentic|all]"
    echo ""
    echo "  planName    验证单个 Plan"
    echo "  todo        验证 todo.md 中所有已完成任务"
    echo "  claude-md   验证 CLAUDE.md 三行注释"
    echo "  agentic     验证 Agentic Loop 前置条件（Spec + 测试用例）"
    echo "  all         验证所有（Plan + Todo + CLAUDE.md + Agentic）"
    exit 1
fi

if [ "$1" == "all" ]; then
    node "$PLAN_HOOK" validate-all
    echo ""
    echo "=== Agentic Loop 验证 ==="
    node "$AGENTIC_LOOP_HOOK" validate "$2"
elif [ "$1" == "todo" ]; then
    node "$PLAN_HOOK" validate-todo
elif [ "$1" == "claude-md" ]; then
    node "$PLAN_HOOK" validate-claude-md
elif [ "$1" == "agentic" ]; then
    if [ "$2" == "" ]; then
        echo "❌ 请提供任务名称"
        exit 1
    fi
    node "$AGENTIC_LOOP_HOOK" validate "$2"
else
    node "$PLAN_HOOK" validate-plan "$1"
fi
