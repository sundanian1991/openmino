#!/bin/bash
# cloud-config-optimizer.sh
# Claude Code 云配置优化脚本

echo "🔐 Claude Code 云配置安全检查与优化"
echo "====================================="

# 验证环境
if [ ! -d "$HOME/.claude" ]; then
    echo "❌ Claude 配置目录不存在: $HOME/.claude"
    exit 1
fi

echo "✅ Claude 配置目录存在"

# 检查当前配置
SETTINGS_FILE="$HOME/.claude/settings.json"
MCP_FILE="$HOME/.claude/.mcp.json"
LOCAL_SETTINGS_FILE="$HOME/.claude/settings.local.json"

echo ""
echo "📋 当前配置检查:"

if [ -f "$SETTINGS_FILE" ]; then
    echo "   ✓ settings.json 存在"
    # 检查是否包含硬编码的 API 密钥
    if grep -q "TAVILY_API_KEY.*tvly-" "$SETTINGS_FILE"; then
        echo "   ⚠️  检测到 settings.json 中包含硬编码的 Tavily API 密钥"
        HAS_ENCODED_KEY=true
    else
        echo "   ✅ settings.json 中未检测到硬编码的 Tavily API 密钥"
    fi

    # 检查代理配置
    if grep -q "http://127.0.0.1:[0-9]*" "$SETTINGS_FILE"; then
        echo "   ⚠️  检测到 settings.json 中包含本地代理配置"
        PROXY_CONFIG_FOUND=true
    else
        echo "   ✅ settings.json 中未检测到本地代理配置"
    fi
else
    echo "   ❌ settings.json 不存在"
fi

if [ -f "$MCP_FILE" ]; then
    echo "   ✓ .mcp.json 存在"
    if grep -q "TAVILY_API_KEY.*tvly-" "$MCP_FILE"; then
        echo "   ⚠️  检测到 .mcp.json 中包含硬编码的 Tavily API 密钥"
        HAS_MCP_ENCODED_KEY=true
    else
        echo "   ✅ .mcp.json 中未检测到硬编码的 Tavily API 密钥"
    fi
else
    echo "   ❌ .mcp.json 不存在"
fi

if [ -f "$LOCAL_SETTINGS_FILE" ]; then
    echo "   ✓ settings.local.json 存在"
else
    echo "   ❌ settings.local.json 不存在"
fi

echo ""
echo "🔍 安全检查完成"

# 显示建议
echo ""
echo "💡 优化建议:"

if [ "$HAS_ENCODED_KEY" = true ] || [ "$HAS_MCP_ENCODED_KEY" = true ]; then
    echo "   1. 🔑 API 密钥安全: 将硬编码的 API 密钥移至环境变量"
    echo "      使用: export TAVILY_API_KEY='your_actual_key'"
    echo "      而不是将其存储在配置文件中"
fi

if [ "$PROXY_CONFIG_FOUND" = true ]; then
    echo "   2. 🌐 代理配置: 验证本地代理服务器的安全性"
    echo "      检查: http://127.0.0.1:19836 是否为可信服务"
fi

echo "   3. 🧹 清理: 定期审查不再使用的 MCP 服务器"
echo "   4. 📋 标准化: 统一模型名称和配置格式"

# 性能检查
echo ""
echo "⚡ 性能检查:"

# 检查当前启用的插件数量
if [ -f "$SETTINGS_FILE" ]; then
    PLUGIN_COUNT=$(grep -c '"enabledPlugins"' "$SETTINGS_FILE" 2>/dev/null || echo 0)
    if [ $PLUGIN_COUNT -gt 0 ]; then
        TOTAL_PLUGINS=$(grep -c "true" "$SETTINGS_FILE" | grep -v "enabledPlugins" | head -1)
        echo "   已启用插件数: $TOTAL_PLUGINS (检查配置中...)"
    fi
fi

# 检查配置文件大小
if [ -f "$SETTINGS_FILE" ]; then
    SETTINGS_SIZE=$(stat -f%z "$SETTINGS_FILE" 2>/dev/null || stat -c%s "$SETTINGS_FILE" 2>/dev/null || echo "N/A")
    echo "   settings.json 大小: $SETTINGS_SIZE 字节"
fi

if [ -f "$MCP_FILE" ]; then
    MCP_SIZE=$(stat -f%z "$MCP_FILE" 2>/dev/null || stat -c%s "$MCP_FILE" 2>/dev/null || echo "N/A")
    echo "   .mcp.json 大小: $MCP_SIZE 字节"
fi

echo ""
echo "🔧 推荐操作:"
echo "   1. 备份当前配置: cp -r $HOME/.claude $HOME/.claude-backup-$(date +%Y%m%d)"
echo "   2. 验证 API 调用: 检查 Tavily 搜索是否正常工作"
echo "   3. 重启 Claude Code: 使配置更改生效"

echo ""
echo "🛡️  安全提示:"
echo "   - 不要在配置文件中存储敏感信息"
echo "   - 定期轮换 API 密钥"
echo "   - 使用最小权限原则"
echo "   - 定期审查启用的服务"

echo ""
echo "✅ 配置检查完成"