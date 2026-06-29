#!/bin/bash

# Insight Asset OS — 一键启动脚本（生产模式）
# 双击此文件即可构建 + 启动服务器并自动打开浏览器

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

PORT=3456

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

# 端口被占用时递增找可用端口
for p in $(seq $PORT 3460); do
  if ! lsof -i :$p 2>/dev/null >/dev/null; then
    PORT=$p
    break
  fi
done

# 生产构建（.next 不存在时）
if [ ! -d ".next" ]; then
  echo "🔨 正在构建生产版本…"
  npm run build
  if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误信息"
    echo "按 Enter 退出…"
    read -r
    exit 1
  fi
  echo ""
fi

# 启动生产服务器（后台）
echo "🚀 启动 Insight Asset OS（生产模式）→ http://localhost:$PORT"
npm run start -- -p $PORT &
SERVER_PID=$!

# 等待服务器就绪（最多等 30 秒）
READY=""
for i in $(seq 1 30); do
  if curl -s -o /dev/null "http://localhost:$PORT" 2>/dev/null; then
    READY=1
    break
  fi
  sleep 1
done

if [ -n "$READY" ]; then
  echo "✅ 服务器已就绪 → http://localhost:$PORT"
  if command -v open &>/dev/null; then
    open "http://localhost:$PORT"
  fi
else
  echo "⚠️ 服务器启动中… 请手动打开 http://localhost:$PORT"
fi

echo ""
echo "═══════════════════════════════════════"
echo "  关闭 Terminal 或按 Ctrl+C 停止服务器"
echo "═══════════════════════════════════════"

# 保持 Terminal 窗口打开
wait $SERVER_PID 2>/dev/null

echo ""
echo "服务器已停止。按 Enter 关闭此窗口…"
read -r
