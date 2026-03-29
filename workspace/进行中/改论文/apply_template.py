#!/usr/bin/env python3
"""
应用 Temple University 论文模板格式 (G1-G4) 到 Fan Hui Dissertation
"""

import os
import shutil
import re
from defusedxml import minidom

# 路径设置
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UNPACKED_ORIGINAL = os.path.join(BASE_DIR, 'unpacked_original')
UNPACKED_G1 = os.path.join(BASE_DIR, 'unpacked_G1')
UNPACKED_G2 = os.path.join(BASE_DIR, 'unpacked_G2')
UNPACKED_G3 = os.path.join(BASE_DIR, 'unpacked_G3')
UNPACKED_G4 = os.path.join(BASE_DIR, 'unpacked_G4')
OUTPUT_DIR = os.path.join(BASE_DIR, 'unpacked_modified')

def copy_original_to_output():
    """复制原始解包目录到输出目录"""
    if os.path.exists(OUTPUT_DIR):
        shutil.rmtree(OUTPUT_DIR)
    shutil.copytree(UNPACKED_ORIGINAL, OUTPUT_DIR)
    print(f"[1/5] 已复制原始文档到 {OUTPUT_DIR}")

def apply_styles_from_template():
    """从 G1 模板复制 styles.xml"""
    src = os.path.join(UNPACKED_G1, 'word', 'styles.xml')
    dst = os.path.join(OUTPUT_DIR, 'word', 'styles.xml')
    shutil.copy(src, dst)
    print(f"[2/5] 已应用 G1 模板样式 (styles.xml)")

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
    - LIST OF TABLES/FIGURES 格式
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    # 获取所有段落
    paragraphs = doc.getElementsByTagName('w:p')

    changes_made = 0

    for para in paragraphs:
        # 获取段落文本
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 1. 修改 "Abstract" 为 "ABSTRACT" (全大写)
        if para_text.strip() == 'Abstract':
            for t in text_nodes:
                if t.firstChild and t.firstChild.nodeValue == 'Abstract':
                    t.firstChild.nodeValue = 'ABSTRACT'
                    changes_made += 1
                    print(f"   - Abstract → ABSTRACT")

        # 2. 修改章节标题为 Heading 样式
        # Chapter 1 Introduction -> CHAPTER 1 INTRODUCTION
        chapter_match = re.match(r'^Chapter (\d+)\s+(.+)$', para_text.strip())
        if chapter_match:
            chapter_num = chapter_match.group(1)
            chapter_title = chapter_match.group(2).upper()
            for t in text_nodes:
                if t.firstChild:
                    t.firstChild.nodeValue = f'CHAPTER {chapter_num}'
            # 更新段落样式为 Heading1
            pPr = para.getElementsByTagName('w:pPr')
            if pPr.length > 0:
                pStyle = pPr[0].getElementsByTagName('w:pStyle')
                if pStyle.length > 0:
                    pStyle[0].setAttribute('w:val', 'Heading1')
            changes_made += 1
            print(f"   - Chapter {chapter_num} → CHAPTER {chapter_num}")

        # 3. 修改 "REFERENCES" / "ACKNOWLEDGMENTS" 为大写
        if para_text.strip() in ['REFERENCES', 'ACKNOWLEDGMENTS', 'Contents']:
            for t in text_nodes:
                if t.firstChild:
                    t.firstChild.nodeValue = para_text.strip().upper()
            changes_made += 1
            print(f"   - {para_text.strip()} → 大写")

        # 4. 子章节标题格式 (1.1, 2.1 等)
        section_match = re.match(r'^(\d+\.\d+)\s+(.+)$', para_text.strip())
        if section_match:
            # 更新为 Heading3 样式
            pPr = para.getElementsByTagName('w:pPr')
            if pPr.length > 0:
                pStyle = pPr[0].getElementsByTagName('w:pStyle')
                if pStyle.length > 0:
                    pStyle[0].setAttribute('w:val', 'Heading3')
                    changes_made += 1

    save_xml_file(doc, doc_path)
    print(f"[3/5] 已应用 G1 前置内容格式 ({changes_made} 处修改)")

