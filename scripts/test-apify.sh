#!/bin/bash

# Apify 集成测试脚本（更新版）

set -e

echo "=== Apify 集成测试 ==="
echo ""

# 1. 检查环境变量
echo "1. 检查环境变量..."
if [ -z "$APIFY_TOKEN" ]; then
    echo "❌ APIFY_TOKEN 未设置"
    echo "   请运行：export APIFY_TOKEN=\"your_token\""
    exit 1
else
    echo "✅ APIFY_TOKEN 已设置"
    echo "   Token: ${APIFY_TOKEN:0:20}..."
fi

# 2. 检查 npx 和 MCP
echo ""
echo "2. 检查 npx 可用性..."
if command -v npx &> /dev/null; then
    echo "✅ npx 可用（版本：$(npx --version)）"
else
    echo "❌ npx 未安装"
fi

# 3. 检查.mcp.json
echo ""
echo "3. 检查.mcp.json 配置..."
if [ -f ".mcp.json" ]; then
    if jq -e '.mcpServers.apify' .mcp.json > /dev/null 2>&1; then
        echo "✅ Apify MCP 已配置"
        jq '.mcpServers.apify' .mcp.json
    else
        echo "⚠️  .mcp.json 存在但未配置 Apify"
    fi
else
    echo "❌ .mcp.json 不存在"
    echo "   请创建文件并添加 Apify 配置"
fi

echo ""
echo "=== 测试完成 ==="
echo ""
echo "下一步："
echo "1. 重启 Claude Code"
echo "2. 测试指令：\"list all available Apify Actors\""
echo "3. 或运行：\"scrape Google Maps for AI startups in San Francisco\""
