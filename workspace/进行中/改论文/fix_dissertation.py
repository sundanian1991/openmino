#!/usr/bin/env python3
"""
Temple University 论文格式完整修正脚本
从原始文档开始，应用所有 G1-G4 要求
"""

import os
import shutil
import re
from defusedxml import minidom

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UNPACKED_ORIGINAL = os.path.join(BASE_DIR, 'unpacked_fresh')
UNPACKED_G1 = os.path.join(BASE_DIR, 'unpacked_G1')
OUTPUT_DIR = os.path.join(BASE_DIR, 'unpacked_final')

# G1 模板规格
LETTER_WIDTH = 12240
LETTER_HEIGHT = 15840
MARGIN_TOP = 1440
MARGIN_RIGHT = 1440
MARGIN_BOTTOM = 1440
MARGIN_LEFT = 2160
HEADER_DIST = 720
FOOTER_DIST = 1152

def copy_original():
    """复制原始解包目录"""
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    shutil.copytree(UNPACKED_ORIGINAL, OUTPUT_DIR)
    print("[1/7] 复制原始文档")

def apply_styles():
    """应用 G1 模板样式"""
    src = os.path.join(UNPACKED_G1, 'word', 'styles.xml')
    dst = os.path.join(OUTPUT_DIR, 'word', 'styles.xml')
    shutil.copy(src, dst)
    print("[2/7] 应用模板样式 (Times New Roman, 12pt, 双倍行距)")

