#!/bin/bash
# 使用 Chrome cookies 下载 YouTube 视频
# 使用方法：先在 Chrome 中打开 YouTube 并登录，然后运行此脚本

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$PROJECT_DIR/outputs/videos"

mkdir -p "$OUTPUT_DIR"

echo "=========================================="
echo "使用 Chrome Cookies 下载 YouTube 视频"
echo "=========================================="
echo ""
echo "请确保："
echo "1. Chrome 浏览器已打开"
echo "2. 已访问 YouTube 并登录（如果需要）"
echo ""
read -p "按 Enter 继续..."
echo ""

# 视频列表
declare -a VIDEOS=(
    "https://www.youtube.com/watch?v=7xTGNNLPyMI|01-karpathy-llm"
    "https://www.youtube.com/watch?v=IcbuTTVUY7M|02-granola-product"
    "https://www.youtube.com/watch?v=mccQdu5afZw|03-notebooklm-inside"
    "https://www.youtube.com/watch?v=ysPbXH0LpIE|04-anthropic-prompt-101"
    "https://www.youtube.com/watch?v=RNJCfif1dPY|05-andrew-ng-ai"
    "https://www.youtube.com/watch?v=ixY2PvQJ0To|06-chatgpt-inside"
)

for i in "${!VIDEOS[@]}"; do
    IFS='|' read -r URL PREFIX <<< "${VIDEOS[$i]}"
    NUM=$((i + 1))

    echo ""
    echo "[$NUM/${#VIDEOS[@]}] 下载: $PREFIX"
    echo "URL: $URL"

    /opt/homebrew/bin/yt-dlp \
        --cookies-from-browser chrome \
        --no-warnings \
        -f "bv*[height<=1080]+ba/b" \
        --merge-output-format mp4 \
        -o "$OUTPUT_DIR/$PREFIX.%(ext)s" \
        "$URL"

    if [ $? -eq 0 ]; then
        echo "✅ [$NUM/${#VIDEOS[@]}] 完成: $PREFIX"
    else
        echo "❌ [$NUM/${#VIDEOS[@]}] 失败: $PREFIX"
    fi
done

echo ""
echo "=========================================="
echo "下载完成!"
echo "视频保存在: $OUTPUT_DIR"
echo "=========================================="

ls -lh "$OUTPUT_DIR"/*.mp4 2>/dev/null || echo "没有找到下载的视频文件"
