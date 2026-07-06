// ═══════════════════════════════════════════════════════════
//  Slide 01 — 封面
//  瑞士国际主义：大衬线标题 + 全出血强调色带 + 大量留白
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T, CANVAS_W }) {
  // 左侧大色块（1/3 高度，锚定视觉重心）
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.18, h: 7.5,
    fill: { color: C.accent },
    line: { type: 'none' },
  });

  // 标题区 — 距顶 1.5"，左对齐
  slide.addText('当你感觉"不对"的时候', {
    x: 0.7, y: 1.4, w: 12.0, h: 1.4,
    fontSize: 58, fontFace: T.coverTitle.face, bold: true,
    color: C.ink, align: 'left',
    charSpacing: T.coverTitle.tracking,
  });

  slide.addText('AI 听不见', {
    x: 0.7, y: 2.7, w: 12.0, h: 1.2,
    fontSize: 58, fontFace: T.coverTitle.face, bold: true,
    color: C.accent, align: 'left',
    charSpacing: T.coverTitle.tracking,
  });

  // 细分割线
  slide.addShape(pptx.ShapeType.line, {
    x: 0.7, y: 4.2, w: 2.5, h: 0,
    line: { color: C.ink, width: 1.5 },
  });

  // 副标题
  slide.addText('从 Dwarkesh × Grant Sanderson 的对话出发\n重新理解人机协作中"判断力"的稀缺性', {
    x: 0.7, y: 4.5, w: 12.0, h: 1.0,
    fontSize: 16, fontFace: 'Georgia', color: C.inkSoft, italic: true,
    align: 'left', lineSpacingMultiple: 1.5,
  });

  // 元数据（左下角小字）
  slide.addText('Dwarkesh Podcast × Grant Sanderson (3Blue1Brown)  ·  "AI and the Future of Math"  ·  2026.06.30', {
    x: 0.7, y: 6.7, w: 12.0, h: 0.4,
    fontSize: T.footer.size, fontFace: 'Helvetica Neue', color: C.mute, align: 'left',
  });

  // 期号标（封面常见元素，参考杂志刊头）
  slide.addText('N° 01 / 2026', {
    x: 10.5, y: 6.7, w: 2.5, h: 0.4,
    fontSize: T.footer.size, fontFace: 'Helvetica Neue', color: C.mute,
    align: 'right', charSpacing: 80,
  });
};
