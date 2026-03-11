#!/bin/bash

# 从 GitHub 获取 Lenny Skills 核心技能
# 使用 raw.githubusercontent.com 直接下载

echo "🚀 开始下载 Lenny Skills 核心技能..."
echo ""

BASE_URL="https://raw.githubusercontent.com/RefoundAI/lenny-skills/main/skills"

# 核心技能列表（对年老师最有价值）
SKILLS=(
  "managing-up"
  "stakeholder-alignment"
  "personal-productivity"
  "written-communication"
  "systems-thinking"
  "evaluating-trade-offs"
  "running-effective-meetings"
  "managing-timelines"
  "behavioral-product-design"
  "product-operations"
)

mkdir -p .claude/skills

success=0
failed=0

for skill in "${SKILLS[@]}"; do
  echo "⬇️  下载 $skill..."

  url="$BASE_URL/$skill/SKILL.md"
  target=".claude/skills/$skill/SKILL.md"

  mkdir -p ".claude/skills/$skill"

  if curl -s -f "$url" -o "$target" --max-time 10; then
    echo "  ✅ $skill 下载成功"
    ((success++))
  else
    echo "  ⚠️  $skill 下载失败（网络超时）"
    ((failed++))
  fi

  sleep 0.3
done

echo ""
echo "📊 下载完成："
echo "  ✅ 成功：$success"
echo "  ❌ 失败：$failed"
echo ""

if [ $success -gt 0 ]; then
  echo "🎉 已安装技能："
  for skill in "${SKILLS[@]}"; do
    if [ -f ".claude/skills/$skill/SKILL.md" ]; then
      echo "  • /$skill"
    fi
  done
fi

echo ""
echo "✨ 使用方法：直接对话或调用 /managing-up"
