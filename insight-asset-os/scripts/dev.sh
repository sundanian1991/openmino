#!/bin/bash
# 自动找可用端口的 dev 启动脚本
# 优先使用 3456，被占用则递增直到找到可用端口

BASE_PORT=3456
MAX_PORT=3460

for port in $(seq $BASE_PORT $MAX_PORT); do
  if ! lsof -i :$port 2>/dev/null >/dev/null; then
    echo "✓ 端口 $port 可用，启动开发服务器..."
    npx next dev -p $port
    exit 0
  fi
done

echo "⚠️ 端口 $BASE_PORT-$MAX_PORT 全部被占用，尝试 3000…"
npx next dev 2>&1
