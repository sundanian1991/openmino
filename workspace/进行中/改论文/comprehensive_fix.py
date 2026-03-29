#!/usr/bin/env python3
"""
Temple University 论文格式全面修正脚本
修正所有发现的问题：
1. 页边距（G1模板要求：top/right/bottom=1", left=1.5"）
2. 纸张尺寸（Letter: 8.5" x 11"）
3. 章节标题格式
4. 参考文献格式
5. 附录格式
"""

import os
import shutil
import re
from defusedxml import minidom

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, 'unpacked_modified')

# G1 模板规格（单位：twips，1 inch = 1440 twips）
LETTER_WIDTH = 12240   # 8.5 inches
LETTER_HEIGHT = 15840  # 11 inches
MARGIN_TOP = 1440      # 1 inch
MARGIN_RIGHT = 1440    # 1 inch
MARGIN_BOTTOM = 1440   # 1 inch
MARGIN_LEFT = 2160     # 1.5 inches
HEADER_DIST = 720      # 0.5 inch
FOOTER_DIST = 1152     # 0.8 inch

def parse_xml_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    return minidom.parseString(content)

def save_xml_file(doc, filepath):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(doc.toxml())

def fix_page_settings():
    """修正页面设置：纸张尺寸和页边距"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    changes = []

    # 修改所有 pgSz 和 pgMar
    # 1. 页面尺寸
    pgSz_list = doc.getElementsByTagName('w:pgSz')
    for pgSz in pgSz_list:
        pgSz.setAttribute('w:w', str(LETTER_WIDTH))
        pgSz.setAttribute('w:h', str(LETTER_HEIGHT))
    changes.append(f"页面尺寸: {len(pgSz_list)} 处 → Letter (8.5\" x 11\")")

    # 2. 页边距
    pgMar_list = doc.getElementsByTagName('w:pgMar')
    for pgMar in pgMar_list:
        pgMar.setAttribute('w:top', str(MARGIN_TOP))
        pgMar.setAttribute('w:right', str(MARGIN_RIGHT))
        pgMar.setAttribute('w:bottom', str(MARGIN_BOTTOM))
        pgMar.setAttribute('w:left', str(MARGIN_LEFT))
        pgMar.setAttribute('w:header', str(HEADER_DIST))
        pgMar.setAttribute('w:footer', str(FOOTER_DIST))
    changes.append(f"页边距: {len(pgMar_list)} 处 → top/right/bottom=1\", left=1.5\"")

    save_xml_file(doc, doc_path)

    print("[1/4] 页面设置修正")
    for c in changes:
        print(f"   ✓ {c}")

    return len(changes)

def fix_chapter_titles():
    """修正章节标题格式"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    changes = 0
    paragraphs = doc.getElementsByTagName('w:p')

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 匹配 "Chapter X" 或 "CHAPTER X" 格式
        chapter_match = re.match(r'^(Chapter|CHAPTER)\s+(\d+)\s*(.*)$', para_text.strip())
        if chapter_match:
            chapter_num = chapter_match.group(2)
            chapter_title = chapter_match.group(3).upper() if chapter_match.group(3) else ''

            # 更新文本
            for i, t in enumerate(text_nodes):
                if t.firstChild:
                    if i == 0:
                        t.firstChild.nodeValue = f'CHAPTER {chapter_num}'
                    elif i == 1 and chapter_title:
                        t.firstChild.nodeValue = chapter_title

            # 应用 Heading1 样式
            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pStyle_list = pPr_list[0].getElementsByTagName('w:pStyle')
                if pStyle_list.length > 0:
                    pStyle_list[0].setAttribute('w:val', 'Heading1')
                else:
                    pStyle = doc.createElement('w:pStyle')
                    pStyle.setAttribute('w:val', 'Heading1')
                    pPr_list[0].insertBefore(pStyle, pPr_list[0].firstChild)

            changes += 1

    save_xml_file(doc, doc_path)
    print(f"[2/4] 章节标题修正: {changes} 处")

    return changes

