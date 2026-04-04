#!/usr/bin/env python3
"""Insert contract amendments with tracked changes (redlining)."""

import sys
sys.path.insert(0, '/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/docx')
from scripts.document import Document, DocxXMLEditor

BASE = '/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/⏳待处理/合同优化'
doc = Document(f'{BASE}/unpacked', rsid="D4EB1068", author="Claude", track_revisions=True)

FONT = '&#20140;&#19996;&#26391;&#27491;&#20307; &#29618;&#29649;'

def enc(s):
    return ''.join(f'&#{ord(c)};' for c in s)

# NDA body rPr
NDA_RPR = f'<w:rPr><w:rFonts w:ascii="{FONT}" w:eastAsia="{FONT}" w:hAnsi="{FONT}" w:hint="eastAsia"/><w:bCs/><w:szCs w:val="21"/></w:rPr>'

# NDA numbered list pPr
NDA_NUM_PPR = f'<w:pPr><w:pStyle w:val="af7"/><w:widowControl/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="24"/></w:numPr><w:tabs><w:tab w:val="left" w:pos="360"/></w:tabs><w:spacing w:line="280" w:lineRule="exact"/><w:ind w:left="851" w:rightChars="300" w:right="630" w:firstLineChars="0"/><w:rPr><w:rFonts w:ascii="{FONT}" w:eastAsia="{FONT}" w:hAnsi="{FONT}"/><w:bCs/><w:szCs w:val="21"/></w:rPr></w:pPr>'

# Body rPr for main contract
BODY_RPR = f'<w:rPr><w:rFonts w:ascii="{FONT}" w:eastAsia="{FONT}" w:hAnsi="{FONT}" w:hint="eastAsia"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>'

# §7 style pPr
BODY_7_PPR = f'<w:pPr><w:pStyle w:val="af7"/><w:numPr><w:ilvl w:val="3"/><w:numId w:val="6"/></w:numPr><w:spacing w:after="200"/><w:ind w:firstLineChars="0"/><w:contextualSpacing/><w:jc w:val="left"/><w:rPr><w:rFonts w:ascii="{FONT}" w:eastAsia="{FONT}" w:hAnsi="{FONT}" w:cs="Tahoma"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:pPr>'

# §12 style pPr
BODY_12_PPR = f'<w:pPr><w:pStyle w:val="af7"/><w:widowControl/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="10"/></w:numPr><w:spacing w:after="200"/><w:ind w:firstLineChars="0"/><w:contextualSpacing/><w:jc w:val="left"/><w:rPr><w:rFonts w:ascii="{FONT}" w:eastAsia="{FONT}" w:hAnsi="{FONT}" w:cs="Tahoma"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:pPr>'


def make_tracked_para(pPr_xml, text):
    """Create a complete tracked-change insertion paragraph using suggest_paragraph."""
    raw = f'<w:p>{pPr_xml}<w:r>{NDA_RPR}<w:t xml:space="preserve">{text}</w:t></w:r></w:p>'
    return DocxXMLEditor.suggest_paragraph(raw)


def make_tracked_para_body(pPr_xml, text):
    """Create a tracked-change insertion paragraph with body font."""
    raw = f'<w:p>{pPr_xml}<w:r>{BODY_RPR}<w:t xml:space="preserve">{text}</w:t></w:r></w:p>'
    return DocxXMLEditor.suggest_paragraph(raw)


def get_para(tag, contains, line_range):
    node = doc["word/document.xml"].get_node(tag=tag, contains=contains, line_number=line_range)
    p = node
    while p and p.nodeName != 'w:p':
        p = p.parentNode
    return p


# ============================================================
# 1. After §7(8) - enhanced subcontracting
# ============================================================
print("=== 1. §7(8) enhanced subcontracting ===")
p = get_para("w:r", "\u672a\u7ecf\u7532\u65b9\u4e8b\u524d", range(2688, 2710))
new_p = make_tracked_para_body(BODY_7_PPR, enc(
    "经过甲方事先书面同意后的转让行为，乙方应对第三方的服务及行为承担连带责任。未经甲方及京东书面同意，乙方不得将京东项目的核心业务分包给任何第三方。"
))
doc["word/document.xml"].insert_after(p, new_p)
print("  ✓ Done")


