#!/bin/bash
# init.sh - 初始化五文件工作流

set -e

PROJECT_DIR="${1:-$(pwd)}"
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATES_DIR="$SKILL_DIR/templates"

echo "[planning-with-files] 初始化项目目录：$PROJECT_DIR"

# 创建 docs 目录
mkdir -p "$PROJECT_DIR/docs"

# 复制模板文件
for template in prompt.md plans.md architecture.md implement.md documentation.md; do
    src="$TEMPLATES_DIR/$template"
    dst="$PROJECT_DIR/docs/$template"
    if [ -f "$src" ]; then
        cp "$src" "$dst"
        echo "[planning-with-files] ✅ 创建 docs/$template"
    else
        echo "[planning-with-files] ⚠️  模板不存在：$template"
    fi
done

echo ""
echo "[planning-with-files] 初始化完成！"
echo ""
echo "下一步："
echo "1. 编辑 docs/prompt.md - 定义项目边界"
echo "2. 编辑 docs/plans.md - 拆解任务 + 验收命令"
echo "3. 说'开始执行' - AI 按 plans.md 执行"
