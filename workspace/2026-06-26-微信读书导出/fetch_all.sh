#!/bin/bash
# 批量导出全部划线 + 评论，带并发控制和重试
set -u
export WEREAD_API_KEY="${WEREAD_API_KEY:?请先 export WEREAD_API_KEY=wrk-xxxx}"
cd "$(dirname "$0")"

API="https://i.weread.qq.com/api/agent/gateway"
mkdir -p books

fetch_one() {
  local bookId="$1"
  local title="$2"
  local noteCount="$3"
  local reviewCount="$4"
  local safe=$(echo "$title" | tr '/\\:*?"<>|' '_' | head -c 40)

  # 划线
  if [ "$noteCount" -gt 0 ]; then
    for attempt in 1 2 3; do
      curl -s -X POST "$API" -H "Authorization: Bearer $WEREAD_API_KEY" -H "Content-Type: application/json" \
        -d "{\"api_name\":\"/book/bookmarklist\",\"bookId\":\"$bookId\",\"skill_version\":\"1.0.5\"}" \
        -o "books/${bookId}_marks.json" 2>/dev/null
      if [ -s "books/${bookId}_marks.json" ] && jq -e '.updated' "books/${bookId}_marks.json" >/dev/null 2>&1; then
        break
      fi
      sleep 0.3
    done
  fi

  # 评论（含翻页）
  if [ "$reviewCount" -gt 0 ]; then
    local synckey=0
    local page=1
    while :; do
      curl -s -X POST "$API" -H "Authorization: Bearer $WEREAD_API_KEY" -H "Content-Type: application/json" \
        -d "{\"api_name\":\"/review/list/mine\",\"bookid\":\"$bookId\",\"synckey\":${synckey},\"count\":50,\"skill_version\":\"1.0.5\"}" \
        -o "books/${bookId}_rev${page}.json" 2>/dev/null
      if [ ! -s "books/${bookId}_rev${page}.json" ]; then sleep 0.3; continue; fi
      local hm=$(jq -r '.hasMore // 0' "books/${bookId}_rev${page}.json")
      local n=$(jq -r '.reviews | length' "books/${bookId}_rev${page}.json" 2>/dev/null || echo 0)
      if [ "$hm" = "0" ] || [ "$n" = "0" ]; then break; fi
      synckey=$(jq -r '.synckey // 0' "books/${bookId}_rev${page}.json")
      page=$((page+1))
      if [ "$page" -gt 20 ]; then break; fi
    done
  fi
}

export -f fetch_one
export API WEREAD_API_KEY

# 生成任务清单：bookId<TAB>noteCount<TAB>reviewCount（不传 title，避免行长度问题）
jq -r '.[] | select((.noteCount+.reviewCount) > 0) | [.bookId, .noteCount, .reviewCount] | @tsv' \
  _all_notebooks_raw.json > _tasks.tsv
echo "任务数: $(wc -l < _tasks.tsv)"

# 并发导出（用后台子shell + 限流，避免 xargs 行长度限制）
count=0
while IFS=$'\t' read -r id nc rc; do
  fetch_one "$id" "" "$nc" "$rc" &
  count=$((count+1))
  # 每15个等一波
  if [ $((count % 15)) -eq 0 ]; then wait; fi
done < _tasks.tsv
wait
echo "导出完成，文件数: $(ls books/ 2>/dev/null | wc -l)"
