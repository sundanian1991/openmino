#!/bin/bash

# GitHub hosts 自动更新脚本（从实时源获取最新 IP）
# 使用方法: bash scripts/update-github-hosts.sh

echo "🔄 开始更新 GitHub hosts..."
echo "📡 从 ineo6/hosts 获取最新 IP..."

# 定义临时文件
TEMP_HOSTS=$(mktemp)
SOURCE_URL="https://raw.githubusercontent.com/ineo6/hosts/master/hosts"

# 备份原 hosts
echo "📦 备份 /etc/hosts..."
sudo cp /etc/hosts /etc/hosts.backup.$(date +%Y%m%d_%H%M%S)

# 从实时源获取 GitHub 相关 hosts
echo "⬇️  下载最新 hosts..."
if ! curl -s "$SOURCE_URL" -o "$TEMP_HOSTS"; then
    echo "❌ 网络请求失败，请检查网络连接"
    rm -f "$TEMP_HOSTS"
    exit 1
fi

# 提取 GitHub 相关的行（包含 github、fastly、raw.githubusercontent 等）
echo "🔍 提取 GitHub 相关配置..."
GITHUB_HOSTS=$(grep -E "(github\.com|github\.|raw\.githubusercontent\.com|avatars\.githubusercontent\.com|user-images\.githubusercontent\.com|favicons\.githubusercontent\.com|fastly\.net)" "$TEMP_HOSTS" | grep -v "^#")

# 检查是否获取到数据
if [ -z "$GITHUB_HOSTS" ]; then
    echo "❌ 未获取到 GitHub hosts 数据，可能是源地址失效"
    rm -f "$TEMP_HOSTS"
    exit 1
fi

# 删除旧的 GitHub 配置
echo "🗑️  删除旧配置..."
sudo sed -i.bak '/# GitHub IP hosts Start/,/# GitHub IP hosts End/d' /etc/hosts

# 添加新配置
echo "➕ 添加新配置..."
{
    echo "# GitHub IP hosts Start"
    echo "$GITHUB_HOSTS"
    echo "# GitHub IP hosts End"
} | sudo tee -a /etc/hosts > /dev/null

# 清理临时文件
rm -f "$TEMP_HOSTS"

# 清理 DNS 缓存
echo "🧹 清理 DNS 缓存..."
if command -v dscacheutil &> /dev/null; then
    sudo dscacheutil -flushcache
    sudo killall -HUP mDNSResponder
fi

# 显示更新的 GitHub IP
echo ""
echo "✅ GitHub hosts 已更新为："
echo "---"
sudo grep -A 100 "# GitHub IP hosts Start" /etc/hosts | grep -B 100 "# GitHub IP hosts End" | grep -v "^#"
echo "---"

# 清理 DNS 缓存
echo ""
echo "🧹 清理 DNS 缓存..."
if command -v dscacheutil &> /dev/null; then
    sudo dscacheutil -flushcache
    sudo killall -HUP mDNSResponder
    echo "✅ DNS 缓存已清理"
fi

# 测试连通性
echo ""
echo "🧪 测试连通性..."
echo "---"
ping -c 3 github.com 2>&1 | grep "time="
echo "---"

echo ""
echo "✅ 更新完成！"
echo ""
echo "📋 备份位置: /etc/hosts.backup.*"
echo ""
echo "💡 如果还慢，可以试试:"
echo "  1. 重启浏览器"
echo "  2. 关闭 VPN（如果有）"
echo "  3. 等待 1-2 分钟让 DNS 生效"