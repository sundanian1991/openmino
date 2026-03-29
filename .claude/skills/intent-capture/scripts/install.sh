#!/bin/bash
# intent-capture 安装脚本
# 自动安装依赖（pynput、pillow、tesseract、tesseract-lang）

set -e

echo "🔧 intent-capture 依赖安装"
echo "=========================="

# 1. Tesseract OCR
if ! command -v tesseract &> /dev/null; then
    echo "📦 安装 Tesseract OCR..."
    brew install tesseract tesseract-lang
else
    echo "✓ Tesseract 已安装"
fi

# 2. 创建虚拟环境
VENV_DIR="$HOME/.intent-capture/venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "📦 创建 Python 虚拟环境..."
    python3 -m venv "$VENV_DIR"
else
    echo "✓ 虚拟环境已存在"
fi

# 3. 激活虚拟环境并安装依赖
echo "📦 安装 Python 依赖..."
source "$VENV_DIR/bin/activate"
pip install --upgrade pip
pip install pynput pillow anthropic

# 4. 检查 API Key
if [ -z "$ANTHROPIC_API_KEY" ]; then
    echo ""
    echo "⚠️  未设置 ANTHROPIC_API_KEY 环境变量"
    echo "   AI 功能需要 API Key 才能使用"
    echo "   设置方式: export ANTHROPIC_API_KEY='your-key-here'"
fi

echo ""
echo "✅ 安装完成！"
echo ""
echo "使用方法："
echo "  启动监听: $VENV_DIR/bin/python .claude/skills/intent-capture/scripts/listener.py"
echo "  分析截图: $VENV_DIR/bin/python .claude/skills/intent-capture/scripts/analyzer.py --analyze"
echo ""
echo "快捷方式（添加到 ~/.zshrc 或 ~/.bashrc）："
echo "  alias ic-start='$VENV_DIR/bin/python $(pwd)/.claude/skills/intent-capture/scripts/listener.py'"
echo "  alias ic-analyze='$VENV_DIR/bin/python $(pwd)/.claude/skills/intent-capture/scripts/analyzer.py'"
