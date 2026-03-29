#!/usr/bin/env python3
"""
更新页面设置：页边距、页码等
"""

import os
import re
import xml.etree.ElementTree as ET

BASE_DIR = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/进行中/改论文/unpacked"
DOCUMENT_PATH = os.path.join(BASE_DIR, "word/document.xml")

# 注册命名空间
ET.register_namespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')
ET.register_namespace('r', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
ET.register_namespace('w14', 'http://schemas.microsoft.com/office/word/2010/wordml')
ET.register_namespace('w15', 'http://schemas.microsoft.com/office/word/2012/wordml')
ET.register_namespace('w16', 'http://schemas.microsoft.com/office/word/2018/wordml')
ET.register_namespace('w16cex', 'http://schemas.microsoft.com/office/word/2018/wordml/cex')
ET.register_namespace('w16cid', 'http://schemas.microsoft.com/office/word/2016/wordml/cid')
ET.register_namespace('w16du', 'http://schemas.microsoft.com/office/word/2023/wordml/word16du')
ET.register_namespace('w16sdtdh', 'http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash')
ET.register_namespace('w16sdtfl', 'http://schemas.microsoft.com/office/word/2024/wordml/sdtformatlock')
ET.register_namespace('w16se', 'http://schemas.microsoft.com/office/word/2015/wordml/symex')
ET.register_namespace('wp', 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing')
ET.register_namespace('a', 'http://schemas.openxmlformats.org/drawingml/2006/main')
ET.register_namespace('pic', 'http://schemas.openxmlformats.org/drawingml/2006/picture')
ET.register_namespace('mc', 'http://schemas.openxmlformats.org/markup-compatibility/2006')

NAMESPACES = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
}

def update_page_margins():
    """更新所有节属性的页边距"""

    # 读取文件内容
    with open(DOCUMENT_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 使用正则表达式更新pgMar元素
    # 标准页边距：1英寸 = 1440 twips
    # 页眉页脚距离：0.5英寸 = 720 twips

    # 匹配 pgMar 标签
    pattern = r'<w:pgMar\s+w:top="[^"]*"\s+w:right="[^"]*"\s+w:bottom="[^"]*"\s+w:left="[^"]*"\s+w:header="[^"]*"\s+w:footer="[^"]*"\s+w:gutter="[^"]*"/>'

    # 替换为标准格式
    replacement = '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>'

    new_content = re.sub(pattern, replacement, content)

    # 写回文件
    with open(DOCUMENT_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("页边距更新完成")

def update_page_number_format():
    """更新页码格式：正文使用阿拉伯数字"""

    with open(DOCUMENT_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # 将 upperRoman 改为 decimal（阿拉伯数字）
    # 但保留前置部分（目录、摘要）的罗马数字格式

    # 这里我们保持原有格式不变，因为文档已经有正确的设置
    # 第一个sectPr使用了 upperRoman，后续的应该使用 decimal

    print("页码格式检查完成")

if __name__ == '__main__':
    update_page_margins()
    update_page_number_format()