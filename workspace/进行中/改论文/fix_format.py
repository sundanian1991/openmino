#!/usr/bin/env python3
"""
修正论文格式问题
- 标题页标题大写
- 确保所有格式正确应用
"""

import os
import shutil
from defusedxml import minidom

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, 'unpacked_modified')

def parse_xml_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    return minidom.parseString(content)

def save_xml_file(doc, filepath):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(doc.toxml())

def fix_title_page():
    """修正标题页格式"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    changes = []

    # 找到并修改标题
    text_nodes = doc.getElementsByTagName('w:t')
    for t in text_nodes:
        if t.firstChild:
            text = t.firstChild.nodeValue

            # 标题改为全大写
            if text == 'Digital Technologies and Rural Finance':
                t.firstChild.nodeValue = 'DIGITAL TECHNOLOGIES AND RURAL FINANCE'
                changes.append(f"标题: {text} → DIGITAL TECHNOLOGIES AND RURAL FINANCE")

            # "A Dissertation" 保持不变
            # "Submitted to" 保持不变

    save_xml_file(doc, doc_path)

    print(f"[修正] 标题页格式")
    for c in changes:
        print(f"   - {c}")

    return len(changes)

def main():
    print("=" * 50)
    print("论文格式修正")
    print("=" * 50)

    changes = fix_title_page()

    # 重新打包
    output_docx = os.path.join(BASE_DIR, 'Fan_Hui_Dissertation_Formatted.docx')
    pack_script = '/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/docx/ooxml/scripts/pack.py'
    os.system(f'python3 "{pack_script}" "{OUTPUT_DIR}" "{output_docx}"')

    print(f"\n✅ 已修正 {changes} 处问题")
    print(f"📄 输出文件: {output_docx}")

if __name__ == '__main__':
    main()