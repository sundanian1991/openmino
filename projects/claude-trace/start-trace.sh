#!/bin/bash
# Claude Traces 快速启动脚本
# 用法：./start-trace.sh [session-name]

SESSION_NAME=${1:-trace-$(date +%Y%m%d-%H%M%S)}

echo "🔍 启动 Claude Traces..."
echo "   会话名：$SESSION_NAME"
echo ""

# 启动追踪
npx @mariozechner/claude-trace \
  --include-all-requests \
  --log "$SESSION_NAME" \
  --run-with chat

echo ""
echo "✅ 会话结束"
echo ""
echo "📊 生成 HTML 报告："
echo "   npx @mariozechner/claude-trace --generate-html .claude-trace/${SESSION_NAME}.jsonl"
