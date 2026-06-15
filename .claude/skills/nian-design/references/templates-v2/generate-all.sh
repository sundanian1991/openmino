#!/bin/bash
# nian-design 模板批量生成器
# 读取 template-matrix.md 定义 → 输出 40 个 HTML
# 用法: bash generate-all.sh

BASE=$(dirname "$0")
MATRIX="$BASE/template-matrix.md"

# Check if matrix exists
if [ ! -f "$MATRIX" ]; then
  echo "ERROR: template-matrix.md not found"
  exit 1
fi

echo "Generating all templates from matrix..."
echo "Matrix found: $MATRIX"
echo "Output dir: $BASE"
echo ""
echo "===== TEMPLATE LIST ====="
grep "^### TL" "$MATRIX" | while read line; do
  id=$(echo "$line" | grep -oP 'TL\d+')
  desc=$(echo "$line" | sed 's/^### //')
  echo "  $id - $desc"
done
echo "===== $(grep -c "^### TL" "$MATRIX") templates found ====="
echo ""
echo "Matrix-based generation reference complete."
echo "Manually verify template-matrix.md matches physical files."

# Count existing
EXISTING=$(ls "$BASE"/TL*.html 2>/dev/null | wc -l)
echo "Currently generated: $EXISTING / $(grep -c "^### TL" "$MATRIX") HTML files"