def parse_xml(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return minidom.parseString(f.read())

def save_xml(doc, filepath):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(doc.toxml())

def fix_page_settings():
    """修正页面设置"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml(doc_path)

    # 页面尺寸
    for pgSz in doc.getElementsByTagName('w:pgSz'):
        pgSz.setAttribute('w:w', str(LETTER_WIDTH))
        pgSz.setAttribute('w:h', str(LETTER_HEIGHT))

    # 页边距
    for pgMar in doc.getElementsByTagName('w:pgMar'):
        pgMar.setAttribute('w:top', str(MARGIN_TOP))
        pgMar.setAttribute('w:right', str(MARGIN_RIGHT))
        pgMar.setAttribute('w:bottom', str(MARGIN_BOTTOM))
        pgMar.setAttribute('w:left', str(MARGIN_LEFT))
        pgMar.setAttribute('w:header', str(HEADER_DIST))
        pgMar.setAttribute('w:footer', str(FOOTER_DIST))

    save_xml(doc, doc_path)
    print("[3/7] 页面设置: Letter纸张, 页边距 1\"/1.5\"")

def fix_title_page():
    """G1: 修正标题页"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml(doc_path)

    changes = []

    for t in doc.getElementsByTagName('w:t'):
        if t.firstChild:
            text = t.firstChild.nodeValue

            # 主标题全大写
            if text == 'Digital Technologies and Rural Finance':
                t.firstChild.nodeValue = 'DIGITAL TECHNOLOGIES AND RURAL FINANCE'
                changes.append("标题 → 全大写")

            # Abstract → ABSTRACT
            if text == 'Abstract':
                t.firstChild.nodeValue = 'ABSTRACT'
                changes.append("Abstract → ABSTRACT")

    save_xml(doc, doc_path)
    print(f"[4/7] 标题页修正: {len(changes)} 处")

def fix_front_matter():
    """G1: 修正前置内容"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml(doc_path)

    changes = 0

    for t in doc.getElementsByTagName('w:t'):
        if t.firstChild:
            text = t.firstChild.nodeValue

            # Contents → TABLE OF CONTENTS
            if text == 'Contents':
                t.firstChild.nodeValue = 'TABLE OF CONTENTS'
                changes += 1

    save_xml(doc, doc_path)
    print(f"[5/7] 前置内容修正: Contents → TABLE OF CONTENTS")

def fix_chapters():
    """G2: 修正章节标题"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml(doc_path)

    changes = 0

    # 首先处理完整的章节标题 "Chapter X Title" 在一个 w:t 中
    for t in doc.getElementsByTagName('w:t'):
        if t.firstChild:
            text = t.firstChild.nodeValue

            # 匹配完整的章节标题 "Chapter X Title"
            match = re.match(r'^Chapter\s+(\d+)\s+(.+)$', text)
            if match:
                chapter_num = match.group(1)
                chapter_title = match.group(2).upper()
                t.firstChild.nodeValue = f'CHAPTER {chapter_num} {chapter_title}'
                changes += 1
                continue

            # 单独的 "Chapter X" 或 "Chapter X "（带空格）
            match = re.match(r'^Chapter\s+(\d+)\s*$', text.strip())
            if match:
                t.firstChild.nodeValue = f'CHAPTER {match.group(1)} '
                changes += 1

    # 处理分开的章节标题（"Chapter X " 和标题在不同 w:t 中）
    paragraphs = doc.getElementsByTagName('w:p')
    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        if len(text_nodes) < 2:
            continue

        # 检查第一个 w:t 是否是 "CHAPTER X "
        first_text = text_nodes[0].firstChild.nodeValue if text_nodes[0].firstChild else ''
        match = re.match(r'^CHAPTER\s+(\d+)\s*$', first_text.strip())
        if match:
            # 找到了章节号，大写后面的标题
            for i in range(1, len(text_nodes)):
                if text_nodes[i].firstChild:
                    title_text = text_nodes[i].firstChild.nodeValue
                    if len(title_text) > 3 and not title_text.startswith('CHAPTER'):
                        text_nodes[i].firstChild.nodeValue = title_text.upper()
                        changes += 1
                        break

    save_xml(doc, doc_path)
    print(f"[6/7] 章节标题修正: {changes} 处")

def fix_references():
    """G3: 修正参考文献"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml(doc_path)

    title_found = False
    refs_count = 0

    # 直接查找所有 w:t 节点中的 References
    for t in doc.getElementsByTagName('w:t'):
        if t.firstChild and t.firstChild.nodeValue == 'References':
            t.firstChild.nodeValue = 'REFERENCES'
            title_found = True
            break

    # 查找参考文献条目并应用悬挂缩进
    paragraphs = doc.getElementsByTagName('w:p')
    in_refs = False

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 找到 REFERENCES 标题后开始处理
        if para_text.strip() == 'REFERENCES':
            in_refs = True
            continue

        # 遇到 Acknowledgments 结束
        if para_text.strip() in ['Acknowledgments', 'ACKNOWLEDGMENTS']:
            in_refs = False
            continue

        # 参考文献条目应用悬挂缩进
        if in_refs and para_text.strip() and len(para_text) > 10:
            # 检测参考文献特征
            if re.search(r'\d{4}[,\.]', para_text) or \
               re.search(r'(Journal|Press|University|Publishing|Vol\.|pp\.)', para_text, re.IGNORECASE):
                pPr_list = para.getElementsByTagName('w:pPr')
                if pPr_list.length > 0:
                    pPr = pPr_list[0]
                    ind_list = pPr.getElementsByTagName('w:ind')
                    if ind_list.length > 0:
                        ind_list[0].setAttribute('w:left', '720')
                        ind_list[0].setAttribute('w:hanging', '720')
                    else:
                        ind = doc.createElement('w:ind')
                        ind.setAttribute('w:left', '720')
                        ind.setAttribute('w:hanging', '720')
                        pPr.appendChild(ind)
                    refs_count += 1

    save_xml(doc, doc_path)
    print(f"[7/7] 参考文献修正: 标题 {'✓' if title_found else '✗'}, 条目 {refs_count} 条")

def pack_document():
    """打包文档"""
    output_docx = os.path.join(BASE_DIR, 'Fan_Hui_Dissertation_Temple.docx')
    pack_script = '/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/docx/ooxml/scripts/pack.py'

    os.system(f'python3 "{pack_script}" "{OUTPUT_DIR}" "{output_docx}"')
    print(f"\n✅ 完成！输出: {output_docx}")
    return output_docx

def main():
    print("=" * 60)
    print("Temple University 论文格式修正")
    print("=" * 60)

    copy_original()
    apply_styles()
    fix_page_settings()
    fix_title_page()
    fix_front_matter()
    fix_chapters()
    fix_references()
    pack_document()

    print("\n" + "=" * 60)
    print("修正摘要:")
    print("✓ G1: Times New Roman 12pt, 双倍行距")
    print("✓ G1: 页边距 1\"/1.5\", Letter 纸张")
    print("✓ G1: 标题页全大写, ABSTRACT, TABLE OF CONTENTS")
    print("✓ G2: CHAPTER # 格式, 章节标题大写")
    print("✓ G3: REFERENCES 标题, 悬挂缩进")
    print("=" * 60)

if __name__ == '__main__':
    main()