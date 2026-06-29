#!/bin/bash

# Insight Asset OS — 一键启动脚本
# 双击此文件即可启动开发服务器并自动打开浏览器

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

# 检测 node
if ! command -v node &>/dev/null; then
  echo "❌ 未检测到 Node.js，请先安装：https://nodejs.org"
  echo "按 Enter 退出…"
  read -r
  exit 1
fi

# 检测 npm
if ! command -v npm &>/dev/null; then
  echo "❌ 未检测到 npm"
  echo "按 Enter 退出…"
  read -r
  exit 1
fi

# 自动安装依赖（如果 node_modules 不存在）
if [ ! -d "node_modules" ]; then
  echo "📦 正在安装依赖（首次启动）…"
  npm install
  echo ""
fi

# 启动服务器（后台）
echo "🚀 启动 Insight Asset OS…"
npm run dev &
DEV_PID=$!

# 等待服务器就绪（最多等 30 秒）
PORT=""
for i in $(seq 1 30); do
  # 检查 dev 脚本实际使用的端口（3456-3460）
  for p in 3456 3457 3458 3459 3460; do
    if curl -s -o /dev/null "http://localhost:$p" 2>/dev/null; then
      PORT=$p
      break 2
    fi
  done
  sleep 1
done

if [ -n "$PORT" ]; then
  echo "✅ 服务器已启动 → http://localhost:$PORT"
  # 检测 macOS 版本，用合适的命令打开浏览器
  if command -v open &>/dev/null; then
    open "http://localhost:$PORT"
  fi
else
  echo "⚠️ 服务器启动中… 请手动刷新 http://localhost:3456"
fi

echo ""
echo "═══════════════════════════════════════"
echo "  关闭 Terminal 或按 Ctrl+C 停止服务器"
echo "═══════════════════════════════════════"

# 保持 Terminal 窗口打开，等待用户按 Ctrl+C
wait $DEV_PID 2>/dev/null

echo ""
echo "服务器已停止。按 Enter 关闭此窗口…"
read -r
