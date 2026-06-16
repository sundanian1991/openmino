#!/usr/bin/env bash
# batch_convert.sh — wiki:ingest 的批量格式转换脚本
# 把一个文件夹里的混合格式文档(docx/xlsx/pptx/pdf/html)批量转成 markdown。
#
# 用法:
#   ./batch_convert.sh <源文件夹> <目标raw目录>
# 示例:
#   ./batch_convert.sh ~/Documents/供应商材料 wiki/raw
#
# 依赖:uv(用于运行 markitdown),Python 3.8+
# 安装:首次运行会自动拉取 markitdown,无需预装。

set -euo pipefail

SRC="${1:-}"
DST="${2:-}"

if [[ -z "$SRC" || -z "$DST" ]]; then
  echo "用法: $0 <源文件夹> <目标raw目录>"
  echo "示例: $0 ~/Documents/供应商材料 wiki/raw"
  exit 1
fi

if [[ ! -d "$SRC" ]]; then
  echo "❌ 源文件夹不存在: $SRC"
  exit 1
fi

mkdir -p "$DST"
mkdir -p "$DST/originals"

echo "🔍 扫描源文件夹: $SRC"
echo "📁 输出到: $DST"
echo "---"

# 统计
total=0
ok=0
fail=0
skipped=0

# 支持的扩展名
shopt -s nullglob nocaseglob

for f in "$SRC"/*; do
  [[ -f "$f" ]] || continue
  total=$((total + 1))

  base=$(basename "$f")
  ext="${base##*.}"
  name="${base%.*}"

  case "$ext" in
    docx|doc|xlsx|xls|pptx|ppt|pdf|html|htm|csv|json)
      echo "📄 转换: $base"
      # 备份原始二进制到 originals/
      cp "$f" "$DST/originals/$base"

      # 用 markitdown 转换
      if uvx markitdown "$f" -o "$DST/${name}.md" 2>/dev/null; then
        echo "   ✅ → ${name}.md"
        ok=$((ok + 1))
      else
        echo "   ❌ 转换失败"
        fail=$((fail + 1))
      fi
      ;;
    md|markdown)
      # markdown 直接拷贝,清理可能的多余 frontmatter
      cp "$f" "$DST/${name}.md"
      echo "📋 直接拷贝: $base → ${name}.md"
      ok=$((ok + 1))
      ;;
    txt)
      cp "$f" "$DST/${name}.md"
      echo "📋 文本拷贝: $base → ${name}.md"
      ok=$((ok + 1))
      ;;
    png|jpg|jpeg|gif|webp)
      echo "🖼️  跳过图片(需单独OCR): $base"
      skipped=$((skipped + 1))
      ;;
    zip)
      echo "📦 跳过压缩包(需先解压): $base"
      skipped=$((skipped + 1))
      ;;
    *)
      echo "❓ 跳过不支持的格式: $base (.$ext)"
      skipped=$((skipped + 1))
      ;;
  esac
done

shopt -u nocaseglob

echo "---"
echo "📊 转换完成"
echo "   总文件: $total"
echo "   成功: $ok"
echo "   失败: $fail"
echo "   跳过: $skipped"
echo ""
echo "⚠️  下一步:转换只是 Step 2。真正的 wiki 化(归类/提炼/链接)见 wiki:ingest SKILL.md Step 3-5。"
echo "⚠️  raw/ 里的文件还需人工/agent 评审,补充 [编码]_[主题].md 命名,再提炼进 distill/。"
