#!/bin/bash
# Agnes Image Generation Helper
# Usage: ./gen_image.sh "<prompt>" <output_filename> [size]
API_KEY="sk-GwStu2ES84lelfrg5DJuAXbCs1qpowJOyiSAtt1HeTcfsyf9"
BASE_URL="https://apihub.agnes-ai.com/v1"
OUT_DIR="$(dirname "$0")/../assets/images"

PROMPT="$1"
FILENAME="$2"
SIZE="${3:-1792x1024}"

RESPONSE=$(curl -s -X POST "${BASE_URL}/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${API_KEY}" \
  -d "{
    \"model\": \"agnes-image-2.1-flash\",
    \"prompt\": $(python3 -c "import json,sys; print(json.dumps(sys.argv[1]))" "$PROMPT"),
    \"n\": 1,
    \"size\": \"$SIZE\"
  }")

URL=$(echo "$RESPONSE" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data'][0]['url'])" 2>/dev/null)

if [ -n "$URL" ] && [ "$URL" != "None" ]; then
  curl -sL -o "${OUT_DIR}/${FILENAME}" "$URL"
  echo "OK: ${FILENAME} ($(ls -lh ${OUT_DIR}/${FILENAME} | awk '{print $5}'))"
else
  echo "FAIL: $FILENAME"
  echo "$RESPONSE" | head -5
fi
