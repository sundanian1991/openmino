#!/bin/bash
# 使用 macOS 内置 qlmanage 将 SVG 转换为高清 PNG

SCALE=3
SIZE=216  # 72 * 3

cd "$(dirname "$0")/imgs"

# 清理旧的测试文件
rm -f test.svg.png 0.png

# 定义图标生成函数
generate_icon() {
    local name=$1
    local svg=$2

    # 创建临时 SVG 文件
    echo "$svg" > /tmp/${name}.svg

    # 使用 qlmanage 生成 PNG
    qlmanage -t -s $SIZE -o /tmp /tmp/${name}.svg 2>/dev/null

    # 移动到当前目录
    mv /tmp/${name}.svg.png ${name}.png 2>/dev/null

    echo "✓ ${name}.png"
}

# Soul - 心形
generate_icon "icon-soul" '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m36 62c-20-14-26-24-24-34s10-16 18-16c6 0 10 4 12 8 2-4 6-8 12-8 8 0 16 6 18 16s-4 20-24 34" fill="#FEFFFA" stroke="none"/><path d="m36 62c-20-14-26-24-24-34s10-16 18-16c6 0 10 4 12 8 2-4 6-8 12-8 8 0 16 6 18 16s-4 20-24 34" stroke="#0B0800" stroke-width="1.3" fill="none"/><circle cx="36" cy="42" r="3.5" fill="#BA3420"/></svg>'

# Skills - 四模块
generate_icon "icon-skills" '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="10" width="20" height="20" rx="2" fill="#FEFFFA"/><rect x="42" y="10" width="20" height="20" rx="2" fill="#FEFFFA"/><rect x="10" y="42" width="20" height="20" rx="2" fill="#FEFFFA"/><rect x="42" y="42" width="20" height="20" rx="2" fill="#BA3420"/><rect x="10" y="10" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/><rect x="42" y="10" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/><rect x="10" y="42" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/><rect x="42" y="42" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/><circle cx="52" cy="52" r="3" fill="#FEFFFA"/></svg>'

# Memory - 书本
generate_icon "icon-memory" '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14c16 2 24 4 24 4v44c0 0-8-2-24-6z" fill="#FEFFFA"/><path d="m60 14c-16 2-24 4-24 4v44c0 0 8-2 24-6z" fill="#FEFFFA"/><path d="m12 14c16 2 24 4 24 4v44c0 0-8-2-24-6z" stroke="#0B0800" stroke-width="1.3" fill="none"/><path d="m60 14c-16 2-24 4-24 4v44c0 0 8-2 24-6z" stroke="#0B0800" stroke-width="1.3" fill="none"/><line x1="36" y1="18" x2="36" y2="62" stroke="#0B0800" stroke-width="1.3"/><path d="m46 16l3-4l3 4v8h-6z" fill="#BA3420"/><g stroke="#0B0800" stroke-width="1.04" fill="none"><line x1="18" y1="28" x2="30" y2="30"/><line x1="18" y1="36" x2="28" y2="38"/><line x1="42" y1="30" x2="54" y2="28"/><line x1="42" y1="38" x2="52" y2="36"/></g></svg>'

# Balance - 天平
generate_icon "icon-balance" '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="26" y="56" width="20" height="6" rx="1.5" fill="#FEFFFA"/><rect x="26" y="56" width="20" height="6" rx="1.5" stroke="#0B0800" stroke-width="1.5" fill="none"/><line x1="36" y1="14" x2="36" y2="56" stroke="#0B0800" stroke-width="1.8"/><line x1="8" y1="22" x2="64" y2="22" stroke="#0B0800" stroke-width="1.8"/><ellipse cx="14" cy="32" rx="10" ry="5" fill="#FEFFFA" stroke="#0B0800" stroke-width="1.5"/><ellipse cx="58" cy="32" rx="10" ry="5" fill="#FEFFFA" stroke="#0B0800" stroke-width="1.5"/><line x1="14" y1="22" x2="14" y2="27" stroke="#0B0800" stroke-width="1.2"/><line x1="58" y1="22" x2="58" y2="27" stroke="#0B0800" stroke-width="1.2"/></svg>'

# Brain - 大脑
generate_icon "icon-brain" '<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M36 8 C22 8 12 20 12 34 C12 48 22 58 36 58 C50 58 60 48 60 34 C60 20 50 8 36 8 Z" fill="#FEFFFA"/><path d="M36 8 C22 8 12 20 12 34 C12 48 22 58 36 58 C50 58 60 48 60 34 C60 20 50 8 36 8 Z" stroke="#6B7F5A" stroke-width="1.8" fill="none"/><path d="M36 14 Q40 34 36 52" fill="none" stroke="#6B7F5A" stroke-width="1.5"/><path d="M20 24 Q26 30 22 40" fill="none" stroke="#6B7F5A" stroke-width="1.2"/><path d="M26 20 Q30 26 26 36" fill="none" stroke="#6B7F5A" stroke-width="1.2"/><path d="M52 24 Q46 30 50 40" fill="none" stroke="#6B7F5A" stroke-width="1.2"/><path d="M46 20 Q42 26 46 36" fill="none" stroke="#6B7F5A" stroke-width="1.2"/></svg>'

echo ""
echo "生成的图标："
ls -la *.png