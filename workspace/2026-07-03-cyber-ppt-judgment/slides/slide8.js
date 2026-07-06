// Slide 8 — 个人判断档案 5问 — 3+2 layout to avoid truncation
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('个人判断档案', {
    x: 0.5, y: 0.3, w: 8, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });
  slide.addText('5 问解压缩你的直觉', {
    x: 0.5, y: 0.95, w: 12.5, h: 0.5,
    fontSize: 22, fontFace: 'PingFang SC', color: C.accent, align: 'left',
  });

  const questions = [
    { q: '我否定了什么？', a: '被排除的方案/方向/表达', num: '1', color: '558B2F' },
    { q: '为什么否定？', a: '定位偏差/表达不适配/受众不匹配', num: '2', color: '388E3C' },
    { q: '我保留了什么？', a: '被采纳的优质内容的核心特征', num: '3', color: '1976D2' },
    { q: '真正关心的本质？', a: '穿透表层需求，锚定核心诉求', num: '4', color: 'E65100' },
    { q: '下次避免什么？', a: '收敛成可复用的避坑经验', num: '5', color: C.accent },
  ];

  // Row 1: cards 1-3
  const cardW1 = 3.9, gap1 = 0.3, startX1 = 0.7;
  const cardY1 = 1.9, cardH1 = 4.0;

  questions.slice(0, 3).forEach((item, i) => {
    const x = startX1 + i * (cardW1 + gap1);
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cardY1, w: cardW1, h: cardH1,
      fill: { color: C.white },
      line: { color: item.color, width: 1.5 },
      rectRadius: 0.08,
      shadow: { type: 'outer', blur: 4, opacity: 0.1, offset: 1.5, color: '000000' },
    });
    slide.addShape(pptx.ShapeType.rect, { x, y: cardY1, w: cardW1, h: 0.7, fill: { color: item.color }, rectRadius: 0.08 });
    slide.addShape(pptx.ShapeType.rect, { x, y: cardY1 + 0.4, w: cardW1, h: 0.3, fill: { color: item.color } });
    slide.addText(item.num, { x, y: cardY1 + 0.05, w: cardW1, h: 0.6, fontSize: 28, fontFace: 'PingFang SC', bold: true, color: C.white, align: 'center', valign: 'middle' });
    slide.addText(item.q, { x: x + 0.2, y: cardY1 + 0.85, w: cardW1 - 0.4, h: 1.2, fontSize: 13, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left' });
    slide.addText(item.a, { x: x + 0.2, y: cardY1 + 2.15, w: cardW1 - 0.4, h: 1.2, fontSize: 11, fontFace: 'PingFang SC', color: C.body, align: 'left', lineSpacingMultiple: 1.3 });
    slide.addText('转化为下次可调用样本', { x: x + 0.15, y: cardY1 + cardH1 - 0.45, w: cardW1 - 0.3, h: 0.3, fontSize: 8, fontFace: 'PingFang SC', bold: true, color: item.color, align: 'center' });
  });

  // Row 2: cards 4-5
  const cardW2 = 5.0, gap2 = 1.6;
  const startX2 = 1.2, cardY2 = 5.35;

  questions.slice(3, 5).forEach((item, i) => {
    const x = startX2 + i * (cardW2 + gap2);
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cardY2, w: cardW2, h: 1.3,
      fill: { color: 'FFF8E1', transparency: 50 },
      line: { color: item.color, width: 1.5 },
      rectRadius: 0.06,
    });
    slide.addShape(pptx.ShapeType.rect, { x, y: cardY2, w: 1.3, h: 1.3, fill: { color: item.color }, rectRadius: 0.06 });
    slide.addShape(pptx.ShapeType.rect, { x: x + 0.5, y: cardY2 + 0.95, w: 0.8, h: 0.35, fill: { color: item.color } });
    slide.addText(item.num, { x, y: cardY2, w: 1.3, h: 1.3, fontSize: 36, fontFace: 'PingFang SC', bold: true, color: C.white, align: 'center', valign: 'middle' });
    slide.addText(item.q, { x: x + 1.5, y: cardY2 + 0.15, w: cardW2 - 1.7, h: 0.5, fontSize: 13, fontFace: 'PingFang SC', bold: true, color: C.title });
    slide.addText(item.a, { x: x + 1.5, y: cardY2 + 0.65, w: cardW2 - 1.7, h: 0.55, fontSize: 11, fontFace: 'PingFang SC', color: C.body });
  });
};