def apply_chapter_formatting():
    """
    G2: 应用章节段落格式
    - 章节标题: CHAPTER # (阿拉伯数字，大写，粗体，居中)
    - 章节副标题: 大写，粗体，居中
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes_made = 0

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 匹配章节标题模式
        # Pattern 1: "Chapter X Title" -> "CHAPTER X" + "TITLE"
        # Pattern 2: "#.X Section Title"

        # 检查是否是章节标题段落
        if para_text.strip().startswith('Chapter '):
            # 分离章节号和标题
            match = re.match(r'^Chapter\s+(\d+)\s*(.*)$', para_text.strip())
            if match:
                chapter_num = match.group(1)
                chapter_title = match.group(2).upper() if match.group(2) else ''

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
                    pPr = pPr_list[0]
                    pStyle_list = pPr.getElementsByTagName('w:pStyle')
                    if pStyle_list.length > 0:
                        pStyle_list[0].setAttribute('w:val', 'Heading1')
                    else:
                        # 创建 pStyle 元素
                        pStyle = doc.createElement('w:pStyle')
                        pStyle.setAttribute('w:val', 'Heading1')
                        pPr.insertBefore(pStyle, pPr.firstChild)

                changes_made += 1
                print(f"   - Chapter {chapter_num}: {chapter_title}")

    save_xml_file(doc, doc_path)
    print(f"[4/5] 已应用 G2 章节段落格式 ({changes_made} 处修改)")

def apply_bibliography_formatting():
    """
    G3: 应用参考文献格式
    - 标题: BIBLIOGRAPHY 或 REFERENCES CITED
    - 悬挂缩进 0.5"
    - 条目内单倍行距，条目间双倍行距
    """
    doc_path = os.path.join(OUTPUT_DIR, 'word', 'document.xml')
    doc = parse_xml_file(doc_path)

    paragraphs = doc.getElementsByTagName('w:p')
    changes_made = 0
    in_bibliography = False

    for para in paragraphs:
        text_nodes = para.getElementsByTagName('w:t')
        para_text = ''.join([t.firstChild.nodeValue if t.firstChild else '' for t in text_nodes])

        # 找到 REFERENCES 章节
        if para_text.strip() == 'REFERENCES':
            in_bibliography = True
            # 确保是 Heading1 样式
            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pStyle_list = pPr_list[0].getElementsByTagName('w:pStyle')
                if pStyle_list.length > 0:
                    pStyle_list[0].setAttribute('w:val', 'Heading1')
            changes_made += 1
            print(f"   - REFERENCES 标题样式已更新")
            continue

        # 如果在参考文献部分，应用悬挂缩进格式
        if in_bibliography and para_text.strip():
            # 检查是否是新章节开始（遇到 Chapter 或其他大标题）
            if para_text.strip().startswith('Chapter') or para_text.strip() == 'ACKNOWLEDGMENTS':
                in_bibliography = False
                continue

            # 应用悬挂缩进
            pPr_list = para.getElementsByTagName('w:pPr')
            if pPr_list.length > 0:
                pPr = pPr_list[0]
                ind_list = pPr.getElementsByTagName('w:ind')
                if ind_list.length > 0:
                    # 设置悬挂缩进: left=720 (0.5"), hanging=720
                    ind_list[0].setAttribute('w:left', '720')
                    ind_list[0].setAttribute('w:hanging', '720')
                else:
                    ind = doc.createElement('w:ind')
                    ind.setAttribute('w:left', '720')
                    ind.setAttribute('w:hanging', '720')
                    pPr.appendChild(ind)

                # 设置行距
                spacing_list = pPr.getElementsByTagName('w:spacing')
                if spacing_list.length > 0:
                    spacing_list[0].setAttribute('w:line', '480')  # 双倍行距
                    spacing_list[0].setAttribute('w:lineRule', 'atLeast')

                changes_made += 1

    save_xml_file(doc, doc_path)
    print(f"[5/5] 已应用 G3 参考文献格式 ({changes_made} 处修改)")

def pack_document():
    """打包修改后的文档"""
    output_docx = os.path.join(BASE_DIR, 'Fan_Hui_Dissertation_Formatted.docx')
    pack_script = '/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/docx/ooxml/scripts/pack.py'

    os.system(f'python3 "{pack_script}" "{OUTPUT_DIR}" "{output_docx}"')
    print(f"\n✓ 修改完成！输出文件: {output_docx}")

def main():
    print("=" * 60)
    print("Temple University 论文模板格式应用脚本")
    print("=" * 60)

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

    # Step 6: 打包文档
    pack_document()

if __name__ == '__main__':
    main()