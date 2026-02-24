#!/bin/bash

# my-agent 文档同步检查脚本

PROJECT_ROOT="${1:-$(dirname "$0")/..}"
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "📁 检查文档同步状态..."
echo ""

# 检查一级文件夹
echo "=== 一级文件夹 ==="
for dir in $PROJECT_ROOT/*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        [ "$dirname" = ".git" ] && continue
        
        has_doc=$([ -f "$dir/README.md" ] && echo "✅" || ([ -f "$dir/CLAUDE.md" ] && echo "✅" || echo "❌"))
        if [ "$has_doc" = "❌" ]; then
            echo -e "$dirname: ${RED}❌${NC} 缺少文档"
        else
            echo -e "$dirname: ${GREEN}✅${NC}"
        fi
    fi
done

# 检查二级文件夹（跳过.git）
echo ""
echo "=== 二级文件夹 ==="
find "$PROJECT_ROOT" -mindepth 2 -maxdepth 2 -type d ! -path "*/.git/*" | while read dir; do
    dirname=$(basename "$dir")
    parent=$(basename $(dirname "$dir"))
    has_doc=$([ -f "$dir/README.md" ] && echo "✅" || ([ -f "$dir/CLAUDE.md" ] && echo "✅" || echo "❌"))
    if [ "$has_doc" = "❌" ]; then
        echo -e "$parent/$dirname: ${RED}❌${NC}"
    else
        echo -e "$parent/$dirname: ${GREEN}✅${NC}"
    fi
done

echo ""
echo "=== 检查完成 ==="
