// ═══════════════════════════════════════════════════════════
//  Slide 07 — AI 复刻结果，丢失取舍
//  左显性 / 右隐性 双栏对照
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('AI 复刻了结果\n但丢失了取舍', {
    x: 0.5, y: 0.55, w: 12.0, h: 1.2,
    fontSize: 36, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
    align: 'left', lineSpacingMultiple: 1.2,
  });

  // ── 左：显性输出（AI 可见）──
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.9, w: 5.5, h: 4.8,
    fill: { color: 'E8F5E9' }, line: { type: 'none' },
  });
  slide.addText('VISIBLE  AI 可见', {
    x: 0.7, y: 2.05, w: 5.2, h: 0.35,
    fontSize: T.sectionLabel.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.green, charSpacing: T.sectionLabel.tracking * 10 * 12,
  });
  const visible = [
    '最终的表达',
    '被保留的段落',
    '表格里的数据',
    '定稿的标题',
    '图形的构图',
    '引文的出处',
  ];
  visible.forEach((v, i) => {
    slide.addText(`✓  ${v}`, {
      x: 0.7, y: 2.55 + i * 0.38, w: 5.2, h: 0.33,
      fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    });
  });

  // ── 右：隐性裁决（AI 不可见）──
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.35, y: 1.9, w: 6.5, h: 4.8,
    fill: { color: 'FFF3F0' }, line: { type: 'none' },
  });
  slide.addText('INVISIBLE  AI 不可见', {
    x: 6.55, y: 2.05, w: 6.2, h: 0.35,
    fontSize: T.sectionLabel.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.accent, charSpacing: T.sectionLabel.tracking * 10 * 12,
  });
  const invisible = [
    '为什么砍掉另一个方向',
    '为什么保留这段表达',
    '为什么这个完整答案是错的',
    '为什么标题应改成这样',
    '为什么用这个词而不用那个',
    '……这些才是核心资产',
  ];
  invisible.forEach((v, i) => {
    slide.addText(`✗  ${v}`, {
      x: 6.55, y: 2.55 + i * 0.38, w: 6.2, h: 0.33,
      fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    });
  });

  // ── 中央标签 ──
  slide.addText('AI 看到', {
    x: 5.65, y: 3.7, w: 1.9, h: 0.35,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.green,
    align: 'center',
  });
  slide.addText('AI 丢失', {
    x: 5.65, y: 5.2, w: 1.9, h: 0.35,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.accent,
    align: 'center',
  });

  // ── 底部结论 ──
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.0, w: 13.333, h: 0.5,
    fill: { color: C.ink }, line: { type: 'none' },
  });
  slide.addText('被遗漏的隐性判断，是人机协作中最值得"开采"的核心资产；提取它们 = 把"炼丹"变成"积累"', {
    x: 0.5, y: 7.03, w: 12, h: 0.45,
    fontSize: T.body.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.white, align: 'left', valign: 'middle',
  });
};
