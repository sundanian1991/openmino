#!/bin/bash
# workspace 命名规范检查脚本
# 用法：bash _check-naming.sh
# 检查所有文件夹是否符合 NN-前缀-主题-YYYYMMDD 命名规范

cd "$(dirname "$0")"
errors=0

# 定义合法前缀
valid_prefixes="供应商|成长|技能|生活|记录"

for d in */; do
  d="${d%/}"
  [ "$d" = "archive" ] && continue
  [ "$d" = "_check-naming.sh" ] && continue

  # 检查格式：NN-前缀-主题-YYYYMMDD
  if ! echo "$d" | grep -qE '^[0-9]{2}-('"$valid_prefixes"')-.+-[0-9]{8}$'; then
    echo "[格式错误] $d"
    errors=$((errors + 1))
  fi
done

# 检查序号是否唯一
dups=$(ls -d */ 2>/dev/null | grep -oE '^[0-9]{2}' | sort | uniq -d)
if [ -n "$dups" ]; then
  echo "[序号重复] 以下序号出现多次：$dups"
  for num in $dups; do
    ls -d ${num}-* 2>/dev/null | sed 's/^/  /'
  done
  errors=$((errors + 1))
fi

# 检查是否有散落文件（非文件夹）
files=$(find . -maxdepth 1 -type f ! -name 'CLAUDE.md' ! -name '.DS_Store' ! -name '_check-naming.sh')
if [ -n "$files" ]; then
  echo "[散落文件] 以下文件未归入文件夹："
  echo "$files" | sed 's/^/  /'
  errors=$((errors + 1))
fi

if [ $errors -eq 0 ]; then
  echo "全部通过，0 个问题"
else
  echo "共 $errors 类问题需要修复"
fi
