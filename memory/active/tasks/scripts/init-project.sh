#!/bin/bash

# init-project.sh — 项目工作流快速启动脚本
# 用法：./init-project.sh [项目名]

set -e

PROJECT_NAME="$1"

if [ -z "$PROJECT_NAME" ]; then
    echo "用法：./init-project.sh [项目名]"
    echo "示例：./init-project.sh email-template-system"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATES_DIR="$SCRIPT_DIR/../templates"
TRACKING_DIR="$SCRIPT_DIR/../tracking"
TEMPLATE_FILE="$TEMPLATES_DIR/project-workflow.md"
PROJECT_FILE="$TRACKING_DIR/$PROJECT_NAME.md"

# 检查模板是否存在
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo "错误：模板文件不存在：$TEMPLATE_FILE"
    exit 1
fi

# 创建项目文件
cp "$TEMPLATE_FILE" "$PROJECT_FILE"

# 替换占位符
sed -i.bak "s/\[项目名\]/$PROJECT_NAME/g" "$PROJECT_FILE"
rm -f "$PROJECT_FILE.bak"

echo "✅ 项目工作流已创建：$PROJECT_FILE"
echo ""
echo "下一步："
echo "1. 编辑 $PROJECT_FILE，填写 Prompt 和 Plans"
echo "2. 启动指令：先读 active/tasks/tracking/$PROJECT_NAME.md，按 Plans 顺序执行"
