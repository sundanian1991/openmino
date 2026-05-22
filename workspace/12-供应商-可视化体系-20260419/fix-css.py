#!/usr/bin/env python3
import re, os

workspace = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/03-供应商-可视化体系-20260419/units"
files = sorted(f for f in os.listdir(workspace) if f.endswith('.svg'))

for fname in files:
    path = os.path.join(workspace, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <style>...</style> block
    def fix_css_block(match):
        css = match.group(1)
        # Split into lines
        lines = css.split('\n')
        fixed = []
        for line in lines:
            stripped = line.strip()
            # If it's a CSS rule starting with .class { and not ending with }
            if re.match(r'^\.\w+\s*\{', stripped) and not stripped.rstrip().endswith('}'):
                line = line.rstrip() + ' }'
            fixed.append(line)
        return '<style>\n' + '\n'.join(fixed) + '\n    </style>'

    new_content = re.sub(r'<style>\n(.*?)\n\s*</style>', fix_css_block, content, flags=re.DOTALL)

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✓ {fname}: CSS braces fixed")
    else:
        print(f"  {fname}: already OK")
