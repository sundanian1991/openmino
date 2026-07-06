// Slide 10 — 策展人 + Agnes gallery image
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('数学家最终的形态', {
    x: 0.5, y: 0.3, w: 8, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });
  slide.addText('是策展人，不是解题者', {
    x: 0.5, y: 0.95, w: 12, h: 0.5,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.accent, align: 'left',
  });

  // 画廊配图（左半）
  slide.addImage({
    path: ASSETS + '/slide10_curator.png',
    x: 0.5, y: 1.8, w: 6.5, h: 5.2,
  });
  // 边框装饰
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.8, w: 0.08, h: 5.2,
    fill: { color: C.accent }, line: { color: C.accent },
  });

  // 右侧引用
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.3, y: 1.8, w: 5.5, h: 3.4,
    fill: { color: C.title, transparency: 93 },
    line: { color: C.accent, width: 1.5 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.3, y: 1.8, w: 0.1, h: 3.4,
    fill: { color: C.accent },
  });
  slide.addText('"What mathematicians will end up being is actually more analogous to art museum curators than anything else."', {
    x: 7.55, y: 1.95, w: 5.0, h: 1.8,
    fontSize: 12, fontFace: 'PingFang SC', italic: true, color: C.title, bold: true,
    align: 'left', lineSpacingMultiple: 1.35,
  });
  slide.addText('数学家最终的工作不是解题\n而是像美术馆策展人一样\n在无限可能中挑出"值得被看见的作品"', {
    x: 7.55, y: 3.6, w: 5.0, h: 1.4,
    fontSize: 11, fontFace: 'PingFang SC', color: C.sub,
    align: 'left', lineSpacingMultiple: 1.35,
  });
  slide.addText('Grant Sanderson, ~00:28:00', {
    x: 7.55, y: 4.9, w: 5, h: 0.25,
    fontSize: 9, fontFace: 'PingFang SC', color: C.sub,
  });

  // 职业建议
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.3, y: 5.4, w: 5.5, h: 1.4,
    fill: { color: C.accent, transparency: 88 },
    line: { color: C.accent, width: 0.75 },
  });
  slide.addText('S-Tier Career Advice (01:23:00)', {
    x: 7.55, y: 5.5, w: 5, h: 0.25,
    fontSize: 9, fontFace: 'PingFang SC', bold: true, color: C.white, transparency: 50,
  });
  slide.addText('"Understand where the money is coming from, and what value you are actually adding, and the connection between those two."', {
    x: 7.55, y: 5.7, w: 5, h: 0.8,
    fontSize: 10, fontFace: 'PingFang SC', italic: true, color: C.white,
    align: 'left', lineSpacingMultiple: 1.3,
  });
  slide.addText('. Soleio citation, X 33K likes', {
    x: 7.55, y: 6.45, w: 5, h: 0.25,
    fontSize: 8, fontFace: 'PingFang SC', color: C.white, transparency: 60,
  });
};
