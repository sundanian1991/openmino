#!/bin/bash

# 情境知识同步到 MemOS
# 用法：./scripts/sync-context-to-memos.sh [people|relationships|scenarios|patterns|all]

SOURCE_DIR="memory/context"
MEMOS_USER="mino"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查参数
if [ -z "$1" ]; then
    echo "用法：$0 [people|relationships|scenarios|patterns|all]"
    exit 1
fi

# 同步函数
sync_to_memos() {
    local type=$1
    local dir="$SOURCE_DIR/$type"
    local tag="#情境#$type"

    echo -e "${YELLOW}正在同步 $type 到 MemOS...${NC}"

    # 遍历目录下所有 .md 文件（排除 README.md）
    find "$dir" -name "*.md" ! -name "README.md" -type f | while read -r file; do
        filename=$(basename "$file" .md)

        # 提取 MemOS 同步部分
        memos_content=$(sed -n '/## MemOS 同步/,/^\s*$/p' "$file" | sed '1d;$d')

        if [ -n "$memos_content" ]; then
            echo -e "${GREEN}✓ 同步 $filename${NC}"
            # 这里调用 MemOS MCP 或 API
            # 暂时先打印出来，后续接入 MemOS API
            echo "$memos_content"
            echo ""
        fi
    done

    echo -e "${GREEN}$type 同步完成${NC}\n"
}

# 根据参数执行同步
case "$1" in
    people)
        sync_to_memos "people"
        ;;
    relationships)
        sync_to_memos "relationships"
        ;;
    scenarios)
        sync_to_memos "scenarios"
        ;;
    patterns)
        sync_to_memos "patterns"
        ;;
    all)
        sync_to_memos "people"
        sync_to_memos "relationships"
        sync_to_memos "scenarios"
        sync_to_memos "patterns"
        ;;
    *)
        echo "未知类型：$1"
        echo "用法：$0 [people|relationships|scenarios|patterns|all]"
        exit 1
        ;;
esac

echo -e "${GREEN}全部同步完成${NC}"
