#!/bin/bash

# MemOS 记忆同步脚本
# 会话结束时自动调用，同步本次对话到云端

API_KEY="mpg-IjBklEsmy6TBl6JF55QO4WOZ4u/yzfEh84OznkPz"
API_BASE="https://memos.memtensor.cn/api/openmem/v1"
USER_ID="mino"
CONVERSATION_ID="my-agent-session-$(date +%Y%m%d)"

# 从参数获取内容：$1 = 对话摘要
if [ -z "$1" ]; then
  echo "❌ 请提供对话摘要"
  echo "用法: $0 '对话摘要内容'"
  exit 1
fi

SUMMARY="$1"
TAGS="${2:-}"

echo "📤 同步记忆到 MemOS..."

# 构建 JSON
if [ -n "$TAGS" ]; then
  TAGS_JSON=$(echo "$TAGS" | jq -R 'split(",") | map(select(length > 0))')
else
  TAGS_JSON="[]"
fi

curl -s -X POST "$API_BASE/add/message" \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $API_KEY" \
  -d "{
    \"user_id\": \"$USER_ID\",
    \"conversation_id\": \"$CONVERSATION_ID\",
    \"messages\": [
      {
        \"role\": \"user\",
        \"content\": \"$(echo "$SUMMARY" | head -c 500)\"
      }
    ],
    \"tags\": $TAGS_JSON,
    \"async_mode\": true
  }" > /dev/null

echo "✅ 已同步到 MemOS 云端"
