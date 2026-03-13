#!/usr/bin/env python3
"""
update-claude-md-members.py — 自动更新 CLAUDE.md 的 Members 表格

功能：
1. 扫描目录内容（文件 + 子目录）
2. 智能替换 Members 表格，保留其他手写内容
3. 支持增量更新（只更新有变化的）

用法：
    python scripts/update-claude-md-members.py [目录路径]
    python scripts/update-claude-md-members.py --all  # 更新所有
"""

import os
import sys
import re
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent.parent

# 特殊目录描述映射
SPECIAL_DESCRIPTIONS = {
    'mcporter.json': 'MCP 服务器配置（Exa 搜索）',
    'getnote-api.sh': 'Get 笔记 API 凭证 + 快捷函数',
    'README.md': '目录说明文档',
    '.DS_Store': None,  # 跳过
    '__pycache__': None,
    'node_modules': None,
}

# 文件扩展名描述
EXT_DESCRIPTIONS = {
    '.json': 'JSON 配置文件',
    '.sh': 'Shell 脚本',
    '.py': 'Python 脚本',
    '.md': 'Markdown 文档',
    '.txt': '文本文件',
    '.yaml': 'YAML 配置',
    '.yml': 'YAML 配置',
    '.toml': 'TOML 配置',
    '.env': '环境变量文件',
    '.html': 'HTML 页面',
    '.docx': 'Word 文档',
    '.xlsx': 'Excel 表格',
    '.pdf': 'PDF 文档',
    '.png': 'PNG 图片',
    '.jpg': 'JPEG 图片',
    '.svg': 'SVG 矢量图',
}

# 文件名模式描述
FILENAME_PATTERNS = {
    'README': '目录说明',
    'CLAUDE': 'Claude 配置文档',
    'architecture': '架构设计文档',
    'implement': '实现方案',
    'plans': '规划文档',
    'prompt': '提示词文档',
    'documentation': '文档说明',
    'guide': '指南文档',
    'config': '配置',
    'api': 'API 文档',
    'supplier': '供应商相关',
    '供应商': '供应商管理',
    '指引': '指引文档',
}


def get_file_description(filename: str) -> str:
    """获取文件描述"""
    # 检查特殊描述
    if filename in SPECIAL_DESCRIPTIONS:
        desc = SPECIAL_DESCRIPTIONS[filename]
        return desc if desc else None

    # 检查文件名模式（优先于扩展名）
    name_without_ext = Path(filename).stem
    for pattern, desc in FILENAME_PATTERNS.items():
        if pattern.lower() in name_without_ext.lower():
            return desc

    # 检查扩展名
    ext = Path(filename).suffix.lower()
    if ext in EXT_DESCRIPTIONS:
        return EXT_DESCRIPTIONS[ext]

    return '文件'


def scan_directory(dir_path: Path) -> list:
    """扫描目录内容，返回 Members 列表"""
    members = []

    # 扫描直接子目录
    subdirs = []
    files = []

    for item in sorted(dir_path.iterdir()):
        # 跳过隐藏文件和特殊目录
        if item.name.startswith('.'):
            continue
        if item.name in ['__pycache__', 'node_modules']:
            continue

        if item.is_dir():
            subdirs.append(item)
        else:
            files.append(item)

    # 子目录优先列出
    for subdir in subdirs:
        # 检查子目录是否有 CLAUDE.md
        subdir_claude = subdir / 'CLAUDE.md'
        if subdir_claude.exists():
            # 尝试读取子目录的 Summary
            try:
                content = subdir_claude.read_text()
                # 提取第一行标题后的描述
                lines = content.split('\n')
                for line in lines:
                    if line.startswith('# ') and 'CLAUDE.md' in line:
                        title = line.replace('# CLAUDE.md — ', '').replace('# Claude.md — ', '').strip()
                        members.append((f'{subdir.name}/', title))
                        break
                else:
                    members.append((f'{subdir.name}/', '子目录'))
            except:
                members.append((f'{subdir.name}/', '子目录'))
        else:
            members.append((f'{subdir.name}/', '子目录'))

    # 然后列出文件
    for f in files:
        desc = get_file_description(f.name)
        if desc:  # None 表示跳过
            members.append((f'`{f.name}`', desc))

    return members


def generate_members_table(members: list) -> str:
    """生成 Members 表格"""
    if not members:
        return "| 文件 | 用途 |\n|------|------|\n| [暂无文件] | [说明] |"

    lines = ["| 文件 | 用途 |", "|------|------|"]
    for name, desc in members:
        lines.append(f"| {name} | {desc} |")

    return '\n'.join(lines)


def update_claude_md(claude_md_path: Path, members: list) -> bool:
    """更新 CLAUDE.md 的 Members 表格"""
    if not claude_md_path.exists():
        return False

    content = claude_md_path.read_text()
    new_table = generate_members_table(members)

    # 匹配 Members 表格（从 ## Members 到下一个 ## 或文件结尾）
    pattern = r'(## Members\s*\n\n)(.*?)(\n\n---|\n\n## |\Z)'

    def replace_table(match):
        return match.group(1) + new_table + match.group(3)

    new_content, count = re.subn(pattern, replace_table, content, flags=re.DOTALL)

    if count == 0:
        # 没有找到 Members 部分，尝试在 Summary 后添加
        summary_pattern = r'(## Summary\s*\n\n.*?\n\n---\s*\n)'
        if re.search(summary_pattern, content, re.DOTALL):
            new_content = re.sub(
                summary_pattern,
                r'\1\n## Members\n\n' + new_table + '\n\n---\n',
                content,
                flags=re.DOTALL
            )
            count = 1

    if count > 0:
        # 更新最后更新时间
        new_content = re.sub(
            r'\*最后更新：[\d-]+\*',
            f'*最后更新：{datetime.now().strftime("%Y-%m-%d")}*',
            new_content
        )

        if new_content != content:
            claude_md_path.write_text(new_content)
            return True

    return False


def update_all():
    """更新所有 CLAUDE.md"""
    updated = 0

    for claude_md in PROJECT_ROOT.rglob('CLAUDE.md'):
        # 跳过特殊目录
        rel_path = claude_md.relative_to(PROJECT_ROOT)
        if any(part in str(rel_path) for part in ['workspace', '.git', '.claude/skills', 'node_modules', '__pycache__']):
            continue

        dir_path = claude_md.parent
        members = scan_directory(dir_path)

        if update_claude_md(claude_md, members):
            print(f"✅ 更新：{rel_path}")
            updated += 1
        else:
            print(f"⏭️  跳过：{rel_path}（无变化或格式不支持）")

    print(f"\n共更新 {updated} 个 CLAUDE.md")


def main():
    if len(sys.argv) < 2:
        print("用法：python update-claude-md-members.py [目录路径|--all]")
        sys.exit(1)

    arg = sys.argv[1]

    if arg == '--all':
        update_all()
    else:
        dir_path = Path(arg)
        if not dir_path.is_absolute():
            dir_path = PROJECT_ROOT / dir_path

        if not dir_path.exists():
            print(f"❌ 目录不存在：{dir_path}")
            sys.exit(1)

        claude_md = dir_path / 'CLAUDE.md'
        if not claude_md.exists():
            print(f"❌ CLAUDE.md 不存在：{claude_md}")
            sys.exit(1)

        members = scan_directory(dir_path)
        if update_claude_md(claude_md, members):
            print(f"✅ 更新：{claude_md.relative_to(PROJECT_ROOT)}")
        else:
            print(f"⏭️  无变化：{claude_md.relative_to(PROJECT_ROOT)}")


if __name__ == '__main__':
    main()