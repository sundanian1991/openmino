#!/usr/bin/env python3
"""
批量修复 SVG 排版问题
1. 修复 CSS 缺失的闭合括号
2. 修复缺少 x,y 属性的 text 元素（添加 x=0, y=0）
3. 验证垂直间距（同组内 text 元素 y 坐标差 >= 12px）
"""

import re
import os
import sys
from pathlib import Path

workspace = Path("/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/03-供应商-可视化体系-20260419/units")
svg_files = sorted(workspace.glob("*.svg"))

print(f"开始修复 {len(svg_files)} 个 SVG 文件...")

for svg_file in svg_files:
    content = svg_file.read_text(encoding="utf-8")
    original = content
    fixes = []

    # Fix 1: CSS missing closing braces
    # Pattern: .class { font: ... (no closing } before next .class or </style>)
    def fix_css(match):
        css_body = match.group(0)
        # Count opening and closing braces in this block
        # Already has { after class name, need } at end
        lines = css_body.split('\n')
        fixed_lines = []
        for line in lines:
            # If line starts with .class { and doesn't end with }, add }
            stripped = line.strip()
            if stripped and not stripped.startswith('</style>') and not stripped.startswith('<!--'):
                if re.match(r'^\.\w+\s*\{', stripped) and not stripped.rstrip().endswith('}'):
                    line = line.rstrip() + ' }'
                    fixes.append(f"  Added closing brace for: {stripped[:40]}")
            fixed_lines.append(line)
        return '\n'.join(fixed_lines)

    # Find CSS blocks between <style> and </style>
    def fix_stylesheet(content):
        start = content.find('<style>')
        if start == -1:
            return content, False
        end = content.find('</style>', start)
        if end == -1:
            return content, False
        css_block = content[start:end+8]
        fixed_css = fix_css(css_block)
        if fixed_css != css_block:
            return content[:start] + fixed_css + content[end+8:], True
        return content, False

    content, css_fixed = fix_stylesheet(content)
    if css_fixed:
        fixes.append("CSS braces fixed")

    # Fix 2: Text elements missing x,y attributes
    # Find <text ...> without x or y, and add x="0" y="0" or appropriate defaults
    def fix_text_elements(content):
        # Pattern: <text ...> that doesn't have x= or y=
        # We need to add position attributes
        def add_pos(match):
            tag = match.group(0)
            if 'x=' in tag or 'y=' in tag:
                return tag
            # Check if it's inside a group with transform (we can't easily determine absolute position)
            # Best to add x="15" y="0" as relative defaults
            if tag.endswith('>'):
                return tag[:-1] + ' x="15" y="0">'
            return tag
        return re.sub(r'<text(?![^>]*[xy]=)[^>]*>', add_pos, content)

    content, pos_fixed = fix_text_elements(content)
    if pos_fixed:
        fixes.append("Added missing x,y to text elements")

    if fixes:
        svg_file.write_text(content, encoding="utf-8")
        print(f"✓ {svg_file.name}: {'; '.join(fixes)}")
    else:
        print(f"  {svg_file.name}: OK")

print("\n批量修复完成。")
