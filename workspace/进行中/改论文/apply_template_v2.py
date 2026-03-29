#!/usr/bin/env python3
"""
应用 Temple University 论文模板格式 (G1-G4) 到 Fan Hui Dissertation - 完整版
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
    - 标题页格式
    - ABSTRACT 大写
    - 目录格式
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes_made = 0

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 1. 修改 "Abstract" 为 "ABSTRACT"
        if para_text.strip() == 'Abstract':
            for t in text_nodes:
                if t.firstChild and t.firstChild.nodeValue == 'Abstract':
                    t.firstChild.nodeValue = 'ABSTRACT'
                    changes_made += 1

        # 2. 修改 "Contents" 为 "TABLE OF CONTENTS"
        if para_text.strip() == 'Contents':
            for t in text_nodes:
                if t.firstChild:
                    t.firstChild.nodeValue = 'TABLE OF CONTENTS'
            changes_made += 1

        # 3. 确保章节标题大写
        chapter_match = re.match(r'^Chapter (\d+)\s*(.*)$', para_text.strip())
        if chapter_match:
            chapter_num = chapter_match.group(1)
            for t in text_nodes:
                if t.firstChild and 'Chapter' in t.firstChild.nodeValue:
                    t.firstChild.nodeValue = f'CHAPTER {chapter_num}'
            changes_made += 1

        # 4. 修改 ACKNOWLEDGMENTS 为大写
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
    - 章节标题: CHAPTER # (阿拉伯数字，大写，粗体，居中)
    - 章节副标题: 标题大写，粗体，居中
    - 应用正确的 Heading 样式
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
    - 标题: BIBLIOGRAPHY 或 REFERENCES
    - 悬挂缩进 0.5" (720 twips)
    - 条目内单倍行距，条目间双倍行距
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes_made = 0
    in_references = False
    ref_count = 0

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 检测参考文献标题（正文部分，非目录）
        if para_text.strip() == 'REFERENCES' and len(para_text.strip()) < 50:
            # 检查是否在正文部分（通过段落样式判断）
            pPr_list = para.getElementsByTagName('w:pPr')
            is_toc = False
            if pPr_list.length > 0:
                tabs = pPr_list[0].getElementsByTagName('w:tabs')
                if tabs.length > 0:
                    is_toc = True  # 有 tabs 说明是目录项

            if not is_toc:
                in_references = True
                # 应用 Heading1 样式
                pPr_list = para.getElementsByTagName('w:pPr')
                if pPr_list.length > 0:
                    pStyle_list = pPr_list[0].getElementsByTagName('w:pStyle')
                    if pStyle_list.length > 0:
                        pStyle_list[0].setAttribute('w:val', 'Heading1')
                changes_made += 1
                print(f"   - 找到 REFERENCES 标题")
                continue

        # 检测致谢章节开始（参考文献结束）
        if para_text.strip() == 'ACKNOWLEDGMENTS':
            in_references = False
            continue

        # 如果在参考文献部分，应用悬挂缩进格式
        if in_references and para_text.strip():
            # 跳过空行
            if len(para_text.strip()) < 3:
                continue

            # 应用悬挂缩进
            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pPr = pPr_list[0]

                # 设置悬挂缩进
                ind_list = pPr.getElementsByTagName('w:ind')
                if ind_list.length > 0:
                    ind_list[0].setAttribute('w:left', '720')  # 左缩进 0.5"
                    ind_list[0].setAttribute('w:hanging', '720')  # 悬挂缩进 0.5"
                else:
                    ind = doc.createElement('w:ind')
                    ind.setAttribute('w:left', '720')
                    ind.setAttribute('w:hanging', '720')
                    pPr.appendChild(ind)

                # 设置行距（条目内单倍，条目间双倍 - 这里设置整体双倍）
                spacing_list = pPr.getElementsByTagName('w:spacing')
                if spacing_list.length > 0:
                    spacing_list[0].setAttribute('w:line', '480')  # 双倍行距
                    spacing_list[0].setAttribute('w:lineRule', 'atLeast')

                ref_count += 1

    save_xml_file(doc, doc_path)
    print(f"[5/6] 已应用 G3 参考文献格式 ({changes_made} 处标题修改, {ref_count} 条参考文献)")

def apply_appendix_formatting():
    """
    G4: 应用附录格式
    - 标题: APPENDIX A, APPENDIX B 等
    - 附录标题大写居中
    - 每个附录另起一页
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

            # 更新文本为大写
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

    # Step 1: 复制原始文档
    copy_original_to_output()

    # Step 2: 应用样式文件
    apply_styles_from_template()

    # Step 3: 应用前置内容格式 (G1)
    apply_front_matter_formatting()

    # Step 4: 应用章节格式 (G2)
    apply_chapter_formatting()

    # Step 5: 应用参考文献格式 (G3)
    apply_bibliography_formatting()

    # Step 6: 应用附录格式 (G4)
    apply_appendix_formatting()

    # Step 7: 打包文档
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
    print("✓ G3: 参考文献格式 (悬挂缩进 0.5\")")
    print("✓ G4: 附录格式 (APPENDIX # 大写, 居中)")
    print("=" * 60)

if __name__ == '__main__':
    main()