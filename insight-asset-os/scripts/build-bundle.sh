#!/bin/bash
# 打包 Next.js standalone 为 Tauri 可用的资源目录
# 产物：dist/standalone-bundle/ —— 包含 server.js + node_modules + static
set -e

cd "$(dirname "$0")/.."

echo "📦 构建 Next.js standalone..."
npm run build

STANDALONE=".next/standalone"
DIST="dist/standalone-bundle"

echo "📂 组装 standalone bundle..."
rm -rf "$DIST"
mkdir -p "$DIST"

# 复制 standalone 核心（server.js + node_modules + .next/server）
cp -r "$STANDALONE/." "$DIST/"

# 复制 static 资源到正确位置
mkdir -p "$DIST/.next/static"
cp -r ".next/static/." "$DIST/.next/static/"

# 复制 OCR 模型缓存（如果有）
if [ -d "$HOME/.cache/ppu-paddle-ocr" ]; then
  echo "📷 复制 OCR 模型..."
  mkdir -p "$DIST/.cache/ppu-paddle-ocr"
  cp -r "$HOME/.cache/ppu-paddle-ocr/." "$DIST/.cache/ppu-paddle-ocr/"
fi

# 设置 GGUF 模型路径环境变量提示
cat > "$DIST/start.sh" << 'INNER'
#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
export QWEN3_EMBEDDING_PATH="${QWEN3_EMBEDDING_PATH:-$HOME/Library/Application Support/ai.linkly.desktop/data/models/Qwen3-Embedding-0.6B-Q8_0.gguf}"
export PPU_PADDLE_OCR_CACHE_DIR="${DIR}/.cache/ppu-paddle-ocr"
export PORT="${PORT:-3456}"
cd "$DIR"
exec node server.js
INNER
chmod +x "$DIST/start.sh"

echo "✓ Bundle 组装完成: $DIST"
du -sh "$DIST"
