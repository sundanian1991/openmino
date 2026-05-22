#!/usr/bin/env python3
"""检查DOCX中附件四保密协议部分的段落结构"""
from docx import Document

INPUT = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/⏳待处理/合同优化/客户服务外包合同-202511.docx.docx"
doc = Document(INPUT)

# 找附件四保密协议区域
in_annex4 = False
for i, para in enumerate(doc.paragraphs):
    text = para.text.strip()
    # 检查是否进入附件四
    if '保密协议' in text and ('附件四' in text or '签署页' in text or text == '保密协议'):
        in_annex4 = True
    if in_annex4:
        # 打印段落索引、样式、前80个字符
        style = para.style.name if para.style else 'None'
        print(f"[{i:3d}] ({style:20s}) {text[:120]}")
    # 检查是否离开附件四（到附件五）
    if '附件五' in text and '企业微信' in text:
        print(f"--- 附件四结束于段落 {i} ---")
        break
