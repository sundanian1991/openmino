// ═══════════════════════════════════════════════════════════
//  Slide 10 — 策展人
//  大面积黑色引用块（全出血）+ 侧面解释 → 全是字体大小对比
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('数学家最终的形态', {
    x: 0.5, y: 0.55, w: 8, h: 0.55,
    fontSize: 40, fontFace: 'Helvetica Neue', bold: true, color: C.ink, align: 'left',
  });
  slide.addText('是策展人，不是解题者', {
    x: 0.5, y: 1.1, w: 12, h: 0.5,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', color: C.accent, align: 'left',
  });

  // ── 大面积黑色引用块 ──
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 1.85, w: 9.5, h: 3.2,
    fill: { color: C.ink }, line: { type: 'none' },
  });
  // 装饰条
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 1.85, w: 0.08, h: 3.2,
    fill: { color: C.accent }, line: { type: 'none' },
  });
  // 英文原引用
  slide.addText('"What mathematicians will end up being\nis actually more analogous to\nart museum curators\nthan anything else."', {
    x: 0.35, y: 2.05, w: 8.8, h: 2.2,
    fontSize: 22, fontFace: 'Georgia', italic: true, color: C.white,
    align: 'left', lineSpacingMultiple: 1.3,
  });
  // 中文对照
  slide.addText('数学家最终的工作不是解题\n而是像美术馆策展人一样\n在无限可能中\n挑出"值得被看见的作品"', {
    x: 0.35, y: 4.0, w: 8.8, h: 0.9,
    fontSize: T.quoteCn.size, fontFace: 'Georgia', italic: true,
    color: C.mute, align: 'left', lineSpacingMultiple: 1.35,
  });
  slide.addText('— Grant Sanderson, Dwarkesh Podcast, ~00:28:00', {
    x: 0.35, y: 4.6, w: 5, h: 0.25,
    fontSize: T.quoteAttribution.size, fontFace: 'Helvetica Neue',
    color: C.white, transparency: 60, charSpacing: 50,
  });

  // ── 右侧职业建议 ──
  slide.addText('02', {
    x: 9.8, y: 1.9, w: 3.0, h: 0.6,
    fontSize: 48, fontFace: 'Helvetica Neue', bold: true,
    color: C.transparency || C.mute, transparency: 40,
  });
  slide.addText('S-Tier Career Advice', {
    x: 10.0, y: 1.95, w: 3.0, h: 0.35,
    fontSize: T.sectionLabel.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.accent, charSpacing: T.sectionLabel.tracking * 10 * 12,
  });
  slide.addText('(Grant Sanderson, 01:23:00)', {
    x: 10.0, y: 2.25, w: 3.0, h: 0.25,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute,
  });

  slide.addShape(pptx.ShapeType.line, {
    x: 10.0, y: 2.65, w: 0.5, h: 0,
    line: { color: C.accent, width: 1.5 },
  });

  slide.addText('"You should understand\nwhere the money is coming from,\nand what value you are actually adding,\nand the connection between those two.\n\nI think often a surprisingly\nsmall amount of thought\nis put towards that."', {
    x: 10.0, y: 2.8, w: 2.95, h: 2.1,
    fontSize: T.quoteEn.size, fontFace: 'Georgia', italic: true, color: C.ink,
    align: 'left', lineSpacingMultiple: 1.25,
  });
  slide.addText('— Soleio 转引, X 3.3万赞', {
    x: 10.0, y: 4.65, w: 3.0, h: 0.25,
    fontSize: T.quoteAttribution.size, fontFace: 'Helvetica Neue', color: C.mute, charSpacing: 30,
  });

  // ── 底部一句话 ──
  slide.addText('在无限可能中挑出"值得被看见的作品" —— 策展人是人类最后的不可替代角色', {
    x: 0.5, y: 5.3, w: 12.5, h: 0.8,
    fontSize: T.subheadingB.size, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
    align: 'left', lineSpacingMultiple: 1.3,
  });

  // 底部引用标：开放性问题注释
  slide.addText('原始访谈结构 — 8 个议题 · 1小时33分钟 · 参考 Terence Tao 访谈 (2026.03.20)', {
    x: 0.5, y: 7.0, w: 12, h: 0.35,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute, align: 'left',
  });
};
