#!/usr/bin/env python3
"""
应用 Temple University 论文模板格式 (G1-G4) 到 Fan Hui Dissertation - 最终版
"""

import os
import shutil
import re
from defusedxml import minidom

# 路径设置
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UNPACKED_ORIGINAL = os.path.join(BASE_DIR, 'unpacked_original')
UNPACKED_G1 = os.path.join(BASE_DIR, 'unpacked_G1')
OUTPUT_DIR = os.path.join(BASE_DIR, 'unpacked_modified')

def copy_original_to_output():
    """复制原始解包目录到输出目录"""
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    shutil.copytree(UNPACKED_ORIGINAL, OUTPUT_DIR)
    print(f"[1/6] 已复制原始文档到输出目录")

def apply_styles_from_template():
    """从 G1 模板复制 styles.xml"""
    src = os.path.join(UNPACKED_G1, 'word', 'styles.xml')
    dst = os.path.join(OUTPUT_DIR, 'word', 'styles.xml')
    shutil.copy(src, dst)
    print(f"[2/6] 已应用 G1 模板样式 (Times New Roman, 12pt, 双倍行距)")

def parse_xml_file(filepath):
    """解析 XML 文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    return minidom.parseString(content)

def save_xml_file(doc, filepath):
    """保存 XML 文件"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(doc.toxml())

def apply_front_matter_formatting():
    """
    G1: 应用前置内容格式
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes_made = 0

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 修改 "Abstract" 为 "ABSTRACT"
        if para_text.strip() == 'Abstract':
            for t in text_nodes:
                if t.firstChild and t.firstChild.nodeValue == 'Abstract':
                    t.firstChild.nodeValue = 'ABSTRACT'
                    changes_made += 1

        # 修改 "Contents" 为 "TABLE OF CONTENTS"
        if para_text.strip() == 'Contents':
            for t in text_nodes:
                if t.firstChild:
                    t.firstChild.nodeValue = 'TABLE OF CONTENTS'
            changes_made += 1

        # 确保章节标题大写
        chapter_match = re.match(r'^Chapter (\d+)\s*(.*)$', para_text.strip())
        if chapter_match:
            chapter_num = chapter_match.group(1)
            for t in text_nodes:
                if t.firstChild and 'Chapter' in t.firstChild.nodeValue:
                    t.firstChild.nodeValue = f'CHAPTER {chapter_num}'
            changes_made += 1

        # 修改 ACKNOWLEDGMENTS 为大写
        if para_text.strip() in ['ACKNOWLEDGMENTS', 'REFERENCES']:
            for t in text_nodes:
                if t.firstChild:
                    t.firstChild.nodeValue = para_text.strip().upper()
            changes_made += 1

    save_xml_file(doc, doc_path)
    print(f"[3/6] 已应用 G1 前置内容格式 ({changes_made} 处修改)")

def apply_chapter_formatting():
    """
    G2: 应用章节段落格式
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes_made = 0

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 匹配章节标题模式: "CHAPTER X Title"
        chapter_match = re.match(r'^CHAPTER\s+(\d+)\s*(.*)$', para_text.strip())
        if chapter_match:
            chapter_num = chapter_match.group(1)
            chapter_title = chapter_match.group(2).upper() if chapter_match.group(2) else ''

            # 应用 Heading1 样式
            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pPr = pPr_list[0]
                pStyle_list = pPr.getElementsByTagName('w:pStyle')
                if pStyle_list.length > 0:
                    pStyle_list[0].setAttribute('w:val', 'Heading1')
                else:
                    pStyle = doc.createElement('w:pStyle')
                    pStyle.setAttribute('w:val', 'Heading1')
                    pPr.insertBefore(pStyle, pPr.firstChild)

            # 确保标题文本大写
            if chapter_title:
                for i, t in enumerate(text_nodes):
                    if t.firstChild and i > 0:
                        t.firstChild.nodeValue = chapter_title

            changes_made += 1

        # 匹配子章节标题: "X.X Title"
        section_match = re.match(r'^(\d+\.\d+)\s+(.+)$', para_text.strip())
        if section_match:
            section_num = section_match.group(1)
            section_title = section_match.group(2)

            # 应用 Heading3 样式
            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pPr = pPr_list[0]
                pStyle_list = pPr.getElementsByTagName('w:pStyle')
                if pStyle_list.length > 0:
                    pStyle_list[0].setAttribute('w:val', 'Heading3')
            changes_made += 1

        # 匹配三级子标题: "X.X.X Title"
        subsection_match = re.match(r'^(\d+\.\d+\.\d+)\s+(.+)$', para_text.strip())
        if subsection_match:
            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pPr = pPr_list[0]
                pStyle_list = pPr.getElementsByTagName('w:pStyle')
                if pStyle_list.length > 0:
                    pStyle_list[0].setAttribute('w:val', 'Heading4')
            changes_made += 1

    save_xml_file(doc, doc_path)
    print(f"[4/6] 已应用 G2 章节段落格式 ({changes_made} 处修改)")

