#!/bin/bash
# 批量下载 Zara AI 学习库视频
# 创建时间: 2026-02-28

set -e

# 项目根目录
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$PROJECT_DIR/outputs/videos"

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 视频清单 (标题 | URL | 文件名前缀)
declare -a VIDEOS=(
    "Karpathy_LLM_Deep_Dive|https://www.youtube.com/watch?v=7xTGNNLPyMI|01-karpathy-llm"
    "Granola_AI_Product|https://www.youtube.com/watch?v=IcbuTTVUY7M|02-granola-product"
    "NotebookLM_Inside|https://www.youtube.com/watch?v=mccQdu5afZw|03-notebooklm-inside"
    "Anthropic_Prompt_101|https://www.youtube.com/watch?v=ysPbXH0LpIE|04-anthropic-prompt-101"
    "Andrew_Ng_AI_Building|https://www.youtube.com/watch?v=RNJCfif1dPY|05-andrew-ng-ai"
    "ChatGPT_Inside|https://www.youtube.com/watch?v=ixY2PvQJ0To|06-chatgpt-inside"
)

echo "=========================================="
echo "Zara AI 学习库视频批量下载"
echo "=========================================="
echo "输出目录: $OUTPUT_DIR"
echo "共 ${#VIDEOS[@]} 个视频"
echo "=========================================="

# 遍历下载每个视频
for i in "${!VIDEOS[@]}"; do
    IFS='|' read -r TITLE URL PREFIX <<< "${VIDEOS[$i]}"
    NUM=$((i + 1))

    echo ""
    echo "[$NUM/${#VIDEOS[@]}] 下载: $TITLE"
    echo "URL: $URL"

    # 使用 yt-dlp 下载
    # -f: 最佳质量
    # --write-subs: 下载字幕
    # --sub-langs: 英文和中文字幕
    # -o: 输出文件名格式
    yt-dlp \
        -f "bv*[height<=1080]+ba/b" \
        --write-subs \
        --sub-langs "en,zh-Hans,en.orig" \
        --embed-subs \
        -o "$OUTPUT_DIR/$PREFIX.%(title)s.%(ext)s" \
        "$URL"

    if [ $? -eq 0 ]; then
        echo "✅ [$NUM/${#VIDEOS[@]}] 完成: $TITLE"
    else
        echo "❌ [$NUM/${#VIDEOS[@]}] 失败: $TITLE"
    fi
done

echo ""
echo "=========================================="
echo "下载完成!"
echo "视频保存在: $OUTPUT_DIR"
echo "=========================================="

# 列出下载的文件
echo ""
echo "已下载文件:"
ls -lh "$OUTPUT_DIR"/*.mp4 2>/dev/null || echo "没有找到 MP4 文件"
