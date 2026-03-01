#!/usr/bin/env python3
"""
使用浏览器自动化方法绕过 YouTube 限制
"""
import subprocess
import sys
import os

def download_with_method(url, output):
    """尝试多种下载方法"""

    # 方法1：使用 embed URL
    embed_url = f"https://www.youtube.com/embed/{url.split('v=')[1].split('&')[0]}"
    print(f"尝试方法1: embed URL")

    cmd = [
        "/opt/homebrew/bin/yt-dlp",
        embed_url,
        "-f", "best[height<=1080]",
        "-o", output,
        "--no-warnings"
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        return True

    # 方法2：使用 yewtu.be（Invidious 前端）
    print(f"尝试方法2: Invidious 前端")
    video_id = url.split('v=')[1].split('&')[0]
    invidious_url = f"https://yewtu.be/watch?v={video_id}"

    cmd = [
        "/opt/homebrew/bin/yt-dlp",
        invidious_url,
        "-f", "best[height<=1080]",
        "-o", output,
        "--no-warnings"
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        return True

    # 方法3：使用 piped.video
    print(f"尝试方法3: piped.video")
    piped_url = f"https://piped.video/watch?v={video_id}"

    cmd = [
        "/opt/homebrew/bin/yt-dlp",
        piped_url,
        "-f", "best[height<=1080]",
        "-o", output,
        "--no-warnings"
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0

def main():
    videos = [
        ("https://www.youtube.com/watch?v=7xTGNNLPyMI", "outputs/videos/01-karpathy-llm.mp4"),
        ("https://www.youtube.com/watch?v=IcbuTTVUY7M", "outputs/videos/02-granola-product.mp4"),
        ("https://www.youtube.com/watch?v=mccQdu5afZw", "outputs/videos/03-notebooklm-inside.mp4"),
        ("https://www.youtube.com/watch?v=ysPbXH0LpIE", "outputs/videos/04-anthropic-prompt-101.mp4"),
        ("https://www.youtube.com/watch?v=RNJCfif1dPY", "outputs/videos/05-andrew-ng-ai.mp4"),
        ("https://www.youtube.com/watch?v=ixY2PvQJ0To", "outputs/videos/06-chatgpt-inside.mp4"),
    ]

    os.makedirs("outputs/videos", exist_ok=True)

    for i, (url, output) in enumerate(videos, 1):
        print(f"\n{'='*60}")
        print(f"[{i}/{len(videos)}] {url}")
        print(f"输出: {output}")
        print(f"{'='*60}")

        success = download_with_method(url, output)

        if success:
            print(f"✅ 完成: {output}")
        else:
            print(f"❌ 失败，跳过")

if __name__ == "__main__":
    main()
