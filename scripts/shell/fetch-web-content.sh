#!/bin/bash
# 智能网页内容抓取工具
# 优先级：tavily_extract > curl > webReader (最后手段)
#
# 用法：
#   ./fetch-web-content.sh https://example.com
#   ./fetch-web-content.sh https://example.com https://another.com
#   cat urls.txt | ./fetch-web-content.sh

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 工具检查
check_tavily() {
    if [[ -n "${TAVILY_API_KEY:-}" ]]; then
        return 0
    else
        return 1
    fi
}

check_html2text() {
    if command -v html2text &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# 方法1：tavily_extract（推荐，有API配额，无100次限制）
fetch_with_tavily() {
    local url="$1"
    echo -e "${GREEN}[tavily]${NC} 抓取: $url" >&2

    # 使用Python调用tavily MCP
    python3 - <<EOF
import os
import json
import urllib.request
import urllib.parse

api_key = os.environ.get('TAVILY_API_KEY')
if not api_key:
    print(json.dumps({"error": "TAVILY_API_KEY not set"}), file=__import__('sys').stderr)
    exit(1)

url = "$url"

# 调用Tavily Extract API
# 注意：实际使用需要根据tavily-mcp的实现调整
# 这里提供一个简化版本，实际应该通过MCP调用

try:
    # 由于没有直接的tavily_extract CLI，这里用curl模拟
    # 实际使用中，应该通过MCP服务器调用
    import subprocess
    result = subprocess.run([
        'curl', '-s', '-X', 'POST',
        'https://api.tavily.com/extract',
        '-H', 'Content-Type: application/json',
        '-d', json.dumps({
            "api_key": api_key,
            "urls": [url],
            "extract_depth": "advanced",
            "format": "markdown"
        })
    ], capture_output=True, text=True)

    if result.returncode == 0:
        data = json.loads(result.stdout)
        if 'results' in data and len(data['results']) > 0:
            print(data['results'][0].get('content', ''))
        else:
            print(f"# Tavily提取成功但无内容")
            print(json.dumps(data, indent=2))
    else:
        print(f"# Tavily调用失败: {result.stderr}", file=__import__('sys').stderr)
        exit(1)

except Exception as e:
    print(f"# Tavily提取出错: {e}", file=__import__('sys').stderr)
    exit(1)
EOF
}

# 方法2：curl + html2text（备用，无限制）
fetch_with_curl() {
    local url="$1"
    echo -e "${YELLOW}[curl]${NC} 抓取: $url" >&2

    if ! check_html2text; then
        echo -e "${RED}错误: html2text未安装${NC}" >&2
        echo "安装: brew install html2text" >&2
        return 1
    fi

    curl -s -L "$url" | html2text -utf8
}

# 主抓取逻辑
fetch_url() {
    local url="$1"
    local output_file="$2"

    if [[ ! "$url" =~ ^https?:// ]]; then
        url="https://$url"
    fi

    # 优先级1：tavily_extract
    if check_tavily; then
        if fetch_with_tavily "$url" > "${output_file:-/dev/stdout}" 2>/dev/null; then
            return 0
        else
            echo -e "${YELLOW}[警告]${NC} tavily失败，尝试备用方法" >&2
        fi
    fi

    # 优先级2：curl + html2text
    if fetch_with_curl "$url" > "${output_file:-/dev/stdout}" 2>/dev/null; then
        return 0
    fi

    # 失败
    echo -e "${RED}[错误]${NC} 所有方法都失败了" >&2
    return 1
}

# 批量处理
if [[ -t 0 ]]; then
    # 交互模式：从参数获取URL
    if [[ $# -eq 0 ]]; then
        echo "用法："
        echo "  $0 https://example.com"
        echo "  $0 https://example.com output.md"
        echo "  cat urls.txt | $0"
        exit 1
    fi

    url="$1"
    output="${2:-/dev/stdout}"
    fetch_url "$url" "$output"
else
    # 管道模式：从stdin读取URL
    first=1
    while IFS= read -r url || [[ -n "$url" ]]; do
        [[ -z "$url" ]] && continue
        [[ "$url" =~ ^# ]] && continue

        if [[ $first -eq 1 ]]; then
            first=0
        else
            echo ""
            echo "---"
            echo ""
        fi

        fetch_url "$url" "/dev/stdout"
    done
fi
