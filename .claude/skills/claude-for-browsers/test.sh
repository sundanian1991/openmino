#!/bin/bash
# Quick Test Script for Claude for Browsers

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Claude for Browsers - 测试脚本"
echo "================================"
echo

# Test 1: Browser Detection
echo "测试 1: 浏览器检测"
echo "--------------------"
RUNNING_BROWSERS=($("${SCRIPT_DIR}/lib/browser-detect.sh" detect))
if [ ${#RUNNING_BROWSERS[@]} -eq 0 ]; then
  echo "没有检测到运行的浏览器"
  echo "请先打开 Safari、Tabbit 或 Chrome"
else
  echo "检测到浏览器："
  for browser in "${RUNNING_BROWSERS[@]}"; do
    echo "  - $browser"
  done
fi
echo

# Test 2: Frontmost Browser
echo "测试 2: 当前最前浏览器"
echo "----------------------"
FRONT=$("${SCRIPT_DIR}/lib/browser-detect.sh" frontmost)
echo "最前浏览器: $FRONT"
echo

# Test 3: List Tabs
echo "测试 3: 列出标签页"
echo "--------------------"
"${SCRIPT_DIR}/lib/browser.sh" list 2>&1 | head -5
echo

# Test 4: Get Current URL
echo "测试 4: 获取当前 URL"
echo "--------------------"
"${SCRIPT_DIR}/lib/browser.sh" url 2>&1
echo

echo "================================"
echo "测试完成！"
echo
echo "使用示例："
echo "  ./lib/browser.sh list      # 列出标签页"
echo "  ./lib/browser.sh screenshot # 截图"
echo "  BROWSER=tabbit ./lib/browser.sh list  # 指定浏览器"
