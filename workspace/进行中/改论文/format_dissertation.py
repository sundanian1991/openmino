#!/usr/bin/env python3
"""
博士论文格式调整脚本
按照美式学术博士论文标准格式调整
"""

import os
import re
import xml.etree.ElementTree as ET  # 用于register_namespace
from defusedxml import ElementTree as DefusedET  # 用于安全解析

# 路径设置
BASE_DIR = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/进行中/改论文/unpacked"
STYLES_PATH = os.path.join(BASE_DIR, "word/styles.xml")
SETTINGS_PATH = os.path.join(BASE_DIR, "word/settings.xml")

# XML命名空间
NAMESPACES = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
}

# 注册命名空间
for prefix, uri in NAMESPACES.items():
    ET.register_namespace(prefix, uri)

def update_styles():
    """更新styles.xml中的样式定义"""

    tree = DefusedET.parse(STYLES_PATH)
    root = tree.getroot()

    # 遍历所有样式
    for style in root.findall('.//w:style', NAMESPACES):
        style_id = style.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}styleId')
        style_name_elem = style.find('w:name', NAMESPACES)
        style_name = style_name_elem.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val') if style_name_elem is not None else ''

        # Normal样式 - 正文
        if style_name == 'Normal' or style_id == 'a':
            update_normal_style(style)

        # Heading 1 - 章标题
        elif style_name == 'heading 1' or style_id == '1':
            update_heading1_style(style)

        # Heading 2 - 一级节标题（需要创建或更新）
        elif style_name == 'heading 2' or style_id == '2':
            update_heading2_style(style)

        # Heading 3 - 二级节标题
        elif style_name == 'heading 3' or style_id == '3':
            update_heading3_style(style)

        # Heading 4 - 三级节标题
        elif style_name == 'heading 4' or style_id == '4':
            update_heading4_style(style)

        # TOC样式
        elif 'toc' in style_name.lower():
            update_toc_style(style, style_name)

        # Title样式
        elif style_name == 'Title':
            update_title_style(style)

    # 保存修改
    tree.write(STYLES_PATH, encoding='UTF-8', xml_declaration=True)
    print("样式更新完成")

def update_normal_style(style):
    """更新Normal样式（正文）"""
    # Times New Roman 12pt，双倍行距，首行缩进

    pPr = style.find('w:pPr', NAMESPACES)
    if pPr is None:
        pPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pPr')

    # 清除现有段落属性
    for child in list(pPr):
        pPr.remove(child)

    # 添加段落属性
    # 首行缩进 0.5英寸 = 720 twips
    indent = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ind')
    indent.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}firstLine', '720')

    # 行距：双倍行距 = 480 (240 * 2)
    spacing = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}spacing')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}line', '480')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}lineRule', 'auto')

    # 两端对齐
    jc = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}jc')
    jc.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', 'both')

    # 更新字体属性
    rPr = style.find('w:rPr', NAMESPACES)
    if rPr is None:
        rPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rPr')

    # 清除现有字体属性
    for child in list(rPr):
        rPr.remove(child)

    # Times New Roman
    rFonts = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rFonts')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii', 'Times New Roman')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hAnsi', 'Times New Roman')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}eastAsia', '宋体')

    # 12pt = 24 half-points
    sz = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}sz')
    sz.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '24')

    szCs = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}szCs')
    szCs.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '24')

def update_heading1_style(style):
    """更新Heading 1样式（章标题）"""
    # 居中、加粗、16pt、Times New Roman

    pPr = style.find('w:pPr', NAMESPACES)
    if pPr is None:
        pPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pPr')

    # 清除现有段落属性，保留outlineLvl
    outline_lvl = pPr.find('w:outlineLvl', NAMESPACES)
    for child in list(pPr):
        pPr.remove(child)

    if outline_lvl is not None:
        pPr.append(outline_lvl)

    # 段前段后间距
    spacing = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}spacing')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}before', '240')  # 12pt
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}after', '240')   # 12pt
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}line', '480')    # 双倍行距
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}lineRule', 'auto')

    # 居中
    jc = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}jc')
    jc.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', 'center')

    # 分页：章标题前分页
    pageBreakBefore = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pageBreakBefore')

    # 更新字体属性
    rPr = style.find('w:rPr', NAMESPACES)
    if rPr is None:
        rPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rPr')

    # 清除现有字体属性
    for child in list(rPr):
        rPr.remove(child)

    # Times New Roman
    rFonts = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rFonts')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii', 'Times New Roman')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hAnsi', 'Times New Roman')

    # 加粗
    b = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}b')

    # 16pt = 32 half-points
    sz = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}sz')
    sz.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '32')

    szCs = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}szCs')
    szCs.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '32')