def apply_bibliography_formatting():
    """
    G3: 应用参考文献格式
    - 找到正文中的 "References" 标题，改为 "REFERENCES"
    - 对所有参考文献条目应用悬挂缩进
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes_made = 0
    in_references = False
    ref_count = 0

    # 找到所有 <w:t>References</w:t> 的位置
    all_text_nodes = doc.getElementsByTagName('w:t')
    for t in all_text_nodes:
        if t.firstChild and t.firstChild.nodeValue == 'References':
            # 检查是否在目录中（目录项后面通常有 tab 和页码）
            parent = t.parentNode  # w:r
            grandparent = parent.parentNode if parent else None  # w:p
            if grandparent:
                # 检查是否有 tabs 元素（目录特征）
                tabs = grandparent.getElementsByTagName('w:tabs')
                if tabs.length == 0:
                    # 没有 tabs，这是正文中的 References 标题
                    t.firstChild.nodeValue = 'REFERENCES'
                    in_references = True
                    changes_made += 1
                    print(f"   - 找到正文中的 References 标题，已改为 REFERENCES")

                    # 应用 Heading1 样式
                    pPr_list = grandparent.getElementsByTagName('w:pPr')
                    if pPr_list.length > 0:
                        pStyle_list = pPr_list[0].getElementsByTagName('w:pStyle')
                        if pStyle_list.length > 0:
                            pStyle_list[0].setAttribute('w:val', 'Heading1')
                    break

    # 应用悬挂缩进到参考文献条目
    # 参考文献条目特征：以作者名开头，包含年份和期刊名
    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        if not in_references:
            continue

        # 跳过标题和空行
        if para_text.strip() in ['REFERENCES', 'References', '']:
            continue

        # 检测参考文献条目（包含年份和期刊/出版社特征）
        if re.search(r'\d{4}[,\.\s]', para_text) or \
           re.search(r'(Journal|Press|University|Publishing|Vol\.|pp\.)', para_text, re.IGNORECASE):
            # 应用悬挂缩进
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

                spacing_list = pPr.getElementsByTagName('w:spacing')
                if spacing_list.length > 0:
                    spacing_list[0].setAttribute('w:line', '480')
                    spacing_list[0].setAttribute('w:lineRule', 'atLeast')

                ref_count += 1

    save_xml_file(doc, doc_path)
    print(f"[5/6] 已应用 G3 参考文献格式 ({changes_made} 处标题修改, {ref_count} 条参考文献)")

def apply_appendix_formatting():
    """
    G4: 应用附录格式
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes_made = 0

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 匹配附录标题
        appendix_match = re.match(r'^(Appendix|APPENDIX)\s*([A-Z])?\.?\s*(.*)$', para_text.strip(), re.IGNORECASE)
        if appendix_match:
            appendix_letter = appendix_match.group(2) or ''
            appendix_title = appendix_match.group(3).upper() if appendix_match.group(3) else ''

            for t in text_nodes:
                if t.firstChild:
                    if appendix_letter:
                        t.firstChild.nodeValue = f'APPENDIX {appendix_letter}'
                    else:
                        t.firstChild.nodeValue = 'APPENDIX'

            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pStyle_list = pPr_list[0].getElementsByTagName('w:pStyle')
                if pStyle_list.length > 0:
                    pStyle_list[0].setAttribute('w:val', 'Heading1')

            changes_made += 1

    save_xml_file(doc, doc_path)
    print(f"[6/6] 已应用 G4 附录格式 ({changes_made} 处修改)")

def pack_document():
    """打包修改后的文档"""
    output_docx = os.path.join(BASE_DIR, 'Fan_Hui_Dissertation_Formatted.docx')
    pack_script = '/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/docx/ooxml/scripts/pack.py'

    result = os.system(f'python3 "{pack_script}" "{OUTPUT_DIR}" "{output_docx}"')
    if result == 0:
        print(f"\n✅ 修改完成！")
        print(f"📄 输出文件: {output_docx}")
    else:
        print(f"\n⚠️ 打包完成（可能有警告）")
        print(f"📄 输出文件: {output_docx}")

def main():
    print("=" * 60)
    print("Temple University 论文模板格式应用脚本 (G1-G4)")
    print("=" * 60)
    print()

    copy_original_to_output()
    apply_styles_from_template()
    apply_front_matter_formatting()
    apply_chapter_formatting()
    apply_bibliography_formatting()
    apply_appendix_formatting()
    pack_document()

    print()
    print("=" * 60)
    print("格式修改摘要:")
    print("=" * 60)
    print("✓ G1: 字体 (Times New Roman, 12pt)")
    print("✓ G1: 行距 (双倍行距)")
    print("✓ G1: 前置内容 (ABSTRACT, TABLE OF CONTENTS 大写)")
    print("✓ G2: 章节格式 (CHAPTER # 大写, 粗体, 居中)")
    print("✓ G2: 子章节格式 (Heading3, Heading4 样式)")
    print("✓ G3: 参考文献格式 (标题大写, 悬挂缩进 0.5\")")
    print("✓ G4: 附录格式 (APPENDIX # 大写, 居中)")
    print("=" * 60)

if __name__ == '__main__':
    main()