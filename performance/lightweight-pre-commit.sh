#!/bin/bash
# Lightweight Pre-commit Hook
# 快速验证关键问题，避免完整验证的延迟

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="$(git rev-parse --show-toplevel)"

echo "⚡ 检查（轻量级）..."

# ============================================
# 功能 1: 检测新文件夹并自动创建 CLAUDE.md（快速版本）
# ============================================
echo ""
echo "📁 检测新文件夹..."

# 获取所有新增的文件（使用 -z 处理包含空格的文件名）
added_files=$(git diff --cached --name-only --diff-filter=A -z | xargs -0)

# 用于追踪已处理的目录
processed_dirs=""

for file in $added_files; do
    # 获取文件的目录
    dir=$(dirname "$file")

    # 跳过根目录和特殊目录
    if [ "$dir" == "." ]; then
        continue
    fi

    # 跳过 workspace 和 .git 目录
    if [[ "$dir" == workspace/* ]] || [[ "$dir" == .git/* ]]; then
        continue
    fi

    # 检查是否已经处理过这个目录
    if echo "$processed_dirs" | grep -qF "^${dir}$"; then
        continue
    fi

    # 检查是否存在 CLAUDE.md 或 Claude.md
    claude_md="$PROJECT_ROOT/$dir/CLAUDE.md"
    claude_md_alt="$PROJECT_ROOT/$dir/Claude.md"

    if [ ! -f "$claude_md" ] && [ ! -f "$claude_md_alt" ]; then
        echo -e "${YELLOW}📄 检测到新文件夹：$dir${NC}"
        echo "   创建 CLAUDE.md..."

        # 生成文件夹名称（最后一级目录名）
        folder_name=$(basename "$dir")

        # 生成大写字母（兼容 macOS）
        folder_name_upper=$(echo "$folder_name" | tr '[:lower:]' '[:upper:]')

        # 创建最小模板
        cat > "$claude_md" << EOF
---
input: [依赖外部资源]
output: [对外提供功能]
pos: [$dir，说明目录职责]
---

# CLAUDE.md — ${folder_name_upper}

> [目录说明]

---

## Summary

[目录功能说明]

---

## Members

| 文件 | 用途 |
|------|------|
| [文件 1] | [说明] |
EOF

        # 自动添加到暂存区
        git add "$claude_md"
        echo -e "${GREEN}   ✅ 已创建并添加：$claude_md${NC}"
    fi

    # 标记为已处理
    processed_dirs="$processed_dirs
$dir"
done

# ============================================
# 功能 2: 检查 .md 文件的头注释（快速版本）
# ============================================
echo ""
echo "📝 检查.md 文件头注释..."

# 检查新增的 .md 文件（使用 -z 处理包含空格的文件名）
added_md_files=$(git diff --cached --name-only --diff-filter=A -z | xargs -0 | grep '\.md$')

if [ -n "$added_md_files" ]; then
    has_error=false

    # 使用更高效的处理方式
    for file in $added_md_files; do
        first_line=$(head -n 1 "$PROJECT_ROOT/$file" 2>/dev/null)
        if [ "$first_line" != "---" ]; then
            echo -e "${RED}❌${NC} $file: 缺少 --- 头注释"
            has_error=true
        else
            echo -e "${GREEN}✅${NC} $file: 头注释 OK"
        fi
    done

    if [ "$has_error" = true ]; then
        echo ""
        echo -e "${RED}提交被阻止：请为新增的 .md 文件添加头注释${NC}"
        exit 1
    fi
fi

# ============================================
# 功能 3: 快速 Plan First 验证（只检查是否有完成的任务）
# ============================================
echo ""
echo "📋 快速 Plan 检查..."

TODO_FILE="$PROJECT_ROOT/memory/active/tasks/todo.md"

if [ -f "$TODO_FILE" ]; then
    # 只检查是否存在完成的任务（快速文本搜索）
    if grep -qF '**状态**：completed' "$TODO_FILE" 2>/dev/null; then
        echo "🔍 发现已完成的任务，但跳过完整验证（轻量级模式）"
        echo -e "${YELLOW}⚠️  完整验证将在稍后异步运行${NC}"
    else
        echo -e "${GREEN}✅ 无已完成的任务需要验证${NC}"
    fi
else
    echo "⚠️  Todo 文件不存在，跳过 Plan 验证"
fi

echo ""
echo -e "${GREEN}✅ 轻量级检查通过${NC}"
exit 0