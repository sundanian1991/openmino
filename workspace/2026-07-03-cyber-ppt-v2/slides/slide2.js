// ═══════════════════════════════════════════════════════════
//  Slide 02 — AI 不是"会"或"不会"——锯齿状前沿
//  左文右图：标题 + IMO 进度条 + 判断语句
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  // 页面标题
  slide.addText('AI 不是"会"或"不会"', {
    x: 0.5, y: 0.65, w: 12.0, h: 0.6,
    fontSize: 40, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
    align: 'left',
  });
  slide.addText('——而是锯齿状的前沿', {
    x: 0.5, y: 1.2, w: 12.0, h: 0.5,
    fontSize: 28, fontFace: 'Helvetica Neue', bold: true, color: C.accent,
    align: 'left',
  });

  // 左侧：IMO 成绩单
  slide.addText('IMO 成绩单', {
    x: 0.5, y: 2.0, w: 6, h: 0.3,
    fontSize: T.sectionLabel.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.mute, charSpacing: T.sectionLabel.tracking * 10 * 12,
  });

  const results = [
    { label: '几何',   score: 7, max: 7, note: '19秒解出 (2024)',          color: C.green },
    { label: '数论',   score: 6, max: 7, note: '已解',                    color: C.green },
    { label: '代数',   score: 4, max: 7, note: '部分解出',                 color: C.amber },
    { label: '组合',   score: 2, max: 7, note: 'Wild card',              color: C.accent },
  ];

  let y = 2.5;
  results.forEach(r => {
    slide.addText(r.label, {
      x: 0.5, y, w: 0.6, h: 0.35,
      fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', bold: true,
      color: C.inkSoft, align: 'left',
    });
    const barX = 1.2, barW = 4.0, barH = 0.18;
    // 槽底
    slide.addShape(pptx.ShapeType.rect, {
      x: barX, y: y + 0.06, w: barW, h: barH,
      fill: { color: C.rule }, line: { type: 'none' },
    });
    // 得分
    slide.addShape(pptx.ShapeType.rect, {
      x: barX, y: y + 0.06, w: barW * (r.score / r.max), h: barH,
      fill: { color: r.color }, line: { type: 'none' },
    });
    // 得分文本
    slide.addText(`${r.score}/${r.max}`, {
      x: barX + barW + 0.2, y, w: 0.6, h: 0.35,
      fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', bold: true,
      color: r.color, align: 'left',
    });
    slide.addText(r.note, {
      x: barX + barW + 1.1, y, w: 3, h: 0.35,
      fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute, align: 'left',
    });
    y += 0.55;
  });

  // 右侧：核心判断（引用条）
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.5, y: 2.0, w: 6.5, h: 5.0,
    fill: { color: C.ink }, line: { type: 'none' },
  });
  // 装饰条
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.5, y: 2.0, w: 0.08, h: 5.0,
    fill: { color: C.accent }, line: { type: 'none' },
  });
  slide.addText('"The dirty secret with the IMO\nis that you really can train for\na lot of them. Geometry, it just\nsolves it in nineteen seconds\nsince 2024 because it\'s a brute\nforce solver."', {
    x: 6.75, y: 2.2, w: 6.0, h: 3.6,
    fontSize: T.quoteEn.size, fontFace: T.quoteEn.face, italic: true,
    color: C.white, align: 'left', lineSpacingMultiple: 1.4,
  });
  slide.addText('这种"锯齿"在放大后依然存在\n数学内部也没有被均匀攻破', {
    x: 6.75, y: 5.8, w: 6.0, h: 0.8,
    fontSize: T.quoteCn.size, fontFace: T.quoteCn.face, italic: true,
    color: C.mute, align: 'left', lineSpacingMultiple: 1.4,
  });
  slide.addText('— Grant Sanderson, Dwarkesh Podcast, 00:00:00', {
    x: 6.75, y: 6.4, w: 5.0, h: 0.3,
    fontSize: T.quoteAttribution.size, fontFace: T.quoteAttribution.face,
    color: C.white, transparency: 55, charSpacing: 50,
  });
};
