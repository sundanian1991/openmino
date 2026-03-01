#!/bin/bash
# 自动监控并下载 Zara AI 学习库的新视频
# 使用方法: ./scripts/auto-monitor-downloads.sh

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="$PROJECT_DIR/outputs/videos"
KNOWN_VIDEOS="$PROJECT_DIR/data/known-videos.txt"
SCAN_RESULT="$PROJECT_DIR/data/latest-scan.json"

# 创建必要目录
mkdir -p "$OUTPUT_DIR" "$PROJECT_DIR/data"

# 如果已知视频列表不存在，创建空文件
touch "$KNOWN_VIDEOS"

echo "=========================================="
echo "Zara AI 学习库 - 自动监控下载"
echo "=========================================="
echo "监控时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 步骤1: 抓取网站最新视频列表
echo "[1/3] 抓取最新视频列表..."

# 使用 yt-dlp 获取播放列表信息 (如果有的话)
# 或者从之前保存的扫描结果中提取

# 这里我们读取之前保存的视频列表
if [ -f "$PROJECT_DIR/outputs/2026-02-28-full-scan.md" ]; then
    # 从 markdown 文件中提取 YouTube 链接
    CURRENT_VIDEOS=$(grep -oP 'https://www\.youtube\.com/watch\?v=[a-zA-Z0-9_-]+' "$PROJECT_DIR/outputs/2026-02-28-full-scan.md" | sort | uniq)
else
    echo "⚠️  未找到扫描文件，使用默认视频列表"
    CURRENT_VIDEOS=$(cat <<'EOF'
https://www.youtube.com/watch?v=7xTGNNLPyMI
https://www.youtube.com/watch?v=IcbuTTVUY7M
https://www.youtube.com/watch?v=mccQdu5afZw
https://www.youtube.com/watch?v=ysPbXH0LpIE
https://www.youtube.com/watch?v=RNJCfif1dPY
https://www.youtube.com/watch?v=ixY2PvQJ0To
EOF
)
fi

# 步骤2: 检查新视频
echo "[2/3] 检查新视频..."
NEW_COUNT=0

for VIDEO_URL in $CURRENT_VIDEOS; do
    VIDEO_ID=$(echo "$VIDEO_URL" | grep -oP 'v=\K[a-zA-Z0-9_-]+')

    # 检查是否已经下载过
    if grep -q "$VIDEO_ID" "$KNOWN_VIDEOS" 2>/dev/null; then
        echo "  ⊙ 已知: $VIDEO_ID"
    else
        echo "  ★ 新发现: $VIDEO_ID"
        NEW_COUNT=$((NEW_COUNT + 1))

        # 获取视频标题
        TITLE=$(yt-dlp --get-title "$VIDEO_URL" 2>/dev/null || echo "Unknown")

        # 下载视频
        echo ""
        echo "  ↓ 下载: $TITLE"
        yt-dlp \
            -f "bv*[height<=1080]+ba/b" \
            --write-subs \
            --sub-langs "en,zh-Hans,en.orig" \
            --embed-subs \
            -o "$OUTPUT_DIR/%(title)s.%(ext)s" \
            "$VIDEO_URL"

        # 标记为已下载
        echo "$VIDEO_ID|$VIDEO_URL|$TITLE|$(date '+%Y-%m-%d')" >> "$KNOWN_VIDEOS"
        echo "  ✅ 完成: $TITLE"
        echo ""
    fi
done

# 步骤3: 总结
echo "[3/3] 监控完成"
echo ""
echo "=========================================="
if [ $NEW_COUNT -eq 0 ]; then
    echo "没有新视频"
else
    echo "发现并下载了 $NEW_COUNT 个新视频"
fi
echo "=========================================="
echo ""
echo "视频库统计:"
echo "  已知视频: $(wc -l < "$KNOWN_VIDEOS" 2>/dev/null || echo 0)"
echo "  已下载文件: $(ls -1 "$OUTPUT_DIR"/*.mp4 2>/dev/null | wc -l)"
echo "  总大小: $(du -sh "$OUTPUT_DIR" 2>/dev/null | cut -f1)"
echo ""