# ============================================================
# 2. After §12(2)(f) - competition restriction
# ============================================================
print("=== 2. §12(2)(f) competition restriction ===")
p = get_para("w:r", "\u5206\u5305\u8f6c\u5305", range(3864, 3895))
new_p = make_tracked_para_body(BODY_12_PPR, enc(
    "在合作期间及结束后六（6）个月内，乙方不得为京东的直接竞争对手提供相同或类似的服务。"
))
doc["word/document.xml"].insert_after(p, new_p)
print("  ✓ Done")


# ============================================================
# 3. NDA §2 - info flow control before §3 header
# ============================================================
print("=== 3. NDA §2 info flow control ===")
p_sec3 = get_para("w:r", "\u6743\u5229\u548c\u6551\u6d4e", range(10710, 10745))

clause_f = make_tracked_para(NDA_NUM_PPR, enc(
    "接收方仅能为履行京东项目之目的，将保密信息披露给其必须知悉该信息的雇员、高管（\u201c需知\u201d原则），并确保这些人员受到同等保密义务的约束。接收方应与所有获得或有权访问保密信息的代表订立书面协议，其保密限制内容不得低于本协议的约定。"
))
clause_g = make_tracked_para(NDA_NUM_PPR, enc(
    "未经披露方及京东的事前书面同意，接收方不得将京东项目的任何信息（包括但不限于合作事实本身、项目内容、成果）用于任何其他用途，包括但不限于向第三方（尤其是同行竞对公司）进行业务推介、投标、报价或作为案例宣传。"
))
clause_g2 = make_tracked_para(NDA_NUM_PPR, enc(
    "如接收方拟将京东项目信息或成果用于其他项目的投标文件，必须至少提前十（10）个工作日将该投标文件的相关部分提交给披露方及京东审核。仅在获得披露方及京东明确的书面同意后，方可使用。"
))

# Insert in reverse order before §3
doc["word/document.xml"].insert_before(p_sec3, clause_g2)
doc["word/document.xml"].insert_before(p_sec3, clause_g)
doc["word/document.xml"].insert_before(p_sec3, clause_f)
print("  ✓ Done")


# ============================================================
# 4. NDA §3 - penalties + injunction + audit before §4 header
# ============================================================
print("=== 4. NDA §3 penalties + injunction + audit ===")
p_sec4 = get_para("w:r", "\u5176\u4ed6", range(11205, 11240))

penalty_general = make_tracked_para(NDA_NUM_PPR, enc(
    "就前述违约金，双方进一步约定如下层次化标准：一般违约：违反保密义务但未造成重大损失的（如无意泄露），违约金为人民币10万元，或按项目合同月结算总金额的10%计算，以较高者为准。"
))
penalty_severe = make_tracked_para(NDA_NUM_PPR, enc(
    "严重违约：如接收方将保密信息透露给披露方的直接竞争对手，或利用该信息为竞争对手服务，从而给披露方或京东造成重大损失的，接收方应支付更高额的惩罚性违约金人民币100万元。"
))
penalty_loss = make_tracked_para(NDA_NUM_PPR, enc(
    "上述违约金不足以弥补披露方及京东因此遭受的全部损失的，接收方还应承担全部损失的赔偿责任。全部损失包括但不限于直接经济损失、预期利润损失、商誉损失、以及为此支出的律师费、诉讼费、调查费等。"
))
injunction = make_tracked_para(NDA_NUM_PPR, enc(
    "接收方同意，一旦发生违约披露，金钱赔偿可能不足以救济。因此，披露方有权申请法院禁令，要求立即停止违约行为，并采取必要措施防止损害扩大。"
))
audit = make_tracked_para(NDA_NUM_PPR, enc(
    "京东有权不定期对接收方就京东项目信息的安全保护措施进行审计和检查，接收方应予以积极配合，并提供必要的便利和资料。"
))

doc["word/document.xml"].insert_before(p_sec4, audit)
doc["word/document.xml"].insert_before(p_sec4, injunction)
doc["word/document.xml"].insert_before(p_sec4, penalty_loss)
doc["word/document.xml"].insert_before(p_sec4, penalty_severe)
doc["word/document.xml"].insert_before(p_sec4, penalty_general)
print("  ✓ Done")


# ============================================================
# SAVE
# ============================================================
doc.save()
print("\n✓ All tracked changes saved successfully!")