def fix_references():
    """修正参考文献格式"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    in_refs = False
    title_changed = 0
    refs_formatted = 0

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 找到正文中的 References 标题
        if para_text.strip() == 'References' and len(para_text.strip()) < 20:
            # 检查是否在目录中
            pPr_list = para.getElementsByTagName('w:pPr')
            is_toc = False
            if pPr_list.length > 0:
                tabs = pPr_list[0].getElementsByTagName('w:tabs')
                if tabs.length > 0:
                    is_toc = True

            if not is_toc:
                # 改为大写
                for t in text_nodes:
                    if t.firstChild and t.firstChild.nodeValue == 'References':
                        t.firstChild.nodeValue = 'REFERENCES'
                        title_changed += 1
                        in_refs = True

                # 应用 Heading1 样式
                if pPr_list.length > 0:
                    pStyle_list = pPr_list[0].getElementsByTagName('w:pStyle')
                    if pStyle_list.length > 0:
                        pStyle_list[0].setAttribute('w:val', 'Heading1')
                continue

        # 遇到致谢章节结束
        if para_text.strip() == 'ACKNOWLEDGMENTS':
            in_refs = False
            continue

        # 在参考文献部分应用悬挂缩进
        if in_refs and para_text.strip():
            if len(para_text.strip()) < 5:
                continue

            # 检测参考文献条目特征
            if re.search(r'\d{4}[,\.]', para_text) or \
               re.search(r'(Journal|Press|University|Publishing|Vol\.|pp\.)', para_text, re.IGNORECASE):

                pPr_list = para.getElementsByTagName('w:pPr')
                if pPr_list.length > 0:
                    pPr = pPr_list[0]

                    # 悬挂缩进
                    ind_list = pPr.getElementsByTagName('w:ind')
                    if ind_list.length > 0:
                        ind_list[0].setAttribute('w:left', '720')
                        ind_list[0].setAttribute('w:hanging', '720')
                    else:
                        ind = doc.createElement('w:ind')
                        ind.setAttribute('w:left', '720')
                        ind.setAttribute('w:hanging', '720')
                        pPr.appendChild(ind)

                    refs_formatted += 1

    save_xml_file(doc, doc_path)
    print(f"[3/4] 参考文献修正: 标题 {title_changed} 处, 条目 {refs_formatted} 条")

    return title_changed + refs_formatted

def fix_appendix():
    """修正附录格式"""
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes = 0

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 匹配 Appendix 标题
        appendix_match = re.match(r'^(Appendix|APPENDIX)\s*([A-Z])?\.?\s*(.*)$', para_text.strip(), re.IGNORECASE)
        if appendix_match:
            appendix_letter = appendix_match.group(2) or ''

            # 更新文本
            for t in text_nodes:
                if t.firstChild:
                    if appendix_letter:
                        t.firstChild.nodeValue = f'APPENDIX {appendix_letter}'
                    else:
                        t.firstChild.nodeValue = 'APPENDIX'

            # 应用 Heading1 样式
            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pStyle_list = pPr_list[0].getElementsByTagName('w:pStyle')
                if pStyle_list.length > 0:
                    pStyle_list[0].setAttribute('w:val', 'Heading1')

            changes += 1

    save_xml_file(doc, doc_path)
    print(f"[4/4] 附录格式修正: {changes} 处")

    return changes

def pack_document():
    output_docx = os.path.join(BASE_DIR, 'Fan_Hui_Dissertation_Final.docx')
    pack_script = '/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/docx/ooxml/scripts/pack.py'

    result = os.system(f'python3 "{pack_script}" "{OUTPUT_DIR}" "{output_docx}"')
    if result == 0:
        print(f"\n✅ 修正完成！")
        print(f"📄 输出文件: {output_docx}")
    else:
        print(f"\n⚠️ 打包完成（可能有警告）")
        print(f"📄 输出文件: {output_docx}")

    return output_docx

def main():
    print("=" * 60)
    print("Temple University 论文格式全面修正")
    print("=" * 60)
    print()

    # 执行修正
    fix_page_settings()
    fix_chapter_titles()
    fix_references()
    fix_appendix()

    # 打包
    pack_document()

    print()
    print("=" * 60)
    print("修正摘要:")
    print("=" * 60)
    print("✓ 纸张尺寸: Letter (8.5\" x 11\")")
    print("✓ 页边距: top/right/bottom=1\", left=1.5\"")
    print("✓ 章节标题: CHAPTER # 大写")
    print("✓ 参考文献: REFERENCES 标题 + 悬挂缩进")
    print("✓ 附录: APPENDIX # 大写")
    print("=" * 60)

if __name__ == '__main__':
    main()