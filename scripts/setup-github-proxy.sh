#!/bin/bash
# GitHub 加速配置脚本
# 使用方法: bash setup-github-proxy.sh

echo "配置 GitHub 代理加速..."

# 方法1: 使用 ghproxy 代理
# 注意: 只能克隆/下载，不能 push
git config --global url."https://mirror.ghproxy.com/https://github.com/".insteadOf "https://github.com/"

# 方法2: (可选) 克隆后自动切回原地址（需要 push 时手动改）
# 取消注释下面的行来启用
# git config --global --unset url."https://mirror.ghproxy.com/https://github.com/".insteadOf

echo "✅ 配置完成"
echo ""
echo "现在 clone 会自动使用 ghproxy 加速"
echo ""
echo "测试命令:"
echo "  git clone https://github.com/test/test.git"
echo ""
echo "如需推送到 GitHub，先用以下命令查看远程地址:"
echo "  git remote -v"
echo "然后手动修改 origin 地址为原地址"