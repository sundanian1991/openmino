#!/bin/bash

# 批量同步本地记忆到 Memos 云端
# 用法：./scripts/bulk-sync-to-memos.sh

API_KEY="mpg-IjBklEsmy6TBl6JF55QO4WOZ4u/yzfEh84OznkPz"
API_BASE="https://memos.memtensor.cn/api/openmem/v1"
USER_ID="mino"
MEMORY_DIR="/Users/sundanian/Documents/projects/ai-agents/my-agent/memory"

echo "🚀 开始批量同步本地记忆到 Memos..."
echo ""

# 计数器
synced=0

# ===== 同步 core 目录 =====
echo "📁 同步 core/ 目录..."

for category in decisions identity preferences; do
  for file in "$MEMORY_DIR/core/$category"/*.md; do
    [ -f "$file" ] || continue
    filename=$(basename "$file")
    [[ "$filename" == "CLAUDE.md" || "$filename" == "README.md" ]] && continue

    echo "  → $category/$filename"
    content=$(cat "$file" | tr '\n' ' ' | head -c 1500)

    curl -s -X POST "$API_BASE/add/message" \
      -H "Content-Type: application/json" \
      -H "Authorization: Token $API_KEY" \
      -d "{\"user_id\":\"$USER_ID\",\"conversation_id\":\"bulk-sync-core\",\"messages\":[{\"role\":\"user\",\"content\":\"核心记忆：$category/$filename\"},{\"role\":\"assistant\",\"content\":\"$content\"}],\"tags\":[\"#core\",\"#$category\"]}" > /dev/null

    ((synced++))
    sleep 0.3
  done
done

echo ""

# ===== 同步 daily 目录（最近 7 天）=====
echo "📅 同步 daily/ 目录（最近 7 天）..."

for i in {0..7}; do
  date=$(date -v "-${i}d" +%Y-%m-%d 2>/dev/null)
  [ -z "$date" ] && continue

  file="$MEMORY_DIR/active/daily/${date}.md"
  [ -f "$file" ] || continue

  echo "  → $(basename "$file")"
  content=$(cat "$file" | tr '\n' ' ' | head -c 1500)

  curl -s -X POST "$API_BASE/add/message" \
    -H "Content-Type: application/json" \
    -H "Authorization: Token $API_KEY" \
    -d "{\"user_id\":\"$USER_ID\",\"conversation_id\":\"bulk-sync-daily\",\"messages\":[{\"role\":\"user\",\"content\":\"Daily: $date\"},{\"role\":\"assistant\",\"content\":\"$content\"}],\"tags\":[\"#daily\",\"#日志\"]}" > /dev/null

  ((synced++))
  sleep 0.3
done

echo ""

# ===== 同步 my-thoughts 目录（最近 10 个）=====
echo "💡 同步 my-thoughts/ 目录（最近 10 个）..."

count=0
for file in "$MEMORY_DIR"/active/my-thoughts/*.md; do
  [ -f "$file" ] || continue
  ((count++))
  [ $count -gt 10 ] && break

  filename=$(basename "$file")
  [[ "$filename" == "CLAUDE.md" || "$filename" == "README.md" ]] && continue

  echo "  → $filename"
  content=$(cat "$file" | tr '\n' ' ' | head -c 1500)

  curl -s -X POST "$API_BASE/add/message" \
    -H "Content-Type: application/json" \
    -H "Authorization: Token $API_KEY" \
    -d "{\"user_id\":\"$USER_ID\",\"conversation_id\":\"bulk-sync-thoughts\",\"messages\":[{\"role\":\"user\",\"content\":\"Thoughts: $filename\"},{\"role\":\"assistant\",\"content\":\"$content\"}],\"tags\":[\"#my-thoughts\",\"#洞察\"]}" > /dev/null

  ((synced++))
  sleep 0.3
done

echo ""

# ===== 同步 weekly 目录 =====
echo "📊 同步 weekly/ 目录..."

for file in "$MEMORY_DIR"/active/weekly/*.md; do
  [ -f "$file" ] || continue
  filename=$(basename "$file")
  [[ "$filename" == "CLAUDE.md" || "$filename" == "README.md" ]] && continue

  echo "  → $filename"
  content=$(cat "$file" | tr '\n' ' ' | head -c 1500)

  curl -s -X POST "$API_BASE/add/message" \
    -H "Content-Type: application/json" \
    -H "Authorization: Token $API_KEY" \
    -d "{\"user_id\":\"$USER_ID\",\"conversation_id\":\"bulk-sync-weekly\",\"messages\":[{\"role\":\"user\",\"content\":\"Weekly: $filename\"},{\"role\":\"assistant\",\"content\":\"$content\"}],\"tags\":[\"#weekly\",\"#周报\"]}" > /dev/null

  ((synced++))
  sleep 0.3
done

echo ""
echo "✅ 批量同步完成！共同步 $synced 条记忆"
echo ""
echo "🔍 验证检索测试..."
sleep 2

# 验证检索
echo ""
echo "📊 检索测试：年老师"
curl -s -X POST "$API_BASE/search/memory" \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $API_KEY" \
  -d "{\"query\":\"年老师 工作\",\"user_id\":\"$USER_ID\",\"memory_limit_number\":5}" | \
  jq -r '.data.memory_detail_list[]? | "\(.memory_key): \(.memory_value | .[0:100])..."' 2>/dev/null || echo "（无结果或解析失败）"

echo ""
echo "✨ 全部完成！"