def update_heading2_style(style):
    """更新Heading 2样式（一级节标题）"""
    # 左对齐、加粗、14pt

    pPr = style.find('w:pPr', NAMESPACES)
    if pPr is None:
        pPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pPr')

    outline_lvl = pPr.find('w:outlineLvl', NAMESPACES)
    for child in list(pPr):
        pPr.remove(child)

    if outline_lvl is not None:
        pPr.append(outline_lvl)

    spacing = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}spacing')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}before', '240')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}after', '120')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}line', '480')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}lineRule', 'auto')

    jc = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}jc')
    jc.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', 'left')

    rPr = style.find('w:rPr', NAMESPACES)
    if rPr is None:
        rPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rPr')

    for child in list(rPr):
        rPr.remove(child)

    rFonts = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rFonts')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii', 'Times New Roman')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hAnsi', 'Times New Roman')

    b = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}b')

    sz = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}sz')
    sz.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '28')  # 14pt

    szCs = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}szCs')
    szCs.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '28')

def update_heading3_style(style):
    """更新Heading 3样式（二级节标题）"""
    # 左对齐、加粗、12pt

    pPr = style.find('w:pPr', NAMESPACES)
    if pPr is None:
        pPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pPr')

    outline_lvl = pPr.find('w:outlineLvl', NAMESPACES)
    for child in list(pPr):
        pPr.remove(child)

    if outline_lvl is not None:
        pPr.append(outline_lvl)

    spacing = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}spacing')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}before', '240')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}after', '120')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}line', '480')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}lineRule', 'auto')

    jc = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}jc')
    jc.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', 'left')

    rPr = style.find('w:rPr', NAMESPACES)
    if rPr is None:
        rPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rPr')

    for child in list(rPr):
        rPr.remove(child)

    rFonts = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rFonts')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii', 'Times New Roman')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hAnsi', 'Times New Roman')

    b = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}b')

    sz = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}sz')
    sz.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '24')  # 12pt

    szCs = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}szCs')
    szCs.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '24')

def update_heading4_style(style):
    """更新Heading 4样式（三级节标题）"""
    # 左对齐、斜体、12pt

    pPr = style.find('w:pPr', NAMESPACES)
    if pPr is None:
        pPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pPr')

    outline_lvl = pPr.find('w:outlineLvl', NAMESPACES)
    for child in list(pPr):
        pPr.remove(child)

    if outline_lvl is not None:
        pPr.append(outline_lvl)

    spacing = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}spacing')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}before', '240')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}after', '120')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}line', '480')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}lineRule', 'auto')

    jc = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}jc')
    jc.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', 'left')

    rPr = style.find('w:rPr', NAMESPACES)
    if rPr is None:
        rPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rPr')

    for child in list(rPr):
        rPr.remove(child)

    rFonts = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rFonts')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii', 'Times New Roman')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hAnsi', 'Times New Roman')

    # 斜体而非加粗
    i = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}i')

    sz = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}sz')
    sz.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '24')  # 12pt

    szCs = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}szCs')
    szCs.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '24')

def update_toc_style(style, style_name):
    """更新目录样式"""
    # Times New Roman，保持层级缩进

    rPr = style.find('w:rPr', NAMESPACES)
    if rPr is None:
        rPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rPr')

    # 清除现有字体属性
    for child in list(rPr):
        rPr.remove(child)

    rFonts = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rFonts')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii', 'Times New Roman')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hAnsi', 'Times New Roman')

    # TOC 1 加粗
    if style_name == 'toc 1':
        b = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}b')

    sz = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}sz')
    sz.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '24')

    szCs = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}szCs')
    szCs.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '24')

def update_title_style(style):
    """更新标题样式（封面标题）"""
    # 居中、加粗、18pt

    pPr = style.find('w:pPr', NAMESPACES)
    if pPr is None:
        pPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}pPr')

    for child in list(pPr):
        pPr.remove(child)

    spacing = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}spacing')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}before', '480')
    spacing.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}after', '240')

    jc = ET.SubElement(pPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}jc')
    jc.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', 'center')

    rPr = style.find('w:rPr', NAMESPACES)
    if rPr is None:
        rPr = ET.SubElement(style, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rPr')

    for child in list(rPr):
        rPr.remove(child)

    rFonts = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}rFonts')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii', 'Times New Roman')
    rFonts.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hAnsi', 'Times New Roman')

    b = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}b')

    sz = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}sz')
    sz.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '36')  # 18pt

    szCs = ET.SubElement(rPr, '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}szCs')
    szCs.set('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '36')

if __name__ == '__main__':
    update_styles()